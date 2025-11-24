---
title: "[Final] PEP 3121 - Extension Module Initialization and Finalization"
excerpt: "Python Enhancement Proposal 3121: 'Extension Module Initialization and Finalization'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3121/
toc: true
toc_sticky: true
date: 2025-09-27 14:27:55+0900
last_modified_at: 2025-09-27 14:27:55+0900
published: true
---
> **원문 링크:** [PEP 3121 - Extension Module Initialization and Finalization](https://peps.python.org/pep-3121/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 27-Apr-2007

# PEP 3121 – 확장 모듈 초기화 및 종료

*본 문서는 역사적 문서입니다. 최신 규범 문서는 `PyInit_modulename()` 및 `PyModuleDef`에서 확인할 수 있습니다.*

## 개요 (Abstract)

현재 확장 모듈(Extension Module)의 초기화 과정에는 몇 가지 문제점이 있습니다. 모듈에 대한 정리(cleanup) 기능이 없고, 진입점(entry point) 이름이 충돌을 일으킬 수 있으며, 진입 함수가 일반적인 호출 규칙을 따르지 않고, 다중 인터프리터(Multiple Interpreters)를 제대로 지원하지 못하고 있습니다. 이 PEP는 이러한 문제들을 해결하고자 합니다.

## 문제점 (Problems)

### 모듈 종료 (Module Finalization)

현재 확장 모듈은 일반적으로 한 번 초기화된 후 "영원히" 존재합니다. 유일한 예외는 `Py_Finalize()`가 호출될 때인데, 이때 초기화 루틴이 두 번째로 호출됩니다. 이는 리소스 관리 관점에서 좋지 않습니다. 초기화가 호출될 때마다 메모리 및 다른 리소스가 할당될 수 있지만, 이를 회수할 방법이 없습니다. 결과적으로, 현재 Python이 할당한 모든 리소스를 완전히 해제할 방법이 없습니다.

### 진입점 이름 충돌 (Entry point name conflicts)

현재 진입점은 `init<module>`이라고 명명됩니다. 이 이름은 `init<something>`과 같이 다른 심볼(symbol)과 충돌할 수 있습니다. 특히, 과거에 `initsocket`이 충돌을 일으킨 적이 있습니다 (이 특정 문제는 모듈 이름을 `_socket`으로 변경하면서 부수적으로 해결되었습니다).

### 진입점 시그니처 (Entry point signature)

현재 진입점은 `void`를 반환하는 프로시저(procedure)입니다. 이는 일반적인 호출 규칙에서 벗어납니다. 호출자는 `PyErr_Occurred`를 확인해야만 초기화 중 오류가 발생했는지 여부를 알 수 있습니다. 진입점은 생성된 모듈인 `PyObject*`를 반환해야 하며, 예외 발생 시에는 `NULL`을 반환해야 합니다.

### 다중 인터프리터 (Multiple Interpreters)

현재 확장 모듈은 모든 인터프리터(Interpreter)에서 상태를 공유합니다. 이는 인터프리터 간에 바람직하지 않은 정보 누출(information leakage)을 초래할 수 있습니다. 하나의 스크립트가 확장 모듈 내의 객체를 영구적으로 손상시켜 다른 인터프리터의 모든 스크립트를 망가뜨릴 수 있습니다.

## 사양 (Specification)

모듈 초기화 루틴의 시그니처는 다음과 같이 변경됩니다.

```c
PyObject *PyInit_<modulename>()
```

초기화 루틴은 모듈이 임포트될 때 인터프리터당 한 번 호출됩니다. 이때마다 새로운 모듈 객체를 반환해야 합니다.

C 변수에 모듈별 상태를 저장하기 위해, 각 모듈 객체는 해당 모듈에 의해서만 해석되는 메모리 블록을 포함하게 됩니다. 모듈에 사용되는 메모리 양은 모듈 생성 시점에 지정됩니다.

초기화 함수 외에도 모듈은 여러 추가 콜백(callback) 함수를 구현할 수 있습니다. 이 함수들은 모듈의 `tp_traverse`, `tp_clear`, `tp_free` 함수가 호출될 때, 그리고 모듈이 다시 로드될 때(reloaded) 호출됩니다.

전체 모듈 정의는 `struct PyModuleDef`에 통합됩니다.

```c
struct PyModuleDef{
    PyModuleDef_Base m_base;  /* 인터프리터가 채울 필드 */
    Py_ssize_t m_size;        /* 모듈별 데이터의 크기 */
    PyMethodDef *m_methods;
    inquiry m_reload;
    traverseproc m_traverse;
    inquiry m_clear;
    freefunc m_free;
};
```

모듈 생성은 선택적 `PyModuleDef*`를 기대하도록 변경됩니다. 모듈 상태는 널(null)로 초기화됩니다.

각 모듈 메서드에는 모듈 객체가 첫 번째 매개변수로 전달됩니다. 모듈 데이터에 접근하기 위해 다음 함수가 제공됩니다.

```c
void* PyModule_GetState(PyObject*);
```

또한, `sys.modules`를 거치는 것보다 더 효율적으로 모듈을 찾기 위해 다음 함수가 제공됩니다.

```c
PyObject* PyState_FindModule(struct PyModuleDef*);
```

이 조회(lookup) 함수는 `m_base` 필드에 있는 인덱스를 사용하여 이름이 아닌 인덱스로 모듈을 찾습니다.

모든 Python 객체는 Python 메모리 관리(memory management)를 통해 제어되어야 하므로, 타입 객체(type object) 자체에 메모리 관리되는 상태가 없는 경우를 제외하고 "정적(static)" 타입 객체의 사용은 권장되지 않습니다. 힙 타입(heap types)의 정의를 단순화하기 위해 새로운 메서드가 추가됩니다.

```c
PyTypeObject* PyType_Copy(PyTypeObject*);
```

## 예시 (Example)

`xxmodule.c`는 `initxx` 함수를 제거하고 다음 코드를 대신 추가하는 방식으로 변경됩니다.

```c
struct xxstate{
    PyObject *ErrorObject;
    PyObject *Xxo_Type;
};

#define xxstate(o) ((struct xxstate*)PyModule_GetState(o))

static int xx_traverse(PyObject *m, visitproc v, void *arg) {
    Py_VISIT(xxstate(m)->ErrorObject);
    Py_VISIT(xxstate(m)->Xxo_Type);
    return 0;
}

static int xx_clear(PyObject *m) {
    Py_CLEAR(xxstate(m)->ErrorObject);
    Py_CLEAR(xxstate(m)->Xxo_Type);
    return 0;
}

static struct PyModuleDef xxmodule = {
    {}, /* m_base */
    sizeof(struct xxstate),
    &xx_methods,
    0,  /* m_reload */
    xx_traverse,
    xx_clear,
    0,  /* m_free - m_clear에서 모든 작업이 처리되므로 필요 없음 */
};

PyObject* PyInit_xx() {
    PyObject *res = PyModule_New("xx", &xxmodule);
    if (!res)
        return NULL;

    xxstate(res)->ErrorObject = PyErr_NewException("xx.error", NULL, NULL);
    if (!xxstate(res)->ErrorObject) {
        Py_DECREF(res);
        return NULL;
    }

    xxstate(res)->XxoType = PyType_Copy(&Xxo_Type);
    if (!xxstate(res)->Xxo_Type) {
        Py_DECREF(res);
        return NULL;
    }
    return res;
}
```

## 논의 (Discussion)

Tim Peters는 [1]에서 PythonLabs가 한때 이러한 기능을 고려했으며, 이 PEP에서 현재 지원되지 않는 다음과 같은 추가적인 훅(hook)들을 언급했습니다.

*   모듈 객체가 `sys.modules`에서 삭제될 때
*   `Py_Finalize`가 호출될 때
*   Python이 종료될 때
*   Python DLL이 언로드(unload)될 때 (Windows 전용)

## 참고 자료 (References)

[1] Tim Peters, 이러한 기능에 대한 이전 대화 보고서.
    <https://mail.python.org/pipermail/python-3000/2006-April/000726.html>

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.