---
title: "[Withdrawn] PEP 756 - Add PyUnicode_Export() and PyUnicode_Import() C functions"
excerpt: "Python Enhancement Proposal 756: 'Add PyUnicode_Export() and PyUnicode_Import() C functions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/756/
toc: true
toc_sticky: true
date: 2025-09-27 13:41:47+0900
last_modified_at: 2025-09-27 13:41:47+0900
published: true
---
> **원문 링크:** [PEP 756 - Add PyUnicode_Export() and PyUnicode_Import() C functions](https://peps.python.org/pep-0756/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 13-Sep-2024

PEP 756: `PyUnicode_Export()` 및 `PyUnicode_Import()` C 함수 추가 제안 번역 및 정리

## 개요
PEP 756은 Python 3.14의 Limited C API에 `PyUnicode_Export()` 및 `PyUnicode_Import()` C 함수를 추가하여, C 확장 모듈이 Python `str` 객체의 내부 유니코드 데이터에 더 효율적으로 접근하고 생성할 수 있도록 제안합니다. CPython에서 `PyUnicode_Export()`는 O(1)의 시간 복잡도를 가지며, 메모리 복사나 변환 없이 직접 버퍼 뷰를 제공합니다. 이 PEP는 현재 "Withdrawn" (철회됨) 상태입니다.

### 초록 (Abstract)
Limited C API 버전 3.14에 다음 함수들을 추가합니다.
*   `PyUnicode_Export()`: Python `str` 객체를 `Py_buffer` 뷰로 내보냅니다.
*   `PyUnicode_Import()`: Python `str` 객체를 가져옵니다.

CPython에서 `PyUnicode_Export()`는 O(1) 복잡도를 가집니다: 메모리 복사나 변환이 수행되지 않습니다.

### 배경 (Rationale)

#### PEP 393
PEP 393 "Flexible String Representation"은 Python 3.3에서 문자열 내부 구조를 변경하여 세 가지 형식(formats)을 사용하도록 했습니다.
*   `PyUnicode_1BYTE_KIND`: 유니코드 범위 [U+0000; U+00ff], UCS-1, 문자당 1바이트.
*   `PyUnicode_2BYTE_KIND`: 유니코드 범위 [U+0000; U+ffff], UCS-2, 문자당 2바이트.
*   `PyUnicode_4BYTE_KIND`: 유니코드 범위 [U+0000; U+10ffff], UCS-4, 문자당 4바이트.

Python `str` 객체는 항상 가장 간결한 형식을 사용해야 합니다. 예를 들어, ASCII 문자만 포함하는 문자열은 UCS-1 형식을 사용해야 합니다. `PyUnicode_KIND()` 함수를 사용하여 문자열이 사용하는 형식을 알 수 있으며, `PyUnicode_1BYTE_DATA()`, `PyUnicode_2BYTE_DATA()`, `PyUnicode_4BYTE_DATA()`와 같은 함수들을 사용하여 데이터를 직접 접근할 수 있습니다. 최상의 성능을 위해 C 확장 모듈은 이 세 가지 기본 문자열 형식 각각에 대해 3개의 코드 경로를 가져야 합니다.

#### Limited C API
`PyUnicode_KIND()` 및 `PyUnicode_1BYTE_DATA()`와 같은 PEP 393 함수들은 Limited C API에서 제외되었습니다. 이로 인해 Limited C API를 사용하는 C 확장 모듈은 UCS 형식에 특화된 코드를 작성할 수 없으며, 효율성이 떨어지는 코드 경로와 문자열 형식만 사용할 수 있었습니다. 예를 들어, MarkupSafe 프로젝트는 최상의 성능을 위해 UCS 형식에 특화된 C 확장을 가지고 있어 Limited C API를 사용할 수 없습니다.

### 명세 (Specification)

#### API
Limited C API 버전 3.14에 다음 API가 추가됩니다.

```c
int32_t PyUnicode_Export(
    PyObject *unicode,
    int32_t requested_formats,
    Py_buffer *view);

PyObject* PyUnicode_Import(
    const void *data,
    Py_ssize_t nbytes,
    int32_t format);

#define PyUnicode_FORMAT_UCS1 0x01 // Py_UCS1*
#define PyUnicode_FORMAT_UCS2 0x02 // Py_UCS2*
#define PyUnicode_FORMAT_UCS4 0x04 // Py_UCS4*
#define PyUnicode_FORMAT_UTF8 0x08 // char*
#define PyUnicode_FORMAT_ASCII 0x10 // char* (ASCII string)
```
`int32_t` 타입은 플랫폼이나 컴파일러에 의존하지 않고 잘 정의된 타입 크기를 가지기 위해 사용됩니다.

#### `PyUnicode_Export()`
`unicode` 문자열의 내용을 `requested_formats` 중 하나로 내보냅니다. 성공 시 `view`를 채우고 형식(0보다 큰 값)을 반환합니다. 오류 시 예외를 설정하고 -1을 반환하며, `view`는 변경되지 않습니다. `PyUnicode_Export()` 호출 성공 후에는 `view` 버퍼를 `PyBuffer_Release()`로 해제해야 합니다. 버퍼의 내용은 해제될 때까지 유효하며 읽기 전용입니다.

`view->len` 멤버를 사용하여 문자열 길이를 얻어야 합니다. 버퍼는 후행 NUL 문자로 끝나야 하지만, 내장된 NUL 문자 때문에 이에 의존하는 것은 권장되지 않습니다.

사용 가능한 형식은 다음과 같습니다.

| 상수 식별자               | 값   | 설명          |
| :----------------------- | :--- | :------------ |
| `PyUnicode_FORMAT_UCS1`  | `0x01` | UCS-1 문자열  |
| `PyUnicode_FORMAT_UCS2`  | `0x02` | UCS-2 문자열  |
| `PyUnicode_FORMAT_UCS4`  | `0x04` | UCS-4 문자열  |
| `PyUnicode_FORMAT_UTF8`  | `0x08` | UTF-8 문자열  |
| `PyUnicode_FORMAT_ASCII` | `0x10` | ASCII 문자열  |

`requested_formats`는 단일 형식 또는 위에 나열된 형식들의 비트와(bitwise combination)가 될 수 있습니다.

**내보내기 복잡도 (Export complexity)**
CPython에서 내보내기는 O(1)의 복잡도를 가집니다: 메모리 복사나 변환이 수행되지 않습니다. CPython 및 PyPy에서 최상의 성능을 얻기 위해 다음 4가지 형식을 지원하는 것이 권장됩니다.

```c
(PyUnicode_FORMAT_UCS1 \
 | PyUnicode_FORMAT_UCS2 \
 | PyUnicode_FORMAT_UCS4 \
 | PyUnicode_FORMAT_UTF8)
```
PyPy는 기본적으로 UTF-8을 사용하므로 `PyUnicode_FORMAT_UTF8` 형식이 권장됩니다.

**`Py_buffer` 형식 및 항목 크기**
내보내기 형식에 따라 `Py_buffer`는 다음 형식과 항목 크기를 사용합니다.

| 내보내기 형식             | 버퍼 형식 | 항목 크기 |
| :----------------------- | :------- | :-------- |
| `PyUnicode_FORMAT_UCS1`  | `"B"`    | 1바이트   |
| `PyUnicode_FORMAT_UCS2`  | `"=H"`   | 2바이트   |
| `PyUnicode_FORMAT_UCS4`  | `"=I"`   | 4바이트   |
| `PyUnicode_FORMAT_UTF8`  | `"B"`    | 1바이트   |
| `PyUnicode_FORMAT_ASCII` | `"B"`    | 1바이트   |

#### `PyUnicode_Import()`
지원되는 형식의 버퍼에서 유니코드 문자열 객체를 생성합니다. 성공 시 새 문자열 객체에 대한 참조를 반환합니다. 오류 시 예외를 설정하고 `NULL`을 반환합니다.

**UTF-8 형식**
CPython 3.14는 내부적으로 UTF-8 형식을 사용하지 않으며 문자열을 UTF-8로 내보내는 것을 지원하지 않습니다. 대신 `PyUnicode_AsUTF8AndSize()` 함수를 사용할 수 있습니다. `PyUnicode_FORMAT_UTF8` 형식은 문자열에 기본적으로 UTF-8을 사용할 수 있는 대체 구현과의 호환성을 위해 제공됩니다.

**ASCII 형식**
내보내기를 위해 `PyUnicode_FORMAT_ASCII` 형식이 요청되면, ASCII 문자열에 대해 `PyUnicode_FORMAT_UCS1` 내보내기 형식이 사용됩니다. `PyUnicode_FORMAT_ASCII` 형식은 주로 `PyUnicode_Import()`에서 문자열이 ASCII 문자만 포함하는지 검증하는 데 유용합니다.

**서로게이트 문자(Surrogate characters) 및 내장된 NUL 문자(embedded NUL characters)**
서로게이트 문자는 허용되며, 가져오기 및 내보내기가 가능합니다. 내장된 NUL 문자도 허용되며, 가져오기 및 내보내기가 가능합니다.

### 구현 (Implementation)
[https://github.com/python/cpython/pull/123738](https://github.com/python/cpython/pull/123738) 에서 구현이 논의되었습니다.

### 하위 호환성 (Backwards Compatibility)
새로운 C API 함수만 추가되므로 하위 호환성에는 영향이 없습니다.

### PEP 393 C API 사용 현황 (Usage of PEP 393 C APIs)
PyPI 상위 7,500개 프로젝트(2024년 3월 기준)에 대한 코드 검색 결과, 정규 C API를 사용하여 UCS 형식을 가져오고 내보내는 많은 프로젝트가 있음을 보여줍니다.

*   **`PyUnicode_FromKindAndData()`:** Cython, numpy, orjson 등 25개 프로젝트에서 호출합니다.
*   **`PyUnicode_4BYTE_DATA()` (`PyUnicode_2BYTE_DATA()` 포함):** Cython, MarkupSafe, numpy, orjson 등 21개 프로젝트에서 호출합니다.

### 거부된 아이디어 (Rejected Ideas)

#### 내장된 NUL 문자를 거부하고 후행 NUL 문자를 요구 (Reject embedded NUL characters and require trailing NUL character)
C에서는 후행 NUL 문자를 가지는 것이 편리하지만, Python `str` 객체는 내장된 NUL 문자를 포함할 수 있습니다 (`"ab\0c"`). NUL 문자에 의존하여 문자열 끝을 찾는 코드는 문자열을 잘라낼 수 있어 버그나 보안 취약점으로 이어질 수 있습니다. 내장된 NUL 문자를 거부하려면 문자열을 스캔해야 하므로 O(n)의 복잡도를 가집니다.

#### 서로게이트 문자 거부 (Reject surrogate characters)
유니코드 범위 [U+D800; U+DFFF]의 서로게이트 문자는 UTF-8과 같은 UTF 코덱에서 허용되지 않지만, Python `str` 객체는 임의의 단독 서로게이트 문자를 포함할 수 있습니다. 서로게이트 문자를 거부하면 이러한 문자를 포함하는 문자열을 내보내는 것을 방지하여 예기치 않은 문제를 일으킬 수 있습니다. 서로게이트 문자를 허용함으로써 모든 문자열을 내보낼 수 있으며, 예를 들어 `surrogatepass` 오류 핸들러와 함께 UTF-8 코덱을 사용하여 서로게이트 문자를 인코딩 및 디코딩할 수 있습니다.

#### 주문형 변환 (Conversions on demand)
필요에 따라 형식을 변환하는 것이 편리할 수 있습니다 (예: UCS-4로만 내보내기가 요청되면 UCS-1 및 UCS-2를 UCS-4로 변환). 그러나 대부분의 사용자는 메모리 복사나 변환 없이 O(1) 복잡도로 내보내기가 수행될 것으로 기대합니다. 모든 작업이 O(1) 복잡도를 가지는 API를 제공하는 것이 더 좋습니다.

#### UTF-8로 내보내기 (Export to UTF-8)
CPython 3.14에는 문자열을 UTF-8로 인코딩하기 위한 캐시가 있어 UTF-8로 내보내는 것을 허용하고 싶을 수 있습니다. 그러나 UTF-8 캐시는 서로게이트 문자를 지원하지 않으며, 내보내기는 내장된 NUL 문자 및 서로게이트 문자를 포함한 전체 문자열 내용을 제공해야 합니다. 서로게이트 문자를 내보내려면 `surrogatepass` 오류 핸들러를 사용하는 다른 코드 경로가 필요하며 각 내보내기 작업은 임시 버퍼를 할당해야 하므로 O(n) 복잡도를 가집니다. 내보내기가 O(1) 복잡도를 가져야 하므로 CPython에서 UTF-8 내보내기 아이디어는 포기되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.