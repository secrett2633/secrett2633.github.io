---
title: "[Final] PEP 457 - Notation For Positional-Only Parameters"
excerpt: "Python Enhancement Proposal 457: 'Notation For Positional-Only Parameters'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/457/
toc: true
toc_sticky: true
date: 2025-09-26 22:06:22+0900
last_modified_at: 2025-09-26 22:06:22+0900
published: true
---
> **원문 링크:** [PEP 457 - Notation For Positional-Only Parameters](https://peps.python.org/pep-0457/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 08-Oct-2013



# PEP 457 – 위치 전용 매개변수 표기법

*   **작성자**: Larry Hastings <larry at hastings.org>
*   **논의**: Python-Dev list
*   **상태**: Final (최종)
*   **유형**: Informational (정보성)
*   **생성일**: 2013년 10월 8일

## 개요 (Overview)

이 PEP는 Python에서 **위치 전용(positional-only) 매개변수**를 위한 표기법을 제안합니다. 위치 전용 매개변수는 외부에서 사용할 수 있는 이름이 없는 매개변수를 의미합니다. 위치 전용 매개변수를 받는 함수가 호출될 때, 위치 인자(positional arguments)는 오직 인자의 위치에 기반하여 이 매개변수들에 매핑됩니다.

이 PEP는 위치 전용 매개변수를 사용하는 API(예: Argument Clinic 또는 `inspect.Signature` 객체의 문자열 표현)를 설명할 때 사용되는 표기법을 기술하는 정보성(Informational) PEP입니다. 별도의 PEP인 [PEP 570](https://peps.python.org/pep-0570/)은 이 표기법을 완전한 Python 문법으로 승격시키는 것을 제안합니다.

## 배경 (Rationale)

Python은 항상 위치 전용 매개변수를 지원해왔습니다. 초기 Python 버전은 매개변수를 이름으로 지정하는 개념이 없었기 때문에, 모든 매개변수는 자연스럽게 위치 전용이었습니다. 이 상황은 Python 1.0경에 변경되어 모든 매개변수가 위치 또는 키워드(positional-or-keyword) 매개변수가 되었습니다. 그러나 현재 버전의 Python에서도 많은 CPython "내장(builtin)" 함수들은 여전히 위치 전용 인자만을 받습니다.

최신 Python으로 구현된 함수는 가변 인자(variadic) `*args` 매개변수를 통해 임의의 수의 위치 전용 인자를 받을 수 있습니다. 하지만 특정 수의 위치 전용 매개변수를 받도록 지정하는 Python 문법은 없습니다. 다르게 말하면, 시그니처(signature)가 Python 문법으로는 표현할 수 없는 내장 함수들이 많이 존재합니다.

이 PEP는 순수 Python 코드로 모든 내장 함수를 구현할 수 있도록 하는 하위 호환 가능한 문법의 기반이 될 수 있는 시그니처 표기법을 제안합니다 (해당 제안은 PEP 570을 참조하십시오).

### 현재 Python에서 위치 전용 매개변수의 의미 (Positional-Only Parameter Semantics In Current Python)

위치 전용 매개변수만을 받는 내장 함수의 예시는 매우 많습니다. 결과적인 의미는 Python 프로그래머가 쉽게 경험할 수 있습니다. 단순히 해당 함수를 호출할 때 인자를 이름으로 지정하여 시도해보십시오.

```python
>>> pow(x=5, y=3)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
TypeError: pow() takes no keyword arguments
```

또한, 특히 흥미로운 의미를 가진 몇몇 함수들도 있습니다.

*   `range()`: 필수 매개변수의 왼쪽에 선택적(optional) 매개변수를 받습니다.
*   `dict()`: 매핑/이터레이터(mapping/iterator) 매개변수는 선택적이며, 의미론적으로 위치 전용이어야 합니다. 이 매개변수에 외부에서 보이는 이름을 부여하면, 그 이름이 `**kwarg` 키워드 가변 매개변수 딕셔너리로 들어가는 것을 막을 수 있습니다!

명백히, 순수 Python 코드에서는 `(*args, **kwargs)`를 받고 인자를 수동으로 파싱함으로써 이들을 시뮬레이션할 수 있습니다. 그러나 이는 Python 함수의 시그니처와 실제로 받아들이는 것 사이에 불일치를 초래하며, 인자 파싱을 구현하는 추가 작업도 필요합니다.

## 동기 (Motivation)

이 PEP는 Python에 위치 전용 매개변수를 구현하자고 제안하는 것이 아닙니다. 이 PEP의 목표는 단순히 다음을 위해 구문을 정의하는 것입니다.

*   문서가 함수의 인자가 정확히 어떻게 해석될지 명확하고 모호하지 않게 일관성 있게 표현할 수 있도록 합니다.
*   커뮤니티가 언어에 위치 전용 매개변수를 추가하기로 결정할 경우를 대비하여 해당 구문을 미래에 사용하도록 예약합니다.
*   Argument Clinic이 내장 함수의 인자를 정의할 때 해당 구문의 변형을 입력으로 사용할 수 있도록 합니다.

### 위치 전용 매개변수 문서화의 현재 상태 (The Current State Of Documentation For Positional-Only Parameters)

위치 전용 매개변수에 대한 문서는 불완전하고 일관성이 없습니다.

*   일부 함수는 선택적인 위치 전용 인자 그룹을 중첩된 대괄호로 묶어 표시합니다.
*   일부 함수는 다양한 수의 인자를 가진 여러 프로토타입을 제시하여 선택적인 위치 전용 인자 그룹을 표시합니다.
*   일부 함수는 위 두 가지 접근 방식을 모두 사용합니다.

고려해야 할 또 하나의 중요한 아이디어: 현재 문서에는 함수가 위치 전용 매개변수를 취하는지 여부를 알 수 있는 방법이 없습니다. `open()`은 키워드 인자를 받지만, `ord()`는 그렇지 않습니다. 하지만 단순히 문서를 읽는 것만으로는 이 사실을 알 방법이 없습니다.

## 구문 및 의미 (Syntax And Semantics)

전체적인 관점에서 `*args`와 `**kwargs`를 잠시 무시하면, 함수 정의의 문법은 현재 다음과 같습니다.

```python
def name(positional_or_keyword_parameters, *, keyword_only_parameters):
```

이 관점을 바탕으로, 함수를 위한 새로운 구문은 다음과 같습니다.

```python
def name(positional_only_parameters, /, positional_or_keyword_parameters, *, keyword_only_parameters):
```

`/` 문자 이전에 있는 모든 매개변수는 **위치 전용(positional-only)**입니다. 함수 시그니처에 `/`가 지정되지 않으면, 해당 함수는 위치 전용 매개변수를 받지 않습니다.

위치 전용 매개변수는 기본값(default value)을 가질 수 있으며, 그럴 경우 선택적(optional)입니다. 기본값이 없는 위치 전용 매개변수는 "필수" 위치 전용 매개변수입니다.

위치 전용 매개변수의 추가적인 의미는 다음과 같습니다.

*   위치 전용 매개변수는 기술적으로 이름을 가지고 있지만, 이 이름들은 **내부 전용(internal-only)**입니다. 위치 전용 매개변수는 외부에서 이름으로 접근할 수 없습니다. (`*args` 및 `**kwargs`와 유사합니다.)
*   `/` 뒤에 인자가 있다면, 키워드 전용 매개변수로의 전환을 나타내는 `*` 뒤에 쉼표가 있는 것처럼, `/` 뒤에도 쉼표를 지정해야 합니다.
*   이 구문은 `*args`나 `**kwargs`에는 영향을 미치지 않습니다.

## 추가적인 제한 사항 (Additional Limitations)

Argument Clinic은 내장 함수를 지정하기 위해 이 구문의 한 형태를 사용합니다. 이는 이론적으로 불필요하지만 구현을 쉽게 하기 위해 추가적인 제한을 가합니다. 특히:

*   위치 전용 매개변수를 가진 함수는 현재 다른 종류의 매개변수를 가질 수 없습니다. (이것은 가까운 미래에 약간 완화될 가능성이 있습니다.)
*   Argument Clinic은 "선택적 그룹(optional groups)"이라는 추가 구문을 지원합니다. "선택적 그룹"은 그룹으로 지정되거나 지정되지 않아야 하는 위치 전용 매개변수의 연속적인 집합입니다. 예를 들어, Argument Clinic에서 4개의 매개변수를 취하고 모두 위치 전용이며 하나의 선택적 그룹에 속하는 함수를 정의하면, 함수 호출 시 0개의 인자 또는 4개의 인자를 지정해야 합니다. 이는 Python의 레거시 라이브러리 중 더 많은 부분을 다루는 데 필요하지만, 이 PEP의 범위를 벗어나며 실제 Python 언어에 포함하는 것은 권장되지 않습니다.

## 미래 구현자를 위한 참고 사항 (Notes For A Future Implementor)

만약 미래 버전의 Python에서 위치 전용 매개변수를 구현하기로 결정한다면, 그 의미를 보존하기 위해 추가적인 작업이 필요할 것입니다. 문제는: 함수가 호출될 때 매개변수에 어떤 값도 전달되지 않았음을 매개변수에게 어떻게 알릴 것인가?

명백한 해결책: Python에 새로운 싱글톤(singleton) 상수를 추가하여 매개변수가 인자에 매핑되지 않았을 때 전달하는 것입니다. 제안은 이 값을 `undefined`라고 부르고, `Undefined`라는 특별한 클래스의 싱글톤이 되도록 하는 것입니다. 위치 전용 매개변수가 호출될 때 인자를 받지 않았다면, 그 값은 `undefined`로 설정될 것입니다.

하지만 이는 또 다른 문제를 제기합니다. "이 위치 전용 매개변수가 인자를 받지 않았다"와 "호출자가 이 매개변수에 `undefined`를 전달했다"를 어떻게 구분할 수 있을까?

함수에 `undefined`를 인자로 전달하는 것을 불법으로 만들면 좋을 것입니다 (예: 예외 발생). 그러나 그것은 Python의 속도를 늦출 것이고, "합의된 성인(consenting adults)" 규칙이 여기에 적용될 수 있습니다. 따라서 이를 불법으로 만드는 것은 강력히 비권장되어야 하지만 완전히 막지는 않아야 할 것입니다.

그러나 사용자 함수가 매개변수의 기본값으로 `undefined`를 지정하는 것은 허용되어야 하며(권장되어야 합니다).

## 미해결 질문 (Unresolved Questions)

Python에는 세 가지 유형의 매개변수가 있습니다.

1.  위치 전용 매개변수 (positional-only parameters)
2.  위치 또는 키워드 매개변수 (positional-or-keyword parameters)
3.  키워드 전용 매개변수 (keyword-only parameters)

Python은 함수가 2번과 3번을 모두 가질 수 있도록 합니다. 그리고 일부 내장 함수(`range` 등)는 1번과 3번을 모두 가집니다. 함수가 1번과 2번을 모두 가지는 것이 합리적일까요? 아니면 위 세 가지를 모두 가지는 것이 합리적일까요?

## 감사 (Thanks)

위치 전용 매개변수와 위치 또는 키워드 매개변수 사이의 구분자로 `/`를 사용한 것에 대한 공로는 2012년 Guido van Rossum의 제안에 있습니다.

왼쪽 선택 그룹의 우선순위를 높게 만든 것에 대한 공로는 Alyssa Coghlan에게 있습니다. (PyCon US 2013 현장 대화).

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.