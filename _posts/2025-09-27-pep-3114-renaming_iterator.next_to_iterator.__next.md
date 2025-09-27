---
title: "[Final] PEP 3114 - Renaming iterator.next() to iterator.__next__()"
excerpt: "Python Enhancement Proposal 3114: 'Renaming iterator.next() to iterator.__next__()'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3114/
toc: true
toc_sticky: true
date: 2025-09-27 14:22:21+0900
last_modified_at: 2025-09-27 14:22:21+0900
published: true
---
> **원문 링크:** [PEP 3114 - Renaming iterator.next() to iterator.__next__()](https://peps.python.org/pep-3114/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 04-Mar-2007

## PEP 3114 – `iterator.next()`를 `iterator.__next__()`로 이름 변경

**작성자:** Ka-Ping Yee
**상태:** Final (최종)
**유형:** Standards Track
**작성일:** 2007년 3월 4일
**Python 버전:** 3.0

### 초록 (Abstract)

이 PEP 3114는 Python 2.x의 이터레이터(iterator) 프로토콜에서 `next()` 메서드를 `__next__()`로 변경하고, 새롭게 내장 함수 `next()`를 도입할 것을 제안합니다. Python 2.x에서 이터레이터 프로토콜은 이터러블(iterable) 객체에서 이터레이터를 생성하는 `__iter__()`와 이터레이터에서 다음 항목을 가져오는 `next()` 메서드로 구성되어 있었습니다. `for` 루프는 이러한 메서드를 암묵적으로 호출하여 작동합니다. 이 제안은 언어 수준 프로토콜의 일부로 암묵적으로 호출되는 다른 모든 Python 메서드(`__init__` 등)와의 일관성을 위해 `next()` 메서드를 `__next__()`로 이름을 바꾸고, 다른 프로토콜들이 명시적으로 호출되는 방식(`len()`, `iter()` 등)과 일관되게 `__next__()` 메서드를 호출하는 `next()` 내장 함수를 도입하려는 것입니다.

### 이중 밑줄 이름(Names With Double Underscores)

Python에서는 이름 앞뒤에 이중 밑줄(`__`)을 사용하여 언어 자체에 속하는 이름을 구별합니다. 인터프리터에 의해 암묵적으로 사용되거나 생성되는 속성 및 메서드는 이 명명 규칙을 따르는데, 예를 들어 `__file__`, `__dict__`, `__init__` 등이 있습니다.

이러한 규칙은 프로그래머가 명시적으로 정의하는 `__init__`과 같은 메서드뿐만 아니라, 명시적으로 이름을 지정해야만 접근할 수 있는 `__file__`과 같은 속성에도 적용됩니다. 이는 인터프리터에 의해 사용되거나 생성되는 모든 이름을 포함합니다.

이중 밑줄의 사용은 Python 언어 정의의 일부인 이름에 대해 별도의 네임스페이스를 생성하여, 프로그래머가 언어 정의 목적을 가진 이름과 의도치 않게 충돌할 걱정 없이 문자(알파벳)로 시작하는 변수, 속성, 메서드를 자유롭게 생성할 수 있도록 합니다. (예약된 키워드와 충돌하는 것은 여전히 문제이지만, 이 경우 즉시 구문 오류를 발생시킵니다).

이터레이터의 `next()` 메서드는 이러한 규칙의 예외였습니다. `next()` 메서드에 대한 명시적인 호출이 전혀 없는 코드라도 해당 메서드의 존재에 의해 암묵적으로 영향을 받을 수 있었습니다. 따라서 이 PEP는 이터레이터가 `next()` 메서드 대신 `__next__()` 메서드를 가지도록 제안하며, 의미론적인 변경은 없습니다.

### 이중 밑줄 메서드와 내장 함수(Double-Underscore Methods and Built-In Functions)

Python 언어는 이중 밑줄 이름을 가진 메서드를 정의하여 구현되거나 사용자 정의되는 여러 프로토콜을 정의합니다. 각 경우에 프로토콜은 인터프리터의 C 함수로 구현된 내부 메서드에 의해 제공됩니다.

때로는 프로토콜이 구문적 구성(syntactic construct)에 의해 호출됩니다:
*   `x[y]` → 내부 `tp_getitem` → `x.__getitem__(y)`
*   `x + y` → 내부 `nb_add` → `x.__add__(y)`
*   `-x` → 내부 `nb_negative` → `x.__neg__()`

때로는 구문적 구성이 없지만, 프로토콜을 명시적으로 호출하는 것이 유용한 경우가 있습니다. 이러한 경우를 위해 Python은 이중 밑줄 없이 동일한 이름을 가진 내장 함수를 제공합니다:
*   `len(x)` → 내부 `sq_length` → `x.__len__()`
*   `hash(x)` → 내부 `tp_hash` → `x.__hash__()`
*   `iter(x)` → 내부 `tp_iter` → `x.__iter__()`

이러한 패턴을 따르면, `next()`를 처리하는 자연스러운 방법은 동일하게 동작하는 `next()` 내장 함수를 추가하는 것입니다:
*   `next(x)` → 내부 `tp_iternext` → `x.__next__()`

또한, `getattr()` 및 `iter()` 내장 함수의 방식에 따라 `next()` 내장 함수가 선택적 두 번째 인자로 센티널(sentinel) 값을 받도록 제안됩니다. 두 인자로 호출될 때, `next()`는 `StopIteration` 예외를 포착하고 예외를 전파하는 대신 센티널 값을 반환합니다. 이는 `iter()`와 `next()` 사이에 좋은 이중성을 만듭니다: `iter(function, sentinel)` <-> `next(iterator, sentinel)`.

### 이전 제안(Previous Proposals)

이 제안은 새로운 아이디어가 아닙니다. 이 아이디어는 `python-dev`에서 BDFL (Guido van Rossum)의 지지를 받았으며, 심지어 원래 이터레이터 PEP인 PEP 234에서도 언급되었습니다.

### 반대 의견(Objections)

더 많은 내장 함수를 추가하는 것에 대한 몇 가지 반대 의견이 있었습니다. 특히 Martin von Loewis는 진정한 일반성(즉, 많은 프로그램에서 필요할 가능성)이 없는 한 더 많은 내장 함수 도입에 반대했습니다. 그는 `__next__()`의 일반적인 사용은 `for` 루프와 함께일 것이므로 명시적인 `next()` 호출은 자주 필요하지 않을 것이라고 주장했습니다. 또한, 대부분의 프로토콜이 내장 함수를 통해 명시적으로 호출되는 것이 아니며, 대신 `operator` 모듈의 메서드를 통해 명시적으로 호출될 수 있다고 언급했습니다. 따라서 전통에 따르면 `operator.next`가 되어야 한다고 제안했습니다. 대안으로, 객체에 기본적으로 `__next__()`를 호출하는 `.next()` 메서드를 추가할 것을 제안했습니다.

### 전환 계획(Transition Plan)

2to3 변환 도구에 두 가지 추가 변환이 추가됩니다:
1.  `next`라는 이름의 메서드 정의는 `__next__`로 이름이 변경됩니다.
2.  `next` 메서드에 대한 명시적인 호출은 내장 함수 `next()`에 대한 호출로 대체됩니다. 예를 들어, `x.next()`는 `next(x)`가 됩니다.

Collin Winter는 `next`에 대한 모듈 수준 바인딩의 존재 여부에 따라 두 번째 변환을 자동으로 수행할 가능성을 조사했으며, "추하고 느릴" 것이라는 것을 발견했습니다. 대신, 변환 도구는 그러한 바인딩을 감지할 때 경고를 발생시킬 것입니다.

### 승인 및 구현(Approval and Implementation)

이 PEP는 2007년 3월 6일 Guido van Rossum에 의해 수락되었습니다. 2to3 도구를 제외한 필요한 변경 사항이 포함된 패치는 Georg Brandl이 작성하여 리비전 54910으로 커밋되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.