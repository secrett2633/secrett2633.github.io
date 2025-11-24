---
title: "[Final] PEP 537 - Python 3.7 Release Schedule"
excerpt: "Python Enhancement Proposal 537: 'Python 3.7 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/537/
toc: true
toc_sticky: true
date: 2025-09-26 23:27:21+0900
last_modified_at: 2025-09-26 23:27:21+0900
published: true
---
> **원문 링크:** [PEP 537 - Python 3.7 Release Schedule](https://peps.python.org/pep-0537/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 23-Dec-2016

## PEP 537 – Python 3.7 릴리스 스케줄

### 메타 정보
*   **작성자(Author):** Ned Deily <nad at python.org>
*   **상태(Status):** Final
*   **타입(Type):** Informational
*   **토픽(Topic):** Release
*   **생성일(Created):** 2016년 12월 23일
*   **Python 버전(Python-Version):** 3.7

### 개요 (Abstract)
이 문서는 Python 3.7의 개발 및 릴리스 스케줄을 설명합니다. 스케줄은 주로 PEP(Python Enhancement Proposal) 규모의 항목들을 다룹니다.

### 릴리스 관리자 및 팀 (Release Manager and Crew)
*   **3.7 릴리스 관리자(Release Manager):** Ned Deily
*   **Windows 인스톨러(installers):** Steve Dower
*   **Mac 인스톨러(installers):** Ned Deily
*   **문서(Documentation):** Julien Palard

### 3.7 수명 주기 (3.7 Lifespan)
Python 3.7은 약 24개월 동안 대략 3개월마다 버그픽스(bugfix) 업데이트를 받을 예정이었습니다. 3.8.0 final 릴리스 이후, 최종 3.7 버그픽스 업데이트가 릴리스될 것으로 예상되었습니다. 그 이후로는 3.7 final 릴리스 후 5년까지, 즉 대략 2023년 6월까지 필요에 따라 보안 업데이트(소스 코드만 제공)가 릴리스될 것으로 예상되었습니다.

2023년 6월 27일을 기준으로, 3.7은 릴리스 주기에서 End-of-Life(EOL) 단계에 도달했습니다. 3.7.17이 최종 보안 릴리스였습니다. 이제 3.7의 코드 베이스는 동결되었으며, 더 이상의 업데이트는 제공되지 않고 버그 트래커에서도 어떤 종류의 이슈도 더 이상 접수되지 않습니다.

### 릴리스 스케줄 (Release Schedule)

#### 3.7.0 스케줄
*   3.7 개발 시작: 2016-09-12
*   3.7.0 alpha 1: 2017-09-19
*   3.7.0 alpha 2: 2017-10-17
*   3.7.0 alpha 3: 2017-12-05
*   3.7.0 alpha 4: 2018-01-09
*   3.7.0 beta 1: 2018-01-31 (이 시점 이후로는 새로운 기능 추가 없음)
*   3.7.0 beta 2: 2018-02-27
*   3.7.0 beta 3: 2018-03-29
*   3.7.0 beta 4: 2018-05-02
*   3.7.0 beta 5: 2018-05-30
*   3.7.0 candidate 1: 2018-06-12
*   **3.7.0 final:** 2018-06-27

#### 3.7.1 스케줄 (첫 번째 버그픽스 릴리스)
*   3.7.1 candidate 1: 2018-09-26
*   3.7.1 candidate 2: 2018-10-13
*   **3.7.1 final:** 2018-10-20

#### 3.7.2 스케줄
*   3.7.2 candidate 1: 2018-12-11
*   **3.7.2 final:** 2018-12-24

#### 3.7.3 스케줄
*   3.7.3 candidate 1: 2019-03-12
*   **3.7.3 final:** 2019-03-25

#### 3.7.4 스케줄
*   3.7.4 candidate 1: 2019-06-18
*   3.7.4 candidate 2: 2019-07-02
*   **3.7.4 final:** 2019-07-08

#### 3.7.5 스케줄
*   3.7.5 candidate 1: 2019-10-02
*   **3.7.5 final:** 2019-10-15

#### 3.7.6 스케줄
*   3.7.6 candidate 1: 2019-12-11
*   **3.7.6 final:** 2019-12-18

#### 3.7.7 스케줄
*   3.7.7 candidate 1: 2020-03-04
*   **3.7.7 final:** 2020-03-10

#### 3.7.8 스케줄 (마지막 버그픽스 릴리스)
*   계획된 마지막 바이너리 릴리스였습니다.
*   3.7.8 candidate 1: 2020-06-15
*   **3.7.8 final:** 2020-06-27

#### 3.7.9 스케줄 (보안/바이너리 릴리스)
*   3.7.8 이슈를 해결하기 위한 보안 수정 및 업데이트된 바이너리 인스톨러가 포함되었습니다. 이후 바이너리 릴리스는 계획되지 않았습니다.
*   **3.7.9 final:** 2020-08-17

#### 3.7.10 스케줄
*   **3.7.10 final:** 2021-02-15

#### 3.7.11 스케줄
*   **3.7.11 final:** 2021-06-28

#### 3.7.12 스케줄
*   **3.7.12 final:** 2021-09-04

#### 3.7.13 스케줄
*   **3.7.13 final:** 2022-03-16

#### 3.7.14 스케줄
*   **3.7.14 final:** 2022-09-06

#### 3.7.15 스케줄
*   **3.7.15 final:** 2022-10-11

#### 3.7.16 스케줄
*   **3.7.16 final:** 2022-12-06

#### 3.7.17 스케줄 (마지막 보안 전용 릴리스)
*   **3.7.17 final:** 2023-06-06

### 3.7의 주요 기능 (Features for 3.7)
3.7.0 beta 1 기준으로 3.7에 구현된 PEP들은 다음과 같습니다.

*   **PEP 538:** 레거시 C locale을 UTF-8 기반 locale로 강제 변환 (Coercing the legacy C locale to a UTF-8 based locale)
*   **PEP 539:** CPython에서 Thread-Local Storage를 위한 새로운 C-API (A New C-API for Thread-Local Storage in CPython)
*   **PEP 540:** UTF-8 모드 (UTF-8 mode)
*   **PEP 552:** 결정론적 `pyc` 파일 (Deterministic pyc)
*   **PEP 553:** 내장 `breakpoint()` 함수 (Built-in breakpoint())
*   **PEP 557:** 데이터 클래스 (Data Classes)
*   **PEP 560:** `typing` 모듈 및 제네릭 타입에 대한 핵심 지원 (Core support for typing module and generic types)
*   **PEP 562:** 모듈 `__getattr__` 및 `__dir__` (Module `__getattr__` and `__dir__`)
*   **PEP 563:** 어노테이션의 지연 평가 (Postponed Evaluation of Annotations)
*   **PEP 564:** 나노초 해상도의 시간 함수 (Time functions with nanosecond resolution)
*   **PEP 565:** `__main__`에서 `DeprecationWarning` 표시 (Show DeprecationWarning in `__main__`)
*   **PEP 567:** 컨텍스트 변수 (Context Variables)

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.