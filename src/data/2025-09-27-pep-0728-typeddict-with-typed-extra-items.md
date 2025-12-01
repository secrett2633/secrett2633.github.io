---
title: "[Accepted] PEP 728 - TypedDict with Typed Extra Items"
excerpt: "Python Enhancement Proposal 728: 'TypedDict with Typed Extra Items'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/728/
toc: true
toc_sticky: true
date: 2025-09-27 13:20:42+0900
last_modified_at: 2025-09-27 13:20:42+0900
published: true
---
> **원문 링크:** [PEP 728 - TypedDict with Typed Extra Items](https://peps.python.org/pep-0728/)
>
> **상태:** Accepted | **유형:** Standards Track | **작성일:** 12-Sep-2023

PEP 728 – TypedDict에 타입이 지정된 추가 항목

## 개요
이 PEP는 `TypedDict`에 추가 항목(extra items)의 타입을 지정하기 위한 두 가지 클래스 매개변수, `closed`와 `extra_items`를 추가합니다. 이는 '닫힌(closed)' `TypedDict` 타입을 정의하거나, `dict`에 나타날 수 있는 키의 부분 집합을 타입 지정하면서도 지정된 타입의 추가 항목을 허용해야 하는 요구사항을 해결합니다.

## 동기
`typing.TypedDict` 타입은 딕셔너리 내 각 알려진 항목(known item)의 값 타입을 주석 처리할 수 있습니다. 그러나 구조적 할당 가능성(structural assignability) 때문에 `TypedDict`는 해당 타입을 통해서는 보이지 않는 추가 항목을 가질 수 있습니다. 현재로서는 `TypedDict` 타입의 일관된 하위 타입(consistent subtypes)에 나타날 수 있는 항목의 타입을 제한할 방법이 없습니다.

### 추가 항목을 명시적으로 금지
`TypedDict`의 현재 동작은 타입에 추가 항목이 포함되지 않을 것으로 예상될 때 사용자가 `TypedDict` 타입을 정의하는 것을 방해합니다.

추가 항목이 존재할 가능성 때문에 타입 체커(type checker)는 `TypedDict`의 `.items()` 및 `.values()`에 대해 더 정확한 반환 타입을 추론할 수 없습니다. 이는 '닫힌' `TypedDict` 타입을 정의함으로써 해결될 수 있습니다.

이와 관련하여 또 다른 사용 사례는 `in` 검사를 통한 타입 좁히기(type narrowing)를 안전하게 활성화하는 것입니다.

```python
class Movie(TypedDict):
    name: str
    director: str

class Book(TypedDict):
    name: str
    author: str

def fun(entry: Movie | Book) -> None:
    if "author" in entry:
        reveal_type(entry) # Revealed type is still 'Movie | Book'
```
`Movie`에 할당 가능한 `dict`가 `author` 키를 갖는 것을 막을 수 없으며, 현재 사양에서는 타입 체커가 해당 타입을 좁히는 것이 정확하지 않을 것입니다.

### 특정 타입의 추가 항목 허용
API 인터페이스나 가능한 키의 부분 집합만 알려진 레거시 코드베이스를 지원하기 위해 특정 값 타입의 추가 항목을 명시적으로 지정하는 것이 유용할 것입니다.

그러나 `TypedDict`의 생성(construction)을 확인할 때 타입 지정 사양(typing spec)은 더 제한적이어서 사용자가 다음과 같이 하는 것을 방해합니다.

```python
class MovieBase(TypedDict):
    name: str

def foo(movie: MovieBase) -> None:
    # movie는 MovieBase를 통해서는 보이지 않는 추가 항목을 가질 수 있습니다.
    ...

movie: MovieBase = {"name": "Blade Runner", "year": 1982} # 허용되지 않음 (Not OK)
foo({"name": "Blade Runner", "year": 1982}) # 허용되지 않음 (Not OK)
```
`TypedDict`를 생성할 때는 이 제한이 적용되지만, 구조적 할당 가능성 때문에 `TypedDict`는 해당 타입을 통해 보이지 않는 추가 항목을 가질 수 있습니다. 예를 들어:

```python
class Movie(MovieBase):
    year: int

movie: Movie = {"name": "Blade Runner", "year": 1982}
foo(movie) # 허용됨 (OK)
```
`MovieBase`의 일부 일관된 하위 타입에서 추가 항목이 존재할 수 있음에도 불구하고, 타입 안전성을 깨지 않고 `in` 검사를 통해 추가 항목의 존재를 인정하고 접근하는 것은 불가능합니다.

```python
def bar(movie: MovieBase) -> None:
    if "year" in movie:
        reveal_type(movie["year"]) # 오류: TypedDict 'MovieBase'에는 'year' 키가 없습니다.
```
추가 항목을 허용하기 위한 몇 가지 해결책이 이미 구현되었지만, 어느 것도 이상적이지 않습니다. `mypy`의 경우 `--disable-error-code=typeddict-unknown-key`는 `TypedDict`의 알 수 없는 키에 대한 타입 검사 오류를 억제합니다. 이는 유연성을 위해 타입 안전성을 희생하는 것이며, `TypedDict` 타입이 특정 타입에 할당 가능한 값 타입을 갖는 추가 키를 예상한다는 것을 지정하는 방법을 제공하지 않습니다.

### `Unpack`을 위한 추가 키 지원
PEP 692는 `Unpack`과 함께 `TypedDict`를 사용하여 ` **kwargs`로 표현되는 개별 키워드 인수의 타입을 정확하게 주석 처리하는 방법을 추가했습니다. 그러나 `TypedDict`가 임의의 추가 항목을 허용하도록 정의될 수 없기 때문에, `TypedDict`가 정의될 때 알려지지 않은 추가 키워드 인수를 허용하는 것은 불가능합니다.

기존 코드베이스에서 `** kwargs`에 대한 PEP 692 이전의 타입 주석 사용을 고려할 때, `TypedDict`에서 추가 항목을 허용하고 타입 지정하는 것은 이전 타입 지정 동작이 `Unpack`과 함께 지원될 수 있도록 하는 데 가치가 있습니다.

### 이전 논의
이 PEP에서 도입된 새로운 기능은 타입 시스템의 여러 오랜 기능 요청을 해결할 것입니다. 이전 논의는 다음과 같습니다.

*   "final TypedDict"를 요청하는 Mypy 이슈 (2019). 논의는 `@final` 데코레이터에 초점을 맞추지만, 근본적인 기능 요청은 이 PEP에 의해 해결될 것입니다.
*   `TypedDict`가 임의의 추가 키를 포함할 수 있다고 말하는 방법을 요청하는 메일링 리스트 스레드 (2020).
*   PEP 692에 의해 도입된 `Unpack` 메커니즘의 확장 논의 (2023).
*   이전 초안의 PEP 705는 유사한 기능을 제안했습니다 (2023); 이 PEP를 더 간단하게 유지하기 위해 제거되었습니다.
*   "정확한(exact)" `TypedDict`에 대한 논의 (2024).

## 근거
`TypedDict`에서 타입 `str`의 추가 항목을 허용하는 타입을 원한다고 가정해 봅시다.

TypeScript의 인덱스 시그니처(Index Signatures)는 이를 허용합니다.

```typescript
type Foo = {
  a: string
  [key: string]: string
}
```
이 제안은 구문 변경 없이 유사한 기능을 지원하고, 기존 할당 가능성 규칙에 자연스러운 확장을 제공하는 것을 목표로 합니다.

우리는 `TypedDict`에 `extra_items`라는 클래스 매개변수를 추가할 것을 제안합니다. 이 매개변수는 타입 표현식(type expression)을 인수로 받습니다. 이 매개변수가 존재하면 추가 항목이 허용되며, 해당 값 타입은 타입 표현식 값에 할당 가능해야 합니다.

이것의 한 가지 적용은 추가 항목을 금지하는 것입니다. 우리는 `closed` 클래스 매개변수를 추가할 것을 제안하며, 이는 리터럴 `True` 또는 `False`만 인수로 받습니다. `closed`와 `extra_items`가 동시에 사용될 경우 런타임 오류가 발생해야 합니다.

인덱스 시그니처와 달리, 알려진 항목의 타입은 `extra_items` 인수에 할당 가능할 필요가 없습니다.

이 접근 방식에는 몇 가지 장점이 있습니다.

*   `extra_items`를 의사 항목(pseudo-item)으로 처리할 수 있는 타입 지정 사양에 정의된 할당 가능성 규칙을 기반으로 할 수 있습니다.
*   추가 항목의 타입을 지정하기 위해 문법 변경을 도입할 필요가 없습니다.
*   알려진 항목의 값 타입이 `extra_items`에 할당 가능할 것을 요구하지 않고도 추가 항목의 타입을 정확하게 지정할 수 있습니다.
*   `extra_items`와 `closed` 모두 옵트인(opt-in) 전용 기능이므로 하위 호환성(backwards compatibility)을 잃지 않습니다.

## 사양
이 사양은 원래 `TypedDict` 사양에 대한 변경 사항을 강조하기 위해 PEP 589와 병행하여 구성되었습니다.

`extra_items`가 지정되면, 추가 항목은 `extra_items` 인수에 일치하는 비필수(non-required) 항목으로 처리되며, 지원 및 지원되지 않는 연산을 결정할 때 해당 키가 허용됩니다.

### `extra_items` 클래스 매개변수
기본적으로 `extra_items`는 설정되지 않습니다. `extra_items`를 지정하는 `TypedDict` 타입의 경우, 생성 중에 알 수 없는 각 항목의 값 타입은 비필수이며 `extra_items` 인수에 할당 가능해야 합니다. 예를 들어:

```python
class Movie(TypedDict, extra_items=bool):
    name: str

a: Movie = {"name": "Blade Runner", "novel_adaptation": True} # OK
b: Movie = {
    "name": "Blade Runner",
    "year": 1982, # 허용되지 않음 (Not OK). 'int'는 'bool'에 할당 가능하지 않습니다.
}
```
여기서 `extra_items=bool`은 'name' 외의 항목이 `bool` 타입의 값을 가지며 비필수임을 지정합니다.

대체 인라인(inline) 구문도 지원됩니다.

```python
Movie = TypedDict("Movie", {"name": str}, extra_items=bool)
```
추가 항목 접근이 허용됩니다. 타입 체커는 `extra_items` 인수로부터 해당 값 타입을 추론해야 합니다.

```python
def f(movie: Movie) -> None:
    reveal_type(movie["name"]) # 추론된 타입은 'str'
    reveal_type(movie["novel_adaptation"]) # 추론된 타입은 'bool'
```
`extra_items`는 서브클래싱(subclassing)을 통해 상속됩니다.

```python
class MovieBase(TypedDict, extra_items=ReadOnly[int | None]):
    name: str

class Movie(MovieBase):
    year: int

a: Movie = {"name": "Blade Runner", "year": None} # 허용되지 않음 (Not OK). 'None'은 'int'와 호환되지 않습니다.
b: Movie = {
    "name": "Blade Runner",
    "year": 1982,
    "other_extra_key": None,
} # OK
```
여기서 `a`의 'year'는 `Movie`에 정의된 추가 키이며, 값 타입은 `int`입니다. `b`의 'other_extra_key'는 `MovieBase`에 정의된 `extra_items` 값에 할당 가능한 값 타입을 가져야 하는 또 다른 추가 키입니다.

### `closed` 클래스 매개변수
`extra_items`도 `closed=True`도 지정되지 않은 경우, `closed=False`로 간주됩니다. `TypedDict`는 기본 `TypedDict` 동작을 유지하기 위해 상속 또는 할당 가능성 검사 중에 값 타입 `ReadOnly[object]`의 비필수 추가 항목을 허용해야 합니다. `TypedDict` 객체 생성에 포함된 추가 키는 `TypedDict`의 타이핑 사양에서 언급된 바와 같이 여전히 포착되어야 합니다.

`closed=True`가 설정되면 추가 항목은 허용되지 않습니다. 이는 `extra_items=Never`와 동일합니다. 왜냐하면 `Never`에 할당 가능한 값 타입은 있을 수 없기 때문입니다. 동일한 `TypedDict` 정의에서 `closed`와 `extra_items` 매개변수를 함께 사용하는 것은 런타임 오류입니다.

`total`과 유사하게, `closed` 인수의 값으로는 리터럴 `True` 또는 `False`만 지원됩니다. 타입 체커는 리터럴이 아닌 모든 값을 거부해야 합니다.

`closed=False`를 명시적으로 전달하는 것은 기본 `TypedDict` 동작을 요청합니다. 이 경우 임의의 다른 키가 존재할 수 있고 하위 클래스가 임의의 항목을 추가할 수 있습니다. 상위 클래스가 `closed=True`이거나 `extra_items`를 설정한 경우 `closed=False`를 전달하면 타입 체커 오류가 발생합니다.

`closed`가 제공되지 않으면 동작은 상위 클래스에서 상속됩니다. 상위 클래스가 `TypedDict` 자체이거나 상위 클래스가 `closed=True` 또는 `extra_items` 매개변수를 가지고 있지 않으면, 이전 `TypedDict` 동작이 유지됩니다. 즉, 임의의 추가 항목이 허용됩니다. 상위 클래스가 `closed=True`이면 자식 클래스도 `closed`됩니다.

```python
class BaseMovie(TypedDict, closed=True):
    name: str

class MovieA(BaseMovie): # OK, 여전히 닫혀있음 (still closed)
    pass

class MovieB(BaseMovie, closed=True): # OK, 하지만 중복됨 (redundant)
    pass

class MovieC(BaseMovie, closed=False): # 타입 체커 오류 (Type checker error)
    pass
```
`closed=True`가 `extra_items=Never`와 동일하다는 결과로, `extra_items=Never`에 적용되는 동일한 규칙이 `closed=True`에도 적용됩니다. 둘 다 동일한 효과를 가지지만, `closed=True`가 `extra_items=Never`보다 선호됩니다.

`extra_items` 인수가 읽기 전용(read-only) 타입인 경우, 서브클래싱할 때 `closed=True`를 사용할 수 있습니다.

```python
class Movie(TypedDict, extra_items=ReadOnly[str]):
    pass

class MovieClosed(Movie, closed=True): # OK
    pass

class MovieNever(Movie, extra_items=Never): # OK, 하지만 'closed=True'가 선호됨
    pass
```
이것은 나중에 더 자세히 논의될 것입니다.

`closed`는 함수형 구문(functional syntax)에서도 지원됩니다.

```python
Movie = TypedDict("Movie", {"name": str}, closed=True)
```

### 전체성(Totality)과의 상호작용
`Required[]` 또는 `NotRequired[]`를 `extra_items`와 함께 사용하는 것은 오류입니다. `total=False`와 `total=True`는 `extra_items` 자체에 영향을 미치지 않습니다.

추가 항목은 `TypedDict`의 전체성(totality)과 관계없이 비필수(non-required)입니다. `NotRequired` 항목에 사용 가능한 연산은 추가 항목에도 사용 가능해야 합니다.

```python
class Movie(TypedDict, extra_items=int):
    name: str

def f(movie: Movie) -> None:
    del movie["name"] # 허용되지 않음 (Not OK). 'name'의 값 타입은 'Required[str]'입니다.
    del movie["year"] # OK. 'year'의 값 타입은 'NotRequired[int]'입니다.
```

### `Unpack`과의 상호작용
타입 검사 목적상, `extra items`가 있는 `Unpack[SomeTypedDict]`는 일반 매개변수에서의 동등한 것으로 처리되어야 하며, 함수 매개변수에 대한 기존 규칙이 여전히 적용됩니다.

```python
class MovieNoExtra(TypedDict):
    name: str

class MovieExtra(TypedDict, extra_items=int):
    name: str

def f( **kwargs: Unpack[MovieNoExtra]) -> None:
    ...

def g(** kwargs: Unpack[MovieExtra]) -> None:
    ...

# 다음과 동일해야 합니다:
def f(*, name: str) -> None:
    ...

def g(*, name: str, **kwargs: int) -> None:
    ...

f(name="No Country for Old Men", year=2007) # 허용되지 않음 (Not OK). 인식할 수 없는 항목
g(name="No Country for Old Men", year=2007) # OK
```

### 읽기 전용(Read-only) 항목과의 상호작용
`extra_items` 인수가 `ReadOnly[]` 타입 한정자(qualifier)로 주석 처리되면, `TypedDict`의 추가 항목은 읽기 전용 항목의 속성을 가집니다. 이는 읽기 전용 항목(Read-only Items)에 지정된 상속 규칙과 상호작용합니다.

특히, `TypedDict` 타입이 `extra_items`를 읽기 전용으로 지정하는 경우, `TypedDict` 타입의 하위 클래스는 `extra_items`를 재선언할 수 있습니다.

닫히지 않은 `TypedDict` 타입은 `ReadOnly[object]` 값 타입의 비필수 추가 항목을 암묵적으로 허용하므로, 해당 하위 클래스는 `extra_items` 인수를 더 구체적인 타입으로 재정의할 수 있습니다.

자세한 내용은 다음 섹션에서 논의됩니다.

### 상속
`extra_items`는 일반적인 키-값 타입 항목과 유사한 방식으로 상속됩니다. 다른 키와 마찬가지로, 상속 규칙과 읽기 전용 항목 상속 규칙이 적용됩니다.

`extra_items`가 이들과 어떻게 상호작용하는지 정의하기 위해 이러한 규칙을 재해석해야 합니다.

하위 클래스에서 부모 `TypedDict` 클래스의 필드 타입을 변경하는 것은 허용되지 않습니다.

첫째, 상위 클래스에서 `ReadOnly`로 선언되지 않는 한 하위 클래스에서 `extra_items`의 값을 변경하는 것은 허용되지 않습니다.

```python
class Parent(TypedDict, extra_items=int | None):
    pass

class Child(Parent, extra_items=int): # 허용되지 않음 (Not OK). 다른 TypedDict 항목과 마찬가지로 extra_items의 타입을 변경할 수 없습니다.
    pass
```

둘째, `extra_items=T`는 `TypedDict`에 허용되는 명명되지 않은 항목의 값 타입을 효과적으로 정의하고 이를 비필수(non-required)로 표시합니다. 따라서 위 제한은 하위 클래스에 추가된 모든 항목에 적용됩니다. 하위 클래스에 추가된 각 항목에 대해 다음 조건이 모두 적용되어야 합니다.

*   `extra_items`가 읽기 전용인 경우
    *   항목은 필수(required) 또는 비필수(non-required)일 수 있습니다.
    *   항목의 값 타입은 `T`에 할당 가능해야 합니다.

*   `extra_items`가 읽기 전용이 아닌 경우
    *   항목은 비필수(non-required)여야 합니다.
    *   항목의 값 타입은 `T`와 일치해야 합니다.

`extra_items`가 재정의되지 않으면 하위 클래스는 이를 그대로 상속합니다.

예시:

```python
class MovieBase(TypedDict, extra_items=int | None):
    name: str

class MovieRequiredYear(MovieBase): # 허용되지 않음 (Not OK). 필수 키 'year'는 'MovieBase'에 알려져 있지 않습니다.
    year: int | None

class MovieNotRequiredYear(MovieBase): # 허용되지 않음 (Not OK). 'int | None'은 'int'와 일치하지 않습니다.
    year: NotRequired[int]

class MovieWithYear(MovieBase): # OK
    year: NotRequired[int | None]

class BookBase(TypedDict, extra_items=ReadOnly[int | str]):
    title: str

class Book(BookBase, extra_items=str): # OK
    year: int # OK
```
상속 규칙의 중요한 부수 효과는 추가 항목을 허용하지 않는 `TypedDict` 타입을 정의할 수 있다는 것입니다.

```python
class MovieClosed(TypedDict, extra_items=Never):
    name: str
```
여기서 `extra_items`에 `Never` 값을 전달하는 것은 알려진 키 외에 `MovieFinal`에 다른 키가 있을 수 없음을 지정합니다. 잠재적인 일반적인 사용 때문에 선호되는 대안이 있습니다.

```python
class MovieClosed(TypedDict, closed=True):
    name: str
```
여기서는 `extra_items=Never`가 암묵적으로 가정됩니다.

### 할당 가능성 (Assignability)
`S`를 `TypedDict` 타입에 명시적으로 정의된 항목의 키 집합이라고 합시다. 만약 `extra_items=T`를 지정하면, `TypedDict` 타입은 다음 조건을 모두 충족하는 무한한 항목 집합을 갖는 것으로 간주됩니다.

*   `extra_items`가 읽기 전용인 경우:
    *   키의 값 타입은 `T`에 할당 가능합니다.
    *   키가 `S`에 없습니다.

*   `extra_items`가 읽기 전용이 아닌 경우:
    *   키는 비필수(non-required)입니다.
    *   키의 값 타입은 `T`와 일치합니다.
    *   키가 `S`에 없습니다.

타입 검사 목적상, 할당 가능성을 검사할 때 `extra_items`는 읽기 전용 항목 섹션에 정의된 규칙에 따라 비필수 의사 항목으로 간주되며, 다음과 같이 굵은 글씨로 새 규칙이 추가됩니다.

`TypedDict` 타입 B가 `TypedDict` 타입 A에 할당 가능하려면 B가 A에 구조적으로 할당 가능해야 합니다. 이는 다음 조건이 모두 충족될 때만 참입니다.

*   **B에서 동일한 이름의 키를 찾을 수 없는 경우, 'extra_items' 인수는 해당 키의 값 타입으로 간주됩니다.**
*   A의 각 항목에 대해 B는 해당 키를 가져야 합니다. 단, A의 항목이 읽기 전용이고 필수가 아니며 최상위 값 타입(`ReadOnly[NotRequired[object]]`)인 경우는 제외합니다.
*   A의 각 항목에 대해 B가 해당 키를 갖는 경우, B의 해당 값 타입은 A의 값 타입에 할당 가능해야 합니다.
*   A의 각 읽기 전용이 아닌 항목에 대해 해당 값 타입은 B의 해당 값 타입에 할당 가능해야 하며, B에서 해당 키는 읽기 전용이 아니어야 합니다.
*   A의 각 필수 키에 대해 B의 해당 키는 필수여야 합니다.
*   A의 각 비필수 키에 대해 A의 항목이 읽기 전용이 아닌 경우, B의 해당 키는 비필수여야 합니다.

다음 예시는 이러한 검사가 어떻게 작동하는지 보여줍니다.

`extra_items`는 할당 가능성 검사를 위한 추가 항목에 다양한 제한을 둡니다.

```python
class Movie(TypedDict, extra_items=int | None):
    name: str

class MovieDetails(TypedDict, extra_items=int | None):
    name: str
    year: NotRequired[int]

details: MovieDetails = {"name": "Kill Bill Vol. 1", "year": 2003}
movie: Movie = details # 허용되지 않음 (Not OK). 'int'는 'int | None'에 할당 가능하지만,
                      # 'int | None'은 'int'에 할당 가능하지 않습니다.

class MovieWithYear(TypedDict, extra_items=int | None):
    name: str
    year: int | None

details: MovieWithYear = {"name": "Kill Bill Vol. 1", "year": 2003}
movie: Movie = details # 허용되지 않음 (Not OK). 'year'는 'Movie'에서는 비필수이지만,
                      # 'MovieWithYear'에서는 필수입니다.
```
여기서 `MovieWithYear` (B)는 다음 규칙에 따라 `Movie` (A)에 할당 가능하지 않습니다.

*   A의 각 비필수 키에 대해 A의 항목이 읽기 전용이 아닌 경우, B의 해당 키는 비필수여야 합니다.

`TypedDict` 타입에 `extra_items`가 읽기 전용으로 지정된 경우, 항목이 `extra_items` 인수보다 더 좁은 타입(narrower type)을 가질 수 있습니다.

```python
class Movie(TypedDict, extra_items=ReadOnly[str | int]):
    name: str

class MovieDetails(TypedDict, extra_items=int):
    name: str
    year: NotRequired[int]

details: MovieDetails = {"name": "Kill Bill Vol. 2", "year": 2004}
movie: Movie = details # OK. 'int'는 'str | int'에 할당 가능합니다.
```
이것은 `year: ReadOnly[str | int]`가 `Movie`에 명시적으로 정의된 항목인 것처럼 동일하게 작동합니다.

`extra_items`는 의사 항목으로서 다른 항목과 동일한 규칙을 따르므로, 두 `TypedDict` 타입이 모두 `extra_items`를 지정할 때 이 검사는 자연스럽게 적용됩니다.

```python
class MovieExtraInt(TypedDict, extra_items=int):
    name: str

class MovieExtraStr(TypedDict, extra_items=str):
    name: str

extra_int: MovieExtraInt = {"name": "No Country for Old Men", "year": 2007}
extra_str: MovieExtraStr = {"name": "No Country for Old Men", "description": ""}

extra_int = extra_str # 허용되지 않음 (Not OK). 'str'은 추가 항목 타입 'int'에 할당 가능하지 않습니다.
extra_str = extra_int # 허용되지 않음 (Not OK). 'int'는 추가 항목 타입 'str'에 할당 가능하지 않습니다.
```
닫히지 않은 `TypedDict` 타입은 값 타입 `ReadOnly[object]`의 비필수 추가 키를 암묵적으로 허용합니다. 이 타입과 닫힌 `TypedDict` 타입 간의 할당 가능성 규칙을 적용하는 것은 허용됩니다.

```python
class MovieNotClosed(TypedDict):
    name: str

extra_int: MovieExtraInt = {"name": "No Country for Old Men", "year": 2007}
not_closed: MovieNotClosed = {"name": "No Country for Old Men"}

extra_int = not_closed # 허용되지 않음 (Not OK).
                      # 'MovieNotClosed'에 암묵적으로 있는 'extra_items=ReadOnly[object]'는
                      # 'extra_items=int'에 할당 가능하지 않습니다.
not_closed = extra_int # OK
```

### 생성자(Constructors)와의 상호작용
타입 `T`의 추가 항목을 허용하는 `TypedDict`는 클래스 객체를 호출하여 생성될 때 이 타입의 임의의 키워드 인수도 허용합니다.

```python
class NonClosedMovie(TypedDict):
    name: str

NonClosedMovie(name="No Country for Old Men") # OK
NonClosedMovie(name="No Country for Old Men", year=2007) # 허용되지 않음 (Not OK). 인식할 수 없는 항목

class ExtraMovie(TypedDict, extra_items=int):
    name: str

ExtraMovie(name="No Country for Old Men") # OK
ExtraMovie(name="No Country for Old Men", year=2007) # OK
ExtraMovie(
    name="No Country for Old Men",
    language="English",
) # 허용되지 않음 (Not OK). 추가 항목 'language'의 타입이 잘못되었습니다.

# 이것은 'extra_items=Never'를 의미하므로, 추가 키워드 인수는 오류를 발생시킬 것입니다.
class ClosedMovie(TypedDict, closed=True):
    name: str

ClosedMovie(name="No Country for Old Men") # OK
ClosedMovie(
    name="No Country for Old Men",
    year=2007,
) # 허용되지 않음 (Not OK). 추가 항목은 허용되지 않습니다.
```

### 지원 및 미지원 연산
타이핑 사양의 다음 문장은 여전히 유효합니다.

> 임의의 `str` 키(문자열 리터럴 또는 알려진 문자열 값을 가진 다른 표현식 대신)를 사용하는 연산은 일반적으로 거부되어야 합니다.

`NotRequired` 항목에 이미 적용되는 연산은 타이핑 사양의 동일한 근거에 따라 일반적으로 추가 항목에도 적용되어야 합니다.

> 정확한 타입 검사 규칙은 각 타입 체커가 결정합니다. 어떤 경우에는 관용적인 코드(idiomatic code)에 대해 오탐(false positive) 오류를 생성하는 대신 잠재적으로 안전하지 않은 연산이 허용될 수 있습니다.

임의의 `str` 키를 사용하는 인덱스 접근 및 할당을 포함한 일부 연산은 `TypedDict`가 `Mapping[str, VT]` 또는 `dict[str, VT]`에 할당 가능하기 때문에 허용될 수 있습니다. 다음 두 섹션에서 이에 대해 자세히 설명합니다.

### `Mapping[str, VT]`와의 상호작용
`TypedDict` 타입은 `TypedDict` 내 모든 항목의 값 타입이 `VT`에 할당 가능할 때 `Mapping[str, VT]` 형태의 타입에 할당 가능합니다. 이 규칙의 목적상, `extra_items=` 또는 `closed=`가 설정되지 않은 `TypedDict`는 `ReadOnly[object]` 타입의 값을 가진 항목을 갖는 것으로 간주됩니다. 이는 타이핑 사양의 현재 할당 가능성 규칙을 확장합니다.

예시:

```python
class MovieExtraStr(TypedDict, extra_items=str):
    name: str

extra_str: MovieExtraStr = {"name": "Blade Runner", "summary": ""}
str_mapping: Mapping[str, str] = extra_str # OK

class MovieExtraInt(TypedDict, extra_items=int):
    name: str

extra_int: MovieExtraInt = {"name": "Blade Runner", "year": 1982}
int_mapping: Mapping[str, int] = extra_int # 허용되지 않음 (Not OK). 'int | str'은 'int'에 할당 가능하지 않습니다.
int_str_mapping: Mapping[str, int | str] = extra_int # OK
```
타입 체커는 이러한 `TypedDict` 타입에서 `values()` 및 `items()`의 정확한 시그니처를 추론해야 합니다.

```python
def foo(movie: MovieExtraInt) -> None:
    reveal_type(movie.items()) # 추론된 타입은 'dict_items[str, str | int]'
    reveal_type(movie.values()) # 추론된 타입은 'dict_values[str, str | int]'
```
이 할당 가능성 규칙의 확장으로, `extra_items` 또는 `closed=True`가 지정되면 타입 체커는 임의의 `str` 키를 사용하는 인덱스 접근을 허용할 수 있습니다. 예를 들어:

```python
def bar(movie: MovieExtraInt, key: str) -> None:
    reveal_type(movie[key]) # 추론된 타입은 'str | int'
```
`TypedDict`에 대한 타입 좁히기 동작을 정의하는 것은 이 PEP의 범위를 벗어납니다. 이는 타입 체커가 임의의 `str` 키를 사용하는 인덱스 접근에 대해 더/덜 제한적이도록 유연성을 남깁니다. 예를 들어, 타입 체커는 명시적인 `'x' in d` 검사를 요구하여 더 많은 제한을 선택할 수 있습니다.

### `dict[str, VT]`와의 상호작용
닫힌 `TypedDict` 타입에 `extra_items`가 존재하면 구조적 하위 타입에 추가적인 필수 키가 금지되므로, 정적 분석(static analysis) 중에 `TypedDict` 타입과 그 구조적 하위 타입이 필수 키를 가질지 여부를 결정할 수 있습니다.

`TypedDict` 타입은 `dict[str, VT]`에 할당 가능하려면 `TypedDict` 타입의 모든 항목이 다음 조건을 충족해야 합니다.

*   항목의 값 타입이 `VT`와 일치합니다.
*   항목이 읽기 전용이 아닙니다.
*   항목이 필수가 아닙니다.

예시:

```python
class IntDict(TypedDict, extra_items=int):
    pass

class IntDictWithNum(IntDict):
    num: NotRequired[int]

def f(x: IntDict) -> None:
    v: dict[str, int] = x # OK
    v.clear() # OK

not_required_num_dict: IntDictWithNum = {"num": 1, "bar": 2}
regular_dict: dict[str, int] = not_required_num_dict # OK
f(not_required_num_dict) # OK
```
이 경우, 이전에는 `TypedDict`에서 사용할 수 없었던 메서드들이 `dict[str, VT]`와 일치하는 시그니처(`__setitem__(self, key: str, value: VT) -> None` 등)로 허용됩니다.

```python
not_required_num_dict.clear() # OK
reveal_type(not_required_num_dict.popitem()) # OK. 추론된 타입은 'tuple[str, int]'

def f(not_required_num_dict: IntDictWithNum, key: str):
    not_required_num_dict[key] = 42 # OK
    del not_required_num_dict[key] # OK
```
이전 섹션의 인덱스 접근에 대한 참고 사항은 여전히 적용됩니다.

`dict[str, VT]`는 `TypedDict` 타입에 할당 가능하지 않습니다. 왜냐하면 그러한 `dict`는 `dict`의 하위 타입일 수 있기 때문입니다.

```python
class CustomDict(dict[str, int]):
    pass

def f(might_not_be_a_builtin_dict: dict[str, int]):
    int_dict: IntDict = might_not_be_a_builtin_dict # 허용되지 않음 (Not OK)
    not_a_builtin_dict = CustomDict({"num": 1})
    f(not_a_builtin_dict)
```

### 런타임 동작
런타임에는 클래스 구문이든 함수형 구문이든 상관없이 동일한 `TypedDict` 정의에서 `closed`와 `extra_items` 인수를 모두 전달하는 것은 오류입니다. 단순화를 위해 런타임은 상속과 관련된 다른 잘못된 조합을 확인하지 않습니다.

내부 조사를 위해 `closed` 및 `extra_items` 인수는 결과 `TypedDict` 객체에 두 개의 새로운 속성 `__closed__` 및 `__extra_items__`로 매핑됩니다. 이 속성들은 상위 클래스를 고려하지 않고 `TypedDict` 생성자에 전달된 내용을 정확히 반영합니다.

`closed`가 전달되지 않으면 `__closed__`의 값은 `None`입니다. `extra_items`가 전달되지 않으면 `__extra_items__`의 값은 새로운 센티넬(sentinel) 객체 `typing.NoExtraItems`입니다. (`extra_items=None`은 모든 추가 항목이 `None`이어야 함을 나타내는 유효한 정의이므로 `None`일 수 없습니다.)

## 교육 방법 (How to Teach This)
이 PEP에서 도입된 새로운 기능은 `TypedDict`에 적용되는 상속 개념과 함께 교육될 수 있습니다. 가능한 개요는 다음과 같습니다.

*   `TypedDict`의 기본 사항: 고정된 키 집합과 값 타입을 가진 `dict`.
*   `NotRequired`, `Required`, `total=False`: 누락될 수 있는 키.
*   `ReadOnly`: 수정할 수 없는 키.
*   상속: 하위 클래스는 새로운 키를 추가할 수 있습니다. 결과적으로, `TypedDict` 타입의 값은 런타임에 타입에 지정되지 않은 추가 키를 포함할 수 있습니다.
*   `closed=True`: 추가 키를 허용하지 않고 상속을 제한합니다.
*   `extra_items=VT`: 지정된 값 타입을 가진 추가 키를 허용합니다.

'닫힌(closed)' `TypedDict`의 개념은 관련 개념에 대한 문서에서도 상호 참조되어야 합니다. 예를 들어, `in` 연산자를 사용하는 타입 좁히기는 '닫힌' `TypedDict` 타입에서 다르게, 아마도 더 직관적으로 작동합니다. 또한, 키워드 인수에 `Unpack`이 사용될 때, '닫힌' `TypedDict`는 허용되는 키워드 인수를 제한하는 데 유용할 수 있습니다.

## 하위 호환성
`extra_items`는 옵트인(opt-in) 기능이므로, 기존 코드베이스는 이 변경으로 인해 작동이 중단되지 않습니다.

`TD = TypedDict("TD", foo=str, bar=int)`와 같이 사용할 때 `closed` 및 `extra_items`가 키워드 인수로 다른 키와 충돌하지 않는다는 점에 유의하십시오. 이 구문은 Python 3.13에서 이미 제거되었기 때문입니다.

이는 타입 검사 기능이므로, 타입 체커가 지원하는 한 이전 버전에서도 사용할 수 있습니다.

## 거부된 아이디어

### `closed` 클래스 매개변수 대신 `@final` 사용
이것은 여기서 논의되었습니다.

Eric Traut의 관련 코멘트를 인용하자면:

> `@final` 클래스 데코레이터는 클래스가 서브클래싱될 수 없음을 나타냅니다. 이는 명목 타입(nominal types)을 정의하는 클래스에 적합합니다. 그러나 `TypedDict`는 `Protocol`과 유사한 구조적 타입(structural type)입니다. 이는 이름은 다르지만 필드 정의가 동일한 두 `TypedDict` 클래스가 동일한 타입임을 의미합니다. 타입 일관성을 결정하는 데 그 이름과 계층 구조는 중요하지 않습니다. 이러한 이유로, `@final`은 `TypedDict` 타입 일관성 규칙에 영향을 미치지 않으며, 항목이나 값의 동작을 변경해서도 안 됩니다.

### `closed` 클래스 매개변수와 함께 특별한 `__extra_items__` 키 사용
이 제안의 이전 개정판에서는 `__extra_items__`의 값 타입을 활용하여 다음과 같이 허용되는 추가 항목의 타입을 지정하는 접근 방식을 논의했습니다.

```python
class IntDict(TypedDict, closed=True):
    __extra_items__: int
```
여기서 `closed=True`는 키 충돌을 피하기 위해 `__extra_items__`가 특별하게 처리되도록 요구되었습니다.

일부 커뮤니티 구성원은 구문의 우아함에 대해 우려를 표했습니다. 실질적으로, 일반 키와의 키 충돌은 해결책으로 완화될 수 있지만, 예약된 키를 사용하는 것이 이 제안의 핵심이기 때문에 우려 사항을 해결할 방법이 제한적이었습니다.

### 키를 지정하는 새로운 구문 지원
문자열 키를 지정할 수 있는 새로운 구문을 도입함으로써, `TypedDict` 타입을 정의하는 함수형 구문을 더 이상 사용하지 않게 하고, 추가 항목을 타입 지정하기 위해 특별한 키를 예약하기로 결정한다면 키 충돌 문제를 해결할 수 있었습니다.

예시:

```python
class Foo(TypedDict):
    name: str  # 일반 항목
    _: bool    # 추가 항목의 타입
    __items__ = {
        "_": int,           # 리터럴 "_"을 키로
        "class": str,       # 키워드를 키로
        "tricky.name?": float, # 임의의 str 키
    }
```
이것은 Jukka가 여기에 제안했습니다. `_` 키는 새로운 이름을 발명할 필요가 없고 `match` 문과 유사하기 때문에 선택되었습니다.

이것은 `TypedDict` 타입을 정의하는 함수형 구문을 완전히 더 이상 사용하지 않게 할 수 있지만, 몇 가지 단점이 있습니다. 예를 들어:

*   `extra_items=bool`과 같은 클래스 인수를 추가하는 것에 비해 `_: bool`이 `TypedDict`를 특별하게 만든다는 것이 독자에게 덜 명확합니다.
*   `_: bool` 키를 사용하는 기존 `TypedDict`와 하위 호환성이 없습니다. 이러한 사용자들이 문제를 해결할 방법은 있지만, Python (또는 `typing-extensions`)을 업그레이드하면 여전히 문제가 됩니다.
*   타입이 주석 컨텍스트(annotation context)에 나타나지 않으므로, 이들의 평가가 지연되지 않습니다.

### 타입을 지정하지 않고 추가 항목 허용
`extra=True`는 원래 `total=True`가 작동하는 방식처럼 타입과 관계없이 추가 항목을 허용하는 `TypedDict`를 정의하기 위해 제안되었습니다.

```python
class ExtraDict(TypedDict, extra=True):
    pass
```
이는 추가 항목의 타입을 지정하는 방법을 제공하지 않았기 때문에, 타입 체커는 추가 항목의 타입을 `Any`로 가정해야 했으며, 이는 타입 안전성을 손상시킵니다. 또한, `TypedDict`의 현재 동작은 구조적 할당 가능성 때문에 런타임에 타입이 지정되지 않은 추가 항목이 존재하도록 이미 허용하고 있습니다. `closed=True`는 현재 제안에서 유사한 역할을 합니다.

### 교집합(Intersection)으로 추가 항목 지원
Python의 타입 시스템에서 교집합을 지원하는 것은 많은 신중한 고려가 필요하며, 합리적인 설계에 대한 커뮤니티의 합의에 도달하는 데 오랜 시간이 걸릴 수 있습니다.

이상적으로, `TypedDict`의 추가 항목은 교집합 작업에 의해 차단되어서는 안 되며, 교집합을 통해 지원될 필요도 없습니다.

더욱이, `Mapping[...]`과 `TypedDict` 사이의 교집합은 제안된 `extra_items` 특수 항목이 있는 `TypedDict` 타입과 동일하지 않습니다. 왜냐하면 `TypedDict`의 모든 알려진 항목의 값 타입이 `Mapping[...]`의 값 타입과의 is-subtype-of 관계를 충족해야 하기 때문입니다.

### 알려진 항목과 `extra_items`의 타입 호환성 요구
`extra_items`는 `TypedDict` 타입에 알려지지 않은 키의 값 타입을 제한합니다. 따라서 알려진 항목의 값 타입이 반드시 `extra_items`에 할당 가능하지 않으며, `extra_items`가 반드시 모든 알려진 항목의 값 타입에 할당 가능하지도 않습니다.

이것은 모든 속성의 타입이 문자열 인덱스(string index)의 타입과 일치해야 하는 TypeScript의 인덱스 시그니처 구문과 다릅니다. 예를 들어:

```typescript
interface MovieWithExtraNumber {
  name: string // 'string' 타입의 속성 'name'은 'number' 인덱스 타입에 할당 가능하지 않습니다.
  [index: string]: number
}

interface MovieWithExtraNumberOrString {
  name: string // OK
  [index: string]: number | string
}
```
이 제한은 임의의 키를 사용하는 안전한 인덱스 접근을 허용하지만, TypeScript의 이슈 트래커에서 논의된 사용성 제한이 따릅니다. 제안된 사항은 `MovieWithExtraNumber`와 같은 타입을 정의하기 위해 정의된 키를 인덱스 시그니처에서 제외하도록 허용하는 것이었습니다. 이는 아마도 차집합 타입(subtraction types)을 포함하며, 이는 이 PEP의 범위를 벗어납니다.

## 참조 구현
이 기능은 `pyright 1.1.386`에서 지원되며, 이전 개정판은 `pyanalyze 0.12.0`에서 지원됩니다.

또한 `typing-extensions 4.13.0`에서도 지원됩니다.

## 감사
이 PEP를 후원하고 검토 피드백을 제공해주신 Jelle Zijlstra, 이 PEP가 기반으로 한 원래 디자인을 제안해주신 Eric Traut, 그리고 PEP 705의 저자로서 그들의 관점을 제공해주신 Alice Purcell에게 감사드립니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.