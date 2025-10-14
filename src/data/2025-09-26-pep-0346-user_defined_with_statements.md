---
title: "[Withdrawn] PEP 346 - User Defined (”with”) Statements"
excerpt: "Python Enhancement Proposal 346: 'User Defined (”with”) Statements'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/346/
toc: true
toc_sticky: true
date: 2025-09-26 18:55:56+0900
last_modified_at: 2025-09-26 18:55:56+0900
published: true
---
> **원문 링크:** [PEP 346 - User Defined (”with”) Statements](https://peps.python.org/pep-0346/)
>
> **상태:** Withdrawn | **유형:** Standards Track | **작성일:** 06-May-2005


# PEP 346 – 사용자 정의 ("with") 문 (User Defined ("with") Statements)

*   **작성자**: Alyssa Coghlan <ncoghlan at gmail.com>
*   **상태**: 철회됨 (Withdrawn)
*   **유형**: 표준 트랙 (Standards Track)
*   **생성일**: 2005년 5월 6일
*   **Python 버전**: 2.5

## 개요 (Abstract)

이 PEP는 PEP 310의 "신뢰할 수 있는 획득/해제 쌍(Reliable Acquisition/Release Pairs)"과 Guido의 PEP 340 "익명 블록 문(Anonymous Block Statements)"을 결합한 것입니다. 이 PEP는 PEP 340의 좋은 부분을 가져와 PEP 310의 부분들과 섞어 우아한 전체로 재배열하는 것을 목표로 합니다. 완전한 그림을 그리기 위해 다른 다양한 PEP들에서 아이디어를 빌려왔으며, 독립적으로 존재하도록 의도되었습니다.

## 작성자 노트 (Author's Note)

PEP 340 논의 중에 이 PEP의 초안을 제 웹사이트에 PEP 3XX로 유지했습니다 (제출된 PEP를 python-dev의 활동을 추적할 만큼 빠르게 업데이트할 CVS 접근 권한이 없었기 때문입니다).

이 PEP의 첫 초안 이후, Guido는 PEP 340의 간소화된 버전으로 PEP 343을 작성했습니다. PEP 343은 (이 글을 쓰는 시점에서) 이 PEP와 동일한 새로운 문(statement) 의미론을 사용하지만, 제너레이터를 사용하여 문 템플릿(statement template)을 작성할 수 있도록 하는 메커니즘이 약간 다릅니다. 그러나 Guido는 Raymond Hettinger가 작성 중인 새로운 PEP를 수용할 의사가 있음을 밝혔으며, 이 PEP는 PEP 288과 PEP 325를 통합하고, 이 PEP에서 설명된 것과 같은 제너레이터 데코레이터(decorator)를 PEP 343의 문 템플릿을 작성하는 데 사용할 수 있도록 허용할 것입니다. 다른 차이점은 키워드 선택 ('with' 대 'do')이었고, Guido는 PEP 343의 맥락에서 이에 대한 투표를 조직할 것이라고 밝혔습니다.

따라서, python.org에 아카이브를 위해 제출된 이 PEP 버전은 제출 즉시 철회될 예정입니다. PEP 343과 결합된 제너레이터 개선 PEP가 중요한 아이디어들을 다룰 것입니다.

## 서론 (Introduction)

이 PEP는 임의의 `try` / `finally` 및 일부 `try` / `except` / `else` 상용구 코드(boilerplate)를 분리할 수 있는 새로운 `with` 문을 도입하여 Python의 자원 관리 능력을 향상시킬 것을 제안합니다. 이 새로운 구조는 '사용자 정의 문(user defined statement)'이라고 불리며, 관련 클래스 정의는 '문 템플릿(statement template)'이라고 합니다.

위 내용은 이 PEP의 주요 요점입니다. 그러나 이것이 전부라면 PEP 310만으로도 충분했을 것이고, 이 PEP는 본질적으로 중복되었을 것입니다. 대신, 이 PEP는 적절하게 데코레이션된 제너레이터를 사용하여 이러한 문 템플릿을 작성하는 것이 자연스러워지도록 추가적인 개선 사항을 권장합니다. 이러한 개선 사항의 부수 효과는 제너레이터 내부에서 자원 관리를 적절하게 처리하는 것이 중요해진다는 것입니다.

이는 PEP 343과 상당히 유사하지만, 발생하는 예외(exception)는 제너레이터의 프레임 내부에서 다시 발생(re-raise)하며, 그 결과로 제너레이터 종결(finalisation) 문제가 해결되어야 합니다. 이 PEP에서 제안하는 템플릿 제너레이터 데코레이터는 PEP 340의 일회용 템플릿과 달리 재사용 가능한 템플릿을 생성합니다.

PEP 340과 비교하여 이 PEP는 예외를 억제하는 기능(ability to suppress exceptions)을 제거하고, 사용자 정의 문을 루프가 아닌 구조로 만듭니다. 다른 주요 차이점은 데코레이터를 사용하여 제너레이터를 문 템플릿으로 바꾸는 것과 이터레이터 종결(iterator finalisation) 문제를 해결하기 위한 아이디어를 통합한 것입니다.

이 모든 것이 야심 찬 작업처럼 보인다면... Guido가 PEP 340을 작성했을 때 기준을 높게 설정했기 때문입니다 :)

## 다른 PEP들과의 관계 (Relationship with other PEPs)

이 PEP는 PEP 310, PEP 340 및 PEP 343과 직접적으로 경쟁하는데, 이 PEP들은 모두 확정적 자원 관리(deterministic resource management)를 위한 대체 메커니즘을 설명합니다.

이터레이터(iterator)로 데이터를 전달하는 것과 관련된 PEP 340의 개선 사항을 분리한 PEP 342와는 경쟁하지 않습니다. `for` 루프 의미론의 관련 변경 사항은 이 PEP에서 제안하는 이터레이터 종결 변경 사항과 결합될 것입니다. 사용자 정의 문은 영향을 받지 않습니다.

