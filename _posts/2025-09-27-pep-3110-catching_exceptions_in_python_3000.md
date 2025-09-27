---
title: "[Final] PEP 3110 - Catching Exceptions in Python 3000"
excerpt: "Python Enhancement Proposal 3110: 'Catching Exceptions in Python 3000'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3110/
toc: true
toc_sticky: true
date: 2025-09-27 14:21:16+0900
last_modified_at: 2025-09-27 14:21:16+0900
published: true
---
> **원문 링크:** [PEP 3110 - Catching Exceptions in Python 3000](https://peps.python.org/pep-3110/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 16-Jan-2006

파이썬 3000의 예외 처리 (PEP 3110)

## 개요
이 PEP (Python Enhancement Proposal)는 Python 3.0에서 예외(exception) 처리 구문의 모호성을 제거하고, 예외 클래스를 간소화하며, 예외의 가비지 컬렉션(garbage collection)을 단순화하고, 언어의 크기를 줄이는 것을 목표로 하는 변경 사항을 소개합니다.

## 도입 배경 (Rationale)
Python 2.x의 `except` 절은 문법적 모호성을 가지고 있었습니다. 파서는 `except <expression>, <expression>:` 구문을 `except <type>, <type>:` 또는 `except <type>, <name>:` 중 어느 것으로 해석해야 할지 구별하기 어려웠습니다. Python 2는 후자(예외 타입을 잡고 변수에 할당하는 방식)를 선택했으며, 이로 인해 전자의 경우 괄호로 묶어야 했습니다: `except (<type>, <type>):`.

PEP 352에 명시된 바와 같이, 예외를 튜플처럼 다루는 기능이 제거될 예정이었습니다. 이는 `except os.error, (errno, errstr):`와 같은 코드가 더 이상 작동하지 않음을 의미합니다. 자동 언패킹(unpacking)이 불가능해짐에 따라, `except` 대상(target)으로 튜플을 사용하는 기능도 제거하는 것이 바람직했습니다.

또한, PEP 344에 따라 Python 3의 예외 인스턴스는 `__traceback__` 속성을 가지게 됩니다. 이 속성은 "예외 -> 트레이스백 -> 스택 프레임 -> 예외"의 참조 사이클(reference cycle)을 유발하여, 다음 가비지 컬렉션 실행 시점까지 모든 지역 변수가 범위 내에 유지되는 가비지 컬렉션 문제를 발생시켰습니다. PEP 3110은 `except` 스위트(suite)의 끝에서 대상 이름(target name)을 삭제하는 정리(cleanup) 의미론을 추가하여 이 문제를 해결하고자 했습니다.

"무언가를 하는 한 가지 – 그리고 바람직하게는 단 하나의 – 명확한 방법이 있어야 한다"는 원칙에 따라 중복 기능을 통합하는 것이 바람직했습니다. 이를 위해 `sys` 모듈의 `exc_value`, `exc_type`, `exc_traceback` 속성은 동일한 정보를 제공하는 `sys.exc_info()`로 대체되어 제거될 예정이었습니다. 이 속성들은 이미 PEP 3100에서 제거 대상으로 지정되어 있었습니다.

## 문법 변경 (Grammar Changes)
Python 3에서는 `except` 문의 문법이 다음과 같이 변경됩니다:

이전 (Python 2.x):
```
except_clause: 'except' [test [',' test]]
```

이후 (Python 3.x):
```
except_clause: 'except' [test ['as' NAME]]
```
콤마(`,`) 토큰 대신 `as` 키워드를 사용함으로써, `except (AttributeError, os.error):`와 같은 구문은 예외 클래스의 튜플로 명확하게 이해될 수 있게 되었습니다. 이 새로운 문법은 Greg Ewing에 의해 처음 제안되었고, BDFL (Guido van Rossum)의 지지를 받았습니다.

또한, `as` 뒤에 오는 토큰의 제약이 `test`에서 `NAME`으로 변경되어, 유효한 식별자(identifier)만 `except`의 대상(target)으로 사용할 수 있게 됩니다.

위의 문법은 예외 클래스로 괄호로 묶인 튜플을 항상 요구합니다. 이는 Python 2.x와 3.x에서 다른 의미를 가질 수 있어 잡기 어려운 버그를 유발할 수 있었던 모호한 `except A, B:` 구문이 Python 3.x 코드에서는 허용되지 않도록 합니다.

## 의미론적 변경 (Semantic Changes)
PEP 344와 관련된 가비지 컬렉션 문제를 해결하기 위해, Python 3의 `except` 문은 대상을 삭제하는 추가 바이트코드(bytecode)를 생성하여 참조 사이클을 제거합니다. Phillip J. Eby가 제안한 소스 대 소스 번역은 다음과 같습니다:

`try: try_body except E as N: except_body ...`

는 (Python 2.5 용어로) 다음과 같이 번역됩니다:

```python
try:
    try_body
except E, N:  # Python 2.x equivalent for illustration
    try:
        except_body
    finally:
        N = None
        del N
...
```
이 구현은 이미 `py3k` (이전에는 `p3yk`) 브랜치에 반영되었습니다.

## 호환성 문제 (Compatibility Issues)
거의 모든 `except` 절이 변경되어야 합니다.
*   식별자(identifier)를 대상으로 하는 `except` 절은 `except E, N:`에서 `except E as N:`으로 변환됩니다.
*   튜플이 아닌, 식별자가 아닌 대상을 가진 `except` 절 (예: `a.b.c[d]`)은 `except E, T:`에서 `except E as t: T = t`로 변환되어야 합니다.
이 두 가지 경우는 Guido van Rossum의 2to3 유틸리티와 `except` fixer를 사용하여 처리할 수 있습니다.

튜플 대상을 가진 `except` 절은 수동으로 개별 사례에 따라 변환해야 합니다. 이러한 변경은 일반적으로 예외 클래스 자체의 변경을 수반합니다. 이러한 변경은 일반적으로 자동화할 수 없지만, 2to3 유틸리티는 `except` 절의 대상이 튜플인 경우를 지적하여 변환을 단순화할 수 있습니다.

`except` 스위트가 끝난 후에도 예외 인스턴스를 유지해야 하는 상황은 다음과 같이 쉽게 변환할 수 있습니다:

이전:
```python
try:
    # ...
except E as N:
    # ...
    # ...
```

이후:
```python
try:
    # ...
except E as N:
    n = N # N의 값을 n에 할당하여 블록 종료 후에도 유지
    # ...
    # ...
```
이러한 방식으로 블록 끝에서 `N`이 삭제되더라도 `n`은 계속 존재하며 정상적으로 사용될 수 있습니다.

마지막으로, `sys` 모듈의 `exc_type`, `exc_value`, `exc_traceback` 속성 사용은 모두 제거되어야 합니다. 이들은 각각 `sys.exc_info()[0]`, `sys.exc_info()[1]`, `sys.exc_info()[2]`로 대체될 수 있으며, 2to3의 `sysexcattrs` fixer를 통해 이러한 변환이 수행될 수 있습니다.

### Python 2.6 - 3.0 호환성
Python 2.6과 3.0 간의 전방 호환성을 용이하게 하기 위해, `except ... as ...:` 문법은 2.x 시리즈로 백포트(backported)될 예정입니다. 따라서 문법은 다음과 같이 변경됩니다:

이전:
```
except_clause: 'except' [test [',' test]]
```

이후:
```
except_clause: 'except' [test [('as' | ',') test]]
```
`except` 문의 스위트 종료 시 정리 의미론은 2.x 릴리스 시리즈에는 포함되지 않을 것입니다.

## 미해결 문제 (Open Issues)
### `sys.exc_info()` 교체 또는 삭제
`sys.exc_info()`를 삭제하거나 `sys.exception` 속성 또는 `sys.get_exception()` 함수로 대체하는 아이디어는 `python-3000` 메일링 리스트에서 여러 번 제기되었고, PEP 344의 "미해결 문제" 섹션에서도 언급되었습니다.

`sys.exc_info()` 호출 및 일부 속성 접근을 교체하는 2to3 fixer는 간단하겠지만, `sys.exc_info()`의 값을 인수로 기대하는 함수를 정적 분석(static analysis)으로 찾아 수정하는 것은 훨씬 더 어려울 것입니다. 마찬가지로, 이는 `sys.exc_info()`를 기반으로 정의된 모든 API에 대한 문서를 다시 작성해야 하는 필요성을 해결하지 못합니다.

## 구현 (Implementation)
이 PEP는 53342 및 53349 리비전에서 구현되었습니다. Python 2.6에서 새로운 `except` 문법에 대한 지원은 55446 리비전에서 구현되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.