---
title: "[Final] PEP 494 - Python 3.6 Release Schedule"
excerpt: "Python Enhancement Proposal 494: 'Python 3.6 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/494/
toc: true
toc_sticky: true
date: 2025-09-26 22:39:23+0900
last_modified_at: 2025-09-26 22:39:23+0900
published: true
---
> **원문 링크:** [PEP 494 - Python 3.6 Release Schedule](https://peps.python.org/pep-0494/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 30-May-2015

## PEP 494: Python 3.6 릴리스 일정

이 문서는 Python 3.6의 개발 및 릴리스 일정을 설명하는 Python Enhancement Proposal (PEP)입니다. 이 PEP는 주로 PEP 단위의 항목들에 중점을 둡니다.

### 개요 (Abstract)

PEP 494는 Python 3.6 버전의 개발 및 릴리스 일정을 상세히 기술합니다.

### 릴리스 관리자 및 담당자 (Release Manager and Crew)

Python 3.6 릴리스를 담당한 주요 인력은 다음과 같습니다.

*   **3.6 릴리스 관리자 (Release Manager):** Ned Deily
*   **Windows 인스톨러 (installers):** Steve Dower
*   **Mac 인스톨러 (installers):** Ned Deily
*   **문서화 (Documentation):** Julien Palard, Georg Brandl

### 3.6 수명 주기 (3.6 Lifespan)

Python 3.6은 약 24개월 동안 약 3개월마다 버그 수정(bugfix) 업데이트를 받았습니다. 3.7.0 final 버전이 릴리스된 후, 3.6의 최종 버그 수정 업데이트가 제공되었습니다. 그 이후에는 3.6 final 릴리스 후 5년까지, 즉 대략 2021년 12월까지 필요에 따라 보안 업데이트(security updates, 소스 코드만 해당)가 릴리스될 것으로 예상되었습니다.

2021년 12월 23일을 기점으로, 3.6 버전은 릴리스 수명 주기의 "End-of-Life (EOL)" 단계에 도달했습니다. 3.6.15가 마지막 보안 릴리스였으며, 3.6 코드 베이스는 현재 동결(frozen)되어 더 이상의 업데이트는 제공되지 않으며 버그 트래커(bug tracker)에서도 어떠한 종류의 이슈도 더 이상 접수되지 않습니다.

### 릴리스 일정 (Release Schedule)

다음은 Python 3.6의 주요 릴리스 일정입니다.

#### 3.6.0 일정

*   3.6 개발 시작: 2015년 5월 24일
*   3.6.0 alpha 1: 2016년 5월 17일
*   3.6.0 alpha 2: 2016년 6월 13일
*   3.6.0 alpha 3: 2016년 7월 11일
*   3.6.0 alpha 4: 2016년 8월 15일
*   3.6.0 beta 1: 2016년 9월 12일 (이 시점 이후로는 새로운 기능 추가 없음)
*   3.6.0 beta 2: 2016년 10월 10일
*   3.6.0 beta 3: 2016년 10월 31일
*   3.6.0 beta 4: 2016년 11월 21일
*   3.6.0 candidate 1: 2016년 12월 6일
*   3.6.0 candidate 2: 2016년 12월 16일
*   **3.6.0 final:** 2016년 12월 23일

#### 3.6.1 일정 (첫 번째 버그 수정 릴리스)

*   3.6.1 candidate: 2017년 3월 5일
*   **3.6.1 final:** 2017년 3월 21일

#### 3.6.2 ~ 3.6.7 일정

이 기간 동안 여러 차례의 버그 수정 릴리스가 있었습니다. (자세한 날짜는 원문 PEP 참조)

#### 3.6.8 일정 (마지막 버그 수정 릴리스)

*   3.6.8 candidate: 2018년 12월 11일
*   **3.6.8 final:** 2018년 12월 24일

#### 3.6.9 일정 (첫 번째 보안 전용 릴리스)

*   3.6.9 candidate 1: 2019년 6월 18일
*   **3.6.9 final:** 2019년 7월 2일

#### 3.6.10 ~ 3.6.14 일정

이 기간 동안 여러 차례의 보안 전용 릴리스가 있었습니다. (자세한 날짜는 원문 PEP 참조)

#### 3.6.15 일정 (마지막 보안 전용 릴리스)

*   **3.6.15 final:** 2021년 9월 4일

### 3.6의 주요 기능 (Features for 3.6)

3.6.0 beta 1 시점에 구현된 주요 변경 사항 및 기능들은 다음과 같습니다. 이 기능들은 Python 3.6의 개발 방향과 개선점을 이해하는 데 중요합니다.

*   **PEP 468, `Keyword Argument` 순서 보존 (Preserving Keyword Argument Order):** 함수 호출 시 전달된 키워드 인자들의 순서를 유지합니다.
*   **PEP 487, 클래스 생성 사용자 정의 간소화 (Simpler customization of class creation):** 클래스 생성(metaclass)을 더욱 쉽게 사용자 정의할 수 있도록 합니다.
*   **PEP 495, 지역 시간 모호성 해소 (Local Time Disambiguation):** 일광 절약 시간제(DST) 전환 시 발생하는 시간 모호성을 처리합니다.
*   **PEP 498, 리터럴 문자열 포맷팅 (Literal String Formatting):** F-string (formatted string literals) 도입으로 문자열 포맷팅이 더욱 간결해졌습니다.
*   **PEP 506, 표준 라이브러리에 `Secrets` 모듈 추가 (Adding A Secrets Module To The Standard Library):** 암호학적으로 강력한 난수 생성을 위한 `secrets` 모듈이 추가되었습니다.
*   **PEP 509, `dict`에 비공개 버전 추가 (Add a private version to dict):** `dict` 객체 내부 구현에 대한 최적화 및 안정성 개선.
*   **PEP 515, 숫자 리터럴에 밑줄 (Underscores in Numeric Literals):** 숫자 리터럴 중간에 밑줄(`_`)을 사용하여 가독성을 높일 수 있습니다 (예: `1_000_000`).
*   **PEP 519, 파일 시스템 경로 프로토콜 추가 (Adding a file system path protocol):** `os.PathLike` 프로토콜을 도입하여 경로 객체를 더욱 유연하게 다룰 수 있게 합니다.
*   **PEP 520, 클래스 속성 정의 순서 보존 (Preserving Class Attribute Definition Order):** 클래스 내에 정의된 속성들의 순서가 유지됩니다.
*   **PEP 523, CPython에 프레임 평가 API 추가 (Adding a frame evaluation API to CPython):** CPython 내부의 프레임(frame) 평가를 위한 새로운 API를 제공합니다.
*   **PEP 524, Linux에서 `os.urandom()`을 블로킹 방식으로 변경 (시작 중) (Make os.urandom() blocking on Linux (during system startup)):** 시스템 시작 중 `os.urandom()`이 충분한 엔트로피(entropy)를 얻을 때까지 블로킹하여 보안을 강화합니다.
*   **PEP 525, 비동기 제너레이터 (Asynchronous Generators) (잠정적):** `async def` 문법을 사용하여 비동기 제너레이터를 정의할 수 있게 합니다.
*   **PEP 526, 변수 어노테이션 구문 (Syntax for Variable Annotations) (잠정적):** 변수에 타입 어노테이션(type annotation)을 지정하는 새로운 구문이 도입되었습니다.
*   **PEP 528, Windows 콘솔 인코딩을 UTF-8로 변경 (Change Windows console encoding to UTF-8) (잠정적):** Windows 콘솔의 기본 인코딩을 UTF-8로 변경하여 유니코드(Unicode) 지원을 개선합니다.
*   **PEP 529, Windows 파일 시스템 인코딩을 UTF-8로 변경 (Change Windows filesystem encoding to UTF-8) (잠정적):** Windows 파일 시스템의 인코딩을 UTF-8로 변경하여 국제화(internationalization)를 강화합니다.
*   **PEP 530, 비동기 컴프리헨션 (Asynchronous Comprehensions):** `async for`를 `List Comprehension`, `Set Comprehension`, `Dictionary Comprehension`, `Generator Expression`에서 사용할 수 있도록 합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.