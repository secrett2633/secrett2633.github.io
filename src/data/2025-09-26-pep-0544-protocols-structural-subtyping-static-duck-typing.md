---
title: "[Final] PEP 544 - Protocols: Structural subtyping (static duck typing)"
excerpt: "Python Enhancement Proposal 544: 'Protocols: Structural subtyping (static duck typing)'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/544/
toc: true
toc_sticky: true
date: 2025-09-26 23:32:41+0900
last_modified_at: 2025-09-26 23:32:41+0900
published: true
---
> **원문 링크:** [PEP 544 - Protocols: Structural subtyping (static duck typing)](https://peps.python.org/pep-0544/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 05-Mar-2017

## PEP 544 – Protocols: 구조적 서브타이핑 (정적 덕 타이핑)

이 문서는 Python Enhancement Proposal (PEP) 544의 내용을 한국어 사용자가 이해하기 쉽게 번역하고 정리한 것입니다. Python 개발자들이 이 PEP의 제안 내용, 도입 배경, 그리고 실제 Python 사용에 미치는 영향을 명확하게 이해할 수 있도록 돕는 것을 목표로 합니다.

### 개요 (Abstract)

PEP 484에서 도입된 타입 힌트(Type hints)는 정적 타입 체커(static type checkers) 및 기타 서드 파티 도구를 위해 타입 메타데이터를 지정하는 데 사용될 수 있습니다. 그러나 PEP 484는 오직 명목상 서브타이핑(nominal subtyping)의 의미론만 명시합니다. 이 PEP에서는 구조적 서브타이핑(structural subtyping), 즉 정적 덕 타이핑(static duck typing)을 지원하는 프로토콜 클래스(protocol classes)의 정적 및 런타임 의미론을 명시합니다.

### 도입 배경 및 목표 (Rationale and Goals)

현재 PEP 484와 `typing` 모듈은 `Iterable` 및 `Sized`와 같은 몇 가지 일반적인 Python 프로토콜에 대한 추상 베이스 클래스(Abstract Base Classes, ABCs)를 정의하고 있습니다. 이러한 ABC의 문제점은 클래스가 해당 프로토콜을 지원한다고 명시적으로 표시해야 한다는 것입니다. 이는 파이썬답지 않으며, 동적 타입이 지정되는 관용적인 파이썬 코드에서 일반적으로 수행하는 방식과는 다릅니다.

예를 들어, PEP 484를 따르는 다음 코드를 살펴보세요:

```python
from typing import Sized, Iterable, Iterator

class Bucket(Sized, Iterable[int]):
    def __len__(self) -> int:
        # ...
    def __iter__(self) -> Iterator[int]:
        # ...
```

사용자 정의 ABC에서도 동일한 문제가 발생합니다. 명시적으로 서브클래싱하거나 등록해야 하며, 이는 라이브러리 타입의 경우 특히 어려울 수 있습니다. 또한, ABC를 광범위하게 사용하면 추가 런타임 비용이 발생할 수 있습니다.

이 PEP의 목표는 클래스 정의에서 명시적인 베이스 클래스 없이 위와 같은 코드를 작성할 수 있도록 하여 이러한 모든 문제를 해결하는 것입니다. 이를 통해 정적 타입 체커는 구조적 서브타이핑을 사용하여 `Bucket`이 `Sized`와 `Iterable[int]`의 서브타입으로 암묵적으로 간주하도록 합니다.

```python
from typing import Iterator, Iterable

class Bucket:
    def __len__(self) -> int:
        # ...
    def __iter__(self) -> Iterator[int]:
        # ...

def collect(items: Iterable[int]) -> int:
    # ...
    return 0

result: int = collect(Bucket()) # 타입 검사를 통과합니다.
```

`typing` 모듈의 ABC는 이미 런타임에 구조적 동작을 제공합니다. 예를 들어, `isinstance(Bucket(), Iterable)`은 `True`를 반환합니다. 이 제안의 주요 목표는 이러한 동작을 정적으로 지원하는 것입니다.

#### 명목상 서브타이핑(Nominal Subtyping) vs 구조적 서브타이핑(Structural Subtyping)

구조적 서브타이핑은 Python 프로그래머에게 자연스러운데, 이는 덕 타이핑(duck typing)의 런타임 의미론과 일치하기 때문입니다. 즉, 특정 속성을 가진 객체는 실제 런타임 클래스와 독립적으로 취급됩니다. 그러나 PEP 483에서 논의된 바와 같이 명목상 서브타이핑과 구조적 서브타이핑 모두 장단점이 있습니다. 따라서 이 PEP에서는 PEP 484에서 설명하는 명목상 서브타이핑을 구조적 서브타이핑으로 완전히 대체할 것을 제안하지 않습니다. 대신, 이 PEP에서 지정된 프로토콜 클래스는 일반 클래스를 보완하며, 사용자는 특정 솔루션을 적용할 위치를 자유롭게 선택할 수 있습니다.

#### 비목표 (Non-goals)

런타임에 프로토콜 클래스는 단순한 ABC가 될 것입니다. 정교한 런타임 인스턴스 및 클래스 검사를 제공하려는 의도는 없는데, 이는 어렵고 오류가 발생하기 쉬우며 PEP 484의 논리와 모순될 것이기 때문입니다. 또한, PEP 484 및 PEP 526에 따라 프로토콜은 완전히 선택 사항임을 명시합니다.

*   프로토콜 클래스로 주석이 달린 변수나 매개변수에 대해 런타임 의미론이 부과되지 않습니다.
*   모든 검사는 서드 파티 타입 체커 및 기타 도구에 의해서만 수행됩니다.
*   프로그래머는 타입 힌트를 사용하더라도 프로토콜을 사용하지 않을 자유가 있습니다.
*   미래에 프로토콜을 필수가 아닌 것으로 만들 의도는 없습니다.

요약하자면, 프로토콜 클래스에 대한 복잡한 런타임 의미론을 제공하는 것은 이 PEP의 목표가 아니며, 주요 목표는 정적 구조적 서브타이핑에 대한 지원 및 표준을 제공하는 것입니다. ABC로 런타임 컨텍스트에서 프로토콜을 사용할 수 있는 가능성은 주로 ABC를 이미 사용하는 프로젝트를 위한 원활한 전환을 제공하기 위해 존재하는 작은 보너스입니다.

### 구조적 서브타이핑의 기존 접근 방식 (Existing Approaches to Structural Subtyping)

사양을 설명하기 전에 Python 및 기타 언어에서 구조적 서브타이핑과 관련된 기존 접근 방식을 검토합니다.

*   **`zope.interface`** : Python에서 널리 사용되던 구조적 서브타이핑 접근 방식 중 하나로, 특수 클래스를 제공하여 인터페이스 클래스와 일반 클래스를 구별하고, 인터페이스 속성을 표시하며, 명시적으로 구현을 선언합니다. Zope 인터페이스는 런타임 유효성 검사에 전적으로 의존합니다.
*   **Python 추상 베이스 클래스 (`abc` 모듈)** : 표준 라이브러리 도구로 구조적 서브타이핑과 유사한 기능을 제공하지만, 추상 클래스를 서브클래싱하거나 구현을 명시적으로 등록해야 하는 단점이 있습니다.
*   **`collections.abc` 모듈의 추상 클래스** : `__subclasshook__()` 메서드를 사용자 정의하여 명시적인 등록 없이 런타임 구조적 검사를 허용합니다. 이러한 동작은 프로토콜의 런타임 및 정적 동작 모두에 완벽하게 적합하며, `@runtime_checkable` 데코레이터를 통해 사용자 정의 프로토콜에도 유사한 런타임 동작을 제공합니다.
*   **TypeScript** : 사용자 정의 클래스 및 인터페이스를 지원하며, 명시적인 구현 선언 없이 정적으로 구조적 서브타이핑을 확인합니다. 선택적 인터페이스 멤버를 지원하지만, Python의 프로토콜에는 이 기능이 포함되지 않았습니다.
*   **Go** : 인터페이스를 타입 정보를 제공하는 기본 방법으로 사용하며, 구현을 명시적으로 확인하기 위해 할당(assignment)이 사용됩니다. 이 PEP에서는 이러한 접근 방식을 채택하지 않았습니다.

### 사양 (Specification)

#### 용어 (Terminology)

구조적 서브타이핑을 지원하는 타입에는 **프로토콜(protocols)** 이라는 용어를 사용합니다. 이는 "이터레이터 프로토콜"과 같은 용어가 커뮤니티에서 널리 이해되고 있기 때문입니다.

*   **명시적 서브클래스(explicit subclass)** : 클래스가 MRO(Method Resolution Order)에 프로토콜을 포함하는 경우.
*   **프로토콜 구현(implement the protocol)** : 클래스가 프로토콜의 구조적 서브타입인 경우.
*   **암묵적 서브타입(implicit subtype)** : 클래스가 프로토콜과 호환되지만 프로토콜이 MRO에 포함되지 않는 경우.
*   **프로토콜 멤버(protocol members)** : 구조적 서브타입으로 간주되기 위해 다른 클래스가 의무적으로 가져야 하는 프로토콜의 속성(변수 및 메서드).

#### 프로토콜 정의 (Defining a protocol)

프로토콜은 베이스 클래스 목록에 `typing.Protocol` ( `abc.ABCMeta`의 인스턴스)이라는 특별한 새 클래스를 포함하여 정의됩니다.

```python
from typing import Protocol

class SupportsClose(Protocol):
    def close(self) -> None: ...
```

이제 호환되는 시그니처를 가진 `close()` 메서드를 가진 `Resource` 클래스를 정의하면, 구조적 서브타이핑이 프로토콜 타입에 사용되므로 암묵적으로 `SupportsClose`의 서브타입이 됩니다.

```python
class Resource:
    def close(self) -> None:
        self.file.close()
        self.lock.release()

def close_all(things: Iterable[SupportsClose]) -> None:
    for t in things:
        t.close()

f = open('foo.txt')
r = Resource()
close_all([f, r]) # OK!
close_all([1]) # 에러: 'int'는 'close' 메서드가 없습니다.
```

사용자 정의 클래스 `Resource`와 내장 `IO` 타입(`open()`의 반환 타입) 모두 호환되는 타입 시그니처를 가진 `close()` 메서드를 제공하므로 `SupportsClose`의 서브타입으로 간주됩니다.

#### 프로토콜 멤버 (Protocol members)

프로토콜 클래스 본문에 정의된 모든 메서드(일반 메서드 및 `@abstractmethod`로 데코레이트된 메서드)는 프로토콜 멤버입니다. 프로토콜 메서드의 매개변수가 주석이 달리지 않은 경우, 해당 타입은 `Any`로 간주됩니다 (PEP 484 참조).

*   정적 메서드, 클래스 메서드 및 속성(properties)도 프로토콜에서 허용됩니다.
*   프로토콜 변수를 정의하려면 클래스 본문에서 PEP 526 변수 주석을 사용할 수 있습니다.
    ```python
    from typing import Protocol, List

    class Template(Protocol):
        name: str          # 프로토콜 멤버
        value: int = 0     # 기본값을 가진 프로토콜 멤버

        def method(self) -> None:
            self.temp: List[int] = [] # 타입 체커에서 에러
    ```
*   `ClassVar` 주석을 사용하여 프로토콜 클래스 변수와 인스턴스 변수를 구별할 수 있습니다.
*   기본적으로 프로토콜 변수는 읽기 및 쓰기 가능합니다. 읽기 전용 프로토콜 변수를 정의하려면 (추상) 속성(property)을 사용할 수 있습니다.

#### 명시적 구현 선언 (Explicitly declaring implementation)

주어진 클래스가 특정 프로토콜을 구현한다고 명시적으로 선언하려면 일반 베이스 클래스로 사용할 수 있습니다. 이 경우 클래스는 프로토콜 멤버의 기본 구현을 사용할 수 있습니다.

```python
from abc import abstractmethod
from typing import Protocol

class PColor(Protocol):
    @abstractmethod
    def draw(self) -> str: ...
    def complex_method(self) -> int:
        # some complex code here ...
        return 0

class NiceColor(PColor): # 명시적 서브클래싱
    def draw(self) -> str:
        return "deep blue"

class ImplicitColor: # 암묵적 서브타입
    def draw(self) -> str:
        return "probably gray"
    def complex_method(self) -> int:
        # class needs to implement this ...
        return 42

nice: NiceColor
another: ImplicitColor

def represent(c: PColor) -> None:
    print(c.draw(), c.complex_method())

represent(nice)    # OK
represent(another) # Also OK
```
명시적 서브클래싱의 주요 이점은 일부 프로토콜 메서드를 "무료로" 얻을 수 있다는 것입니다. 또한, 타입 체커는 클래스가 프로토콜을 올바르게 구현하는지 정적으로 확인할 수 있습니다.

#### 프로토콜 병합 및 확장 (Merging and extending protocols)

프로토콜은 대부분 일반 ABC와 유사하지만, 정적 타입 체커는 이를 특별하게 처리합니다. 프로토콜 클래스를 서브클래싱한다고 해서 서브클래스가 `typing.Protocol`을 명시적 베이스 클래스로 가지지 않는 한 프로토콜이 되는 것은 아닙니다.

서브프로토콜은 하나 이상의 프로토콜을 직접 베이스 클래스로 가지면서 `typing.Protocol`도 직접 베이스 클래스로 가짐으로써 정의할 수 있습니다.

```python
from typing import Sized, Protocol

class SizedAndClosable(Sized, Protocol):
    def close(self) -> None: ...
```
`Protocol`이 베이스 클래스 목록에 포함되어 있으면, 다른 모든 베이스 클래스는 프로토콜이어야 합니다. 프로토콜은 일반 클래스를 확장할 수 없습니다.

#### 제네릭 프로토콜 (Generic protocols)

제네릭 프로토콜은 `Iterable`과 같이 중요합니다. 일반적인 비(non-protocol) 제네릭 타입과 유사하게 정의됩니다.

```python
from typing import TypeVar, Protocol, Iterator, Generic, Any

T = TypeVar('T')

class Iterable(Protocol[T]):
    @abstractmethod
    def __iter__(self) -> Iterator[T]: ...

# Protocol[T, S, ...]는 Protocol, Generic[T, S, ...]의 단축형으로 허용됩니다.
# 예시:
class MyGenericProtocol(Protocol[T, Any]): # Protocol, Generic[T, Any]와 동일
    def get_item(self) -> T: ...
    def set_item(self, val: Any) -> None: ...
```
사용자 정의 제네릭 프로토콜은 명시적으로 선언된 분산(variance)을 지원합니다.

#### 재귀 프로토콜 (Recursive protocols)

재귀 프로토콜도 지원됩니다. PEP 484에서 지정된 대로 프로토콜 클래스 이름에 대한 전방 참조(forward references)를 문자열로 제공할 수 있습니다.

```python
from typing import Iterable, Protocol

class Traversable(Protocol):
    def leaves(self) -> Iterable['Traversable']: ...
```

#### 프로토콜의 Self-types (Self-types in protocols)

프로토콜의 self-types는 PEP 484의 해당 사양을 따릅니다.

```python
from typing import TypeVar, Protocol

C = TypeVar('C', bound='Copyable')
class Copyable(Protocol):
    def copy(self: C) -> C: ...
```

#### 콜백 프로토콜 (Callback protocols)

`Callable[...]` 구문으로는 표현하기 어렵거나 불가능한 가변(variadic), 오버로드된(overloaded), 복잡한 제네릭 콜백과 같은 유연한 콜백 타입을 정의하는 데 프로토콜을 사용할 수 있습니다. `__call__` 멤버를 가진 프로토콜로 정의될 수 있습니다.

```python
from typing import Optional, List, Protocol

class Combiner(Protocol):
    def __call__(self, *vals: bytes, maxlen: Optional[int] = None) -> List[bytes]: ...

def good_cb(*vals: bytes, maxlen: Optional[int] = None) -> List[bytes]:
    return [b'good']

def bad_cb(*vals: bytes, maxitems: Optional[int]) -> List[bytes]: # 매개변수 이름 다름
    return [b'bad']

comb: Combiner = good_cb # OK
# comb = bad_cb # 에러! Argument 2 has incompatible type because of different name and kind in the callback
```
콜백 프로토콜과 `Callable[...]` 타입은 상호 교환적으로 사용될 수 있습니다.

### 프로토콜 사용 (Using Protocols)

#### 다른 타입과의 서브타이핑 관계 (Subtyping relationships with other types)

프로토콜은 인스턴스화될 수 없으므로 런타임 타입이 프로토콜인 값은 없습니다. 프로토콜 타입을 가진 변수 및 매개변수의 경우, 서브타이핑 관계는 다음 규칙을 따릅니다.

*   프로토콜은 절대 구체적인 타입(concrete type)의 서브타입이 아닙니다.
*   구체적인 타입 X는 X가 P의 모든 프로토콜 멤버를 호환되는 타입으로 구현하는 경우에만 프로토콜 P의 서브타입입니다.
*   프로토콜 P1은 P1이 P2의 모든 프로토콜 멤버를 호환되는 타입으로 정의하는 경우에만 다른 프로토콜 P2의 서브타입입니다.

정적 타입 체커는 해당 프로토콜이 import되지 않은 경우에도 프로토콜 구현을 인식합니다.

#### 프로토콜의 Union 및 Intersection (Unions and intersections of protocols)

프로토콜 클래스의 `Union`은 비(non-protocol) 클래스와 동일하게 작동합니다. 다중 상속을 사용하여 프로토콜의 교집합(intersection)을 정의할 수 있습니다.

```python
from typing import Iterable, Hashable, Protocol

class HashableFloats(Iterable[float], Hashable, Protocol): pass

def cached_func(args: HashableFloats) -> float:
    # ...
    return sum(args)

cached_func((1, 2, 3)) # OK, 튜플은 Hashable이며 Iterable입니다.
```

#### `Type[]` 및 클래스 객체 vs 프로토콜 (`Type[]` and class objects vs protocols)

`Type[Proto]`로 주석이 달린 변수 및 매개변수는 `Proto`의 구체적인 (비(non-protocol)) 서브타입만 허용합니다. 주된 이유는 이러한 타입으로 매개변수를 인스턴스화할 수 있도록 하기 위함입니다.

```python
from typing import Type, Protocol
from abc import abstractmethod

class Proto(Protocol):
    @abstractmethod
    def meth(self) -> int: ...

class Concrete:
    def meth(self) -> int: return 42

def fun(cls: Type[Proto]) -> int:
    return cls().meth() # OK

# fun(Proto)    # 에러: Proto는 인스턴스화될 수 없는 프로토콜이므로 Type[Proto]에 할당될 수 없습니다.
fun(Concrete) # OK
```
클래스 객체는 해당 클래스의 모든 멤버에 접근했을 때 프로토콜 멤버와 호환되는 타입을 반환하는 경우 프로토콜의 구현으로 간주됩니다.

#### `NewType()` 및 타입 별칭 (`NewType()` and type aliases)

프로토콜은 본질적으로 익명입니다. 이 점을 강조하기 위해 정적 타입 체커는 별개의 타입이 제공된다는 환상을 피하기 위해 `NewType()` 내에서 프로토콜 클래스를 거부할 수 있습니다.

```python
from typing import NewType, Protocol, Iterator

class Id(Protocol):
    code: int
    secrets: Iterator[bytes]

# UserId = NewType('UserId', Id) # 에러: 별개의 타입을 제공할 수 없습니다.
```
반면, 타입 별칭은 제네릭 타입 별칭을 포함하여 완전히 지원됩니다.

#### 모듈을 프로토콜 구현으로 사용 (Modules as implementations of protocols)

주어진 모듈의 공용 인터페이스가 예상 프로토콜과 호환되는 경우, 모듈 객체는 프로토콜이 예상되는 곳에서 허용됩니다.

```python
# file default_config.py
timeout = 100
one_flag = True
other_flag = False

# file main.py
import default_config
from typing import Protocol

class Options(Protocol):
    timeout: int
    one_flag: bool
    other_flag: bool

def setup(options: Options) -> None:
    print(f"Timeout: {options.timeout}, Flags: {options.one_flag}, {options.other_flag}")

setup(default_config) # OK
```

#### `@runtime_checkable` 데코레이터 및 `isinstance()`를 통한 타입 좁히기 (`@runtime_checkable` decorator and narrowing types by isinstance())

기본 의미론은 `isinstance()` 및 `issubclass()`가 프로토콜 타입에 대해 실패한다는 것입니다. 이는 덕 타이핑의 정신에 따른 것입니다. 그러나 `Iterable` 및 `collections.abc`와 `typing`의 다른 ABC가 이미 수행하는 방식과 유사하게, 의미가 있는 경우 프로토콜 타입이 사용자 정의 인스턴스 및 클래스 검사를 구현할 수 있어야 합니다. 이는 비(non-generic) 및 비구독(unsubscripted) 제네릭 프로토콜로 제한됩니다. `typing` 모듈은 `collections.abc` 클래스와 동일한 클래스 및 인스턴스 검사 의미론을 제공하는 특별한 `@runtime_checkable` 클래스 데코레이터를 정의하여 이들을 "런타임 프로토콜"로 만듭니다.

```python
from typing import runtime_checkable, Protocol
import os

@runtime_checkable
class SupportsClose(Protocol):
    def close(self): ...

# 파일을 생성하고 닫음
with open('some_file.txt', 'w') as f:
    f.write("test")

# 파일 객체가 SupportsClose 프로토콜을 구현하는지 확인
file_obj = open('some_file.txt', 'r')
assert isinstance(file_obj, SupportsClose) # OK
file_obj.close()
os.remove('some_file.txt')
```
인스턴스 검사는 정적으로 100% 신뢰할 수 없으므로 이 동작은 옵트인(opt-in) 방식입니다.

### Python 2.7 - 3.5에서 프로토콜 사용 (Using Protocols in Python 2.7 - 3.5)

변수 주석 구문은 Python 3.6에서 추가되었으므로, 이전 버전의 지원이 필요한 경우 사양 섹션에서 제안된 프로토콜 변수 정의 구문을 사용할 수 없습니다. 이전 버전의 Python과 호환되는 방식으로 이를 정의하려면 속성(properties)을 사용할 수 있습니다.

```python
from abc import abstractproperty
from typing import Protocol

class Foo(Protocol):
    @property
    def c(self) -> int: return 42 # 기본값을 제공할 수 있는 속성
    @abstractproperty
    def d(self) -> int: # 추상 속성
        raise NotImplementedError
```
PEP 484에 따라 함수 타입 주석도 사용할 수 있습니다. 이 PEP에서 제안된 `typing` 모듈 변경 사항은 PyPI에서 현재 사용 가능한 백포트(backport)를 통해 이전 버전에도 백포트될 것입니다.

### 프로토콜 클래스의 런타임 구현 (Runtime Implementation of Protocol Classes)

#### 구현 세부 사항 (Implementation details)

런타임 구현은 `typing` 모듈과 `collections.abc`의 약간의 업데이트를 제외하고 핵심 인터프리터 및 표준 라이브러리에 영향을 미치지 않고 순수 Python으로 수행될 수 있습니다.

*   `typing.Generic`과 유사하게 `typing.Protocol` 클래스를 정의합니다.
*   클래스가 프로토콜인지 여부를 감지하는 기능을 구현하고, 해당되는 경우 `_is_protocol = True` 클래스 속성을 추가합니다.
*   `@runtime_checkable`을 구현하여 `collections.abc` 클래스처럼 구조적 인스턴스 및 서브클래스 검사를 수행하는 `__subclasshook__()`를 허용합니다.

모든 구조적 서브타이핑 검사는 `mypy`와 같은 정적 타입 체커에 의해 수행됩니다. 런타임에는 프로토콜 유효성 검사를 위한 추가 지원이 제공되지 않습니다.

#### `typing` 모듈의 변경 사항 (Changes in the typing module)

`typing` 모듈의 다음 클래스들은 프로토콜이 될 것입니다.

*   `Callable`, `Awaitable`
*   `Iterable`, `Iterator`, `AsyncIterable`, `AsyncIterator`
*   `Hashable`, `Sized`, `Container`, `Collection`, `Reversible`
*   `ContextManager`, `AsyncContextManager`
*   `SupportsAbs` (및 기타 `Supports*` 클래스)

대부분의 이러한 클래스는 작고 개념적으로 간단합니다. 이러한 프로토콜이 구현하는 메서드를 쉽게 파악하고 해당 런타임 프로토콜 counterpart를 즉시 인식할 수 있습니다.

#### 내성 (Introspection)

기존의 클래스 내성(introspection) 메커니즘(`dir`, `__annotations__` 등)은 프로토콜과 함께 사용할 수 있습니다. 또한, `typing` 모듈에 구현된 모든 내성 도구는 프로토콜을 지원할 것입니다.

### 거부되거나 연기된 아이디어 (Rejected/Postponed Ideas)

이 섹션의 아이디어는 이전에 다른 곳에서 논의되었습니다.

*   **모든 클래스를 기본적으로 프로토콜로 만들기** : `isinstance()`의 의미론 변경, 대부분의 클래스가 프로토콜 클래스로 적합하지 않음 등의 이유로 거부되었습니다.
*   **프로토콜이 일반 클래스를 서브클래싱하는 것을 허용** : 서브타이핑의 전이성 보존 및 모호성 회피를 위해 금지되었습니다.
*   **선택적 프로토콜 멤버 지원** : 복잡성 증가 및 실제 사용 사례 부족으로 연기되었습니다.
*   **프로토콜 메서드만 허용하고 게터 및 세터 사용 강제** : 파이썬답지 않고, 이 PEP가 해결하려는 문제에 해당하지 않기 때문에 거부되었습니다.
*   **비(non-protocol) 멤버 지원** : 복잡성 증가 및 `collections.abc`의 정의를 볼 때 비(non-protocol)로 간주될 수 있는 메서드가 거의 없기 때문에 거부되었습니다.
*   **프로토콜을 다른 접근 방식과 상호 운용 가능하게 만들기** : 기존 ABC 개념의 최소한의 확장으로 이해되어야 한다고 주장합니다.
*   **클래스가 프로토콜을 구현하는지 명시적으로 확인하기 위해 할당 사용** : 코드를 이해하기 어렵게 만들고 인스턴스 생성이 문제가 될 수 있다는 이유로 권장되지 않습니다.
*   **기본적으로 `isinstance()` 검사 지원** : 인스턴스 검사가 신뢰할 수 없을 수 있고, 동적으로 설정되는 속성으로 인해 타입 안전하지 않을 수 있으므로 명시적인 `@runtime_checkable` 데코레이터를 요구하는 것이 더 안전하다고 판단되었습니다.
*   **특별한 교집합 타입 생성자 제공** : 유용성이 불분명하고 나중에 쉽게 추가할 수 있다는 이유로 연기되었습니다.
*   **비(non-protocol) 클래스에 의한 프로토콜의 명시적 서브클래싱 금지** : 하위 호환성, 편의성, 타입 체커의 쉬운 경고, `type: ignore`를 통한 강제 서브타이핑 등의 이유로 거부되었습니다.
*   **가변(mutable) 속성의 공변(covariant) 서브타이핑** : 안전하지 않으며 버그를 숨길 수 있다는 이유로 거부되었습니다.
*   **프로토콜 클래스의 추론된 분산(variance) 재정의** : 선언된 프로토콜 불변성이 서브타이핑의 전이성을 깨뜨리고, 타입 추론을 복잡하게 하며, 더 자세한 오류 메시지를 불가능하게 만든다는 이유로 거부되었습니다.
*   **어댑터 및 적응 지원** : `Union` 및 제네릭 별칭과 같은 기존 도구로 합리적인 대안이 존재하므로 포함하지 않기로 제안되었습니다.
*   **구조적 베이스 타입을 "인터페이스"라고 부르기** : "프로토콜"이라는 용어는 이미 Python에서 덕 타이핑 계약을 설명하는 데 널리 사용되고 있으며, Java 인터페이스와는 여러 면에서 다르기 때문에 "프로토콜"이라는 용어를 사용하기로 결정했습니다.
*   **프로토콜을 일반 ABC 대신 런타임에 특별한 객체로 만들기** : 하위 호환성 문제, 기존 ABC와의 일관성 부족, 두 개의 병렬 계층 구조로 인한 혼란 등의 이유로 거부되었습니다.

### 하위 호환성 (Backwards Compatibility)

이 PEP는 완전히 하위 호환됩니다.

### 구현 (Implementation)

`mypy` 타입 체커는 프로토콜을 완벽하게 지원합니다. 프로토콜의 런타임 구현은 PyPI의 `typing_extensions` 모듈에서 사용할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.