---
title: "[Draft] PEP 743 - Add Py_COMPAT_API_VERSION to the Python C API"
excerpt: "Python Enhancement Proposal 743: 'Add Py_COMPAT_API_VERSION to the Python C API'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/743/
toc: true
toc_sticky: true
date: 2025-09-27 13:33:51+0900
last_modified_at: 2025-09-27 13:33:51+0900
published: true
---
> **원문 링크:** [PEP 743 - Add Py_COMPAT_API_VERSION to the Python C API](https://peps.python.org/pep-0743/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 11-Mar-2024



# PEP 743: Python C API에 Py_COMPAT_API_VERSION 추가

## 초록 (Abstract)

이 PEP는 오래되었거나 (soft-deprecated) 사용이 권장되지 않는 일부 심볼을 숨기는 `Py_COMPAT_API_VERSION` C 매크로를 추가할 것을 제안합니다. 이 매크로를 통해 사용자들은 이미 알려진 문제가 있고 더 나은 대안이 존재하는 API 사용을 선택적으로 피할 수 있습니다. 이 매크로는 버전이 지정되어 있어, 사용자들이 각자의 속도에 맞춰 업데이트 (또는 업데이트하지 않음)할 수 있습니다.

또한, `Py_` 접두사가 없는 API에 대해 네임스페이스가 지정된 대안을 추가하고, 기존 이름들은 사용이 권장되지 않도록 (soft-deprecate) 합니다.

## 동기 (Motivation)

Python C API의 일부는 시간이 지나고 나서야 명확해지는 결함들을 가지고 있습니다.

만약 API가 기능 추가나 최적화를 방해하거나, 심각한 보안 위험 또는 유지보수 부담을 초래한다면, PEP 387에 설명된 대로 해당 API를 사용 중단하고 (deprecate) 제거할 수 있습니다.

하지만, 일부 API는 "위험한 부분 (sharp edges)"을 가지고 있습니다. 즉, 현재 사용자들에게는 잘 작동하지만, 새로운 코드에서는 사용을 피해야 하는 API들입니다. 예를 들면 다음과 같습니다:

*   예외를 알릴 수 없어서 실패 시 무시되거나 치명적인 오류로 프로세스를 종료하는 API (예: `PyObject_HasAttr`).
*   뮤터블 객체에서 레퍼런스를 빌려오거나 미완성된 뮤터블 객체를 노출하여 스레드-안정적이지 않은 (thread-safe) API (예: `PyDict_GetItemWithError`).
*   `Py` 또는 `_Py` 접두사를 사용하지 않아 다른 코드와 충돌할 수 있는 이름의 API (예: `setter`).

이러한 결함에도 불구하고, 해당 API를 올바르게 사용하는 것이 대개 가능하다는 점은 중요합니다. 예를 들어, 단일 스레드 환경에서는 스레드 안전성 (thread safety)이 문제가 되지 않습니다. 우리는 일부 (또는 대부분) 다른 맥락에서는 잘못될 수 있는 API를 사용하더라도, 정상적으로 작동하는 코드를 망가뜨리고 싶지 않습니다.

반면에, 특히 더 안전한 대안이 존재하는 경우, 새로운 코드에서 이러한 "바람직하지 않은 (undesirable)" API를 사용하지 않도록 사용자들을 유도하고자 합니다.

### `Py` 접두사 추가 (Adding the `Py` prefix)

CPython 헤더에 정의된 일부 이름은 네임스페이스가 지정되어 있지 않습니다. 즉, `Py` 접두사 (또는 `_Py`와 같은 변형)가 없습니다. 예를 들어, 단순히 `setter`라는 함수 타입을 선언합니다.

이러한 이름들은 ABI에서 내보내지지 않지만 (`make smelly`로 확인됨), 사용자 코드와, 더 중요하게는 서드파티 확장과 연결된 라이브러리와 충돌할 수 있습니다. 네임스페이스가 지정된 별칭을 제공하고 이러한 이름을 (soft-)deprecate 하는 것이 가능하겠지만, 서드파티 코드와 충돌하지 않게 하는 유일한 방법은 Python 헤더에 아예 정의하지 않는 것입니다.

## 근거 (Rationale)

우리는 사용자들이 원한다면 "바람직하지 않은" API를 쉽게 피할 수 있는 방법을 제공하고자 합니다.

이는 서드파티 린터(linter)에 맡기는 것으로 충분할 수도 있습니다. 그러려면 (soft-)deprecated API 목록을 린터에 노출하는 좋은 방법이 필요합니다. 이 기능을 추가하면서, CPython 헤더에서 직접 린터의 역할을 수행하여 추가 도구의 필요성을 피할 수 있습니다. Python과 달리 C는 사용자가 "옵트인(opt-in)" 매크로를 정의함으로써 전체 프로젝트 또는 각 소스 파일에 대해 사용 가능한 API를 제한하기가 비교적 쉽습니다.

우리는 `Py_LIMITED_API`와 유사한 작업을 이미 수행하고 있습니다. 이 매크로는 사용 가능한 API를 안정적인 ABI로 컴파일되는 서브셋으로 제한합니다. (돌이켜보면, 특정 종류의 제한에는 다른 매크로 이름을 사용했어야 했지만, 지금은 변경하기에는 너무 늦었습니다.)

더 많은 "바람직하지 않은" API를 식별하고 더 안전한 대안을 추가함에 따라 기존 코드가 손상되는 것을 방지하기 위해, 옵트인 매크로는 버전이 지정되어야 합니다. 사용자들은 호환성 요구 사항에 따라 필요한 버전을 선택하고 각자의 속도로 업데이트할 수 있습니다.

명확히 말해, 이 메커니즘은 deprecation을 대체하는 것이 아닙니다. Deprecation은 새로운 기능이나 최적화를 방해하거나, 보안 위험 또는 유지보수 부담을 초래하는 API를 위한 것입니다. 반면에 이 메커니즘은 "우리가 일을 하는 약간 더 나은 방법을 찾았다"는 경우를 위한 것입니다. 아마도 오용하기 더 어렵거나, 단순히 덜 오해의 소지가 있는 이름을 가진 경우일 수 있습니다. (가볍게 말하자면: 많은 사람들이 함수 사이에 공백이 너무 많다고 경고하는 코드 품질 검사기를 설정합니다. 좀 더 실질적인 "코드 스멜 (code smells)"을 식별하는 데 도움을 줍시다!)

제안된 매크로는 API 정의를 변경하지 않으며, 단지 숨깁니다. 따라서 코드가 이 매크로와 함께 컴파일되면, 매크로 없이도 동일하게 컴파일되며 동일한 동작을 합니다. 이는 코어 개발자들에게 다음과 같은 의미를 가집니다: 바람직하지 않은 동작을 처리하려면 새롭고 더 나은 API를 도입한 다음 기존 API 사용을 권장하지 않아야 합니다. 이는 결국 개별 API를 검토하고 모든 알려진 문제를 한 번에 해결해야 함을 의미하며, 한 가지 종류의 문제에 대해 코드베이스 전체를 훑는 것을 피하여 동일한 함수의 여러 번의 이름 변경을 방지해야 합니다.

### `Py` 접두사 추가 (Adding the `Py` prefix)

옵트인 매크로를 사용하면 서드파티 라이브러리와 충돌할 수 있는 정의를 생략할 수 있습니다.

## 명세 (Specification)

`Py_COMPAT_API_VERSION` 매크로를 도입합니다. 이 매크로가 `#include <Python.h>` 이전에 정의되면, 아래에 설명된 일부 API 정의가 Python 헤더 파일에서 생략됩니다.

이 매크로는 `<Python.h>`에서 노출되는 완전한 최상위 정의만 생략합니다. 다른 것들 (ABI, 구조체 정의, 매크로 확장, static inline 함수 본문 등)은 영향을 받지 않습니다.

C API 워킹 그룹 (PEP 731)은 생략되는 정의 집합에 대한 권한을 가집니다.

생략되는 정의 집합은 CPython의 특정 기능 릴리스와 연결되며, 각 3.x.0 Beta 1 릴리스에서 확정됩니다. 드문 경우에, 항목은 언제든지 제거될 수 있습니다 (즉, 사용 가능하게 됨).

이 매크로는 `PY_VERSION_HEX`에서 사용되는 형식으로 버전을 정의해야 하며, "micro", "release", "serial" 필드는 0으로 설정됩니다. 예를 들어, 3.14.0b1에서 바람직하지 않은 것으로 간주되는 API를 생략하려면, 사용자들은 `Py_COMPAT_API_VERSION`을 `0x030e0000`으로 정의해야 합니다.

### 생략되는 API에 대한 요구 사항 (Requirements for omitted API)

`Py_COMPAT_API_VERSION`으로 생략되는 API는 다음을 충족해야 합니다:

*   soft-deprecated 되어야 합니다 (PEP 387 참조).
*   API의 모든 알려진 사용 사례에 대해 문서화된 대안 또는 해결 방법이 있어야 합니다.
*   계속 작동하는지 확인하기 위한 테스트가 있어야 합니다 ( `#define` 또는 `typedef`를 사용한 1:1 이름 변경 제외).
*   문서화되어야 합니다 (이전 버전의 문서에 언급된 적이 없는 경우는 제외).
*   C API 워킹 그룹의 승인을 받아야 합니다. (워킹 그룹은 관련 API 그룹에 대해 포괄적인 승인을 줄 수 있습니다. 아래 "초기 세트" 참조).

`Py_COMPAT_API_VERSION`은 더 나은 대안으로 쉽게 대체될 수 있는 API를 위한 것임을 유의하십시오. 대체할 수 없는 API는 일반적으로 대신 deprecated되어야 합니다.

### 위치 (Location)

`Py_COMPAT_API_VERSION`에 의해 생략되는 모든 API 정의는 새로운 헤더 `Include/legacy.h`로 이동됩니다.

이는 린터(linter) 개발자가 목록을 컴파일하여 경고가 아닌 오류로 API에 플래그를 지정할 수 있도록 돕기 위함입니다.

소스 전용 구조체 (매크로, 타입)의 간단한 이름 변경의 경우, 이름은 대체 항목을 추가하는 동일한 버전 또는 동일한 PR에서 생략될 것으로 예상됩니다. 이는 원래 정의가 이름이 변경되고, 이전 이름에 대한 `typedef` 또는 `#define`이 `Include/legacy.h`에 추가됨을 의미합니다.

### 문서화 (Documentation)

생략된 API에 대한 문서는 일반적으로 다음을 따라야 합니다:

*   권장되는 대체 항목 뒤에 나타나야 합니다.
*   대체 항목을 참조해야 합니다 (예: "X와 유사하지만...").
*   대체 항목과의 차이점과 마이그레이션 조언에 초점을 맞춰야 합니다.

합당한 이유가 있는 경우 예외가 가능합니다.

### 초기 세트 (Initial set)

`Py_COMPAT_API_VERSION`이 `0x030e0000` (Python 3.14) 이상으로 설정될 때 생략될 초기 API 목록은 다음과 같습니다.

**빌려온 레퍼런스 (borrowed references)를 반환하는 API 생략:**

| 생략되는 API              | 대체 API                     |
| :------------------------ | :--------------------------- |
| `PyDict_GetItem()`        | `PyDict_GetItemRef()`        |
| `PyDict_GetItemString()`  | `PyDict_GetItemStringRef()`  |
| `PyImport_AddModule()`    | `PyImport_AddModuleRef()`    |
| `PyList_GetItem()`        | `PyList_GetItemRef()`        |

**사용 중단된 (deprecated) API 생략:**

| 생략되는 Deprecated API     | 대체 API                            |
| :-------------------------- | :---------------------------------- |
| `PY_FORMAT_SIZE_T`          | `"z"`                               |
| `PY_UNICODE_TYPE`           | `wchar_t`                           |
| `PyCode_GetFirstFree()`     | `PyUnstable_Code_GetFirstFree()`    |
| `PyCode_New()`              | `PyUnstable_Code_New()`             |
| `PyCode_NewWithPosOnlyArgs()` | `PyUnstable_Code_NewWithPosOnlyArgs()` |
| `PyImport_ImportModuleNoBlock()` | `PyImport_ImportModule()`         |
| `PyMem_DEL()`               | `PyMem_Free()`                      |
| `PyMem_Del()`               | `PyMem_Free()`                      |
| `PyMem_FREE()`              | `PyMem_Free()`                      |
| `PyMem_MALLOC()`            | `PyMem_Malloc()`                    |
| `PyMem_NEW()`               | `PyMem_New()`                       |
| `PyMem_REALLOC()`           | `PyMem_Realloc()`                   |
| `PyMem_RESIZE()`            | `PyMem_Resize()`                    |
| `PyModule_GetFilename()`    | `PyModule_GetFilenameObject()`      |
| `PyOS_AfterFork()`          | `PyOS_AfterFork_Child()`            |
| `PyObject_DEL()`            | `PyObject_Free()`                   |
| `PyObject_Del()`            | `PyObject_Free()`                   |
| `PyObject_FREE()`           | `PyObject_Free()`                   |
| `PyObject_MALLOC()`         | `PyObject_Malloc()`                 |
| `PyObject_REALLOC()`        | `PyObject_Realloc()`                |
| `PySlice_GetIndicesEx()`    | (현재 문서 참조)                    |
| `PyThread_ReInitTLS()`      | (더 이상 필요 없음)                 |
| `PyThread_create_key()`     | `PyThread_tss_alloc()`              |
| `PyThread_delete_key()`     | `PyThread_tss_free()`               |
| `PyThread_delete_key_value()` | `PyThread_tss_delete()`             |
| `PyThread_get_key_value()`  | `PyThread_tss_get()`                |
| `PyThread_set_key_value()`  | `PyThread_tss_set()`                |
| `PyUnicode_AsDecodedObject()` | `PyUnicode_Decode()`                |
| `PyUnicode_AsDecodedUnicode()` | `PyUnicode_Decode()`                |
| `PyUnicode_AsEncodedObject()` | `PyUnicode_AsEncodedString()`       |
| `PyUnicode_AsEncodedUnicode()` | `PyUnicode_AsEncodedString()`       |
| `PyUnicode_IS_READY()`      | (더 이상 필요 없음)                 |
| `PyUnicode_READY()`         | (더 이상 필요 없음)                 |
| `PyWeakref_GET_OBJECT()`    | `PyWeakref_GetRef()`                |
| `PyWeakref_GetObject()`     | `PyWeakref_GetRef()`                |
| `Py_UNICODE`                | `wchar_t`                           |
| `_PyCode_GetExtra()`        | `PyUnstable_Code_GetExtra()`        |
| `_PyCode_SetExtra()`        | `PyUnstable_Code_SetExtra()`        |
| `_PyDict_GetItemStringWithError()` | `PyDict_GetItemStringRef()`       |
| `_PyEval_RequestCodeExtraIndex()` | `PyUnstable_Eval_RequestCodeExtraIndex()` |
| `_PyHASH_BITS`              | `PyHASH_BITS`                       |
| `_PyHASH_IMAG`              | `PyHASH_IMAG`                       |
| `_PyHASH_INF`               | `PyHASH_INF`                        |
| `_PyHASH_MODULUS`           | `PyHASH_MODULUS`                    |
| `_PyHASH_MULTIPLIER`        | `PyHASH_MULTIPLIER`                 |
| `_PyObject_EXTRA_INIT`      | (더 이상 필요 없음)                 |
| `_PyThreadState_UncheckedGet()` | `PyThreadState_GetUnchecked()`    |
| `_PyUnicode_AsString()`     | `PyUnicode_AsUTF8()`                |
| `_Py_HashPointer()`         | `Py_HashPointer()`                  |
| `_Py_T_OBJECT`              | `Py_T_OBJECT_EX`                    |
| `_Py_WRITE_RESTRICTED`      | (더 이상 필요 없음)                 |

**Soft-deprecate 및 API 생략:**

| 생략되는 Deprecated API     | 대체 API                      |
| :-------------------------- | :---------------------------- |
| `PyDict_GetItemWithError()` | `PyDict_GetItemRef()`         |
| `PyDict_SetDefault()`       | `PyDict_SetDefaultRef()`      |
| `PyMapping_HasKey()`        | `PyMapping_HasKeyWithError()` |
| `PyMapping_HasKeyString()`  | `PyMapping_HasKeyStringWithError()` |
| `PyObject_HasAttr()`        | `PyObject_HasAttrWithError()` |
| `PyObject_HasAttrString()`  | `PyObject_HasAttrStringWithError()` |

**`<structmember.h>` 레거시 API 생략:**

`<Python.h>`에 포함되지 않고 별도로 포함되어야 하는 헤더 파일 `structmember.h`는 `Py_COMPAT_API_VERSION`이 정의되면 `#error`를 발생시킵니다. 이는 다음 API에 영향을 미칩니다:

| 생략되는 Deprecated API | 대체 API            |
| :---------------------- | :------------------ |
| `T_SHORT`               | `Py_T_SHORT`        |
| `T_INT`                 | `Py_T_INT`          |
| `T_LONG`                | `Py_T_LONG`         |
| `T_FLOAT`               | `Py_T_FLOAT`        |
| `T_DOUBLE`              | `Py_T_DOUBLE`       |
| `T_STRING`              | `Py_T_STRING`       |
| `T_OBJECT` (tp_getset)  | (문서 작성 예정)    |
| `T_CHAR`                | `Py_T_CHAR`         |
| `T_BYTE`                | `Py_T_BYTE`         |
| `T_UBYTE`               | `Py_T_UBYTE`        |
| `T_USHORT`              | `Py_T_USHORT`       |
| `T_UINT`                | `Py_T_UINT`         |
| `T_ULONG`               | `Py_T_ULONG`        |
| `T_STRING_INPLACE`      | `Py_T_STRING_INPLACE` |
| `T_BOOL`                | `Py_T_BOOL`         |
| `T_OBJECT_EX`           | `Py_T_OBJECT_EX`    |
| `T_LONGLONG`            | `Py_T_LONGLONG`     |
| `T_ULONGLONG`           | `Py_T_ULONGLONG`    |
| `T_PYSSIZET`            | `Py_T_PYSSIZET`     |
| `T_NONE` (tp_getset)    | (문서 작성 예정)    |
| `READONLY`              | `Py_READONLY`       |
| `PY_AUDIT_READ`         | `Py_AUDIT_READ`     |
| `READ_RESTRICTED`       | `Py_AUDIT_READ`     |
| `PY_WRITE_RESTRICTED`   | (더 이상 필요 없음) |
| `RESTRICTED`            | `Py_AUDIT_READ`     |

**Soft-deprecate 및 매크로 생략:**

*   `Py` / `_Py` 접두사가 없는 `typedef` (예: `getter`, `setter`, `allocfunc`)를 soft-deprecate하고 생략하며, 대신 접두사가 추가된 새로운 `typedef` (예: `Py_getter`)를 선호합니다.
*   `Py` / `_Py` 접두사가 없는 매크로 (예: `METH_O`, `CO_COROUTINE`, `FUTURE_ANNOTATIONS`, `WAIT_LOCK`)를 soft-deprecate하고 생략하며, 대신 접두사가 추가된 새로운 매크로 (예: `Py_METH_O`)를 선호합니다.
*   C API 워킹 그룹이 승인한 다른 모든 것.

이 제안된 대체 항목 또는 관련 문서가 3.14.0b1까지 제때 추가되지 않으면, `Py_COMPAT_API_VERSION`의 이후 버전에서 생략될 것입니다. (이는 `configure`에 의해 생성되는 매크로: `HAVE_*`, `WITH_*`, `ALIGNOF_*`, `SIZEOF_*` 및 공통 접두사가 없는 여러 매크로에 대해 예상됩니다.)

## 구현 (Implementation)

미정 (TBD)

## 열린 문제 (Open issues)

`Py_COMPAT_API_VERSION`이라는 이름은 이전 PEP에서 가져왔으며, 이 버전에는 적합하지 않습니다.

## 하위 호환성 (Backwards Compatibility)

이 매크로는 하위 호환성을 가집니다. 개발자는 자신의 속도에 맞춰, 잠재적으로 한 번에 하나의 소스 파일에 대해 매크로를 도입하고 업데이트할 수 있습니다.

## 논의 (Discussions)

이 PEP와 관련된 주요 논의 스레드는 다음과 같습니다:

*   PEP 743 – Add Py_COMPAT_API_VERSION to the Python C API (take 2) (2024년 7월)
*   Finishing the Great Renaming (2024년 5월)
*   PEP 743: Add Py_COMPAT_API_VERSION to the Python C API (2024년 3월)
*   C API Evolutions: Macro to hide deprecated functions (2023년 10월)
*   C API Problems: Opt-in macro for a new clean API? Subset of functions with no known issues (2023년 6월)

## 선례 (Prior Art)

*   PEP 384 "Defining a Stable ABI"의 `Py_LIMITED_API` 매크로.
*   전역 범위를 가졌던 거부된 PEP 606 "Python Compatibility Version".

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 있거나 CC0-1.0-Universal 라이선스에 따라 제공되며, 둘 중 더 허용적인 조건을 따릅니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.