---
title: "[Final] PEP 327 - Decimal Data Type"
excerpt: "Python Enhancement Proposal 327: 'Decimal Data Type'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/327/
toc: true
toc_sticky: true
date: 2025-09-26 18:35:48+0900
last_modified_at: 2025-09-26 18:35:48+0900
published: true
---
> **원문 링크:** [PEP 327 - Decimal Data Type](https://peps.python.org/pep-0327/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 17-Oct-2003


# PEP 327 – Decimal 데이터 타입

## 초록 (Abstract)

이 PEP의 주요 아이디어는 이진 부동 소수점(binary floating point)이 너무 부정확하여 소수점 계산이 필요한 모든 경우에 사용할 수 있는 `Decimal` 데이터 타입을 도입하는 것입니다.

`Decimal` 데이터 타입은 Python의 표준 함수와 연산을 지원하며, decimal 산술 ANSI 표준 X3.274-1996을 준수해야 합니다. `Decimal`은 고정 소수점(fixed point)이 아닌 부동 소수점(floating point) 방식으로 작동하며, 유효 숫자의 개수에 상한이 있는 정밀도(bounded precision)를 가집니다. 그러나 이 정밀도는 사용자가 설정할 수 있으며, 고정 소수점 사용도 가능하도록 유효 후행 0(significant trailing zeroes) 개념이 지원됩니다.

이 작업은 Eric Price, Aahz, Tim Peters가 작성한 코드와 테스트 함수를 기반으로 합니다. Python 2.4a1 직전에 `decimal.py` 참조 구현이 표준 라이브러리로 이동되었으며, 문서화와 테스트 스위트는 Raymond Hettinger의 작업입니다. 이 PEP의 많은 설명은 Cowlishaw의 작업, comp.lang.python 및 python-dev에서 가져왔습니다.

## 동기 (Motivation)

이 섹션에서는 `Decimal` 데이터 타입이 필요한 이유와 다른 숫자 데이터 타입으로는 충분하지 않은 이유를 설명합니다.

원래 "Money" 데이터 타입을 원했지만, comp.lang.python에서 제안한 후 커뮤니티는 필요한 산술 동작을 가진 숫자 데이터 타입을 먼저 만들고 그 위에 "Money" 타입을 구축하는 데 동의했습니다. 소수점 이하 자릿수, 반올림 등과 관련된 모든 고려 사항은 "Money" 타입을 통해 처리될 것입니다. 이 PEP의 목적은 추가적인 노력 없이 "Money"로 사용될 수 있는 데이터 타입을 만드는 것이 아닙니다.

표준을 구현하는 가장 큰 장점 중 하나는 이미 모든 복잡한 케이스가 고려되어 있다는 것입니다. Guido van Rossum(GvR)은 Mike Cowlishaw의 "General Decimal Arithmetic" 사양을 참조하도록 이끌었습니다. 이 문서는 범용 decimal 산술을 정의합니다. 이 사양의 올바른 구현은 ANSI/IEEE 표준 854-1987에 정의된 decimal 산술을 준수하며, 일부 사소한 제한을 제외하고 비반올림 decimal 산술과 정수 산술을 적절한 하위 집합으로 제공합니다.

### 이진 부동 소수점의 문제점 (The problem with binary float)

십진수(decimal) 수학에서 1/3 = 0.3333333333...와 같이 고정된 자릿수의 십진수로 표현할 수 없는 많은 숫자가 존재합니다.

2진수(binary) 체계에서는 (표준 부동 소수점이 계산되는 방식) 1/2 = 0.1, 1/4 = 0.01, 1/8 = 0.001 등입니다. 십진수 0.2는 2/10 또는 1/5와 같으며, 이는 2진수 분수로 0.001100110011001...이 됩니다. 보시다시피, 일부 십진수는 2진수로 정확하게 표현할 수 없어서 작은 반올림 오차가 발생합니다.

따라서 십진수를 정확하게 표현하는 decimal 데이터 타입이 필요합니다. 2진수 데이터 타입 대신 십진수 데이터 타입이 필요한 것입니다.

### 왜 부동 소수점인가? (Why floating point?)

십진수로 가지만, 왜 부동 소수점(floating point) 방식일까요?
부동 소수점 숫자는 숫자를 표현하기 위해 고정된 자릿수(정밀도, precision)를 사용하며, 숫자가 너무 크거나 작아질 때 지수(exponent)와 함께 작동합니다. 예를 들어, 정밀도 5인 경우:

*   `1234` ==> `1234e0`
*   `12345` ==> `12345e0`
*   `123456` ==> `12346e1` (마지막 줄에서 숫자가 다섯 자리에 맞추기 위해 반올림됨).

이와 대조적으로, 무한 정밀도(infinite precision)를 가진 `long integer`의 예가 있습니다. 이는 원하는 만큼 큰 숫자를 가질 수 있으며 정보를 잃지 않는다는 의미입니다.

고정 소수점(fixed point) 숫자에서는 소수점의 위치가 고정됩니다. 이 PEP는 표준의 산술 동작을 구현하기 더 쉽고, 그 위에 고정 소수점 데이터 타입을 구현할 수 있기 때문에 부동 소수점 방식을 선택합니다.

하지만 무한 정밀도의 부동 소수점 숫자를 가질 수 없는 이유는 무엇일까요? 정확하지 않은 나눗셈 때문에 쉽지 않습니다. 예를 들어, 1/3 = 0.3333333333333...은 무한히 반복됩니다. 이 경우 무한한 3을 저장해야 하므로 너무 많은 메모리를 차지합니다.

### 왜 유리수(rational)가 아닌가? (Why not rational?)

유리수는 두 개의 정수, 분자와 분모를 사용하여 저장됩니다. 이는 산술 연산을 직접 실행할 수 없다는 것을 의미합니다 (예: 두 유리수를 더하려면 먼저 공통 분모를 계산해야 합니다).

Alex Martelli의 말에 따르면, "두 유리수를 합하는 경우 (각각 O(M)과 O(N) 공간을 차지) O(M+N) 메모리 공간을 차지하는 유리수가 생성된다는 성능적 함의는 너무 번거롭습니다. 순수 Python과 확장 모듈(예: gmpy) 모두에 훌륭한 Rational 구현이 있지만, 제 생각에는 항상 '틈새 시장'일 것입니다. Decimal 없이 할 가치가 없으며, Decimal은 실제 세계에서 주요 사용 사례인 돈의 합계를 나타내는 올바른 방법입니다."

관심 있다면 PEP 239: Adding a Rational Type to Python을 참조할 수 있습니다.

### 그래서, 무엇을 얻었는가? (So, what do we have?)

결과는 제한된 정밀도(bounded precision)와 부동 소수점(floating point)을 가진 `Decimal` 데이터 타입입니다.

유용할까요? Alex Martelli의 말을 인용하자면, "Python은 (기본적으로) 사용자가 지정한 정밀도를 가진 2진수 부동 소수점 숫자를 가질 수 없습니다. 하드웨어가 제공하는 것에 제한됩니다. Decimal은 고정 소수점 또는 부동 소수점 숫자로 사용되든 그러한 제한을 받지 않습니다. 숫자 생성 시 지정할 수 있는 모든 제한된 정밀도(메모리가 허용하는 한)는 잘 작동해야 합니다. 프로그래밍 단순성의 대부분의 비용은 애플리케이션 프로그램에서 숨겨지고 적절한 decimal 산술 타입에 배치될 수 있습니다. http://speleotrove.com/decimal/에 따르면, 단일 데이터 타입이 정수, 고정 소수점, 부동 소수점 decimal 산술에 사용될 수 있으며, 애플리케이션 프로그래머를 힘들게 하지 않는 돈 계산에도 사용될 수 있습니다."

이러한 데이터 타입에는 여러 용도가 있습니다. Tim Peters는 "20의 정밀도라면 시간의 시작부터 전 세계 경제 생산량을 페니 단위까지 계산하기에 충분하고도 남을 것입니다"라고 말했습니다.

## 일반 Decimal 산술 사양 (General Decimal Arithmetic Specification)

이 섹션에서는 사양의 일부인 정보와 설명을 포함합니다 (숫자의 구조, 컨텍스트 등). 이 섹션에 포함된 모든 요구 사항은 표준에 명시되어 있으므로 (오타나 다른 오류 제외) 논의 대상이 아닙니다.

저작권 제한으로 인해 사양에서 가져온 설명을 그대로 복사할 수 없으므로, 저의 말로 설명하겠습니다. 자세한 내용은 원본 사양 문서를 읽어 보시기를 강력히 권장합니다.

### 산술 모델 (The Arithmetic Model)

이 사양은 관련 표준(IEEE 854, ANSI X3-274, IEEE 754의 제안된 개정)에 의해 정의된 decimal 산술 모델을 기반으로 합니다.

이 모델은 세 가지 구성 요소로 이루어져 있습니다:

*   **숫자 (Numbers):** 연산이 입력 또는 출력으로 사용하는 값.
*   **연산 (Operations):** 덧셈, 곱셈 등.
*   **컨텍스트 (Context):** 사용자가 선택할 수 있고 연산의 결과를 제어하는 매개변수 및 규칙 집합 (예: 사용할 정밀도).

### 숫자 (Numbers)

숫자는 유한하거나 특수 값일 수 있습니다. 유한한 숫자는 정확하게 표현될 수 있습니다. 특수 값은 무한대(Infinity) 및 정의되지 않은 값(예: 0/0)입니다.

유한한 숫자는 세 가지 매개변수로 정의됩니다:

*   **부호 (Sign):** 0 (양수) 또는 1 (음수).
*   **계수 (Coefficient):** 음수가 아닌 정수.
*   **지수 (Exponent):** 부호 있는 정수, 계수 승수의 10의 거듭제곱.

유한한 숫자의 수치 값은 `(-1)**sign * coefficient * 10**exponent`로 주어집니다.

특수 값은 다음과 같이 명명됩니다:

*   **Infinity:** 무한히 큰 값. 양수 또는 음수일 수 있습니다.
*   **Quiet NaN ("qNaN"):** 정의되지 않은 결과 (Not a Number)를 나타냅니다. "Invalid operation" 조건을 발생시키지 않습니다. NaN의 부호는 의미가 없습니다.
*   **Signaling NaN ("sNaN"):** 역시 Not a Number이지만, 어떤 연산에 사용되면 "Invalid operation" 조건을 발생시킵니다.

### 컨텍스트 (Context)

컨텍스트는 사용자가 선택할 수 있고 연산의 결과를 제어하는 매개변수 및 규칙 집합입니다 (예: 사용할 정밀도).

컨텍스트는 `Decimal` 숫자를 둘러싸고 있으며, 컨텍스트의 일부가 연산의 입력 및 출력 역할을 하기 때문에 이러한 이름이 붙었습니다. 애플리케이션이 하나 또는 여러 컨텍스트로 작업할지는 애플리케이션에 달려 있지만, `Decimal` 숫자당 하나의 컨텍스트를 갖는 것이 아이디어는 아닙니다. 예를 들어, 일반적인 사용은 프로그램 시작 시 컨텍스트의 정밀도를 20자리로 설정하고 그 후에는 명시적으로 컨텍스트를 다시 사용하지 않는 것입니다.

이러한 정의는 `Decimal` 숫자의 내부 저장 방식에 영향을 미치지 않으며, 단지 산술 연산이 수행되는 방식에만 영향을 미칩니다.

컨텍스트는 주로 다음 매개변수들에 의해 정의됩니다 (모든 컨텍스트 속성은 "Context Attributes" 섹션 참조):

*   **Precision (정밀도):** 산술 연산의 결과로 나올 수 있는 유효 숫자의 최대 개수 (정수 > 0). 이 값에는 최대값이 없습니다.
*   **Rounding (반올림):** 반올림이 필요할 때 사용될 알고리즘의 이름. "round-down", "round-half-up", "round-half-even", "round-ceiling", "round-floor", "round-half-down", "round-up" 중 하나입니다. 자세한 내용은 아래 "Rounding Algorithms" 섹션을 참조하세요.
*   **Flags and trap-enablers (플래그 및 트랩 활성화 장치):** 예외 조건은 개별적으로 제어 가능한 신호(signal)로 그룹화되며, 각 신호는 플래그(부울, 신호 발생 시 설정됨)와 트랩 활성화 장치(부울, 동작을 제어함)로 구성됩니다. 신호는 "clamped", "division-by-zero", "inexact", "invalid-operation", "overflow", "rounded", "subnormal", "underflow"입니다.

### 기본 컨텍스트 (Default Contexts)

사양은 사용자가 쉽게 선택할 수 있는 두 가지 기본 컨텍스트를 정의합니다.

*   **기본 기본 컨텍스트 (Basic Default Context):**
    *   `flags`: 모두 0으로 설정.
    *   `trap-enablers`: `inexact`, `rounded`, `subnormal`은 0으로 설정; 다른 모든 것은 1로 설정.
    *   `precision`: 9로 설정.
    *   `rounding`: `round-half-up`으로 설정.

*   **확장 기본 컨텍스트 (Extended Default Context):**
    *   `flags`: 모두 0으로 설정.
    *   `trap-enablers`: 모두 0으로 설정.
    *   `precision`: 9로 설정.
    *   `rounding`: `round-half-even`으로 설정.

### 예외 조건 (Exceptional Conditions)

아래 표는 산술 연산 중에 발생할 수 있는 예외 조건, 해당 신호 및 정의된 결과를 나열합니다. 자세한 내용은 사양를 참조하세요.

| 조건 (Condition)         | 신호 (Signal)         | 결과 (Result)                                                                                                              |
| :----------------------- | :-------------------- | :------------------------------------------------------------------------------------------------------------------------- |
| Clamped                  | `clamped`             | 사양 참조                                                                                                              |
| Division by zero         | `division-by-zero`    | `[sign,inf]`                                                                                                               |
| Inexact                  | `inexact`             | 변경 없음                                                                                                                  |
| Invalid operation        | `invalid-operation`   | `[0,qNaN]` (또는 `[s,qNaN]` 또는 `[s,qNaN,d]` 원인이 signaling NaN인 경우)                                          |
| Overflow                 | `overflow`            | 반올림 모드에 따라 다름                                                                                                    |
| Rounded                  | `rounded`             | 변경 없음                                                                                                                  |
| Subnormal                | `subnormal`           | 변경 없음                                                                                                                  |
| Underflow                | `underflow`           | 사양 참조                                                                                                              |

참고: 표준이 "Insufficient storage"에 대해 언급할 때, 이는 숫자의 내부를 유지하기에 충분한 저장 공간이 없는 구현별 동작이므로, 이 구현은 `MemoryError`를 발생시킬 것입니다.

Overflow 및 Underflow와 관련하여 `python-dev`에서는 인공적인 제한에 대한 오랜 논의가 있었습니다. 일반적인 합의는 중요한 이유가 있는 경우에만 인공적인 제한을 유지하는 것입니다. Tim Peters는 세 가지 이유를 제시했습니다:

1.  지수(exponent)에 대한 제한을 없애면 overflow (및 underflow)가 결코 발생할 수 없게 됩니다. 그러나 overflow는 실제 fp 사용에서 귀중한 안전망이며, 프로그램이 비정상적으로 작동할 때 조기에 위험 신호를 주는 탄광 속 카나리아와 같습니다.
2.  854의 거의 모든 구현은 비유한 숫자(무한대 및 NaN)를 인코딩하기 위해 "금지된" 지수 값을 사용합니다 (IBM 표준에서도 제안함). 제한된 지수는 거의 추가 저장 비용 없이 이를 수행할 수 있습니다. 지수가 무한정이라면 대신 추가 비트를 사용해야 합니다. 이 비용은 더 시간 및 공간 효율적인 구현을 시도할 때까지 숨겨져 있습니다.
3.  IBM 표준은 완전한 숫자 기능을 제공하는 작은 시작입니다. 지수 크기에 제한이 없으면, 예를 들어 decimal `sin()` 및 `cos()`의 구현이 엄청나게 복잡해질 것입니다 (인수 축소를 수행하기 위해 효과적으로 알아야 할 파이의 자릿수에 대한 선험적인 제한이 없기 때문입니다).

Edward Loper는 제한을 넘어서는 경우의 예시로 확률을 들었습니다. 그럼에도 불구하고 Robert Brewer와 Andrew Lentvorski는 사용자가 제한을 쉽게 수정할 수 있기를 원합니다. 이는 실제로 가능합니다.

```python
>>> d1 = Decimal("1e999999999") # at the exponent limit
>>> d1
Decimal("1E+999999999")
>>> d1 * 10 # exceed the limit, got infinity
Traceback (most recent call last):
  File "<pyshell#3>", line 1, in ?
    d1 * 10
...
...
Overflow: above Emax
>>> getcontext().Emax = 1000000000 # increase the limit
>>> d1 * 10 # does not exceed any more
Decimal("1.0E+1000000000")
>>> d1 * 100 # exceed again
Traceback (most recent call last):
  File "<pyshell#3>", line 1, in ?
    d1 * 100
...
...
Overflow: above Emax
```

### 반올림 알고리즘 (Rounding Algorithms)

`Decimal` 타입은 다양한 반올림 알고리즘을 지원하며, 이는 `Context`를 통해 설정됩니다.

*   **`round-down`:** 버려지는 자릿수는 무시됩니다; 결과는 변경되지 않습니다 (0을 향해 반올림, 잘라내기).
    *   `1.123` --> `1.12`
    *   `1.128` --> `1.12`
    *   `1.125` --> `1.12`
    *   `1.135` --> `1.13`
*   **`round-half-up`:** 버려지는 자릿수가 절반(0.5) 이상이면 결과는 1만큼 증가해야 합니다; 그렇지 않으면 버려지는 자릿수는 무시됩니다.
    *   `1.123` --> `1.12`
    *   `1.128` --> `1.13`
    *   `1.125` --> `1.13`
    *   `1.135` --> `1.14`
*   **`round-half-even`:** 버려지는 자릿수가 절반(0.5)보다 크면 결과 계수는 1만큼 증가합니다; 절반보다 작으면 결과는 조정되지 않습니다; 그렇지 않으면 가장 오른쪽 자릿수가 짝수이면 결과는 변경되지 않고, 홀수이면 1만큼 증가합니다 (짝수 자릿수를 만들기 위해).
    *   `1.123` --> `1.12`
    *   `1.128` --> `1.13`
    *   `1.125` --> `1.12`
    *   `1.135` --> `1.14`
*   **`round-ceiling`:** 버려지는 자릿수가 모두 0이거나 부호가 음수이면 결과는 변경되지 않습니다; 그렇지 않으면 결과는 1만큼 증가합니다 (양의 무한대를 향해 반올림).
    *   `1.123` --> `1.13`
    *   `1.128` --> `1.13`
    *   `-1.123` --> `-1.12`
    *   `-1.128` --> `-1.12`
*   **`round-floor`:** 버려지는 자릿수가 모두 0이거나 부호가 양수이면 결과는 변경되지 않습니다; 그렇지 않으면 결과의 절대값은 1만큼 증가합니다 (음의 무한대를 향해 반올림).
    *   `1.123` --> `1.12`
    *   `1.128` --> `1.12`
    *   `-1.123` --> `-1.13`
    *   `-1.128` --> `-1.13`
*   **`round-half-down`:** 버려지는 자릿수가 절반(0.5)보다 크면 결과는 1만큼 증가합니다; 그렇지 않으면 버려지는 자릿수는 무시됩니다.
    *   `1.123` --> `1.12`
    *   `1.128` --> `1.13`
    *   `1.125` --> `1.12`
    *   `1.135` --> `1.13`
*   **`round-up`:** 버려지는 자릿수가 모두 0이면 결과는 변경되지 않습니다; 그렇지 않으면 결과는 1만큼 증가합니다 (0에서 멀어지는 방향으로 반올림).
    *   `1.123` --> `1.13`
    *   `1.128` --> `1.13`
    *   `1.125` --> `1.13`
    *   `1.135` --> `1.14`

## 근거 (Rationale)

요구 사항은 두 섹션으로 나뉩니다. 첫 번째는 ANSI 표준을 준수하는 것입니다. 이 모든 요구 사항은 Mike Cowlishaw의 작업에 명시되어 있습니다. 그는 또한 매우 광범위한 테스트 케이스 세트를 제공했습니다.

두 번째 요구 사항 섹션(표준 Python 함수 지원, 사용성 등)은 여기부터 자세히 설명되며, 여기서 모든 결정 사항과 그 이유, 그리고 여전히 논의 중인 모든 주제를 포함합니다.

### 명시적 생성 (Explicit construction)

명시적 생성은 컨텍스트의 영향을 받지 않습니다 (반올림, 정밀도 제한 등이 없습니다). 컨텍스트는 연산 결과에만 영향을 미치기 때문입니다. 유일한 예외는 컨텍스트에서 생성할 때입니다.

#### `int` 또는 `long`에서 생성 (From `int` or `long`)

정보 손실이 없으며 다른 정보를 지정할 필요도 없습니다.

```python
Decimal(35)
Decimal(-124)
```

#### 문자열에서 생성 (From `string`)

Python decimal 정수 리터럴과 Python float 리터럴을 포함하는 문자열이 지원됩니다. 이 변환에서는 문자열이 `Decimal`로 직접 변환되므로 정보 손실이 없습니다 (float를 통한 중간 변환이 없습니다).

```python
Decimal("-12")
Decimal("23.2e-7")
```

또한, 이 방식으로 모든 특수 값(Infinity 및 Not a Number)을 생성할 수 있습니다.

```python
Decimal("Inf")
Decimal("NaN")
```

#### `float`에서 생성 (From `float`)

이 항목에 대한 초기 논의는 생성자에 부동 소수점을 전달할 때 어떤 일이 발생해야 하는지에 대한 것이었습니다.
여러 사람들은 `Decimal(1.1) == Decimal('1.1')`이 더 나은 옵션이라고 주장했습니다. 하지만 Paul Moore는 `1.1 == 1.1000000000000001`이므로 `Decimal(1.1000000000000001) == Decimal('1.1')`이 되어 잘못된 결과를 초래할 수 있음을 보여주었습니다.

결론적으로, `c.l.p`를 통해 합의된 해결책은 `Decimal`을 `float`와 함께 호출할 수 없다는 것입니다. 대신 `Decimal.from_float()` 메서드를 사용해야 했습니다. 그러나 후속 논의를 바탕으로, Python 2.4의 API에서 `from_float()`를 생략하기로 결정되었습니다. 이는 decimal과 2진수 부동 소수점 간의 상호 작용이 사용자에게 복잡한 표현 및 반올림 문제를 야기하며, 모듈을 만든 주요 이유가 이러한 문제를 피하는 것이기 때문입니다. 필요한 경우 사용자는 문자열 표현을 중간 타입으로 사용할 수 있습니다.

#### 튜플에서 생성 (From `tuples`)

Aahz는 튜플에서 생성하는 것을 제안했습니다. `eval()`의 왕복(round trip)을 구현하기 더 쉽고 "Decimal을 나타내는 숫자 값을 가진 사람이 문자열로 변환할 필요가 없습니다"는 이점이 있습니다.

구조는 부호(sign), 숫자(number), 지수(exponent) 세 가지 요소의 튜플이 될 것입니다. 부호는 1 또는 0이고, 숫자는 십진수 자릿수의 튜플이며, 지수는 부호 있는 `int` 또는 `long`입니다.

```python
Decimal((1, (3, 2, 2, 5), -2)) # -32.25
```

물론, 이 방식으로 모든 특수 값도 생성할 수 있습니다.

```python
Decimal( (0, (0,), 'F') ) # Infinity
Decimal( (0, (0,), 'n') ) # Not a Number
```

#### `Decimal`에서 생성 (From `Decimal`)

단순히 복사하는 것이므로 특별한 것은 없습니다.

#### 모든 경우의 문법 (Syntax for All Cases)

```python
Decimal(value1)
Decimal.from_float(value2, [decimal_places])
```

여기서 `value1`은 `int`, `long`, `string`, 3-튜플 또는 `Decimal`일 수 있으며, `value2`는 `float`만 가능하고, `decimal_places`는 선택적 비음수 `int`입니다.

#### 컨텍스트에서 생성 (Creating from Context)

이 항목은 `python-dev`에서 두 가지 병렬적인 소스로부터 발생했습니다. Ka-Ping Yee는 인스턴스 생성 시 컨텍스트를 인수로 전달하는 것을 제안했고, Tony Meyer는 `from_string`이 `honour_context` 매개변수를 `True` 값으로 받을 경우 컨텍스트를 준수하도록 요청했습니다.

Tim Peters는 컨텍스트를 사용하는 생성의 이유를 제시했습니다: "일반적인 숫자 연산에서 리터럴은 높은 정밀도로 주어질 수 있지만, 그 정밀도는 공짜가 아니며 일반적으로 필요하지 않습니다."

결국, `Decimal`에 다른 컨텍스트로 생성하는 메서드를 두는 대신, `Context`에 `Decimal` 인스턴스를 생성하는 메서드를 두기로 결정했습니다. 기본적으로 다음과 같이 사용합니다:

```python
context.create_decimal(number)
```

이 방법은 특정 컨텍스트를 사용하여 `Decimal` 인스턴스를 생성하려는 경우 (생성 시에만 사용되고 그 이후에는 사용되지 않음) 해당 컨텍스트의 메서드를 사용해야 한다는 의미입니다.

예시:

```python
>>> # 표준 decimal 인스턴스 생성
>>> Decimal("11.2233445566778899")
Decimal("11.2233445566778899")
>>>
>>> # 스레드 컨텍스트를 사용하여 decimal 인스턴스 생성
>>> thread_context = getcontext()
>>> thread_context.prec
28
>>> thread_context.create_decimal("11.2233445566778899")
Decimal("11.2233445566778899")
>>>
>>> # 다른 컨텍스트를 사용하여 decimal 인스턴스 생성
>>> other_context = thread_context.copy()
>>> other_context.prec = 4
>>> other_context.create_decimal("11.2233445566778899")
Decimal("11.22")
```

### 암시적 생성 (Implicit construction)

암시적 생성은 연산의 결과이므로 각 지점에서 자세히 설명된 대로 컨텍스트의 영향을 받습니다.

#### `int` 또는 `long`에서 (From `int` or `long`)

`int` 또는 `long`은 현재 컨텍스트에서 `Decimal(str(x))`로 명시적으로 생성된 `Decimal`처럼 처리됩니다 (즉, 문자열 변환 규칙이 적용되고 적절한 플래그가 설정됩니다). 이는 `Decimal('1234567') + 13579`와 같은 표현식이 `Decimal('1234567') + Decimal('13579')`의 mental model과 일치하도록 보장합니다. 이 모델은 모든 정수가 표현 오류 없이 문자열로 표현될 수 있기 때문에 작동합니다.

#### 문자열에서 (From `string`)

모두 이 경우 예외를 발생시키는 데 동의합니다.

#### `float`에서 (From `float`)

Aahz는 `float`와의 상호 작용에 강력히 반대하며 명시적 변환을 제안했습니다. `Decimal`이 `float`보다 더 큰 정밀도, 정확도 및 범위를 가질 수 있기 때문입니다.

`c.l.p`는 이 경우 `TypeError`를 발생시키는 데 동의했습니다. 즉, `Decimal`과 `float`를 암시적으로 혼합할 수 없습니다.

#### `Decimal`에서 (From `Decimal`)

여기에는 문제가 없습니다.

## 컨텍스트 사용 (Use of Context)

컨텍스트는 `Decimal` 인스턴스가 아닌 *연산*에만 적용됩니다. 따라서 컨텍스트를 변경해도 해당 인스턴스에 대한 연산이 없는 한 기존 인스턴스에는 영향을 미치지 않습니다.

Aahz는 "스레드당 컨텍스트(context per thread)"를 갖는 것이 아이디어라고 설명했습니다. 따라서 한 스레드의 모든 인스턴스는 하나의 컨텍스트에 속하며, 스레드 A의 컨텍스트(및 해당 스레드 인스턴스의 동작)를 변경해도 스레드 B에는 아무것도 변경되지 않습니다.

현재 컨텍스트의 규칙과 다른 규칙으로 연산을 수행해야 할 특별한 경우에 대해 Tim Peters는 컨텍스트가 메서드로 연산을 가질 것이라고 말했습니다. 이 방식으로 사용자는 "필요한 개인 컨텍스트 객체를 생성하고, 개인 컨텍스트 객체에 대한 명시적 메서드 호출로 산술을 표현하여, 기본 스레드 컨텍스트 객체가 참조되거나 수정되지 않도록 할 수 있습니다."

## Python 사용성 (Python Usability)

`Decimal`은 다음 경우에 기본 산술(+, -, *, /, //, **, %, `divmod`) 및 비교(==, !=, <, >, <=, >=, `cmp`) 연산자를 지원해야 합니다.

*   `Decimal op Decimal`
*   `Decimal op otherType`
*   `otherType op Decimal`
*   `Decimal op= Decimal`
*   `Decimal op= otherType`

`Decimal`은 단항 연산자(-, +, `abs`)를 지원해야 합니다. `repr()`는 왕복(round trip)을 지원해야 합니다. 즉, `m = Decimal(...)`일 때 `m == eval(repr(m))`이 성립해야 합니다.

`Decimal`은 변경 불가능(immutable)해야 합니다. `Decimal`은 내장 메서드를 지원해야 합니다: `min`, `max`, `float`, `int`, `long`, `str`, `repr`, `hash`, `bool` (`0`은 거짓, 그 외는 참).

`hash()`의 동작에 대한 논의가 있었습니다. 커뮤니티는 값이 동일하면 해당 값의 해시도 동일해야 한다는 데 동의합니다. 따라서 `Decimal(25) == 25`가 `True`인 동안, `hash(Decimal(25))`는 `hash(25)`와 같아야 합니다.

`Decimal`은 `float` 또는 `str`과 비교할 수 없으므로, 그들이 동일한 해시를 제공하는 것에 대해 걱정할 필요가 없습니다. 요약하자면:

```python
hash(n) == hash(Decimal(n)) # n이 int, long, 또는 Decimal인 경우에만
```

`str()` 및 `repr()` 동작과 관련하여 Ka-Ping Yee는 `repr()`이 `str()`과 동일한 동작을 갖도록 제안했고, Tim Peters는 `str()`이 사양의 `to-scientific-string` 연산처럼 동작하도록 제안했습니다.

이는 Aahz에 따르면 "문자열 형태는 이미 Decimal 객체를 재구성하는 데 필요한 모든 정보를 포함하고 있기 때문에" 가능합니다. 또한 사양을 준수합니다.

## 문서화 (Documentation)

이 섹션에서는 `Decimal` 및 `Context`의 모든 공개 메서드와 속성을 설명합니다.

### Decimal 속성 (Decimal Attributes)

`Decimal`에는 공개 속성이 없습니다. 내부 정보는 슬롯에 저장되며 최종 사용자가 액세스해서는 안 됩니다.

### Decimal 메서드 (Decimal Methods)

다음은 사양에 정의된 변환 및 산술 연산과 실제 구현으로 해당 기능을 달성하는 방법입니다.

*   **`to-scientific-string`**: 내장 함수 `str()`을 사용합니다.
    ```python
    >>> d = Decimal('123456789012.345')
    >>> str(d)
    '1.23456789E+11'
    ```
*   **`to-engineering-string`**: `to_eng_string()` 메서드를 사용합니다.
    ```python
    >>> d = Decimal('123456789012.345')
    >>> d.to_eng_string()
    '123.456789E+9'
    ```
*   **`to-number`**: `Context` 메서드 `create_decimal()`을 사용합니다. 표준 생성자나 `from_float()` 생성자는 컨텍스트를 사용하지 않기 때문에 (이 변환을 위한 사양에 명시된 대로) 사용할 수 없습니다.
*   **`abs`**: 내장 함수 `abs()`를 사용합니다.
    ```python
    >>> d = Decimal('-15.67')
    >>> abs(d)
    Decimal('15.67')
    ```
*   **`add`**: 연산자 `+`를 사용합니다.
    ```python
    >>> d = Decimal('15.6')
    >>> d + 8
    Decimal('23.6')
    ```
*   **`subtract`**: 연산자 `-`를 사용합니다.
    ```python
    >>> d = Decimal('15.6')
    >>> d - 8
    Decimal('7.6')
    ```
*   **`compare`**: `compare()` 메서드를 사용합니다. 이 메서드는 특수 값을 다룰 때만 사용해야 합니다 (내장 함수 `cmp()`가 아닌).
    ```python
    >>> d = Decimal('-15.67')
    >>> nan = Decimal('NaN')
    >>> d.compare(23)
    '-1'
    >>> d.compare(nan)
    'NaN'
    >>> cmp(d, 23)
    -1
    >>> cmp(d, nan)
    1
    ```
*   **`divide`**: 연산자 `/`를 사용합니다.
    ```python
    >>> d = Decimal('-15.67')
    >>> d / 2
    Decimal('-7.835')
    ```
*   **`divide-integer`**: 연산자 `//`를 사용합니다.
    ```python
    >>> d = Decimal('-15.67')
    >>> d // 2
    Decimal('-7')
    ```
*   **`max`**: `max()` 메서드를 사용합니다. 특수 값을 다룰 때만 이 메서드를 사용해야 합니다 (내장 함수 `max()`가 아닌).
    ```python
    >>> d = Decimal('15')
    >>> nan = Decimal('NaN')
    >>> d.max(8)
    Decimal('15')
    >>> d.max(nan)
    Decimal('NaN')
    ```
*   **`min`**: `min()` 메서드를 사용합니다. 특수 값을 다룰 때만 이 메서드를 사용해야 합니다 (내장 함수 `min()`이 아닌).
    ```python
    >>> d = Decimal('15')
    >>> nan = Decimal('NaN')
    >>> d.min(8)
    Decimal('8')
    >>> d.min(nan)
    Decimal('NaN')
    ```
*   **`minus`**: 단항 연산자 `-`를 사용합니다.
    ```python
    >>> d = Decimal('-15.67')
    >>> -d
    Decimal('15.67')
    ```
*   **`plus`**: 단항 연산자 `+`를 사용합니다.
    ```python
    >>> d = Decimal('-15.67')
    >>> +d
    Decimal('-15.67')
    ```
*   **`multiply`**: 연산자 `*`를 사용합니다.
    ```python
    >>> d = Decimal('5.7')
    >>> d * 3
    Decimal('17.1')
    ```
*   **`normalize`**: `normalize()` 메서드를 사용합니다.
    ```python
    >>> d = Decimal('123.45000')
    >>> d.normalize()
    Decimal('123.45')
    >>> d = Decimal('120.00')
    >>> d.normalize()
    Decimal('1.2E+2')
    ```
*   **`quantize`**: `quantize()` 메서드를 사용합니다.
    ```python
    >>> d = Decimal('2.17')
    >>> d.quantize(Decimal('0.001'))
    Decimal('2.170')
    >>> d.quantize(Decimal('0.1'))
    Decimal('2.2')
    ```
*   **`remainder`**: 연산자 `%`를 사용합니다.
    ```python
    >>> d = Decimal('10')
    >>> d % 3
    Decimal('1')
    >>> d % 6
    Decimal('4')
    ```
*   **`remainder-near`**: `remainder_near()` 메서드를 사용합니다.
    ```python
    >>> d = Decimal('10')
    >>> d.remainder_near(3)
    Decimal('1')
    >>> d.remainder_near(6)
    Decimal('-2')
    ```
*   **`round-to-integral-value`**: `to_integral()` 메서드를 사용합니다.
    ```python
    >>> d = Decimal('-123.456')
    >>> d.to_integral()
    Decimal('-123')
    ```
*   **`same-quantum`**: `same_quantum()` 메서드를 사용합니다.
    ```python
    >>> d = Decimal('123.456')
    >>> d.same_quantum(Decimal('0.001'))
    True
    >>> d.same_quantum(Decimal('0.01'))
    False
    ```
*   **`square-root`**: `sqrt()` 메서드를 사용합니다.
    ```python
    >>> d = Decimal('123.456')
    >>> d.sqrt()
    Decimal('11.1110756')
    ```
*   **`power`**: 연산자 `**`를 사용합니다.
    ```python
    >>> d = Decimal('12.56')
    >>> d ** 2
    Decimal('157.7536')
    ```

다음은 다른 메서드와 그 존재 이유입니다:

*   **`adjusted()`**: 조정된 지수를 반환합니다. 이 개념은 사양에 정의되어 있습니다: 조정된 지수는 소수점 앞에 한 자리 숫자가 있는 과학적 표기법으로 표현될 때 숫자의 지수 값입니다.
    ```python
    >>> d = Decimal('12.56')
    >>> d.adjusted()
    1
    ```
*   **`from_float()`**: `float` 데이터 타입에서 인스턴스를 생성하는 클래스 메서드입니다.
    ```python
    >>> d = Decimal.from_float(12.35)
    >>> d
    Decimal('12.3500000')
    ```
*   **`as_tuple()`**: `Decimal`의 내부 구조, 즉 세 개의 튜플을 보여줍니다. 이 메서드는 사양에서 요구하지 않지만, Tim Peters가 제안했고 커뮤니티는 이를 갖는 데 동의했습니다 (개발 및 디버깅에 유용합니다).
    ```python
    >>> d = Decimal('123.4')
    >>> d.as_tuple()
    (0, (1, 2, 3, 4), -1)
    >>> d = Decimal('-2.34e5')
    >>> d.as_tuple()
    (1, (2, 3, 4), 3)
    ```

### Context 속성 (Context Attributes)

이러한 속성들은 컨텍스트를 수정하기 위해 변경될 수 있습니다.

*   **`prec` (int):** 정밀도.
    ```python
    >>> c.prec
    9
    ```
*   **`rounding` (str):** 반올림 타입 (반올림 방법).
    ```python
    >>> c.rounding
    'half_even'
    ```
*   **`trap_enablers` (dict):** `trap_enablers[exception] = 1`이면 예외가 발생할 때 예외가 발생합니다.
    ```python
    >>> c.trap_enablers[Underflow]
    0
    >>> c.trap_enablers[Clamped]
    0
    ```
*   **`flags` (dict):** 예외가 발생하면 `flags[exception]`이 증가합니다 (트랩 활성화 장치가 설정되었는지 여부와 관계없이). `Decimal` 인스턴스 사용자가 재설정해야 합니다.
    ```python
    >>> c.flags[Underflow]
    0
    >>> c.flags[Clamped]
    0
    ```
*   **`Emin` (int):** 최소 지수.
    ```python
    >>> c.Emin
    -999999999
    ```
*   **`Emax` (int):** 최대 지수.
    ```python
    >>> c.Emax
    999999999
    ```
*   **`capitals` (int):** 문자열에서 'E' (True/1) 또는 'e' (False/0)를 사용할지 여부를 나타내는 부울 플래그 (예: '1.32e+2' 또는 '1.32E+2').
    ```python
    >>> c.capitals
    1
    ```

### Context 메서드 (Context Methods)

다음 메서드는 사양의 `Decimal` 기능에 부합합니다. 특정 컨텍스트를 통해 호출되는 연산은 스레드 컨텍스트가 아닌 해당 컨텍스트를 사용한다는 점에 유의하십시오.

이러한 메서드를 사용하려면 연산자가 이항 또는 단항일 때 구문이 변경된다는 점에 유의하십시오. 예를 들어:

```python
>>> mycontext.abs(Decimal('-2'))
'2'
>>> mycontext.multiply(Decimal('2.3'), 5)
'11.5'
```

따라서 다음은 사양 연산 및 변환과 컨텍스트를 통해 이를 달성하는 방법입니다 (여기서 `d`는 `Decimal` 인스턴스이고 `n`은 암시적 생성에서 사용될 수 있는 숫자입니다).

*   **`to-scientific-string`**: `to_sci_string(d)`
*   **`to-engineering-string`**: `to_eng_string(d)`
*   **`to-number`**: `create_decimal(number)` (number에 대한 자세한 내용은 명시적 생성 참조)
*   **`abs`**: `abs(d)`
*   **`add`**: `add(d, n)`
*   **`subtract`**: `subtract(d, n)`
*   **`compare`**: `compare(d, n)`
*   **`divide`**: `divide(d, n)`
*   **`divide-integer`**: `divide_int(d, n)`
*   **`max`**: `max(d, n)`
*   **`min`**: `min(d, n)`
*   **`minus`**: `minus(d)`
*   **`plus`**: `plus(d)`
*   **`multiply`**: `multiply(d, n)`
*   **`normalize`**: `normalize(d)`
*   **`quantize`**: `quantize(d, d)`
*   **`remainder`**: `remainder(d)`
*   **`remainder-near`**: `remainder_near(d)`
*   **`round-to-integral-value`**: `to_integral(d)`
*   **`same-quantum`**: `same_quantum(d, d)`
*   **`square-root`**: `sqrt(d)`
*   **`power`**: `power(d, n)`

`divmod(d, n)` 메서드는 `Context`를 통해 decimal 기능을 지원합니다.

다음은 `Context`에서 유용한 정보를 반환하는 메서드입니다:

*   **`Etiny()`**: 정밀도를 고려한 최소 지수.
    ```python
    >>> c.Emin
    -999999999
    >>> c.Etiny()
    -1000000007
    ```
*   **`Etop()`**: 정밀도를 고려한 최대 지수.
    ```python
    >>> c.Emax
    999999999
    >>> c.Etop()
    999999991
    ```
*   **`copy()`**: 컨텍스트의 복사본을 반환합니다.

## 참조 구현 (Reference Implementation)

Python 2.4-alpha부터 코드가 표준 라이브러리에 체크인되었습니다. 최신 버전은 [http://svn.python.org/view/python/trunk/Lib/decimal.py](http://svn.python.org/view/python/trunk/Lib/decimal.py)에서 사용할 수 있습니다. 테스트 케이스는 [http://svn.python.org/view/python/trunk/Lib/test/test_decimal.py](http://svn.python.org/view/python/trunk/Lib/test/test_decimal.py)에 있습니다.

## 참고 자료 (References)

*   ANSI standard X3.274-1996 (Programming Language REXX)
*   General Decimal Arithmetic specification (Cowlishaw)
*   ANSI/IEEE standard 854-1987 (Radix-Independent Floating-Point Arithmetic)
*   Tim Peter's FixedPoint at SourceForge
*   IEEE 754 revision
*   IEEE 754 references

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.