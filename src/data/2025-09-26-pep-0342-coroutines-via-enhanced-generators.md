---
title: "[Final] PEP 342 - Coroutines via Enhanced Generators"
excerpt: "Python Enhancement Proposal 342: 'Coroutines via Enhanced Generators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/342/
toc: true
toc_sticky: true
date: 2025-09-26 18:48:58+0900
last_modified_at: 2025-09-26 18:48:58+0900
published: true
---
> **원문 링크:** [PEP 342 - Coroutines via Enhanced Generators](https://peps.python.org/pep-0342/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 10-May-2005


## PEP 342: Enhanced Generators를 통한 코루틴 (Coroutines via Enhanced Generators)

### 서론 (Introduction)

이 PEP는 제너레이터(generator)를 간단한 코루틴(coroutine)으로 사용할 수 있도록 제너레이터의 API 및 문법에 대한 몇 가지 개선 사항을 제안합니다. 이 제안은 PEP 288 ("Generator Attributes and Exceptions") 및 PEP 325 ("Resource-Release Support for Generators")의 아이디어를 통합한 것입니다. 특히, PEP 288의 제너레이터 예외 처리 부분( `throw()` 메서드 이름 포함)과 PEP 325의 리소스 해제 지원 개념을 개선하여 실제 구현에 적합하도록 만들었습니다.

### 동기 (Motivation)

코루틴은 시뮬레이션, 게임, 비동기 I/O, 이벤트 기반 프로그래밍, 협동 멀티태스킹과 같은 다양한 알고리즘을 표현하는 자연스러운 방법입니다. Python의 제너레이터 함수는 실행을 일시 중지하여 값을 생성할 수 있다는 점에서 거의 코루틴과 유사하지만, 실행 재개 시 값이나 예외를 전달할 수 없다는 한계가 있었습니다. 또한, `try/finally` 블록의 `try` 부분 내에서 실행을 일시 중지할 수 없어, 중단된 코루틴이 자체적으로 정리(cleanup)하기 어려웠습니다.

이러한 제약으로 인해 비동기 통신과 같은 간단한 사용 사례 구현도 복잡해졌습니다. 제너레이터가 일시 중지된 지점에서 값이나 예외를 전달할 수 있게 되면, 간단한 코루틴 스케줄러(scheduler)나 트램폴린(trampoline) 함수를 통해 코루틴들이 서로를 블로킹(blocking)하지 않고 호출할 수 있게 되어 비동기 애플리케이션에 큰 도움이 될 것입니다. 예를 들어, `data = (yield nonblocking_read(my_socket, nbytes))`와 같이 논블로킹(non-blocking) 소켓 I/O를 수행하는 코루틴을 작성하여 데이터가 전송되거나 사용 가능해질 때까지 실행을 일시 중지할 수 있게 됩니다.

이러한 개선 사항은 언어와 제너레이터-이터레이터(generator-iterator) 타입 구현에 상대적으로 적은 변경으로, 애플리케이션 전체를 콜백(callback)의 연속으로 작성하거나 수백, 수천 개의 협동 멀티태스킹(co-operatively multitasking) 유사 스레드(pseudothreads)를 위해 자원 집약적인 스레드를 사용할 필요 없이 비동기 작업을 지원할 수 있게 합니다. 이는 Stackless Python의 많은 이점을 CPython 코어에 큰 수정 없이 표준 Python에 제공합니다.

### 사양 요약 (Specification Summary)

제너레이터-이터레이터 타입에 몇 가지 간단한 메서드를 추가하고 두 가지 사소한 문법 조정을 통해 Python 개발자는 제너레이터 함수를 사용하여 코루틴 및 다른 형태의 협동 멀티태스킹을 구현할 수 있게 됩니다.

주요 변경 사항 및 추가 사항은 다음과 같습니다.

*   **`yield`의 재정의** : `yield`를 문장(statement)이 아닌 표현식(expression)으로 재정의합니다. 현재의 `yield` 문장은 값이 버려지는 `yield` 표현식이 됩니다. `next()` 호출로 제너레이터가 재개될 때 `yield` 표현식의 값은 항상 `None`입니다.
*   **새로운 `send()` 메서드** : 제너레이터-이터레이터에 새로운 `send(value)` 메서드를 추가합니다. 이 메서드는 제너레이터를 재개하고, 현재 `yield` 표현식의 결과가 되는 값을 전달합니다. `send()`는 제너레이터가 다음에 yield하는 값을 반환하거나, 다른 값을 yield하지 않고 제너레이터가 종료되면 `StopIteration`을 발생시킵니다.
*   **새로운 `throw()` 메서드** : 제너레이터-이터레이터에 새로운 `throw(type, value=None, traceback=None)` 메서드를 추가합니다. 이 메서드는 제너레이터가 일시 중지된 지점에서 예외를 발생시키고, 제너레이터가 다음에 yield하는 값을 반환하거나, 제너레이터가 종료되면 `StopIteration`을 발생시킵니다.
*   **새로운 `close()` 메서드** : 제너레이터-이터레이터에 `close()` 메서드를 추가합니다. 이 메서드는 제너레이터가 일시 중지된 지점에서 `GeneratorExit` 예외를 발생시킵니다.
*   **새로운 `__del__()` 메서드** : 제너레이터-이터레이터가 가비지 컬렉션(garbage-collected)될 때 `close()`가 호출되도록 지원을 추가합니다.
*   **`try/finally` 내 `yield` 허용** : 가비지 컬렉션이나 명시적인 `close()` 호출 시 `finally` 절이 실행될 수 있도록 `try/finally` 블록 내에서 `yield`를 사용할 수 있도록 합니다.

### 사양: 제너레이터로 값 보내기 (Specification: Sending Values into Generators)

#### 새로운 제너레이터 메서드: `send(value)`

제너레이터-이터레이터를 위한 새로운 메서드 `send()`가 제안됩니다. 이 메서드는 하나의 인자(value)를 받으며, 이 값은 제너레이터로 전달됩니다. `send(None)`을 호출하는 것은 제너레이터의 `next()` 메서드를 호출하는 것과 완전히 동일합니다. 다른 값을 사용하여 `send()`를 호출하는 것도 동일하지만, 제너레이터의 현재 `yield` 표현식이 생성하는 값이 달라집니다.

제너레이터-이터레이터는 제너레이터 함수 본문의 시작 부분에서 실행되기 때문에, 제너레이터가 막 생성되었을 때는 값을 받을 `yield` 표현식이 없습니다. 따라서 제너레이터 이터레이터가 막 시작되었을 때 `None`이 아닌 인자로 `send()`를 호출하는 것은 금지되며, 이 경우 `TypeError`가 발생합니다. 즉, 코루틴과 통신하기 전에 `next()` 또는 `send(None)`을 먼저 호출하여 실행을 첫 번째 `yield` 표현식까지 진행시켜야 합니다.

`next()` 메서드와 마찬가지로, `send()` 메서드는 제너레이터-이터레이터가 다음에 yield하는 값을 반환하거나, 제너레이터가 정상적으로 종료되거나 이미 종료된 경우 `StopIteration`을 발생시킵니다. 제너레이터가 처리되지 않은 예외를 발생시키면, 해당 예외는 `send()`의 호출자에게 전파됩니다.

#### 새로운 문법: `Yield Expressions`

`yield` 문(yield-statement)은 이제 할당(assignment)의 오른쪽에 사용될 수 있으며, 이 경우 `yield` 표현식(yield-expression)이라고 불립니다. 이 `yield` 표현식의 값은 `send()`가 `None`이 아닌 인자로 호출되지 않는 한 `None`입니다.

`yield` 표현식은 할당의 오른쪽 최상위 표현식(top-level expression)으로 사용될 때를 제외하고는 항상 괄호로 묶어야 합니다.

예시:
```python
x = yield 42
x = yield
x = 12 + (yield 42)
x = 12 + (yield)
foo(yield 42)
foo(yield)
```
위 코드는 모두 유효합니다. 그러나 다음은 유효하지 않습니다.
```python
x = 12 + yield 42
x = 12 + yield
foo(yield 42, 12)
foo(yield, 12)
```
표현식 없는 `yield` 문 또는 `yield` 표현식(`yield`는 `yield None`과 동일)도 이제 유효합니다.

`send(value)`가 호출되면, 재개되는 `yield` 표현식은 전달된 값을 반환합니다. `next()`가 호출되면, 재개되는 `yield` 표현식은 `None`을 반환합니다. `yield` 표현식이 `yield` 문인 경우, 이 반환 값은 함수 호출이 문으로 사용될 때 반환 값이 무시되는 것과 유사하게 무시됩니다.

사실상 `yield` 표현식은 역전된 함수 호출과 같습니다. `yield`에 전달된 인수는 현재 실행 중인 함수에서 실제로 반환(yield)되고, `yield`의 반환 값은 `send()`를 통해 전달된 인수입니다.

### 사양: 예외 및 정리 (Specification: Exceptions and Cleanup)

제너레이터 객체는 제너레이터 함수를 호출하여 생성된 이터레이터를 의미합니다.

#### 새로운 문법: `try-finally` 내 `yield` 허용

제너레이터 함수의 문법이 확장되어 `try-finally` 문 내에서 `yield` 문을 사용할 수 있게 됩니다.

#### 새로운 제너레이터 메서드: `throw(type, value=None, traceback=None)`

`g.throw(type, value, traceback)`은 제너레이터 `g`가 현재 일시 중지된 지점(즉, `yield` 문 또는 `next()`가 아직 호출되지 않은 함수 본문 시작)에서 지정된 예외를 발생시킵니다. 제너레이터가 예외를 catch하고 다른 값을 yield하면, 그 값이 `g.throw()`의 반환 값이 됩니다. 예외를 catch하지 않으면, `throw()`는 전달된 것과 동일한 예외를 발생시키는 것처럼 보입니다. 제너레이터가 다른 예외를 발생시키면 (이는 반환 시 생성되는 `StopIteration` 포함), 해당 예외는 `throw()` 호출에 의해 발생됩니다. 요약하자면, `throw()`는 `next()` 또는 `send()`와 유사하게 동작하지만, 일시 중지 지점에서 예외를 발생시킵니다. 제너레이터가 이미 닫힌 상태인 경우, `throw()`는 제너레이터 코드를 실행하지 않고 전달된 예외를 단순히 발생시킵니다.

예외를 발생시키는 효과는 마치 일시 중지 지점에서 `raise type, value, traceback` 문이 실행된 것과 완전히 동일합니다. `type` 인자는 `None`이 아니어야 하며, `type`과 `value`는 호환되어야 합니다. `value`가 `type`의 인스턴스가 아닌 경우, `raise` 문이 예외 인스턴스를 생성하는 것과 동일한 규칙에 따라 `value`를 사용하여 새 예외 인스턴스가 생성됩니다. `traceback`이 제공되면 유효한 Python 트레이스백(traceback) 객체여야 하며, 그렇지 않으면 `TypeError`가 발생합니다.

`throw()` 메서드 이름은 `raise`가 키워드이기 때문에 사용할 수 없고, `throw()`는 예외를 다른 위치(제너레이터 내부)에 "던지는" 느낌을 주기 때문에 선택되었습니다.

#### 새로운 표준 예외: `GeneratorExit`

`Exception`을 상속하는 새로운 표준 예외 `GeneratorExit`가 정의됩니다. 제너레이터는 이 예외를 다시 발생시키거나(또는 단순히 catch하지 않거나) `StopIteration`을 발생시킴으로써 처리해야 합니다.

#### 새로운 제너레이터 메서드: `close()`

`g.close()`는 다음과 같은 유사 코드(pseudo-code)로 정의됩니다.

```python
def close(self):
    try:
        self.throw(GeneratorExit)
    except (GeneratorExit, StopIteration):
        pass
    else:
        raise RuntimeError("generator ignored GeneratorExit")
    # Other exceptions are not caught
```
`close()`는 제너레이터가 이미 예외나 정상적인 종료로 인해 종료된 경우 아무 작업도 하지 않습니다.

#### 새로운 제너레이터 메서드: `__del__()`

`g.__del__()`은 `g.close()`의 래퍼(wrapper)입니다. 이 메서드는 제너레이터 객체가 가비지 컬렉션될 때 (CPython에서는 참조 횟수가 0이 될 때) 호출됩니다. `close()`가 예외를 발생시키면, 해당 예외에 대한 트레이스백이 `sys.stderr`로 출력되고 더 이상 무시됩니다. 이는 클래스 인스턴스의 `__del__()` 메서드에서 예외를 처리하는 방식과 일치합니다.

제너레이터 객체가 순환 참조(cycle)에 참여하는 경우, `g.__del__()`이 호출되지 않을 수 있습니다. 이는 CPython의 현재 가비지 컬렉터의 동작입니다. 하지만 실제로는 제너레이터 객체가 순환 참조에 참여하는 경우는 드뭅니다.

### 선택적 확장 (Optional Extensions)

#### 확장된 `continue` 문 (The Extended continue Statement)

이 PEP의 초기 초안에서는 `for` 루프에서 사용될 새로운 `continue EXPR` 문법(PEP 340에서 계승)을 제안했지만, 이 기능은 현재 보류되었습니다. 이 PEP의 범위가 제너레이터-이터레이터로 값을 전달하는 것에만 초점을 맞추도록 좁혀졌기 때문입니다.

### 열린 문제 (Open Issues)

`close()`가 `GeneratorExit` 예외에 대한 응답으로 제너레이터가 다른 값을 yield할 때 어떤 예외를 발생시켜야 하는지에 대한 논의가 있었습니다. 처음에는 `TypeError`가 제안되었으나, `PEP 343`의 `with_template` 데코레이터 클래스가 유사한 상황에서 `RuntimeError`를 사용하는 것을 고려하여 `RuntimeError`를 발생시키는 것이 더 적합하다고 결론지었습니다. 이는 프로그래머가 코드를 수정하도록 유도하는 추적(traceback)을 남기는 데 목적이 있습니다.

`send()` 메서드를 `feed()`로 이름을 변경하자는 제안도 있었으나, `send()`와 `feed()`의 의미론적 차이(특히 `send()`는 막 시작된 제너레이터에서는 의미 있게 호출될 수 없음) 때문에 채택되지 않았습니다. 대신, 제너레이터 함수를 컨슈머(consumer) 인터페이스에 맞게 래핑하는 간단한 데코레이터를 만드는 것이 더 유용할 것이라고 판단했습니다.

### 예시 (Examples)

PEP 342는 `consumer` 데코레이터, 이미지 처리 파이프라인(thumbnail_pager, jpeg_writer), 간단한 코루틴 스케줄러(Trampoline 클래스), 그리고 에코 서버(echo_handler, listen_on) 등 다양한 예시 코드를 제공하여 강화된 제너레이터와 코루틴의 활용법을 보여줍니다. 이 예시들은 비동기 작업을 콜백이나 자원 집약적인 스레드 없이 효율적으로 처리하는 방법을 시연합니다.

### 참조 구현 (Reference Implementation)

이 PEP에 설명된 모든 기능을 구현하는 프로토타입 패치(SourceForge patch #1223381)가 제공되었으며, 2005년 8월 1-2일에 CVS에 커밋되었습니다.

### 요약

PEP 342는 Python의 제너레이터를 강화하여 코루틴 기능을 도입함으로써 비동기 프로그래밍의 효율성을 크게 향상시켰습니다. `send()`, `throw()`, `close()`, `__del__()` 메서드와 `yield` 표현식의 도입은 제너레이터가 값과 예외를 주고받으며 협동 멀티태스킹을 수행할 수 있게 했습니다. 이를 통해 개발자들은 콜백이나 스레드 없이 복잡한 비동기 로직을 더 직관적이고 효율적으로 작성할 수 있게 되었으며, Stackless Python과 같은 특정 구현의 이점을 표준 Python에서 누릴 수 있게 되었습니다.## PEP 342 – Enhanced Generators를 통한 코루틴 (Coroutines via Enhanced Generators)

### 서론 (Introduction)
이 PEP(Python Enhancement Proposal)는 제너레이터(generator)를 간단한 코루틴(coroutine)으로 활용할 수 있도록 제너레이터의 API와 문법을 개선하는 내용을 제안합니다. 이는 PEP 288과 PEP 325의 아이디어를 통합하여 제너레이터의 예외 처리 및 리소스 해제 지원을 강화한 것입니다.

### 동기 (Motivation)
코루틴은 시뮬레이션, 게임, 비동기 I/O 등 이벤트 기반 프로그래밍이나 협동 멀티태스킹(co-operative multitasking)에서 알고리즘을 표현하는 데 유용합니다. 기존 Python 제너레이터는 값을 `yield`하여 실행을 일시 중지할 수 있었지만, 실행 재개 시 값이나 예외를 전달받을 수 없었고, `try/finally` 블록 내에서 `yield`를 사용할 수 없어 리소스 정리(cleanup)가 어려웠습니다. 이러한 제약은 비동기 애플리케이션 개발을 복잡하게 만들었습니다.

PEP 342는 제너레이터가 일시 중지된 지점에서 값이나 예외를 받을 수 있도록 하여, 코루틴들이 블로킹(blocking) 없이 서로를 호출할 수 있게 함으로써 비동기 애플리케이션 개발에 큰 이점을 제공하고자 합니다. 이를 통해 개발자는 콜백(callback) 방식이나 자원 소모가 큰 스레드(thread) 없이도 비동기 작업을 효율적으로 수행할 수 있게 되며, Stackless Python의 장점을 표준 Python에서도 누릴 수 있게 됩니다.

### 사양 요약 (Specification Summary)
PEP 342는 제너레이터-이터레이터(generator-iterator) 타입에 몇 가지 메서드를 추가하고 문법을 조정하여, 제너레이터 함수를 코루틴 및 협동 멀티태스킹 구현에 사용할 수 있도록 합니다.

주요 변경 사항은 다음과 같습니다:
*   **`yield`의 표현식화** : `yield`가 문장(statement)이 아닌 표현식(expression)으로 재정의됩니다.
*   **`send(value)` 메서드 추가** : 제너레이터를 재개하고 `yield` 표현식으로 값을 전달합니다.
*   **`throw(type, value=None, traceback=None)` 메서드 추가** : 제너레이터가 일시 중지된 지점에서 예외를 발생시킵니다.
*   **`close()` 메서드 추가** : 제너레이터가 일시 중지된 지점에서 `GeneratorExit` 예외를 발생시켜 제너레이터를 정리합니다.
*   **`__del__()` 메서드 추가** : 제너레이터 객체가 가비지 컬렉션(garbage-collected)될 때 `close()`가 호출되도록 보장합니다.
*   **`try/finally` 내 `yield` 허용** : `finally` 절이 실행될 수 있도록 `try/finally` 블록 내에서 `yield` 사용이 가능해집니다.

### 사양: 제너레이터로 값 보내기 (Specification: Sending Values into Generators)

#### 새로운 제너레이터 메서드: `send(value)`
`send(value)` 메서드는 제너레이터-이터레이터에 값을 전달하여 실행을 재개합니다. `send(None)`은 `next()`를 호출하는 것과 동일하며, `None`이 아닌 값을 전달하면 해당 값이 현재 `yield` 표현식의 결과가 됩니다. 제너레이터가 막 생성되었을 때는 `send(None)` 또는 `next()`를 먼저 호출하여 첫 `yield` 지점까지 실행을 진행시켜야 합니다.

#### 새로운 문법: `Yield Expressions`
`yield`는 이제 할당(assignment)의 오른쪽에 사용될 수 있는 표현식입니다. `send()`로 값이 전달되지 않는 한 `yield` 표현식의 값은 `None`입니다. `yield` 표현식은 할당의 오른쪽 최상위 표현식일 때를 제외하고는 항상 괄호로 묶어야 합니다.

**유효한 예시:**
```python
x = yield 42
x = yield
x = 12 + (yield 42)
foo(yield 42)
```
**유효하지 않은 예시:**
```python
x = 12 + yield 42
foo(yield 42, 12)
```

### 사양: 예외 및 정리 (Specification: Exceptions and Cleanup)

#### 새로운 문법: `try-finally` 내 `yield` 허용
이제 제너레이터 함수 내의 `try-finally` 문에서 `yield`를 사용할 수 있습니다.

#### 새로운 제너레이터 메서드: `throw(type, value=None, traceback=None)`
`g.throw(type, value, traceback)`은 제너레이터 `g`가 일시 중지된 지점에서 지정된 예외를 발생시킵니다. 제너레이터가 이 예외를 처리하면 값을 `yield`하거나 다른 예외를 발생시킬 수 있습니다. 처리되지 않은 예외는 호출자에게 전파됩니다. 이 메서드는 예외를 제너레이터 내부로 "던지는" 역할을 합니다.

#### 새로운 표준 예외: `GeneratorExit`
`Exception`을 상속하는 새로운 표준 예외 `GeneratorExit`가 정의되었습니다. 제너레이터는 종료 시 이 예외를 처리하거나, 다시 발생시키거나, `StopIteration`을 발생시켜야 합니다.

#### 새로운 제너레이터 메서드: `close()`
`g.close()`는 `g.throw(GeneratorExit)`를 호출하여 제너레이터를 안전하게 종료하는 메서드입니다. 제너레이터가 `GeneratorExit`를 무시하고 값을 yield하려고 하면 `RuntimeError`를 발생시킵니다.

#### 새로운 제너레이터 메서드: `__del__()`
`g.__del__()`은 `g.close()`의 래퍼(wrapper)로, 제너레이터 객체가 가비지 컬렉션될 때 호출되어 리소스 정리를 보장합니다.

### 결론 (Conclusion)
PEP 342는 Python 제너레이터에 `send()`, `throw()`, `close()` 메서드 및 `yield` 표현식을 도입하여 제너레이터를 강력한 코루틴으로 변모시켰습니다. 이러한 기능은 Python 개발자가 비동기 애플리케이션을 보다 효율적이고 직관적으로 작성할 수 있도록 돕고, 복잡한 콜백 구조나 스레드 사용 없이 협동 멀티태스킹을 구현할 수 있는 기반을 제공합니다. 이는 Python 언어의 비동기 프로그래밍 패러다임을 한 단계 발전시키는 중요한 제안이었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.