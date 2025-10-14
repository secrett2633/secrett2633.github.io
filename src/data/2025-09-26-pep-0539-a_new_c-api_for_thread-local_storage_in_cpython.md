---
title: "[Final] PEP 539 - A New C-API for Thread-Local Storage in CPython"
excerpt: "Python Enhancement Proposal 539: 'A New C-API for Thread-Local Storage in CPython'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/539/
toc: true
toc_sticky: true
date: 2025-09-26 23:28:37+0900
last_modified_at: 2025-09-26 23:28:37+0900
published: true
---
> **원문 링크:** [PEP 539 - A New C-API for Thread-Local Storage in CPython](https://peps.python.org/pep-0539/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 20-Dec-2016

## PEP 539 – CPython에서 스레드 로컬 스토리지를 위한 새로운 C-API

이 문서는 CPython 인터프리터 내에서 스레드 로컬 스토리지(Thread Local Storage, TLS)를 관리하기 위한 새로운 C-API인 "Thread Specific Storage (TSS) API"를 제안합니다. 기존 TLS API의 한계를 극복하고, CPython의 이식성을 향상하는 것이 목표입니다. 이 제안은 Python 3.7 버전부터 적용되었습니다.

### 개요 (Abstract)

PEP 539는 CPython 인터프리터 내부에서 사용되는 기존 TLS API를 대체하고 새로운 TLS API를 도입할 것을 제안합니다. 새 API는 "Thread Specific Storage (TSS) API"라고 불립니다. 기존 TLS API는 내부적으로만 사용되고 공식 문서에 언급되지 않으므로, 이 제안은 주로 CPython 구현에 영향을 미치지만 CPython API의 일부를 구현하는 다른 인터프리터(예: PyPy)에도 영향을 줄 수 있습니다.

주된 동기는 기존 API가 모든 플랫폼에서 TLS 키를 `int` 타입으로 표현했는데, 이는 POSIX 표준을 준수하지 않으며 실제적인 이식성을 보장하지 못했기 때문입니다.

### 도입 배경 (Motivation)

기존 `PyThread` TLS API의 가장 큰 문제는 TLS 값에 사용되는 키의 타입이 `int`라는 점이었습니다. 1997년에 Python에 추가된 이 API는 CPython 자체 TLS 구현을 사용했으며, 당시에는 `int` 키가 문제없었습니다. 그러나 나중에 pthreads 및 Windows와 같은 네이티브 스레드 구현 위에 API를 구현하는 지원이 추가되었고, 내장 구현은 더 이상 필요 없어져 제거되었습니다.

`int`를 TLS 키로 선택한 것은 CPython 자체 구현 및 Windows(`DWORD` 사용)와는 호환되었지만, `pthread_key_t`를 불투명한 타입으로 정의하는 POSIX pthreads API 표준과는 호환되지 않았습니다.

일부 플랫폼(Cygwin, CloudABI 등)에서는 `pthread_key_t`가 `int`로 안전하게 캐스팅될 수 없는 방식으로 정의되어 있어 Python API와 호환되지 않는 문제가 발생했습니다. 이는 CPython이 POSIX와 호환되지 않는 API를 통해 구현 장벽을 부과하는 것이며, 다른 POSIX 호환 플랫폼에서 CPython이 잠재력을 발휘하는 것을 막는 요인이었습니다.

### 명세 (Specification)

새로운 TSS API는 기존 TLS API의 6가지 함수를 대체하는 유사한 함수들을 포함하며, 몇 가지 새로운 기능을 추가합니다.

**기존 TLS API 함수 (Deprecated):**

*   `PyAPI_FUNC(int) PyThread_create_key(void)`
*   `PyAPI_FUNC(void) PyThread_delete_key(int key)`
*   `PyAPI_FUNC(int) PyThread_set_key_value(int key, void *value)`
*   `PyAPI_FUNC(void *) PyThread_get_key_value(int key)`
*   `PyAPI_FUNC(void) PyThread_delete_key_value(int key)`
*   `PyAPI_FUNC(void) PyThread_ReInitTLS(void)`

**새로운 TSS API 함수:**

*   `PyAPI_FUNC(int) PyThread_tss_create(Py_tss_t *key)`
*   `PyAPI_FUNC(void) PyThread_tss_delete(Py_tss_t *key)`
*   `PyAPI_FUNC(int) PyThread_tss_set(Py_tss_t *key, void *value)`
*   `PyAPI_FUNC(void *) PyThread_tss_get(Py_tss_t *key)`

**새로운 기능:**

*   **`Py_tss_t` 타입**: 기본 TLS 구현에 따라 정의될 수 있는 불투명(opaque) 타입입니다. 내부적으로 `_is_initialized` 플래그와 `NATIVE_TSS_KEY_T`를 포함합니다.
*   **`Py_tss_NEEDS_INIT`**: `Py_tss_t` 변수를 초기화하기 위한 이니셜라이저입니다.
*   **추가 함수**:
    *   `PyAPI_FUNC(Py_tss_t *) PyThread_tss_alloc(void)`: `Py_LIMITED_API`로 빌드된 확장 모듈에서 `Py_tss_t`의 동적 할당을 위해 사용됩니다.
    *   `PyAPI_FUNC(void) PyThread_tss_free(Py_tss_t *key)`: 동적으로 할당된 `Py_tss_t`를 해제합니다.
    *   `PyAPI_FUNC(int) PyThread_tss_is_created(Py_tss_t *key)`: `Py_tss_t`가 초기화되었는지 확인합니다.

새 API는 `Py_tss_t*`를 인수로 받아 키를 전달하는 반면, 기존 API는 `int` 키를 값으로 전달했습니다. `Py_tss_t`는 불투명 타입이므로 크기를 알 수 없기 때문에 이러한 변경이 필요합니다.

또한, `PyThread_tss_create`는 이미 초기화된 키에 대해 호출될 경우 성공을 반환하며 아무런 작업을 수행하지 않습니다. `PyThread_tss_delete`는 키의 초기화 상태를 "uninitialized"로 변경하여, CPython 인터프리터를 재시작할 때 정적으로 할당된 키를 재설정할 수 있도록 합니다.

### API 명세 비교 (Comparison of API Specification)

| 기능/속성           | 기존 TLS API           | 새로운 TSS API                                                                |
| :------------------ | :--------------------- | :---------------------------------------------------------------------------- |
| **버전**            | 기존                 | 신규                                                                          |
| **키 타입**         | `int`                  | `Py_tss_t` (불투명 타입)                                                      |
| **키 핸들**         | 네이티브 키를 `int`로 캐스팅 | 내부 필드에 캡슐화                                                            |
| **함수 인수**       | `int`                  | `Py_tss_t *`                                                                  |
| **주요 기능**       | 키 생성, 삭제, 값 설정, 값 가져오기, 값 삭제, 키 재초기화 | 키 생성, 삭제, 값 설정, 값 가져오기 (NULL로 설정), 동적 할당/해제, 키 초기화 상태 확인 |
| **키 이니셜라이저** | `-1` (키 생성 실패)    | `Py_tss_NEEDS_INIT`                                                           |
| **요구 사항**       | 네이티브 스레드        | 네이티브 스레드 (CPython 3.7부터)                                             |
| **제한 사항**       | 네이티브 TLS 키가 `int`로 안전하게 캐스팅될 수 없는 플랫폼 미지원 | `Py_LIMITED_API` 정의 시 정적 키 할당 불가능                                  |


### 예시 (Example)

**정적 할당 (Static Allocation):**

```c
static Py_tss_t tss_key = Py_tss_NEEDS_INIT;
if (PyThread_tss_create(&tss_key)) {
    /* ... 키 생성 실패 처리 ... */
}

assert(PyThread_tss_is_created(&tss_key));

int the_value = 1;
if (PyThread_tss_get(&tss_key) == NULL) {
    PyThread_tss_set(&tss_key, (void *)&the_value);
    assert(PyThread_tss_get(&tss_key) != NULL);
}
/* ... 키 사용 완료 후 ... */
PyThread_tss_delete(&tss_key);
assert(!PyThread_tss_is_created(&tss_key));
```

**동적 할당 (`Py_LIMITED_API` 정의 시):**

```c
static Py_tss_t *ptr_key = PyThread_tss_alloc();
if (ptr_key == NULL) {
    /* ... 키 할당 실패 처리 ... */
}
assert(!PyThread_tss_is_created(ptr_key));
/* ... 키 사용 완료 후 ... */
PyThread_tss_free(ptr_key);
ptr_key = NULL;
```

### 플랫폼 지원 변경 사항 (Platform Support Changes)

CPython 3.7부터는 모든 플랫폼이 TSS API를 구현하기 위해 pthreads 또는 Windows와 같은 네이티브 스레드 구현을 제공해야 합니다. 네이티브 스레드 없이 구현된 TSS API 문제는 "won't fix"로 처리됩니다.

### 제안된 해결책의 근거 (Rationale for Proposed Solution)

불투명한 타입(`Py_tss_t`)을 사용하여 TLS 값을 키로 만드는 것은 CPython이 지원하는 현재(POSIX 및 Windows)와 미래의 네이티브 TLS 구현 모두와 호환될 수 있도록 합니다. `Py_tss_t`의 정의가 기반 구현에 따라 달라질 수 있기 때문입니다.

이름의 "tss"는 "thread-specific storage"를 의미하며, C11 스레드 API의 "tss" API의 명명 및 설계에서 영향을 받았습니다. 이는 C11 스레드 API와의 호환성이나 지원을 의미하는 것은 아닙니다.

`Py_tss_NEEDS_INIT` 이니셜라이저의 포함은 모든 네이티브 TLS 구현이 초기화되지 않은 TLS 키에 대한 센티넬(sentinel) 값을 정의하지 않기 때문에 필요합니다. 예를 들어, Windows는 초기화되지 않은 TLS 키를 안전하게 나타낼 수 있는 `unsigned int` 값이 없으며, POSIX도 `pthread_key_t`에 대한 센티넬을 지정하지 않습니다. 따라서 `Py_tss_t` 타입은 기본 구현과 독립적으로 키의 초기화 상태를 나타낼 수 있는 명시적인 `_is_initialized` 필드를 포함합니다.

### 거부된 아이디어 (Rejected Ideas)

*   **아무것도 하지 않음**: 리눅스에서는 작동하므로 현 상태가 괜찮다는 주장입니다. 그러나 이는 CPython 자체의 특성으로 인해 다른 POSIX 호환 플랫폼에서 잠재력을 발휘하지 못하게 하는 문제이며, 리눅스에서의 작동은 우연한 결과입니다.
*   **영향받는 플랫폼은 `--without-threads`로 Python을 구성**: Python 3.7부터 `--without-threads` 옵션이 제거되어 더 이상 선택 사항이 아닙니다.
*   **영향받는 플랫폼은 CPython 내장 TLS 구현을 사용**: 내장 구현은 네이티브 구현보다 느리고 투박하며, `tracemalloc`과 같은 다른 모듈도 손상될 수 있습니다. 또한, 내장 구현은 이미 제거되었습니다.
*   **기존 API를 유지하되 `pthread_key_t` 값을 `int` 값으로 매핑하여 문제 해결**: 불필요한 복잡성과 오버헤드를 야기하며, 플랫폼별 코드를 유지해야 하는 문제가 있습니다.

### Python 사용에 미치는 영향

이 PEP는 CPython의 C-API 레벨에서 스레드 로컬 스토리지 구현을 개선하여, 다양한 플랫폼에서의 호환성과 이식성을 높이는 데 기여합니다. 일반적인 Python 개발자에게 직접적인 영향은 미미하지만, C 확장 모듈을 개발하거나 CPython을 애플리케이션에 임베딩하는 개발자에게는 중요합니다.

주요 변경사항은 다음과 같습니다:
1.  **C-API 변경**: 기존 `PyThread_*_key` 함수들은 더 이상 사용되지 않고 (`deprecated`), 새로운 `PyThread_tss_*` 함수들로 대체됩니다.
2.  **`Py_tss_t` 도입**: `int` 대신 불투명한 `Py_tss_t` 타입을 사용하여 TLS 키를 표현함으로써, `pthread_key_t`가 `int`로 안전하게 캐스팅될 수 없는 POSIX 호환 플랫폼에서도 스레드 로컬 스토리지를 안정적으로 사용할 수 있게 됩니다.
3.  **호환성 향상**: `Py_LIMITED_API`를 사용하는 확장 모듈 개발 시, `Py_tss_t`의 동적 할당 (`PyThread_tss_alloc`, `PyThread_tss_free`) 지원으로 더욱 유연하게 대응할 수 있습니다.
4.  **플랫폼 요구 사항**: CPython 3.7부터는 모든 플랫폼이 네이티브 스레드 구현(pthreads 또는 Windows)을 제공해야 하므로, 더 이상 네이티브 스레드를 지원하지 않는 환경에서는 CPython의 TLS 기능을 사용할 수 없습니다.

결론적으로, PEP 539는 CPython의 스레드 로컬 스토리지 구현을 현대화하고 표준화하여, 더욱 견고하고 이식성 있는 기반을 제공합니다. 이는 CPython 자체의 안정성과 확장 모듈의 호환성을 장기적으로 향상시키는 데 중요한 역할을 합니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.