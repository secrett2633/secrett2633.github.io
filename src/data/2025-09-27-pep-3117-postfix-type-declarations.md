---
title: "[Rejected] PEP 3117 - Postfix type declarations"
excerpt: "Python Enhancement Proposal 3117: 'Postfix type declarations'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3117/
toc: true
toc_sticky: true
date: 2025-09-27 14:25:21+0900
last_modified_at: 2025-09-27 14:25:21+0900
published: true
---
> **원문 링크:** [PEP 3117 - Postfix type declarations](https://peps.python.org/pep-3117/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 01-Apr-2007


# PEP 3117 – Postfix type declarations (후위 타입 선언)

## 개요 (Abstract)

이 PEP는 Python에 후위(postfix) 타입 선언 문법을 추가할 것을 제안합니다. 또한, 타입과 선언자(declarator) 사이의 새로운 매핑을 생성하는 데 사용되는 새로운 `typedef` 문(statement)을 명시합니다.

이 제안이 수용되면 Python 사용자 경험을 크게 향상시키고, 다른 프로그래밍 언어 사용자들이 Python으로 전환하는 것을 망설이게 하는 "단점" 중 하나를 제거할 수 있을 것이라고 합니다.

## 도입 배경 (Rationale)

Python은 오랫동안 명시적인 타입 선언(explicit type declarations)의 부재로 어려움을 겪어왔습니다. 이는 Python의 Zen 중 언어가 벗어나는 몇 안 되는 부분 중 하나로, Python 이단자들(heretics)과 PSU 멤버들 사이에서 많은 논쟁을 불러일으켰고, 대규모 엔터프라이즈 성공을 어렵게 만들었습니다.

하지만 이러한 문제를 해결하려면 "파이썬스러운(Pythonic)" 문법을 찾아야 합니다. 타입 선언을 가진 거의 모든 언어에서 타입 선언은 이러한 특성을 결여하고 있습니다. 즉, 장황하고(verbose), 단일 타입을 위해 여러 단어를 필요로 하거나, 이해하기 어렵습니다(예: 특정 언어는 타입 선언에 `dim`과 같이 완전히 관련 없는 형용사를 사용합니다).

따라서 이 PEP는 타입 선언으로의 전환과 함께, Python이 미래에 대비할 뿐만 아니라 미래를 포용한다는 것을 다시 한번 증명할 또 다른 과감한 움직임을 결합합니다. 그것은 바로 유니코드 문자(Unicode characters)를 소스 코드의 필수적인 구성 요소로 도입하는 것입니다.

유니코드는 훨씬 적은 문자로 훨씬 더 많은 것을 표현할 수 있게 해주며, 이는 Python의 Zen인 "가독성이 중요합니다(Readability counts)"에 부합합니다. 또한, 별도의 타입 선언문이 필요 없게 하며, 마지막으로 Perl 6가 이미 연산자에 유니코드를 사용하고 있다는 점을 감안할 때 Python이 Perl 6에 필적하게 만듭니다. [2, cite: 1]

## 명세 (Specification)

타입 선언 모드가 활성화되면, 문법이 변경되어 각 `NAME`은 이름(name)과 타입 선언자(type declarator)의 두 부분으로 구성되어야 하며, 이 타입 선언자는 정확히 하나의 유니코드 문자입니다.

선언자는 이름의 타입을 고유하게 지정하며, 만약 표현식의 왼쪽에 나타나면 이 타입이 강제됩니다. 반환된 타입이 선언된 타입과 일치하지 않으면 `InquisitionError` 예외가 발생합니다. [3, cite: 1]

또한, 함수 호출 결과 타입도 지정해야 합니다. 호출 결과가 선언된 타입과 다르면 `InquisitionError`가 발생합니다. 주의: 결과에 대한 선언자를 함수 객체에 대한 선언자와 혼동해서는 안 됩니다(아래 예시 참조).

읽기만 하고 할당되지 않는 이름 뒤의 타입 선언자는 엄격하게 필요하지는 않지만, 어쨌든 강제됩니다(Python Zen: "명시적인 것이 암시적인 것보다 좋습니다(Explicit is better than implicit)").

타입과 선언자 간의 매핑은 고정되어 있지 않습니다. 프로그래머가 완전히 사용자 정의할 수 있지만, 편의를 위해 일부 내장 타입에 대한 미리 정의된 매핑이 있습니다.

| 타입 (Type) | 선언자 (Declarator) | 설명 (Description) |
|---|---|---|
| `object` | `�` | REPLACEMENT CHARACTER |
| `int` | `ℕ` | DOUBLE-STRUCK CAPITAL N |
| `float` | `℮` | ESTIMATED SYMBOL |
| `bool` | `✓` | CHECK MARK |
| `complex` | `ℂ` | DOUBLE-STRUCK CAPITAL C |
| `str` | `✎` | LOWER RIGHT PENCIL |
| `unicode` | `✒` | BLACK NIB |
| `tuple` | `⒯` | PARENTHESIZED LATIN SMALL LETTER T |
| `list` | `♨` | HOT SPRINGS |
| `dict` | `⧟` | DOUBLE-ENDED MULTIMAP |
| `set` | `∅` | EMPTY SET (전체 집합에도 사용) |
| `frozenset` | `☃` | SNOWMAN |
| `datetime` | `⌚` | WATCH |
| `function` | `ƛ` | LATIN SMALL LETTER LAMBDA WITH STROKE |
| `generator` | `⚛` | ATOM SYMBOL |
| `Exception` | `⌁` | ELECTRIC ARROW |
| `None` | (zero-width space) | (폭이 0인 공백) |

이러한 문자들은 모든 프로그래머에게 명확하고 기억하기 쉬우며 입력하기 쉬울 것이라고 언급됩니다.

### 유니코드 대체 단위 (Unicode replacement units)

현대적이고 글로벌화된 세상에서도 여전히 소스 코드에 유니코드를 사용하지 않거나 사용하고 싶지 않은 구식 반항아들이 있으며, Python은 관용적인 언어이므로, 이러한 사람들을 위한 대체(fallback)가 제공됩니다.

단일 유니코드 문자 대신, `name${UNICODE NAME OF THE DECLARATOR}$`를 입력할 수 있습니다. 예를 들어, 다음 두 함수 정의는 동일합니다.

```python
def fooƛ(xℂ): return None
```

그리고

```python
def foo${LATIN SMALL LETTER LAMBDA WITH STROKE}$(x${DOUBLE-STRUCK CAPITAL C}$): return None${ZERO WIDTH NO-BREAK SPACE}$
```

이는 여전히 읽기 쉬우며, 타입 주석(type-annotated)이 적용된 Python의 모든 기능을 ASCII 신봉자들에게도 제공합니다.

## `typedef` 문 (The typedef statement)

타입과 선언자 간의 매핑은 이 새로운 문을 통해 확장될 수 있습니다.

구문은 다음과 같습니다.

```
typedef_stmt ::= "typedef" expr DECLARATOR
```

여기서 `expr`은 타입 객체로 해석됩니다. 편의를 위해 `typedef` 문은 새 클래스의 `class` 문과도 혼합하여 사용할 수 있습니다.

```python
typedef class Foo☺(object�): pass
```

## 예시 (Example)

다음은 표준 `os.path.normpath` 함수를 타입 선언 문법으로 변환한 것입니다.

```python
def normpathƛ(path✎)✎:
    """Normalize path, eliminating double slashes, etc."""
    if path✎ == '':
        return '.'
    initial_slashes✓ = path✎.startswithƛ('/')✓ # POSIX allows one or two initial slashes, but treats three or more
                                                # as single slash.
    if (initial_slashes✓ and path✎.startswithƛ('//')✓ and not path✎.startswithƛ('///')✓)✓:
        initial_slashesℕ = 2
    comps♨ = path✎.splitƛ('/')♨
    new_comps♨ = []♨
    for comp✎ in comps♨:
        if comp✎ in ('', '.')⒯:
            continue
        if (comp✎ != '..' or (not initial_slashesℕ and not new_comps♨)✓ or
                (new_comps♨ and new_comps♨[-1]✎ == '..')✓)✓:
            new_comps♨.appendƛ(comp✎)
        elif new_comps♨:
            new_comps♨.popƛ()✎
    comps♨ = new_comps♨
    path✎ = '/'.join(comps♨)✎
    if initial_slashesℕ:
        path✎ = '/'*initial_slashesℕ + path✎
    return path✎ or '.'
```

보시다시피, 타입 선언은 표현력을 더하면서 동시에 코드를 훨씬 더 전문적으로 보이게 합니다.

## 호환성 문제 (Compatibility issues)

타입 선언 모드를 활성화하려면 다음을 작성해야 합니다.

```python
from __future__ import type_declarations
```

이는 소스의 유니코드 파싱을 활성화하고 [4, cite: 1], `typedef`를 키워드로 만들며 모든 할당 및 함수 호출에 대해 올바른 타입을 강제합니다.

## 최종 결정 (Rejection)

신중한 고려, 많은 자기 성찰, 고뇌 끝에 이 PEP는 최종적으로 **거부(Rejected)** 되었습니다.

## 참고 자료 (References)

*   [EX1] https://mail.python.org/pipermail/python-list/2003-June/210588.html
*   [EX2] https://mail.python.org/pipermail/python-list/2000-May/034685.html
*   [EX3] http://groups.google.com/group/comp.lang.python/browse_frm/thread/6ae8c6add913635a/de40d4ffe9bd4304?lnk=gst&q=type+declarations&rnum=6

 질문의 언어를 안다면 그다지 관련 없는 것은 아닐 수 있습니다.
 Perl 6이 있었다면 그랬을 것입니다.
 `TypeError`라는 이름이 이미 사용 중이므로, 이 이름이 명백한 이유로 선택되었습니다.
 코드가 작성된 인코딩은 표준 코딩 쿠키에서 읽어옵니다. `from __future__ import encoding_hell`을 통해 호출되는 자동 감지 메커니즘도 있을 것입니다.

## 감사 (Acknowledgements)

내장 타입에 가장 적합하고 기억하기 쉬운 선언자를 찾는 데 도움을 준 Armin Ronacher, Alexander Schremmer, Marek Kubica에게 깊이 감사드립니다.

또한, 유니코드 표준에 이 모든 유용한 문자를 포함해 준 유니코드 컨소시엄에도 감사드립니다.

## 저작권 (Copyright)

이 문서는 공개 도메인(public domain)에 있습니다.
```
The translation is complete and follows all the specified guidelines.
```# PEP 3117 – Postfix type declarations (후위 타입 선언)

## 개요 (Abstract)

이 PEP는 Python에 후위(postfix) 타입 선언 문법을 추가할 것을 제안합니다. 또한, 타입과 선언자(declarator) 사이의 새로운 매핑을 생성하는 데 사용되는 새로운 `typedef` 문(statement)을 명시합니다.

이 제안이 수용되면 Python 사용자 경험을 크게 향상시키고, 다른 프로그래밍 언어 사용자들이 Python으로 전환하는 것을 망설이게 하는 "단점" 중 하나를 제거할 수 있을 것이라고 합니다.

## 도입 배경 (Rationale)

Python은 오랫동안 명시적인 타입 선언(explicit type declarations)의 부재로 어려움을 겪어왔습니다. 이는 Python의 Zen 중 언어가 벗어나는 몇 안 되는 부분 중 하나로, Python 이단자들(heretics)과 PSU 멤버들 사이에서 많은 논쟁을 불러일으켰고, 대규모 엔터프라이즈 성공을 어렵게 만들었습니다.

하지만 이러한 문제를 해결하려면 "파이썬스러운(Pythonic)" 문법을 찾아야 합니다. 타입 선언을 가진 거의 모든 언어에서 타입 선언은 이러한 특성을 결여하고 있습니다. 즉, 장황하고(verbose), 단일 타입을 위해 여러 단어를 필요로 하거나, 이해하기 어렵습니다(예: 특정 언어는 타입 선언에 `dim`과 같이 완전히 관련 없는 형용사를 사용합니다).

따라서 이 PEP는 타입 선언으로의 전환과 함께, Python이 미래에 대비할 뿐만 아니라 미래를 포용한다는 것을 다시 한번 증명할 또 다른 과감한 움직임을 결합합니다. 그것은 바로 유니코드 문자(Unicode characters)를 소스 코드의 필수적인 구성 요소로 도입하는 것입니다.

유니코드는 훨씬 적은 문자로 훨씬 더 많은 것을 표현할 수 있게 해주며, 이는 Python의 Zen인 "가독성이 중요합니다(Readability counts)"에 부합합니다. 또한, 별도의 타입 선언문이 필요 없게 하며, 마지막으로 Perl 6가 이미 연산자에 유니코드를 사용하고 있다는 점을 감안할 때 Python이 Perl 6에 필적하게 만듭니다. [2, cite: 1]

## 명세 (Specification)

타입 선언 모드가 활성화되면, 문법이 변경되어 각 `NAME`은 이름(name)과 타입 선언자(type declarator)의 두 부분으로 구성되어야 하며, 이 타입 선언자는 정확히 하나의 유니코드 문자입니다.

선언자는 이름의 타입을 고유하게 지정하며, 만약 표현식의 왼쪽에 나타나면 이 타입이 강제됩니다. 반환된 타입이 선언된 타입과 일치하지 않으면 `InquisitionError` 예외가 발생합니다. [3, cite: 1]

또한, 함수 호출 결과 타입도 지정해야 합니다. 호출 결과가 선언된 타입과 다르면 `InquisitionError`가 발생합니다. 주의: 결과에 대한 선언자를 함수 객체에 대한 선언자와 혼동해서는 안 됩니다(아래 예시 참조).

읽기만 하고 할당되지 않는 이름 뒤의 타입 선언자는 엄격하게 필요하지는 않지만, 어쨌든 강제됩니다(Python Zen: "명시적인 것이 암시적인 것보다 좋습니다(Explicit is better than implicit)").

타입과 선언자 간의 매핑은 고정되어 있지 않습니다. 프로그래머가 완전히 사용자 정의할 수 있지만, 편의를 위해 일부 내장 타입에 대한 미리 정의된 매핑이 있습니다.

| 타입 (Type) | 선언자 (Declarator) | 설명 (Description) |
|---|---|---|
| `object` | `�` | REPLACEMENT CHARACTER |
| `int` | `ℕ` | DOUBLE-STRUCK CAPITAL N |
| `float` | `℮` | ESTIMATED SYMBOL |
| `bool` | `✓` | CHECK MARK |
| `complex` | `ℂ` | DOUBLE-STRUCK CAPITAL C |
| `str` | `✎` | LOWER RIGHT PENCIL |
| `unicode` | `✒` | BLACK NIB |
| `tuple` | `⒯` | PARENTHESIZED LATIN SMALL LETTER T |
| `list` | `♨` | HOT SPRINGS |
| `dict` | `⧟` | DOUBLE-ENDED MULTIMAP |
| `set` | `∅` | EMPTY SET (전체 집합에도 사용) |
| `frozenset` | `☃` | SNOWMAN |
| `datetime` | `⌚` | WATCH |
| `function` | `ƛ` | LATIN SMALL LETTER LAMBDA WITH STROKE |
| `generator` | `⚛` | ATOM SYMBOL |
| `Exception` | `⌁` | ELECTRIC ARROW |
| `None` | (zero-width space) | (폭이 0인 공백) |

이러한 문자들은 모든 프로그래머에게 명확하고 기억하기 쉬우며 입력하기 쉬울 것이라고 언급됩니다.

### 유니코드 대체 단위 (Unicode replacement units)

현대적이고 글로벌화된 세상에서도 여전히 소스 코드에 유니코드를 사용하지 않거나 사용하고 싶지 않은 구식 반항아들이 있으며, Python은 관용적인 언어이므로, 이러한 사람들을 위한 대체(fallback)가 제공됩니다.

단일 유니코드 문자 대신, `name${UNICODE NAME OF THE DECLARATOR}$`를 입력할 수 있습니다. 예를 들어, 다음 두 함수 정의는 동일합니다.

```python
def fooƛ(xℂ): return None
```

그리고

```python
def foo${LATIN SMALL LETTER LAMBDA WITH STROKE}$(x${DOUBLE-STRUCK CAPITAL C}$): return None${ZERO WIDTH NO-BREAK SPACE}$
```

이는 여전히 읽기 쉬우며, 타입 주석(type-annotated)이 적용된 Python의 모든 기능을 ASCII 신봉자들에게도 제공합니다.

## `typedef` 문 (The typedef statement)

타입과 선언자 간의 매핑은 이 새로운 문을 통해 확장될 수 있습니다.

구문은 다음과 같습니다.

```
typedef_stmt ::= "typedef" expr DECLARATOR
```

여기서 `expr`은 타입 객체로 해석됩니다. 편의를 위해 `typedef` 문은 새 클래스의 `class` 문과도 혼합하여 사용할 수 있습니다.

```python
typedef class Foo☺(object�): pass
```

## 예시 (Example)

다음은 표준 `os.path.normpath` 함수를 타입 선언 문법으로 변환한 것입니다.

```python
def normpathƛ(path✎)✎:
    """Normalize path, eliminating double slashes, etc."""
    if path✎ == '':
        return '.'
    initial_slashes✓ = path✎.startswithƛ('/')✓ # POSIX allows one or two initial slashes, but treats three or more
                                                # as single slash.
    if (initial_slashes✓ and path✎.startswithƛ('//')✓ and not path✎.startswithƛ('///')✓)✓:
        initial_slashesℕ = 2
    comps♨ = path✎.splitƛ('/')♨
    new_comps♨ = []♨
    for comp✎ in comps♨:
        if comp✎ in ('', '.')⒯:
            continue
        if (comp✎ != '..' or (not initial_slashesℕ and not new_comps♨)✓ or
                (new_comps♨ and new_comps♨[-1]✎ == '..')✓)✓:
            new_comps♨.appendƛ(comp✎)
        elif new_comps♨:
            new_comps♨.popƛ()✎
    comps♨ = new_comps♨
    path✎ = '/'.join(comps♨)✎
    if initial_slashesℕ:
        path✎ = '/'*initial_slashesℕ + path✎
    return path✎ or '.'
```

보시다시피, 타입 선언은 표현력을 더하면서 동시에 코드를 훨씬 더 전문적으로 보이게 합니다.

## 호환성 문제 (Compatibility issues)

타입 선언 모드를 활성화하려면 다음을 작성해야 합니다.

```python
from __future__ import type_declarations
```

이는 소스의 유니코드 파싱을 활성화하고 [4, cite: 1], `typedef`를 키워드로 만들며 모든 할당 및 함수 호출에 대해 올바른 타입을 강제합니다.

## 최종 결정 (Rejection)

신중한 고려, 많은 자기 성찰, 고뇌 끝에 이 PEP는 최종적으로 **거부(Rejected)** 되었습니다.

## 참고 자료 (References)

*   [EX1] https://mail.python.org/pipermail/python-list/2003-June/210588.html
*   [EX2] https://mail.python.org/pipermail/python-list/2000-May/034685.html
*   [EX3] http://groups.google.com/group/comp.lang.python/browse_frm/thread/6ae8c6add913635a/de40d4ffe9bd4304?lnk=gst&q=type+declarations&rnum=6

 질문의 언어를 안다면 그다지 관련 없는 것은 아닐 수 있습니다.
 Perl 6이 있었다면 그랬을 것입니다.
 `TypeError`라는 이름이 이미 사용 중이므로, 이 이름이 명백한 이유로 선택되었습니다.
 코드가 작성된 인코딩은 표준 코딩 쿠키에서 읽어옵니다. `from __future__ import encoding_hell`을 통해 호출되는 자동 감지 메커니즘도 있을 것입니다.

## 감사 (Acknowledgements)

내장 타입에 가장 적합하고 기억하기 쉬운 선언자를 찾는 데 도움을 준 Armin Ronacher, Alexander Schremmer, Marek Kubica에게 깊이 감사드립니다.

또한, 유니코드 표준에 이 모든 유용한 문자를 포함해 준 유니코드 컨소시엄에도 감사드립니다.

## 저작권 (Copyright)

이 문서는 공개 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.