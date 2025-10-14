---
title: "[Final] PEP 682 - Format Specifier for Signed Zero"
excerpt: "Python Enhancement Proposal 682: 'Format Specifier for Signed Zero'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/682/
toc: true
toc_sticky: true
date: 2025-09-27 10:10:49+0900
last_modified_at: 2025-09-27 10:10:49+0900
published: true
---
> **원문 링크:** [PEP 682 - Format Specifier for Signed Zero](https://peps.python.org/pep-0682/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 29-Jan-2022

PEP 682 – 부호 있는 0에 대한 형식 지정자

## 개요
이 문서는 Python의 `float` 및 `Decimal` 타입이 부호 있는 0(예: `-0.0`)을 표현할 수 있음에도 불구하고, 많은 수학 분야에서 음수 0이 예상치 못하거나 원치 않는 결과로 여겨지는 문제를 다룹니다. 특히 숫자 결과(종종 반올림된)를 표시할 때 이러한 경향이 두드러집니다. 이 PEP는 음수 0을 양수 0으로 정규화할 수 있도록 문자열 형식 지정(string format specification)을 확장하는 것을 제안합니다.

## 동기 (Motivation)
음수 0은 다음과 같이 존재합니다.
```python
>>> x = -0.
>>> x
-0.0
```
숫자를 포매팅(formatting)할 때, 음수 0은 반올림(rounding)의 결과로 나타날 수 있습니다. 사용자의 의도가 실제로 정밀도(precision)를 버리는 것이라고 가정할 때, 반올림된 결과의 음수 0과 양수 0 사이의 구별은 원치 않는 부산물로 간주될 수 있습니다.
```python
>>> for x in (.002, -.001, .060):
... print(f'{x: .1f}')
0.0
-0.0
0.1
```
음수 0의 부호를 제거하는 다양한 접근 방식이 있습니다. 양수 0을 추가하여 조건문 없이 달성할 수 있습니다.
```python
>>> x = -0.
>>> x + 0.
0.0
```
포매팅 시 음수 0을 정규화하려면, 입력 값에 대해 중복되고 오류 발생 가능성이 있는 사전 반올림(pre-rounding)을 수행해야 합니다.
```python
>>> for x in (.002, -.001, .060):
... print(f'{round(x, 1) + 0.: .1f}')
0.0
0.0
0.1
```
언어에 관계없이 프로그래머들이 음수 0을 억제하는 방법을 자주 찾고 있으며, 다양한 해결책(사전 반올림, 사후 정규표현식 등)을 사용한다는 충분한 증거가 있습니다. 예를 들면 다음과 같습니다.
* Python에서 음수 0을 항상 양수 0으로 포맷하는 방법 (Python, 사후 정규표현식)
* (Iron)Python에서 modulo 연산자 및 "음수 0"과 관련된 포매팅 문제 (Python, 사전 반올림)
* Java에서 0일 경우 음수 부호 (Java, 사후 정규표현식)
* 작은 음수가 "-0"으로 출력되는 것을 방지 (Objective-C, 사용자 정의 숫자 포매터)

대신, 숫자 문자열 포매팅이 이미 제공하는 모든 기능 위에 음수 0을 정규화하는 일급(first-class) 옵션을 원합니다.

## 근거 (Rationale)
포맷된 숫자 출력에서 음수 0이 원치 않는 경우가 있습니다. 오히려 원치 않는 경우가 더 흔하다고 볼 수 있습니다. 형식 지정(format specification)을 확장하는 것이 이를 지원하는 가장 좋은 방법입니다. 왜냐하면 숫자 포매팅은 이미 반올림을 포함하고 있으며, 음수 0의 정규화는 반올림 후에 이루어져야 하기 때문입니다.

포매팅 전에 숫자를 사전 반올림하고 정규화하는 것이 가능하지만, 반올림이 형식 지정자와 정확히 일치하지 않으면 번거롭고 오류가 발생하기 쉽습니다. 또한, 포매팅을 래핑하는 함수는 정밀도 정보를 추출하기 위해 형식 지정자를 파싱해야 할 것입니다. 예를 들어, 1차원 숫자 배열을 포맷하는 다음 유틸리티가 이러한 사전 반올림으로 인해 얼마나 복잡해질지 고려해보세요.
```python
def format_vector(v, format_spec='8.2f'):
    """Format a vector (any iterable) using given per-term format string."""
    return f"[{','.join(f'{term:{format_spec}}' for term in v)}]"
```
현재까지 음수 0에 대한 포매팅 옵션을 제공하는 다른 널리 사용되는 언어나 라이브러리는 없는 것으로 보입니다. 그러나 아래에 지정된 것과 동일한 `z` 옵션 구문 및 의미 체계가 C++ `std::format()`에 대해 제안되었습니다. 이 제안은 C++20에서는 철회되었지만, C++23에서는 합의된 제안이 약속되었습니다. (이 PEP를 촉발한 원래 기능 요청은 C++ 제안에 대한 지식 없이 주장되었습니다.)

Rust 개발자들이 출력에서 음수 0을 억제할지 여부를 논의했을 때, 그들은 다른 언어에 대한 작은 설문 조사를 했습니다. 특히, 음수 0 처리 옵션을 제공하는 언어는 언급되지 않았습니다.

## 사양 (Specification)
`sign` 다음에 선택적이고 리터럴인 `z`가 Format Specification Mini-Language에 추가됩니다.
```
[[fill]align][sign][z][#][0][width][grouping_option][.precision][type]
```
여기서 `z`는 부동 소수점(floating-point) 표현 타입(format specification documentation에 정의된 `f`, `g` 등)에 허용됩니다. `z` 지원은 각 숫자 타입의 `.__format__()` 메서드에 의해 제공되며, 이 지정자를 f-string, 내장 `format()` 및 `str.format()`에서 사용할 수 있도록 합니다.

`z`가 존재하면, 음수 0(원래 값이든 반올림 결과이든)은 양수 0으로 정규화됩니다.

**요약:**
```python
>>> x = -.00001
>>> f'{x:z.1f}'
'0.0'
>>> import decimal
>>> x = decimal.Decimal('-.00001')
>>> '{:+z.1f}'.format(x)
'+0.0'
```

### 설계 노트 (Design Notes)
이 해결책은 옵트인(opt-in) 방식이어야 합니다. 왜냐하면 숫자를 포매팅할 때 음수 0을 예상하거나 의존하는 프로그램의 동작을 변경할 수 없기 때문입니다.

제안된 확장은 의도적으로 `[sign][z]`이며 `[sign[z]]`가 아닙니다. `sign`의 기본값(`-`)은 널리 알려져 있거나 명시적으로 작성되지 않으므로, 이 `z` 옵션을 사용하기 위해 모든 사람이 이를 배워야 하는 것을 피할 수 있습니다.

f-string, 내장 `format()`, `str.format()`은 새로운 옵션에 접근할 수 있지만, `%` 포매팅은 그렇지 않습니다. `,` 옵션(PEP 378)의 경우와 같이 `%` 포매팅을 새로운 옵션으로 확장하지 않는 선례가 이미 있습니다.

C99 `printf`는 `z` 옵션 문자를 다른 목적으로 이미 사용합니다. 즉, `unsigned` 타입(`u`)이 `size_t`의 길이와 일치하도록 한정하는 것입니다. 그러나 부호 있는 0 옵션은 정수 표현 타입에 대해 `z`를 특별히 허용하지 않으므로, C 언어가 이 새로운 옵션을 채택하고자 한다면 두 가지 사용법을 명확하게 구분할 수 있습니다.

## 하위 호환성 (Backwards Compatibility)
새로운 포매팅 동작은 옵트인(opt-in) 방식이므로, 기존 프로그램의 숫자 포매팅에는 영향을 미치지 않습니다.

## 교육 방법 (How to Teach This)
일반적인 Python 입문 과정에서는 문자열 포매팅을 자세히 다루지 않을 것입니다. 이러한 과정에서는 조정할 필요가 없습니다. 문자열 형식 지정의 세부 사항을 다루는 과정의 경우, 포매팅에 의해 0으로 반올림되는 음수 값에 대한 `z` 옵션의 효과를 보여주는 단일 예제만으로도 충분할 것입니다. 다른 사람의 코드에서 이 기능을 접하는 독립적인 개발자의 경우, 라이브러리 참조 설명서의 Format Specification Mini-Language 섹션을 참조하는 것으로 충분할 것입니다.

## 참조 구현 (Reference Implementation)
참조 구현은 pull request #30049에 존재합니다.

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain) 또는 CC0-1.0-Universal 라이선스 중 더 관대한 라이선스에 따라 제공됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.