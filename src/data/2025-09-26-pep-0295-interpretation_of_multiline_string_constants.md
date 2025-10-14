---
title: "[Rejected] PEP 295 - Interpretation of multiline string constants"
excerpt: "Python Enhancement Proposal 295: 'Interpretation of multiline string constants'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/295/
toc: true
toc_sticky: true
date: 2025-09-26 18:05:22+0900
last_modified_at: 2025-09-26 18:05:22+0900
published: true
---
> **원문 링크:** [PEP 295 - Interpretation of multiline string constants](https://peps.python.org/pep-0295/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 22-Jul-2002

PEP 295 – 여러 줄 문자열 상수의 해석

**상태**: Rejected (거부됨)
**유형**: Standards Track
**생성일**: 2002년 7월 22일
**Python 버전**: 3.0
**작성자**: Stepan Koltsov

---

### 초록 (Abstract)
이 PEP는 Python에서 여러 줄 문자열 상수의 해석에 대해 설명합니다. 이는 새 줄(newline) 뒤의 공백을 제거하고, 여는 따옴표 바로 뒤에 첫 번째 문자가 새 줄인 경우 해당 새 줄을 제거할 것을 제안합니다.

### 배경 (Rationale)
이 PEP는 Python에서 여러 줄 문자열 상수의 해석을 제안합니다. 현재 문자열 상수의 값은 따옴표 사이의 모든 텍스트이며, 이스케이프 시퀀스가 대체될 수 있습니다.

예를 들어:
```python
def f():
    """
    la-la-la
    limona, banana
    """
def g():
    return "This is \tstring"

print(repr(f.__doc__))
print(repr(g()))
```
위 코드를 실행하면 다음과 같이 출력됩니다:
```
'\n\tla-la-la\n\tlimona, banana\n\t'
'This is \tstring'
```
이 PEP는 다음 두 가지를 제안합니다:
1. 여는 따옴표 바로 뒤에 오는 첫 번째 문자가 새 줄인 경우, 이 새 줄 문자를 무시합니다.
2. 문자열 상수 내에서 첫 번째 공백이 아닌 문자까지의 모든 공백(space)과 탭(tab)을 무시하되, 현재 들여쓰기(indentation) 이상은 무시하지 않습니다.

이러한 변경이 적용되면 이전 프로그램은 다음과 같이 출력될 것입니다:
```
'la-la-la\nlimona, banana\n'
'This is string'
```
현재 Python에서 이와 동일한 결과를 얻으려면 이전 프로그램을 다음과 같이 다시 작성해야 합니다 (새로운 문자열 의미론과 동일한 결과를 줍니다):
```python
def f():
    """\
    la-la-la
    limona, banana
    """
def g():
    "This is string" # Note: Changed from "This is \tstring" to "This is string" to match the intended output after stripping.
```
또는 실행 시 라이브러리 루틴으로 제거 작업을 수행할 수 있지만 (pydoc이 하는 것처럼), 이는 프로그램 가독성을 떨어뜨립니다.

### 구현 (Implementation)
이 PEP는 CPython, Jython 또는 Python.NET에 대해서는 언급하지 않습니다.

원래 Python에서는 컴파일 시 현재 들여쓰기(공백 수)에 대한 정보가 없으므로, 공백 및 탭 제거는 파싱 시점에 수행되어야 합니다. 현재 프로그램 텍스트에서 파서에 플래그(예: `from __future__ import xxx`)를 전달할 방법이 없습니다. 이 기능은 CPP 플래그 `Py_PARSE_MULTILINE_STRINGS`에 따라 Python 컴파일 시 활성화 또는 비활성화될 수 있도록 제안합니다.

### 대안 (Alternatives)
문자열 상수에 대한 새로운 해석은 문자열 상수에 `i` 및 `o` 플래그를 사용하여 구현할 수 있습니다. 예를 들어:
* `i""" SELECT * FROM car WHERE model = 'i525' """`는 새 스타일입니다.
* `o"""SELECT * FROM employee WHERE birth < 1982 """`는 이전 스타일입니다.
* `""" SELECT employee.name, car.name, car.price FROM employee, car WHERE employee.salary * 36 > car.price """`는 Python-x.y.z 이후에는 새 스타일이고, 그 외에는 이전 스타일입니다.

또한, 문자열이 `raw` 문자열인 경우, 즉 `r` 플래그가 지정된 경우에는 이 기능을 비활성화할 수도 있습니다.

### 저작권 (Copyright)
이 문서는 Public Domain에 배포되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.