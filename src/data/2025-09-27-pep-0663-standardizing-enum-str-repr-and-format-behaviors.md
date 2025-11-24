---
title: "[Rejected] PEP 663 - Standardizing Enum str(), repr(), and format() behaviors"
excerpt: "Python Enhancement Proposal 663: 'Standardizing Enum str(), repr(), and format() behaviors'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/663/
toc: true
toc_sticky: true
date: 2025-09-27 09:57:11+0900
last_modified_at: 2025-09-27 09:57:11+0900
published: true
---
> **원문 링크:** [PEP 663 - Standardizing Enum str(), repr(), and format() behaviors](https://peps.python.org/pep-0663/)
>
> **상태:** Rejected | **유형:** Informational | **작성일:** 30-Jun-2021


# PEP 663 – Enum의 `str()`, `repr()`, `format()` 동작 표준화

*   **작성자:** Ethan Furman
*   **상태:** Rejected (거부됨)
*   **타입:** Informational (정보성)
*   **생성일:** 2021년 6월 30일
*   **Python 버전:** 3.11
*   **해결:** Python-Dev 메시지

## 개요 (Abstract)

이 PEP는 다양한 `Enum` 타입의 `repr()`, `str()`, 그리고 `format()` 메서드를 의도된 목적에 더 잘 부합하도록 업데이트하는 것을 제안합니다. 예를 들어, `IntEnum`의 `str()`은 `format()`과 일치하도록 변경되며, 사용자가 정의한 `int-enum`은 `format()`이 `str()`과 일치하도록 변경됩니다. 모든 경우에 `enum`의 `str()`과 `format()`은 동일하게 유지됩니다(사용자가 `format()`을 오버라이드하지 않는 한).

또한, 데코레이트된 `enum`의 `str()`, `repr()` (및 `format()`)을 유효한 전역 참조(예: `<RegexFlag.IGNORECASE: 2>` 대신 `re.IGNORECASE`)로 변경하는 전역 `enum` 데코레이터를 추가하는 것을 제안합니다.

## 동기 (Motivation)

*   `IntEnum`과 `IntFlag`의 `str()`이 값이 아닌 다른 형태로 출력되어 기존 상수를 대체할 때 버그를 유발하고 추가 작업을 필요하게 만들었습니다.
*   `enum` 멤버의 `str()`과 `format()`이 다르면 혼란을 줄 수 있습니다.
*   `StrEnum`이 도입되면서 `str()`이 자신의 값이어야 한다는 요구사항이 다른 `Enum` 타입의 `str()`과는 일관성이 없었습니다.
*   `Flag` 멤버의 반복(iteration)은 `repr()`에 직접적인 영향을 미치는데, 이 방식이 비우아하거나 최악의 경우 버그를 유발할 수 있습니다.

## 근거 (Rationale)

`Enum`은 표준 라이브러리에서 점점 더 보편화되고 있습니다. `enum` 멤버를 `repr()`을 통해 인식할 수 있고, 이 `repr()`이 파싱하기 쉽다는 점은 코드 이해 및 디버깅에 유용하며 시간과 노력을 절약할 수 있습니다.

하지만, 데이터 타입이 혼합된 `enum` (예: `IntEnum`, `IntFlag`, 새로운 `StrEnum`)은 대체하려는 기존 상수와의 하위 호환성을 더 많이 확보해야 합니다. 특히 `str(replacement_enum_member) == str(original_constant)`이 참이어야 하며, `format()`도 마찬가지여야 합니다.

`IntEnum`, `IntFlag`, `StrEnum`은 기존 정수 및 문자열 상수를 가능한 한 완벽하게 대체할 수 있어야 합니다. 이러한 목표를 위해, 각 `enum`의 `str()` 출력은 그 고유한 값이어야 합니다. 예를 들어, `Color`가 `IntEnum`이라면:

```python
>>> Color.RED
<Color.RED: 1>
>>> str(Color.RED)
'1'
>>> format(Color.RED)
'1'
```

`format()`은 이미 올바른 출력을 생성하고 있으므로, `str()`만 업데이트가 필요합니다.

가능한 한 `enum` 멤버의 `str()`, `repr()`, `format()`은 표준 라이브러리 전반에 걸쳐 표준화되어야 합니다. 그러나 Python 3.10까지는 표준 라이브러리의 여러 `enum`이 사용자 정의 `str()` 및/또는 `repr()`을 가지고 있습니다.

`Flag`의 `repr()`은 현재 포함해서는 안 되는 별칭(aliases)을 포함하고 있습니다. 이 문제를 해결하면 특정 경우에 `repr()`이 변경될 것입니다.

## 명세 (Specification)

`enum` 사용에는 크게 세 가지 범주가 있습니다:

1.  **Simple (단순):** `Enum` 또는 `Flag`와 같이 데이터 타입 믹스인(mixin) 없이 새로운 `enum` 클래스가 생성됩니다.
2.  **Drop-in Replacement (드롭인 대체):** `IntEnum`, `IntFlag`, `StrEnum`과 같이 `int` 또는 `str`을 서브클래싱하고 `int.__str__` 또는 `str.__str__`을 사용하는 새로운 `enum` 클래스가 생성됩니다.
3.  **User-mixed enums and flags (사용자 혼합 `enum` 및 `flag`):** 사용자가 `enum.IntEnum` 등을 사용하는 대신 자신만의 정수, 실수, 문자열 등 `enum`을 생성합니다.

또한 두 가지 스타일이 있습니다:

1.  **Normal (일반):** 열거 멤버가 자신의 클래스에 남아 있으며 `classname.membername`으로 접근되고, 클래스 이름이 `repr()`과 `str()`에 (적절한 경우) 표시됩니다.
2.  **Global (전역):** 열거 멤버가 해당 모듈의 전역 네임스페이스로 복사되며, 모듈 이름이 `repr()`과 `str()`에 (적절한 경우) 표시됩니다.

다음 두 표는 위 분류에 따라 `enum`과 `flag`의 `repr()`, `str()`, `format()`이 어떻게 변경되는지를 보여줍니다. (빈 셀은 변경 없음)

### Enum의 `repr()`, `str()`, `format()` 변경 (이전 및 신규)

| style  | category    | enum repr() (3.10)       | enum repr() (new)        | enum str() (3.10)        | enum str() (new)         | enum format() (3.10)     | enum format() (new)      |
| :----- | :---------- | :----------------------- | :----------------------- | :----------------------- | :----------------------- | :----------------------- | :----------------------- |
| normal | simple      | `<Hue.LIGHT: -1>`        |                          | `Hue.LIGHT`              |                          | `Hue.LIGHT`              |                          |
|        | user mixed  | `<Grey.WHITE: 1>`        |                          | `Grey.WHITE`             |                          | `Grey.WHITE`             |                          |
|        | int drop-in | `<Hue.LIGHT: -1>`        |                          | `Hue.LIGHT`              | `-1`                     | `-1`                     |                          |
| global | simple      | `<Hue.LIGHT: -1>`        | `tools.LIGHT`            | `Hue.LIGHT`              | `LIGHT`                  | `Hue.LIGHT`              | `LIGHT`                  |
|        | user mixed  | `<Grey.WHITE: 1>`        | `tools.WHITE`            | `Grey.WHITE`             | `WHITE`                  | `Grey.WHITE`             | `WHITE`                  |
|        | int drop-in | `<Hue.LIGHT: -1>`        | `tools.LIGHT`            | `Hue.LIGHT`              | `-1`                     | `-1`                     |                          |

### Flag의 `repr()`, `str()`, `format()` 변경 (이전 및 신규)

| style  | category    | flag repr() (3.10)             | flag repr() (new)              | flag str() (3.10)              | flag str() (new)                 | flag format() (3.10)           | flag format() (new)            |
| :----- | :---------- | :----------------------------- | :----------------------------- | :----------------------------- | :------------------------------- | :----------------------------- | :----------------------------- |
| normal | simple      | `<Color.RED|GREEN: 3>`         | `<Color(3): RED|GREEN>`        | `Color.RED|GREEN`              | `Color.RED|Color.GREEN`          | `Color.RED|GREEN`              | `Color.RED|Color.GREEN`        |
|        | user mixed  | `<Grey.WHITE: 1>`              | `<Grey(1): WHITE>`             | `1`                            | `Grey.WHITE`                     | `1`                            | `Grey.WHITE`                   |
|        | int drop-in | `<Color.RED|GREEN: 3>`         | `<Color(3): RED|GREEN>`        | `Color.RED|GREEN`              | `3`                              | `Color.RED|GREEN`              | `3`                            |
| global | simple      | `<Color.RED|GREEN: 3>`         | `tools.RED|tools.GREEN`        | `Color.RED|GREEN`              | `RED|GREEN`                      | `Color.RED|GREEN`              | `RED|GREEN`                    |
|        | user mixed  | `<Grey.WHITE: 1>`              | `tools.WHITE`                  | `Grey.WHITE`                   | `WHITE`                          | `1`                            | `WHITE`                        |
|        | int drop-in | `<Color.RED|GREEN: 3>`         | `tools.RED|tools.GREEN`        | `Color.RED|GREEN`              | `3`                              | `Color.RED|GREEN`              | `3`                            |

최종 결과 표는 다음과 같습니다:

### 최종 Enum `repr()`, `str()`, `format()`

| style  | category    | enum repr()        | enum str()  | enum format() |
| :----- | :---------- | :----------------- | :---------- | :------------ |
| normal | simple      | `<Hue.LIGHT: -1>`  | `Hue.LIGHT` | `Hue.LIGHT`   |
|        | user mixed  | `<Grey.WHITE: 1>`  | `Grey.WHITE`| `Grey.WHITE`  |
|        | int drop-in | `<Hue.LIGHT: -1>`  | `-1`        | `-1`          |
| global | simple      | `tools.LIGHT`      | `LIGHT`     | `LIGHT`       |
|        | user mixed  | `tools.WHITE`      | `WHITE`     | `WHITE`       |
|        | int drop-in | `tools.LIGHT`      | `-1`        | `-1`          |

### 최종 Flag `repr()`, `str()`, `format()`

| style  | category    | flag repr()            | flag str()          | flag format()       |
| :----- | :---------- | :--------------------- | :------------------ | :------------------ |
| normal | simple      | `<Color(3): RED|GREEN>`| `Color.RED|Color.GREEN`| `Color.RED|Color.GREEN`|
|        | user mixed  | `<Grey(1): WHITE>`     | `Grey.WHITE`        | `Grey.WHITE`        |
|        | int drop-in | `<Color(3): RED|GREEN>`| `3`                 | `3`                 |
| global | simple      | `tools.RED|tools.GREEN`| `RED|GREEN`         | `RED|GREEN`         |
|        | user mixed  | `tools.WHITE`          | `WHITE`             | `WHITE`             |
|        | int drop-in | `tools.RED|tools.GREEN`| `3`                 | `3`                 |

보시다시피, `repr()`은 주로 멤버가 전역(global)인지 여부에 영향을 받으며, `str()`은 전역이거나 드롭인 대체(drop-in replacement)인지 여부에 영향을 받습니다. 드롭인 대체 상태가 더 높은 우선순위를 가집니다. 또한, 이전 스타일이 결함이 있었기 때문에 `flag`의 기본 `repr()`과 `str()`도 변경되었습니다.

## 하위 호환성 (Backwards Compatibility)

주요 Python 버전 간에 문자열화된 객체의 하위 호환성은 보장되지 않으며, 소프트웨어가 테스트, 문서, 데이터 구조 및/또는 코드 생성에서 `enum`의 `repr()`, `str()`, `format()` 출력을 사용하는 경우 하위 호환성 문제가 발생할 것입니다.

`enum` 멤버의 일반적인 사용법은 변경되지 않습니다. 예를 들어, `re.ASCII`는 여전히 `re.ASCII`로 사용될 수 있으며 256과 계속 동일하게 비교됩니다.

이전 출력을 유지해야 하는 경우(예: 다른 Python 버전 간의 호환성을 보장하기 위해), 소프트웨어 프로젝트는 적절한 메서드를 오버라이드(override)하여 자체 `enum` 기본 클래스를 생성해야 합니다.

드롭인(drop-in) 카테고리의 `str()`을 변경함으로써, `IntEnum` 등이 기존 상수를 대체하는 데 사용될 때 향후 발생할 수 있는 문제를 실제로 방지할 수 있습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인 또는 CC0-1.0-Universal 라이선스 중 더 관대한 조건으로 배포됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.