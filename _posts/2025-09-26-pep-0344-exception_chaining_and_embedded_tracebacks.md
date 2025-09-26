---
title: "[Superseded] PEP 344 - Exception Chaining and Embedded Tracebacks"
excerpt: "Python Enhancement Proposal 344: 'Exception Chaining and Embedded Tracebacks'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/344/
toc: true
toc_sticky: true
date: 2025-09-26 18:54:00+0900
last_modified_at: 2025-09-26 18:54:00+0900
published: true
---
> **원문 링크:** [PEP 344 - Exception Chaining and Embedded Tracebacks](https://peps.python.org/pep-0344/)
>
> **상태:** Superseded | **유형:** Standards Track | **작성일:** 12-May-2005



## PEP 344 – 예외 연쇄 (Exception Chaining) 및 내장 트레이스백 (Embedded Tracebacks)

### 개요 (Abstract)
이 PEP는 예외 인스턴스에 세 가지 표준 속성을 추가할 것을 제안합니다: 묵시적으로 연쇄된 예외를 위한 `__context__` 속성, 명시적으로 연쇄된 예외를 위한 `__cause__` 속성, 그리고 트레이스백을 위한 `__traceback__` 속성입니다. 새로운 `raise ... from` 문은 `__cause__` 속성을 설정하는 데 사용됩니다.

### 동기 (Motivation)
하나의 예외(예외 A)를 처리하는 도중에 다른 예외(예외 B)가 발생할 수 있습니다. 기존 Python 2.4에서는 이러한 경우 예외 B가 전파되고 예외 A는 유실되었습니다. 문제 디버깅을 위해서는 두 예외 모두에 대한 정보가 유용하며, `__context__` 속성은 이 정보를 자동으로 유지합니다.

때로는 예외 핸들러가 추가 정보를 제공하거나 예외 유형을 변환하기 위해 의도적으로 예외를 다시 발생시키는 것이 유용할 수 있습니다. `__cause__` 속성은 예외의 직접적인 원인을 명시적으로 기록하는 방법을 제공합니다.

현재 Python 구현에서 예외는 유형(type), 값(value), 트레이스백(traceback)의 세 부분으로 구성됩니다. `sys` 모듈은 `exc_type`, `exc_value`, `exc_traceback` 세 변수를 통해 현재 예외를 노출하며, `sys.exc_info()` 함수는 이 세 부분을 튜플로 반환합니다. 그러나 `except` 문은 값에만 접근할 수 있고 트레이스백에는 접근할 수 없었습니다. `__traceback__` 속성을 예외 값에 추가함으로써 모든 예외 정보를 한 곳에서 접근할 수 있게 됩니다.

### 역사 (History)
이 예외 연쇄 아이디어는 2003년 1월 Raymond Hettinger에 의해 처음 제기되었으며, Brett Cannon과 Greg Ewing 등 여러 개발자에 의해 논의가 이어졌습니다. Greg Ewing과 Guido van Rossum은 예외 인스턴스에 트레이스백 속성을 추가하는 것을 언급하기도 했습니다.

### 근거 (Rationale)
Python-Dev 토론을 통해 예외 연쇄에 대한 두 가지 다른 목적의 관심이 드러났습니다. 예상치 못한 보조 예외 발생을 처리하기 위해서는 예외가 묵시적으로 유지되어야 하며, 예외의 의도적인 변환을 지원하기 위해서는 예외를 명시적으로 연쇄할 수 있는 방법이 있어야 합니다. 이 PEP는 이 두 가지를 모두 다룹니다.

묵시적으로 연쇄된 예외에는 `__context__`를, 명시적으로 연쇄된 예외에는 `__cause__`를 사용할 것을 제안합니다. 이 세 가지 속성(`__context__`, `__cause__`, `__traceback__`)은 Python VM에 의해 설정되기 때문에 이중 밑줄이 있는 이름을 가집니다.

이 PEP는 `except` 블록과 `finally` 블록에서 발생하는 예외를 동일한 방식으로 처리합니다. 트레이스백을 통해 예외 발생 위치를 명확히 알 수 있으므로, 두 경우를 구분하기 위한 추가 메커니즘은 불필요한 복잡성만 추가할 것입니다. 가장 바깥쪽 예외 객체( `except` 절에 의해 매칭되는 예외)는 현재 동작과의 호환성을 위해 가장 최근에 발생한 예외가 됩니다.

트레이스백은 가장 바깥쪽 예외를 마지막에 표시하도록 제안합니다. 이는 트레이스백의 시간 순서(가장 오래된 프레임부터 가장 최근 프레임까지)와 일치하며, 실제 발생한 예외를 마지막 줄에서 쉽게 찾을 수 있기 때문입니다.

### 묵시적 예외 연쇄 (Implicit Exception Chaining)
예외 처리 중 다른 예외가 발생할 때 이전 예외가 `__context__` 속성에 저장되어 유지됩니다.
예를 들어, `compute(0, 0)` 호출 시 `ZeroDivisionError`가 발생하고, 이를 `except`에서 처리하며 `log(exc)`를 호출합니다. 그러나 `log` 함수 내에서 쓰기 모드로 열리지 않은 파일에 쓰려고 할 때 `IOError`가 발생하면, `IOError` 인스턴스에는 `ZeroDivisionError`를 유지하는 추가 `__context__` 속성이 생깁니다.

**제안된 의미론:**
각 스레드는 처음에 `None`으로 설정된 예외 컨텍스트를 가집니다. 예외가 발생할 때, 예외 인스턴스에 `__context__` 속성이 없으면 인터프리터는 이를 스레드의 예외 컨텍스트와 동일하게 설정합니다. 예외가 발생한 직후, 스레드의 예외 컨텍스트는 해당 예외로 설정됩니다. 인터프리터가 `except` 블록을 종료하거나 `return`, `yield`, `continue`, `break` 문을 실행하여 종료할 때, 스레드의 예외 컨텍스트는 `None`으로 설정됩니다.

### 명시적 예외 연쇄 (Explicit Exception Chaining)
예외 객체의 `__cause__` 속성은 항상 `None`으로 초기화됩니다. 이는 새로운 형태의 `raise` 문인 `raise EXCEPTION from CAUSE`에 의해 설정됩니다.
이 구문은 다음과 동일합니다:
```python
exc = EXCEPTION
exc.__cause__ = CAUSE
raise exc
```
예를 들어, `FileDatabase`가 `IOError`를 발생시켰을 때 이를 `DatabaseError`로 변환하여 다시 발생시키면서 `IOError` 정보를 `__cause__` 속성을 통해 유지할 수 있습니다.

### 트레이스백 속성 (Traceback Attribute)
`__traceback__` 속성은 예외 객체 자체에 트레이스백 정보를 직접 연결하여 접근성을 높입니다.
예를 들어, `do_logged()` 함수에서 예외 발생 시 `write_exception()` 함수에 예외 객체 하나만 전달하면, `write_exception()`은 `exc.__traceback__`을 통해 트레이스백 정보를 직접 얻을 수 있습니다.

**제안된 의미론:**
예외가 포착될 때, 예외 인스턴스에 `__traceback__` 속성이 없으면 인터프리터는 이를 새로 포착된 트레이스백으로 설정합니다.

### 향상된 보고 (Enhanced Reporting)
기본 예외 핸들러는 연쇄된 예외를 보고하도록 수정됩니다. 예외 체인은 `__cause__`와 `__context__` 속성을 따라 탐색되며, `__cause__`가 우선순위를 가집니다. 트레이스백의 시간 순서에 따라 가장 최근에 발생한 예외가 마지막에 표시됩니다. 즉, 가장 안쪽 예외부터 시작하여 가장 바깥쪽 예외까지 체인을 거슬러 올라가며 표시됩니다.

트레이스백 모듈의 `format_exception`, `print_exception`, `print_exc`, `print_last` 함수는 선택적 `chain` 인수를 허용하도록 업데이트됩니다 (기본값은 `True`). `True`일 경우 전체 예외 체인을 포맷팅하거나 표시하며, `False`일 경우 가장 바깥쪽 예외만 표시합니다. `cgitb` 모듈도 전체 예외 체인을 표시하도록 업데이트되어야 합니다.

### C API 호환성 (C API Compatibility)
예외를 설정하는 `PyErr_Set*` 호출은 예외에 `__context__` 속성을 설정하지 않습니다. `PyErr_NormalizeException`은 항상 트레이스백 속성을 `tb` 인수로 설정하고, `__context__`와 `__cause__` 속성은 `None`으로 설정합니다.

새로운 API 함수인 `PyErr_SetContext(context)`는 C 프로그래머가 연쇄된 예외 정보를 제공하는 데 도움을 줍니다. 이 함수는 먼저 현재 예외를 인스턴스로 정규화한 다음, `__context__` 속성을 설정합니다. 유사한 API 함수인 `PyErr_SetCause(cause)`는 `__cause__` 속성을 설정합니다.

### 호환성 (Compatibility)
연쇄된 예외는 가장 최근 예외의 유형을 노출하므로, 현재와 동일한 `except` 절에 매칭됩니다. 제안된 변경 사항은 예외 인스턴스에서 `__context__`, `__cause__`, `__traceback__`이라는 이름의 속성을 설정하거나 사용하는 코드가 없는 한 호환성 문제를 일으키지 않을 것입니다.

### 미해결 과제 (Open Issues)
*   **추가 정보 (Extra Information):** 예외 유형을 변경하지 않고 예외에 추가 정보를 첨부하는 기능은 이 PEP에서 다루지 않습니다.
*   **컨텍스트 억제 (Suppressing Context):** 이 PEP의 현재 방식으로는 `__context__`를 억제하는 것이 불가능합니다.
*   **예외 유형 제한 (Limiting Exception Types):** 라이브러리 구현자가 모든 내부 예외를 애플리케이션 수준 예외로 감싸고 싶을 수 있지만, 현재 `except` 문에서 현재 예외를 명명하는 기능은 없습니다.
*   **yield:** `yield` 문이 실행될 때 예외 컨텍스트가 손실됩니다. 이 문제는 이 PEP의 범위를 벗어납니다.
*   **가비지 컬렉션 (Garbage Collection):** 이 제안에 대한 가장 강력한 반대는 예외와 스택 프레임 사이에 순환(cycle)을 생성한다는 것입니다. 이로 인해 순환 가비지 컬렉션(cyclic garbage collection) 및 리소스 해제가 크게 지연될 수 있습니다. `__traceback__` 속성을 약한 참조(weak reference)로 만들거나 스택 프레임에서 예외 변수로의 참조를 약한 참조로 변경하는 등의 대안이 논의되었습니다.

### 향후 호환 가능한 변경 사항 (Possible Future Compatible Changes)
*   인터프리터 수준에서 예외가 세 개의 튜플이 아닌 단일 객체로 나타나는 것과 일치하는 변경 사항입니다.
*   `__exit__`의 세 인자(`type`, `value`, `traceback`)를 단일 예외 인자로 대체합니다.
*   `sys.exc_type`, `sys.exc_value`, `sys.exc_traceback`, `sys.exc_info()`를 단일 `sys.exception` 멤버로 대체하고 사용을 중단합니다.
*   `sys.last_type`, `sys.last_value`, `sys.last_traceback`을 단일 `sys.last_exception` 멤버로 대체하고 사용을 중단합니다.
*   `raise` 문의 세 인자 형태를 한 인자 형태로 대체하고 사용을 중단합니다.
*   `cgitb.html()`을 업데이트하여 첫 번째 인자로 `(type, value, traceback)` 튜플 대신 단일 값을 허용합니다.

### 향후 호환되지 않는 변경 사항 (Possible Future Incompatible Changes)
Python 3000(Python 3)을 위해 고려할 만한 변경 사항입니다.
*   `sys.exc_type`, `sys.exc_value`, `sys.exc_traceback`, `sys.exc_info()` 제거.
*   `sys.last_type`, `sys.last_value`, `sys.last_traceback` 제거.
*   세 인자를 받는 `sys.excepthook`을 한 인자를 받는 API로 대체하고 `cgitb` 모듈을 일치시키도록 변경.
*   `raise` 문의 세 인자 형태 제거.
*   `traceback.print_exception`을 `type`, `value`, `traceback` 인자 대신 예외 인자를 받도록 업그레이드.

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.