---
title: "[Final] PEP 362 - Function Signature Object"
excerpt: "Python Enhancement Proposal 362: 'Function Signature Object'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/362/
toc: true
toc_sticky: true
date: 2025-09-26 19:08:03+0900
last_modified_at: 2025-09-26 19:08:03+0900
published: true
---
> **원문 링크:** [PEP 362 - Function Signature Object](https://peps.python.org/pep-0362/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 21-Aug-2006



# PEP 362 – 함수 시그니처 객체

-   **작성자** : Brett Cannon, Jiwon Seo, Yury Selivanov, Larry Hastings
-   **상태** : Final
-   **유형** : Standards Track
-   **생성일** : 2006년 8월 21일
-   **Python 버전** : 3.3
-   **해결** : Python-Dev 메시지

## 개요 (Abstract)

파이썬은 함수와 메서드(이 PEP에서는 "함수"가 둘 모두를 지칭함)를 포함하여 강력한 인트로스펙션(introspection) 기능을 항상 지원해왔습니다. 함수 객체를 검사함으로써 함수의 시그니처를 완전히 재구성할 수 있습니다. 그러나 이 정보는 다루기 불편한 방식으로 저장되어 있으며, 여섯 개에 달하는 깊이 중첩된 어트리뷰트(attribute)에 분산되어 있습니다.

이 PEP는 함수 시그니처에 대한 새로운 표현 방식을 제안합니다. 이 새로운 표현 방식은 함수 및 해당 파라미터에 대한 모든 필수 정보를 포함하며, 인트로스펙션을 쉽고 직관적으로 만듭니다.

하지만 이 객체는 파이썬 자체가 함수를 실행하는 데 사용하는 기존의 함수 메타데이터를 대체하지 않습니다. 이 새로운 메타데이터 객체는 오직 파이썬 프로그래머들을 위해 함수 인트로스펙션을 더 쉽게 만들도록 의도되었습니다.

## 시그니처 객체 (Signature Object)

`Signature` 객체는 함수의 호출 시그니처(call signature)와 반환 어노테이션(return annotation)을 나타냅니다. 함수가 허용하는 각 파라미터에 대해 `parameters` 컬렉션에 `Parameter` 객체를 저장합니다.

`Signature` 객체는 다음과 같은 공개 어트리뷰트와 메서드를 가집니다:

*   **`return_annotation`** : 함수의 "return" 어노테이션입니다. 함수에 "return" 어노테이션이 없으면 이 어트리뷰트는 `Signature.empty`로 설정됩니다.
*   **`parameters`** : 파라미터 이름과 해당 `Parameter` 객체를 매핑하는 정렬된(ordered) 맵입니다.
*   **`bind(*args, **kwargs) -> BoundArguments`** : 위치(positional) 및 키워드(keyword) 인자를 파라미터에 매핑하는 `BoundArguments` 객체를 생성합니다. 전달된 인자가 시그니처와 일치하지 않으면 `TypeError`를 발생시킵니다.
*   **`bind_partial(*args, **kwargs) -> BoundArguments`** : `bind()`와 동일하게 작동하지만, 일부 필수 인자를 생략할 수 있습니다 ( `functools.partial`의 동작을 모방합니다). 전달된 인자가 시그니처와 일치하지 않으면 `TypeError`를 발생시킵니다.
*   **`replace(parameters=<optional>, *, return_annotation=<optional>) -> Signature`**: `replace`가 호출된 인스턴스를 기반으로 새 `Signature` 인스턴스를 생성합니다. 다른 `parameters` 및/또는 `return_annotation`을 전달하여 기본 시그니처의 해당 속성을 오버라이드(override)할 수 있습니다. 복사된 `Signature`에서 `return_annotation`을 제거하려면 `Signature.empty`를 전달합니다.

`Signature` 객체는 변경 불가능(immutable)합니다. 수정된 복사본을 만들려면 `Signature.replace()`를 사용합니다.

`Signature` 클래스를 인스턴스화하는 두 가지 방법이 있습니다:

*   **`Signature(parameters=<optional>, *, return_annotation=Signature.empty)`**: 기본 `Signature` 생성자입니다. 선택적 `Parameter` 객체 시퀀스와 선택적 `return_annotation`을 받습니다. `parameters` 시퀀스는 중복 이름의 파라미터가 없고, 파라미터가 올바른 순서(예: 위치 전용(positional-only)이 먼저, 그 다음 위치 또는 키워드(positional-or-keyword) 등)인지 확인하기 위해 유효성 검사를 거칩니다.
*   **`Signature.from_function(function)`** : 전달된 함수의 시그니처를 반영하는 `Signature` 객체를 반환합니다.

`Signature` 객체에 대한 변경 사항은 함수 자체에 영향을 미치지 않습니다.

## 파라미터 객체 (Parameter Object)

파이썬의 표현력 있는 문법은 함수가 미묘하게 다른 의미를 가진 다양한 종류의 파라미터를 허용할 수 있음을 의미합니다. 이 PEP는 가능한 모든 함수 파라미터를 나타내도록 설계된 풍부한 `Parameter` 객체를 제안합니다.

`Parameter` 객체는 다음과 같은 공개 어트리뷰트와 메서드를 가집니다:

*   **`name`** : 파라미터의 이름(문자열)입니다. 유효한 파이썬 식별자 이름이어야 합니다 (`POSITIONAL_ONLY` 파라미터의 경우 `None`으로 설정될 수 있음).
*   **`default`** : 파라미터의 기본값입니다. 파라미터에 기본값이 없으면 `Parameter.empty`로 설정됩니다.
*   **`annotation`** : 파라미터의 어노테이션입니다. 파라미터에 어노테이션이 없으면 `Parameter.empty`로 설정됩니다.
*   **`kind`** : 인자 값이 파라미터에 어떻게 바인딩되는지 설명합니다. 가능한 값은 다음과 같습니다:
    *   **`Parameter.POSITIONAL_ONLY`** : 값은 위치 인자(positional argument)로만 제공되어야 합니다. 파이썬에는 위치 전용 파라미터를 정의하는 명시적인 문법이 없지만, 많은 내장 함수와 확장 모듈 함수가 이를 허용합니다.
    *   **`Parameter.POSITIONAL_OR_KEYWORD`** : 값은 키워드 인자(keyword argument) 또는 위치 인자로 제공될 수 있습니다 (이것은 파이썬으로 구현된 함수의 표준 바인딩 동작입니다).
    *   **`Parameter.KEYWORD_ONLY`** : 값은 키워드 인자로만 제공되어야 합니다. 키워드 전용 파라미터는 파이썬 함수 정의에서 `*` 또는 `*args` 항목 뒤에 나타나는 파라미터입니다.
    *   **`Parameter.VAR_POSITIONAL`** : 다른 파라미터에 바인딩되지 않은 위치 인자의 튜플입니다. 파이썬 함수 정의의 `*args` 파라미터에 해당합니다.
    *   **`Parameter.VAR_KEYWORD`** : 다른 파라미터에 바인딩되지 않은 키워드 인자의 딕셔너리입니다. 파이썬 함수 정의의 `**kwargs` 파라미터에 해당합니다.
*   **`replace(*, name=<optional>, kind=<optional>, default=<optional>, annotation=<optional>) -> Parameter`**: `replace`가 호출된 인스턴스를 기반으로 새 `Parameter` 인스턴스를 생성합니다. `Parameter` 어트리뷰트를 오버라이드하려면 해당 인자를 전달합니다. `Parameter`에서 어트리뷰트를 제거하려면 `Parameter.empty`를 전달합니다.

`Parameter` 객체는 변경 불가능합니다. `Parameter` 객체를 수정하는 대신 `Parameter.replace()`를 사용하여 수정된 복사본을 만들 수 있습니다.

## `BoundArguments` 객체

`Signature.bind` 호출의 결과입니다. 인자들의 함수 파라미터로의 매핑을 저장합니다.

다음과 같은 공개 어트리뷰트를 가집니다:

*   **`arguments`** : 파라미터 이름과 인자 값의 정렬되고 변경 가능한 매핑(mapping)입니다. 명시적으로 바인딩된 인자만 포함합니다. `bind()`가 기본값에 의존한 인자는 건너뜁니다.
*   **`args`** : 위치 인자 값의 튜플입니다. `arguments` 어트리뷰트에서 동적으로 계산됩니다.
*   **`kwargs`** : 키워드 인자 값의 딕셔너리입니다. `arguments` 어트리뷰트에서 동적으로 계산됩니다.

`arguments` 어트리뷰트는 인자 처리 목적으로 `Signature.parameters`와 함께 사용되어야 합니다.
`args` 및 `kwargs` 속성은 함수를 호출하는 데 사용될 수 있습니다.

## 구현 (Implementation)

이 구현은 `inspect` 모듈에 새로운 함수 `signature()`를 추가합니다. 이 함수는 호출 가능한 객체(callable object)의 `Signature`를 가져오는 선호되는 방법입니다.

`signature()` 함수는 다음 알고리즘을 구현합니다:

1.  객체가 호출 불가능하면(not callable) `TypeError`를 발생시킵니다.
2.  객체에 `__signature__` 어트리뷰트가 있고 `None`이 아니면 이를 반환합니다.
3.  `__wrapped__` 어트리뷰트가 있으면 `signature(object.__wrapped__)`를 반환합니다.
4.  객체가 `FunctionType`의 인스턴스이면, 이를 위한 새 `Signature`를 구성하여 반환합니다.
5.  객체가 바운드 메서드(bound method)이면, 첫 번째 파라미터(일반적으로 `self` 또는 `cls`)가 제거된 새 `Signature` 객체를 구성하여 반환합니다 (`classmethod`와 `staticmethod`도 지원됩니다).
6.  객체가 `functools.partial`의 인스턴스이면, `partial.func` 어트리뷰트로부터 새 `Signature`를 구성하고 이미 바인딩된 `partial.args` 및 `partial.kwargs`를 고려합니다.
7.  객체가 클래스 또는 메타클래스이면:
    *   객체의 타입에 MRO(Method Resolution Order)에 정의된 `__call__` 메서드가 있으면, 이를 위한 `Signature`를 반환합니다.
    *   객체에 MRO에 정의된 `__new__` 메서드가 있으면, 이를 위한 `Signature` 객체를 반환합니다.
    *   객체에 MRO에 정의된 `__init__` 메서드가 있으면, 이를 위한 `Signature` 객체를 반환합니다.
8.  `signature(object.__call__)`을 반환합니다.

`Signature` 객체는 지연(lazy) 방식으로 생성되며 자동으로 캐시되지 않습니다. 그러나 사용자는 `__signature__` 어트리뷰트에 저장하여 `Signature`를 수동으로 캐시할 수 있습니다.

## 설계 고려 사항 (Design Considerations)

### `Signature` 객체의 암시적 캐싱 없음 (No implicit caching of Signature objects)

초기 PEP 설계에는 `inspect.signature()` 함수 내에서 `Signature` 객체를 암시적으로 캐싱하는 조항이 있었습니다. 그러나 이는 다음과 같은 단점이 있습니다:

*   `Signature` 객체가 캐시되면, 이 객체가 설명하는 함수에 대한 모든 변경 사항이 반영되지 않습니다.
*   캐싱이 필요하다면 항상 수동으로 명시적으로 수행할 수 있습니다.
*   실제 `Signature` 객체와 다른 `Signature` 객체를 명시적으로 설정해야 할 필요가 있을 때 `__signature__` 어트리뷰트를 예약하는 것이 더 좋습니다.

### 일부 함수는 인트로스펙션 불가능할 수 있음 (Some functions may not be introspectable)

일부 함수는 특정 파이썬 구현에서 인트로스펙션이 불가능할 수 있습니다. 예를 들어, CPython에서 C로 정의된 내장 함수는 인자에 대한 메타데이터를 제공하지 않습니다. 이들에 대한 지원을 추가하는 것은 이 PEP의 범위를 벗어납니다.

### `Signature` 및 `Parameter` 동등성 (Signature and Parameter equivalence)

파라미터 이름은 의미론적 중요성을 가진다고 가정합니다. 두 시그니처는 해당 파라미터가 동일하고 정확히 같은 이름을 가질 때만 동일합니다. `VAR_KEYWORD` 또는 `VAR_POSITIONAL` 파라미터의 이름을 무시하는 등 더 느슨한 동등성 테스트를 원하는 사용자는 직접 구현해야 합니다.

## 예시 (Examples)

### 호출 가능 객체의 시그니처 시각화 (Visualizing Callable Objects' Signature)

`inspect.signature`를 사용하여 다양한 호출 가능 객체의 시그니처를 어떻게 얻고 시각화하는지 보여주는 예시입니다. 클래스, 메서드, 데코레이터, `functools.partial` 등 다양한 상황에서 시그니처가 어떻게 표현되는지 확인할 수 있습니다.

```python
from inspect import signature
from functools import partial, wraps

class FooMeta(type):
    def __new__(mcls, name, bases, dct, *, bar:bool=False):
        return super().__new__(mcls, name, bases, dct)
    def __init__(cls, name, bases, dct, **kwargs):
        return super().__init__(name, bases, dct)

class Foo(metaclass=FooMeta):
    def __init__(self, spam:int=42):
        self.spam = spam
    def __call__(self, a, b, *, c) -> tuple:
        return a, b, c
    @classmethod
    def spam(cls, a):
        return a

def shared_vars(*shared_args):
    """함수 호출 시마다 전달되는 공유 변수를 정의하는 데코레이터 팩토리"""
    def decorator(f):
        @wraps(f)
        def wrapper(*args, **kwargs):
            full_args = shared_args + args
            return f(*full_args, **kwargs)
        # 시그니처 오버라이드
        sig = signature(f)
        sig = sig.replace(tuple(sig.parameters.values())[1:])
        wrapper.__signature__ = sig
        return wrapper
    return decorator

@shared_vars({})
def example(_state, a, b, c):
    return _state, a, b, c

def format_signature(obj):
    return str(signature(obj))

# Python REPL에서 실행 결과:
# >>> format_signature(FooMeta)
# '(name, bases, dct, *, bar:bool=False)'
# >>> format_signature(Foo)
# '(spam:int=42)'
# >>> format_signature(Foo.__call__)
# '(self, a, b, *, c) -> tuple'
# >>> format_signature(Foo().__call__)
# '(a, b, *, c) -> tuple'
# >>> format_signature(Foo.spam)
# '(a)'
# >>> format_signature(partial(Foo().__call__, 1, c=3))
# '(b, *, c=3) -> tuple'
# >>> format_signature(partial(partial(Foo().__call__, 1, c=3), 2, c=20))
# '(*, c=20) -> tuple'
# >>> format_signature(example)
# '(a, b, c)'
# >>> format_signature(partial(example, 1, 2))
# '(c)'
# >>> format_signature(partial(partial(example, 1, b=2), c=3))
# '(b=2, c=3)'
```

### 어노테이션 검사기 (Annotation Checker)

`inspect.signature`를 활용하여 함수의 인자와 반환 타입 어노테이션을 런타임에 검사하는 데코레이터 예시입니다. 이는 함수 호출 시 인자의 타입과 반환 값의 타입이 기대하는 바와 일치하는지 확인하여 타입 오류를 방지하는 데 도움을 줍니다.

```python
import inspect
import functools

def checktypes(func):
    '''
    인자 및 반환 타입을 확인하는 데코레이터
    예시:
    >>> @checktypes
    ... def test(a:int, b:str) -> int:
    ...     return int(a * b)
    >>> test(10, '1')
    1111111111
    >>> test(10, 1)
    Traceback (most recent call last):
    ...
    ValueError: foo: wrong type of 'b' argument, 'str' expected, got 'int'
    '''
    sig = inspect.signature(func)
    types = {}
    for param in sig.parameters.values():
        # 함수의 파라미터를 순회하며 인자 타입 목록을 구축합니다.
        type_ = param.annotation
        if type_ is param.empty or not inspect.isclass(type_):
            # 어노테이션이 없거나 타입이 아니면 건너뜁니다.
            continue
        types[param.name] = type_
        # 인자에 타입이 지정되어 있다면, 해당 기본값(있는 경우)이 타입과 일치하는지 확인합니다.
        if param.default is not param.empty and not isinstance(param.default, type_):
            raise ValueError("{func}: wrong type of a default value for {arg!r}". \
                             format(func=func.__qualname__, arg=param.name))

    def check_type(sig, arg_name, arg_type, arg_value):
        # 인자 타입 검사를 캡슐화하는 내부 함수입니다.
        if not isinstance(arg_value, arg_type):
            raise ValueError("{func}: wrong type of {arg!r} argument, " \
                             "{exp!r} expected, got {got!r}". \
                             format(func=func.__qualname__, arg=arg_name, exp=arg_type.__name__, got=type(arg_value).__name__))

    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        # 인자를 바인딩합니다.
        ba = sig.bind(*args, **kwargs)
        for arg_name, arg in ba.arguments.items():
            # 바인딩된 인자를 순회합니다.
            try:
                type_ = types[arg_name]
            except KeyError:
                continue
            else:
                # 인자에 대한 타입이 있으므로, 시그니처 객체에서 해당 파라미터 설명을 가져옵니다.
                param = sig.parameters[arg_name]
                if param.kind == param.VAR_POSITIONAL:
                    # 이 파라미터가 가변 인자 파라미터인 경우,
                    # 각 값의 타입을 확인해야 합니다.
                    for value in arg:
                        check_type(sig, arg_name, type_, value)
                elif param.kind == param.VAR_KEYWORD:
                    # 이 파라미터가 가변 키워드 인자 파라미터인 경우:
                    for subname, value in arg.items():
                        check_type(sig, arg_name + ':' + subname, type_, value)
                else:
                    # 그리고 마지막으로, 이 파라미터가 일반 파라미터인 경우:
                    check_type(sig, arg_name, type_, arg)
        result = func(*ba.args, **ba.kwargs)
        # 마지막으로, 결과가 올바른지 확인합니다.
        return_type = sig.return_annotation
        if (return_type is not sig.empty and isinstance(return_type, type) and not isinstance(result, return_type)):
            raise ValueError('{func}: wrong return type, {exp} expected, got {got}'. \
                             format(func=func.__qualname__, exp=return_type.__name__, got=type(result).__name__))
        return result
    return wrapper
```

## 수용 (Acceptance)

PEP 362는 2012년 6월 22일 금요일 Guido van Rossum에 의해 수용되었습니다. 참조 구현은 당일 후반에 트렁크에 커밋되었습니다.

## 참고 자료 및 저작권 (References and Copyright)

이 문서의 원문은 공용 도메인에 속합니다.
더 자세한 내용은 [peps.python.org/pep-0362/](https://peps.python.org/pep-0362/)에서 확인할 수 있습니다.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.