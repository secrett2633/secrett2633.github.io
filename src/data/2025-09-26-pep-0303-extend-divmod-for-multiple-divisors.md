---
title: "[Rejected] PEP 303 - Extend divmod() for Multiple Divisors"
excerpt: "Python Enhancement Proposal 303: 'Extend divmod() for Multiple Divisors'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/303/
toc: true
toc_sticky: true
date: 2025-09-26 18:08:34+0900
last_modified_at: 2025-09-26 18:08:34+0900
published: true
---
> **원문 링크:** [PEP 303 - Extend divmod() for Multiple Divisors](https://peps.python.org/pep-0303/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 31-Dec-2002


# PEP 303 – Extend divmod() for Multiple Divisors (다중 제수를 위한 divmod() 확장)

## 개요
이 PEP는 내장 함수 `divmod()`의 확장을 제안합니다. 이 확장은 `divmod()`가 여러 개의 제수(divisor)를 인자로 받아, 여러 번의 `divmod()` 호출을 한 번의 호출로 연결할 수 있도록 하는 것을 목표로 합니다.

## 판정 (Pronouncement)
이 PEP는 **거부되었습니다.**

연속적인 `divmod()` 사용 사례 대부분은 (예: 진법 변환에서) 상수 모듈러스를 포함하며, 이는 루프(loop)를 사용하는 것이 더 적절합니다. 시간을 일/시/분/초로 분할하는 예시는 월(month)이나 년(year)으로 일반화하기 어렵습니다. 오히려 이러한 사용 사례는 날짜 및 시간 모듈을 통해 더 유연하고 견고하게 처리될 수 있습니다. PEP에서 언급된 다른 사용 사례들은 실제 코드에서 다소 드뭅니다.

또한 이 제안은 명확성과 직관성 측면에서 문제가 있습니다. 예시 코드에서 인자 순서가 올바른지, 대상 튜플의 길이가 정확한지 즉시 파악하기 어렵습니다. 다른 언어 사용자들은 표준 두 인자 형태를 문서 재확인 없이 더 쉽게 이해할 수 있을 것입니다. 2005년 6월 17일 python-dev 토론을 참조하십시오.

## 명세 (Specification)
내장 함수 `divmod()`는 여러 개의 제수를 받아들이도록 변경될 예정이었습니다.
기존 시그니처 `divmod(dividend, divisor)`는 `divmod(dividend, *divisors)`로 변경됩니다.

작동 방식은 다음과 같습니다:
1.  피제수(dividend)는 **마지막 제수** 로 나뉘어 몫(quotient)과 나머지(remainder)를 산출합니다.
2.  그 몫은 **두 번째 마지막 제수** 로 나뉘어 새로운 몫과 나머지를 산출합니다.
3.  이 과정은 모든 제수가 사용될 때까지 반복됩니다.
4.  `divmod()`는 마지막 단계의 몫과 모든 단계의 나머지들을 튜플로 묶어 반환합니다.

새로운 `divmod()` 동작에 대한 Python 구현 예시는 다음과 같습니다.

```python
def divmod(dividend, *divisors):
    modulos = ()
    q = dividend
    while divisors:
        q, r = q.__divmod__(divisors[-1])
        modulos = (r,) + modulos
        divisors = divisors[:-1]
    return (q,) + modulos
```

## 동기 (Motivation)
때로는 다양한 제수를 사용하여 이전 단계의 몫에 대해 `divmod()` 연산을 연속적으로 수행해야 하는 경우가 있습니다. 가장 흔한 경우는 아마도 초(seconds)를 주(weeks), 일(days), 시(hours), 분(minutes), 초(seconds)로 변환하는 것일 것입니다.

현재는 다음과 같이 작성됩니다.

```python
def secs_to_wdhms(seconds):
    m, s = divmod(seconds, 60)
    h, m = divmod(m, 60)
    d, h = divmod(h, 24)
    w, d = divmod(d, 7)
    return (w, d, h, m, s)
```

이 방법은 번거롭고 매번 필요할 때마다 오류를 범하기 쉽습니다.

만약 제안대로 `divmod()` 내장 함수가 변경된다면, 초를 주, 일, 시, 분, 초로 변환하는 코드는 다음과 같이 됩니다.

```python
def secs_to_wdhms(seconds):
    w, d, h, m, s = divmod(seconds, 7, 24, 60, 60)
    return (w, d, h, m, s)
```

이는 입력하기 쉽고, 정확하게 입력하기 쉬우며, 읽기에도 더 쉽습니다.

다른 응용 분야는 다음과 같습니다.
*   **천문학적 각도:** (적위(declination)는 도, 분, 초로 측정되고, 적경(right ascension)은 시, 분, 초로 측정됩니다.)
*   **구 영국 통화:** (1 파운드 = 20 실링, 1 실링 = 12 펜스)
*   **영미 길이 단위:** (1 마일 = 1760 야드, 1 야드 = 3 피트, 1 피트 = 12 인치)
*   **영미 무게 단위:** (1 롱 톤 = 160 스톤, 1 스톤 = 14 파운드, 1 파운드 = 16 온스, 1 온스 = 16 드람)
*   **영국 부피 단위:** (1 갤런 = 4 쿼트, 1 쿼트 = 2 파인트, 1 파인트 = 20 액량 온스)

## 근거 (Rationale)
이 아이디어는 APL에서 유사한 연산자가 있다는 점에서 비롯되었습니다. (그 연산자가 어떤 모양이었는지 기억나지 않으며, ASCII로 렌더링하는 것도 아마 불가능할 것입니다.)

APL 연산자는 두 번째 피연산자로 리스트를 취하지만, 이 PEP는 각 제수가 `divmod()` 함수의 개별 인자여야 한다고 제안합니다. 이는 가장 일반적인 사용 사례에서 제수들이 (위의 7, 24, 60, 60처럼) 호출 내에 상수로 직접 올 것으로 예상되며, 괄호나 대괄호를 추가하는 것이 호출을 복잡하게 만들 것이기 때문입니다.

`divmod()`의 두 번째 인자로 명시적인 시퀀스를 요구하는 것은 하위 호환성(backwards compatibility)을 심각하게 손상시킬 수 있습니다. `divmod()`가 두 번째 인자가 시퀀스인지 확인하도록 하는 것은 너무 지저분하다고 간주되어 고려되지 않았습니다. 다른 곳에서 계산된 시퀀스를 사용하는 경우 `divmod(x, *divs)`와 같이 작성하는 것이 충분히 쉽습니다.

적어도 하나의 제수를 요구하는 것, 즉 `divmod(x)`를 거부하는 것도 고려되었지만, 그렇게 해야 할 좋은 이유가 떠오르지 않았으므로 일반성(generality)을 위해 허용됩니다.
제수 없이 `divmod()`를 호출하면 여전히 튜플(한 요소)을 반환해야 합니다. 가변적인 수의 제수로 `divmod()`를 호출하여 "알 수 없는" 수의 요소를 가진 반환 값을 받는 코드는 그렇지 않으면 해당 경우를 특별히 처리해야 할 것입니다. 제수 없이 `divmod()`를 호출하는 코드는 특별한 경우를 정당화할 만큼 너무 어리석다고 간주됩니다.

제수를 다른 방향으로 처리하는 것, 즉 마지막 제수로 먼저 나누는 대신 첫 번째 제수로 먼저 나누는 것도 고려되었습니다. 그러나 결과는 가장 중요한 부분(most significant part)이 먼저 오고 가장 덜 중요한 부분(least significant part)이 나중에 옵니다 (연속적인 `divmod`를 다양한 가중치를 가진 숫자를 "자릿수"로 분할하는 방법으로 생각해보십시오). 따라서 제수(가중치)를 결과와 동일한 순서로 지정하는 것이 합리적입니다.

역 연산(inverse operation)도 유용할 수 있습니다.

```python
def inverse_divmod(seq, *factors):
    product = seq[0]
    for x, y in zip(factors, seq[1:]):
        product = product * x + y
    return product
```

그러나 다음과 같이 작성하는 것이 연속적인 `divmod`보다 작성 및 읽기 모두 덜 번거롭습니다.

```python
seconds = (((((w * 7) + d) * 24 + h) * 60 + m) * 60 + s)
```

따라서 이 기능은 덜 중요하다고 간주되며, 도입은 자체 PEP로 연기될 수 있습니다. 또한, 이러한 함수에는 좋은 이름이 필요하며, PEP 작성자는 아직 이름을 떠올리지 못했습니다.

문자열은 나눗셈이나 모듈로 연산을 지원하지 않음에도 불구하고 `divmod("spam")`을 호출해도 오류가 발생하지 않습니다. 그러나 다른 객체도 알지 못하는 한, `divmod()`가 작동할지 여부를 결정할 수 없으므로 이를 금지하는 것은 어리석어 보입니다.

## 하위 호환성 (Backwards Compatibility)
`__builtin__` 모듈에서 `divmod()` 함수를 대체하는 모든 모듈은 새로운 구문을 사용하는 다른 모듈을 손상시킬 수 있습니다. 이러한 경우는 매우 드물 것으로 예상됩니다.

두 개가 아닌 다른 인자 수로 `divmod()`를 호출할 때 `TypeError` 예외(exception)를 예상하는 코드는 손상될 것입니다. 이 또한 매우 드물 것으로 예상됩니다.

하위 호환성과 관련된 다른 알려진 문제는 없습니다.

## 참조 구현 (Reference Implementation)
아직 완료되지 않았지만, Python/bltinmodule.c 파일의 `builtin_divmod()` 함수에 대한 상당히 직관적인 새 구현으로 보입니다.

## 참조 (References)
*   Raymond Hettinger, "Propose rejection of PEP 303 – Extend divmod() for Multiple Divisors" https://mail.python.org/pipermail/python-dev/2005-June/054283.html

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.