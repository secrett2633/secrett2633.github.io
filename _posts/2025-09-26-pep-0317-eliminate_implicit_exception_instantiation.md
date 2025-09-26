---
title: "[Rejected] PEP 317 - Eliminate Implicit Exception Instantiation"
excerpt: "Python Enhancement Proposal 317: 'Eliminate Implicit Exception Instantiation'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/317/
toc: true
toc_sticky: true
date: 2025-09-26 18:28:16+0900
last_modified_at: 2025-09-26 18:28:16+0900
published: true
---
> **원문 링크:** [PEP 317 - Eliminate Implicit Exception Instantiation](https://peps.python.org/pep-0317/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 06-May-2003


## PEP 317 – 암시적 예외 인스턴스화 제거 (Eliminate Implicit Exception Instantiation)

*   **저자:** Steven Taschuk <staschuk at telusplanet.net>
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2003년 5월 6일
*   **Python 버전:** 2.4
*   **게시 이력:** 2003년 6월 9일

---

### 요약 (Abstract)

이 PEP는 예외를 암시적으로 인스턴스화하는 `raise` 문의 형태를 공식적으로 Deprecation(더 이상 사용하지 않음으로 지정)하고 궁극적으로 제거할 것을 제안합니다. 예를 들어, 다음과 같은 문장은

```python
raise HullBreachError
raise KitchenError, 'all out of baked beans'
```

이 제안에 따라 다음의 동등한 문장으로 대체되어야 합니다:

```python
raise HullBreachError()
raise KitchenError('all out of baked beans')
```

이 후자의 문장들은 이미 유효하며, 이 PEP는 그 의미를 변경하지 않습니다.

이러한 `raise` 문의 형태를 제거하면 문자열 예외(string exceptions)를 사용할 수 없게 되므로, 이 PEP는 문자열 예외의 공식적인 Deprecation과 궁극적인 제거 또한 제안합니다.

이 제안을 채택하면 하위 호환성(backwards compatibility)이 손상됩니다. 제안된 구현 일정에 따르면, Python 2.4에서는 장래에 올바르지 않게 될 `raise` 사용에 대한 경고가 도입될 것이며, Python 3.0에서는 이를 완전히 제거할 예정이었습니다. (이 전환 기간, 즉 2.4부터 3.0까지는 PEP 5의 지침을 준수하기 위해 최소 1년 이상이 될 것으로 가정되었습니다.)

### 동기 (Motivation)

#### 문자열 예외 (String Exceptions)

문자열 예외 제거는 논란의 여지가 없을 것으로 가정됩니다. 이는 표준 예외 유형이 클래스로 변경된 Python 1.5 이후로 계속 의도되어 왔기 때문입니다.

문자열 예외가 제거되어야 하는 이유는 두 가지 종류의 예외가 존재함으로써 어떠한 보상도 없이 언어를 복잡하게 만들기 때문입니다. 인스턴스 예외(instance exceptions)는 다음과 같은 이유로 우수합니다:

*   클래스-인스턴스 관계가 예외 유형과 값 사이의 관계를 더 자연스럽게 표현합니다.
*   슈퍼클래스-서브클래스 관계를 사용하여 자연스럽게 구성할 수 있습니다.
*   오류 보고 동작(예: 에러 메시지 형식)을 캡슐화할 수 있습니다.

#### 암시적 인스턴스화 (Implicit Instantiation)

Guido van Rossum의 1997년 에세이는 표준 예외를 클래스로 변경한 이유를 설명하며 `raise` 문이 왜 암시적으로 인스턴스화될 수 있는지 명확히 합니다:

> "raise 문은 명시적인 인스턴스화 없이 클래스 예외를 발생시킬 수 있도록 확장되었습니다. 호환성 형태(compatibility forms)라고 불리는 다음 형태의 raise 문이 도입된 동기는 표준 예외를 발생시켰던 이전 코드와의 하위 호환성을 허용하기 위함이었습니다."

예를 들어, `raise TypeError, 'not an int'`와 같은 문자열 예외 구문을 사용했던 Python 1.5 이전 코드가 `TypeError`가 문자열이었던 Python 버전과 클래스였던 Python 버전 모두에서 작동하도록 하는 것이 목표였습니다.

이러한 고려 사항이 필요 없는 경우(즉, 코드가 지원해야 하는 소프트웨어의 어떤 버전에서도 원하는 예외 유형이 문자열이 아닌 경우) 암시적으로 인스턴스화할 좋은 이유가 없으며, 명시적으로 인스턴스화하는 것이 더 명확합니다. 예를 들어:

```python
try:
    raise MyError, raised
except MyError, caught:
    pass
```

이 코드에서 `raise` 문과 `except` 문 사이의 구문적 유사성은 `raised`와 `caught`가 동일한 객체를 참조함을 강하게 시사합니다. 문자열 예외의 경우 실제로 그렇지만, 인스턴스 예외의 경우에는 그렇지 않습니다.

인스턴스화가 암시적일 때, 그것이 언제 발생하는지(예를 들어, 예외가 발생할 때인지 또는 잡힐 때인지) 명확하지 않습니다. 실제로는 `raise` 시점에 발생하므로, 코드가 이를 명확히 표현해야 합니다.

`(C API 수준에서는 예외가 인스턴스화되지 않고도 "발생"되고 "잡힐" 수 있습니다. 이는 예를 들어 PyIter_Next 에 의해 최적화로 사용됩니다. 그러나 Python에서는 그러한 최적화가 현재 제공되지 않으며 제공되어서도 안 됩니다.)`

`raise MyError`와 같이 인자가 없는 암시적 인스턴스화 `raise` 문은 단순히 자신이 말하는 것을 하지 않습니다. 즉, 명명된 객체를 발생시키지 않습니다.

`raise MyError`와 `raise MyError()`의 동등성은 클래스와 인스턴스를 혼동시켜 초보자에게 혼란의 원인이 될 수 있습니다. (더욱이, 인터프리터가 새로운 스타일 클래스와 그러한 클래스의 인스턴스를 구분할 수 있는지 불분명하므로, 암시적 인스턴스화는 예외가 새로운 스타일 객체가 되도록 하는 미래 계획에 장애물이 될 수 있습니다.)

요약하자면, 암시적 인스턴스화는 하위 호환성 외에는 어떠한 장점도 없으므로, 문자열 예외와 함께 단계적으로 제거되어야 합니다.

### 명세 (Specification)

`raise_stmt`의 문법은 다음과 같이 변경될 예정이었습니다:

**기존:**
`raise_stmt ::= "raise" [expression ["," expression ["," expression]]]`

**변경 제안:**
`raise_stmt ::= "raise" [expression ["," expression]]`

만약 어떠한 표현식도 존재하지 않으면, `raise` 문은 현재와 같이 동작합니다. 즉, 현재 스코프에서 활성화된 마지막 예외를 다시 발생시킵니다. 현재 스코프에서 활성화된 예외가 없으면 `TypeError`가 발생하여 문제가 있음을 나타냅니다.

그렇지 않으면, 첫 번째 표현식이 평가되어 발생된 객체(raised object)를 생성합니다. 그리고 두 번째 표현식이 존재하면 평가되어 대체된 트레이스백(substituted traceback)을 생성합니다. 두 번째 표현식이 없으면 대체된 트레이스백은 `None`입니다.

발생된 객체는 인스턴스여야 합니다. 인스턴스의 클래스는 예외 유형이고, 인스턴스 자체는 예외 값입니다. 만약 발생된 객체가 인스턴스가 아니라면(예를 들어, 클래스나 문자열이라면) `TypeError`가 발생합니다.

대체된 트레이스백이 `None`이 아니면, 그것은 트레이스백 객체여야 하며, 예외가 발생한 장소로 현재 위치 대신 대체됩니다. 만약 그것이 트레이스백 객체도 `None`도 아니라면, `TypeError`가 발생합니다.

### 하위 호환성 (Backwards Compatibility)

#### 마이그레이션 계획 (Migration Plan)

**Future Statement**

PEP 236의 `__future__` 문(future statement)에 따라:

```python
from __future__ import raise_with_two_args
```

`raise` 문의 문법과 의미론은 위에서 설명한 바와 같을 것입니다. 이 `future` 기능은 Python 2.4에 나타나고, Python 3.0에서 표준이 되는 것이 목표였습니다.

아래 예시에서 알 수 있듯이, 이 `future` 문은 `raise`에 트레이스백 인수를 제공하는 코드에만 필요하며, 단순한 예외 발생에는 필요하지 않습니다.

**경고 (Warnings)**

제안된 변경 사항에 따라 잘못될 `raise` 사용을 지적하기 위해 세 가지 새로운 경고(모두 `DeprecationWarning` 범주)가 발행될 예정이었습니다.

1.  첫 번째 경고는 `raise` 문이 실행될 때 첫 번째 표현식이 문자열로 평가될 때 발행됩니다.
    *   **메시지:** `raising strings will be impossible in the future`
2.  두 번째 경고는 `raise` 문이 실행될 때 첫 번째 표현식이 클래스로 평가될 때 발행됩니다.
    *   **메시지:** `raising classes will be impossible in the future`
3.  세 번째 경고는 세 개의 표현식을 가진 `raise` 문이 컴파일될 때 발행됩니다. (실행될 때가 아님에 유의해야 합니다. 이 경고가 예고하는 `SyntaxError`는 컴파일 시점에 발생하기 때문입니다.)
    *   **메시지:** `raising with three arguments will be impossible in the future`

이러한 경고는 Python 2.4에 나타나고, Python 3.0에서는 이러한 조건들이 단순히 오류가 되면서 사라질 예정이었습니다.

### 예시 (Examples)

#### 암시적 인스턴스화를 사용하는 코드 (Code Using Implicit Instantiation)

다음과 같은 코드는:

```python
class MyError(Exception): pass
raise MyError, 'spam'
```

`raise` 문이 실행될 때 경고를 발행합니다. `raise` 문은 명시적으로 인스턴스화하도록 변경되어야 합니다:

```python
raise MyError('spam')
```

#### 문자열 예외를 사용하는 코드 (Code Using String Exceptions)

다음과 같은 코드는:

```python
MyError = 'spam'
raise MyError, 'eggs'
```

`raise` 문이 실행될 때 경고를 발행합니다. 예외 유형은 클래스로 변경되어야 합니다:

```python
class MyError(Exception): pass
```

그리고 이전 예시와 같이, `raise` 문은 명시적으로 인스턴스화하도록 변경되어야 합니다:

```python
raise MyError('eggs')
```

#### 트레이스백 객체를 제공하는 코드 (Code Supplying a Traceback Object)

다음과 같은 코드는:

```python
raise MyError, 'spam', mytraceback
```

컴파일 시 경고를 발행합니다. 이 문장은 다음과 같이 변경되어야 합니다:

```python
raise MyError('spam'), mytraceback
```

그리고 모듈 상단에 `future` 문인 `from __future__ import raise_with_two_args`가 추가되어야 합니다. 이 `future` 문을 추가하면 다른 두 경고도 오류로 바뀌므로, 이전 예시에서 설명한 변경 사항도 적용해야 합니다.

`sys.exc_type, sys.exc_info, sys.exc_traceback`을 `raise`하는 특별한 경우(이전 예외를 다시 발생시키기 위한 목적)는 단순히 `raise`로 변경되어야 합니다.

### 계획의 실패 (A Failure of the Plan)

이 PEP의 전환 기간 동안, 문자열을 발생시키거나 암시적으로 인스턴스화하는 `raise` 문이 프로덕션이나 테스트에서 실행되지 않을 수 있습니다. 이 경우, 어떠한 경고도 발행하지 않다가 Python 3.0 또는 그 이후 버전에서 갑자기 실패할 수 있습니다. (실패는 의도된 예외 대신 `raise` 인수에 대한 불평을 하는 `TypeError`가 발생하여 잘못된 예외가 발생한다는 것입니다.)

이러한 경우는 전환 기간을 연장함으로써 줄일 수 있지만, 모든 `raise` 문에 대해 컴파일 시점에 경고를 발행하지 않는 한 불가능하게 만들 수는 없습니다.

### 거부 (Rejection)

이 PEP가 수용되었다면, 거의 모든 기존 Python 코드를 검토하고 아마도 수정해야 했을 것입니다. 명시적 인스턴스화의 모든 장점이 받아들여진다 하더라도, 명확성 향상은 수정 작업에 드는 비용과 그로 인해 발생할 수 있는 새로운 버그의 위험을 정당화하기에는 너무 미미합니다.

따라서 이 제안은 거부되었습니다.

문자열 예외는 이 제안과 별개로 제거될 예정이었음에 유의해야 합니다. 거부된 것은 암시적 예외 인스턴스화의 제거입니다.

### 논의 요약 (Summary of Discussion)

소수의 응답자들은 이 제안에 찬성했지만, 지배적인 반응은 그러한 마이그레이션은 예상되는 이점에 비해 비용이 너무 크다는 것이었습니다. 위에서 언급했듯이, 이 점만으로도 PEP를 거부하기에 충분했습니다.

#### 새로운 스타일의 예외 (New-Style Exceptions)

암시적 인스턴스화는 새로운 스타일 클래스의 인스턴스를 예외로 사용할 수 있도록 하는 미래 계획과 충돌할 수 있습니다. 암시적으로 인스턴스화할지 여부를 결정하기 위해 `raise` 메커니즘은 첫 번째 인수가 클래스인지 인스턴스인지 판단해야 합니다. 그러나 새로운 스타일 클래스에서는 명확하고 강력한 구분이 없습니다.

이 제안에 따르면 예외가 이미 인스턴스화되었을 것이므로 문제가 회피될 것입니다. 그러나 두 가지 타당한 대안 해결책이 있습니다:

1.  예외 유형이 `Exception`의 서브클래스여야 하며, `issubclass(firstarg, Exception)`일 때에만 암시적으로 인스턴스화하도록 요구합니다.
2.  `isinstance(firstarg, type)`일 때에만 암시적으로 인스턴스화합니다.

따라서 이 문제를 해결하기 위해 암시적 인스턴스화를 완전히 제거할 필요는 없습니다.

#### 명시적 인스턴스화의 불편함 (Ugliness of Explicit Instantiation)

일부 응답자들은 특히 예외 생성자에 인수가 제공되지 않는 경우(`raise TypeError()`) 명시적인 인스턴스화 구문이 더 보기에 좋지 않다고 느꼈습니다.

예외 인스턴스 자체에 관심이 없을 때, 즉 예외 유형만 관련될 때 문제는 특히 심각합니다:

```python
try:
    # ... deeply nested search loop ...
    raise Found
except Found:
    # ...
```

이러한 경우 `raise`와 `except` 사이의 대칭이 코드의 의도를 더 잘 표현할 수 있습니다.

Guido van Rossum은 단일 인수를 사용하는 경우에도 구두점이 적기 때문에 암시적 인스턴스화 구문이 "약간 더 예쁘다"는 의견을 제시했습니다.

#### 경고의 성능 저하 (Performance Penalty of Warnings)

`apply()` Deprecation 경험에 따르면 경고 프레임워크를 사용하면 상당한 성능 저하가 발생할 수 있습니다.

명시적으로 인스턴스화하는 코드는 영향을 받지 않습니다. 경고를 발행해야 하는지 여부를 결정하는 데 필요한 런타임 검사는 처음부터 암시적으로 인스턴스화해야 하는지 여부를 결정하는 데 필요한 검사와 정확히 동일하기 때문입니다. 즉, 그러한 문장들은 이미 이러한 검사 비용을 지불하고 있습니다.

암시적으로 인스턴스화하는 코드는 큰 비용을 발생시킬 것입니다. 타이밍 테스트에 따르면 경고를 발행하는 것(억제되든 아니든)은 단순히 예외를 인스턴스화하고, 발생시키고, 잡는 것보다 약 5배 더 많은 시간이 소요됩니다.

이러한 성능 저하는 `raise` 문이 성능에 중요한 실행 경로에 거의 없다는 사실로 완화됩니다.

#### 트레이스백 인자 (Traceback Argument)

제안된 내용에 따르면, 모든 Python 2.x 버전에서 트레이스백 인자를 편리하게 사용할 수 없게 될 것입니다.

2.4 미만 버전과의 호환성을 위해서는 세 개의 인자를 사용하는 형태를 사용해야 합니다. 그러나 이 형태는 2.4 이상 버전에서 경고를 발생시킵니다. 이러한 경고는 억제할 수 있지만, 관련 경고 유형이 컴파일 시점에 발행되기 때문에 불편합니다.

만약 이 PEP가 계속 고려 중이었다면, 이 반대는 전환 기간을 연장함으로써 해결되었을 것입니다. 예를 들어, 경고는 3.0에서 처음 발행되고, 이후 릴리스에서 오류가 될 수 있었습니다.

### 참고 (References)

*   "Standard Exception Classes in Python 1.5", Guido van Rossum. [http://www.python.org/doc/essays/stdexceptions.html](http://www.python.org/doc/essays/stdexceptions.html)
*   "Python Language Reference", Guido van Rossum. [http://docs.python.org/reference/simple_stmts.html#raise](http://docs.python.org/reference/simple_stmts.html#raise)
*   Guido van Rossum, 2003년 6월 11일 python-dev 게시물. [https://mail.python.org/pipermail/python-dev/2003-June/036176.html](https://mail.python.org/pipermail/python-dev/2003-June/036176.html)

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.