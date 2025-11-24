---
title: "[Final] PEP 341 - Unifying try-except and try-finally"
excerpt: "Python Enhancement Proposal 341: 'Unifying try-except and try-finally'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/341/
toc: true
toc_sticky: true
date: 2025-09-26 18:48:18+0900
last_modified_at: 2025-09-26 18:48:18+0900
published: true
---
> **원문 링크:** [PEP 341 - Unifying try-except and try-finally](https://peps.python.org/pep-0341/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 04-May-2005


# PEP 341 – `try-except`와 `try-finally`의 통합

*   **작성자:** Georg Brandl
*   **상태:** Final (최종)
*   **유형:** Standards Track
*   **생성일:** 2005년 5월 4일
*   **Python 버전:** 2.5
*   **최종 수정일:** 2025-02-01 08:59:27 GMT

## 초록 (Abstract)

이 PEP는 `try` 문의 문법과 의미론에 대한 변경 사항을 제안하여, `try-except-finally` 블록을 결합할 수 있도록 합니다. 요약하자면, 다음과 같이 코드를 작성하는 것이 유효하게 됩니다.

```python
try:
    <do something>
except Exception:
    <handle the error>
finally:
    <cleanup>
```

## 배경 및 제안 (Rationale/Proposal)

`try-except` 문과 `try-finally` 문은 각각 많은 사용 사례를 가지고 있습니다. 그러나 종종 예외를 포착(catch)하고 그 후에 일부 정리(cleanup) 코드를 실행해야 하는 경우가 있습니다. 이 경우, 현재는 다음과 같이 작성해야 하므로 다소 번거롭고 이해하기 어렵습니다.

```python
f = None
try:
    try:
        f = open(filename)
        text = f.read()
    except IOError:
        print 'An error occurred'
    finally:
        if f:
            f.close()
```

따라서, 다음과 같은 구조가

```python
try:
    <suite 1>
except Ex1:
    <suite 2>
<more except: clauses>
else:
    <suite 3>
finally:
    <suite 4>
```

레거시(legacy) 방식인 다음 구조와 정확히 동일하게 작동하도록 제안됩니다.

```python
try:
    try:
        <suite 1>
    except Ex1:
        <suite 2>
    <more except: clauses>
    else:
        <suite 3>
finally:
    <suite 4>
```

이 변경은 하위 호환성을 유지하며, 현재 유효한 모든 `try` 문은 계속해서 작동합니다.

## 문법 변경 (Changes to the grammar)

`try` 문의 문법은 현재 다음과 같습니다.

```
try_stmt: ('try' ':' suite (except_clause ':' suite)+ ['else' ':' suite] | 'try' ':' suite 'finally' ':' suite)
```

이것은 다음과 같이 변경되어야 합니다.

```
try_stmt: 'try' ':' suite ( (except_clause ':' suite)+ ['else' ':' suite] ['finally' ':' suite] | 'finally' ':' suite )
```

## 구현 (Implementation)

이 PEP의 작성자는 현재 CPython 구현에 대한 충분한 지식이 없었기 때문에, 직접 구현을 제공할 수 없었습니다. Thomas Lee가 패치를 제출했습니다.

하지만 Guido에 따르면, 이는 구현하기 매우 쉬운 작업이라고 합니다. – 적어도 핵심 개발자(core hacker)에게는 그렇습니다.

이 패치는 2005년 12월 17일, SVN 리비전 41740으로 커밋되었습니다.

## 참고 자료 (References)

*   Python-dev 메일링 리스트 토론: https://mail.python.org/pipermail/python-dev/2005-May/053319.html
*   Python 버그 트래커 이슈 1355913: https://bugs.python.org/issue1355913
*   Python 체크인 메일링 리스트: https://mail.python.org/pipermail/python-checkins/2005-December/048457.html

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.