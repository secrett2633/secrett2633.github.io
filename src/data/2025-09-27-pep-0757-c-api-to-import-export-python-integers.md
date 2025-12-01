---
title: "[Final] PEP 757 - C API to import-export Python integers"
excerpt: "Python Enhancement Proposal 757: 'C API to import-export Python integers'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/757/
toc: true
toc_sticky: true
date: 2025-09-27 13:42:57+0900
last_modified_at: 2025-09-27 13:42:57+0900
published: true
---
> **원문 링크:** [PEP 757 - C API to import-export Python integers](https://peps.python.org/pep-0757/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 13-Sep-2024


# PEP 757 – C API를 이용한 Python 정수 import/export

## 개요
새로운 C API, 특히 `PyLongWriter_Create()` 및 `PyLong_Export()` 함수를 추가하여 Python 정수(`int` 객체)를 import하고 export하는 기능을 제공합니다.

## 도입 배경 (Rationale)
`gmpy2`, `SAGE`, `Python-FLINT`와 같은 프로젝트들은 Python의 내부(`PyLongObject` 구조체)에 직접 접근하거나 비효율적인 임시 형식(예: `Python-FLINT`의 16진수 문자열)을 사용하여 Python `int` 객체를 import 및 export합니다.

Python 3.12에서는 `int` 구현이 `tag`와 "compact values"를 추가하는 방향으로 변경되었습니다. 3.13 alpha 1 릴리스에서는 비공개, 비문서화된 `_PyLong_New()` 함수가 제거되었지만, 이 함수는 앞서 언급된 프로젝트들에서 Python 정수를 import하는 데 사용되고 있었습니다. 이 함수는 3.13 alpha 2에서 복원되었습니다.

이러한 프로젝트들이 Python의 내부 구현 세부 사항에 노출되지 않으면서도 효율적으로 연동될 수 있도록, 공개적이고 효율적인 추상화 계층이 필요합니다. 이는 Python 내부 구현이 변경되더라도 해당 프로젝트들이 깨지지 않도록 할 것입니다. 예를 들어, `gmpy2`의 구현은 최근 CPython 3.9 및 CPython 3.12에 맞춰 변경된 바 있습니다.

## 명세 (Specification)

### 레이아웃 API (Layout API)
GMP(GNU Multiple Precision Arithmetic Library)와 유사한 import-export 함수에 필요한 데이터입니다.

#### `struct PyLongLayout`
임의 정밀도 정수의 절대값을 나타내는 "digit" 배열(GMP 용어로는 "limb")의 레이아웃입니다. "충분히 큰" 절대값을 가진 정수에서 내부적으로 사용되는 Python `int` 객체의 기본 레이아웃을 얻으려면 `PyLong_GetNativeLayout()` 함수를 사용합니다.

`sys.int_info`는 Python에 유사한 정보를 노출합니다.

*   **`uint8_t bits_per_digit`** : digit당 비트 수. 예를 들어, 15비트 digit은 비트 0-14에 유의미한 정보가 포함됨을 의미합니다.
*   **`uint8_t digit_size`** : digit의 바이트 크기. 예를 들어, 15비트 digit은 최소 2바이트를 필요로 합니다.
*   **`int8_t digits_order`** : digit 순서:
    *   `1`: 최상위 digit 우선 (most significant digit first)
    *   `-1`: 최하위 digit 우선 (least significant digit first)
*   **`int8_t digit_endianness`** : digit의 엔디안(endianness):
    *   `1`: 최상위 바이트 우선 (big endian)
    *   `-1`: 최하위 바이트 우선 (little endian)

#### `const PyLongLayout *PyLong_GetNativeLayout(void)`
Python `int` 객체의 기본 레이아웃을 가져옵니다. `PyLongLayout` 구조체를 참조하세요.
이 함수는 Python 초기화 전이나 종료 후에는 호출되어서는 안 됩니다. 반환된 레이아웃은 Python이 종료될 때까지 유효합니다. 이 레이아웃은 모든 Python 서브 인터프리터에서 동일하므로 캐시할 수 있습니다.

### Export API
Python `int` 객체를 export하는 데 사용됩니다.

#### `struct PyLongExport`
Python `int` 객체의 export 구조입니다. 두 가지 경우가 있습니다:
*   `digits`가 `NULL`인 경우, `value` 멤버만 사용합니다.
*   `digits`가 `NULL`이 아닌 경우, `negative`, `ndigits`, `digits` 멤버를 사용합니다.

*   **`int64_t value`** : export된 `int` 객체의 네이티브 정수 값. `digits`가 `NULL`인 경우에만 유효합니다.
*   **`uint8_t negative`** : 숫자가 음수이면 `1`, 아니면 `0`. `digits`가 `NULL`이 아닌 경우에만 유효합니다.
*   **`Py_ssize_t ndigits`** : `digits` 배열의 digit 수. `digits`가 `NULL`이 아닌 경우에만 유효합니다.
*   **`const void *digits`**: 읽기 전용 부호 없는 digit 배열. `NULL`일 수 있습니다.

`PyLongExport.digits`가 `NULL`이 아닌 경우, `PyLongExport` 구조체의 private 필드에 Python `int` 객체에 대한 강력한 참조(strong reference)를 저장하여 `PyLong_FreeExport()`가 호출될 때까지 구조체가 유효하게 유지되도록 합니다.

#### `int PyLong_Export(PyObject *obj, PyLongExport *export_long)`
Python `int` 객체를 export합니다.
`export_long`은 호출자가 할당한 `PyLongExport` 구조체를 가리켜야 하며, `NULL`이 아니어야 합니다.
성공 시 `*export_long`을 채우고 `0`을 반환합니다. 오류 발생 시 예외를 설정하고 `-1`을 반환합니다.
export가 더 이상 필요하지 않을 때 `PyLong_FreeExport()`를 호출해야 합니다.

CPython 구현 세부 사항: `obj`가 Python `int` 객체 또는 서브클래스인 경우 이 함수는 항상 성공합니다.
CPython 3.14에서는 `PyLong_Export()`에서 메모리 복사가 필요하지 않으며, 이는 Python `int`의 내부 digit 배열을 노출하기 위한 얇은 래퍼(thin wrapper)에 불과합니다.

#### `void PyLong_FreeExport(PyLongExport *export_long)`
`PyLong_Export()`로 생성된 `export_long` export를 해제합니다.
CPython 구현 세부 사항: `export_long->digits`가 `NULL`인 경우 `PyLong_FreeExport()` 호출은 선택 사항입니다.

### Import API
`PyLongWriter` API를 사용하여 정수를 import할 수 있습니다.

#### `struct PyLongWriter`
Python `int` writer 인스턴스입니다.
이 인스턴스는 `PyLongWriter_Finish()` 또는 `PyLongWriter_Discard()`에 의해 파괴되어야 합니다.

#### `PyLongWriter *PyLongWriter_Create(int negative, Py_ssize_t ndigits, void **digits)`
`PyLongWriter`를 생성합니다.
성공 시 `*digits`를 할당하고 writer를 반환합니다. 오류 발생 시 예외를 설정하고 `NULL`을 반환합니다.
`negative`는 숫자가 음수이면 `1`, 아니면 `0`입니다.
`ndigits`는 `digits` 배열의 숫자(digit) 수입니다. `0`보다 커야 합니다.
`digits`는 `NULL`이 아니어야 합니다.

이 함수를 성공적으로 호출한 후, 호출자는 `digits` 배열을 채우고 `PyLongWriter_Finish()`를 호출하여 Python `int`를 얻어야 합니다. `digits`의 레이아웃은 `PyLong_GetNativeLayout()`에 의해 설명됩니다.
Digits는 `[0; (1 << bits_per_digit) - 1]` 범위에 있어야 합니다 (`bits_per_digit`는 digit당 비트 수). 사용되지 않는 최상위 digit은 `0`으로 설정해야 합니다.
또는 `PyLongWriter_Discard()`를 호출하여 `int` 객체를 생성하지 않고 writer 인스턴스를 파괴할 수 있습니다.

CPython 3.14에서는 `PyLongWriter_Create()` 구현이 private `_PyLong_New()` 함수에 대한 얇은 래퍼입니다.

#### `PyObject *PyLongWriter_Finish(PyLongWriter *writer)`
`PyLongWriter_Create()`로 생성된 `PyLongWriter`를 완료합니다.
성공 시 Python `int` 객체를 반환합니다. 오류 발생 시 예외를 설정하고 `NULL`을 반환합니다.
이 함수는 digit을 정규화하고 필요한 경우 객체를 compact integer로 변환합니다.
호출 후 writer 인스턴스와 digits 배열은 유효하지 않습니다.

#### `void PyLongWriter_Discard(PyLongWriter *writer)`
`PyLongWriter_Create()`로 생성된 `PyLongWriter`를 폐기합니다.
`writer`는 `NULL`이 아니어야 합니다.
호출 후 writer 인스턴스와 digits 배열은 유효하지 않습니다.

### 작은 정수 import 최적화 (Optimize import for small integers)
제안된 import API는 큰 정수에 효율적입니다. Python 내부(`internals`)에 직접 접근하는 것과 비교할 때, 제안된 import API는 작은 정수에서 상당한 성능 오버헤드를 가질 수 있습니다.

몇 개의 digit을 가진 작은 정수(예: 1 또는 2 digit)의 경우, 기존 API를 사용할 수 있습니다:
*   `PyLong_FromUInt64()`
*   `PyLong_FromLong()`
*   `PyLong_FromNativeBytes()`

## 구현 (Implementation)
*   **CPython:**
    *   [https://github.com/python/cpython/pull/121339](https://github.com/python/cpython/pull/121339)
    *   [https://github.com/vstinner/cpython/pull/5](https://github.com/vstinner/cpython/pull/5)
*   **gmpy:**
    *   [https://github.com/aleaxit/gmpy/pull/495](https://github.com/aleaxit/gmpy/pull/495)

## 벤치마크 (Benchmarks)

### Export: `PyLong_Export()` with `gmpy2`
벤치마크 결과 (Linux Fedora 40, CPU 격리, 릴리스 모드로 빌드된 Python):

| Benchmark | ref     | pep757  |                       |
| :-------- | :------ | :------ | :-------------------- |
| `1<<7`    | 91.3 ns | 89.9 ns | 1.02x faster          |
| `1<<38`   | 120 ns  | 94.9 ns | 1.27x faster          |
| `1<<300`  | 196 ns  | 203 ns  | 1.04x slower          |
| `1<<3000` | 939 ns  | 945 ns  | 1.01x slower          |
| Geometric mean (ref) |         |         | 1.05x faster          |

`1<<7` (128) 및 `1<<38`과 같은 작은 정수의 export에서 `pep757` 구현이 더 빠르며, `1<<300` 및 `1<<3000`과 같은 큰 정수에서는 약간 느리거나 비슷한 성능을 보였습니다.

### Import: `PyLongWriter_Create()` with `gmpy2`
벤치마크 결과 (Linux Fedora 40, CPU 격리, 릴리스 모드로 빌드된 Python):

| Benchmark | ref     | pep757  |                       |
| :-------- | :------ | :------ | :-------------------- |
| `1<<7`    | 56.7 ns | 56.2 ns | 1.01x faster          |
| `1<<300`  | 191 ns  | 213 ns  | 1.12x slower          |
| Geometric mean (ref) |         |         | 1.03x slower          |

`1<<7` (128)과 같은 작은 정수의 import에서 `pep757` 구현이 약간 더 빠르며, `1<<300`과 같은 큰 정수에서는 약간 느려졌습니다. `1<<38`, `1<<3000` 벤치마크는 유의미하지 않다고 숨겨졌습니다.

## 하위 호환성 (Backwards Compatibility)
새로운 API만 추가되므로 하위 호환성에 미치는 영향은 없습니다.

## 기각된 아이디어 (Rejected Ideas)

### 임의의 레이아웃 지원 (Support arbitrary layout)
Python 정수를 import-export하기 위해 임의의 레이아웃을 지원하는 것은 편리할 수 있습니다. 예를 들어, `PyLongWriter_Create()`에 `layout` 매개변수를 추가하고 `PyLongExport` 구조체에 `layout` 멤버를 추가하는 것이 제안되었습니다.
그러나 구현이 더 복잡하고 실제로 필요하지 않습니다. 엄밀히 필요한 것은 Python의 "네이티브(native)" 레이아웃을 사용하여 import-export하는 API뿐입니다.
나중에 임의의 레이아웃에 대한 사용 사례가 있다면 새로운 API를 추가할 수 있습니다.

### `PyLong_GetNativeLayout()` 함수를 추가하지 않음 (Don't add PyLong_GetNativeLayout() function)
현재 대부분의 정수 import/export에 필요한 정보는 `PyLong_GetInfo()` (및 `sys.int_info`)를 통해 이미 사용 가능합니다. 또한, 더 많은 정보(예: digits 순서)를 추가할 수 있으며, 이 인터페이스는 `PyLongObject`의 미래 발전에 어떤 제약도 가하지 않습니다.
문제는 `PyLong_GetInfo()`가 편리한 C 구조체가 아닌 Python 객체(named tuple)를 반환한다는 점이며, 이는 사람들이 현재의 세미-프라이빗 매크로(`PyLong_SHIFT` 및 `PyLong_BASE` 등)를 선호하게 만들 수 있습니다.

### `mpz_import/export`와 유사한 API 제공 (Provide mpz_import/export-like API instead)
`int` 객체에서 데이터를 import/export하는 또 다른 접근 방식은 C 확장이 연속적인 버퍼를 제공하고 CPython이 정수의 절대값을 export(또는 import)하는 것을 기대하는 것입니다.
이 접근 방식의 주요 단점은 CPython 측면에서 훨씬 더 복잡하다는 것입니다(즉, 다른 레이아웃 간의 실제 변환). 예를 들어, `CPython`에서 `PyLong_FromNativeBytes()` 및 `PyLong_AsNativeBytes()` 구현(함께 필요한 API의 제한된 버전을 제공)은 약 500줄의 코드를 차지했습니다(현재 구현은 약 100줄).

### export API에서 `value` 필드를 삭제 (Drop value field from the export API)
이 제안에 따르면, 하나의 export 유형(digit 배열)만 존재하게 됩니다. 주어진 정수에 대해 이러한 뷰를 사용할 수 없는 경우, export 함수에 의해 에뮬레이션되거나 `PyLong_Export()`가 오류를 반환할 것입니다. 두 경우 모두, 사용자는 `PyLong_AsLongAndOverflow()`와 같이 "충분히 작은" 정수(즉, 일부 머신 정수 형식에 맞는 정수)를 얻기 위해 다른 C-API 함수를 사용할 것으로 가정합니다. 이 경우 `PyLong_Export()`는 비효율적이거나 실패할 것입니다.
이는 API 설계자 관점에서는 단순화처럼 보일 수 있지만, 최종 사용자에게는 덜 편리할 것입니다. 사용자는 Python 개발을 따라야 하고, 작은 정수를 export하기 위한 다양한 변형을 벤치마크하며(위의 경우 `PyLong_AsInt64()` 대신 선택된 이유가 명확한가요?), 다양한 CPython 버전 또는 다른 Python 구현에 대해 다른 코드 경로를 지원해야 할 수도 있습니다.

## 논의 (Discussions)
*   Discourse: [PEP 757 – C API to import-export Python integers](https://discuss.python.org/t/pep-757-c-api-to-import-export-python-integers/48025)
*   C API Working Group decision [issue #35](https://github.com/python/cpython/issues/35)
*   Pull request [#121339](https://github.com/python/cpython/pull/121339)
*   Issue [#102471](https://github.com/python/cpython/issues/102471): The C-API for Python to C integer conversion is, to be frank, a mess.
*   Add public function `PyLong_GetDigits()`
*   Consider restoring `_PyLong_New()` function as public
*   Pull request [gh-106320](https://github.com/python/cpython/pull/106320): Remove private `_PyLong_New()` function.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건에 따라 배포됩니다.

The translation is complete, following all the specified guidelines.

# PEP 757 – C API를 이용한 Python 정수 import/export

## 개요
새로운 C API, 특히 `PyLongWriter_Create()` 및 `PyLong_Export()` 함수를 추가하여 Python 정수(`int` 객체)를 import하고 export하는 기능을 제공합니다.

## 도입 배경 (Rationale)
`gmpy2`, `SAGE`, `Python-FLINT`와 같은 프로젝트들은 Python의 내부(`PyLongObject` 구조체)에 직접 접근하거나 비효율적인 임시 형식(예: `Python-FLINT`의 16진수 문자열)을 사용하여 Python `int` 객체를 import 및 export합니다.

Python 3.12에서는 `int` 구현이 `tag`와 "compact values"를 추가하는 방향으로 변경되었습니다. 3.13 alpha 1 릴리스에서는 비공개, 비문서화된 `_PyLong_New()` 함수가 제거되었지만, 이 함수는 앞서 언급된 프로젝트들에서 Python 정수를 import하는 데 사용되고 있었습니다. 이 함수는 3.13 alpha 2에서 복원되었습니다.

이러한 프로젝트들이 Python의 내부 구현 세부 사항에 노출되지 않으면서도 효율적으로 연동될 수 있도록, 공개적이고 효율적인 추상화 계층이 필요합니다. 이는 Python 내부 구현이 변경되더라도 해당 프로젝트들이 깨지지 않도록 할 것입니다. 예를 들어, `gmpy2`의 구현은 최근 CPython 3.9 및 CPython 3.12에 맞춰 변경된 바 있습니다.

## 명세 (Specification)

### 레이아웃 API (Layout API)
GMP(GNU Multiple Precision Arithmetic Library)와 유사한 import-export 함수에 필요한 데이터입니다.

#### `struct PyLongLayout`
임의 정밀도 정수의 절대값을 나타내는 "digit" 배열(GMP 용어로는 "limb")의 레이아웃입니다. "충분히 큰" 절대값을 가진 정수에서 내부적으로 사용되는 Python `int` 객체의 기본 레이아웃을 얻으려면 `PyLong_GetNativeLayout()` 함수를 사용합니다.

`sys.int_info`는 Python에 유사한 정보를 노출합니다.

*   **`uint8_t bits_per_digit`** : digit당 비트 수. 예를 들어, 15비트 digit은 비트 0-14에 유의미한 정보가 포함됨을 의미합니다.
*   **`uint8_t digit_size`** : digit의 바이트 크기. 예를 들어, 15비트 digit은 최소 2바이트를 필요로 합니다.
*   **`int8_t digits_order`** : digit 순서:
    *   `1`: 최상위 digit 우선 (most significant digit first)
    *   `-1`: 최하위 digit 우선 (least significant digit first)
*   **`int8_t digit_endianness`** : digit의 엔디안(endianness):
    *   `1`: 최상위 바이트 우선 (big endian)
    *   `-1`: 최하위 바이트 우선 (little endian)

#### `const PyLongLayout *PyLong_GetNativeLayout(void)`
Python `int` 객체의 기본 레이아웃을 가져옵니다. `PyLongLayout` 구조체를 참조하세요.
이 함수는 Python 초기화 전이나 종료 후에는 호출되어서는 안 됩니다. 반환된 레이아웃은 Python이 종료될 때까지 유효합니다. 이 레이아웃은 모든 Python 서브 인터프리터에서 동일하므로 캐시할 수 있습니다.

### Export API
Python `int` 객체를 export하는 데 사용됩니다.

#### `struct PyLongExport`
Python `int` 객체의 export 구조입니다. 두 가지 경우가 있습니다:
*   `digits`가 `NULL`인 경우, `value` 멤버만 사용합니다.
*   `digits`가 `NULL`이 아닌 경우, `negative`, `ndigits`, `digits` 멤버를 사용합니다.

*   **`int64_t value`** : export된 `int` 객체의 네이티브 정수 값. `digits`가 `NULL`인 경우에만 유효합니다.
*   **`uint8_t negative`** : 숫자가 음수이면 `1`, 아니면 `0`. `digits`가 `NULL`이 아닌 경우에만 유효합니다.
*   **`Py_ssize_t ndigits`** : `digits` 배열의 digit 수. `digits`가 `NULL`이 아닌 경우에만 유효합니다.
*   **`const void *digits`**: 읽기 전용 부호 없는 digit 배열. `NULL`일 수 있습니다.

`PyLongExport.digits`가 `NULL`이 아닌 경우, `PyLongExport` 구조체의 private 필드에 Python `int` 객체에 대한 강력한 참조(strong reference)를 저장하여 `PyLong_FreeExport()`가 호출될 때까지 구조체가 유효하게 유지되도록 합니다.

#### `int PyLong_Export(PyObject *obj, PyLongExport *export_long)`
Python `int` 객체를 export합니다.
`export_long`은 호출자가 할당한 `PyLongExport` 구조체를 가리켜야 하며, `NULL`이 아니어야 합니다.
성공 시 `*export_long`을 채우고 `0`을 반환합니다. 오류 발생 시 예외를 설정하고 `-1`을 반환합니다.
export가 더 이상 필요하지 않을 때 `PyLong_FreeExport()`를 호출해야 합니다.

CPython 구현 세부 사항: `obj`가 Python `int` 객체 또는 서브클래스인 경우 이 함수는 항상 성공합니다.
CPython 3.14에서는 `PyLong_Export()`에서 메모리 복사가 필요하지 않으며, 이는 Python `int`의 내부 digit 배열을 노출하기 위한 얇은 래퍼(thin wrapper)에 불과합니다.

#### `void PyLong_FreeExport(PyLongExport *export_long)`
`PyLong_Export()`로 생성된 `export_long` export를 해제합니다.
CPython 구현 세부 사항: `export_long->digits`가 `NULL`인 경우 `PyLong_FreeExport()` 호출은 선택 사항입니다.

### Import API
`PyLongWriter` API를 사용하여 정수를 import할 수 있습니다.

#### `struct PyLongWriter`
Python `int` writer 인스턴스입니다.
이 인스턴스는 `PyLongWriter_Finish()` 또는 `PyLongWriter_Discard()`에 의해 파괴되어야 합니다.

#### `PyLongWriter *PyLongWriter_Create(int negative, Py_ssize_t ndigits, void **digits)`
`PyLongWriter`를 생성합니다.
성공 시 `*digits`를 할당하고 writer를 반환합니다. 오류 발생 시 예외를 설정하고 `NULL`을 반환합니다.
`negative`는 숫자가 음수이면 `1`, 아니면 `0`입니다.
`ndigits`는 `digits` 배열의 숫자(digit) 수입니다. `0`보다 커야 합니다.
`digits`는 `NULL`이 아니어야 합니다.

이 함수를 성공적으로 호출한 후, 호출자는 `digits` 배열을 채우고 `PyLongWriter_Finish()`를 호출하여 Python `int`를 얻어야 합니다. `digits`의 레이아웃은 `PyLong_GetNativeLayout()`에 의해 설명됩니다.
Digits는 `[0; (1 << bits_per_digit) - 1]` 범위에 있어야 합니다 (`bits_per_digit`는 digit당 비트 수). 사용되지 않는 최상위 digit은 `0`으로 설정해야 합니다.
또는 `PyLongWriter_Discard()`를 호출하여 `int` 객체를 생성하지 않고 writer 인스턴스를 파괴할 수 있습니다.

CPython 3.14에서는 `PyLongWriter_Create()` 구현이 private `_PyLong_New()` 함수에 대한 얇은 래퍼입니다.

#### `PyObject *PyLongWriter_Finish(PyLongWriter *writer)`
`PyLongWriter_Create()`로 생성된 `PyLongWriter`를 완료합니다.
성공 시 Python `int` 객체를 반환합니다. 오류 발생 시 예외를 설정하고 `NULL`을 반환합니다.
이 함수는 digit을 정규화하고 필요한 경우 객체를 compact integer로 변환합니다.
호출 후 writer 인스턴스와 digits 배열은 유효하지 않습니다.

#### `void PyLongWriter_Discard(PyLongWriter *writer)`
`PyLongWriter_Create()`로 생성된 `PyLongWriter`를 폐기합니다.
`writer`는 `NULL`이 아니어야 합니다.
호출 후 writer 인스턴스와 digits 배열은 유효하지 않습니다.

### 작은 정수 import 최적화 (Optimize import for small integers)
제안된 import API는 큰 정수에 효율적입니다. Python 내부(`internals`)에 직접 접근하는 것과 비교할 때, 제안된 import API는 작은 정수에서 상당한 성능 오버헤드를 가질 수 있습니다.

몇 개의 digit을 가진 작은 정수(예: 1 또는 2 digit)의 경우, 기존 API를 사용할 수 있습니다:
*   `PyLong_FromUInt64()`
*   `PyLong_FromLong()`
*   `PyLong_FromNativeBytes()`

## 구현 (Implementation)
*   **CPython:**
    *   [https://github.com/python/cpython/pull/121339](https://github.com/python/cpython/pull/121339)
    *   [https://github.com/vstinner/cpython/pull/5](https://github.com/vstinner/cpython/pull/5)
*   **gmpy:**
    *   [https://github.com/aleaxit/gmpy/pull/495](https://github.com/aleaxit/gmpy/pull/495)

## 벤치마크 (Benchmarks)

### Export: `PyLong_Export()` with `gmpy2`
벤치마크 결과 (Linux Fedora 40, CPU 격리, 릴리스 모드로 빌드된 Python):

| Benchmark | ref     | pep757  |                       |
| :-------- | :------ | :------ | :-------------------- |
| `1<<7`    | 91.3 ns | 89.9 ns | 1.02x faster          |
| `1<<38`   | 120 ns  | 94.9 ns | 1.27x faster          |
| `1<<300`  | 196 ns  | 203 ns  | 1.04x slower          |
| `1<<3000` | 939 ns  | 945 ns  | 1.01x slower          |
| Geometric mean (ref) |         |         | 1.05x faster          |

`1<<7` (128) 및 `1<<38`과 같은 작은 정수의 export에서 `pep757` 구현이 더 빠르며, `1<<300` 및 `1<<3000`과 같은 큰 정수에서는 약간 느리거나 비슷한 성능을 보였습니다.

### Import: `PyLongWriter_Create()` with `gmpy2`
벤치마크 결과 (Linux Fedora 40, CPU 격리, 릴리스 모드로 빌드된 Python):

| Benchmark | ref     | pep757  |                       |
| :-------- | :------ | :------ | :-------------------- |
| `1<<7`    | 56.7 ns | 56.2 ns | 1.01x faster          |
| `1<<300`  | 191 ns  | 213 ns | 1.12x slower          |
| Geometric mean (ref) |         |         | 1.03x slower          |

`1<<7` (128)과 같은 작은 정수의 import에서 `pep757` 구현이 약간 더 빠르며, `1<<300`과 같은 큰 정수에서는 약간 느려졌습니다. `1<<38`, `1<<3000` 벤치마크는 유의미하지 않다고 숨겨졌습니다.

## 하위 호환성 (Backwards Compatibility)
새로운 API만 추가되므로 하위 호환성에 미치는 영향은 없습니다.

## 기각된 아이디어 (Rejected Ideas)

### 임의의 레이아웃 지원 (Support arbitrary layout)
Python 정수를 import-export하기 위해 임의의 레이아웃을 지원하는 것은 편리할 수 있습니다. 예를 들어, `PyLongWriter_Create()`에 `layout` 매개변수를 추가하고 `PyLongExport` 구조체에 `layout` 멤버를 추가하는 것이 제안되었습니다.
그러나 구현이 더 복잡하고 실제로 필요하지 않습니다. 엄밀히 필요한 것은 Python의 "네이티브(native)" 레이아웃을 사용하여 import-export하는 API뿐입니다.
나중에 임의의 레이아웃에 대한 사용 사례가 있다면 새로운 API를 추가할 수 있습니다.

### `PyLong_GetNativeLayout()` 함수를 추가하지 않음 (Don't add PyLong_GetNativeLayout() function)
현재 대부분의 정수 import/export에 필요한 정보는 `PyLong_GetInfo()` (및 `sys.int_info`)를 통해 이미 사용 가능합니다. 또한, 더 많은 정보(예: digits 순서)를 추가할 수 있으며, 이 인터페이스는 `PyLongObject`의 미래 발전에 어떤 제약도 가하지 않습니다.
문제는 `PyLong_GetInfo()`가 편리한 C 구조체가 아닌 Python 객체(named tuple)를 반환한다는 점이며, 이는 사람들이 현재의 세미-프라이빗 매크로(`PyLong_SHIFT` 및 `PyLong_BASE` 등)를 선호하게 만들 수 있습니다.

### `mpz_import/export`와 유사한 API 제공 (Provide mpz_import/export-like API instead)
`int` 객체에서 데이터를 import/export하는 또 다른 접근 방식은 C 확장이 연속적인 버퍼를 제공하고 CPython이 정수의 절대값을 export(또는 import)하는 것을 기대하는 것입니다.
이 접근 방식의 주요 단점은 CPython 측면에서 훨씬 더 복잡하다는 것입니다(즉, 다른 레이아웃 간의 실제 변환). 예를 들어, `CPython`에서 `PyLong_FromNativeBytes()` 및 `PyLong_AsNativeBytes()` 구현(함께 필요한 API의 제한된 버전을 제공)은 약 500줄의 코드를 차지했습니다(현재 구현은 약 100줄).

### export API에서 `value` 필드를 삭제 (Drop value field from the export API)
이 제안에 따르면, 하나의 export 유형(digit 배열)만 존재하게 됩니다. 주어진 정수에 대해 이러한 뷰를 사용할 수 없는 경우, export 함수에 의해 에뮬레이션되거나 `PyLong_Export()`가 오류를 반환할 것입니다. 두 경우 모두, 사용자는 `PyLong_AsLongAndOverflow()`와 같이 "충분히 작은" 정수(즉, 일부 머신 정수 형식에 맞는 정수)를 얻기 위해 다른 C-API 함수를 사용할 것으로 가정합니다. 이 경우 `PyLong_Export()`는 비효율적이거나 실패할 것입니다.
이는 API 설계자 관점에서는 단순화처럼 보일 수 있지만, 최종 사용자에게는 덜 편리할 것입니다. 사용자는 Python 개발을 따라야 하고, 작은 정수를 export하기 위한 다양한 변형을 벤치마크하며(위의 경우 `PyLong_AsInt64()` 대신 선택된 이유가 명확한가요?), 다양한 CPython 버전 또는 다른 Python 구현에 대해 다른 코드 경로를 지원해야 할 수도 있습니다.

## 논의 (Discussions)
*   Discourse: [PEP 757 – C API to import-export Python integers](https://discuss.python.org/t/pep-757-c-api-to-import-export-python-integers/48025)
*   C API Working Group decision [issue #35](https://github.com/python/cpython/issues/35)
*   Pull request [#121339](https://github.com/python/cpython/pull/121339)
*   Issue [#102471](https://github.com/python/cpython/issues/102471): The C-API for Python to C integer conversion is, to be frank, a mess.
*   Add public function `PyLong_GetDigits()`
*   Consider restoring `_PyLong_New()` function as public
*   Pull request [gh-106320](https://github.com/python/cpython/pull/106320): Remove private `_PyLong_New()` function.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건에 따라 배포됩니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.