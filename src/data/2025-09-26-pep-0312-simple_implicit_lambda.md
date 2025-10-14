---
title: "[Deferred] PEP 312 - Simple Implicit Lambda"
excerpt: "Python Enhancement Proposal 312: 'Simple Implicit Lambda'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/312/
toc: true
toc_sticky: true
date: 2025-09-26 18:12:24+0900
last_modified_at: 2025-09-26 18:12:24+0900
published: true
---
> **원문 링크:** [PEP 312 - Simple Implicit Lambda](https://peps.python.org/pep-0312/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 11-Feb-2003

## PEP 312 – 간단한 암묵적 람다 (Simple Implicit Lambda) 번역 및 요약

### 개요
이 문서는 Python Enhancement Proposal (PEP) 312의 내용을 한국어 사용자가 이해하기 쉽도록 번역하고 정리한 것입니다. PEP 312는 특정 상황에서 인자가 없는 `lambda` 키워드를 선택적으로 생략할 수 있도록 제안하며, 이를 통해 코드의 가독성을 높이고 `lambda` 사용에 대한 심리적 장벽을 낮추고자 했습니다.

---

### PEP 312 – Simple Implicit Lambda

*   **저자:** Roman Suzi, Alex Martelli
*   **상태:** Deferred (보류됨)
*   **유형:** Standards Track
*   **생성일:** 2003년 2월 11일
*   **Python 버전:** 2.4 (대상)
*   **게시 이력:** 2005년 6월 17일 `python-dev` 메일링 리스트에서 논의됨

---

### Abstract (개요)

이 PEP는 문법적으로 모호하지 않은 특정 경우에 인자가 없는 `lambda` 키워드를 선택적으로 생략할 것을 제안합니다.

### Deferral (보류 이유)

BDFL(Benevolent Dictator For Life, 즉 Guido van Rossum)은 단항 콜론(unary colon) 구문을 싫어했습니다. 이 PEP는 "더 파이썬스러운" 구문(예: 대안적인 단항 연산자)을 찾기 위해 처음부터 다시 시작할 필요가 있다고 지적되었습니다. 2005년 6월 17일 `python-dev` 메일링 리스트에서 이에 대한 논의가 있었습니다.

또한, 가능성이 없는 대안적인 제안들을 제거하는 것이 좋다는 의견이 있었습니다. 예제 섹션은 가독성 개선점을 잘 보여주지만, 더 많은 예제와 추상적인 더미 호출 대신 실제 사용 사례를 포함하면 더 설득력이 있을 것이라는 의견도 있었습니다.

### Motivation (동기)

`lambda`는 콜백 함수나 (가짜) 지연 평가(lazy evaluation) 방식 등 익명 함수를 정의하는 데 유용합니다. 그러나 종종 `lambda` 키워드 자체가 코드를 복잡하게 보이게 한다는 이유로, 적절한 상황에서도 `lambda`가 사용되지 않는 경우가 있습니다. 일부 특별한 경우에 `lambda` 키워드를 생략하는 것은 문법에 작고 하위 호환성을 유지하는 변경을 통해 가능하며, 이러한 "람다 공포증(lambdaphobia)"에 대한 저렴한 해결책을 제공할 수 있습니다.

### Rationale (제안 배경)

때로는 `lambda`라는 용어 뒤에 숨겨진 이론 때문에 사람들이 `lambda`를 사용하기를 꺼려 합니다. 이 제안은 `lambda` 키워드를 생략함으로써 인자가 없는 `lambda`를 더 쉽게 도입할 수 있도록 합니다. 구현은 문법을 간단히 변경하여 `lambda` 키워드가 몇 가지 잘 알려진 경우에 암묵적으로 사용될 수 있도록 하는 방식으로 이루어질 수 있습니다. 특히, 괄호로 감싸는 것은 nullary `lambda`를 어디에서나 지정할 수 있도록 합니다.

### Syntax (구문)

인자가 없는 `lambda` 키워드는 다음 경우에 생략될 수 있습니다.

*   이름 있는 매개변수 할당 또는 기본값 할당에서 `=` 직후
*   모든 표현식에서 `(` 직후
*   함수 인자 목록에서 `,` 직후
*   딕셔너리 리터럴에서 `:` 직후
*   (미구현) 할당문에서

새로운 구문은 콜론(`:`)과 뒤따르는 표현식으로 구성됩니다. 예를 들어, `:A`는 `lambda: A`와 동일합니다.

### Examples of Use (사용 예시)

#### Inline if

```python
def ifelse(cond, true_part, false_part):
    if cond:
        return true_part()
    else:
        return false_part()

# 기존 구문:
# print(ifelse(a < b, lambda: A, lambda: B))

# 새로운 구문:
print(ifelse(a < b, :A, :B)) #

# A와 B 부분은 다음과 같이 광범위한 처리가 필요할 수 있습니다:
print(ifelse(a < b, :ext_proc1(A), :ext_proc2(B))) #
```
여기서 `:A`와 `:B`는 각각 `lambda: A`와 `lambda: B`를 의미하며, 조건에 따라 `A` 또는 `B`가 지연 평가됩니다.

#### Locking (락킹)

```python
def with_lock(alock, acallable):
    alock.acquire()
    try:
        acallable()
    finally:
        alock.release()

with_lock(mylock, :x(y(), 23, z(), 'foo')) #
```
여기서 `:x(y(), 23, z(), 'foo')`는 `lambda: x(y(), 23, z(), 'foo')`와 동일하게 작동하여, `mylock`이 획득된 후에만 해당 함수 호출이 실행되도록 합니다.

### Implementation (구현)

구현을 위해서는 Python 소스의 `Grammar/Grammar` 파일을 수정하고, 문법적 및 실용적 변경을 위해 `Modules/parsermodule.c` 파일을 조정해야 합니다.

암묵적 `lambda`를 허용하기 위한 `Grammar` 파일의 변경 사항은 다음과 같습니다.

*   `imptest`: `test` 또는 `implambdef`
*   `implambdef`: `:` `test`

세 개의 새로운 비-터미널(non-terminal)이 필요합니다: 암묵적 `lambda`가 발생할 수 있는 `imptest`, 암묵적 `lambda` 정의 자체를 위한 `implambdef`, 그리고 `imptest`들이 발생할 수 있는 `imptestlist`.

이 구현은 불완전하며, `Parser` 모듈의 일부 파일 업데이트가 필요하고, `Syntax` 섹션에서 언급된 추가적인 위치들이 구현되지 않았습니다.

### Discussion (논의)

이 기능은 `lambda` 키워드의 부재를 제외하고는 시각적으로 크게 드러나지 않는 특징입니다. 이 기능은 nullary `lambda`를 문법적으로 더 매력적으로 만들고, 일부 간단한 경우에 표현식의 지연 평가를 제공하는 것을 목표로 합니다. 이 제안은 `lambda`에 인자가 필요한 고급 사례를 목표로 하지 않습니다.

**대안 제안:**
인자가 사용되지 않는 암묵적 `lambda`에 대한 대안적인 제안도 있었습니다. 이 경우, 그러한 `lambda`에 의해 정의된 함수는 어떤 매개변수도 받아들일 수 있으며, `lambda *args: expr`와 동일하게 작동합니다. 이 형태는 더 강력할 수 있으며, 표준 라이브러리에서 실제로 그러한 `lambda`가 사용되는 경우가 있음을 보여주었습니다.

**추가 확장 가능성:**
암묵적 `lambda`에 의해 정의된 함수에 매개변수 목록을 전달하는 방법을 제공하는 또 다른 확장도 가능합니다. 그러나 이러한 매개변수들은 접근을 위해 특별한 이름이 필요하며 언어에 포함될 가능성은 낮다고 보았습니다. 가능한 지역 이름으로는 `_`, `__args__`, `__` 등이 제안되었으나, 이러한 형태는 그다지 보기 좋지 않으며, PEP 작성자의 의견으로는 그러한 경우에 `lambda` 키워드 제거를 정당화하지 못한다고 보았습니다.

### Credits (기여자)

`lambda`를 생략하는 아이디어는 2003년 2월 8일 comp.lang.python에서 Paul Rubin이 "For review: PEP 308 - If-then-else expression" 스레드를 논의하던 중 처음 제기했습니다.

### References (참고 자료)

*   Guido van Rossum, Recommend accepting PEP 312 – Simple Implicit Lambda, `python-dev` 메일링 리스트.
*   Guido van Rossum, For review: PEP 308 - If-then-else expression, `python-dev` 메일링 리스트.

### Copyright (저작권)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.