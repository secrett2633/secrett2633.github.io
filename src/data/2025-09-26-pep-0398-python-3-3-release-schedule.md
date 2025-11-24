---
title: "[Final] PEP 398 - Python 3.3 Release Schedule"
excerpt: "Python Enhancement Proposal 398: 'Python 3.3 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/398/
toc: true
toc_sticky: true
date: 2025-09-26 21:23:58+0900
last_modified_at: 2025-09-26 21:23:58+0900
published: true
---
> **원문 링크:** [PEP 398 - Python 3.3 Release Schedule](https://peps.python.org/pep-0398/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 23-Mar-2011

PEP 398 – Python 3.3 릴리스 스케줄
==================================

*   **작성자:** Georg Brandl <georg at python.org>
*   **상태:** Final (최종)
*   **유형:** Informational (정보성)
*   **주제:** Release (릴리스)
*   **생성일:** 2011년 3월 23일
*   **Python 버전:** 3.3

## 초록 (Abstract)

이 문서는 Python 3.3의 개발 및 릴리스 스케줄에 대해 설명합니다. 스케줄은 주로 PEP 규모의 항목들을 다룹니다.

## 릴리스 관리자 (Release Manager) 및 팀

*   **3.3 릴리스 관리자:** Georg Brandl, Ned Deily (3.3.7 이상)
*   **Windows 인스톨러:** Martin v. Löwis
*   **Mac 인스톨러:** Ronald Oussoren/Ned Deily
*   **문서화 (Documentation):** Georg Brandl

## 3.3 수명 주기 (Lifespan)

Python 3.3은 약 18개월 동안 4~6개월마다 버그 수정 업데이트를 받을 예정이었습니다. 3.4.0 final 버전이 릴리스된 후, 최종 3.3 버그 수정 업데이트가 릴리스되었습니다. 그 후, 3.3 final 릴리스 후 5년이 되는 2017년 9월까지 보안 업데이트(소스 코드만 해당)가 릴리스되었습니다.

2017년 9월 29일부로 Python 3.3.x는 EOL (End-Of-Life, 서비스 종료) 상태에 도달했습니다.

## 릴리스 스케줄 (Release Schedule)

### 3.3.0 스케줄

*   3.3.0 alpha 1: 2012년 3월 5일
*   3.3.0 alpha 2: 2012년 4월 2일
*   3.3.0 alpha 3: 2012년 5월 1일
*   3.3.0 alpha 4: 2012년 5월 31일
*   3.3.0 beta 1: 2012년 6월 27일 (이 시점 이후로는 새로운 기능 추가 없음)
*   3.3.0 beta 2: 2012년 8월 12일
*   3.3.0 candidate 1: 2012년 8월 24일
*   3.3.0 candidate 2: 2012년 9월 9일
*   3.3.0 candidate 3: 2012년 9월 24일
*   3.3.0 final: 2012년 9월 29일

### 3.3.1 스케줄

*   3.3.1 candidate 1: 2013년 3월 23일
*   3.3.1 final: 2013년 4월 6일

### 3.3.2 스케줄

*   3.3.2 final: 2013년 5월 13일

### 3.3.3 스케줄

*   3.3.3 candidate 1: 2013년 10월 27일
*   3.3.3 candidate 2: 2013년 11월 9일
*   3.3.3 final: 2013년 11월 16일

### 3.3.4 스케줄

*   3.3.4 candidate 1: 2014년 1월 26일
*   3.3.4 final: 2014년 2월 9일

### 3.3.5 스케줄

Python 3.3.5는 3.3이 보안 수정 전용 모드에 들어가기 전의 마지막 정규 유지보수 릴리스였습니다.

*   3.3.5 candidate 1: 2014년 2월 22일
*   3.3.5 candidate 2: 2014년 3월 1일
*   3.3.5 final: 2014년 3월 8일

### 3.3.6 스케줄 (보안 수정 전용)

*   3.3.6 candidate 1 (소스 코드 전용 릴리스): 2014년 10월 4일
*   3.3.6 final (소스 코드 전용 릴리스): 2014년 10월 11일

### 3.3.7 스케줄 (보안 수정 전용)

*   3.3.7 candidate 1 (소스 코드 전용 릴리스): 2017년 9월 6일
*   3.3.7 final (소스 코드 전용 릴리스): 2017년 9월 19일

### 3.3.x EOL (서비스 종료)

*   2017년 9월 29일

## 3.3의 주요 기능 (Features for 3.3)

### 구현/최종 (Implemented / Final) PEPs:

*   [PEP 362: Function Signature Object](https://peps.python.org/pep-0362/) (함수 시그니처 객체)
*   [PEP 380: Syntax for Delegating to a Subgenerator](https://peps.python.org/pep-0380/) (서브제너레이터로 위임하는 문법)
*   [PEP 393: Flexible String Representation](https://peps.python.org/pep-0393/) (유연한 문자열 표현)
*   [PEP 397: Python launcher for Windows](https://peps.python.org/pep-0397/) (Windows용 Python 런처)
*   [PEP 399: Pure Python/C Accelerator Module Compatibility Requirements](https://peps.python.org/pep-0399/) (순수 Python/C 가속 모듈 호환성 요구사항)
*   [PEP 405: Python Virtual Environments](https://peps.python.org/pep-0405/) (Python 가상 환경)
*   [PEP 409: Suppressing exception context](https://peps.python.org/pep-0409/) (예외 컨텍스트 억제)
*   [PEP 412: Key-Sharing Dictionary](https://peps.python.org/pep-0412/) (키 공유 딕셔너리)
*   [PEP 414: Explicit Unicode Literal for Python 3.3](https://peps.python.org/pep-0414/) (Python 3.3을 위한 명시적 유니코드 리터럴)
*   [PEP 415: Implement context suppression with exception attributes](https://peps.python.org/pep-0415/) (예외 속성을 사용한 컨텍스트 억제 구현)
*   [PEP 417: Including mock in the Standard Library](https://peps.python.org/pep-0417/) (표준 라이브러리에 mock 포함)
*   [PEP 418: Add monotonic time, performance counter, and process time functions](https://peps.python.org/pep-0418/) (단조 시간, 성능 카운터, 프로세스 시간 함수 추가)
*   [PEP 420: Implicit Namespace Packages](https://peps.python.org/pep-0420/) (암시적 네임스페이스 패키지)
*   [PEP 421: Adding sys.implementation](https://peps.python.org/pep-0421/) (`sys.implementation` 추가)
*   [PEP 3118: Revising the buffer protocol (protocol semantics finalised)](https://peps.python.org/pep-3118/) (버퍼 프로토콜 개정 (프로토콜 의미론 확정))
*   [PEP 3144: IP Address manipulation library](https://peps.python.org/pep-3144/) (IP 주소 조작 라이브러리)
*   [PEP 3151: Reworking the OS and IO exception hierarchy](https://peps.python.org/pep-3151/) (OS 및 IO 예외 계층 구조 재작업)
*   [PEP 3155: Qualified name for classes and functions](https://peps.python.org/pep-3155/) (클래스 및 함수의 한정자 이름)

### 기타 최종 대규모 변경 사항:

*   `faulthandler` 모듈 추가
*   `lzma` 모듈 추가 및 `tarfile`의 lzma/xz 지원
*   `importlib`를 사용한 `__import__` 구현
*   C decimal 구현 추가
*   Windows 빌드 도구 체인을 VS 2010으로 전환

### Candidate PEPs:

*   없음

### 기타 계획된 대규모 변경 사항:

*   없음

### 3.3 이후로 연기된 (Deferred to post-3.3) 항목들:

*   [PEP 395: Qualified Names for Modules](https://peps.python.org/pep-0395/) (모듈의 한정자 이름)
*   [PEP 3143: Standard daemon process library](https://peps.python.org/pep-3143/) (표준 데몬 프로세스 라이브러리)
*   [PEP 3154: Pickle protocol version 4](https://peps.python.org/pep-3154/) (Pickle 프로토콜 버전 4)
*   별도의 리포지토리로 표준 라이브러리 및 문서 분리
*   `packaging` 모듈 추가, `distutils` Deprecate (사용 중단)
*   `regex` 모듈 추가
*   Email 버전 6
*   표준 이벤트 루프 인터페이스 (Jim Fulton의 PEP 대기 중)

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인에 공개되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.