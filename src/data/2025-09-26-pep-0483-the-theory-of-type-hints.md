---
title: "[Final] PEP 483 - The Theory of Type Hints"
excerpt: "Python Enhancement Proposal 483: 'The Theory of Type Hints'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/483/
toc: true
toc_sticky: true
date: 2025-09-26 22:28:39+0900
last_modified_at: 2025-09-26 22:28:39+0900
published: true
---
> **원문 링크:** [PEP 483 - The Theory of Type Hints](https://peps.python.org/pep-0483/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 19-Dec-2014

## PEP 483 – 타입 힌트의 이론 (The Theory of Type Hints)

### 개요 (Abstract)
이 PEP는 PEP 484에서 참조되는 타입 이론을 설명합니다.

### 서론 (Introduction)
이 문서는 Python 3.5를 위한 새로운 타입 힌트 제안의 이론적 배경을 제시합니다. 아직 많은 세부 사항이 확정되어야 하므로 완전한 제안이나 명세는 아니지만, 더 자세한 명세를 논의하기 어렵게 만드는 이론적 기반을 제공합니다. 타입 이론의 기본 개념을 상기하는 것으로 시작하여, 점진적 타이핑(gradual typing)을 설명하고, 일반적인 규칙을 제시하며, 어노테이션(annotations)에 사용될 수 있는 새로운 특별한 타입(예: `Union`)을 정의합니다. 마지막으로 제네릭 타입(generic types)에 대한 접근 방식과 타입 힌트의 실용적인 측면을 정의합니다.

### 표기 규칙 (Notational conventions)
*   `t1`, `t2` 등과 `u1`, `u2` 등은 타입을 나타냅니다.
*   `T`, `U` 등은 `TypeVar()`로 정의되는 타입 변수(type variables)입니다.
*   PEP 8 규칙에 따라 객체, `class` 문으로 정의된 클래스 및 인스턴스가 표기됩니다.
*   이 PEP의 맥락에서 타입에 적용되는 `==` 기호는 두 표현식이 동일한 타입을 나타냄을 의미합니다.
*   PEP 484는 타입(타입 체커를 위한 개념)과 클래스(런타임 개념)를 구분하지만, 이 PEP는 타입 체커 구현의 유연성을 위해 불필요하게 엄격한 구분을 피합니다.

### 배경 (Background)
문헌에는 타입 개념에 대한 다양한 정의가 있습니다. 여기서는 타입을 값들의 집합과 이 값들에 적용할 수 있는 함수들의 집합으로 가정합니다.

특정 타입을 정의하는 방법은 여러 가지가 있습니다.
*   **모든 값을 명시적으로 나열하여 정의:** 예: `True`와 `False`는 `bool` 타입을 형성합니다.
*   **타입 변수와 함께 사용할 수 있는 함수를 지정하여 정의:** 예: `__len__` 메서드를 가진 모든 객체는 `Sized` 타입을 형성합니다. `[1, 2, 3]`과 `'abc'` 모두 `len` 함수를 호출할 수 있으므로 이 타입에 속합니다.
*   **간단한 클래스 정의:** 예: `class UserID(int): pass` 와 같이 클래스를 정의하면, 이 클래스의 모든 인스턴스 또한 하나의 타입을 형성합니다.

사용자가 타입 체커가 이해할 수 있는 형태로 타입을 정의할 수 있는 것이 중요합니다. 이 PEP의 목표는 PEP 3107 구문을 사용하여 변수 및 함수의 타입 어노테이션을 위한 체계적인 타입 정의 방식을 제안하는 것입니다. 이러한 어노테이션은 다양한 종류의 버그를 방지하고, 문서화 목적으로, 또는 프로그램 실행 속도를 높이는 데 사용될 수 있습니다. 여기서는 정적 타입 체커(static type checker)를 사용하여 버그를 방지하는 데 중점을 둡니다.

### 서브타입 관계 (Subtype relationships)
정적 타입 체커에 있어 중요한 개념은 서브타입(subtype) 관계입니다. 이는 `first_var`가 `first_type`이고 `second_var`가 `second_type`일 때, `first_var = second_var` 할당이 안전한지 여부에서 발생합니다.

안전하다고 볼 수 있는 강력한 기준은 다음과 같습니다.
1.  `second_type`의 모든 값이 `first_type`의 값 집합에도 포함됩니다.
2.  `first_type`의 모든 함수가 `second_type`의 함수 집합에도 포함됩니다.

이 정의에 따르면:
*   모든 타입은 자기 자신의 서브타입입니다.
*   서브타이핑 과정에서 값 집합은 작아지고, 함수 집합은 커집니다.

**직관적인 예시:** 모든 `Dog`는 `Animal`이며, `Dog`는 `bark`와 같은 더 많은 함수를 가집니다. 따라서 `Dog`는 `Animal`의 서브타입입니다. 반대로 `Animal`은 `Dog`의 서브타입이 아닙니다.

**더 형식적인 예시:** `int`는 `float`의 서브타입입니다. 모든 정수는 실수이며, 정수는 비트 시프트 `<<`, `>>`와 같은 더 많은 연산을 지원합니다.

**까다로운 예시:** `List[int]` (정수만 포함하는 리스트 타입)는 `List[float]` (실수만 포함하는 리스트 타입)의 서브타입이 아닙니다. 첫 번째 서브타이핑 조건은 만족하지만, 실수를 추가하는 작업은 `List[float]`에서만 가능하므로 두 번째 조건이 실패합니다.

타입 체커에 서브타입 정보를 선언하는 두 가지 일반적인 접근 방식이 있습니다.
*   **명목적 서브타이핑 (Nominal subtyping):** 타입 트리가 클래스 트리를 기반으로 합니다. 즉, `UserID`는 `int`의 서브타입으로 간주됩니다. 파이썬에서는 호환되지 않는 방식으로 속성을 오버라이드할 수 있으므로, 이 접근 방식은 타입 체커의 제어 하에 사용되어야 합니다.
    ```python
    class Base:
        answer = '42' # type: str
    class Derived(Base):
        answer = 5 # should be marked as error by type checker
    ```
*   **구조적 서브타이핑 (Structural subtyping):** 서브타입 관계가 선언된 메서드로부터 추론됩니다. 즉, `UserID`와 `int`는 동일한 타입으로 간주될 수 있습니다. 이 방식이 더 유연하다고 여겨집니다.

### 점진적 타이핑 요약 (Summary of gradual typing)
점진적 타이핑(Gradual typing)은 프로그램의 일부에만 어노테이션을 달아 동적 타이핑과 정적 타이핑의 장점을 모두 활용할 수 있도록 합니다.

새로운 관계인 `is-consistent-with`를 정의하는데, 이는 `is-subtype-of`와 유사하지만, 새로운 타입 `Any`가 포함될 때 전이적(transitive)이지 않습니다. `a_value`의 타입이 `a_variable`의 타입과 일치(consistent)하면 `a_value`를 `a_variable`에 할당하는 것은 허용됩니다. (`is-consistent-with` 관계는 대칭적이지 않습니다.) `is-consistent-with` 관계는 세 가지 규칙으로 정의됩니다.
1.  타입 `t1`이 타입 `t2`의 서브타입이면, `t1`은 `t2`와 일치합니다.
2.  `Any`는 모든 타입과 일치합니다. (하지만 `Any`가 모든 타입의 서브타입인 것은 아닙니다.)
3.  모든 타입은 `Any`와 일치합니다. (하지만 모든 타입이 `Any`의 서브타입인 것은 아닙니다.)

`Any`는 모든 값과 모든 메서드를 가진 타입으로 간주될 수 있습니다. 이는 타입 계층 구조의 상단(모든 값을 가짐)과 하단(모든 메서드를 가짐)에 부분적으로 `Any`를 위치시킵니다. `object`와 대조적으로, `object`는 대부분의 타입과 일치하지 않습니다. 즉, 인자를 어노테이션할 때 `Any`와 `object` 모두 "어떤 타입이든 허용됨"을 의미하지만, `Any`만 어떤 타입이 예상되든 전달될 수 있습니다 (본질적으로 `Any`는 동적 타이핑으로의 폴백(fallback)을 선언하고 정적 체커의 불평을 침묵시킵니다).

**예시:**
`Employee` 클래스와 그 서브클래스 `Manager`가 있다고 가정합니다.
```python
class Employee: ...
class Manager(Employee): ...

worker: Employee = Employee() # worker 변수는 Employee 타입으로 선언
worker = Manager() # OK (규칙 1: Manager는 Employee의 서브타입)

boss: Manager = Manager()
# boss = Employee() # 정적 검사 실패 (Employee는 Manager의 서브타입이 아님)

something: Any = some_func() # something 변수는 Any 타입으로 선언
worker = something # OK (규칙 2: Any는 모든 타입과 일치)

something = worker # OK (규칙 3: 모든 타입은 Any와 일치)
```

### 타입과 클래스 (Types vs. Classes)
파이썬에서 클래스는 `class` 문으로 정의되고 `type(obj)` 내장 함수에 의해 반환되는 객체 팩토리입니다. 클래스는 동적이고 런타임 개념입니다.
타입 개념은 위에서 설명되었으며, 변수 및 함수의 타입 어노테이션에 나타나고, 아래 설명된 구성 요소를 사용하여 구성될 수 있으며, 정적 타입 체커에서 사용됩니다.

모든 클래스는 타입입니다. 그러나 주어진 타입의 의미를 정확하게 나타내는 클래스를 구현하는 것은 까다롭고 오류 발생 가능성이 높으며, PEP 484의 목표가 아닙니다. PEP 484에 설명된 정적 타입은 런타임 클래스와 혼동되어서는 안 됩니다.
**예시:**
*   `int`는 클래스이자 타입입니다.
*   `UserID`는 클래스이자 타입입니다.
*   `Union[str, int]`는 타입이지만, 적절한 클래스는 아닙니다.
    ```python
    class MyUnion(Union[str, int]): ... # TypeError 발생
    Union[str, int]() # TypeError 발생
    ```

`typing` 인터페이스는 클래스로 구현됩니다. 즉, 런타임에 `Generic[T].__bases__` 등을 평가할 수 있습니다. 그러나 클래스와 타입 간의 구분을 강조하기 위해 다음 일반 규칙이 적용됩니다.
*   아래에 정의된 타입(예: `Any`, `Union` 등)은 인스턴스화할 수 없으며, 시도하면 `TypeError`가 발생합니다. (단, `Generic`의 비추상 서브클래스는 가능합니다.)
*   `Generic` 및 그로부터 파생된 클래스를 제외하고는 아래에 정의된 타입을 서브클래싱할 수 없습니다.
*   `isinstance` 또는 `issubclass`에 나타나면 `TypeError`가 발생합니다 (매개변수화되지 않은 제네릭 제외).

### 기본 구성 요소 (Fundamental building blocks)
*   **`Any`** : 모든 타입은 `Any`와 일치하며, `Any` 또한 모든 타입과 일치합니다.
*   **`Union[t1, t2, …]`** : `t1` 등의 최소한 하나 이상의 서브타입인 타입들이 이 `Union`의 서브타입이 됩니다.
    *   인수의 순서는 중요하지 않습니다.
    *   중첩된 `Union`은 평탄화됩니다.
    *   `ti`와 `tj`가 서브타입 관계에 있다면, 덜 구체적인(less specific) 타입이 남습니다.
    *   `Union[t1]`은 `t1`을 반환합니다.
    *   `Union[]`은 허용되지 않습니다.
    *   `Union[..., object, ...]`은 `object`를 반환합니다.
*   **`Optional[t1]`** : `Union[t1, None]`의 별칭입니다.
*   **`Tuple[t1, t2, …, tn]`** : 항목들이 `t1` 등의 인스턴스인 튜플입니다.
    *   길이가 같고 각 `ui`가 `ti`의 서브타입이면 `Tuple[u1, ..., um]`은 `Tuple[t1, ..., tn]`의 서브타입입니다.
    *   빈 튜플은 `Tuple[()]`로 표기합니다.
    *   가변 길이의 동종 튜플 타입은 `Tuple[t1, ...]`으로 작성할 수 있습니다.
*   **`Callable[[t1, t2, …, tn], tr]`** : 위치 인자 타입이 `t1` 등이고 반환 타입이 `tr`인 함수입니다.
    *   인자 목록은 비어 있을 수 있습니다 (`n==0`).
    *   선택적(optional) 인자나 키워드 인자를 나타낼 방법은 없지만, `Callable[..., tr]` (리터럴 생략 부호)를 사용하여 인자 목록이 완전히 검사되지 않음을 나타낼 수 있습니다.
*   **`Intersection[t1, t2, …]` (제안 예정):** `t1` 등의 각 타입의 서브타입인 타입들이 이 `Intersection`의 서브타입이 됩니다.

### 제네릭 타입 (Generic types)
위에서 정의된 기본 구성 요소들은 제네릭 방식으로 새로운 타입을 구성할 수 있게 합니다. 제네릭 타입 생성자(generic type constructor)는 타입을 인자로 받아 타입을 "반환"하는 것과 유사한 의미를 가집니다.

**컨테이너 클래스:** `list` 또는 `dict`와 같은 컨테이너 클래스는 일반적으로 특정 타입의 값만 포함합니다. 따라서 다음과 같이 타입 어노테이션을 달 수 있습니다.
```python
users: list[UserID] = []
users.append(UserID(42)) # OK
# users.append('Some guy') # 타입 체커에 의해 거부되어야 함
```

이러한 상황에서 타입 어노테이션을 허용하기 위해, 내장 컨테이너 및 컨테이너 추상 베이스 클래스는 타입 매개변수(type parameters)로 확장되어 제네릭 타입 생성자처럼 동작합니다. 제네릭 타입 생성자처럼 동작하는 클래스를 제네릭 타입(generic types)이라고 합니다.
```python
from typing import Iterable
class Task: ...
def work(todo_list: Iterable[Task]) -> None: ...
```
여기서 `Iterable`은 `Task`라는 구체적인 타입을 받아 `Iterable[Task]`라는 구체적인 타입을 반환하는 제네릭 타입입니다.

**제네릭 함수:** 타입 변수(type variables)를 사용하여 제네릭 함수의 타입 어노테이션을 허용합니다.
```python
def take_first(seq: Sequence[T]) -> T: # 제네릭 함수
    return seq[0]

accumulator: int = 0
accumulator += take_first([1, 2, 3]) # 안전함, T는 int로 추론됨
# accumulator += take_first((2.7, 3.5)) # 안전하지 않음
```

### 타입 변수 (Type variables)
타입 변수는 타입 어노테이션에서 광범위하게 사용됩니다. 타입 체커의 타입 추론(type inference) 내부 메커니즘도 일반적으로 타입 변수를 기반으로 합니다.

*   `X = TypeVar('X')`: 고유한 타입 변수를 선언합니다. 이름은 변수 이름과 일치해야 합니다. 기본적으로 타입 변수는 모든 가능한 타입을 범위로 가집니다.
    ```python
    T = TypeVar('T')
    def do_nothing(one_arg: T, other_arg: T) -> None: pass
    do_nothing(1, 2) # OK, T는 int
    do_nothing('abc', UserID(42)) # OK, T는 object
    ```

*   `Y = TypeVar('Y', t1, t2, ...)`: `t1` 등으로 제한된 타입 변수입니다. `Union[t1, t2, ...]`와 유사하게 동작합니다. 제약이 있는 타입 변수는 `t1` 등 제약 내에서만 범위를 가지며, 제약의 서브클래스는 `t1` 등 중에서 가장 파생된 베이스 클래스로 대체됩니다.
    ```python
    AnyStr = TypeVar('AnyStr', str, bytes)
    def longest(first: AnyStr, second: AnyStr) -> AnyStr:
        return first if len(first) >= len(second) else second

    result = longest('a', 'abc') # result의 추론된 타입은 str
    # result = longest('a', b'abc') # 정적 타입 검사 실패
    ```
    이 예시에서 `longest()`의 두 인수는 모두 동일한 타입(`str` 또는 `bytes`)이어야 하며, 공통 `str` 서브클래스의 인스턴스라 할지라도 반환 타입은 여전히 `str`입니다.

### 제네릭 타입 정의 및 사용 (Defining and using generic types)
사용자는 `Generic`이라는 특별한 구성 요소를 사용하여 자신의 클래스를 제네릭 타입으로 선언할 수 있습니다. `class MyGeneric(Generic[X, Y, ...]): ...` 정의는 타입 변수 `X`, `Y` 등을 통해 `MyGeneric`이라는 제네릭 타입을 정의합니다. `MyGeneric` 자체는 매개변수화(parameterizable)될 수 있습니다.
```python
class CustomQueue(Generic[T]):
    def put(self, task: T) -> None: ...
    def get(self) -> T: ...

def communicate(queue: CustomQueue[str]) -> Optional[str]: ...
```

제네릭 타입에서 파생된 클래스는 제네릭이 됩니다. 클래스는 여러 제네릭 타입을 서브클래싱할 수 있습니다. 그러나 제네릭에 의해 반환된 특정 타입에서 파생된 클래스는 제네릭이 아닙니다.

타입 변수가 생략된 상태로 타입 어노테이션에 제네릭 타입이 나타나면 `Any`로 가정됩니다. 이러한 형태는 동적 타이핑으로의 폴백으로 사용될 수 있으며 `issubclass` 및 `isinstance`와 함께 사용이 허용됩니다. 모든 인스턴스의 타입 정보는 런타임에 지워집니다.

### 공변성 (Covariance) 및 반변성 (Contravariance)
`t2`가 `t1`의 서브타입일 때, 제네릭 타입 생성자 `GenType`은 다음과 같이 불립니다.
*   **공변 (Covariant):** 모든 `t1`, `t2`에 대해 `GenType[t2]`가 `GenType[t1]`의 서브타입인 경우.
*   **반변 (Contravariant):** 모든 `t1`, `t2`에 대해 `GenType[t1]`이 `GenType[t2]`의 서브타입인 경우.
*   **불변 (Invariant):** 위 두 가지 모두 해당하지 않는 경우.

**실제 예시:**
*   **`Union`** 은 모든 인자에서 공변적으로 동작합니다.
*   **`FrozenSet[T]`** 는 공변입니다. `int`는 `float`의 서브타입이고, `FrozenSet[int]`의 값 집합은 `FrozenSet[float]`의 값 집합의 명확한 부분집합이기 때문에 `FrozenSet[int]`는 `FrozenSet[float]`의 서브타입입니다.
*   **`List[T]`** 는 불변입니다. `List[int]`의 값 집합이 `List[float]`의 값 집합의 부분집합이더라도, `List[int]`에는 `int`만 추가할 수 있기 때문에 `List[int]`는 `List[float]`의 서브타입이 아닙니다. 이는 가변(mutable) 타입에서 전형적인 상황입니다.
*   **`Callable`** 타입은 반환 타입에는 공변이지만, 인자에는 반변입니다.
    *   `Callable[[], int]`는 `Callable[[], float]`의 서브타입입니다.
    *   `Callable[[float], None]`는 `Callable[[int], None]`의 서브타입입니다.
    즉, `Manager`에 대한 급여를 계산할 수 있는 함수가 예상되는 상황에서 `Employee`에 대한 급여를 계산할 수 있는 `Callable[[Employee], Decimal]`도 허용됩니다.

사용자 정의 제네릭 타입에 대한 공변성/반변성은 매개변수로 사용되는 타입 변수의 정의에서 `covariant=True` 또는 `contravariant=True` 특수 키워드를 사용하여 선언할 수 있습니다. 타입은 기본적으로 불변입니다.
```python
T_co = TypeVar('T_co', covariant=True)
class Box(Generic[T_co]): # 이 타입은 공변으로 선언됨
    def __init__(self, content: T_co) -> None:
        self._content = content
    def get_content(self) -> T_co:
        return self._content

T_contra = TypeVar('T_contra', contravariant=True)
class Sink(Generic[T_contra]): # 이 타입은 반변으로 선언됨
    def send_to_nowhere(self, data: T_contra) -> None:
        # ...
```
분산은 타입 변수의 속성이 아니라 제네릭 타입의 속성입니다.

### 실용적인 측면 (Pragmatics)
몇 가지 사항은 이론과 무관하지만 실제 사용을 더 편리하게 만듭니다.
*   타입이 예상되는 곳에 `None` 대신 `type(None)`을 사용할 수 있습니다. 예: `Union[t1, None] == Union[t1, type(None)]`.
*   **타입 별칭 (Type aliases):**
    ```python
    Point = Tuple[float, float]
    def distance(point: Point) -> float: ...
    ```
*   **문자열을 통한 전방 참조 (Forward references):**
    ```python
    class MyComparable:
        def compare(self, other: 'MyComparable') -> int: ...
    ```
*   **제약되지 않은(unconstrained), 제약된(constrained), 또는 바운드된(bounded) `TypeVar` 선언:** `TypeVar('T', bound=complex)`와 같이 사용할 수 있습니다.
*   **주석 내 타입 선언 (Type declaration in comments):**
    ```python
    lst = [] # type: Sequence[int]
    ```
*   **`cast(T, obj)` 사용:** `zork = cast(Any, frobozz())`와 같이 사용할 수 있습니다.
*   오버로딩(overloading) 및 스텁 모듈(stub modules)과 같은 다른 사항은 PEP 484를 참조하십시오.

### `typing.py`에 미리 정의된 제네릭 타입 및 프로토콜 (Predefined generic types and Protocols in typing.py)
`typing.py` 모듈에서 제공되는 타입들은 다음과 같습니다.
*   `collections.abc`의 모든 것 (단, `Set`은 `AbstractSet`으로 이름 변경).
*   `Dict`, `List`, `Set`, `FrozenSet` 등.
*   `re.Pattern[AnyStr]`, `re.Match[AnyStr]`.
*   `io.IO[AnyStr]`, `io.TextIO ~ io.IO[str]`, `io.BinaryIO ~ io.IO[bytes]`.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.