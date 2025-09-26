---
title: "[Withdrawn] PEP 306 - How to Change Python’s Grammar"
excerpt: "Python Enhancement Proposal 306: 'How to Change Python’s Grammar'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/306/
toc: true
toc_sticky: true
date: 2025-09-26 18:09:57+0900
last_modified_at: 2025-09-26 18:09:57+0900
published: true
---
> **원문 링크:** [PEP 306 - How to Change Python’s Grammar](https://peps.python.org/pep-0306/)
>
> **상태:** Withdrawn | **유형:** Informational | **작성일:** 29-Jan-2003


# PEP 306 – Python 문법 변경 방법

*   **작성자:** Michael Hudson, Jack Diederich, Alyssa Coghlan, Benjamin Peterson
*   **상태:** 철회됨 (Withdrawn)
*   **유형:** 정보 제공 (Informational)
*   **생성일:** 2003년 1월 29일

## 목차
*   [참고 (Note)](#참고-note)
*   [개요 (Abstract)](#개요-abstract)
*   [배경 (Rationale)](#배경-rationale)
*   [체크리스트 (Checklist)](#체크리스트-checklist)
*   [참고 자료 (References)](#참고-자료-references)
*   [저작권 (Copyright)](#저작권-copyright)

---

## 참고 (Note)
이 PEP는 Python 개발자 가이드의 "Changing CPython's Grammar" 섹션으로 이동되었습니다.

## 개요 (Abstract)
Python의 문법을 변경하는 것은 단순히 `Grammar/Grammar` 파일과 `Python/compile.c` 파일을 수정하는 것 이상을 의미합니다. 이 PEP는 문법 변경 시 함께 수정되어야 하는 여러 요소들을 체크리스트 형태로 제공하는 것을 목표로 합니다.

이 문서는 완전하지 않을 수 있습니다. 누락된 부분이 있다면, 소유권에 대한 저자의 감정을 상하게 할 염려 없이 직접 추가하거나, 버그를 보고하고 `mwh`에게 할당해 주십시오.

이 PEP는 여러 이유로 Python 문법 해킹(grammar hacking)에 대한 자세한 지침서(instruction manual)로 의도된 것은 아닙니다.

## 배경 (Rationale)
사람들은 종종 문법 변경 시 실수를 저지릅니다. 예를 들어, 바닥 나눗셈(floor division) 연산자 `//`를 추가했을 때, `parser` 모듈이 제대로 작동하지 않는다는 사실을 누군가가 발견하는 데 1년 이상이 걸렸습니다. 이러한 문제들을 방지하기 위해 문법 변경 시 고려해야 할 사항들을 정리할 필요가 있었습니다.

## 체크리스트 (Checklist)
Python 문법을 변경할 때 확인하고 수정해야 할 주요 구성 요소들은 다음과 같습니다:

*   **`Grammar/Grammar`**: Python의 문법 규칙을 정의하는 핵심 파일입니다. 이 파일은 당연히 수정해야 합니다.
*   **`Parser/Python.asdl`**: 문법 변경에 맞춰 Abstract Syntax Tree (AST) 정의를 변경해야 할 수 있습니다. `make` 명령을 실행하여 `Include/Python-ast.h` 및 `Python/Python-ast.c` 파일을 재생성해야 합니다.
*   **`Python/ast.c`**: 문법 변경과 관련된 AST 객체를 생성하도록 수정해야 합니다.
*   **`Lib/compiler/ast.py`**: pure-python AST 객체에도 일치하는 변경 사항을 적용해야 합니다.
*   **`Parser/pgen`**: 파서(parser) 생성 도구인 `pgen`을 다시 실행하여 `Include/graminit.h` 및 `Python/graminit.c`를 재생성해야 합니다. (일반적으로 `make` 명령이 이 과정을 처리합니다.)
*   **`Python/symbtable.c`**: 컴파일 과정 바로 전에 발생하는 심볼(symbol) 수집 단계를 처리하는 파일이므로, 문법 변경에 따라 수정이 필요할 수 있습니다.
*   **`Python/compile.c`**: 새로운 문법 구조(production)에 대한 Opcode를 생성하기 위해 `compiler_*` 함수들을 생성하거나 수정해야 합니다.
*   **`Lib/symbol.py`, `Lib/token.py`, `Lib/keyword.py`**: 새로운 심볼, 토큰 또는 키워드를 추가하는 경우 이 파일들을 재생성해야 할 수 있습니다.
*   **`parser` 모듈**: 새로운 문법을 `test_parser`에 추가하고, `Modules/parsermodule.c` 파일이 테스트를 통과할 때까지 수정해야 합니다.
*   **`test_grammar.py`**: 새로운 문법 사용 사례를 `test_grammar.py`에 추가해야 합니다.
*   **`compiler` 패키지**: 표준 라이브러리와 테스트 스위트를 `compiler` 패키지로 컴파일한 다음, 제대로 실행되는지 확인하는 것이 좋은 테스트 방법입니다. (이는 Python 2.x에서만 필요합니다.)
*   **`Lib/tokenizer.py`**: Python의 토큰(token) 구조 자체를 변경한 경우, `Lib/tokenizer.py` 라이브러리 모듈도 변경해야 합니다.
*   **`pyclbr` 모듈**: 특정 변경 사항은 라이브러리 모듈 `pyclbr`에 대한 조정을 필요로 할 수 있습니다.
*   **문서화 (Documentation)**: 모든 변경 사항에 대한 문서를 작성해야 합니다!
*   **`Python/Python-ast.c`**: 모든 내용이 체크인(check-in)된 후, `Python/Python-ast.c` 파일에 새로운 변경 사항이 생길 수 있습니다. 이 (생성된) 파일에는 생성 시점의 SVN 소스 버전이 포함되어 있기 때문입니다. 이를 피할 방법은 없으며, 이 파일을 별도로 제출해야 합니다.

## 참고 자료 (References)
*   CPython Developer's Guide: Changing CPython's Grammar
    `https://devguide.python.org/grammar/`
*   SF Bug #676521, parser module validation failure
    `https://bugs.python.org/issue676521`

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.