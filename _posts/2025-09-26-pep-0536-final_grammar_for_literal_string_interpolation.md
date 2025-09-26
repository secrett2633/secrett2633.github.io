---
title: "[Withdrawn] PEP 536 - Final Grammar for Literal String Interpolation"
excerpt: "Python Enhancement Proposal 536: 'Final Grammar for Literal String Interpolation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/536/
toc: true
toc_sticky: true
date: 2025-09-26 23:26:52+0900
last_modified_at: 2025-09-26 23:26:52+0900
published: true
---
> **원문 링크:** [PEP 536 - Final Grammar for Literal String Interpolation](https://peps.python.org/pep-0536/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 11-Dec-2016

# PEP 536 – 리터럴 문자열 보간법(Literal String Interpolation)을 위한 최종 문법

**작성자:** Philipp Angerer
**상태:** 철회됨 (Withdrawn)
**유형:** 표준 트랙 (Standards Track)
**생성일:** 2016년 12월 11일
**Python 버전:** 3.7
**이력:** 2016년 8월 18일, 2016년 12월 23일, 2019년 3월 15일
**해결:** Discourse 메시지

---

## 요약 (Abstract)

PEP 498은 Literal String Interpolation (또는 "f-strings")을 도입했습니다. 그러나 이러한 리터럴의 표현식 부분에는 특정 제약이 있었습니다. 이 PEP는 이러한 제약을 해제하고 "f-strings"를 "f expressions" 또는 "f-literals"로 격상시키는 공식 문법을 제안합니다.

이 PEP는 PEP 498에 의해 도입된 f-strings를 확장하므로, 이 문서를 이해하려면 PEP 498에 대한 지식이 필요합니다.

## PEP 철회 (PEP Withdrawal)

이 PEP는 PEP 701을 지지하며 철회되었습니다. PEP 701은 이 PEP의 모든 중요한 내용을 다루고 있습니다.

## 용어 (Terminology)

이 문서에서는 기존 문법을 "f-strings"로, 제안된 문법을 "f-literals"로 지칭합니다.

또한, f-literals/f-strings 내의 `{}`로 구분된 표현식을 "expression portions" (표현식 부분)으로, 주변의 정적 문자열 내용을 "string portions" (문자열 부분)으로 지칭합니다.

## 동기 (Motivation)

CPython에서 f-strings의 현재 구현은 기존 문자열 파싱 메커니즘과 토큰의 후처리(post processing)에 의존합니다. 이로 인해 f-strings 내에서 사용할 수 있는 표현식에 여러 가지 제약이 발생합니다:

*   f-string을 구분하는 인용 부호(quote character)를 표현식 부분 내에서 사용하는 것이 불가능합니다:
    ```python
    >>> f'Magic wand: { bag['wand'] }'
    ^ SyntaxError: invalid syntax
    ```
*   이전에는 이를 해결하는 방법으로 실행 코드 내에서 이스케이프 시퀀스(escape sequences)를 사용하는 것이 고려되었으나, f-strings에서는 금지됩니다:
    ```python
    >>> f'Magic wand { bag[\'wand\'] } string'
    SyntaxError: f-string expression portion cannot include a backslash
    ```
*   여러 줄 f-strings에서도 주석이 금지됩니다:
    ```python
    >>> f'''A complex trick: {
    ... bag['bag'] # recursive bags!
    ... }'''
    SyntaxError: f-string expression part cannot include '#'
    ```
*   표현식 부분은 `:`와 `!`를 중괄호로 감싸야 합니다:
    ```python
    >>> f'Useless use of lambdas: { lambda x: x*2 }'
    SyntaxError: unexpected EOF while parsing
    ```
이러한 제약은 언어 사용자 관점에서 특별한 목적이 없으며, 예외 없는 정규 문법으로 f-literals를 제공하고 전용 파싱 코드를 사용하여 구현함으로써 해제될 수 있습니다.

## 근거 (Rationale)

Motivation 섹션에서 언급된 제약들은 사용자가 f-literals의 구현 세부 사항에 익숙하지 않으면 명확하지 않고 직관적이지 않습니다.

앞서 언급했듯이, PEP 498의 이전 버전에서는 이스케이프 시퀀스를 f-strings의 어느 곳에서든 허용했습니다. 이는 표현식 부분을 구분하는 중괄호를 인코딩하거나 코드 내에서도 사용될 수 있었습니다. 이스케이프 시퀀스는 코드가 파싱되기 전에 확장되었는데, 이는 여러 가지 중요한 영향을 미쳤을 것입니다:

1.  어느 부분이 표현식이고 어느 부분이 문자열인지 사람이 읽기에는 명확하지 않았을 것입니다. 이는 "난독화/교묘한 Python 챌린지"를 위한 좋은 소재였을 것입니다.
2.  구문 하이라이터(syntax highlighters)는 중첩된 문법을 파싱하는 데 능숙하지만, 이스케이프 시퀀스를 인식하는 데는 그렇지 않습니다. ECMAScript 2016 (JavaScript)은 식별자(identifiers)에 이스케이프 시퀀스를 허용하지만, 저자는 이를 올바르게 하이라이트할 수 있는 구문 하이라이터를 알지 못합니다.

결과적으로, 구문 하이라이팅의 도움을 받든 안 받든 표현식 부분을 인식하기가 더 어려웠을 것입니다. 새로운 문법을 사용하면 구문 하이라이터를 확장하여 f-literals를 올바르게 파싱하고 표시하기 쉽습니다:

```python
f'Magic wand: {bag['wand']:^10}'
```

이스케이프 시퀀스가 포함될 수 있는 표현식 부분을 하이라이트한다는 것은, 키워드, 구분자(delimiters) 및 기타 모든 언어 구문에서 이스케이프 시퀀스의 가능성을 고려하여 전체 표현식 문법의 모든 규칙을 수정된 사본으로 생성해야 함을 의미합니다. 이러한 한 번의 복제는 한 단계의 이스케이프 깊이(escaping depth)를 제공하며, 재귀적인 f-literal에서 더 깊은 이스케이프를 위해 반복되어야 할 것입니다. 이는 저자가 아는 어떤 하이라이팅 엔진도 특정 컨텍스트에 규칙을 적용하기 전에 이스케이프 시퀀스를 확장하는 것을 지원하지 않기 때문입니다. 그러나 컨텍스트 중첩은 모든 하이라이팅 엔진의 표준 기능입니다.

친숙함(Familiarity) 또한 한몫합니다: 단순히 변수 이름이 아닌 표현식을 사용하는 문자열 삽입(string interpolation) 방식을 사용하는 다른 모든 언어에서는 이스케이프 시퀀스 확장 없이 표현식의 임의 중첩이 가능합니다.

## 명세 (Specification)

PEP 498은 f-strings를 다음과 같이 명세했지만, 이에 대한 제약을 두었습니다:

```
f ' <text> { <expression> <optional !s, !r, or !a> <optional : format specifier> } <text> ... '
```

이 PEP에서 언급된 모든 제약은 아래 설명과 같이 f-literals에서 해제됩니다:

*   **표현식 부분은 이제 f-literal을 구분하는 것과 동일한 종류의 인용 부호로 구분된 문자열을 포함할 수 있습니다.**
*   **백슬래시(`\`)는 이제 Python 코드의 다른 곳에서와 마찬가지로 표현식 내에 나타날 수 있습니다.** f-literals 내에 중첩된 문자열의 경우, 가장 안쪽 문자열이 평가될 때 이스케이프 시퀀스가 확장됩니다.
*   **`#` 문자를 사용하는 주석은 여러 줄 f-literals에서만 가능합니다.** 주석은 줄 끝에서 종료되므로 (이는 한 줄 f-literal을 닫는 것을 불가능하게 만듭니다).
*   **표현식 부분은 구문적으로 유효한 곳이라면 어디든 `:` 또는 `!`를 포함할 수 있습니다.** 표현식의 일부가 아닌 첫 번째 `:` 또는 `!`는 유효한 강제 변환(coercion) 또는 포맷 지정자(format specifier)가 뒤따라야 합니다.

PEP 498에서 명시적으로 언급되지 않은 남아있는 제약 사항은 표현식 부분의 줄 바꿈(line breaks)입니다. 단일 `'` 또는 `"` 문자로 구분된 문자열은 한 줄이어야 하므로, 한 줄 문자열의 표현식 부분에서는 줄 바꿈이 여전히 허용되지 않습니다.

*참고:* 제약 해제만으로 충분할까요, 아니면 더 완전한 문법을 명세해야 할까요?

## 하위 호환성 (Backwards Compatibility)

f-literals는 f-strings와 완전히 하위 호환되며, 유효하다고 간주되는 구문을 확장합니다.

## 참조 구현 (Reference Implementation)

미정 (TBD)

## 참고 자료 (References)

 ECMAScript IdentifierName specification ( http://ecma-international.org/ecma-262/6.0/#sec-names-and-keywords )
    Yes, `const cthulhu = { H̹̙̦̮͉̩̗̗ͧ̇̏̊̾Eͨ͆͒̆ͮ̃͏̷̮̣̫̤̣Cͯ̂͐͏̨̛͔̦̟͈̻O̜͎͍͙͚̬̝̣̽ͮ͐͗̀ͤ̍̀͢M̴̡̲̭͍͇̼̟̯̦̉̒͠Ḛ̛̙̞̪̗ͥͤͩ̾͑̔͐ͅṮ̴̷̷̗̼͍̿̿̓̽͐H̙̙̔̄͜\u0042: 42 }` is valid ECMAScript 2016.
 Wikipedia article on string interpolation ( https://en.wikipedia.org/wiki/String_interpolation )

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.