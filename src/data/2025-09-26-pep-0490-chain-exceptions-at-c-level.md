---
title: "[Rejected] PEP 490 - Chain exceptions at C level"
excerpt: "Python Enhancement Proposal 490: 'Chain exceptions at C level'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/490/
toc: true
toc_sticky: true
date: 2025-09-26 22:35:41+0900
last_modified_at: 2025-09-26 22:35:41+0900
published: true
---
> **원문 링크:** [PEP 490 - Chain exceptions at C level](https://peps.python.org/pep-0490/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 25-Mar-2015



# PEP 490 – C 수준에서 예외 연결 (Chain exceptions at C level)

*   **작성자:** Victor Stinner <vstinner at python.org>
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2015년 3월 25일
*   **Python 버전:** 3.6

## 요약 (Abstract)
이 PEP는 Python 수준에서 이미 예외가 연결(chained)되는 것처럼, C 수준에서도 예외를 연결하는 것을 제안합니다.

## 도입 배경 (Rationale)
Python 3은 기본적으로 예외를 연결(chain)하는 새로운 기능을 도입했습니다 (PEP 3134).

예를 들어, 다음 Python 코드를 보면:
```python
try:
    raise TypeError("err1")
except TypeError:
    raise ValueError("err2")
```
출력은 다음과 같습니다.
```
Traceback (most recent call last):
  File "test.py", line 2, in <module>
    raise TypeError("err1")
TypeError: err1
During handling of the above exception, another exception occurred:
Traceback (most recent call last):
  File "test.py", line 4, in <module>
    raise ValueError("err2")
ValueError: err2
```
Python 코드에서는 예외가 기본적으로 연결되지만, C로 작성된 확장 모듈에서는 그렇지 않습니다.

새로운 비공개 함수 `_PyErr_ChainExceptions()`는 Python 3.4.3 및 3.5에서 예외를 연결하기 위해 도입되었습니다. 현재 이 함수는 예외를 연결하기 위해 명시적으로 호출해야 하며, 그 사용법이 간단하지 않습니다.

`zipimport` 모듈에서 이전 `OSError`를 새로운 `ZipImportError` 예외에 연결하기 위해 `_PyErr_ChainExceptions()`를 사용하는 예시는 다음과 같습니다.
```c
PyObject *exc, *val, *tb;
PyErr_Fetch(&exc, &val, &tb);
PyErr_Format(ZipImportError, "can't open Zip file: %R", archive);
_PyErr_ChainExceptions(exc, val, tb);
```
이 PEP는 일관성을 유지하고 디버깅에 도움이 되는 더 많은 실패 정보를 제공하기 위해 C 수준에서도 예외를 자동으로 연결할 것을 제안합니다. 위의 예시는 단순히 다음과 같이 될 수 있습니다.
```c
PyErr_Format(ZipImportError, "can't open Zip file: %R", archive);
```

## 제안 (Proposal)

### `PyErr_*()` 함수들을 수정하여 예외 연결
Python C API에서 예외를 발생시키는 C 함수들(`PyErr_SetString()`, `PyErr_Format()`, `PyErr_SetNone()` 등)을 수정하여 예외를 자동으로 연결하도록 제안합니다.

### 예외를 연결하지 않는 함수 수정
새로운 예외가 이전 예외의 정보를 포함하거나 더 많은 정보를 포함하는 경우, 특히 두 예외의 유형이 같은 경우에는 이전 예외를 유지하는 것이 항상 유용하지 않을 수 있습니다.

`int(str)`을 사용한 불필요한 예외 연결의 예시는 다음과 같습니다.
```
TypeError: a bytes-like object is required, not 'type'
During handling of the above exception, another exception occurred:
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: int() argument must be a string, a bytes-like object or a number, not 'type'
```
새로운 `TypeError` 예외가 이전 예외보다 더 많은 정보를 포함하고 있으므로, 이전 예외는 숨겨져야 합니다.

새로운 예외와 현재 예외를 연결하지 않으려면, 새로운 예외를 발생시키기 전에 `PyErr_Clear()` 함수를 호출하여 현재 예외를 지울 수 있습니다.

### 예외를 연결하는 함수 수정
일부 함수는 현재 예외를 저장한 다음 복원합니다. 새로운 예외가 발생하면, 현재 해당 예외는 함수에 따라 `sys.stderr`에 표시되거나 무시됩니다. 이러한 함수 중 일부는 대신 예외를 연결하도록 수정되어야 합니다.

새로운 예외를 무시하는 함수의 예시:
*   `ptrace_enter_call()`: 예외 무시
*   `subprocess_fork_exec()`: `enable_gc()`에 의해 발생하는 예외 무시
*   `_thread` 모듈의 `t_bootstrap()`: 부트스트랩 함수를 `sys.stderr`에 표시하려다 발생하는 예외 무시
*   `PyDict_GetItem()`, `_PyDict_GetItem_KnownHash()`: 딕셔너리에서 키를 찾을 때 발생하는 예외 무시
*   `_PyErr_TrySetFromCause()`: 예외 무시
*   `PyFrame_LocalsToFast()`: `dict_to_map()`에 의해 발생하는 예외 무시
*   `_PyObject_Dump()`: 예외 무시 (디버깅 용도로 Python 상태를 수정해서는 안 됨)
*   `Py_ReprLeave()`: 예외 무시 (보고할 방법이 없기 때문)
*   `type_dealloc()`: `remove_all_subclasses()`에 의해 발생하는 예외 무시
*   `PyObject_ClearWeakRefs()`: 예외 무시
*   `call_exc_trace()`, `call_trace_protected()`: 예외 무시
*   `remove_importlib_frames()`: 예외 무시
*   `do_mktuple()` (예: `Py_BuildValue()`에 사용되는 헬퍼): 예외 무시
*   `flush_io()`: 예외 무시
*   `sys_write()`, `sys_format()`: 예외 무시
*   `_PyTraceback_Add()`: 예외 무시
*   `PyTraceBack_Print()`: 예외 무시

새로운 예외를 `sys.stderr`에 표시하는 함수의 예시:
*   `atexit_callfuncs()`: `PyErr_Display()`로 예외를 표시하고 최신 예외를 반환 (여러 콜백을 호출하고 최신 예외만 반환)
*   `sock_dealloc()`: `ResourceWarning` 예외를 `PyErr_WriteUnraisable()`로 로깅
*   `slot_tp_del()`: `PyErr_WriteUnraisable()`로 예외 표시
*   `_PyGen_Finalize()`: `gen_close()` 예외를 `PyErr_WriteUnraisable()`로 표시
*   `slot_tp_finalize()`: `__del__()` 메서드에 의해 발생하는 예외를 `PyErr_WriteUnraisable()`로 표시
*   `PyErr_GivenExceptionMatches()`: `PyType_IsSubtype()`에 의해 발생하는 예외를 `PyErr_WriteUnraisable()`로 표시

## 하위 호환성 (Backward compatibility)
예외를 연결하는 것의 부작용 중 하나는 예외가 트레이스백(traceback) 객체를 저장하고, 트레이스백 객체는 프레임(frame) 객체를 저장하며, 프레임 객체는 지역 변수를 저장한다는 것입니다. 지역 변수는 예외에 의해 살아남게 됩니다. 일반적인 문제는 지역 변수와 예외 사이에 순환 참조(reference cycle)가 발생하는 것입니다. 즉, 예외가 지역 변수에 저장되고, 프레임이 예외에 간접적으로 저장되는 경우입니다. 이 순환 참조는 예외를 저장하는 애플리케이션에만 영향을 미칩니다.

이러한 순환 참조는 Python 3.5에 도입된 새로운 `traceback.TracebackException` 객체로 해결될 수 있습니다. 이 객체는 지역 변수를 저장하지 않고도 전체 텍스트 트레이스백을 포맷하는 데 필요한 정보를 저장합니다.

`asyncio` 모듈은 순환 참조 문제의 영향을 받습니다. 이 모듈은 Python 3.3용 버전을 출시하기 위해 Python 표준 라이브러리 외부에서도 유지 관리됩니다. `traceback.TracebackException`은 순환 참조 문제를 해결하기 위해 비공개 `asyncio` 모듈로 백포트될 수 있습니다.

## 대안 (Alternatives)

### 변경 없음 (No change)
새로운 비공개 함수 `_PyErr_ChainExceptions()`만으로도 예외를 수동으로 연결하기에 충분합니다. 예외는 의미 있는 곳에서만 명시적으로 연결될 것입니다.

### 새로운 예외 연결 헬퍼 함수 (New helpers to chain exceptions)
`PyErr_SetString()`과 같은 함수는 예외를 자동으로 연결하지 않습니다. `_PyErr_ChainExceptions()`의 사용을 더 쉽게 만들기 위해 다음과 같은 새로운 비공개 함수들이 추가될 수 있습니다.
*   `_PyErr_SetStringChain(exc_type, message)`
*   `_PyErr_FormatChain(exc_type, format, ...)`
*   `_PyErr_SetNoneChain(exc_type)`
*   `_PyErr_SetObjectChain(exc_type, exc_value)`

`_PyErr_SetKeyError(key)` 또는 `PyErr_SetImportError(message, name, path)`와 같은 특정 예외를 발생시키는 헬퍼 함수들은 예외를 연결하지 않습니다. 이 헬퍼 함수들과 예외를 연결하려면 일반적인 `_PyErr_ChainExceptions(exc_type, exc_value, exc_tb)` 함수를 사용해야 합니다.

## 부록 (Appendix)

*   **PEPs**:
    *   PEP 3134 – Exception Chaining and Embedded Tracebacks (Python 3.0): 예외에 대한 새로운 `__context__` 및 `__cause__` 속성.
    *   PEP 415 – Implement context suppression with exception attributes (Python 3.3): `raise exc from None`.
    *   PEP 409 – Suppressing exception context (PEP 415로 대체됨).
*   **Python C API**: `Include/pyerror.h` 헤더 파일은 예외 관련 함수들을 선언합니다.
    *   예외 발생 함수: `PyErr_SetNone()`, `PyErr_SetObject()`, `PyErr_SetString()`, `PyErr_Format()`.
    *   특정 예외 발생 헬퍼: `PyErr_BadArgument()`, `PyErr_BadInternalCall()`, `PyErr_NoMemory()`, `PyErr_SetFromErrno()`, `PyErr_SetFromWindowsErr()`, `PyErr_SetImportError()`, `_PyErr_SetKeyError()`, `_PyErr_TrySetFromCause()`.
    *   현재 예외 관리 함수: `PyErr_Clear()`, `PyErr_Fetch()`, `PyErr_Restore()`, `PyErr_GetExcInfo()`, `PyErr_SetExcInfo()`.
    *   예외 처리 기타 함수: `PyErr_ExceptionMatches()`, `PyErr_GivenExceptionMatches()`, `PyErr_NormalizeException()`, `_PyErr_ChainExceptions()`.
*   **Python Issues**: 예외 연결 및 예외 손실 방지와 관련된 여러 이슈가 언급되어 있습니다.

## 거부 (Rejection)
이 PEP는 2017년 9월 12일 Victor Stinner에 의해 거부되었습니다. `python-dev` 논의에서 C 예외를 기본적으로 연결하지 않고, 대신 의미 있는 곳에서만 명시적으로 연결하기로 결정되었습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.