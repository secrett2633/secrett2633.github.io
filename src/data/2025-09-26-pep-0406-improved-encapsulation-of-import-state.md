---
title: "[Withdrawn] PEP 406 - Improved Encapsulation of Import State"
excerpt: "Python Enhancement Proposal 406: 'Improved Encapsulation of Import State'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/406/
toc: true
toc_sticky: true
date: 2025-09-26 21:29:05+0900
last_modified_at: 2025-09-26 21:29:05+0900
published: true
---
> **원문 링크:** [PEP 406 - Improved Encapsulation of Import State](https://peps.python.org/pep-0406/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 04-Jul-2011

## PEP 406 – Import 상태의 캡슐화 개선

**상태:** Withdrawn (철회됨)
**유형:** Standards Track
**작성자:** Alyssa Coghlan, Greg Slodkowicz
**생성일:** 2011년 7월 4일
**Python 버전:** 3.4
**최종 수정일:** 2025년 2월 1일

---

### 초록 (Abstract)

이 PEP는 `importlib`의 일부로 새로운 `ImportEngine` 클래스를 도입하여 모듈 임포트(import)와 관련된 모든 상태를 단일 객체로 캡슐화할 것을 제안합니다. 이 객체의 새 인스턴스를 생성하는 것은 `__import__()` 함수를 오버라이드(override)함으로써 내장된 임포트 문의 구현을 완전히 대체하는 대안을 제공할 것입니다. 내장 임포트 기능 및 `ImportEngine` 객체를 통한 임포트와 함께 작동하도록, 이 PEP는 전역 임포트 상태를 임시로 대체하기 위한 컨텍스트 관리(context management) 기반 접근 방식을 제안합니다.

또한 이 PEP는 `GlobalImportEngine` 서브클래스(subclass)와 해당 클래스의 전역 접근 가능 인스턴스를 포함할 것을 제안하는데, 이는 프로세스 전역 상태에 "쓰기 통과(writes through)"합니다. 이는 제안된 캡슐화된 API와 레거시(legacy) 프로세스 전역 상태 간의 하위 호환성(backwards compatible) 브리지를 제공하며, 관련된 상태 업데이트(예: `sys.path`가 수정될 때 경로 캐시 항목을 선택적으로 무효화하는 것)를 직접적으로 지원합니다.

### PEP 철회 이유 (PEP Withdrawal Rationale)

이 PEP가 처음 작성된 이후, Python 3.3의 PEP 420과 Python 3.4의 PEP 451의 일환으로 임포트 시스템에 상당한 변경 사항이 있었습니다.

임포트 상태의 캡슐화를 제공하는 것은 여전히 매우 바람직하지만, PEP 451을 기반으로 새로운 PEP에서 다루는 것이 더 적합하며, PEP 451 호환 `finder` 및 `loader`만 사용하도록 허용하는 것이 좋습니다 (이는 이전 `loader` API와 관련된 전역 상태의 직접 조작 문제를 많이 피할 수 있기 때문입니다).

### 제안 배경 (Rationale)

현재 임포트 시스템과 관련된 대부분의 상태는 `sys` 모듈의 모듈 수준 속성(module level attributes)으로 저장됩니다. 유일한 예외는 임포트 락(lock)인데, 이는 직접 접근할 수 없고 `imp` 모듈의 관련 함수를 통해서만 접근 가능합니다. 현재의 프로세스 전역 임포트 상태는 다음을 포함합니다.

*   `sys.modules`
*   `sys.path`
*   `sys.path_hooks`
*   `sys.meta_path`
*   `sys.path_importer_cache`
*   임포트 락 (`imp.lock_held()`, `acquire_lock()`, `release_lock()`)

이 상태를 격리하면 여러 임포트 상태를 프로세스 내에 편리하게 저장할 수 있습니다. 임포트 기능을 자체 포함된 객체에 배치하면 추가 기능(예: 모듈 임포트 알림 또는 어떤 모듈을 임포트할 수 있는지에 대한 세밀한 제어)을 추가하기 위해 서브클래싱(subclassing)도 가능해집니다. 이 엔진은 기존 프로세스 전역 상태와 상호 작용하기 위해 임포트 엔진 API를 사용할 수 있도록 서브클래스화될 수도 있습니다.

네임스페이스(namespace) PEPs (특히 PEP 402)는 `sys.path`가 수정될 때 패키지 경로를 올바르게 업데이트하기 위해 추가적인 프로세스 전역 상태의 잠재적인 필요성을 제기합니다.

마지막으로, 이 모든 상태에 대해 일관된 객체를 제공하면 임포트 상태를 임시로 대체할 수 있는 컨텍스트 관리 기능을 제공하는 것도 가능해집니다.

### 제안 (Proposal)

저희는 임포트 기능을 캡슐화하기 위해 `ImportEngine` 클래스를 도입할 것을 제안합니다. 여기에는 필요할 때 내장된 `__import__()`의 대안으로 사용될 수 있는 `__import__()` 메서드와 `importlib.import_module()`과 동등한 `import_module()` 메서드가 포함됩니다.

가정되고 유지되어야 할 전역 임포트 상태 불변식(invariants)이 존재하기 때문에, 우리는 `ImportEngine`과 동일한 인터페이스를 가지지만 현재 전역 임포트 상태에 직접 접근하는 `GlobalImportState` 클래스를 도입합니다. 이는 클래스 속성(class properties)을 사용하여 쉽게 구현될 수 있습니다.

### 세부 사항 (Specification)

#### `ImportEngine` API

제안된 확장은 다음 객체들로 구성됩니다.

*   **`importlib.engine.ImportEngine`**
    *   **`from_engine(self, other)`** : 다른 `ImportEngine` 인스턴스로부터 새로운 임포트 객체를 생성합니다. 새 객체는 `other`의 상태 복사본으로 초기화됩니다. `importlib.engine.sysengine`에서 호출될 때, `from_engine()`은 전역 임포트 상태의 복사본으로 `ImportEngine` 객체를 생성하는 데 사용될 수 있습니다.
    *   **`__import__(self, name, globals={}, locals={}, fromlist=[], level=0)`** : 내장 `__import__()` 함수의 재구현입니다. 모듈 임포트는 전역 임포트 상태 대신 `ImportEngine` 인스턴스에 저장된 상태를 사용하여 진행됩니다. `__import__` 기능의 전체 문서는를 참조하십시오. `ImportEngine` 및 그 서브클래스의 `__import__()`는 `__builtin__.__import__`를 `ImportEngine().__import__`로 교체하여 임포트 문의 동작을 사용자 정의하는 데 사용될 수 있습니다.
    *   **`import_module(name, package=None)`** : `ImportEngine` 인스턴스에 저장된 임포트 상태를 사용하는 `importlib.import_module()`의 재구현입니다. 전체 참조는을 참조하십시오.
    *   **`modules`, `path`, `path_hooks`, `meta_path`, `path_importer_cache`** : 프로세스 전역 `sys`의 해당 속성들의 인스턴스별 버전입니다.

*   **`importlib.engine.GlobalImportEngine(ImportEngine)`**
    *   전역 상태에 엔진과 유사한 접근을 제공하는 편의 클래스입니다. `ImportEngine`과 마찬가지로 `__import__()`, `import_module()`, `from_engine()` 메서드를 제공하지만, `sys`의 전역 상태에 쓰기 통과합니다.
    *   다양한 네임스페이스 패키지 메커니즘을 지원하기 위해 `sys.path`가 변경될 때 `pkgutil.extend_path`와 같은 도구는 임포트 상태의 다른 부분(이 경우 패키지 `__path__` 속성)도 수정해야 합니다. 경로 임포터 캐시도 다양한 변경이 있을 때 무효화되어야 합니다.
    *   `ImportEngine` API는 단일 작업의 일부로 관련된 임포트 상태 업데이트를 자동으로 수행하는 편의 메서드를 제공할 것입니다.

#### 전역 변수 (Global variables)

*   **`importlib.engine.sysengine`** : `GlobalImportEngine`의 미리 생성된 인스턴스입니다. 선택적 엔진 매개변수를 받아들이도록 업데이트된 임포터(importer) 및 로더(loader)와 `ImportEngine.from_engine(sysengine)`를 사용하여 프로세스 전역 임포트 상태의 복사본으로 시작하는 데 사용될 예정입니다.

#### `finder`/`loader` 인터페이스의 변경 없음 (No changes to finder/loader interfaces)

PEP 302 API를 추가 상태를 받아들이도록 업데이트하려는 시도 대신, 이 PEP는 `ImportEngine`이 컨텍스트 관리 프로토콜(decimal 모듈의 컨텍스트 대체 메커니즘과 유사)을 지원할 것을 제안합니다.

`ImportEngine`의 컨텍스트 관리 메커니즘은 다음과 같습니다.

*   **진입 시 (On entry):**
    *   임포트 락 획득
    *   전역 임포트 상태를 임포트 엔진 자체의 상태로 대체
*   **종료 시 (On exit):**
    *   이전 전역 임포트 상태 복원
    *   임포트 락 해제

이에 대한 정확한 API는 미정입니다 (그러나 `decimal.localcontext`에 의해 생성된 것과 유사하게 별도의 컨텍스트 관리 객체를 사용할 가능성이 높습니다).

### 미해결 문제 (Open Issues)

*   **전역 임포트 상태로 폴백(fall back)하기 위한 API 설계** : 현재 제안은 `from_engine()` API에 의존하여 전역 임포트 상태로 폴백합니다. 대신 동적으로 전역 임포트 상태로 폴백하는 변형을 제공하는 것이 바람직할 수 있습니다. 그러나 "가능한 한 고립된" 디자인으로 시작하는 큰 장점 중 하나는 엔진 인스턴스 상태와 프로세스 전역 상태 간의 경계를 다양한 방식으로 흐리게 하는 서브클래스를 실험할 수 있다는 것입니다.
*   **내장(Builtin) 및 확장(Extension) 모듈은 프로세스 전역이어야 함** : 플랫폼 제한으로 인해 각 내장 및 확장 모듈의 복사본은 각 프로세스에 하나만 존재할 수 있습니다. 따라서 각 `ImportEngine` 인스턴스가 이러한 모듈을 독립적으로 로드하는 것은 불가능합니다. 가장 간단한 해결책은 `ImportEngine`이 이러한 모듈 로드를 거부하고 `ImportError`를 발생하는 것입니다. `GlobalImportEngine`은 이러한 모듈을 정상적으로 로드할 수 있습니다. `ImportEngine`은 미리 채워진 모듈 캐시에서 이러한 모듈을 계속 반환할 것입니다. 직접 로드하는 경우에만 문제가 발생합니다.
*   **대체의 범위 (Scope of substitution)** : 이전 미해결 문제와 관련하여 컨텍스트 관리 API를 사용할 때 어떤 상태를 대체할 것인가 하는 질문이 있습니다. `sys.modules`를 교체하는 것은 캐시된 참조 때문에 신뢰할 수 없을 수 있으며, 일부 모듈의 독립적인 복사본을 가지는 것이 플랫폼 제한으로 인해 단순히 불가능하다는 근본적인 사실이 존재합니다. 이 PEP의 일부로서 다음을 명시적으로 문서화해야 할 필요가 있습니다.
    *   전역 임포트 상태의 어떤 부분을 대체할 수 있는지 (그리고 해당 상태에 대한 참조를 캐시하면서 대체 사례를 처리하지 않는 코드를 버그로 선언).
    *   어떤 부분을 제자리에서 수정해야 하는지 (따라서 `ImportEngine` 컨텍스트 관리 API에 의해 대체되지 않거나 `ImportEngine` 인스턴스에 범위가 지정되지 않음).

### 참조 구현 (Reference Implementation)

Greg Slodkowicz는 2011년 Google Summer of Code의 일환으로 Brett Cannon의 `importlib`을 기반으로 한 이 PEP의 초기 초안에 대한 참조 구현을 개발했습니다. 현재 구현은 기존 코드를 수정하는 것을 피하므로 불필요하게 많은 것을 복제합니다. 실제 구현은 영향을 받는 모든 코드를 제자리에서 수정할 것입니다.

해당 PEP의 초기 초안은 선택적 엔진 인스턴스를 전달하는 것을 지원하기 위해 PEP 302 API를 변경할 것을 제안했습니다. 이는 임포트된 모듈로부터의 추가 임포트에 제대로 영향을 미치지 않는 (심각한) 단점이 있었기 때문에, 전역 상태를 대체하기 위한 컨텍스트 관리 기반 제안으로 변경되었습니다.

---

**저작권 (Copyright)** : 이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.