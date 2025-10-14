---
title: "[Deferred] PEP 269 - Pgen Module for Python"
excerpt: "Python Enhancement Proposal 269: 'Pgen Module for Python'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/269/
toc: true
toc_sticky: true
date: 2025-09-26 17:51:28+0900
last_modified_at: 2025-09-26 17:51:28+0900
published: true
---
> **원문 링크:** [PEP 269 - Pgen Module for Python](https://peps.python.org/pep-0269/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 24-Aug-2001


# PEP 269 – Python용 Pgen 모듈

## 개요
PEP 269는 Python 파서를 생성하는 데 사용되는 `pgen` 파서 제너레이터(parser generator)를 Python 모듈로 노출할 것을 제안합니다. 이는 기존의 `parser` 모듈이 Python 파서 자체를 노출하는 것과 유사한 접근 방식입니다.

## 배경 (Rationale)
Python의 역사 전반에 걸쳐 Python 컴파일러 생성에 대한 수많은 논의가 있었습니다. 이러한 논의를 통해 `parser` 모듈과 Jeremy Hylton의 `compiler` 모듈과 같은 여러 Python 파서 구현이 탄생했습니다. 하지만 언어 변경이 여러 번 제안되었음에도 불구하고, Python 구문(syntax) 실험은 실제 Python 빌드에 사용되는 파서 제너레이터에 대한 Python 바인딩(binding)이 부족했습니다.

`pgen` 라이브러리를 대상으로 Fred Drake Jr.의 `parser` 래퍼와 유사한 Python 래퍼를 제공함으로써 다음과 같은 이점을 얻을 수 있다고 주장합니다:

*   **구문 변경 참조 구현 개발 용이성:** 현재 구문 변경의 참조 구현(reference implementation)을 개발하려면 `pgen` 도구를 명령줄에서 사용해야 합니다. 그 결과 생성된 파서 데이터 구조는 사용자 정의 CPython 구현과 인터페이스하기 위해 재작업되거나 C 확장 모듈로 래핑되어야 합니다. `pgen` 모듈을 제공하면 이러한 과정이 더 쉬워질 것입니다.
*   **구문 변경 참조 구현 배포 용이성:** 파서 제너레이터가 Python에서 사용 가능해지므로, 결과 파서 또한 Python에서 접근할 수 있게 됩니다. 따라서 참조 구현은 기존 CPython 배포의 사용자 정의 버전을 사용하거나 컴파일 가능한 확장 모듈로 제공되는 대신, 순수 Python 코드로 제공될 수 있습니다.
*   **더 많은 청중과의 구문 변경 논의 용이성:** Python 사용자 커뮤니티가 CPython 개발자 커뮤니티보다 훨씬 크기 때문에, 이는 두 번째 주장으로부터 자연스럽게 파생되는 이점입니다.
*   **소규모 언어 개발 향상:** 추가 모듈이 완전한 기능을 갖춘 LL(1) 파서 제너레이터이므로, Python 내에서 소규모 언어(small languages) 개발이 더욱 향상될 것입니다.

## 명세 (Specification)
제안된 모듈의 이름은 `pgen`이 될 것이며, 다음 함수들을 포함합니다:

*   `parseGrammarFile(fileName) -> AST`: `fileName`이 가리키는 파일을 읽고 AST(Abstract Syntax Tree) 객체를 생성합니다. AST 노드는 파서 제너레이터 메타-문법(meta-grammar)의 비종단(nonterminal) 숫자 값을 포함합니다. 출력 AST는 `parser` 모듈이 제공하는 AST 확장 클래스의 인스턴스가 됩니다. 입력 파일에 구문 오류가 있으면 `SyntaxError` 예외가 발생합니다.
*   `parseGrammarString(text) -> AST`: `parseGrammarFile()`과 동일한 의미론을 따르지만, 파일 이름 대신 문법 텍스트를 문자열로 입력받습니다.
*   `buildParser(grammarAst) -> DFA`: 입력으로 AST 객체를 받아 DFA(Deterministic Finite Automaton, 결정적 유한 오토마타) 데이터 구조를 반환합니다. DFA 데이터 구조는 `parser` 모듈에서 AST 구조가 제공되는 방식과 유사하게 C 확장 클래스가 될 것입니다. 입력 AST가 `pgen` 메타-문법에 정의된 비종단 코드와 일치하지 않으면 `ValueError` 예외가 발생합니다.
*   `parseFile(fileName, dfa, start) -> AST`: `PyParser_ParseFile()` C API 함수의 래퍼 역할을 합니다. 래퍼 코드는 DFA C 확장 클래스와 파일 이름을 받아들입니다. `token` 모듈의 어휘 값(lexical values)과 DFA에 포함된 비종단 값(nonterminal values)을 따르는 AST 인스턴스가 출력됩니다.
*   `parseString(text, dfa, start) -> AST`: `parseFile()` 함수와 유사하게 작동하지만, 파싱할 텍스트를 인자로 받습니다. `parseFile()`이 `PyParser_ParseFile()` C API 함수를 래핑하는 것처럼, `parseString()`은 `PyParser_ParseString()` 함수를 래핑합니다.
*   `symbolToStringMap(dfa) -> dict`: DFA 인스턴스를 받아, DFA의 비종단에 대한 숫자 값을 원래 문법 명세에 있는 비종단의 문자열 이름에 매핑하는 딕셔너리 객체를 반환합니다.
*   `stringToSymbolMap(dfa) -> dict`: 입력 DFA의 비종단 이름을 해당 숫자 값에 매핑하는 딕셔너리를 출력합니다.

매핑 생성 함수와 파싱 함수가 DFA 확장 클래스의 메서드로도 제공된다면 추가적인 장점이 있을 것이라고 언급되어 있습니다.

## 구현 계획 (Implementation Plan)
이 개선을 달성하기 위한 계획은 다음과 같습니다:

1.  `pgen` 함수 이름을 CPython 명명 표준에 맞게 변경합니다. 여기에는 `Include` 하위 디렉토리에 일부 헤더 파일을 추가하는 작업이 포함될 수 있습니다.
2.  `Makefile.pre.in`의 `pgen` C 모듈을 고유한 `pgen` 요소에서 Python C 라이브러리로 이동합니다.
3.  `parser` 모듈의 AST 확장 클래스가 이해하지 못할 수 있는 AST 유형이 있음을 인식하도록 필요한 변경을 수행합니다. (AST 확장 클래스는 트리가 `suite`인지 `expression`인지 추적하는 것으로 보입니다.)
4.  `Modules` 디렉토리에 추가 C 모듈을 코딩합니다. 이 C 확장 모듈은 DFA 확장 클래스와 앞 섹션에서 설명한 함수들을 구현할 것입니다.
5.  새 모듈을 빌드 프로세스에 추가합니다.

## 제약 사항 (Limitations)
이 제안에 따르면, Python 3000의 잠재적 설계자들은 여전히 Python의 어휘 규칙(lexical conventions)에 묶이게 될 것입니다. Python 렉서(lexer)의 추가, 제거 또는 수정은 이 PEP의 범위를 벗어납니다.

## 참조 구현 (Reference Implementation)
현재 제공되는 참조 구현은 없습니다. 과거에 `http://sourceforge.net/tracker/index.php?func=detail&aid=599331&group_id=5470&atid=305470`에서 패치가 제공되었지만, 더 이상 유지 관리되지 않습니다.

## 참고 자료 (References)
*   (사라진) Python Compiler-SIG: http://www.python.org/sigs/compiler-sig/
*   Parser Module Documentation: http://docs.python.org/library/parser.html
*   Hylton, Jeremy: http://docs.python.org/library/compiler.html
*   Pelletier, Michel. "Python Interface Syntax", PEP 245
*   The Python Types-SIG: http://www.python.org/sigs/types-sig/

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.