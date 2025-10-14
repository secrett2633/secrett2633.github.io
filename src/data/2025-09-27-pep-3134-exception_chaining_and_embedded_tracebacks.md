---
title: "[Final] PEP 3134 - Exception Chaining and Embedded Tracebacks"
excerpt: "Python Enhancement Proposal 3134: 'Exception Chaining and Embedded Tracebacks'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3134/
toc: true
toc_sticky: true
date: 2025-09-27 14:33:48+0900
last_modified_at: 2025-09-27 14:33:48+0900
published: true
---
> **원문 링크:** [PEP 3134 - Exception Chaining and Embedded Tracebacks](https://peps.python.org/pep-3134/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 12-May-2005

# PEP 3134 – 예외 체인(Exception Chaining) 및 임베디드 트레이스백(Embedded Tracebacks)

*이 문서는 Python 3.0에 도입된 예외 처리 메커니즘 개선 제안인 PEP 3134를 한국어 사용자가 이해하기 쉽도록 번역 및 정리한 것입니다.*

## 개요 (Abstract)

이 PEP(Python Enhancement Proposal)는 예외 인스턴스에 세 가지 표준 속성을 제안합니다.
- `__context__`: 암시적으로 연결된(implicitly chained) 예외를 위한 속성.
- `__cause__`: 명시적으로 연결된(explicitly chained) 예외를 위한 속성.
- `__traceback__`: 트레이스백(traceback) 정보를 위한 속성.

새로운 `raise ... from` 구문은 `__cause__` 속성을 설정합니다.

## 동기 (Motivation)

하나의 예외(예외 A)를 처리하는 도중에 다른 예외(예외 B)가 발생할 수 있습니다. 기존 Python(버전 2.4)에서는 이런 경우 예외 B가 전파되고 예외 A는 사라졌습니다. 문제 디버깅을 위해서는 두 예외 모두에 대한 정보를 아는 것이 유용하며, `__context__` 속성은 이 정보를 자동으로 유지합니다.

때로는 예외 핸들러(handler)가 추가 정보를 제공하거나 예외 유형을 변환하기 위해 의도적으로 예외를 다시 발생시키는 것이 유용할 수 있습니다. `__cause__` 속성은 예외의 직접적인 원인을 명시적으로 기록하는 방법을 제공합니다.

기존 Python 구현에서 예외는 타입(type), 값(value), 트레이스백(traceback)의 세 부분으로 구성됩니다. `sys` 모듈은 현재 예외를 `exc_type`, `exc_value`, `exc_traceback` 세 개의 병렬 변수로 노출하며, `sys.exc_info()` 함수는 이 세 부분으로 구성된 튜플을 반환합니다. 또한 `raise` 문은 이 세 부분을 받는 세 개의 인자 형식을 가집니다. 예외를 조작하려면 이 세 가지를 병렬로 전달해야 하는 경우가 많아 번거롭고 오류가 발생하기 쉬웠습니다. 게다가 `except` 문은 값에만 접근할 수 있었고 트레이스백에는 접근할 수 없었습니다. 예외 값에 `__traceback__` 속성을 추가함으로써 모든 예외 정보를 한 곳에서 접근할 수 있게 됩니다.

## 배경 (History)

- 2003년 1월, Raymond Hettinger는 `Python-Dev`에서 마스킹된 예외(masked exceptions) 문제를 제기하고 C 모듈이 현재 활성 예외에 더 많은 정보를 추가할 수 있도록 `PyErr_FormatAppend()` 함수를 제안했습니다.
- 2003년 6월, Brett Cannon이 다시 예외 체인 문제를 언급하면서 긴 토론이 시작되었습니다.
- Greg Ewing은 원래 예외에 의해 트리거된 언와인딩(unwinding) 중 `finally` 블록에서 예외가 발생하는 경우와 원래 예외를 처리하는 `except` 블록에서 예외가 발생하는 경우를 구별했습니다.
- Greg Ewing과 Guido van Rossum 등은 이전에 `Exception` 인스턴스에 트레이스백 속성을 추가하는 것을 언급했습니다. 이는 PEP 3000에 언급되어 있습니다.
- 이 PEP는 동일한 아이디어에 대한 또 다른 `Python-Dev` 재게시를 계기로 시작되었습니다.

## 제안 배경 및 논리 (Rationale)

`Python-Dev` 토론을 통해 예외 체인에 대한 두 가지 다른 목적의 관심사가 드러났습니다.
1. 예기치 않게 발생하는 보조 예외를 처리하기 위해서는 예외가 암시적으로 유지되어야 합니다.
2. 예외의 의도적인 변환(translation)을 지원하기 위해서는 예외를 명시적으로 연결할 수 있는 방법이 있어야 합니다.

이 PEP는 이 두 가지 모두를 다룹니다.

체인 예외를 위한 여러 속성 이름이 `Python-Dev`에서 제안되었지만, 이 PEP는 명시적으로 연결된 예외에 대해 그 의미가 명확한 `__cause__`를 제안합니다. 암시적으로 연결된 예외에 대해서는 `__context__`라는 이름을 제안하는데, 이는 시간적 선행(temporal precedence)보다 더 구체적이지만 인과 관계(causation)보다는 덜 구체적인, 즉 "다른 예외를 처리하는 `컨텍스트`에서 예외가 발생한다"는 의미를 의도하기 때문입니다.

이 세 속성(`__context__`, `__cause__`, `__traceback__`)에 선행 및 후행 이중 밑줄이 있는 이름을 제안하는 이유는 이들이 Python VM(Virtual Machine)에 의해 설정되기 때문입니다. 일반적인 할당으로는 매우 특별한 경우에만 설정되어야 합니다.

이 PEP는 `except` 블록과 `finally` 블록에서 발생하는 예외를 동일하게 처리합니다. 트레이스백을 읽으면 예외가 어디에서 발생했는지 명확해지므로, 두 경우를 구별하기 위한 추가 메커니즘은 불필요한 복잡성만 추가할 것입니다.

이 PEP는 현재 동작과의 호환성을 위해 가장 바깥쪽 예외 객체( `except` 절에 의해 매칭되는 객체)가 가장 최근에 발생한 예외가 되도록 제안합니다.

또한 트레이스백이 가장 바깥쪽 예외를 마지막에 표시하도록 제안하는데, 이는 트레이스백의 시간 순서(가장 오래된 프레임부터 가장 최근 프레임까지)와 일치하고 실제 발생한 예외를 마지막 줄에서 더 쉽게 찾을 수 있기 때문입니다.

간결성을 위해, 예외를 설정하는 C API 호출은 예외의 `__context__`를 자동으로 설정하지 않습니다.

다른 언어의 경우, Java와 Ruby는 `catch`/`rescue` 또는 `finally`/`ensure` 절에서 다른 예외가 발생하면 원래 예외를 버립니다. Perl 5는 내장된 구조화된 예외 처리가 없습니다. Perl 6의 RFC 88은 `@@`라는 배열에 체인된 예외를 암시적으로 유지하는 예외 메커니즘을 제안합니다. C#의 예외는 다른 예외를 가리킬 수 있는 읽기 전용 `InnerException` 속성을 포함합니다. `__cause__` 속성은 `InnerException`과 동일한 목적을 수행하지만, 이 PEP는 모든 예외의 생성자를 확장하는 대신 새로운 형태의 `raise`를 제안합니다.

이 세 속성(`__context__`, `__cause__`, `__traceback__`)이 하나의 제안으로 함께 제시되는 이유는 `__traceback__` 속성이 체인 예외에 대한 트레이스백에 편리하게 접근할 수 있도록 해주기 때문입니다.

## 암시적 예외 체인 (Implicit Exception Chaining)

`__context__` 속성을 보여주는 예시입니다.

```python
def compute(a, b):
    try:
        a / b
    except Exception as exc: # Python 2.x에서는 'except Exception, exc:'
        log(exc)

def log(exc):
    file = open('logfile.txt') # 의도적으로 'w' 모드를 잊음
    print(exc, file=file) # Python 2.x에서는 'print >>file, exc'
    file.close()
```
`compute(0, 0)`을 호출하면 `ZeroDivisionError`가 발생합니다. `compute()` 함수는 이 예외를 catch하고 `log(exc)`를 호출하지만, `log()` 함수는 쓰기 모드로 열리지 않은 파일에 쓰려고 할 때 또 다른 예외를 발생시킵니다.

기존 Python에서는 `compute()`의 호출자에게 `IOError`가 발생하고 `ZeroDivisionError`는 손실됩니다. 이 제안된 변경사항을 적용하면, `IOError` 인스턴스에 `ZeroDivisionError`를 유지하는 추가 `__context__` 속성이 포함됩니다.

제안된 의미론은 다음과 같습니다.
- 각 스레드(thread)는 처음에 `None`으로 설정된 예외 컨텍스트를 가집니다.
- 예외가 발생할 때마다, 예외 인스턴스가 `__context__` 속성을 이미 가지고 있지 않으면 인터프리터(interpreter)는 이를 스레드의 예외 컨텍스트와 동일하게 설정합니다.
- 예외가 발생한 직후, 스레드의 예외 컨텍스트는 해당 예외로 설정됩니다.
- 인터프리터가 `except` 블록을 끝까지 실행하거나 `return`, `yield`, `continue`, `break` 문을 실행하여 종료할 때마다 스레드의 예외 컨텍스트는 `None`으로 설정됩니다.

## 명시적 예외 체인 (Explicit Exception Chaining)

예외 객체의 `__cause__` 속성은 항상 `None`으로 초기화됩니다. 이는 새로운 형태의 `raise` 문에 의해 설정됩니다.

```python
raise EXCEPTION from CAUSE
```
이는 다음과 동일합니다.

```python
exc = EXCEPTION
exc.__cause__ = CAUSE
raise exc
```

다음 예시에서 데이터베이스는 파일 저장소를 포함한 여러 종류의 저장소 구현을 제공합니다. 데이터베이스 설계자는 클라이언트가 저장소 특정 세부 정보를 알 필요 없이 오류가 `DatabaseError` 객체로 전파되기를 원하지만, 근본적인 오류 정보는 잃고 싶지 않습니다.

```python
class DatabaseError(Exception):
    pass

class FileDatabase(object): # PEP 원문에는 Database 클래스 상속이지만, 예시 코드이므로 간략화
    def __init__(self, filename):
        try:
            self.file = open(filename)
        except IOError as exc: # Python 2.x에서는 'except IOError, exc:'
            raise DatabaseError('failed to open') from exc
```
`open()` 호출이 예외를 발생시키면, 문제는 `DatabaseError`로 보고되며, `__cause__` 속성은 `IOError`가 원래 원인임을 나타냅니다.

## 트레이스백 속성 (Traceback Attribute)

`__traceback__` 속성을 보여주는 예시입니다.

```python
from traceback import format_tb

def do_logged(file, work):
    try:
        work()
    except Exception as exc: # Python 2.x에서는 'except Exception, exc:'
        write_exception(file, exc)
        raise exc # 예외를 다시 발생시킴

def write_exception(file, exc):
    # ...
    type_name = exc.__class__.__name__
    message = str(exc)
    lines = format_tb(exc.__traceback__)
    file.write(f"Type: {type_name}\nMessage: {message}\nTraceback:\n{''.join(lines)}\n")
    # ...
```
기존 Python에서는 `do_logged()` 함수가 `sys.exc_traceback` 또는 `sys.exc_info()`에서 트레이스백을 추출하여 값과 트레이스백을 모두 `write_exception()`에 전달해야 했습니다. 제안된 변경사항을 적용하면 `write_exception()`은 단 하나의 인자만 받고 `__traceback__` 속성을 사용하여 예외 정보를 얻습니다.

제안된 의미론은 다음과 같습니다.
- 예외가 catch될 때마다, 예외 인스턴스가 `__traceback__` 속성을 이미 가지고 있지 않으면 인터프리터는 이를 새로 catch된 트레이스백으로 설정합니다.

## 향상된 보고 (Enhanced Reporting)

기본 예외 핸들러(default exception handler)는 체인 예외를 보고하도록 수정될 것입니다. 예외 체인은 `__cause__`와 `__context__` 속성을 따라 탐색되며, `__cause__`가 우선순위를 가집니다. 트레이스백의 시간 순서를 유지하기 위해 가장 최근에 발생한 예외가 마지막에 표시됩니다. 즉, 가장 안쪽 예외에 대한 설명으로 시작하여 가장 바깥쪽 예외까지 체인을 거슬러 올라갑니다. 트레이스백은 평소처럼 포맷되며, `__cause__` 또는 `__context__`에 의해 연결되었는지에 따라 트레이스백 사이에 다음 줄 중 하나가 표시됩니다.

- `The above exception was the direct cause of the following exception:` (`__cause__`로 연결된 경우)
- `During handling of the above exception, another exception occurred:` (`__context__`로 연결된 경우)

`traceback` 모듈에서 `format_exception`, `print_exception`, `print_exc`, `print_last` 함수는 선택적 `chain` 인자(기본값 `True`)를 받도록 업데이트될 것입니다. 이 인자가 `True`인 경우, 이 함수들은 방금 설명한 대로 전체 예외 체인을 포맷하거나 표시합니다. `False`인 경우, 가장 바깥쪽 예외만 포맷하거나 표시합니다. `cgitb` 모듈도 전체 예외 체인을 표시하도록 업데이트되어야 합니다.

## C API 호환성 (C API Compatibility)

예외를 설정하는 `PyErr_Set*` 호출은 예외의 `__context__` 속성을 설정하지 않습니다. `PyErr_NormalizeException`은 항상 트레이스백 속성을 `tb` 인자로, `__context__` 및 `__cause__` 속성을 `None`으로 설정할 것입니다.

새로운 API 함수인 `PyErr_SetContext(context)`는 C 프로그래머가 체인 예외 정보를 제공하는 데 도움을 줄 것입니다. 이 함수는 먼저 현재 예외를 인스턴스로 정규화한 다음 `__context__` 속성을 설정합니다. 유사한 API 함수인 `PyErr_SetCause(cause)`는 `__cause__` 속성을 설정할 것입니다.

## 호환성 (Compatibility)

체인 예외는 가장 최근 예외의 타입을 노출하므로, 현재와 동일한 `except` 절에 계속 매칭될 것입니다.

제안된 변경사항은 예외 인스턴스에 `__context__`, `__cause__`, `__traceback__`이라는 이름의 속성을 설정하거나 사용하는 코드가 아니라면 어떤 코드도 손상시키지 않을 것입니다. 2005년 5월 12일 기준으로 Python 표준 라이브러리에는 이러한 속성에 대한 언급이 없습니다.

## 알려진 미해결 문제 (Open Issues)

### 추가 정보 (Extra Information)

Walter Dörwald는 예외 타입을 변경하지 않고도 상위 전파(upward propagation) 중에 예외에 추가 정보를 첨부하고 싶다는 바람을 표명했습니다. 이는 유용한 기능일 수 있지만, 이 PEP에서는 다루지 않습니다. 별도의 PEP에서 예외에 대한 다른 정보 속성에 대한 규칙을 설정함으로써 다루어질 수 있습니다.

### 컨텍스트 억제 (Suppressing Context)

이 PEP에 작성된 바와 같이, `except` 또는 `finally` 절에서 `exc.__context__`를 `None`으로 설정해도 `exc`가 다시 발생할 때 다시 설정되기 때문에 `__context__`를 억제하는 것은 불가능합니다.

### 예외 유형 제한 (Limiting Exception Types)

캡슐화(encapsulation)를 개선하기 위해 라이브러리 구현자는 모든 구현 수준 예외를 애플리케이션 수준 예외로 래핑(wrap)하기를 원할 수 있습니다.

### `yield` 문 (yield)

`yield` 문이 실행될 때 예외 컨텍스트가 손실됩니다. `yield` 이후 프레임을 재개해도 컨텍스트가 복원되지 않습니다. 이 문제는 이 PEP의 범위를 벗어나며, 새로운 문제는 아닙니다.

### 가비지 컬렉션 (Garbage Collection)

이 제안에 대한 가장 강력한 반대는 예외와 스택 프레임(stack frames) 사이에 순환(cycle)을 생성한다는 것입니다. 순환 가비지(cyclic garbage)의 수집(따라서 자원 해제)이 크게 지연될 수 있습니다.

```python
try:
    1 / 0
except Exception as err: # Python 2.x에서는 'except Exception, err:'
    pass
```
위 코드는 `err` -> `traceback` -> 스택 프레임 -> `err`로 이어지는 순환을 도입하여, 다음 GC(Garbage Collection)가 발생할 때까지 동일한 스코프(scope) 내의 모든 지역 변수(locals)를 유지합니다.

현재는 이러한 지역 변수가 스코프를 벗어납니다. 특히 열린 파일과 같은 "지역" 자원이 빠르게 닫힐 것이라고 가정하는 많은 코드가 있습니다. 만약 닫힘이 다음 GC를 기다려야 한다면 (오늘날에는 잘 작동하는) 프로그램이 파일 핸들 부족을 겪을 수 있습니다.

`__traceback__` 속성을 약한 참조(weak reference)로 만들면 순환 가비지 문제를 피할 수 있습니다. 그러나 이는 나중에 예외를 저장하는 것(예: `unittest`에서 하는 방식)을 더 어렵게 만들고, `sys` 모듈의 정리를 그렇게 많이 허용하지 않을 것입니다. Adam Olsen이 제안한 가능한 대안 솔루션은 스택 프레임에서 `err` 변수로의 참조를 변수가 스코프를 벗어날 때 약한 참조로 바꾸는 것입니다.

## 향후 호환 가능한 변경 사항 (Possible Future Compatible Changes)

이러한 변경 사항은 인터프리터 수준에서 예외가 세 개의 튜플이 아닌 단일 객체로 나타나는 것과 일치합니다.

- PEP 340 또는 PEP 343이 수락되면 `__exit__`의 세 인자(`type`, `value`, `traceback`)를 단일 예외 인자로 대체합니다.
- `sys.exc_type`, `sys.exc_value`, `sys.exc_traceback`, `sys.exc_info()`를 단일 멤버인 `sys.exception`을 위해 폐지합니다.
- `sys.last_type`, `sys.last_value`, `sys.last_traceback`을 단일 멤버인 `sys.last_exception`을 위해 폐지합니다.
- `raise` 문의 세 인자 형식을 한 인자 형식으로 폐지합니다.
- `cgitb.html()`을 업데이트하여 (type, value, traceback) 튜플의 대안으로 첫 번째 인자로 단일 값을 받도록 합니다.

## 향후 비호환 변경 사항 (Possible Future Incompatible Changes)

이러한 변경 사항은 Python 3000(Python 3.x)에서 고려해볼 가치가 있을 수 있습니다.

- `sys.exc_type`, `sys.exc_value`, `sys.exc_traceback`, `sys.exc_info()` 제거.
- `sys.last_type`, `sys.last_value`, `sys.last_traceback` 제거.
- 세 인자를 받는 `sys.excepthook`을 한 인자 API로 대체하고 `cgitb` 모듈을 일치시키도록 변경.
- `raise` 문의 세 인자 형식 제거.
- `traceback.print_exception`을 업데이트하여 `type`, `value`, `traceback` 인자 대신 예외 인자를 받도록 합니다.

## 구현 (Implementation)

`__traceback__` 및 `__cause__` 속성과 새로운 `raise` 구문은 리비전 57783에서 구현되었습니다.

## 감사의 글 (Acknowledgements)

Brett Cannon, Greg Ewing, Guido van Rossum, Jeremy Hylton, Phillip J. Eby, Raymond Hettinger, Walter Dörwald, 그리고 다른 분들께 감사드립니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.