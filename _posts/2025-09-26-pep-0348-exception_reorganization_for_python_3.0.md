---
title: "[Rejected] PEP 348 - Exception Reorganization for Python 3.0"
excerpt: "Python Enhancement Proposal 348: 'Exception Reorganization for Python 3.0'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/348/
toc: true
toc_sticky: true
date: 2025-09-26 18:56:58+0900
last_modified_at: 2025-09-26 18:56:58+0900
published: true
---
> **원문 링크:** [PEP 348 - Exception Reorganization for Python 3.0](https://peps.python.org/pep-0348/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 28-Jul-2005


# PEP 348 – Python 3.0을 위한 예외 재구성 (반려됨)

*   **작성자:** Brett Cannon <brett at python.org>
*   **상태:** 반려됨 (Rejected)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2005년 7월 28일

## 개요 (Abstract)

Python 2.4 버전 기준으로, 내장(built-in) 네임스페이스에는 꽤 얕은 계층 구조로 38개의 예외(경고 포함)가 존재합니다. 이 클래스들은 오랜 기간 동안 경험을 통해 배우고 개선할 기회 없이 생겨났습니다. 이 PEP는 하위 호환성(backwards-compatibility)이 크게 문제되지 않는 Python 3.0을 위해 예외 계층 구조의 재구성을 제안했습니다.

이 재구성 제안과 함께, `raise` 문에 전달되는 모든 객체가 특정 슈퍼클래스를 상속해야 한다는 요구사항이 추가되었습니다. 이는 예외의 기본적인 인터페이스에 대한 보장을 제공하고, 예외의 자연스러운 계층 구조를 더욱 강화하기 위함입니다.

마지막으로, `bare except` 절(인수 없는 `except` 절)은 의미론적으로 `except Exception`과 동일하게 변경될 것을 제안했습니다. 대부분의 사람들이 현재 `bare except` 절을 이 목적으로 사용하고 있으며, 예외 계층 구조 재구성을 통해 이것이 실행 가능한 기본값이 될 수 있다고 보았습니다.

## 변경 필요성 (Rationale For Wanting Change)

예외는 Python의 중요한 부분입니다. 전통적으로 프로그램의 오류를 알리는 데 사용되지만, 이터레이터(iterator)와 같은 흐름 제어(flow control)에도 활용되어 왔습니다.

예외의 중요성에도 불구하고, 구조가 부족합니다. 이는 어떤 객체든 예외로 `raise` 될 수 있다는 사실에서 기인합니다. 이로 인해 어떤 종류의 객체가 `raise` 될지 보장할 수 없으므로, `raise` 된 객체가 따를 수 있는 계층 구조를 파괴합니다.

그러나 예외는 심각도를 나타내는 계층 구조를 가지고 있습니다. 이 계층 구조는 관련 예외를 함께 그룹화하여 `except` 절에서 예외를 처리하는 것을 단순화합니다. 사람들이 이 계층 구조에 의존할 수 있도록, 모든 `raise` 객체가 상속해야 하는 공통 슈퍼클래스가 제안되었습니다. 이는 `raise` 된 객체의 인터페이스에 대한 보장을 가능하게 합니다 (PEP 344 참조). 이에 대한 논의는 python-dev에서 이전에 이루어졌습니다.

현재 `bare except` 절은 모든 예외를 잡습니다. 이는 편리할 수 있지만, 일반적인 경우에는 너무 광범위합니다. 필수 슈퍼클래스를 가짐으로써 모든 예외를 잡는 것이 특정 예외 하나를 잡는 것만큼 쉬워집니다. 이는 `bare except` 절이 더 유용한 목적으로 사용될 수 있도록 합니다. 이 또한 python-dev에서 논의된 바 있습니다.

마지막으로, 예외 계층 구조에 대한 약간의 변경은 구조적인 측면에서 훨씬 더 합리적일 것입니다. 일반적으로 잡히지 않아야 하는 예외들을 미세하게 재배열함으로써, 실행 스택의 최상단으로 전파되어 의도한 대로 인터프리터(interpreter)를 종료시킬 수 있습니다.

## 재구성 철학 (Philosophy of Reorganization)

계층 구조 재구성을 위해, 이 PEP의 초기 초안 논의에서 발전된 일반적인 철학이 따랐습니다. 첫째, 작동하는 것을 망가뜨리지 않는 것이 가장 중요했습니다. 이는 이름이 심각하게 나쁘다고 판단되지 않는 한 예외 이름을 바꾸는 것은 고려 대상이 아니라는 것을 의미합니다. 또한, 예외가 진정으로 잘못 배치되었다고 간주되지 않는 한 예외를 제거하지 않는다는 것을 의미했습니다. 새로운 예외의 도입은 오직 특정 범주의 예외에 대한 슈퍼클래스를 잡는 데 유용할 수 있는 상황에서만 이루어졌습니다. 마지막으로, 기존 예외의 상속 트리는 처음부터 진정으로 잘못 배치되었다고 느껴질 경우에만 변경되었습니다.

모든 새로운 예외에 대해 적절한 접미사(suffix)를 선택해야 했습니다. 오류를 알리는 예외에는 "Error"를 사용합니다. 예외가 경고인 경우에는 "Warning"을 사용합니다. 다른 접미사가 적절하지 않고 특정 접미사가 더 잘 맞지 않는 경우에는 "Exception"을 사용합니다.

그 다음으로는 어떤 예외가 `Exception`을 상속해야 하고 어떤 예외가 상속하지 않아야 하는지를 선택하는 문제였습니다. 이는 `bare except` 절을 더 유용하게 만들기 위함이었습니다.

마지막으로, 기존의 전체 계층 구조는 모든 예외가 상속해야 하는 필수 슈퍼클래스로서 작동하도록 의도된 새로운 예외를 상속해야 했습니다.

## 새로운 계층 구조 (New Hierarchy)

**참고:** "더 엄격한 상속(stricter inheritance)"으로 표시된 예외는 더 이상 특정 클래스를 상속하지 않습니다. "더 넓은 상속(broader inheritance)" 플래그는 해당 예외의 상속 트리에 클래스가 추가되었음을 의미합니다. 모든 비교는 Python 2.4의 예외 계층 구조를 기준으로 합니다.

```
+-- BaseException (new; broader inheritance for subclasses)
    +-- Exception
        +-- GeneratorExit (defined in PEP 342)
        +-- StandardError
            +-- ArithmeticError
                +-- DivideByZeroError
                +-- FloatingPointError
                +-- OverflowError
            +-- AssertionError
            +-- AttributeError
            +-- EnvironmentError
                +-- IOError
                +-- EOFError
                +-- OSError
            +-- ImportError
            +-- LookupError
                +-- IndexError
                +-- KeyError
            +-- MemoryError
            +-- NameError
                +-- UnboundLocalError
            +-- NotImplementedError (stricter inheritance)
            +-- SyntaxError
                +-- IndentationError
                    +-- TabError
            +-- TypeError
            +-- RuntimeError
            +-- UnicodeError
                +-- UnicodeDecodeError
                +-- UnicodeEncodeError
                +-- UnicodeTranslateError
            +-- ValueError
        +-- ReferenceError
        +-- StopIteration
        +-- SystemError
        +-- Warning
            +-- DeprecationWarning
            +-- FutureWarning
            +-- PendingDeprecationWarning
            +-- RuntimeWarning
            +-- SyntaxWarning
            +-- UserWarning
        +-- WindowsError
    +-- KeyboardInterrupt (stricter inheritance)
    +-- SystemExit (stricter inheritance)
```


## Python 2.4와의 차이점 (Differences Compared to Python 2.4)

상속 변경을 논의할 때는 용어에 대한 더 철저한 설명이 필요합니다. 상속 변경은 "더 넓은(broader)" 상속 또는 "더 엄격한(stricter)" 상속을 초래합니다. "더 넓은" 상속은 클래스가 `cls, A`와 같은 상속 트리를 가지고 있다가 `cls, B, A`가 되는 경우입니다. "더 엄격한" 상속은 그 반대입니다.

### `BaseException`

모든 예외가 상속해야 하는 슈퍼클래스입니다. 이름은 예외 계층 구조의 기반이면서 그 자체로 예외라는 것을 반영하여 선택되었습니다. "Raisable"이라는 이름도 고려되었으나, 그 이름이 그 자체로 예외라는 사실을 제대로 반영하지 못하여 채택되지 않았습니다.

`BaseException`을 직접 상속하는 것은 예상되지 않으며, 일반적인 경우에는 권장되지 않습니다. 대부분의 사용자 정의 예외는 대신 `Exception`을 상속해야 합니다. 이는 `Exception`을 잡음으로써 일반적으로 잡아야 하는 모든 예외를 계속해서 잡을 수 있도록 합니다. `BaseException`의 직접 상속은 완전히 새로운 범주의 예외가 필요한 경우에만 수행되어야 합니다.

그러나 모든 예외를 맹목적으로 잡아야 하는 경우에는 `except BaseException`이 작동할 것입니다.

### `KeyboardInterrupt` 및 `SystemExit`

두 예외 모두 더 이상 `Exception` 아래에 있지 않습니다. 이는 `bare except` 절이 `Exception`을 상속하는 예외를 잡음으로써 더 유용한 기본값으로 작동하도록 하기 위함입니다. `KeyboardInterrupt`와 `SystemExit` 모두 인터프리터가 종료될 것으로 예상된다는 신호 역할을 하므로, 일반적인 경우에 이들을 잡는 것은 잘못된 의미론(semantics)입니다.

### `NotImplementedError`

`RuntimeError` 대신 `Exception`을 상속합니다. 원래 `RuntimeError`를 상속했지만, `NotImplementedError`는 사용자 코드에서 빠르고 간단한 예외로 사용하기 위한 예외와 직접적인 관련이 없습니다. 따라서 이제 `Exception`을 직접 상속합니다.

## `raise` 문에 필요한 슈퍼클래스 (Required Superclass for raise)

`raise` 문에 전달되는 모든 객체가 특정 슈퍼클래스를 상속하도록 요구함으로써, 모든 예외가 특정 속성(attribute)을 가질 것이 보장됩니다. PEP 344가 승인되면, 거기에 명시된 속성들이 모든 `raise` 된 예외에 존재할 것이 보장됩니다. 이는 예외로부터 정보를 쿼리하는 것을 훨씬 쉽게 만들어 디버깅을 용이하게 할 것입니다.

제안된 계층 구조에서 `BaseException`이 필수 기본 클래스입니다.

### 구현 (Implementation)

강제는 간단합니다. `RAISE_VARARGS`를 수정하여 예외를 `raise`하기 전에 먼저 상속 검사를 수행하는 것으로 충분합니다. C API의 경우, 예외를 설정하는 모든 함수에 동일한 상속 검사가 적용됩니다.

## `bare except` 절이 `Exception`을 잡도록 변경 (Bare except Clauses Catch Exception)

대부분의 기존 Python 2.4 코드에서 `bare except` 절은 잡는 예외가 너무 광범위합니다. 일반적으로 오류를 알리는 예외만 잡는 것이 바람직합니다. 이는 인터프리터 종료를 의미하는 예외는 일반적인 경우에 잡히지 않아야 한다는 것을 의미합니다.

`KeyboardInterrupt`와 `SystemExit`가 `Exception` 대신 `BaseException`을 상속하도록 이동됨으로써, `bare except` 절을 `except Exception`과 동일하게 작동하도록 변경하는 것이 훨씬 더 합리적인 기본값이 됩니다. 이 변경은 대부분의 사람들이 `bare except` 절에 대해 원하는 의미론이므로, 코드를 거의 망가뜨리지 않을 것입니다.

`bare except` 절을 완전히 제거해야 한다는 주장이 제기되기도 했습니다. Zen of Python에 명시된 "Only One Way To Do It (OOWTDI)"와 "Explicit Is Better Than Implicit (EIBTI)"를 위반한다는 주장이었습니다. 그러나 Zen of Python에 있는 "Practicality Beats Purity (PBP)"가 이 경우에는 이 두 가지를 능가합니다. BDFL(자비로운 종신 독재자)은 `bare except` 절이 이러한 방식으로 작동할 것이라고 밝혔습니다.

### 구현 (Implementation)

컴파일러(compiler)는 `bare except` 절이 도달할 때마다 `except Exception`에 대한 바이트코드(bytecode)를 내보낼 것입니다.

## 전환 계획 (Transition Plan)

이 PEP에서 계획된 모든 기능을 추가하는 데 필요한 복잡성과 혼란 때문에 전환 계획은 매우 간단합니다. Python 2.5에서는 `BaseException`이 추가됩니다. Python 3.0에서는 나머지 모든 기능(필수 슈퍼클래스, 상속 변경, `bare except` 절이 `except Exception`과 동일하게 되는 것)이 적용될 것입니다. Python 2.5에서 이 모든 것을 하위 호환 가능한 방식으로 작동하게 하려면 예외 메커니즘에 매우 깊은 해킹이 필요하며, 이는 오류 발생 가능성이 있고 적은 이점에도 불구하고 성능 저하를 초래할 수 있습니다.

전환을 돕기 위해, 문서가 몇 가지 프로그래밍 지침을 반영하도록 변경될 것입니다:
*   모든 예외를 잡으려면 `BaseException`을 잡습니다.
*   인터프리터 종료를 나타내지 않는 모든 예외를 잡으려면 `Exception`을 명시적으로 잡습니다.
*   `KeyboardInterrupt`와 `SystemExit`를 명시적으로 잡습니다. `Exception`으로부터의 상속에 의존하여 이들이 잡히도록 하지 마세요.
*   `RuntimeError`로부터의 상속에 의존하는 대신 `NotImplementedError`를 항상 명시적으로 잡습니다.

'exceptions' 모듈 문서, 튜토리얼, 그리고 PEP 290 모두 업데이트가 필요할 것입니다.

## 반려된 아이디어 (Rejected Ideas)

### `DeprecationWarning`이 `PendingDeprecationWarning`을 상속

원래 `DeprecationWarning`이 다음 버전에서 제거될 `PendingDeprecationWarning`으로 간주될 수 있기 때문에 제안되었습니다. 그러나 충분한 사람들이 상속이 논리적으로 반대로 작동할 수 있다고 생각했기 때문에 이 아이디어는 철회되었습니다.

### `AttributeError`가 `TypeError` 또는 `NameError`를 상속

속성을 타입(type) 인터페이스의 일부로 보는 관점은 `TypeError`를 상속하는 아이디어를 낳았습니다. 그러나 이는 덕 타이핑(duck typing)의 사고방식을 부분적으로 무효화하므로 아이디어는 철회되었습니다.

`NameError`를 상속하는 것은 객체가 속성이 존재하는 자체 네임스페이스를 가지고 있으며, 속성을 찾을 수 없을 때 네임스페이스 오류라는 관점에서 제안되었습니다. 이 또한 모든 사람이 이 견해를 공유하지 않았기 때문에 가능성에서 제외되었습니다.

### `EnvironmentError` 제거

`EnvironmentError`가 불필요한 구별이라는 아이디어에 기반하여 원래 제안되었으나, BDFL이 이 아이디어를 기각했습니다.

### `MacError` 및 `UnixError` 도입

`WindowsError`와의 대칭성을 위해 추가가 제안되었으나, BDFL은 이들이 충분히 사용되지 않을 것이라고 말했습니다. 이후 `WindowsError`를 제거하는 아이디어가 제안되었고 합리적이라고 받아들여져, 이 예외들을 추가하는 아이디어를 완전히 무효화했습니다.

### `SystemError`가 `SystemExit`를 서브클래싱

`SystemError`가 시스템 종료로 이어지도록 의도되었기 때문에 제안되었으나, `CriticalError`가 이를 더 잘 나타낸다는 이유로 아이디어는 철회되었습니다.

### `ControlFlowException`이 `Exception` 아래에 위치

`ControlFlowException`이 `Exception`을 상속해야 한다는 제안이 있었습니다. 이 아이디어는 흐름 제어 예외가 일반적으로 단일 `except` 절에 의해 모두 잡힐 필요가 없다는 생각에 기반하여 반려되었습니다.

### `NameError`를 `NamespaceError`로 이름 변경

`NameError`가 더 간결하며, "Namespace"의 대문자 표기를 잘못 입력할 가능성을 남기지 않는다고 간주되었습니다.

### `RuntimeError` 이름 변경 또는 `SimpleError` 도입

`RuntimeError`가 새로운 예외 생성을 필요로 하지 않는 상황에서 사용되는 예외에 대한 명확한 이름이 아니라는 생각이 있었습니다. 이름 변경은 예외가 이미 인터프리터 전체에서 사용되고 있다는 이유로 반려되었습니다. `SimpleError`의 거부는 사람들이 자신이 선택하는 어떤 예외든 자유롭게 사용해야 하며, 너무 노골적으로 하나를 제안해서는 안 된다는 생각에 근거했습니다.

### 기존 예외 이름 변경

다양한 이름 변경이 제안되었지만, `ReferenceError`를 `WeakReferenceError`로 바꾸는 것 외에는 +0표 이상을 얻지 못했습니다. 기존 이름이 괜찮았고 아무도 이에 대해 적극적으로 불평한 적이 없다는 생각이 있었습니다. 하위 호환성 문제를 최소화하고 기존 Python 프로그래머에게 추가적인 어려움을 주지 않기 위해 이름 변경은 철회되었습니다.

### `EOFError`가 `IOError`를 서브클래싱

원래 `EOFError`가 I/O와 직접 관련이 있으므로 `IOError`를 서브클래싱해야 한다는 생각이었습니다. 그러나 `EOFError`는 (I/O 포트의 소진과 같은) 이벤트가 발생했음을 알리는 신호로 더 많이 사용되므로, 그렇게 특정 오류 예외를 서브클래싱해서는 안 됩니다.

### `MemoryError`와 `SystemError`가 공통 슈퍼클래스를 가짐

두 클래스 모두 인터프리터와 관련이 있으므로 공통 슈퍼클래스를 갖게 하는 것이 어떻겠냐는 제안이 있었습니다. 그러나 둘 중 하나는 인터프리터가 복구할 수 없는 상태에 있다는 것을 의미하는 반면, 다른 하나는 그렇지 않기 때문에 반려되었습니다.

### `PendingDeprecationWarning`과 `DeprecationWarning`의 공통 슈퍼클래스

경고 예외를 함께 그룹화하는 것은 직관적으로 말이 됩니다. 그러나 이러한 이성적인 아이디어는 두 경고가 얼마나 드물게 사용되는지, 심지어 동시에 사용되는지 고려할 때 잘 확장되지 않습니다.

### `WindowsError` 제거

원래는 이러한 플랫폼별 예외가 내장 네임스페이스에 있어서는 안 된다는 생각에 기반하여 제안되었습니다. 그러나 실제로 이 예외를 사용하는 충분한 코드가 존재하여 유지할 가치가 있는 것으로 밝혀졌습니다.

### `KeyboardInterrupt`와 `SystemExit`의 슈퍼클래스

`Exception`을 상속하지 않는 예외를 더 쉽게 잡고 새로운 계층 구조로의 전환을 용이하게 하기 위해 제안되었으나, BDFL에 의해 반려되었습니다. 기존 코드에서 이 두 예외가 함께 잡히는 경우가 충분히 나타나지 않아 내장 네임스페이스를 복잡하게 만들 정당성이 없다는 주장이 사용되었습니다.

## 감사의 말 (Acknowledgements)

Robert Brewer, Josiah Carlson, Alyssa Coghlan, Timothy Delaney, Jack Diedrich, Fred L. Drake, Jr., Philip J. Eby, Greg Ewing, James Y. Knight, MA Lemburg, Guido van Rossum, Stephen J. Turnbull, Raymond Hettinger, 그리고 논의에 참여했지만 제가 빠뜨린 모든 분들께 감사드립니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.