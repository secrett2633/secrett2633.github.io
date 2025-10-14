---
title: "[Final] PEP 384 - Defining a Stable ABI"
excerpt: "Python Enhancement Proposal 384: 'Defining a Stable ABI'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/384/
toc: true
toc_sticky: true
date: 2025-09-26 21:04:32+0900
last_modified_at: 2025-09-26 21:04:32+0900
published: true
---
> **원문 링크:** [PEP 384 - Defining a Stable ABI](https://peps.python.org/pep-0384/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 17-May-2009

PEP 384 – 안정적인 ABI 정의 (Defining a Stable ABI)

이 문서는 Python 3의 수명 주기 동안 안정적으로 유지되며, 여러 Python 버전 간에 바이너리 호환성을 보장하는 API 함수 집합인 "안정적인 ABI"를 정의할 것을 제안합니다. 안정적인 ABI를 사용하는 확장 모듈과 Python 임베딩 애플리케이션은 재컴파일 없이도 서로 다른 Python 기능 릴리스에서 작동할 수 있습니다.

**중요:** 이 PEP는 역사적인 문서입니다. 최신 공식 문서는 C API 안정성 (사용자 문서) 및 Python의 C API 변경 (개발 문서)에서 확인할 수 있습니다.

---

## 초록 (Abstract)

현재 Python은 각 기능 릴리스마다 Windows에서 Python DLL의 새 이름을 도입하며, Unix에서는 확장 모듈에 대한 비호환성을 유발할 수 있습니다. 이 PEP는 Python 3의 수명 동안 안정적으로 유지되고 버전 간에 바이너리 호환성을 유지하는 안정적인 API 함수 집합을 정의할 것을 제안합니다. 확장 모듈 및 Python을 임베딩하는 애플리케이션은 이 안정적인 ABI에만 의존한다면 서로 다른 기능 릴리스에서도 작동할 수 있습니다.

## 도입 배경 (Rationale)

ABI 비호환성의 주된 원인은 메모리 내 구조체의 레이아웃 변경입니다. 예를 들어, Python 2.x 수명 주기 동안 문자열 내부화(interning) 방식이나 객체 크기를 나타내는 데 사용되는 데이터 유형이 변경되었습니다. 그 결과, 문자열, 리스트, 튜플의 필드에 직접 접근하는 확장 모듈은 재컴파일 없이 새로운 인터프리터 버전에 로드될 경우 작동하지 않게 됩니다. 필드 오프셋이 변경되어 확장 모듈이 잘못된 데이터에 접근할 수 있기 때문입니다.

일부 비호환성은 프레임 또는 코드 객체와 같은 인터프리터의 내부 객체에만 영향을 미칩니다. 이러한 변경 사항으로 인해 `PYTHON_API_VERSION`을 변경해야 했습니다. Linux에서는 ABI 변경이 큰 문제가 되지 않는 경우가 많지만, Windows에서는 여러 Python 버전의 동시 설치가 일반적이며, 확장 모듈은 최종 사용자가 아닌 개발자에 의해 컴파일됩니다. 이러한 ABI 비호환성 위험을 줄이기 위해 Python은 각 기능 릴리스마다 `pythonXY.dll`이라는 새 DLL 이름을 도입해왔습니다.

이 PEP를 통해 바이너리 확장 모듈이 특정 Python 기능 릴리스에 의존하는 것을 줄이고, Python을 임베딩하는 애플리케이션이 여러 릴리스에서 작동할 수 있도록 할 예정입니다.

## 사양 (Specification)

ABI 사양은 두 부분으로 나뉩니다: ABI와 함께 사용할 수 있는 함수(그룹)를 지정하는 API 사양과, 링크할 라이브러리를 지정하는 링키지(linkage) 사양입니다. 실제 ABI(메모리 내 구조체 레이아웃, 함수 호출 규약)는 명시적으로 지정되지 않고 컴파일러에 의해 암시됩니다.

### 용어 (Terminology)
이 ABI를 사용하려는 애플리케이션 및 확장 모듈은 여기에서부터 "애플리케이션"으로 통칭됩니다.

### 헤더 파일 및 전처리기 정의 (Header Files and Preprocessor Definitions)
애플리케이션은 `Python.h` (다른 시스템 헤더보다 먼저 포함) 또는 선택적으로 `pyconfig.h` 다음에 `Python.h`만 포함해야 합니다.
애플리케이션 컴파일 시, 전처리기 매크로 `Py_LIMITED_API`가 정의되어야 합니다. 이렇게 하면 ABI의 일부가 아닌 모든 정의가 숨겨집니다.

### 구조체 (Structures)
다음 구조체 및 구조체 필드만 애플리케이션에서 접근 가능합니다:
*   `PyObject` (`ob_refcnt`, `ob_type`)
*   `PyVarObject` (`ob_base`, `ob_size`)
*   `PyMethodDef` (`ml_name`, `ml_meth`, `ml_flags`, `ml_doc`)
*   `PyMemberDef` (`name`, `type`, `offset`, `flags`, `doc`)
*   `PyGetSetDef` (`name`, `get`, `set`, `doc`, `closure`)
*   `PyModuleDefBase` (`ob_base`, `m_init`, `m_index`, `m_copy`)
*   `PyModuleDef` (`m_base`, `m_name`, `m_doc`, `m_size`, `m_methods`, `m_traverse`, `m_clear`, `m_free`)
*   `PyStructSequence_Field` (`name`, `doc`)
*   `PyStructSequence_Desc` (`name`, `doc`, `fields`, `sequence`)
*   `PyType_Slot` (아래 참조)
*   `PyType_Spec` (아래 참조)

이 필드들에 대한 접근자 매크로 (`Py_REFCNT`, `Py_TYPE`, `Py_SIZE`)도 애플리케이션에서 사용 가능합니다.

다음 유형들은 사용 가능하지만, 불투명(opaque, 즉 불완전한) 타입입니다:
`PyThreadState`, `PyInterpreterState`, `struct _frame`, `struct symtable`, `struct _node`, `PyWeakReference`, `PyLongObject`, `PyTypeObject`.

### 타입 객체 (Type Objects)
타입 객체의 구조는 애플리케이션에서 사용할 수 없습니다. 이 ABI를 사용하는 애플리케이션에서는 "정적(static)" 타입 객체를 선언하는 것이 더 이상 불가능합니다. 대신, 타입 객체는 동적으로 생성됩니다.

타입을 쉽게 생성하기 위해 (특히 함수 포인터를 쉽게 채울 수 있도록), 다음 구조체와 함수가 제공됩니다:
```c
typedef struct{
    int slot;  /* slot id, see below */
    void *pfunc; /* function pointer */
} PyType_Slot;

typedef struct{
    const char* name;
    int basicsize;
    int itemsize;
    unsigned int flags;
    PyType_Slot *slots; /* terminated by slot==0. */
} PyType_Spec;

PyObject* PyType_FromSpec(PyType_Spec*);
```
`slot`을 지정하려면 고유한 slot ID가 제공되어야 합니다. 새로운 Python 버전은 새로운 slot ID를 도입할 수 있지만, slot ID는 재활용되지 않습니다. Slot은 사용 중단(deprecated)될 수 있지만, Python 3.x 내내 계속 지원됩니다.

slot ID는 Python 3.1에서 포인터를 포함하는 구조체의 필드 이름처럼 명명되며, `Py_` 접두사가 추가됩니다 (예: `tp_dealloc` 대신 `Py_tp_dealloc`).

다음 필드는 타입 정의 시 설정할 수 없습니다:
`tp_dict`, `tp_mro`, `tp_cache`, `tp_subclasses`, `tp_weaklist`, `tp_print`, `tp_weaklistoffset`, `tp_dictoffset`.

### typedefs
위에 나열된 구조체에 대한 `typedef` 외에도, 다음 `typedef`가 제공됩니다. 이들이 ABI에 포함된다는 것은 기본 유형이 플랫폼에서 변경되지 않아야 함을 의미합니다 (플랫폼 간에는 다를 수 있음).
`Py_uintptr_t`, `Py_intptr_t`, `Py_ssize_t`, `unaryfunc`, `binaryfunc`, `ternaryfunc`, `inquiry`, `lenfunc`, `ssizeargfunc`, `ssizessizeargfunc`, `ssizeobjargproc`, `ssizessizeobjargproc`, `objobjargproc`, `objobjproc`, `visitproc`, `traverseproc`, `destructor`, `getattrfunc`, `getattrofunc`, `setattrfunc`, `setattrofunc`, `reprfunc`, `hashfunc`, `richcmpfunc`, `getiterfunc`, `iternextfunc`, `descrgetfunc`, `descrsetfunc`, `initproc`, `newfunc`, `allocfunc`, `PyCFunction`, `PyCFunctionWithKeywords`, `PyNoArgsFunction`, `PyCapsule_Destructor`, `getter`, `setter`, `PyOS_sighandler_t`, `PyGILState_STATE`, `Py_UCS4`.

특히 `Py_UNICODE`는 `typedef`로 사용할 수 없습니다. 동일한 Python 버전에서도 동일한 플랫폼에서 `Py_UNICODE`의 다른 정의를 사용할 수 있기 때문입니다 (좁은 또는 넓은 코드 단위를 사용하는지에 따라 다름). Unicode 문자열의 내용에 접근해야 하는 애플리케이션은 이를 `wchar_t`로 변환할 수 있습니다.

### 함수 및 함수와 유사한 매크로 (Functions and function-like Macros)
별도로 제외되지 않는 한 모든 함수를 사용할 수 있습니다. 함수가 문서화되었는지 여부는 중요하지 않습니다.

함수와 유사한 매크로 (특히 필드 접근 매크로)는 애플리케이션에서 계속 사용할 수 있지만, 함수 호출로 대체됩니다 (정의가 다양한 `_Check` 매크로와 같이 ABI의 기능만을 참조하는 경우가 아니라면).

ABI 함수 선언은 매개변수나 반환 타입을 변경하지 않습니다. 시그니처 변경이 필요한 경우 새로운 함수가 도입됩니다. 새 함수가 소스 호환성이 있다면 (예: 반환 타입만 변경되는 경우), 애플리케이션이 재컴파일될 때 새 함수로 호출을 리디렉션하기 위해 별칭 매크로가 추가될 수 있습니다.

이전 함수의 계속된 제공이 불가능할 경우, 사용 중단(deprecated) 후 제거될 수 있으며, 해당 함수를 사용하는 애플리케이션은 작동을 멈출 수 있습니다.

### 제외된 함수 (Excluded Functions)
`_Py`로 시작하는 모든 함수는 애플리케이션에서 사용할 수 없습니다. 또한, `node*`와 같이 애플리케이션에서 사용할 수 없는 매개변수 유형을 예상하는 모든 함수 (예: `PyAST_FromNode`)는 ABI에서 제외됩니다.

다음 헤더 파일에 선언된 함수는 ABI의 일부가 아닙니다:
`bytes_methods.h`, `cellobject.h`, `classobject.h`, `code.h`, `compile.h`, `datetime.h`, `dtoa.h`, `frameobject.h`, `funcobject.h`, `genobject.h`, `longintrepr.h`, `parsetok.h`, `pyarena.h`, `pyatomic.h`, `pyctype.h`, `pydebug.h`, `pytime.h`, `symtable.h`, `token.h`, `ucnhash.h`.

또한, Windows에서 Microsoft C 런타임 DLL의 특정 버전에 의존하는 것을 피하기 위해 `FILE*`를 예상하는 함수는 ABI의 일부가 아닙니다.

모듈 및 타입 초기화/종료 함수 (`PyByteArray_Init`, `PyOS_FiniInterrupts` 및 `_Fini` 또는 `_ClearFreeList`로 끝나는 모든 함수)는 사용할 수 없습니다.

인터프리터 구현 세부 사항을 다루는 여러 함수도 사용할 수 없습니다:
`PyInterpreterState_Head`, `PyInterpreterState_Next`, `PyInterpreterState_ThreadHead`, `PyThreadState_Next`, `Py_SubversionRevision`, `Py_SubversionShortBranch`.

`PyStructSequence_InitType`는 호출자가 정적 타입 객체를 제공해야 하므로 사용할 수 없습니다.

`Py_FatalError`는 `pydebug.h`에서 다른 헤더 파일 (예: `pyerrors.h`)로 이동됩니다.

사용 가능한 함수의 정확한 목록은 `python3.dll`에 대한 Windows 모듈 정의 파일에 나와 있습니다.

### 전역 변수 (Global Variables)
타입과 예외를 나타내는 전역 변수는 애플리케이션에서 사용할 수 있습니다. 또한, 매크로에서 참조되는 선택된 전역 변수 (`Py_True` 및 `Py_False` 등)도 사용할 수 있습니다.

전역 변수 정의의 전체 목록은 `python3.def` 파일에 나와 있으며, `DATA`로 선언된 항목이 변수를 나타냅니다.

### 기타 매크로 (Other Macros)
심볼릭 상수를 정의하는 모든 매크로는 애플리케이션에서 사용할 수 있으며, 숫자 값은 변경되지 않습니다.
또한, 다음 매크로를 사용할 수 있습니다:
`Py_BEGIN_ALLOW_THREADS`, `Py_BLOCK_THREADS`, `Py_UNBLOCK_THREADS`, `Py_END_ALLOW_THREADS`.

### 버퍼 인터페이스 (The Buffer Interface)
`Py_buffer` 구조체의 안정성이 현재로서는 명확하지 않으므로, 버퍼 인터페이스 (`Py_buffer` 타입, `bf_getbuffer` 및 `bf_releasebuffer` 타입 슬롯 등)는 ABI에서 생략되었습니다. 향후 릴리스에서 ABI에 포함될 수 있습니다.

### 시그니처 변경 (Signature Changes)
현재 특정 구조체를 예상하는 여러 함수가 있지만, 호출자는 일반적으로 `PyObject*`를 사용합니다. 이 함수들은 매개변수로 `PyObject*`를 예상하도록 변경되었습니다. 이는 현재 매개변수 타입으로 명시적 캐스팅을 하는 애플리케이션에서 경고를 유발할 수 있습니다. 해당 함수는 `PySlice_GetIndices`, `PySlice_GetIndicesEx`, `PyUnicode_AsWideChar`, `PyEval_EvalCode`입니다.

### 링키지 (Linkage)
Windows에서는 애플리케이션이 `python3.dll`에 링크해야 하며, 임포트 라이브러리 `python3.lib`가 제공될 것입니다. 이 DLL은 `/export` 링커 옵션을 통해 모든 API 함수를 전체 인터프리터 DLL, 즉 `python3y.dll`로 리디렉션합니다.

Unix 시스템에서는 ABI가 일반적으로 Python 실행 파일 자체에 의해 제공됩니다. 확장 모듈이 `Py_LIMITED_API`로 컴파일된 경우, `PyModule_Create`는 API 버전으로 3을 전달하도록 변경됩니다. API 버전에 대한 버전 검사는 3 또는 현재 `PYTHON_API_VERSION`을 준수하는 것으로 받아들입니다. Python이 공유 라이브러리로 컴파일된 경우, `libpython3.so`와 `libpython3.y.so` 둘 다로 설치됩니다. 이 PEP를 따르는 애플리케이션은 전자에 링크해야 합니다 (확장 모듈은 `libpython` 공유 객체 없이 런타임 링킹에 의존하여 계속 링크할 수 있음). ABI 버전은 `PYTHON_ABI_VERSION`으로 심볼릭하게 사용할 수 있습니다.

또한 Unix에서는 확장 모듈 파일 이름에 `abi<PYTHON_ABI_VERSION>` 태그가 허용됩니다. 이러한 방식으로 이름이 지정된 파일이 실제로 제한된 API로 제한되는지에 대한 검사는 수행되지 않으며, `distutils` 코드 동결로 인해 `distutils`에 이러한 파일 빌드 지원이 추가되지 않을 것입니다.

## 구현 전략 (Implementation Strategy)
이 PEP는 브랜치에서 구현되어 사용자가 모듈이 ABI를 준수하는지 확인할 수 있도록 합니다. 사용자가 타입 정의를 다시 작성할 필요가 없도록, 타입 정의를 포함하는 C 소스 코드를 변환하는 스크립트가 제공될 것입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.