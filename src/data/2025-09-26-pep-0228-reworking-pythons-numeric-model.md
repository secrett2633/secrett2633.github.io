---
title: "[Withdrawn] PEP 228 - Reworking Python’s Numeric Model"
excerpt: "Python Enhancement Proposal 228: 'Reworking Python’s Numeric Model'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/228/
toc: true
toc_sticky: true
date: 2025-09-26 16:49:50+0900
last_modified_at: 2025-09-26 16:49:50+0900
published: true
---
> **원문 링크:** [PEP 228 - Reworking Python’s Numeric Model](https://peps.python.org/pep-0228/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 04-Nov-2000

## PEP 228 – Python 숫자 모델 재작업 제안 (Reworking Python's Numeric Model)

*   **작성자** : Moshe Zadka, Guido van Rossum
*   **상태** : **철회됨 (Withdrawn)**
*   **유형** : 표준 트랙 (Standards Track)
*   **생성일** : 2000년 11월 4일

---

### 철회 (Withdrawal)

이 PEP는 PEP 3141에 찬성하여 철회되었습니다.

### 요약 (Abstract)

오늘날 Python의 숫자 모델은 C 언어의 숫자 모델과 유사합니다. 즉, 여러 관련 없는 숫자 타입들이 존재하며, 숫자 타입 간의 연산이 요청될 때 강제 변환(coercion)이 발생합니다. C 언어에서 숫자 모델이 하드웨어 수준에서 일어나는 일과 매우 유사하다는 정당성이 있지만, 이러한 정당성은 Python에는 적용되지 않습니다. 따라서 C 프로그래머들에게는 `2/3 == 0`이 허용될 수 있지만, 많은 Python 프로그래머들에게는 놀라운 결과입니다.

### 배경 (Rationale)

사용성 연구에서 Python의 가장 사용하기 어려운 측면 중 하나는 정수 나눗셈(integer division)이 나눗셈의 내림(floor) 값을 반환한다는 점이었습니다. 이로 인해 올바른 프로그래밍이 어려워지며, 코드의 여러 부분에서 `float()`로의 형 변환(cast)이 필요하게 됩니다. Python의 숫자 모델은 C 언어에서 파생되었지만, 수학적 수의 이해를 기반으로 한 모델이 더 다루기 쉬울 수 있습니다.

### 다른 숫자 모델 (Other Numerical Models)

Perl의 숫자 모델은 모든 숫자가 부동 소수점(floating point) 타입이라는 것입니다. 이는 일관성이 있고 겉으로는 놀랍지 않지만, 미묘한 함정(subtle gotchas)을 가지고 있습니다. 예를 들어, 숫자를 출력하는 것이 매우 까다롭고 정확한 반올림(rounding)이 필요합니다. Perl에는 모든 숫자가 정수인 모드도 있지만, 이 모드 역시 숫자를 나누고 의미 있는 답을 얻을 수 있는 근사적인 방법조차 없다는 문제점을 가지고 있습니다.

### Python 숫자 모델을 위한 제안된 인터페이스 (Suggested Interface For Python's Numerical Model)

추가(add-on) 타입 및 클래스를 위한 강제 변환(coercion) 규칙은 유지되지만, 내장(built-in) 타입 시스템에는 정확히 하나의 Python 타입인 "숫자(number)"만 존재할 것입니다. 이 "숫자" 타입에는 다음과 같은 "숫자 메서드(number methods)"를 가질 수 있습니다:

*   `isnatural()`
*   `isintegral()`
*   `isrational()`
*   `isreal()`
*   `iscomplex()`
*   `isexact()`

1번부터 5번까지의 질문에 `true`를 반환하는 숫자는 그 이후의 어떤 질문에도 `true`를 반환할 것입니다. 만약 `isexact()`가 `true`가 아니라면, 어떤 답이든 틀릴 수 있습니다 (하지만 심각하게 틀리지는 않고 진실에 가깝습니다).

이 모델은 필드 연산자(`+`, `-`, `/`, `*`)에 대해 두 가지를 약속합니다:

1.  두 피연산자(operands) 모두 `isexact()`를 만족하면, 결과도 `isexact()`를 만족합니다.
2.  모든 필드 규칙이 참이지만, `isexact()`가 아닌 숫자의 경우, 근사적으로만 참일 수 있습니다.

이 두 규칙의 한 가지 결과는 모든 정확한 계산이 (복소수) 유리수로 수행된다는 것입니다. 왜냐하면 필드 법칙이 유지되어야 하므로 `(a/b)*b == a`가 성립해야 하기 때문입니다.

`inexact()`라는 내장 함수가 제안되었는데, 이는 숫자를 받아 좋은 근사치를 제공하는 부정확한(inexact) 숫자를 반환합니다. 부정확한 숫자는 최소한 IEEE-754를 사용하는 것만큼 정확해야 합니다. `int()`와 같은 몇몇 고전적인 Python 함수들은 부정확한 숫자가 주어져도 정확한 숫자를 반환할 것입니다.

### 강제 변환 (Coercion)

`number` 타입은 `nb_coerce`를 정의하지 않습니다. `PyNumber` 외의 다른 것을 받을 때, 어떤 숫자 연산 슬롯도 해당 연산을 구현하기를 거부합니다.

### 부정확한 연산 (Inexact Operations)

`math` 모듈의 함수는 정확한 값에 대해 부정확한 결과를 반환하는 것이 허용될 것입니다. 그러나 절대로 비실수(non-real) 숫자를 반환하지는 않습니다. `cmath` 모듈의 함수 또한 정확한 인수에 대해 부정확한 결과를 반환하는 것이 허용되며, 나아가 실수 인수에 대해 복소수 결과를 반환하는 것이 허용됩니다.

### Numerical Python 관련 문제 (Numerical Python Issues)

Numerical Python (NumPy)을 사용하는 사람들은 고성능 벡터 연산을 위해 사용합니다. 따라서 NumPy는 하드웨어 기반의 숫자 모델을 유지해야 합니다.

### 미해결 문제 (Unresolved Issues)

*   어떤 숫자 리터럴(literals)이 정확하고 어떤 것이 부정확할까요?
*   IEEE 754 연산을 어떻게 처리할까요? (아마도 `isnan`/`isinf`는 메서드여야 할 것입니다.)
*   64비트 머신에서 `int`와 `float` 간의 비교는 `float`으로의 변환이 포함될 때 깨질 수 있습니다. `long`과 `float` 간의 비교도 마찬가지입니다. 이는 `float`으로의 변환을 피함으로써 해결될 수 있습니다.

---

**참고** : 이 PEP 228은 Python의 숫자 모델을 근본적으로 재작업하려는 시도였으나, 최종적으로 PEP 3141에 찬성하여 철회되었습니다. PEP 3141은 Python 3에서 정수 나눗셈의 동작을 변경하여 `//` 연산자를 정수 나눗셈에 사용하고 `/` 연산자는 항상 부동 소수점 나눗셈을 수행하도록 제안했습니다. 이로 인해 Python 2와 Python 3 간의 주요 차이점 중 하나가 발생했습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.