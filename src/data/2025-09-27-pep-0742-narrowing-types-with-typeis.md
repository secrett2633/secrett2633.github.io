---
title: "[Final] PEP 742 - Narrowing types with TypeIs"
excerpt: "Python Enhancement Proposal 742: 'Narrowing types with TypeIs'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/742/
toc: true
toc_sticky: true
date: 2025-09-27 13:33:17+0900
last_modified_at: 2025-09-27 13:33:17+0900
published: true
---
> **원문 링크:** [PEP 742 - Narrowing types with TypeIs](https://peps.python.org/pep-0742/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 07-Feb-2024


# PEP 742 – `TypeIs`를 사용한 타입 내로잉

**저자:** Jelle Zijlstra
**상태:** Final
**타입:** Standards Track - Typing
**생성일:** 2024년 2월 7일
**Python 버전:** 3.13

## 개요 (Abstract)

이 PEP는 새로운 특수 형태인 `TypeIs`를 제안합니다. `TypeIs`는 빌트인 함수 `isinstance()`와 유사하게 값의 타입을 내로잉하는 데 사용될 수 있는 함수에 주석(annotate)을 달 수 있도록 합니다. 기존의 `typing.TypeGuard` 특수 형태와 달리, `TypeIs`는 조건문의 `if`와 `else` 두 브랜치(branches) 모두에서 타입을 내로잉할 수 있습니다.

## 동기 (Motivation)

타입이 지정된 Python 코드에서는 조건문을 기반으로 변수의 타입을 내로잉해야 하는 경우가 많습니다. 예를 들어, 함수가 두 가지 타입의 유니온(union)을 받을 때, `isinstance()` 검사를 사용하여 두 타입을 구별할 수 있습니다. 타입 체커(type checkers)는 일반적으로 다양한 빌트인 함수 및 연산자를 기반으로 타입 내로잉을 지원하지만, 때로는 사용자 정의 함수를 사용하여 타입 내로잉을 수행하는 것이 유용할 수 있습니다.

이러한 사용 사례를 지원하기 위해 PEP 647은 `typing.TypeGuard` 특수 형태를 도입하여 사용자가 타입 가드(type guards)를 정의할 수 있도록 했습니다.

```python
from typing import assert_type, TypeGuard

def is_str(x: object) -> TypeGuard[str]:
    return isinstance(x, str)

def f(x: object) -> None:
    if is_str(x):
        assert_type(x, str)
    else:
        assert_type(x, object)
```

그러나 `typing.TypeGuard`의 동작 방식에는 몇 가지 한계가 있어 많은 일반적인 사용 사례에 덜 유용합니다. 특히 다음과 같은 문제가 있습니다:
*   타입 체커는 타입 가드가 `True`를 반환하는 경우, `TypeGuard`의 반환 타입을 정확히 내로잉된 타입으로 사용해야 합니다. 변수의 타입에 대한 기존 지식을 활용할 수 없습니다.
*   타입 가드가 `False`를 반환하는 경우, 타입 체커는 추가적인 내로잉을 적용할 수 없습니다.

예를 들어, 표준 라이브러리 함수 `inspect.isawaitable()`은 인자가 `awaitable` 객체인지 여부를 반환하며, `typeshed`는 현재 다음과 같이 주석되어 있습니다:

```python
def isawaitable(object: object) -> TypeGuard[Awaitable[Any]]: ...
```

이 함수의 동작에 대해 `mypy`에 보고된 이슈가 있었는데, 사용자는 다음 동작을 관찰했습니다:

```python
import inspect
from collections.abc import Awaitable
from typing import reveal_type, Any

async def f(t: Awaitable[int] | int) -> None:
    if inspect.isawaitable(t):
        reveal_type(t) # Awaitable[Any]
    else:
        reveal_type(t) # Awaitable[int] | int
```

이 동작은 PEP 647과 일치하지만, 사용자의 기대와는 달랐습니다. 사용자는 `if` 브랜치에서는 `t`의 타입이 `Awaitable[int]`로, `else` 브랜치에서는 `int`로 내로잉되기를 기대했습니다. 이 PEP는 정확히 그러한 동작을 제공하는 새로운 구문을 제안합니다.

`TypeGuard`의 현재 동작으로 인해 발생한 다른 문제들의 예시는 다음과 같습니다:
*   Python 타이핑 이슈 (`numpy.isscalar`)
*   Python 타이핑 이슈 (`dataclasses.is_dataclass()`)
*   Pyright 이슈 (`typing.TypeGuard`가 `isinstance()`처럼 작동하기를 기대)
*   Pyright 이슈 (`else` 브랜치에서의 내로잉 기대)
*   Mypy 이슈 (`else` 브랜치에서의 내로잉 기대)
*   Mypy 이슈 (여러 `TypeGuard` 결합)
*   Mypy 이슈 (`else` 브랜치에서의 내로잉 기대)
*   Mypy 이슈 (사용자 정의 함수가 `inspect.isawaitable()`과 유사)
*   Typeshed 이슈 (`asyncio.iscoroutinefunction`)

## 근거 (Rationale)

`typing.TypeGuard`의 현재 동작과 관련된 문제들은 타입 시스템을 개선하여 다른 타입 내로잉 동작을 허용하도록 강제합니다. PEP 724는 기존 `typing.TypeGuard` 구문의 동작을 변경할 것을 제안했지만, 해당 변경으로 인한 하위 호환성(backwards compatibility) 문제가 너무 심각하다고 판단했습니다. 대신, 원하는 시맨틱(semantics)을 가진 새로운 특수 형태를 추가할 것을 제안합니다.

이로 인해 유사한 목적과 시맨틱을 가진 두 가지 구문이 존재하게 되는 안타까운 상황이 발생함을 인지하고 있습니다. 그러나 이 PEP에서 제안하는 새로운 형태인 `TypeIs`의 동작이 사용자들에게 더 유용할 가능성이 높다고 생각하며, 따라서 `TypeGuard`보다 `TypeIs`를 더 일반적으로 적용 가능한 도구로 문서에서 강조해야 한다고 권장합니다. 하지만 `TypeGuard`의 시맨틱도 때때로 유용하므로, 이를 더 이상 사용하지 않도록 권고(deprecate)하거나 제거할 것을 제안하지는 않습니다. 장기적으로는 대부분의 사용자가 `TypeIs`를 사용하고, `TypeGuard`는 그 동작이 특별히 요구되는 드문 경우에만 사용되어야 합니다.

## 사양 (Specification)

새로운 특수 형태인 `TypeIs`가 `typing` 모듈에 추가됩니다. `TypeIs`의 사용법, 동작 및 런타임 구현은 `typing.TypeGuard`와 유사합니다.

`TypeIs`는 단일 인자를 받으며 함수의 반환 타입으로 사용될 수 있습니다. `TypeIs`를 반환하도록 주석된 함수를 타입 내로잉 함수(type narrowing function)라고 합니다. 타입 내로잉 함수는 `bool` 값을 반환해야 하며, 타입 체커는 모든 반환 경로가 `bool`을 반환하는지 확인해야 합니다.

타입 내로잉 함수는 하나 이상의 위치 인자(positional argument)를 받아야 합니다. 타입 내로잉 동작은 함수에 전달된 첫 번째 위치 인자에 적용됩니다. 함수는 추가 인자를 받을 수 있지만, 이들은 타입 내로잉의 영향을 받지 않습니다. 타입 내로잉 함수가 인스턴스 메서드(instance method) 또는 클래스 메서드(class method)로 구현된 경우, 첫 번째 위치 인자는 두 번째 매개변수(`self` 또는 `cls` 다음)에 매핑됩니다.

### 타입 내로잉 동작 (Type narrowing behavior)

`TypeIs`의 동작을 명시하기 위해 다음 용어를 사용합니다:

*   `I` = `TypeIs` 입력 타입 (TypeIs input type)
*   `R` = `TypeIs` 반환 타입 (TypeIs return type)
*   `A` = 타입 내로잉 함수에 전달된 인자의 타입 (내로잉 전) (Type of argument passed to type narrowing function (pre-narrowed))
*   `NP` = 내로잉된 타입 (긍정; `TypeIs`가 `True`를 반환할 때 사용) (Narrowed type (positive; used when TypeIs returned True))
*   `NN` = 내로잉된 타입 (부정; `TypeIs`가 `False`를 반환할 때 사용) (Narrowed type (negative; used when TypeIs returned False))

```python
def narrower(x: I) -> TypeIs[R]: ...

def func1(val: A):
    if narrower(val):
        assert_type(val, NP)
    else:
        assert_type(val, NN)
```

반환 타입 `R`은 `I`와 일관되어야 합니다. 이 조건이 충족되지 않으면 타입 체커는 오류를 발생시켜야 합니다.

공식적으로, `NP` 타입은 `A`와 `R`의 교집합(intersection)인 `A∧R`로 내로잉되어야 하고, `NN` 타입은 `A`와 `R`의 보수(complement)의 교집합인 `A∧¬R`로 내로잉되어야 합니다. 실제로는 엄격한 타입 가드에 대한 이론적인 타입은 Python 타입 시스템에서 정확하게 표현될 수 없습니다. 타입 체커는 이러한 타입에 대한 실용적인 근사치를 사용해야 합니다. 경험적으로, 타입 체커는 `isinstance()`를 처리하는 것과 동일한 타입 내로잉 로직을 사용하고 일관된 결과를 얻어야 합니다. 이 지침은 향후 타입 시스템이 확장될 경우 변경 및 개선을 허용합니다.

### 예시 (Examples)

타입 내로잉은 긍정적인 경우와 부정적인 경우 모두에 적용됩니다:

```python
from typing import TypeIs, assert_type

def is_str(x: object) -> TypeIs[str]:
    return isinstance(x, str)

def f(x: str | int) -> None:
    if is_str(x):
        assert_type(x, str)
    else:
        assert_type(x, int)
```

최종 내로잉된 타입은 인자의 이전에 알려진 타입의 제약 조건 때문에 `R`보다 더 좁을 수 있습니다:

```python
from collections.abc import Awaitable
from typing import Any, TypeIs, assert_type
import inspect

def isawaitable(x: object) -> TypeIs[Awaitable[Any]]:
    return inspect.isawaitable(x)

def f(x: Awaitable[int] | int) -> None:
    if isawaitable(x):
        # 타입 체커는 더 정확한 타입인 "Awaitable[int] | (int & Awaitable[Any])"를 추론할 수도 있습니다.
        assert_type(x, Awaitable[int])
    else:
        assert_type(x, int)
```

입력 타입과 일관되지 않는 타입으로 내로잉하는 것은 오류입니다:

```python
from typing import TypeIs

def is_str(x: int) -> TypeIs[str]:
    # 타입 체커 오류 발생
    ...
```

### 서브타이핑 (Subtyping)

`TypeIs`는 콜백 프로토콜(callback protocols) 및 `Callable` 특수 형태와 같이 호출 가능한(callable) 객체의 반환 타입으로도 유효합니다. 이러한 맥락에서 `TypeIs`는 `bool`의 서브타입(subtype)으로 취급됩니다. 예를 들어, `Callable[..., TypeIs[int]]`는 `Callable[..., bool]`에 할당 가능(assignable)합니다.

`TypeGuard`와 달리, `TypeIs`는 인자 타입에 대해 불변(invariant)입니다: `B`가 `A`의 서브타입이더라도 `TypeIs[B]`는 `TypeIs[A]`의 서브타입이 아닙니다. 그 이유를 설명하기 위해 다음 예시를 고려해보세요:

```python
from typing import Callable, TypeIs

def takes_narrower(x: int | str, narrower: Callable[[object], TypeIs[int]]):
    if narrower(x):
        print(x + 1)  # x는 int
    else:
        print("Hello " + x) # x는 str

def is_bool(x: object) -> TypeIs[bool]:
    return isinstance(x, bool)

takes_narrower(1, is_bool) # 오류: is_bool은 TypeIs[int]가 아님
```
(`bool`은 `int`의 서브타입임에 유의하십시오.) 이 코드는 런타임에 실패합니다. 왜냐하면 `narrower`가 `False`를 반환하고 (`1`은 `bool`이 아니므로) `takes_narrower()`에서 `else` 브랜치가 실행되기 때문입니다. 만약 `takes_narrower(1, is_bool)` 호출이 허용되었다면, 타입 체커는 이 오류를 감지하지 못했을 것입니다.

## 하위 호환성 (Backwards Compatibility)

이 PEP는 새로운 특수 형태만을 제안하므로, 하위 호환성에 대한 영향은 없습니다.

## 보안 고려사항 (Security Implications)

알려진 보안 고려사항은 없습니다.

## 교육 방법 (How to Teach This)

타입 힌팅에 대한 입문 자료는 타입 내로잉을 논의할 때 `isinstance()`와 같은 다른 내로잉 구문과 함께 `TypeIs`를 다루어야 합니다. 문서는 `typing.TypeGuard`보다 `TypeIs`를 강조해야 합니다. 후자가 더 이상 사용되지 않는 것은 아니며 그 동작이 때때로 유용하지만, `TypeIs`의 동작이 일반적으로 더 직관적이며 대부분의 사용자가 `TypeIs`를 먼저 선택할 것으로 예상합니다.

### `TypeIs` 사용 시점 (When to use TypeIs)

Python 코드는 종종 `isinstance()`와 같은 함수를 사용하여 값의 가능한 다양한 타입들을 구별합니다. 타입 체커는 `isinstance()` 및 다양한 다른 검사들을 이해하고 이를 사용하여 변수의 타입을 내로잉합니다. 그러나 때로는 더 복잡한 검사를 여러 곳에서 재사용하거나, 타입 체커가 이해하지 못하는 검사를 사용하는 경우가 있습니다. 이러한 경우, `TypeIs` 함수를 정의하여 검사를 수행하고 타입 체커가 이를 사용하여 변수의 타입을 내로잉할 수 있도록 할 수 있습니다.

`TypeIs` 함수는 단일 인자를 받아 `TypeIs[T]`를 반환하도록 주석됩니다. 여기서 `T`는 내로잉하려는 타입입니다. 함수는 인자가 `T` 타입과 호환되면 `True`를, 그렇지 않으면 `False`를 반환해야 합니다. 이 함수는 `isinstance()`를 사용하는 것과 마찬가지로 `if` 검사에서 사용될 수 있습니다. 예를 들면 다음과 같습니다:

```python
from typing import TypeIs, Literal

type Direction = Literal["N", "E", "S", "W"]

def is_direction(x: str) -> TypeIs[Direction]:
    return x in {"N", "E", "S", "W"}

def maybe_direction(x: str) -> None:
    if is_direction(x):
        print(f"{x} is a cardinal direction")
    else:
        print(f"{x} is not a cardinal direction")
```

### 안전한 `TypeIs` 함수 작성 (Writing a safe TypeIs function)

`TypeIs` 함수를 사용하면 타입 체커의 타입 내로잉 동작을 재정의할 수 있습니다. 이는 강력한 도구이지만, 잘못 작성된 `TypeIs` 함수는 불건전한(unsound) 타입 검사로 이어질 수 있고 타입 체커가 이러한 오류를 감지할 수 없기 때문에 위험할 수 있습니다.

`TypeIs[T]`를 반환하는 함수가 안전하려면, 인자가 타입 `T`와 호환되는 경우에만 `True`를 반환해야 하고, 그렇지 않으면 `False`를 반환해야 합니다. 이 조건이 충족되지 않으면 타입 체커는 잘못된 타입을 추론할 수 있습니다.

다음은 올바른(`Correct`) 및 잘못된(`Incorrect`) `TypeIs` 함수의 예시입니다:

```python
from typing import TypeIs

# 올바름 (Correct)
def good_typeis(x: object) -> TypeIs[int]:
    return isinstance(x, int)

# 잘못됨: 모든 int에 대해 True를 반환하지 않음 (Incorrect: does not return True for all ints)
def bad_typeis1(x: object) -> TypeIs[int]:
    return isinstance(x, int) and x > 0

# 잘못됨: 일부 비-int 값에 대해 True를 반환함 (Incorrect: returns True for some non-ints)
def bad_typeis2(x: object) -> TypeIs[int]:
    return isinstance(x, (int, float))
```

다음 함수는 잘못 작성된 `TypeIs` 함수를 사용할 때 발생할 수 있는 일부 오류를 보여줍니다. 이러한 오류는 타입 체커에 의해 감지되지 않습니다:

```python
def caller(x: int | str, y: int | float) -> None:
    if bad_typeis1(x):  # int로 내로잉됨
        print(x + 1)
    else:  # str로 내로잉됨 (잘못됨)
        print("Hello " + x) # x가 음의 int일 경우 런타임 오류 발생
    if bad_typeis2(y):  # int로 내로잉됨
        # 잘못된 TypeIs 때문에, y가 float일 경우 런타임에 이 브랜치가 실행됩니다.
        print(y.bit_count()) # 런타임 오류: 이 메서드는 int에만 존재하고 float에는 없습니다.
    else:  # float으로 내로잉됨 (런타임에 결코 실행되지 않음)
        pass
```

다음은 더 복잡한 타입에 대한 올바른 `TypeIs` 함수의 예시입니다:

```python
from typing import TypedDict, TypeIs

class Point(TypedDict):
    x: int
    y: int

def is_point(x: object) -> TypeIs[Point]:
    return (
        isinstance(x, dict) and
        all(isinstance(key, str) for key in x) and
        "x" in x and "y" in x and
        isinstance(x["x"], int) and
        isinstance(x["y"], int)
    )
```

### `TypeIs`와 `TypeGuard` (TypeIs and TypeGuard)

`TypeIs`와 `typing.TypeGuard`는 모두 사용자 정의 함수를 기반으로 변수의 타입을 내로잉하기 위한 도구입니다. 둘 다 인자를 받아 입력 인자가 내로잉된 타입과 호환되는지 여부에 따라 불리언(boolean)을 반환하는 함수에 주석을 달 수 있습니다. 이러한 함수는 `if` 검사에서 변수의 타입을 내로잉하는 데 사용될 수 있습니다.

`TypeIs`는 일반적으로 가장 직관적인 동작을 가지지만, 더 많은 제한을 도입합니다. `TypeGuard`는 다음 경우에 사용하기에 적절한 도구입니다:
*   `list[object]`에서 `list[int]`와 같이 입력 타입과 호환되지 않는 타입으로 내로잉하려는 경우. `TypeIs`는 호환되는 타입 간에만 내로잉을 허용합니다.
*   함수가 내로잉된 타입과 호환되는 모든 입력 값에 대해 `True`를 반환하지 않는 경우. 예를 들어, 양의 정수에 대해서만 `True`를 반환하는 `TypeGuard[int]`를 가질 수 있습니다.

`TypeIs`와 `TypeGuard`는 다음과 같은 방식으로 다릅니다:
*   `TypeIs`는 내로잉된 타입이 입력 타입의 서브타입이어야 하는 반면, `TypeGuard`는 그렇지 않습니다.
*   `TypeGuard` 함수가 `True`를 반환할 때, 타입 체커는 변수의 타입을 `TypeGuard` 타입과 정확히 일치하도록 내로잉합니다. `TypeIs` 함수가 `True`를 반환할 때, 타입 체커는 변수의 이전에 알려진 타입과 `TypeIs` 타입을 결합하여 더 정밀한 타입을 추론할 수 있습니다 (기술적으로는 교집합(intersection type)으로 알려져 있습니다).
*   `TypeGuard` 함수가 `False`를 반환할 때, 타입 체커는 변수의 타입을 전혀 내로잉할 수 없습니다. `TypeIs` 함수가 `False`를 반환할 때, 타입 체커는 변수의 타입에서 `TypeIs` 타입을 제외하도록 내로잉할 수 있습니다.

이러한 동작은 다음 예시에서 볼 수 있습니다:

```python
from typing import TypeGuard, TypeIs, reveal_type, final

class Base: ...
class Child(Base): ...
@final
class Unrelated: ...

def is_base_typeguard(x: object) -> TypeGuard[Base]:
    return isinstance(x, Base)

def is_base_typeis(x: object) -> TypeIs[Base]:
    return isinstance(x, Base)

def use_typeguard(x: Child | Unrelated) -> None:
    if is_base_typeguard(x):
        reveal_type(x) # Base
    else:
        reveal_type(x) # Child | Unrelated

def use_typeis(x: Child | Unrelated) -> None:
    if is_base_typeis(x):
        reveal_type(x) # Child
    else:
        reveal_type(x) # Unrelated
```

## 참조 구현 (Reference Implementation)

`TypeIs` 특수 형태는 `typing_extensions` 모듈에 구현되었으며 `typing_extensions 4.10.0`에서 릴리스될 예정입니다.

여러 타입 체커에서 구현이 가능합니다:
*   Mypy: 풀 리퀘스트 오픈
*   Pyanalyze: 풀 리퀘스트
*   Pyright: 버전 1.1.351에 추가됨

## 거부된 아이디어 (Rejected Ideas)

### `TypeGuard`의 동작 변경 (Change the behavior of TypeGuard)

PEP 724는 이전에 `typing.TypeGuard`의 지정된 동작을 변경하여 가드의 반환 타입이 입력 타입과 일관성이 있다면 `TypeIs`에 대해 여기서 제안된 동작이 적용되도록 제안했습니다. 이 제안은 몇 가지 중요한 장점이 있었습니다. 런타임 변경이 필요 없으므로 타입 체커에서만 변경이 필요하여 사용자가 새롭고 일반적으로 더 직관적인 동작을 쉽게 활용할 수 있게 해줍니다.

그러나 이 접근 방식에는 몇 가지 주요 문제가 있습니다. PEP 647에 지정된 기존 시맨틱을 기대하며 `TypeGuard` 함수를 작성한 사용자들은 타입 체커가 코드를 해석하는 방식에서 미묘하고 잠재적으로 호환성을 깨뜨리는(breaking changes) 변경을 겪을 수 있습니다. `TypeGuard`의 분할된 동작, 즉 반환 타입이 입력 타입과 일관성이 있는 경우와 없는 경우에 다르게 작동하는 방식은 사용자에게 혼란을 줄 수 있습니다. 타이핑 위원회(Typing Council)는 PEP 724에 찬성하는 합의에 도달하지 못했고, 그 결과 이 대안적인 PEP를 제안하게 되었습니다.

### 아무것도 하지 않음 (Do nothing)

이 PEP와 PEP 724에서 제안된 대안 모두 단점을 가지고 있습니다. 후자의 단점은 위에서 논의되었습니다. 이 PEP의 경우, 매우 유사한 시맨틱을 가진 두 가지 특수 형태를 도입하며, 현재 `TypeGuard`를 사용하고 있지만 다른 내로잉 시맨틱이 더 나은 사용자들에게 잠재적으로 긴 마이그레이션 경로를 만들 수 있습니다.

따라서 한 가지 방법은 아무것도 하지 않고 타입 시스템의 현재 한계에 만족하는 것입니다. 그러나 "동기" 섹션에서 설명한 현재 `TypeGuard`의 한계는 타입 시스템을 변경하여 해결할 가치가 있을 만큼 중요하다고 생각합니다. 아무런 변경도 하지 않으면 사용자들은 `TypeGuard`에서 동일한 비직관적인 동작을 계속해서 경험하게 될 것이며, 타입 시스템은 `inspect.isawaitable`과 같은 일반적인 타입 내로잉 함수를 제대로 표현할 수 없을 것입니다.

### 대체 이름 (Alternative names)

이 PEP는 현재 `TypeIs`라는 이름을 제안하고 있으며, `TypeIs[T]` 특수 형태가 인자가 `T` 타입인지 여부를 반환한다는 점을 강조하고 TypeScript의 구문을 반영합니다. 이 PEP의 이전 버전에서도 다른 이름들이 고려되었습니다.

고려되었던 옵션들은 다음과 같습니다:
*   `IsInstance` (Paul Moore의 게시물): 새로운 구문이 빌트인 `isinstance()`와 유사하게 작동한다는 점을 강조합니다.
*   `Narrowed` 또는 `NarrowedTo`: `TypeNarrower`보다 짧지만 "type narrowing"과의 연결을 유지합니다 (Eric Traut 제안).
*   `Predicate` 또는 `TypePredicate`: 이 기능에 대한 TypeScript의 이름인 "type predicates"를 반영합니다.
*   `StrictTypeGuard` (PEP 724의 초기 초안): 새로운 구문이 `typing.TypeGuard`보다 더 엄격한 버전의 타입 내로잉을 수행한다는 점을 강조합니다.
*   `TypeCheck` (Nicolas Tessore의 게시물): 검사의 이진적(binary) 성격을 강조합니다.
*   `TypeNarrower`: 함수가 인자 타입을 내로잉한다는 점을 강조합니다. 이 PEP의 이전 버전에서 사용되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.