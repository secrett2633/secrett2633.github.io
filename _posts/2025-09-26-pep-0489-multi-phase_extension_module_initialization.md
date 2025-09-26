---
title: "[Final] PEP 489 - Multi-phase extension module initialization"
excerpt: "Python Enhancement Proposal 489: 'Multi-phase extension module initialization'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/489/
toc: true
toc_sticky: true
date: 2025-09-26 22:35:12+0900
last_modified_at: 2025-09-26 22:35:12+0900
published: true
---
> **원문 링크:** [PEP 489 - Multi-phase extension module initialization](https://peps.python.org/pep-0489/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 11-Aug-2013


# PEP 489 – 다단계 확장 모듈 초기화

## 개요 (Abstract)

이 PEP는 내장(built-in) 및 확장 모듈(extension module)이 임포트(import) 메커니즘과 상호작용하는 방식을 재설계할 것을 제안합니다. 이 방식은 Python 3.0에서 PEP 3121을 통해 마지막으로 개정되었지만, 당시의 모든 문제를 해결하지는 못했습니다. 목표는 확장 모듈을 Python 모듈의 동작 방식에 더 가깝게 만듦으로써 임포트 관련 문제를 해결하는 것입니다. 특히 PEP 451에서 도입된 `ModuleSpec` 기반 로딩 메커니즘에 연결하는 것을 목표로 합니다.

이 제안은 PEP 384의 `PyType_Spec`에서 영감을 받아 확장 모듈 개발자가 필요한 기능만 정의할 수 있도록 하고, 향후 확장 모듈 선언에 추가 기능을 도입할 수 있도록 합니다.

확장 모듈은 클래스의 `__new__`와 `__init__`에 비유될 수 있는 두 단계 프로세스로 생성되어, `ModuleSpec` 아키텍처에 더 잘 들어맞습니다.

새로운 방식을 통해 확장 모듈은 일반 가비지 컬렉션(garbage collection)의 대상이 되고, 재로드(reloading) 및 서브 인터프리터(sub-interpreters)를 지원하는 C-레벨 모듈별 상태를 안전하게 저장할 수 있습니다. 확장 모듈 개발자들은 새로운 API를 사용할 때 이러한 문제를 고려할 것을 권장합니다.

또한 이 제안은 비(非) ASCII 이름을 가진 확장 모듈도 허용합니다.

PEP 3121에서 다루었던 모든 문제가 이 제안에서 해결되는 것은 아닙니다. 특히 런타임 모듈 조회(`PyState_FindModule`)와 관련된 문제는 향후 PEP로 남겨둡니다.

## 동기 (Motivation)

Python 모듈과 확장 모듈은 동일한 방식으로 설정되지 않습니다. Python 모듈의 경우, 모듈 객체가 먼저 생성되고 설정된 다음 모듈 코드가 실행됩니다 (PEP 302). `ModuleSpec` 객체 (PEP 451)는 모듈에 대한 정보를 담는 데 사용되며 관련 훅(hook)에 전달됩니다.

확장 모듈 (즉, 공유 라이브러리) 및 내장 모듈의 경우, 모듈 초기화 함수가 즉시 실행되어 생성과 초기화를 모두 수행합니다. 초기화 함수에는 `ModuleSpec`이나 `__file__`, 완전한 이름(fully-qualified name)과 같은 포함된 정보가 전달되지 않습니다. 이로 인해 상대 임포트(relative imports) 및 리소스 로딩이 방해받습니다.

Python 3에서는 모듈이 `sys.modules`에 추가되지 않는 문제도 있습니다. 이는 (잠재적으로 전이적인) 모듈의 재임포트가 실제로 다시 임포트하려고 시도하여, 모듈 초기화 함수를 다시 실행할 때 무한 루프에 빠질 수 있음을 의미합니다. 완전한 모듈 이름에 접근할 수 없으면 모듈을 `sys.modules`에 올바르게 추가하는 것도 쉽지 않습니다. 이는 특히 Cython으로 생성된 모듈에 문제가 되는데, 해당 모듈의 초기화 코드가 일반 Python 모듈과 동일한 복잡성을 가질 때가 흔합니다. 또한 `__file__` 및 `__name__` 정보가 없으면 `__init__.py` 모듈, 즉 패키지 컴파일을 방해하며, 특히 모듈 초기화 시점에 상대 임포트가 사용될 때 더욱 그렇습니다.

더 나아가, 현재 존재하는 대부분의 확장 모듈은 서브 인터프리터 지원 및/또는 인터프리터 재로드에 문제가 있으며, 현재 인프라로 이러한 기능을 지원하는 것이 가능하더라도 쉽거나 효율적이지 않습니다. 이러한 문제를 해결하는 것이 PEP 3121의 목표였지만, 표준 라이브러리의 일부를 포함한 많은 확장 모듈은 Python 3로 포팅할 때 최소한의 노력을 기울여 이러한 문제가 해결되지 않은 채로 남았습니다. 이 PEP는 이전 버전과의 호환성을 유지하여 부담을 줄이고 확장 모듈 개발자가 포팅 시 이러한 문제를 고려할 충분한 시간을 제공해야 합니다.

## 현재 프로세스 (The current process)

현재 확장 및 내장 모듈은 공유 라이브러리의 파일 이름을 따서 명명된 "PyInit_modulename"이라는 초기화 함수를 내보냅니다. 이 함수는 임포트 메커니즘에 의해 실행되며 완전히 초기화된 모듈 객체를 반환해야 합니다. 이 함수는 인수를 받지 않으므로 임포트 컨텍스트를 알 수 있는 방법이 없습니다.

실행 중에 모듈 초기화 함수는 `PyModuleDef` 객체를 기반으로 모듈 객체를 생성합니다. 그런 다음 모듈 딕셔너리에 속성을 추가하고, 타입을 생성하는 등으로 모듈을 계속 초기화합니다.

내부적으로 공유 라이브러리 로더는 마지막으로 로드된 모듈의 완전한 모듈 이름을 기록해 두고, 해당 이름과 일치하는 모듈이 생성되면 이 전역 변수를 사용하여 모듈 객체의 완전한 이름을 결정합니다. 이는 모듈 초기화 함수가 먼저 자체 모듈 객체를 생성한다는 가정에 의존하므로 완전히 안전하지 않지만, 실제로는 일반적으로 이 가정이 유지됩니다.

## 제안 (The proposal)

초기화 함수 (`PyInit_modulename`)는 `PyModuleDef` 객체에 대한 포인터를 반환할 수 있도록 허용됩니다. 임포트 메커니즘은 모듈 객체를 구성하는 역할을 담당하며, 초기화의 관련 단계에서 (아래 설명된 대로) `PyModuleDef`에 제공된 훅을 호출합니다.

이 다단계 초기화는 추가적인 가능성입니다. 완전히 초기화된 모듈 객체를 반환하는 현재 방식인 단일 단계 초기화는 계속 허용되므로, 기존 코드는 바이너리 호환성을 포함하여 변경 없이 작동할 것입니다.

`PyModuleDef` 구조체는 PEP 384의 `PyType_Spec`과 유사하게 슬롯(slots) 목록을 포함하도록 변경될 것입니다. 바이너리 호환성을 유지하고 새로운 구조체 도입을 피하기 위해 (`m_reload`의 현재 사용되지 않는 포인터가 슬롯을 담도록 변경됩니다. 이는 추가 지원 함수와 모듈별 저장소를 도입할 필요를 방지합니다). 구조체는 다음과 같이 정의됩니다.

```c
typedef struct {
    int slot;
    void *value;
} PyModuleDef_Slot;

typedef struct PyModuleDef {
    PyModuleDef_Base m_base;
    const char* m_name;
    const char* m_doc;
    Py_ssize_t m_size;
    PyMethodDef *m_methods;
    PyModuleDef_Slot *m_slots; /* 'inquiry m_reload;'에서 변경됨 */
    traverseproc m_traverse;
    inquiry m_clear;
    freefunc m_free;
} PyModuleDef;
```
`m_slots` 멤버는 `NULL`이거나, ID가 0으로 설정된 슬롯(`{0, NULL}`)으로 끝나는 `PyModuleDef_Slot` 구조체 배열을 가리켜야 합니다.

슬롯을 지정하려면 고유한 슬롯 ID를 제공해야 합니다. 새로운 Python 버전은 새로운 슬롯 ID를 도입할 수 있지만, 슬롯 ID는 재활용되지 않습니다. 슬롯은 사용되지 않게 될 수 있지만, Python 3.x 전체에서 계속 지원됩니다.

슬롯의 `value` 포인터는 슬롯 문서에서 달리 지정되지 않는 한 `NULL`이 아닐 수 있습니다.

현재 사용 가능한 슬롯은 다음과 같으며, 나중에 설명됩니다.
- `Py_mod_create`
- `Py_mod_exec`

알 수 없는 슬롯 ID는 `SystemError`와 함께 임포트를 실패하게 합니다.

다단계 초기화를 사용할 때 `PyModuleDef`의 `m_name` 필드는 임포트 중에 사용되지 않습니다. 모듈 이름은 `ModuleSpec`에서 가져옵니다.

`PyInit_*`에서 반환되기 전에 `PyModuleDef` 객체는 새로 추가된 `PyModuleDef_Init` 함수를 사용하여 초기화되어야 합니다. 이 함수는 객체 타입 (특정 컴파일러에서는 정적으로 수행할 수 없음), 참조 카운트, 내부 관리 데이터 (`m_index`)를 설정합니다. 예를 들어, 확장 모듈 "example"은 다음과 같이 내보내집니다.

```c
static PyModuleDef example_def = {...}

PyMODINIT_FUNC PyInit_example(void) {
    return PyModuleDef_Init(&example_def);
}
```
`PyModuleDef` 객체는 해당 객체로부터 생성된 모듈의 수명 동안 사용 가능해야 합니다. 일반적으로 정적으로 선언될 것입니다.

## 의사 코드 개요 (Pseudo-code Overview)

수정된 임포터가 어떻게 작동할지에 대한 개요입니다. 로깅이나 오류 및 유효하지 않은 상태 처리와 같은 세부 사항은 생략되었으며, C 코드는 간결한 Python과 유사한 구문으로 제공됩니다.

임포터를 호출하는 프레임워크는 PEP 451에 설명되어 있습니다.

*(원문의 의사 코드 예시는 너무 길어 여기에 모두 번역하지 않습니다. 핵심은 `BuiltinImporter`와 `ExtensionFileLoader`가 `create_module`과 `exec_module`을 구현하고, `PyModule_FromDefAndSpec` 함수가 `PyModuleDef`와 `ModuleSpec`을 받아 모듈을 생성하며, `PyModule_ExecDef` 함수가 모듈의 실행 슬롯을 처리한다는 것입니다.)*

## 모듈 생성 단계 (Module Creation Phase)

모듈 객체 생성, 즉 `ExecutionLoader.create_module`의 구현은 `Py_mod_create` 슬롯에 의해 제어됩니다.

### `Py_mod_create` 슬롯

`Py_mod_create` 슬롯은 사용자 정의 모듈 서브클래스를 지원하는 데 사용됩니다. `value` 포인터는 다음 시그니처를 가진 함수를 가리켜야 합니다.

```c
PyObject* (*PyModuleCreateFunction)(PyObject *spec, PyModuleDef *def)
```
이 함수는 PEP 451에 정의된 `ModuleSpec` 인스턴스와 `PyModuleDef` 구조체를 받습니다. 새 모듈 객체를 반환하거나, 오류를 설정하고 `NULL`을 반환해야 합니다.

이 함수는 새 모듈에 PEP 451에 지정된 임포트 관련 속성(예: `__name__` 또는 `__loader__`)을 설정할 책임이 없습니다.

반환된 객체가 `types.ModuleType`의 인스턴스여야 한다는 요구 사항은 없습니다. 속성 설정 및 가져오기(최소한 임포트 관련 속성 포함)를 지원하는 한 모든 타입을 사용할 수 있습니다. 그러나 `ModuleType` 인스턴스만 모듈별 기능(예: 모듈별 상태 및 실행 슬롯 처리)을 지원합니다. `ModuleType` 서브클래스 이외의 것이 반환되면 실행 슬롯을 정의할 수 없으며, 정의될 경우 `SystemError`가 발생합니다.

이 함수가 호출될 때 모듈의 `sys.modules` 항목이 아직 채워지지 않는다는 점에 유의하십시오. 동일한 모듈을 다시 임포트하려고 시도하면 (전이적으로라도) 무한 루프가 발생할 수 있습니다. 확장 모듈 개발자는 `Py_mod_create`를 최소한으로 유지하고, 특히 사용자 코드를 호출하지 않도록 조언됩니다.

여러 `Py_mod_create` 슬롯은 지정할 수 없습니다. 지정될 경우 임포트가 `SystemError`와 함께 실패합니다.

`Py_mod_create`가 지정되지 않으면 임포트 메커니즘은 `PyModule_New`를 사용하여 일반 모듈 객체를 생성합니다. 이름은 `spec`에서 가져옵니다.

### 생성 후 단계 (Post-creation steps)

`Py_mod_create` 함수가 `types.ModuleType` 또는 서브클래스의 인스턴스를 반환하거나 (`Py_mod_create` 슬롯이 없는 경우), 임포트 메커니즘은 `PyModuleDef`를 모듈과 연결합니다. 이로 인해 `PyModuleDef`는 실행 단계, `PyModule_GetDef` 함수 및 가비지 컬렉션 루틴(traverse, clear, free)에서 접근 가능해집니다.

`Py_mod_create` 함수가 모듈 서브클래스를 반환하지 않는 경우, `m_size`는 0이어야 하고 `m_traverse`, `m_clear`, `m_free`는 모두 `NULL`이어야 합니다. 그렇지 않으면 `SystemError`가 발생합니다.

또한, `PyModuleDef`에 지정된 초기 속성은 타입에 관계없이 모듈 객체에 설정됩니다.
- Docstring은 `m_doc`이 `NULL`이 아니면 설정됩니다.
- 모듈의 함수는 `m_methods`가 있으면 초기화됩니다.

## 모듈 실행 단계 (Module Execution Phase)

모듈 실행, 즉 `ExecutionLoader.exec_module`의 구현은 "실행 슬롯"에 의해 제어됩니다. 이 PEP는 `Py_mod_exec` 하나만 추가하지만, 향후 다른 슬롯이 추가될 수 있습니다.

실행 단계는 모듈 객체와 연결된 `PyModuleDef`에서 수행됩니다. `PyModule_Type`의 서브클래스가 아닌 객체 (PyModule_GetDef가 실패하는 경우)의 경우 실행 단계는 건너뜁니다.

실행 슬롯은 여러 번 지정될 수 있으며, 슬롯 배열에 나타나는 순서대로 처리됩니다. 기본 임포트 메커니즘을 사용할 때, 이들은 PEP 451에 지정된 임포트 관련 속성(예: `__name__` 또는 `__loader__`)이 설정되고 모듈이 `sys.modules`에 추가된 후에 처리됩니다.

### 실행 전 단계 (Pre-Execution steps)

실행 슬롯을 처리하기 전에 모듈에 대한 모듈별 상태가 할당됩니다. 이 시점부터 모듈별 상태는 `PyModule_GetState`를 통해 접근할 수 있습니다.

### `Py_mod_exec` 슬롯

이 슬롯의 항목은 다음 시그니처를 가진 함수를 가리켜야 합니다.

```c
int (*PyModuleExecFunction)(PyObject* module)
```
이 함수는 모듈을 초기화하기 위해 호출됩니다. 일반적으로 이는 모듈의 초기 속성을 설정하는 것을 의미합니다. "module" 인수는 초기화할 모듈 객체를 받습니다.

함수는 성공 시 0을 반환해야 하며, 오류 시 예외를 설정하고 -1을 반환해야 합니다.

`PyModuleExec`가 `sys.modules`의 모듈 항목을 대체하면, 모든 실행 슬롯이 처리된 후 새 객체가 임포트립(importlib) 메커니즘에 의해 사용되고 반환될 것입니다. 이는 임포트 메커니즘 자체의 기능입니다. 슬롯 자체는 모두 생성 단계에서 반환된 모듈을 사용하여 처리됩니다. 실행 단계 동안 `sys.modules`는 조회되지 않습니다. (확장 모듈의 경우 사용자 정의 모듈 객체를 사용하려면 `Py_mod_create`를 구현하는 것이 일반적으로 더 나은 해결책입니다.)

## 레거시 초기화 (Legacy Init)

이전 버전과의 호환성을 유지하는 단일 단계 초기화는 계속 지원됩니다. 이 방식에서는 `PyInit` 함수가 `PyModuleDef` 객체 대신 완전히 초기화된 모듈을 반환합니다. 이 경우 `PyInit` 훅은 생성 단계를 구현하며, 실행 단계는 아무것도 하지 않습니다(no-op).

이전 버전의 Python에서 변경 없이 작동해야 하는 모듈은 단일 단계 초기화를 고수해야 합니다. 왜냐하면 다단계 초기화가 제공하는 이점은 이전 버전으로 백포팅할 수 없기 때문입니다.

*(원문의 예시 코드는 C 코드이므로 번역하지 않고 생략합니다. 핵심은 `Py_mod_exec` 매크로의 존재 여부에 따라 다단계 초기화를 지원하거나 단일 단계 초기화로 폴백하는 방식을 보여줍니다.)*

## 내장 모듈 (Built-In modules)

어떤 확장 모듈이든 실행 파일에 링크하고 `inittab`에 포함시켜 (런타임에 `PyImport_AppendInittab`을 사용하거나, 설정 시 `freeze`와 같은 도구를 사용하여) 내장 모듈로 사용할 수 있습니다.

이러한 가능성을 유지하기 위해 이 PEP에서 도입된 확장 모듈 로딩의 모든 변경 사항은 내장 모듈에도 적용될 것입니다. 유일한 예외는 아래에서 설명할 비(非) ASCII 모듈 이름입니다.

## 서브 인터프리터 및 인터프리터 재로드 (Subinterpreters and Interpreter Reloading)

새로운 초기화 방식을 사용하는 확장 모듈은 Python 문서에 언급된 문제를 피하면서 서브 인터프리터 및 여러 `Py_Initialize` / `Py_Finalize` 사이클을 올바르게 지원할 것으로 예상됩니다. 이 메커니즘은 이를 쉽게 만들도록 설계되었지만, 확장 모듈 개발자 측에서는 여전히 주의가 필요합니다. 사용자 정의 함수, 메서드 또는 인스턴스가 다른 인터프리터로 유출되어서는 안 됩니다. 이를 달성하기 위해 모든 모듈 수준 상태는 모듈 딕셔너리 또는 `PyModule_GetState`로 접근 가능한 모듈 객체의 저장소에 보관되어야 합니다. 간단한 규칙은 다음과 같습니다: 변경 가능한 또는 사용자 설정 가능한 클래스 속성이 없는 내장 타입을 제외하고는 어떤 정적 데이터도 정의하지 마십시오.

## 다단계 초기화와 호환되지 않는 함수 (Functions incompatible with multi-phase initialization)

`PyModule_Create` 함수는 `non-NULL m_slots` 포인터를 가진 `PyModuleDef` 구조체에 사용될 때 실패합니다. 이 함수는 다단계 초기화에 필요한 `ModuleSpec` 객체에 접근할 수 없습니다.

`PyState_FindModule` 함수는 `NULL`을 반환하고, `PyState_AddModule` 및 `PyState_RemoveModule`도 `non-NULL m_slots`를 가진 모듈에서 실패할 것입니다. `PyState` 등록은 동일한 `PyModuleDef`에서 여러 모듈 객체가 생성될 수 있기 때문에 비활성화됩니다.

## 모듈 상태 및 C-레벨 콜백 (Module state and C-level callbacks)

`PyState_FindModule`를 사용할 수 없기 때문에 모듈 수준 상태(모듈 수준에서 정의된 함수, 클래스 또는 예외 포함)에 접근해야 하는 모든 함수는 모듈 객체(또는 필요한 특정 객체)에 대한 참조를 직접 또는 간접적으로 받아야 합니다. 이는 현재 두 가지 상황에서 어렵습니다.
- 클래스의 메서드는 클래스에 대한 참조를 받지만, 클래스의 모듈에 대한 참조는 받지 않습니다.
- C-레벨 콜백을 사용하는 라이브러리는 콜백 등록 시 사용자 정의 데이터를 받을 수 없는 한 어렵습니다.

이러한 경우를 수정하는 것은 이 PEP의 범위를 벗어나지만, 새로운 메커니즘이 모든 모듈에 유용하려면 필요할 것입니다. 적절한 수정 사항은 `import-sig` 메일링 리스트에서 논의되었습니다 [5, cite: 1].

일반적인 규칙으로, `PyState_FindModule`에 의존하는 모듈은 현재 새로운 메커니즘으로 포팅하기에 좋은 후보가 아닙니다.

## 새로운 함수 (New Functions)

모듈 생성 단계를 구현하는 새로운 함수와 매크로가 추가될 것입니다. 이들은 `PyModule_Create` 및 `PyModule_Create2`와 유사하지만, 추가적인 `ModuleSpec` 인수를 취하고 `non-NULL` 슬롯을 가진 모듈 정의를 처리합니다.

- `PyObject * PyModule_FromDefAndSpec(PyModuleDef *def, PyObject *spec)`
- `PyObject * PyModule_FromDefAndSpec2(PyModuleDef *def, PyObject *spec, int module_api_version)`

모듈 실행 단계를 구현하는 새로운 함수가 추가될 것입니다. 이 함수는 모듈별 상태를 할당하고 (이미 할당되지 않은 경우) 항상 실행 슬롯을 처리합니다. 임포트 메커니즘은 모듈이 재로드되지 않는 한 모듈이 실행될 때 이 메서드를 호출합니다.

- `PyAPI_FUNC(int) PyModule_ExecDef(PyObject *module, PyModuleDef *def)`

`PyModuleDef` 객체를 초기화하는 또 다른 함수가 도입될 것입니다. 이 멱등(idempotent) 함수는 타입, 참조 카운트 및 모듈 인덱스를 채웁니다. 인수를 `PyObject*`로 캐스팅하여 반환하므로 `PyInit` 함수에서 직접 반환할 수 있습니다.

- `PyObject * PyModuleDef_Init(PyModuleDef *);`

또한, 모듈에 Docstring과 메서드를 설정하기 위한 두 가지 헬퍼 함수가 추가될 것입니다.

- `int PyModule_SetDocString(PyObject *, const char *)`
- `int PyModule_AddFunctions(PyObject *, PyMethodDef *)`

## 내보내기 훅 이름 (Export Hook Name)

이식 가능한 C 식별자는 ASCII로 제한되므로, 모듈 이름은 `PyInit` 훅 이름을 형성하기 위해 인코딩되어야 합니다.

ASCII 모듈 이름의 경우 임포트 훅은 `PyInit_<modulename>`으로 명명됩니다. 여기서 `<modulename>`은 모듈의 이름입니다.

비(非) ASCII 문자를 포함하는 모듈 이름의 경우 임포트 훅은 `PyInitU_<encodedname>`으로 명명됩니다. 여기서 이름은 CPython의 "punycode" 인코딩 (소문자 접미사가 있는 Punycode)을 사용하여 인코딩되며, 하이픈 ("-")은 밑줄 ("_")로 대체됩니다.

Python에서:
```python
def export_hook_name(name):
    try:
        suffix = b'_' + name.encode('ascii')
    except UnicodeEncodeError:
        suffix = b'U_' + name.encode('punycode').replace(b'-', b'_')
    return b'PyInit' + suffix
```
예시:

| 모듈 이름 | 초기화 훅 이름      |
| :---------- | :------------------- |
| spam        | `PyInit_spam`        |
| lančmít     | `PyInitU_lanmt_2sa6t` |
| スパム      | `PyInitU_zck5b2b`    |

비(非) ASCII 이름을 가진 모듈의 경우 단일 단계 초기화는 지원되지 않습니다.

이 PEP의 초기 구현에서는 비(非) ASCII 이름을 가진 내장 모듈은 지원되지 않을 것입니다.

## 모듈 재로드 (Module Reloading)

`importlib.reload()`를 사용하여 확장 모듈을 재로드하는 것은 임포트 관련 속성을 다시 설정하는 것을 제외하고는 계속해서 아무런 효과가 없을 것입니다.

공유 라이브러리 로딩의 제한(POSIX의 `dlopen`과 Windows의 `LoadModuleEx` 모두)으로 인해, 디스크에서 변경된 라이브러리를 일반적으로 다시 로드할 수 없습니다.

모듈의 새 버전을 시도하는 것 외에 재로드의 사용 사례는 드물기 때문에 모든 모듈 개발자가 재로드를 염두에 두어야 할 필요는 없습니다. 재로드와 유사한 기능이 필요한 경우, 개발자는 이를 위한 전용 함수를 내보낼 수 있습니다.

## 하나의 라이브러리에 여러 모듈 (Multiple modules in one library)

하나의 공유 라이브러리에 여러 Python 모듈을 지원하려면, 라이브러리는 라이브러리 파일 이름에 해당하는 것 외에 추가적인 `PyInit*` 심볼을 내보낼 수 있습니다.

이 메커니즘은 현재 추가 모듈을 로드하는 데만 사용될 수 있으며, 모듈을 찾는 데는 사용될 수 없다는 점에 유의하십시오. (이는 이 PEP에서 수정하려 하지 않는 로더 메커니즘의 한계입니다.) 적절한 파인더가 없는 문제를 해결하기 위해 다음과 같은 코드를 사용할 수 있습니다.

```python
import importlib.machinery
import importlib.util

loader = importlib.machinery.ExtensionFileLoader(name, path)
spec = importlib.util.spec_from_loader(name, loader)
module = importlib.util.module_from_spec(spec)
loader.exec_module(module)
return module
```
심볼릭 링크(symbolic links)를 지원하는 플랫폼에서는 이를 사용하여 하나의 라이브러리를 여러 이름으로 설치하여, 모든 내보내진 모듈을 일반 임포트 메커니즘에 노출할 수 있습니다.

## API 변경 및 추가 요약 (Summary of API Changes and Additions)

**새로운 함수:**
- `PyModule_FromDefAndSpec` (매크로)
- `PyModule_FromDefAndSpec2`
- `PyModule_ExecDef`
- `PyModule_SetDocString`
- `PyModule_AddFunctions`
- `PyModuleDef_Init`

**새로운 매크로:**
- `Py_mod_create`
- `Py_mod_exec`

**새로운 타입:**
- `PyModuleDef_Type`이 노출될 것입니다.

**새로운 구조체:**
- `PyModuleDef_Slot`

**기타 변경 사항:**
- `PyModuleDef.m_reload`가 `PyModuleDef.m_slots`로 변경됩니다.
- `BuiltinImporter` 및 `ExtensionFileLoader`는 이제 `create_module` 및 `exec_module`을 구현할 것입니다.
- 내부 `_imp` 모듈은 이전 버전과 호환되지 않는 변경 사항이 있을 것입니다: `create_builtin`, `create_dynamic`, `exec_dynamic`이 추가될 것이며, `init_builtin`, `load_dynamic`은 제거될 것입니다.
- 문서화되지 않은 함수 `imp.load_dynamic` 및 `imp.init_builtin`은 이전 버전과 호환되는 심(shim)으로 대체될 것입니다.

## 이전 버전과의 호환성 (Backwards Compatibility)

기존 모듈은 새 버전의 Python과 소스 및 바이너리 호환성을 계속 유지할 것입니다. 다단계 초기화를 사용하는 모듈은 이 PEP를 구현하지 않는 Python 버전과 호환되지 않을 것입니다.

`init_builtin` 및 `load_dynamic` 함수는 `_imp` 모듈에서 제거될 것입니다 (그러나 `imp` 모듈에서는 제거되지 않습니다).

모든 변경된 로더 (`BuiltinImporter` 및 `ExtensionFileLoader`)는 이전 버전과 호환성을 유지할 것입니다; `load_module` 메서드는 심으로 대체될 것입니다.

`Python/import.c` 및 `Python/importdl.c`의 내부 함수는 제거될 것입니다. (구체적으로는 `_PyImport_GetDynLoadFunc`, `_PyImport_GetDynLoadWindows`, `_PyImport_LoadDynamicModule`입니다.)

## 가능한 향후 확장 (Possible Future Extensions)

PEP 384의 `PyType_Slot`에서 영감을 받은 슬롯 메커니즘은 향후 확장을 가능하게 합니다.

일부 확장 모듈은 많은 상수를 내보냅니다. 예를 들어 `_ssl`은 다음과 같은 형태의 긴 호출 목록을 가지고 있습니다.

```c
PyModule_AddIntConstant(m, "SSL_ERROR_ZERO_RETURN", PY_SSL_ERROR_ZERO_RETURN);
```
이를 `PyMethodDef`와 유사한 선언적 목록으로 변환하면 상용구(boilerplate)를 줄이고, 종종 누락되는 무료 오류 검사를 제공할 수 있습니다.

문자열 상수(String constants) 및 타입도 유사하게 처리될 수 있습니다. (타입의 기본값이 아닌 기본(non-default bases)은 정적으로 이식 가능하게 지정될 수 없다는 점에 유의하십시오. 이 경우 슬롯이 추가되기 전에 실행되는 `Py_mod_exec` 함수가 필요합니다. 하지만 무료 오류 검사는 여전히 유용할 것입니다.)

또 다른 가능성은 모듈이 Python의 `-m` 스위치에 주어질 때 실행되는 "main" 함수를 제공하는 것입니다. 이를 위해서는 `runpy` 모듈이 PEP 451에서 도입된 `ModuleSpec` 기반 로딩을 활용하도록 수정되어야 합니다. 또한, 원래 정의되지 않은 슬롯에 따라 모듈을 설정하기 위한 메커니즘을 추가해야 할 것입니다.

## 구현 (Implementation)

진행 중인 구현은 GitHub 저장소에서 볼 수 있으며, 패치셋은에 있습니다.

## 이전 접근 방식 (Previous Approaches)

Stefan Behnel의 초기 프로토 PEP는 모듈 클래스를 생성하는 "PyInit_modulename" 훅을 가지고 있었고, 그 `__init__`가 모듈을 생성하기 위해 호출되었을 것입니다. 이 제안은 (당시에는 존재하지 않았던) PEP 451에 해당하지 않았는데, PEP 451에서는 모듈 생성과 초기화가 별개의 단계로 나뉘어 있습니다. 또한 기존 모듈 객체로 확장을 로드하는 것을 지원하지 않았습니다.

Alyssa (Nick) Coghlan은 "Create" 및 "Exec" 훅을 제안하고 프로토타입 구현을 작성했습니다. 이때 PEP 451은 아직 구현되지 않았으므로 프로토타입은 `ModuleSpec`을 사용하지 않습니다.

이 PEP의 원래 버전은 Create 및 Exec 훅을 사용했으며, Exec 훅을 사용하여 임의의 미리 구성된 객체로 로드하는 것을 허용했습니다. 이 제안은 확장 모듈 초기화를 Python 모듈이 초기화되는 방식에 더 가깝게 만들었지만, 나중에 이것이 중요한 목표가 아니라는 것이 인식되었습니다. 현재 PEP는 더 간단한 해결책을 설명합니다.

추가적인 반복에서는 `PyInit`가 기존 방식에 사용되고 `PyModuleExport`가 다단계 방식에 사용되는 `PyInit`에 대한 대안으로 "PyModuleExport" 훅을 사용했습니다. 그러나 모듈 이름을 기반으로 훅 이름을 결정할 수 없으면 `freeze`와 같은 도구에 의한 `PyImport_Inittab`의 자동 생성이 복잡해졌습니다. 정의를 내보내는 데 완전히 적절하지 않더라도 `PyInit` 훅 이름만 유지하는 것이 훨씬 더 간단한 해결책을 낳았습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.