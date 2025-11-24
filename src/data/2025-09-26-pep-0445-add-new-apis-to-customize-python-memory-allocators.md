---
title: "[Final] PEP 445 - Add new APIs to customize Python memory allocators"
excerpt: "Python Enhancement Proposal 445: 'Add new APIs to customize Python memory allocators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/445/
toc: true
toc_sticky: true
date: 2025-09-26 21:58:25+0900
last_modified_at: 2025-09-26 21:58:25+0900
published: true
---
> **원문 링크:** [PEP 445 - Add new APIs to customize Python memory allocators](https://peps.python.org/pep-0445/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 15-Jun-2013

# PEP 445 – Python 메모리 할당자 사용자 정의를 위한 새로운 API 추가

## 개요
이 PEP는 Python 메모리 할당자를 사용자 정의하기 위한 새로운 애플리케이션 프로그래밍 인터페이스(API)를 제안합니다. 이 PEP를 준수해야 하는 유일한 구현체는 CPython이지만, 다른 구현체들도 호환되거나 유사한 방식을 재사용할 수 있습니다.

## 도입 배경 (Rationale)
사용자 정의 메모리 할당자를 사용하는 주요 목적은 다음과 같습니다.

*   **Python 임베딩 애플리케이션:** Python 메모리를 애플리케이션 자체의 메모리로부터 격리하거나, Python 사용에 최적화된 다른 메모리 할당자를 사용하려는 경우.
*   **저사양 임베디드 기기:** 메모리가 부족하고 CPU 속도가 느린 임베디드 기기에서 Python을 실행할 때, 효율성을 높이거나 기기의 모든 메모리에 접근하기 위해 사용자 정의 메모리 할당자를 사용할 수 있습니다.
*   **메모리 할당자 디버그 도구:**
    *   메모리 사용량 추적 (메모리 누수 찾기)
    *   메모리 할당 위치 파악: Python 파일명, 줄 번호, 메모리 블록 크기
    *   버퍼 언더플로우(buffer underflow), 버퍼 오버플로우(buffer overflow), Python 할당자 API 오용 감지
    *   `MemoryError` 예외 처리 테스트를 위해 메모리 할당 실패를 강제

## 제안 (Proposal)

### 새로운 함수 및 구조체 (New Functions and Structures)

1.  **새로운 GIL-free 메모리 할당자 추가:**
    *   `void* PyMem_RawMalloc(size_t size)`
    *   `void* PyMem_RawRealloc(void *ptr, size_t new_size)`
    *   `void PyMem_RawFree(void *ptr)`
    새로 할당된 메모리는 어떤 식으로든 초기화되지 않습니다. 0바이트를 요청하면 가능한 경우 `PyMem_Malloc(1)`이 호출된 것처럼 고유한 `non-NULL` 포인터를 반환합니다. 이 할당자는 GIL(Global Interpreter Lock)을 보유할 필요가 없습니다.

2.  **새로운 `PyMemAllocator` 구조체 추가:**
    ```c
    typedef struct {
        void *ctx; /* 세 함수에 첫 번째 인자로 전달되는 사용자 컨텍스트 */
        void* (*malloc) (void *ctx, size_t size); /* 메모리 블록 할당 */
        void* (*realloc) (void *ctx, void *ptr, size_t new_size); /* 메모리 블록 할당 또는 크기 조정 */
        void (*free) (void *ctx, void *ptr); /* 메모리 블록 해제 */
    } PyMemAllocator;
    ```

3.  **새로운 `PyMemAllocatorDomain` Enum 추가:**
    Python 할당자 도메인을 선택하기 위한 Enum입니다.
    *   `PYMEM_DOMAIN_RAW`: `PyMem_RawMalloc()`, `PyMem_RawRealloc()`, `PyMem_RawFree()`에 해당합니다.
    *   `PYMEM_DOMAIN_MEM`: `PyMem_Malloc()`, `PyMem_Realloc()`, `PyMem_Free()`에 해당합니다.
    *   `PYMEM_DOMAIN_OBJ`: `PyObject_Malloc()`, `PyObject_Realloc()`, `PyObject_Free()`에 해당합니다.

4.  **메모리 블록 할당자를 가져오고 설정하는 새로운 함수 추가:**
    *   `void PyMem_GetAllocator(PyMemAllocatorDomain domain, PyMemAllocator *allocator)`
    *   `void PyMem_SetAllocator(PyMemAllocatorDomain domain, PyMemAllocator *allocator)`
    새로운 할당자는 0바이트를 요청할 때 고유한 `non-NULL` 포인터를 반환해야 합니다. `PYMEM_DOMAIN_RAW` 도메인의 경우, 할당자는 스레드 안전(thread-safe)해야 합니다. 할당자가 호출될 때 GIL이 유지되지 않습니다.

5.  **새로운 `PyObjectArenaAllocator` 구조체 추가:**
    ```c
    typedef struct {
        void *ctx; /* 두 함수에 첫 번째 인자로 전달되는 사용자 컨텍스트 */
        void* (*alloc) (void *ctx, size_t size); /* 아레나(arena) 할당 */
        void (*free) (void *ctx, void *ptr, size_t size); /* 아레나 해제 */
    } PyObjectArenaAllocator;
    ```

6.  **`pymalloc`이 사용하는 아레나 할당자를 가져오고 설정하는 새로운 함수 추가:**
    *   `void PyObject_GetArenaAllocator(PyObjectArenaAllocator *allocator)`
    *   `void PyObject_SetArenaAllocator(PyObjectArenaAllocator *allocator)`

7.  **`PyMem_SetAllocator()`로 메모리 할당자를 교체할 때 디버그 검사를 다시 설치하는 새로운 함수 추가:**
    *   `void PyMem_SetupDebugHooks(void)`
    모든 메모리 블록 할당자에 디버그 훅을 설치합니다. 이 함수는 여러 번 호출될 수 있지만, 훅은 한 번만 설치됩니다. Python이 디버그 모드로 컴파일되지 않으면 함수는 아무것도 하지 않습니다.

**참고:** `pymalloc` 할당자는 수명이 짧고 512바이트보다 작은 객체에 최적화되어 있습니다. 이는 "아레나(arenas)"라고 불리는 고정 크기 256KB 메모리 매핑을 사용합니다.

기본적으로 할당자는 다음과 같이 설정됩니다.
*   `PYMEM_DOMAIN_RAW`, `PYMEM_DOMAIN_MEM`: `malloc()`, `realloc()`, `free()`를 사용하며, 0바이트 요청 시 `malloc(1)`을 호출합니다.
*   `PYMEM_DOMAIN_OBJ`: 512바이트보다 큰 할당의 경우 `PyMem_Malloc()`으로 폴백(fallback)하는 `pymalloc` 할당자입니다.
*   `pymalloc` 아레나 할당자: Windows에서는 `VirtualAlloc()` 및 `VirtualFree()`를, 사용 가능한 경우 `mmap()` 및 `munmap()`을, 그 외에는 `malloc()` 및 `free()`를 사용합니다.

### 훅(Hooks)으로서의 메모리 블록 할당자 디버그 검사 재설계 (Redesign Debug Checks on Memory Block Allocators as Hooks)
Python 2.3부터 Python은 디버그 모드에서 메모리 할당자에 대한 다양한 검사를 구현해왔습니다.
*   새로 할당된 메모리는 `0xCB` 바이트로 채워지고, 해제된 메모리는 `0xDB` 바이트로 채워집니다.
*   API 위반 감지 (예: `PyMem_Malloc()`으로 할당된 메모리 블록에 `PyObject_Free()` 호출).
*   버퍼 시작 전 쓰기(buffer underflow), 버퍼 끝 후 쓰기(buffer overflow) 감지.

Python 3.3에서는 매크로를 사용하여 `PyMem_Malloc()`, `PyMem_Realloc()`, `PyMem_Free()`, `PyObject_Malloc()`, `PyObject_Realloc()`, `PyObject_Free()`를 대체함으로써 검사가 설치되었습니다. 이 새로운 할당자는 더 큰 버퍼를 할당하고 버퍼 언더플로우, 버퍼 오버플로우, 해제 후 사용(use after free)을 감지하기 위한 패턴을 기록했습니다. 이는 메모리를 할당하기 위해 원래의 `PyObject_Malloc()` 함수를 사용했습니다.

이 PEP는 디버그 모드에서 기존 할당자에 대한 디버그 검사를 훅으로 재설계합니다.
그 결과, `PyMem_Malloc()`과 `PyMem_Realloc()`은 이제 디버그 모드에서 `PyObject_Malloc()`과 `PyObject_Realloc()`을 호출하는 대신, 릴리스 모드와 디버그 모드 모두에서 `malloc()`과 `realloc()`을 호출합니다.

### 더 이상 `malloc()`을 직접 호출하지 않음 (Don't call malloc() directly anymore)
`PyObject_Malloc()`은 크기가 512바이트 이상일 경우 `malloc()` 대신 `PyMem_Malloc()`으로 폴백하며, `PyObject_Realloc()`은 `realloc()` 대신 `PyMem_Realloc()`으로 폴백합니다.

`malloc()`에 대한 직접 호출은 `PyMem_Malloc()`으로 대체되거나, GIL이 유지되지 않는 경우 `PyMem_RawMalloc()`으로 대체됩니다.

`zlib` 또는 `OpenSSL`과 같은 외부 라이브러리는 `PyMem_Malloc()` 또는 `PyMem_RawMalloc()`을 사용하여 메모리를 할당하도록 구성할 수 있습니다.

### 예시 (Examples)

#### 사용 사례 1: 메모리 할당자 교체, `pymalloc` 유지 (Replace Memory Allocators, keep pymalloc)
`PYMEM_DOMAIN_RAW`와 `PYMEM_DOMAIN_MEM` 도메인의 할당자를 사용자 정의 함수로 교체하지만, `PYMEM_DOMAIN_OBJ`는 `pymalloc`을 그대로 사용하도록 남겨두고 `pymalloc` 아레나 할당자만 사용자 정의 함수로 교체하는 예시가 제공됩니다.

#### 사용 사례 2: 메모리 할당자 교체, `pymalloc` 재정의 (Replace Memory Allocators, override pymalloc)
512바이트보다 작은 객체 할당에 최적화된 전용 할당자가 있는 경우 `pymalloc`을 재정의(`PyObject_Malloc()` 교체)할 수 있습니다. 모든 도메인(`PYMEM_DOMAIN_RAW`, `PYMEM_DOMAIN_MEM`, `PYMEM_DOMAIN_OBJ`)의 할당자를 사용자 정의 함수로 교체하는 예시가 제공됩니다. 이 경우 `pymalloc` 아레나를 교체할 필요가 없습니다.

#### 사용 사례 3: 메모리 블록 할당자에 훅 설정 (Setup Hooks On Memory Block Allocators)
모든 메모리 블록 할당자에 훅을 설정하는 예시가 제공됩니다. 이 경우 메모리 할당자가 교체되지 않으므로 `PyMem_SetupDebugHooks()`를 호출할 필요가 없습니다. 디버그 검사는 시작 시 자동으로 설치됩니다.

## 성능 (Performances)
이 PEP 구현은 Python 벤치마크 스위트에서 눈에 띄는 오버헤드(overhead)가 없습니다. 일부 테스트는 1.04배 빨라지고 일부 테스트는 1.04배 느려지는 결과가 나왔으며, `pybench` 마이크로벤치마크에서는 전반적으로 "+0.1%" 느려지는 것으로 나타났습니다.

## 채택되지 않은 대안 (Rejected Alternatives)

*   **메모리 할당자를 가져오고 설정하는 더 구체적인 함수:** 각 할당자 도메인마다 한 쌍의 함수를 제안했지만, 일반적인 코드 작성이 불가능하여 코드를 중복해야 하므로 거부되었습니다.
*   **`PyMem_Malloc()`이 기본적으로 `PyMem_RawMalloc()`을 재사용하도록 만들기:** `PyMem_SetAllocator()`가 도메인에 따라 다른 동작을 가질 수 있으므로, 일관된 동작을 위해 거부되었습니다.
*   **새로운 `PYDEBUGMALLOC` 환경 변수 추가:** Python 초기화를 더욱 복잡하게 만들 수 있으므로 거부되었습니다.
*   **사용자 정의 가능한 할당자를 얻기 위해 매크로 사용:** 매크로 사용은 확장 모듈을 재컴파일해야 하므로 실용적이지 않아 거부되었습니다.
*   **C 파일명 및 줄 번호 전달:** 각 할당자 함수에 `__FILE__` 및 `__LINE__` 매크로를 사용하여 파일명과 줄 번호를 전달하는 것은 API를 너무 복잡하게 만들고, GC 할당자 함수도 수정해야 하는 등 복잡성 증가에 비해 얻는 이득이 적어 거부되었습니다.
*   **GIL-free `PyMem_Malloc()`:** `PyMem_Malloc()`이 GIL 없이 호출될 수 있도록 허용하는 것은 사용자 정의 할당자나 훅을 설정하는 애플리케이션을 손상시킬 수 있고, GIL을 유지하는 것이 사용자 정의 할당자 개발 및 디버그 훅에 더 편리하므로 거부되었습니다.
*   **`PyMem_RawMalloc()` 추가하지 않기:** `PyMem_RawMalloc()`은 메모리 사용량에 대한 정확한 보고서를 위해 필요하며, GIL이 유지되지 않은 채 할당된 메모리를 포함하여 모든 Python 할당 메모리를 추적할 수 있도록 훅(hook)을 걸 수 있으므로 필요합니다.
*   **기존 디버그 도구 사용:** 기존 도구는 Python 내부를 탐색하여 관련 정보를 수집할 수 없으며, 할당자에 훅을 설정하는 것이 더 유용한 데이터를 수집할 수 있으므로 거부되었습니다.
*   **`msize()` 함수 추가:** `PyMemAllocator` 및 `PyObjectArenaAllocator` 구조체에 메모리 블록 크기를 반환하는 `msize()` 함수를 추가하는 것을 제안했지만, 이를 구현하는 플랫폼이 거의 없고 Python 소스 코드에서 사용되지 않으며 API를 복잡하게 만들 뿐이므로 거부되었습니다.
*   **`context` 인자 제거:** 할당자 훅이 다른 할당자에 재사용될 때 컨텍스트를 통해 다른 함수를 호출해야 하므로, 컨텍스트 인자는 편의성을 위해 필요하여 제거되지 않았습니다.

## 외부 라이브러리 및 메모리 할당자 (External Libraries and Memory Allocators)
이 PEP의 새로운 `ctx` 매개변수는 `zlib` 및 Oracle의 OCI 라이브러리 API에서 영감을 받았습니다.

C 표준 라이브러리는 잘 알려진 `malloc()` 함수를 제공하며, 그 구현은 플랫폼 및 C 라이브러리에 따라 다릅니다. (예: GNU C 라이브러리는 `ptmalloc2`, FreeBSD는 `jemalloc`, Google은 `tcmalloc` 사용).

`malloc()`은 힙(heap)과 메모리 매핑(memory mappings) 두 종류의 메모리를 사용합니다. `pymalloc`은 512바이트보다 작은 객체에 최적화된 할당자이며, 256KB 크기의 "아레나"라고 불리는 메모리 매핑을 사용합니다.

이 PEP는 애플리케이션의 메모리 사용량(할당 횟수, 할당 크기, 객체 수명 등)에 따라 어떤 메모리 할당자를 사용할지 정확하게 선택할 수 있도록 합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.