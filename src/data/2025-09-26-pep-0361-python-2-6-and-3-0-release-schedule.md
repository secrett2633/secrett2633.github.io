---
title: "[Final] PEP 361 - Python 2.6 and 3.0 Release Schedule"
excerpt: "Python Enhancement Proposal 361: 'Python 2.6 and 3.0 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/361/
toc: true
toc_sticky: true
date: 2025-09-26 19:07:30+0900
last_modified_at: 2025-09-26 19:07:30+0900
published: true
---
> **원문 링크:** [PEP 361 - Python 2.6 and 3.0 Release Schedule](https://peps.python.org/pep-0361/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 29-Jun-2006


# PEP 361 – Python 2.6 및 3.0 릴리스 스케줄

*저자: Neal Norwitz, Barry Warsaw*
*상태: 최종 (Final)*
*유형: 정보성 (Informational)*
*주제: 릴리스 (Release)*
*생성일: 2006년 6월 29일*
*Python 버전: 2.6, 3.0*
*최종 변경일: 2008년 3월 17일*

## 초록 (Abstract)

이 문서는 Python 2.6 및 Python 3.0의 개발 및 릴리스 스케줄을 설명합니다. 스케줄은 주로 PEP 규모의 항목들에 초점을 맞춥니다. 작은 기능들은 첫 번째 베타 릴리스까지 추가될 수 있으며, 버그는 최종 릴리스까지 수정될 수 있습니다.

최소 두 번의 알파 릴리스, 두 번의 베타 릴리스, 그리고 한 번의 릴리스 후보(Release Candidate, RC)가 계획되었습니다. 릴리스는 2008년 10월로 예정되었습니다.

Python 2.6은 Python 2 시리즈의 다음 발전일 뿐만 아니라, 개발자들이 Python 3.0을 위해 코드를 준비하는 데 도움을 주는 "과도기적 릴리스(transitional release)"입니다. 이러한 이유로 Python 3.0의 많은 기능이 2.6으로 백포팅(backported)되었습니다. 따라서 두 버전을 동시에 릴리스하는 것이 합리적입니다. 이는 Python 1.6과 2.0 릴리스에서 선례가 있었습니다.

RC 릴리스 전까지, Python 2.6과 3.0은 월별 릴리스 주기로 "록스텝(lockstep)" 방식으로 함께 릴리스되었습니다. 릴리스는 베타 테스트 주기 동안 매월 첫째 주 수요일에 진행되었습니다. Python 2.6이 더 빨리 준비되었고, 외부 마감 기한을 맞추기 위해 RC 릴리스를 분리하기로 결정했습니다. 이에 따라 Python 2.6 최종 버전은 Python 3.0 최종 버전보다 2주 먼저 출시되도록 계획되었습니다.

## 릴리스 관리자 및 팀 (Release Manager and Crew)

*   **2.6/3.0 릴리스 관리자:** Barry Warsaw
*   **Windows 인스톨러:** Martin v. Loewis
*   **Mac 인스톨러:** Ronald Oussoren
*   **문서:** Georg Brandl
*   **RPM:** Sean Reifschneider

## 릴리스 수명 (Release Lifespan)

*   **Python 3.0:** 더 이상 어떤 목적으로도 유지보수되지 않습니다.
*   **Python 2.6:** Python 2.6.9는 Python 2.6 시리즈의 최종 보안 전용 소스 전용 유지보수 릴리스입니다. 2013년 10월 29일 릴리스와 함께 Python 2.6에 대한 모든 공식 지원이 종료되었습니다. Python 2.6은 더 이상 어떤 목적으로도 유지보수되지 않습니다.

## 릴리스 스케줄 (Release Schedule)

PEP 361에 명시된 주요 릴리스 스케줄은 다음과 같습니다:

*   2008년 2월 29일: Python 2.6a1 및 3.0a3 릴리스
*   2008년 4월 2일: Python 2.6a2 및 3.0a4 릴리스
*   2008년 5월 8일: Python 2.6a3 및 3.0a5 릴리스
*   2008년 6월 18일: Python 2.6b1 및 3.0b1 릴리스
*   2008년 7월 17일: Python 2.6b2 및 3.0b2 릴리스
*   2008년 8월 20일: Python 2.6b3 및 3.0b3 릴리스
*   2008년 9월 12일: Python 2.6rc1 릴리스
*   2008년 9월 17일: Python 2.6rc2 및 3.0rc1 릴리스
*   2008년 10월 1일: Python 2.6 최종 버전 릴리스
*   2008년 11월 6일: Python 3.0rc2 릴리스
*   2008년 11월 21일: Python 3.0rc3 릴리스
*   2008년 12월 3일: Python 3.0 최종 버전 릴리스
*   2008년 12월 4일: Python 2.6.1 최종 버전 릴리스
*   ... (이후 2.6.x 보안 전용 릴리스 일정은 원문 참조) ...
*   2013년 10월 29일: Python 2.6.9 최종 버전 릴리스 (보안 전용)

## Python 3.0의 완료된 기능 (Completed features for 3.0)

Python 3.0 프로젝트에 대한 자세한 내용은 [PEP 3000](https://peps.python.org/pep-3000/) 및 [PEP 3100](https://peps.python.org/pep-3100/)을 참조하십시오.

## Python 2.6의 완료된 기능 (Completed features for 2.6)

Python 2.6에 포함된 주요 기능 및 변경 사항은 다음과 같습니다:

### PEP 목록
*   **PEP 352:** 문자열 예외(string exception)를 발생시키면 `TypeError`가 발생합니다. 문자열 예외를 catch하려고 하면 `DeprecationWarning`이 발생합니다. `BaseException.message`가 Deprecated되었습니다.
*   **PEP 358:** "bytes" 객체 도입.
*   **PEP 366:** 메인 모듈의 명시적 상대 임포트(explicit relative imports).
*   **PEP 370:** 사용자별 `site-packages` 디렉터리.
*   **PEP 3112:** Python 3000의 바이트 리터럴(Bytes literals).
*   **PEP 3127:** 정수 리터럴 지원 및 문법.
*   **PEP 371:** `multiprocessing` 패키지 추가.

### 표준 라이브러리의 새로운 모듈
*   `json`
*   향상된 `turtle` 모듈
*   `ast`

### 표준 라이브러리에서 Deprecated된 모듈 및 함수
*   `buildtools`, `cfmfile`, `commands.getstatus()`, `macostools.touched()`, `md5`, `MimeWriter`, `mimify`, `popen2`, `os.popen[234]()`, `posixfile`, `sets`, `sha`

### 표준 라이브러리에서 제거된 모듈
*   `gopherlib`, `rgbimg`, `macfs`

### Python 3000에서 제거된 기능에 대한 경고 (Warnings for features removed in Py3k)
*   **내장 함수:** `apply`, `callable`, `coerce`, `dict.has_key`, `execfile`, `reduce`, `reload`
*   백틱(`` ` ``) 및 `<>` 연산자
*   `xrange`에 대한 float 인자
*   `coerce` 및 관련 함수들
*   기본 비교(`__cmp__`가 없는 경우)
*   `{}.has_key()`
*   `file.xreadlines`
*   `print()` 함수의 `softspace` 제거
*   PEP 4/PEP 3100/PEP 3108로 인한 모듈 제거

### 기타 주요 기능
*   `with / as`가 키워드가 되었습니다.
*   `dir()` 함수를 제어하기 위한 `__dir__()` 특별 메서드가 추가되었습니다.
*   AtheOS 지원이 중단되었습니다.
*   `warnings` 모듈이 C로 구현되었습니다.
*   `compile()`이 AST(Abstract Syntax Tree)를 받아 바이트 코드로 변환할 수 있습니다.

## Python 2.6의 가능한 기능 (Possible features for 2.6)

새로운 기능은 `alpha2` 릴리스 이전에 구현되어야 하며, 특히 C 수정 사항이나 동작 변경 사항이 그렇습니다. 새로운 기능은 `beta1` 릴리스 이전에 구현되어야 하며, 그렇지 않으면 릴리스 관리자의 승인이 필요합니다.

이 문서는 릴리스 당시 2.6에 포함될 예정이었던 몇 가지 PEP와 논의 중인 기타 기능 및 변경 사항을 나열했습니다.

*   `distutils` 대체 (PEP 필요)
*   새로운 표준 라이브러리 모듈: `winerror`, `setuptools`
*   `DeprecationWarning`을 발생시킬 모듈: `rfc822`, `mimetools`, `multifile`, `compiler` 패키지
*   Py3k에서 제거될 기능에 대한 경고 추가: `__getslice__`, `__setslice__`, `__delslice__`, `PyArgs_ParseTuple`의 float 인자, `__cmp__` 등 비교 변경 사항, 정수 나눗셈, `PendingDeprecationWarnings`, `zip()` 결과 사용 방식 변경, `exec` 문, `func_*`로 시작하는 함수 속성, `L` 접미사 long 리터럴, `__nonzero__`를 `__bool__`로 이름 변경 등.

## 2.7로 연기된 기능 (Deferred until 2.7)

없음.

## 공개 문제 (Open issues)

임포트(import) 경고는 어떻게 처리해야 하는가에 대한 논의가 있었습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.