이 PEP는 PEP 288에서 설명하는 제너레이터 개선 사항과도 경쟁하지 않습니다. 이 PEP가 제너레이터 프레임에 예외를 주입하는 기능(inject exceptions)을 제안하지만, 이는 내부 구현 세부 사항이며 해당 기능을 Python 코드에 공개적으로 제공할 필요는 없습니다. PEP 288은 부분적으로 해당 구현 세부 사항에 쉽게 접근할 수 있도록 하는 것에 관한 것입니다.

그러나 이 PEP는 PEP 325에서 설명하는 제너레이터 자원 해제 지원을 불필요하게 만들 것입니다. 종결이 필요한 이터레이터는 문 템플릿 프로토콜의 적절한 구현을 제공해야 합니다.

## 사용자 정의 문 (User defined statements)

PEP 310에서 동기 부여 예시를 가져오자면, 동기화 록(synchronisation lock)을 올바르게 처리하는 코드는 현재 다음과 같습니다.

```python
the_lock.acquire()
try:
    # Code here executes with the lock held
finally:
    the_lock.release()
```

PEP 310과 마찬가지로, 이 PEP는 이러한 코드를 다음과 같이 작성할 수 있도록 제안합니다.

```python
with the_lock:
    # Code here executes with the lock held
```

이러한 사용자 정의 문은 주로 함수로 쉽게 변환할 수 없는 `try` 블록(block)을 쉽게 분리할 수 있도록 설계되었습니다. 이는 예외 처리 패턴이 일관되지만 `try` 블록의 본문이 변경되는 경우에 가장 일반적입니다. 사용자 정의 문을 사용하면 예외 처리를 문 템플릿으로 분리하고 `try` 절의 본문을 사용자 코드에 인라인으로 제공하는 것이 간단해집니다.

'사용자 정의 문'이라는 용어는 `with` 문의 의미가 주로 사용되는 문 템플릿에 의해 결정되며, 프로그래머는 `for` 루프에서 사용할 자신만의 이터레이터를 자유롭게 생성할 수 있는 것처럼 자신만의 문 템플릿을 자유롭게 생성할 수 있다는 사실을 반영합니다.

### 사용자 정의 문의 사용 문법 (Usage syntax for user defined statements)

제안된 문법은 간단합니다.

```python
with EXPR1 [as VAR1]:
    BLOCK1
```

### 사용자 정의 문의 의미론 (Semantics for user defined statements)

```python
the_stmt = EXPR1
stmt_enter = getattr(the_stmt, "__enter__", None)
stmt_exit = getattr(the_stmt, "__exit__", None)
if stmt_enter is None or stmt_exit is None:
    raise TypeError("Statement template required")
VAR1 = stmt_enter() # Omit 'VAR1 =' if no 'as' clause
exc = (None, None, None)
try:
    try:
        BLOCK1
    except:
        exc = sys.exc_info()
        raise
    finally:
        stmt_exit(*exc)
```

`VAR1`을 제외하고 위에 표시된 지역 변수(local variables)는 사용자 코드에 표시되지 않습니다. `for` 루프의 이터레이션 변수처럼 `VAR1`은 `BLOCK1`과 사용자 정의 문 뒤의 코드 모두에서 표시됩니다.

문 템플릿은 예외에만 반응할 수 있으며, 예외를 억제할 수 없습니다. 이유에 대한 설명은 "Rejected Options" 섹션을 참조하십시오.

### 문 템플릿 프로토콜: `__enter__` (Statement template protocol: __enter__)

`__enter__()` 메서드는 인자를 받지 않으며, 예외를 발생시키면 `BLOCK1`은 실행되지 않습니다. 이 경우 `__exit__()` 메서드는 호출되지 않습니다. 이 메서드가 반환하는 값은 `as` 절이 사용될 경우 `VAR1`에 할당됩니다. 다른 반환할 값이 없는 객체는 일반적으로 `None` 대신 `self`를 반환하여 `with` 문에서 즉석 생성을 허용해야 합니다.

문 템플릿은 이 메서드를 사용하여 문 실행 중에 존재해야 하는 조건(예: 동기화 록 획득)을 설정해야 합니다.

항상 사용 가능한 상태가 아닌 문 템플릿(예: 닫힌 파일 객체)은 템플릿이 유효한 상태가 아닐 때 `__enter__()` 호출 시도 시 `RuntimeError`를 발생시켜야 합니다.

### 문 템플릿 프로토콜: `__exit__` (Statement template protocol: __exit__)

`__exit__()` 메서드는 `raise` 문에 해당하는 세 가지 인자: `type`, `value`, `traceback`을 받습니다. 모든 인자는 항상 제공되며, 예외가 발생하지 않으면 `None`으로 설정됩니다. 이 메서드는 `__enter__()` 메서드가 성공적으로 완료되면 `with` 문 메커니즘에 의해 정확히 한 번 호출됩니다.

문 템플릿은 이 메서드에서 예외 처리를 수행합니다. 첫 번째 인자가 `None`이면 `BLOCK1`의 예외 없는 완료를 나타냅니다. 실행이 블록의 끝에 도달했거나 `return`, `break` 또는 `continue` 문을 사용하여 조기 완료가 강제되었음을 의미합니다. 그렇지 않으면 세 가지 인자는 `BLOCK1`을 종료시킨 예외를 반영합니다.

`__exit__()` 메서드에 의해 발생된 모든 예외는 `with` 문을 포함하는 스코프(scope)로 전파됩니다. `BLOCK1`의 사용자 코드도 예외를 발생시켰다면, 그 예외는 손실되고 `__exit__()` 메서드에 의해 발생된 예외로 대체됩니다.

### 임의의 예외 처리 분리 (Factoring out arbitrary exception handling)

다음 예외 처리 구성을 고려하십시오.

```python
SETUP_BLOCK
try:
    try:
        TRY_BLOCK
    except exc_type1, exc:
        EXCEPT_BLOCK1
    except exc_type2, exc:
        EXCEPT_BLOCK2
    except:
        EXCEPT_BLOCK3
    else:
        ELSE_BLOCK
finally:
    FINALLY_BLOCK
```

이는 대략 다음과 같이 문 템플릿으로 번역될 수 있습니다.

