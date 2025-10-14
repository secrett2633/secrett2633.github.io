---
title: "[Deferred] PEP 316 - Programming by Contract for Python"
excerpt: "Python Enhancement Proposal 316: 'Programming by Contract for Python'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/316/
toc: true
toc_sticky: true
date: 2025-09-26 18:27:40+0900
last_modified_at: 2025-09-26 18:27:40+0900
published: true
---
> **원문 링크:** [PEP 316 - Programming by Contract for Python](https://peps.python.org/pep-0316/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 02-May-2003

## PEP 316 – Python을 위한 계약 기반 프로그래밍 (Programming by Contract for Python)

### 개요

이 문서는 Python에서 "계약 기반 프로그래밍(Programming by Contract, DBC)"을 구현하는 방법을 설명하는 제안입니다. Eiffel의 Design By Contract™가 가장 널리 알려진 계약 기반 프로그래밍의 예시입니다.

계약 기반 프로그래밍은 클래스 및 모듈에 대한 불변식(invariant), 그리고 함수와 메서드에 대한 사전 조건(pre-condition) 및 사후 조건(post-condition) 표현식을 포함하도록 언어를 확장합니다. 이 표현식들(계약)은 `assert`와 유사하게, 거짓일 경우 프로그램 실행이 중단되며, 런타임 검사는 일반적으로 디버깅 중에만 활성화됩니다. 계약은 단순히 `assert`를 사용하는 것보다 높은 수준이며, 일반적으로 문서화에 포함됩니다.

**상태:** 연기됨 (Deferred)
**작성자:** Terence Way
**생성일:** 2003년 5월 2일

### 동기 (Motivation)

Python에는 이미 `assert` 문이 있는데, 왜 계약과 같은 것을 지원하기 위해 언어에 추가적인 기능을 도입해야 할까요? 가장 큰 두 가지 이유는 다음과 같습니다.

1.  **더 나은, 더 정확한 문서화:** 복잡한 모듈이나 클래스는 종종 제대로 문서화되지 않는 경우가 많습니다. 제공된 문서는 특정 모듈이나 클래스를 사용하도록 설득하기에는 충분할 수 있지만, 실제 디버깅이 시작되면 프로그래머는 거의 항상 소스 코드를 읽어야 합니다. 계약은 `doctest` 모듈이 제공하는 훌륭한 예시를 확장합니다. 문서는 프로그래머가 읽을 수 있으며, 실행 가능한 테스트가 포함되어 있습니다.
2.  **더 쉬운 테스팅:** 계약을 통한 코드 테스트도 더 쉬워집니다. 포괄적으로 작성된 계약은 곧 유닛 테스트(unit tests)와 동일합니다. 테스트는 사전 조건의 모든 범위를 실행하며, 사후 조건이 위반되면 실패합니다. 이론적으로 올바르게 명시된 함수는 완전히 무작위로 테스트될 수 있습니다.

왜 이것을 언어에 추가해야 할까요? 여러 구현을 두거나 프로그래머가 자체적인 `assert`를 구현하도록 두지 않는 이유는 무엇일까요? 그 답은 **상속(inheritance)** 시 계약의 동작 때문입니다.

만약 Alice와 Bob이 서로 다른 `assert` 패키지를 사용한다고 가정해 봅시다. Alice가 `assert`로 보호되는 클래스 라이브러리를 만들었다면, Bob은 Alice의 라이브러리에서 클래스를 파생하여도 사후 조건 및 불변식의 올바른 검사를 기대할 수 없습니다. 만약 둘 다 동일한 `assert` 패키지를 사용한다면, Bob은 Alice의 메서드를 오버라이드(override)하더라도 Alice의 계약 `assert`에 대해 테스트할 수 있습니다. 이러한 `assert` 시스템이 존재하기에 가장 자연스러운 곳은 언어의 런타임 라이브러리입니다.

### 명세 (Specification)

모든 모듈 또는 클래스의 docstring은 `inv:` 키워드로 시작하는 줄로 표시된 불변식 계약을 포함할 수 있습니다. 콜론(:) 앞뒤의 공백은 무시됩니다. 콜론 뒤에는 같은 줄에 단일 표현식이 바로 오거나, `inv` 키워드보다 들여쓰기된 여러 줄의 표현식이 올 수 있습니다. 일반적인 Python의 암묵적/명시적 줄 연속 규칙이 적용됩니다. 하나의 docstring에 여러 개의 불변식 계약이 있을 수 있습니다.

**예시:**

```python
# 상태 열거
START, CONNECTING, CONNECTED, CLOSING, CLOSED = range(5)

class conn:
    """A network connection
    inv: self.state in [START, CLOSED,  # 닫힌 상태
                        CONNECTING, CLOSING,  # 전환 상태
                        CONNECTED]
    inv: 0 <= self.seqno < 256
    """

class circbuf:
    """A circular buffer.
    inv: # 버퍼에 0에서 최대 항목까지 있을 수 있음
        0 <= self.len <= len(self.buf)
    inv: # g는 buf의 유효한 인덱스임
        0 <= self.g < len(self.buf)
    inv: # p도 buf의 유효한 인덱스임
        0 <= self.p < len(self.buf)
    inv: # get과 put 사이에 len개의 항목이 있음
        (self.p - self.g) % len(self.buf) == \
        self.len % len(self.buf)
    """
```


모듈 불변식은 모듈이 로드된 후, 그리고 모듈 내의 모든 `public` 함수의 진입 및 종료 시점에 `True`여야 합니다.
클래스 불변식은 `__init__` 함수가 반환된 후, `__del__` 함수의 진입 시점에, 그리고 클래스의 모든 `public` 메서드의 진입 및 종료 시점에 `True`여야 합니다. 클래스 불변식은 `self` 변수를 사용하여 인스턴스 변수에 접근해야 합니다.
메서드 또는 함수는 이름이 밑줄(`_`)로 시작하지 않거나, `__` (두 개의 밑줄)로 시작하고 끝나지 않는 경우 `public`으로 간주됩니다.

모든 함수나 메서드의 docstring은 위와 동일한 규칙에 따라 `pre` 키워드로 문서화된 사전 조건을 가질 수 있습니다. 사후 조건은 `post` 키워드 뒤에 선택적으로 변수 목록을 사용하여 문서화됩니다. 이 변수들은 함수 또는 메서드의 본문과 동일한 스코프(scope)에 있습니다. 이 목록은 함수/메서드가 수정할 수 있는 변수를 선언합니다.

**예시:**

```python
class circbuf:
    def __init__(self, leng):
        """Construct an empty circular buffer.
        pre: leng > 0
        post[self]: self.is_empty()
            len(self.buf) == leng
        """
```


`reStructuredText`를 사용하여 작성된 docstring을 지원하기 위해 단일 콜론(:) 대신 이중 콜론(::)을 사용할 수 있습니다. 예를 들어, 다음 두 docstring은 동일한 계약을 설명합니다.

```
"""pre: leng > 0"""
"""pre:: leng > 0"""
```


사전 및 사후 조건의 표현식은 모듈 네임스페이스(namespace)에 정의됩니다. 즉, 클로저(closure) 변수를 제외하고 함수가 접근할 수 있는 거의 모든 변수에 접근할 수 있습니다.

사후 조건의 계약 표현식은 두 개의 추가 변수에 접근할 수 있습니다.
-   `__old__`: `post` 키워드 바로 뒤에 오는 변수 목록에서 선언된 값들의 얕은 복사본(shallow copies)으로 채워집니다.
-   `__return__`: 함수 또는 메서드의 반환 값에 바인딩(bind)됩니다.

**예시:**

```python
class circbuf:
    def get(self):
        """Pull an entry from a non-empty circular buffer.
        pre: not self.is_empty()
        post[self.g, self.len]: __return__ == self.buf[__old__.self.g]
            self.len == __old__.self.len - 1
        """
```


모든 계약 표현식은 몇 가지 추가 편의 함수에 접근할 수 있습니다. 시퀀스의 진리 여부를 더 쉽게 평가하기 위해 `forall`과 `exists` 두 함수가 다음과 같이 정의됩니다.

```python
def forall(a, fn = bool):
    """Return True only if all elements in a are true.
    >>> forall([])
    1
    >>> even = lambda x: x % 2 == 0
    >>> forall([2, 4, 6, 8], even)
    1
    >>> forall('this is a test'.split(), lambda x: len(x) == 4)
    0
    """
def exists(a, fn = bool):
    """Returns True if there is at least one true value in a.
    >>> exists([])
    0
    >>> exists('this is a test'.split(), lambda x: len(x) == 4)
    1
    """
```


**예시:**

```python
def sort(a):
    """Sort a list.
    pre: isinstance(a, type(list))
    post[a]: # 배열 크기는 변경되지 않음
        len(a) == len(__old__.a)
        # 배열은 정렬되어 있음
        forall([a[i] >= a[i-1] for i in range(1, len(a))])
        # 모든 이전 요소가 여전히 배열에 있음
        forall(__old__.a, lambda e: __old__.a.count(e) == a.count(e))
    """
```


조건 평가를 더 쉽게 하기 위해 `implies` 함수가 정의됩니다. 두 인수를 사용하면 논리적 함의(`=>`) 연산자와 유사합니다. 세 인수를 사용하면 C 언어의 조건부 표현식(`x?a:b`)과 유사합니다. 다음과 같이 정의됩니다.

-   `implies(False, a)` => `True`
-   `implies(True, a)` => `a`
-   `implies(False, a, b)` => `b`
-   `implies(True, a, b)` => `a`

함수 진입 시, 함수의 사전 조건이 검사됩니다. 사전 조건 중 하나라도 거짓이면 `AssertionError`가 발생합니다. 함수가 `public`인 경우, 클래스 또는 모듈의 불변식도 검사됩니다. `post`에 선언된 변수들의 복사본이 저장되고, 함수가 호출되며, 함수가 예외를 발생시키지 않고 종료되면 사후 조건이 검사됩니다.

### 예외 (Exceptions)

함수나 메서드가 예외를 발생시켜 종료하더라도 클래스/모듈 불변식은 검사됩니다 (사후 조건은 검사되지 않습니다).

실패한 모든 계약은 `ContractViolationError` 예외의 서브클래스(subclass)인 예외를 발생시키며, `ContractViolationError`는 `AssertionError` 예외의 서브클래스입니다. 실패한 사전 조건은 `PreconditionViolationError` 예외를 발생시키고, 실패한 사후 조건은 `PostconditionViolationError` 예외를, 실패한 불변식은 `InvariantViolationError` 예외를 발생시킵니다.

**클래스 계층 구조:**

```
AssertionError
    ContractViolationError
        PreconditionViolationError
        PostconditionViolationError
        InvariantViolationError
        InvalidPreconditionError
```

`InvalidPreconditionError`는 사전 조건이 불법적으로 강화될 때 발생합니다. 이는 상속 섹션에서 자세히 설명합니다.

**예시:**

```python
try:
    some_func()
except contract.PreconditionViolationError:
    # 사전 조건 실패, 정상 처리
    pass
```


### 상속 (Inheritance)

클래스의 불변식은 모든 슈퍼클래스(super-classes)의 불변식을 포함합니다 (클래스 불변식은 슈퍼클래스 불변식과 AND 연산됩니다). 이 불변식들은 메서드 결정 순서(method-resolution order)로 검사됩니다.

메서드의 사후 조건 또한 오버라이드(override)된 모든 사후 조건을 포함합니다 (메서드 사후 조건은 오버라이드된 모든 메서드 사후 조건과 AND 연산됩니다).

오버라이딩하는 메서드의 사전 조건이 충족되면, 오버라이드된 메서드의 사전 조건은 무시될 수 있습니다. 그러나 오버라이딩하는 메서드의 사전 조건이 실패하면, 오버라이드된 모든 메서드의 사전 조건도 실패해야 합니다. 그렇지 않으면 `InvalidPreconditionError`라는 별도의 예외가 발생합니다. 이는 사전 조건을 약화시키는 것을 지원합니다.

**다소 억지스러운 예시:**

```python
class SimpleMailClient:
    def send(self, msg, dest):
        """메시지를 목적지로 보냅니다.
        pre: self.is_open() # 열린 연결이 있어야 함
        """
    def recv(self):
        """읽지 않은 다음 메일 메시지를 가져옵니다. 메시지가 없으면 None을 반환합니다.
        pre: self.is_open() # 열린 연결이 있어야 함
        post: __return__ is None or isinstance(__return__, Message)
        """

class ComplexMailClient(SimpleMailClient):
    def send(self, msg, dest):
        """메시지를 목적지로 보냅니다. 현재 연결되어 있으면 메시지가 즉시 전송됩니다.
        그렇지 않으면 연결이 될 때까지 메시지가 로컬에 대기열에 추가됩니다.
        pre: True # SimpleMailClient의 사전 조건을 약화시킴
        """
    def recv(self):
        """읽지 않은 다음 메일 메시지를 가져옵니다. 메시지가 있을 때까지 기다립니다.
        pre: True # 항상 호출될 수 있음
        post: isinstance(__return__, Message)
        """
```


사전 조건은 약화될 수만 있기 때문에, `ComplexMailClient`는 기존 코드를 손상시킬 염려 없이 `SimpleMailClient`를 대체할 수 있습니다.

### 이론적 근거 (Rationale)

다음과 같은 차이점을 제외하고, Python의 계약 기반 프로그래밍은 Eiffel DBC 명세를 따릅니다.

-   **docstring에 계약 포함:** `doctest` 모듈을 본떠 계약을 docstring에 포함합니다. 이는 추가적인 구문(syntax)의 필요성을 없애고, 계약이 있는 프로그램이 하위 호환성(backwards-compatible)을 가지도록 보장하며, 계약을 문서에 포함하기 위한 추가 작업이 필요하지 않습니다.
-   **키워드 선택:** `Eiffel` 스타일의 `REQUIRE`, `ENSURE`, `INVARIANT` 대신 `pre`, `post`, `inv` 키워드가 선택되었습니다. 이는 더 짧고, 수학적 표기법과 더 일치하며, 미묘한 이유가 있습니다: 'require'는 호출자의 책임을, 'ensure'는 제공자의 보장을 의미합니다. 그러나 다중 상속을 사용할 때 호출자의 잘못 없이 사전 조건이 실패할 수 있고, 다중 스레드를 사용할 때 함수의 잘못 없이 사후 조건이 실패할 수 있습니다.
-   **반복문 불변식(Loop invariants) 미지원:** `Eiffel`에서 사용되는 반복문 불변식은 지원되지 않습니다. 이는 구현하기 어렵고, 어차피 문서화의 일부가 아닙니다.
-   **변수명 `__old__` 및 `__return__`:** `return` 키워드와의 충돌을 피하고 Python의 명명 규칙과 일치하도록 `__old__` 및 `__return__` 변수명이 선택되었습니다. 이들은 `public`이며 Python 구현에서 제공됩니다.
-   **`post` 키워드 뒤 변수 선언:** `post` 키워드 뒤에 변수를 선언하는 것은 함수 또는 메서드가 수정할 수 있는 것을 정확히 설명합니다. 이는 `Eiffel`의 `NoChange` 구문이 필요 없게 하고, `__old__`의 구현을 훨씬 쉽게 만듭니다. 또한, 변경할 내용을 선언한 다음 변경을 제한하는 두 부분으로 나뉘는 Z 스키마와도 더 일치합니다.
-   **`__old__` 값에 대한 얕은 복사본(Shallow copies):** `__old__` 값에 대한 변수들의 얕은 복사본은 계약 프로그래밍 구현이 시스템 속도를 너무 많이 저하시키는 것을 방지합니다. 함수가 얕은 복사본으로는 감지되지 않을 값을 변경하는 경우, 다음과 같이 변경 사항을 선언할 수 있습니다.
    ```python
    post[self, self.obj, self.obj.p]
    ```
-   **`forall`, `exists`, `implies` 함수:** 기존 함수를 계약으로 문서화하는 데 시간을 보낸 후 이 함수들이 추가되었습니다. 이 함수들은 일반적인 명세 관용구의 대부분을 포착합니다. `implies`를 함수로 정의하는 것이 작동하지 않을 수도 있다고 생각할 수 있지만 (다른 부울 연산자와 달리 인수가 필요 여부에 관계없이 평가됨), 계약에서는 계약의 어떤 표현식에도 부작용(side-effects)이 없어야 하므로 작동합니다.

### 참조 구현 (Reference Implementation)

참조 구현이 제공됩니다. 이 구현은 클래스 또는 모듈의 네임스페이스를 직접 변경하여 계약 검사를 수행하는 새로운 함수로 기존 함수를 대체합니다.

`__getattr__`을 해킹하거나 `__metaclass__`를 사용하는 다른 구현도 존재합니다.

### 참고 자료 (References)

-   이 문서에 설명된 구현: [http://www.wayforward.net/pycontract/](http://www.wayforward.net/pycontract/)
-   Design By Contract는 Eiffel Software Inc.의 등록 상표입니다: [http://archive.eiffel.com/doc/manuals/technology/contract/](http://archive.eiffel.com/doc/manuals/technology/contract/)
-   Object-oriented Software Construction, Bertrand Meyer, ISBN 0-13-629031-0
-   doctest – Test docstrings represent reality: [http://docs.python.org/library/doctest.html](http://docs.python.org/library/doctest.html)
-   Design by Contract for Python, R. Plosch IEEE Proceedings of the Joint Asia Pacific Software Engineering Conference (APSEC97/ICSC97), Hong Kong, December 2-5, 1997: [http://www.swe.uni-linz.ac.at/publications/abstract/TR-SE-97.24.html](http://www.swe.uni-linz.ac.at/publications/abstract/TR-SE-97.24.html)
-   PyDBC – Design by Contract for Python 2.2+, Daniel Arbuckle: [http://www.nongnu.org/pydbc/](http://www.nongnu.org/pydbc/)
-   ReStructuredText: [http://docutils.sourceforge.net/rst.html](http://docutils.sourceforge.net/rst.html)
-   Extreme Programming Explained, Kent Beck, ISBN 0-201-61641-6
-   The Z Notation, Second Edition, J.M. Spivey ISBN 0-13-978529-9

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.
최종 수정일: 2025-02-01 08:59:27 GMT


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.