---
title: "[Rejected] PEP 3136 - Labeled break and continue"
excerpt: "Python Enhancement Proposal 3136: 'Labeled break and continue'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3136/
toc: true
toc_sticky: true
date: 2025-09-27 14:34:24+0900
last_modified_at: 2025-09-27 14:34:24+0900
published: true
---
> **원문 링크:** [PEP 3136 - Labeled break and continue](https://peps.python.org/pep-3136/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 30-Jun-2007


# PEP 3136 – Labeled break 및 continue

## 개요 (Abstract)

이 PEP는 Python의 `break` 및 `continue` 문에 레이블(label) 지원을 제안합니다. 이 아이디어는 다른 언어의 레이블이 있는 `break` 및 `continue` 기능과, 저자가 드물지만 지속적으로 이러한 기능의 필요성을 느꼈던 경험에서 영감을 받았습니다.

## 거부 통지 (Rejection Notice)

이 PEP는 거부되었습니다. 관련된 논의는 [https://mail.python.org/pipermail/python-3000/2007-July/008663.html](https://mail.python.org/pipermail/python-3000/2007-July/008663.html)에서 확인할 수 있습니다.

## 서론 (Introduction)

현재 Python에서 `break` 문은 프로그래머가 루프를 조기에 종료할 수 있게 하고, `continue` 문은 루프의 다음 반복으로 조기에 이동할 수 있게 합니다. 이들은 가장 안쪽에 있는(innermost enclosing) 루프에만 적용될 수 있습니다.

`break` 및 `continue` 문에 레이블 지원을 추가하는 것은 기존 동작의 논리적 확장입니다. 레이블이 있는 `break` 및 `continue`는 중첩된 루프(nested loops)를 사용하는 복잡한 코드의 가독성과 유연성을 향상시킬 수 있습니다.

이 PEP의 예시와 논의는 주로 `break` 문을 참조하지만, 모든 예시와 동기는 레이블이 있는 `continue`에도 동일하게 적용됩니다.

## 동기 (Motivation)

프로그래머가 바깥쪽 루프의 다음 반복으로 이동하거나, 여러 루프를 한 번에 종료하려는 경우, 현재 Python에는 몇 가지 "덜 우아한(less-than elegant)" 방법들이 있습니다.

### 현재의 우회 방법 (Current Workarounds)

1.  **플래그 변수 사용:**
    ```python
    for a in a_list:
        time_to_break_out_of_a = False
        # ...
        for b in b_list:
            # ...
            if condition_one(a, b):
                break # 가장 안쪽 루프만 종료
            # ...
            if condition_two(a, b):
                time_to_break_out_of_a = True
                break # 가장 안쪽 루프만 종료
        # ...
        if time_to_break_out_of_a:
            break # 바깥쪽 루프 종료
    ```
    이 방법은 바깥쪽 루프를 종료하기 위해 5줄의 코드와 `time_to_break_out_of_a`라는 추가 변수를 필요로 합니다. 이 5줄은 코드 전반에 걸쳐 분산되어 있어 제어 흐름을 이해하기 어렵게 만듭니다. 또한, `time_to_break_out_of_a` 변수 검사 이전에 코드가 잘못 삽입될 위험이 있어 오류 발생 가능성이 있습니다.

2.  **예외(Exception) 사용:**
    ```python
    class BreakOutOfALoop(Exception):
        pass

    for a in a_list:
        # ...
        try:
            for b in b_list:
                # ...
                if condition_one(a, b):
                    break # 가장 안쪽 루프만 종료
                # ...
                if condition_two(a, b):
                    raise BreakOutOfALoop # 바깥쪽 루프 종료를 위해 예외 발생
        except BreakOutOfALoop:
            break # 예외를 잡아서 바깥쪽 루프 종료
        # ...
    ```
    이 방법은 새로운 단일 목적의 예외 클래스와 5줄의 코드를 필요로 하며, 기본적인 제어 흐름이 여러 줄에 걸쳐 분산됩니다. 가장 안쪽 루프는 `break`로, 바깥쪽 루프는 예외로 종료하는 방식은 우아하지 않습니다.

3.  **이중 `break` 사용 (조건이 저렴할 경우):**
    ```python
    for a in a_list:
        # ...
        for b in b_list:
            # ...
            if condition_one(a, b):
                break
            # ...
            if condition_two(a, b):
                break
        # ...
        if condition_two(a, b): # 조건 재확인
            break
    ```
    이중 `break`는 여전히 우아하지 않으며, `b` 변수가 바깥쪽 루프까지 "누설(bleeds)"되는 것에 의존합니다. 이는 초보자에게는 놀랍고 직관적이지 않으며 좋은 관행으로 간주되지 않을 수 있습니다.

레이블이 있는 `break` 및 `continue`는 이러한 문제들을 해결하여, 제어 흐름을 명확하게 하고, 추가 변수나 예외 없이 여러 루프를 종료할 수 있게 해줍니다.

### 다른 언어의 사례 (Other languages)

*   **Perl** : 루프에 `ALOOP:`와 같은 레이블을 붙이고 `last ALOOP;`를 사용하여 특정 레이블의 루프를 종료합니다. `last`는 Python의 `break`와 동일합니다.
*   **PHP** : `break 1;` 또는 `break 2;`와 같이 숫자를 사용하여 몇 번째 바깥 루프를 종료할지 지정합니다. 여기서 `break 1`은 가장 안쪽 루프를 종료하는 것과 같습니다.
*   **C/C++, Java, Ruby** : 이 언어들도 유사한 구조를 가지고 있습니다.

이러한 언어의 방식은 제어 흐름이 `break` 문 하나에 완전히 캡슐화되어 있어 이해하기 쉽습니다.

## 이 PEP가 제안하지 않는 것 (What this PEP is not)

이 PEP는 Python에 `GOTO` 문을 추가하자는 제안이 아닙니다. `GOTO`는 프로그래머가 임의의 코드 블록이나 줄로 점프할 수 있게 하여 제어 흐름을 추적하기 어렵게 만듭니다. `break` 및 `continue` (레이블 지원 여부와 관계없이)는 `GOTO`의 한 형태로 볼 수 있지만, 훨씬 더 제한적입니다. 이 PEP의 목표는 기존의 `break` 및 `continue` 제어 흐름 도구를 확장하여 제어 흐름을 더 이해하기 쉽게 만드는 것입니다.

레이블이 있는 `break` 및 `continue`는 다른 함수나 메서드로 제어를 전달할 수 없으며, 현재 스코프 내의 임의의 코드 줄로도 제어를 전달할 수 없습니다. 이는 `GOTO`와는 매우 다르고 훨씬 더 제한적입니다.

## 명세 (Specification)

모든 제안에서, `break`와 `continue`는 단독으로 사용될 경우 현재와 같이 가장 안쪽 루프에 적용되는 기본 동작을 유지합니다.

### 제안 A - 명시적 레이블 (Explicit labels)

`for` 및 `while` 루프 문법에 선택적으로 `as` 또는 `label` (문맥적 키워드)과 식별자를 추가하여 루프를 식별합니다. `break` (및 `continue`) 문 뒤에 이 식별자를 붙여 어떤 루프를 종료(또는 계속)할지 지정합니다.

**`as` 키워드 사용 예시:**
```python
for a in a_list as a_loop:
    # ...
    for b in b_list as b_loop:
        # ...
        if condition_one(a, b):
            break b_loop # 일반적인 break와 동일
        # ...
        if condition_two(a, b):
            break a_loop # 'a_loop' 레이블이 붙은 루프 종료
        # ...
```

**`label` 키워드 사용 예시:**
```python
for a in a_list label a_loop:
    # ...
    for b in b_list label b_loop:
        # ...
        if condition_one(a, b):
            break b_loop # 일반적인 break와 동일
        # ...
        if condition_two(a, b):
            break a_loop # 'a_loop' 레이블이 붙은 루프 종료
        # ...
```
이 제안은 언어 문법(`break`, `continue`, `for`, `while` 문법)에 수정이 필요하며, 새로운 문맥적 키워드(`label` 또는 `as` 확장)가 필요합니다.

### 제안 B - 숫자 인수를 이용한 `break` 및 `continue` (Numeric break & continue)

`for` 및 `while` 루프의 문법을 변경하는 대신, `break`와 `continue`가 PHP와 유사하게 종료하려는 바깥쪽 루프의 인덱스를 나타내는 숫자 인수를 취합니다. Pythonic하게 0부터 인덱싱하는 것을 제안합니다.

```python
for a in a_list:
    # ...
    for b in b_list:
        # ...
        if condition_one(a,b):
            break 0 # 일반적인 break와 동일 (가장 안쪽 루프)
        # ...
        if condition_two(a,b):
            break 1 # 한 단계 바깥 루프 종료
        # ...
```
너무 큰 숫자, 음수, 또는 정수가 아닌 값을 전달하면 `IndexError`를 발생시킬 수 있습니다. 이 제안은 기존 Python 프로그램에는 변경을 요구하지 않습니다.

### 제안 C - 반복적인 메서드 (The reduplicative method)

`break` 및 `continue` 문법을 변경하여 같은 줄에 여러 `break` 및 `continue` 문을 허용합니다. 예를 들어, `break break`는 첫 번째와 두 번째 바깥 루프를 종료합니다.

```python
for a in a_list:
    # ...
    for b in b_list:
        # ...
        if condition_one(a,b):
            break # 일반적인 break
        # ...
        if condition_two(a,b):
            break break # 두 단계 바깥 루프 종료
        # ...
```
이 방식은 `break continue`와 같이 내부 루프를 종료하고 다음 바깥 루프를 계속하는 것도 가능하게 합니다. 저자는 이 제안이 이해하기 어렵다는 이유로 거부될 것으로 예상했습니다. 이 제안도 기존 Python 프로그램에 변경을 요구하지 않습니다.

### 제안 D - 명시적 이터레이터 (Explicit iterators)

`for` 및 `while` 루프 문법에 레이블을 추가하는 대신, 레이블이 있는 `break`를 사용하려는 프로그래머는 이터레이터(iterator)를 명시적으로 생성하고 식별자에 할당해야 합니다.

```python
a_iter = iter(a_list)
for a in a_iter:
    # ...
    b_iter = iter(b_list)
    for b in b_iter:
        # ...
        if condition_one(a,b):
            break b_iter # 'b_iter'와 연결된 루프 종료
        # ...
        if condition_two(a,b):
            break a_iter # 'a_iter'와 연결된 루프 종료
        # ...
```
이터레이터가 아닌 객체를 `break` 또는 `continue`에 전달하면 `TypeError`를 발생시키고, 존재하지 않는 식별자를 전달하면 `NameError`를 발생시킵니다. 이 제안은 레이블이 있는 루프를 생성하기 위해 한 줄의 추가 코드만 필요하며, 기존 Python 프로그램에는 변경을 요구하지 않습니다.

### 제안 E - 명시적 이터레이터 및 이터레이터 메서드 (Explicit iterators and iterator methods)

이것은 제안 D의 변형입니다. `break` 및 `continue`의 가장 기본적인 사용 외에 다른 기능이 필요한 경우 이터레이터를 명시적으로 생성해야 합니다. `break` 및 `continue`의 문법을 수정하는 대신, `.break()` 및 `.continue()` 메서드를 이터레이터 타입에 추가할 수 있습니다.

```python
a_iter = iter(a_list)
for a in a_iter:
    # ...
    b_iter = iter(b_list)
    for b in b_iter:
        # ...
        if condition_one(a,b):
            b_iter.break() # 'b_iter'와 연결된 루프 종료
        # ...
        if condition_two(a,b):
            a_iter.break() # 'a_iter'와 연결된 루프 종료
        # ...
```
저자는 이 제안이 "순수한 추함(sheer ugliness)"이라는 이유로 거부될 것이라고 예상했습니다. 하지만 이 제안은 언어 문법 변경이나 기존 Python 프로그램에 대한 변경을 전혀 요구하지 않습니다.

## 결론 (Conclusion)

PEP 3136은 중첩 루프에서 `break` 및 `continue` 문의 제한적인 동작을 개선하기 위해 여러 가지 아이디어를 탐색했습니다. 하지만 최종적으로 거부되어, Python은 여전히 `break` 및 `continue`에 레이블을 지원하지 않습니다. 이는 Python의 "명시적인 것이 암시적인 것보다 낫다(Explicit is better than implicit)"는 철학과 `GOTO`와 같은 복잡한 제어 흐름을 피하려는 경향과 관련이 있을 수 있습니다. 따라서 Python 개발자는 여전히 플래그 변수나 예외 처리와 같은 기존의 우회 방법을 사용하여 다중 루프를 제어해야 합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.