---
title: "[Draft] PEP 767 - Annotating Read-Only Attributes"
excerpt: "Python Enhancement Proposal 767: 'Annotating Read-Only Attributes'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/767/
toc: true
toc_sticky: true
date: 2025-09-27 13:49:33+0900
last_modified_at: 2025-09-27 13:49:33+0900
published: true
---
> **원문 링크:** [PEP 767 - Annotating Read-Only Attributes](https://peps.python.org/pep-0767/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 18-Nov-2024


---

# PEP 767: 읽기 전용 속성 어노테이션

## 초록 (Abstract)

PEP 705에서 `typing.ReadOnly` 타입 한정자(type qualifier)를 도입하여 `typing.TypedDict` 항목을 읽기 전용으로 정의할 수 있게 했습니다.

이 PEP는 클래스와 프로토콜(protocol) 속성 어노테이션(annotation)에서 `ReadOnly`를 사용하여 속성을 읽기 전용으로 표시하는 간결한 방법을 제안합니다.

PEP 705와 마찬가지로, 이 제안은 런타임(runtime)에 속성을 설정하는 방식에는 변경을 가하지 않습니다. 읽기 전용 속성의 올바른 사용은 오직 정적 타입 체커(static type checker)에 의해서만 강제됩니다.

## 동기 (Motivation)

Python 타입 시스템(type system)에는 속성을 읽기 전용으로 표시하는 단일하고 간결한 방법이 부족합니다. 이 기능은 C# 또는 TypeScript와 같은 다른 정적 및 점진적 타입 언어에 존재하며, 타입 체커 수준에서 속성을 재할당(reassign)하거나 삭제(delete)하는 기능을 제거하고, 구조적 서브타이핑(structural subtyping)을 위한 광범위한 인터페이스를 정의하는 데 유용합니다.

### 클래스 (Classes)

오늘날, 타입 체커들이 인정하는 읽기 전용 속성을 달성하는 세 가지 주요 방법이 있습니다.

1.  **속성에 `typing.Final` 어노테이션 달기:**
    ```python
    class Foo:
        number: Final[int]
        def __init__(self, number: int) -> None:
            self.number = number

    class Bar:
        def __init__(self, number: int) -> None:
            self.number: Final = number
    ```
    `dataclasses`에서 지원되며, `typing#1669` 이후 타입 체커에서도 지원됩니다. `Final`의 명세에 따라 하위 클래스에서 `number`를 재정의할 수 없습니다.

2.  **`@property`를 통한 읽기 전용 프록시(proxy):**
    ```python
    class Foo:
        _number: int
        def __init__(self, number: int) -> None:
            self._number = number

        @property
        def number(self) -> int:
            return self._number
    ```
    `number`를 재정의하는 것이 가능합니다. 타입 체커마다 특정 규칙에 대한 의견이 다릅니다. 런타임에는 읽기 전용이지만, 추가적인 보일러플레이트(boilerplate) 코드가 필요합니다. `dataclasses`에서 지원되지만, 합성(compose)이 잘 되지 않습니다. 합성된 `__init__` 및 `__repr__`은 `_number`를 매개변수/속성 이름으로 사용합니다.

3.  **`dataclasses.dataclass(frozen=True)` 또는 `typing.NamedTuple`과 같은 "고정(freezing)" 메커니즘 사용:**
    ```python
    @dataclass(frozen=True)
    class Foo:
        number: int # 암묵적으로 읽기 전용

    class Bar(NamedTuple):
        number: int # 암묵적으로 읽기 전용
    ```
    `@dataclass`의 경우 `number`를 재정의하는 것이 가능합니다. 런타임에는 읽기 전용입니다. 속성별 제어가 불가능하며, 이 메커니즘은 전체 클래스에 적용됩니다. 고정된 데이터클래스(frozen dataclasses)는 약간의 런타임 오버헤드를 발생시킵니다. `NamedTuple`은 여전히 튜플(tuple)이며, 대부분의 클래스는 인덱싱(indexing), 이터레이션(iteration) 또는 연결(concatenation)을 상속할 필요가 없습니다.

### 프로토콜 (Protocols)

`name: T`라는 멤버를 정의하는 `Protocol`을 가정해봅시다. 이는 두 가지 요구사항을 정의합니다.

*   `hasattr(obj, "name")`
*   `isinstance(obj.name, T)`

이러한 요구사항은 런타임에 다음 모두에 의해 충족될 수 있습니다.

*   속성 `name: T`를 가진 객체
*   클래스 변수 `name: ClassVar[T]`를 가진 클래스
*   위 클래스의 인스턴스
*   `@property def name(self) -> T`를 가진 객체
*   `functools.cached_property()`와 같은 사용자 정의 디스크립터(descriptor)를 가진 객체

현재 타입 명세(typing spec)는 (추상) 속성을 사용하여 이러한 프로토콜 멤버를 생성하는 것을 허용합니다.
```python
class HasName(Protocol):
    @property
    def name(self) -> T:
        ...
```
이 문법은 몇 가지 단점이 있습니다.
*   다소 장황합니다.
*   여기서 전달되는 품질이 속성의 읽기 전용 특성이라는 것이 명확하지 않습니다.
*   타입 한정자와 합성될 수 없습니다.
*   모든 타입 체커가 위의 다섯 가지 객체 모두가 이 구조적 타입에 할당될 수 있다는 것에 동의하지 않습니다.

## 근거 (Rationale)

이러한 문제들은 속성 수준의 타입 한정자로 해결될 수 있습니다. `ReadOnly`가 이 역할을 위해 선택되었는데, 그 이름이 의도를 잘 전달하고, 새로 제안된 변경 사항이 PEP 705에서 정의된 의미를 보완하기 때문입니다.

읽기 전용 인스턴스 속성을 가진 클래스는 이제 다음과 같이 정의할 수 있습니다.
```python
from typing import ReadOnly

class Member:
    def __init__(self, id: int) -> None:
        self.id: ReadOnly[int] = id
```

그리고 "프로토콜" 섹션에서 설명한 프로토콜은 이제 다음과 같습니다.
```python
from typing import Protocol, ReadOnly

class HasName(Protocol):
    name: ReadOnly[str]

def greet(obj: HasName, /) -> str:
    return f"Hello, {obj.name}!"
```
`Member`의 서브클래스(subclass)는 `.id`를 쓰기 가능한 속성이나 디스크립터로 재정의할 수 있습니다. 또한 타입을 좁힐(narrow) 수도 있습니다. `HasName` 프로토콜은 더 간결한 정의를 가지며, 속성의 쓰기 가능성(writability)에 구애받지 않습니다. `greet` 함수는 이제 다양한 호환 가능한 객체를 허용하면서, 입력에 대한 수정이 이루어지지 않음을 명시할 수 있습니다.

## 명세 (Specification)

`typing.ReadOnly` 타입 한정자는 클래스 및 프로토콜의 속성에 대한 유효한 어노테이션이 됩니다. 개별 속성을 읽기 전용으로 표시하기 위해 클래스 수준 또는 `__init__` 내에서 사용할 수 있습니다.

```python
class Book:
    id: ReadOnly[int]
    def __init__(self, id: int, name: str) -> None:
        self.id = id
        self.name: ReadOnly[str] = name
```
타입 체커는 `ReadOnly`로 어노테이션된 속성을 재할당하거나 삭제하려는 모든 시도에 대해 오류를 발생시켜야 합니다. 또한 `Final`로 어노테이션된 속성을 삭제하려는 모든 시도에 대해서도 오류를 발생시켜야 합니다 (이는 현재 명세되어 있지 않습니다).

`ReadOnly`가 현재 의미가 없는 다른 위치(예: 지역/전역 변수 또는 함수 매개변수)의 어노테이션에 사용되는 것은 이 PEP의 범위를 벗어납니다.

`Final`과 유사하게, `ReadOnly`는 타입 체커가 할당된 객체의 가변성(mutability)을 인식하는 방식에 영향을 미치지 않습니다. 불변(immutable) ABCs 및 컨테이너는 `ReadOnly`와 함께 사용하여 타입 체커 수준에서 그러한 값의 변형을 금지할 수 있습니다.

```python
from collections import abc
from dataclasses import dataclass
from typing import Protocol, ReadOnly

@dataclass
class Game:
    name: str

class HasGames[T: abc.Collection[Game]](Protocol):
    games: ReadOnly[T]

def add_games(shelf: HasGames[list[Game]]) -> None:
    shelf.games.append(Game("Half-Life")) # ok: list는 가변
    shelf.games[-1].name = "Black Mesa" # ok: "name"은 읽기 전용이 아님
    shelf.games = [] # error: "games"는 읽기 전용
    del shelf.games # error: "games"는 읽기 전용이며 삭제할 수 없음

def read_games(shelf: HasGames[abc.Sequence[Game]]) -> None:
    shelf.games.append(...) # error: "Sequence"는 "append" 속성이 없음
    shelf.games[0].name = "Blue Shift" # ok: "name"은 읽기 전용이 아님
    shelf.games = [] # error: "games"는 읽기 전용
```
고정된 데이터클래스(`frozen dataclasses`) 및 `NamedTuple`의 모든 인스턴스 속성은 암묵적으로 읽기 전용이어야 합니다. 타입 체커는 이러한 속성에 `ReadOnly`를 어노테이션하는 것이 중복임을 알릴 수 있지만, 오류로 간주되어서는 안 됩니다.

```python
from dataclasses import dataclass
from typing import NewType, ReadOnly

@dataclass(frozen=True)
class Point:
    x: int # 암묵적 읽기 전용
    y: ReadOnly[int] # ok, 중복

uint = NewType("uint", int)

@dataclass(frozen=True)
class UnsignedPoint(Point):
    x: ReadOnly[uint] # ok, 중복; 더 좁은 타입
    y: Final[uint] # 중복 아님, Final은 추가적인 제약 조건 부과; 더 좁은 타입
```

### 초기화 (Initialization)

읽기 전용 속성에 대한 할당은 속성을 선언하는 클래스 내에서만 발생할 수 있습니다. 속성이 몇 번 할당될 수 있는지에 대한 제한은 없습니다. 속성의 종류에 따라 다른 위치에서 할당될 수 있습니다.

#### 인스턴스 속성 (Instance Attributes)

인스턴스 속성에 대한 할당은 다음 컨텍스트에서 허용되어야 합니다.

*   `__init__`에서, 첫 번째 매개변수로 받은 인스턴스(대개 `self`)에.
*   `__new__`에서, 상위 클래스의 `__new__` 메서드 호출을 통해 생성된 선언 클래스의 인스턴스에.
*   클래스 본문 내 선언 시.

또한, 타입 체커는 다음 할당을 허용하도록 선택할 수 있습니다.

*   `__new__`에서, 인스턴스의 출처와 관계없이 선언 클래스의 인스턴스에. (이 선택은 인스턴스가 이미 초기화되었을 수 있으므로 견고함(soundness)을 구현의 단순성과 교환합니다.)
*   `@classmethod`에서, 클래스 또는 상위 클래스의 `__new__` 메서드 호출을 통해 생성된 선언 클래스의 인스턴스에.

```python
from collections import abc
from typing import ReadOnly

class Band:
    name: str
    songs: ReadOnly[list[str]]

    def __init__(self, name: str, songs: abc.Iterable[str] | None = None) -> None:
        self.name = name
        self.songs = []
        if songs is not None:
            self.songs = list(songs) # 여러 번 할당 가능

    def clear(self) -> None:
        self.songs = [] # error: 초기화 외부에서 읽기 전용 "songs"에 할당

band = Band(name="Bôa", songs=["Duvet"])
band.name = "Python" # ok: "name"은 읽기 전용이 아님
band.songs = [] # error: "songs"는 읽기 전용
band.songs.append("Twilight") # ok: list는 가변

class SubBand(Band):
    def __init__(self) -> None:
        self.songs = [] # error: 기본 클래스의 읽기 전용 속성에 할당할 수 없음

# 단순화된 불변 Fraction 클래스
class Fraction:
    numerator: ReadOnly[int]
    denominator: ReadOnly[int]

    def __new__(
        cls,
        numerator: str | int | float | Decimal | Rational = 0,
        denominator: int | Rational | None = None
    ) -> Self:
        self = super().__new__(cls)
        if denominator is None:
            if type(numerator) is int:
                self.numerator = numerator
                self.denominator = 1
            return self
        elif isinstance(numerator, Rational):
            ...
        else:
            ...

    @classmethod
    def from_float(cls, f: float, /) -> Self:
        self = super().__new__(cls)
        self.numerator, self.denominator = f.as_integer_ratio()
        return self
```

#### 클래스 속성 (Class Attributes)

읽기 전용 클래스 속성은 `ReadOnly`와 `ClassVar` 모두로 어노테이션된 속성입니다. 이러한 속성에 대한 할당은 다음 컨텍스트에서 허용되어야 합니다.

*   클래스 본문 내 선언 시.
*   `__init_subclass__`에서, 첫 번째 매개변수로 받은 클래스 객체(대개 `cls`)에.

```python
class URI:
    protocol: ReadOnly[ClassVar[str]] = ""

    def __init_subclass__(cls, protocol: str = "") -> None:
        cls.protocol = protocol

class File(URI, protocol="file"):
    ...
```
클래스 수준 선언에 초기화 값이 있는 경우, 인스턴스를 위한 플라이웨이트(flyweight) 기본값으로 사용될 수 있습니다.

```python
class Patient:
    number: ReadOnly[int] = 0

    def __init__(self, number: int | None = None) -> None:
        if number is not None:
            self.number = number
```
참고: 이 기능은 `__slots__`와 충돌합니다. 클래스 수준 값을 가진 속성은 슬롯(slots)에 포함될 수 없으며, 효과적으로 클래스 변수가 됩니다.

타입 체커는 인스턴스가 생성된 후 초기화되지 않은 상태로 남을 수 있는 읽기 전용 속성(스텁(stub), 프로토콜 또는 ABCs 제외)에 대해 경고하도록 선택할 수 있습니다.

```python
class Patient:
    id: ReadOnly[int] # error: 모든 코드 경로에서 "id"가 초기화되지 않음
    name: ReadOnly[str] # error: "name"이 전혀 초기화되지 않음
    def __init__(self) -> None:
        if random.random() > 0.5:
            self.id = 123

class HasName(Protocol):
    name: ReadOnly[str] # ok
```

### 서브타이핑 (Subtyping)

읽기 전용 속성을 재할당할 수 없기 때문에 공변적(covariant)입니다. 이는 몇 가지 서브타이핑 함의를 가집니다. PEP 705에서 빌려온 내용입니다.

읽기 전용 속성은 쓰기 가능한 속성, 디스크립터 또는 클래스 변수로 재선언될 수 있습니다.

```python
@dataclass
class HasTitle:
    title: ReadOnly[str]

@dataclass
class Game(HasTitle):
    title: str
    year: int

game = Game(title="DOOM", year=1993)
game.year = 1994
game.title = "DOOM II" # ok: 속성이 읽기 전용이 아님

class TitleProxy(HasTitle):
    @functools.cached_property
    def title(self) -> str:
        ...

class SharedTitle(HasTitle):
    title: ClassVar[str] = "Still Grey"
```
읽기 전용 속성이 재선언되지 않으면, 계속 읽기 전용으로 유지됩니다.
```python
class Game(HasTitle):
    year: int
    def __init__(self, title: str, year: int) -> None:
        super().__init__(title)
        self.title = title # error: 기본 클래스의 읽기 전용 속성에 할당할 수 없음
        self.year = year

game = Game(title="Robot Wants Kitty", year=2010)
game.title = "Robot Wants Puppy" # error: "title"은 읽기 전용
```
서브타입(subtype)은 읽기 전용 속성의 타입을 좁힐 수 있습니다.
```python
class GameCollection(Protocol):
    games: ReadOnly[abc.Collection[Game]]

@dataclass
class GameSeries(GameCollection):
    name: str
    games: ReadOnly[list[Game]] # ok: list[Game]은 Collection[Game]에 할당 가능
```
프로토콜 및 ABCs의 명목적(nominal) 서브클래스는 기본 클래스가 어떤 방식으로든 초기화하지 않는 한, 구현하기 위해 읽기 전용 속성을 재선언해야 합니다.
```python
class MyBase(abc.ABC):
    foo: ReadOnly[int]
    bar: ReadOnly[str] = "abc"
    baz: ReadOnly[float]
    def __init__(self, baz: float) -> None:
        self.baz = baz

    @abstractmethod
    def pprint(self) -> None:
        ...

@final
class MySubclass(MyBase):
    # error: MySubclass는 "foo"를 재정의하지 않음
    def pprint(self) -> None:
        print(self.foo, self.bar, self.baz)
```
프로토콜 속성 선언에서 `name: ReadOnly[T]`는 구조적 서브타입이 `.name` 접근을 지원해야 하며, 반환된 값이 `T`에 할당 가능함을 나타냅니다.
```python
class HasName(Protocol):
    name: ReadOnly[str]

class NamedAttr:
    name: str

class NamedProp:
    @property
    def name(self) -> str:
        ...

class NamedClassVar:
    name: ClassVar[str]

class NamedDescriptor:
    @cached_property
    def name(self) -> str:
        ...

# 다음 모두 올바름
has_name: HasName
has_name = NamedAttr()
has_name = NamedProp()
has_name = NamedClassVar
has_name = NamedClassVar()
has_name = NamedDescriptor()
```

### 다른 타입 한정자와의 상호작용 (Interaction with Other Type Qualifiers)

`ReadOnly`는 `ClassVar` 및 `Annotated`와 어떤 중첩 순서로든 사용될 수 있습니다.

```python
class Foo:
    foo: ClassVar[ReadOnly[str]] = "foo"
    bar: Annotated[ReadOnly[int], Gt(0)]

class Foo:
    foo: ReadOnly[ClassVar[str]] = "foo"
    bar: ReadOnly[Annotated[int, Gt(0)]]
```
이는 PEP 705에서 정의된 `ReadOnly`와 `typing.TypedDict`의 상호작용과 일치합니다.

속성은 `ReadOnly`와 `Final`로 동시에 어노테이션될 수 없습니다. 두 한정자는 의미가 다르며, `Final`이 일반적으로 더 제한적입니다. `Final`은 읽기 전용으로만 암시되는 속성의 어노테이션으로는 계속 허용됩니다. 또한 기본 클래스의 `ReadOnly` 속성을 재선언하는 데 사용될 수도 있습니다.

## 하위 호환성 (Backwards Compatibility)

이 PEP는 `ReadOnly`가 유효한 새로운 컨텍스트를 도입합니다. 해당 위치를 검사하는 프로그램은 이를 지원하기 위해 변경되어야 합니다. 이는 주로 타입 체커에 영향을 미칠 것으로 예상됩니다.

그러나 이전 버전의 Python에서 백포트(backported)된 `typing_extensions.ReadOnly`를 사용할 때는 주의가 필요합니다. 어노테이션을 검사하는 메커니즘이 `ReadOnly`를 만났을 때 잘못 동작할 수 있으며, 특히 `ClassVar`를 찾는 `@dataclass` 데코레이터는 `ReadOnly[ClassVar[...]]`를 인스턴스 속성으로 오인할 수 있습니다.

인트로스펙션(introspection) 문제를 피하려면 `ReadOnly[ClassVar[...]]` 대신 `ClassVar[ReadOnly[...]]`를 사용하세요.

## 보안 고려사항 (Security Implications)

이 PEP로 인해 발생하는 알려진 보안 문제는 없습니다.

## 교육 방법 (How to Teach This)

PEP 705의 지침에 따라 `typing` 모듈 문서에 제안된 변경 사항:

*   이 PEP를 다른 나열된 PEP에 추가합니다.
*   `typing.ReadOnly`를 이 PEP에 연결합니다.
*   `typing.ReadOnly`의 설명을 업데이트합니다.
    > 클래스의 속성 또는 `TypedDict`의 항목을 읽기 전용으로 표시하는 특별한 타입 구조입니다.

*   타입 한정자 섹션 아래에 `ReadOnly`에 대한 독립적인 항목을 추가합니다.
    > 클래스 속성 어노테이션의 `ReadOnly` 타입 한정자는 클래스의 속성을 읽을 수는 있지만, 재할당하거나 삭제할 수 없음을 나타냅니다. `TypedDict`에서의 사용은 `ReadOnly`를 참조하십시오.

## 거부된 아이디어 (Rejected Ideas)

### `@property`와 프로토콜의 상호작용 명확화 (Clarifying Interaction of @property and Protocols)

"프로토콜" 섹션에서는 프로토콜 내 속성의 해석에 있어 타입 체커 간의 불일치가 언급됩니다. 이 문제는 타입 명세를 수정하여 이러한 속성의 읽기 전용 특성을 구현하는 것이 무엇인지 명확히 함으로써 해결될 수 있었습니다.

이 PEP는 프로토콜에서 읽기 전용 속성을 정의하는 더 나은 대안으로 `ReadOnly`를 만들고, 이 목적으로 속성을 사용하는 것을 대체합니다.

### `__init__` 및 클래스 본문 내에서만 할당 (Assignment Only in `__init__` and Class Body)

이 PEP의 초기 버전에서는 읽기 전용 속성이 `__init__` 및 클래스 본문 내에서만 할당될 수 있다고 제안했습니다. 이후 논의를 통해 이 제한이 일반적으로 `__init__`을 정의하지 않는 불변 클래스(immutable classes) 내에서 `ReadOnly`의 유용성을 심각하게 제한할 것이라는 점이 밝혀졌습니다.

`fractions.Fraction`은 불변 클래스의 한 예로, 속성 초기화가 `__new__` 및 클래스 메서드 내에서 발생합니다. 그러나 `__init__`과 달리, `__new__` 및 클래스 메서드 내에서의 할당은 인스턴스가 이미 최종화된 인스턴스를 포함하여 임의의 위치에서 소스될 수 있으므로 잠재적으로 불건전(unsound)합니다.

이 타입 검사 기능이 읽기 전용 속성의 가장 중요한 사용처인 불변 클래스에 유용해야 한다고 생각합니다. 따라서 PEP는 초기화 섹션에 설명된 일련의 규칙에 따라 `__new__` 및 클래스 메서드에서 할당을 허용하도록 변경되었습니다.

## 미해결 문제 (Open Issues)

### 초기화 확장 (Extending Initialization)

`dataclasses.__post_init__()` 또는 `attrs`의 초기화 훅(hook)과 같은 메커니즘은 초기화 중에 호출되는 특별한 훅 세트를 제공하여 객체 생성을 보강합니다.

이 PEP에 정의된 현재 초기화 규칙은 이러한 메서드에서 읽기 전용 속성에 대한 할당을 허용하지 않습니다. 이러한 3rd-party 훅을 포함하면서 해당 속성의 읽기 전용 특성과 관련된 불변성을 유지하는 방식으로 규칙을 만족스럽게 만들 수 있는지 여부는 불분명합니다.

Python 타입 시스템은 `__new__` 및 `__init__`의 동작에 대해 길고 상세한 명세를 가지고 있습니다. 3rd-party 훅에서 동일한 수준의 세부 정보를 기대하는 것은 다소 비현실적입니다.

잠재적인 해결책은 타입 체커가 이와 관련하여 구성을 제공하여 최종 사용자가 초기화를 허용하려는 메서드 세트를 수동으로 지정하도록 요구하는 것입니다. 그러나 이는 사용자가 앞서 언급한 불변성을 실수로 또는 의도적으로 위반할 수 있습니다. 또한 상대적으로 틈새(niche) 기능에 대한 상당히 큰 요구 사항입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.