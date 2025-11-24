---
title: "[Final] PEP 3109 - Raising Exceptions in Python 3000"
excerpt: "Python Enhancement Proposal 3109: 'Raising Exceptions in Python 3000'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3109/
toc: true
toc_sticky: true
date: 2025-09-27 14:21:02+0900
last_modified_at: 2025-09-27 14:21:02+0900
published: true
---
> **원문 링크:** [PEP 3109 - Raising Exceptions in Python 3000](https://peps.python.org/pep-3109/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 19-Jan-2006


## PEP 3109 – Python 3000에서의 예외 발생 (Raising Exceptions)

*   **작성자:** Collin Winter
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **생성일:** 2006년 1월 19일
*   **Python 버전:** 3.0

### 초록 (Abstract)

이 PEP는 Python의 예외 발생(raising exceptions) 메커니즘에 대한 변경 사항을 소개합니다. 이 변경은 코드의 불필요한 복잡성(`line noise`)을 줄이고 언어의 크기를 축소하는 것을 목표로 합니다.

### 배경 (Rationale)

Python의 핵심 원칙 중 하나는 "이를 수행하는 명확하고, 가급적이면 오직 하나의 방법만 존재해야 한다"는 것입니다. Python 2.x의 `raise` 문은 이 원칙을 위반하여 동일한 의도를 표현하는 여러 방법을 허용했습니다.

예를 들어, 다음 두 문장은 동일한 기능을 합니다.

```python
raise E, V
raise E(V)
```

또한, 예외에 임의의 트레이스백(traceback)을 첨부할 수 있는 세 번째 `raise` 문 형식도 있었습니다.

```python
raise E, V, T
```

여기서 `T`는 트레이스백입니다. PEP 344에 명시된 대로, Python 3.x의 예외 객체는 `__traceback__` 속성을 가지게 되며, 세 표현식 `raise` 문은 다음과 같이 번역될 수 있습니다.

`raise E, V, T`는 다음과 같이 변환됩니다.

```python
e = E(V)
e.__traceback__ = T
raise e
```

이러한 변환을 통해 `raise` 문은 네 가지 형식에서 두 가지 형식으로 줄어들 수 있습니다.

1.  **`raise` (인수 없음):** `except` 스위트(suite) 내에서 현재 활성화된 예외를 다시 발생시킬 때 사용됩니다.
2.  **`raise EXCEPTION`:** 새로운 예외를 발생시킬 때 사용됩니다. 이 형식에는 두 가지 하위 변형이 있습니다. `EXCEPTION`은 예외 클래스 또는 예외 클래스의 인스턴스일 수 있습니다. 유효한 예외 클래스는 `BaseException`과 그 하위 클래스입니다 (PEP 352). 만약 `EXCEPTION`이 하위 클래스인 경우, 인수 없이 호출되어 예외 인스턴스를 얻습니다.

그 외의 방식으로 예외를 발생시키려 하면 에러가 발생합니다.

이러한 통합을 통해 A.M. Kuchling이 언급한 더 실질적인 이점도 있습니다.

PEP 8은 두 가지 `raise` 문 형식 중 어떤 것을 선호하는지 명시하지 않았습니다.

```python
raise ValueError, 'blah'
raise ValueError("blah")
```

두 번째 형식이 더 좋습니다. 그 이유는 예외 인수가 길거나 문자열 포매팅을 포함하는 경우, 괄호 때문에 줄 연속 문자(line continuation characters)를 사용할 필요가 없기 때문입니다.

BDFL(Benevolent Dictator For Life, 귀도 반 로섬)은 이러한 여러 `raise` 형식의 통합에 동의하고 지지했습니다.

### 문법 변경 (Grammar Changes)

Python 3에서는 `raise` 문의 문법이 다음과 같이 변경됩니다.

Python 2의 문법:

```
raise_stmt: 'raise' [test [',' test [',' test]]]
```

Python 3의 문법:

```
raise_stmt: 'raise' [test]
```

### 내장 타입 변경 (Changes to Builtin Types)

예외 발생과 관련하여, 제너레이터(generator) 객체의 `throw()` 메서드 시그니처도 변경되어 선택적 두 번째 및 세 번째 매개변수가 삭제됩니다. 이에 따라 시그니처는 (PEP 342에 따라) 다음과 같이 변경됩니다.

Python 2의 `generator.throw()` 시그니처:

```python
generator.throw(E, [V, [T]])
```

Python 3의 `generator.throw()` 시그니처:

```python
generator.throw(EXCEPTION)
```

여기서 `EXCEPTION`은 `BaseException`의 하위 클래스이거나 `BaseException`의 하위 클래스 인스턴스입니다.

### 의미론적 변경 (Semantic Changes)

Python 2에서는 다음 `raise` 문이 유효했습니다.

```python
raise ((E1, (E2, E3)), E4), V
```

인터프리터는 튜플의 첫 번째 요소를 예외 타입으로 (재귀적으로) 처리하여 위 코드가 다음 코드와 완전히 동일하게 작동하도록 했습니다.

```python
raise E1, V
```

Python 3.0부터는 이와 같은 튜플을 예외로 발생시키는 기능이 지원되지 않습니다. 이 변경은 `raise` 문을 이미 이러한 방식(튜플 사용)을 허용하지 않는 제너레이터 객체의 `throw()` 메서드와 일치시킵니다.

### 호환성 문제 (Compatibility Issues)

두 개 또는 세 개의 표현식을 사용하는 모든 `raise` 문과 제너레이터의 `throw()` 호출은 수정이 필요합니다. 다행히도, 이 경우 Python 2.x에서 Python 3.x로의 변환은 간단하며, Guido van Rossum의 `2to3` 유틸리티가 `raise` 및 `throw` fixers ()를 사용하여 기계적으로 처리할 수 있습니다.

다음과 같은 변환이 수행됩니다.

*   0개 또는 1개의 표현식을 사용하는 `raise` 문은 그대로 유지됩니다.
*   두 개의 표현식을 사용하는 `raise` 문은 다음처럼 변환됩니다.
    ```python
    raise E, V
    # ->
    raise E(V)
    ```
*   두 개의 표현식을 사용하는 `throw()` 호출은 다음처럼 변환됩니다.
    ```python
    generator.throw(E, V)
    # ->
    generator.throw(E(V))
    ```
    (이 변환에는 주의사항이 있습니다. 섹션 #5 참조.)
*   세 개의 표현식을 사용하는 `raise` 문은 다음처럼 변환됩니다.
    ```python
    raise E, V, T
    # ->
    e = E(V)
    e.__traceback__ = T
    raise e
    ```
*   세 개의 표현식을 사용하는 `throw()` 호출은 다음처럼 변환됩니다.
    ```python
    generator.throw(E, V, T)
    # ->
    e = E(V)
    e.__traceback__ = T
    generator.throw(e)
    ```
    (이 변환에도 주의사항이 있습니다. 섹션 #5 참조.)

`E`가 튜플 리터럴(tuple literal)인 두 개 또는 세 개의 표현식 `raise` 문은 `2to3`의 `raise` fixer를 사용하여 자동으로 변환될 수 있습니다. 그러나 `E`가 함수 호출 결과와 같이 리터럴이 아닌 튜플인 `raise` 문은 수동으로 변환해야 합니다. `E`가 예외 클래스이고 `V`가 예외 인스턴스인 두 개 또는 세 개의 표현식 `raise` 문은 특별한 주의가 필요합니다. 이러한 경우는 두 가지로 나눌 수 있습니다.

1.  **인수 없는 `raise` 문의 확장된 버전으로 `raise E, V`를 사용하는 경우.**
    예시: `F`가 `E`의 하위 클래스라고 가정합니다.
    ```python
    try:
        something()
    except F as V:
        raise F(V)
    except E as V:
        handle(V)
    ```
    이것은 다음과 같이 표현하는 것이 더 좋습니다.
    ```python
    try:
        something()
    except F:
        raise
    except E as V:
        handle(V)
    ```
2.  **`raise E, V`를 사용하여 예외를 다른 클래스로 "캐스팅(casting)"하는 방법.**
    `distutils.compiler.unixcompiler`의 예시를 들어보겠습니다.
    ```python
    try:
        self.spawn(pp_args)
    except DistutilsExecError as msg:
        raise CompileError(msg)
    ```
    이것은 `PEP 344`에서 도입된 `raise ... from ...` 구문을 사용하여 다음과 같이 표현하는 것이 더 좋습니다.
    ```python
    try:
        self.spawn(pp_args)
    except DistutilsExecError as msg:
        raise CompileError from msg
    ```

### 구현 (Implementation)

이 PEP는 리비전 57783에서 구현되었습니다.

### 참고 자료 (References)

*   `raise` 문 문법: http://docs.python.org/reference/simple_stmts.html#raise
*   A.M. Kuchling의 메일 아카이브: https://mail.python.org/pipermail/python-dev/2005-August/055187.html
*   BDFL의 동의: https://mail.python.org/pipermail/python-dev/2005-August/055190.html
*   `2to3` 유틸리티: http://svn.python.org/view/sandbox/trunk/2to3/
*   `fix_raise.py`: http://svn.python.org/view/sandbox/trunk/2to3/fixes/fix_raise.py
*   `fix_throw.py`: http://svn.python.org/view/sandbox/trunk/2to3/fixes/fix_throw.py
*   구현 리비전 57783: http://svn.python.org/view/python/branches/py3k/Include/?rev=57783&view=rev

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.