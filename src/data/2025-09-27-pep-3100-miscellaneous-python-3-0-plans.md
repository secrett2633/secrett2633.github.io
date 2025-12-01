---
title: "[Final] PEP 3100 - Miscellaneous Python 3.0 Plans"
excerpt: "Python Enhancement Proposal 3100: 'Miscellaneous Python 3.0 Plans'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3100/
toc: true
toc_sticky: true
date: 2025-09-27 14:13:27+0900
last_modified_at: 2025-09-27 14:13:27+0900
published: true
---
> **원문 링크:** [PEP 3100 - Miscellaneous Python 3.0 Plans](https://peps.python.org/pep-3100/)
>
> **상태:** Final | **유형:** Process | **작성일:** 20-Aug-2004


## PEP 3100 – Miscellaneous Python 3.0 Plans

*   **작성자:** Brett Cannon
*   **상태:** Final (최종)
*   **유형:** Process (프로세스)
*   **생성일:** 2004년 8월 20일

### 초록 (Abstract)
이 PEP는 이전에 PEP 3000으로 알려졌으며, Python 3000을 목표로 하는 소규모 변경사항과 아직 별도의 PEP가 작성되지 않은 새로운 기능들을 설명합니다.
이 문서에 포함된 기능 목록은 변경될 수 있으며, Python 개발 커뮤니티에 구속력을 갖지 않습니다. 기능은 언제든지 추가, 제거 또는 수정될 수 있습니다. 이 목록의 목적은 언어 개발 노력을 Python 3.0으로 가는 단계적 변화에 집중시키고, 사람들이 전환을 원활하게 할 방법을 고안하도록 장려하는 것입니다.

이 문서는 누구든지 확장할 수 있는 위시리스트가 아닙니다. 이 PEP의 두 작성자는 단지 텍스트를 제공할 뿐이며, 이 문서에 나열된 변경사항에 대한 결정은 Guido van Rossum이 Python 3.0의 목표로 선택한 내용입니다.

Guido의 Python 3.0에서 변경되지 않을 사항에 대한 발표는 PEP 3099에 기록되어 있습니다.

### 일반적인 목표 (General Goals)
일반적인 목표는 오래된 방식들을 제거하여 기능 중복을 줄이는 것입니다. 디자인의 일반적인 원칙은 "무언가를 하는 한 가지 명확한 방법이 충분하다"는 것입니다.

### 영향을 미치는 PEP (Influencing PEPs)
Python 3.0의 변화에 영향을 미친 주요 PEP들은 다음과 같습니다.
*   PEP 238 (Changing the Division Operator): 나눗셈 연산자 변경
*   PEP 328 (Imports: Multi-Line and Absolute/Relative): import 문 변경 (다중 라인, 절대/상대 경로)
*   PEP 343 (The “with” Statement): `with` 문 도입
*   PEP 352 (Required Superclass for Exceptions): 예외(Exception)의 필수 슈퍼클래스 지정

### 스타일 변경 (Style Changes)
C 스타일 가이드가 4칸 들여쓰기를 사용하도록 업데이트될 예정이며, 탭(tab)은 사용하지 않습니다. 이 스타일은 모든 새 파일에 적용되어야 하며, 기존 파일은 Python 2 HEAD에서 특정 파일을 병합할 가능성이 없는 경우에만 업데이트할 수 있습니다. 한 파일 내에서는 들여쓰기 스타일이 일관되어야 합니다. 현재 다른 스타일 가이드 변경은 계획되어 있지 않습니다.

### 핵심 언어 (Core Language)

Python 3.0의 핵심 언어에는 다음과 같은 주요 변경사항들이 포함됩니다.

*   **`True` 나눗셈(Division) 기본 동작:** `//` 연산자와 달리 `/` 연산자가 항상 부동 소수점(float) 결과를 반환하는 `True` 나눗셈이 기본 동작이 됩니다. (PEP 238)
*   **`exec` 문 제거 및 함수화:** `exec` 문은 제거되고 함수로 변경됩니다.
*   **정적 타이핑(Static Typing)을 위한 선택적 선언 추가:** (PEP 3107)
*   **새로운 스타일 클래스(New-style classes)만 지원:** 기존의 Classic classes는 사라지고 모든 클래스는 `object`를 상속하는 New-style class가 됩니다.
*   **`print` 문을 함수로 대체:** `print` 문은 `print()` 함수로 변경됩니다. (PEP 3105)
*   **파일 객체의 `softspace` 속성 제거:**
*   **예외 처리 구문 변경:** 예외 변수를 사용하려면 `except E1, E2, E3 as err:`와 같은 형식을 사용합니다. (Python 3에서는 `except E as err:` 형태로 단순화됨)
*   **`None`, `True`, `False` 키워드화:** `None`, `True`, `False`는 키워드가 됩니다.
*   **`...` (Ellipsis) 일반 표현식 요소로 변경:**
*   **`as` 키워드화:** `as`는 키워드가 됩니다. (Python 2.6부터 이미 시작)
*   **List Comprehension의 동작 변경:** List Comprehension은 동등한 Generator Expression을 `list()`에 전달하는 문법적 설탕(syntactic sugar)이 됩니다. 결과적으로 루프 변수가 더 이상 외부 스코프에 노출되지 않습니다. (PEP 289)
    *   예: `[x for x in (1, 2)]` 처럼 이터러블에 괄호가 필요하게 됩니다.
*   **서로 다른 타입 간의 비교:** 명시적으로 타입이 지원하지 않는 한, `==`와 `!=`를 제외한 서로 다른 타입 간의 비교(예: `1 < '2'`)는 예외를 발생시킵니다.
*   **부동 소수점(float) 타입 사용 제한:** 의도치 않게 float가 허용되던 정수(int) 연산에서 float를 인수로 사용할 수 없게 됩니다.
*   **함수 스코프에서의 `from ... import *` 제거:** 이는 함수를 항상 최적화할 수 있게 하고, 최적화되지 않은 함수에 대한 지원을 없앨 수 있게 합니다.

#### Imports (임포트)
*   **기본적으로 절대 임포트(Absolute Imports):** 임포트가 기본적으로 절대 경로를 사용합니다.
*   **명시적인 상대 임포트(Relative Imports):** 상대 임포트는 명시적으로 지정해야 합니다. (예: `from . import module`)
*   **`sys.modules`의 간접 참조 제거:** `sys.modules`에서 `None` 값을 통해 모듈을 간접 참조하는 방식은 지원되지 않습니다.
*   **`__init__.py`의 역할:** 하위 패키지(sub-packages)에서 `__init__.py`가 선택 사항이 될 수 있지만, 최상위 패키지(top-level packages)에서는 여전히 필요합니다.
*   **API 정리:** `Py_InitModule()` 관련 API와 `pythonrun` 등에 내보내진 API가 정리됩니다.

#### 괄호 요구사항
몇몇 표현식은 2.x에서는 필요 없었지만 3.x에서는 괄호가 필요하게 됩니다.
*   **List Comprehensions:** 이터러블 주변에 괄호가 필요합니다. 이는 List Comprehension을 Generator Comprehension과 더 유사하게 만듭니다. `[x for x in 1, 2]`는 `[x for x in (1, 2)]`가 되어야 합니다.
*   **Lambdas:** 람다 표현식도 괄호가 필요할 수 있습니다. (PEP 308에서는 'NO'로 결정되었으므로 실제로는 적용되지 않음)

#### 이름 변경 및 추가
*   **`__builtin__` 및 `__builtins__` 해결:** `__builtin__` (모듈)은 `builtins`로 이름이 변경되고, `__builtins__` (샌드박스 훅)는 그대로 유지됩니다.
*   **함수 속성 이름 변경:** `func_whatever` 형태의 함수 속성은 `__whatever__`로 이름이 변경됩니다.
*   **Set 리터럴 및 Comprehension 도입:**
    *   `{x}`는 `set([x])`를 의미합니다.
    *   `{x, y}`는 `set([x, y])`를 의미합니다.
    *   `{F(x) for x in S if P(x)}`는 `set(F(x) for x in S if P(x))`를 의미합니다.
    *   비어 있는 Set 리터럴은 없으며, `set()`을 사용합니다.
    *   `frozenset` 리터럴은 도입되지 않습니다.
*   **`__nonzero__`를 `__bool__`로 이름 변경:** `__nonzero__` 특별 메서드는 `__bool__`로 이름이 변경되며 `bool` 값을 반환해야 합니다.
*   **Dict Comprehension 도입:** (PEP 274에서 처음 제안)
    *   `{K(x): V(x) for x in S if P(x)}`는 `dict((K(x), V(x)) for x in S if P(x))`를 의미합니다.

#### 제거될 기능 (To be removed)
*   **문자열 예외(String exceptions):** 예외 클래스의 인스턴스를 사용해야 합니다.
*   **`raise Exception, "message"` 구문:** `raise Exception("message")`를 사용해야 합니다.
*   **백틱(`` `x` ``) 연산자:** `repr(x)`를 사용해야 합니다.
*   **`<>` 연산자:** `!=`를 사용해야 합니다.
*   **`float` 타입의 `__mod__` 및 `__divmod__` 특별 메서드:** (나중에 이들은 유지되어야 한다고 결정됨)
*   **Unbound methods 제거:**
*   **`METH_OLDARGS`, `WITH_CYCLE_GC`:** 제거됩니다.
*   **`__getslice__`, `__setslice__`, `__delslice__`:** 슬라이스(slice) 연산 코드를 제거하고 slice 객체를 사용합니다.
*   **`__oct__`, `__hex__`:** `oct()` 및 `hex()` 함수에서 `__index__`를 대신 사용합니다.
*   **`__methods__` 및 `__members__`:** 제거됩니다.
*   **특정 C API:** `PyFloat_AsString`, `PyFloat_AsReprString`, `PyFloat_AsStringEx`, `PySequence_In`, `PyEval_EvalFrame`, `PyEval_CallObject`, `_PyObject_Del`, `_PyObject_GC_Del`, `_PyObject_GC_Track`, `_PyObject_GC_UnTrack`, `PyString_AsEncodedString`, `PyString_AsDecodedString`, `PyArg_NoArgs`, `PyArg_GetInt`, `intargfunc`, `intintargfunc`. `PyImport_ReloadModule`도 고려 중입니다.

### 원자 타입 (Atomic Types)

Python 3.0의 원자 타입에는 다음과 같은 주요 변경사항들이 포함됩니다.

*   **`int`와 `long` 타입 구별 제거:** `int`와 `long` 타입의 구별이 없어지고, `long` 내장 타입과 `L` 또는 `l` 접미사가 붙은 리터럴은 사라집니다. 모든 정수는 `int`가 됩니다.
*   **모든 문자열은 Unicode:** 모든 문자열은 Unicode가 되며, 별도의 `bytes()` 타입이 생깁니다. 새로운 문자열 타입은 `str`로 불립니다. (PEP 3137 참조)
*   **이터러블 뷰(Iterable views) 반환:** `dict.keys()`, `dict.values()`, `dict.items()` 등과 같이 적절한 경우 리스트 대신 이터러블 뷰를 반환하도록 변경됩니다. `iter*` 메서드는 제거됩니다.
*   **`open()` 함수의 오류 처리 개선:** `open()` 함수가 잘못된 모드(mode)에 대해 `IOError` 대신 `ValueError`를 반환하도록 수정됩니다.

#### 제거될 기능 (To be removed)
*   **`basestring.find()` 및 `basestring.rfind()`:** `basestring.index()` 또는 `basestring.[r]partition()` 또는 `basestring.rindex()`를 `try/except` 블록에서 사용하는 것을 권장합니다. (제거 가능성은 낮음)
*   **`file.xreadlines()` 메서드:** 제거됩니다.
*   **`dict.setdefault()`:** (제거 가능성은 낮음)
*   **`dict.has_key()` 메서드:** `in` 연산자를 대신 사용합니다.
*   **`list.sort()` 및 `builtin.sorted()` 메서드의 `cmp` 매개변수:** `cmp` 매개변수가 제거됩니다. (대신 `key` 매개변수 사용)

### 내장 네임스페이스 (Built-in Namespace)

Python 3.0의 내장 네임스페이스에는 다음과 같은 주요 변경사항들이 포함됩니다.

*   **적절한 경우 이터레이터 반환:** `range()`, `zip()`, `map()`, `filter()` 등과 같이 내장 함수가 적절한 경우 이터레이터(iterator)를 반환하도록 변경됩니다.
*   **`input()` 제거 및 `raw_input()` 이름 변경:** `input()`은 제거되고, `raw_input()`이 `input()`으로 이름이 변경됩니다. 기존의 `input()` 기능이 필요하면 `eval(input())`을 사용해야 합니다.
*   **`trunc()` 함수 도입:** `trunc()` 함수가 도입되어 인수의 `__trunc__()` 메서드를 호출합니다. `float`와 같이 `__int__()` 호출 시 데이터 손실이 발생하지만 정수 표현이 필요한 객체에 사용됩니다.
*   **예외 계층 구조 변경:** (PEP 352)
*   **`bin()` 함수 추가:** 정수의 이진 표현을 위한 `bin()` 함수가 추가됩니다.

#### 제거될 기능 (To be removed)
*   **`apply()`:** 대신 `f(*args, **kw)`를 사용합니다.
*   **`buffer()`:** 제거됩니다. (대신 `bytes()` 타입 사용)
*   **`callable()`:** 대신 `isinstance(x, collections.Callable)`를 사용합니다. (Python 3.2부터 `collections.Callable`은 `collections.abc.Callable`로 이동)
*   **`coerce()`:** 더 이상 필요하지 않습니다.
*   **`execfile()`, `reload()`:** 대신 `exec()`를 사용합니다. (reload는 `importlib.reload`로 이동)
*   **`intern()`:** `sys` 모듈로 이동합니다.
*   **`reduce()`:** `functools` 모듈로 이동합니다. 대부분의 경우 루프가 더 읽기 쉽습니다.
*   **`xrange()`:** 대신 `range()`를 사용합니다.
*   **`StandardError`:** `Exception`을 서브클래싱해야 합니다.

### 표준 라이브러리 (Standard Library)

Python 3.0의 표준 라이브러리에는 다음과 같은 변경사항들이 포함됩니다.

*   **표준 라이브러리 재구성:** 라이브러리가 너무 얕지 않도록 재구성됩니다.
*   **테스트 코드 이동:** 테스트 코드가 적절한 위치로 이동되며, 표준 라이브러리 내에 더 이상 `test()` 함수는 없습니다.
*   **모든 테스트를 `doctest` 또는 `unittest` 사용으로 전환:**
*   **표준 라이브러리 개선 절차:** (PEP 3001 참조)

#### 제거될 모듈 및 기능 (To be removed)
*   **`sets` 모듈:** 제거됩니다.
*   **제거될 stdlib 모듈:**
    *   `macfs`, `new`, `reconvert`, `stringold`, `xmllib`, `pcre`, `pypcre`, `strop` (모두 제거됨)
    *   `buildtools`, `mimetools`, `multifile`, `rfc822`, `mpz`, `posixfile`, `regsub`, `rgbimage`, `sha`, `statcache`, `sv`, `TERMIOS`, `timing`, `cfmfile`, `gopherlib`, `md5`, `MimeWriter`, `mimify`, `cl`, `sets`, `xreadlines`, `rotor`, `whrandom` (대부분 제거됨)
    *   `lib-old`의 모든 것 (PEP 4 참조)
    *   `sys.exitfunc`: 대신 `atexit` 모듈을 사용합니다.
    *   `sys.exc_type`, `sys.exc_values`, `sys.exc_traceback`: 스레드 안전(thread-safe)하지 않으므로 `sys.exc_info()` 또는 예외 객체의 속성을 사용합니다.
    *   `sys.exc_clear`: Python 3의 `except` 문은 동일한 기능을 제공합니다. (PEP 3110)
    *   `array.read`, `array.write`
    *   `operator.isCallable`: `callable()` 내장 함수가 제거되므로 함께 제거됩니다.
    *   `operator.sequenceIncludes`: `operator.contains`로 인해 중복되므로 제거됩니다.
    *   `thread` 모듈 내의 `acquire_lock()` 및 `release_lock()` 별칭: (결과적으로 `thread` 모듈 자체가 `threading.py` 사용을 위해 퍼블릭 API에서 제거됨)
    *   `UserXyz` 클래스: `XyzMixins`를 선호합니다.
    *   `Queue.py`의 신뢰할 수 없는 `empty()` 및 `full()` 메서드 제거.
    *   `random` API에서 `jumpahead()` 제거.
    *   `random`의 기본 원시 기능을 무작위 부동 소수점(random floats) 대신 무작위 바이트(random bytes)를 생성하는 것으로 변경.
    *   `Cookie.SerialCookie` 및 `Cookie.SmartCookie` 제거.
    *   `heapq.heapreplace()` API를 수정하여 새로운 값을 힙의 최상단과 비교하도록 변경.

### 미해결 문제 (Outstanding Issues)
*   C99 표준 요구: `//` 주석, 명명된 초기화자(named initializers), 새로운 스코프를 도입하지 않고 변수 선언 등 C99의 이점을 활용할 수 있도록 C99 표준을 요구합니다. (또한 NaN 및 무한대와 같은 IEEE 부동 소수점 문제에 대한 더 나은 지원)
*   오래된 시스템 지원 제거: BeOS, RISCOS, (SGI) Irix, Tru64 등 오래된 시스템에 대한 지원을 제거합니다.

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 있습니다.

---
이 PEP 3100은 Python 2.x에서 Python 3.0으로 넘어가는 과정에서 언어의 근본적인 변화를 예고하는 중요한 문서입니다. 여기서 언급된 대부분의 변경사항은 실제 Python 3.0에 적용되어 현재 우리가 사용하는 Python의 모습이 되었습니다. 이러한 변화는 Python을 더욱 일관되고, 효율적이며, 미래 지향적인 언어로 만드는 데 기여했습니다.
예를 들어, `print`가 함수가 되고, `int`와 `long`이 통합되며, 모든 문자열이 유니코드로 처리되는 등의 변화는 개발자들이 더 적은 모호성으로 코드를 작성하고 국제화된 애플리케이션을 더 쉽게 개발할 수 있도록 도왔습니다. 또한, `list comprehension`의 스코프 변경은 잠재적인 버그를 줄이고 코드의 예측 가능성을 높였습니다.## PEP 3100 – Python 3.0의 다양한 계획

**PEP 3100** 은 Python 3.0 출시를 위해 제안된 다양한 변경사항과 새로운 기능들을 총괄적으로 다루는 문서입니다. 이 문서는 Python 3000(Python 3.0의 초기 명칭)의 목표로 삼았던 소규모 변경사항과 당시 아직 별도의 PEP로 작성되지 않은 기능들을 설명합니다.

### 개요 (Abstract)

이 PEP는 Python 3000을 위한 소규모 변경사항과 새로운 기능들을 요약합니다. 이 목록은 Python 개발 커뮤니티에 구속력을 가지지 않으며, 언제든지 기능이 추가, 제거, 수정될 수 있습니다. 문서의 주된 목적은 Python 3.0으로의 전환을 위한 언어 개발 노력에 초점을 맞추고, 개발자들이 이 전환 과정을 원활하게 할 방법을 고안하도록 장려하는 것입니다.

이 문서는 누구든지 확장할 수 있는 위시리스트가 아니며, 여기에 나열된 변경사항들은 Guido van Rossum이 Python 3.0의 목표로 직접 선택한 내용입니다. Python 3.0에서 변경되지 않을 사항들은 PEP 3099에 기록되어 있습니다.

### 일반적인 목표 (General Goals)

주요 목표는 기존의 방식들을 제거하여 기능 중복을 줄이는 것입니다. 설계의 일반적인 원칙은 "무언가를 하는 한 가지 명확한 방법이 충분하다"는 것입니다.

### 영향을 미친 PEP (Influencing PEPs)

Python 3.0의 개발에 영향을 미친 주요 PEP들은 다음과 같습니다.

*   **PEP 238** (Changing the Division Operator): 나눗셈 연산자 변경
*   **PEP 328** (Imports: Multi-Line and Absolute/Relative): import 문의 다중 라인 및 절대/상대 경로 지원
*   **PEP 343** (The “with” Statement): `with` 문 도입
*   **PEP 352** (Required Superclass for Exceptions): 예외(Exception) 클래스의 필수 슈퍼클래스 지정

### 스타일 변경 (Style Changes)

C 스타일 가이드는 4칸 들여쓰기(4-space indents)를 사용하도록 업데이트되며, 탭(tabs)은 사용하지 않습니다. 이 스타일은 모든 새로운 파일에 적용되어야 합니다. 기존 파일은 Python 2 HEAD에서 병합될 가능성이 없는 경우에만 업데이트될 수 있으며, 파일 내에서는 들여쓰기 스타일이 일관되어야 합니다. 현재 다른 스타일 가이드 변경은 계획되어 있지 않습니다.

### 핵심 언어 (Core Language)

Python 3.0의 핵심 언어에는 다음과 같은 주요 변경사항들이 포함됩니다.

*   **`True` 나눗셈(Division)의 기본 동작:** `/` 연산자가 항상 `float` 결과를 반환하는 `True` 나눗셈이 기본이 됩니다 (PEP 238).
*   **`exec` 문의 함수화:** `exec` 문이 제거되고 함수로 변경됩니다.
*   **정적 타이핑(Static Typing)을 위한 선택적 선언 추가:** (PEP 3107)
*   **New-style classes만 지원:** `object`를 상속하지 않는 Classic classes는 사라집니다.
*   **`print` 문을 함수로 대체:** `print` 문이 `print()` 함수로 변경됩니다 (PEP 3105).
*   **파일 객체의 `softspace` 속성 제거.**
*   **예외 처리 구문 변경:** 예외 변수를 사용하려면 `except E1, E2, E3 as err:` 형식을 사용합니다 (Python 3에서는 `except E as err:`로 단순화).
*   **`None`, `True`, `False` 키워드화.**
*   **`...` (Ellipsis) 일반 표현식 요소로 변경.**
*   **`as` 키워드화:** `as`는 키워드가 됩니다 (Python 2.6부터).
*   **List Comprehension의 동작 변경:** List Comprehension은 동등한 Generator Expression을 `list()`에 전달하는 문법적 설탕(syntactic sugar)이 됩니다. 결과적으로 루프 변수가 더 이상 외부 스코프에 노출되지 않습니다 (PEP 289). 예를 들어, `[x for x in 1, 2]`는 `[x for x in (1, 2)]`처럼 이터러블에 괄호가 필요하게 됩니다.
*   **서로 다른 타입 간의 비교:** 명시적으로 타입이 지원하지 않는 한, `==`와 `!=`를 제외한 서로 다른 타입 간의 비교(예: `1 < '2'`)는 예외를 발생시킵니다.
*   **`float` 타입 사용 제한:** 의도치 않게 `float`가 허용되던 정수(`int`) 연산에서 `float`를 인수로 사용할 수 없게 됩니다.
*   **함수 스코프에서의 `from ... import *` 제거:** 이는 함수를 항상 최적화할 수 있게 하고, 최적화되지 않은 함수에 대한 지원을 없앨 수 있게 합니다.

#### Import (임포트)

*   **기본적으로 절대 임포트(Absolute Imports):** 임포트가 기본적으로 절대 경로를 사용합니다.
*   **명시적인 상대 임포트(Relative Imports):** 상대 임포트는 명시적으로 지정해야 합니다 (예: `from . import module`).
*   **`sys.modules`의 간접 참조 제거:** `None` 값을 통한 모듈 간접 참조 방식은 지원되지 않습니다.
*   **`__init__.py`의 역할:** 하위 패키지(`sub-packages`)에서 `__init__.py`가 선택 사항이 될 수 있지만, 최상위 패키지(`top-level packages`)에서는 여전히 필요합니다.
*   **API 정리:** `Py_InitModule()` 관련 API 및 `pythonrun` 등에 내보내진 API가 정리됩니다.

#### 괄호 요구사항 (Parentheses Requirements)

몇몇 표현식은 Python 2.x에서는 필요 없었지만 Python 3.x에서는 괄호가 필요하게 됩니다.

*   **List Comprehensions:** 이터러블 주변에 괄호가 필요합니다. 이는 List Comprehension을 Generator Expression과 더 유사하게 만듭니다. `[x for x in 1, 2]`는 `[x for x in (1, 2)]`가 되어야 합니다.
*   **Lambdas:** 람다 표현식도 괄호가 필요할 수 있습니다 (PEP 308에서 'NO'로 결정되어 실제 적용은 되지 않음).

#### 이름 변경 및 추가 (Renames and Additions)

*   **`__builtin__` 및 `__builtins__` 해결:** `__builtin__` (모듈)은 `builtins`로 이름이 변경되고, `__builtins__` (샌드박스 훅)는 그대로 유지됩니다.
*   **함수 속성 이름 변경:** `func_whatever` 형태의 함수 속성은 `__whatever__`로 이름이 변경됩니다.
*   **Set 리터럴 및 Comprehension 도입:**
    *   `{x}`는 `set([x])`를 의미합니다.
    *   `{x, y}`는 `set([x, y])`를 의미합니다.
    *   `{F(x) for x in S if P(x)}`는 `set(F(x) for x in S if P(x))`를 의미합니다.
    *   비어 있는 Set 리터럴은 없으며, `set()`을 사용합니다.
    *   `frozenset` 리터럴은 도입되지 않습니다.
*   **`__nonzero__`를 `__bool__`로 이름 변경:** `__nonzero__` 특별 메서드는 `__bool__`로 이름이 변경되며 `bool` 값을 반환해야 합니다.
*   **Dict Comprehension 도입:** (PEP 274에서 처음 제안) `{K(x): V(x) for x in S if P(x)}`는 `dict((K(x), V(x)) for x in S if P(x))`를 의미합니다.

#### 제거될 기능 (To be Removed)

*   **문자열 예외(String exceptions):** 예외 클래스의 인스턴스를 사용해야 합니다.
*   **`raise Exception, "message"` 구문:** `raise Exception("message")`를 사용해야 합니다.
*   **백틱(`` `x` ``) 연산자:** `repr(x)`를 사용해야 합니다.
*   **`<>` 연산자:** `!=`를 사용해야 합니다.
*   **`float` 타입의 `__mod__` 및 `__divmod__` 특별 메서드:** (나중에 이들은 유지되어야 한다고 결정됨)
*   **Unbound methods 제거.**
*   **`METH_OLDARGS`, `WITH_CYCLE_GC` 제거.**
*   **`__getslice__`, `__setslice__`, `__delslice__` 제거:** 슬라이스(slice) 연산 코드를 제거하고 slice 객체를 사용합니다.
*   **`__oct__`, `__hex__` 제거:** `oct()` 및 `hex()` 함수에서 `__index__`를 대신 사용합니다.
*   **`__methods__` 및 `__members__` 제거.**
*   **특정 C API:** `PyFloat_AsString`, `PyFloat_AsReprString`, `PyFloat_AsStringEx`, `PySequence_In`, `PyEval_EvalFrame`, `PyEval_CallObject`, `_PyObject_Del`, `_PyObject_GC_Del`, `_PyObject_GC_Track`, `_PyObject_GC_UnTrack`, `PyString_AsEncodedString`, `PyString_AsDecodedString`, `PyArg_NoArgs`, `PyArg_GetInt`, `intargfunc`, `intintargfunc`. `PyImport_ReloadModule`도 고려 중입니다.

### 원자 타입 (Atomic Types)

Python 3.0의 원자 타입에는 다음과 같은 주요 변경사항들이 포함됩니다.

*   **`int`와 `long` 타입 구별 제거:** `int`와 `long` 타입의 구별이 없어지고, `long` 내장 타입과 `L` 또는 `l` 접미사가 붙은 리터럴은 사라집니다. 모든 정수는 `int`가 됩니다.
*   **모든 문자열은 Unicode:** 모든 문자열은 Unicode가 되며, 별도의 `bytes()` 타입이 생깁니다. 새로운 문자열 타입은 `str`로 불립니다 (PEP 3137 참조).
*   **이터러블 뷰(Iterable views) 반환:** `dict.keys()`, `dict.values()`, `dict.items()` 등과 같이 적절한 경우 리스트 대신 이터러블 뷰를 반환하도록 변경됩니다. `iter*` 메서드는 제거됩니다.
*   **`open()` 함수의 오류 처리 개선:** `open()` 함수가 잘못된 모드(`mode`)에 대해 `IOError` 대신 `ValueError`를 반환하도록 수정됩니다.

#### 제거될 기능 (To be Removed)

*   **`basestring.find()` 및 `basestring.rfind()`:** `basestring.index()` 또는 `basestring.[r]partition()` 또는 `basestring.rindex()`를 `try/except` 블록에서 사용하는 것을 권장합니다 (제거 가능성은 낮음).
*   **`file.xreadlines()` 메서드 제거.**
*   **`dict.setdefault()` 제거:** (제거 가능성은 낮음)
*   **`dict.has_key()` 메서드 제거:** `in` 연산자를 대신 사용합니다.
*   **`list.sort()` 및 `builtin.sorted()` 메서드의 `cmp` 매개변수 제거:** (대신 `key` 매개변수 사용)

### 내장 네임스페이스 (Built-in Namespace)

Python 3.0의 내장 네임스페이스에는 다음과 같은 주요 변경사항들이 포함됩니다.

*   **적절한 경우 이터레이터 반환:** `range()`, `zip()`, `map()`, `filter()` 등과 같이 내장 함수가 적절한 경우 이터레이터(`iterator`)를 반환하도록 변경됩니다.
*   **`input()` 제거 및 `raw_input()` 이름 변경:** `input()`은 제거되고, `raw_input()`이 `input()`으로 이름이 변경됩니다. 기존의 `input()` 기능이 필요하면 `eval(input())`을 사용해야 합니다.
*   **`trunc()` 함수 도입:** `trunc()` 함수가 도입되어 인수의 `__trunc__()` 메서드를 호출합니다. `float`와 같이 `__int__()` 호출 시 데이터 손실이 발생하지만 정수 표현이 필요한 객체에 사용됩니다.
*   **예외 계층 구조 변경:** (PEP 352)
*   **`bin()` 함수 추가:** 정수의 이진 표현을 위한 `bin()` 함수가 추가됩니다.

#### 제거될 기능 (To be Removed)

*   **`apply()`:** 대신 `f(*args, **kw)`를 사용합니다.
*   **`buffer()`:** 제거됩니다 (대신 `bytes()` 타입 사용).
*   **`callable()`:** 대신 `isinstance(x, collections.Callable)`를 사용합니다 (Python 3.2부터 `collections.Callable`은 `collections.abc.Callable`로 이동).
*   **`coerce()`:** 더 이상 필요하지 않습니다.
*   **`execfile()`, `reload()`:** 대신 `exec()`를 사용합니다 (reload는 `importlib.reload`로 이동).
*   **`intern()`:** `sys` 모듈로 이동합니다.
*   **`reduce()`:** `functools` 모듈로 이동합니다. 대부분의 경우 루프가 더 읽기 쉽습니다.
*   **`xrange()`:** 대신 `range()`를 사용합니다.
*   **`StandardError`:** `Exception`을 서브클래싱해야 합니다.

### 표준 라이브러리 (Standard Library)

Python 3.0의 표준 라이브러리에는 다음과 같은 변경사항들이 포함됩니다.

*   **표준 라이브러리 재구성:** 라이브러리가 너무 얕지 않도록 재구성됩니다.
*   **테스트 코드 이동:** 테스트 코드가 적절한 위치로 이동되며, 표준 라이브러리 내에 더 이상 `test()` 함수는 없습니다.
*   **모든 테스트를 `doctest` 또는 `unittest` 사용으로 전환.**
*   **표준 라이브러리 개선 절차:** (PEP 3001 참조)

#### 제거될 모듈 및 기능 (To be Removed Modules and Features)

*   **`sets` 모듈 제거.**
*   **제거될 stdlib 모듈:**
    *   `macfs`, `new`, `reconvert`, `stringold`, `xmllib`, `pcre`, `pypcre`, `strop` (모두 제거됨)
    *   `buildtools`, `mimetools`, `multifile`, `rfc822`, `mpz`, `posixfile`, `regsub`, `rgbimage`, `sha`, `statcache`, `sv`, `TERMIOS`, `timing`, `cfmfile`, `gopherlib`, `md5`, `MimeWriter`, `mimify`, `cl`, `sets`, `xreadlines`, `rotor`, `whrandom` (대부분 제거됨)
    *   `lib-old`의 모든 것 (PEP 4 참조)
    *   **`sys.exitfunc`:** 대신 `atexit` 모듈을 사용합니다.
    *   **`sys.exc_type`, `sys.exc_values`, `sys.exc_traceback`:** 스레드 안전(thread-safe)하지 않으므로 `sys.exc_info()` 또는 예외 객체의 속성을 사용합니다.
    *   **`sys.exc_clear`:** Python 3의 `except` 문은 동일한 기능을 제공합니다 (PEP 3110).
    *   **`array.read`, `array.write` 제거.**
    *   **`operator.isCallable`:** `callable()` 내장 함수가 제거되므로 함께 제거됩니다.
    *   **`operator.sequenceIncludes`:** `operator.contains`로 인해 중복되므로 제거됩니다.
    *   **`thread` 모듈 내의 `acquire_lock()` 및 `release_lock()` 별칭:** (결과적으로 `thread` 모듈 자체가 `threading.py` 사용을 위해 퍼블릭 API에서 제거됨)
    *   **`UserXyz` 클래스:** `XyzMixins`를 선호합니다.
    *   **`Queue.py`의 신뢰할 수 없는 `empty()` 및 `full()` 메서드 제거.**
    *   **`random` API에서 `jumpahead()` 제거.**
    *   **`random`의 기본 원시 기능을 무작위 부동 소수점(random floats) 대신 무작위 바이트(random bytes)를 생성하는 것으로 변경.**
    *   **`Cookie.SerialCookie` 및 `Cookie.SmartCookie` 제거.**
    *   **`heapq.heapreplace()` API를 수정하여 새로운 값을 힙의 최상단과 비교하도록 변경.**

### 미해결 문제 (Outstanding Issues)

*   **C99 표준 요구:** `//` 주석, 명명된 초기화자(named initializers), 새로운 스코프를 도입하지 않고 변수 선언 등 C99의 이점을 활용할 수 있도록 C99 표준을 요구합니다 (또한 NaN 및 무한대와 같은 IEEE 부동 소수점 문제에 대한 더 나은 지원).
*   **오래된 시스템 지원 제거:** BeOS, RISCOS, (SGI) Irix, Tru64 등 오래된 시스템에 대한 지원을 제거합니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

---

PEP 3100은 Python 2.x에서 Python 3.0으로의 전환 과정에서 언어의 근본적인 변화를 예고하는 중요한 문서입니다. 여기서 언급된 대부분의 변경사항은 실제 Python 3.0에 적용되어 현재 우리가 사용하는 Python의 모습이 되었으며, 이는 Python을 더욱 일관되고, 효율적이며, 미래 지향적인 언어로 만드는 데 크게 기여했습니다.

예를 들어, `print`가 함수가 되고, `int`와 `long`이 통합되며, 모든 문자열이 유니코드로 처리되는 등의 변화는 개발자들이 더 적은 모호성으로 코드를 작성하고 국제화된 애플리케이션을 더 쉽게 개발할 수 있도록 도왔습니다. 또한, `list comprehension`의 스코프 변경은 잠재적인 버그를 줄이고 코드의 예측 가능성을 높였습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.