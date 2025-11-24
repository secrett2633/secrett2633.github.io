---
title: "[Final] PEP 566 - Metadata for Python Software Packages 2.1"
excerpt: "Python Enhancement Proposal 566: 'Metadata for Python Software Packages 2.1'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/566/
toc: true
toc_sticky: true
date: 2025-09-26 23:49:52+0900
last_modified_at: 2025-09-26 23:49:52+0900
published: true
---
> **원문 링크:** [PEP 566 - Metadata for Python Software Packages 2.1](https://peps.python.org/pep-0566/)
>
> **상태:** Final | **유형:** Standards Track | **작성일:** 01-Dec-2017

## PEP 566 – Python 소프트웨어 패키지용 메타데이터 2.1

### 초록 (Abstract)

이 PEP (Python Enhancement Proposal)는 Python 패키지의 핵심 메타데이터 사양 버전 1.2와 2.1 사이의 변경 사항을 설명합니다. 버전 1.2는 PEP 345에 명시되어 있습니다.

또한, 필드 사양의 정식 출처를 핵심 메타데이터 사양(Core Metadata Specification) 참조 문서로 변경하며, 여기에는 필드 이름과 그 의미 및 사용법에 대한 세부 정보가 포함됩니다.

**중요:** 이 PEP는 역사적인 문서입니다. 최신 정보가 포함된 정식 사양인 "Core metadata specifications"는 PyPA (Python Packaging Authority) 사양 페이지에서 유지 관리됩니다.

### 필드 (Fields)

지원되는 각 메타데이터 필드의 이름과 의미에 대한 정식 출처는 핵심 메타데이터 사양(Core Metadata Specification) 문서입니다.

"(Multiple use)"로 표시된 필드는 단일 `PKG-INFO` 파일에 여러 번 지정될 수 있습니다. 다른 필드는 `PKG-INFO` 파일에 한 번만 나타날 수 있습니다. "(optional)"로 표시된 필드는 유효한 `PKG-INFO` 파일에 나타날 필요가 없습니다. 다른 모든 필드는 반드시 존재해야 합니다.

#### 버전 2.1에 새로 추가된 필드 (New in Version 2.1)

*   **Description-Content-Type (optional)**
    배포판의 설명(description)에 사용된 마크업 문법(markup syntax)을 나타내는 문자열로, 도구가 설명을 지능적으로 렌더링(render)할 수 있도록 합니다.

    역사적으로 PyPI와 같은 도구는 패키지의 설명이 reStructuredText (reST) 형식이라고 가정하고, 설명이 유효한 reST가 아니면 일반 텍스트로 폴백(fallback)했습니다.

    이 필드의 도입으로 PyPI는 추가적인 마크업 문법 유형을 지원할 수 있게 되었고, 이러한 가정을 할 필요가 없어졌습니다.

    이 필드에 대한 전체 사양은 핵심 메타데이터 사양(Core Metadata Specification)에 정의되어 있습니다.

*   **Provides-Extra (optional, multiple use)**
    선택적 기능(optional feature)의 이름을 포함하는 문자열입니다. 유효한 Python 식별자여야 합니다. 이 필드는 선택적 기능이 요청되었는지 여부에 따라 의존성(dependency)을 조건부로 만들기 위해 사용될 수 있습니다.

    이 필드의 도입으로 `pip`와 같은 패키지 설치 도구는 주어진 패키지가 제공하는 추가 기능(extras)을 결정할 수 있으며, `twine`과 같은 패키지 게시 도구는 extras를 사용하는 환경 마커(environment markers)의 문제를 확인할 수 있습니다.

    이 필드에 대한 전체 사양은 핵심 메타데이터 사양(Core Metadata Specification)에 정의되어 있습니다.

#### 버전 2.1에서 변경된 필드 (Changed in Version 2.1)

*   **Name**
    이 필드의 형식 사양은 이제 PEP 508에 정의된 배포 이름(distribution name) 사양과 동일합니다.

*   **Description**
    `Description` 헤더 필드 외에도, 배포판의 설명은 메시지 본문(message body)에 제공될 수 있습니다. 즉, 헤더 다음에 완전히 빈 줄이 오고, 들여쓰기나 다른 특별한 서식 없이 작성될 수 있습니다.

*   **버전 지정자 (Version Specifiers)**
    버전 번호 요구 사항과 버전 간 비교 지정 의미론은 PEP 440에 정의되어 있습니다. PEP 440에 정의된 직접 참조(direct references) 또한 버전 지정자(version specifiers)의 대안으로 허용됩니다.

    PEP 508에 따라, 버전 지정자는 `Requires-Dist`, `Provides-Dist`, `Obsoletes-Dist` 또는 `Requires-External` 필드에서 더 이상 괄호로 둘러싸일 필요가 없습니다. 예를 들어, `requests >= 2.8.1`은 이제 유효한 값입니다. 권장되는 형식은 괄호가 없는 것이지만, 메타데이터를 파싱(parsing)하는 도구는 괄호 안의 버전 지정자도 처리할 수 있어야 합니다. 또한, 공용 인덱스 서버(public index servers)는 이러한 필드에서 엄격한 버전 일치 절(strict version matching clauses)이나 직접 참조를 금지할 수 있습니다.

    버전 지정자의 사용법은 PEP 345와 달리 변경되지 않았습니다.

*   **환경 마커 (Environment markers)**
    환경 마커(environment marker)는 세미콜론(`;`) 뒤에 필드 끝에 추가될 수 있는 마커로, 실행 환경에 대한 조건을 추가합니다.

    이러한 조건을 선언하는 데 사용되는 환경 마커 형식은 PEP 508의 환경 마커 섹션에 정의되어 있습니다.

    환경 마커의 사용법은 PEP 345와 달리 변경되지 않았습니다.

### JSON 호환 메타데이터 (JSON-compatible Metadata)

JSON과 같이 여러 개의 반복되는 키(repeated keys)를 허용하지 않는 데이터 구조에 메타데이터를 저장해야 할 수도 있습니다.

이러한 데이터 구조로 메타데이터 필드를 변환하는 정식 방법은 다음과 같습니다.

*   원본 키-값(key-value) 형식은 `email.parser.HeaderParser`로 읽어야 합니다.
*   변환된 모든 키는 소문자로 축소되어야 합니다. 하이픈(Hyphens)은 밑줄(underscores)로 대체되어야 하지만, 다른 모든 문자는 유지되어야 합니다.
*   "(Multiple-use)"로 표시된 필드의 변환된 값은 주어진 키에 대한 모든 원본 값을 포함하는 단일 목록(list)이어야 합니다.
*   `Keywords` 필드는 쉼표(commas)를 기준으로 원본 값을 분할하여 목록으로 변환되어야 합니다.
*   메시지 본문(message body)이 있으면 `description` 키의 값으로 설정되어야 합니다.
*   결과는 문자열 키를 가진 딕셔너리(string-keyed dictionary)로 저장되어야 합니다.

### PEP 345와의 차이점 요약 (Summary of Differences From PEP 345)

*   `Metadata-Version`이 이제 2.1입니다.
*   필드는 이제 핵심 메타데이터 사양(Core Metadata Specification)을 통해 지정됩니다.
*   두 가지 새로운 필드 `Description-Content-Type`과 `Provides-Extra`가 추가되었습니다.
*   `Name` 필드의 허용 가능한 값은 이제 PEP 508에 따라 지정됩니다.
*   JSON 호환 데이터 구조로의 변환을 위한 정식 방법이 추가되었습니다.

### 참고 자료 (References)

이 문서는 메타데이터 형식의 버전 2.1을 명시합니다.
*   버전 1.0은 PEP 241에 명시되어 있습니다.
*   버전 1.1은 PEP 314에 명시되어 있습니다.
*   버전 1.2는 PEP 345에 명시되어 있습니다.
*   버전 2.0은 공식적으로 채택되지는 않았지만 PEP 426에 명시되어 있었습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

### 감사의 글 (Acknowledgements)

이 PEP에 기여해준 Alyssa Coghlan과 Thomas Kluyver에게 감사드립니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.