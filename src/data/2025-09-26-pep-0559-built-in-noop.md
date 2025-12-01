---
title: "[Rejected] PEP 559 - Built-in noop()"
excerpt: "Python Enhancement Proposal 559: 'Built-in noop()'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/559/
toc: true
toc_sticky: true
date: 2025-09-26 23:45:26+0900
last_modified_at: 2025-09-26 23:45:26+0900
published: true
---
> **원문 링크:** [PEP 559 - Built-in noop()](https://peps.python.org/pep-0559/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 08-Sep-2017

PEP 559 – Built-in `noop()` | peps.python.org 문서를 번역하고 정리합니다.

## PEP 559 – Built-in `noop()`

*   **작성자:** Barry Warsaw <barry at python.org>
*   **상태:** Rejected (거부됨)
*   **유형:** Standards Track
*   **생성일:** 2017년 9월 8일
*   **Python 버전:** 3.7
*   **사후 이력:** 2017년 9월 9일
*   **해결:** Python-Dev message

### 초록 (Abstract)

이 PEP는 아무것도 하지 않고 `None`을 반환하는 새로운 내장 함수 `noop()`를 추가할 것을 제안합니다.

### 배경 (Rationale)

Python에서 아무것도 하지 않는(no-op) 함수를 구현하는 것은 아주 쉽습니다. 너무 쉽기 때문에 많은 사람이 반복적으로 여러 번 구현하곤 합니다. 따라서 아무것도 하지 않는 공통의 내장 함수가 있다면 많은 경우에 유용할 것입니다.

하나의 사용 사례는 PEP 553과 관련이 있습니다. `breakpoint` 환경 변수를 다음과 같이 설정하여 `breakpoint` 기능을 효과적으로 비활성화할 수 있습니다.

```bash
$ setenv PYTHONBREAKPOINT=noop
```

### 구현 (Implementation)

`noop()` 함수의 Python 동등한 구현은 정확히 다음과 같습니다.

```python
def noop(*args, **kws):
    return None
```

C 언어로 구현된 내장 함수의 구현은 풀 리퀘스트를 통해 확인할 수 있습니다.

### 거부된 대안 (Rejected alternatives)

#### `noop()`가 무언가를 반환하도록 하는 경우

이 제안은 "YAGNI (You Ain't Gonna Need It, 필요 없을 것이다)" 원칙에 따라 거부되었습니다.

이는 의미를 복잡하게 만들기 때문입니다. 예를 들어, `*args`와 ` **kws`를 항상 모두 반환한다면, 아무것도 주어지지 않았을 때 무엇을 반환해야 할까요? `((), {})` 형태의 튜플을 반환하는 것은 다소 보기 좋지 않지만 일관성을 제공합니다. 하지만 함수에 전달된 것이 없다는 개념적인 의미를 고려하면 단순히 `None`을 반환하는 것이 더 나을 수도 있습니다.

또는 `noop(7)`와 같이 하나의 위치 인자만 전달한다면 7을 반환해야 할까요, 아니면 `((7,), {})`를 반환해야 할까요? 이와 같은 문제들이 발생합니다.

작성자는 `noop()`의 반환 값이 필요하지 않을 것이므로 항상 `None`을 반환해야 한다고 주장합니다.

** Coghlan의 논의 (서식 편집):**

이에 대한 반론은 `map(noop, iterable)`, `sorted(iterable, key=noop)` 등 ( `filter`, `max`, `min`은 모두 단일 인자를 받는 호출 가능 객체를 허용하며, 많은 `itertools` 연산도 마찬가지입니다)에서 `noop()`를 유용한 기본 함수로 만들기 위해서는 다음과 같이 정의해야 한다는 것입니다.

```python
def noop(*args, **kwds):
    return args[0] if args else None
```

이 반론에 대한 재반론은 이러한 모든 경우에 기본값으로 `None`을 사용하는 것이 더 빠르다는 것입니다. 왜냐하면 이렇게 하면 알고리즘이 콜백을 호출하여 아무것도 유용한 일을 하지 않게 하는 대신, 콜백을 완전히 건너뛸 수 있기 때문입니다.

> ⚠️ ** 알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.