---
title: "[Rejected] PEP 239 - Adding a Rational Type to Python"
excerpt: "Python Enhancement Proposal 239: 'Adding a Rational Type to Python'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/239/
toc: true
toc_sticky: true
date: 2025-09-26 17:09:22+0900
last_modified_at: 2025-09-26 17:09:22+0900
published: true
---
> **원문 링크:** [PEP 239 - Adding a Rational Type to Python](https://peps.python.org/pep-0239/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 11-Mar-2001


## PEP 239 – Python에 유리수 타입 추가

*   **작성자:** Christopher A. Craig, Moshe Zadka
*   **상태:** **거부됨 (Rejected)**
*   **유형:** Standards Track
*   **생성일:** 2001년 3월 11일
*   **Python 버전:** 2.2

### 경고 (Warning)

이 PEP는 거부되었습니다.
'배경 (Rationale)' 섹션에서 제시된 요구사항들은 PEP 327 (decimal 산술)의 채택으로 어느 정도 해결되었으며, Guido van Rossum은 ABC 언어에서 유리수 산술이 기본 '정확한' 산술이었음에도 불구하고 "예상대로 작동하지 않았다"고 언급했습니다.

**후기:** PEP 3141, "A Type Hierarchy for Numbers"의 채택으로 'Rational' 숫자 추상 기본 클래스(Abstract Base Class)가 추가되었고, `fractions` 모듈에 구체적인 구현이 제공되었습니다.

### 초록 (Abstract)

Python은 무한한 정밀도를 가진 유리수(rational number)의 의미를 갖는 숫자 타입이 없었습니다. 이 제안은 그러한 타입의 의미를 설명하고, 해당 타입을 지원하기 위한 내장 함수(builtin functions)와 리터럴(literals)을 제안합니다. 이 PEP에서는 유리수 리터럴에 대한 제안은 포함하지 않으며, 이는 다른 PEP에서 다루도록 남겨두었습니다.

### 배경 (Rationale)

유리수 산술은 때때로 느리고 더 많은 메모리를 소모할 수 있지만(일반적으로 무한히 증가할 수 있음), 숫자의 수학적 이상을 더 가깝게 포착하며, 초보자들에게 덜 혼란스러운 동작을 보이는 경향이 있습니다. 비록 많은 Python 구현체에서 유리수 타입이 작성되었지만, 이들 중 어떤 것도 코어에 포함되거나 문서화되지 않았습니다. 이로 인해 Python에 덜 숙련된 사람들이 이러한 구현체에 접근하기 어려웠습니다.

### `RationalType` 제안

`RationalType`이라는 새로운 숫자 타입이 추가될 예정이었습니다.
단항 연산자(unary operators)는 명확하게 작동하며, 이항 연산자(binary operators)는 `int` 및 `long int`를 `rational`로, `rational`을 `float` 및 `complex`로 강제 변환(coerce)합니다.

다음과 같은 속성들이 지원될 예정이었습니다: `.numerator` 및 `.denominator`.
언어 정의는 다음을 보장할 것입니다:

*   `r.denominator * r == r.numerator`
*   분자(numerator)와 분모(denominator)의 최대공약수(GCD)는 1이며, 분모는 양수입니다.

메서드 `r.trim(max_denominator)`는 `abs(s.denominator) <= max_denominator`를 만족하는 `r`에 가장 가까운 유리수 `s`를 반환할 것입니다.

### `rational()` 내장 함수

이 함수는 `rational(n, d=1)` 서명을 가질 것입니다. `n`과 `d`는 모두 `int`, `long int` 또는 `rational`이어야 합니다. 다음을 보장합니다:

*   `rational(n, d) * d == n`

### 미해결 문제 (Open Issues)

*   타입 이름을 `rational` 대신 `rat`으로 해야 할까요?
*   일부에서는 `complex`, `real`, `rational`, `integer`와 같은 "추상적인" 순수 수학적 타입과 `float`, `rat`, `long`, `int`와 같은 "구체적인" 표현 타입을 구분할 것을 제안했습니다.
*   정수 값을 가진 유리수를 시퀀스 인덱스로 허용해야 할까요? 예를 들어, `s[5/3 - 2/3]`가 `s[1]`과 동등해야 할까요?
*   유리수에 대해 시프트(shift) 및 마스크(mask) 연산자를 허용해야 할까요? 정수 값을 가진 유리수에 대해서는 어떨까요?

Marcin 'Qrczak' Kowalczyk는 `int`와 `rational`을 통합하는 것에 대한 찬반 논의를 다음과 같이 정리했습니다.

**`int`와 `rational`을 통합하는 것에 대한 찬성 의견:**

*   `2 == 2/1`이고 `str(2/1) == '2'`일 수 있으므로, 객체가 동일해 보이지만 다르게 동작하는 혼란을 줄일 수 있습니다.
*   나머지가 없다는 것을 알 때 `/`를 정수 나눗셈에 자유롭게 사용할 수 있습니다(만약 틀려서 나머지가 있다면, 나중에 예외(exception)가 발생할 것입니다).

**`int`와 `rational`을 통합하는 것에 대한 반대 의견:**

*   `/`의 결과를 시퀀스 인덱스로 사용할 때, 이는 보통 에러입니다. 일부 데이터에서는 프로그램이 작동하더라도 다른 데이터에서는 깨질 것이므로 이러한 에러를 숨겨서는 안 됩니다.
*   (여기서는 통합 후 `int`와 `rational`이 다른 타입이라고 가정합니다) 타입은 값에 따라 달라지는 경우가 드물어야 합니다. 변수의 타입을 알면 추론하기 쉽습니다. 특정 변수가 `int`임을 알면, 해당 위치에 사용되는 다른 객체들도 `int`일 것이라고 예상할 수 있습니다.
*   (여기서는 동일한 타입이라고 가정합니다) `int`는 그 자체로 좋은 타입이며 `rational`과 혼합되어서는 안 됩니다. 어떤 것이 정수라는 사실은 그 타입에 대한 진술로 표현될 수 있어야 합니다.
*   많은 연산이 `int`를 요구하며 `rational`을 허용하지 않습니다. 이들을 다른 타입으로 생각하는 것이 자연스럽습니다.

---

이 PEP가 최종적으로 거부되었음에도 불구하고, 그 논의는 Python의 숫자 타입 시스템, 특히 `fractions` 모듈의 탄생과 발전에 중요한 발판을 마련했습니다. 현재 Python에서 유리수를 다루려면 `fractions` 모듈의 `Fraction` 타입을 사용하는 것이 표준적인 방법입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.