---
title: "[Final] PEP 692 - Using TypedDict for more precise **kwargs typing"
excerpt: "Python Enhancement Proposal 692: 'Using TypedDict for more precise ** kwargs typing'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/692/
toc: true
toc_sticky: true
date: 2025-09-27 10:21:57+0900
last_modified_at: 2025-09-27 10:21:57+0900
published: true
---
> **원문 링크:** [PEP 692 - Using TypedDict for more precise **kwargs typing](https://peps.python.org/pep-0692/)
>
> ** 상태: ** Final | ** 유형: ** Standards Track | ** 작성일: ** 29-May-2022


# PEP 692 – 보다 정밀한 `** kwargs` 타입 지정을 위한 `TypedDict` 활용

## 개요
이 PEP는 ` **kwargs`에 포함된 키워드 인자들의 타입이 서로 다를 때, `TypedDict`를 사용하여 보다 정밀하게 `** kwargs`의 타입을 지정할 수 있는 새로운 방법을 제안합니다. 현재 ` **kwargs`는 모든 키워드 인자가 동일한 타입이어야만 타입 힌트가 가능하여 활용도가 제한적이었습니다. 이 새로운 접근 방식은 `TypedDict`를 통해 여러 타입을 포함하는 `** kwargs`를 타입 지정할 수 있도록 합니다.

## 동기 (Motivation)
기존에는 ` **kwargs`를 특정 타입 `T`로 어노테이션하면, 이는 `dict[str, T]`를 의미했습니다. 예를 들어 `def foo(** kwargs: str) -> None:`는 `foo` 함수의 모든 키워드 인자가 문자열임을 뜻했습니다. 이러한 방식은 모든 키워드 인자의 타입이 동일한 경우에만 ` **kwargs` 타입 어노테이션을 가능하게 하여, 키워드 이름에 따라 타입이 달라지는 경우에는 `** kwargs` 타입 지정이 불가능했습니다. 이는 특히 기존 코드베이스에서 적절한 타입 어노테이션을 도입하기 위한 리팩토링 노력이 비효율적이라고 간주될 수 있는 경우에 문제가 되었습니다.

` **kwargs`는 또한 공개 API의 최상위 함수가 여러 헬퍼 함수를 호출하고, 이 헬퍼 함수들이 동일한 키워드 인자들을 기대할 때 코드 중복을 줄이는 데 유용합니다. 그러나 이 경우에도 키워드 인자들이 다른 타입을 가질 때 `** kwargs`를 사용하는 헬퍼 함수의 타입 힌트는 어려웠습니다. 심지어 같은 타입이라 할지라도, 함수가 실제로 예상하는 키워드 이름으로 호출되는지 확인할 방법이 없었습니다.

` **kwargs`는 기본값이 없는 선택적 키워드 전용 인자를 수용해야 할 때도 편리하게 사용될 수 있습니다. `None`과 같이 사용자 입력이 없음을 나타내는 기본값이 사용자에게 전달되어 유효하지만 기본값이 아닌 동작을 유발할 수 있는 경우에 이러한 패턴이 필요할 수 있습니다.

## 근거 (Rationale)
PEP 589에서 도입된 `TypedDict`는 문자열 키와 잠재적으로 다른 타입의 값을 포함하는 딕셔너리 타입을 지원합니다. `** kwargs`와 같은 이중 별표로 시작하는 형식 매개변수로 표현되는 함수의 키워드 인자는 딕셔너리 형태로 받게 됩니다. 또한, 이러한 함수들은 키워드 인자를 제공하기 위해 언팩된(unpacked) 딕셔너리를 사용하여 호출되는 경우가 많습니다. 이 때문에 `TypedDict`는 보다 정밀한 ` **kwargs` 타입 지정을 위한 완벽한 후보입니다. `TypedDict`를 사용하면 정적 타입 분석 중에 키워드 이름을 고려할 수 있습니다.

기존 `** kwargs` 동작을 유지하면서 `TypedDict`를 `kwargs` 타입으로 지원하기 위해 PEP 646에서 처음 도입된 `Unpack`을 재사용하는 것을 제안합니다. `Unpack`은 제공된 `TypedDict`에서 키워드 인자를 "언팩"하려는 의도에 적합하고 직관적인 이름을 가지고 있습니다. 또한, `*args`의 현재 타입 지정 방식이 ` **kwargs`로 확장되어 유사하게 동작하며, 새로운 특별한 형식을 도입할 필요가 없습니다. 이 PEP에서 설명된 목적을 위한 `Unpack` 사용은 PEP 646에서 설명된 사용 사례와 충돌하지 않습니다.

## 명세 (Specification)

`Unpack`을 사용하여 `** kwargs`를 어노테이션하는 새로운 방법을 소개합니다. 예를 들어:

```python
class Movie(TypedDict):
    name: str
    year: int

def foo( **kwargs: Unpack[Movie]) -> None:
    ...
```

위 코드는 `** kwargs`가 `Movie`에 의해 지정된 두 개의 키워드 인자(즉, `str` 타입의 `name` 키워드와 `int` 타입의 `year` 키워드)를 포함함을 의미합니다. 이 함수는 다음과 같이 호출될 수 있습니다:

```python
kwargs: Movie = {"name": "Life of Brian", "year": 1979}
foo( **kwargs) # OK!
foo(name="The Meaning of Life", year=1983) # OK!
```

`Unpack`이 사용될 때, 타입 체커는 함수 본문 내의 `kwargs`를 `TypedDict`로 취급합니다.

```python
def foo(** kwargs: Unpack[Movie]) -> None:
    assert_type(kwargs, Movie) # OK!
```

새로운 어노테이션은 런타임에 아무런 영향을 미치지 않으며, 오직 타입 체커에 의해서만 고려됩니다.

### 표준 딕셔너리를 사용한 함수 호출
`dict[str, object]` 타입의 딕셔너리를 `Unpack`으로 어노테이션된 ` **kwargs` 인자로 전달하면 타입 체커 오류가 발생해야 합니다.

```python
def foo(** kwargs: Unpack[Movie]) -> None: ...
movie: dict[str, object] = {"name": "Life of Brian", "year": 1979}
foo( **movie) # WRONG! Movie는 dict[str, object] 타입입니다.

typed_movie: Movie = {"name": "The Meaning of Life", "year": 1983}
foo(** typed_movie) # OK!

another_movie = {"name": "Life of Brian", "year": 1979}
foo( **another_movie) # 타입 체커에 따라 다릅니다.
```

### 키워드 충돌
`** kwargs` 타입 지정을 위해 사용되는 `TypedDict`가 함수의 시그니처에 이미 정의된 키를 포함할 수 있습니다. 중복된 이름이 표준 매개변수라면 타입 체커에서 오류를 보고해야 합니다. 중복된 이름이 위치 전용(positional-only) 매개변수라면 오류를 생성해서는 안 됩니다.

```python
def foo(name, **kwargs: Unpack[Movie]) -> None: ... # WRONG! "name"은 항상 첫 번째 매개변수에 바인딩됩니다.
def foo(name, /, ** kwargs: Unpack[Movie]) -> None: ... # OK! "name"은 위치 전용 매개변수이므로 **kwargs에 "name" 키워드를 포함할 수 있습니다.
```

### 필수 및 비필수 키 (Required and non-required keys)
기본적으로 `TypedDict`의 모든 키는 필수(required)입니다. `total` 매개변수를 `False`로 설정하여 이 동작을 재정의할 수 있습니다. 또한, PEP 655는 특정 키가 필수인지 여부를 지정할 수 있는 `typing.Required` 및 `typing.NotRequired`와 같은 새로운 타입 한정자를 도입했습니다.

`TypedDict`를 사용하여 `** kwargs`를 타입 지정할 때, 모든 필수 및 비필수 키는 필수 및 비필수 함수 키워드 매개변수에 해당해야 합니다. 따라서, 호출자가 필수 키를 제공하지 않으면 타입 체커에서 오류를 보고해야 합니다.

```python
class Movie(TypedDict):
    title: str
    year: NotRequired[int] # year는 필수가 아닙니다.
```

### 할당 (Assignment)
` **kwargs: Unpack[Movie]`로 타입 지정된 함수와 다른 호출 가능한 타입의 할당은 호환되는 경우에만 타입 검사를 통과해야 합니다.

#### 소스와 대상 모두 `** kwargs`를 포함하는 경우
대상 함수와 소스 함수 모두 ` **kwargs: Unpack[TypedDict]` 매개변수를 가지고 있고, 대상 함수의 `TypedDict`가 소스 함수의 `TypedDict`에 할당 가능하며 나머지 매개변수가 호환될 때 할당이 가능합니다.

```python
class Animal(TypedDict):
    name: str
class Dog(Animal): # Dog는 Animal의 서브타입입니다.
    breed: str

def accept_animal(** kwargs: Unpack[Animal]): ...
def accept_dog( **kwargs: Unpack[Dog]): ...

accept_dog = accept_animal # OK! Dog 타입의 표현식이 Animal 타입의 변수에 할당될 수 있습니다. (공변성)
accept_animal = accept_dog # WRONG! Animal 타입의 표현식이 Dog 타입의 변수에 할당될 수 없습니다. (반공변성)
```

#### 소스는 `** kwargs`를 포함하고 대상은 포함하지 않는 경우
대상 호출 가능(callable)이 ` **kwargs`를 포함하지 않고, 소스 호출 가능이 `** kwargs: Unpack[TypedDict]`를 포함하며, 대상 함수의 키워드 인자가 소스 함수의 `TypedDict`의 해당 키에 할당 가능할 때 할당이 가능합니다. 또한, `NotRequired` 키는 선택적 함수 인자에, `Required` 키는 필수 함수 인자에 해당해야 합니다.

```python
class Example(TypedDict):
    animal: Animal
    string: str
    number: NotRequired[int]

def src(**kwargs: Unpack[Example]): ...
def dest(*, animal: Dog, string: str, number: int = ...): ...

dest = src # OK!
```
이 경우, 대상 함수의 매개변수는 키워드 전용이어야 합니다.

#### 소스가 언타입된 ` **kwargs`를 포함하는 경우
대상 호출 가능이 `** kwargs: Unpack[TypedDict]`를 포함하고, 소스 호출 가능이 언타입된 ` **kwargs`를 포함하는 경우:

```python
def src(** kwargs): ...
def dest( **kwargs: Unpack[Movie]): ...
dest = src # OK!
```

#### 소스가 전통적으로 타입 지정된 `** kwargs: T`를 포함하는 경우
대상 호출 가능이 ` **kwargs: Unpack[TypedDict]`를 포함하고, 소스 호출 가능이 전통적으로 타입 지정된 `** kwargs: T`를 포함하며, 대상 함수 `TypedDict`의 각 필드가 타입 `T`의 변수에 할당 가능할 때 할당이 가능합니다.

```python
class Vehicle: ...
class Car(Vehicle): ...
class Motorcycle(Vehicle): ...

class Vehicles(TypedDict):
    car: Car
    moto: Motorcycle

def dest( **kwargs: Unpack[Vehicles]): ...
def src(** kwargs: Vehicle): ...
dest = src # OK!
```

반대로, 대상 호출 가능이 언타입되거나 전통적으로 타입 지정된 ` **kwargs: T`를 포함하고, 소스 호출 가능이 `** kwargs: Unpack[TypedDict]`를 사용하여 타입 지정된 경우 오류가 발생해야 합니다. 이는 전통적으로 타입 지정된 ` **kwargs`가 키워드 이름을 확인하지 않기 때문입니다.

요약하자면, 함수 매개변수는 반공변(contravariantly)적으로 동작해야 하고, 함수 반환 타입은 공변(covariantly)적으로 동작해야 합니다.

### 함수 내에서 `kwargs`를 다른 함수로 전달
언팩된 `TypedDict`로 힌트된 `kwargs`는, 언팩된 `kwargs`가 전달되는 함수 또한 시그니처에 `** kwargs`를 가지고 있는 경우에만 다른 함수로 전달될 수 있습니다. 그렇지 않으면 타입 체커는 오류를 생성해야 합니다. 예를 들어, 다음 코드는 `takes_name` 함수가 예상치 못한 키워드 인자를 받으므로 런타임에 실패할 것입니다.

```python
class Animal(TypedDict):
    name: str
class Dog(Animal):
    breed: str

def takes_name(name: str): ...

dog: Dog = {"name": "Daisy", "breed": "Labrador"}
animal: Animal = dog # Dog 인스턴스가 Animal 타입 변수에 할당됨

def bar( **kwargs: Unpack[Animal]):
    takes_name(** kwargs) # WRONG! 'breed' 키워드가 takes_name으로 전달되어 런타임에 실패합니다.

bar( **animal)
```
이러한 문제의 해결책으로, 필요한 필드를 명시적으로 참조하여 인자로 사용하는 방법이 있습니다.
```python
def bar(** kwargs: Unpack[Animal]):
    name = kwargs["name"]
    takes_name(name)
```

### `TypedDict` 이외의 타입과 `Unpack` 사용
` **kwargs` 타입 지정의 맥락에서, `TypedDict` 이외의 타입과 `Unpack`을 사용하는 것은 허용되지 않아야 하며, 이러한 경우 타입 체커는 오류를 생성해야 합니다.

### `Unpack`의 변경 사항
`Unpack`의 `repr` (표현)은 새로운 사용 사례와의 호환성을 위해 단순히 `Unpack[T]`로 변경되어야 합니다.

## 의도된 사용법 (Intended Usage)
이 제안의 의도된 사용 사례는 동기(Motivation) 섹션에서 설명되었습니다. 요약하자면, 보다 정밀한 `** kwargs` 타입 지정은 처음에는 ` **kwargs`를 사용하기로 결정했지만, 이제는 타입 힌트를 통해 더 엄격한 계약을 사용할 만큼 성숙한 기존 코드베이스에 이점을 가져올 수 있습니다. 또한, `** kwargs` 사용은 동일한 키워드 인자 집합을 요구하는 여러 함수가 있을 때 코드 중복 및 복사-붙여넣기 양을 줄이는 데 도움이 될 수 있습니다. 마지막으로, 명확한 기본값이 없는 선택적 키워드 인자를 함수가 지원해야 할 때 ` **kwargs`가 유용합니다.

그러나 이 PEP에서 제안된 것처럼 `TypedDict`를 사용하여 `** kwargs`를 타입 지정하는 것보다 더 나은 도구가 있는 경우도 있습니다. 예를 들어, 모든 키워드 인자가 필수이거나 기본값을 가질 때 새로운 코드를 작성한다면, ` **kwargs`와 `TypedDict`를 사용하는 것보다 모든 것을 명시적으로 작성하는 것이 더 좋습니다.

```python
def foo(name: str, year: int): ... # 권장되는 방식.
def foo(** kwargs: Unpack[Movie]): ...
```

유사하게, 스텁(stub) 파일을 통해 서드파티 라이브러리를 타입 힌트할 때는 함수 시그니처를 명시적으로 선언하는 것이 더 좋습니다. 이는 기본 인자가 있는 함수를 타입 지정하는 유일한 방법입니다.

IDE 및 문서 페이지의 이점을 위해, 공개 API의 일부인 함수는 가능할 때마다 명시적인 키워드 매개변수를 선호해야 합니다.

## 참고 구현 (Reference Implementation)
`mypy` 타입 체커는 이미 `Unpack`을 사용한 보다 정밀한 ` **kwargs` 타입 지정을 지원합니다. `Pyright` 타입 체커 또한 이 기능에 대한 잠정적인 지원을 제공합니다.

## 거부된 아이디어 (Rejected Ideas)

### `TypedDict` 유니온 (TypedDict unions)
`TypedDict` 유니온으로 `** kwargs`를 타입 지정하는 것을 지원하는 것은 이 PEP 구현의 복잡성을 크게 증가시키며, 이를 정당화할 만한 설득력 있는 사용 사례가 없어 거부되었습니다. 대신, `TypedDict` 유니온을 기대하는 함수는 `overload`를 사용하여 구현할 수 있습니다.

```python
class Book(TypedDict):
    genre: str
    pages: int
TypedDictUnion = Movie | Book

def foo( **kwargs: Unpack[TypedDictUnion]) -> None: ... # WRONG! TypedDict 유니온을 ** kwargs 타입 지정에 사용하는 것은 지원되지 않습니다.

# 대신 다음과 같이 overload를 사용합니다.
from typing import overload

@overload
def foo( **kwargs: Unpack[Movie]): ...
@overload
def foo(** kwargs: Unpack[Book]): ...
```

### ` **kwargs` 어노테이션의 의미 변경
`** kwargs` 어노테이션의 의미를 변경하여 어노테이션이 개별 요소가 아닌 전체 ` **kwargs` 딕셔너리에 적용되도록 하는 아이디어가 논의되었으나, 마이그레이션 경로가 불분명하고 기존 생태계에 잘 확립된 의미를 변경하는 비용이 크다고 판단되어 거부되었습니다.

### 새로운 구문 도입
이전 버전의 PEP에서는 `** Movie`와 같은 이중 별표 구문을 도입하여 보다 정밀한 ` **kwargs` 타입 지정을 지원하는 아이디어가 있었습니다. 이는 문법 변경 및 새로운 dunder 추가를 필요로 하여 PEP의 범위를 크게 확장시켰으며, 새로운 구문 도입의 정당성이 충분히 강하지 않아 PEP의 진행을 막는 요인이 되었습니다. 따라서 이 아이디어는 폐기되었습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

---
** 중요 **: 이 PEP는 역사적인 문서입니다. 최신 사양 및 문서는 [Unpack for keyword arguments](https://docs.python.org/3/library/typing.html#typing.Unpack)를 참조하십시오. 정식 타입 지정 사양은 [typing specs site](https://peps.python.org/types/index.html)에서 유지 관리됩니다. 런타임 타입 동작은 CPython 문서에 설명되어 있습니다.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.