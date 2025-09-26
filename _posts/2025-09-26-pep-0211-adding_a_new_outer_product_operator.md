---
title: "[Rejected] PEP 211 - Adding A New Outer Product Operator"
excerpt: "Python Enhancement Proposal 211: 'Adding A New Outer Product Operator'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/211/
toc: true
toc_sticky: true
date: 2025-09-26 16:27:14+0900
last_modified_at: 2025-09-26 16:27:14+0900
published: true
---
> **원문 링크:** [PEP 211 - Adding A New Outer Product Operator](https://peps.python.org/pep-0211/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 15-Jul-2000


### 제목 및 상태

**PEP 211 – 새로운 외적(Outer Product) 연산자 추가 (Adding A New Outer Product Operator)**

*   **저자:** Greg Wilson
*   **상태:** **거부됨 (Rejected)**
*   **유형:** Standards Track
*   **생성일:** 2000년 7월 15일
*   **Python 버전:** 2.1
*   **사후 이력:**

**경고:** 이 PEP는 거부되었습니다. 이후 PEP 465의 접근 방식이 이 PEP 대신 최종적으로 채택되었습니다. PEP 465의 'Rejected Ideas' 섹션에서 이 결정에 대한 자세한 근거를 확인할 수 있습니다.

### 개요 (Introduction)

이 PEP는 Python 2.2에 새로운 외적(outer product) 연산자로 `@` (발음: "across")를 정의하자는 제안을 설명합니다.

이 연산자가 시퀀스(또는 다른 이터러블(iterable) 객체)에 적용될 때, 해당 객체들의 이터레이터를 결합하여 다음과 같이 동작합니다:

```python
for (i, j) in S @ T:
    pass
```

위 코드는 아래와 동일하게 작동할 것입니다:

```python
for i in S:
    for j in T:
        pass
```

클래스는 `__across__`, `__racross__`, `__iacross__`와 같은 특수(special) 메서드를 사용하여 이 연산자를 오버로드(overload)할 수 있습니다. 특히, 새로운 Numeric 모듈(PEP 209)은 다차원 배열(multi-dimensional arrays)에 대해 이 연산자를 오버로드하여 행렬 곱셈(matrix multiplication)을 구현할 예정이었습니다.

### 배경 (Background)

수치 연산은 더 이상 컴퓨팅의 작은 부분만을 차지하지만, 많은 프로그래머들(많은 Python 사용자 포함)은 여전히 복잡한 수학적 연산을 코드로 표현해야 합니다. APL, Fortran-90, MATLAB, IDL, Mathematica와 같은 대부분의 수치 언어들은 공통 산술 연산자에 대해 두 가지 형태를 제공합니다.

*   한 형태는 요소별(element-by-element)로 작동합니다. 예를 들어, 행렬 인수의 해당 요소들을 곱합니다.
*   다른 형태는 해당 연산의 "수학적" 정의를 구현합니다. 예를 들어, 행-열 행렬 곱셈을 수행합니다.

Zhu와 Lielens는 Python의 연산자들을 이런 방식으로 두 배로 늘리는 것을 제안했습니다. 그들의 제안은 여섯 개의 새로운 이항 중위(binary infix) 연산자와 여섯 개의 새로운 인플레이스(in-place) 연산자를 만들었을 것입니다.

이 제안의 원래 버전은 훨씬 더 보수적이었습니다. 저자는 MATLAB의 오픈 소스 클론인 GNU Octave 개발자들과 상의했습니다. 그 개발자들은 행렬 곱셈을 위한 중위 연산자를 제공하는 것이 중요하다고 동의했습니다. 수치 프로그래머들은 `mmul(A,B)` 대신 `A op B`라고 쓰는 것에 대해 정말로 신경 쓰기 때문입니다.

반면에 행렬 해(matrix solution) 및 다른 연산을 위한 중위 연산자를 가지는 것이 얼마나 중요한지 질문했을 때, James Rawlings 교수는 다음과 같이 답변했습니다:

> 저는 행렬 역연산(matrix inversion)을 많이 하지만, 이것이 '반드시 필요한 것'이라고 생각하지 않습니다. 저는 `A\b`인지 `b\A`인지 기억하지 못해서 항상 `inv(A)*b`라고 씁니다. 저는 `\`를 제거할 것을 권장합니다.

이러한 논의와 미국 국립 연구소 및 기타 지역 학생들의 피드백을 바탕으로, 우리는 행렬 곱셈을 위한 단 하나의 새로운 연산자만 Python에 추가할 것을 권장했습니다.

### 이터레이터 (Iterators)

Python 2.2에 이터레이터가 추가될 예정이었던 것은 이 제안의 범위를 넓혔습니다. PEP 201, Lockstep Iteration에 대한 논의의 일환으로, 이 제안의 저자는 비공식적인 사용성 실험을 수행했습니다. 결과는 사용자들이 "cross-product" 루프 구문에 심리적으로 수용적이라는 것을 보여주었습니다.

예를 들어, 대부분의 사용자는 다음 코드가:

```python
S = [10, 20, 30]
T = [1, 2, 3]
for x in S; y in T:
    print x+y,
```

`11 12 13 21 22 23 31 32 33`을 출력할 것으로 예상했습니다. 우리는 사용자들이 다음 코드에 대해서도 동일한 반응을 보일 것이라고 믿었습니다:

```python
for (x, y) in S @ T:
    print x+y
```

즉, 그들은 이것을 중첩 루프(nested loops)를 작성하는 깔끔한 방법으로 자연스럽게 해석할 것입니다.

여기서 이터레이터의 역할이 중요해집니다. 루프를 실행하기 전에 두 개(또는 그 이상)의 시퀀스의 외적을 실제로 구성하는 것은 매우 비용이 많이 들 것입니다. 반면에 `@`는 인수의 이터레이터를 가져와서 내부 이터레이터가 반환하는 값들의 튜플(tuples)을 반환하는 외부 이터레이터를 생성하도록 정의될 수 있습니다.

### 논의 (Discussion)

"across"라는 이름의 함수를 추가하는 것은 새로운 중위 연산자를 추가하는 것보다 Python에 미치는 영향이 적을 것입니다. 그러나 이것은 연산자를 사용하여 행렬 곱셈을 작성할 수 있는지, 아니면 함수 호출로 작성해야 하는지에 대해 정말로 신경 쓰는 수치 프로그래머들에게 Python을 더 매력적으로 만들지는 못할 것입니다.

`@` 연산자는 비교 연산자(comparison operators)와 같은 방식으로 체이닝(chainable)될 수 있어야 합니다. 즉:

```python
(1, 2) @ (3, 4) @ (5, 6)
```

위 코드는 `(1, 3, 5) ... (2, 4, 6)`을 반환해야 하며, `((1, 3), 5) ... ((2, 4), 6)`을 반환해서는 안 됩니다. 이는 파서(parser)의 특별한 지원을 필요로 하지 않을 것입니다. 첫 번째 `@`에 의해 생성된 외부 이터레이터는 일반 이터레이터와 자신을 결합하는 방법을 쉽게 학습할 수 있기 때문입니다.

재시작 가능한 이터레이터(restartable iterators)와 재시작 불가능한 이터레이터를 구별하는 방법이 있어야 했을 것입니다. 예를 들어, `S`가 입력 스트림(예: 파일)이고 `L`이 리스트(list)인 경우, `S @ L`은 간단하지만 `L @ S`는 스트림을 통한 이터레이션을 반복할 수 없기 때문에 그렇지 않습니다.

이는 오류로 처리될 수도 있고, 외부 이터레이터가 재시작 불가능한 내부 이터레이터를 감지하고 그 값들을 캐싱(caching)하여 처리할 수도 있었습니다. 세 명의 초보 Python 사용자(모두 숙련된 프로그래머) 앞에서 이 제안에 대한 화이트보드(whiteboard) 테스트 결과, 사용자들은 다음 코드가:

```python
"ab" @ "cd"
```

네 개의 문자 쌍 튜플(tuples of pairs of characters)이 아닌 네 개의 문자열(strings)을 반환할 것으로 예상했습니다. 다음 코드에 대해서는 의견이 갈렸습니다:

```python
("a", "b") @ "cd"
```

### 대안 (Alternatives)

1.  **아무것도 하지 않기 – Python을 단순하게 유지:**
    *   이것은 항상 기본 선택입니다.
2.  **연산자 대신 명명된 함수 추가:**
    *   Python은 주로 수치 언어가 아니므로, 이 특별한 경우를 위해 복잡하게 만드는 것이 가치가 없을 수 있습니다. 그러나 실제 행렬 곱셈에 대한 지원은 자주 요청되며, 내장 시퀀스(built-in sequence) 유형을 위한 `@`의 제안된 의미는 매우 일반적인 관용구(nested loops)의 표현을 단순화할 것입니다.
3.  **PEP 225에서 제안된 대로 `~*` 및 `~+`와 같이 기존 연산자의 접두사 형태 도입:**
    *   이에 대한 반대 의견은 추가적인 복잡성을 정당화할 만큼의 수요가 충분하지 않고(Rawlings의 의견 참고), 제안된 구문이 "토너 부족" 가독성 테스트를 통과하지 못한다는 것이었습니다.

### 감사의 글 (Acknowledgments)

이 논의를 시작해 준 Huaiyu Zhu와 수치 프로그래머들이 실제로 무엇을 중요하게 생각하는지에 대한 논의에 참여해 준 James Rawlings 및 다양한 Python 과정의 학생들에게 감사드립니다.

### 참고 자료 (References)

*   GNU Octave 관련 자료
*   python-numeric 메일링 리스트 메시지
*   python-dev 메일링 리스트 메시지

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.