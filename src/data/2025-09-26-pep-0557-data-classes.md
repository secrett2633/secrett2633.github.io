---
title: "[Final] PEP 557 - Data Classes"
excerpt: "Python Enhancement Proposal 557: 'Data Classes'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/557/
toc: true
toc_sticky: true
date: 2025-09-26 23:42:21+0900
last_modified_at: 2025-09-26 23:42:21+0900
published: true
---
> **원문 링크:** [PEP 557 - Data Classes](https://peps.python.org/pep-0557/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 02-Jun-2017

PEP 557 – Data Classes (데이터 클래스) 번역 및 요약

## 개요
PEP 557은 Python 3.7부터 표준 라이브러리에 추가된 `dataclasses` 모듈을 설명하는 문서입니다. 이 PEP는 주로 데이터를 저장하는 데 사용되는 클래스를 더 쉽고 간결하게 작성할 수 있도록 돕는 `Data Classes`의 개념과 구현을 소개합니다. `Data Classes`는 `namedtuple`의 가변 버전이자 기본값을 지원하는 형태로 이해할 수 있으며, 일반적인 클래스 정의 문법을 사용하므로 상속, 메타클래스, docstring, 사용자 정의 메서드 등 기존 Python 클래스의 모든 기능을 활용할 수 있습니다.

`@dataclass` 데코레이터는 PEP 526에 정의된 변수 어노테이션(type annotation)이 있는 클래스 정의 내의 변수(이 문서에서는 "필드"라고 함)를 검사합니다. 이 필드들을 기반으로 데코레이터는 인스턴스 초기화, `repr` 표현, 비교 메서드 등 다양한 메서드 정의를 자동으로 생성하여 클래스에 추가합니다.

**예시:**
```python
@dataclass
class InventoryItem:
    '''재고 품목을 추적하는 클래스입니다.'''
    name: str
    unit_price: float
    quantity_on_hand: int = 0

    def total_cost(self) -> float:
        return self.unit_price * self.quantity_on_hand
```

위 `InventoryItem` 클래스에 `@dataclass` 데코레이터가 추가하면 다음과 같은 메서드가 자동으로 생성됩니다:
- `__init__`: 인스턴스 초기화 메서드
- `__repr__`: 객체의 공식적인 문자열 표현을 반환하는 메서드
- `__eq__`, `__ne__`, `__lt__`, `__le__`, `__gt__`, `__ge__`: 비교 메서드들

`Data Classes`는 이러한 boilerplate 코드를 직접 작성하고 관리하는 수고를 덜어줍니다.

## 도입 배경 (Rationale)
값을 저장하고 속성으로 접근하는 데 주로 사용되는 클래스를 정의하려는 시도는 많았습니다. 대표적인 예시로는 `collections.namedtuple`, `typing.NamedTuple`, 그리고 인기 있는 `attrs` 프로젝트 등이 있습니다.

PEP 526을 통해 Python에 클래스 멤버의 타입을 간결하게 지정하는 방법이 추가되었고, 이 PEP는 해당 문법을 활용하여 `Data Classes`를 간단하고 자연스럽게 사용할 수 있도록 합니다. `Data Classes`는 베이스 클래스나 메타클래스를 사용하지 않으므로, 사용자는 `Data Classes`의 간섭 없이 상속과 메타클래스를 자유롭게 사용할 수 있습니다. 데코레이트된 클래스는 "일반적인" Python 클래스입니다.

`Data Classes`의 주요 설계 목표 중 하나는 정적 타입 검사기(static type checkers)를 지원하는 것입니다. PEP 526 문법의 활용과 `fields()` 함수 및 `@dataclass` 데코레이터의 설계가 이에 해당합니다. 위에 언급된 일부 라이브러리는 동적인 특성 때문에 정적 타입 검사기와 함께 사용하기 어려울 수 있습니다.

`Data Classes`는 기존 라이브러리를 완전히 대체하기 위한 것이 아닙니다. 하지만 표준 라이브러리에 포함됨으로써 많은 단순한 사용 사례에서 `Data Classes`를 활용할 수 있게 될 것입니다. 기존 라이브러리들은 각기 다른 기능 세트를 가지고 있으며, 계속해서 존재하고 발전할 것입니다.

`Data Classes` 사용이 적절하지 않은 경우:
- 튜플(tuple) 또는 딕셔너리(dict)와의 API 호환성이 필요한 경우.
- PEP 484 및 526에서 제공하는 것 이상의 타입 유효성 검사 또는 값 유효성 검사/변환이 필요한 경우.

## 명세 (Specification)
이 PEP에서 설명하는 모든 기능은 `dataclasses`라는 모듈에 포함됩니다.

`@dataclass` 데코레이터는 클래스를 검사하여 필드를 찾습니다. 필드는 `__annotations__`에 식별된 모든 변수, 즉 타입 어노테이션(type annotation)이 있는 변수를 의미합니다. `__annotations__`는 클래스 선언 순서대로 정렬된 매핑(ordered mapping)임을 보장하며, 생성되는 모든 메서드에서 필드의 순서는 클래스에 나타나는 순서를 따릅니다.

`@dataclass` 데코레이터는 다양한 "dunder" 메서드를 클래스에 추가합니다. 이미 클래스에 추가될 메서드 중 하나라도 존재하면 `TypeError`가 발생합니다. 데코레이터는 새로운 클래스를 생성하지 않고, 주어진 클래스 자체를 반환합니다.

`@dataclass`는 일반적으로 매개변수나 괄호 없이 사용되지만, 다음과 같은 논리적 시그니처를 지원합니다:
```python
def dataclass(*, init=True, repr=True, eq=True, order=False, unsafe_hash=False, frozen=False)
```

매개변수는 다음과 같습니다:
- `init` (기본값 `True`): `__init__` 메서드를 생성할지 여부를 결정합니다.
- `repr` (기본값 `True`): `__repr__` 메서드를 생성할지 여부를 결정합니다. 생성된 `repr` 문자열은 클래스 이름과 각 필드의 이름 및 `repr` 값을 포함합니다.
- `eq` (기본값 `True`): `__eq__` 메서드를 생성할지 여부를 결정합니다. 필드의 튜플처럼 클래스를 비교합니다.
- `order` (기본값 `False`): `True`인 경우 `__lt__`, `__le__`, `__gt__`, `__ge__` 메서드를 생성합니다. 이 메서드들은 필드의 튜플처럼 클래스를 순서대로 비교합니다. `order`가 `True`이고 `eq`가 `False`이면 `ValueError`가 발생합니다.
- `unsafe_hash` (기본값 `False`): `__hash__` 메서드가 생성되는 방식을 제어합니다. `eq`와 `frozen` 설정에 따라 `__hash__`가 생성됩니다. 일반적으로 `eq=True`이고 `frozen=True`일 때 `__hash__`가 생성되며, `eq=True`이고 `frozen=False`일 때 `__hash__`는 `None`으로 설정되어 해시 불가능(unhashable)하게 만듭니다. `unsafe_hash=True`를 사용하면 강제로 `__hash__`를 생성할 수 있지만, 이는 특별한 경우에만 권장됩니다.
- `frozen` (기본값 `False`): `True`인 경우 필드에 값을 할당할 때 예외를 발생시켜 읽기 전용(immutable) 인스턴스를 에뮬레이션합니다. `__setattr__` 또는 `__delattr__`가 클래스에 정의되어 있으면 `ValueError`가 발생합니다.

### 필드의 기본값
필드는 일반 Python 문법을 사용하여 선택적으로 기본값을 지정할 수 있습니다:
```python
@dataclass
class C:
    a: int        # 'a'는 기본값이 없음
    b: int = 0    # 'b'에 기본값 0 할당
```
기본값이 없는 필드 뒤에 기본값이 있는 필드가 오면 `TypeError`가 발생합니다.

### `field()` 함수
더 복잡한 필드 정보를 지정해야 하는 경우, 기본 필드 값을 `dataclasses.field()` 함수 호출로 대체할 수 있습니다. `field()`의 시그니처는 다음과 같습니다:
```python
def field(*, default=MISSING, default_factory=MISSING, repr=True, hash=None, init=True, compare=True, metadata=None)
```
- `default`: 필드의 기본값입니다.
- `default_factory`: 기본값이 필요할 때 호출될 인자 없는 콜러블(callable)입니다. 가변 기본값을 지정하는 데 사용됩니다. `default`와 `default_factory`를 동시에 지정하는 것은 에러입니다.
- `init`: `True`인 경우, 이 필드는 생성된 `__init__` 메서드의 매개변수에 포함됩니다.
- `repr`: `True`인 경우, 이 필드는 생성된 `__repr__` 메서드가 반환하는 문자열에 포함됩니다.
- `compare`: `True`인 경우, 이 필드는 생성된 비교 메서드(`__eq__`, `__gt__` 등)에 포함됩니다.
- `hash`: `bool` 또는 `None`입니다. `True`인 경우, 이 필드는 생성된 `__hash__` 메서드에 포함됩니다. `None`인 경우 `compare` 값에 따라 결정됩니다.
- `metadata`: 매핑(mapping) 또는 `None`입니다. `Data Classes` 자체에서는 사용되지 않으며, 서드파티 확장을 위한 메커니즘으로 제공됩니다.

### `Field` 객체
`Field` 객체는 각 정의된 필드를 설명하며, `fields()` 모듈 수준 메서드에 의해 반환됩니다. `Field` 객체의 속성으로는 `name`, `type`, `default`, `default_factory`, `init`, `repr`, `hash`, `compare`, `metadata` 등이 있습니다.

### `__post_init__` 처리
생성된 `__init__` 코드는 클래스에 `__post_init__` 메서드가 정의되어 있으면 이를 호출합니다. 이는 `self.__post_init__()` 형태로 호출됩니다. `__init__` 메서드가 생성되지 않으면 `__post_init__`도 자동으로 호출되지 않습니다. 이 메서드는 다른 필드에 의존하는 필드 값을 초기화하는 등의 용도로 사용될 수 있습니다.

```python
@dataclass
class C:
    a: float
    b: float
    c: float = field(init=False)

    def __post_init__(self):
        self.c = self.a + self.b
```

### 클래스 변수 (Class variables)
`dataclass` 데코레이터는 필드가 `PEP 526`에 정의된 클래스 변수인지 여부를 `typing.ClassVar` 타입 어노테이션을 통해 확인합니다. `ClassVar`인 필드는 `Data Class` 메커니즘에 의해 필드로 간주되지 않고 무시됩니다.

### `Init-only` 변수
`dataclass`가 타입 어노테이션을 검사하는 또 다른 경우는 필드가 `init-only` 변수인지 확인하는 것입니다. `dataclasses.InitVar` 타입의 필드는 `init-only` 필드로 간주됩니다. 이는 실제 필드가 아니므로 `fields()` 함수에 의해 반환되지 않습니다. `Init-only` 필드는 생성된 `__init__` 메서드의 매개변수로 추가되며, 선택적인 `__post_init__` 메서드에 전달됩니다.

```python
@dataclass
class C:
    i: int
    j: int = None
    database: InitVar[DatabaseType] = None # Init-only 변수

    def __post_init__(self, database):
        if self.j is None and database is not None:
            self.j = database.lookup('j')

c = C(10, database=my_database)
```

### 불변 인스턴스 (Frozen instances)
`@dataclass` 데코레이터에 `frozen=True`를 전달하면 불변성(immutability)을 에뮬레이션할 수 있습니다. 이 경우 `Data Classes`는 `__setattr__` 및 `__delattr__` 메서드를 클래스에 추가하여 호출 시 `FrozenInstanceError`를 발생시킵니다.

### 상속 (Inheritance)
`@dataclass` 데코레이터는 클래스의 모든 베이스 클래스를 역 MRO(Method Resolution Order) 순서로 탐색하여, 발견된 각 `Data Class`의 필드를 정렬된 필드 매핑에 추가합니다. 베이스 클래스의 필드가 모두 추가된 후, 현재 클래스의 필드를 추가합니다. 파생 클래스는 베이스 클래스를 오버라이드합니다.

```python
@dataclass
class Base:
    x: Any = 15.0
    y: int = 0

@dataclass
class C(Base):
    z: int = 10
    x: int = 15 # Base의 x를 오버라이드

# 필드 순서는 x, y, z 이며, x의 최종 타입은 int가 됩니다.
```

### 기본 팩토리 함수 (Default factory functions)
필드가 `default_factory`를 지정하면, 해당 필드에 기본값이 필요할 때 인자 없이 호출됩니다. 예를 들어, 새 리스트 인스턴스를 생성하려면 `l: list = field(default_factory=list)`와 같이 사용합니다.

### 가변 기본값 (Mutable default values)
Python은 기본 멤버 변수 값을 클래스 속성에 저장하기 때문에, 클래스 인스턴스들이 동일한 가변 객체를 공유하는 문제가 발생할 수 있습니다. `Data Classes`는 이러한 문제를 방지하기 위해 `list`, `dict`, `set` 타입의 기본 매개변수를 감지하면 `TypeError`를 발생시킵니다.

가변 기본값을 피하는 올바른 방법은 `default_factory`를 사용하는 것입니다:
```python
@dataclass
class D:
    x: list = field(default_factory=list)
# assert D().x is not D().x
```

### 모듈 수준 헬퍼 함수 (Module level helper functions)
`dataclasses` 모듈은 다음 헬퍼 함수들을 제공합니다:
- `fields(class_or_instance)`: `Data Class` 또는 `Data Class` 인스턴스의 필드를 정의하는 `Field` 객체 튜플을 반환합니다. `ClassVar` 또는 `InitVar`와 같은 의사(pseudo) 필드는 반환하지 않습니다.
- `asdict(instance, *, dict_factory=dict)`: `Data Class` 인스턴스를 딕셔너리로 변환합니다. `Data Classes`, `dicts`, `lists`, `tuples`는 재귀적으로 변환됩니다.
- `astuple(instance, *, tuple_factory=tuple)`: `Data Class` 인스턴스를 튜플로 변환합니다. `Data Classes`, `dicts`, `lists`, `tuples`는 재귀적으로 변환됩니다.
- `make_dataclass(cls_name, fields, *, bases=(), namespace=None)`: 새로운 `Data Class`를 동적으로 생성합니다.
- `replace(instance, **changes)`: `instance`와 동일한 타입의 새 객체를 생성하며, `changes`의 값으로 필드를 교체합니다. 새 객체는 `__init__` 메서드를 호출하여 생성되므로 `__post_init__`도 호출됩니다. `init=False`로 정의된 필드는 `changes`에 포함될 수 없습니다.
- `is_dataclass(class_or_instance)`: 매개변수가 `dataclass`이거나 `dataclass` 인스턴스이면 `True`를 반환하고, 그렇지 않으면 `False`를 반환합니다.

## 논의 (Discussion)

### `__slots__` 자동 설정 지원 여부
초기 버전에서는 `__slots__`가 지원되지 않습니다. `__slots__`는 클래스 생성 시점에 추가되어야 하지만, `Data Class` 데코레이터는 클래스 생성 후에 호출됩니다. `__slots__`를 지원하려면 데코레이터가 새 클래스를 생성해야 하는데, 이는 예상치 못한 동작일 수 있기 때문입니다. 수동으로 `__slots__`를 추가하거나, `fields()`를 사용하여 클래스를 검사하고 `__slots__`가 설정된 새 클래스를 생성하는 함수를 작성하는 등의 해결 방법이 있습니다.

### `namedtuple`을 사용하지 않는 이유
- `namedtuple`은 필드 수가 동일한 다른 `namedtuple`과 우연히 비교될 수 있습니다. `Data Classes`에서는 `False`를 반환합니다.
- `namedtuple`은 튜플과 우연히 비교될 수 있습니다. `Data Classes`에서는 `False`를 반환합니다.
- `namedtuple` 인스턴스는 항상 iterable이므로 필드를 추가하기 어렵습니다.
- 가변 인스턴스에 대한 옵션이 없습니다.
- 기본값을 지정할 수 없습니다.
- `__init__`, `__repr__` 등에 사용될 필드를 제어할 수 없습니다.
- 상속을 통한 필드 조합을 지원하지 않습니다.

### `typing.NamedTuple`을 사용하지 않는 이유
`typing.NamedTuple`은 정적으로 정의된 필드에 대해 `Data Classes`와 유사한 문법을 지원하지만, `namedtuple`을 생성하므로 `namedtuple`의 단점을 일부 공유합니다. `Data Classes`는 `typing.NamedTuple`과 달리 상속을 통한 필드 조합을 지원합니다.

### `attrs`를 사용하지 않는 이유
`attrs`는 표준 라이브러리에 포함될 수 없을 정도로 빠르게 발전했습니다. `attrs`는 유효성 검사기(validators), 변환기(converters), 메타데이터 등 `Data Classes`에서 제안되지 않은 추가 기능을 지원합니다. `Data Classes`는 이러한 기능을 구현하지 않음으로써 단순성을 목표로 합니다.

### `post-init` 매개변수
초기 버전에서는 `__post_init__` 함수가 매개변수를 받지 않았습니다. 매개변수화된 초기화를 수행하는 일반적인 방법은 대체 클래스메서드 생성자(alternate classmethod constructor)를 제공하는 것이었습니다. `InitVar`가 추가됨으로써 `__post_init__` 함수는 이제 매개변수를 받을 수 있게 되었으며, 이 매개변수는 `__init__`을 통해 `__post_init__`로 전달됩니다.

### `asdict` 및 `astuple` 함수 이름
`asdict()`와 `astuple()` 함수 이름은 PEP 8에 부합하지 않는다는 논의가 있었으나, `namedtuple._asdict()` 및 `attr.asdict()`와의 일관성을 유지하기 위해 현재 이름을 사용하기로 결정했습니다.

## 거부된 아이디어 (Rejected ideas)

### `replace()`에서 `init=False` 필드를 새 객체 생성 후 복사
이전 버전에서는 `init=False` 필드가 `__init__` 반환 후 원본 객체에서 새로 생성된 객체로 복사되도록 명시했지만, 이는 `__init__` 및 `__post_init__`를 사용하여 새 객체를 초기화하는 방식과 일치하지 않는다고 판단되어 거부되었습니다.

### 가변 기본값 자동 지원
리터럴 리스트 `[]`와 같은 가변 기본값을 자동으로 복사하여 각 인스턴스가 새로운 리스트를 얻도록 하자는 제안이 있었습니다. 그러나 이 결정에는 바람직하지 않은 부작용이 있었기 때문에, 최종적으로 `list`, `dict`, `set`과 같이 알려진 3가지 내장 가변 타입의 기본 매개변수 사용을 금지하기로 결정했습니다.

## 예시 (Examples)

### 사용자 정의 `__init__` 메서드
때때로 생성된 `__init__` 메서드만으로는 충분하지 않을 수 있습니다. 예를 들어, `*args`와 `**kwargs`를 저장하는 객체를 만들고 싶다면 `init=False`로 설정하고 사용자 정의 `__init__`을 작성할 수 있습니다.

```python
@dataclass(init=False)
class ArgHolder:
    args: List[Any]
    kwargs: Mapping[Any, Any]

    def __init__(self, *args, **kwargs):
        self.args = args
        self.kwargs = kwargs

a = ArgHolder(1, 2, three=3)
```

### 복잡한 예시
기존의 길고 반복적인 `__init__` 및 `__repr__` 메서드를 가진 클래스를 `Data Class`로 전환하면 코드가 더 간결하고 선언적으로 바뀌며, 타입 힌트(typing)를 지원하고 다른 생성된 함수들을 포함할 수 있습니다.

** 원본 클래스: **
```python
class Application:
    def __init__(self, name, requirements, constraints=None, path='', executable_links=None, executables_dir=()):
        self.name = name
        self.requirements = requirements
        self.constraints = {} if constraints is None else constraints
        self.path = path
        self.executable_links = [] if executable_links is None else executable_links
        self.executables_dir = executables_dir
        self.additional_items = []

    def __repr__(self):
        return f'Application({self.name!r},{self.requirements!r},{self.constraints!r},{self.path!r},{self.executable_links!r},{self.executables_dir!r},{self.additional_items!r})'
```

** `Data Class` 버전: **
```python
@dataclass
class Application:
    name: str
    requirements: List[Requirement]
    constraints: Dict[str, str] = field(default_factory=dict)
    path: str = ''
    executable_links: List[str] = field(default_factory=list)
    executable_dir: Tuple[str] = ()
    additional_items: List[str] = field(init=False, default_factory=list)
```

`Data Class` 버전은 더 선언적이며 코드가 적고, 타입 힌트를 지원하며, 다른 생성된 함수들을 포함합니다.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.