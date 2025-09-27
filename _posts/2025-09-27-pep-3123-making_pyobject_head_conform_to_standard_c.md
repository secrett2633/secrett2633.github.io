---
title: "[Final] PEP 3123 - Making PyObject_HEAD conform to standard C"
excerpt: "Python Enhancement Proposal 3123: 'Making PyObject_HEAD conform to standard C'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3123/
toc: true
toc_sticky: true
date: 2025-09-27 14:28:28+0900
last_modified_at: 2025-09-27 14:28:28+0900
published: true
---
> **원문 링크:** [PEP 3123 - Making PyObject_HEAD conform to standard C](https://peps.python.org/pep-3123/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 27-Apr-2007


# PEP 3123 – PyObject_HEAD를 표준 C에 맞게 변경

## 개요 (Abstract)

Python은 현재 `PyObject_HEAD` 사용에서 C 표준에 정의되지 않은 동작에 의존하고 있습니다. 이 PEP는 이러한 의존성을 표준 C에 부합하도록 변경할 것을 제안합니다.

## 배경 (Rationale)

표준 C는 객체가 해당 타입의 포인터를 통해서만 접근되어야 하며, 몇 가지 예외를 제외하고 다른 모든 접근은 정의되지 않은 동작(undefined behavior)으로 간주합니다. 특히, 다음 코드는 정의되지 않은 동작을 유발합니다:

```c
struct FooObject{
    PyObject_HEAD
    int data;
};

PyObject *foo(struct FooObject*f){
    return (PyObject*)f;
}

int bar(){
    struct FooObject *f = malloc(sizeof(struct FooObject));
    struct PyObject *o = foo(f);
    f->ob_refcnt = 0;
    o->ob_refcnt = 1;
    return f->ob_refcnt;
}
```
여기서 문제는 저장 공간이 `struct PyObject`로도, `struct FooObject`로도 접근된다는 점입니다.

역사적으로 컴파일러들은 이 코드에 대해 아무런 문제가 없었지만, 최신 컴파일러들은 이 조항을 최적화 기회로 활용합니다. 즉, `f->ob_refcnt`와 `o->ob_refcnt`가 동일한 메모리를 참조할 수 없다고 판단하여, 반환문에서 `ob_refcnt` 값을 전혀 가져올 필요 없이 함수가 0을 반환해야 한다고 결론 내립니다. GCC의 경우, Python은 이 문제를 해결하기 위해 `-fno-strict-aliasing`을 사용하고 있으며, 다른 컴파일러에서는 정의되지 않은 동작이 발생할 수 있습니다. 심지어 GCC에서도 `-fno-strict-aliasing`을 사용하면 생성된 코드를 불필요하게 비최적화(pessimize)할 수 있습니다.

## 상세 내용 (Specification)

표준 C는 Python의 경우를 지원하기 위해 특별히 고안된 한 가지 예외 조항을 가지고 있습니다. 구조체(struct) 타입의 값은 첫 번째 필드에 대한 포인터를 통해 접근될 수도 있습니다. 예를 들어, 구조체가 `int`로 시작하는 경우, `struct *`는 `int *`로 캐스팅될 수 있어 첫 번째 필드에 `int` 값을 쓸 수 있습니다.

Python의 경우, `PyObject_HEAD`와 `PyObject_VAR_HEAD`는 더 이상 모든 필드를 나열하지 않고, `PyObject` / `PyVarObject` 타입의 단일 필드를 나열하도록 변경될 것입니다.

```c
typedef struct _object {
    _PyObject_HEAD_EXTRA
    Py_ssize_t ob_refcnt;
    struct _typeobject *ob_type;
} PyObject;

typedef struct {
    PyObject ob_base;
    Py_ssize_t ob_size;
} PyVarObject;

#define PyObject_HEAD PyObject ob_base;
#define PyObject_VAR_HEAD PyVarObject ob_base;
```

고정 크기 구조체로 정의된 타입은 이제 `PyObject`를 첫 번째 필드로 포함하고, 가변 크기 객체(variable-sized objects)는 `PyVarObject`를 첫 번째 필드로 포함하게 됩니다. 예시:

```c
typedef struct {
    PyObject ob_base;
    PyObject *start, *stop, *step;
} PySliceObject;

typedef struct {
    PyVarObject ob_base;
    PyObject **ob_item;
    Py_ssize_t allocated;
} PyListObject;
```

위의 `PyObject_HEAD` 정의는 규범적(normative)이므로, 확장 모듈(extension module) 개발자는 매크로를 사용하거나 `ob_base` 필드를 자신의 구조체에 명시적으로 포함할 수 있습니다.

관례상, 기본 필드(base field)는 `ob_base`라고 불려야 합니다. 그러나 `ob_refcnt` 및 `ob_type`에 대한 모든 접근은 객체 포인터를 `PyObject*`로 캐스팅해야 하며(포인터가 이미 해당 타입을 가짐이 알려진 경우 제외), 해당 접근자(accessor) 매크로를 사용해야 합니다. `ob_type`, `ob_refcnt`, `ob_size`에 대한 접근을 단순화하기 위해 다음 매크로가 추가됩니다:

```c
#define Py_TYPE(o) (((PyObject*)(o))->ob_type)
#define Py_REFCNT(o) (((PyObject*)(o))->ob_refcnt)
#define Py_SIZE(o) (((PyVarObject*)(o))->ob_size)
```

예를 들어, 다음 코드 블록:

```c
#define PyList_CheckExact(op) ((op)->ob_type == &PyList_Type)
return func->ob_type->tp_name;
```

는 다음과 같이 변경되어야 합니다:

```c
#define PyList_CheckExact(op) (Py_TYPE(op) == &PyList_Type)
return Py_TYPE(func)->tp_name;
```

타입 객체(type objects)의 초기화에 있어, 현재의 시퀀스:

```c
PyObject_HEAD_INIT(NULL)
0, /* ob_size */
```
는 부정확해지므로, 다음으로 대체되어야 합니다:

```c
PyVarObject_HEAD_INIT(NULL, 0)
```

## Python 2.6과의 호환성 (Compatibility with Python 2.6)

Python 2.6과 Python 3.0 모두에서 컴파일되는 모듈을 지원하기 위해, `Py_*` 매크로는 Python 2.6에 추가됩니다. `Py_INCREF` 및 `Py_DECREF` 매크로는 인수를 `PyObject *`로 캐스팅하도록 변경될 것이며, 이를 통해 모듈 개발자는 Python 2.6용으로 설계된 모듈에서도 `ob_base` 필드를 명시적으로 선언할 수 있습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.