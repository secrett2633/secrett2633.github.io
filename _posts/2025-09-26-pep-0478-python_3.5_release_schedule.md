---
title: "[Final] PEP 478 - Python 3.5 Release Schedule"
excerpt: "Python Enhancement Proposal 478: 'Python 3.5 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/478/
toc: true
toc_sticky: true
date: 2025-09-26 22:22:47+0900
last_modified_at: 2025-09-26 22:22:47+0900
published: true
---
> **원문 링크:** [PEP 478 - Python 3.5 Release Schedule](https://peps.python.org/pep-0478/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 22-Sep-2014

## PEP 478 – Python 3.5 릴리스 일정

이 문서는 Python 3.5의 개발 및 릴리스 일정에 대해 설명하며, 주로 PEP(Python Enhancement Proposal)에 해당하는 주요 항목들을 다룹니다.

### 초록 (Abstract)

이 문서는 Python 3.5의 개발 및 릴리스 일정을 기술합니다. 일정은 주로 PEP 규모의 항목들에 초점을 맞춥니다.

### 릴리스 관리자 및 팀 (Release Manager and Crew)

*   **3.5 릴리스 관리자:** Larry Hastings
*   **Windows 설치 프로그램:** Steve Dower
*   **Mac 설치 프로그램:** Ned Deily
*   **문서화:** Georg Brandl

### 릴리스 일정 (Release Schedule)

Python 3.5는 현재 서비스 종료(end-of-life)에 도달했으며 은퇴(retired)되었습니다. 더 이상 릴리스는 없을 것입니다.

다음은 Python 3.5의 모든 역사적인 릴리스와 해당 릴리스 날짜입니다.

*   3.5.0 alpha 1: 2015년 2월 8일
*   3.5.0 alpha 2: 2015년 3월 9일
*   3.5.0 alpha 3: 2015년 3월 29일
*   3.5.0 alpha 4: 2015년 4월 19일
*   3.5.0 beta 1: 2015년 5월 24일 (베타 1은 "기능 동결(feature freeze)" 시점이기도 하며, 이 시점 이후로는 새로운 기능이 추가되지 않습니다.)
*   3.5.0 beta 2: 2015년 5월 31일
*   3.5.0 beta 3: 2015년 7월 5일
*   3.5.0 beta 4: 2015년 7월 26일
*   3.5.0 release candidate 1: 2015년 8월 10일
*   3.5.0 release candidate 2: 2015년 8월 25일
*   3.5.0 release candidate 3: 2015년 9월 7일
*   3.5.0 final: 2015년 9월 13일
*   3.5.1 release candidate 1: 2015년 11월 22일
*   3.5.1 final: 2015년 12월 6일
*   3.5.2 release candidate 1: 2016년 6월 12일 (일요일)
*   3.5.2 final: 2016년 6월 26일 (일요일)
*   3.5.3 candidate 1: 2017년 1월 2일
*   3.5.3 final: 2017년 1월 17일
*   3.5.4 candidate 1: 2017년 7월 25일
*   3.5.4 final: 2017년 8월 8일
*   3.5.5 candidate 1: 2018년 1월 23일
*   3.5.5 final: 2018년 2월 4일
*   3.5.6 candidate 1: 2018년 7월 19일
*   3.5.6 final: 2018년 8월 2일
*   3.5.7 candidate 1: 2019년 3월 4일
*   3.5.7 final: 2019년 3월 18일
*   3.5.8 candidate 1: 2019년 9월 9일
*   3.5.8 candidate 2: 2019년 10월 12일
*   3.5.8 final: 2019년 10월 29일
*   3.5.9 final: 2019년 11월 1일
*   3.5.10 rc1: 2020년 8월 21일
*   3.5.10 final: 2020년 9월 5일

### 3.5의 주요 기능 (Features for 3.5)

Python 3.5에는 다음과 같은 주요 개선 및 기능들이 포함되었습니다.

*   **PEP 441, 개선된 Python zip 애플리케이션 지원:** Python이 zip 파일 내의 애플리케이션을 처리하는 방식이 개선되었습니다.
*   **PEP 448, 추가적인 언패킹 일반화:** `*` 및 `**` 언패킹 연산자의 사용 범위가 확장되어 다양한 컨텍스트에서 더 유연하게 활용할 수 있게 되었습니다.
*   **PEP 461, bytes 및 bytearray 객체를 위한 "%-formatting":** `bytes` 및 `bytearray` 객체에 대해 C 스타일의 `%` 포맷팅을 사용할 수 있게 되었습니다.
*   **PEP 465, 행렬 곱셈을 위한 새로운 연산자 ("@"):** NumPy와 같은 라이브러리에서 행렬 곱셈을 명시적으로 수행하는 `@` 연산자가 도입되었습니다.
*   **PEP 471, os.scandir(), 빠른 새 디렉터리 순회 함수:** 기존의 `os.listdir()`보다 더 효율적으로 디렉터리 항목을 순회할 수 있는 `os.scandir()` 함수가 추가되었습니다.
*   **PEP 475, 중단된 시스템 호출의 자동 재시도 지원 추가:** 시스템 호출이 인터럽트(interrupted)되었을 때 자동으로 재시도하는 메커니즘이 추가되어 견고성이 향상되었습니다.
*   **PEP 479, 제너레이터 내 StopIteration 처리 변경:** 제너레이터(Generator) 내부에서 `StopIteration` 예외가 발생했을 때의 동작 방식이 변경되어, 의도치 않은 버그를 방지할 수 있게 되었습니다.
*   **PEP 484, typing 모듈, 타입 어노테이션을 위한 새로운 표준:** 정적 타입 힌트(Type Hint)를 위한 `typing` 모듈과 타입 어노테이션(Type Annotation) 표준이 도입되었습니다.
*   **PEP 485, math.isclose(), 근사치 동등성 테스트 함수:** 두 부동 소수점 숫자가 거의 같은지(approximate equality)를 테스트하는 `math.isclose()` 함수가 추가되었습니다.
*   **PEP 486, 가상 환경을 인식하는 Windows Python 런처:** Windows의 Python 런처(`py.exe`)가 가상 환경(virtual environment)을 더 잘 인식하고 활성화할 수 있도록 개선되었습니다.
*   **PEP 488, .pyo 파일 제거:** 최적화된 바이트코드 파일을 나타내는 `.pyo` 파일이 제거되고, `.pyc` 파일이 최적화된 바이트코드도 포함하도록 변경되었습니다.
*   **PEP 489, 확장 모듈 로딩을 위한 새롭고 개선된 메커니즘:** C 확장 모듈(extension module)을 로드하는 메커니즘이 개선되어 더 효율적이고 유연해졌습니다.
*   **PEP 492, async 및 await 구문을 가진 코루틴:** 비동기 프로그래밍(Asynchronous Programming)을 위한 `async` 및 `await` 키워드를 사용한 네이티브 코루틴(Coroutines) 문법이 도입되었습니다.

### 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.