---
title: "[Final] PEP 202 - List Comprehensions"
excerpt: "Python Enhancement Proposal 202: 'List Comprehensions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/202/
toc: true
toc_sticky: true
date: 2025-09-26 16:12:08+0900
last_modified_at: 2025-09-26 16:12:08+0900
published: true
---
> **원문 링크:** [PEP 202 - List Comprehensions](https://peps.python.org/pep-0202/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 13-Jul-2000


# PEP 202 – List Comprehensions (리스트 컴프리헨션)

## 서론 (Introduction)
이 PEP는 Python에 제안된 문법적 확장인 List Comprehensions (리스트 컴프리헨션)에 대해 설명합니다.

## 제안된 해결책 (The Proposed Solution)
`for` 및 `if` 절을 사용하여 리스트 리터럴(list literals)을 조건부로 구성할 수 있도록 허용하는 것이 제안됩니다. 이는 현재 `for` 루프와 `if` 문이 중첩되는 방식과 동일하게 중첩될 것입니다.

## 배경 (Rationale)
List Comprehensions은 현재 `map()`과 `filter()` 그리고/또는 중첩된 루프가 사용되는 상황에서 리스트를 생성하는 더 간결한 방법을 제공합니다.

## 예시 (Examples)

다음은 List Comprehensions의 사용 예시입니다.

```python
>>> print([i for i in range(10)])
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

>>> print([i for i in range(20) if i%2 == 0])
[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

>>> nums = [1, 2, 3, 4]
>>> fruit = ["Apples", "Peaches", "Pears", "Bananas"]

>>> print([(i, f) for i in nums for f in fruit])
[(1, 'Apples'), (1, 'Peaches'), (1, 'Pears'), (1, 'Bananas'), (2, 'Apples'), (2, 'Peaches'), (2, 'Pears'), (2, 'Bananas'), (3, 'Apples'), (3, 'Peaches'), (3, 'Pears'), (3, 'Bananas'), (4, 'Apples'), (4, 'Peaches'), (4, 'Pears'), (4, 'Bananas')]

>>> print([(i, f) for i in nums for f in fruit if f[0] == "P"])
[(1, 'Peaches'), (1, 'Pears'), (2, 'Peaches'), (2, 'Pears'), (3, 'Peaches'), (3, 'Pears'), (4, 'Peaches'), (4, 'Pears')]

>>> print([(i, f) for i in nums for f in fruit if f[0] == "P" if i%2 == 1])
[(1, 'Peaches'), (1, 'Pears'), (3, 'Peaches'), (3, 'Pears')]

>>> print([i for i in zip(nums, fruit) if i[0]%2==0])
[(2, 'Peaches'), (4, 'Bananas')]
```

## 참조 구현 (Reference Implementation)
List Comprehensions는 Python 2.0 릴리스와 함께 Python 언어의 일부가 되었으며,에 문서화되어 있습니다.

## BDFL의 지시 (BDFL Pronouncements)
제안된 문법이 올바른 방식입니다. `[x, y for ...]` 형태는 허용되지 않으며, `[(x, y) for ...]`와 같이 작성해야 합니다. `[... for x... for y...]` 형태는 중첩되며, 중첩된 `for` 루프처럼 가장 마지막 인덱스가 가장 빠르게 변합니다.

## 참고 자료 (References)
 [http://docs.python.org/reference/expressions.html#list-displays](http://docs.python.org/reference/expressions.html#list-displays)

```python
# PEP 202 – List Comprehensions (리스트 컴프리헨션)

## 서론 (Introduction)
이 PEP는 Python에 제안된 문법적 확장인 List Comprehensions (리스트 컴프리헨션)에 대해 설명합니다.

## 제안된 해결책 (The Proposed Solution)
`for` 및 `if` 절을 사용하여 리스트 리터럴(list literals)을 조건부로 구성할 수 있도록 허용하는 것이 제안됩니다. 이는 현재 `for` 루프와 `if` 문이 중첩되는 방식과 동일하게 중첩될 것입니다.

## 배경 (Rationale)
List Comprehensions은 현재 `map()`과 `filter()` 그리고/또는 중첩된 루프가 사용되는 상황에서 리스트를 생성하는 더 간결한 방법을 제공합니다.

## 예시 (Examples)

다음은 List Comprehensions의 사용 예시입니다.

```python
>>> print([i for i in range(10)])


>>> print([i for i in range(20) if i%2 == 0])


>>> nums =
>>> fruit = ["Apples", "Peaches", "Pears", "Bananas"]

>>> print([(i, f) for i in nums for f in fruit])
[(1, 'Apples'), (1, 'Peaches'), (1, 'Pears'), (1, 'Bananas'), (2, 'Apples'), (2, 'Peaches'), (2, 'Pears'), (2, 'Bananas'), (3, 'Apples'), (3, 'Peaches'), (3, 'Pears'), (3, 'Bananas'), (4, 'Apples'), (4, 'Peaches'), (4, 'Pears'), (4, 'Bananas')]

>>> print([(i, f) for i in nums for f in fruit if f == "P"])
[(1, 'Peaches'), (1, 'Pears'), (2, 'Peaches'), (2, 'Pears'), (3, 'Peaches'), (3, 'Pears'), (4, 'Peaches'), (4, 'Pears')]

>>> print([(i, f) for i in nums for f in fruit if f == "P" if i%2 == 1])
[(1, 'Peaches'), (1, 'Pears'), (3, 'Peaches'), (3, 'Pears')]

>>> print([i for i in zip(nums, fruit) if i%2==0])
[(2, 'Peaches'), (4, 'Bananas')]
```

## 참조 구현 (Reference Implementation)
List Comprehensions는 Python 2.0 릴리스와 함께 Python 언어의 일부가 되었으며, [1]에 문서화되어 있습니다.

## BDFL의 지시 (BDFL Pronouncements)
제안된 문법이 올바른 방식입니다. `[x, y for ...]` 형태는 허용되지 않으며, `[(x, y) for ...]`와 같이 작성해야 합니다. `[... for x... for y...]` 형태는 중첩되며, 중첩된 `for` 루프처럼 가장 마지막 인덱스가 가장 빠르게 변합니다.

## 참고 자료 (References)
[1] [http://docs.python.org/reference/expressions.html#list-displays](http://docs.python.org/reference/expressions.html#list-displays)
```PEP 202 – List Comprehensions (리스트 컴프리헨션)

## 서론 (Introduction)
이 PEP는 Python에 제안된 문법적 확장인 List Comprehensions (리스트 컴프리헨션)에 대해 설명합니다. 이 기능은 Python 2.0에서 도입되었습니다.

## 제안된 해결책 (The Proposed Solution)
`for` 및 `if` 절을 사용하여 리스트 리터럴(list literals)을 조건부로 구성할 수 있도록 허용하는 것이 제안됩니다. 이러한 구조는 기존의 `for` 루프와 `if` 문이 중첩되는 방식과 동일하게 작동하며 중첩될 수 있습니다.

## 배경 (Rationale)
List Comprehensions은 `map()` 함수와 `filter()` 함수, 또는 중첩된 루프를 사용하여 리스트를 생성하던 기존 방식보다 더 간결하고 가독성 높은 코드를 작성할 수 있는 방법을 제공합니다.

## 예시 (Examples)

다음은 List Comprehensions의 다양한 활용 예시입니다:
```python
>>> print([i for i in range(10)])
[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

>>> print([i for i in range(20) if i%2 == 0]) # 짝수만 필터링
[0, 2, 4, 6, 8, 10, 12, 14, 16, 18]

>>> nums = [1, 2, 3, 4]
>>> fruit = ["Apples", "Peaches", "Pears", "Bananas"]

>>> print([(i, f) for i in nums for f in fruit]) # 두 리스트의 모든 조합 생성
[(1, 'Apples'), (1, 'Peaches'), (1, 'Pears'), (1, 'Bananas'), (2, 'Apples'), (2, 'Peaches'), (2, 'Pears'), (2, 'Bananas'), (3, 'Apples'), (3, 'Peaches'), (3, 'Pears'), (3, 'Bananas'), (4, 'Apples'), (4, 'Peaches'), (4, 'Pears'), (4, 'Bananas')]

>>> print([(i, f) for i in nums for f in fruit if f[0] == "P"]) # 조건부 조합
[(1, 'Peaches'), (1, 'Pears'), (2, 'Peaches'), (2, 'Pears'), (3, 'Peaches'), (3, 'Pears'), (4, 'Peaches'), (4, 'Pears')]

>>> print([(i, f) for i in nums for f in fruit if f[0] == "P" if i%2 == 1]) # 여러 조건 적용
[(1, 'Peaches'), (1, 'Pears'), (3, 'Peaches'), (3, 'Pears')]

>>> print([i for i in zip(nums, fruit) if i[0]%2==0]) # zip과 함께 사용
[(2, 'Peaches'), (4, 'Bananas')]
```

## 참조 구현 (Reference Implementation)
List Comprehensions는 Python 2.0 릴리스에 포함되어 Python 언어의 공식적인 부분이 되었으며, 자세한 내용은에서 확인할 수 있습니다.

## BDFL의 지시 (BDFL Pronouncements)
Guido van Rossum (Python의 '자비로운 종신 독재자')은 제안된 문법이 올바른 방식임을 명확히 했습니다. 특히, `[x, y for ...]` 형태는 허용되지 않으며, 튜플을 생성할 때는 반드시 `[(x, y) for ...]`와 같이 명시적으로 괄호를 사용해야 합니다. 또한, `[... for x... for y...]` 형태는 중첩된 `for` 루프와 마찬가지로, 가장 안쪽의 (마지막) 인덱스가 가장 빠르게 변하는 방식으로 작동합니다.

## 참고 자료 (References)
 [http://docs.python.org/reference/expressions.html#list-displays](http://docs.python.org/reference/expressions.html#list-displays)

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.