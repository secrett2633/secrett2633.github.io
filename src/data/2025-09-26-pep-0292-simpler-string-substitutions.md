---
title: "[Final] PEP 292 - Simpler String Substitutions"
excerpt: "Python Enhancement Proposal 292: 'Simpler String Substitutions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/292/
toc: true
toc_sticky: true
date: 2025-09-26 18:04:32+0900
last_modified_at: 2025-09-26 18:04:32+0900
published: true
---
> **원문 링크:** [PEP 292 - Simpler String Substitutions](https://peps.python.org/pep-0292/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 18-Jun-2002

## PEP 292 – 더 간단한 문자열 치환 (Simpler String Substitutions)

*   **작성자:** Barry Warsaw <barry at python.org>
*   **상태:** Final
*   **유형:** Standards Track
*   **생성일:** 2002년 6월 18일
*   **Python 버전:** 2.4
*   **대체:** PEP 215

### 요약 (Abstract)

이 PEP는 문자열 보간(string interpolation)으로도 알려진, 더 간단한 문자열 치환 기능을 설명합니다. 이 PEP는 두 가지 측면에서 "더 간단"합니다.

1.  Python의 현재 문자열 치환 기능(즉, `%` 연산자를 이용한 치환)은 복잡하고 오류가 발생하기 쉽습니다. 이 PEP는 표현력을 일부 희생하더라도 더 간단한 방식을 제안합니다.
2.  PEP 215는 새로운 `$ `문자열 접두사를 도입하여 대안적인 문자열 보간 기능을 제안했습니다. PEP 292는 구문 변경이 없으며 문자열에서 발생할 수 있는 치환에 대한 규칙이 훨씬 간단하기 때문에 PEP 215보다 더 간단합니다.

### 제안 배경 (Rationale)

Python은 현재 C 언어의 `printf()`의 `%` 포매팅 문자를 기반으로 하는 문자열 치환 구문을 지원합니다. 이 `%` 포매팅 코드는 매우 풍부하지만, 숙련된 Python 프로그래머에게도 오류가 발생하기 쉽습니다. 흔한 실수 중 하나는 `%` 포매팅 코드의 마지막 문자(예: `"%(name)s"`의 `s`)를 생략하는 것입니다.

또한, `%` 기호 뒤에 올 수 있는 규칙은 상당히 복잡하지만, 일반적인 애플리케이션에서는 이러한 복잡성이 거의 필요하지 않습니다. 대부분의 스크립트는 문자열 보간이 필요하지만, 그 중 대부분은 간단한 '문자열화(stringification)' 형식(예: `%s` 또는 `%(name)s`)을 사용합니다. 이러한 형식은 더 간단하고 오류 발생 가능성이 적도록 만들어져야 합니다.

### 더 간단한 제안 (A Simpler Proposal)

저희는 `string` 모듈에 `Template`라는 새로운 클래스를 추가할 것을 제안합니다. `Template` 클래스는 새로운 문자열 치환 규칙을 지원하며, 그 값은 `$` 문자로 시작하는 플레이스홀더(placeholder)를 포함합니다. `$`-플레이스홀더에 대한 다음 규칙이 적용됩니다.

*   `$$`는 이스케이프(escape) 문자이며, 단일 `$`로 대체됩니다.
*   `$identifier`는 "identifier"라는 매핑 키에 일치하는 치환 플레이스홀더를 나타냅니다. 기본적으로 "identifier"는에 정의된 Python 식별자(identifier)여야 합니다. `$` 문자 다음에 오는 첫 번째 비-식별자(non-identifier) 문자가 이 플레이스홀더 지정을 종료합니다.
*   `${identifier}`는 `$identifier`와 동일합니다. 이 형식은 플레이스홀더 뒤에 유효한 식별자 문자가 오지만 플레이스홀더의 일부가 아닌 경우(예: `"${noun}ification"`)에 필요합니다.

만약 `$` 문자가 줄의 끝에 나타나거나 위에 설명된 문자 외의 다른 문자가 뒤따르면, 보간(interpolation) 시점에 `ValueError`가 발생합니다. 매핑(mapping)의 값은 자동으로 문자열로 변환됩니다.

다른 문자에는 특별한 의미가 없지만, `Template` 클래스를 상속하여 다른 치환 규칙을 정의하는 것이 가능합니다. 예를 들어, 파생 클래스는 플레이스홀더에 마침표를 허용하거나(예: 동적 네임스페이스 및 속성 경로 조회를 지원하기 위해), `$` 외의 다른 구분 문자를 정의할 수 있습니다.

`Template`가 생성되면, 다음 두 메서드 중 하나를 호출하여 치환을 수행할 수 있습니다.

*   `substitute()`: 이 메서드는 매핑의 값이 `Template`의 플레이스홀더로 치환될 때 생성되는 새로운 문자열을 반환합니다. 매핑에 존재하지 않는 플레이스홀더가 있다면 `KeyError`가 발생합니다.
*   `safe_substitute()`: 이 메서드는 `substitute()` 메서드와 유사하지만, `KeyError`가 절대 발생하지 않습니다(매핑에 플레이스홀더가 누락된 경우에도). 플레이스홀더가 누락된 경우, 원본 플레이스홀더가 결과 문자열에 나타납니다.

다음은 몇 가지 예시입니다.

```python
>>> from string import Template
>>> s = Template('${name} was born in ${country}')
>>> print(s.substitute(name='Guido', country='the Netherlands'))
Guido was born in the Netherlands
>>> print(s.substitute(name='Guido'))
Traceback (most recent call last):
[...]
KeyError: 'country'
>>> print(s.safe_substitute(name='Guido'))
Guido was born in ${country}
```

`substitute()`와 `safe_substitute()`의 시그니처는 플레이스홀더-값 매핑을 첫 번째 위치 인수로 단일 딕셔너리-유사 객체로 전달하거나, 위에 표시된 것처럼 키워드 인수로 전달하는 것을 허용합니다. 이 두 메서드의 정확한 세부 사항과 시그니처는 표준 라이브러리 문서에 자세히 설명되어 있습니다.

### 왜 `$`와 중괄호인가? (Why $ and Braces?)

BDFL(Benevolent Dictator For Life, 자비로운 종신 독재자)이 가장 잘 설명했습니다.
"Perl 외에도 많은 언어에서 `$`가 "치환"을 의미하는데, 당신은 어디에 있었는지 궁금하네요. [...] 우리는 이것을 셸(shell)에서 따왔습니다."

따라서 치환 규칙은 다른 많은 언어와의 유사성 때문에 선택되었습니다. 이는 치환 규칙을 가르치고, 배우고, 기억하기 쉽게 만듭니다.

### PEP 215와의 비교 (Comparison to PEP 215)

PEP 215는 문자열 보간에 대한 대안적인 제안을 설명합니다. 해당 PEP와 달리, 이 PEP는 Python에 어떤 새로운 구문도 제안하지 않습니다. 제안된 모든 새로운 기능은 새로운 라이브러리 모듈에 포함됩니다. PEP 215는 `$""`와 같은 새로운 문자열 접두사 표현을 제안하며, 이는 Python에 새로운 유형의 문자열이 있음을 알립니다. `$`-문자열은 기존 `r`-접두사와 `u`-접두사와 상호 작용해야 하므로, 문자열 접두사 조합의 수를 사실상 두 배로 늘립니다.

PEP 215는 또한 `$`-문자열 내부에 임의의 Python 표현식을 허용하므로 다음과 같은 작업을 수행할 수 있습니다.

```python
import sys
print(f"sys = {sys}, sys = {sys.modules['sys']}")
```

(원본 PEP에는 `print $"sys = $sys, sys = $sys.modules['sys']"`로 되어 있으나, 이는 Python 2.x의 구문이며, 현재 Python 3.6+의 f-string과 유사한 개념을 보여주기 위해 `f-string`으로 대체 번역하였습니다.)

위 코드는 다음과 같은 결과를 반환합니다.

```
sys = <module 'sys' (built-in)>, sys = <module 'sys' (built-in)>
```

PEP 215의 규칙은 새로운 보안 문제를 도입하지 않는다는 점에서 일반적으로 안전한 것으로 받아들여집니다(자세한 내용은 PEP 215, "Security Issues" 참조). 그러나 규칙은 여전히 상당히 복잡하며, 원본 `$`-문자열에서 치환 플레이스홀더를 확인하기 어렵게 만듭니다.

흥미로운 점은 이 PEP에서 정의된 `Template` 클래스가 상속을 위해 설계되었으며, 약간의 추가 작업으로 기존 Python 구문을 사용하여 PEP 215의 기능을 지원하는 것이 가능하다는 것입니다.

예를 들어, `Template`와 `dict`의 서브클래스를 정의하여 더 복잡한 플레이스홀더 구문과 해당 플레이스홀더를 평가하는 매핑을 허용할 수 있습니다.

### 국제화 (Internationalization)

구현은 `Template` 인스턴스의 `template` 속성에 원본 템플릿 문자열을 기록함으로써 국제화를 지원합니다. 이 속성은 `gettext` 기반 카탈로그에서 조회 키(lookup key) 역할을 합니다. 애플리케이션은 결과 문자열을 다시 `Template`로 변환하여 치환하는 역할을 합니다.

그러나 `Template` 클래스는 `Template`와 `unicode` 서브클래스의 혼합(mixing-in)을 지원함으로써 국제화된 애플리케이션에서 더 직관적으로 작동하도록 설계되었습니다. 따라서 국제화된 애플리케이션은 `Template`와 `unicode`를 다중 상속하는 애플리케이션별 서브클래스를 생성하고, 해당 서브클래스의 인스턴스를 `gettext` 카탈로그 키로 사용할 수 있습니다. 또한, 서브클래스는 특별한 `__mod__()` 메서드를 `.substitute()` 또는 `.safe_substitute()`에 별칭(alias) 지정하여 더 전통적인 문자열/유니코드와 유사한 `%` 연산자 치환 구문을 제공할 수 있습니다.

### 참조 구현 (Reference Implementation)

참조 구현은 Python 2.4 소스 트리에 커밋되었습니다.

### 참조 (References)

*   String Formatting Operations [https://docs.python.org/release/2.6/library/stdtypes.html#string-formatting-operations](https://docs.python.org/release/2.6/library/stdtypes.html#string-formatting-operations)
*   Identifiers and Keywords [https://docs.python.org/release/2.6/reference/lexical_analysis.html#identifiers-and-keywords](https://docs.python.org/release/2.6/library/stdtypes.html#string-formatting-operations)
*   [https://mail.python.org/pipermail/python-dev/2002-June/025652.html](https://mail.python.org/pipermail/python-dev/2002-June/025652.html)
*   Reference Implementation [http://sourceforge.net/tracker/index.php?func=detail&aid=1014055&group_id=5470&atid=305470](http://sourceforge.net/tracker/index.php?func=detail&aid=1014055&group_id=5470&atid=305470)

### 저작권 (Copyright)

이 문서는 공개 도메인(public domain)에 배포되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.