```python
class my_template(object):
    def __init__(self, *args):
        # Any required arguments (e.g. a file name)
        # get stored in member variables
        # The various BLOCK's will need updating to reflect
        # that.
        pass # Example placeholder for __init__

    def __enter__(self):
        SETUP_BLOCK # SETUP_BLOCK content would go here
        pass # Example placeholder for __enter__ logic

    def __exit__(self, exc_type, value, traceback):
        try:
            try:
                if exc_type is not None:
                    raise exc_type, value, traceback
            except exc_type1, exc:
                EXCEPT_BLOCK1
            except exc_type2, exc:
                EXCEPT_BLOCK2
            except:
                EXCEPT_BLOCK3
            else:
                ELSE_BLOCK
        finally:
            FINALLY_BLOCK
```

그런 다음 다음과 같이 사용할 수 있습니다.

```python
with my_template(*args):
    TRY_BLOCK
```

그러나 이 코드와 원래 `try` 문 사이에는 두 가지 중요한 의미론적 차이점이 있습니다.

첫째, 원래 `try` 문에서 `TRY_BLOCK` 내에서 `break`, `return` 또는 `continue` 문이 발생하면 문이 완료될 때 `FINALLY_BLOCK`만 실행됩니다. 문 템플릿의 경우 `ELSE_BLOCK`도 실행되는데, 이러한 문은 다른 예외 없는 블록 종료와 동일하게 처리되기 때문입니다. 중요한 사용 사례의 경우 이는 좋은 일일 수 있습니다 (예시의 `transaction` 참조). 왜냐하면 `except` 또는 `else` 절이 모두 실행되지 않는 이 틈은 예외 핸들러를 작성할 때 잊기 쉽기 때문입니다.

둘째, 문 템플릿은 어떤 예외도 억제하지 않습니다. 예를 들어, 원래 코드가 `exc_type1` 및 `exc_type2` 예외를 억제했다면, 이는 여전히 사용자 코드에 인라인으로 수행되어야 합니다.

```python
try:
    with my_template(*args):
        TRY_BLOCK
except (exc_type1, exc_type2):
    pass
```

그러나 예외 억제가 명시적으로 이루어져야 하는 경우에도 호출 지점에서 반복되는 상용구 코드의 양이 크게 줄어듭니다 (이 동작에 대한 추가 논의는 "Rejected Options" 참조).

일반적으로 모든 절이 필요하지는 않습니다. 자원 처리(파일 또는 동기화 록과 같은)의 경우 `__exit__()` 메서드에서 `FINALLY_BLOCK`의 일부였을 코드를 단순히 실행할 수 있습니다. 이는 이 섹션의 시작 부분에서 언급된 동기화 록을 문 템플릿으로 만드는 다음 구현에서 볼 수 있습니다.

```python
# New methods of synchronisation lock objects
def __enter__(self):
    self.acquire()
    return self
def __exit__(self, *exc_info):
    self.release()
```

## 제너레이터 (Generators)

실행을 일시 중단하고 호출 프레임(calling frame)으로 제어를 반환하는 기능을 통해 제너레이터는 문 템플릿을 작성하는 데 자연스러운 후보입니다. 언어에 사용자 정의 문을 추가하는 데 이 섹션에서 설명하는 제너레이터 변경이 필요하지 않으므로, 이 PEP는 단계별 구현(1단계에서 `with` 문, 2단계에서 제너레이터 통합)의 명확한 후보가 됩니다. 제안된 제너레이터 업데이트는 임의의 예외 처리를 다음과 같이 분리할 수 있도록 합니다.

```python
@statement_template
def my_template(*arguments):
    SETUP_BLOCK
    try:
        try:
            yield
        except exc_type1, exc:
            EXCEPT_BLOCK1
        except exc_type2, exc:
            EXCEPT_BLOCK2
        except:
            EXCEPT_BLOCK3
        else:
            ELSE_BLOCK
        finally:
            FINALLY_BLOCK
```

클래스 기반 버전과 달리, 호출 코드에 의해 전달된 인자를 포함하여 공유 값이 제너레이터의 내부 프레임의 지역 변수이므로 어떤 블록도 수정할 필요가 없다는 점에 유의하십시오. 이전에 언급된 의미론적 차이점(모든 예외 없는 블록 종료는 `else` 절을 트리거하고, 템플릿은 예외를 억제할 수 없음)은 여전히 적용됩니다.

### `yield`의 기본값 (Default value for yield)

제너레이터로 문 템플릿을 생성할 때, `yield` 문은 종종 유용한 값을 반환하기보다는 사용자 정의 문의 본문으로 제어를 반환하는 데에만 사용됩니다.

따라서 이 PEP가 수락되면 `yield`는 `return`과 마찬가지로 `None`의 기본값을 제공할 것입니다 (즉, `yield`와 `yield None`은 동등한 문이 됩니다).

이와 동일한 변경 사항이 PEP 342에서도 제안되고 있습니다. 두 PEP가 모두 수락된다면 한 번만 구현하면 될 것입니다 :)

### 템플릿 제너레이터 데코레이터: `statement_template` (Template generator decorator: statement_template)

PEP 343과 마찬가지로, 제너레이터를 적절한 문 템플릿 의미론을 가진 객체로 래핑하는 새로운 데코레이터가 제안됩니다. PEP 343과 달리, 여기서 제안된 템플릿은 재사용 가능합니다. 왜냐하면 제너레이터는 `__enter__()`에 대한 각 호출에서 새로 인스턴스화되기 때문입니다. 또한 `BLOCK1`에서 발생하는 모든 예외는 제너레이터의 내부 프레임에서 다시 발생합니다.

```python
class template_generator_wrapper(object):
    def __init__(self, func, func_args, func_kwds):
        self.func = func
        self.args = func_args
        self.kwds = func_kwds
        self.gen = None

    def __enter__(self):
        if self.gen is not None:
            raise RuntimeError("Enter called without exit!")
        self.gen = self.func(*self.args, **self.kwds)
        try:
            return self.gen.next()
        except StopIteration:
            raise RuntimeError("Generator didn't yield")

    def __exit__(self, *exc_info):
        if self.gen is None:
            raise RuntimeError("Exit called without enter!")
        try:
            try:
                if exc_info[0] is not None:
                    self.gen._inject_exception(*exc_info)
                else:
                    self.gen.next()
            except StopIteration:
                pass
            else:
                raise RuntimeError("Generator didn't stop")
        finally:
            self.gen = None

def statement_template(func):
    def factory(*args, **kwds):
        return template_generator_wrapper(func, args, kwds)
    return factory
```

