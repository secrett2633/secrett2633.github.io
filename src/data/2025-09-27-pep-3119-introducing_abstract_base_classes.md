---
title: "[Final] PEP 3119 - Introducing Abstract Base Classes"
excerpt: "Python Enhancement Proposal 3119: 'Introducing Abstract Base Classes'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3119/
toc: true
toc_sticky: true
date: 2025-09-27 14:27:33+0900
last_modified_at: 2025-09-27 14:27:33+0900
published: true
---
> **원문 링크:** [PEP 3119 - Introducing Abstract Base Classes](https://peps.python.org/pep-3119/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 18-Apr-2007



# PEP 3119 – 추상 기본 클래스 (Abstract Base Classes) 도입

## 개요 (Abstract)

이 문서는 Python 3000에 Abstract Base Class (ABC) 지원을 추가하기 위한 제안입니다. 주요 제안 내용은 다음과 같습니다.

*   `isinstance()` 및 `issubclass()` 함수를 오버로드(overload)하는 방법.
*   "ABC 지원 프레임워크" 역할을 하는 새로운 모듈 `abc` 도입. 이 모듈은 ABC를 위한 메타클래스(metaclass)와 추상 메서드를 정의하는 데 사용할 수 있는 데코레이터를 정의합니다.
*   `collections` 모듈에 컨테이너(containers) 및 이터레이터(iterators)를 위한 특정 ABC를 추가.

이 제안의 많은 부분은 인터페이스(Interfaces)나 제네릭 함수(Generic Functions, GFs)와 같은 특정 ABC 메커니즘보다는 "무엇이 집합(set)을 만드는가", "무엇이 매핑(mapping)을 만드는가", "무엇이 시퀀스(sequence)를 만드는가"와 같은 철학적 문제를 명확히 하는 데 중점을 둡니다.

또한, 숫자형(numeric types)을 위한 ABC를 정의하는 관련 PEP 3141도 있습니다.

## 배경 (Rationale)

객체 지향 프로그래밍(Object-Oriented Programming) 영역에서 객체와 상호 작용하는 사용 패턴은 '호출(invocation)'과 '검사(inspection)'라는 두 가지 기본 범주로 나눌 수 있습니다.

*   **호출(Invocation):** 객체의 메서드를 호출하여 상호 작용하는 것을 의미합니다. 일반적으로 이는 다형성(polymorphism)과 결합되어, 주어진 메서드를 호출하면 객체의 타입(type)에 따라 다른 코드가 실행될 수 있습니다.
*   **검사(Inspection):** 외부 코드(객체의 메서드 외부)가 해당 객체의 타입이나 속성을 검사하고, 그 정보를 바탕으로 객체를 어떻게 처리할지 결정하는 능력을 의미합니다.

두 사용 패턴 모두 다양하고 잠재적으로 새로운 객체를 통일된 방식으로 처리하면서도, 동시에 각기 다른 타입의 객체에 맞게 처리 결정을 맞춤화할 수 있도록 지원하는 동일한 일반적인 목표를 달성합니다.

고전적인 객체 지향 이론에서는 호출이 선호되는 사용 패턴이며, 검사는 이전의 절차적 프로그래밍 스타일의 잔재로 간주되어 적극적으로 권장되지 않습니다. 그러나 실제로는 이러한 관점이 너무 독단적이고 유연하지 않아, Python과 같은 동적 언어의 본질과 매우 상반되는 종류의 설계 경직성으로 이어집니다.

특히, 객체 클래스의 생성자가 예상하지 못했던 방식으로 객체를 처리해야 할 필요성이 종종 발생합니다. 모든 객체에 해당 객체의 모든 잠재적 사용자의 요구를 충족하는 메서드를 내장하는 것이 항상 최선의 해결책은 아닙니다. 더욱이, 동작이 객체 내에 엄격하게 캡슐화되어야 한다는 고전적인 객체 지향 요구 사항과 직접적으로 대조되는 많은 강력한 디스패치(dispatch) 철학이 있습니다. 예를 들어, 규칙 또는 패턴 매치 기반 로직이 있습니다.

반면에, 고전 객체 지향 이론가들이 검사에 대해 비판하는 것 중 하나는 형식주의의 부족과 검사 대상의 즉흥적인(ad hoc) 성격입니다. Python과 같은 언어에서는 객체의 거의 모든 측면을 외부 코드에서 리플렉션(reflection)하고 직접 접근할 수 있기 때문에, 객체가 특정 프로토콜을 따르는지 여부를 테스트하는 여러 가지 방법이 있습니다. 예를 들어, '이 객체가 가변 시퀀스 컨테이너(mutable sequence container)인가?'라고 물을 때, 'list'의 기본 클래스를 찾거나, '__getitem__'이라는 메서드를 찾을 수 있습니다. 그러나 이러한 테스트가 명백해 보일지라도, 둘 다 올바르지 않습니다. 하나는 오탐(false negatives)을 생성하고 다른 하나는 과탐(false positives)을 생성하기 때문입니다.

일반적으로 합의된 해결책은 테스트를 표준화하고, 이를 공식적인 배열로 그룹화하는 것입니다. 이는 상속 메커니즘이나 다른 수단을 통해 각 클래스에 표준 테스트 가능 속성 집합을 연결함으로써 가장 쉽게 수행됩니다. 각 테스트는 일반적인 클래스 동작에 대한 약속과 어떤 다른 클래스 메서드를 사용할 수 있는지에 대한 약속을 포함합니다.

이 PEP는 이러한 테스트를 구성하기 위한 특정 전략인 **추상 기본 클래스(Abstract Base Classes, ABC)**를 제안합니다. ABC는 외부 검사자에게 객체의 특정 기능을 알리기 위해 객체의 상속 트리(inheritance tree)에 추가되는 Python 클래스입니다. 테스트는 `isinstance()`를 사용하여 수행되며, 특정 ABC의 존재는 테스트가 통과했음을 의미합니다.

또한, ABC는 타입의 특징적인 동작을 설정하는 최소한의 메서드 집합을 정의합니다. ABC 타입에 따라 객체를 구별하는 코드는 해당 메서드가 항상 존재한다고 신뢰할 수 있습니다. 이러한 각 메서드는 ABC 문서에 설명된 일반화된 추상 의미 정의를 동반합니다. 이러한 표준 의미 정의는 강제되지 않지만 강력히 권장됩니다.

Python의 다른 모든 것과 마찬가지로, 이러한 약속은 친근한 합의의 성격을 띠며, 이 경우 언어가 ABC에서 이루어진 일부 약속을 강제하는 반면, 나머지는 구체 클래스(concrete class)의 구현자가 지킬 책임이 있음을 의미합니다.

## 명세 (Specification)

명세는 개요(Abstract)에 나열된 범주를 따릅니다.

*   `isinstance()` 및 `issubclass()`를 오버로드하는 방법.
*   "ABC 지원 프레임워크" 역할을 하는 새로운 `abc` 모듈.
*   컨테이너 및 이터레이터를 위한 특정 ABC를 `collections` 모듈에 추가.

### `isinstance()` 및 `issubclass()` 오버로드

이 PEP와 관련 PEP 3141의 개발 과정에서 우리는 더 세분화된 ABC를 표준화할지, 아니면 더 적고 광범위한 ABC를 표준화할지 반복적으로 선택에 직면했습니다.

이러한 딜레마를 해결하기 위해, 다음 섹션에서는 ABC와 함께 사용할 메타클래스를 제안합니다. 이 메타클래스는 다른 ABC를 포함한 모든 클래스에 ABC를 "가상 기본 클래스(virtual base class)"(C++와는 다른 개념)로 추가할 수 있도록 합니다.

이것은 표준 라이브러리가 ABC `Sequence` 및 `MutableSequence`를 정의하고 `basestring`, `tuple`, `list`와 같은 내장 타입(built-in types)에 대한 가상 기본 클래스로 등록할 수 있도록 합니다. 예를 들어, 다음 조건은 모두 참이 됩니다.

```python
isinstance([], Sequence)
issubclass(list, Sequence)
issubclass(list, MutableSequence)
isinstance((), Sequence)
not issubclass(tuple, MutableSequence)
isinstance("", Sequence)
issubclass(bytearray, MutableSequence)
```


여기서 제안하는 주요 메커니즘은 내장 함수 `isinstance()` 및 `issubclass()`의 오버로드를 허용하는 것입니다. 오버로드는 다음과 같이 작동합니다.

*   `isinstance(x, C)` 호출은 먼저 `C.__instancecheck__`의 존재 여부를 확인하고, 존재하면 일반적인 구현 대신 `C.__instancecheck__(x)`를 호출합니다.
*   `issubclass(D, C)` 호출은 먼저 `C.__subclasscheck__`의 존재 여부를 확인하고, 존재하면 일반적인 구현 대신 `C.__subclasscheck__(D)`를 호출합니다.

매직 이름은 `__isinstance__` 및 `__issubclass__`가 아님에 유의하세요. 이는 인수의 역전이 혼란을 야기할 수 있기 때문입니다. 특히 `issubclass()` 오버로더의 경우 더욱 그렇습니다.

### `abc` 모듈: ABC 지원 프레임워크

새로운 표준 라이브러리 모듈 `abc`는 순수 Python으로 작성되었으며 ABC 지원 프레임워크 역할을 합니다. 이 모듈은 메타클래스 `ABCMeta`와 데코레이터 `@abstractmethod` 및 `@abstractproperty`를 정의합니다.

`ABCMeta` 클래스는 `__instancecheck__` 및 `__subclasscheck__`를 오버라이드하고 `register` 메서드를 정의합니다. `register` 메서드는 하나의 인수를 취하며, 이는 클래스여야 합니다. `B.register(C)` 호출 후, `isinstance(x, B)`는 `issubclass(x.__class__, B)` 또는 `issubclass(type(x), B)`와 동등하게 됩니다.

이러한 메서드는 메타클래스가 `ABCMeta`인 (또는 `ABCMeta`에서 파생된) 클래스에서 호출되도록 의도되었습니다. 예를 들면 다음과 같습니다.

```python
from abc import ABCMeta

class MyABC(metaclass=ABCMeta):
    pass

MyABC.register(tuple)
assert issubclass(tuple, MyABC)
assert isinstance((), MyABC)
```


물론, `MyABC`를 직접 서브클래싱할 수도 있습니다.

```python
class MyClass(MyABC):
    pass

assert issubclass(MyClass, MyABC)
assert isinstance(MyClass(), MyABC)
```


`abc` 모듈은 또한 추상 메서드를 선언하는 데 사용되는 `@abstractmethod`라는 새로운 데코레이터를 정의합니다. 이 데코레이터로 선언되었지만 아직 오버라이드되지 않은 메서드를 하나 이상 포함하는 클래스는 인스턴스화될 수 없습니다.

예를 들어, 다음과 같습니다.

```python
from abc import ABCMeta, abstractmethod

class A(metaclass=ABCMeta):
    @abstractmethod
    def foo(self):
        pass

A() # TypeError 발생
```


`@abstractmethod` 데코레이터는 클래스 본문 내에서만 사용해야 하며, 메타클래스가 `ABCMeta`인 (또는 `ABCMeta`에서 파생된) 클래스에만 사용해야 합니다.

`@abstractproperty`라는 두 번째 데코레이터는 추상 데이터 속성을 정의하기 위해 정의됩니다. 구현은 내장 `property` 클래스의 서브클래스이며 `__isabstractmethod__` 속성을 추가합니다.

```python
class abstractproperty(property):
    __isabstractmethod__ = True
```


이는 두 가지 방식으로 사용할 수 있습니다.

```python
class C(metaclass=ABCMeta):
    # 읽기 전용 속성 (A read-only property):
    @abstractproperty
    def readonly(self):
        return self.__x

    # 읽기-쓰기 속성 (A read-write property) (데코레이터 문법을 사용할 수 없음):
    def getx(self):
        return self.__x
    def setx(self, value):
        self.__x = value
    x = abstractproperty(getx, setx)
```


추상 메서드와 마찬가지로, 추상 속성을 상속받는 서브클래스(데코레이터 문법 또는 긴 형식으로 선언된)는 해당 추상 속성을 구체적인 속성으로 오버라이드하지 않으면 인스턴스화될 수 없습니다.

### 컨테이너 및 이터레이터를 위한 ABC

`collections` 모듈은 집합(sets), 매핑(mappings), 시퀀스(sequences) 및 이터레이터, 딕셔너리 뷰(dictionary views)와 같은 일부 도우미 타입(helper types)과 함께 작동하는 데 필요하고 충분한 ABC를 정의할 것입니다. 모든 ABC는 위에서 언급한 `ABCMeta`를 메타클래스로 가집니다.

ABC는 기술적으로 유효하지만 거의 쓸모없는 추상 메서드 구현을 제공합니다. 예를 들어, `__hash__`는 `0`을 반환하고, `__iter__`는 빈 이터레이터(empty iterator)를 반환합니다. 일반적으로 추상 메서드는 표시된 타입의 빈 컨테이너의 동작을 나타냅니다.

일부 ABC는 또한 구체적인(즉, 추상적이지 않은) 메서드를 제공합니다. 예를 들어, `Iterator` 클래스에는 자신을 반환하는 `__iter__` 메서드가 있어 이터레이터의 중요한 불변식(invariant)을 충족합니다. 이러한 ABC는 "믹스인(mix-in)" 클래스로 간주될 수 있습니다.

이 PEP에서 정의된 ABC 중 `__init__`, `__new__`, `__str__` 또는 `__repr__`을 오버라이드하는 것은 없습니다. 표준 생성자 서명을 정의하는 것은 커스텀 컨테이너 타입(예: Patricia trees 또는 gdbm 파일)을 불필요하게 제한할 것입니다. 컬렉션에 대한 특정 문자열 표현을 정의하는 것도 개별 구현에 맡겨집니다.

**참고:** 정렬 연산(`__lt__`, `__le__`, `__ge__`, `__gt__`)을 위한 ABC는 없습니다.

#### 단일 메서드 ABC (One Trick Ponies)

이 추상 클래스들은 `__iter__` 또는 `__len__`과 같은 단일 메서드를 나타냅니다.

*   **`Hashable`**: `__hash__`를 정의하는 클래스를 위한 기본 클래스입니다. `__hash__` 메서드는 정수를 반환해야 합니다. 추상 `__hash__` 메서드는 항상 `0`을 반환합니다.
    *   **불변식(Invariant):** 클래스 `C1`과 `C2`가 모두 `Hashable`에서 파생되면, `C1`의 모든 인스턴스 `o1`과 `C2`의 모든 인스턴스 `o2`에 대해 `o1 == o2` 조건은 `hash(o1) == hash(o2)`를 의미해야 합니다.
    *   또 다른 제약은 해시 가능한 객체는 일단 생성되면 그 값(`==`로 비교)이나 해시 값을 변경해서는 안 된다는 것입니다.

*   **`Iterable`**: `__iter__`를 정의하는 클래스를 위한 기본 클래스입니다. `__iter__` 메서드는 항상 `Iterator`의 인스턴스를 반환해야 합니다.

*   **`Iterator`**: `__next__`를 정의하는 클래스를 위한 기본 클래스입니다. `Iterable`에서 파생됩니다.
    *   **참고:** `Iterable`과 `Iterator`의 차이점에 유의하세요. `Iterable`은 반복 가능한 객체(즉, `__iter__` 메서드를 지원)이고, `Iterator`는 내장 함수 `iter()`가 반환하는 객체(즉, `__next__` 메서드를 지원)입니다.

*   **`Sized`**: `__len__`을 정의하는 클래스를 위한 기본 클래스입니다. `__len__` 메서드는 `0` 이상의 정수를 반환해야 합니다.
    *   **불변식:** 클래스 `C`가 `Sized`와 `Iterable` 모두에서 파생되는 경우, `C`의 모든 인스턴스 `c`에 대해 `sum(1 for x in c) == len(c)`가 성립해야 합니다.

*   **`Container`**: `__contains__`를 정의하는 클래스를 위한 기본 클래스입니다. `__contains__` 메서드는 불리언(bool) 값을 반환해야 합니다.
    *   **불변식:** 클래스 `C`가 `Container`와 `Iterable` 모두에서 파생되는 경우, `C`의 모든 인스턴스 `c`에 대해 `(x in c for x in c)`는 `True` 값만 생성하는 제너레이터(generator)여야 합니다.

#### 집합 (Sets)

이 추상 클래스들은 읽기 전용 집합(read-only sets)과 가변 집합(mutable sets)을 나타냅니다. 가장 기본적인 집합 연산은 `x in s`로 작성되고 `s.__contains__(x)`로 구현되는 멤버십 테스트입니다.

내장 타입 `set`은 `MutableSet`에서 파생됩니다. 내장 타입 `frozenset`은 `Set`과 `Hashable`에서 파생됩니다.

*   **`Set`**: `Sized`, `Iterable`, `Container`의 서브클래스입니다. 집합은 각 요소가 한 번만 나타나고, 부등식 연산(subset/superset 테스트)을 구현하는 구체적인 연산자를 정의하는 추가적인 불변식을 가집니다.
    *   이 클래스는 또한 합집합(`__or__`), 교집합(`__and__`), 대칭 차집합(`__xor__`), 비대칭 차집합(`__sub__`)을 계산하는 구체적인 연산자를 정의합니다.
    *   마지막으로, 이 클래스는 요소로부터 해시 값을 계산하는 구체적인 메서드 `_hash`를 정의합니다.

*   **`MutableSet`**: 요소를 추가하고 제거하는 추가 연산을 구현하는 `Set`의 서브클래스입니다.
    *   `.add(x)`: 집합에 `x`를 추가하는 추상 메서드.
    *   `.discard(x)`: 집합에 `x`가 있으면 제거하는 추상 메서드.
    *   `.pop()`: 임의의 항목을 제거하고 반환하는 구체적인 메서드.
    *   `.toggle(x)`: `x`가 없으면 추가하고 있으면 제거하는 구체적인 메서드.
    *   `.clear()`: 집합을 비우는 구체적인 메서드.
    *   이는 또한 인플레이스(in-place) 변경 연산 `|=`, `&=`, `^=`, `-=`를 지원합니다.

#### 매핑 (Mappings)

이 추상 클래스들은 읽기 전용 매핑(read-only mappings)과 가변 매핑(mutable mappings)을 나타냅니다. `Mapping` 클래스는 가장 일반적인 읽기 전용 매핑 API를 나타냅니다.

내장 타입 `dict`는 `MutableMapping`에서 파생됩니다.

*   **`Mapping`**: `Container`, `Iterable`, `Sized`의 서브클래스입니다. 매핑의 키는 자연스럽게 집합을 형성합니다.
    *   `.__getitem__(key)`: `key`에 해당하는 값을 반환하거나 `KeyError`를 발생시키는 추상 메서드.
    *   `.get(key, default=None)`: `self[key]`가 `KeyError`를 발생시키지 않으면 그 값을 반환하고, 발생하면 `default` 값을 반환하는 구체적인 메서드.
    *   `.__contains__(key)`: `self[key]`가 `KeyError`를 발생시키지 않으면 `True`를, 발생하면 `False`를 반환하는 구체적인 메서드.
    *   `.__len__()`: 고유한 키의 개수를 반환하는 추상 메서드.
    *   `.__iter__()`: 키 집합의 각 키를 정확히 한 번 반환하는 추상 메서드.
    *   `.keys()`: 키 집합을 `Set`으로 반환하는 구체적인 메서드.
    *   `.items()`: 항목(key, value 쌍)을 `Set`으로 반환하는 구체적인 메서드.
    *   `.values()`: 값을 크기가 있는(sized) 이터러블 컨테이너로 반환하는 구체적인 메서드.

*   **`MutableMapping`**: `Mapping`의 서브클래스로, 일부 표준 변경 메서드를 구현합니다. 추상 메서드에는 `__setitem__`, `__delitem__`이 포함됩니다. 구체적인 메서드에는 `pop`, `popitem`, `clear`, `update`가 포함됩니다.

#### 시퀀스 (Sequences)

이 추상 클래스들은 읽기 전용 시퀀스(read-only sequences)와 가변 시퀀스(mutable sequences)를 나타냅니다.

내장 `list` 및 `bytes` 타입은 `MutableSequence`에서 파생됩니다. 내장 `tuple` 및 `str` 타입은 `Sequence` 및 `Hashable`에서 파생됩니다.

*   **`Sequence`**: `Iterable`, `Sized`, `Container`의 서브클래스입니다. 새로운 추상 메서드 `__getitem__`을 정의하는데, 이는 정수로 호출될 때 시퀀스의 요소를 반환하거나 `IndexError`를 발생시키고, 슬라이스(slice) 객체로 호출될 때 다른 `Sequence`를 반환합니다.

*   **`MutableSequence`**: `Sequence`의 서브클래스로, 일부 표준 변경 메서드를 추가합니다. 추상 변경 메서드: `__setitem__` (정수 인덱스 및 슬라이스), `__delitem__` (동일), `insert`. 구체적인 변경 메서드: `append`, `reverse`, `extend`, `pop`, `remove`. 구체적인 변경 연산자: `+=`, `*=` (이들은 객체를 제자리에서 변경합니다).
    *   **참고:** `sort()`는 정의하지 않습니다. 이는 순수한 `list` 인스턴스에만 존재하도록 요구됩니다.

#### 문자열 (Strings)

Python 3000은 적어도 두 가지 내장 문자열 타입(`bytes`, `str`)을 가질 것으로 예상됩니다. `bytes`는 `MutableSequence`에서 파생되고, (유니코드) 문자열 `str`은 `Sequence` 및 `Hashable`에서 파생됩니다.

## ABC와 대안들 (ABCs vs. Alternatives)

이 섹션에서는 ABC와 제안된 다른 접근 방식들을 비교 및 대조합니다.

### ABC와 덕 타이핑 (Duck Typing)

ABC의 도입이 덕 타이핑의 종말을 의미할까요? 그렇지 않다고 생각합니다. Python은 `__getitem__` 메서드를 정의할 때 클래스가 `BasicMapping` 또는 `Sequence`에서 파생되도록 요구하지 않으며, `x[y]` 구문도 `x`가 어느 ABC의 인스턴스여야 한다고 요구하지 않습니다. `write` 메서드를 가지고 있는 한, 어떤 "파일과 유사한(file-like)" 객체든 `sys.stdout`에 계속 할당할 수 있을 것입니다.

물론, 사용자에게 적절한 기본 클래스에서 파생하도록 장려하는 "당근"이 있을 것입니다. 이는 특정 기능에 대한 기본 구현부터 매핑과 시퀀스를 구별하는 향상된 능력에 이르기까지 다양합니다. 그러나 "채찍"은 없습니다. `hasattr(x, "__len__")`이 당신에게 효과적이라면, 좋습니다! ABC는 Python 2에서 매핑과 시퀀스를 구별하는 것과 같이 좋은 해결책이 전혀 없었던 문제를 해결하기 위해 고안되었습니다.

### ABC와 제네릭 함수 (Generic Functions)

ABC는 제네릭 함수(GFs)와 호환됩니다. 예를 들어, Guido van Rossum 자신의 제네릭 함수 구현은 인수의 클래스(타입)를 디스패치 키(dispatch key)로 사용하여 파생 클래스가 기본 클래스를 오버라이드할 수 있도록 합니다. (Python의 관점에서) ABC는 매우 일반적인 클래스이므로, GF의 기본 구현에서 ABC를 사용하는 것이 매우 적절할 수 있습니다.

```python
@prettyprint.register(Set)
def pp_set(s):
    return "{" + ... + "}" # 세부 사항은 연습 문제로 남김
```


집합의 특정 서브클래스에 대한 구현도 쉽게 추가할 수 있습니다.

### ABC와 인터페이스 (Interfaces)

ABC는 본질적으로 인터페이스와 비호환적이지 않지만, 상당한 중첩이 있습니다. 현재로서는 인터페이스 지지자들이 인터페이스가 왜 더 나은지 설명하도록 남겨둘 것입니다.
이 문맥에서의 "인터페이스"는 일반적인 클래스 계층 구조의 일부는 아니지만, 특정 유형의 상속 테스트를 허용하는 클래스에 추가되는 메타데이터 요소 집합에 대한 제안들을 의미합니다.

클래스에 가변 메타데이터를 첨부하는 아이디어의 단점은 클래스가 공유 상태이므로 이를 변경하면 의도 충돌로 이어질 수 있다는 것입니다. 또한, 객체의 분류를 오버라이드해야 할 필요성은 제네릭 함수를 사용하여 더 깔끔하게 수행될 수 있습니다.

## 참고 자료 (References)

문서의 원문 참고 자료를 참조해주세요.

## 저작권 (Copyright)

이 문서는 공공 도메인(public domain)에 공개되었습니다.
Source: https://github.com/python/peps/blob/main/peps/pep-3119.rst
Last modified: 2025-02-01 08:55:40 GMT## PEP 3119 – 추상 기본 클래스 (Abstract Base Classes) 도입

### 개요 (Abstract)

이 문서는 Python 3000에 추상 기본 클래스(Abstract Base Class, ABC) 지원을 추가하기 위한 제안입니다. 주요 제안 내용은 다음과 같습니다.

*   `isinstance()` 및 `issubclass()` 함수를 오버로드(overload)하는 방법.
*   "ABC 지원 프레임워크" 역할을 하는 새로운 모듈 `abc`의 도입. 이 모듈은 ABC를 위한 메타클래스(metaclass)와 추상 메서드를 정의하는 데 사용할 수 있는 데코레이터를 정의합니다.
*   `collections` 모듈에 컨테이너(containers) 및 이터레이터(iterators)를 위한 특정 ABC를 추가.

이 제안은 ABC의 특정 메커니즘 자체보다는, "무엇이 집합(set)을 만드는가", "무엇이 매핑(mapping)을 만드는가", "무엇이 시퀀스(sequence)를 만드는가"와 같은 철학적 문제를 명확히 하는 데 중점을 둡니다.

또한, 숫자형(numeric types)을 위한 ABC를 정의하는 관련 PEP 3141도 있습니다.

### 배경 (Rationale)

객체 지향 프로그래밍에서 객체와 상호 작용하는 패턴은 '호출(invocation)'과 '검사(inspection)'라는 두 가지 기본 범주로 나눌 수 있습니다.

*   **호출(Invocation):** 객체의 메서드를 호출하여 상호 작용하는 방식입니다. 일반적으로 이는 다형성(polymorphism)과 결합되어, 객체의 타입에 따라 다른 코드가 실행될 수 있습니다.
*   **검사(Inspection):** 외부 코드(객체의 메서드 외부)가 객체의 타입이나 속성을 검사하고, 그 정보를 바탕으로 객체를 처리하는 방식을 결정하는 능력입니다.

고전적인 객체 지향 이론에서는 호출이 선호되는 패턴이지만, 실제로는 검사가 필요할 때가 많습니다. 특히 객체 생성자가 예상하지 못했던 방식으로 객체를 처리해야 할 경우, 모든 객체에 모든 잠재적 사용자의 요구를 충족하는 메서드를 내장하는 것이 항상 최선은 아닙니다.

하지만 검사 방식의 문제점은 형식주의의 부족과 `ad hoc`한 성격입니다. Python에서는 객체의 거의 모든 측면을 외부 코드에서 리플렉션(reflection)하고 직접 접근할 수 있기 때문에, 객체가 특정 프로토콜을 따르는지 테스트하는 여러 방법이 있습니다. 예를 들어, "이 객체가 가변 시퀀스 컨테이너인가?"를 확인하기 위해 `list`의 기본 클래스를 찾거나 `__getitem__` 메서드를 찾을 수 있지만, 이 두 가지 모두 오탐(false positives)이나 오인식(false negatives)을 유발할 수 있어 정확하지 않습니다.

이러한 문제의 해결책으로 테스트를 표준화하고 공식적인 방식으로 그룹화하는 것이 제안됩니다. 이는 각 클래스에 표준 테스트 가능 속성 집합을 연결하는 방식으로 이루어지며, 각 테스트는 클래스의 일반적인 동작과 사용 가능한 메서드에 대한 약속을 포함합니다.

이 PEP는 이러한 테스트를 구성하기 위한 특정 전략으로 **추상 기본 클래스(Abstract Base Classes, ABC)**를 제안합니다. ABC는 외부 검사자에게 객체의 특정 기능을 알리기 위해 객체의 상속 트리에 추가되는 Python 클래스입니다. `isinstance()`를 사용하여 테스트하며, 특정 ABC의 존재는 테스트 통과를 의미합니다.

ABC는 타입의 특징적인 동작을 설정하는 최소한의 메서드 집합을 정의합니다. ABC 타입에 따라 객체를 구별하는 코드는 해당 메서드가 항상 존재한다고 신뢰할 수 있습니다. 이러한 메서드는 ABC 문서에 설명된 일반화된 추상 의미 정의를 동반하며, 이는 강제되지는 않지만 강력히 권장됩니다.

### 명세 (Specification)

명세는 개요(Abstract)에 나열된 범주를 따릅니다.

*   `isinstance()` 및 `issubclass()`를 오버로드하는 방법.
*   "ABC 지원 프레임워크" 역할을 하는 새로운 `abc` 모듈.
*   컨테이너 및 이터레이터를 위한 특정 ABC를 `collections` 모듈에 추가.

#### `isinstance()` 및 `issubclass()` 오버로드

이 PEP의 개발 과정에서 우리는 더 세분화되거나 더 광범위한 ABC 중 하나를 선택하는 문제에 직면했습니다. 이 딜레마를 해결하기 위해, 메타클래스를 사용하여 ABC를 "가상 기본 클래스(virtual base class)"(C++의 개념과는 다름)로 다른 클래스나 ABC에 추가할 수 있도록 제안합니다.

이를 통해 표준 라이브러리는 `Sequence` 및 `MutableSequence` ABC를 정의하고 `basestring`, `tuple`, `list`와 같은 내장 타입(built-in types)에 대한 가상 기본 클래스로 등록할 수 있습니다. 예를 들어, 다음 조건은 모두 참이 됩니다.

```python
isinstance([], Sequence)
issubclass(list, Sequence)
issubclass(list, MutableSequence)
isinstance((), Sequence)
not issubclass(tuple, MutableSequence)
isinstance("", Sequence)
issubclass(bytearray, MutableSequence)
```


주요 메커니즘은 내장 함수 `isinstance()` 및 `issubclass()`의 오버로드를 허용하는 것입니다.

*   `isinstance(x, C)` 호출 시, `C.__instancecheck__`가 존재하면 일반 구현 대신 `C.__instancecheck__(x)`를 호출합니다.
*   `issubclass(D, C)` 호출 시, `C.__subclasscheck__`가 존재하면 일반 구현 대신 `C.__subclasscheck__(D)`를 호출합니다.

#### `abc` 모듈: ABC 지원 프레임워크

새로운 표준 라이브러리 모듈 `abc`는 순수 Python으로 작성되었으며 ABC 지원 프레임워크 역할을 합니다. 이 모듈은 메타클래스 `ABCMeta`와 데코레이터 `@abstractmethod` 및 `@abstractproperty`를 정의합니다.

`ABCMeta` 클래스는 `__instancecheck__` 및 `__subclasscheck__`를 오버라이드하고 `register` 메서드를 정의합니다. `B.register(C)` 호출 후, `issubclass(C, B)`는 `True`를 반환하며, `isinstance(x, B)`는 `issubclass(x.__class__, B)` 또는 `issubclass(type(x), B)`와 동등하게 됩니다.

예를 들면 다음과 같습니다.

```python
from abc import ABCMeta

class MyABC(metaclass=ABCMeta):
    pass

MyABC.register(tuple)
assert issubclass(tuple, MyABC)
assert isinstance((), MyABC)
```


`abc` 모듈은 또한 추상 메서드를 선언하는 데 사용되는 `@abstractmethod` 데코레이터를 정의합니다. 이 데코레이터로 선언되었지만 아직 오버라이드되지 않은 메서드를 하나 이상 포함하는 클래스는 인스턴스화될 수 없습니다.

```python
from abc import ABCMeta, abstractmethod

class A(metaclass=ABCMeta):
    @abstractmethod
    def foo(self):
        pass

A() # TypeError 발생
```


`@abstractproperty`라는 두 번째 데코레이터는 추상 데이터 속성을 정의하기 위해 사용됩니다.

```python
class C(metaclass=ABCMeta):
    # 읽기 전용 속성 (A read-only property):
    @abstractproperty
    def readonly(self):
        return self.__x

    # 읽기-쓰기 속성 (A read-write property) (데코레이터 문법을 사용할 수 없음):
    def getx(self):
        return self.__x
    def setx(self, value):
        self.__x = value
    x = abstractproperty(getx, setx)
```


추상 메서드와 마찬가지로, 추상 속성을 상속받는 서브클래스(subclass)는 해당 추상 속성을 구체적인 속성으로 오버라이드하지 않으면 인스턴스화될 수 없습니다.

#### 컨테이너 및 이터레이터를 위한 ABC

`collections` 모듈은 집합(sets), 매핑(mappings), 시퀀스(sequences) 및 이터레이터, 딕셔너리 뷰(dictionary views)와 같은 도우미 타입(helper types)과 함께 작동하는 데 필요한 ABC를 정의합니다. 모든 ABC는 `ABCMeta`를 메타클래스로 가집니다.

ABC는 기술적으로 유효하지만 거의 쓸모없는 추상 메서드 구현을 제공합니다(예: `__hash__`는 `0` 반환, `__iter__`는 빈 이터레이터 반환). 일부 ABC는 또한 구체적인(non-abstract) 메서드를 제공하며, 이러한 ABC는 "믹스인(mix-in)" 클래스로 간주될 수 있습니다.

**참고:** 정렬 연산(`__lt__`, `__le__`, `__ge__`, `__gt__`)을 위한 ABC는 없습니다.

**단일 메서드 ABC (One Trick Ponies)**
*   **`Hashable`**: `__hash__`를 정의하는 클래스를 위한 기본 클래스입니다.
*   **`Iterable`**: `__iter__`를 정의하는 클래스를 위한 기본 클래스입니다.
*   **`Iterator`**: `__next__`를 정의하는 클래스를 위한 기본 클래스이며 `Iterable`에서 파생됩니다. (`Iterable`과 `Iterator`의 차이점에 유의해야 합니다.)
*   **`Sized`**: `__len__`을 정의하는 클래스를 위한 기본 클래스입니다.
*   **`Container`**: `__contains__`를 정의하는 클래스를 위한 기본 클래스입니다.

**집합 (Sets)**
*   **`Set`**: `Sized`, `Iterable`, `Container`의 서브클래스입니다. 집합은 각 요소가 한 번만 나타나고, 부등식 연산(subset/superset 테스트)을 구현하는 연산자를 정의합니다.
*   **`MutableSet`**: 요소를 추가하고 제거하는 연산을 구현하는 `Set`의 서브클래스입니다. `.add(x)`, `.discard(x)`, `.pop()`, `.toggle(x)`, `.clear()` 메서드를 포함합니다.

**매핑 (Mappings)**
*   **`Mapping`**: `Container`, `Iterable`, `Sized`의 서브클래스입니다. `.__getitem__(key)`, `.get(key, default=None)`, `.__contains__(key)`, `.__len__()`, `.__iter__()`, `.keys()`, `.items()`, `.values()` 등의 메서드를 포함합니다.
*   **`MutableMapping`**: `Mapping`의 서브클래스로, `__setitem__`, `__delitem__`과 같은 추상 메서드와 `pop`, `popitem`, `clear`, `update`와 같은 구체적인 변경 메서드를 구현합니다.

**시퀀스 (Sequences)**
*   **`Sequence`**: `Iterable`, `Sized`, `Container`의 서브클래스입니다. `__getitem__` 추상 메서드를 정의하며, 이는 정수로 호출될 때 요소를 반환하고, 슬라이스 객체로 호출될 때 다른 `Sequence`를 반환합니다.
*   **`MutableSequence`**: `Sequence`의 서브클래스로, `__setitem__`, `__delitem__`, `insert`와 같은 추상 변경 메서드와 `append`, `reverse`, `extend`, `pop`, `remove`와 같은 구체적인 변경 메서드를 추가합니다.

**문자열 (Strings)**
Python 3000은 `bytes`(`MutableSequence`에서 파생)와 `str`(`Sequence` 및 `Hashable`에서 파생) 두 가지 내장 문자열 타입을 가질 것으로 예상됩니다.

### ABC와 대안들 (ABCs vs. Alternatives)

#### ABC와 덕 타이핑 (Duck Typing)

ABC의 도입이 덕 타이핑(Duck Typing)의 종말을 의미하지는 않습니다. Python은 `__getitem__` 메서드를 정의할 때 클래스가 특정 ABC에서 파생되도록 요구하지 않습니다. `hasattr(x, "__len__")`이 효과적이라면 여전히 사용할 수 있습니다. ABC는 Python 2에서 매핑과 시퀀스를 구별하는 것과 같이 기존에 좋은 해결책이 없었던 문제를 해결하기 위해 고안되었습니다.

#### ABC와 제네릭 함수 (Generic Functions)

ABC는 제네릭 함수(GFs)와 호환됩니다. ABC는 일반적인 클래스이므로, 제네릭 함수의 기본 구현에서 ABC를 사용하는 것은 매우 적절할 수 있습니다.

```python
@prettyprint.register(Set)
def pp_set(s):
    return "{" + ... + "}" # 세부 사항은 연습 문제로 남김
```


#### ABC와 인터페이스 (Interfaces)

ABC는 본질적으로 인터페이스와 비호환적이지 않지만, 상당한 중첩이 있습니다. "인터페이스"는 일반적인 클래스 계층 구조의 일부는 아니지만, 특정 유형의 상속 테스트를 허용하는 클래스에 추가되는 메타데이터 요소 집합에 대한 제안들을 의미합니다. 클래스에 가변 메타데이터를 첨부하는 아이디어의 단점은 클래스가 공유 상태이므로 이를 변경하면 의도 충돌로 이어질 수 있다는 것입니다.

### 참고 자료 (References)

문서의 원문 참고 자료를 참조해주세요.

### 저작권 (Copyright)

이 문서는 공공 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.