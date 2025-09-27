---
title: "[Draft] PEP 800 - Disjoint bases in the type system"
excerpt: "Python Enhancement Proposal 800: 'Disjoint bases in the type system'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/800/
toc: true
toc_sticky: true
date: 2025-09-27 14:09:06+0900
last_modified_at: 2025-09-27 14:09:06+0900
published: true
---
> **원문 링크:** [PEP 800 - Disjoint bases in the type system](https://peps.python.org/pep-0800/)
>
> **상태:** Draft | **유형:** Standards Track | **작성일:** 21-Jul-2025

## PEP 800: 타입 시스템 내의 `Disjoint Base` (분리된 기본 클래스)

### 개요 (Abstract)
정확한 Python 프로그램 분석을 위해, 타입 체커(type checker)는 두 클래스가 공통 자식 클래스를 가질 수 있는지 여부를 알아야 합니다. 하지만 현재 타입 시스템에는 이를 판단하는 데 필요한 정보가 부족합니다. 이 PEP는 클래스가 "disjoint base"임을 나타내는 새로운 데코레이터인 `@typing.disjoint_base`를 추가합니다. 서로 관련 없는 `disjoint base`를 가진 두 클래스는 공통 자식 클래스를 가질 수 없습니다.

### 도입 배경 (Motivation)

Python 타입 체킹에서 중요한 개념 중 하나는 '도달 가능성(reachability)'입니다. 일반적으로 타입 체커는 코드의 특정 분기가 결코 도달할 수 없을 때 이를 감지하고 사용자에게 경고합니다. 이는 불필요한 코드가 프로그램을 복잡하게 만들고 버그의 징후일 수 있기 때문에 유용합니다.

예를 들어, `int`와 `str`와 같은 내장 타입의 경우, CPython 런타임은 한 클래스가 `int`와 `str` 모두로부터 상속받는 것을 허용하지 않습니다. 따라서 `def f(x: int): if isinstance(x, str): ...` 와 같은 코드에서 `if` 블록은 도달할 수 없습니다. 현재 mypy와 같은 타입 체커는 휴리스틱(heuristic)을 사용하여 이러한 불가능성을 감지하지만, 이는 일반적이지 않고 부정확할 수 있습니다.

다중 상속(multiple inheritance)으로 인해 도달 가능성 판단은 더욱 복잡해집니다. 사용자 정의 클래스 `A`와 `B`의 경우 `class C(A, B): pass`와 같이 두 클래스 모두로부터 상속받는 클래스가 존재할 수 있으므로 타입 체커는 경고를 발생시키지 않습니다. 그러나 `int`와 `str`와 같은 특정 내장 타입의 경우, CPython은 두 타입 모두로부터 상속받는 클래스 생성을 허용하지 않습니다. 현재 타입 시스템에는 이러한 기본 클래스(base class)의 비호환성을 판단하는 데 필요한 정보가 명시적으로 포함되어 있지 않습니다.

PEP 800은 런타임에 다중 상속이 허용되지 않는 경우를 표현할 수 있도록 타입 시스템을 확장하는 `@disjoint_base` 데코레이터를 제안합니다. 이는 타입 체커가 도달 가능성을 더욱 정확하게 이해하고, 다음과 같은 여러 구체적인 영역에서 도움이 됩니다.

*   **잘못된 클래스 정의 (Invalid class definitions):** `class C(int, str): pass`와 같이 런타임에 오류를 발생시키는 클래스 정의를 타입 체커가 미리 감지할 수 있게 합니다.
*   **도달 가능성 (Reachability):** `isinstance()` 검사나 `match` 문과 같은 타입 좁히기(type narrowing) 구문에서 도달할 수 없는 코드를 정확하게 식별합니다.
*   **오버로드 (Overloads):** 매개변수 타입이 겹치지만 반환 타입이 다른 `@overload` 함수에서 발생할 수 있는 잠재적 불안정성(unsafety)을 타입 체커가 감지하도록 돕습니다.
*   **교차 타입 (Intersection types):** 명시적 교차 타입(explicit intersection types) 지원이 미래에 추가될 경우, 특정 교차 타입이 '점유 가능한(inhabited)' 즉, 해당 교차 타입의 멤버가 될 수 있는 값이 존재하는지 여부를 판단하는 데 중요합니다.

`Disjoint base`는 현재 타입 시스템이 허용하는 것보다 타입 체커가 더 정확하게 이해할 수 있도록 합니다. 따라서 `disjoint base`는 Python 타입 시스템을 개선하기 위한 견고한 기반을 제공합니다.

### 제안 (Specification)

`@typing.disjoint_base` 데코레이터가 타입 시스템에 추가됩니다. 이 데코레이터는 `NamedTuple` 정의를 포함한 명목 클래스(nominal class)에만 사용할 수 있습니다. 함수, `TypedDict` 정의 또는 `Protocol` 정의에 사용하면 타입 체커 오류가 발생합니다.

클래스에는 두 가지 속성이 정의됩니다: 클래스가 `disjoint base`일 수도 있고 아닐 수도 있으며, 모든 클래스는 유효한 `disjoint base`를 가져야 합니다.

*   `@typing.disjoint_base`로 데코레이터가 적용되었거나, 비어 있지 않은 `__slots__` 정의를 포함하는 경우 클래스는 `disjoint base`가 됩니다. 범용 기본 클래스인 `object`도 `disjoint base`입니다.

클래스의 `disjoint base`를 결정하기 위해, 해당 클래스의 모든 기본 클래스(base class)를 검사하여 후보 `disjoint base` 집합을 구성합니다. 후보 집합에 단일 `disjoint base`가 있는 경우, 그것이 클래스의 `disjoint base`입니다. 여러 후보가 있지만 그 중 하나가 다른 모든 후보의 서브클래스(subclass)인 경우, 해당 클래스가 `disjoint base`가 됩니다. 그러한 후보가 없으면 클래스는 유효한 `disjoint base`를 가지지 않으므로 존재할 수 없습니다.

타입 체커는 클래스 정의를 검사할 때 유효한 `disjoint base`를 확인해야 하며, 유효한 `disjoint base`가 없는 클래스 정의를 발견하면 진단 메시지를 발행해야 합니다. 타입 체커는 또한 `isinstance()`와 같은 타입 좁히기 구문이 도달할 수 없는 분기를 초래하는지 여부를 확인할 때 `disjoint base` 메커니즘을 사용하여 타입이 `disjoint`한지 여부를 결정할 수 있습니다.

**예시:**

```python
from typing import disjoint_base, assert_never

@disjoint_base
class Disjoint1:
    pass

@disjoint_base
class Disjoint2:
    pass

@disjoint_base
class DisjointChild(Disjoint1):
    pass

class C1:
    # disjoint base는 `object`입니다
    pass

# OK: 후보 disjoint bases는 `Disjoint1`과 `object`이며, `Disjoint1`은 `object`의 서브클래스입니다.
class C2(Disjoint1, C1):
    # disjoint base는 `Disjoint1`
    pass

# OK: 후보 disjoint bases는 `DisjointChild`와 `Disjoint1`이며, `DisjointChild`는 `Disjoint1`의 서브클래스입니다.
class C3(DisjointChild, Disjoint1):
    # disjoint base는 `DisjointChild`
    pass

# error: 후보 disjoint bases는 `Disjoint1`과 `Disjoint2`이지만, 어느 것도 다른 것의 서브클래스가 아닙니다.
class C4(Disjoint1, Disjoint2):
    pass

def narrower(obj: Disjoint1) -> None:
    if isinstance(obj, Disjoint2):
        assert_never(obj) # OK: `Disjoint1`과 `Disjoint2`의 자식 클래스는 존재할 수 없습니다.
    if isinstance(obj, C1):
        reveal_type(obj) # 비어 있지 않은 타입(예: `Disjoint1 & C1`)을 보여줍니다.
```

### 런타임 구현 (Runtime implementation)
새로운 데코레이터 `@disjoint_base`는 `typing` 모듈에 추가될 것입니다. 이 데코레이터는 데코레이트된 객체에 `.__disjoint_base__ = True` 속성을 설정한 다음 인수를 반환하는 런타임 동작을 가집니다. 이 `__disjoint_base__` 속성은 런타임 인트로스펙션(introspection)에 사용될 수 있지만, 사용자 정의 클래스에는 이 데코레이터의 런타임 강제는 없습니다.

### 하위 호환성 (Backward compatibility)
이전 버전의 Python과의 호환성을 위해 `@disjoint_base` 데코레이터는 `typing_extensions` 백포트(backport) 패키지에 추가될 것입니다. 런타임에는 새로운 데코레이터가 호환성 문제를 일으키지 않습니다. 스텁(stub) 파일에서는 모든 타입 체커가 이 데코레이터를 이해하지 못하더라도 `disjoint base` 클래스에 이 데코레이터를 추가할 수 있으며, 이러한 타입 체커는 단순히 데코레이터를 no-op으로 처리해야 합니다.

타입 체커가 이 PEP를 지원하게 되면, 사용자는 도달 가능성 및 교차 타입과 관련된 타입 체킹 동작에 일부 변화를 볼 수 있습니다. 이러한 변화는 런타임 동작을 더 잘 반영하므로 긍정적일 것이며, 사용자에게 보이는 변화의 규모는 타입 체커 버전 간의 일반적인 변화량과 유사하게 제한적일 것입니다.

### 교육 방법 (How to Teach This)
대부분의 사용자는 `@disjoint_base` 데코레이터를 직접 사용하거나 이해할 필요가 없습니다. 이는 주로 저수준 라이브러리의 스텁 파일에서 사용될 것으로 예상되기 때문입니다. Python 교육자는 특정 경우에 다중 상속이 허용되지 않는 이유를 설명하기 위해 "`disjoint base`" 개념을 소개할 수 있습니다. Python 타입 힌팅 교육자는 `isinstance()`와 같은 타입 좁히기 구문을 가르칠 때 이 데코레이터를 도입하여 타입 체커가 특정 분기를 도달할 수 없는 것으로 처리하는 이유를 사용자에게 설명할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.