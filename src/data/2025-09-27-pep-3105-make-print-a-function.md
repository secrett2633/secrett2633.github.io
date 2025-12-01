---
title: "[Final] PEP 3105 - Make print a function"
excerpt: "Python Enhancement Proposal 3105: 'Make print a function'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3105/
toc: true
toc_sticky: true
date: 2025-09-27 14:17:54+0900
last_modified_at: 2025-09-27 14:17:54+0900
published: true
---
> **원문 링크:** [PEP 3105 - Make print a function](https://peps.python.org/pep-3105/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 19-Nov-2006


### PEP 3105 – `print`를 함수로 만들기

*   **작성자** : Georg Brandl
*   **상태** : Final (최종)
*   **유형** : Standards Track
*   **생성일** : 2006년 11월 19일
*   **Python 버전** : 3.0

### 요약 (Abstract)
이 PEP는 `print` 문(statement)을 대체하는 새로운 내장 함수 `print()`를 제안하며, 새로운 함수의 특정 시그니처를 제시합니다.

### 배경 (Rationale)
`print` 문은 오랫동안 Python 3000(Python 3.x의 초기 명칭)에서 제거될 예정이었던 의심스러운 언어 기능 목록에 포함되어 있었습니다. 이 PEP의 목표는 새로운 것이 아니지만, Python 개발자들 사이에서 논쟁이 많을 수 있습니다.

`print()` 함수를 지지하는 주요 논거는 Guido van Rossum의 메시지에서 추출되었으며 다음과 같습니다:
*   `print`는 애플리케이션 수준의 기능 중 유일하게 전용 문법(statement)을 가지고 있습니다. Python에서 문법은 컴파일러의 도움이 없이는 불가능한 경우에 최후의 수단으로 사용됩니다. `print`는 이러한 예외에 해당하지 않습니다.
*   애플리케이션 개발 중 `print` 출력을 로깅 호출이나 다른 I/O 라이브러리 호출과 같은 더 정교한 방식으로 대체해야 할 필요성을 자주 느낍니다. `print()` 함수를 사용하면 간단한 문자열 대체로 가능하지만, 현재는 괄호를 추가하고 `>> stream` 스타일 문법을 변환하는 번거로움이 있습니다.
*   `print`에 특별한 문법을 두는 것은 진화에 큰 장벽이 됩니다. 예를 들어, `printf()`와 같은 가상의 새로운 함수가 `print()` 함수와 공존한다면 그리 이상하지 않을 것입니다.
*   현재는 다른 구분자(separator)를 사용하거나 아예 구분자를 사용하지 않으려는 경우 `print` 문을 다른 호출로 쉽게 변환할 방법이 없습니다. 또한, 공백이 아닌 다른 구분자로 객체를 편리하게 출력할 방법도 없습니다.
*   `print()`가 함수라면, 한 모듈 내에서 (`def print(*args):...` 와 같이) 또는 프로그램 전체에서 (`__builtin__.print`에 다른 함수를 할당하여) 쉽게 교체할 수 있습니다. 현재는 `write()` 메서드를 가진 클래스를 작성하여 `sys.stdout`에 할당하는 방식으로 가능하지만, 이는 개념적으로 더 큰 도약이며 `print`와 다른 수준에서 작동합니다.

### 명세 (Specification)
`print()` 함수의 시그니처는 다음과 같습니다:

```python
def print(*args, sep=' ', end='\n', file=None)
```

다음과 같은 호출:
```python
print(a, b, c, file=sys.stderr)
```
은 현재(Python 2.x)의 다음 코드와 동일합니다:
```python
print >>sys.stderr, a, b, c
```
선택적 인자인 `sep`와 `end`는 각각 인자들 사이에 무엇을 출력할지, 그리고 인자들 뒤에 무엇을 출력할지를 지정합니다.

`softspace` 기능(현재 파일에서 `print`가 첫 번째 항목 앞에 공백을 삽입할지 여부를 알려주는 반쯤 비밀스러운 속성)은 제거됩니다. 따라서 현재(Python 2.x)의 다음 코드:
```python
print "a", print
```
(이 코드는 "a"와 줄 바꿈 사이에 공백을 출력하지 않습니다.)에 대한 직접적인 대체는 없습니다.

### 하위 호환성 (Backwards Compatibility)
이 PEP에서 제안된 변경사항은 현재(Python 2.x) 대부분의 `print` 문을 유효하지 않게 만듭니다. Python 2.x에서 우연히 모든 인자에 괄호를 사용한 `print` 문만이 Python 3.0에서 유효한 문법으로 유지되며, 그 중에서도 단일 괄호로 묶인 값을 출력하는 경우에만 동일하게 작동합니다.

예를 들어, Python 2.x에서는:
```python
>>> print ("Hello")
Hello
>>> print ("Hello", "world")
('Hello', 'world')
```
Python 3.0에서는:
```python
>>> print ("Hello")
Hello
>>> print ("Hello", "world")
Hello world
```
다행히 Python 2에서 `print`가 문(statement)이었기 때문에, 자동화된 도구로 `print` 문을 안정적이고 명확하게 감지하고 대체할 수 있으므로 주요 포팅(porting) 문제는 없을 것입니다 (해당 도구가 작성된다는 가정 하에).

### 구현 (Implementation)
제안된 변경사항은 Subversion revisions 53685에서 53704 사이의 Python 3000 브랜치에 구현되었습니다. 라이브러리의 대부분의 레거시 코드도 변환되었지만, 배포판에 남아있을 수 있는 모든 `print` 문을 찾아 변환하는 작업은 계속 진행 중입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.