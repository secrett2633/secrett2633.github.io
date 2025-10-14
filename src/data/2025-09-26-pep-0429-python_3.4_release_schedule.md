---
title: "[Final] PEP 429 - Python 3.4 Release Schedule"
excerpt: "Python Enhancement Proposal 429: 'Python 3.4 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/429/
toc: true
toc_sticky: true
date: 2025-09-26 21:42:34+0900
last_modified_at: 2025-09-26 21:42:34+0900
published: true
---
> **원문 링크:** [PEP 429 - Python 3.4 Release Schedule](https://peps.python.org/pep-0429/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 17-Oct-2012

## PEP 429 – Python 3.4 릴리스 스케줄

이 문서는 Python 3.4의 개발 및 릴리스 스케줄을 설명하며, 주로 PEP (Python Enhancement Proposal) 규모의 항목들에 초점을 맞춥니다.

**문서 정보:**
*   **작성자:** Larry Hastings
*   **상태:** Final (최종)
*   **유형:** Informational (정보성)
*   **주제:** Release (릴리스)
*   **생성일:** 2012년 10월 17일
*   **Python 버전:** 3.4

---

### 릴리스 관리자 및 담당자

*   **3.4 릴리스 관리자:** Larry Hastings
*   **Windows 인스톨러:** Martin v. Löwis
*   **Mac 인스톨러:** Ned Deily
*   **문서:** Georg Brandl

---

### 릴리스 스케줄

Python 3.4는 현재 수명 주기(end-of-life)를 마쳤으며, 더 이상 새로운 릴리스는 없을 것입니다. 다음은 Python 3.4의 역사적인 릴리스들과 각 릴리스 날짜입니다.

*   3.4.0 alpha 1: 2013년 8월 3일
*   3.4.0 alpha 2: 2013년 9월 9일
*   3.4.0 alpha 3: 2013년 9월 29일
*   3.4.0 alpha 4: 2013년 10월 20일
*   3.4.0 beta 1: 2013년 11월 24일
*   3.4.0 beta 2: 2014년 1월 5일
*   3.4.0 beta 3: 2014년 1월 26일
*   3.4.0 candidate 1: 2014년 2월 10일
*   3.4.0 candidate 2: 2014년 2월 23일
*   3.4.0 candidate 3: 2014년 3월 9일
*   3.4.0 final: 2014년 3월 16일
*   3.4.1 candidate 1: 2014년 5월 5일
*   3.4.1 final: 2014년 5월 18일
*   3.4.2 candidate 1: 2014년 9월 22일
*   3.4.2 final: 2014년 10월 6일
*   3.4.3 candidate 1: 2015년 2월 8일
*   3.4.3 final: 2015년 2월 25일
*   3.4.4 candidate 1: 2015년 12월 6일
*   3.4.4 final: 2015년 12월 20일
*   3.4.5 candidate 1: 2016년 6월 12일
*   3.4.5 final: 2016년 6월 26일
*   3.4.6 candidate 1: 2017년 1월 2일
*   3.4.6 final: 2017년 1월 17일
*   3.4.7 candidate 1: 2017년 7월 25일
*   3.4.7 final: 2017년 8월 9일
*   3.4.8 candidate 1: 2018년 1월 23일
*   3.4.8 final: 2018년 2월 4일
*   3.4.9 candidate 1: 2018년 7월 19일
*   3.4.9 final: 2018년 8월 2일
*   3.4.10 candidate 1: 2019년 3월 4일
*   3.4.10 final: 2019년 3월 18일

---

### Python 3.4의 주요 기능

Python 3.4 릴리스에 포함되었거나 최종적으로 구현된 PEP들은 다음과 같습니다.

**구현 완료/최종 PEPs:**

*   **PEP 428:** 객체 지향 파일 시스템 경로를 제공하는 "pathlib" 모듈 추가.
*   **PEP 435:** 표준화된 "enum" 모듈 추가.
*   **PEP 436:** 내장(builtins) 함수에 대한 introspection (내부 탐색) 정보 생성을 돕는 빌드 개선.
*   **PEP 442:** 객체 종료(object finalization)에 대한 개선된 시맨틱스 (의미론).
*   **PEP 443:** 표준 라이브러리에 단일 디스패치 제네릭 함수(single-dispatch generic functions) 추가.
*   **PEP 445:** 사용자 정의 메모리 할당자를 구현하기 위한 새로운 C API.
*   **PEP 446:** 서브프로세스(subprocesses)에서 파일 디스크립터(file descriptors)가 기본적으로 상속되지 않도록 변경.
*   **PEP 450:** 새로운 "statistics" 모듈 추가.
*   **PEP 451:** Python의 모듈 임포트 시스템을 위한 모듈 메타데이터 표준화.
*   **PEP 453:** `pip` 패키지 관리자를 위한 번들 인스톨러 (bundled installer) 제공.
*   **PEP 454:** Python 메모리 할당을 추적하기 위한 새로운 "tracemalloc" 모듈.
*   **PEP 456:** Python 문자열 및 바이너리 데이터에 대한 새로운 해시 알고리즘.
*   **PEP 3154:** `pickle` 된 객체를 위한 새롭고 개선된 프로토콜.
*   **PEP 3156:** 비동기 I/O (asynchronous I/O)를 위한 새로운 프레임워크인 "asyncio" 모듈.

**3.4 이후로 연기된 PEPs:**

*   **PEP 431:** 시간대 데이터베이스에 대한 개선된 지원.
*   **PEP 441:** Python zip 애플리케이션 지원 개선.
*   **PEP 447:** `__locallookup__` 메타클래스(metaclass) 메서드 지원.
*   **PEP 448:** 추가적인 언패킹 일반화 (additional unpacking generalizations).
*   **PEP 455:** 키 변환 딕셔너리 (key transforming dictionary).

---

### 저작권

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.