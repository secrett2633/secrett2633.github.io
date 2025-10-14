---
title: "[Rejected] PEP 665 - A file format to list Python dependencies for reproducibility of an application"
excerpt: "Python Enhancement Proposal 665: 'A file format to list Python dependencies for reproducibility of an application'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/665/
toc: true
toc_sticky: true
date: 2025-09-27 10:02:15+0900
last_modified_at: 2025-09-27 10:02:15+0900
published: true
---
> **원문 링크:** [PEP 665 - A file format to list Python dependencies for reproducibility of an application](https://peps.python.org/pep-0665/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 29-Jul-2021


## PEP 665: 애플리케이션 재현 가능성을 위한 Python 의존성 목록 파일 형식 (거부됨)

### 개요 (Abstract)
이 PEP는 애플리케이션의 Python 패키지 설치 요구사항 목록과 그 관계를 명시하는 파일 형식을 제안했습니다. 이 요구사항 목록은 설치 대상에 대해 포괄적이며, 대상 플랫폼과 파일 자체 외의 추가 정보는 필요로 하지 않습니다. 제안된 파일 형식은 여러 플랫폼에서 요구사항을 설치할 수 있을 만큼 유연하여, 단일 파일로 다양한 플랫폼에서 재현 가능성(reproducibility)을 확보할 수 있도록 고안되었습니다.

### 용어 (Terminology)
PEP의 논의를 원활하게 하기 위해 다음과 같은 용어들의 정의가 필요합니다.

*   **Package (패키지)**: 의존성으로 설치되고 import 시스템을 통해 사용되는 모든 것을 의미합니다. PyPI의 패키지들이 그 예시입니다.
*   **Application (애플리케이션)**: 다른 외부 코드가 import 시스템을 통해 직접 의존하지 않는 최종 제품(standalone)입니다. 데스크톱 애플리케이션, 명령줄 도구 등이 그 예시입니다.
*   **Lock file (록 파일)**: 애플리케이션에 설치될 패키지를 기록하는 파일입니다. 일반적으로 정확한 패키지 버전을 지정하지만, 항상 모든 패키지가 특정 플랫폼에 설치되는 것은 아닙니다 (나중에 설명할 필터링 로직에 따라). 이는 록 파일이 여러 플랫폼에 걸친 재현 가능성을 설명할 수 있도록 합니다. `npm`의 `package-lock.json`, Poetry의 `Poetry.lock` 등이 예시입니다.
*   **Locking (록킹)**: 애플리케이션이 의존하는 패키지들의 입력을 받아 록 파일을 생성하는 행위입니다.
*   **Locker (로커)**: 록 파일을 생성하는 도구입니다.
*   **Installer (인스톨러)**: 록 파일을 사용하여 록 파일에 지정된 내용을 설치하는 도구입니다.

### 동기 (Motivation)
애플리케이션은 여러 가지 이유로 재현 가능한(reproducible) 설치를 원합니다. (이 PEP는 패키지 개발, Python 애플리케이션 외부의 의존성 록킹을 처리하는 대규모 시스템 통합, 또는 유연한 설치 요구사항이 엄격하고 재현 가능한 설치보다 선호되는 다른 상황은 다루지 않습니다.)

1.  **개발 용이성**: 모든 개발자가 특정 플랫폼에서 동일한 파일을 갖게 되면, 모두가 애플리케이션에 대해 동일한 경험을 목표로 개발하고 있음을 보장합니다. 사용자 또한 개발자가 의도한 것과 동일한 경험을 할 수 있도록 동일한 파일을 설치하기를 원합니다.
2.  **다중 플랫폼 재현성**: Python의 OS, CPU 등에 대한 이식성 덕분에 단일 플랫폼에 국한되지 않는 애플리케이션을 생성하는 것이 매우 쉽고 바람직합니다. 따라서 패키지 의존성에 있어 플랫폼 간의 차이를 허용하면서도, 각 플랫폼에서 일관성과 재현성을 유지할 수 있는 유연성이 필요합니다.
3.  **보안 강화**: 정확히 어떤 파일이 설치될지 제어할 때, 악의적인 행위자가 애플리케이션에 악성 코드를 삽입하려 하는 것을 막을 수 있습니다 (예: 공급망 공격). 항상 재현 가능한 설치로 이어지는 록 파일을 사용함으로써 특정 위험을 완전히 피할 수 있습니다.
4.  **Wheel 파일 형식 활용**: Wheel 파일은 정적이고 설치 과정에서 코드를 실행하지 않으므로 항상 재현 가능한 결과를 제공합니다. 반면 소스 배포(Source Distribution, sdist) 또는 소스 트리(Source Tree)는 빌드 도구가 재현 가능한 빌드를 지원해야만 재현 가능한 설치로 이어집니다. 그러나 대다수의 빌드 도구는 재현 가능한 빌드를 지원하지 않으므로, 이 PEP는 패키지 형식으로 Wheel만 지원함으로써 이러한 문제를 완화하려 합니다.

현재 `pip`의 `requirements` 파일 형식은 록 파일 표준에 가장 가깝지만, 본질적으로 재현 가능한 설치를 보장하지 않습니다. 또한 `PDM`, `pip-tools`, `Pipenv`, `Poetry`, `Pyflow` 등 여러 도구가 독자적인 록 파일 형식을 만들었으며, 이는 코드 편집기나 호스팅 제공업체와 같은 도구들이 여러 형식을 지원해야 하는 부담을 야기합니다. 표준화된 형식은 이러한 문제를 해결하고 도구 간 상호 운용성을 높일 수 있습니다. `Dart`, `npm`/`Node`, `Go`, `Rust` 등 다른 프로그래밍 언어 커뮤니티들도 록 파일 솔루션을 개발하며 그 유용성을 보여주었습니다.

### 근거 (Rationale)

#### 파일 형식 (File Format)
록 파일 변경 사항을 감사할 때 diff로 쉽게 읽을 수 있도록 TOML 형식을 선택했습니다. 이는 PEP 518의 `pyproject.toml`에서 이미 TOML이 사용되고 있는 점도 고려되었습니다.

#### 보안 설계 (Secure by Design)
기존 `requirements` 파일 형식의 보안 문제를 해결하고자 다음과 같은 특징을 가집니다.
*   파일에 대한 해시(hash) 기록을 필수로 요구하여 코드 변조를 방지합니다.
*   Wheel 파일만 사용함으로써 설치될 파일들을 미리 정확히 알 수 있고, 재현 가능성을 보장합니다.
*   인스톨러는 특정 플랫폼에 대해 록 파일로부터 확정적인(deterministic) 설치를 유도해야 합니다.
이 모든 것이 감사(audit) 가능한 신뢰할 수 있는 재현 가능한 설치로 이어집니다.

#### 크로스 플랫폼 (Cross-Platform)
`PDM`, `Poetry`와 같은 기존 프로젝트들도 크로스 플랫폼 록 파일을 제공합니다. 이는 단일 록 파일이 여러 플랫폼에서 작동하면서도, 각 플랫폼에서 일관되고 명확한 설치를 통해 동일한 최상위 요구사항이 설치되도록 합니다. 예를 들어, Linux에서 개발하고 macOS 사용자 및 Windows 심사위원과 협력하는 게임 개발 프로젝트에서, 크로스 플랫폼 록 파일은 핵심 요구사항이 모든 플랫폼에서 일관되게 충족되고, 동일 플랫폼 사용자들은 동일한 재현 가능한 설치를 얻도록 보장할 수 있습니다.

#### 간단한 인스톨러 (Simple Installer)
로커와 인스톨러 간의 관심사 분리는 인스톨러가 수행해야 할 작업을 훨씬 간단하게 만듭니다. 이를 통해 인스톨러 작성이 더 쉬워질 뿐만 아니라, 인스톨러가 모호하지 않고 재현 가능한 설치를 정확하게 생성하도록 돕습니다. 또한 인스톨러는 설치 생성에 더 적은 계산/에너지를 소비할 수 있으며, 이는 더 빠른 설치와 에너지 효율성 측면에서 이점을 제공합니다.

### 명세 (Specification)

록 파일은 TOML 형식을 사용해야 하며, 파일명은 `.pylock.toml`로 끝나야 합니다. `.toml`은 파일의 형식을 명확히 구분하고, `.pylock`은 다른 TOML 파일과 구분하여 Python 록 파일에 특화된 기능을 개발하기 쉽게 합니다.

#### 세부사항 (Details)

록 파일의 최상위 키는 다음과 같습니다:

*   **`version` (필수)**: 록 파일 형식의 버전을 나타내는 문자열 (예: `"1.0"`).
*   **`created-at` (필수)**: 록 파일이 생성된 UTC 타임스탬프 (TOML의 timestamp 타입). `SOURCE_DATE_EPOCH` 환경 변수가 설정된 경우, 로커는 이를 타임스탬프로 사용해야 합니다.
*   **`[tool]`**: 도구별 서브 테이블을 생성할 수 있습니다. `pyproject.toml`의 `[tool]` 테이블과 동일한 규칙을 따릅니다.
*   **`[metadata]` (필수)**: 록 파일 전체에 적용되는 데이터를 포함하는 테이블입니다.
    *   `metadata.marker`: 환경 마커 문자열. 록 파일이 생성된 환경 제약을 지정할 수 있습니다.
    *   `metadata.tag`: 플랫폼 호환성 태그(휠 태그) 문자열.
    *   `metadata.requires` (필수): 록 파일의 최상위 패키지 의존성을 나타내는 문자열 배열.
    *   `metadata.requires-python`: 이 록 파일이 지원하는 Python 버전 문자열.
*   **`[[package._name_._version_]]` (필수)**: 각 패키지 및 버전에 대한 배열로, 설치할 수 있는 잠재적인 (wheel) 파일 항목들을 포함합니다.
    *   `package._name_._version_.filename` (필수): 파일의 기본 이름 문자열.
    *   `[package._name_._version_.hashes]` (필수): 해시 알고리즘과 파일의 해시 값을 지정하는 테이블 (예: `hashes.sha256`).
    *   `package._name_._version_.url`: 파일을 가져올 URL 문자열. 최소한 HTTPS URL과 로컬 파일 경로를 지원해야 합니다.
    *   `package._name_._version_.direct`: 프로젝트가 "직접" 설치되었는지 여부를 나타내는 불리언 값.
    *   `package._name_._version_.requires-python`: 이 파일이 지원하는 Python 버전 문자열.
    *   `package._name_._version_.requires`: 이 파일의 의존성을 나타내는 문자열 배열.

### 예시 (Example)
PEP에 제시된 예시 `pylock.toml` 파일 구조는 다음과 같습니다.

```toml
version = "1.0"
created-at = 2021-10-19T22:33:45.520739+00:00

[tool]
# Tool-specific table.

[metadata]
requires = ["mousebender", "coveragepy[toml]"]
marker = "sys_platform == 'linux'" # As an example for coverage.
requires-python = ">=3.7"

[[package.attrs."21.2.0"]]
filename = "attrs-21.2.0-py2.py3-none-any.whl"
hashes.sha256 = "149e90d6d8ac20db7a955ad60cf0e6881a3f20d37096140088356da6c716b0b1"
url = "https://files.pythonhosted.org/packages/20/a9/ba6f1cd1a1517ff022b35acd6a7e4246371dfab08b8e42b829b6d07913cc/attrs-21.2.0-py2.py3-none-any.whl"
requires-python = ">=2.7, !=3.0.*, !=3.1.*, !=3.2.*, !=3.3.*, !=3.4.*"

[[package."coveragepy[toml]"."6.2.0"]]
filename = "coverage-6.2-cp310-cp310-manylinux_2_5_x86_64.manylinux1_x86_64.manylinux_2_12_x86_64.manylinux2010_x86_64.whl"
hashes.sha256 = "c7912d1526299cb04c88288e148c6c87c0df600eca76efd99d84396cfe00ef1d"
url = "https://files.pythonhosted.org/packages/da/64/468ca923e837285bd0b0a60bd9a287945d6b68e325705b66b368c07518b1/coverage-6.2-cp310-cp310-manylinux_2_5_x86_64.manylinux1_x86_64.manylinux_2_12_x86_64.manylinux2010_x86_64.whl"
requires-python = ">=3.6"
requires = ["tomli"]

[[package.mousebender."2.0.0"]]
filename = "mousebender-2.0.0-py3-none-any.whl"
hashes.sha256 = "a6f9adfbd17bfb0e6bb5de9a27083e01dfb86ed9c3861e04143d9fd6db373f7c"
url = "https://files.pythonhosted.org/packages/f4/b3/f6fdbff6395e9b77b5619160180489410fb2f42f41272994353e7ecf5bdf/mousebender-2.0.0-py3-none-any.whl"
requires-python = ">=3.6"
requires = ["attrs", "packaging"]

# ... (나머지 패키지 생략)
```

### 로커에 대한 기대사항 (Expectations for Lockers)
로커는 특정 플랫폼에 대해 설치 가능한 패키지들의 토폴로지 정렬(topological sort) 결과, 단일 버전의 패키지만 설치 자격을 얻고 각 패키지에 대해 최소한 하나의 호환 가능한 파일이 있도록 록 파일을 생성해야 합니다. 이는 인스톨러가 설치할 "가장 적합한(best-fitting)" Wheel을 결정하는 것 외에는 어떤 결정도 내릴 필요가 없는 록 파일을 생성하도록 합니다.

### 인스톨러에 대한 기대사항 (Expectations for Installers)
인스톨러는 다음 알고리즘에 따라 설치할 대상을 결정해야 합니다.

1.  록 파일 데이터와 `metadata.requires`를 시작점으로 하는 의존성 그래프를 구성합니다.
2.  지정된 플랫폼에서 지원되지 않는 모든 파일을 제거합니다.
3.  `requires`의 마커 평가에 따라 패키지 간의 모든 관련 없는 엣지를 제거합니다.
4.  의존성 그래프의 루트에서 여전히 도달 가능하지만 호환 가능한 파일이 없는 패키지가 있으면 오류를 발생시킵니다.
5.  남아 있는 모든 패키지가 설치할 단 하나의 버전만 가지고 있는지 확인하고, 그렇지 않으면 오류를 발생시킵니다.
6.  남아 있는 각 패키지에 대해 가장 적합한 Wheel 파일을 설치합니다.

인스톨러는 "가장 적합한 Wheel 파일"을 결정하기 위해 확정적인 알고리즘을 따라야 합니다.

### 잠재적 도구 지원 (Potential Tool Support)
`pip` 팀은 이 PEP가 수락되면 지원에 관심을 보였으며, 현재 `pip-tools`의 필요성을 대체할 수도 있었습니다. `PDM`과 `Pyflow` 또한 수락 시 지원 의사를 밝혔습니다. 반면 `Poetry`는 `sdist`, 디렉터리, VCS 의존성을 지원하지 않는다는 이유로 현재 상태로는 PEP를 지원하지 않을 것이라고 밝혔습니다.

### 하위 호환성 (Backwards Compatibility)
록 파일에 대한 기존 사양이 없으므로, 명시적인 하위 호환성 문제는 없습니다. 그러나 자체 록 파일을 가진 기존 도구들은 업데이트가 필요할 수 있습니다.

### 전환 계획 (Transition Plan)
이 PEP는 다음과 같은 경우 성공적으로 간주될 수 있었습니다.

*   두 개 이상의 기존 도구가 로커가 됨 (예: `pip-tools`, `PDM`, `pip`의 `pip freeze`를 통해).
*   `pip`가 인스톨러가 됨.
*   하나 이상의 주요 비(非)-Python 특정 플랫폼이 파일 형식을 지원함 (예: 클라우드 제공업체).

### 보안 영향 (Security Implications)
록 파일은 보안 문제를 발생시키기보다 해결하는 데 도움이 됩니다. 파일에 대한 해시 기록을 필수로 요구함으로써, 록 파일은 코드 변조를 방지하는 데 도움을 줍니다. Wheel 파일에만 의존함으로써 설치될 파일을 미리 알 수 있고 재현 가능합니다. 또한 록 파일은 예기치 않은 패키지 업데이트가 설치되는 것을 방지하여 악성 코드 유입 위험을 줄입니다.

### 교육 방법 (How to Teach This)
이 PEP에 대한 교육은 주로 일상적으로 사용되는 로커와 인스톨러에 달려 있을 것입니다. 개념적으로는 록 파일이 프로젝트 작동에 필요한 설치 내용을 지정하며, 일관성과 보안의 이점이 강조되어야 합니다.

### 참조 구현 (Reference Implementation)
개념 증명(Proof-of-Concept) 로커는 [https://github.com/frostming/pep665_poc](https://github.com/frostming/pep665_poc)에서 찾아볼 수 있습니다. 인스톨러는 아직 구현되지 않았지만, PEP의 설계상 로커가 구현하기 더 어려운 측면입니다.

### 거부된 아이디어 (Rejected Ideas)
*   **TOML 외 다른 파일 형식**: JSON이 잠시 고려되었으나, `pyproject.toml`에서 TOML이 이미 사용되고, TOML이 더 인간 친화적이며, 더 나은 diff를 제공한다는 이유로 TOML이 선택되었습니다.
*   **단일 록 파일 지원**: 모든 가능한 록 정보를 포함하는 단일 록 파일만 지원하는 아이디어가 고려되었으나, 여러 환경과 엄격한 재현 가능한 빌드를 모두 지원하는 데이터 형식을 고안하는 것이 복잡하고 번거로울 것이라는 판단으로 거부되었습니다.
*   **의존성 그래프 대신 평면 목록 사용**: 초기 버전에서는 록 파일이 의존성 그래프 개념 없이 특정 플랫폼에 대해 설치되어야 할 내용을 정확히 나열하도록 제안되었으나, PEP 508 환경 마커의 가능한 조합 수가 너무 많아 크로스 플랫폼 프로젝트의 경우 모든 조합을 개별 록 파일로 생성하는 것이 비실용적이라는 이유로 거부되었습니다.
*   **PEP 650 수용**: PEP 650은 록 파일 형식을 표준화하는 대신 인스톨러를 위한 API를 명세하여 이 문제를 해결하려는 이전 시도였습니다. PEP 665는 API 대신 **아티팩트(록 파일) 중심으로 표준화**하는 접근 방식을 택했습니다.
*   **소스 배포(sdist) 및 소스 트리(source tree) 지원 허용**: 광범위한 논의 끝에, 이 PEP는 소스 배포 또는 소스 트리를 허용 가능한 코드 형식으로 지원하지 않기로 결정되었습니다. 이는 sdist나 소스 트리를 빌드하기 위해 코드를 실행해야 하므로 재현 가능성 및 보안 목표를 훼손할 수 있기 때문입니다. 이 문제는 추후 별도의 PEP에서 논의될 수 있다고 명시했습니다.

---

**참고:** 이 PEP는 커뮤니티의 미온적인 반응과 소스 배포 지원 부족으로 인해 거부되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.