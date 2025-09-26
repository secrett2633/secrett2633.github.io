---
title: "[Deferred] PEP 233 - Python Online Help"
excerpt: "Python Enhancement Proposal 233: 'Python Online Help'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/233/
toc: true
toc_sticky: true
date: 2025-09-26 17:00:50+0900
last_modified_at: 2025-09-26 17:00:50+0900
published: true
---
> **원문 링크:** [PEP 233 - Python Online Help](https://peps.python.org/pep-0233/)
>
> **상태:** Deferred | **유형:** Standards Track | **작성일:** 11-Dec-2000


# PEP 233 – Python 온라인 도움말

*   **작성자:** Paul Prescod
*   **상태:** 연기됨 (Deferred)
*   **유형:** 표준 트랙 (Standards Track)
*   **생성일:** 2000년 12월 11일
*   **Python 버전:** 2.1
*   **Post-History:** [원문 참고]

## 초록 (Abstract)

이 PEP는 Python을 위한 명령줄 기반 온라인 도움말 기능을 설명합니다. 이 기능은 Python 문서 및 Docstrings(독스트링)와 같은 기존 문서 기능을 기반으로 구축되어야 합니다. 또한 새로운 유형 및 모듈에 대해 확장 가능해야 합니다.

## 대화형 사용 (Interactive use)

단순히 `help`를 입력하면 `help` 함수에 대한 설명이 나타납니다 (`repr()` 오버로딩을 통해).

`help`는 함수로도 사용할 수 있으며, 다음 형식의 입력을 받습니다:

*   `help("string")` – 내장된 토픽 또는 전역 도움말
*   `help(<ob>)` – 객체(object) 또는 타입(type)의 Docstring
*   `help("doc:filename")` – Python 문서의 파일명

전역(global) 도움말을 요청할 경우, `help("xml.dom")`와 같이 완전한 이름(fully-qualified name)을 사용할 수 있습니다.

또한, 명령줄에서 다음처럼 이 기능을 사용할 수 있습니다:

```bash
python --help if
```

두 경우 모두, 출력은 `more` 명령어와 유사하게 페이지를 넘기는 방식으로 표시됩니다.

## 구현 (Implementation)

`help` 함수는 필요할 때 로드되는 `onlinehelp` 모듈에 구현됩니다.

`onlinehelp` 모듈을 통해 명령줄이 아닌 다른 환경에서 도움말 정보를 가져올 수 있는 옵션이 있어야 합니다:

```python
onlinehelp.gethelp(object_or_string) -> string
```

`onlinehelp.displayhelp(object_or_string)`에 할당하여 도움말 표시 함수를 오버라이드(override)하는 것도 가능해야 합니다.

이 모듈은 Python 문서의 HTML 또는 LaTeX 버전에서 모듈 정보를 추출할 수 있어야 합니다. 링크는 "lynx-like" 방식으로 처리되어야 합니다.

시간이 지남에 따라, Docstring이 structured text, HTML, LaTeX와 같은 "특수" 구문(syntax)으로 작성되었을 때 이를 인식하고 적절하게 디코딩(decode)할 수 있어야 합니다.

프로토타입 구현은 Python 소스 배포판의 `nondist/sandbox/doctools/onlinehelp.py`에서 확인할 수 있습니다.

## 내장 토픽 (Built-in Topics)

다음은 `help()` 함수로 접근할 수 있는 내장 토픽의 예시입니다:

*   `help("intro")` – Python이란? 이것부터 읽으세요!
*   `help("keywords")` – 키워드(keywords)는 무엇인가요?
*   `help("syntax")` – 전체적인 구문(syntax)은 무엇인가요?
*   `help("operators")` – 사용 가능한 연산자(operators)는 무엇인가요?
*   `help("builtins")` – 내장(built-in) 함수, 타입 등은 무엇인가요?
*   `help("modules")` – 표준 라이브러리(standard library)에는 어떤 모듈이 있나요?
*   `help("copyright")` – Python의 저작권은 누구에게 있나요?
*   `help("moreinfo")` – 더 많은 정보는 어디서 찾을 수 있나요?
*   `help("changes")` – Python 2.0에서 무엇이 변경되었나요?
*   `help("extensions")` – 어떤 확장 기능(extensions)이 설치되어 있나요?
*   `help("faq")` – 자주 묻는 질문(FAQ)은 무엇인가요?
*   `help("ack")` – 최근 Python 작업에 누가 참여했나요?

## 보안 문제 (Security Issues)

이 모듈은 요청된 토픽과 동일한 이름의 모듈을 임포트(import)하려고 시도합니다. `PYTHONPATH`에 있는 모든 것이 신뢰할 수 있는 소스에서 온 것인지 확신할 수 없다면 이 모듈을 사용하지 마세요.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.