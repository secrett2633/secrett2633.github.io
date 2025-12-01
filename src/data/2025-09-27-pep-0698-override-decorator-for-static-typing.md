---
title: "[Final] PEP 698 - Override Decorator for Static Typing"
excerpt: "Python Enhancement Proposal 698: 'Override Decorator for Static Typing'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/698/
toc: true
toc_sticky: true
date: 2025-09-27 13:05:19+0900
last_modified_at: 2025-09-27 13:05:19+0900
published: true
---
> **원문 링크:** [PEP 698 - Override Decorator for Static Typing](https://peps.python.org/pep-0698/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 05-Sep-2022


# PEP 698 – 정적 타이핑을 위한 Override 데코레이터

## 초록 (Abstract)

이 PEP는 Python 타입 시스템에 `@override` 데코레이터를 추가할 것을 제안합니다. 이 데코레이터를 통해 타입 검사기는(type checkers) 기본 클래스(base class)가 파생 클래스(derived class)에 의해 상속되는 메서드를 변경할 때 발생하는 버그를 방지할 수 있습니다.

## 동기 (Motivation)

타입 검사기의 주요 목적은 리팩터링(refactoring)이나 변경 사항이 코드 내의 기존 의미론적 구조를 깨뜨릴 때 플래그를 지정하여, 사용자가 코드에 대한 수동 감사(manual audit) 없이도 프로젝트 전체에서 문제를 식별하고 수정할 수 있도록 돕는 것입니다.

### 안전한 리팩터링 (Safe Refactoring)

Python의 타입 시스템은 오버라이드된 함수(overridden function)의 API가 변경될 때 일관성을 유지하기 위해 변경해야 할 호출 지점(call sites)을 식별하는 방법을 제공하지 않습니다. 이로 인해 코드 리팩터링 및 변환이 더 위험해집니다.

다음의 간단한 상속 구조를 고려해봅시다.

```python
class Parent:
    def foo(self, x: int) -> int:
        return x

class Child(Parent):
    def foo(self, x: int) -> int:
        return x + 1

def parent_callsite(parent: Parent) -> None:
    parent.foo(1)

def child_callsite(child: Child) -> None:
    child.foo(1)
```

만약 슈퍼클래스(superclass)의 오버라이드된 메서드 이름이 바뀌거나 삭제되면, 타입 검사기는 기본 타입(base type)을 직접 다루는 호출 지점만 업데이트하라고 알려줄 것입니다. 그러나 타입 검사기는 우리가 변경한 내용을 볼 수 없고 새로운 코드만 볼 수 있으므로, 자식 클래스(child classes)에서도 동일한 메서드 이름을 변경해야 한다는 것을 알 수 있는 방법이 없습니다.

다음 코드는 버그를 유발할 가능성이 있지만, 타입 검사기는 이를 문제없이 수용할 것입니다.

```python
class Parent:
    # 이 메서드 이름을 변경
    def new_foo(self, x: int) -> int:
        return x

class Child(Parent):
    # 이 (변경되지 않은) 메서드는 `foo`를 오버라이드했지만 `new_foo`와는 무관함
    def foo(self, x: int) -> int:
        return x + 1

def parent_callsite(parent: Parent) -> None:
    # Child 인스턴스를 전달하면 이제 Parent.new_foo가 실행됨 - 아마도 버그
    parent.new_foo(1)

def child_callsite(child: Child) -> None:
    # 여기서는 아마도 new_foo를 호출하려 했을 것임. 대신 메서드가 분기됨
    child.foo(1)
```

이 코드는 타입 검사를 통과하지만, 두 가지 잠재적인 버그의 원인이 있습니다.

1.  `Child` 인스턴스를 `parent_callsite` 함수에 전달하면, `Child.foo` 대신 `Parent.new_foo`의 구현이 호출됩니다. 이는 아마도 버그일 것입니다. 커스텀 동작이 필요 없었다면 애초에 `Child.foo`를 작성하지 않았을 것이기 때문입니다. 우리의 시스템은 `Child.foo`가 `Parent.foo`와 유사하게 동작할 것이라고 의존하고 있었을 것입니다.
2.  이 문제를 조기에 발견하지 못하면 메서드가 분기(fork)되고, 미래의 리팩터링에서는 `new_foo`의 주요 변경 사항이 `Child.foo`도 업데이트해야 한다는 것을 아무도 깨닫지 못하여 나중에 큰 버그로 이어질 수 있습니다.

잘못 리팩터링된 코드는 타입-안전(type-safe)하지만, 우리가 의도한 바가 아닐 수 있으며 시스템이 잘못 동작하게 할 수 있습니다. 이 버그는 새로운 코드가 예외를 발생시키지 않고 실행될 가능성이 높기 때문에 추적하기 어려울 수 있습니다. 테스트는 문제를 발견할 가능성이 적으며, 사일런트 오류(silent errors)는 프로덕션 환경에서 추적하는 데 더 오랜 시간이 걸릴 수 있습니다.

이러한 잘못된 리팩터링으로 인해 여러 타입 지정 코드베이스에서 생산 중단(production outages)이 발생한 사례가 있습니다. 이것이 타입 시스템에 `@override` 데코레이터를 추가하는 주된 동기이며, 이를 통해 개발자는 `Parent.foo`와 `Child.foo` 간의 관계를 표현하여 타입 검사기가 문제를 감지할 수 있도록 합니다.

## 이론적 근거 (Rationale)

### 서브클래스 구현의 명확성 증가 (Subclass Implementations Become More Explicit)

명시적인 오버라이드는 암시적인 오버라이드보다 익숙하지 않은 코드를 읽기 쉽게 만들 것이라고 믿습니다. `@override`를 사용하는 서브클래스의 구현을 읽는 개발자는 어떤 메서드가 일부 기본 클래스의 기능을 오버라이드하는지 즉시 확인할 수 있습니다. 이 데코레이터가 없으면, 이를 빠르게 알아내는 유일한 방법은 정적 분석 도구(static analysis tool)를 사용하는 것입니다.

### 다른 언어 및 런타임 라이브러리의 선례 (Precedent in Other Languages and Runtime Libraries)

#### 다른 언어의 정적 오버라이드 검사 (Static Override Checks in Other Languages)

많은 인기 있는 프로그래밍 언어가 오버라이드 검사를 지원합니다. 예를 들면 다음과 같습니다.

*   C++: `override`
*   C#: `override`
*   Hack: `<<__Override>>`
*   Java: `@Override`
*   Kotlin: `override`
*   Scala: `override`
*   Swift: `override`
*   TypeScript: `override`

#### Python의 런타임 오버라이드 검사 (Runtime Override Checks in Python)

현재 `@overrides` (주의: 원문에는 `[sic]`으로 표기되어 있으나, 라이브러리 이름은 `overrides`로 명시됨) 및 `@final` 데코레이터를 제공하고 런타임에 이를 강제하는 Overrides 라이브러리가 있습니다.

PEP 591은 Overrides 라이브러리와 동일한 의미론을 가진 `@final` 데코레이터를 추가했습니다. 그러나 런타임 라이브러리의 오버라이드 구성 요소는 정적으로 전혀 지원되지 않아, 혼합/일치 지원(mix/matched support)에 대한 혼란을 가중시켰습니다.

정적 검사에서 `@override`에 대한 지원을 제공하는 것은 다음과 같은 이유로 가치를 더할 것입니다.

*   버그를 더 일찍, 종종 에디터 내에서 잡을 수 있습니다.
*   정적 검사는 런타임 검사와 달리 성능 오버헤드(performance overhead)가 없습니다.
*   자동화된 테스트 없이는 감지되지 않을 수 있는, 거의 사용되지 않는 모듈에서도 버그가 빠르게 잡힐 것입니다.

### 단점 (Disadvantages)

`@override`를 사용하면 코드가 더 장황해질 수 있습니다 (more verbose).

## 명세 (Specification)

타입 검사기는 `@typing.override`로 데코레이트된 메서드를 만나면, 해당 메서드가 일부 조상 클래스(ancestor class)에서 호환되는 메서드나 속성(attribute)을 오버라이드하지 않는 한 타입 오류로 처리해야 합니다.

```python
from typing import override

class Parent:
    def foo(self) -> int:
        return 1
    def bar(self, x: str) -> str:
        return x

class Child(Parent):
    @override
    def foo(self) -> int:
        return 2

    @override
    def baz(self) -> int:
        # 타입 검사 오류: 조상 클래스에 일치하는 시그니처가 없음
        return 1
```

`@override` 데코레이터는 타입 검사기가 메서드를 유효한 오버라이드로 간주하는 모든 곳에서 허용되어야 하며, 이는 일반적으로 일반 메서드뿐만 아니라 `@property`, `@staticmethod`, `@classmethod`도 포함합니다.

### 오버라이드 호환성에 대한 새로운 규칙 없음 (No New Rules for Override Compatibility)

이 PEP는 새로운 `@override` 데코레이터의 처리에만 전적으로 초점을 맞추며, 이는 데코레이트된 메서드가 조상 클래스의 일부 속성을 오버라이드해야 한다고 명시합니다. 이 PEP는 이러한 메서드의 타입 시그니처(type signatures)에 관한 새로운 규칙을 제안하지 않습니다.

### 프로젝트별 엄격한 강제 (Strict Enforcement Per-Project)

`@override` 데코레이터는 검사기가 개발자에게 부모 클래스를 오버라이드하는 메서드에 데코레이터를 사용하도록 요구하는 엄격 모드(strict mode)를 선택할 수 있게 할 때 가장 유용하다고 믿습니다. 엄격한 강제는 하위 호환성을 위해 옵트인(opt-in)이어야 합니다.

#### 동기 (Motivation)

`@override`가 필요한 엄격 모드의 주된 이유는, 개발자들이 프로젝트 전체에서 `@override` 데코레이터가 사용된다는 것을 알 때만 리팩터링이 오버라이드-안전하다(override-safe)고 신뢰할 수 있기 때문입니다.

엄격 모드를 사용해야만 잡을 수 있는 오버라이드와 관련된 또 다른 종류의 버그가 있습니다.

다음 코드를 고려해봅시다.

```python
class Parent:
    pass

class Child(Parent):
    def foo(self) -> int:
        return 2
```

이 코드를 다음과 같이 리팩터링했다고 상상해봅시다.

```python
class Parent:
    def foo(self) -> int: # 이 메서드는 새로 추가됨
        return 1

class Child(Parent):
    def foo(self) -> int: # 이제 이것은 오버라이드임!
        return 2

def call_foo(parent: Parent) -> int:
    return parent.foo() # 이것은 Child.foo를 호출할 수 있으며, 이는 예상치 못한 동작일 수 있음.
```

여기서 코드의 의미론이 변경되었으며, 이는 두 가지 문제를 유발할 수 있습니다.

1.  코드 변경 작성자가 `Child.foo`가 이미 존재한다는 사실을 몰랐다면 (대규모 코드베이스에서는 매우 흔한 일), `call_foo`가 항상 `Parent.foo`를 호출하지 않는다는 것을 보고 놀랄 수 있습니다.
2.  코드베이스 작성자가 서브클래스에서 오버라이드를 작성할 때 수동으로 모든 곳에 `@override`를 적용하려고 했다면, `Child.foo`가 `@override`를 필요로 한다는 사실을 놓칠 가능성이 높습니다.

언뜻 보기에는 이러한 종류의 변경이 발생할 가능성이 낮아 보일 수 있지만, 하나 이상의 서브클래스에 개발자들이 나중에 기본 클래스에 속한다고 생각하는 기능이 있을 경우 실제로 자주 발생할 수 있습니다.

엄격 모드를 사용하면 이런 일이 발생할 때마다 개발자에게 항상 경고할 것입니다.

#### 선례 (Precedent)

조사한 대부분의 타입 지정 객체 지향 프로그래밍 언어는 프로젝트 전체에서 명시적인 오버라이드를 요구하는 쉬운 방법을 가지고 있습니다.

*   C#, Kotlin, Scala, Swift는 항상 명시적인 오버라이드를 요구합니다.
*   TypeScript는 명시적인 오버라이드를 강제하는 `--no-implicit-override` 플래그를 가지고 있습니다.
*   Hack과 Java에서는 타입 검사기가 항상 오버라이드를 옵트인으로 처리하지만, 널리 사용되는 린터(linters)는 명시적인 오버라이드가 누락되었을 경우 경고할 수 있습니다.

### 하위 호환성 (Backward Compatibility)

기본적으로 `@override` 데코레이터는 옵트인(opt-in) 방식입니다. 이를 사용하지 않는 코드베이스는 추가적인 타입 안전성 없이 이전과 동일하게 타입 검사가 이루어집니다.

### 런타임 동작 (Runtime Behavior)

#### 가능한 경우 `__override__ = True` 설정 (Set `__override__ = True` when possible)

런타임에 `@typing.override`는 인수에 `__override__` 속성(값 `True`)을 추가하기 위해 최선의 노력을 다할 것입니다. "최선의 노력(best-effort)"이란 속성을 추가하려고 시도하겠지만, 실패할 경우 (예를 들어 입력이 고정 슬롯(fixed slots)을 가진 디스크립터 타입(descriptor type)인 경우) 인수를 있는 그대로 반환할 것임을 의미합니다.

이는 `@typing.final` 데코레이터가 하는 것과 정확히 동일하며, 동기도 유사합니다. 이는 런타임 라이브러리가 `@override`를 사용할 수 있는 기능을 제공합니다. 구체적인 예로, 런타임 라이브러리는 `__override__`를 확인하여 부모 메서드 독스트링(docstring)을 사용하여 자식 클래스 메서드의 `__doc__` 속성을 자동으로 채울 수 있습니다.

#### `__override__` 설정의 한계 (Limitations of setting `__override__`)

위에서 설명했듯이, `__override__` 추가는 런타임에 실패할 수 있으며, 이 경우 인수를 있는 그대로 반환할 것입니다.

또한, 작동하는 경우에도 여러 데코레이터와 올바르게 작업하는 것이 사용자에게 어려울 수 있습니다. 최종 출력에 `__override__` 속성이 성공적으로 설정되도록 하려면 각 데코레이터의 구현을 이해해야 하기 때문입니다.

*   `@override` 데코레이터는 `functools.lru_cache`와 같이 래퍼 함수(wrapper functions)를 사용하는 일반 데코레이터보다 나중에 실행되어야 합니다. 가장 바깥쪽 래퍼에 `__override__`를 설정하기 위함입니다. 즉, 다른 모든 데코레이터 위에 위치해야 합니다.
*   그러나 `@override`는 `@property`, `@staticmethod`, `@classmethod`와 같은 많은 특수 디스크립터 기반 데코레이터보다 먼저 실행되어야 합니다. 위에서 논의했듯이, 어떤 경우에는 (예: 고정 슬롯이 있는 디스크립터 또는 래핑(wrap)하는 디스크립터) `__override__` 속성을 전혀 설정할 수 없을 수도 있습니다.

결과적으로 `__override__` 설정에 대한 런타임 지원은 최선 노력(best effort)에 불과하며, 타입 검사기가 데코레이터의 순서를 검증할 것이라고는 예상하지 않습니다.

## 거부된 대안 (Rejected Alternatives)

### 안전을 위해 통합 개발 환경(IDE)에 의존 (Rely on Integrated Development Environments for safety)

최신 IDE는 메서드 이름을 변경할 때 서브클래스를 자동으로 업데이트하는 기능을 제공합니다. 그러나 이는 여러 가지 이유로 불충분하다고 봅니다.

*   코드베이스가 여러 프로젝트로 분할된 경우, IDE는 도움이 되지 않으며 의존성(dependencies)을 업그레이드할 때 버그가 나타납니다. 타입 검사기는 의존성에서 발생하는 파괴적인 변경 사항(breaking changes)을 빠르게 잡는 방법입니다.
*   모든 개발자가 이러한 IDE를 사용하는 것은 아닙니다. 그리고 라이브러리 유지보수자(maintainers)는 IDE를 사용하더라도 풀 리퀘스트(pull request) 작성자가 동일한 IDE를 사용한다고 가정할 필요가 없습니다. 우리는 개발자의 편집기 선택에 대해 아무것도 가정하지 않고 지속적 통합(continuous integration)에서 문제를 감지할 수 있는 것을 선호합니다.

### 런타임 강제 (Runtime enforcement)

`@overrides.overrides`가 오늘날 하는 방식과 유사하게 `@typing.override`가 런타임에 오버라이드 안전성을 강제하도록 하는 방안을 고려했습니다.

이는 네 가지 이유로 거부되었습니다.

1.  정적 타입 검사를 사용하는 사용자에게는 이것이 어떤 이점을 가져다줄지 명확하지 않습니다.
2.  최소한의 성능 오버헤드가 발생하여 런타임 강제로 인해 프로젝트 가져오기(import)가 느려질 수 있습니다. `@overrides.overrides` 구현은 약 100 마이크로초가 걸리며, 이는 빠르지만 백만 줄 이상의 코드베이스에서는 1초 이상 추가 초기화 시간이 될 수 있습니다. 이는 `@typing.override`가 가장 유용할 것이라고 생각하는 바로 그 지점입니다.
3.  구현에 잘 작동하지 않는 엣지 케이스(edge cases)가 있을 수 있습니다 (이러한 클로즈드 소스 라이브러리 중 하나의 유지보수자로부터 이것이 문제였다는 이야기를 들었습니다). 우리는 정적 강제가 간단하고 신뢰할 수 있을 것이라고 예상합니다.
4.  우리가 아는 구현 접근 방식은 간단하지 않습니다. 데코레이터는 클래스 평가가 완료되기 전에 실행되므로, 우리가 아는 옵션은 호출자의 바이트코드(bytecode)를 검사하거나 (Overrides 라이브러리가 하는 방식) 메타클래스(metaclass) 기반 접근 방식을 사용하는 것입니다. 어느 쪽도 이상적으로 보이지 않습니다.

### 서브클래스에 명시적 오버라이드를 강제하기 위해 기본 클래스 표시 (Mark a base class to force explicit overrides on subclasses)

클래스 데코레이터 `@require_explicit_overrides`를 포함하는 방안을 고려했습니다. 이는 기본 클래스가 모든 서브클래스가 메서드 오버라이드에 `@override` 데코레이터를 사용해야 한다고 선언하는 방법을 제공했을 것입니다. Overrides 라이브러리에는 런타임 검사에서 유사한 동작을 제공하는 믹스인 클래스(mixin class) `EnforceExplicitOverrides`가 있습니다.

이 제안은 대규모 코드베이스의 소유자가 `@override`로부터 가장 큰 이점을 얻을 것이라고 예상하며, 이러한 사용 사례에서는 명시적인 `@override`가 요구되는 엄격 모드(Strict Enforcement Per-Project 섹션 참조)가 기본 클래스를 표시하는 방법보다 더 많은 이점을 제공하기 때문에 채택되지 않았습니다.

또한, 추가적인 타입 안전성이 `@override` 사용의 추가적인 상용구(boilerplate) 가치가 없다고 생각하는 프로젝트 작성자는 그렇게 하도록 강요되어서는 안 된다고 믿습니다. 선택적 엄격 모드는 프로젝트 소유자의 결정에 맡기는 반면, 라이브러리에서 `@require_explicit_overrides`를 사용하면 프로젝트 소유자가 원하지 않더라도 `@override`를 사용하도록 강요하게 됩니다.

### 오버라이드되는 조상 클래스 이름 포함 (Include the name of the ancestor class being overridden)

`@override` 호출자가 오버라이드되는 메서드가 정의되어야 하는 특정 조상 클래스를 지정할 수 있도록 하는 방안을 고려했습니다.

```python
class Parent0:
    def foo(self) -> int:
        return 1
class Parent1:
    def bar(self) -> int:
        return 1

class Child(Parent0, Parent1):
    @override(Parent0) # 괜찮음, Parent0이 foo를 정의함
    def foo(self) -> int:
        return 2

    @override(Parent0) # 타입 오류, Parent0이 bar를 정의하지 않음
    def bar(self) -> int:
        return 2
```

이는 깊은 상속 트리(deep inheritance trees)에서 오버라이드 구조를 더 명확하게 해주기 때문에 코드 가독성에 유용할 수 있습니다. 또한, 오버라이드되는 메서드가 한 기본 클래스에서 다른 기본 클래스로 이동할 때마다 개발자가 오버라이드 구현이 여전히 의미 있는지 확인하도록 유도하여 버그를 잡을 수도 있습니다.

다음과 같은 이유로 이 제안은 채택되지 않았습니다.

*   이를 지원하면 `@override` 자체와 이를 위한 타입 검사기 지원의 구현 복잡성이 증가하므로, 상당한 이점이 있어야 했습니다. 우리는 이것이 거의 사용되지 않고 상대적으로 적은 버그를 잡을 것이라고 믿습니다.
*   Overrides 패키지의 작성자는 초기 버전의 라이브러리에 이 기능이 포함되어 있었지만 거의 유용하지 않았고 이점이 거의 없었다고 언급했습니다. 제거된 후에는 사용자로부터 이 기능에 대한 요청이 없었습니다.

## 참조 구현 (Reference Implementation)

Pyre에서 개념 증명(proof of concept)이 구현되었습니다.

*   `@pyre_extensions.override` 데코레이터는 오버라이드를 표시할 수 있습니다.
*   Pyre는 이 PEP에 명시된 대로 이 데코레이터를 타입 검사할 수 있습니다.

---
**중요** : 이 PEP는 역사적인 문서입니다. 최신 사양 및 문서는 `@override` 및 `@typing.override`를 참조하십시오. 표준 타이핑 사양은 [typing specs site](https://typing.readthedocs.io/en/latest/)에서 유지 관리되며, 런타임 타이핑 동작은 [CPython documentation](https://docs.python.org/3/library/typing.html)에 설명되어 있습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.