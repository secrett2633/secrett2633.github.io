---
title: "[Rejected] PEP 265 - Sorting Dictionaries by Value"
excerpt: "Python Enhancement Proposal 265: 'Sorting Dictionaries by Value'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/265/
toc: true
toc_sticky: true
date: 2025-09-26 17:48:48+0900
last_modified_at: 2025-09-26 17:48:48+0900
published: true
---
> **원문 링크:** [PEP 265 - Sorting Dictionaries by Value](https://peps.python.org/pep-0265/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 08-Aug-2001

PEP 265 – 값(Value)으로 딕셔너리 정렬

## 1. 개요 (Abstract)

이 PEP는 딕셔너리에 "값(value)으로 정렬"하는 기능을 추가할 것을 제안합니다. 이 제안의 주된 이점은 현재 초보자가 이해하기 어렵고 모든 개발자가 구현하기 번거로운 일반적인 Python 숙어(idiom)에 대해 "batteries included (기본 제공)" 지원을 제공하는 것입니다.

## 2. BDFL의 결정 (BDFL Pronouncement)

이 PEP는 **거부되었습니다 (Rejected)**. 그 이유는 Python 2.4에 `sorted()` 내장 함수가 도입되면서 이 기능의 필요성이 대부분 충족되었기 때문입니다.

예시:
*   값(value)을 기준으로 딕셔너리의 아이템을 정렬하려면:
    ```python
    >>> from operator import itemgetter
    >>> d = {'a':2, 'b':23, 'c':5, 'd':17, 'e':1}
    >>> sorted(d.items(), key=itemgetter(1), reverse=True)
    [('b', 23), ('d', 17), ('c', 5), ('a', 2), ('e', 1)]
    ```
   
*   값(value)을 기준으로 키(key)만 정렬하려면:
    ```python
    >>> sorted(d, key=d.__getitem__, reverse=True)
    ['b', 'd', 'c', 'a', 'e']
    ```
   

또한, Python 2.5의 `heapq.nlargest()` 함수는 가장 높은 값(value)을 가진 소수의 아이템만 찾는 일반적인 사용 사례를 해결합니다.
```python
>>> from heapq import nlargest
>>> from operator import itemgetter
>>> d = {'a':2, 'b':23, 'c':5, 'd':17, 'e':1}
>>> nlargest(2, d.items(), itemgetter(1))
[('b', 23), ('d', 17)]
```


## 3. 도입 배경 (Motivation)

딕셔너리의 일반적인 사용 사례 중 하나는 발생 횟수를 세는 것입니다. 특정 `key`가 처음 등장하면 `d[key]`의 값을 1로 설정하고, 이후 등장할 때마다 값을 증가시킵니다. `get()` 메서드를 사용하면 이 작업을 간결하게 수행할 수 있습니다.

```python
d[key] = d.get(key, 0) + 1
```


모든 발생 횟수를 센 후에는, 결과 딕셔너리를 발생 횟수(값) 순서대로 출력하는 경우가 많으며, 종종 가장 큰 값부터 출력합니다. 이는 딕셔너리의 아이템을 값(value)으로 정렬할 필요로 이어집니다.

Python에서 이를 수행하는 일반적인 방법은 다음과 같습니다.
1.  `d.items()`를 사용하여 딕셔너리의 아이템 리스트를 얻습니다.
2.  각 아이템 튜플의 순서를 `(key, value)`에서 `(value, key)`로 바꿉니다 (반전시킵니다).
3.  리스트를 정렬합니다. Python은 튜플의 첫 번째 아이템을 기준으로 리스트를 정렬하므로, 이렇게 하면 (반전된) 아이템 리스트가 값(value)으로 정렬됩니다.
4.  원한다면 리스트를 뒤집고, 튜플을 다시 `(key, value)`로 되돌릴 수 있습니다. (하지만 대부분의 경우 `(value, key)` 순서로도 충분합니다.)

예시:
```python
>>> d = {'a':2, 'b':23, 'c':5, 'd':17, 'e':1}
>>> items = [(v, k) for k, v in d.items()] # (value, key) 튜플 리스트 생성
>>> items.sort() # 값으로 정렬
>>> items.reverse() # 내림차순으로 만들기 (가장 큰 값이 먼저 오도록)
>>> items = [(k, v) for v, k in items] # 다시 (key, value)로 변환

>>> items
[('b', 23), ('d', 17), ('c', 5), ('a', 2), ('e', 1)]
```


이 방법은 작동하지만 두 가지 면에서 "사용하기 어렵습니다".
1.  이 숙어(idiom)는 숙련된 Python 개발자에게는 알려져 있지만, 초보자에게는 그 알고리즘(아이템 튜플 순서 반전)이나 구현 방식(고급 기능인 리스트 컴프리헨션 사용) 면에서 전혀 분명하지 않습니다.
2.  반복적으로 많은 "번거로운(grunge)" 코드를 입력해야 하므로, 지루하고 실수를 유발할 수 있습니다.

따라서 PEP 265는 Python이 초보자가 이해하기 쉽고(또는 이해할 필요조차 없이) 모든 사용자가 사용하기 쉬운, 딕셔너리를 값(value)으로 정렬하는 방법을 제공하기를 원했습니다.

## 4. 제안된 해결책 (Rationale)

팀 피터스(Tim Peters)가 지적했듯이, 이 종류의 문제는 "모든 사람에게 모든 것이 되려"는 문제를 야기합니다. 따라서, PEP는 범위를 제한하여 "적절한 지점(sweet spot)"을 목표로 삼으려 했습니다. 특이한 경우(예: 사용자 정의 비교 함수를 통한 정렬)는 기존 방법을 사용하여 "수동으로" 처리할 수 있습니다.

몇 가지 간단한 가능성들이 논의되었습니다.

### 4.1. `items()` 메서드에 파라미터 추가

딕셔너리의 `items()` 메서드에 새 파라미터를 추가하여 완전한 하위 호환성을 유지할 수 있습니다.

*   **(1) `items(sort_by_values=0, reversed=0)`**
*   **(2) `items(sort_by_values=0)`**: 리스트를 뒤집는 것은 충분히 쉽기 때문에 `reversed` 파라미터는 생략할 수 있습니다.

또는 `items()`가 단순히 `(key, value)` 순서를 제어하게 할 수 있습니다.

*   **(3) `items(values_first=0)`**:
    이 방식은 다른 방식보다 적은 작업을 수행하지만, 값으로 정렬 문제에서 가장 복잡하고 까다로운 부분인 아이템 튜플의 순서를 반전시키는 것을 용이하게 합니다.
    사용 예시:
    ```python
    items = d.items(1) # (value, key) 순서로 아이템을 가져옴
    items.sort()
    items.reverse() # (원하는 경우)
    ```
   
    이 세 가지 접근 방식의 주요 단점은 파라미터가 없는 `items()` 호출 시 기본 파라미터 처리에 따른 추가 오버헤드입니다. (하지만 `items()`가 주로 값으로 정렬된 리스트를 생성하는 데 사용된다고 가정하면 실제로는 단점이 아닐 수 있습니다.)

### 4.2. 새로운 딕셔너리 메서드 추가

"정렬"을 구현하는 새로운 딕셔너리 메서드를 추가하는 대안도 있습니다. 이 접근 방식은 두 가지 이점을 제공합니다.
1.  `items()` 메서드에 오버헤드를 추가하는 것을 방지합니다.
2.  초보자에게 더 접근하기 쉽습니다. 딕셔너리를 정렬하는 메서드를 찾을 때 이 메서드를 발견하고, 값으로 정렬을 달성하기 위해 튜플 반전 및 리스트 정렬의 미묘한 부분을 이해할 필요가 없습니다.

키/값으로 정렬하고 오름차순/내림차순으로 정렬하는 네 가지 기본 가능성을 허용하기 위해 다음과 같은 메서드를 추가할 수 있습니다.

*   **(4) `sorted_items(by_value=0, reversed=0)`**:
    가장 일반적인 경우는 `by_value=1, reversed=1`일 것으로 예상되지만, 여기 제시된 기본값은 사용자에게 혼란을 줄 가능성이 적을 것입니다. `sorted_items()`는 `items()` 뒤에 `sort()`를 호출하는 것과 동일하게 작동할 것입니다.

마지막으로 (최후의 수단으로) 다음을 사용할 수도 있습니다.

*   **(5) `items_sorted_by_value(reversed=0)`**

## 5. 구현 (Implementation)

제안된 딕셔너리 메서드들은 C로 구현될 필요가 있을 것입니다. 구현은 Python의 기존 메커니즘에 몇 가지 호출을 추가하는 것에 불과하므로 상당히 간단할 것으로 예상됩니다.

## 6. 우려 사항 (Concerns)

가능성 1부터 3에서 이미 다루었던 런타임 오버헤드를 제외하고, 이 제안에 대한 우려 사항은 아마도 "기능 비대화(feature bloat)" 및/또는 "코드 비대화(code bloat)" 범주에 속할 것입니다. 하지만 PEP 작성자는 여기에 제시된 몇 가지 제안이 매우 최소한의 비대화를 초래하여, 비대화와 "부가 가치(value added)" 사이의 좋은 균형점을 찾을 것이라고 믿었습니다.

팀 피터스(Tim Peters)는 이 기능을 C로 구현하는 것이 오늘날 Python으로 구현하는 것보다 크게 빠르지 않을 수 있다고 언급했습니다. 그러나 여기서 의도된 주요 이점은 "접근성"과 "사용 용이성"이지 "속도"가 아닙니다. 따라서 (일반적인 `items()`의 경우) 눈에 띄게 느려지지 않는 한 속도는 고려 사항이 아닐 수 있습니다.

## 7. 참고 자료 (References)

2001년 8월 comp.lang.python에서 "counting occurrences"라는 관련 스레드가 있었습니다. 여기에는 재사용 가능한 Python 함수 및 클래스로 구현하여 값으로 정렬 문제를 체계화하는 접근 방식의 예시가 포함되어 있습니다.

## 8. 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.