---
title: "[Final] PEP 705 - TypedDict: Read-only items"
excerpt: "Python Enhancement Proposal 705: 'TypedDict: Read-only items'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/705/
toc: true
toc_sticky: true
date: 2025-09-27 13:08:52+0900
last_modified_at: 2025-09-27 13:08:52+0900
published: true
---
> **원문 링크:** [PEP 705 - TypedDict: Read-only items](https://peps.python.org/pep-0705/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 07-Nov-2022



# PEP 705 – TypedDict: 읽기 전용 항목 (Read-only items)

## 초록 (Abstract)
PEP 589는 고정된 키 집합을 가진 딕셔너리를 위한 구조적 타입인 `TypedDict`를 정의합니다. 그러나 `TypedDict`는 가변(mutable) 타입이기 때문에, 읽기 전용 매개변수를 받는 메서드를 정확하게 타입 애너테이션하기 어려워 유효한 입력까지 막는 문제가 있었습니다. 이 PEP는 이러한 용도를 지원하기 위해 새로운 타입 한정자(type qualifier)인 `typing.ReadOnly`를 제안합니다. 이 제안은 Python 문법을 변경하지 않습니다. `TypedDict`의 읽기 전용 키 사용에 대한 올바른 사용법은 정적 타입 체커(static type checker)에 의해서만 강제되며, Python 자체에서는 런타임에 강제되지 않습니다.

## 동기 (Motivation)

문자열 키를 가진 (중첩될 수 있는) 딕셔너리를 사용하여 구조화된 데이터를 표현하는 것은 Python 프로그램에서 흔한 패턴입니다. PEP 589는 이러한 값들을 미리 정확한 타입을 알고 있을 때 타입 검사할 수 있도록 하지만, 더 구체적인 변형(예: 값이 서브타입이거나 가능한 타입의 유니온을 제한하는 경우)을 받아들이는 읽기 전용 코드를 작성하기는 어렵습니다. 이는 특히 광범위한 입력 구조를 지원하고 일반적으로 입력을 수정할 필요가 없는 서비스 API를 작성할 때 흔히 발생하는 문제입니다.

### 순수 함수 (Pure functions)

`Movie` 타입을 사용하는 `movie_string` 함수를 예로 들어보겠습니다. `Movie` 타입은 `TypedDict`로 정의됩니다.

```python
from typing import NotRequired, TypedDict

class Movie(TypedDict):
    name: str
    year: NotRequired[int | None]

class MovieRecord(TypedDict):
    name: str
    year: int

def movie_string(movie: Movie) -> str:
    if movie.get("year") is None:
        return movie["name"]
    else:
        return f'{movie["name"]} ({movie["year"]})'
```

`MovieRecord` 인스턴스를 `movie_string`에 전달하려고 하면 타입 체커(예: mypy)는 오류를 발생시킵니다. `Movie` 클래스에는 `MovieRecord`의 타입 제약 조건을 위반할 수 있는 변경(mutator) 메서드가 존재하기 때문입니다. 이러한 문제는 `Movie`에 변경 메서드가 없을 경우 사라집니다. 이를 위해 PEP 544 Protocol을 사용하여 불변 인터페이스를 정의할 수 있지만, 이는 반복적이고 오류 발생 가능성이 높으며 `__contains__()`, `keys()`와 같은 중요한 메서드 정의가 누락됩니다.

### 중첩된 딕셔너리 업데이트 (Updating nested dicts)

`TypedDict`의 구조적 타이핑은 수정하는 항목의 타입만 제약하는 업데이트 함수를 작성할 수 있도록 고안되었습니다. 그러나 딕셔너리를 중첩하기 시작하면 문제가 발생합니다.

```python
class HasTimestamp(TypedDict):
    timestamp: float

class Logs(TypedDict):
    timestamp: float
    loglines: list[str]

class HasTimestampedMetadata(TypedDict):
    metadata: HasTimestamp

class UserAudit(TypedDict):
    name: str
    metadata: Logs

def update_metadata_timestamp(d: HasTimestampedMetadata) -> None:
    d["metadata"]["timestamp"] = now()

def rename_user(d: UserAudit, name: str) -> None:
    d["name"] = name

update_metadata_timestamp(d) # Type check error: "metadata" is not of type HasTimestamp
```
위 예제에서 `update_metadata_timestamp(d)` 호출 시 타입 검사 오류가 발생합니다. 이는 `HasTimestampedMetadata` 인스턴스가 가지고 있는 `metadata` 항목을 다른 `HasTimestamp` 인스턴스로 덮어쓸 수 있는데, 이 다른 인스턴스는 더 이상 `Logs` 인스턴스가 아닐 수 있기 때문에 발생합니다. Python 3.11부터 제네릭(generics)을 사용하면 이 문제를 해결할 수 있지만, 중첩된 딕셔너리마다 타입 매개변수가 필요하여 매우 복잡해집니다.

## 근거 (Rationale)

이러한 문제들은 `TypedDict`의 하나 이상의 항목을 업데이트하는 기능을 제거함으로써 해결될 수 있습니다. 이는 항목이 불변(immutable)하다는 의미는 아닙니다. 기본 딕셔너리에 대한 참조는 여전히 존재할 수 있으며, 다른 호환 가능한 타입에서 해당 항목에 대한 변경 작업을 수행할 수 있습니다. 이러한 항목들은 "읽기 전용"이며, 이를 위해 새로운 `typing.ReadOnly` 타입 한정자를 도입합니다.

첫 번째 동기 예시의 `movie_string` 함수는 이제 다음과 같이 타입 애너테이션될 수 있습니다.

```python
from typing import NotRequired, ReadOnly, TypedDict

class Movie(TypedDict):
    name: ReadOnly[str]
    year: ReadOnly[NotRequired[int | None]]

def movie_string(movie: Movie) -> str:
    if movie.get("year") is None:
        return movie["name"]
    else:
        return f'{movie["name"]} ({movie["year"]})'
```

읽기 전용 항목과 비(非)읽기 전용 항목의 혼합이 허용되어 두 번째 동기 예시도 올바르게 애너테이션될 수 있습니다.

```python
class HasTimestamp(TypedDict):
    timestamp: float

class HasTimestampedMetadata(TypedDict):
    metadata: ReadOnly[HasTimestamp]

def update_metadata_timestamp(d: HasTimestampedMetadata) -> None:
    d["metadata"]["timestamp"] = now()

class Logs(HasTimestamp):
    loglines: list[str]

class UserAudit(TypedDict):
    name: str
    metadata: Logs

def rename_user(d: UserAudit, name: str) -> None:
    d["name"] = name

update_metadata_timestamp(d) # 이제 OK
```
이러한 이점 외에도, 함수의 인수를 읽기 전용으로 표시함으로써 (읽기 전용 항목을 가진 `TypedDict`를 사용하여) 타입 체커뿐만 아니라 사용자에게도 함수가 입력을 수정하지 않을 것이라는 점을 명확히 전달하여, 함수 인터페이스의 바람직한 속성을 제공합니다. 이 PEP는 `ReadOnly`가 `TypedDict` 내에서만 유효하도록 제안합니다. 프로토콜(protocols)과 같은 추가 컨텍스트에서 지원하는 것은 향후 확장될 수 있습니다.

## 명세 (Specification)

새로운 `typing.ReadOnly` 타입 한정자가 추가됩니다.

### `typing.ReadOnly` 타입 한정자

`typing.ReadOnly` 타입 한정자는 `TypedDict` 정의에서 선언된 항목이 변경(추가, 수정 또는 제거)될 수 없음을 나타내는 데 사용됩니다.

```python
from typing import ReadOnly, TypedDict

class Band(TypedDict):
    name: str
    members: ReadOnly[list[str]]

blur: Band = {"name": "blur", "members": []}
blur["name"] = "Blur" # OK: "name"은 읽기 전용이 아님
blur["members"] = ["Damon Albarn"] # 타입 검사 오류: "members"는 읽기 전용임
blur["members"].append("Damon Albarn") # OK: 리스트 자체는 가변임
```

### 대안적인 함수형 문법 (Alternative functional syntax)

`TypedDict`의 대안적인 함수형 문법도 새로운 타입 한정자를 지원합니다.

```python
Band = TypedDict("Band", {"name": str, "members": ReadOnly[list[str]]})
```

### 다른 특별한 타입과의 상호작용 (Interaction with other special types)

`ReadOnly[]`는 `Required[]`, `NotRequired[]`, `Annotated[]`와 어떤 중첩 순서로든 함께 사용할 수 있습니다. 이는 PEP 655에서 도입된 동작과 일치합니다.

```python
from typing import Annotated, NotRequired, ReadOnly, Required, TypedDict
# ... (ValueRange는 예시용 가상의 타입)

class Movie(TypedDict):
    title: ReadOnly[Required[str]] # OK
    year: ReadOnly[NotRequired[Annotated[int, ValueRange(-9999, 9999)]]] # OK

class Movie2(TypedDict):
    title: Required[ReadOnly[str]] # OK
    year: Annotated[NotRequired[ReadOnly[int]], ValueRange(-9999, 9999)] # OK
```

### 상속 (Inheritance)

서브클래스는 읽기 전용 항목을 비(非)읽기 전용으로 재선언하여 변경 가능하게 만들 수 있습니다.

```python
class NamedDict(TypedDict):
    name: ReadOnly[str]

class Album(NamedDict):
    name: str # 'name'을 비-읽기 전용으로 재선언
    year: int

album: Album = { "name": "Flood", "year": 1990 }
album["year"] = 1973
album["name"] = "Dark Side Of The Moon" # OK: 'name'은 Album에서 읽기 전용이 아님
```

읽기 전용 항목이 재선언되지 않으면 계속 읽기 전용으로 유지됩니다.

```python
class Album(NamedDict):
    year: int # 'name'은 재선언되지 않으므로 ReadOnly 유지

album: Album = { "name": "Flood", "year": 1990 }
album["name"] = "Dark Side Of The Moon" # 타입 검사 오류: 'name'은 Album에서 읽기 전용임
```
서브클래스는 읽기 전용 항목의 값 타입을 좁힐 수 있습니다. 또한, 슈퍼클래스에서는 읽기 전용이지만 필수가 아닌 항목을 서브클래스에서 필수로 만들 수 있습니다.

### 타입 일관성 (Type consistency)

이 섹션은 PEP 589에 도입된 타입 일관성 규칙을 이 PEP의 새로운 기능을 포함하도록 업데이트합니다. 특히, 이 새로운 기능을 사용하지 않는 어떤 타입 쌍이라도 기존에 일관적이었다면(그리고 그 경우에만) 이 새로운 규칙 하에서도 일관적일 것입니다.

`TypedDict` 타입 `A`가 `TypedDict` `B`와 구조적으로 호환되면 일관적입니다. 이는 다음 모든 조건이 충족될 때만 참입니다.
*   `B`의 각 항목에 대해 `A`는 해당 키를 가져야 합니다. 단, `B`의 항목이 읽기 전용이고, 필수 사항이 아니며, 최상위 값 타입(`ReadOnly[NotRequired[object]]`)인 경우는 예외입니다.
*   `B`의 각 항목에 대해 `A`가 해당 키를 가지고 있다면, `A`의 해당 값 타입은 `B`의 값 타입과 일관적이어야 합니다.
*   `B`의 각 비(非)읽기 전용 항목에 대해, 해당 값 타입은 `A`의 해당 값 타입과 일관적이어야 합니다.
*   `B`의 각 필수 키에 대해, `A`의 해당 키는 필수여야 합니다.
*   `B`의 각 비(非)필수 키에 대해, `B`에서 항목이 읽기 전용이 아니라면, `A`의 해당 키는 필수가 아니어야 합니다.

읽기 전용 항목은 공변적(covariantly)으로 동작하며, 변경될 수 없습니다. 이는 `Sequence`와 같은 컨테이너 타입과 유사하며, 불변적(invariantly)으로 동작하는 비(非)읽기 전용 항목과는 다릅니다.

### `update` 메서드

기존 타입 검사 규칙 외에, 읽기 전용 항목을 포함하는 `TypedDict`가 해당 키를 선언하는 다른 `TypedDict`로 업데이트될 경우 타입 체커는 오류를 발생시켜야 합니다. 단, 선언된 값이 하위 타입(bottom type)인 `Never`인 경우는 예외입니다.

```python
import typing

class A(TypedDict):
    x: ReadOnly[int]
    y: int

a1: A = { "x": 1, "y": 2 }
a2: A = { "x": 3, "y": 4 }
a1.update(a2) # 타입 검사 오류: "x"는 A에서 읽기 전용임

class B(TypedDict):
    x: typing.NotRequired[typing.Never]
    y: ReadOnly[int]

def update_a(a: A, b: B) -> None:
    a.update(b) # 타입 검사 허용: "x"는 b에 설정될 수 없음
```
`Never` 타입은 어떤 값과도 일치하지 않으므로, 이 타입으로 애너테이션된 항목은 항상 부재(absent)해야 합니다.

### 키워드 인수 타이핑 (Keyword argument typing)

PEP 692는 `TypedDict`로 ` **kwargs`를 애너테이션하기 위해 `Unpack`을 도입했습니다. 이러한 방식으로 사용되는 `TypedDict`의 하나 이상의 항목을 읽기 전용으로 표시해도 메서드의 타입 시그니처에는 영향을 미치지 않습니다. 그러나 함수 본문에서 해당 항목이 수정되는 것을 방지합니다.

```python
from typing import Protocol, Unpack

class Args(TypedDict):
    key1: int
    key2: str

class ReadOnlyArgs(TypedDict):
    key1: ReadOnly[int]
    key2: ReadOnly[str]

class Function(Protocol):
    def __call__(self, ** kwargs: Unpack[Args]) -> None: ...

def impl(**kwargs: Unpack[ReadOnlyArgs]) -> None:
    kwargs["key1"] = 3 # 타입 검사 오류: key1은 읽기 전용임

fn: Function = impl # 타입 검사 허용: 함수 시그니처는 동일함
```

### 런타임 동작 (Runtime behavior)

`TypedDict` 타입은 두 개의 새로운 속성인 `__readonly_keys__`와 `__mutable_keys__`를 얻게 되며, 각각 모든 읽기 전용 키와 비(非)읽기 전용 키를 포함하는 `frozenset`이 됩니다.

```python
from typing import ReadOnly, TypedDict

class Example(TypedDict):
    a: int
    b: ReadOnly[int]
    c: int
    d: ReadOnly[int]

assert Example.__readonly_keys__ == frozenset({'b', 'd'})
assert Example.__mutable_keys__ == frozenset({'a', 'c'})
```

`typing.get_type_hints`는 `include_extras`가 `True`인 경우를 제외하고 모든 `ReadOnly` 타입 한정자를 제거합니다. `typing.get_origin` 및 `typing.get_args`는 `ReadOnly`를 인식하도록 업데이트됩니다.

## 하위 호환성 (Backwards compatibility)

이 PEP는 `TypedDict`에 새로운 기능을 추가하므로, `TypedDict` 타입을 검사하는 코드는 이를 지원하도록 변경해야 합니다. 이는 주로 타입 체커에 영향을 미칠 것으로 예상됩니다.

## 보안 영향 (Security implications)

이 PEP로 인해 알려진 보안상의 결과는 없습니다.

## 가르치는 방법 (How to teach this)

`typing` 모듈 문서에 다음과 같은 변경 사항을 추가할 것을 제안합니다.
*   이 PEP를 다른 나열된 PEP에 추가합니다.
*   `typing.ReadOnly`를 추가하고 `TypedDict` 및 이 PEP에 링크합니다.
*   `TypedDict` 항목에 다음 텍스트를 추가합니다: "ReadOnly 타입 한정자는 `TypedDict` 정의에서 선언된 항목이 읽을 수 있지만 변경(추가, 수정 또는 제거)될 수 없음을 나타냅니다. 이는 값의 정확한 타입을 아직 알 수 없을 때 유용하며, 따라서 값을 수정하면 구조적 서브타입을 손상시킬 수 있습니다." (예제 삽입)

## 참고 구현 (Reference implementation)

pyright 1.1.333 버전에서 이 제안이 완전히 구현되었습니다.

## 기각된 대안 (Rejected alternatives)

*   **`TypedMapping` 프로토콜 타입:** 초기 버전에서는 `ReadOnly` `TypedDict`와 유사하지만 런타임 타입이 `dict`일 필요가 없는 `TypedMapping` 프로토콜 타입을 제안했으나, 복잡성 대비 강력한 사용 사례가 부족하여 보류되었습니다.
*   **고차(Higher-order) `ReadOnly` 타입:** 매개변수에서 변경자 메서드를 제거하는 일반화된 고차 타입(`ReadOnly[MovieRecord]` 등)이 고려되었지만, `TypedDict` 서브클래스 이외의 더 넓은 타입 집합에 대한 적용 문제와 중첩 타입에 대한 질문을 야기하여 범위가 좁게 유지되었습니다.
*   **`Readonly`라는 타입 이름 사용:** 하이픈이 들어간 "Read-only"의 CamelCase 변환 규칙에 따라 `ReadOnly`가 선택되었습니다.
*   **`Final` 애너테이션 재사용:** `Final`은 재할당 및 서브클래스에서의 재정의를 방지하지만, `ReadOnly`의 의도와 일치하지 않아 혼란을 피하기 위해 새로운 한정자를 도입했습니다.
*   **`readonly` 플래그:** `TypedDict` 전체를 읽기 전용으로 만드는 `readonly=True` 플래그가 고려되었으나, 상속 시 혼란을 야기하고 추가적인 타입 표현이 불가능하여 제거되었습니다.
*   **`copy` 및 다른 메서드를 통한 읽기 전용 한정자 제거 지원:** 타입 체커가 `copy.copy()`나 딕셔너리 병합(`|`)을 통해 읽기 전용 한정자를 제거할 수 있도록 지원하는 방안이 논의되었으나, `typeshed`에 이를 표현할 방법이 없고 복잡성 때문에 보류되었습니다.
*   **`TypedDict`에서 미지정 키 방지:** `TypedDict`에서 선언되지 않은 키의 포함을 명시적으로 방지하는 방안(예: `@final` 데코레이터 또는 `other_keys=Never` 플래그)이 고려되었으나, 타입 체커의 동작 변화와 PEP 728에서 더 광범위하게 다루어질 예정이므로 이 PEP에서는 다루지 않기로 했습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.