### 템플릿 제너레이터 래퍼: `__enter__()` 메서드 (Template generator wrapper: __enter__() method)

템플릿 제너레이터 래퍼에는 포함된 제너레이터의 새 인스턴스를 생성한 다음 `next()`를 한 번 호출하는 `__enter__()` 메서드가 있습니다. 마지막 제너레이터 인스턴스가 정리되지 않았거나, 제너레이터가 값을 `yield`하는 대신 종료되면 `RuntimeError`를 발생시킵니다.

### 템플릿 제너레이터 래퍼: `__exit__()` 메서드 (Template generator wrapper: __exit__() method)

템플릿 제너레이터 래퍼에는 예외가 전달되지 않으면 제너레이터에서 `next()`를 단순히 호출하는 `__exit__()` 메서드가 있습니다. 예외가 전달되면 마지막 `yield` 문 지점에서 포함된 제너레이터 내부에서 다시 발생합니다.

어떤 경우든, 내부 프레임이 작업 결과로 종료되지 않으면 제너레이터 래퍼는 `RuntimeError`를 발생시킵니다. `__exit__()` 메서드는 사용된 제너레이터 인스턴스에 대한 참조를 항상 정리하여 `__enter__()`를 다시 호출할 수 있도록 합니다.

사용자 정의 문의 본문에 의해 발생된 `StopIteration`은 `__exit__()` 메서드 내에서 의도치 않게 억제될 수 있지만, 원래 발생한 예외는 여전히 올바르게 전파되므로 중요하지 않습니다.

### 제너레이터에 예외 주입 (Injecting exceptions into generators)

템플릿 제너레이터 래퍼의 `__exit__()` 메서드를 구현하려면 제너레이터의 내부 프레임에 예외를 주입해야 합니다. 이는 현재 Python에 동등한 기능이 없는 새로운 구현 수준 동작입니다.

주입 메커니즘 (이 PEP에서는 `_inject_exception`으로 지칭)은 지정된 `type`, `value`, `traceback` 정보로 제너레이터 프레임에서 예외를 발생시킵니다. 이는 예외가 전파되도록 허용될 경우 원래 예외처럼 보인다는 것을 의미합니다.

이 PEP의 목적상, 이 기능을 Python 구현 코드 외부에서 사용할 수 있도록 만들 필요는 없습니다.

### 제너레이터 종결 (Generator finalisation)

템플릿 제너레이터의 자원 관리를 지원하기 위해, 이 PEP는 `try` / `finally` 문의 `try` 블록 내부 `yield` 문에 대한 제한을 제거할 것입니다. 따라서 파일 또는 이와 유사한 객체 사용이 필요한 제너레이터는 `try` / `finally` 또는 `with` 문을 사용하여 객체가 올바르게 관리되도록 할 수 있습니다.

이 제한은 전역적으로 해제되어야 할 가능성이 높습니다. 문 템플릿을 정의하는 데 사용되는 제너레이터 내부에서만 허용되도록 제한하기는 어려울 것입니다. 따라서 이 PEP는 문 템플릿으로 사용되지 않는 제너레이터도 적절하게 종결되도록 보장하는 제안을 포함합니다.

### 제너레이터 종결: `TerminateIteration` 예외 (Generator finalisation: TerminateIteration exception)

새로운 예외가 제안됩니다.

```python
class TerminateIteration(Exception): pass
```

이 새로운 예외는 종결을 요청하기 위해 제너레이터에 주입됩니다. 잘 작성된 코드에서는 억제되어서는 안 됩니다.

### 제너레이터 종결: `__del__()` 메서드 (Generator finalisation: __del__() method)

제너레이터가 결국 (Python의 가비지 컬렉션(garbage collection) 한도 내에서) 종결되도록 보장하기 위해, 제너레이터는 다음 의미론을 가진 `__del__()` 메서드를 획득할 것입니다.

```python
def __del__(self):
    try:
        self._inject_exception(TerminateIteration, None, None)
    except TerminateIteration:
        pass
```

### 확정적 제너레이터 종결 (Deterministic generator finalisation)

제너레이터의 확정적 종결을 제공하는 간단한 방법이 있습니다. 적절한 `__enter__()` 및 `__exit__()` 메서드를 제공하는 것입니다.

```python
def __enter__(self):
    return self
def __exit__(self, *exc_info):
    try:
        self._inject_exception(TerminateIteration, None, None)
    except TerminateIteration:
        pass
```

그러면 모든 제너레이터는 관련 `for` 루프를 `with` 문으로 래핑하여 즉시 종결될 수 있습니다.

```python
with all_lines(filenames) as lines:
    for line in lines:
        print lines
```

(`all_lines` 정의와 즉각적인 종결이 필요한 이유는 예시(Examples) 섹션을 참조하십시오.)

위 예시를 파일 객체 사용과 비교하십시오.

```python
with open(filename) as f:
    for line in f:
        print f
```

### 사용자 정의 문 템플릿으로서의 제너레이터 (Generators as user defined statement templates)

사용자 정의 문을 구현하는 데 사용될 때, 제너레이터는 주어진 제어 경로에서 한 번만 `yield`해야 합니다. 해당 `yield`의 결과는 제너레이터의 `__enter__()` 메서드의 결과로 제공됩니다. 각 제어 경로에 단일 `yield`가 있으면 제너레이터의 `__exit__()` 메서드가 호출될 때 내부 프레임이 종료됩니다. 단일 제어 경로에 여러 `yield` 문이 있으면 내부 프레임이 올바르게 종료되지 않을 때 `__exit__()` 메서드에 의해 `RuntimeError`가 발생합니다. 이러한 오류는 문 템플릿의 버그를 나타냅니다.

예외에 반응하거나 자원을 정리하려면, `yield` 문을 적절하게 구성된 `try` 문으로 래핑하는 것으로 충분합니다. 예외 없이 `yield` 후 실행이 다시 시작되면, 제너레이터는 `do` 문의 본문이 아무 문제 없이 완료되었음을 알 수 있습니다.

