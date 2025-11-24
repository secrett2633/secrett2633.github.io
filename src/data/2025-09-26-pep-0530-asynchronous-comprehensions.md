---
title: "[Final] PEP 530 - Asynchronous Comprehensions"
excerpt: "Python Enhancement Proposal 530: 'Asynchronous Comprehensions'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/530/
toc: true
toc_sticky: true
date: 2025-09-26 23:21:12+0900
last_modified_at: 2025-09-26 23:21:12+0900
published: true
---
> **원문 링크:** [PEP 530 - Asynchronous Comprehensions](https://peps.python.org/pep-0530/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 03-Sep-2016

## PEP 530 – 비동기 컴프리헨션 (Asynchronous Comprehensions)

### 개요

PEP 530은 Python 3.6에 도입된 기능으로, `async`/`await` 문법을 사용하는 비동기 버전의 `list`, `set`, `dict` 컴프리헨션(comprehension) 및 제너레이터 표현식(generator expressions)을 추가할 것을 제안합니다. 이는 PEP 492 (네이티브 코루틴)와 PEP 525 (비동기 제너레이터)에서 제공하는 비동기 프로그래밍 지원을 확장하는 것입니다.

### 배경 및 목표

Python은 동기 컴프리헨션에 대한 광범위한 지원을 제공하여 간결한 문법으로 `list`, `dict`, `set`을 생성할 수 있게 합니다. PEP 530은 이러한 구문적 구성을 비동기 코드에도 적용하여 가독성을 높이고 코드를 단축하는 것을 목표로 합니다.

**가독성 향상 예시:**

기존 비동기 코드는 다음과 같을 수 있습니다.
```python
result = []
async for i in aiter():
    if i % 2:
        result.append(i)
```

PEP 530이 제안하는 비동기 컴프리헨션 문법을 사용하면 위 코드는 다음과 같이 간결해집니다.
```python
result = [i async for i in aiter() if i % 2]
```
또한, 이 PEP는 모든 종류의 컴프리헨션 내에서 `await` 표현식을 사용할 수 있도록 합니다. 예를 들어:
```python
result = [await fun() for fun in funcs]
```

### 상세 내용 (Specification)

#### 비동기 컴프리헨션 (Asynchronous Comprehensions)

`list`, `set`, `dict` 컴프리헨션 내에서 `async for`를 사용하는 것이 허용됩니다. PEP 525의 승인에 따라 비동기 제너레이터 표현식 생성도 가능해집니다.

**예시:**

*   `set` 컴프리헨션: `{i async for i in agen()}`
*   `list` 컴프리헨션: `[i async for i in agen()]`
*   `dict` 컴프리헨션: `{i: i ** 2 async for i in agen()}`
*   제너레이터 표현식: `(i ** 2 async for i in agen())`

비동기 컴프리헨션 및 제너레이터 표현식 내에서 `async for`는 `if` 및 `for` 절과 함께 사용될 수 있습니다.
```python
dataset = {data for line in aiter() async for data in line if check(data)}
```
비동기 컴프리헨션은 오직 `async def` 함수 내부에서만 허용됩니다.
비동기 제너레이터 표현식은 일반적으로 어떤 문맥에서든 허용되지만, Python 3.6에서는 `async`와 `await`가 소프트 키워드(soft-keyword) 상태였기 때문에 `async def` 함수 내에서만 허용되었습니다. Python 3.7에서 `async`와 `await`가 예약어(reserved keywords)가 되면서 이 제한은 해제됩니다.

#### 컴프리헨션 내에서 `await` 사용 (await in Comprehensions)

비동기 컴프리헨션뿐만 아니라 동기 컴프리헨션 내에서도 `await` 표현식의 사용이 허용됩니다.
이 기능은 `async def` 함수 본문 내에서만 유효합니다.

**예시:**

```python
result = [await fun() for fun in funcs]
result = {await fun() for fun in funcs}
result = {fun: await fun() for fun in funcs}
result = [await fun() for fun in funcs if await smth]
result = {await fun() for fun in funcs if await smth}
result = {fun: await fun() for fun in funcs if await smth}
result = [await fun() async for fun in funcs]
result = {await fun() async for fun in funcs}
result = {fun: await fun() async for fun in funcs}
result = [await fun() async for fun in funcs if await smth]
result = {await fun() async for fun in funcs if await smth}
result = {fun: await fun() async for fun in funcs if await smth}
```

#### 문법 업데이트 (Grammar Updates)

이 제안은 문법 수준에서 `comp_for` 규칙에 선택적 `ASYNC` 키워드를 추가하는 한 가지 변경을 요구합니다.
`comp_for: [ASYNC] 'for' exprlist 'in' or_test [comp_iter]`

컴프리헨션 AST(Abstract Syntax Tree) 노드에는 새로운 `is_async` 인자가 추가됩니다.

### 하위 호환성 (Backwards Compatibility)

이 제안은 완전히 하위 호환됩니다.

### 수용 (Acceptance)

PEP 530은 2016년 9월 6일 Guido van Rossum에 의해 수락되었습니다.

### 구현 (Implementation)

구현은 이슈 28008에서 추적되고 있습니다. 참조 구현 GitHub 저장소는 [https://github.com/1st1/cpython/tree/asyncomp](https://github.com/1st1/cpython/tree/asyncomp)에서 확인할 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.