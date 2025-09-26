---
title: "[Final] PEP 485 - A Function for testing approximate equality"
excerpt: "Python Enhancement Proposal 485: 'A Function for testing approximate equality'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/485/
toc: true
toc_sticky: true
date: 2025-09-26 22:32:41+0900
last_modified_at: 2025-09-26 22:32:41+0900
published: true
---
> **원문 링크:** [PEP 485 - A Function for testing approximate equality](https://peps.python.org/pep-0485/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 20-Jan-2015


# PEP 485 – 근사치 동등성 테스트 함수

## 초록 (Abstract)
이 PEP는 두 값이 서로 근사적으로 같거나 "가까운"지 여부를 판단하는 `isclose()` 함수를 표준 라이브러리의 `math` 모듈에 추가할 것을 제안합니다.

## 배경 (Rationale)
부동 소수점 값은 정밀도가 제한되어 있어 일부 값을 정확하게 표현할 수 없으며, 반복적인 계산으로 인해 오류가 누적될 수 있습니다. 이로 인해 부동 소수점 값의 정확한 동등 비교는 특정 상황에서만 사용해야 한다는 것이 일반적인 조언입니다. 프로그래머가 계산된 값이 예상 값에 "가까운"지 여부를 확인하려는 경우가 자주 발생하며, 특히 테스트에서 이러한 필요성이 높습니다. 이러한 근사치 비교는 일반적이지만 구현 방법이 항상 명확하지 않으므로, 이를 위한 표준 라이브러리 함수는 유용한 추가 기능이 될 것입니다.

### 기존 구현 (Existing Implementations)
*   **`unittest.TestCase.assertAlmostEqual`**: `unittest` 모듈에 포함되어 있지만, `unittest.TestCase` 클래스 내에 있어 일반적인 테스트 용도로 사용하기 어렵고, 절대 오차(absolute difference)만을 비교합니다. 부동 소수점 수의 경우 종종 상대 오차(relative error) 비교가 더 적합합니다.
*   **`numpy.isclose()` 및 `allclose()`**: `numpy` 패키지에서 제공되지만, `numpy`를 설치해야만 사용할 수 있습니다.
*   **기타**: `statistics` 패키지의 내부 구현, Stack Overflow 등의 커뮤니티 토론 및 Boost C++ 라이브러리와 APL 언어 등 다른 시스템에서도 유사한 테스트 기능이 제공됩니다. 이러한 기존 구현들은 근사치 비교가 흔히 필요하며 직접 작성하기 쉽지 않다는 것을 보여주므로, 표준 라이브러리에 추가될 만한 후보임을 시사합니다.

## 제안된 구현 (Proposed Implementation)
새로운 `isclose()` 함수는 `math` 모듈에 추가되며, 다음과 같은 시그니처를 가집니다.
`isclose(a, b, rel_tol=1e-09, abs_tol=0.0)`

*   `a` 및 `b`: 근접성을 테스트할 두 값입니다.
*   `rel_tol` (relative tolerance, 상대 허용 오차): `a` 또는 `b` 중 더 큰 절대값에 비례하여 허용되는 오차의 양입니다. 예를 들어, 5%의 허용 오차를 설정하려면 `rel_tol=0.05`를 전달합니다. 기본값은 `1e-09`로, 두 값이 약 9자리 소수점까지 동일함을 보장합니다. `rel_tol`은 `0.0`보다 커야 합니다.
*   `abs_tol` (absolute tolerance, 절대 허용 오차): 0에 가까운 값 비교에 유용한 최소 절대 허용 오차 수준입니다.

오류 검사를 제외하고, 이 함수는 다음 식의 결과를 반환합니다.
`abs(a-b) <= max( rel_tol * max(abs(a), abs(b)), abs_tol )`

함수 이름 `isclose`는 `isnan`, `isinf`와 일관성을 유지하기 위해 선택되었습니다.

### 비유한(Non-finite) 숫자 처리
`NaN` (Not a Number), `inf` (infinity), `-inf`와 같은 IEEE 754 특수 값은 IEEE 규칙에 따라 처리됩니다. 특히 `NaN`은 `NaN`을 포함하여 다른 어떤 값과도 가깝다고 간주되지 않습니다. `inf`와 `-inf`는 오직 자기 자신과만 가깝다고 간주됩니다.

### 부동 소수점 이외의 타입 (Non-float types)
주요 사용 사례는 부동 소수점 숫자이지만, 사용자는 다른 숫자 타입도 유사하게 비교하기를 원할 수 있습니다. 이론적으로 `abs()`, 곱셈, 비교, 뺄셈을 지원하는 모든 타입에 작동해야 합니다. 그러나 `math` 모듈의 구현은 C로 작성되었기 때문에 Python의 덕 타이핑(duck typing)을 쉽게 사용할 수 없습니다. 대신, 함수에 전달되는 값은 계산이 수행되기 전에 `float` 타입으로 변환됩니다. `float`로 변환할 수 없는 타입이나 값을 전달하면 적절한 예외(TypeError, ValueError 또는 OverflowError)가 발생합니다.

`Decimal`, `int`, `Fraction`, `complex` 타입의 일부 값들을 수용하도록 코드가 테스트될 것입니다. `complex`의 경우, `cmath` 모듈에 `cmath.isclose()`라는 동반 함수가 추가될 것입니다. `cmath.isclose()`에서 허용 오차는 `float`로 지정되며, 복소수 값의 절대값(magnitude)이 스케일링 및 비교에 사용됩니다.

### 0 근처에서의 동작 (Behavior near zero)
상대 비교는 두 값 중 하나라도 0인 경우 문제가 될 수 있습니다. 0에 대해 상대적으로 작은 값은 없습니다. 이 경우 `abs_tol` 매개변수를 사용하여 매우 작거나 0인 상대 허용 오차를 보정할 수 있습니다. 즉, 두 값의 차이가 `abs_tol`보다 작으면 항상 가깝다고 간주됩니다.

`abs_tol`의 기본값은 0.0으로 설정됩니다. 이는 일반적인 경우에 적합한 값이 없기 때문입니다. 특정 사용 사례에 대한 예상 값을 모르면 적절한 `abs_tol` 값을 알 수 없습니다. 만약 `rel_tol` 매개변수를 0.0으로 설정하면, 절대 허용 오차만이 결과에 영향을 미치게 됩니다.

### 구현 (Implementation)
Python으로 작성된 샘플 구현은 GitHub에서 확인할 수 있습니다.

## 상대 차이 (Relative Difference)
두 숫자가 얼마나 가까운지를 판단하는 방법은 크게 두 가지입니다.
*   **절대 차이 (Absolute difference)**: 단순히 `abs(a-b)`입니다.
*   **상대 차이 (Relative difference)**: `abs(a-b) / scale_factor`입니다.

`isclose()` 함수는 상대 차이에 중점을 둡니다. `scale_factor`는 일반적으로 다음 중 하나를 사용합니다.
*   입력 값 중 하나의 절대값
*   두 값의 최대 절대값 (Boost "weak" 테스트)
*   두 값의 최소 절대값 (Boost "strong" 테스트)
*   두 값의 산술 평균의 절대값

이 PEP는 대칭성(Symmetry)과 실용성을 고려하여 두 값의 최대 절대값을 사용하는 Boost "weak" 테스트 방식을 채택합니다. 이는 `isclose(a,b)`와 `isclose(b,a)`가 항상 같은 결과를 반환하여 혼란을 줄이고, 사용자가 인자 순서를 고려할 필요가 없게 합니다. 또한, 매우 큰 허용 오차(large tolerances)의 경우에도 더 유용한 결과를 제공합니다. 예를 들어, 0과 10 사이의 "200% 이내"를 비교할 때, weak 테스트는 True를 반환합니다.

## 기본값 (Defaults)

### 상대 허용 오차 기본값 (Relative Tolerance Default)
`rel_tol`의 기본값은 `1e-09`로 설정됩니다. 이는 Python `float`의 약 절반 정밀도에 해당하며, 대부분의 경우 "그냥 작동"할 것으로 예상되는 값입니다. 또한, 이 값은 다양한 비교 방법이 동일한 결과를 산출하는 가장 큰 상대 허용 오차이기도 합니다.

### 절대 허용 오차 기본값 (Absolute tolerance default)
`abs_tol`의 기본값은 `0.0`으로 설정됩니다. 0과의 비교는 일반적인 사용 사례이지만, 특정 사용 사례에 적합한 절대 허용 오차 값은 크게 다르기 때문입니다. "모호함에 직면했을 때는 추측하려는 유혹을 거부하라"는 Zen of Python의 원칙에 따라, 사용자에게 적절한 값을 명시적으로 선택하도록 유도하는 것이 더 안전하다고 판단했습니다.

## 예상되는 용도 (Expected Uses)
주요 사용 사례는 다양한 형태의 **테스트**입니다. 계산 결과가 예상 값에 근접하는지 확인하는 데 사용됩니다. 이는 정식 단위 테스트 스위트의 일부일 수도 있고, 명령줄, IPython 노트북, doctests 또는 간단한 `assert` 문 내에서 사용될 수도 있습니다. 또한, 암시적 함수(implicit function)의 반복적인 해를 찾는 종료 조건으로도 적합합니다.

```python
guess = something
while True:
    new_guess = implicit_function(guess, *args)
    if isclose(new_guess, guess):
        break
    guess = new_guess
```

### 부적절한 용도 (Inappropriate uses)
수치 알고리즘의 정확도를 테스트하는 데 사용할 수도 있지만, 이 경우 수치 해석가는 일반적으로 정교한 오류 전파 분석(error propagation analysis)을 수행해야 하며, ULP (Unit in the Last Place) 비교가 필요할 수도 있습니다. 이 함수가 그러한 상황에서 유용할 수 있지만, 신중한 고려 없이 이 목적으로 사용하도록 의도된 것은 아닙니다.

## 다른 접근 방식 (Other Approaches)

### `unittest.TestCase.assertAlmostEqual`
이 메서드는 순수하게 절대 허용 오차 테스트이며, 상대 허용 오차 테스트의 필요성을 다루지 않습니다.

### `numpy.isclose()`
`numpy`의 `isclose()` 함수는 절대 및 상대 허용 오차를 더하는 방식을 사용합니다. 이는 이 PEP에서 제안하는 `max` 방식을 사용하는 것과 다릅니다. `numpy` 방식은 계산적으로 더 단순하지만, `abs_tol`과 `rel_tol`의 크기가 비슷할 경우 허용되는 차이가 예상보다 두 배 커질 수 있어 이해하기 어렵게 만들 수 있습니다. 또한, 값이 `abs_tol`에 비해 작으면 `rel_tol`이 완전히 무시될 수 있습니다.

### Boost floating-point comparison
Boost 프로젝트는 부동 소수점 비교 함수를 제공하며, "weak" (두 상대 오차 중 큰 값 사용) 및 "strong" (두 상대 오차 중 작은 값 사용) 옵션이 있는 대칭적 접근 방식입니다. 이 PEP는 Boost의 "weak" 접근 방식을 사용합니다. 대부분의 경우 결과가 비슷하고 사용자가 어떤 것을 선택해야 할지 알기 어렵기 때문에, 다른 메서드를 선택하는 옵션을 제공하여 API를 복잡하게 만들 필요는 없다고 판단했습니다.

## 대안 제안 (Alternate Proposals)

### 레시피 (A Recipe)
표준 라이브러리 함수를 제공하지 않고, 대신 사용자들이 참고할 레시피를 제공하자는 제안이 있었습니다. 이는 다양한 옵션을 설명하고 사용자가 가장 적절한 것을 선택하도록 할 수 있다는 장점이 있지만, 테스트가 필요한 모든 사람이 함수를 코드베이스에 복사하고 비교 방법을 직접 선택해야 하는 단점이 있습니다.

### `zero_tol`
`abs_tol` 대신 `zero_tol` 매개변수를 제공하자는 제안이 있었습니다. 이는 인자 중 하나가 정확히 0인 경우에만 적용되는 절대 허용 오차입니다. 그러나 이는 작은 값이 0에는 "가깝지만" 더 작은 값에는 "가깝지 않다"는 잠재적으로 놀라운 결과를 초래할 수 있습니다.

### 절대 허용 오차 없음 (No absolute tolerance)
0과의 비교 문제를 고려하여, 상대 허용 오차만 제공하고 0과의 비교는 실패하도록 하는 방안도 있었습니다. 이 경우 사용자는 0과의 비교 시 `abs(val) < zero_tol`과 같은 간단한 절대 테스트를 직접 수행해야 합니다. 그러나 이는 루프나 Comprehension과 같은 값의 시퀀스에 동일한 호출을 사용할 수 없게 만들어 함수의 유용성을 크게 떨어뜨립니다. 기본값 `abs_tol=0.0`은 이 제안과 동일한 효과를 냅니다.

## 참고 자료 (References)
*   Python-ideas list discussion threads
*   Wikipedia page on relative difference
*   Boost project floating-point comparison algorithms
*   1976. R. H. Lathwell. APL comparison tolerance.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.