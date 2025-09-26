---
title: "[Final] PEP 285 - Adding a bool type"
excerpt: "Python Enhancement Proposal 285: 'Adding a bool type'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/285/
toc: true
toc_sticky: true
date: 2025-09-26 17:58:00+0900
last_modified_at: 2025-09-26 17:58:00+0900
published: true
---
> **원문 링크:** [PEP 285 - Adding a bool type](https://peps.python.org/pep-0285/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 08-Mar-2002

## PEP 285 – `bool` 타입 추가 제안

### 개요

PEP 285는 Python에 새로운 내장(built-in) 타입인 `bool`을 도입하고, 두 개의 상수 `False`와 `True`를 추가할 것을 제안합니다. 이 `bool` 타입은 내부적으로 `int` 타입의 서브타입(subtype)으로 구현되며, `False`는 `0`처럼, `True`는 `1`처럼 동작합니다. 그러나 `repr()` 및 `str()` 함수 호출 시에는 `0`이나 `1` 대신 `"False"`나 `"True"`를 반환합니다.

이 제안이 수락됨에 따라, 개념적으로 불리언(Boolean) 결과를 반환하는 모든 내장 연산(예: 비교 연산자, `not` 연산자, `isinstance()`와 같은 술어(predicate) 함수)은 더 이상 `0`이나 `1` 대신 `False` 또는 `True`를 반환하도록 변경되었습니다.

### 도입 배경 (Rationale)

대부분의 프로그래밍 언어는 결국 불리언 타입을 가지게 되며, 심지어 C99 표준에도 불리언 타입이 포함되어 있습니다. 많은 프로그래머들이 불리언 타입의 필요성을 느끼고 있었으며, 기존 Python 문서에서도 불리언 타입의 부재에 대한 설명을 포함하곤 했습니다.

과거에는 많은 개발자가 `False=0`과 `True=1`과 같은 상수를 직접 정의하여 사용했지만, 이 방식은 일관성이 부족하다는 문제가 있었습니다. 예를 들어, `FALSE`, `false`, `False`, `F`, `f` 중 어떤 표기법을 사용해야 할지, 또는 `false`가 `0`, `None`, 혹은 다른 타입의 진릿값(truth value)이어야 하는지 등 혼란이 있었습니다. 표준 `bool` 타입을 언어에 추가함으로써 이러한 문제를 해결할 수 있게 되었습니다.

또한, 일부 외부 라이브러리(데이터베이스, RPC 패키지 등)는 불리언 값과 정수(integral) 값을 구별해야 할 필요가 있었습니다. 자바(Jython)와 같은 환경에서는 `int`와 `boolean` 인수에 대해 오버로드(overload)된 메서드가 존재하여 `bool` 타입이 이러한 상황에서 적절한 메서드를 선택하는 데 사용될 수 있습니다.

값을 불리언으로 강제 변환하거나 정규화할 때 `bool(x)`는 `not not x`보다 훨씬 명확하며, `if x: return 1 else: return 0`과 같은 코드보다 간결합니다. 교육적인 측면에서도 `a > b`와 같은 비교 연산의 결과가 `1` 대신 `True`로 표시되는 것이 초보 학습자에게 더 직관적이고 이해하기 쉽습니다.

### 명세 (Specification)

새로운 `bool` 타입의 주요 특징은 다음과 같습니다.

*   `bool`은 `int`를 상속합니다.
    ```python
    class bool(int):
        def __new__(cls, val=0):
            if val:
                return True
            else:
                return False
        def __repr__(self):
            if self:
                return "True"
            else:
                return "False"
        __str__ = __repr__
        # ... (and, or, xor 연산자 오버라이드)
    ```
*   `False`와 `True`는 `None`과 같은 싱글턴(singleton)입니다. 즉, 단 하나의 인스턴스만 존재합니다.
*   `pickle` 및 `marshal` 모듈을 통한 직렬화/역직렬화(pickling and marshalling) 과정에서 `True`와 `False`는 올바르게 round-trip 됩니다.
*   개념적으로 불리언 결과를 반환하는 모든 내장 연산은 `0` 또는 `1` 대신 `False` 또는 `True`를 반환하도록 변경됩니다. 이는 비교 연산자(`==`, `<`, `is` 등), 단항 연산자 `not`, `callable()`, `hasattr()`, `isinstance()`, `issubclass()`와 같은 내장 함수, 그리고 `str`, `unicode`, `dict`, `file` 객체의 여러 메서드에 영향을 미칩니다.
*   `bool`이 `int`를 상속하므로, `True + 1`은 유효하며 결과는 `2`입니다. 이는 하위 호환성(backwards compatibility)을 위해 중요합니다.

### C API

`bool` 타입의 C API는 "boolobject.h" 헤더 파일에 정의되어 있으며, "Python.h"에 포함되어 있습니다.

*   `Py_False`와 `Py_True`는 고유한 `False`와 `True` 불리언 객체를 참조합니다.
*   새로운 API인 `PyObject *PyBool_FromLong(long)`는 C의 `long int` 인수를 받아 `Py_False` 또는 `Py_True`에 대한 새 참조를 반환합니다.
*   객체가 `bool`인지 확인하려면 매크로 `PyBool_Check()`를 사용할 수 있습니다.

### 명확화 (Clarification)

이 PEP는 거의 모든 객체 타입이 진릿값으로 사용될 수 있다는 사실을 변경하지 않습니다. 예를 들어, `if` 문에서 빈 리스트는 `False`로 간주되고 비어 있지 않은 리스트는 `True`로 간주되는 기존의 동작은 변하지 않으며, 이를 변경할 계획도 없습니다.

변경되는 유일한 점은 진릿값을 명시적으로 반환하거나 할당할 때 선호되는 값입니다. 이전에는 `0`과 `1`이 선호되었지만, 이 PEP는 선호되는 값을 `False`와 `True`로 변경하고, 내장 연산이 이러한 선호 값을 반환하도록 수정합니다.

### 호환성 (Compatibility)

하위 호환성을 위해 `bool` 타입은 일부 개발자들이 원했을 만한 엄격한 불리언 특성을 모두 가지지는 않습니다. 예를 들어, 하나 또는 두 개의 `bool` 인수를 사용하는 산술 연산이 허용되며, `False`는 `0`으로, `True`는 `1`로 취급됩니다. 또한, `bool`은 시퀀스(sequence) 인덱스로 사용될 수 있습니다.

`and` 및 `or` 연산자는 결과를 결정하는 첫 번째 인수를 반환하도록 정의되어 있으며, 이는 변경되지 않습니다. 따라서 이들 연산자는 항상 불리언 값을 강제하지 않습니다. 물론, 두 인수가 모두 `bool`이면 결과도 항상 `bool`입니다. 결과를 `bool`로 강제하려면 `bool(x and y)`와 같이 작성할 수 있습니다.

### 해결된 문제 (Resolved Issues)

*   `repr()` 또는 `str()` 함수의 결과가 `int`와 다르기 때문에 일부 코드(예: `doctest` 기반 유닛 테스트)가 실패할 수 있지만, 쉽게 수정할 수 있는 적은 양의 코드에만 영향을 미칠 것으로 예상됩니다.
*   다른 언어(C99, C++, Java)에서는 상수를 소문자 `false`, `true`로 사용하지만, Python은 `None`, `Ellipsis`, `NotImplemented`와 같은 기존 내장 상수의 대문자 규칙을 따르기로 결정했습니다.
*   초보자들이 `if x == True:`와 같이 작성하는 경향이 있지만, 올바른 형식은 `if x:`입니다. `x == True`가 `True`로 간주되는 모든 `x`에 대해 참이 되도록 하는 것은 `6 == True == 7`과 같은 논리적 오류를 발생시킬 수 있으므로 허용되지 않습니다. 개발자 교육을 통해 올바른 사용법을 알리는 것이 중요하다고 제안되었습니다.
*   `if bool(x):`와 같이 명시적으로 `bool()`을 사용하는 것은 대개 필요하지 않으며 가독성을 저해할 수 있습니다. 그러나 임의의 객체 `x`에 대한 참조를 유지하는 것이 번거롭거나 정규화가 필요한 경우 `b = bool(x)`와 같이 사용하는 것은 유용할 수 있습니다. 값을 정수로 계속 사용하겠다는 의도를 명확히 하기 위해 `i = int(bool(x))`와 같이 사용할 수도 있습니다.

### 구현 (Implementation)

C로 작성된 완전한 구현은 SourceForge 패치 관리자에 업로드되었으며, Python 2.3a0을 위해 CVS에 체크인되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.