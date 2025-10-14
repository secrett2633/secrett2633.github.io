---
title: "[Final] PEP 308 - Conditional Expressions"
excerpt: "Python Enhancement Proposal 308: 'Conditional Expressions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/308/
toc: true
toc_sticky: true
date: 2025-09-26 18:10:46+0900
last_modified_at: 2025-09-26 18:10:46+0900
published: true
---
> **원문 링크:** [PEP 308 - Conditional Expressions](https://peps.python.org/pep-0308/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 07-Feb-2003

## PEP 308 – 조건부 표현식 (Conditional Expressions) 번역 및 요약

### 개요
PEP 308은 Python에 조건부 표현식을 추가하는 제안입니다. 이 PEP는 "X if C else Y" 형태의 조건부 표현식이 Python 2.5에 추가될 것을 확정지었습니다. 주된 동기는 `and` 및 `or` 연산자를 사용하여 유사한 효과를 얻으려던 시도들이 오류 발생 가능성이 높았기 때문입니다.

### 도입 배경
이전에도 조건부 표현식 추가에 대한 커뮤니티의 요구가 있었으나, 최적의 구문에 대한 합의 부족으로 번번이 좌절되었습니다. 이 문제는 최종적으로 BDFL(자비로운 종신 독재자, Guido van Rossum)의 판단에 따라 해결되었습니다. BDFL은 표준 라이브러리 전체에 새로운 구문을 적용하여 실제 사용 사례를 검토함으로써 이 결정의 유효성을 확인했습니다.

### 제안 내용: `X if C else Y`
2005년 9월 29일, Guido van Rossum은 `X if C else Y` 형태의 조건부 표현식을 추가하기로 결정했습니다.

**동작 방식:**
1. 먼저 `C` (조건)이 평가됩니다.
2. `C`가 참(True)이면 `X`가 평가되고 전체 표현식의 결과가 됩니다.
3. `C`가 거짓(False)이면 `Y`가 평가되고 전체 표현식의 결과가 됩니다.

**문법 변경:**
Python의 문법에 다음과 같은 변경이 적용되었습니다:
```
test: or_test ['if' or_test 'else' test] | lambdef
or_test: and_test ('or' and_test)*
...
```

**하위 호환성:**
새로운 구문은 거의 사소한 문법적 하위 호환성 문제를 일으킬 수 있었습니다. 이전 Python 버전에서는 `[f for f in lambda x: x, lambda x: x**2 if f(1) == 1]` 와 같은 리스트 컴프리헨션(List Comprehension)이 유효했습니다. 하지만 Python 3.0에서는 람다(lambda) 시리즈를 괄호로 묶어야 합니다 (예: `[f for f in (lambda x: x, lambda x: x**2) if f(1) == 1]`). 이는 `lambda`가 `if-else` 표현식보다 결합력이 약하기 때문입니다.

Python 2.5에서는 약간 다른 문법이 사용되어 하위 호환성을 더 유지했지만, 이 위치에서 사용되는 람다의 본문에 괄호 없는 조건 표현식을 포함하는 것을 금지함으로써 람다의 문법을 제약했습니다. 예를 들어, `[f for f in 1, lambda x: x if x >= 0 else -1]`는 유효하지 않습니다. 대신 `[f for f in 1, (lambda x: x if x >= 0 else -1)]` 또는 `[f for f in 1, lambda x: (x if x >= 0 else -1)]`와 같이 괄호를 사용해야 합니다.

### 대안 및 논의
과거에 다양한 조건부 표현식 구문이 제안되었고 논의되었습니다:
*   **`(if <condition>: <expression1> else: <expression2>)`**: 괄호가 필수이며, `elif` 확장이 가능합니다. 문장 구문과의 혼동 가능성, 콜론(colon)의 의미 과부하 등의 단점이 지적되었습니다.
*   **`<condition> and <expression1> else <expression2>`**: `and/or` 연산자를 기반으로 한 최소 침습적(minimally invasive) 변경으로 제안되었으나, `else`가 `and`의 기존 의미를 변경한다는 지적이 있었습니다.
*   **`<condition> then <expression1> else <expression2>`**: 간단한 시각적 분석, 괄호 불필요, 기존 키워드 의미 변경 없음 등의 장점이 있었으나, 새 키워드 도입 비용이 단점으로 지적되었습니다.
*   **`C-언어 스타일: <condition> ? <expression1> : <expression2>`**: Eric Raymond가 구현하기도 했으나, Python에서 콜론의 다양한 용도와 C-언어에 익숙하지 않은 사용자에게는 이해하기 어렵다는 이유로 BDFL이 거부했습니다.
*   **원래 PEP 제안: `<expression1> if <condition> else <expression2>`**: 이 제안은 순서가 뒤바뀐 배열이 많은 토론 참여자들에게 불편하다는 의견이 많았습니다. 특히 `<expression1>`이 길 경우, 조건부를 놓치기 쉽다는 지적이 있었습니다.
*   **내장 함수 (예: `cond(<condition>, <expression1>, <expression2>)`)**: 이 방식은 `expression1`과 `expression2`가 함수 호출 전에 모두 평가되어야 하므로 단락 평가(short-circuit evaluation)가 불가능하다는 단점이 있습니다. 키워드로 만들 경우에도 혼란을 줄 수 있습니다.

### 단락 평가 (Short-Circuit Behavior)
조건부 표현식에서 단락 평가는 매우 중요하게 고려되었습니다.
*   `X if C else Y` 구문은 `C`가 참이면 `X`만 평가하고, 거짓이면 `Y`만 평가하는 단락 평가를 지원합니다.
*   이는 `and` 및 `or` 연산자가 두 번째 피연산자를 첫 번째 피연산자에 따라 평가하는 방식과 유사합니다.

단락 평가는 다음과 같은 경우에 유용합니다:
*   표현식에 부수 효과(side-effects)가 있을 때
*   하나 또는 두 표현식 모두 리소스 집약적일 때
*   조건이 표현식의 유효성에 대한 가드(guard) 역할을 할 때

예시:
```python
data = source.readlines() if isinstance(source, file) else source.split()
```
이 경우, `readlines()`는 파일 포인터를 이동시키고, 긴 소스에 대해 두 대안 모두 시간이 걸리며, `split()`은 문자열에만, `readlines()`는 파일 객체에만 유효합니다. 단락 평가는 불필요한 연산을 방지하고 잠재적인 오류를 막을 수 있습니다. BDFL은 `if-then-else` 구문이 언어에 추가되려면 단락 평가 동작이 필수적이라고 보았습니다.

### 투표 결과
조건부 표현식 도입에 대한 커뮤니티 투표가 진행되었으며, 다양한 대안에 대한 지지도가 나뉘었습니다. 최종적으로 "X if C else Y" 구문이 가장 많은 지지를 얻어 채택되었습니다.

### 결론
PEP 308을 통해 Python 언어에 `X if C else Y` 형태의 조건부 표현식이 성공적으로 추가되었습니다. 이는 `and/or` 연산자의 오용을 줄이고, 더 간결하고 읽기 쉬운 코드를 작성할 수 있게 하며, 중요한 단락 평가 기능을 제공합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.