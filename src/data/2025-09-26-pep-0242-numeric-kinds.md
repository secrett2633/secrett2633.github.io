---
title: "[Withdrawn] PEP 242 - Numeric Kinds"
excerpt: "Python Enhancement Proposal 242: 'Numeric Kinds'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/242/
toc: true
toc_sticky: true
date: 2025-09-26 17:13:00+0900
last_modified_at: 2025-09-26 17:13:00+0900
published: true
---
> **원문 링크:** [PEP 242 - Numeric Kinds](https://peps.python.org/pep-0242/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 17-Mar-2001


# PEP 242 – 숫자 종류 (Numeric Kinds)

## 요약 (Abstract)
이 제안은 사용자가 숫자 연산의 정밀도(precision)와 범위(range)를 선택적으로 제어할 수 있도록 하여, 한 번 작성된 코드가 원하는 최소한의 정밀도와 범위를 보장하면서 어떤 환경에서든 실행될 수 있도록 합니다. 이 제안은 기존 코드와 하위 호환성을 유지하며, 십진수 리터럴(decimal literals)의 의미를 명확히 합니다.

## 배경 (Rationale)
현재 Fortran 90을 제외한 모든 언어에서는 부동 소수점(floating point)을 사용하는 프로그램을 이식성(portability) 있게 작성하여 플랫폼에 관계없이 거의 동일한 결과를 얻거나, 불가능할 경우 컴파일 오류를 발생시키도록 하는 것이 불가능합니다. Python은 현재 C 구현에서 C의 `double`과 동일한 단일 부동 소수점 타입만 가지고 있습니다.

`single` 또는 `quad` float에 해당하는 타입은 존재하지 않습니다. 이러한 타입을 직접 도입하려 하면 언어가 복잡해지고, 그 후의 사용도 이식성이 떨어지게 됩니다. 이 제안은 Fortran 90의 "kind" 솔루션과 유사하며, Python 환경에 맞게 조정되었습니다. 이 기능을 사용하면 `myprecision.py` 파일의 인수를 변경함으로써 전체 계산의 정밀도 수준을 한 줄만 수정하여 전환할 수 있습니다. 만약 특정 머신에서 원하는 정밀도가 지원되지 않으면, 프로그램은 잘못된 결과를 내는 대신 오류를 발생시킵니다. 이러한 스타일로 코딩할 경우 오류를 발생시킬 루틴을 미리 호출하므로, 이는 컴파일되지 않는 것 다음으로 좋은 방법입니다.

## 지원되는 정수 및 부동 소수점 종류 (Supported Kinds of Ints and Floats)
복소수(complex numbers)는 Python이 복소수 없이 빌드될 수 있으므로 아래에서 별도로 다룹니다.

각 Python 컴파일러는 원하는 만큼의 정수(integer) 및 부동 소수점(floating point) 숫자 "종류(kinds)"를 정의할 수 있습니다. 단, 기존 `int`와 `long`에 해당하는 최소 두 가지 정수 종류와 현재의 `float`에 해당하는 최소 한 가지 부동 소수점 종류를 지원해야 합니다.

이러한 필수 종류들의 범위와 정밀도는 현재와 마찬가지로 프로세서에 따라 다르지만, 임의의 정수를 담을 수 있는 "long integer" 종류는 예외입니다.

내장 함수 `int()`, `long()`, `float()`는 현재와 같이 입력을 이러한 기본 종류로 변환합니다. (참고로 유니코드 문자열은 실제로 다른 "종류"의 문자열이며, 충분한 지식을 가진 사람은 이 PEP를 확장하여 해당 경우를 다룰 수도 있습니다.)

각 타입(정수, 부동 소수점) 내에서 컴파일러는 증가된 범위 및/또는 정밀도의 숫자를 담을 수 있는 능력에 따라 선형적으로 정렬된 종류 집합을 지원합니다.

## 종류 객체 (Kind Objects)
`kinds`라는 모듈에 두 개의 새로운 표준 함수가 정의됩니다. 이 함수들은 호출 가능한 "kind 객체(kind objects)"를 반환합니다. 각 정수 또는 부동 소수점 kind 객체 `f`는 `result = f(x)` 시그니처를 가지며, 각 복소수 kind 객체는 `result = f(x, y=0.)` 시그니처를 가집니다.

*   **`int_kind(n)`** : `n >= 1`인 정수 인수에 대해, 열린 구간 `(-10 **n, 10** n)` 내의 정수를 담을 수 있는 정수 종류를 반환하는 호출 가능한 객체를 반환합니다. 이 kind 객체는 `long`을 포함한 정수를 인수로 받습니다. `n == 0`인 경우, Python 리터럴 `0`에 해당하는 kind 객체를 반환합니다.
*   **`float_kind(nd, n)`** : `nd >= 0` 및 `n >= 1`에 대해, 최소 `nd` 자리의 정밀도와 닫힌 구간 `[-n, n]` 내의 10진수 지수(base-10 exponent)를 가진 부동 소수점 숫자를 담을 수 있는 부동 소수점 종류를 반환하는 호출 가능한 객체를 반환합니다. 이 kind 객체는 정수 또는 부동 소수점을 인수로 받습니다.
    `nd`와 `n`이 모두 0인 경우, Python 리터럴 `0.0`에 해당하는 kind 객체를 반환합니다.

컴파일러는 해당 타입에 대해 원하는 속성을 가진, 사용 가능한 종류 집합 중에서 가장 작은 kind 객체를 반환합니다. 특정 구현에서 원하는 품질을 가진 종류가 없으면 `OverflowError` 예외가 발생합니다. kind 함수는 인수를 대상 종류로 변환하지만, 결과가 대상 종류의 범위에 맞지 않으면 `OverflowError` 예외가 발생합니다.

호출 가능한 동작 외에도, kind 객체는 해당 종류의 특성을 나타내는 속성을 가집니다.

*   **`name`** : 종류의 이름입니다. 표준 종류는 `int`, `long`, `double`로 불립니다.
*   **`typecode`** : `Numeric` 또는 `array` 모듈과 함께 사용하여 이 종류의 배열을 형성하는 데 적합한 단일 문자열입니다. 표준 타입의 `typecode`는 각각 `'i'`, `'O'`, `'d'`입니다.

정수 종류는 다음과 같은 추가 속성을 가집니다:
*   **`MAX`** : 이 종류의 허용 가능한 최대 정수이며, `long` 종류의 경우 `None`입니다.
*   **`MIN`** : 이 종류의 허용 가능한 가장 작은(음수) 정수이며, `long` 종류의 경우 `None`입니다.

부동 소수점 종류는 표준 헤더 파일 "float.h"에서 해당 C 타입의 해당 값과 동일한 속성을 가집니다:
*   `MAX`, `MIN`, `DIG`, `MANT_DIG`, `EPSILON`, `MAX_EXP`, `MAX_10_EXP`, `MIN_EXP`, `MIN_10_EXP`, `RADIX`, `ROUNDS` (`float.h`의 `FLT_RADIX`, `FLT_ROUNDS`와 동일).
이 값들은 `MAX`, `MIN`, `EPSILON`을 제외하고는 정수 타입이며, 이들은 해당 종류에 해당하는 Python 부동 소수점 타입입니다.

## `kinds` 모듈의 속성 (Attributes of Module `kinds`)
*   **`int_kinds`** : 사용 가능한 정수 종류의 목록으로, 가장 낮은 종류부터 가장 높은 종류까지 정렬되어 있습니다. 정의에 따라 `int_kinds[-1]`은 `long` 종류입니다.
*   **`float_kinds`** : 사용 가능한 부동 소수점 종류의 목록으로, 가장 낮은 종류부터 가장 높은 종류까지 정렬되어 있습니다.
*   **`default_int_kind`** : Python 리터럴 `0`에 해당하는 kind 객체입니다.
*   **`default_long_kind`** : Python 리터럴 `0L`에 해당하는 kind 객체입니다.
*   **`default_float_kind`** : Python 리터럴 `0.0`에 해당하는 kind 객체입니다.

## 복소수 (Complex Numbers)
지원되는 경우, 복소수(complex numbers)는 동일한 종류의 부동 소수점 숫자인 실수부와 허수부를 가집니다. Python 컴파일러가 복소수를 지원한다면, 지원하는 각 부동 소수점 종류에 대한 복소수 대응 타입을 지원해야 합니다.

복소수가 지원되는 경우, `kinds` 모듈에서 다음을 사용할 수 있습니다.

*   **`complex_kind(nd, n)`** : `nd` 자리의 정밀도와 `[-n, n]` 범위의 10진수 지수를 가진 부동 소수점 종류 `float_kind(nd, n)`의 구성 요소(`.real`, `.imag`)를 각각 가지는 복소수를 담을 수 있는 복소수 종류를 반환하는 호출 가능한 객체를 반환합니다. 이 kind 객체는 정수, 실수 또는 복소수 종류의 인수를 하나 받거나, 각각 정수 또는 실수인 두 인수를 받습니다.
*   **`complex_kinds`** : 사용 가능한 복소수 종류의 목록으로, 가장 낮은 종류부터 가장 높은 종류까지 정렬되어 있습니다.
*   **`default_complex_kind`** : Python 리터럴 `0.0j`에 해당하는 kind 객체입니다. 이 종류의 이름은 `doublecomplex`이고, `typecode`는 `'D'`입니다.

복소수 kind 객체는 다음 추가 속성을 가집니다:
*   **`floatkind`** : 해당 `float` 타입의 kind 객체입니다.

## 예시 (Examples)

`myprecision.py` 모듈 내:
```python
import kinds
tinyint = kinds.int_kind(1)
single = kinds.float_kind(6, 90)
double = kinds.float_kind(15, 300)
csingle = kinds.complex_kind(6, 90)
```

나머지 코드에서:
```python
from myprecision import tinyint, single, double, csingle

n = tinyint(3)
x = double(1.e20)
z = 1.2 # 내장 float는 기본 float 종류를 반환하며 속성은 알 수 없음
w = x * float(x) # 하지만 다음 경우, w는 "double" 종류임을 알 수 있음
w = x * double(z)
u = csingle(x + z * 1.0j)
u2 = csingle(x+z, 1.0)
```
위 예시에서 `myprecision.py`의 인수를 변경함으로써 전체 코드가 어떻게 더 높은 정밀도로 변경될 수 있는지 주목하세요.

참고: `single != double`이 보장되지는 않지만, `double(1.e20)`이 15자리 십진수 정밀도와 최대 `10 **300`의 범위를 가진 숫자를 담거나, `float_kind` 호출이 실패할 것이 보장됩니다.

## 철회됨 (Withdrawn)
** 중요: 이 PEP는 철회되었습니다. **

`kinds` 모듈은 표준 라이브러리에 추가되지 않을 것입니다. 이 제안에 대한 반대는 없었지만, 이를 사용하려는 관심이 미미하여 모듈을 표준 라이브러리에 추가할 정당성이 충분하지 않았습니다. 대신, 이 모듈은 Numerical Python 사이트에서 별도의 배포 항목으로 제공될 예정입니다. Numerical Python의 다음 릴리스에서는 더 이상 Numeric 배포의 일부가 아닐 것입니다.

## 공개된 문제 (Open Issues)
현재 제기된 공개 문제는 없습니다.

## 저작권 (Copyright)
이 문서는 공용 도메인(public domain)으로 지정되었습니다.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.