---
title: "[Final] PEP 569 - Python 3.8 Release Schedule"
excerpt: "Python Enhancement Proposal 569: 'Python 3.8 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/569/
toc: true
toc_sticky: true
date: 2025-09-26 23:51:49+0900
last_modified_at: 2025-09-26 23:51:49+0900
published: true
---
> **원문 링크:** [PEP 569 - Python 3.8 Release Schedule](https://peps.python.org/pep-0569/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 27-Jan-2018

# PEP 569 – Python 3.8 릴리스 스케줄

**작성자:** Łukasz Langa <lukasz at python.org>
**상태:** Final
**유형:** Informational
**주제:** Release
**생성일:** 2018년 1월 27일
**Python 버전:** 3.8

## 개요 (Abstract)

이 문서는 Python 3.8의 개발 및 릴리스 스케줄을 설명합니다. 스케줄은 주로 PEP 스케일에 해당하는 항목들을 다룹니다.

## 릴리스 관리자 및 담당 팀 (Release Manager and Crew)

*   **3.8 릴리스 관리자:** Łukasz Langa
*   **Windows 인스톨러:** Steve Dower
*   **Mac 인스톨러:** Ned Deily
*   **문서:** Julien Palard

## 3.8 수명 주기 (3.8 Lifespan)

Python 3.8은 약 18개월 동안 약 2개월마다 버그 수정 업데이트를 받았습니다. 3.9.0 최종 버전이 릴리스된 후 얼마 지나지 않아 아홉 번째이자 마지막 3.8 버그 수정 업데이트가 릴리스되었습니다. 그 이후에는 Python 3.13.0 최종 버전이 릴리스될 때까지 5년 동안 보안 업데이트(소스 코드만 해당)가 제공되었습니다.

2024년 10월 7일 기준으로, 3.8은 릴리스 주기에서 지원 종료(end-of-life) 단계에 도달했습니다. 3.8.20이 마지막 보안 릴리스였습니다. 3.8의 코드베이스는 이제 고정(frozen)되었으며, 더 이상의 업데이트는 제공되지 않고 버그 트래커에서 어떠한 종류의 문제도 접수되지 않을 것입니다.

## 릴리스 스케줄 (Release Schedule)

### 3.8.0 스케줄 (3.8.0 schedule)

*   3.8 개발 시작: 2018년 1월 29일 월요일
*   3.8.0 alpha 1: 2019년 2월 3일 일요일
*   3.8.0 alpha 2: 2019년 2월 25일 월요일
*   3.8.0 alpha 3: 2019년 3월 25일 월요일
*   3.8.0 alpha 4: 2019년 5월 6일 월요일
*   3.8.0 beta 1: 2019년 6월 4일 화요일 (이 시점 이후로는 새로운 기능이 추가되지 않습니다.)
*   3.8.0 beta 2: 2019년 7월 4일 목요일
*   3.8.0 beta 3: 2019년 7월 29일 월요일
*   3.8.0 beta 4: 2019년 8월 30일 금요일
*   3.8.0 candidate 1: 2019년 10월 1일 화요일
*   **3.8.0 final:** 2019년 10월 14일 월요일

### 버그 수정 릴리스 (Bugfix releases)

*   3.8.1rc1: 2019년 12월 10일 화요일
*   3.8.1: 2019년 12월 18일 수요일
*   3.8.2rc1: 2020년 2월 10일 월요일
*   3.8.2rc2: 2020년 2월 17일 월요일
*   3.8.2: 2020년 2월 24일 월요일
*   3.8.3rc1: 2020년 4월 29일 수요일
*   3.8.3: 2020년 5월 13일 수요일
*   3.8.4rc1: 2020년 6월 30일 화요일
*   3.8.4: 2020년 7월 13일 월요일
*   3.8.5: 2020년 7월 20일 월요일 (보안 핫픽스)
*   3.8.6rc1: 2020년 9월 8일 화요일
*   3.8.6: 2020년 9월 24일 목요일
*   3.8.7rc1: 2020년 12월 7일 월요일
*   3.8.7: 2020년 12월 21일 월요일
*   3.8.8rc1: 2021년 2월 16일 화요일
*   3.8.8: 2021년 2월 19일 금요일
*   3.8.9: 2021년 4월 2일 금요일 (보안 핫픽스)
*   3.8.10: 2021년 5월 3일 월요일 (바이너리 인스톨러를 포함하는 최종 정규 버그 수정 릴리스)

### 소스 코드 전용 보안 수정 릴리스 (Source-only security fix releases)

2024년 10월 7일까지 "필요에 따라(as-needed)" 불규칙적으로 제공되었습니다.

*   3.8.11: 2021년 6월 28일 월요일
*   3.8.12: 2021년 8월 30일 월요일
*   3.8.13: 2022년 3월 16일 수요일
*   3.8.14: 2022년 9월 6일 화요일
*   3.8.15: 2022년 10월 11일 화요일
*   3.8.16: 2022년 12월 6일 화요일
*   3.8.17: 2023년 6월 6일 화요일
*   3.8.18: 2023년 8월 24일 목요일
*   3.8.19: 2024년 3월 19일 화요일
*   3.8.20: 2024년 9월 6일 금요일 (최종 보안 릴리스)

## 3.8의 주요 기능 (Features for 3.8)

Python 3.8의 주목할 만한 기능들은 다음과 같습니다.

*   **PEP 570, Positional-only arguments (위치 전용 인자):** 함수 인자를 위치로만 전달해야 함을 명시하는 구문입니다.
*   **PEP 572, Assignment Expressions (할당 표현식):** `:=` 연산자를 사용하여 표현식 내부에서 변수를 할당할 수 있도록 합니다. (일명 "walrus operator")
*   **PEP 574, Pickle protocol 5 with out-of-band data (아웃-오브-밴드 데이터를 사용하는 Pickle 프로토콜 5):** 대량 데이터를 더 효율적으로 직렬화하고 역직렬화할 수 있도록 합니다.
*   **PEP 578, Runtime audit hooks (런타임 감사 훅):** CPython의 런타임 이벤트를 모니터링하고 가로챌 수 있는 API를 제공하여 보안 및 디버깅 기능을 향상시킵니다.
*   **PEP 587, Python Initialization Configuration (Python 초기화 설정):** Python 인터프리터의 초기화 프로세스를 더 세밀하게 제어할 수 있는 API를 제공합니다.
*   **PEP 590, Vectorcall: a fast calling protocol for CPython (Vectorcall: CPython을 위한 빠른 호출 프로토콜):** CPython에서 호출 가능한 객체(callable objects)의 호출 성능을 최적화하는 새로운 내부 프로토콜입니다.
*   **타입 관련 기능:**
    *   **PEP 591 (Final qualifier):** 변수, 함수, 클래스가 재정의되거나 재할당되지 않음을 나타내는 `Final` 한정자입니다.
    *   **PEP 586 (Literal types):** 특정 리터럴 값만을 허용하는 타입을 정의할 수 있게 합니다.
    *   **PEP 589 (TypedDict):** 딕셔너리에 타입 힌트를 적용하여 구조화된 딕셔너리의 키와 값에 대한 타입을 명시할 수 있게 합니다.
*   컴파일된 바이트코드(bytecode)를 위한 병렬 파일 시스템 캐시.
*   디버그 빌드가 릴리스 빌드와 ABI를 공유합니다.
*   f-string에 디버깅을 위한 유용한 `=` 지정자(specifier)를 지원합니다.
    *   예시: `f'{variable=}'`은 `variable=value`와 같이 출력됩니다.
*   `finally:` 블록 내에서 `continue`가 이제 유효합니다.
*   Windows에서 기본 `asyncio` 이벤트 루프(event loop)는 이제 `ProactorEventLoop`입니다.
*   macOS에서 `multiprocessing`의 기본 시작 방식은 이제 `spawn`입니다.
*   `multiprocessing`이 이제 공유 메모리(shared memory) 세그먼트를 사용하여 프로세스 간 `pickle`링 비용을 피할 수 있습니다.
*   `typed_ast`가 CPython으로 다시 병합되었습니다.
*   `LOAD_GLOBAL` 연산이 이제 40% 더 빨라졌습니다.
*   `pickle`이 이제 기본적으로 `Protocol 4`를 사용하여 성능이 향상되었습니다.

이 외에도 많은 흥미로운 변경 사항이 있으며, 전체 목록은 문서의 "새로운 기능(What's New)" 페이지를 참조하시기 바랍니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.