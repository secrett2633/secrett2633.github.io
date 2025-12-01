---
title: "[Final] PEP 681 - Data Class Transforms"
excerpt: "Python Enhancement Proposal 681: 'Data Class Transforms'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/681/
toc: true
toc_sticky: true
date: 2025-09-27 10:10:35+0900
last_modified_at: 2025-09-27 10:10:35+0900
published: true
---
> **원문 링크:** [PEP 681 - Data Class Transforms](https://peps.python.org/pep-0681/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 02-Dec-2021

PEP 681 – Data Class Transforms

## 개요 (Abstract)

PEP 557은 Python 표준 라이브러리에 `dataclass`를 도입했습니다. `dataclass`와 유사한 동작을 제공하지만 표준 타입 어노테이션으로는 설명할 수 없는 인기 있는 라이브러리들(예: `attrs`, `pydantic`, SQLAlchemy, Django와 같은 ORM 패키지)이 많습니다.

대부분의 타입 체커, 린터 및 언어 서버는 `dataclass`를 완벽하게 지원합니다. 이 제안은 이러한 기능을 일반화하고, 서드파티 라이브러리가 특정 데코레이터 함수, 클래스 및 메타클래스가 `dataclass`와 유사한 동작을 제공함을 나타낼 수 있는 방법을 제공하는 것을 목표로 합니다.

이러한 동작에는 다음이 포함됩니다:
*   선언된 데이터 필드를 기반으로 `__init__` 메서드 합성.
*   선택적으로 `__eq__`, `__ne__`, `__lt__`, `__le__`, `__gt__`, `__ge__` 메서드 합성.
*   정적 타입 체킹 중에 불변성(immutability)을 강제하는 "frozen" 클래스 지원.
*   정적 타입 체커가 알아야 할 개별 필드의 속성(예: 필드에 기본값이 제공되는지 여부)을 설명하는 "필드 지정자(field specifiers)" 지원.

이 제안은 `typing.py`에 `dataclass_transform` 데코레이터를 추가하는 것 외에는 CPython에 직접적인 영향을 미치지 않습니다.

## 동기 (Motivation)

`dataclass`와 유사한 의미론을 가진 라이브러리가 타입 체커에 자신의 동작을 선언할 수 있는 기존의 표준적인 방법이 없습니다. 이러한 한계를 해결하기 위해 많은 라이브러리를 위한 Mypy 커스텀 플러그인이 개발되었지만, 이 플러그인들은 다른 타입 체커, 린터 또는 언어 서버에서는 작동하지 않습니다. 또한, 라이브러리 개발자에게는 유지 관리 비용이 많이 들고, Python 개발자는 이러한 플러그인의 존재를 알아야 하고 환경 내에서 다운로드하고 구성해야 합니다.

## 근거 (Rationale)

이 제안의 목적은 `dataclass`와 유사한 의미론을 가진 모든 라이브러리의 모든 기능을 지원하는 것이 아니라, 정적 타입 체킹과 호환되는 방식으로 이러한 라이브러리의 가장 일반적인 기능을 사용할 수 있도록 하는 것입니다.

미래에 `dataclass`에 새로운 기능이 추가되면, 적절할 때 `dataclass_transform`에도 해당 기능에 대한 지원을 추가할 예정입니다. 이 두 기능 세트를 동기화하면 `dataclass` 사용자가 `dataclass_transform`를 더 쉽게 이해하고 사용할 수 있으며, 타입 체커에서 `dataclass` 지원을 유지 관리하는 것이 단순해질 것입니다.

또한, 여러 서드파티 라이브러리에서 채택되었지만 `dataclass`에서 지원되지 않는 기능에 대해서도 향후 `dataclass_transform` 지원을 추가하는 것을 고려할 것입니다.

## 사양 (Specification)

### `dataclass_transform` 데코레이터

이 사양은 `typing` 모듈에 `dataclass_transform`라는 새로운 데코레이터 함수를 도입합니다. 이 데코레이터는 데코레이터인 함수 자체, 클래스 또는 메타클래스에 적용될 수 있습니다. `dataclass_transform`의 존재는 정적 타입 체커에게 데코레이터가 적용된 함수, 클래스 또는 메타클래스가 런타임에 클래스를 변환하여 `dataclass`와 유사한 동작을 부여하는 "마법"을 수행함을 알립니다.

*   `dataclass_transform`가 **함수** 에 적용되면, 해당 데코레이터 함수를 사용하는 것이 `dataclass`와 유사한 의미론을 적용하는 것으로 간주됩니다.
*   `dataclass_transform`가 **클래스** 에 적용되면, 해당 클래스를 직간접적으로 상속하거나 해당 클래스를 메타클래스로 사용하는 모든 클래스에 `dataclass`와 유사한 의미론이 적용되는 것으로 간주됩니다.
*   `dataclass_transform`가 **메타클래스** 에 적용되면, 해당 메타클래스를 사용하는 모든 클래스에 `dataclass`와 유사한 의미론이 적용되는 것으로 간주됩니다.

예시 코드는 다음과 같습니다. (구현은 생략되었지만, `__init__`, `__eq__`, `__ne__` 메서드를 합성한다고 가정합니다.)

```python
# 데코레이터 함수 예시
_T = TypeVar("_T")

@typing.dataclass_transform()
def create_model(cls: Type[_T]) -> Type[_T]:
    cls.__init__ = ...
    cls.__eq__ = ...
    cls.__ne__ = ...
    return cls

@create_model
class CustomerModel:
    id: int
    name: str

# 클래스 예시
@typing.dataclass_transform()
class ModelBase:
    ...

class CustomerModel(ModelBase):
    id: int
    name: str

# 메타클래스 예시
@typing.dataclass_transform()
class ModelMeta(type):
    ...

class ModelBase(metaclass=ModelMeta):
    ...

class CustomerModel(ModelBase):
    id: int
    name: str
```


### 데코레이터 함수 및 클래스/메타클래스 매개변수

`dataclass`와 유사한 기능을 제공하는 데코레이터 함수, 클래스 또는 메타클래스는 특정 동작을 수정하는 매개변수를 받을 수 있습니다. 이 사양은 `dataclass_transform`에 의해 사용되는 경우 정적 타입 체커가 준수해야 하는 다음 매개변수들을 정의합니다. 각 매개변수는 `bool` 인수를 받으며, `bool` 값(`True` 또는 `False`)이 정적으로 평가될 수 있어야 합니다.

*   `eq`, `order`, `frozen`, `init`, `unsafe_hash`: 표준 라이브러리 `dataclass`에서 지원되는 매개변수이며, PEP 557에 정의된 의미를 가집니다.
*   `kw_only`, `match_args`, `slots`: Python 3.10에서 처음 도입된 표준 라이브러리 `dataclass`에서 지원되는 매개변수입니다.

### `dataclass_transform` 매개변수

`dataclass_transform`에 전달되는 매개변수는 기본 동작을 어느 정도 사용자 정의할 수 있도록 합니다.

```python
def dataclass_transform(
    *,
    eq_default: bool = True,
    order_default: bool = False,
    kw_only_default: bool = False,
    field_specifiers: tuple[type | Callable[..., Any], ...] = (),
    **kwargs: Any,
) -> Callable[[_T], _T]: ...
```


*   `eq_default`: 호출자가 `eq` 매개변수를 생략했을 때 `True` 또는 `False`로 가정할지 여부를 나타냅니다. 지정되지 않으면 기본값은 `True`입니다 (dataclass의 기본값과 동일).
*   `order_default`: 호출자가 `order` 매개변수를 생략했을 때 `True` 또는 `False`로 가정할지 여부를 나타냅니다. 지정되지 않으면 기본값은 `False`입니다 (dataclass의 기본값과 동일).
*   `kw_only_default`: 호출자가 `kw_only` 매개변수를 생략했을 때 `True` 또는 `False`로 가정할지 여부를 나타냅니다. 지정되지 않으면 기본값은 `False`입니다 (dataclass의 기본값과 동일).
*   `field_specifiers`: 필드를 설명하는 지원되는 클래스들의 정적 목록을 지정합니다. 일부 라이브러리는 필드 지정자 인스턴스를 할당하는 함수도 제공하며, 이 함수들도 이 튜플에 지정될 수 있습니다. 지정되지 않으면 `field_specifiers`는 기본적으로 빈 튜플이 됩니다.
*   `kwargs`: `dataclass_transform`에 임의의 추가 키워드 인수를 전달할 수 있도록 합니다. 이를 통해 타입 체커는 `typing.py`의 변경을 기다릴 필요 없이 실험적인 매개변수를 지원할 수 있습니다.

예시 코드는 다음과 같습니다.

```python
# 데코레이터 함수 예시
@typing.dataclass_transform(kw_only_default=True, order_default=True)
def create_model(
    *,
    frozen: bool = False,
    kw_only: bool = True,
) -> Callable[[Type[_T]], Type[_T]]: ...

@create_model(frozen=True, kw_only=False)
class CustomerModel:
    id: int
    name: str

# 클래스 예시
@typing.dataclass_transform(eq_default=True, order_default=True)
class ModelBase:
    def __init_subclass__(
        cls, *, init: bool = True, frozen: bool = False, eq: bool = True, order: bool = True,
    ): ...

class CustomerModel(
    ModelBase, init=False, frozen=True, eq=False, order=False,
):
    id: int
    name: str

# 메타클래스 예시
@typing.dataclass_transform(eq_default=True, order_default=True)
class ModelMeta(type):
    def __new__(
        cls, name, bases, namespace, *, init: bool = True, frozen: bool = False, eq: bool = True, order: bool = True,
    ): ...

class ModelBase(metaclass=ModelMeta):
    ...

class CustomerModel(
    ModelBase, init=False, frozen=True, eq=False, order=False,
):
    id: int
    name: str
```


### 필드 지정자 (Field specifiers)

`dataclass`와 유사한 의미론을 지원하는 대부분의 라이브러리는 클래스 정의가 클래스의 각 필드에 대한 추가 메타데이터를 제공할 수 있도록 하나 이상의 "필드 지정자" 타입을 제공합니다. 이 메타데이터는 예를 들어 기본값을 설명하거나 필드가 합성된 `__init__` 메서드에 포함되어야 하는지 여부를 나타낼 수 있습니다.

예시:
```python
@dataclass
class Employee:
    name: str                               # 지정자 없는 필드
    age: Optional[int] = field(default=None, init=False) # 필드 지정자 인스턴스를 사용하는 필드
    is_paid_hourly: bool = True             # 타입 어노테이션과 간단한 초기화자를 사용하여 기본값을 설명하는 필드
    office_number = "unassigned"            # 타입 어노테이션이 제공되지 않았으므로 필드가 아닌 클래스 변수
```


### 필드 지정자 매개변수 (Field specifier parameters)

`dataclass`와 유사한 의미론을 지원하고 필드 지정자 클래스를 지원하는 라이브러리는 일반적으로 이러한 필드 지정자를 구성하기 위해 공통 매개변수 이름을 사용합니다. 이 사양은 정적 타입 체커가 이해해야 하는 매개변수의 이름과 의미를 공식화합니다. 이러한 표준화된 매개변수는 키워드 전용(`keyword-only`)이어야 합니다.

`dataclasses.field`에서 지원하는 매개변수의 상위 집합입니다 (타입 체킹에 영향을 미치지 않는 `compare`, `hash` 등은 제외).

*   `init`: 필드가 합성된 `__init__` 메서드에 포함되어야 하는지 여부를 나타내는 선택적 `bool` 매개변수입니다. 지정되지 않으면 `init`은 기본적으로 `True`입니다.
*   `default`: 필드의 기본값을 제공하는 선택적 매개변수입니다.
*   `default_factory`: 필드의 기본값을 반환하는 런타임 콜백을 제공하는 선택적 매개변수입니다.
*   `factory`: `default_factory`의 별칭입니다. `attrs` 라이브러리를 지원하기 위해 필요합니다.
*   `kw_only`: 필드를 키워드 전용으로 표시해야 하는지 여부를 나타내는 선택적 `bool` 매개변수입니다.
*   `alias`: 필드의 대체 이름을 제공하는 선택적 `str` 매개변수입니다. 이 대체 이름은 합성된 `__init__` 메서드에서 사용됩니다.

`default`, `default_factory`, `factory` 중 두 개 이상을 지정하는 것은 오류입니다.

## 런타임 동작 (Runtime behavior)

런타임에 `dataclass_transform` 데코레이터의 유일한 효과는 데코레이터가 적용된 함수 또는 클래스에 `__dataclass_transform__`이라는 속성을 설정하여 인트로스펙션(introspection)을 지원하는 것입니다. 이 속성의 값은 `dataclass_transform` 매개변수 이름을 해당 값에 매핑하는 `dict`여야 합니다.

예시:
```python
{
 "eq_default": True,
 "order_default": False,
 "kw_only_default": False,
 "field_specifiers": (),
 "kwargs": {}
}
```


## Dataclass 의미론 (Dataclass semantics)

이 PEP에서 달리 명시되지 않는 한, `dataclass_transform`의 영향을 받는 클래스는 표준 라이브러리 `dataclass`처럼 동작하는 것으로 가정합니다.

여기에는 다음 의미론이 포함되지만 이에 국한되지는 않습니다:
*   `frozen` dataclass는 `non-frozen` dataclass를 상속할 수 없습니다.
*   필드 순서 지정 및 상속은 PEP 557에 지정된 규칙을 따릅니다.
*   메서드 합성은 클래스 내에 명시적으로 선언된 메서드를 덮어쓰는 경우 건너뜁니다.
*   `KW_ONLY` 센티넬 값은 지원됩니다.
*   `ClassVar` 속성은 dataclass 필드로 간주되지 않으며 dataclass 메커니즘에 의해 무시됩니다.

## 정의되지 않은 동작 (Undefined behavior)

단일 함수(오버로드 포함), 단일 클래스 또는 클래스 계층 구조 내에서 여러 `dataclass_transform` 데코레이터가 발견되면 결과 동작은 정의되지 않습니다. 라이브러리 작성자는 이러한 시나리오를 피해야 합니다.

## 참조 구현 (Reference Implementation)

Pyright는 `dataclass_transform`에 대한 타입 체커 지원의 참조 구현을 포함합니다. Pyright의 `dataClasses.ts` 소스 파일은 구현을 이해하는 데 좋은 출발점이 될 것입니다.

`attrs` 및 `pydantic` 라이브러리는 `dataclass_transform`를 사용하고 있으며 실제 사용 예시로 사용됩니다.

## 거부된 아이디어 (Rejected Ideas)

*   `auto_attribs` 매개변수: `attrs` 라이브러리 특정 기능이므로 지원하지 않습니다.
*   `cmp` 매개변수: `attrs` 라이브러리 특정 기능이며 `eq`와 `order` 매개변수로 에뮬레이트할 수 있으므로 지원하지 않습니다.
*   자동 필드 이름 별칭 (Automatic field name aliasing): `attrs` 라이브러리 특정 기능이며 `alias` 매개변수를 사용하여 수동으로 처리할 수 있으므로 지원하지 않습니다.
*   대체 필드 순서 지정 알고리즘 (Alternate field ordering algorithms): `dataclass`에서 사용하는 방식 외의 다른 필드 순서 지정은 지원하지 않습니다.
*   서브클래스에서 재선언된 필드 (Fields redeclared in subclasses): `dataclass`의 동작만 지원합니다.
*   Django의 기본 키 및 외래 키 (Django primary and foreign keys): Django 특정 로직이므로 지원하지 않습니다.
*   클래스 전체 기본값 (Class-wide default values): SQLAlchemy 특정 기능이므로 지원하지 않습니다.
*   디스크립터 타입 필드 지원 (Descriptor-typed field support): `dataclass`가 디스크립터 타입 필드를 적절히 지원한다는 사실이 확인되어 추가하지 않았습니다.
*   `converter` 필드 지정자 매개변수: 입력 매개변수의 타입을 유추하기 어렵고 `Any` 타입으로 처리해야 할 수 있어 지원이 복잡하다고 판단했습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.