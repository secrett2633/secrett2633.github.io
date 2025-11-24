---
title: "[Final] PEP 737 - C API to format a type fully qualified name"
excerpt: "Python Enhancement Proposal 737: 'C API to format a type fully qualified name'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/737/
toc: true
toc_sticky: true
date: 2025-09-27 13:28:04+0900
last_modified_at: 2025-09-27 13:28:04+0900
published: true
---
> **원문 링크:** [PEP 737 - C API to format a type fully qualified name](https://peps.python.org/pep-0737/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 29-Nov-2023


# PEP 737 – 타입의 Fully Qualified Name 포맷을 위한 C API

## 개요
이 문서는 PEP 737, "C API to format a type fully qualified name"의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 설명합니다. Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것이 목표입니다.

---

**PEP 737 – C API to format a type fully qualified name**

*   **작성자:** Victor Stinner <vstinner at python.org>
*   **토론:** [Discourse thread](https://discuss.python.org/t/pep-737-c-api-to-format-a-type-fully-qualified-name/34988)
*   **상태:** Final (최종)
*   **유형:** Standards Track (표준 트랙)
*   **생성일:** 2023년 11월 29일
*   **Python 버전:** 3.13
*   **게시 이력:** 2023년 11월 29일
*   **결정:** [Discourse message](https://discuss.python.org/t/pep-737-unify-type-name-formatting/35048/17)

## Abstract (요약)

이 PEP는 타입의 Fully Qualified Name (완전한 정규화된 이름)을 포맷하기 위한 새로운 C API를 추가할 것을 제안합니다. 이는 타입이 어떻게 구현되었는지에 따라 다르게 포맷되는 문제를 해결하여, 타입 이름 포맷팅 방식을 통일하는 것을 목표로 합니다.

새로운 C 코드에서 에러 메시지나 `__repr__()` 메서드에 타입의 Fully Qualified Name을 사용하는 것을 권장하며, 타입 이름을 잘라내지(truncate) 않도록 권고합니다.

`PyUnicode_FromFormat()` 함수에 ` %T`, ` %#T`, ` %N`, ` %#N`과 같은 새로운 포맷을 추가하여 객체 타입과 일반 타입의 Fully Qualified Name을 포맷할 수 있도록 합니다. 또한, C 코드에서 `borrowed reference` (빌린 참조)로 인한 잠재적인 충돌을 방지하여 코드를 더욱 안전하게 만듭니다. 이 새로운 C API는 Limited C API와도 호환됩니다.

## Rationale (도입 배경)

Python 표준 라이브러리에서는 에러 메시지를 포맷하거나 `__repr__()` 메서드를 구현할 때 타입 이름이나 객체의 타입 이름을 포맷하는 것이 흔한 작업입니다. 그러나 이러한 타입 이름을 포맷하는 방식에 따라 다른 결과가 나올 수 있습니다.

`datetime.timedelta` 타입을 예로 들면:
*   타입의 짧은 이름 (`type.__name__`)과 Qualified Name (`type.__qualname__`)은 `'timedelta'`입니다.
*   타입의 모듈 (`type.__module__`)은 `'datetime'`입니다.
*   타입의 Fully Qualified Name은 `'datetime.timedelta'`입니다.
*   타입의 표현 (`repr(type)`)은 Fully Qualified Name을 포함합니다: `<class 'datetime.timedelta'>`.

### Python 코드

Python에서는 `type.__name__`을 사용하여 타입의 짧은 이름을 얻고, `f"{type.__module__}.{type.__qualname__}"`과 같이 포맷하여 타입의 "Fully Qualified Name"을 얻습니다. `type(obj)` 또는 `obj.__class__`는 객체 `obj`의 타입을 얻는 데 사용됩니다.

예시:

```python
raise TypeError("str expected, not %s" % type(value).__name__)
raise TypeError("can't serialize %s" % self.__class__.__name__)
name = "%s.%s" % (obj.__module__, obj.__qualname__)
```

Qualified Name은 PEP 3155 "Qualified name for classes and functions"에 따라 Python 3.3에서 타입에 추가되었습니다.

### C 코드

C 코드에서 타입 이름을 포맷하는 가장 일반적인 방법은 타입의 `PyTypeObject.tp_name` 멤버를 가져오는 것입니다.

예시:

```c
PyErr_Format(PyExc_TypeError, "globals must be a dict, not %.100s", Py_TYPE(globals)->tp_name);
```

타입의 "Fully Qualified Name"은 `PyErr_Display()`, `type.__repr__()` 구현, `sys.unraisablehook` 구현 등 일부 경우에 사용됩니다.

`Py_TYPE(obj)->tp_name`을 사용하는 것이 `PyType_GetQualName()`을 호출하는 것보다 편리하므로 선호되지만, `PyType_GetQualName()`은 Python 3.11에서야 추가되었습니다.

일부 함수는 타입 이름을 포맷하기 위해 `%R` (`repr(type)`)을 사용하며, 이 경우 출력에 타입의 Fully Qualified Name이 포함됩니다.

예시:

```c
PyErr_Format(PyExc_TypeError, "calling %R should have returned an instance "
                               "of BaseException, not %R", type, Py_TYPE(value));
```

### `PyTypeObject.tp_name` 사용의 Python과의 불일치

`PyTypeObject.tp_name` 멤버는 타입 구현 방식에 따라 다릅니다.
*   C의 정적 타입(Static types) 및 힙 타입(heap types): `tp_name`은 타입의 Fully Qualified Name입니다.
*   Python 클래스: `tp_name`은 타입의 짧은 이름 (`type.__name__`)입니다.

따라서 `Py_TYPE(obj)->tp_name`을 사용하여 객체 타입 이름을 포맷하면, 타입이 C로 구현되었는지 Python으로 구현되었는지에 따라 다른 출력을 제공합니다. 이는 Python으로 작성된 코드와 C로 작성된 코드가 동일하게 동작해야 한다는 PEP 399 "Pure Python/C Accelerator Module Compatibility Requirements" 원칙에 위배됩니다.

예시:

```python
$ python3.12
>>> import _datetime; c_obj = _datetime.date(1970, 1, 1)
>>> import _pydatetime; py_obj = _pydatetime.date(1970, 1, 1)
>>> my_list = list(range(3))
>>> my_list[c_obj] # C type
TypeError: list indices must be integers or slices, not datetime.date
>>> my_list[py_obj] # Python type
TypeError: list indices must be integers or slices, not date
```

위 예시에서 C로 구현된 타입은 Fully Qualified Name (`datetime.date`)을, Python으로 구현된 타입은 짧은 이름 (`date`)을 에러 메시지에 사용합니다.

### Limited C API

`Py_TYPE(obj)->tp_name` 코드는 `PyTypeObject` 멤버가 Limited C API에서 제외되므로 Limited C API와 함께 사용할 수 없습니다. 대신 `PyType_GetName()`, `PyType_GetQualName()`, `PyType_GetModule()` 함수를 사용하여 타입 이름을 읽어야 하지만, 이들은 사용하기에 덜 편리합니다.

### C에서 타입 이름 잘라내기 (Truncating type names)

1998년 `PyErr_Format()` 함수가 추가되었을 때, 이 구현은 500바이트의 고정 버퍼를 사용했습니다. 당시 함수에는 `/* Caller is responsible for limiting the format */`이라는 주석이 있었습니다.

2001년에 이 함수는 힙에 동적 버퍼를 할당하도록 수정되었지만, `%.100s`와 같이 타입 이름을 잘라내는 관행은 이미 습관화되었고 개발자들은 타입 이름이 왜 잘려야 하는지 잊어버렸습니다. Python에서는 타입 이름이 잘리지 않습니다.

C에서는 타입 이름을 잘라내고 Python에서는 그렇지 않은 것은 PEP 399 "Pure Python/C Accelerator Module Compatibility Requirements" 원칙에 위배됩니다.

관련 이슈: [Replace %.100s by %s in PyErr_Format(): the arbitrary limit of 500 bytes is outdated (2011)](https://github.com/python/cpython/issues/52178).

## Specification (세부 사항)

이 PEP는 다음을 제안합니다:
*   `PyType_GetFullyQualifiedName()` 함수 추가.
*   `PyType_GetModuleName()` 함수 추가.
*   `PyUnicode_FromFormat()`에 새로운 포맷 추가.
*   새로운 C 코드에서 에러 메시지 및 `__repr__()` 메서드에 타입의 Fully Qualified Name을 사용하는 것을 권장.
*   새로운 C 코드에서 타입 이름을 잘라내지 않도록 권장.

### `PyType_GetFullyQualifiedName()` 함수 추가

타입의 Fully Qualified Name을 얻기 위한 `PyType_GetFullyQualifiedName()` 함수를 추가합니다. 이는 `f"{type.__module__}.{type.__qualname__}"`과 유사하며, `type.__module__`이 문자열이 아니거나 `"builtins"` 또는 `"__main__"`과 같으면 `type.__qualname__`을 반환합니다.

API:

```c
PyObject* PyType_GetFullyQualifiedName(PyTypeObject *type)
```

성공 시, 문자열에 대한 새로운 참조를 반환합니다. 에러 발생 시, 예외를 발생시키고 `NULL`을 반환합니다.

### `PyType_GetModuleName()` 함수 추가

타입의 모듈 이름 (`type.__module__` 문자열)을 얻기 위한 `PyType_GetModuleName()` 함수를 추가합니다.

API:

```c
PyObject* PyType_GetModuleName(PyTypeObject *type)
```

성공 시, 문자열에 대한 새로운 참조를 반환합니다. 에러 발생 시, 예외를 발생시키고 `NULL`을 반환합니다.

### `PyUnicode_FromFormat()`에 포맷 추가

`PyUnicode_FromFormat()`에 다음 포맷을 추가합니다:
*   `%N`: 타입의 Fully Qualified Name을 포맷하며, `PyType_GetFullyQualifiedName(type)`과 유사합니다. 'N'은 'type Name'을 의미합니다.
*   `%T`: 객체 타입의 Fully Qualified Name을 포맷하며, `PyType_GetFullyQualifiedName(Py_TYPE(obj))`과 유사합니다. 'T'는 'object Type'을 의미합니다.
*   `%#N` 및 `%#T`: 대체 형식은 모듈 이름과 Qualified Name 사이에 점 (`.`) 대신 콜론 (`:`) 구분자를 사용합니다.

예를 들어, 기존에 `tp_name`을 사용하던 다음 코드는:

```c
PyErr_Format(PyExc_TypeError, "__format__ must return a str, not %.200s", Py_TYPE(result)->tp_name);
```

`%T` 포맷으로 대체될 수 있습니다:

```c
PyErr_Format(PyExc_TypeError, "__format__ must return a str, not %T", result);
```

업데이트된 코드의 장점:
*   **더 안전한 C 코드:** `borrowed reference`를 반환하는 `Py_TYPE()`를 피합니다.
*   **Limited C API 호환성:** `PyTypeObject.tp_name` 멤버를 명시적으로 읽지 않아 Limited C API와 호환됩니다.
*   **일관된 포맷팅:** 포맷된 타입 이름이 더 이상 타입 구현에 의존하지 않습니다.
*   **잘림 방지:** 타입 이름이 더 이상 잘리지 않습니다.

참고: `%T` 포맷은 `time.strftime()`에서 사용되지만, `printf()`에서는 사용되지 않습니다.

### Formats Summary (포맷 요약)

| C object | C type | Format |
| :------- | :----- | :----- |
| `%T`     | `%N`   | 타입의 Fully Qualified Name. |
| `%#T`    | `%#N`  | 타입의 Fully Qualified Name, 콜론 구분자. |

### 타입의 Fully Qualified Name 사용 권장

새로운 C 코드에서 에러 메시지 및 `__repr__()` 메서드에 타입의 Fully Qualified Name을 사용하는 것이 권장됩니다.

복잡한 애플리케이션에서는 일반적인 이름으로 인해 동일한 짧은 이름을 가진 두 개의 타입이 다른 모듈에 정의될 가능성이 있습니다. Fully Qualified Name을 사용하면 타입을 명확하게 식별하는 데 도움이 됩니다.

### 타입 이름 잘라내지 않도록 권장

새로운 C 코드에서 타입 이름은 잘라내서는 안 됩니다. 예를 들어, `%.100s` 포맷은 피하고 ` %s` 포맷(또는 C에서는 `%T` 포맷)을 대신 사용해야 합니다.

## Implementation (구현)

*   [Pull request: Add type.__fully_qualified_name__ attribute](https://github.com/python/cpython/pull/112615)
*   [Pull request: Add %T format to PyUnicode_FromFormat()](https://github.com/python/cpython/pull/112616)

## Backwards Compatibility (하위 호환성)

이 PEP에서 제안된 변경 사항은 하위 호환됩니다.
*   새로운 C API 추가는 하위 호환성에 영향을 미치지 않습니다.
*   기존 C API는 변경되지 않습니다.
*   Python API는 변경되지 않습니다.

타입의 짧은 이름을 Fully Qualified Name으로 대체하는 것은 새로운 C 코드에서만 권장됩니다. 타입 이름을 잘라내지 않는 것도 새로운 C 코드에서만 권장됩니다. 기존 코드는 변경되지 않고 하위 호환성을 유지합니다. Python 코드에 대한 권장 사항은 없습니다.

## Rejected Ideas (거부된 아이디어)

### `type.__fully_qualified_name__` 속성 추가

`type.__fully_qualified_name__` 읽기 전용 속성을 추가하여, 타입의 Fully Qualified Name을 제공하는 아이디어가 있었습니다. 이는 `f"{type.__module__}.{type.__qualname__}"`과 유사하며, `type.__module__`이 문자열이 아니거나 `"builtins"` 또는 `"__main__"`과 같으면 `type.__qualname__`을 반환합니다.

그러나 이 변경 사항은 Steering Council에 의해 거부되었습니다:
> "우리는 이 PEP에서 제안된 C API 변경의 유용성을 이해하며 그대로 수용할 가능성이 높습니다. 그러나 Python 수준의 변경에 대해서는 정당성이 부족하다고 봅니다. 특히 `__fully_qualified_name__`의 필요성에 의문을 제기합니다."

Thomas Wouters는 다음과 같이 덧붙였습니다:
> "C API와 정확히 동일한 방식으로 타입을 포맷해야 할 필요성이 정말 있다면, 개인적으로 `type.__format__`보다는 유틸리티 함수가 더 합리적이라고 생각하지만, 구체적인 사용 사례가 있다면 SC도 설득될 수 있을 것입니다."

### `type.__format__()` 메서드 추가

`type.__format__()` 메서드에 다음 포맷을 추가하는 아이디어가 있었습니다:
*   `N`: 타입의 Fully Qualified Name을 포맷합니다 (`type.__fully_qualified_name__`). 'N'은 'Name'을 의미합니다.
*   `#N` (대체 형식): 모듈 이름과 Qualified Name 사이에 점 (`.`) 대신 콜론 (`:`) 구분자를 사용하여 타입의 Fully Qualified Name을 포맷합니다.

f-string을 사용한 예시:

```python
>>> import datetime
>>> f"{datetime.timedelta:N}" # fully qualified name
'datetime.timedelta'
>>> f"{datetime.timedelta:#N}" # fully qualified name, colon separator
'datetime:timedelta'
```

`#N` 포맷에 사용된 콜론 (`:`) 구분자는 이름을 임포트하려는 경우 추측을 제거하는 데 도움이 됩니다. (`pkgutil.resolve_name()`, `python -m inspect` 명령줄 인터페이스, setuptools entry points 참조).

이 변경 사항 또한 Steering Council에 의해 거부되었습니다.

### `str(type)` 변경

`type.__str__()` 메서드를 수정하여 타입 이름을 다르게 포맷하는 아이디어가 있었습니다. 예를 들어, 타입의 Fully Qualified Name을 반환할 수 있습니다.

문제는 이것이 하위 호환되지 않는 변경이라는 점입니다. 예를 들어, 표준 라이브러리의 `enum`, `functools`, `optparse`, `pdb`, `xmlrpc.server` 모듈을 업데이트해야 합니다. `test_dataclasses`, `test_descrtut`, `test_cmd_line_script` 테스트도 업데이트해야 합니다.

관련 풀 리퀘스트: [type(str) returns the fully qualified name](https://github.com/python/cpython/pull/34336).

### `!t` 포매터로 객체 타입 얻기

`f"{obj!t:T}"`를 사용하여 `type(obj).__fully_qualified_name__`을 포맷하는 아이디어는 `f"{type(obj):T}"`와 유사합니다.

`!t` 포매터가 2018년에 제안되었을 때, f-string PEP 498 "Literal String Interpolation"의 저자인 Eric Smith는 이에 강력히 반대했습니다.

### `str % args`에 포맷 추가

`str % arg`에서 타입 이름을 포맷하기 위한 포맷을 추가하는 아이디어가 있었습니다. 예를 들어, 타입의 Fully Qualified Name을 포맷하기 위해 `%T` 포맷을 추가하는 것입니다.

요즘에는 새로운 코드에 f-string이 선호됩니다.

### C에서 타입 이름을 포맷하는 다른 방법들

`printf()` 함수는 여러 크기 지정자(hh, h, l, ll, z, t, j)를 지원하며, `PyUnicode_FromFormat()` 함수는 대부분을 지원합니다.

`h` 및 `hh` 길이 지정자를 사용한 제안된 포맷:
*   `%hhT`는 `type.__name__`을 포맷합니다.
*   `%hT`는 `type.__qualname__`을 포맷합니다.
*   `%T`는 `type.__fully_qualified_name__`을 포맷합니다.

길이 지정자는 인수의 C 타입을 지정하는 데 사용되며, 인수가 포맷되는 방식을 변경하는 데 사용되지 않습니다. 대체 형식 (`#`)은 인수가 포맷되는 방식을 변경합니다. 여기서 인수의 C 타입은 항상 `PyObject*`입니다.

다른 제안된 포맷:
*   `%Q`, `%t`
*   `%lT`는 `type.__fully_qualified_name__`을 포맷합니다.
*   `%Tn`은 `type.__name__`을 포맷합니다.
*   `%Tq`는 `type.__qualname__`을 포맷합니다.
*   `%Tf`는 `type.__fully_qualified_name__`을 포맷합니다.

타입 이름을 포맷하는 옵션이 너무 많으면 다른 모듈 간에 불일치가 발생하고 API가 오류 발생 가능성이 높아질 수 있습니다. `%t` 포맷의 경우, `printf()`는 이제 `ptrdiff_t` 인수에 대한 길이 지정자로 `t`를 사용합니다.

타입을 포맷하는 데 사용될 API는 다음과 같습니다:

| C API                | Python API     | Format            |
| :------------------- | :------------- | :---------------- |
| `PyType_GetName()`   | `type.__name__` | 타입 짧은 이름. |
| `PyType_GetQualName()` | `type.__qualname__` | 타입 Qualified Name. |
| `PyType_GetModuleName()` | `type.__module__` | 타입 모듈 이름. |

### `Py_TYPE()`와 함께 `%T` 포맷 사용: 타입 전달

`Py_TYPE(obj)`와 같이 `%T` 포맷에 타입을 전달하는 아이디어가 있었습니다.

```c
PyErr_Format(PyExc_ValueError, "Unexpected value %R of type %T", obj, Py_TYPE(obj));
```

`Py_TYPE()` 함수는 `borrowed reference`를 반환합니다. 에러를 포맷하기 위해 `borrowed reference`를 사용하는 것은 안전해 보일 수 있지만, 실제로는 충돌로 이어질 수 있습니다. 예를 들어, `repr(obj)`가 `%R` 포맷에 의해 호출될 때 `ClassB`에 대한 마지막 참조가 제거되고 클래스가 할당 해제될 수 있습니다. 이때 `%T` 포맷이 처리되면 `Py_TYPE(obj)`는 이미 `dangling pointer`가 되어 Python이 충돌할 수 있습니다.

### 타입의 Fully Qualified Name을 얻기 위한 다른 API 제안

*   `type.__fullyqualname__` 속성 추가: 단어 사이에 밑줄이 없는 이름.
*   `type.__fqn__` 속성 추가: FQN은 Fully Qualified Name의 약자.
*   `type.fully_qualified_name()` 메서드 추가: 타입에 추가된 메서드는 모든 타입에 상속되므로 기존 코드에 영향을 미칠 수 있습니다.
*   `inspect` 모듈에 함수 추가: 사용하려면 `inspect` 모듈을 임포트해야 합니다.

### Fully Qualified Name에 `__main__` 모듈 포함

`type.__fully_qualified_name__`을 `f"{type.__module__}.{type.__qualname__}"`으로 포맷하거나, `type.__module__`이 문자열이 아니거나 `"builtins"`와 같으면 `type.__qualname__`으로 포맷하는 아이디어가 있었습니다. `__main__` 모듈을 다르게 처리하지 않고 이름에 포함시키는 것입니다.

`type.__repr__()`, `collections.abc`, `unittest` 모듈과 같은 기존 코드는 `f'{obj.__module__}.{obj.__qualname__}'`으로 타입 이름을 포맷하고, 모듈이 `builtins`와 같을 경우에만 모듈 부분을 생략합니다.

`traceback` 및 `pdb` 모듈만이 모듈이 `"builtins"` 또는 `"__main__"`과 같을 경우 모듈을 생략합니다.

`type.__fully_qualified_name__` 속성은 스크립트가 `python script.py`로 실행될 때 정의되는 타입과 같이 일반적인 경우에 더 짧은 이름을 생성하기 위해 `__main__` 모듈을 생략합니다. 디버깅을 위해 타입에 `repr()` 함수를 사용할 수 있으며, 이는 타입 이름에 `__main__` 모듈을 포함합니다. 또는 `"builtins"` 모듈의 경우에도 항상 모듈 이름을 포함하려면 `f"{type.__module__}.{type.__qualname__}"` 포맷을 사용하세요.

스크립트 예시:

```python
class MyType: pass
print(f"name: {MyType.__fully_qualified_name__}")
print(f"repr: {repr(MyType)}")
```

출력:

```
name: MyType
repr: <class '__main__.MyType'>
```

## Discussions (토론)

*   [Discourse: PEP 737 – Unify type name formatting (2023)](https://discuss.python.org/t/pep-737-unify-type-name-formatting/35048)
*   [Discourse: Enhance type name formatting when raising an exception: add %T format in C, and add type.__fullyqualname__ (2023)](https://discuss.python.org/t/enhance-type-name-formatting-when-raising-an-exception-add-t-format-in-c-and-add-type-fullyqualname/34988)
*   [Issue: PyUnicode_FromFormat(): Add %T format to format the type name of an object (2023)](https://github.com/python/cpython/issues/112616)
*   [Issue: C API: Investigate how the PyTypeObject members can be removed from the public C API (2023)](https://github.com/python/cpython/issues/112521)
*   [python-dev thread: bpo-34595: How to format a type name? (2018)](https://mail.python.org/archives/list/python-dev@python.org/thread/S5G3C4G6Q5Q7M7M8N8J7K2L4R5N8N5P6/)
*   [Issue: PyUnicode_FromFormat(): add %T format for an object type name (2018)](https://github.com/python/cpython/issues/84370)
*   [Issue: Replace %.100s by %s in PyErr_Format(): the arbitrary limit of 500 bytes is outdated (2011)](https://github.com/python/cpython/issues/52178)

## Copyright (저작권)

이 문서는 Public Domain에 있거나 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스 하에 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.