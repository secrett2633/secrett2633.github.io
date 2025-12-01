---
title: "[Final] PEP 3003 - Python Language Moratorium"
excerpt: "Python Enhancement Proposal 3003: 'Python Language Moratorium'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/3003/
toc: true
toc_sticky: true
date: 2025-09-27 14:12:18+0900
last_modified_at: 2025-09-27 14:12:18+0900
published: true
---
> **원문 링크:** [PEP 3003 - Python Language Moratorium](https://peps.python.org/pep-3003/)
>
> **상태:** Final | **유형:** Process | **작성일:** 21-Oct-2009

PEP 3003 – Python 언어 변경 유예 (Moratorium)

## 개요 (Abstract)
이 PEP는 Python 3.1 출시일로부터 최소 2년 동안 Python 언어 문법, 의미론, 내장 함수(built-ins)에 대한 모든 변경을 일시적으로 중단(moratorium)할 것을 제안합니다. 특히 이 유예 기간은 Python 3.2를 포함하며, Python 3.3부터 다시 언어 변경을 허용할 계획이었습니다. 이 기능 중단은 비-CPython 구현체들이 핵심 언어 구현체를 따라잡고, Python 3.x 채택을 용이하게 하며, 커뮤니티에 더 안정적인 기반을 제공하기 위해 고안되었습니다.

## 도입 배경 (Rationale)
이 아이디어는 Guido van Rossum이 `python-ideas` 메일링 리스트에서 제안했습니다. 그의 제안은 Python 핵심 문법, 내장 함수 및 의미론의 변경 속도를 늦춰 Jython, IronPython, PyPy와 같은 비-CPython 구현체들이 Python 2.x와 3.x의 현재 상태를 따라잡을 수 있도록 하자는 것이었습니다.

Python은 CPython이라는 핵심 구현체를 넘어 풍부하고 성숙하며 활기찬 구현체 커뮤니티(예: Jython, IronPython, PyPy)를 가지고 있으며, 이들은 커뮤니티뿐만 아니라 언어 자체에도 이점을 제공합니다. Unladen Swallow와 같은 다른 프로젝트들은 CPython의 성능과 구현을 향상시키려 했습니다.

Python 3.x는 지난 몇 년간 Python 개발의 큰 부분을 차지했습니다. Python 3.x의 출시와 이전 2.6.x 릴리스에서 도입된 수많은 언어 변경은 대안 구현체들이 핵심 Python 개발 속도를 따라잡는 데 심각한 불이익을 주었습니다.

또한, CPython에 의해 구현된 최근 릴리스의 언어 변경 사항 중 상당수는 일반 사용자들 사이에서 아직 널리 사용되지 않고 있습니다. 예를 들어, 대부분의 사용자는 운영 체제에 사전 설치된 인터프리터(일반적으로 CPython) 버전에 국한됩니다. 대부분의 OS 벤더들은 Python 2.6을 막 배포하기 시작했으며, Python 3.x를 배포하는 경우는 더욱 적습니다.

Python 2.7이 Python 2.x 코드 라인의 사실상 "수명 종료(end of life)"가 될 것으로 예상되고 Python 3.x가 미래이므로, Python 핵심 개발은 언어 자체의 변경을 일시적으로 중단하여 이러한 모든 외부 주체들이 따라잡고 Python 3.x의 채택 및 마이그레이션을 돕는 것이 최선의 이익입니다.

마지막으로, 이 유예는 핵심 개발 내에서 CPython 인터프리터 및 개선 사항, 표준 라이브러리 등 다른 문제에 집중할 수 있도록 개발 주기를 확보하기 위한 목적도 있습니다.

이 유예는 예외를 허용하지 않습니다. 일단 수락되면, 언어의 문법 또는 의미론에 대한 모든 보류 중인 변경 사항은 유예가 해제될 때까지 연기됩니다. 이 유예는 다른 Python 구현체에는 적용되지 않으므로, 다른 구현체들은 원할 경우 표준 구현체와 다른 기능을 추가할 수 있습니다.

## 세부 사항 (Details)

### 변경할 수 없는 항목 (Cannot Change)
*   **새로운 내장 함수 (New built-ins)**
*   **언어 문법 (Language syntax)** : 모호성 수정(ambiguity fixes)을 제외하고는 문법 파일(grammar file)이 사실상 변경 불가능(immutable)해집니다.
*   **일반 언어 의미론 (General language semantics)** : 특정 예외(아래 참조)를 제외하고 언어는 현재 상태로 작동합니다.
*   **새로운 `__future__` import** : 컴파일러 지시문(compiler directive)을 사용하더라도 언어 문법 및/또는 의미론을 효과적으로 변경하기 때문에 명시적으로 금지됩니다.

### 사례별 예외 (Case-by-Case Exemptions)
*   **내장 객체에 새 메서드 추가 (New methods on built-ins)** : 내장 객체에 메서드를 추가하는 경우는 고려될 수 있습니다.
*   **잘못된 언어 의미론 (Incorrect language semantics)** : 원래 설계 의도에 따라 언어 의미론이 모호하거나 부적절하게 구현된 경우 의미론이 변경될 수 있습니다.
*   **구현하기 어려운 언어 의미론 (Language semantics that are difficult to implement)** : 다른 VM(Virtual Machine)들이 Python 3.x 의미론을 구현하기 시작하지 않았기 때문에 특정 의미론이 복제하기 너무 어려울 가능성이 있습니다. 그러한 경우, 다른 VM들의 Python 3.x 채택을 용이하게 하기 위해 변경될 수 있습니다.

### 변경 허용 항목 (Allowed to Change)
*   **C API** : CPython의 기반 C 코드를 변경하는 것은 이 유예의 다른 제한 사항을 위반하지 않는 한 전적으로 허용됩니다. 예를 들어, 현재 원자적(atomic)인 특정 작업이 원자성을 유지한다고 가정하면 GIL(Global Interpreter Lock)을 제거하는 것은 허용됩니다.
*   **표준 라이브러리 (The standard library)** : 표준 라이브러리는 언어 정의와 직접적으로 연결되어 있지 않으므로 이 유예의 적용을 받지 않습니다.
*   **2.x로의 3.x 기능 백포트 (Backports of 3.x features to 2.x)** : 이 유예는 3.x에서 새로워질 기능에만 영향을 미칩니다.
*   **import 의미론 (Import semantics)** : 예를 들어, PEP 382와 같은 경우입니다. 어차피 import 의미론은 Python 구현체마다 다릅니다.

### 소급 적용 (Retroactive)
이 유예가 Python 3.1 릴리스 이후의 모든 변경 사항을 포함한다는 점에 유의하는 것이 중요합니다. 이 규칙은 유예가 논의되는 동안 기능이 서둘러 또는 몰래 CPython 소스 트리에 포함되는 것을 방지하기 위함입니다. `py3k` 개발 브랜치의 NEWS 파일을 검토한 결과, 이 목표를 달성하기 위해 롤백해야 할 커밋은 없는 것으로 나타났습니다.

### 연장 (Extensions)
유예 기간은 새로운 PEP를 통해서만 연장될 수 있습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.