---
title: "[Final] PEP 274 - Dict Comprehensions"
excerpt: "Python Enhancement Proposal 274: 'Dict Comprehensions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/274/
toc: true
toc_sticky: true
date: 2025-09-26 17:53:00+0900
last_modified_at: 2025-09-26 17:53:00+0900
published: true
---
> **원문 링크:** [PEP 274 - Dict Comprehensions](https://peps.python.org/pep-0274/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 25-Oct-2001


# PEP 274 – Dict Comprehensions (딕셔너리 컴프리헨션)

## 개요
PEP 274는 Python에 `List Comprehension`과 유사한 문법적 확장으로 "dictionary comprehension" 또는 줄여서 "dict comprehension"을 도입하는 것을 제안합니다. `List Comprehension`이 리스트 객체를 생성하는 것처럼, `Dict Comprehension`은 Python 딕셔너리 객체를 생성합니다.

## 해상도 (Resolution)
이 PEP는 원래 Python 2.3에 포함될 예정이었으나, `Generator Expression`과 `dict()` 생성자를 함께 사용하는 방식으로 대부분의 이점을 얻을 수 있다는 관찰 끝에 철회되었습니다.

하지만 Python 2.7과 3.0에서 `Dict Comprehension`과 밀접하게 관련된 `Set Comprehension`과 함께 이 기능이 실제로 도입되었습니다. 2012년 4월 9일, 이러한 현실을 반영하여 PEP의 상태가 "Accepted"로 변경되었고, Python-Version 필드도 업데이트되었습니다. 현재 구현으로 인해 모든 "Open Questions"가 해결되었으므로 해당 섹션도 제거되었습니다.

## 제안된 해결책 (Proposed Solution)
`Dict Comprehension`은 `List Comprehension`과 매우 유사하지만, 대괄호(`[]`) 대신 중괄호(`{}`)를 사용하여 표현식을 묶습니다. 또한, `for` 키워드 앞의 왼쪽 부분은 콜론(`:`)으로 구분된 키(key)와 값(value)을 모두 표현합니다. 이 표기법은 딕셔너리에 적용된 `List Comprehension`을 연상시키도록 특별히 설계되었습니다.

**예시:**

```python
{key : value for item in iterable if condition}
```

## 도입 배경 (Rationale)
길이가 2인 시퀀스(예: 튜플 리스트)로 구성된 데이터를 딕셔너리로 변환해야 하는 경우가 있습니다. Python 2.2에서는 `dict()` 생성자가 (key, value) 쌍으로 사용될 길이가 2인 시퀀스들의 시퀀스를 인자로 받아 새로운 딕셔너리 객체를 초기화할 수 있었습니다.

그러나 데이터를 길이가 2인 시퀀스의 시퀀스로 변환하는 과정은 메모리나 성능 관점에서 불편하거나 비효율적일 수 있습니다. 또한, 중복 제거 또는 집합 포함 여부 테스트와 같은 일반적인 작업의 경우, 더 나은 문법이 코드의 명확성을 높이는 데 도움이 됩니다.

`List Comprehension`과 마찬가지로 명시적인 `for` 루프를 항상 사용할 수 있습니다 (실제로 이전 버전의 Python에서는 유일한 방법이었습니다). 하지만 `List Comprehension`과 마찬가지로 `Dict Comprehension`은 전통적인 `for` 루프보다 문법적으로 더 간결한 관용구를 제공할 수 있습니다.

## 의미론 (Semantics)
`Dict Comprehension`의 의미론은 Python 2.2에서도 내장 딕셔너리 생성자에 `List Comprehension`을 전달하여 실제로 시연할 수 있었습니다.

예를 들어:
```python
>>> dict([(i, chr(65+i)) for i in range(4)])
```
는 의미론적으로 다음과 동일합니다:
```python
>>> {i : chr(65+i) for i in range(4)}
```

`dict()` 생성자 접근 방식은 제안된 문법에 비해 두 가지 분명한 단점이 있습니다. 첫째, `Dict Comprehension`만큼 가독성이 좋지 않습니다. 둘째, 프로그래머가 먼저 메모리에 리스트 객체를 생성하도록 강제하는데, 이는 비용이 많이 들 수 있습니다.

## 예시 (Examples)

```python
# 기본적인 Dict Comprehension
>>> print({i : chr(65+i) for i in range(4)})
{0: 'A', 1: 'B', 2: 'C', 3: 'D'}

# 기존 딕셔너리 복사 및 동일성 확인 (Python 2.x의 iteritems 사용 예시)
# Python 3.x에서는 .items()를 사용합니다.
# >>> someDict = {'k1': 'v1', 'k2': 'v2'}
# >>> print({k : v for k, v in someDict.items()} == someDict.copy())
# True

# 리스트에서 딕셔너리 생성 (예: 이메일 주소 리스트에서 키-값 쌍 생성)
>>> list_of_email_addrs = ['barry@zope.com', 'barry@python.org', 'guido@python.org']
>>> print({x.lower() : 1 for x in list_of_email_addrs})
{'barry@zope.com': 1, 'barry@python.org': 1, 'guido@python.org': 1}

# 딕셔너리 키와 값을 반전시키는 함수
>>> def invert(d):
...     return {v : k for k, v in d.items()} # Python 3.x의 .items()
...
>>> d = {0 : 'A', 1 : 'B', 2 : 'C', 3 : 'D'}
>>> print(invert(d))
{'A': 0, 'B': 1, 'C': 2, 'D': 3}

# 중첩된 for 루프를 사용한 Dict Comprehension
>>> {(k, v): k+v for k in range(4) for v in range(4)}
{(0, 0): 0, (0, 1): 1, (0, 2): 2, (0, 3): 3, (1, 0): 1, (1, 1): 2, (1, 2): 3, (1, 3): 4, (2, 0): 2, (2, 1): 3, (2, 2): 4, (2, 3): 5, (3, 0): 3, (3, 1): 4, (3, 2): 5, (3, 3): 6}
```

## 구현 (Implementation)
모든 구현 세부 사항은 Python 2.7 및 3.0 시점에 해결되었습니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.