## 예시 (Examples)

블록 시작 시 획득한 록(lock)이 블록을 나설 때 해제되도록 보장하는 템플릿:

```python
# New methods on synchronisation locks
def __enter__(self):
    self.acquire()
    return self
def __exit__(self, *exc_info):
    lock.release()
```

사용법:

```python
with myLock:
    # Code here executes with myLock held. The lock is
    # guaranteed to be released when the block is left (even
    # if via return or by an uncaught exception).
```

파일을 여는 템플릿으로, 블록을 나설 때 파일이 닫히도록 보장합니다.

```python
# New methods on file objects
def __enter__(self):
    if self.closed:
        raise RuntimeError, "Cannot reopen closed file handle"
    return self
def __exit__(self, *args):
    self.close()
```

사용법:

```python
with open("/etc/passwd") as f:
    for line in f:
        print line.rstrip()
```

데이터베이스 트랜잭션(transaction)을 커밋하거나 롤백하는 템플릿:

```python
def transaction(db):
    try:
        yield
    except:
        db.rollback()
    else:
        db.commit()
```

사용법:

```python
with transaction(the_db):
    make_table(the_db)
    add_data(the_db)
    # Getting to here automatically triggers a commit
    # Any exception automatically triggers a rollback
```

블록을 중첩하고 템플릿을 결합할 수 있습니다.

```python
@statement_template
def lock_opening(lock, filename, mode="r"):
    with lock:
        with open(filename, mode) as f:
            yield f
```

사용법:

```python
with lock_opening(myLock, "/etc/passwd") as f:
    for line in f:
        print line.rstrip()
```

표준 출력(stdout)을 일시적으로 리디렉션(redirect)합니다.

```python
@statement_template
def redirected_stdout(new_stdout):
    save_stdout = sys.stdout
    try:
        sys.stdout = new_stdout
        yield
    finally:
        sys.stdout = save_stdout
```

사용법:

```python
with open(filename, "w") as f:
    with redirected_stdout(f):
        print "Hello world"
```

`open()`의 변형으로, 오류 조건도 반환합니다.

```python
@statement_template
def open_w_error(filename, mode="r"):
    try:
        f = open(filename, mode)
    except IOError, err:
        yield None, err
    else:
        try:
            yield f, None
        finally:
            f.close()
```

사용법:

```python
do open_w_error("/etc/passwd", "a") as f, err:
    if err:
        print "IOError:", err
    else:
        f.write("guido::0:0::/:/bin/sh\n")
```

특정 헤더를 가진 첫 번째 파일을 찾습니다.

```python
for name in filenames:
    with open(name) as f:
        if f.read(2) == 0xFEB0:
            break
```

전체 루프 또는 각 이터레이션(iteration)에 대해 록을 보유하면서 처리할 수 있는 첫 번째 항목을 찾습니다.

```python
with lock:
    for item in items:
        if handle(item):
            break

for item in items:
    with lock:
        if handle(item):
            break
```

제너레이터 내부에 있는 동안 록을 보유하지만, 외부 스코프(scope)로 제어를 반환할 때 해제합니다.

```python
@statement_template
def released(lock):
    lock.release()
    try:
        yield
    finally:
        lock.acquire()
```

사용법:

```python
with lock:
    for item in items:
        with released(lock):
            yield item
```

파일 컬렉션에서 줄을 읽습니다 (예: 여러 설정 소스 처리).

```python
def all_lines(filenames):
    for name in filenames:
        with open(name) as f:
            for line in f:
                yield line
```

사용법:

```python
with all_lines(filenames) as lines:
    for line in lines:
        update_config(line)
```

모든 사용이 자원 관리를 포함할 필요는 없습니다.

```python
@statement_template
def tag(*args, **kwds):
    name = cgi.escape(args[0])
    if kwds:
        kwd_pairs = ["%s=%s" % cgi.escape(key), cgi.escape(value) for key, value in kwds]
        print '<%s %s>' % name, " ".join(kwd_pairs)
    else:
        print '<%s>' % name
    yield
    print '</%s>' % name
```

사용법:

```python
with tag('html'):
    with tag('head'):
        with tag('title'):
            print 'A web page'
    with tag('body'):
        for par in pars:
            with tag('p'):
                print par
        with tag('a', href="http://www.python.org"):
            print "Not a dead parrot!"
```

PEP 343에서 가져온 또 다른 유용한 예시는 시그널(signal)을 블록하는 작업입니다. 사용법은 다음과 같습니다.

```python
from signal import blocked_signals
with blocked_signals():
    # code executed without worrying about signals
```

선택적 인자는 블록할 시그널 목록일 수 있으며, 기본적으로 모든 시그널이 블록됩니다. 구현은 독자의 연습 과제로 남겨집니다.

이 기능의 또 다른 용도는 Decimal 컨텍스트(context)입니다.

```python
# New methods on decimal Context objects
def __enter__(self):
    if self._old_context is not None:
        raise RuntimeError("Already suspending other Context")
    self._old_context = getcontext()
    setcontext(self)
def __exit__(self, *args):
    setcontext(self._old_context)
    self._old_context = None
```

사용법:

```python
with decimal.Context(precision=28):
    # Code here executes with the given context
    # The context always reverts after this statement
```

## 해결되지 않은 문제 (Open Issues)

이 PEP는 철회되었으므로, 해결되지 않은 문제는 없습니다.

## 거부된 옵션 (Rejected Options)

### 기본 구조를 루프 구조로 만들기 (Having the basic construct be a looping construct)

PEP 340의 블록 문이 보여주듯이, 이 아이디어의 주요 문제는 루프 내부에 있고 `break` 및 `continue` 문을 포함하는 `try` 문을 분리하는 데 문제를 일으킨다는 것입니다 (이 문들이 원래 루프 대신 블록 구조에 적용될 것이기 때문입니다). 주요 목표가 (억제를 제외하고) 임의의 예외 처리를 문 템플릿으로 분리할 수 있도록 하는 것이므로, 이는 명확한 문제입니다.

