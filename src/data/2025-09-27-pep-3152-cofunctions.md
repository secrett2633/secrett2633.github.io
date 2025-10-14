---
title: "[Rejected] PEP 3152 - Cofunctions"
excerpt: "Python Enhancement Proposal 3152: 'Cofunctions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3152/
toc: true
toc_sticky: true
date: 2025-09-27 14:41:43+0900
last_modified_at: 2025-09-27 14:41:43+0900
published: true
---
> **원문 링크:** [PEP 3152 - Cofunctions](https://peps.python.org/pep-3152/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 13-Feb-2009


### 개요 (Abstract)

PEP 3152는 'cofunction'이라는 특수한 유형의 제너레이터(generator)를 정의하고 호출하기 위한 새로운 문법을 제안했습니다. 이 제안의 목표는 제너레이터 기반 코루틴(coroutine)을 작성하는 과정을 간소화하고, 이러한 코드 작성 시 흔히 발생하는 특정 유형의 오류를 조기에 감지하도록 돕는 것이었습니다. 이러한 오류는 진단하기 어려운 증상을 유발하는 경향이 있습니다.

이 제안은 PEP 380에 설명된 `yield from` 메커니즘을 기반으로 하며, `cofunction`의 일부 의미론을 `yield from`을 통해 설명합니다. 그러나 필요하다면 PEP 380과 독립적으로 `cofunction`을 정의하고 구현하는 것도 가능했을 것입니다.

### 반려 (Rejection)

PEP 3152는 반려(Rejected)되었습니다. 상세한 반려 사유는 `https://mail.python.org/pipermail/python-dev/2015-April/139503.html`에서 확인할 수 있습니다.

### 사양 (Specification)

#### Cofunction 정의 (Cofunction definitions)

`cofunction`을 정의하기 위해 `def` 대신 `codef`라는 새로운 키워드가 도입되었습니다. `cofunction`은 다음과 같은 특징을 가진 특별한 종류의 제너레이터입니다:

*   `cofunction`은 `yield` 또는 `yield from` 표현식을 포함하지 않더라도 항상 제너레이터입니다.
*   `cofunction`은 일반 함수와 동일한 방식으로 호출될 수 없습니다.
*   `cofunction`을 일반적인 방식으로 호출하려고 시도하면 예외(Exception)가 발생합니다.

#### Cocall (Cocalls)

하나의 `cofunction`에서 다른 `cofunction`을 호출할 때는 `cocall`이라는 새로운 키워드를 사용하여 호출을 표시합니다. 예를 들어, `cocall f(*args, **kwds)` 표현식은 의미상 `yield from f.__cocall__(*args, **kwds)`와 동등합니다. 다만, `__cocall__`이 반환하는 객체는 이터레이터(iterator)일 것으로 예상되므로 `iter()`를 호출하는 단계는 건너뜁니다.

`cocall` 표현식의 전체 문법은 다음과 같습니다:

```
atom: cocall | <기존 atom의 대안>
cocall: 'cocall' atom cotrailer* '(' [arglist] ')'
cotrailer: '[' subscriptlist ']' | '.' NAME
```

`cocall` 키워드는 `cofunction` 내부에서만 문법적으로 유효합니다. 다른 컨텍스트에서 사용하면 `SyntaxError`가 발생합니다.

`__cocall__`을 구현하는 객체는 이터레이터 프로토콜(iterator protocol)을 따르는 객체를 반환할 것으로 예상됩니다. `Cofunction`은 일반 제너레이터 함수가 `__call__`에 응답하는 방식과 동일하게 `__cocall__`에 응답합니다. 즉, 제너레이터 이터레이터(generator-iterator)를 반환합니다.

다른 호출 가능(callable) 객체, 특히 바운드 메서드(bound methods)를 감싸는 특정 객체는 내부 객체로 위임하는 `__cocall__` 구현을 갖게 됩니다.

#### 새로운 내장 함수, 속성 및 C API 함수 (New builtins, attributes and C API functions)

`cofunction`과 비(非)코루틴 코드를 연결하는 것을 용이하게 하기 위해 `costart`라는 내장 함수가 제공될 예정이었습니다. `costart`의 정의는 다음과 같습니다:

```python
def costart(obj, *args, **kwds):
    return obj.__cocall__(*args, **kwds)
```

또한, 이에 상응하는 C API 함수 `PyObject *PyObject_CoCall(PyObject *obj, PyObject *args, PyObject *kwds)`도 제공될 예정이었습니다.

`cofunction`이 별개의 객체 유형인지, 아니면 제너레이터 함수처럼 특별히 표시된 함수 인스턴스(instance)인지는 명시되지 않았습니다. 후자일 경우, 주어진 함수 객체가 `cofunction`인지 테스트할 수 있도록 읽기 전용(read-only) 불리언(boolean) 속성 `__iscofunction__`이 제공되어야 한다고 명시되었습니다.

### 동기 및 근거 (Motivation and Rationale)

`yield from` 문법은 제너레이터의 작업 일부를 다른 함수에 위임하는 목적으로 사용될 때 비교적 자명합니다. 또한 제너레이터 기반 코루틴 구현에도 효과적으로 사용될 수 있지만, 이 목적에 사용될 때는 다소 어색하게 읽히고 코드의 진정한 의도를 모호하게 만드는 경향이 있습니다.

더 나아가, 제너레이터를 코루틴으로 사용하는 것은 오류가 발생하기 쉽습니다. `yield from`을 사용해야 할 때 사용하지 않거나, 사용하지 말아야 할 때 사용하면 모호하고 혼란스러운 증상이 나타날 수 있습니다.

마지막으로, 때로는 아무것도 yield 하지 않더라도 함수가 코루틴이어야 할 필요가 있으며, 이러한 경우 `if 0: yield`와 같은 편법(kludges)을 사용하여 강제로 제너레이터로 만드는 것이 필요했습니다.

`codef` 및 `cocall` 구문은 다음과 같은 문제들을 해결하고자 했습니다:

*   첫 번째 문제(`yield from` 사용 시 의미 모호성)는 문법이 의도(함수가 코루틴의 일부를 형성함)를 직접적으로 반영하도록 하여 해결합니다.
*   두 번째 문제(코루틴과 비(非)코루틴 코드의 혼합으로 인한 오류)는 말이 안 되는 방식으로 코루틴과 비(非)코루틴 코드를 혼합하는 것을 불가능하게 함으로써 해결합니다. 규칙을 위반하면 정확히 무엇이 문제인지, 어디에서 문제가 발생했는지 알려주는 예외가 발생합니다.
*   마지막으로, 함수의 정의 형식이 함수가 코루틴인지 여부를 결정하도록 함으로써 더미 `yield`의 필요성을 없앱니다.

### 프로토타입 구현 (Prototype Implementation)

Python 3.1.2에 대한 패치 형태의 구현은 다음에서 찾을 수 있습니다:
`http://www.cosc.canterbury.ac.nz/greg.ewing/python/generators/cofunctions.html`

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.