---
title: "[Rejected] PEP 284 - Integer for-loops"
excerpt: "Python Enhancement Proposal 284: 'Integer for-loops'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/284/
toc: true
toc_sticky: true
date: 2025-09-26 17:57:40+0900
last_modified_at: 2025-09-26 17:57:40+0900
published: true
---
> **원문 링크:** [PEP 284 - Integer for-loops](https://peps.python.org/pep-0284/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 01-Mar-2002



## PEP 284 – 정수 `for` 루프

*   **작성자:** David Eppstein, Gregory Ewing
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2002년 3월 1일
*   **Python 버전:** 2.3

### 요약 (Abstract)

이 PEP는 `for` 키워드 뒤에 허용되는 표현식의 범위를 확장하여 `for lower <= var < upper:`와 같은 세 가지 비교 (three-way comparison)를 허용함으로써, 정수 구간 (intervals of integers)에 대한 반복 (iteration)을 단순화할 것을 제안합니다. 이는 현재의 `for item in list:` 문법을 대체하게 됩니다. 이 새로운 루프 또는 리스트 반복은 주어진 구간의 왼쪽 끝점부터 시작하여 비교를 참으로 만드는 `var`의 모든 값에 대해 반복하게 됩니다.

### 선언 (Pronouncement)

이 PEP는 거부되었습니다. 제안에는 해결 가능한 여러 문제점들이 있었지만 (2005년 6월 18일 Raymond Hettinger의 python-dev 게시물에 나열된 수정 사항들을 참고하십시오), 수정 사항들을 적용하더라도 이 제안은 지지를 얻지 못했습니다. 특히, Guido van Rossum은 `range()` 형식에 수정이 필요하다는 전제를 받아들이지 않았습니다. 그는 "15년 전 `range()`의 핵심은 숫자 반복을 위한 별도의 문법을 필요 없게 만드는 것이었습니다. 저는 그것이 잘 작동했다고 생각하며, 수정할 필요가 없습니다 (다만 `range()`가 이터레이터가 되어야 하는데, 이는 Python 3.0에서 그렇게 될 것입니다)."라고 언급했습니다.

### 배경 (Rationale)

Python의 `for` 루프에서 가장 흔한 용도 중 하나는 정수 구간을 반복하는 것입니다. Python은 이러한 구간을 위한 리스트와 이터레이터를 생성하기 위해 `range()` 및 `xrange()` 함수를 제공하며, 이는 가장 빈번한 경우인 0부터 증가하는 반개방 (half-open) 구간에 가장 잘 작동합니다. 그러나 `range()` 문법은 개방 (open) 또는 폐쇄 (closed) 구간에 대해서는 다루기 어렵고, 반복 순서를 반전시킬 때 대칭성이 부족합니다. 또한, 익숙하지 않은 함수 호출은 Python 초보자가 `range()`나 `xrange()`를 사용하는 코드를 이해하기 어렵게 만듭니다.

자연스럽고 직관적인 정수 반복 문법의 부재는 `python-list`에서 뜨거운 논쟁을 불러일으켰으며, 이 PEP 이전에 최소 4개의 PEP를 탄생시켰습니다.

*   **PEP 204 (거부됨):** 정수 범위에 Python의 슬라이스 (slice) 문법을 재사용할 것을 제안하여 더 간결한 문법을 제공했지만, 다중 인자 `range()`의 가독성 문제를 해결하지 못했습니다.
*   **PEP 212 (연기됨):** 현재의 `range(len(list))` 관용구 대신 리스트를 정수 인덱스 시퀀스로 직접 변환하기 위한 여러 문법을 제안했습니다.
*   **PEP 281:** `range(list)`와 같이 작성할 수 있도록 하여 동일한 관용구를 단순화할 것을 제안합니다.
*   **PEP 276:** 정수를 이터레이터로 자동 변환하는 것을 허용하여 가장 일반적인 반개방 (half-open) 경우를 단순화했지만, 다른 유형의 구간의 복잡성은 다루지 않았습니다.

추가적인 대안들은 `python-list`에서 논의되었습니다.

여기서 설명하는 해결책은 `for` 키워드 뒤에 세 가지 비교를 허용하는 것입니다. 이는 `for` 루프와 리스트 컴프리헨션 (list comprehension)의 맥락에서 모두 사용될 수 있습니다.

```python
for lower <= var < upper:
```

이는 비교문의 왼쪽 경계에서 시작하여 오른쪽 경계에서 끝나는 연속적인 정수 구간에 대한 반복을 유발합니다. 사용된 정확한 비교 연산자는 구간이 양쪽 끝에서 개방인지 폐쇄인지, 그리고 정수가 오름차순 또는 내림차순으로 고려되는지 여부를 결정합니다.

이 문법은 표준 수학 표기법과 밀접하게 일치하므로, 현재의 `range()` 문법보다 Python 초보자에게 더 친숙할 가능성이 있습니다. 개방 및 폐쇄 구간의 끝점은 표현하기 똑같이 쉽고, 정수 구간의 역전은 단순히 두 끝점을 바꾸고 비교를 반전시킴으로써 형성될 수 있습니다. 또한, 이러한 루프의 의미는 기존 Python `for` 루프를 해석하는 한 가지 방식과 밀접하게 유사합니다.

```python
for item in list
```

는 `item in list` 표현식을 참으로 만드는 `item`의 정확한 값들을 반복합니다. 유사하게, 새로운 형식 `for lower <= var < upper:`는 `lower <= var < upper` 표현식을 참으로 만드는 `var`의 정확한 정수 값들을 반복합니다.

### 명세 (Specification)

현재 `for` 문의 문법은 다음과 같습니다.

```
for_stmt: "for" target_list "in" expression_list ":" suite ["else" ":" suite]
```

이를 다음과 같이 확장할 것을 제안합니다.

```
for_stmt: "for" for_test ":" suite ["else" ":" suite]
for_test: target_list "in" expression_list
        | or_expr less_comp or_expr less_comp or_expr
        | or_expr greater_comp or_expr greater_comp or_expr
less_comp: "<" | "<="
greater_comp: ">" | ">="
```

마찬가지로, 현재의 리스트 컴프리헨션 (list comprehension) 문법도 확장할 것을 제안합니다.

```
list_for: "for" expression_list "in" testlist [list_iter]
```

이를 다음으로 대체합니다.

```
list_for: "for" for_test [list_iter]
```

모든 경우에 `for_test`에 의해 형성된 표현식은 표현식 내 비교와 동일한 우선순위 규칙을 따릅니다. `for_test` 내의 두 `comp_operator`는 유사한 유형이어야 합니다. 이는 이러한 제한이 없는 표현식 내의 연결된 비교 (chained comparisons)와는 다릅니다.

`for` 루프 문법의 왼쪽과 오른쪽에 나타나는 두 `or_expr`를 루프의 *경계 (bounds)*라고 하고, 가운데 `or_expr`를 루프의 *변수 (variable)*라고 합니다. 새로운 문법을 사용하는 `for` 루프가 실행될 때, 두 경계에 대한 표현식이 평가되고, 사용된 비교 연산자에 따라 두 경계 사이의 모든 정수를 반복하는 이터레이터 객체가 생성됩니다. 이 이터레이터는 왼쪽 경계와 같거나 가까운 정수로 시작하여, 비교 연산자가 `less_comp` 또는 `greater_comp`로 설명된 집합에 있는 경우 각각 +1 또는 -1의 스텝 (step) 크기로 나머지 정수를 단계적으로 진행합니다. 그런 다음 실행은 표현식이 `for variable in iterator`였던 것처럼 진행되며, 여기서 "variable"은 루프의 변수를, "iterator"는 주어진 정수 구간을 위해 생성된 이터레이터를 나타냅니다.

정수 `for` 루프에서 루프 변수가 취하는 값은 경계의 크기에 따라 일반 정수 (plain integers) 또는 긴 정수 (long integers)일 수 있습니다. 정수 `for` 루프의 두 경계는 모두 실수 숫자 유형 (정수, long, 또는 float)으로 평가되어야 합니다. 다른 값은 `for` 루프 문이 `TypeError` 예외를 발생시키게 됩니다.

### 쟁점 (Issues)

이 제안과 관련 제안들을 Python 리스트에서 논의하는 동안 다음과 같은 쟁점들이 제기되었습니다.

*   **오른쪽 경계는 한 번만 평가되어야 하는가, 아니면 루프를 돌 때마다 평가되어야 하는가?**
    왼쪽 경계가 한 번만 평가되는 것은 명확합니다. 일관성과 효율성을 위해 오른쪽 경계에도 동일한 규칙을 적용하기로 했습니다.

*   새로운 문법이 정수 `for` 루프를 상당히 단순화하지만, 새로운 문법을 사용하는 리스트 컴프리헨션은 그만큼 단순하지 않습니다. 우리는 `for` 루프가 컴프리헨션보다 더 자주 사용되므로 이것이 적절하다고 생각합니다.

*   이 제안은 `xrange`에 의해 생성될 수 있는 정수 이터레이터 객체에 대한 접근을 허용하지 않습니다.
    이는 사실이지만, 우리는 이것을 이 제안의 범위를 넘어선 일반적인 리스트 컴프리헨션 문법의 단점으로 봅니다. 또한, `xrange()`는 계속 사용할 수 있습니다.

*   이 제안은 1과 -1 이외의 증가분 (increments)을 허용하지 않습니다.
    더 일반적인 등차수열 (arithmetic progressions)은 `range()` 또는 `xrange()`, 또는 `[2*x for 0 <= x <= 100]`와 같은 리스트 컴프리헨션 문법으로 생성해야 합니다.

*   세 가지 비교의 중간에 루프 변수가 위치하는 것은 현재의 `for item in list` 문법의 변수만큼 명확하지 않아 가독성 손실을 초래할 수 있습니다.
    우리는 이러한 손실이 자연스러운 정수 반복 문법으로 인한 가독성 증가로 상쇄된다고 생각합니다.

*   어느 정도 이 PEP는 PEP 276과 동일한 쟁점들을 다룹니다. 우리는 PEP 276이 주로 0부터 시작하는 반개방 범위 (`range()`의 쉬운 경우)에 초점을 맞추는 반면, 이 PEP는 주로 다른 모든 경우를 단순화하는 데 초점을 맞추므로 두 PEP가 상충하지 않는다고 생각합니다. 그러나 이 PEP가 승인된다면, 정수 루프를 위한 새로운 더 간단한 문법은 어느 정도 PEP 276의 동기를 감소시킬 수 있습니다.

*   정수 루프에 부동 소수점 (floating point) 경계를 허용하는 것이 합리적인지 불분명합니다.
    만약 float가 부정확한 값을 나타낸다면, 정확한 정수 시퀀스를 결정하는 데 어떻게 사용될 수 있을까요? 반면에, float 경계를 허용하지 않으면 `floor()`와 `ceiling()`을 정수 `for` 루프에서 사용하기 어렵게 만들 것입니다. 이는 현재 `range()`에서도 어려운 점입니다. 우리는 유연성을 우선했지만, 이는 주어진 비교를 참으로 만드는 가장 작은 및 가장 큰 정수 값을 결정하는 데 구현상의 어려움을 초래할 수 있습니다.

*   `int`, `long`, `float` 외의 유형이 경계로 허용되어야 하는가?
    또 다른 선택은 모든 경계를 `int()`로 정수로 변환하고, float뿐만 아니라 그렇게 변환될 수 있는 모든 것을 경계로 허용하는 것입니다. 그러나 이것은 의미를 변경할 것입니다. 예를 들어, `0.3 <= x`는 `int(0.3) <= x`와 같지 않으며, 하한 (lower bound)이 0.3인 루프가 0에서 시작하는 것은 혼란스러울 것입니다. 또한, 일반적으로 `int(f)`는 `f`와 매우 다를 수 있습니다.

### 구현 (Implementation)

현재 구현은 제공되지 않습니다. 구현은 큰 어려움을 초래할 것으로 예상되지 않습니다. 필요한 경우, 각 `for` 키워드 뒤에 일반 표현식을 파싱하고 표현식의 최상위 (top level) 연산이 "in" 또는 세 가지 비교인지 테스트함으로써 새로운 문법을 인식할 수 있습니다. Python 컴파일러는 새로운 문법의 모든 인스턴스를 특별한 이터레이터 객체 내 항목에 대한 루프로 변환할 것입니다.

### 참고 자료 (References)

 Raymond Hettinger, Propose updating PEP 284 – Integer for-loops
<https://mail.python.org/pipermail/python-dev/2005-June/054316.html>

### 저작권 (Copyright)

이 문서는 공개 도메인 (public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.