또한 예시에서 볼 수 있듯이 이해하기 어려운 문제도 있습니다. 전체 루프 또는 루프의 각 이터레이션에 대해 록을 획득하는 예시에서, 사용자 정의 문 자체가 루프였다면 `for` 루프 외부에서 `for` 루프 내부로 이동하는 것은 예상되는 것 이상으로 큰 의미론적 영향을 미 미칠 것입니다.

마지막으로, 루프 구조의 경우 TOOWTDI(There's Only One Way To Do It)와 관련하여 상당한 문제가 있습니다. 특정 상황을 기존 `for` 루프로 처리해야 하는지 아니면 새로운 루프 구조로 처리해야 하는지 불분명한 경우가 많기 때문입니다. 현재 PEP에서는 이러한 문제가 없습니다. `for` 루프는 이터레이션에 계속 사용되며, 새로운 `do` 문은 예외 처리를 분리하는 데 사용됩니다.

특히 PEP 340의 익명 블록 문과 관련된 또 다른 문제는 문 템플릿을 직접 작성하는 것을 상당히 어렵게 만든다는 것입니다 (즉, 제너레이터를 사용하지 않는 경우). 이 문제는 예시에서 문 템플릿의 다양한 클래스 기반 구현의 상대적인 단순성에서 볼 수 있듯이 현재 제안으로 해결됩니다.

### 문 템플릿이 예외를 억제하도록 허용 (Allowing statement templates to suppress exceptions)

이 PEP의 초기 버전에서는 문 템플릿이 예외를 억제하는 기능을 제공했습니다. BDFL(Benevolent Dictator For Life)은 관련 복잡성에 대해 우려를 표명했으며, C 코드에서 매크로 내부에 흐름 제어를 숨기는 악행에 대한 Raymond Chen의 글을 읽은 후 저도 동의했습니다.

억제 기능을 제거함으로써 사용자 정의 문에 대한 설명과 구현 모두에서 많은 복잡성을 제거하여 올바른 선택임을 더욱 뒷받침했습니다. PEP의 이전 버전은 `__exit__()` 메서드에서 예외가 의도치 않게 억제되는 것을 피하기 위해 끔찍한 난관을 겪어야 했습니다. 현재 제안된 의미론에서는 그 문제가 존재하지 않습니다.

예외 억제 기능을 실제로 사용한 예시(`auto_retry`)가 하나 있었습니다. 이 사용 사례는 우아하지는 않지만, 사용자 코드에서 완전히 작성될 때 흐름 제어가 훨씬 더 명확합니다.

```python
def attempts(num_tries):
    return reversed(xrange(num_tries))

for retry in attempts(3):
    try:
        make_attempt()
    except IOError:
        if not retry:
            raise
```

원한다면 다음과 같이 작성할 수도 있습니다.

```python
for attempt in auto_retry(3, IOError):
    try:
        with attempt:
            make_attempt()
    except FailedAttempt:
        pass
```

순진한 사람들을 보호하기 위해, 이를 실제로 지원하는 코드는 여기에 포함되지 않았습니다.

### 예외 없는 종료를 구분 (Differentiating between non-exceptional exits)

이 PEP의 초기 버전에서는 문 템플릿이 블록을 정상적으로 종료하는 것과 `return`, `break` 또는 `continue` 문을 통해 종료하는 것을 구분할 수 있도록 허용했습니다. BDFL은 PEP 343 및 관련 논의에서 유사한 아이디어를 고민했습니다. 이는 의미론 설명에 상당한 복잡성을 추가했으며, 모든 문 템플릿이 해당 문을 예외처럼 처리해야 할지 아니면 블록을 종료하는 정상적인 메커니즘처럼 처리해야 할지 결정해야 했습니다.

이 템플릿별 결정 프로세스는 큰 혼란을 야기할 수 있었습니다. 예를 들어, 한 데이터베이스 커넥터는 조기 종료를 예외처럼 처리하는 트랜잭션 템플릿을 제공했지만, 다른 커넥터는 이를 정상적인 블록 종료로 처리했다고 가정해 보십시오.

따라서 이 PEP는 이제 가장 간단한 해결책을 사용합니다. 조기 종료는 문 템플릿이 보기에는 정상적인 블록 종료와 동일하게 나타납니다.

### 발생한 예외를 제너레이터에 주입하지 않음 (Not injecting raised exceptions into generators)

PEP 343은 문 템플릿을 정의하는 데 사용되는 제너레이터에 `next()`를 무조건 호출하는 것을 제안합니다. 이는 템플릿 제너레이터가 다소 직관적이지 않게 보이며, `try` / `finally` 내에서 `yield`를 금지하는 것이 유지된다는 것은 Python의 예외 처리 기능이 여러 자원 관리를 처리하는 데 사용될 수 없다는 것을 의미합니다.

이 PEP가 옹호하는 대안 (발생한 예외를 제너레이터 프레임에 주입하는 것)은 예시의 `lock_opening`에서 보듯이 여러 자원을 우아하게 관리할 수 있음을 의미합니다.

### 모든 제너레이터를 문 템플릿으로 만들기 (Making all generators statement templates)

템플릿 객체를 제너레이터 자체와 분리하면 재사용 가능한 제너레이터 템플릿을 가질 수 있습니다. 즉, 이 PEP가 수락되면 다음 코드가 올바르게 작동할 것입니다.

```python
open_it = lock_opening(parrot_lock, "dead_parrot.txt")
with open_it as f:
    # use the file for a while
with open_it as f:
    # use the file again
```

두 번째 이점은 이터레이터 제너레이터와 템플릿 제너레이터가 매우 다르다는 것입니다. 데코레이터는 그 구분을 명확히 하고, 다른 것이 필요한 곳에 하나가 사용되는 것을 방지합니다.

마지막으로, 데코레이터가 필요하면 제너레이터 객체의 네이티브(native) 메서드를 사용하여 제너레이터 종결을 구현할 수 있습니다.

### `do`를 키워드로 사용 (Using do as the keyword)

`do`는 PEP 340 논의 중에 제안된 대체 키워드였습니다. 적절하게 이름이 지정된 함수와 함께 사용하면 잘 읽히지만, 메서드 또는 네이티브 문 템플릿 지원을 제공하는 객체와 함께 사용하면 잘 읽히지 않습니다.

`do`가 처음 제안되었을 때, BDFL은 Pascal/Delphi 스타일의 `with` 문을 사용하려는 욕구에 기반하여 PEP 310의 `with` 키워드를 거부했습니다. 그 이후로 BDFL은 그러한 문을 제공할 의도가 더 이상 없기 때문에 이러한 반대를 철회했습니다. 이러한 마음의 변화는 C# 개발자들이 해당 기능을 제공하지 않는 이유에 기반한 것으로 보입니다.

### 키워드를 사용하지 않음 (Not having a keyword)

이것은 흥미로운 옵션이며, 아주 잘 읽히도록 만들 수 있습니다. 그러나 새로운 사용자에게는 문서에서 찾아보기 어렵고, 일부에게는 너무 마법처럼 느껴집니다. 따라서 이 PEP는 키워드 기반 제안을 따릅니다.

### `try` 문 개선 (Enhancing try statements)

이 제안은 일반 `try` 문에 `with` 문에 제안된 것과 유사한 시그니처를 부여하는 것을 포함합니다.

저는 `with` 문을 개선된 `try` 문으로 작성하려고 시도하는 것이 개선된 `while` 루프로 `for` 루프를 작성하려고 시도하는 것과 같은 의미라고 생각합니다. 즉, 전자의 의미론이 후자를 사용하는 특정 방식으로 설명될 수 있지만, 전자가 후자의 인스턴스는 아닙니다. 더 근본적인 문 주변에 추가된 의미론은 새로운 구조를 초래하며, 두 가지 다른 문을 혼동해서는 안 됩니다.

이는 '개선된' `try` 문이 여전히 '개선되지 않은' `try` 문의 관점에서 설명되어야 한다는 사실에서 알 수 있습니다. 만약 다른 것이라면 다른 이름을 부여하는 것이 더 합리적입니다.

### 템플릿 프로토콜이 `try` 문을 직접 반영하도록 함 (Having the template protocol directly reflect try statements)

한 가지 제안은 일반화된 `try` 문의 구조의 다른 부분을 다루기 위해 프로토콜에 별도의 메서드를 두는 것이었습니다. `try`, `except`, `else`, `finally`라는 용어를 사용하여 다음과 같은 것을 가질 수 있습니다.

```python
class my_template(object):
    def __init__(self, *args):
        # Any required arguments (e.g. a file name)
        # get stored in member variables
        # The various BLOCK's will need to updated to reflect
        # that.
        pass # Example placeholder for __init__

    def __try__(self):
        SETUP_BLOCK
        pass # Example placeholder for __try__ logic

    def __except__(self, exc, value, traceback):
        if isinstance(exc, exc_type1):
            EXCEPT_BLOCK1
        if isinstance(exc, exc_type2):
            EXCEPT_BLOCK2
        else:
            EXCEPT_BLOCK3

    def __else__(self):
        ELSE_BLOCK

    def __finally__(self):
        FINALLY_BLOCK
```

네 개의 메서드 슬롯보다 두 개의 메서드 슬롯 추가를 선호하는 것 외에도, 저는 기능을 여러 다른 메서드로 분할하거나 (모든 절이 템플릿에서 사용되지 않는 경우) 어떤 메서드를 사용할지 파악해야 하는 것보다 `__exit__()` 메서드에서 원래 `try` 문 코드의 약간 수정된 버전을 단순히 재현할 수 있는 것이 훨씬 쉽다고 생각합니다 (임의의 예외 처리 분리(Factoring out arbitrary exception handling) 섹션 참조).

이 논의를 덜 이론적으로 만들기 위해, 제너레이터 대신 두 메서드 및 네 메서드 프로토콜을 사용하여 구현된 트랜잭션(transaction) 예시가 있습니다. 두 구현 모두 `break`, `return` 또는 `continue` 문이 발생하면 커밋을 보장합니다 (예시 섹션의 제너레이터 기반 구현과 동일).

```python
class transaction_2method(object):
    def __init__(self, db):
        self.db = db
    def __enter__(self):
        pass
    def __exit__(self, exc_type, *exc_details):
        if exc_type is None:
            self.db.commit()
        else:
            self.db.rollback()

class transaction_4method(object):
    def __init__(self, db):
        self.db = db
        self.commit = False
    def __try__(self):
        self.commit = True
    def __except__(self, exc_type, exc_value, traceback):
        self.db.rollback()
        self.commit = False
    def __else__(self):
        pass
    def __finally__(self):
        if self.commit:
            self.db.commit()
        self.commit = False
```

제안의 특정 메서드 이름과 관련된 두 가지 사소한 점이 더 있습니다. `__try__()` 메서드의 이름은 오해의 소지가 있습니다. `SETUP_BLOCK`은 `try` 문이 시작되기 전에 실행되기 때문입니다. 그리고 `__else__()` 메서드의 이름은 고립된 상태에서는 불분명합니다. 수많은 다른 Python 문에 `else` 절이 포함되어 있기 때문입니다.

## 이터레이터 종결 (WITHDRAWN) (Iterator finalisation (WITHDRAWN))

제너레이터 내부에서 사용자 정의 문을 사용할 수 있는 기능은 이터레이터의 확정적 종결 필요성을 증가시킬 가능성이 높습니다. 자원 관리가 현재처럼 외부에서 처리되기보다는 제너레이터 내부로 밀려나기 때문입니다.

이 PEP는 현재 모든 제너레이터를 문 템플릿으로 만들고 `with` 문을 사용하여 종결을 처리함으로써 이 문제를 해결할 것을 제안합니다. 그러나 이 PEP의 초기 버전에서는 제너레이터 작성자가 종결 필요성을 플래그(flag)하고 `for` 루프가 이를 자동으로 처리하도록 허용하는 다음의 더 복잡한 해결책을 제안했습니다. 이는 길고 자세한 거부된 옵션으로 여기에 포함됩니다.

### 이터레이터 프로토콜 추가: `__finish__` (Iterator protocol addition: __finish__)

`__finish__()`라고 하는 이터레이터에 대한 선택적 새 메서드가 제안됩니다. 이 메서드는 인자를 받지 않으며 아무것도 반환해서는 안 됩니다.

`__finish__` 메서드는 이터레이터가 열어둔 모든 자원을 정리할 것으로 예상됩니다. `__finish__()` 메서드를 가진 이터레이터는 이 PEP의 나머지 부분에서 '종결 가능한 이터레이터(finishable iterators)'라고 불립니다.

### 최선의 노력 종결 (Best effort finalisation)

종결 가능한 이터레이터는 종결을 수행하는 `__del__` 메서드도 제공하도록 보장해야 합니다 (예: `__finish__()` 메서드를 호출하여). 이를 통해 Python은 이터레이터에 확정적 종결이 적용되지 않는 경우에도 최선을 다해 종결을 수행할 수 있습니다.

### 확정적 종결 (Deterministic finalisation)

`for` 루프에서 사용되는 이터레이터에 `__finish__()` 메서드가 있는 경우, 개선된 `for` 루프 의미론은 루프를 종료하는 수단에 관계없이 해당 메서드가 실행되도록 보장합니다. 이는 사용자 정의 문 또는 이제 허용되는 `try` / `finally` 문을 활용하는 이터레이터 제너레이터, 또는 할당된 자원(예: 스레드 또는 데이터베이스 연결을 풀(pool)로 해제)을 제때 해제하기 위해 신속한 종결에 의존하는 새로운 이터레이터에 중요합니다.

### `for` 루프 문법 (for loop syntax)

`for` 루프 문법에는 변경 사항이 제안되지 않습니다. 이는 의미론 설명을 위해 필요한 문 부분만 정의하기 위함입니다.

```python
for VAR1 in EXPR1:
    BLOCK1
else:
    BLOCK2
```

### 업데이트된 `for` 루프 의미론 (Updated for loop semantics)

대상 이터레이터에 `__finish__()` 메서드가 없는 경우, `for` 루프는 다음과 같이 실행됩니다 (즉, 현재 상태와 변경 없음).

```python
itr = iter(EXPR1)
exhausted = False
while True:
    try:
        VAR1 = itr.next()
    except StopIteration:
        exhausted = True
        break
    BLOCK1
if exhausted:
    BLOCK2
```

대상 이터레이터에 `__finish__()` 메서드가 있는 경우, `for` 루프는 다음과 같이 실행됩니다.

```python
itr = iter(EXPR1)
exhausted = False
try:
    while True:
        try:
            VAR1 = itr.next()
        except StopIteration:
            exhausted = True
            break
        BLOCK1
    if exhausted:
        BLOCK2
finally:
    itr.__finish__()
```

이터레이터에 `__finish__()` 메서드가 없는 경우 `try` / `finally` 오버헤드를 발생시키지 않도록 구현 시 주의해야 합니다.

### 제너레이터 이터레이터 종결: `__finish__()` 메서드 (Generator iterator finalisation: __finish__() method)

적절한 데코레이터로 활성화될 때, 제너레이터는 내부 프레임에서 `TerminateIteration`을 발생시키는 `__finish__()` 메서드를 가질 것입니다.

```python
def __finish__(self):
    try:
        self._inject_exception(TerminateIteration)
    except TerminateIteration:
        pass
```

이 기능을 활성화하려면 데코레이터(예: `needs_finish()`)가 필요하므로, (종결을 예상하지 않는) 기존 제너레이터가 예상대로 계속 작동합니다.

### 종결 가능한 이터레이터의 부분 이터레이션 (Partial iteration of finishable iterators)

종결 가능한 이터레이터의 부분 이터레이션도 가능하지만, 이터레이터가 즉시 종결되도록 주의해야 합니다 (그것이 종결 가능하게 만들어진 이유가 있습니다!). 먼저, `for` 루프에서 이터레이터의 `__finish__()` 메서드를 숨겨서 종결 가능한 이터레이터의 부분 이터레이션을 가능하게 하는 클래스가 필요합니다.

```python
class partial_iter(object):
    def __init__(self, iterable):
        self.iter = iter(iterable)
    def __iter__(self):
        return self
    def next(self):
        return self.itr.next()
```

둘째, 이터레이터가 결국 종결되도록 보장하는 적절한 문 템플릿이 필요합니다.

```python
@statement_template
def finishing(iterable):
    itr = iter(iterable)
    itr_finish = getattr(itr, "__finish__", None)
    if itr_finish is None:
        yield itr
    else:
        try:
            yield partial_iter(itr)
        finally:
            itr_finish()
```

이것은 다음과 같이 사용될 수 있습니다.

```python
do finishing(finishable_itr) as itr:
    for header_item in itr:
        if end_of_header(header_item):
            break
    # process header item
    for body_item in itr:
        # process body item
```

위 내용은 종결 불가능한 이터레이터에는 필요하지 않다는 점에 유의하십시오. `__finish__()` 메서드가 없으면 `for` 루프에 의해 즉시 종결되지 않으므로 본질적으로 부분 이터레이션을 허용합니다. 종결 불가능한 이터레이터의 부분 이터레이션을 기본 동작으로 허용하는 것은 이 이터레이터 프로토콜 추가가 이전 버전과 호환되도록 유지하는 핵심 요소입니다.

## 감사 (Acknowledgements)

이 텍스트는 PEP 340 논의에서 발전했으므로 PEP 340의 감사 섹션이 적용되지만, 처음으로 PEP 310과 PEP 340을 작성해 준 Michael Hudson, Paul Moore, Guido van Rossum에게 추가적인 감사를 표하며, (의미 있는 순서는 아니지만) Fredrik Lundh, Phillip J. Eby, Steven Bethard, Josiah Carlson, Greg Ewing, Tim Delaney 및 Arnold deVos에게 이 텍스트에 포함된 특정 아이디어를 촉발한 것에 대해 감사합니다.

## 참고 자료 (References)

*   A rant against flow control macros (http://blogs.msdn.com/oldnewthing/archive/2005/01/06/347666.aspx)
*   Why doesn't C# have a 'with' statement? (http://msdn.microsoft.com/vcsharp/programming/language/ask/withstatement/)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.