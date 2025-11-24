---
title: "[Final] PEP 647 - User-Defined Type Guards"
excerpt: "Python Enhancement Proposal 647: 'User-Defined Type Guards'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/647/
toc: true
toc_sticky: true
date: 2025-09-27 01:37:28+0900
last_modified_at: 2025-09-27 01:37:28+0900
published: true
---
> **원문 링크:** [PEP 647 - User-Defined Type Guards](https://peps.python.org/pep-0647/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 07-Oct-2020



PEP 647은 Python의 타입 힌팅 시스템을 강화하여, 런타임 검사에 기반한 조건부 타입 좁히기(conditional type narrowing) 기능을 사용자 정의 함수로 확장할 수 있도록 `TypeGuard`라는 새로운 개념을 도입합니다. 이 제안의 목표는 정적 타입 검사기가 런타임 시 특정 조건이 충족될 때 변수의 타입을 더 구체적으로 추론할 수 있도록 돕는 것입니다.

## 초록 (Abstract)
이 PEP는 프로그램이 런타임 검사를 기반으로 타입 검사기가 사용하는 조건부 타입 좁히기(conditional type narrowing)에 영향을 미칠 수 있는 방법을 명시합니다.

## 동기 (Motivation)
정적 타입 검사기는 프로그램 코드 흐름 내에서 표현식의 보다 정확한 타입을 결정하기 위해 "타입 좁히기(type narrowing)"라는 기술을 일반적으로 사용합니다. `if`나 `while` 문과 같은 조건부 코드 흐름 문을 기반으로 코드 블록 내에서 타입 좁히기가 적용될 때, 조건부 표현식을 "타입 가드(type guard)"라고 부르기도 합니다. Python 타입 검사기는 일반적으로 다양한 형태의 타입 가드 표현식을 지원합니다.

예를 들어, `is None` 검사를 통해 `Optional[str]` 타입의 `val`이 `str`로 좁혀지거나 `None`으로 좁혀질 수 있습니다. 또한 `isinstance`를 사용하여 `Union[str, float]` 타입의 `val`이 `str` 또는 `float`으로 좁혀질 수 있습니다.

하지만 정적 정보만으로는 타입 좁히기를 적용할 수 없는 경우가 있습니다. 예를 들어, 리스트의 모든 요소가 문자열인지 확인하는 `is_str_list` 함수를 정의하고, 이 함수가 `True`를 반환할 때 리스트를 `List[str]`로 취급하려 할 경우, 타입 검사기는 정적으로 이를 검증할 정보가 부족하여 오류를 보고합니다.

```python
def is_str_list(val: List[object]) -> bool:
    """리스트의 모든 객체가 문자열인지 판단합니다."""
    return all(isinstance(x, str) for x in val)

def func1(val: List[object]):
    if is_str_list(val):
        print(" ".join(val)) # Error: invalid type
```


이 PEP는 `is_str_list`와 같은 함수를 "사용자 정의 타입 가드(user-defined type guard)"로 정의하는 방법을 도입합니다. 이를 통해 코드에서 타입 검사기가 지원하는 타입 가드를 확장할 수 있습니다.

새로운 메커니즘을 사용하면 `is_str_list` 함수의 반환 타입을 `bool`에서 `TypeGuard[List[str]]`로 변경하여, 함수가 `True`를 반환할 경우 입력 인수가 지정된 타입(`List[str]`)임을 나타낼 수 있습니다.

```python
from typing import TypeGuard

def is_str_list(val: List[object]) -> TypeGuard[List[str]]:
    """리스트의 모든 객체가 문자열인지 판단합니다."""
    return all(isinstance(x, str) for x in val)
```


사용자 정의 타입 가드는 `TypedDict`의 타입 요구 사항을 준수하는지 여부를 결정하는 데도 사용될 수 있습니다.

```python
from typing import TypedDict, TypeGuard

class Person(TypedDict):
    name: str
    age: int

def is_person(val: dict) -> "TypeGuard[Person]":
    try:
        return isinstance(val["name"], str) and isinstance(val["age"], int)
    except KeyError:
        return False

def print_age(val: dict):
    if is_person(val):
        print(f"Age: {val['age']}")
    else:
        print("Not a person!")
```


## 명세 (Specification)

### `TypeGuard` 타입
이 PEP는 `typing` 모듈에서 `TypeGuard` 심볼을 도입합니다. `TypeGuard`는 단일 타입 인수를 받는 특별한 형태로, 사용자 정의 타입 가드 함수의 반환 타입을 주석 처리하는 데 사용됩니다. 타입 가드 함수 내의 `return` 문은 `bool` 값을 반환해야 하며, 타입 검사기는 모든 반환 경로가 `bool`을 반환하는지 확인해야 합니다.

다른 모든 면에서 `TypeGuard`는 `bool`과는 별개의 타입이며, `bool`의 하위 타입이 아닙니다. 따라서 `Callable[..., TypeGuard[int]]`는 `Callable[..., bool]`에 할당될 수 없습니다.

`TypeGuard`가 하나 이상의 매개변수를 받는 함수나 메서드의 반환 타입을 주석 처리하는 데 사용될 때, 해당 함수 또는 메서드는 타입 검사기에 의해 사용자 정의 타입 가드로 처리됩니다. `TypeGuard`에 제공된 타입 인수는 함수에 의해 유효성이 검사된 타입을 나타냅니다.

사용자 정의 타입 가드는 제네릭 함수가 될 수 있습니다. 예를 들어:

```python
from typing import TypeVar, Tuple, TypeGuard

_T = TypeVar("_T")

def is_two_element_tuple(val: Tuple[_T, ...]) -> TypeGuard[Tuple[_T, _T]]:
    return len(val) == 2

def func(names: Tuple[str, ...]):
    if is_two_element_tuple(names):
        reveal_type(names) # Tuple[str, str]
    else:
        reveal_type(names) # Tuple[str, ...]
```


타입 검사기는 사용자 정의 타입 가드에 첫 번째 위치 인수로 전달된 표현식에 타입 좁히기가 적용되어야 한다고 가정합니다. 타입 가드 함수가 두 개 이상의 인수를 받는 경우, 추가 인수에 대해서는 타입 좁히기가 적용되지 않습니다.

타입 가드 함수가 인스턴스 메서드나 클래스 메서드로 구현된 경우, 첫 번째 위치 인수는 두 번째 매개변수(`self` 또는 `cls` 다음)에 매핑됩니다.

일반적으로 사용자 정의 타입 가드 함수의 반환 타입은 첫 번째 인수의 타입보다 엄격하게 "좁은(narrower)" 타입을 참조합니다. 그러나 반드시 엄격하게 좁은 타입이어야 하는 것은 아닙니다. 이는 `List[str]`가 `List[object]`의 하위 타입이 아닌 경우와 같은 상황을 허용합니다.

조건문이 사용자 정의 타입 가드 함수 호출을 포함하고 해당 함수가 `True`를 반환할 때, 타입 가드 함수에 첫 번째 위치 인수로 전달된 표현식은 조건부 코드 블록 내에서 추가로 좁혀지지 않는 한 `TypeGuard` 반환 타입에 지정된 타입을 갖는다고 정적 타입 검사기가 가정해야 합니다.

일부 내장 타입 가드는 긍정(positive) 및 부정(negative) 테스트( `if` 및 `else` 절 모두)에 대해 좁히기를 제공합니다. 그러나 사용자 정의 타입 가드는 긍정적인 경우( `if` 절)에만 좁히기를 적용하며, 부정적인 경우에는 타입이 좁혀지지 않습니다.

```python
from typing import Union, Tuple

OneOrTwoStrs = Union[Tuple[str], Tuple[str, str]]

def func(val: OneOrTwoStrs):
    if is_two_element_tuple(val):
        reveal_type(val) # Tuple[str, str]
    else:
        reveal_type(val) # OneOrTwoStrs
```


### 하위 호환성 (Backwards Compatibility)
이 새로운 기능을 사용하지 않는 기존 코드는 영향을 받지 않습니다. 특히, `stdlib typing` 라이브러리와 호환되지 않는 방식으로 어노테이션을 사용하는 코드는 `TypeGuard`를 임포트하지 않으면 됩니다.

### 참조 구현 (Reference Implementation)
Pyright 타입 검사기는 이 PEP에 설명된 동작을 지원합니다.

### 기각된 아이디어 (Rejected Ideas)

#### 데코레이터 구문 (Decorator Syntax)
타입 가드를 정의하기 위해 데코레이터 구문 사용이 고려되었습니다.
```python
@type_guard(List[str])
def is_str_list(val: List[object]) -> bool:
    ...
```

하지만 데코레이터 접근 방식은 타입의 런타임 평가를 필요로 하여 전방 참조(forward references)를 불가능하게 만들므로 열등하다고 판단되었습니다. 제안된 접근 방식이 더 이해하기 쉽고 구현하기 간단하다고 여겨졌습니다.

#### 엄격한 좁히기 강제 (Enforcing Strict Narrowing)
`TypeGuard` 타입 인수에 지정된 타입이 첫 번째 매개변수에 지정된 타입보다 엄격하게 좁은 형태여야 한다는 엄격한 타입 좁히기 강제가 고려되었지만, 이는 이 기능의 유용한 사용 사례를 제거합니다. 예를 들어, `List[str]`가 공변성(invariance) 규칙 때문에 `List[object]`의 하위 타입이 아니기 때문에 위의 `is_str_list` 예제는 유효하지 않게 됩니다.

엄격한 좁히기를 강제하지 않으면 타입 안전성을 해칠 가능성이 있다는 지적이 있었지만, `cast`나 `Any`를 사용하는 등 개발자가 타입 안전성을 우회할 수 있는 다른 방법들이 많으므로, 사용자 정의 타입 가드를 구현하는 개발자는 타입 안전성에 관심이 있을 것이라고 가정하고 엄격한 검사를 생략하기로 결정했습니다.

#### 조건부 `TypeGuard` 타입 적용 (Conditionally Applying TypeGuard Type)
타입 가드 함수의 첫 번째 인수로 전달된 표현식의 타입이 `TypeGuard` 반환 타입에 지정된 타입의 적절한 하위 타입인 경우, 해당 표현식은 기존 타입을 유지해야 한다는 제안이 있었습니다. 이는 복잡성과 불일치를 추가하고, 유니온(unions) 또는 여러 제약이 있는 타입 변수(type variables)와 같은 복합 타입의 경우 적절한 동작에 대한 추가적인 질문을 야기하여 기각되었습니다.

#### 임의의 매개변수 좁히기 (Narrowing of Arbitrary Parameters)
TypeScript는 사용자 정의 타입 가드에서 임의의 입력 매개변수를 좁히기 테스트에 사용할 수 있도록 허용합니다. 그러나 실제로 테스트되는 매개변수가 첫 번째 매개변수가 아닌 예시는 거의 없었으므로, Python 구현에서는 불필요한 복잡성을 추가하지 않기로 결정했습니다.

#### 암시적 `self` 및 `cls` 매개변수 좁히기 (Narrowing of Implicit “self” and “cls” Parameters)
타입 가드 함수가 인스턴스 또는 클래스 메서드로 구현된 경우, 암시적인 `self` 또는 `cls` 인수가 함수에 전달됩니다. `self` 또는 `cls`에 좁히기 로직을 적용해야 하는 경우가 있을 수 있다는 우려가 있었지만, 이는 특이한 사용 사례이며 구현을 상당히 복잡하게 만들 것이므로 특별한 조항은 두지 않기로 결정했습니다. `self` 또는 `cls`의 좁히기가 필요한 경우, 해당 값을 타입 가드 함수의 명시적 인수로 전달할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.