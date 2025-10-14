---
title: "[Final] PEP 3099 - Things that will Not Change in Python 3000"
excerpt: "Python Enhancement Proposal 3099: 'Things that will Not Change in Python 3000'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3099/
toc: true
toc_sticky: true
date: 2025-09-27 14:12:36+0900
last_modified_at: 2025-09-27 14:12:36+0900
published: true
---
> **원문 링크:** [PEP 3099 - Things that will Not Change in Python 3000](https://peps.python.org/pep-3099/)
>
> **상태:** Final | **유형:** Process | **작성일:** 04-Apr-2006


# PEP 3099 – Python 3000에서 변경되지 않을 것들

*   **작성자:** Georg Brandl
*   **상태:** Final
*   **유형:** Process
*   **생성일:** 2006년 4월 4일

## 개요 (Abstract)

몇몇 아이디어는 단순히 좋지 않습니다. Python의 진화에 대한 일부 의견은 건설적이지만, 어떤 의견은 Python의 기본적인 원칙에 너무나도 심각하게 위배되어 마치 누군가에게 원을 그리며 달리라고 요청하는 것과 같습니다. 이는 아무런 진전도 가져오지 못하며, 특별한 제안들이 허용되는 Python 3000에서조차 마찬가지입니다. 이 PEP는 Python 3000에서 발생하지 않을 변경 사항들과 도입되지 않을 새로운 기능들에 대한 BDFL(자비로운 종신 독재자, Guido van Rossum)의 선언들을 주제별로 나열하고, 간략한 설명 또는 python-3000 메일링 리스트의 관련 스레드(thread)를 참조로 제공합니다.

만약 여기에 나열된 아이디어 중 하나를 제안할 생각이 있다면, 컴퓨터에서 잠시 떨어져 밖으로 나가 즐거운 시간을 보내는 것이 더 나을 것입니다. 좋은 잔디밭에서 낮잠을 자는 등 야외 활동을 하는 것이, 이미 죽은 아이디어를 다시 꺼내어 사람들이 그 아이디어가 얼마나 죽었는지 알려주는 것보다 훨씬 생산적입니다. 경고한 것으로 간주하십시오.

## 핵심 언어 (Core Language)

### 대소문자 구분 (Case-insensitivity) 없음

Python 3000은 대소문자를 구분하지 않게 되지 않을 것입니다.

### 재작성 (Rewrite from scratch) 없음

Python 3000은 처음부터 다시 작성되지 않을 것입니다. 또한, 구현 언어로 C++나 C 외의 다른 언어를 사용하지 않을 것입니다. 대신, 코드베이스는 점진적인 변화(transmogrification)를 겪을 것입니다. 이에 대한 Joel Spolsky의 훌륭한 에세이(`http://www.joelonsoftware.com/articles/fog0000000069.html`)가 있습니다.

### `self`는 암시적으로 처리되지 않음

`self`를 명시적으로 사용하는 것은 좋은 일입니다. 이는 변수가 어떻게 해석되는지에 대한 모호성을 제거하여 코드를 명확하게 만듭니다. 또한 함수(function)와 메서드(method)의 차이를 작게 만듭니다.
*   **관련 스레드:** "Draft proposal: Implicit self in Python 3.0"

### `lambda` 이름 변경 없음

한때 `lambda`는 Python 3000에서 제거될 예정이었습니다. 하지만 불행히도 익명 함수(anonymous functions)를 제공하는 더 나은 방법을 아무도 제안할 수 없었고, 따라서 `lambda`는 계속 유지됩니다.

하지만 `lambda`는 현재 상태 그대로 유지됩니다. 문장(statements) 지원을 추가하는 것은 시작조차 할 수 없는 일입니다. 이는 다중 라인 `lambda` 표현식을 허용해야 하는데, 이는 갑자기 다중 라인 표현식이 존재할 수 있음을 의미합니다. 예를 들어, 함수 호출에 대한 다중 라인 인수가 가능해질 것입니다. 이는 단순히 보기 좋지 않습니다.
*   **관련 스레드:** "genexp syntax / lambda"

### 프로그래밍 가능한 구문 (Programmable Syntax) 없음

Python은 프로그래밍 가능한 구문을 갖지 않을 것입니다.
*   **관련 스레드:** "It's a statement! It's a function! It's BOTH!"

### `zip()` 스타일 병렬 반복(Parallel Iteration) 구문 없음

`zip()` 스타일의 병렬 반복을 위한 구문은 없을 것입니다.
*   **관련 스레드:** "Parallel iteration syntax"

### 문자열은 계속 이터러블(Iterable)임

문자열(strings)은 계속해서 이터러블(iterable) 상태를 유지할 것입니다.
*   **관련 스레드:** "Making strings non-iterable"

### 제너레이터 표현식/리스트 컴프리헨션(Generator Expression/List Comprehension) 결과 정렬 구문 없음

제너레이터 표현식(generator expression)이나 리스트 컴프리헨션(list comprehension)의 결과를 정렬하는 구문은 없을 것입니다. `sorted()` 함수가 모든 사용 사례를 커버합니다.
*   **관련 스레드:** "Adding sorting to generator comprehension"

### 슬라이스(Slices) 및 확장 슬라이스(Extended Slices)는 유지

슬라이스(slices) 및 확장 슬라이스(extended slices)는 사라지지 않을 것입니다 (비록 `__getslice__` 및 `__setslice__` API가 대체될 수 있더라도). 또한, 표준 객체 유형에 대해 뷰(views)를 반환하지 않을 것입니다.
*   **관련 스레드:** "Future of slices"

### 루프 변수(Loop Variable) 재사용 금지 없음

루프(loop) 내부에서 루프 변수(loop variable)를 재사용하는 것이 금지되지 않을 것입니다.
*   **관련 스레드:** "elimination of scope bleeding of iteration variables"

### LL(1)보다 복잡한 파서(Parser) 없음

파서(parser)는 LL(1)보다 복잡해지지 않을 것입니다. 단순한 것이 복잡한 것보다 낫습니다. 이 아이디어는 파서에도 적용됩니다. Python의 문법을 LL(1) 파서로 제한하는 것은 저주가 아니라 축복입니다. 이는 우리가 과도하게 나아가서, 이름은 언급하지 않겠지만 Perl과 같은 다른 동적 언어들처럼 기괴한 문법 규칙으로 끝나지 않도록 해주는 수갑과 같습니다.

### 중괄호(Braces) 없음

이는 너무나 명백하여 메일링 리스트에 대한 참조가 필요 없습니다. 이 주제에 대한 확정적인 답변을 얻으려면 `from __future__ import braces`를 실행해 보십시오.

### 백틱(Backticks) 더 이상 사용 안 함

백틱(`` ` ``)은 `repr`의 축약형으로 더 이상 사용되지 않을 것입니다. 하지만 그렇다고 해서 다른 용도로 사용 가능해진다는 의미는 아닙니다. 하위 호환성 혼란을 무시하더라도, 문자 자체에 너무 많은 문제(일부 폰트, 일부 키보드, 책 조판 시 등)가 발생합니다.
*   **관련 스레드:** "new operators via backquoting"

### 전역 이름(Global Name) 참조 방식 변경 없음

전역 이름 `foo`를 참조하는 방식이 `globals.foo`로 변경되지 않을 것입니다. `global` 문(statement)은 유지될 것입니다.
*   **관련 스레드:** "replace globals() and global statement with global builtin object", "Explicit Lexical Scoping (pre-PEP?)"

### 대체 바인딩 연산자(Alternative Binding Operators) 없음

`:=`와 같은 대체 바인딩 연산자는 없을 것입니다.
*   **관련 스레드:** "Explicit Lexical Scoping (pre-PEP?)"

### 컨테이너 리터럴(Container Literals) 제거 없음

컨테이너 리터럴(container literals)은 제거되지 않을 것입니다. 즉, `{expr: expr, …}`, `[expr, …]`, `(expr, …)`는 유지됩니다.
*   **관련 스레드:** "No Container Literals"

### `while` 및 `for` 루프의 `else` 절 의미론 변경 없음

`while` 및 `for` 루프의 `else` 절의 의미론(semantics)은 변경되지 않거나 제거되지 않을 것입니다.
*   **관련 스레드:** "for/except/else syntax"

## 내장 함수 (Builtins)

### `zip()` 함수의 키워드 인수(Keyword Arguments) 확장 없음

`zip()` 함수는 가장 짧은 시퀀스(sequence)의 끝에서 멈추는 것을 막기 위한 키워드 인수나 다른 메커니즘을 갖지 않을 것입니다.
*   **관련 스레드:** "have zip() raise exception for sequences of different lengths"

### `hash()`가 속성(Attribute)이 되지 않음

`hash()`는 속성이 되지 않을 것입니다. 속성은 계산 비용이 저렴해야 하는데, 해시(hash)는 반드시 그렇지는 않기 때문입니다.
*   **관련 스레드:** "hash as attribute/property"

## 표준 타입 (Standard Types)

### 딕셔너리(Dictionary) 반복(Iteration)은 계속 키(Keys)를 반환

딕셔너리(dictionary)를 반복(iterate)할 때 계속해서 키(keys)를 반환할 것입니다.
*   **관련 스레드:** "Iterating over a dict", "have iter(mapping) generate (key, value) pairs"

### `frozenlist` 타입 없음

`frozenlist` 타입은 없을 것입니다.
*   **관련 스레드:** "Immutable lists"

### `int` 타입은 범위(Range)를 반환하는 서브스크립트(Subscripts)를 지원하지 않음

`int` 타입은 범위를 반환하는 서브스크립트(subscripts)를 지원하지 않을 것입니다.
*   **관련 스레드:** "xrange vs. int.__getslice__"

## 코딩 스타일 (Coding Style)

### 최대 라인 너비(Maximum Line Width) 80자 유지

(권장되는) 최대 라인 너비는 C 및 Python 코드 모두 80자로 유지될 것입니다.
*   **관련 스레드:** "C style guide"

## 대화형 인터프리터 (Interactive Interpreter)

### 인터프리터 프롬프트(Prompt) `>>>` 변경 없음

인터프리터 프롬프트( `>>>` )는 변경되지 않을 것입니다. 이는 귀도(Guido)에게 따뜻하고 포근한 느낌을 줍니다.
*   **관련 스레드:** "Low-hanging fruit: change interpreter prompt?"

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.