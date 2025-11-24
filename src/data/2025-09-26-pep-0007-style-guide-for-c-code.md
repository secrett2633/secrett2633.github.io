---
title: "[Active] PEP 7 - Style Guide for C Code"
excerpt: "Python Enhancement Proposal 7: 'Style Guide for C Code'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/7/
toc: true
toc_sticky: true
date: 2025-09-26 15:43:52+0900
last_modified_at: 2025-09-26 15:43:52+0900
published: true
---
> **원문 링크:** [PEP 7 - Style Guide for C Code](https://peps.python.org/pep-0007/)
>
> **상태:** Active | **유형:** Process | **작성일:** 05-Jul-2001

# PEP 7 – C 코드 스타일 가이드

*   **작성자:** Guido van Rossum, Barry Warsaw
*   **상태:** Active (활성)
*   **유형:** Process (프로세스)
*   **작성일:** 2001년 7월 5일

## 서론

이 문서는 Python의 C 구현(C implementation)을 구성하는 C 코드에 대한 코딩 컨벤션(coding conventions)을 제공합니다. Python 코드의 스타일 가이드라인을 설명하는 동반 정보성 PEP (PEP 8)도 참고해 주십시오.

규칙은 때로 깨질 수도 있다는 점을 명심하십시오. 특정 규칙을 깨야 하는 두 가지 좋은 이유가 있습니다:

1.  규칙을 적용하면 코드를 읽기 어려워지는 경우, 특히 규칙에 익숙한 사람에게도 마찬가지일 때.
2.  이미 규칙을 어기고 있는 주변 코드와의 일관성을 유지하기 위해 (역사적인 이유 때문일 수 있음) – 물론 이것은 남이 만든 엉망진창을 정리할 기회이기도 합니다 (진정한 XP 스타일).

## C 표준

다음 표준을 따르십시오. 관련 표준에 없는 기능의 경우, CPython 특정 래퍼(wrapper)를 사용하십시오 (예: `_Py_atomic_store_int32`, `Py_ALWAYS_INLINE`, `Py_ARITHMETIC_RIGHT_SHIFT`; 공개 헤더의 `_Py_ALIGNED_DEF`). 이러한 래퍼를 추가할 때는 지원되지 않는 컴파일러에 대해 쉽게 조정할 수 있도록 노력하십시오.

*   Python 3.11 및 최신 버전은 선택적 기능 없이 C11을 사용합니다. 공용 C API는 C99 및 C++와 호환되어야 합니다.
*   Python 3.6부터 3.10까지는 여러 C99 기능을 선택적으로 사용하는 C89를 사용합니다:
    *   `<stdint.h>` 및 `<inttypes.h>`의 표준 정수 타입. 고정 폭 정수 타입(fixed width integer types)을 요구합니다.
    *   `static inline` 함수
    *   지정된 초기화(designated initializers) (특히 타입 선언에 유용)
    *   혼합된 선언(intermingled declarations)
    *   부울(booleans)
    *   C++ 스타일 한 줄 주석

*   Python 3.6 이전 버전은 ANSI/ISO 표준 C (1989년 버전)를 사용했습니다. 이는 다른 많은 것들 중에서, 모든 선언이 블록의 맨 위에 있어야 함을 의미했습니다.

(이 문서를 읽는 사용자에게 상기시키자면: 이 PEP는 스타일 가이드입니다; 이 규칙들은 깨질 수도 있습니다.)

## 일반적인 C 코드 컨벤션

*   GCC나 MSVC와 같은 컴파일러별 확장(compiler-specific extensions)을 사용하지 마십시오. 예를 들어, 후행 백슬래시(trailing backslashes) 없이 여러 줄 문자열을 작성하지 마십시오.
*   모든 함수 선언 및 정의는 완전한 프로토타입(full prototypes)을 사용해야 합니다. 즉, 모든 인수의 타입을 지정하고 인수가 없는 함수를 선언할 때는 `(void)`를 사용하십시오.
*   주요 컴파일러(gcc, VC++, 기타)에서 컴파일러 경고가 없어야 합니다.
*   새로운 코드에서는 매크로(macros)보다 `static inline` 함수를 선호해야 합니다.

## 코드 레이아웃 (Code Lay-out)

*   4칸 들여쓰기(4-space indents)를 사용하고 탭(tabs)은 전혀 사용하지 마십시오.
*   어떤 줄도 79자를 넘어서는 안 됩니다. 이 규칙과 앞선 규칙이 코드를 작성할 충분한 공간을 제공하지 않는다면, 코드가 너무 복잡한 것이므로 서브루틴(subroutines) 사용을 고려하십시오.
*   어떤 줄도 공백(whitespace)으로 끝나서는 안 됩니다. 의미 있는 후행 공백이 필요하다고 생각된다면 다시 생각해 보십시오 – 다른 사람의 에디터가 일상적으로 이를 삭제할 수 있습니다.
*   함수 정의 스타일: 함수 이름은 1열에, 가장 바깥쪽 중괄호(curly braces)는 1열에, 지역 변수 선언 뒤에는 빈 줄을 두십시오.

    ```c
    static int extra_ivars(PyTypeObject *type, PyTypeObject *base) {
        int t_size = PyType_BASICSIZE(type);
        int b_size = PyType_BASICSIZE(base);
        assert(t_size >= b_size); /* type smaller than base! */
        ...
        return 1;
    }
    ```
*   코드 구조: `if`, `for`와 같은 키워드와 그 다음에 오는 왼쪽 괄호 사이에 한 칸 공백을 두십시오. 괄호 안에는 공백을 두지 마십시오. C에서는 생략할 수 있는 곳이라도 모든 곳에 중괄호가 필요하지만, 다른 방식으로 수정하지 않는 코드에는 추가하지 마십시오. 모든 새로운 C 코드에는 중괄호가 필요합니다. 중괄호는 다음과 같이 포맷팅해야 합니다:

    ```c
    if (mro != NULL) {
        // ...
    } else {
        // ...
    }
    ```
*   `return` 문에는 불필요한 괄호를 사용하지 마십시오:

    ```c
    return(albatross); /* incorrect */
    ```

    대신:

    ```c
    return albatross; /* correct */
    ```
*   함수 및 매크로 호출 스타일: `foo(a, b, c)` – 열린 괄호 앞에 공백 없음, 괄호 안에 공백 없음, 쉼표 앞에 공백 없음, 각 쉼표 뒤에 한 칸 공백.
*   할당(assignment), 부울(Boolean), 비교(comparison) 연산자 주위에는 항상 공백을 두십시오. 많은 연산자를 사용하는 표현식에서는 가장 바깥쪽(가장 낮은 우선순위) 연산자 주위에 공백을 추가하십시오.
*   긴 줄 끊기: 가능하다면 가장 바깥쪽 인수 목록의 쉼표 뒤에서 끊으십시오. 항상 적절하게 계속되는 줄(continuation lines)을 들여쓰십시오. 예:

    ```c
    PyErr_Format(PyExc_TypeError,
                 "cannot create '%.100s' instances",
                 type->tp_name);
    ```
*   이항 연산자(binary operator)에서 긴 표현식을 끊을 때는 다음과 같이 중괄호를 포맷팅해야 합니다:

    ```c
    if (type->tp_dictoffset != 0 &&
        base->tp_dictoffset == 0 &&
        type->tp_dictoffset == b_size &&
        (size_t)t_size == b_size + sizeof(PyObject *))
    {
        return 0; /* "__dict__" 추가만 "용서" */
    }
    ```
    줄 끝에 연산자를 두는 것도 괜찮습니다. 특히 주변 코드와의 일관성을 유지하기 위해서라면 (자세한 내용은 PEP 8을 참조하십시오).
*   여러 줄 매크로(multi-line macros)에서 줄 연속 문자(line continuation characters)를 수직으로 정렬하십시오.
*   문(statement)으로 사용하도록 의도된 매크로는 `do { ... } while (0)` 매크로 관용구(idiom)를 사용해야 하며, 마지막 세미콜론은 없습니다. 예:

    ```c
    #define ADD_INT_MACRO(MOD, INT) \
        do { \
            if (PyModule_AddIntConstant((MOD), (#INT), (INT)) < 0) { \
                goto error; \
            } \
        } while (0)
    // 세미콜론이 있는 문처럼 사용: ADD_INT_MACRO(m, SOME_CONSTANT);
    ```
*   사용 후에는 파일 지역 매크로(file local macros)를 `#undef`하십시오.
*   함수, 구조체 정의, 함수 내의 주요 섹션 주위에 빈 줄을 두십시오.
*   주석(comments)은 설명하는 코드 앞에 오도록 하십시오.
*   모든 함수와 전역 변수는 게시된 인터페이스(published interface)의 일부가 아닌 한 `static`으로 선언되어야 합니다. 외부 함수 및 변수의 경우, `Include` 디렉터리의 적절한 헤더 파일에 항상 선언이 있어야 하며, 다음과 같이 `PyAPI_FUNC()` 매크로와 `PyAPI_DATA()` 매크로를 사용합니다:

    ```c
    PyAPI_FUNC(PyObject *) PyObject_Repr(PyObject *);
    PyAPI_DATA(PyTypeObject) PySuper_Type;
    ```

## 명명 규칙 (Naming Conventions)

*   공개 함수(public functions)에는 `Py` 접두사를 사용하고, `static` 함수에는 절대 사용하지 마십시오.
*   `Py_` 접두사는 `Py_FatalError`와 같은 전역 서비스 루틴(global service routines)을 위해 예약되어 있습니다. 특정 그룹의 루틴(예: 특정 객체 타입 API)은 `PyString_`와 같은 더 긴 접두사를 사용합니다.
*   공개 함수와 변수는 밑줄(underscores)이 있는 `MixedCase`를 사용합니다. 예: `PyObject_GetAttr`, `Py_BuildValue`, `PyExc_TypeError`.
*   때때로 "내부(internal)" 함수가 로더(loader)에 보여야 할 때가 있습니다. 이를 위해 `_Py` 접두사를 사용합니다. 예: `_PyObject_Dump`.
*   매크로는 `MixedCase` 접두사를 사용한 다음 대문자를 사용해야 합니다. 예: `PyString_AS_STRING`, `Py_PRINT_RAW`.
*   매크로 매개변수(Macro parameters)는 `ALL_CAPS` 스타일을 사용하여 C 변수 및 구조체 멤버와 쉽게 구별되도록 해야 합니다.

## 문서화 문자열 (Documentation Strings, Docstrings)

*   문서화 문자열(docstrings)에는 `PyDoc_STR()` 또는 `PyDoc_STRVAR()` 매크로를 사용하여 docstrings 없이 Python을 빌드할 수 있도록 지원하십시오 (`./configure --without-doc-strings`).
*   각 함수 docstring의 첫 번째 줄은 인수와 반환 값에 대한 간략한 요약을 제공하는 "시그니처 라인(signature line)"이어야 합니다. 예를 들어:

    ```c
    PyDoc_STRVAR(myfunction__doc__, "myfunction(name, value) -> bool\n\n\
    Determine whether name and value make a valid pair.");
    ```
*   시그니처 라인과 설명 텍스트 사이에는 항상 빈 줄을 포함하십시오.
*   함수의 반환 값이 항상 `None`인 경우 (의미 있는 반환 값이 없기 때문에), 반환 타입 표시를 포함하지 마십시오.
*   여러 줄 docstring을 작성할 때는 위 예시와 같이 항상 백슬래시 연속(backslash continuations) 또는 문자열 리터럴 연결(string literal concatenation)을 사용해야 합니다:

    ```c
    PyDoc_STRVAR(myfunction__doc__, "myfunction(name, value) -> bool\n\n"
                                   "Determine whether name and value make a valid pair.");
    ```
    일부 C 컴파일러는 둘 다 없이 문자열 리터럴을 허용하지만:

    ```c
    /* BAD -- 이렇게 하지 마십시오! */
    PyDoc_STRVAR(myfunction__doc__, "myfunction(name, value) -> bool\n\n
    Determine whether name and value make a valid pair.");
    ```
    모든 컴파일러가 그러는 것은 아닙니다. MSVC 컴파일러는 이에 대해 불평하는 것으로 알려져 있습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.