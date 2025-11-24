---
title: "[Rejected] PEP 212 - Loop Counter Iteration"
excerpt: "Python Enhancement Proposal 212: 'Loop Counter Iteration'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/212/
toc: true
toc_sticky: true
date: 2025-09-26 16:28:28+0900
last_modified_at: 2025-09-26 16:28:28+0900
published: true
---
> **원문 링크:** [PEP 212 - Loop Counter Iteration](https://peps.python.org/pep-0212/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 22-Aug-2000


# PEP 212 – 루프 카운터 반복 (Loop Counter Iteration)

*   **저자:** Peter Schneider-Kamp <nowonder at nowonder.de>
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2000년 8월 22일
*   **Python 버전:** 2.1
*   **이력:** (내용 없음)

## 거부 통지 (Rejection Notice)

이 PEP는 거부되었습니다. PEP 279에서 도입된 `enumerate()` 함수가 이 PEP에서 제안된 사용 사례를 충족하며, PEP 저자와 연락이 닿지 않았습니다.

## 서론 (Introduction)

이 PEP는 `for-루프`에서 루프 카운터를 노출하는 기능에 대해 설명합니다. 이는 자주 제안되는 기능이며, 이 PEP는 해당 기능의 상태와 소유권을 추적합니다. 기능에 대한 설명과 함께 이를 지원하기 위해 필요한 변경 사항을 설명합니다. 또한 메일링 리스트 포럼에서 진행된 논의를 요약하고, 필요한 경우 추가 정보에 대한 URL을 제공합니다. 이 파일의 CVS 개정 기록에는 확정적인 이력 정보가 포함되어 있습니다.

## 동기 (Motivation)

Python의 표준 `for-루프`는 시퀀스의 요소를 순회합니다. 하지만 종종 인덱스만 순회하거나 요소와 인덱스를 모두 순회해야 하는 경우가 있습니다.

이를 수행하기 위해 사용되는 일반적인 관용구(idiom)는 직관적이지 않습니다. 이 PEP는 인덱스를 노출하는 두 가지 다른 방법을 제안합니다.

## 루프 카운터 반복 (Loop counter iteration)

인덱스를 순회하기 위한 현재 관용구는 내장 함수 `range`를 사용합니다.

```python
for i in range(len(sequence)):
    # 인덱스 i를 사용한 작업
```

요소와 인덱스를 모두 순회하는 것은 이전 관용구나 새로운 내장 함수 `zip`을 사용하여 달성할 수 있습니다.

```python
for i in range(len(sequence)):
    e = sequence[i]
    # 인덱스 i와 요소 e를 사용한 작업
```

또는:

```python
for i, e in zip(range(len(sequence)), sequence):
    # 인덱스 i와 요소 e를 사용한 작업
```

## 제안된 해결책 (The Proposed Solutions)

세 가지 해결책이 논의되었습니다. 하나는 예약되지 않은 키워드를 추가하고, 다른 하나는 두 개의 내장 함수를 추가합니다. 세 번째 해결책은 시퀀스 객체에 메서드를 추가하는 것입니다.

### 예약되지 않은 키워드 인덱싱 (Non-reserved keyword indexing)

이 해결책은 `for-루프`의 문법을 확장하여 선택적인 `<variable> indexing` 절을 추가하는 것입니다. 이 절은 `in` 절 대신 사용될 수도 있습니다.

이렇게 하면 시퀀스의 인덱스를 순회하는 방식은 다음과 같습니다.

```python
for i indexing sequence:
    # 인덱스 i를 사용한 작업
```

마찬가지로 인덱스와 요소를 모두 순회하는 방식은 다음과 같습니다.

```python
for i indexing e in sequence:
    # 인덱스 i와 요소 e를 사용한 작업
```

### 내장 함수 `indices` 및 `irange` (Built-in functions `indices` and `irange`)

이 해결책은 두 개의 내장 함수 `indices`와 `irange`를 추가합니다. 이들의 의미는 다음과 같이 설명할 수 있습니다.

```python
def indices(sequence):
    return range(len(sequence))

def irange(sequence):
    return zip(range(len(sequence)), sequence)
```

이 함수들은 eagerly 또는 lazily하게 구현될 수 있으며, 여러 시퀀스 인수를 받도록 쉽게 확장할 수 있어야 합니다.

이 함수들을 사용하면 인덱스만 순회하거나 요소와 인덱스를 모두 순회하는 관용구가 단순해집니다.

```python
for i in indices(sequence):
    # 인덱스 i를 사용한 작업
for i, e in irange(sequence):
    # 인덱스 i와 요소 e를 사용한 작업
```

### 시퀀스 객체에 대한 메서드 (Methods for sequence objects)

이 해결책은 시퀀스에 `indices`, `items`, `values` 메서드를 추가하는 것을 제안합니다. 이 메서드들은 각각 인덱스만 순회, 인덱스와 요소 모두 순회, 요소만 순회를 가능하게 합니다.

이는 인덱스 순회와 요소 및 인덱스 동시 순회를 위한 관용구를 엄청나게 단순화할 것입니다.

```python
for i in sequence.indices():
    # 인덱스 i를 사용한 작업
for i, e in sequence.items():
    # 인덱스 i와 요소 e를 사용한 작업
```

추가적으로, 시퀀스 및 딕셔너리의 요소를 일관된 방식으로 순회할 수 있게 합니다.

```python
for e in sequence_or_dict.values():
    # 요소 e를 사용한 작업
```

## 구현 (Implementations)

세 가지 해결책 모두에 대해 SourceForge에 패치가 존재합니다.

*   `for i indexing a in l`: `for-루프` 카운터 노출
*   `indices()` 및 `irange()`를 내장 함수에 추가
*   `listobject`에 `items()` 메서드 추가

이 모든 제안은 BDFL(Benevolent Dictator For Life)에 의해 검토되고 거부되었습니다.

`indexing` 키워드는 문법에서 단순한 이름(NAME)이므로 `indexing`의 일반적인 사용을 방해하지 않습니다.

## 하위 호환성 문제 (Backward Compatibility Issues)

추가되는 키워드가 없고 기존 코드의 의미가 변경되지 않으므로, 세 가지 해결책 모두 기존 코드를 손상시키지 않고 구현할 수 있습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

## 참고 자료 (References)

 PEP 212 – Loop Counter Iteration | peps.python.org
 Lockstep Iteration, PEP 201
 http://sourceforge.net/patch/download.php?id=101138
 http://sourceforge.net/patch/download.php?id=101129
 http://sourceforge.net/patch/download.php?id=101178

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.