---
title: "[Active] PEP 664 - Python 3.11 Release Schedule"
excerpt: "Python Enhancement Proposal 664: 'Python 3.11 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/664/
toc: true
toc_sticky: true
date: 2025-09-27 09:57:22+0900
last_modified_at: 2025-09-27 09:57:22+0900
published: true
---
> **원문 링크:** [PEP 664 - Python 3.11 Release Schedule](https://peps.python.org/pep-0664/)
>
> **상태:** Active | **유형:** Informational | **작성일:** 12-Jul-2021

## 개요
이 문서는 Python 3.11의 개발 및 릴리스 일정을 기술합니다. 일정은 주로 PEP 규모의 항목들을 다룹니다.

## 릴리스 매니저 및 팀
*   **3.11 릴리스 매니저:** Pablo Galindo Salgado
*   **Windows 인스톨러:** Steve Dower
*   **Mac 인스톨러:** Ned Deily
*   **문서화:** Julien Palard

## 릴리스 일정

### 3.11.0 일정
아래 날짜들은 PEP 602에 정의된 바와 같이 기능 버전 간의 12개월 릴리스 주기(release cadence)를 위해 17개월의 개발 기간을 사용합니다.

**실제 일정:**
*   3.11 개발 시작: 2021년 5월 3일 (월)
*   3.11.0 alpha 1: 2021년 10월 5일 (화)
*   3.11.0 alpha 2: 2021년 11월 2일 (화)
*   3.11.0 alpha 3: 2021년 12월 8일 (수)
*   3.11.0 alpha 4: 2022년 1월 14일 (금)
*   3.11.0 alpha 5: 2022년 2월 3일 (목)
*   3.11.0 alpha 6: 2022년 3월 7일 (월)
*   3.11.0 alpha 7: 2022년 4월 5일 (화)
*   3.11.0 beta 1: 2022년 5월 8일 (일) (이 시점 이후로는 새로운 기능이 추가되지 않습니다.)
*   3.11.0 beta 2: 2022년 5월 31일 (화)
*   3.11.0 beta 3: 2022년 6월 1일 (수)
*   3.11.0 beta 4: 2022년 7월 11일 (월)
*   3.11.0 beta 5: 2022년 7월 26일 (화)
*   3.11.0 candidate 1: 2022년 8월 8일 (월)
*   3.11.0 candidate 2: 2022년 9월 12일 (월)
*   3.11.0 final: 2022년 10월 24일 (월)

### 버그픽스(Bugfix) 릴리스
**실제 일정:**
*   3.11.1: 2022년 12월 6일 (화)
*   3.11.2: 2023년 2월 8일 (수)
*   3.11.3: 2023년 4월 5일 (수)
*   3.11.4: 2023년 6월 6일 (화)
*   3.11.5: 2023년 8월 24일 (목)
*   3.11.6: 2023년 10월 2일 (월)
*   3.11.7: 2023년 12월 4일 (월)
*   3.11.8: 2024년 2월 6일 (화)
*   3.11.9: 2024년 4월 2일 (화) (바이너리 인스톨러를 포함하는 최종 정규 버그픽스 릴리스)

### 소스 전용 보안 수정(Source-only security fix) 릴리스
2027년 10월까지 "필요에 따라(as-needed)" 불규칙적으로 제공됩니다.
*   3.11.10: 2024년 9월 7일 (토)
*   3.11.11: 2024년 12월 3일 (화)
*   3.11.12: 2025년 4월 8일 (화)
*   3.11.13: 2025년 6월 3일 (화)

### 3.11 수명 주기 (Lifespan)
Python 3.11은 약 18개월 동안 약 2개월마다 버그픽스 업데이트를 받았습니다. 3.12.0 final 릴리스 이후 얼마 지나지 않아 9번째이자 마지막 3.11 버그픽스 업데이트가 릴리스되었습니다. 그 이후에는 3.11.0 final 릴리스 후 5년까지, 즉 약 2027년 10월까지 보안 업데이트(소스 전용)가 릴리스될 것으로 예상됩니다.

## 3.11의 주요 기능
Python 3.11의 주목할 만한 기능들은 다음과 같습니다.
*   **PEP 654, Exception Groups(예외 그룹) 및 `except*`:** 여러 예외를 동시에 처리할 수 있는 기능을 제공합니다.
*   **PEP 657, Enhanced error locations in tracebacks (트레이스백의 향상된 오류 위치):** 트레이스백(traceback)에서 오류가 발생한 위치를 더 정확하게 표시하여 디버깅을 돕습니다.
*   **PEP 680, Support for parsing TOML in the standard library (표준 라이브러리에서 TOML 파싱 지원):** 표준 라이브러리에 TOML(Tom's Obvious, Minimal Language) 파일 파싱 지원이 추가됩니다.
*   **성능 향상:** Python 3.11은 Python 3.10보다 최대 10-60% 빠릅니다. 표준 벤치마크 스위트에서 평균 1.25배의 속도 향상이 측정되었습니다. 자세한 내용은 Faster CPython 문서를 참조하십시오.

**타입 힌트(Typing) 기능:**
*   **PEP 646, Variadic generics (가변 제네릭):** `TypeVarTuple`을 사용하여 가변적인 수의 타입 인자를 받을 수 있는 제네릭(Generics)을 정의할 수 있습니다.
*   **PEP 655, Marking individual TypedDict items as required or potentially-missing (개별 TypedDict 항목을 필수 또는 잠재적으로 누락된 것으로 표시):** `TypedDict`에서 개별 키의 필수 여부를 더욱 명시적으로 지정할 수 있습니다.
*   **PEP 673, Self type (자기 타입):** 클래스 내부에서 자기 자신의 타입을 나타내는 `Self` 타입을 사용할 수 있습니다.
*   **PEP 675, Arbitrary literal string type (임의의 리터럴 문자열 타입):** 임의의 문자열 리터럴을 타입으로 사용할 수 있게 합니다.
*   **PEP 681, Dataclass transforms (데이터클래스 변환):** `dataclass_transform` 데코레이터를 통해 사용자 정의 클래스 데코레이터가 `dataclass`와 유사한 타입 분석 동작을 하도록 만들 수 있습니다.

## 저작권
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.