---
title: "[Final] PEP 3141 - A Type Hierarchy for Numbers"
excerpt: "Python Enhancement Proposal 3141: 'A Type Hierarchy for Numbers'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3141/
toc: true
toc_sticky: true
date: 2025-09-27 14:36:02+0900
last_modified_at: 2025-09-27 14:36:02+0900
published: true
---
> **원문 링크:** [PEP 3141 - A Type Hierarchy for Numbers](https://peps.python.org/pep-3141/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 23-Apr-2007

# PEP 3141: 숫자형을 위한 타입 계층 구조 (A Type Hierarchy for Numbers)

*   **작성자:** Jeffrey Yasskin
*   **상태:** Final (최종)
*   **타입:** Standards Track (표준 트랙)
*   **생성일:** 2007년 4월 23일
*   **Python 버전:** 3.0

## 요약 (Abstract)

이 제안서는 숫자와 유사한 클래스들을 나타내기 위한 추상 기반 클래스(ABCs) (PEP 3119 참고)의 계층 구조를 정의합니다. 이 계층은 `Number :> Complex :> Real :> Rational :> Integral` 의 구조를 제안하며, 여기서 `A :> B`는 "A가 B의 슈퍼타입(supertype)"임을 의미합니다. 이 계층 구조는 Scheme의 숫자 타워(numeric tower)에서 영감을 받았습니다.

## 도입 배경 (Rationale)

숫자를 인수로 받는 함수들은 해당 숫자의 속성을 파악할 수 있어야 하며, 타입 기반 오버로딩(overloading)이 언어에 추가될 경우 인수 타입에 따라 오버로드될 수 있어야 합니다. 예를 들어, 슬라이싱(slicing)은 인수가 `Integral`이어야 하며, `math` 모듈의 함수들은 인수가 `Real`이어야 합니다. 표준 라이브러리의 타입 검사는 내장 타입 대신 이러한 ABC들을 사용해야 합니다.

## 사양 (Specification)

이 PEP는 일련의 추상 기반 클래스를 지정하고, 일부 메서드 구현을 위한 일반적인 전략을 제안합니다.

### 숫자 클래스 (Numeric Classes)

*   **`Number`** : 가장 기본적인 클래스로, 어떤 종류의 숫자를 기대하는지에 대해 유연성을 제공합니다. 이 클래스는 오버로딩에만 도움을 주며, 어떠한 연산도 제공하지 않습니다.

    ```python
    class Number(metaclass=ABCMeta):
        pass
    ```

*   **`Complex`** : 내장 `complex` 타입에서 작동하는 연산을 정의합니다. 이는 `complex`로의 변환, `bool()`, `.real`, `.imag`, `+`, `-`, `*`, `/`, `**`, `abs()`, `.conjugate()`, `==`, `!=` 등을 포함합니다. 이질적인(heterogeneous) 인수가 주어지고 특별한 지식이 없는 경우, 내장 `complex` 타입으로 폴백(fallback)해야 합니다.

    ```python
    class Complex(Number):
        @abstractmethod
        def __complex__(self): ...
        def __bool__(self): ...
        @abstractproperty
        def real(self): ...
        @abstractproperty
        def imag(self): ...
        # ... 그 외 연산 메서드들 ...
    ```

*   **`Real`** : `Complex`에 실수 연산을 추가합니다. 이는 `float`로의 변환, `trunc()`, `math.floor()`, `math.ceil()`, `round()`, `divmod()`, `//`, `%`, `<`, `<=`, `>`, `>=` 등을 포함합니다. `Real`은 일부 파생 연산에 대한 기본값도 제공합니다. `__complex__`, `real`, `imag`, `conjugate`와 같은 `Complex`의 추상 메서드에 대한 구체적인 구현을 제공합니다.

    ```python
    class Real(Complex):
        @abstractmethod
        def __float__(self): ...
        @abstractmethod
        def __trunc__(self): ...
        # ... 그 외 연산 메서드들 ...

        # Complex의 추상 메서드에 대한 구체적인 구현
        def __complex__(self): return complex(float(self))
        @property
        def real(self): return +self
        @property
        def imag(self): return 0
        def conjugate(self): return +self # Real의 켤레복소수는 자기 자신
    ```

*   **`Rational`** : `Real`을 상속하며, `.numerator` (분자)와 `.denominator` (분모) 속성을 가집니다. 분자/분모는 기약 분수 형태로 표현되어야 합니다. `Real`의 `__float__` 변환 메서드에 대한 구현을 제공합니다.

    ```python
    class Rational(Real): # Exact 클래스도 상속하지만, PEP 3141에는 포함되지 않음
        @abstractproperty
        def numerator(self): ...
        @abstractproperty
        def denominator(self): ...

        # Real의 float 변환에 대한 구체적인 구현
        def __float__(self):
            return self.numerator / self.denominator
    ```

*   **`Integral`** : `Rational`을 상속하며, `int`로의 변환 및 비트 문자열(bit-string) 연산을 추가합니다. `__int__()`와 `__index__()` 메서드를 포함하며, 비트 시프트(`<<`, `>>`), 비트 AND(`&`), OR(`|`), XOR(`^`), INVERT(`~`)와 같은 연산에 대한 구현을 제공합니다. `Rational` 및 `Real`의 추상 메서드에 대한 구체적인 구현도 제공합니다.

    ```python
    class Integral(Rational):
        @abstractmethod
        def __int__(self): ...
        def __index__(self): ...
        # ... 비트 연산 메서드들 ...

        # Rational 및 Real의 추상 메서드에 대한 구체적인 구현
        def __float__(self): return float(int(self))
        @property
        def numerator(self): return +self
        @property
        def denominator(self): return 1
    ```

### 연산 및 `__magic__` 메서드 변경 (Changes to operations and `__magic__` methods)

`float`에서 `int`로 (더 일반적으로는 `Real`에서 `Integral`로) 더 정밀하게 변환하기 위해 새로운 `__magic__` 메서드들이 제안되었습니다. 이러한 메서드들은 모두 `Real` 대신 `Integral`을 반환합니다.

*   `__trunc__(self)`: 새로운 내장 함수 `trunc(x)`에서 호출되며, 0과 `x` 사이에서 `x`에 가장 가까운 `Integral`을 반환합니다.
*   `__floor__(self)`: `math.floor(x)`에서 호출되며, `x`보다 작거나 같은 가장 큰 `Integral`을 반환합니다.
*   `__ceil__(self)`: `math.ceil(x)`에서 호출되며, `x`보다 크거나 같은 가장 작은 `Integral`을 반환합니다.
*   `__round__(self)`: `round(x)`에서 호출되며, `x`에 가장 가까운 `Integral`을 반환하고, 반올림 방식은 타입에 따라 달라집니다. `float`는 Python 3.0에서 가장 가까운 짝수로 반올림하도록 변경됩니다. `round(x, ndigits)`에서 호출되는 `__round__(self, ndigits)`의 두 인자 버전도 있으며, 이는 `Real`을 반환해야 합니다.

Python 2.6에서는 `math.floor`, `math.ceil`, `round`가 계속 `float`를 반환합니다. `float`에 의해 구현된 `int()` 변환은 `trunc()`와 동일합니다. 일반적으로 `int()` 변환은 먼저 `__int__()`를 시도하고, 찾을 수 없으면 `__trunc__()`를 시도해야 합니다.

`complex`의 `__divmod__`, `__mod__`, `__floordiv__`, `__int__`, `__float__`도 제거됩니다.

### 타입 구현자를 위한 참고 사항 (Notes for type implementors)

구현자들은 같은 숫자는 같게 만들고 동일한 값으로 해싱(hashing)하도록 주의해야 합니다. 예를 들어, 복소수(complex) 타입은 `__hash__`를 `hash(complex(self))`와 같이 구현할 수 있지만, 내장 `complex`의 범위나 정밀도를 벗어나는 값에 주의해야 합니다.

### 더 많은 숫자 ABC 추가 (Adding More Numeric ABCs)

물론 숫자를 위한 더 많은 ABC들이 있을 수 있으며, 이 계층 구조는 그러한 추가 가능성을 막지 않습니다. 예를 들어, `Complex`와 `Real` 사이에 `MyFoo`를 추가할 수 있습니다.

```python
class MyFoo(Complex):
    ...
MyFoo.register(Real)
```

### 산술 연산 구현 (Implementing the arithmetic operations)

혼합 타입 연산(mixed-mode operations)은 두 인수 타입을 모두 알고 있는 구현을 호출하거나, 둘 다 가장 가까운 내장 타입으로 변환하여 연산을 수행하도록 구현해야 합니다. `Integral`의 서브타입(subtype)의 경우, `__add__`와 `__radd__`는 다음과 같이 정의되어야 합니다.

```python
class MyIntegral(Integral):
    def __add__(self, other):
        if isinstance(other, MyIntegral):
            return do_my_adding_stuff(self, other)
        elif isinstance(other, OtherTypeIKnowAbout):
            return do_my_other_adding_stuff(self, other)
        else:
            return NotImplemented

    def __radd__(self, other):
        if isinstance(other, MyIntegral):
            return do_my_adding_stuff(other, self)
        elif isinstance(other, OtherTypeIKnowAbout):
            return do_my_other_adding_adding_stuff(other, self)
        elif isinstance(other, Integral):
            return int(other) + int(self)
        elif isinstance(other, Real):
            return float(other) + float(self)
        elif isinstance(other, Complex):
            return complex(other) + complex(self)
        else:
            return NotImplemented
```

### 거부된 대안 (Rejected Alternatives)

이 PEP의 초기 버전은 Haskell Numeric Prelude에서 영감을 받은 `MonoidUnderPlus`, `AdditiveGroup`, `Ring`, `Field`를 포함하는 대수적 계층(algebraic hierarchy)을 정의했습니다. 그러나 NumPy 커뮤니티는 이에 관심이 없었으며, `x + y`가 항상 의미가 있지 않을 수 있다는 문제가 발생했습니다.

그 후 가우스 정수(Gaussian Integers)나 Z/nZ와 같은 것을 포함하기 위해 숫자에 더 많은 분기 구조를 부여했지만, 커뮤니티는 Python에게 너무 복잡하다고 판단했습니다. 따라서 제안은 Scheme의 숫자 타워와 훨씬 더 유사하게 축소되었습니다.

### `Decimal` 타입 (The Decimal Type)

`Decimal` 타입은 현재 이 숫자 타워의 일부로 포함되지 않기로 결정되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.