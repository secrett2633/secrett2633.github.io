---
title: "[Rejected] PEP 3142 - Add a “while” clause to generator expressions"
excerpt: "Python Enhancement Proposal 3142: 'Add a “while” clause to generator expressions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3142/
toc: true
toc_sticky: true
date: 2025-09-27 14:36:16+0900
last_modified_at: 2025-09-27 14:36:16+0900
published: true
---
> **원문 링크:** [PEP 3142 - Add a “while” clause to generator expressions](https://peps.python.org/pep-3142/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 12-Jan-2009

## PEP 3142 – 제너레이터 표현식에 "while" 절 추가 제안

*   **작성자**: Gerald Britton
*   **상태**: **거부됨 (Rejected)**
*   **유형**: 표준 트랙 (Standards Track)
*   **생성일**: 2009년 1월 12일
*   **Python 버전**: 3.0
*   **해결**: Python-Dev 메시지

### 요약 (Abstract)

이 PEP는 기존의 `if` 절을 보완하기 위해 제너레이터 표현식(generator expressions)에 `while` 절을 추가하는 것을 제안합니다.

### 제안 배경 (Rationale)

제너레이터 표현식 (PEP 289)은 동적으로 생성된 객체를 `List Comprehension` (PEP 202) 등에 제공하는 간결한 방법입니다. 현재 제너레이터 표현식은 특정 기준을 충족하는 객체만 반환하도록 `if` 절을 사용하여 필터링할 수 있습니다.

그러나 `if` 절은 반환될 수 있는 *모든* 객체에 대해 평가되므로, 특정 시점 이후에는 모든 객체가 조건에 부합하지 않아 거부될 가능성이 있는 경우에도 불필요한 검사를 계속 수행하게 됩니다. 예를 들어:

```python
g = (n for n in range(100) if n*n < 50)
```

이 코드는 0부터 7까지의 숫자를 생성하지만, n=8부터 99까지의 숫자들에 대해서도 `n*n < 50` 조건을 계속 검사하게 됩니다. 이 범위의 숫자들은 모두 `n*n >= 50`이므로 해당 검사는 무의미하게 됩니다.

`while` 절을 허용하면 이러한 중복 테스트를 **단락 평가(short-circuiting)**하여 불필요한 검사를 방지할 수 있습니다.

```python
g = (n for n in range(100) while n*n < 50)
```

이 제안된 코드는 `n*n < 50` 조건이 더 이상 참이 아닌 n=8에서 반복을 멈추게 됩니다. 이는 다음 제너레이터 함수와 동일하게 동작합니다:

```python
def __gen(exp):
    for n in exp:
        if n*n < 50:
            yield n
        else:
            break # 조건이 False가 되면 반복을 중단
g = __gen(iter(range(100)))
```

현재 동일한 결과를 얻으려면 위와 같은 제너레이터 함수를 작성하거나 `itertools` 모듈의 `takewhile` 함수를 사용해야 합니다.

```python
from itertools import takewhile
g = takewhile(lambda n: n*n < 50, range(100))
```

`takewhile` 코드는 제안된 구문과 동일한 결과를 달성하지만, 더 길고 (일부는 "덜 우아하다"고 말할 수 있음) `lambda`와 같은 추가 함수 호출이 필요하며 이로 인한 성능 저하가 발생할 수 있습니다. 간단한 테스트 결과에 따르면:

```python
for n in (n for n in range(100) if 1): pass
```
이 코드가
```python
for n in takewhile(lambda n: 1, range(100)): pass
```
보다 약 10% 더 나은 성능을 보였습니다. (`if` 절과 유사하게 구현될 경우 `while` 절은 현재의 `if` 절과 비슷한 성능을 보일 것으로 예상됩니다.)

`if` 절과 `while` 절이 상호 배타적이어야 하는지에 대한 질문이 있을 수 있지만, 두 절을 함께 사용하여 이점을 얻을 수 있는 좋은 예시가 있습니다. 예를 들어, `primes()` 제너레이터가 소수를 생성한다고 가정할 때:

```python
p = (p for p in primes() if p > 100 while p < 1000)
```

이 코드는 100보다 크고 1000보다 작은 소수들을 반환하게 될 것입니다.

제너레이터 표현식에 `while` 절을 추가하는 것은 표현식의 간결한 형태를 유지하면서 단락 평가를 위한 유용한 기능을 제공할 것입니다.

### 감사의 글 (Acknowledgements)

Raymond Hettinger가 2002년 1월에 제너레이터 표현식의 개념을 처음 제안했습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.