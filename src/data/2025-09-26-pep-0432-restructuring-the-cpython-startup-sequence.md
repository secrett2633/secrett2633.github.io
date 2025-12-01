---
title: "[Withdrawn] PEP 432 - Restructuring the CPython startup sequence"
excerpt: "Python Enhancement Proposal 432: 'Restructuring the CPython startup sequence'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/432/
toc: true
toc_sticky: true
date: 2025-09-26 21:44:16+0900
last_modified_at: 2025-09-26 21:44:16+0900
published: true
---
> **원문 링크:** [PEP 432 - Restructuring the CPython startup sequence](https://peps.python.org/pep-0432/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 28-Dec-2012



# PEP 432 – CPython 시작 시퀀스 재구성

## 개요
이 문서는 CPython 인터프리터의 시작 시퀀스를 재구성하여, 참조 인터프리터 실행 파일의 초기화 동작을 수정하고, 더 큰 애플리케이션에 Python 실행 엔진으로 CPython을 임베딩할 때 시작 동작을 더 쉽게 제어할 수 있는 메커니즘을 제안합니다.

원래 PEP 432는 CPython 시작 시퀀스를 유지보수하기 쉽게 만들고 CPython 런타임을 대규모 애플리케이션의 일부로 임베딩하기 쉽게 만들기 위한 배경 정보와 구체적인 제안을 제공했습니다.

### PEP 철회 (Withdrawal)
PEP 432는 2012년 말부터 2020년 중반까지 유효했으나, 2020년 6월 PEP 저자들은 해당 PEP를 철회하기로 결정했습니다. 이는 PEP 432가 처음 작성된 이후 많은 변화가 있었고, CPython 시작 시퀀스 및 임베딩 API에 대한 추가 변경 사항은 PEP 587에서 충분히 다뤄지지 않은 아이디어들과 PEP 587 공개 API에 대한 피드백, 그리고 임베딩 및 서브인터프리터 친화적인 CPython 구현을 조정하는 과정에서 얻은 교훈을 고려하여 새로운 PEP(또는 여러 PEP)로 다시 작성하는 것이 가장 적절하다고 판단했기 때문입니다.

특히 다음과 같은 변경 사항을 제안하는 PEP와 이를 가능하게 하는 추가 인프라 변경 사항은 여전히 탐구할 가치가 있을 것입니다.
*   모든 사용자 수준 설정을 무시하고 기본적으로 격리 모드(isolated mode)로 실행되는 대체 Python 실행 파일을 제공하여, 기본 인터프리터보다 시스템 수준 Python 애플리케이션 실행에 더 적합하도록 만듭니다.
*   `zipapp` 모듈을 강화하여 순수 Python 스크립트(및 다단계 확장 모듈 초기화 도입 시 Python 확장 모듈까지)로부터 단일 파일 실행 파일을 생성하는 것을 지원합니다.
*   복잡한 `sys.path` 초기화 로직을 C 코드에서 Python 코드로 마이그레이션하여 테스트 스위트 커버리지 및 코드의 일반적인 유지보수성을 향상시킵니다.

## 제안 내용 (Proposal)

이 PEP는 CPython 런타임의 초기화를 세 가지 명확하고 독립적으로 구성 가능한 단계로 나눌 것을 제안합니다.

1.  **Python 코어 런타임 사전 초기화 (Core runtime preinitialization)**
    *   메모리 관리 설정
    *   시스템 인터페이스에 사용되는 인코딩 결정 (이후 구성 단계에 전달될 설정 포함)
2.  **Python 코어 런타임 초기화 (Core runtime initialization)**
    *   C API가 사용할 준비가 되었는지 확인
    *   내장(builtin) 및 동결된(frozen) 모듈에 접근 가능한지 확인
3.  **메인 인터프리터 구성 (Main interpreter configuration)**
    *   외부 모듈에 접근 가능한지 확인 (이 단계의 이름은 변경될 가능성이 높습니다.)

또한, 메인 모듈 실행 및 서브인터프리터(subinterpreter) 초기화에 영향을 미치는 변경 사항도 제안됩니다.

새로운 설계에서 인터프리터는 초기화 시퀀스 동안 다음과 같은 잘 정의된 단계를 거치게 됩니다.

*   **Uninitialized (초기화되지 않음):** 사전 초기화 단계조차 시작하지 않은 상태.
*   **Pre-Initialization (사전 초기화):** 인터프리터가 아직 없는 상태.
*   **Runtime Initialized (런타임 초기화됨):** 메인 인터프리터가 부분적으로 사용 가능하며, 서브인터프리터 생성이 아직 불가능한 상태.
*   **Initialized (초기화됨):** 메인 인터프리터가 완전히 사용 가능하며, 서브인터프리터 생성이 가능한 상태.

PEP 587은 `Pre-Initialization` 단계를 나머지 두 단계와 분리하는 것을 다루는 더 상세한 제안이지만, 임베딩 애플리케이션이 "Runtime Initialized" 상태에서 임의의 코드를 실행하는 것을 허용하지 않습니다. (대신, 코어 런타임을 초기화하면 항상 메인 인터프리터도 완전히 초기화됩니다. 이는 Python 3.8의 기본 CPython CLI 동작 방식입니다.)

## 배경 (Background)

시간이 지남에 따라 CPython의 초기화 시퀀스는 점차 복잡해졌으며, 더 많은 옵션을 제공하고 더 복잡한 작업(예: Python 3에서 OS 인터페이스용 Unicode 설정 구성, 임포트 시스템의 순수 Python 구현 부트스트랩, 높은 권한으로 실행되는 시스템 애플리케이션에 더 적합한 격리 모드 구현)을 수행하게 되었습니다.

이러한 복잡성의 대부분은 `Py_Main` 및 `Py_Initialize` API를 통해서만 공식적으로 접근할 수 있어, 임베딩 애플리케이션에 사용자 정의(customization) 기회가 거의 없었습니다. 이처럼 점진적으로 증가하는 복잡성은 유지보수자들에게도 어려움을 야기합니다. 구성 작업의 상당 부분이 `Py_Initialize` 호출 이전에 이루어져야 하므로, Python C API의 상당 부분을 안전하게 사용할 수 없게 됩니다.

이러한 문제를 해결하기 위해, 이 PEP는 더 복잡한 시스템에 계속해서 기능을 추가하는 대신, 더 구조화된 시작 시퀀스를 도입하여 현재 상태를 단순화하고 향후 기능 요청을 더 쉽게 구현할 수 있도록 하는 것을 목표로 합니다.

## 주요 고려 사항 (Key Concerns)

시작 시퀀스에 대한 모든 변경은 몇 가지 주요 고려 사항을 염두에 두어야 합니다.

### 유지보수성 (Maintainability)
Python 3.6 기준 CPython 시작 시퀀스는 이해하기 어려웠고 수정하기는 더욱 어려웠습니다. 초기화 코드의 많은 부분이 실행되는 동안 인터프리터가 어떤 상태에 있는지 명확하지 않아, `-X` 또는 `-W` 옵션이 사용될 때 `Py_Initialize` 호출 이전에 `List`, `Dict`, `Unicode` 값 등이 생성되는 등의 동작이 발생했습니다.

명시적인 다단계 시작 시퀀스로 전환함으로써 개발자는 다음 사항만 이해하면 됩니다.
*   사전 구성 이전에 사용 가능한 API 및 기능 (기본적으로 사전 구성 API 자체를 제외하고는 없음).
*   코어 런타임 구성 이전에 사용 가능한 API 및 기능 (사전 구성이 명시적으로 실행되지 않은 경우 Python 3.6의 동작과 일치하는 기본 설정으로 사전 구성을 암시적으로 실행함).
*   메인 인터프리터가 완전히 구성된 후에만 사용 가능한 API 및 기능 (전체 C API 중 상대적으로 작은 하위 집합이기를 바람).

새로운 설계는 C 구조체와 Python 데이터 타입의 조합을 기반으로 하여, 향후 새로운 구성 옵션을 추가하기 위해 시스템을 수정하기 더 쉽게 만들 것입니다.

### 테스트 용이성 (Testability)
CPython 시작 시퀀스의 복잡성으로 인한 문제 중 하나는 서로 다른 구성 설정 간의 가능한 상호 작용이 기하급수적으로 증가한다는 것입니다.

이러한 우려는 새로운 초기화 시스템의 설계와 목표에 도달하기 위한 제안된 접근 방식 모두에 영향을 미칩니다.

### 성능 (Performance)
CPython은 런타임이 인터프리터 초기화 시간에 의해 지배되는 짧은 스크립트를 실행하는 데 많이 사용됩니다. 시작 시퀀스에 대한 모든 변경은 시작 오버헤드에 미치는 영향을 최소화해야 합니다.

이 PEP는 주로 기존 초기화 시퀀스의 순서를 재정렬하는 것을 목표로 하며 개별 단계에 실질적인 변경을 가하지 않으므로, 시작 시간에 큰 영향을 미치지 않을 것으로 예상됩니다.

## 구현 전략 (Implementation Strategy)
초기에는 이 PEP의 이전 버전을 Python 3.4용으로 구현하려는 시도가 있었으나, 리팩토링 프로세스를 시작하기 위해 초기 구조적 변경을 적용한 후 병합 충돌(merge conflicts)이 발생하는 등 상당한 문제에 직면했습니다.

이에 따라 구현 전략은 CPython 3.7의 비공개 API로 이 리팩토링을 먼저 구현한 다음, CPython 3.8에서 새로운 함수와 구조체를 공개 API 요소로 노출할 타당성을 검토하는 방향으로 수정되었습니다.

빅터 스티너(Victor Stinner)는 PEP 540 UTF-8 모드 변경 사항(이전에 로케일 인코딩으로 디코딩되었던 모든 설정을 추적하고 UTF-8로 다시 디코딩할 수 있는 기능이 필요했음)을 성공적으로 구현하기 위해 설정을 새 구조로 마이그레이션했습니다. 에릭 스노우(Eric Snow) 또한 서브인터프리터 기능을 더욱 견고하게 만드는 과정에서 여러 내부 서브시스템을 마이그레이션했습니다.

이러한 작업은 이 PEP에서 원래 제안된 상세 설계에 여러 가지 실제적인 문제가 있음을 보여주었으며, 빅터는 개선된 비공개 API(이 PEP의 초기 반복에서 영감을 받음)를 설계하고 구현했으며, PEP 587은 이를 Python 3.8의 공개 API로 승격할 것을 제안합니다.

## 설계 세부 사항 (Design Details)

이 제안의 주요 목표는 시작 프로세스의 훨씬 초기 단계에서 코어 언어 런타임을 초기화하고 메인 인터프리터를 위한 부분적으로 초기화된 인터프리터 상태를 만드는 것입니다. 이를 통해 CPython API의 대부분이 나머지 초기화 프로세스 동안 사용될 수 있으며, 현재 CPython C API가 제공하는 풍부한 데이터 구조를 사용할 수 없어 기본 C 기능에 의존해야 하는 여러 작업을 잠재적으로 단순화할 수 있습니다.

PEP 587은 기존의 "Py_Initialize 호출 이전에 호출될 수 있는" 인터페이스에 필요한 구성 요소(예: 메모리 할당자 및 운영 체제 인터페이스 인코딩 세부 정보)를 별도의 사전 구성 단계로 분리하는 작업을 다룹니다.

### 인터프리터 초기화 단계 (Interpreter Initialization Phases)

다음과 같은 명확한 인터프리터 초기화 단계가 제안됩니다.

*   **Uninitialized (초기화되지 않음):**
    *   실제 단계라기보다는 단계의 부재를 의미합니다.
    *   `Py_IsInitializing()`, `Py_IsRuntimeInitialized()`, `Py_IsInitialized()`는 모두 `0`을 반환합니다.
    *   임베딩 애플리케이션이 사용할 메모리 할당자와 운영 체제 인터페이스에 접근하는 데 사용할 인코딩을 결정합니다 (또는 Python 런타임에 이러한 결정을 위임합니다).
    *   `Py_PreInitialize` API 중 하나를 호출하여 초기화 프로세스를 시작합니다 (PEP 587 참조).
*   **Runtime Pre-Initialization (런타임 사전 초기화):**
    *   인터프리터가 아직 없습니다.
    *   `Py_IsInitializing()`는 `1`을, `Py_IsRuntimeInitialized()` 및 `Py_IsInitialized()`는 `0`을 반환합니다.
    *   임베딩 애플리케이션이 코어 CPython 런타임을 초기화하고 메인 인터프리터를 생성하는 데 필요한 설정을 결정하고 `Py_InitializeRuntime`을 호출하여 다음 단계로 넘어갑니다.
    *   **참고:** PEP 587에 따라 임베딩 애플리케이션은 대신 `Py_Main()`, `Py_UnixMain` 또는 `Py_Initialize` API 중 하나를 호출하여 `Initialized` 상태로 직접 이동합니다.
*   **Main Interpreter Initialization (메인 인터프리터 초기화):**
    *   내장(builtin) 데이터 타입 및 기타 코어 런타임 서비스가 사용 가능합니다.
    *   메인 인터프리터가 사용 가능하지만 부분적으로만 구성되었습니다.
    *   `Py_IsInitializing()`는 `1`을, `Py_IsRuntimeInitialized()`는 `1`을, `Py_IsInitialized()`는 `0`을 반환합니다.
    *   임베딩 애플리케이션이 `Py_InitializeMainInterpreter`를 호출하여 초기화 프로세스를 완료하는 데 필요한 설정을 결정하고 적용합니다.
    *   **참고:** PEP 587에 따라 이 상태는 어떠한 공개 API로도 도달할 수 없으며, `Py_Initialize` 함수 중 하나가 실행되는 동안 암시적인 내부 상태로만 존재합니다.
*   **Initialized (초기화됨):**
    *   메인 인터프리터가 사용 가능하며 완전히 작동하지만, `__main__` 관련 메타데이터가 불완전합니다.
    *   `Py_IsInitializing()`는 `0`을, `Py_IsRuntimeInitialized()`는 `1`을, `Py_IsInitialized()`는 `1`을 반환합니다.

### 런타임 사전 초기화 단계 (Runtime Pre-Initialization Phase)
이 단계는 CPython 런타임이 전혀 초기화되기 전에 반드시 필요한 설정을 임베딩 애플리케이션이 결정하는 단계입니다. 현재 이 범주에 속하는 주요 구성 설정은 무작위 해시(randomised hash) 알고리즘과 관련된 것입니다. 해시 알고리즘은 프로세스 수명 동안 일관성이 유지되어야 하므로, 코어 인터프리터가 생성되기 전에 적용되어야 합니다.

제안된 API는 다음과 같습니다.
*   `PyInitError Py_InitializeRuntime(const PyRuntimeConfig *config);`
*   `PyInitError Py_InitializeRuntimeFromArgs(const PyRuntimeConfig *config, int argc, char **argv);`
*   `PyInitError Py_InitializeRuntimeFromWideArgs(const PyRuntimeConfig *config, int argc, wchar_t **argv);`

새로운 `PyRuntimeConfig` 구조체는 코어 런타임의 예비 구성 및 메인 인터프리터 생성을 위한 설정을 담습니다. 이 구조체에는 `use_environment`, `use_hash_seed`, `hash_seed`, `_install_importlib` 등의 필드가 포함됩니다.

## 하위 호환성 (Backwards Compatibility)
하위 호환성은 주로 `Py_BuildPythonConfig()`가 이전에 정의된 전역 변수 및 환경 변수에 저장된 모든 구성 설정을 조회하고, `Py_InitializeMainInterpreter()`가 영향을 받는 설정을 관련 위치에 다시 기록하도록 함으로써 유지됩니다.

일부 환경 변수(예: `PYTHONCASEOK`)는 현재 지연 로드되지만, 인터프리터 초기화 중에 한 번 읽힐 수 있다는 점은 비호환성으로 인정됩니다.

`Py_Initialize()` 방식의 초기화는 계속 지원됩니다. 내부적으로는 새로운 API의 일부 요소를 사용하겠지만, 현재와 동일한 동작을 유지하여 `sys.argv`가 후속 `PySys_SetArgv` 호출 전까지 채워지지 않도록 합니다. `Py_Initialize()` 이전에 호출을 지원하는 모든 API는 계속해서 이를 지원하며, `Py_InitializeRuntime()` 이전 호출도 지원할 것입니다.

## 시스템 Python 실행 파일 (A System Python Executable)

시스템에 대한 관리자 권한으로 시스템 유틸리티를 실행할 때, CPython의 많은 기본 동작은 바람직하지 않습니다. 이는 신뢰할 수 없는 코드가 높은 권한으로 실행될 수 있기 때문입니다. 가장 문제가 되는 측면은 사용자 사이트 디렉토리(user site directories)가 활성화되고, 환경 변수가 신뢰되며, 실행된 파일이 포함된 디렉토리가 임포트 경로의 시작 부분에 배치된다는 점입니다.

이 PEP는 이러한 문제를 해결하기 위해 별도의 `system-python` 실행 파일을 추가할 것을 제안합니다.
현재는 다른 기본 동작을 가진 별도의 실행 파일을 제공하는 것이 유지보수하기 너무 어렵습니다. 이 PEP의 목표 중 하나는 유지보수하기 어려운 부트스트랩(bootstrapping) 코드의 많은 부분을 일반 CPython 코드로 대체할 수 있도록 하고, 별도의 애플리케이션이 `Py_Main`의 핵심 구성 요소를 더 쉽게 사용할 수 있도록 하는 것입니다.

---

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.