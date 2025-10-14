---
title: "[Draft] PEP 718 - Subscriptable functions"
excerpt: "Python Enhancement Proposal 718: 'Subscriptable functions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/718/
toc: true
toc_sticky: true
date: 2025-09-27 13:13:52+0900
last_modified_at: 2025-09-27 13:13:52+0900
published: true
---
> **원문 링크:** [PEP 718 - Subscriptable functions](https://peps.python.org/pep-0718/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 23-Jun-2023



# PEP 718 – Subscriptable functions (서브스크립트 가능한 함수)

## 개요 (Abstract)

이 PEP는 타이핑(typing) 목적으로 함수 객체(function objects)를 서브스크립트 가능하게 만드는 것을 제안합니다. 이를 통해 개발자는 타입 체커(type checker)가 생성하는 타입에 대해 명시적인 제어를 할 수 있게 됩니다. 이는 익명 함수의 파라미터 타입을 추론할 수 있는 양방향 추론(bi-directional inference)이나 특수화(specialisation)와 같은 기존 방식이 불충분한 경우에 특히 유용합니다. 또한, 이 제안은 함수가 일반 클래스와 마찬가지로 서브스크립트(subscript)될 수 있도록 하여 일관성을 제공합니다.

## 동기 (Motivation)

현재 파이썬의 타입 시스템에는 제네릭(generic) 함수의 타입 파라미터를 추론하기 어렵거나 불가능한 몇 가지 상황이 있습니다. 이 PEP는 이러한 문제점들을 해결하고자 합니다.

### 알 수 없는 타입 (Unknown Types)

특정 상황에서 제네릭 함수의 타입 파라미터를 추론하는 것이 불가능합니다.

예를 들어:
```python
def make_list[T](*args: T) -> list[T]: ...
reveal_type(make_list()) # 타입 체커가 T에 대한 의미 있는 타입을 추론할 수 없음
```
`FunctionType` 인스턴스를 서브스크립트 가능하게 만들면, 이 생성자에 타입을 명시할 수 있습니다.

```python
reveal_type(make_list[int]()) # 타입은 list[int]
```
현재로서는 정확한 타입을 제공하기 위해 할당을 사용해야 합니다.

```python
x: list[int] = make_list()
reveal_type(x) # 타입은 list[int]
```
그러나 이 코드는 간단한 함수 호출을 위해 여러 줄을 차지하여 불필요하게 장황합니다.

유사하게, 다음 예시에서 `T`는 현재 의미 있게 추론될 수 없으므로, 추가적인 할당 없이는 `x`가 `untyped` 상태가 됩니다.

```python
def factory[T](func: Callable[[T], Any]) -> Foo[T]: ...
reveal_type(factory(lambda x: "Hello World" * x))
```
함수 객체가 서브스크립트 가능하다면, 더 구체적인 타입을 지정할 수 있습니다.

```python
reveal_type(factory[int](lambda x: "Hello World" * x)) # 타입은 Foo[int]
```

### 결정 불가능한 추론 (Undecidable Inference)

일부 경우에는 서브클래스(subclass) 관계 때문에 타입 추론이 불가능할 수 있습니다. 그러나 함수를 특수화(specialise)할 수 있다면, 타입 체커는 의미 있는 타입을 추론할 수 있습니다.

```python
def foo[T](x: Sequence[T] | T) -> list[T]: ...
reveal_type(foo[bytes](b"hello"))
```
현재 타입 체커는 이러한 경우에 일관적으로 타입을 합성하지 못합니다.

### 해결 불가능한 타입 파라미터 (Unsolvable Type Parameters)

현재 특수화되지 않은 리터럴(unspecialised literals)의 경우, 다음과 같은 상황에서 타입을 결정하는 것이 불가능합니다.

```python
def foo[T](x: list[T]) -> T: ...
reveal_type(foo([])) # 타입 체커가 T를 추론할 수 없음 (다시 한번)
``````python
reveal_type(foo[int]([])) # 타입은 int
```
또한, 특정 타입이 함수에 미리 전달되어야 하는 경우에 이를 지정할 수 있다는 점도 유용합니다.

```python
words = ["hello", "world"]
foo[int](words) # Invalid: list[str]은 list[int]와 호환되지 않음
```
서브스크립션을 허용함으로써 함수와 메서드는 제네릭 클래스와 일관성을 갖게 됩니다. 제안된 모든 변경사항은 호출 가능한 제네릭 클래스를 사용하여 구현될 수 있지만, 문법적 설탕(syntactic sugar)은 매우 환영받을 것입니다.

이로 인해 함수를 특수화하고 새로운 팩토리(factory)로 사용하는 것이 가능합니다.

```python
make_int_list = make_list[int]
reveal_type(make_int_list()) # 타입은 list[int]
```

### 모노모피즘 및 재구현 (Monomorphisation and Reification)

이 제안은 또한 모노모피즘(monomorphisation)과 재구현된 타입(reified types)의 가능성을 열어줍니다.
이는 여러 번 요청되었던 기능의 문을 열어줄 수 있습니다.
**참고:** 이 기능 자체는 이 PEP에서 제안되는 것은 아니지만, 미래에 구현될 수 있습니다.

이러한 기능의 문법은 다음과 같을 수 있습니다.

```python
def foo[T](): return T.__value__
assert foo[int]() is int
```

## 근거 (Rationale)

이 PEP에서 "함수 객체(Function objects)"는 `FunctionType`, `MethodType`, `BuiltinFunctionType`, `BuiltinMethodType`, `MethodWrapperType`을 의미합니다.

`MethodType`의 경우 다음과 같이 작성할 수 있어야 합니다.

```python
class Foo:
    def make_list[T](self, *args: T) -> list[T]: ...
Foo().make_list[int]()
```
그리고 이는 `FunctionType`과 유사하게 작동해야 합니다.

`BuiltinFunctionType`의 경우, 내장 제네릭 함수(예: `max`와 `min`)가 파이썬에서 정의된 함수처럼 작동해야 합니다. 내장 함수는 가능한 한 파이썬으로 구현된 함수처럼 동작해야 합니다.

`BuiltinMethodType`은 `BuiltinFunctionType`과 동일한 타입입니다.

`MethodWrapperType` (예: `object().__str__`의 타입)은 제네릭 매직 메서드(generic magic methods)에 유용합니다.

## 명세 (Specification)

함수 객체는 런타임에 서브스크립션을 허용하기 위해 `__getitem__`을 구현해야 합니다. 이는 `__origin__`이 호출 가능한 객체(callable)로 설정되고 `__args__`가 전달된 타입으로 설정된 `types.GenericAlias` 인스턴스를 반환해야 합니다.

타입 체커는 함수 서브스크립션을 지원해야 하며, 함수 서브스크립션에 전달되는 파라미터가 제네릭 호출 가능 클래스(generic callable class)와 동일한 규칙을 따라야 한다는 것을 이해해야 합니다.

### `__orig_class__` 설정

현재 `__orig_class__`는 `GenericAlias.__call__`에서 호출된 클래스를 생성한 `GenericAlias`의 인스턴스로 설정되는 속성입니다. 예를 들어:

```python
class Foo[T]: ...
assert Foo[int]().__orig_class__ == Foo[int]
```
현재 `__orig_class__`는 무조건적으로(unconditionally) 설정됩니다. 그러나 생성된 인스턴스에서 잠재적인 타입 소거(type erasure)를 방지하기 위해, `__origin__`이 어떤 함수 객체의 인스턴스인 경우에는 이 속성을 설정해서는 안 됩니다.

다음 코드 스니펫은 이 변경 없이는 런타임에 실패할 것입니다. 왜냐하면 `__orig_class__`가 `Foo[int]`가 아니라 `bar[str]`이 될 것이기 때문입니다.

```python
def bar[U](): return Foo[int]()
assert bar[str]().__orig_class__ == Foo[int]
```

### `@typing.overload`와의 상호작용

오버로드(overload)된 함수는 런타임 타입에 영향을 미치지 않으므로 기존과 거의 동일하게 작동해야 합니다. 유일한 변경 사항은 더 많은 상황에서 타입이 결정 가능해지고, 오버로드의 순서나 유니온(unions)에 맡기는 대신 개발자가 동작/오버로드를 명시적으로 지정할 수 있게 된다는 것입니다.

## 하위 호환성 (Backwards Compatibility)

현재 이러한 클래스들은 서브클래싱(subclassing)이 불가능하므로, 이미 `__getitem__`을 구현하고 있는 클래스와 관련하여 하위 호환성 문제는 없습니다.

## 참조 구현 (Reference Implementation)

제안된 런타임 변경 사항은 다음에서 확인할 수 있습니다:
[https://github.com/Gobot1234/cpython/tree/function-subscript](https://github.com/Gobot1234/cpython/tree/function-subscript)

## 감사의 글 (Acknowledgements)

이 PEP에 대한 피드백을 제공해준 Alex Waygood와 Jelle Zijlstra, 그리고 동기를 부여하는 예시를 제공해준 Guido에게 감사드립니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되거나 CC0-1.0-Universal 라이선스(둘 중 더 자유로운 것)가 적용됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.