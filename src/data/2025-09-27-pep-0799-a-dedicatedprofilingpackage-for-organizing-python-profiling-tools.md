---
title: "[Draft] PEP 799 - A dedicatedprofilingpackage for organizing Python profiling tools"
excerpt: "Python Enhancement Proposal 799: 'A dedicatedprofilingpackage for organizing Python profiling tools'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/799/
toc: true
toc_sticky: true
date: 2025-09-27 14:08:50+0900
last_modified_at: 2025-09-27 14:08:50+0900
published: true
---
> **원문 링크:** [PEP 799 - A dedicatedprofilingpackage for organizing Python profiling tools](https://peps.python.org/pep-0799/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 21-Jul-2025



# PEP 799 – Python 프로파일링 도구 정리를 위한 전용 프로파일링 패키지

## 초록 (Abstract)
이 PEP는 Python의 내장 프로파일링 도구들을 단일하고 일관된 네임스페이스 아래에S `profiling`이라는 새로운 표준 라이브러리 모듈을 생성할 것을 제안합니다. 또한, 레거시 순수 Python 트레이싱 프로파일러인 `profile` 모듈의 사용 중단을 제안합니다.

## 동기 (Motivation)
Python은 현재 두 가지 트레이싱 프로파일러인 `profile`과 `cProfile`을 제공합니다.
- **`profile` 모듈** : 순수 Python으로 구현되었으며, 주로 교육용이거나 서브클래싱(subclassing)에 유용하지만 실제 사용에는 너무 느립니다.
- **`cProfile` 모듈** : C로 구현되었으며, 실질적인 프로파일링 시나리오에 더 적합하지만, 동작상의 차이로 인해 `profile`의 완벽한 대체품은 아닙니다.

이 두 가지는 모두 모든 함수 호출과 반환을 계측(instrument)하는 트레이싱 프로파일러입니다. 이 방법론은 상당한 런타임 오버헤드를 유발하며, PEP 659에 의해 도입된 것과 같은 특정 인터프리터 최적화를 비활성화할 수 있습니다. 게다가, `cProfile`은 메인 스레드만 관찰하므로, 현대의 동시성(concurrent) Python 프로그램에서는 유용성이 떨어집니다. 혼란스럽게도, 이 모듈들의 명명 방식은 `profile`이 정식인 것처럼 보이지만 실제로는 대부분 구식입니다.

Python 3.15부터는 `profile.sample` 아래에 `tachyon`이라는 새로운 샘플링 프로파일러가 도입되었습니다. 이 도구는 통계적 샘플링을 사용하여 성능 특성을 추론하며, 오버헤드가 거의 없으며 현대 Python 인터프리터와 더 잘 작동합니다. 또한, 다중 스레드, 비동기 함수, 자유 스레딩 빌드(free threading builds)를 지원하며, 실행 중인 프로세스에 연결(attach)할 수 있습니다. 이러한 장점에도 불구하고, `tachyon`이 `profile.sample` 아래에 위치하는 것은 오해의 소지가 있으며 그 중요성을 가리고 있습니다.

현재 프로파일링 도구의 구성은 일관되고 찾기 쉬운(discoverable) 구조가 부족합니다. 제안된 재조직은 사용자들이 적절한 도구를 더 효과적으로 찾고, 프로파일러 간의 방법론적 차이를 명확히 하며, 미래 확장의 기반을 마련하는 것을 목표로 합니다.

## 근거 (Rationale)
이번 재조직은 Python의 프로파일링 도구와 관련된 여러 오랜 문제들을 해결합니다.

1.  **향상된 발견 가능성 (Discoverability)** : 모든 내장 프로파일러를 단일하고 명확하게 명명된 네임스페이스 아래에 모음으로써 발견 가능성을 향상시킵니다. 현재 프로파일링 도구는 일관성 없는 명명과 불분명한 관계를 가진 모듈들에 흩어져 있습니다. `profiling` 모듈을 도입함으로써, 사용자들은 프로파일링 기능을 탐색하고 접근할 수 있는 잘 정의되고 직관적인 위치를 갖게 될 것입니다.

2.  **명확성 향상 (Enhanced Clarity)** : 서브모듈의 이름을 기본 방법론에 따라 명명함으로써 명확성을 높입니다. 즉, 결정론적 트레이싱 프로파일러를 위한 `profiling.tracing`과 통계적 샘플링 프로파일러를 위한 `profiling.sampling`입니다. 이 명시적인 분류는 각 도구의 동작과 한계를 이해하기 쉽게 만들고, 사용자들이 채택하도록 권장되는 정신적 모델(mental model)과 API를 일치시킵니다.

3.  **개발자 안내 (Guidance to Developers)** : 권장되는 도구를 더 쉽게 찾고 사용할 수 있도록 함으로써 개발자에게 안내를 제공합니다. 현재 구조는 단순히 이름 우선순위 때문에 사용자들로 하여금 `profile`과 같이 구식이거나 성능이 낮은 모듈에 의존하도록 오도할 수 있습니다. `profiling` 네임스페이스와 그 명확한 의미론을 통해 사용자들은 특정 사용 사례에 적합한 프로파일러를 선택할 가능성이 높아집니다.

4.  **확장성 촉진 (Promotes Extensibility)** : 통합된 네임스페이스 아래에 프로파일링 도구를 통합함으로써, 메모리 프로파일러, I/O 프로파일러 또는 하이브리드 도구와 같은 미래의 프로파일링 기능을 관련 없는 모듈을 과부하시키거나 중복되는 최상위(top-level) 이름을 추가하지 않고도 쉽게 도입할 수 있습니다. `profiling` 모듈은 이를 위한 자연스러운 보금자리를 제공합니다.

## 상세 (Specification)

### 새로운 모듈 구조 (New Module Structure)
이 PEP는 다음을 포함하는 새로운 `profiling` 모듈을 도입합니다.

*   `profiling.tracing`: 결정론적 함수-호출 트레이싱 (기존 `cProfile`에서 재배치됨).
*   `profiling.sampling`: 통계적 샘플링 프로파일러 (`tachyon`).

`cProfile` 구현은 `profiling.tracing`으로 재배치될 것이며, 하위 호환성(backwards compatibility)을 위해 `cProfile`은 별칭(alias)으로 유지됩니다. `tachyon` 샘플링 프로파일러는 `profiling.sampling`에서 사용 가능합니다.

### `profile` 모듈의 사용 중단 (Deprecation of profile)
`profile` 모듈은 Python 3.15부터 사용 중단(deprecated)될 예정입니다.

*   **Python 3.15** : `profile`을 임포트(import)하면 `DeprecationWarning`이 발생합니다.
*   **Python 3.16** : `profile`의 모든 사용에서 `DeprecationWarning`이 발생합니다.
*   **Python 3.17** : 모듈이 표준 라이브러리에서 제거됩니다.

Python 3.15부터 `cProfile` 및 `profile` 대신 `profiling.tracing`이 선호될 것입니다. 현재 `profile.sample` 모듈에 있는 코드는 `profiling` 패키지로 이동될 것입니다.

### 문서화 (Documentation)
Python 문서는 새로운 `profiling` 모듈을 프로파일링 기능의 정식 진입점(canonical entry point)으로 사용할 것입니다. 또한, 트레이싱 프로파일러와 샘플링 프로파일러 간의 차이점을 설명하고, 각 유형이 언제 가장 적절한지에 대한 지침을 포함할 것입니다. `cProfile`에 대한 문서는 계속 사용 가능하지만, 새로운 `profiling` 등가물(equivalents)로 연결될 것입니다.

### 하위 호환성 (Backwards Compatibility)
이 PEP의 유일한 하위 호환성(backwards incompatible) 측면은 `profile` 모듈의 미래 제거이지만, 이는 PEP 387 절차에 따라 이루어질 것입니다.

### 보안 영향 (Security Implications)
없음.

## 채택되지 않은 대안 (Rejected Alternatives)

### `cProfile` 이름 변경 (Renaming cProfile)
`cProfile`을 `profile.tracing`으로 이름을 변경하는 것이 고려되었지만, 이 변경은 많은 기존 코드에 영향을 미칠 것입니다. 호환성과 명확성 사이의 균형을 맞추기 위해, 원래 이름을 유지하면서 `profiling.tracing` 아래에 별칭으로 두는 방식을 택했습니다.

### `profilers`를 모듈 이름으로 사용 (Using profilers as the Module Name)
모듈은 처음에 `profilers` (복수형)로 제안되었으나, 커뮤니티 피드백을 바탕으로 `profiling` (동명사 형태)으로 변경되었습니다. 동명사 형태는 기능 카테고리를 나타내는 다른 Python 표준 라이브러리 모듈과 더 일관적입니다.

### 샘플링 프로파일러의 다중 이름 (Multiple Names for the Sampling Profiler)
이 PEP의 이전 버전에서는 샘플링 프로파일러를 `profiling.sampling`과 `profiling.tachyon`의 두 가지 이름으로 제공할 것을 제안했습니다. 이는 혼란을 피하기 위해 거부되었습니다. 새로운 기능을 도입할 때는 여러 별칭보다는 단일하고 명확한 접근 경로를 갖는 것이 좋습니다. `profiling.sampling`이라는 이름은 프로파일링 방법론을 명확하게 설명하므로 선택되었고, "tachyon"은 문서에서 언급될 수 있는 내부 코드명으로 남아있습니다.

### 최상위 `tachyon` 모듈 (Top-Level tachyon Module)
`import tachyon`을 새로운 최상위 모듈로 도입하는 것은 거부되었습니다. `tachyon`을 `profiling` 아래에 그룹화하는 것은 논리적 구조를 확립하고 최상위 모듈의 확산을 방지하며, Python Steering Council의 요청에 따라 전역 네임스페이스 사용을 최소화하는 데 도움이 됩니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain) 또는 CC0-1.0-Universal 라이선스(둘 중 더 허용적인 것)에 따라 제공됩니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.