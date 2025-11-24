---
title: "[Final] PEP 630 - Isolating Extension Modules"
excerpt: "Python Enhancement Proposal 630: 'Isolating Extension Modules'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/630/
toc: true
toc_sticky: true
date: 2025-09-27 01:13:23+0900
last_modified_at: 2025-09-27 01:13:23+0900
published: true
---
> **원문 링크:** [PEP 630 - Isolating Extension Modules](https://peps.python.org/pep-0630/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 25-Aug-2020


## PEP 630 – 확장 모듈 격리 (Isolating Extension Modules)

### 개요 (Abstract)
기존에는 Python 확장 모듈의 상태(state)가 프로세스 전역 범위(process-wide scope)를 가지는 C 정적 변수(static variables)에 저장되었습니다. 이 문서는 이러한 프로세스 전역 상태의 문제점과, 더 나은 기본값인 모듈별 상태(per-module state)를 가능하고 사용하기 쉽게 만들기 위한 노력에 대해 설명합니다.

또한, 가능한 경우 모듈별 상태로 전환하는 방법을 설명합니다. 이 전환에는 상태를 위한 공간 할당, 정적 타입(static types)에서 힙 타입(heap types)으로의 전환 가능성, 그리고 가장 중요하게는 코드에서 모듈별 상태에 접근하는 방법이 포함됩니다.

### 문서 소개 (About This Document)
이 PEP는 정보 제공 목적의 문서(informational PEP)이며, 어떠한 변경 사항도 직접 도입하지 않습니다. 대신, 여러 릴리스에 걸쳐 진행되는 노력의 배경을 다루고, 초기 채택자(early adopters)에게 완성된 기능을 사용하는 방법을 안내합니다.

이 문서의 내용은 Python의 공식 문서인 "Isolating Extension Modules HOWTO"로 이동될 예정이며, 현재는 문서 중심 개발(documentation-driven development)의 일환으로 새로운 기능이 구현됨에 따라 업데이트됩니다. 여기서 언급하는 확장 모듈에 대한 조언은 빌트인(built-in) 모듈에도 적용됩니다.

관련된 다른 PEP들은 다음과 같습니다:
*   **PEP 384** – 안정적인 ABI 정의 (Defining a Stable ABI): 힙 타입 생성을 위한 C API 추가
*   **PEP 489** – 다단계 확장 모듈 초기화 (Multi-phase extension module initialization)
*   **PEP 573** – C 확장 메서드에서 모듈 상태 접근 (Module State Access from C Extension Methods)

### 동기 (Motivation)
인터프리터(interpreter)는 Python 코드가 실행되는 컨텍스트(context)입니다. Python은 하나의 프로세스 내에서 여러 개의 인터프리터를 실행하는 것을 지원합니다. 이는 라이브러리 내부에 Python을 임베딩(embedding)할 때 가장 유용합니다. 라이브러리는 일반적으로 자신이 사용되는 애플리케이션에 대해 어떤 가정도 하지 않아야 하며, 여기에는 프로세스 전역 "메인 Python 인터프리터"를 가정하는 것도 포함됩니다.

현재 CPython은 이 사용 사례를 잘 처리하지 못합니다. 많은 확장 모듈(및 일부 표준 라이브러리 모듈)은 C 정적 변수를 사용하여 프로세스 전역 상태(per-process global state)를 사용합니다. 이로 인해 인터프리터에 특정해야 할 데이터가 인터프리터 간에 공유됩니다. 확장 개발자가 주의하지 않으면, 동일한 프로세스 내에서 여러 인터프리터에 모듈이 로드될 때 충돌로 이어지는 예외적인 상황(edge cases)이 쉽게 발생할 수 있습니다.

불행히도, 인터프리터별 상태(per-interpreter state)를 달성하는 것은 쉽지 않습니다. 확장 개발자는 개발 시 여러 인터프리터를 염두에 두지 않는 경향이 있으며, 현재는 이러한 동작을 테스트하는 것이 번거롭습니다.

### 모듈별 상태의 근거 (Rationale for Per-module State)
인터프리터별 상태에 초점을 맞추는 대신, Python의 C API는 보다 세분화된 모듈별 상태를 더 잘 지원하도록 발전하고 있습니다. 기본적으로 C 수준 데이터는 모듈 객체에 연결됩니다. 각 인터프리터는 자체 모듈 객체를 생성하여 데이터를 분리합니다. 격리를 테스트하기 위해 단일 확장에 해당하는 여러 모듈 객체를 단일 인터프리터에 로드할 수도 있습니다.

모듈별 상태는 수명(lifetime)과 리소스 소유권(resource ownership)을 쉽게 생각할 수 있는 방법을 제공합니다. 확장 모듈은 모듈 객체가 생성될 때 초기화되고, 해제될 때 정리됩니다. 이 점에서 모듈은 다른 `PyObject *`와 같으며, "인터프리터 종료 시" 훅(hook)을 고려하거나 잊어버릴 필요가 없습니다.

#### 목표: 사용하기 쉬운 모듈 상태 (Goal: Easy-to-Use Module State)
현재는 모듈을 격리하면서 C API가 제공하는 모든 것을 수행하는 것이 번거롭거나 불가능합니다. PEP 384, PEP 489, PEP 573 (및 향후 계획된 변경 사항)의 변경 사항은 먼저 이러한 방식으로 모듈을 빌드하는 것을 가능하게 하고, 다음으로 새로운 모듈을 쉽게 작성하고 기존 모듈을 변환하여 자연스러운 기본값이 되도록 하는 것을 목표로 합니다.

#### 비목표: 속도 향상 및 GIL (Non-goals: Speedups and the GIL)
GIL(Global Interpreter Lock)을 인터프리터별로 만들어 멀티코어 CPU에서 CPython의 속도를 높이려는 노력이 일부 있지만, 인터프리터 격리가 이러한 노력에 도움이 되더라도 모듈별 상태를 기본값으로 설정하는 것은 속도 향상이 없더라도 여러 인터프리터를 기본적으로 더 안전하게 지원하므로 유익할 것입니다.

### 여러 인터프리터에서 모듈 안전하게 만들기 (Making Modules Safe with Multiple Interpreters)
확장 모듈에서 여러 인터프리터를 올바르게 지원하는 방법은 다양합니다. 다음 내용은 이러한 모듈을 작성하거나 기존 모듈을 변환하는 선호되는 방법을 설명합니다.

참고로, 지원은 진행 중인 작업이며, 모듈에 필요한 일부 기능에 대한 API는 아직 준비되지 않았을 수 있습니다.

#### 격리된 모듈 객체 (Isolated Module Objects)
확장 모듈을 개발할 때 명심해야 할 핵심은 하나의 공유 라이브러리에서 여러 모듈 객체가 생성될 수 있다는 것입니다. 일반적으로 두 모듈은 완전히 독립적이어야 합니다. 모듈에 특정한 모든 객체와 상태는 모듈 객체 내에 캡슐화되어야 하며, 다른 모듈 객체와 공유되지 않아야 하며, 모듈 객체가 할당 해제될 때 정리되어야 합니다. 예외는 가능하지만, 이러한 규칙을 따르는 코드보다 더 많은 고려와 예외적인 상황에 대한 주의가 필요합니다.

#### 의외의 예외적인 상황 (Surprising Edge Cases)
격리된 모듈은 몇 가지 의외의 예외적인 상황을 만듭니다. 가장 주목할 만한 점은 각 모듈 객체가 일반적으로 다른 유사한 모듈과 클래스(class) 및 예외(exception)를 공유하지 않는다는 것입니다. 이는 순수 Python 모듈이 작동하는 방식의 일부입니다. 이 목표는 C 수준에서 확장 모듈을 안전하게 만드는 것이지, "핵(hack)"이 직관적으로 동작하게 만드는 것이 아닙니다. `sys.modules`를 "수동으로" 변경하는 것은 핵으로 간주됩니다.

#### 전역 상태 관리 (Managing Global State)
때때로 Python 모듈의 상태는 해당 모듈에 특정하지 않고, 전체 프로세스(또는 모듈보다 "더 전역적인" 다른 것)에 해당합니다. 이러한 경우, Python 모듈은 전역 상태를 소유하기보다는 접근을 제공해야 합니다. 가능하다면, 여러 모듈 사본이 독립적으로 상태에 접근할 수 있도록 모듈을 작성하십시오.

만약 이것이 불가능하다면, 명시적인 잠금(locking)을 고려하십시오. 프로세스 전역 상태를 사용해야 하는 경우, 여러 인터프리터와 관련된 문제를 피하는 가장 간단한 방법은 모듈이 프로세스당 한 번만 로드되도록 명시적으로 방지하는 것입니다.

#### 모듈별 상태 관리 (Managing Per-Module State)
모듈별 상태를 사용하려면 PEP 489에 도입된 다단계 확장 모듈 초기화(multi-phase extension module initialization)를 사용해야 합니다. 이는 모듈이 여러 인터프리터를 올바르게 지원함을 나타냅니다.

`PyModuleDef.m_size`를 양수로 설정하여 모듈에 로컬인 많은 바이트의 저장 공간을 요청하십시오. 일반적으로 이는 모듈의 C 수준 상태를 모두 저장할 수 있는 모듈별 `struct`의 크기로 설정됩니다. 특히, C 코드 기능에 필요한 클래스(예외 포함, 정적 타입 제외) 및 설정(예: `csv`의 `field_size_limit`)에 대한 포인터를 여기에 배치해야 합니다.

모듈 상태에 `PyObject` 포인터가 포함된 경우, 모듈 객체는 해당 객체에 대한 참조를 유지하고 모듈 수준 훅(hook)인 `m_traverse`, `m_clear`, `m_free`를 구현해야 합니다. 이는 클래스의 `tp_traverse`, `tp_clear`, `tp_free`와 유사하게 작동합니다.

#### 옵트아웃: 프로세스당 하나의 모듈 객체로 제한 (Opt-Out: Limiting to One Module Object per Process)
`PyModuleDef.m_size`가 음수가 아닌 값은 모듈이 여러 인터프리터를 올바르게 지원함을 나타냅니다. 아직 모듈이 이러한 상태가 아닌 경우, 모듈이 프로세스당 한 번만 로드되도록 명시적으로 설정할 수 있습니다.

예시:
```c
static int loaded = 0;
static int exec_module(PyObject* module) {
    if (loaded) {
        PyErr_SetString(PyExc_ImportError, "cannot load module more than once per process");
        return -1;
    }
    loaded = 1;
    // ... rest of initialization
}
```


#### 함수에서 모듈 상태 접근 (Module State Access from Functions)
모듈 수준 함수에서 상태에 접근하는 것은 간단합니다. 함수는 첫 번째 인수로 모듈 객체를 받으며, 상태를 추출하기 위해 `PyModule_GetState`를 사용할 수 있습니다.

예시:
```c
static PyObject * func(PyObject *module, PyObject *args) {
    my_struct *state = (my_struct*)PyModule_GetState(module);
    if (state == NULL) {
        return NULL;
    }
    // ... rest of logic
}
```


### 힙 타입 (Heap Types)
전통적으로 C 코드에서 정의된 타입은 정적(static)입니다. 즉, 코드에 직접 정의되고 `PyType_Ready()`를 사용하여 초기화되는 정적 `PyTypeObject` 구조체입니다.

이러한 타입은 필연적으로 프로세스 전역으로 공유됩니다. 이를 모듈 객체 간에 공유하려면 소유하거나 접근하는 모든 상태에 주의를 기울여야 합니다. 가능한 문제를 제한하기 위해 정적 타입은 Python 수준에서 불변(immutable)입니다.

정적 타입은 불변하고 프로세스 전역이므로 "자신들의" 모듈 상태에 접근할 수 없습니다. 이러한 타입의 어떤 메서드가 모듈 상태에 접근해야 하는 경우, 해당 타입은 힙 할당 타입(heap-allocated type), 줄여서 힙 타입(heap type)으로 변환되어야 합니다. 이는 Python의 `class` 문으로 생성된 클래스와 더 밀접하게 일치합니다.

새로운 모듈의 경우, 기본적으로 힙 타입을 사용하는 것이 좋은 지침입니다. 정적 타입을 힙 타입으로 변환할 수 있지만, 힙 타입 API는 정적 타입에서 "손실 없는" 변환을 위해 설계되지 않았다는 점에 유의해야 합니다.

#### 힙 타입 정의 (Defining Heap Types)
힙 타입은 클래스의 "청사진"인 `PyType_Spec` 구조체를 채우고, `PyType_FromModuleAndSpec()`를 호출하여 새로운 클래스 객체를 구성함으로써 생성할 수 있습니다.

`PyType_FromModuleAndSpec()` 함수는 모듈을 클래스와 연결하여 메서드에서 모듈 상태에 접근할 수 있도록 합니다. 클래스는 일반적으로 모듈 상태(C에서 안전한 접근을 위해)와 모듈의 `__dict__` (Python 코드에서 접근을 위해) 모두에 저장되어야 합니다.

#### 가비지 컬렉션 프로토콜 (Garbage Collection Protocol)
힙 타입의 인스턴스는 해당 타입에 대한 참조를 유지합니다. 이는 모든 인스턴스가 파괴되기 전에 타입이 파괴되지 않도록 보장하지만, 가비지 컬렉터(garbage collector)에 의해 끊어져야 하는 참조 순환(reference cycles)을 초래할 수 있습니다.

메모리 누수를 방지하려면 힙 타입의 인스턴스는 가비지 컬렉션 프로토콜을 구현해야 합니다. 즉, 힙 타입은 다음을 수행해야 합니다.
*   `Py_TPFLAGS_HAVE_GC` 플래그를 가집니다.
*   `Py_tp_traverse`를 사용하여 `traverse` 함수를 정의합니다.

#### 클래스에서 모듈 상태 접근 (Module State Access from Classes)
`PyType_FromModuleAndSpec()`로 정의된 타입 객체가 있는 경우, `PyType_GetModule`을 호출하여 연결된 모듈을 가져온 다음, `PyModule_GetState`를 호출하여 모듈의 상태를 가져올 수 있습니다.

지루한 오류 처리 상용구 코드를 줄이기 위해, 이 두 단계를 `PyType_GetModuleState`와 결합할 수 있습니다.

예시:
```c
my_struct *state = (my_struct*)PyType_GetModuleState(type);
if (state === NULL) {
    return NULL;
}
```


#### 일반 메서드에서 모듈 상태 접근 (Module State Access from Regular Methods)
클래스의 메서드에서 모듈 수준 상태에 접근하는 것은 다소 복잡하지만, PEP 573에 도입된 변경 사항 덕분에 가능합니다. 상태를 얻으려면 먼저 정의 클래스(defining class)를 가져온 다음, 거기서 모듈 상태를 가져와야 합니다.

메서드가 "정의 클래스"를 얻으려면 `METH_METHOD | METH_FASTCALL | METH_KEYWORDS` 호출 규약과 해당 `PyCMethod` 시그니처를 사용해야 합니다.

예시:
```c
static PyObject * example_method(PyObject *self, PyTypeObject *defining_class, PyObject *const *args, Py_ssize_t nargs, PyObject *kwnames) {
    my_struct *state = (my_struct*)PyType_GetModuleState(defining_class);
    if (state === NULL) {
        return NULL;
    }
    // ... rest of logic
}
```


#### 슬롯 메서드, Getter 및 Setter에서 모듈 상태 접근 (Module State Access from Slot Methods, Getters and Setters)
슬롯 메서드(slot methods) – `__add__`에 대한 `nb_add` 또는 초기화에 대한 `tp_new`와 같은 특수 메서드에 대한 빠른 C 등가물 –는 `PyCMethod`와 달리 정의 클래스를 전달할 수 없는 매우 간단한 API를 가집니다. `PyGetSetDef`로 정의된 getter 및 setter도 마찬가지입니다. 이는 Python 3.11에서 새로 추가되었습니다.

이러한 경우 모듈 상태에 접근하려면 `PyType_GetModuleByDef` 함수를 사용하고 모듈 정의를 전달합니다. 모듈을 얻은 후, `PyModule_GetState`를 호출하여 상태를 가져옵니다.

예시:
```c
PyObject *module = PyType_GetModuleByDef(Py_TYPE(self), &module_def);
my_struct *state = (my_struct*)PyModule_GetState(module);
if (state === NULL) {
    return NULL;
}
```


#### 모듈 상태의 수명 (Lifetime of the Module State)
모듈 객체가 가비지 컬렉트(garbage-collected)될 때, 해당 모듈 상태는 해제됩니다. 모듈 상태의 (일부) 포인터 각각에 대해 모듈 객체에 대한 참조를 유지해야 합니다.

일반적으로 이는 문제가 되지 않습니다. `PyType_FromModuleAndSpec`로 생성된 타입과 그 인스턴스는 모듈에 대한 참조를 유지하기 때문입니다. 그러나 외부 라이브러리의 콜백(callbacks)과 같은 다른 곳에서 모듈 상태를 참조할 때는 참조 카운팅(reference counting)에 주의해야 합니다.

### 미해결 문제 (Open Issues)
모듈별 상태 및 힙 타입과 관련된 몇 가지 문제는 여전히 미해결 상태입니다.

*   **타입 검사 (Type Checking):** 현재 힙 타입은 `PyUnicode_Check`와 같은 `Py*_Check` 함수를 작성하기 위한 좋은 API가 없으므로 인스턴스가 특정 C 레이아웃을 가지는지 확인하기가 쉽지 않습니다.
*   **메타클래스 (Metaclasses):** 현재 힙 타입의 메타클래스(type object의 `ob_type` 필드)를 지정하기 위한 좋은 API가 없습니다.
*   **클래스별 범위 (Per-Class Scope):** 타입에 상태를 연결하는 것도 불가능합니다. `PyHeapTypeObject`는 가변 크기 객체(`PyVarObject`)이지만, 현재 가변 크기 저장 공간은 슬롯(slots)에 의해 사용됩니다.
*   **힙 타입으로의 손실 없는 변환 (Lossless Conversion to Heap Types):** 힙 타입 API는 정적 타입에서 "손실 없는" 변환을 위해 설계되지 않았습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.