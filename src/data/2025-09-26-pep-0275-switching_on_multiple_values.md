---
title: "[Rejected] PEP 275 - Switching on Multiple Values"
excerpt: "Python Enhancement Proposal 275: 'Switching on Multiple Values'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/275/
toc: true
toc_sticky: true
date: 2025-09-26 17:53:28+0900
last_modified_at: 2025-09-26 17:53:28+0900
published: true
---
> **원문 링크:** [PEP 275 - Switching on Multiple Values](https://peps.python.org/pep-0275/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 10-Nov-2001


# PEP 275 – 다중 값 스위칭 (Switching on Multiple Values)

*   **저자:** Marc-André Lemburg
*   **상태:** Rejected (거절됨)
*   **유형:** Standards Track
*   **생성일:** 2001년 11월 10일
*   **Python 버전:** 2.6
*   **사후 이력:** (생략)

## 거절 공지 (Rejection Notice)

Python 3000을 위한 유사한 PEP인 PEP 3103이 이미 거절되었기 때문에, 이 제안 또한 받아들여질 가능성이 없습니다.

## 개요 (Abstract)

이 PEP는 단일 변수가 여러 가능한 값 중 하나를 가질 때 스위칭(switching)을 처리하는 Python의 성능을 향상하기 위한 전략을 제안합니다.

## 문제 (Problem)

Python 2.5까지, 다중 값 스위치를 작성하는 일반적인 방법은 다음과 같은 긴 `if-elif-else` 구문을 사용하는 것이었습니다.

```python
if x == 'first state':
    ...
elif x == 'second state':
    ...
elif x == 'third state':
    ...
elif x == 'fourth state':
    ...
else:
    # default handling
    ...
```

이 방식은 짧은 스위치 구문에는 잘 작동합니다. 지역 변수(`x`)를 반복적으로 로드하고 상수에 비교하는 오버헤드가 낮기 때문입니다 (평균적으로 O(n)의 복잡도를 가집니다). 하지만, 파서(parser) 작성에 필요한 스테이트 머신(state machine)을 작성할 때 이러한 구문을 사용하면 가능한 상태의 수가 쉽게 10개 이상에 도달할 수 있습니다.

이 문제에 대한 현재의 해결책은 디스패치 테이블(dispatch table)을 사용하여 스위치 변수 값에 따라 실행할 케이스 구현 메서드를 찾는 것입니다 (이는 완전 해시 테이블(perfect hash tables) 등을 사용하여 평균적으로 O(1)의 복잡도로 조정될 수 있습니다). 이 방식은 다양한 케이스 메서드에서 복잡하고 긴 처리를 요구하는 스테이트 머신에는 잘 작동합니다. 그러나 각 케이스당 한두 개의 명령만 처리하는 경우에는 성능이 좋지 않습니다. 예를 들어:

```python
def handle_data(self, data):
    self.stack.append(data)
```

이러한 경우의 좋은 예시는 Python 객체를 직렬화(serialize)하는 데 사용되는 `pickle.py`에 구현된 스테이트 머신입니다. 다른 대표적인 사례로는 XML SAX 파서 및 인터넷 프로토콜 핸들러가 있습니다.

## 제안된 해결책 (Proposed Solutions)

이 PEP는 서로 다르지만 반드시 상충하지는 않는 두 가지 해결책을 제안합니다.

1.  위에서 언급된 `if-elif-else` 구문을 감지하고 점프 오프셋(jump offsets)을 저장하기 위한 읽기 전용 딕셔너리(read-only dictionary)를 사용하는 특수 Opcode를 생성하는 Python 컴파일러 및 VM(가상 머신)에 최적화를 추가합니다.
2.  C 스타일의 `switch` 문을 모방하는 새로운 구문을 Python에 추가합니다.

첫 번째 해결책은 언어에 새로운 키워드를 추가하지 않는다는 장점이 있는 반면, 두 번째 해결책은 더 깔끔해 보입니다. 두 해결책 모두 스위칭 변수가 불변(immutable)이고 해시 가능(hashable)하다는 것을 보장하기 위해 일부 런타임 오버헤드를 수반합니다.

두 해결책 모두 올바른 점프 위치를 찾기 위해 딕셔너리 룩업(dictionary lookup)을 사용하므로, 스위치 변수와 상수가 모두 딕셔너리 구현과 호환되어야 한다는 동일한 문제 공간을 공유합니다 (해시 가능, 비교 가능, `a==b`이면 `hash(a)==hash(b)`).

### 해결책 1: `if-elif-else` 최적화 (Optimizing `if-elif-else`)

**구현 (Implementation):**
컴파일러가 다음 시그니처를 가진 `if-elif-else` 구문을 감지할 수 있어야 합니다.

```python
if x == 'first':
    ...
elif x == 'second':
    ...
else:
    ...
```

즉, 좌변은 항상 동일한 변수를 참조하고, 우변은 해시 가능한 불변(immutable) 내장 타입(built-in type)이어야 합니다. 우변들은 반드시 모두 같은 타입일 필요는 없지만, 좌변 스위치 변수의 타입과 비교 가능해야 합니다.

컴파일러는 그 후 읽기 전용 (완벽) 해시 테이블을 설정하고, 이를 상수에 저장한 다음, 표준 `if-elif-else` 바이트 코드 스트림 앞에 `SWITCH` Opcode를 추가할 수 있습니다. 이 Opcode는 다음 런타임 동작을 트리거합니다.

런타임 시 `SWITCH` Opcode는 `x`가 잘 알려진 불변 타입(문자열, 유니코드, 숫자) 중 하나인지 확인하고 해시 테이블을 사용하여 올바른 Opcode 스니펫을 찾습니다. 이 조건이 충족되지 않으면 인터프리터는 `SWITCH` Opcode를 단순히 건너뛰고 일반적인 `if-elif-else` 바이트 코드 스트림으로 진행하여 표준 `if-elif-else` 처리로 되돌아가야 합니다.

**문제점 (Issues):**
*   새로운 최적화는 현재 Python의 의미론(semantics)을 변경해서는 안 됩니다 (최적화의 영향을 받는 `if-elif-else` 구문에서 `__cmp__` 호출 수를 줄이고 `__hash__` 호출을 추가함으로써). 이를 보장하기 위해, 스위칭은 "`from __future__`" 스타일 플래그가 사용되거나, 스위칭 변수가 `int`, `float`, `string`, `unicode` 등 내장 불변 타입(서브타입은 불변 여부가 불분명하므로 제외) 중 하나인 경우에만 안전하게 구현될 수 있습니다.
*   점프 테이블 딕셔너리의 사후 수정(post-modifications)을 방지하기 위해 (이는 보호된 코드에 도달하는 데 사용될 수 있음), 점프 테이블은 읽기 전용 타입(예: 읽기 전용 딕셔너리)이어야 합니다.
*   이 최적화는 최소 `n`개 이상의 케이스를 가진 `if-elif-else` 구문에만 사용되어야 합니다 (`n`은 성능 테스트에 따라 정의될 숫자).

### 해결책 2: Python에 `switch` 문 추가 (Adding a `switch` statement to Python)

**새로운 구문 (New Syntax):**

```python
switch EXPR:
    case CONSTANT: SUITE
    case CONSTANT: SUITE
    ...
    else: SUITE
```

("else" 부분은 선택 사항입니다.) `else` 부분이 주어지지 않고 정의된 케이스 중 일치하는 것이 없으면 아무런 동작도 취해지지 않고 `switch` 문은 무시됩니다. 이는 현재 `if` 문의 동작과 일치합니다. 예외를 사용하여 이 상황을 알리고 싶은 사용자는 의도된 동작을 구현하는 `else` 분기를 정의할 수 있습니다.

상수들은 반드시 모두 같은 타입일 필요는 없지만, 스위치 변수의 타입과 비교 가능해야 합니다.

**구현 (Implementation):**
컴파일러는 이를 다음과 유사한 바이트 코드(bytecode)로 컴파일해야 합니다 (POP_TOP 및 SET_LINENO는 생략).

```python
def whatis(x):
    switch(x):
        case 'one': print '1'
        case 'two': print '2'
        case 'three': print '3'
        else: print "D'oh!"
```

위 코드는 `SWITCH` Opcode가 `x`에 따라 14, 22, 30 또는 38로 점프하도록 컴파일됩니다.

**문제점 (Issues):**
*   `switch` 문은 (C 언어의 `switch` 문처럼) fall-through 동작을 구현해서는 안 됩니다. 각 `case`는 `if-elif-else` 문과 매우 유사하게 완전하고 독립적인 스위트(suite)를 정의합니다. 이는 루프 내의 `switch` 문에서 `break`를 사용하는 것도 가능하게 합니다.
*   인터프리터가 스위치 변수 `x`가 해시 가능하지 않다는 것을 발견하면, 런타임 시 `TypeError`를 발생시켜 문제를 지적해야 합니다.
*   기존 키워드를 재사용하고 새로운 키워드("switch" 및 "case")를 추가하는 것을 피하는 다른 구문 제안들이 있었습니다. 다른 이들은 C 키워드와 이름은 같지만 의미론(예: `break` 없는 fall-through)이 약간 다르므로 새로운 용어를 사용해야 한다고 주장했습니다. 제안된 변형 중 일부는 다음과 같습니다.
    ```python
    case EXPR:
        of CONSTANT: SUITE
        of CONSTANT: SUITE
    else: SUITE

    case EXPR:
        if CONSTANT: SUITE
        if CONSTANT: SUITE
    else: SUITE

    when EXPR:
        in CONSTANT_TUPLE: SUITE
        in CONSTANT_TUPLE: SUITE
        ...
    else: SUITE
    ```
*   `switch` 문은 한 섹션에 여러 값을 허용하도록 확장될 수 있습니다 (예: `case 'a', 'b', 'c': ...`). 또 다른 제안된 확장으로는 값의 범위를 허용할 수 있습니다 (예: `case 10..14: ...`). 이러한 기능들은 아마도 나중에 고려되어야 하지만, 첫 번째 버전을 설계하고 구현할 때 염두에 두어야 합니다.

## 예시 (Examples)

다음 예시들은 모두 해결책 2에서 제안된 새로운 구문을 사용합니다. 그러나 이 모든 예시는 해결책 1에서도 작동할 것입니다.

```python
# switch EXPR:
#    case CONSTANT: SUITE
#    case CONSTANT: SUITE
#    ...
#    else: SUITE

# 예시 1: 기본 switch 문
switch x:
    case "first":
        print x
    case "second":
        x = x**2
        print x
    else:
        print "whoops!"

# 예시 2: 'of' 키워드 사용 (대체 구문 제안)
case x:
    of "first":
        print x
    of "second":
        print x**2
    else:
        print "whoops!"

# 예시 3: 'if' 키워드 사용 (대체 구문 제안)
case state:
    if "first":
        state = "second"
    if "second":
        state = "third"
    else:
        state = "first"

# 예시 4: 'when... in' 키워드 사용 (대체 구문 제안)
when state:
    in ("first", "second"):
        print state
        state = next_state(state)
    in ("seventh",):
        ...
        print "done"
    else:
        print "middle state"
        state = next_state(state)
        break # 루프를 빠져나옴!

# Jack Jansen이 찾은 또 다른 유용한 응용 (인자 타입에 따른 스위칭):
switch type(x).__name__:
    case 'int':
        SUITE
    case 'string':
        SUITE
```

## 범위 (Scope)

`"from __future__ import switch"`에 대해 설명해야 합니다.

## 기여자 (Credits)

*   Martin von Löwis (최적화 아이디어 관련 문제)
*   Thomas Wouters (switch 문 + 바이트 코드 컴파일러 예시)
*   Skip Montanaro (디스패칭 아이디어, 예시)
*   Donald Beaudry (switch 구문)
*   Greg Ewing (switch 구문)
*   Jack Jansen (타입 스위칭 예시)

## 참조 (References)

 `https://sourceforge.net/tracker/index.php?func=detail&aid=481118&group_id=5470&atid=305470`

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.