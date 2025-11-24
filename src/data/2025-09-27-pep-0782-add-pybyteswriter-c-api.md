---
title: "[Final] PEP 782 - Add PyBytesWriter C API"
excerpt: "Python Enhancement Proposal 782: 'Add PyBytesWriter C API'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/782/
toc: true
toc_sticky: true
date: 2025-09-27 13:58:01+0900
last_modified_at: 2025-09-27 13:58:01+0900
published: true
---
> **원문 링크:** [PEP 782 - Add PyBytesWriter C API](https://peps.python.org/pep-0782/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 27-Mar-2025

PEP 782 – PyBytesWriter C API 추가

**저자:** Victor Stinner
**상태:** Final
**생성일:** 2025년 3월 27일
**Python 버전:** 3.15

---

## 초록 (Abstract)

PEP 782는 `bytes` 객체를 생성하기 위한 새로운 C API인 `PyBytesWriter`를 추가하는 것을 제안합니다. 이와 함께 `PyBytes_FromStringAndSize(NULL, size)` 및 `_PyBytes_Resize()` API의 "soft deprecation" (소프트 비권장)을 제안합니다. 이 기존 API들은 불변(immutable)인 `bytes` 객체를 가변(mutable) 객체처럼 다루는 문제를 가지고 있습니다. 이 API들은 여전히 사용 가능하고 유지 관리되지만, 새 코드를 작성할 때는 더 이상 권장되지 않습니다.

## 배경 (Rationale)

### 불완전하거나 일관성 없는 객체 생성 방지 (Disallow creation of incomplete/inconsistent objects)

`PyBytes_FromStringAndSize(NULL, size)` 및 `_PyBytes_Resize()`를 사용하여 Python `bytes` 객체를 생성하는 것은 불변(immutable) 객체인 `bytes`를 가변(mutable) 객체처럼 다룹니다. 이는 `bytes` 객체가 불변이라는 원칙에 어긋납니다. 또한, 이 API들은 `bytes`가 초기화되지 않은 "불완전하거나 유효하지 않은" 객체를 생성합니다. Python에서 `bytes` 객체는 항상 그 내용이 완전히 초기화되어야 합니다.

### 비효율적인 할당 전략 (Inefficient allocation strategy)

`bytes` 문자열을 생성할 때 최종 출력 크기를 알 수 없는 경우, 기존의 한 가지 전략은 작은 버퍼를 할당한 후 더 큰 쓰기가 필요할 때마다 버퍼 크기를 확장(정확한 크기로)하는 것이었습니다.

이러한 전략은 버퍼를 여러 번 확장해야 하므로 비효율적입니다. 더 효율적인 방법은 처음에 더 큰 쓰기가 필요할 때 버퍼를 초과 할당(overallocate)하는 것입니다. 이는 메모리 복사(memory copy)를 수반할 수 있는 비용이 많이 드는 `realloc()` 연산 횟수를 줄여줍니다.

## 명세 (Specification)

### API

#### `PyBytesWriter` 타입

`PyBytesWriter_Create()` 함수에 의해 생성되는 Python `bytes` 작성기 인스턴스입니다. 이 인스턴스는 `PyBytesWriter_Finish()` 또는 `PyBytesWriter_Discard()` 함수를 통해 반드시 소멸되어야 합니다.

#### 생성, 완료, 폐기 (Create, Finish, Discard)

*   `PyBytesWriter *PyBytesWriter_Create(Py_ssize_t size)`
    *   `size` 바이트를 작성하기 위한 `PyBytesWriter`를 생성합니다.
    *   `size`가 0보다 크면 `size` 바이트를 할당하고, 작성기(`writer`)의 크기를 `size`로 설정합니다. 호출자는 `PyBytesWriter_GetData()`를 사용하여 `size` 바이트를 작성해야 합니다.
    *   오류 발생 시 예외를 설정하고 `NULL`을 반환합니다.
    *   `size`는 양수 또는 0이어야 합니다.

*   `PyObject *PyBytesWriter_Finish(PyBytesWriter *writer)`
    *   `PyBytesWriter_Create()`로 생성된 `PyBytesWriter`를 완료합니다.
    *   성공 시 Python `bytes` 객체를 반환하고, 오류 시 예외를 설정하고 `NULL`을 반환합니다.
    *   호출 후 `writer` 인스턴스는 어떤 경우에도 유효하지 않게 됩니다.

*   `PyObject *PyBytesWriter_FinishWithSize(PyBytesWriter *writer, Py_ssize_t size)`
    *   `PyBytesWriter_Finish()`와 유사하지만, `bytes` 객체를 생성하기 전에 `writer`의 크기를 `size` 바이트로 조정합니다.

*   `PyObject *PyBytesWriter_FinishWithPointer(PyBytesWriter *writer, void *buf)`
    *   `PyBytesWriter_Finish()`와 유사하지만, `bytes` 객체를 생성하기 전에 `buf` 포인터를 사용하여 `writer`의 크기를 조정합니다.
    *   `buf` 포인터가 내부 버퍼 범위 밖에 있으면 예외를 설정하고 `NULL`을 반환합니다.
    *   내부적으로는 `PyBytesWriter_FinishWithSize`를 `buf`와 `PyBytesWriter_GetData`의 차이를 이용하여 호출합니다.

*   `void PyBytesWriter_Discard(PyBytesWriter *writer)`
    *   `PyBytesWriter_Create()`로 생성된 `PyBytesWriter`를 폐기합니다.
    *   `writer`가 `NULL`이면 아무것도 하지 않습니다.
    *   호출 후 `writer` 인스턴스는 유효하지 않게 됩니다.

#### High-level API (고수준 API)

*   `int PyBytesWriter_WriteBytes(PyBytesWriter *writer, const void *bytes, Py_ssize_t size)`
    *   `writer`의 내부 버퍼를 `size` 바이트만큼 확장하고, `writer`의 끝에 `size` 바이트만큼 `bytes`를 쓰고, `writer`의 크기에 `size`를 추가합니다.
    *   `size`가 `-1`과 같으면 `strlen(bytes)`를 호출하여 문자열 길이를 가져옵니다.
    *   성공 시 `0`을 반환하고, 오류 시 예외를 설정하고 `-1`을 반환합니다.

*   `int PyBytesWriter_Format(PyBytesWriter *writer, const char *format, ...)`
    *   `PyBytes_FromFormat()`과 유사하지만, 출력을 `writer`의 끝에 직접 작성합니다. 필요에 따라 `writer`의 내부 버퍼를 확장합니다. 그 후 작성된 크기를 `writer` 크기에 추가합니다.
    *   성공 시 `0`을 반환하고, 오류 시 예외를 설정하고 `-1`을 반환합니다.

#### Getters (게터)

*   `Py_ssize_t PyBytesWriter_GetSize(PyBytesWriter *writer)`
    *   `writer`의 크기를 가져옵니다.

*   `void *PyBytesWriter_GetData(PyBytesWriter *writer)`
    *   `writer`의 데이터를 가져옵니다: 내부 버퍼의 시작점.
    *   이 포인터는 `PyBytesWriter_Finish()` 또는 `PyBytesWriter_Discard()`가 호출될 때까지 유효합니다.

#### Low-level API (저수준 API)

*   `int PyBytesWriter_Resize(PyBytesWriter *writer, Py_ssize_t size)`
    *   `writer`의 크기를 `size` 바이트로 조정합니다. `writer`를 확장하거나 축소하는 데 사용할 수 있습니다.
    *   새로 할당된 바이트는 초기화되지 않은 상태로 남습니다.
    *   성공 시 `0`을 반환하고, 오류 시 예외를 설정하고 `-1`을 반환합니다.
    *   `size`는 양수 또는 0이어야 합니다.

*   `int PyBytesWriter_Grow(PyBytesWriter *writer, Py_ssize_t grow)`
    *   현재 `writer` 크기에 `grow` 바이트를 추가하여 `writer`의 크기를 조정합니다.
    *   새로 할당된 바이트는 초기화되지 않은 상태로 남습니다.
    *   성공 시 `0`을 반환하고, 오류 시 예외를 설정하고 `-1`을 반환합니다.
    *   `grow`는 `writer`를 축소하기 위해 음수일 수 있습니다.

*   `void *PyBytesWriter_GrowAndUpdatePointer(PyBytesWriter *writer, Py_ssize_t size, void *buf)`
    *   `PyBytesWriter_Grow()`와 유사하지만, `buf` 포인터도 업데이트합니다.
    *   내부 버퍼가 메모리에서 이동하면 `buf` 포인터도 이동합니다. `buf`의 내부 버퍼 내 상대 위치는 변경되지 않습니다.
    *   오류 발생 시 예외를 설정하고 `NULL`을 반환합니다.
    *   `buf`는 `NULL`이 아니어야 합니다.

### 초과 할당 (Overallocation)

`PyBytesWriter_Resize()` 및 `PyBytesWriter_Grow()`는 `realloc()` 호출 횟수와 메모리 복사 횟수를 줄이기 위해 내부 버퍼를 초과 할당(overallocate)합니다.
`PyBytesWriter_Finish()`는 최종 `bytes` 객체를 생성할 때 내부 버퍼를 정확한 크기로 줄여 초과 할당된 부분을 잘라냅니다.

### 스레드 안전성 (Thread safety)

이 API는 스레드 안전(thread safe)하지 않습니다. 작성기(`writer`)는 한 번에 단일 스레드에서만 사용되어야 합니다.

### Soft Deprecations (소프트 비권장)

`PyBytes_FromStringAndSize(NULL, size)` 및 `_PyBytes_Resize()` API는 소프트 비권장(soft deprecate)됩니다. 이 API들은 불변(immutable)인 `bytes` 객체를 가변(mutable) 객체처럼 다룹니다. 이 API들은 여전히 사용 가능하고 유지 관리되며, 비권장 경고를 발생시키지 않지만, 새 코드를 작성할 때는 더 이상 권장되지 않습니다.
`PyBytes_FromStringAndSize(str, size)`는 `str`이 `NULL`이 아닌 경우 소프트 비권장되지 않습니다.

## 예시 (Examples)

### 고수준 API (High-level API)

#### `b"Hello World!"` 바이트 문자열 생성

```c
PyObject* hello_world(void) {
    PyBytesWriter *writer = PyBytesWriter_Create(0);
    if (writer == NULL) {
        goto error;
    }
    if (PyBytesWriter_WriteBytes(writer, "Hello", -1) < 0) {
        goto error;
    }
    if (PyBytesWriter_Format(writer, " %s!", "World") < 0) {
        goto error;
    }
    return PyBytesWriter_Finish(writer);
error:
    PyBytesWriter_Discard(writer);
    return NULL;
}
```

#### `b"abc"` 바이트 문자열 생성

3바이트 고정 크기로 `b"abc"` 바이트 문자열을 생성하는 예시:

```c
PyObject* create_abc(void) {
    PyBytesWriter *writer = PyBytesWriter_Create(3);
    if (writer == NULL) {
        return NULL;
    }
    char *str = PyBytesWriter_GetData(writer);
    memcpy(str, "abc", 3);
    return PyBytesWriter_Finish(writer);
}
```

#### `GrowAndUpdatePointer()` 예시

`bytes`를 쓰고 작성된 크기를 추적하기 위해 포인터를 사용하는 예시입니다.
`b"Hello World"` 바이트 문자열을 생성합니다:

```c
PyObject* grow_example(void) {
    // 10바이트 할당
    PyBytesWriter *writer = PyBytesWriter_Create(10);
    if (writer == NULL) {
        return NULL;
    }
    // 일부 바이트 작성
    char *buf = PyBytesWriter_GetData(writer);
    memcpy(buf, "Hello ", strlen("Hello "));
    buf += strlen("Hello ");

    // 10바이트 추가 할당
    buf = PyBytesWriter_GrowAndUpdatePointer(writer, 10, buf);
    if (buf == NULL) {
        PyBytesWriter_Discard(writer);
        return NULL;
    }
    // 더 많은 바이트 작성
    memcpy(buf, "World", strlen("World"));
    buf += strlen("World");

    // 'buf' 위치에서 문자열을 자르고
    // bytes 객체 생성
    return PyBytesWriter_FinishWithPointer(writer, buf);
}
```

#### `PyBytes_FromStringAndSize()` 코드 업데이트

소프트 비권장된 `PyBytes_FromStringAndSize(NULL, size)` API를 사용하는 코드 예시:

```c
PyObject *result = PyBytes_FromStringAndSize(NULL, num_bytes);
if (result == NULL) {
    return NULL;
}
if (copy_bytes(PyBytes_AS_STRING(result), start, num_bytes) < 0) {
    Py_CLEAR(result);
}
return result;
```

위 코드를 다음과 같이 업데이트할 수 있습니다:

```c
PyBytesWriter *writer = PyBytesWriter_Create(num_bytes);
if (writer == NULL) {
    return NULL;
}
if (copy_bytes(PyBytesWriter_GetData(writer), start, num_bytes) < 0) {
    PyBytesWriter_Discard(writer);
    return NULL;
}
return PyBytesWriter_Finish(writer);
```

#### `_PyBytes_Resize()` 코드 업데이트

소프트 비권장된 `_PyBytes_Resize()` API를 사용하는 코드 예시:

```c
PyObject *v = PyBytes_FromStringAndSize(NULL, size);
if (v == NULL) {
    return NULL;
}
char *p = PyBytes_AS_STRING(v);
// ... p에 바이트 채우기 ...
if (_PyBytes_Resize(&v, (p - PyBytes_AS_STRING(v)))) {
    return NULL;
}
return v;
```

위 코드를 다음과 같이 업데이트할 수 있습니다:

```c
PyBytesWriter *writer = PyBytesWriter_Create(size);
if (writer == NULL) {
    return NULL;
}
char *p = PyBytesWriter_GetData(writer);
// ... p에 바이트 채우기 ...
return PyBytesWriter_FinishWithPointer(writer, p);
```

## 참조 구현 (Reference Implementation)

Pull request gh-131681.

CPython 참조 구현에 대한 내용은 명세의 일부는 아니지만 다음과 같습니다:

구현은 내부적으로 `bytes` 객체를 할당하므로 `PyBytesWriter_Finish()`는 메모리를 복사할 필요 없이 객체를 반환합니다. 최대 256바이트의 문자열의 경우, 작은 내부 원시 `bytes` 버퍼가 사용됩니다. 이는 비효율적인 `bytes` 객체 크기 조정을 피합니다. 마지막으로 `PyBytesWriter_Finish()`는 이 작은 버퍼에서 `bytes` 객체를 생성합니다. 힙 메모리에 `PyBytesWriter`를 할당하는 비용을 줄이기 위해 프리 리스트(free list)가 사용됩니다.

## 하위 호환성 (Backwards Compatibility)

하위 호환성에는 영향이 없으며, 새로운 API만 추가됩니다.
`PyBytes_FromStringAndSize(NULL, size)` 및 `_PyBytes_Resize()` API는 소프트 비권장(soft deprecated)됩니다. 이러한 함수를 사용할 때 새로운 경고는 발생하지 않으며, 제거될 계획도 없습니다.

## 이전 논의 (Prior Discussions)

*   **2025년 3월:** 세 번째 공개 API 시도, 포인터 대신 크기 사용.
*   **2025년 2월:** 두 번째 공개 API 시도.
*   **2024년 7월:** 첫 번째 공개 API 시도.
*   **2016년 3월:** CPython에서 문자열을 생성하기 위한 빠른 `_PyAccu`, `_PyUnicodeWriter`, `_PyBytesWriter` API.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 하에 배포됩니다 (더 관대한 조건 우선).

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.