---
title: "[Final] PEP 696 - Type Defaults for Type Parameters"
excerpt: "Python Enhancement Proposal 696: 'Type Defaults for Type Parameters'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/696/
toc: true
toc_sticky: true
date: 2025-09-27 13:04:16+0900
last_modified_at: 2025-09-27 13:04:16+0900
published: true
---
> **원문 링크:** [PEP 696 - Type Defaults for Type Parameters](https://peps.python.org/pep-0696/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 14-Jul-2022

PEP 696 – 타입 파라미터의 기본값 (Type Defaults for Type Parameters)

## 개요
이 PEP (Python Enhancement Proposal)는 `TypeVar`, `ParamSpec`, `TypeVarTuple`을 포함한 타입 파라미터에 '타입 기본값 (type defaults)' 개념을 도입합니다. 이는 특정 타입이 지정되지 않았을 때 타입 파라미터에 대한 기본값으로 작동합니다.

C++, TypeScript, Rust와 같은 일부 인기 있는 언어에서는 이미 기본 타입 인자(default type argument)를 지원하고 있습니다. PEP 695의 작성자가 몇몇 일반적인 언어의 타입 파라미터 문법에 대한 조사를 수행했으며, 그 내용은 해당 PEP의 부록 A에서 확인할 수 있습니다.

## 동기 (Motivation)
타입 파라미터의 기본값은 제네릭(Generic) 타입을 사용할 때 명시적인 타입 인자를 제공하지 않아도 되도록 하여 코드의 가독성과 사용 편의성을 높입니다.

**예시 1: `TypeVar` 기본값**
`T = TypeVar("T", default=int)`는 `T`에 대한 타입이 지정되지 않으면 `int`로 간주됩니다.

```python
T = TypeVar("T", default=int) # 타입이 지정되지 않으면 T는 int로 간주됩니다.
@dataclass
class Box(Generic[T]):
    value: T | None = None

reveal_type(Box()) # type은 Box[int]입니다.
reveal_type(Box(value="Hello World!")) # type은 Box[str]입니다.
```

**예시 2: `Generator`의 타입 정의 개선**
`Generator`와 같은 내장 타입의 스텁(stub) 정의를 개선하는 데 유용합니다.

```python
YieldT = TypeVar("YieldT")
SendT = TypeVar("SendT", default=None)
ReturnT = TypeVar("ReturnT", default=None)

class Generator(Generic[YieldT, SendT, ReturnT]):
    ...

Generator[int] == Generator[int, None] == Generator[int, None, None]
```

**예시 3: 특정 타입이 주로 사용되는 제네릭**
일반적으로 하나의 타입에 대해 제네릭하게 사용되는 경우에도 유용합니다.

```python
class Bot: ...
BotT = TypeVar("BotT", bound=Bot, default=Bot)
class Context(Generic[BotT]):
    bot: BotT

class MyBot(Bot): ...

reveal_type(Context().bot) # type은 Bot입니다. (현재는 Any가 될 수 있음)
reveal_type(Context[MyBot]().bot) # type은 MyBot입니다.
```

이 기능은 명시적으로 타입을 사용하는 개발자뿐만 아니라, 자동 완성 기능을 사용하여 개발 속도를 높이는 비-타이핑 사용자에게도 도움이 됩니다.

이러한 설계 패턴은 `discord.py` (위 예시 출처), `NumPy` (`ndarray`의 `dtype` 기본값이 `float64`가 되도록 함), `TensorFlow` (`Tensor` 및 `Layer` 정의 간소화)와 같은 프로젝트에서 흔히 나타납니다.

## 명세 (Specification)

### 기본값 순서 및 서브스크립션 규칙 (Default Ordering and Subscription Rules)
기본값이 없는 타입 파라미터는 기본값이 있는 타입 파라미터 뒤에 올 수 없습니다. 이는 `TypeError`를 발생시키고, 타입 체커(type checker)는 이를 오류로 플래그해야 합니다.

```python
DefaultStrT = TypeVar("DefaultStrT", default=str)
T = TypeVar("T")

class NonDefaultFollowsDefault(Generic[DefaultStrT, T]): ... # 유효하지 않음: 기본값이 없는 TypeVar는 기본값이 있는 TypeVar 뒤에 올 수 없습니다.

class NoNonDefaults(Generic[DefaultStrT, DefaultIntT]): ...
# NoNoneDefaults == NoNoneDefaults[str] == NoNoneDefaults[str, int] (모두 유효)

class OneDefault(Generic[T, DefaultBoolT]): ...
# OneDefault[float] == OneDefault[float, bool] (유효)
reveal_type(OneDefault) # type is type[OneDefault[T, DefaultBoolT = bool]]
reveal_type(OneDefault[float]()) # type is OneDefault[float, bool]
```

PEP 695에서 도입된 Python 3.12의 새로운 제네릭 문법에서는 이 규칙이 컴파일 타임에 강제됩니다.

```python
type Alias[DefaultT = int, T] = tuple[DefaultT, T] # SyntaxError
def generic_func[DefaultT = int, T](x: DefaultT, y: T) -> None: ... # SyntaxError
class GenericClass[DefaultT = int, T]: ... # SyntaxError
```

### `ParamSpec` 기본값 (ParamSpec Defaults)
`ParamSpec`의 기본값은 `TypeVar`와 동일한 문법을 사용하지만, 단일 타입 대신 타입 리스트, 줄임표(`...`) 리터럴 또는 다른 스코프 내의 `ParamSpec`을 사용합니다.

```python
DefaultP = ParamSpec("DefaultP", default=[str, int])
class Foo(Generic[DefaultP]): ...
reveal_type(Foo) # type is type[Foo[DefaultP = [str, int]]]
reveal_type(Foo()) # type is Foo[[str, int]]
reveal_type(Foo[[bool, bool]]()) # type is Foo[[bool, bool]]
```

### `TypeVarTuple` 기본값 (TypeVarTuple Defaults)
`TypeVarTuple`의 기본값은 `TypeVar`와 동일한 문법을 사용하지만, 단일 타입 대신 언팩된(unpacked) 튜플 타입 또는 다른 스코프 내의 `TypeVarTuple`을 사용합니다.

```python
DefaultTs = TypeVarTuple("DefaultTs", default=Unpack[tuple[str, int]])
class Foo(Generic[*DefaultTs]): ...
reveal_type(Foo) # type is type[Foo[DefaultTs = *tuple[str, int]]]
reveal_type(Foo()) # type is Foo[str, int]
reveal_type(Foo[int, bool]()) # type is Foo[int, bool]
```

### 다른 타입 파라미터를 기본값으로 사용 (Using Another Type Parameter as default)
이 기능을 통해 제네릭의 타입 파라미터가 누락되었지만 다른 타입 파라미터가 지정된 경우 해당 값을 재사용할 수 있습니다. 다른 타입 파라미터를 기본값으로 사용하려면 기본값과 타입 파라미터가 동일한 타입이어야 합니다.

```python
StartT = TypeVar("StartT", default=int)
StopT = TypeVar("StopT", default=StartT) # StopT의 기본값은 StartT를 따릅니다.
StepT = TypeVar("StepT", default=int | None)

class slice(Generic[StartT, StopT, StepT]): ...

reveal_type(slice()) # type is slice[int, int, int | None]
reveal_type(slice[str]()) # type is slice[str, str, int | None]
```

**스코프 규칙 (Scoping Rules)**
`T1`이 `T2`의 기본값으로 사용되는 경우, `T1`은 제네릭의 파라미터 리스트에서 `T2`보다 먼저 사용되어야 합니다. 외부 스코프의 타입 파라미터를 기본값으로 사용하는 것은 지원되지 않습니다.

**바운드 규칙 (Bound Rules)**
`T1`의 바운드(bound)는 `T2`의 바운드의 서브타입(subtype)이어야 합니다.

```python
T1 = TypeVar("T1", bound=int)
TypeVar("Ok", default=T1, bound=float) # 유효: int는 float의 서브타입입니다.
TypeVar("Invalid", default=T1, bound=str) # 유효하지 않음: int는 str의 서브타입이 아닙니다.
```

**제약 규칙 (Constraint Rules)**
`T2`의 제약 조건은 `T1`의 제약 조건의 슈퍼셋(superset)이어야 합니다.

```python
T1 = TypeVar("T1", bound=int)
TypeVar("Invalid", float, str, default=T1) # 유효하지 않음: 상위 바운드 int가 제약 조건 float 또는 str과 호환되지 않습니다.
```

### 제네릭의 파라미터로서의 타입 파라미터 (Type Parameters as Parameters to Generics)
기본값 내에서 제네릭의 파라미터로 타입 파라미터를 사용하는 것은 허용됩니다.

```python
T = TypeVar("T")
ListDefaultT = TypeVar("ListDefaultT", default=list[T])
class Bar(Generic[T, ListDefaultT]): ...

reveal_type(Bar[int]) # type is type[Bar[int, list[int]]]
reveal_type(Bar[int]()) # type is Bar[int, list[int]]
```

### 특수화 규칙 (Specialisation Rules)
타입 파라미터는 현재 더 이상 서브스크립션될 수 없습니다.

### 제네릭 `TypeAlias` (Generic TypeAlias es)
제네릭 `TypeAlias`는 일반적인 서브스크립션 규칙에 따라 추가로 서브스크립션될 수 있어야 합니다. 기본값이 재정의되지 않은 타입 파라미터는 `TypeAlias`에 대체된 것처럼 처리되지만, 나중에 추가 특수화가 가능합니다.

```python
MyAlias: TypeAlias = SomethingWithNoDefaults[int, DefaultStrT] # 유효
reveal_type(MyAlias[bool]()) # type is SomethingWithNoDefaults[int, bool]
```

### 서브클래싱 (Subclassing)
기본값이 있는 타입 파라미터를 가진 제네릭의 서브클래스는 `Generic TypeAlias`와 유사하게 작동합니다. 즉, 서브클래스는 일반 서브스크립션 규칙에 따라 추가 서브스크립션될 수 있으며, 재정의되지 않은 기본값은 대체되고, 해당 기본값을 가진 타입 파라미터는 나중에 추가 특수화가 가능합니다.

```python
class SubclassMe(Generic[T, DefaultStrT]): x: DefaultStrT
class Bar(SubclassMe[int, DefaultStrT]): ...
reveal_type(Bar()) # type is Bar[str]
reveal_type(Bar[bool]()) # type is Bar[bool]
```

### `bound`와 `default` 사용 (Using bound and default)
`bound`와 `default`가 모두 전달되면, `default`는 `bound`의 서브타입이어야 합니다. 그렇지 않으면 타입 체커가 오류를 발생시켜야 합니다.

```python
TypeVar("Ok", bound=float, default=int) # 유효: int는 float의 서브타입입니다.
TypeVar("Invalid", bound=str, default=int) # 유효하지 않음: 바운드와 기본값이 호환되지 않습니다.
```

### 제약 조건 (Constraints)
제약 조건이 있는 `TypeVar`의 경우, 기본값은 제약 조건 중 하나여야 합니다. 제약 조건 중 하나의 서브타입일지라도, 타입 체커는 오류를 발생시켜야 합니다.

```python
TypeVar("Ok", float, str, default=float) # 유효
TypeVar("Invalid", float, str, default=int) # 유효하지 않음: float 또는 str 중 하나를 예상했으나 int를 받았습니다.
```

### 함수 기본값 (Function Defaults)
제네릭 함수에서 타입 파라미터가 아무것도 해결되지 않을 때 타입 체커는 타입 파라미터의 기본값을 사용할 수 있습니다. 이 사용법의 의미론은 지정되지 않은 상태로 남아있습니다.

### `TypeVarTuple` 뒤에 오는 기본값 (Defaults following TypeVarTuple)
`TypeVarTuple` 바로 뒤에 오는 `TypeVar`는 기본값을 가질 수 없습니다. 이는 타입 인자가 `TypeVarTuple`에 바인딩되어야 하는지 또는 기본값이 있는 `TypeVar`에 바인딩되어야 하는지에 대한 모호성을 유발하기 때문입니다.

```python
Ts = TypeVarTuple("Ts")
T = TypeVar("T", default=bool)
class Foo(Generic[Ts, T]): ... # 타입 체커 오류

Foo[int, str, float] # Ts = (int, str, float), T = bool 또는 Ts = (int, str), T = float 로 해석될 수 있습니다.
```

Python 3.12의 내장 제네릭 문법에서는 이 경우 `SyntaxError`를 발생시켜야 합니다.
하지만, 기본값이 있는 `TypeVarTuple` 뒤에 기본값이 있는 `ParamSpec`이 오는 것은 허용됩니다. `ParamSpec`과 `TypeVarTuple`에 대한 타입 인자 사이에 모호성이 없기 때문입니다.

### 서브타이핑 (Subtyping)
타입 파라미터 기본값은 제네릭 클래스의 서브타이핑 규칙에 영향을 미치지 않습니다. 특히, 클래스가 제네릭 프로토콜과 호환되는지 여부를 고려할 때 기본값은 무시될 수 있습니다.

### 기본값으로서의 `TypeVarTuple` (TypeVarTuple s as Defaults)
`TypeVarTuple`을 기본값으로 사용하는 것은 지원되지 않습니다. 그 이유는 다음과 같습니다.
1. 스코프 규칙이 외부 스코프의 타입 파라미터 사용을 허용하지 않습니다.
2. PEP 646에 명시된 대로, 단일 객체의 타입 파라미터 리스트에 여러 `TypeVarTuple`이 나타날 수 없습니다.
이러한 이유로 현재 `TypeVarTuple`이 다른 `TypeVarTuple`의 기본값으로 사용될 수 있는 유효한 위치는 없습니다.

### 바인딩 규칙 (Binding rules)
타입 파라미터 기본값은 속성 접근(호출 및 서브스크립션 포함)에 의해 바인딩되어야 합니다.

```python
class Foo[T = int]:
    def meth(self) -> Self:
        return self
reveal_type(Foo.meth) # type is (self: Foo[int]) -> Foo[int]
```

## 구현 (Implementation)
런타임(runtime) 시에는 `typing` 모듈에 다음과 같은 변경 사항이 필요합니다.
- `TypeVar`, `ParamSpec`, `TypeVarTuple` 클래스는 `default`로 전달된 타입을 노출해야 합니다. 이는 `__default__` 속성으로 제공되며, 인자가 전달되지 않으면 `None`, `default=None`이면 `NoneType`이 됩니다.
- `GenericAlias`에는 다음 변경 사항이 필요합니다.
    - 서브스크립션에 필요한 기본값을 결정하는 로직
    - 서브스크립션 (`Generic[T, DefaultT]`)이 유효한지 결정하는 로직
- 타입 파라미터 리스트의 문법이 기본값을 허용하도록 업데이트되어야 합니다.

런타임 변경 사항에 대한 참조 구현은 [https://github.com/Gobot1234/cpython/tree/pep-696](https://github.com/Gobot1234/cpython/tree/pep-696)에서, 타입 체커 구현은 [https://github.com/Gobot1234/mypy/tree/TypeVar-defaults](https://github.com/Gobot1234/mypy/tree/TypeVar-defaults)에서 확인할 수 있습니다.
Pyright는 현재 이 기능을 지원합니다.

### 문법 변경 (Grammar changes)
PEP 695에서 추가된 문법은 대괄호 안에 `=` 연산자를 사용하여 타입 파라미터의 기본값을 지정하는 방식으로 확장됩니다.

```python
# TypeVars
class Foo[T = str]: ...
# ParamSpecs
class Baz[**P = [int, str]]: ...
# TypeVarTuples
class Qux[*Ts = *tuple[int, bool]]: ...
# TypeAliases
type Foo[T, U = str] = Bar[T, U]
```

타입 파라미터의 바운드(bound)와 마찬가지로, 기본값은 게으르게(lazily) 평가되며, 불필요한 따옴표 사용을 피하기 위해 동일한 스코프 규칙을 따릅니다.

컴파일러는 기본값이 없는 타입 파라미터가 기본값이 있는 타입 파라미터 뒤에 올 수 없으며, 기본값이 있는 `TypeVar`가 `TypeVarTuple` 바로 뒤에 올 수 없도록 강제합니다.

## 채택되지 않은 대안 (Rejected Alternatives)

### `type.__new__`의 ` **kwargs`에 타입 파라미터 기본값을 전달 (Allowing the Type Parameters Defaults to Be Passed to type.__new__'s ** kwargs)
이 방식은 가독성이 좋고 `TypeVar` 단항(unary) 문법과 유사하지만, `T`가 이미 메타클래스/슈퍼클래스에 전달되거나 런타임에 `Generic`을 상속하지 않는 클래스를 지원할 수 있으므로 하위 호환성이 없습니다.

```python
T = TypeVar("T")
@dataclass
class Box(Generic[T], T=int): # 제안되었던 대안
    value: T | None = None
```

### 기본값 뒤에 비-기본값 허용 (Allowing Non-defaults to Follow Defaults)
기본값이 있는 타입 파라미터 뒤에 기본값이 없는 타입 파라미터가 오는 것을 허용하는 것은 혼란스럽고 잠재적으로 모호합니다. 인자 순서를 변경하는 것은 많은 코드베이스를 망가뜨릴 수 있으며, 대부분 `TypeAlias`를 사용하여 해결할 수 있습니다.

### `default`가 암시적으로 `bound`가 되도록 허용 (Having default Implicitly Be bound)
초기 버전의 이 PEP에서는 `default` 값이 전달되지 않으면 `bound`로 암시적으로 설정되었습니다. 이는 편리할 수 있지만, 기본값이 없는 타입 파라미터가 기본값이 있는 타입 파라미터 뒤에 오는 경우를 발생시킬 수 있습니다. 또한 `Any`가 암시적 기본값인 경우에 의존하는 소수의 코드베이스에 대한 변경 사항이 될 수 있었습니다.

### 함수 시그니처에서 기본값을 가진 타입 파라미터 사용 허용 (Allowing Type Parameters With Defaults To Be Used in Function Signatures)
이전 버전에서는 함수 시그니처에서 기본값을 가진 `TypeVarLike` 사용이 허용되었지만, "Function Defaults" 섹션에 설명된 이유로 제거되었습니다.

### 외부 스코프의 타입 파라미터를 `default`로 허용 (Allowing Type Parameters from Outer Scopes in default)
이 기능은 추가적인 복잡성만큼의 가치가 없는 너무 틈새(niche) 기능으로 간주되었습니다.

## 감사 (Acknowledgements)
이 PEP에 대한 피드백을 제공해 준 Eric Traut, Jelle Zijlstra, Joshua Butt, Danny Yamamoto, Kaylynn Morgan, Jakub Kuczys에게 감사를 표합니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.