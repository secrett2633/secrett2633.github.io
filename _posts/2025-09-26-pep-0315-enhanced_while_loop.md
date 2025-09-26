---
title: "[Rejected] PEP 315 - Enhanced While Loop"
excerpt: "Python Enhancement Proposal 315: 'Enhanced While Loop'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/315/
toc: true
toc_sticky: true
date: 2025-09-26 18:13:38+0900
last_modified_at: 2025-09-26 18:13:38+0900
published: true
---
> **원문 링크:** [PEP 315 - Enhanced While Loop](https://peps.python.org/pep-0315/)
>
> **상태:** Rejected | **유형:** Standards Track | **작성일:** 25-Apr-2003


### 개요 (Abstract)

이 PEP는 `while` 루프의 시작 부분에 선택적인 "do" 절을 추가하여 루프 코드를 더 명확하게 만들고, 코드 중복으로 인한 오류를 줄이는 것을 제안합니다.

### 공지 (Notice)

이 PEP는 거부되었습니다. 2006년부터 이 PEP는 보류 상태였습니다. 2009년 4월에 PEP를 부활시키려는 후속 노력은 다음 형태와 경쟁할 만한 문법이 나오지 않아 성공하지 못했습니다:

```python
while True:
    <setup code>
    if not <condition>:
        break
    <loop body>
```

PEP에서 제안된 것과는 다른 기본 `do-while` 루프를 위한 대체 문법이 발견되었으나, 조건이 맨 위에 있었기 때문에 거의 지지를 받지 못했습니다:

```python
do ... while <cond>:
    <loop body>
```

따라서, `do-while` 루프가 적절했을 상황에서는 언어 사용자들에게 `while True` 형태에 `if-break`를 내부에 사용하는 것을 권장하고 있습니다.

### 동기 (Motivation)

`while` 루프 조건이 평가되기 전에 특정 코드를 실행해야 하는 경우가 자주 있습니다. 이러한 코드는 종종 루프 바깥에 한 번 실행되는 설정 코드로서 중복되어 나타납니다:

```python
<setup code>
while <condition>:
    <loop body>
    <setup code>
```

문제는 코드가 중복되면 한 인스턴스가 변경될 때 다른 인스턴스가 변경되지 않아 오류의 원인이 될 수 있다는 것입니다. 또한, 두 번째 설정 코드 인스턴스는 루프 끝에 오기 때문에 그 목적이 명확하지 않습니다.

코드 중복을 방지하기 위해 루프 조건을 헬퍼 함수나 루프 본문의 `if` 문으로 이동하는 것도 가능합니다. 그러나 `while` 키워드로부터 루프 조건을 분리하면 루프의 동작이 덜 명확해집니다:

```python
def helper(args):
    <setup code>
    return <condition>

while helper(args):
    <loop body>
```

이 마지막 형태는 루프의 `else` 절을 `if` 문의 본문에 추가해야 하는 추가적인 단점이 있어, 루프의 동작을 더욱 모호하게 만듭니다:

```python
while True:
    <setup code>
    if not <condition>:
        break
    <loop body>
```

이 PEP는 이러한 문제를 해결하기 위해 `while` 루프에 선택적인 절을 추가하여 설정 코드를 자연스러운 방식으로 표현할 수 있도록 제안했습니다:

```python
do:
    <setup code>
while <condition>:
    <loop body>
```

이 방식은 루프 조건을 마땅히 있어야 할 `while` 키워드와 함께 유지하며 코드 중복을 요구하지 않습니다.

### 문법 (Syntax)

`while` 문의 기존 문법은 다음과 같습니다:

```
while_stmt : "while" expression ":" suite ["else" ":" suite]
```

이 PEP는 이를 다음과 같이 확장하는 것을 제안했습니다:

```
while_stmt : ["do" ":" suite] "while" expression ":" suite ["else" ":" suite]
```

### `break`와 `continue`의 의미 (Semantics of break and continue)

제안된 `do-while` 루프에서 `break` 문은 표준 `while` 루프와 동일하게 동작합니다. 즉, 루프 조건을 평가하거나 `else` 절을 실행하지 않고 즉시 루프를 종료합니다.

`do-while` 루프 내의 `continue` 문은 `while` 조건 검사 지점으로 점프합니다.

일반적으로 `while` 스위트(suite)가 비어 있는 경우(`pass` 문) `do-while` 루프와 `break`, `continue` 문은 다른 언어의 `do-while` 의미와 일치해야 합니다.

마찬가지로 `do` 스위트가 비어 있는 경우 `do-while` 루프와 `break`, `continue` 문은 일반 `while` 루프에서 발견되는 동작과 일치해야 합니다.

### Future Statement

새로운 키워드 "do" 때문에 `do-while` 형태를 사용하려면 초기에는 `from __future__ import do_while` 문이 필요할 것이었습니다.

### 구현 (Implementation)

이 PEP의 첫 번째 구현은 `do-while` 루프를 루프를 종료하는 테스트가 있는 무한 루프로 컴파일할 수 있습니다.

### 참고 자료 (References)

*   Guido van Rossum, PEP 315: do-while
    `https://mail.python.org/pipermail/python-ideas/2013-June/021610.html`
*   Raymond Hettinger, release plan for 2.5 ?
    `https://mail.python.org/pipermail/python-dev/2006-February/060718.html`

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.