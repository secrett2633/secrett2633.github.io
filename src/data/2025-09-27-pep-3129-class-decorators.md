---
title: "[Final] PEP 3129 - Class Decorators"
excerpt: "Python Enhancement Proposal 3129: 'Class Decorators'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3129/
toc: true
toc_sticky: true
date: 2025-09-27 14:31:32+0900
last_modified_at: 2025-09-27 14:31:32+0900
published: true
---
> **원문 링크:** [PEP 3129 - Class Decorators](https://peps.python.org/pep-3129/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 01-May-2007


# PEP 3129 – 클래스 데코레이터

## 개요 (Abstract)

이 PEP(Python Enhancement Proposal)는 PEP 318에서 도입된 함수 및 메서드 데코레이터의 확장인 클래스 데코레이터를 제안합니다.

## 도입 배경 (Rationale)

함수 데코레이터가 Python 2.4에 포함될지에 대해 처음 논의되었을 때, 클래스 데코레이터는 메타클래스(metaclasses) 덕분에 모호하고 불필요하다고 여겨졌습니다. 그러나 Python 2.4.x 시리즈 릴리스를 통해 수년간 경험을 쌓고 함수 데코레이터와 그 활용법에 대한 친숙도가 높아지면서, BDFL(Benevolent Dictator For Life, 귀도 반 로썸)과 커뮤니티는 클래스 데코레이터를 재평가하여 Python 3.0에 포함할 것을 권고했습니다.

클래스 데코레이터의 주요 동기는 특정 구문들을 더 쉽게 표현하고 CPython 인터프리터의 구현 세부 사항에 덜 의존하도록 하는 것이었습니다. 메타클래스를 사용하여 클래스 데코레이터와 유사한 기능을 표현하는 것이 가능했지만, 그 결과는 일반적으로 불쾌했고 구현이 매우 취약했습니다. 또한, 메타클래스는 상속되는 반면, 클래스 데코레이터는 상속되지 않으므로 특정 단일 클래스에만 적용되는 클래스 데코레이터의 용도에는 메타클래스가 적합하지 않았습니다. Zope와 같은 대규모 Python 프로젝트들이 클래스 데코레이터와 유사한 기능을 달성하기 위해 복잡한 방식들을 사용하고 있다는 사실이 BDFL을 설득했습니다.

## 의미론 (Semantics)

클래스 데코레이터의 의미론(semantics)과 설계 목표는 함수 데코레이터(PEP 318)와 동일합니다. 유일한 차이점은 함수 대신 클래스를 데코레이트(decorate)한다는 것입니다. 다음 두 코드 스니펫은 의미론적으로 동일합니다.

```python
class A:
    pass
A = foo(bar(A))
```

```python
@foo
@bar
class A:
    pass
```

데코레이터에 대한 자세한 내용은 PEP 318을 참조하십시오.

## 구현 (Implementation)

클래스 데코레이터를 지원하기 위해 Python의 문법(grammar)을 조정하려면 두 가지 규칙을 수정하고 새로운 규칙을 추가해야 합니다.

`funcdef: [decorators] 'def' NAME parameters ['->' test] ':' suite`
`compound_stmt: if_stmt | while_stmt | for_stmt | try_stmt | with_stmt | funcdef | classdef`

위 규칙들을 다음으로 변경해야 합니다.

`decorated: decorators (classdef | funcdef)`
`funcdef: 'def' NAME parameters ['->' test] ':' suite`
`compound_stmt: if_stmt | while_stmt | for_stmt | try_stmt | with_stmt | funcdef | classdef | decorated`

`decorated` 규칙을 추가하는 것은 문법의 모호성을 피하기 위해 필수적입니다.

Python AST(추상 구문 트리) 및 바이트코드(bytecode)도 이에 맞춰 수정되어야 합니다.

참조 구현은 Jack Diederich에 의해 제공되었습니다.

## 수용 (Acceptance)

이 PEP가 게시된 이후 사실상 아무런 논의도 없었으며, 이는 모든 사람이 이 제안이 수용되어야 한다는 데 동의했음을 의미합니다.

해당 패치는 Subversion 리비전 55430으로 커밋되었습니다.

## 참고 자료 (References)

*   [https://mail.python.org/pipermail/python-dev/2006-March/062942.html](https://mail.python.org/pipermail/python-dev/2006-March/062942.html)
*   [https://mail.python.org/pipermail/python-dev/2006-March/062888.html](https://mail.python.org/pipermail/python-dev/2006-March/062888.html)
*   [https://bugs.python.org/issue1671208](https://bugs.python.org/issue1671208)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.