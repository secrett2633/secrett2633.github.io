---
title: "[Deferred] PEP 535 - Rich comparison chaining"
excerpt: "Python Enhancement Proposal 535: 'Rich comparison chaining'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/535/
toc: true
toc_sticky: true
date: 2025-09-26 23:26:10+0900
last_modified_at: 2025-09-26 23:26:10+0900
published: true
---
> **원문 링크:** [PEP 535 - Rich comparison chaining](https://peps.python.org/pep-0535/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 12-Nov-2016

## PEP 535 – 풍부한 비교 체인 (Rich comparison chaining)

### 개요 (Abstract)
PEP 535는 PEP 335에서 영감을 받고 PEP 532에 설명된 회로 차단(circuit breaking) 프로토콜을 기반으로, 체인 비교(chained comparisons)의 정의 변경을 제안합니다. 이 제안의 핵심은 좌측 비교(left hand comparison)가 회로 차단기(circuit breaker)를 반환할 경우, 기존의 논리합 연산자(`and`) 대신 좌측 결합 회로 차단 연산자(`else`)를 사용하여 비교 체인이 동작하도록 업데이트하는 것입니다.

이 변경은 NumPy와 같은 라이브러리에서 단일 값을 갖는 배열(single-valued arrays) 처리와 관련된 몇 가지 복잡성을 해결하며, 결과가 부울(boolean) 값의 매트릭스(matrix)인 행렬(matrices)에 대한 요소별 체인 비교(elementwise chained comparison) 연산을 허용하여 `ValueError`가 발생하거나 항등적으로 `True`를 반환하는 문제를 방지합니다.

### PEP 연기 (PEP Deferral)
이 PEP에 대한 추가 논의는 적어도 Python 3.8 이후로 연기되었습니다.

### 다른 PEP와의 관계 (Relationship with other PEPs)
이 PEP는 PEP 532의 초기 반복(earlier iterations)에서 추출되었으며, 회로 차단 프로토콜 도입의 필수적인 부분이라기보다는 후속 사용 사례(follow-on use case)로 다뤄집니다.

요소별 비교 사용 사례를 처리하기 위해 비교 체인의 의미론적 정의를 변경하는 이 PEP의 구체적인 제안은 Guido van Rossum이 PEP 335를 거부한 내용에서 직접적으로 파생되었습니다.

### 사양 (Specification)
`0 < x < 10`과 같은 체인 비교는 현재 대략 다음과 같이 의미론적으로 동일하게 확장됩니다:

```python
_expr = EXPR
_lhs_result = LEFT_BOUND LEFT_OP _expr
_expr_result = _lhs_result and (_expr RIGHT_OP RIGHT_BOUND)
```

PEP 532에서 소개된 회로 차단 개념을 사용하여, 이 PEP는 비교 체인이 좌측 비교가 회로 차단기를 반환하는지 명시적으로 확인하고, 만약 그렇다면 `and` 대신 `else`를 사용하여 비교 체인을 구현하도록 변경할 것을 제안합니다:

```python
_expr = EXPR
_lhs_result = LEFT_BOUND LEFT_OP _expr
if hasattr(type(_lhs_result), "__else__"):
    _expr_result = _lhs_result else (_expr RIGHT_OP RIGHT_BOUND)
else:
    _expr_result = _lhs_result and (_expr RIGHT_OP RIGHT_BOUND)
```

이러한 변경을 통해 NumPy 배열과 같은 타입이 비교 연산에서 적절하게 정의된 회로 차단기를 반환함으로써 체인 비교의 동작을 제어할 수 있게 됩니다. 임의의 수의 체인 비교 연산으로 이 논리를 확장하는 것은 기존의 `and` 확장을 따릅니다.

### 배경 (Rationale)
Guido van Rossum은 궁극적으로 PEP 335를 거부하면서 NumPy 개발자들이 체인 비교(예: `A < B < C`)를 가장 흔한 사용 사례로 언급했음을 지적했습니다.

NumPy 배열에서 비교가 어떻게 작동하는지 이해해야 합니다. NumPy 배열 비교는 기본적으로 요소별(element-wise)로 작동하여, 왼쪽 배열의 각 요소를 오른쪽 배열의 해당 요소와 비교하고 부울 결과의 매트릭스를 생성합니다.

```python
>>> import numpy as np
>>> increasing = np.arange(5)
>>> increasing
array([0, 1, 2, 3, 4])
>>> decreasing = np.arange(4, -1, -1)
>>> decreasing
array([4, 3, 2, 1, 0])
>>> increasing < decreasing
array([ True, True, False, False, False], dtype=bool)
```

비교의 어느 한쪽이 스칼라(scalar) 값인 경우, 해당 값은 배열 전체에 브로드캐스트(broadcast)되어 각 개별 요소와 비교됩니다.

```python
>>> 0 < increasing
array([False, True, True, True, True], dtype=bool)
>>> increasing < 4
array([ True, True, True, True, False], dtype=bool)
```

그러나 체인 비교를 사용하려고 하면 이러한 브로드캐스팅(broadcasting) 방식이 작동하지 않습니다.

```python
>>> 0 < increasing < 4
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
ValueError: The truth value of an array with more than one element is ambiguous. Use a.any() or a.all()
```

이 문제는 Python이 내부적으로 체인 비교를 `0 < increasing and increasing < 4` 형태로 암시적으로 확장하기 때문에 발생합니다. NumPy는 `a.any()`와 `a.all()`이 동일한 결과를 보장할 수 있는 단일 요소 배열에 대해서만 부울 값으로의 암시적 형 변환(implicit coercion)을 허용합니다.

이 PEP의 제안은 NumPy의 요소별 비교 연산 정의를 업데이트하여 이 상황을 변경하는 것을 목표로 합니다. 새로운 회로 차단 프로토콜을 구현하는 전용 서브클래스를 반환하고, 부울 컨텍스트(boolean context)에서 결과 배열의 해석을 항상 `False`로 반환하도록 변경하여 단락 평가(short-circuiting behaviour)가 절대 트리거되지 않도록 합니다.

예시 클래스:
```python
class ComparisonResultArray(np.ndarray):
    def __bool__(self):
        # Element-wise comparison chaining never short-circuits
        return False
    def _raise_NotImplementedError(self):
        msg = ("Comparison array truth values are ambiguous outside "
               "chained comparisons. Use a.any() or a.all()")
        raise NotImplementedError(msg)
    def __not__(self):
        self._raise_NotImplementedError()
    def __then__(self, result):
        self._raise_NotImplementedError()
    def __else__(self, result):
        return np.logical_and(self, other.view(ComparisonResultArray))
```

이러한 변경으로 위에서 실패했던 체인 비교 예시는 다음과 같은 결과를 반환할 수 있습니다.

```python
>>> 0 < increasing < 4
ComparisonResultArray([ False, True, True, True, False], dtype=bool)
```

### 구현 (Implementation)
실제 구현은 PEP 532에서 제안된 변경 사항에 대한 원칙적인 관심이 있을 때까지 연기되었습니다.

### 결론
PEP 535는 Python의 체인 비교가 NumPy와 같은 라이브러리에서 요소별 배열 비교를 더 효과적으로 처리할 수 있도록 하는 중요한 의미론적 변화를 제안합니다. 현재는 `ValueError`를 발생시키는 `0 < array < 4`와 같은 표현식이, 이 PEP가 구현되면 `ComparisonResultArray`와 같은 특수 객체를 반환하여 개발자가 예상하는 대로 동작할 수 있게 됩니다. 이는 특히 과학 컴퓨팅 분야에서 Python의 유용성을 크게 향상시킬 잠재력을 가지고 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.