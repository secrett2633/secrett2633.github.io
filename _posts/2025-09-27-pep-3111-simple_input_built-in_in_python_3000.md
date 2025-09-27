---
title: "[Final] PEP 3111 - Simple input built-in in Python 3000"
excerpt: "Python Enhancement Proposal 3111: 'Simple input built-in in Python 3000'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3111/
toc: true
toc_sticky: true
date: 2025-09-27 14:21:32+0900
last_modified_at: 2025-09-27 14:21:32+0900
published: true
---
> **원문 링크:** [PEP 3111 - Simple input built-in in Python 3000](https://peps.python.org/pep-3111/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 13-Sep-2006


# PEP 3111: Python 3000의 단순 `input` 내장 함수

*   **작성자:** Andre Roberge
*   **상태:** Final
*   **유형:** Standards Track
*   **생성일:** 2006년 9월 13일
*   **Python 버전:** 3.0
*   **최종 수락:** 2006년 12월 (BDFL에 의해 수락됨)

## 개요 (Abstract)

입력(Input)과 출력(Output)은 컴퓨터 프로그램의 핵심 기능입니다. 현재 Python은 `print` 키워드를 통한 단순 출력과 `input()` 및 `raw_input()` 내장 함수를 통한 두 가지 방식의 대화형 입력(interactive input)을 제공합니다.

Python 3.0은 이전 Python 버전과 호환되지 않는 다양한 변경 사항을 도입할 예정입니다 (PEP 3100). 제안된 변경 사항 중, `print`는 `print()`라는 내장 함수가 되며, `input()`과 `raw_input()`은 내장 네임스페이스(built-in namespace)에서 완전히 제거되어 가장 기본적인 입력 기능조차 모듈을 임포트(import)해야만 사용할 수 있게 됩니다.

이 PEP는 Python 3.0이 `raw_input()`과 동등한 단순 대화형 사용자 입력 기능을 내장 네임스페이스에 유지할 것을 제안합니다. 이 제안은 2006년 12월 BDFL(Benevolent Dictator for Life, 즉 Guido van Rossum)에 의해 수락되었습니다.

## 동기 (Motivation)

쉬운 가독성과 다양한 프로그래밍 스타일(예: 절차적, 객체 지향 등) 지원을 통해 Python은 입문 프로그래밍 수업에서 사용하기에 가장 좋은 컴퓨터 언어 중 하나입니다. 단순한 프로그램도 종종 사용자에게 정보를 제공(출력)하고 사용자로부터 정보를 얻어야(대화형 입력) 합니다. 교육 환경에서 사용될 의도가 있는 모든 컴퓨터 언어는 출력과 대화형 입력 모두에 대해 직관적인(straightforward) 방법을 제공해야 합니다.

Python 3.0에 대한 현재 제안에는 `print()`라는 내장 함수를 통한 단순 출력 경로가 포함되어 있지만, 입력의 경우 `sys.stdin.readline()`과 같이 외부 모듈을 임포트해야 하는 더 복잡한 방식이 필요했습니다. 현재 버전의 Python (3.0 이전)에는 `raw_input()`이 내장 함수로 포함되어 있습니다. 이러한 함수가 제공됨으로써, 단순 입/출력이 필요한 프로그램은 모듈 임포트, 스트림(streams) 등에 대한 논의 없이도 첫날부터 작성될 수 있습니다.

## 근거 (Rationale)

`input()` 및 `raw_input()`과 같은 현재의 내장 함수들은 전통적인 교육 환경에서 매우 유용하게 사용되는 것으로 나타났습니다. (자세한 내용은와 그에 따른 논의를 참조하십시오). BDFL은 `input()`이 Python 3000에 유지되지 않을 것이라고 분명히 밝혔지만, `raw_input()`을 제거하기로 한 결정을 재고하는 것에 반대하지 않는다고도 말했습니다.

`raw_input()`은 사용자에게 질문하고 응답을 얻는 간단한 방법을 제공합니다. Python 3.0에 대한 원래 계획은 다음과 같은 단일 문장을:

```python
name = raw_input("What is your name?")
```

더 복잡한 다음 코드로 대체하도록 요구했을 것입니다:

```python
import sys
print("What is your name?")
name = sys.stdin.readline()
```

그러나 많은 Python 초보자와 교육자의 관점에서 `sys.stdin.readline()`의 사용은 다음과 같은 문제를 야기합니다:

1.  `raw_input`이라는 이름에 비해 `sys.stdin.readline()`이라는 이름은 투박하고 세련되지 못합니다.
2.  `sys`와 `stdin`이라는 이름은 대부분의 초보자에게 의미가 없습니다. 이들은 함수가 무엇을 하는지에 주로 관심이 있으며, 패키지 구조 내 어디에 위치하는지에는 관심이 없습니다. 의미 부족은 기억하기도 어렵게 만듭니다: `sys.stdin.readline()`인가, 아니면 `stdin.sys.readline()`인가? 프로그래밍 초보자에게는 둘 중 하나를 선호할 명확한 이유가 없습니다. 반면, `print`, `input`, `raw_input`, `open`과 같이 단순하고 직접적인 이름의 함수들은 기억하기 더 쉽습니다.
3.  `.` 표기법의 사용은 많은 초보자에게 동기 부여가 되지 않고 혼란을 줍니다. 예를 들어, 일부 초보자는 `.`이 모든 식별자(identifier)에 사용될 수 있는 표준 문자라고 생각하게 될 수도 있습니다.
4.  `print` 함수와의 비대칭성이 있습니다: 왜 `print`는 `sys.stdout.print()`라고 불리지 않는가?

## 명세 (Specification)

기존 `raw_input()` 함수는 `input()`으로 이름이 변경될 것입니다.

Python 2에서 3으로의 변환 도구는 `input()` 호출을 `eval(input())`으로, `raw_input()` 호출을 `input()`으로 대체할 것입니다.

## 명명 논의 (Naming Discussion)

`input()`이 언어에서 효과적으로 제거됨에 따라, `raw_input()`이라는 이름은 훨씬 덜 의미 있게 되고 대안을 고려해야 했습니다. 다양한 포럼에서 언급된 여러 가능성은 다음과 같습니다:

*   `ask()`
*   `ask_user()`
*   `get_string()`
*   `input()` (처음에 BDFL에 의해 거부되었으나, 나중에 수락됨)
*   `prompt()`
*   `read()`
*   `user_input()`
*   `get_response()`

처음에는 BDFL에 의해 거부되었지만, Python 3000에서 `raw_input`의 이름을 `input`으로 변경하는 것이 가장 직접적인 해결책이라는 제안이 있었습니다. 주요 반대는 Python 2.x에 이미 `input`이라는 함수가 존재하고, 비록 Python 3000에는 포함되지 않더라도, 동일한 이름이지만 다른 의미를 가진 내장 함수를 갖는 것이 2.x에서 3000으로 마이그레이션(migrating)하는 프로그래머들을 혼란스럽게 할 수 있다는 것이었습니다. 물론, 이는 초보자에게는 문제가 되지 않으며, `raw_input()`이 많은 사람들에게 인기가 있긴 하지만 보편적으로 사용되는 것은 아니므로, 숙련된 프로그래머에게 미치는 문제의 범위는 불분명합니다. 이 경우, 초보자에게 미치는 좋은 영향이 숙련된 프로그래머에게 미치는 해로운 영향보다 더 크다고 볼 수 있습니다. 비록 오래된 서적이나 튜토리얼을 읽는 사람들에게는 혼란을 야기할 수 있지만 말입니다.

이름 변경을 수락하게 된 근거는에서 찾을 수 있습니다.

## 참조 (References)

*   Python 3000에서 raw_input()의 운명: `https://mail.python.org/pipermail/edu-sig/2006-September/006967.html`
*   Python 3000의 교육적 측면: `https://mail.python.org/pipermail/python-3000/2006-September/003589.html`
*   이름을 직접 변경하기로 한 근거: `https://mail.python.org/pipermail/python-3000/2006-December/005249.html`
*   PEP에 대한 BDFL 수락: `https://mail.python.org/pipermail/python-3000/2006-December/005257.html`

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.