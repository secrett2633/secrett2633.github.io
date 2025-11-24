---
title: "[Final] PEP 443 - Single-dispatch generic functions"
excerpt: "Python Enhancement Proposal 443: 'Single-dispatch generic functions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/443/
toc: true
toc_sticky: true
date: 2025-09-26 21:55:16+0900
last_modified_at: 2025-09-26 21:55:16+0900
published: true
---
> **원문 링크:** [PEP 443 - Single-dispatch generic functions](https://peps.python.org/pep-0443/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 22-May-2013



# PEP 443: Single-dispatch Generic Functions

## 개요 (Abstract)
이 PEP는 `functools` 표준 라이브러리 모듈에 "단일 디스패치 제네릭 함수(single-dispatch generic functions)"라고 알려진 간단한 형태의 제네릭 프로그래밍을 제공하는 새로운 메커니즘을 제안합니다.

**제네릭 함수(Generic function)**는 서로 다른 타입(type)에 대해 동일한 연산을 구현하는 여러 함수로 구성됩니다. 호출 시 어떤 구현을 사용할지는 디스패치(dispatch) 알고리즘에 의해 결정됩니다. 특히, 단일 인자(single argument)의 타입에 따라 구현이 선택될 때 이를 **단일 디스패치(single dispatch)**라고 합니다.

## 배경 및 목표 (Rationale and Goals)
Python은 `len()`, `iter()`, `pprint.pprint()`, `copy.copy()` 등 다양한 내장 및 표준 라이브러리 제네릭 함수를 제공해왔습니다. 그러나 현재는 다음과 같은 문제점이 있습니다:
*   개발자가 새로운 제네릭 함수를 생성하는 간단하거나 직접적인 방법이 없습니다.
*   기존 제네릭 함수에 메서드를 추가하는 표준적인 방법이 없습니다. (예: 일부는 등록 함수를 사용하고, 다른 일부는 `__special__` 메서드 정의를 요구하며, 경우에 따라 몽키 패치(monkeypatching)가 필요합니다.)

또한, Python 코드에서 객체에 대해 무엇을 할지 결정하기 위해 수신된 인자의 타입을 검사하는 것이 일반적인 안티 패턴(anti-pattern)입니다. 예를 들어, 어떤 타입의 객체 또는 해당 타입 객체의 시퀀스를 받아들이고 싶을 때, 현재는 타입 검사를 통해 처리하는 것이 "명백한 방법"이지만, 이는 취약하고 확장성이 떨어집니다.

`Abstract Base Classes (ABC)`는 현재 동작을 쉽게 파악할 수 있도록 돕지만, 새로운 동작을 추가하는 데는 도움이 되지 않습니다. 이미 작성된 라이브러리를 사용하는 개발자는 해당 코드가 자신의 객체를 처리하는 방식을 변경할 수 없을 수 있으며, 특히 서드 파티(third-party)에서 생성된 객체를 사용하는 경우 더욱 그렇습니다.

따라서 이 PEP는 데코레이터(decorator)를 사용하여 동적 오버로딩(dynamic overloading)을 처리하기 위한 통일된 API를 제안합니다.

## 사용자 API (User API)
제네릭 함수를 정의하려면 `@singledispatch` 데코레이터를 사용합니다. 디스패치는 첫 번째 인자의 타입에 따라 발생합니다.

```python
from functools import singledispatch

@singledispatch
def fun(arg, verbose=False):
    if verbose:
        print("Let me just say,", end=" ")
    print(arg)
```
오버로드(overloaded)된 구현을 함수에 추가하려면 제네릭 함수의 `register()` 속성을 사용합니다. 이는 타입 파라미터(type parameter)를 받고 해당 타입에 대한 연산을 구현하는 함수를 데코레이트하는 데코레이터입니다.

```python
@fun.register(int)
def _(arg, verbose=False):
    if verbose:
        print("Strength in numbers, eh?", end=" ")
    print(arg)

@fun.register(list)
def _(arg, verbose=False):
    if verbose:
        print("Enumerate this:")
    for i, elem in enumerate(arg):
        print(i, elem)
```
람다(lambda) 함수나 이미 존재하는 함수를 등록하려면 `register()` 속성을 함수 형태로 사용할 수 있습니다.

```python
def nothing(arg, verbose=False):
    print("Nothing.")

fun.register(type(None), nothing)
```
`register()` 속성은 데코레이트되지 않은 함수를 반환합니다. 이를 통해 데코레이터 스태킹(stacking), 피클링(pickling), 그리고 각 변형에 대한 독립적인 단위 테스트(unit test) 생성이 가능합니다.

```python
from decimal import Decimal

@fun.register(float)
@fun.register(Decimal)
def fun_num(arg, verbose=False):
    if verbose:
        print("Half of your number:", end=" ")
    print(arg / 2)

fun_num is fun # False
```
호출될 때, 제네릭 함수는 첫 번째 인자의 타입에 따라 디스패치됩니다.

```python
fun("Hello, world.")
# Hello, world.
fun("test.", verbose=True)
# Let me just say, test. test.
fun(42, verbose=True)
# Strength in numbers, eh? 42
fun(['spam', 'spam', 'eggs', 'spam'], verbose=True)
# Enumerate this:
# 0 spam
# 1 spam
# 2 eggs
# 3 spam
fun(None)
# Nothing.
fun(1.23)
# 0.615
```
특정 타입에 대한 등록된 구현이 없는 경우, 해당 타입의 메서드 결정 순서(Method Resolution Order, MRO)를 사용하여 더 일반적인 구현을 찾습니다. `@singledispatch`로 데코레이트된 원본 함수는 `object` 타입에 등록되어 있으며, 이는 더 나은 구현이 없을 때 사용됩니다.

주어진 타입에 대해 제네릭 함수가 어떤 구현을 선택할지 확인하려면 `dispatch()` 속성을 사용합니다.

```python
fun.dispatch(float)
# <function fun_num at 0x...>
fun.dispatch(dict) # 기본 구현
# <function fun at 0x...>
```
모든 등록된 구현에 접근하려면 읽기 전용 `registry` 속성을 사용합니다.

```python
fun.registry.keys()
# dict_keys([<class 'NoneType'>, <class 'int'>, <class 'object'>, <class 'decimal.Decimal'>, <class 'list'>, <class 'float'>])
fun.registry[float]
# <function fun_num at 0x...>
fun.registry[object]
# <function fun at 0x...>
```
제안된 API는 설명하고 사용하기 쉬우며 `functools` 모듈의 기존 멤버들과 일관성을 유지하기 위해 의도적으로 제한적이고 독자적인 의견을 담고 있습니다.

## 구현 노트 (Implementation Notes)
이 PEP에서 설명하는 기능은 `pkgutil` 표준 라이브러리 모듈에 `simplegeneric`으로 이미 구현되어 있습니다. 이 구현이 성숙했기 때문에, 대부분 그대로 옮겨지는 것이 목표입니다.

디스패치 타입은 데코레이터 인자(argument)로 지정됩니다. 함수 어노테이션(annotation)을 사용하는 대안적인 형태가 고려되었으나, 표준 라이브러리의 범위를 벗어나고 어노테이션 사용에 대한 모범 사례가 여전히 논의 중이므로 포함이 거부되었습니다.

현재 `pkgutil.simplegeneric` 구현을 기반으로 하며, `Abstract Base Classes`에 가상 서브클래스(virtual subclass)를 등록하는 규칙에 따라 디스패치 레지스트리(registry)는 스레드 안전(thread-safe)하지 않습니다.

## Abstract Base Classes (추상 기본 클래스)
`pkgutil.simplegeneric` 구현은 여러 형태의 MRO에 의존했습니다. `@singledispatch`는 old-style 클래스 및 Zope의 `ExtensionClasses`에 대한 특별한 처리를 제거하고, 더 중요하게는 `Abstract Base Classes (ABC)`에 대한 지원을 도입합니다.

제네릭 함수 구현이 ABC에 등록될 때, 디스패치 알고리즘은 제공된 인자의 MRO에 관련 ABC를 포함하는 확장된 형태의 C3 선형화(linearization)로 전환됩니다. 이 알고리즘은 ABC가 기능적으로 도입되는 지점, 즉 `issubclass(cls, abc)`가 클래스 자체에 대해 `True`를 반환하지만 모든 직접적인 기본 클래스에 대해서는 `False`를 반환하는 위치에 ABC를 삽입합니다.

이 작동 방식은 상당히 느리지만, 모든 디스패치 결정은 캐시됩니다. 캐시는 제네릭 함수에 새로운 구현을 등록하거나 사용자 코드가 ABC에 `register()`를 호출하여 암시적으로 서브클래스화할 때 무효화됩니다. 이러한 경우, 모호한 디스패치 상황이 발생할 수 있습니다. 예를 들어, `Iterable`과 `Container` 모두에 `P` 클래스가 등록되었을 때, `singledispatch`는 `RuntimeError: Ambiguous dispatch` 예외를 발생시킵니다.

하지만 클래스 정의 시 하나 이상의 ABC가 명시적으로 기본 클래스로 제공된 경우에는 이러한 예외가 발생하지 않으며, 디스패치는 MRO 순서대로 이루어집니다.

`__len__()` 또는 `__contains__()`와 같은 특수 메서드의 존재로부터 ABC의 서브클래스화가 추론될 때도 유사한 충돌이 발생할 수 있습니다.

## 사용 패턴 (Usage Patterns)
이 PEP는 제네릭으로 명시적으로 표시된 함수에 대해서만 동작 확장을 제안합니다. 기본 클래스 메서드가 서브클래스에 의해 오버라이드(override)될 수 있는 것처럼, 함수도 주어진 타입에 대한 커스텀 기능을 제공하기 위해 오버로드될 수 있습니다.

범용 오버로딩(Universal overloading)이 임의의 오버로딩을 의미하지는 않습니다. 실제 프로그램에서 제네릭 함수 사용은 매우 예측 가능한 패턴을 따르며, 등록된 구현은 일반적인 경우 쉽게 발견할 수 있습니다.

모듈이 새로운 제네릭 연산을 정의하는 경우, 일반적으로 기존 타입에 필요한 구현도 같은 곳에 정의합니다. 마찬가지로, 모듈이 새로운 타입을 정의하는 경우, 해당 타입과 관련된 제네릭 함수에 대한 구현을 정의합니다. 결과적으로, 대부분의 등록된 구현은 오버로드되는 함수 또는 새로 정의된 타입 옆에서 찾을 수 있습니다.

함수나 해당 타입이 없는 모듈에 구현이 등록되는 경우는 드뭅니다.

앞서 언급했듯이, 단일 디스패치 제네릭은 표준 라이브러리 전반에 걸쳐 이미 널리 사용되고 있습니다. 이를 위한 깔끔하고 표준적인 방법은 사용자 확장성(user extensibility)을 동시에 열어주면서, 이러한 커스텀 구현을 공통된 하나로 리팩토링(refactor)하는 길을 제공합니다.

## 대안적 접근 방식 (Alternative approaches)
*   **PEP 3124 (Phillip J. Eby):** 임의의 규칙 세트 기반 오버로딩(기본 구현은 인자 타입에 따라 디스패치), 인터페이스, 적응 및 메서드 결합을 포함하는 완전한 솔루션을 제안했습니다. PEAK-Rules는 이 PEP의 개념에 대한 참조 구현입니다. 이러한 광범위한 접근 방식은 본질적으로 복잡하여 합의에 도달하기 어렵습니다. 반면 이 PEP는 이해하기 쉬운 단일 기능에 중점을 둡니다.
*   **다중 인자 디스패치:** 2005년 Artima 기사에서 Guido van Rossum은 함수의 모든 인자 타입에 따라 디스패치하는 제네릭 함수 구현을 제시했습니다. Andrey Popp의 `generic` 패키지와 David Mertz의 `gnosis.magic.multimethods`에서도 동일한 접근 방식을 선택했습니다. 하지만 Fredrik Lundh의 의견처럼 "함수가 어떤 코드를 실행해야 할지 분류하기 위해 수많은 로직으로 API를 설계한다면, API 설계를 다른 사람에게 넘겨야 할 것"이라는 관점에 동의합니다. 즉, 이 PEP에서 제안하는 단일 인자 접근 방식은 구현하기 더 쉬울 뿐만 아니라, 더 복잡한 상태에 대한 디스패치가 안티 패턴임을 명확하게 전달합니다. 또한 객체 지향 프로그래밍의 친숙한 메서드 디스패치 메커니즘과 직접적으로 일치한다는 장점도 있습니다.
*   **PyPy의 RPython `extendabletype`:** 이는 클래스를 외부에서 확장할 수 있게 하는 메타클래스(metaclass)입니다. `pairtype()` 및 `pair()` 팩토리와 함께 단일 디스패치 제네릭의 한 형태를 제공합니다.

## 감사의 글 (Acknowledgements)
Phillip J. Eby의 PEP 3124 및 PEAK-Rules 작업 외에도, `pkgutil.simplegeneric`을 `functools` API의 일부로 노출할 것을 제안한 Paul Moore의 원래 이슈, 멀티메서드에 대한 Guido van Rossum의 기사, 그리고 일반적인 `pprint` 재작성에 대한 Raymond Hettinger와의 논의 등이 영향을 미쳤습니다. 이 PEP를 만들고 초기 피드백을 제공해준 Alyssa Coghlan에게 감사드립니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.