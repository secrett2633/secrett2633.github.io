---
title: "[Final] PEP 375 - Python 3.1 Release Schedule"
excerpt: "Python Enhancement Proposal 375: 'Python 3.1 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/375/
toc: true
toc_sticky: true
date: 2025-09-26 20:59:16+0900
last_modified_at: 2025-09-26 20:59:16+0900
published: true
---
> **원문 링크:** [PEP 375 - Python 3.1 Release Schedule](https://peps.python.org/pep-0375/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 08-Feb-2009


## 개요
이 문서는 Python 3.1 버전의 개발 및 릴리스 스케줄을 설명합니다. 주요 내용은 PEP(Python Enhancement Proposal) 규모의 제안 사항에 중점을 둡니다. 작은 기능들은 첫 번째 베타 릴리스까지 추가될 수 있으며, 버그는 최종 릴리스까지 수정될 수 있습니다.

## 릴리스 관리자 및 담당자
*   **3.1 릴리스 관리자:** Benjamin Peterson
*   **Windows 설치 관리자:** Martin v. Loewis
*   **Mac 설치 관리자:** Ronald Oussoren

## 릴리스 스케줄

| 버전       | 날짜         |
| :--------- | :----------- |
| 3.1a1      | 2009년 3월 7일  |
| 3.1a2      | 2009년 4월 4일  |
| 3.1b1      | 2009년 5월 6일  |
| 3.1rc1     | 2009년 5월 30일 |
| 3.1rc2     | 2009년 6월 13일 |
| 3.1 final  | 2009년 6월 27일 |

## 유지보수 릴리스 (Maintenance Releases)
Python 3.1은 더 이상 유지보수되지 않습니다. 2012년 6월까지 보안 수정이 제공되었습니다.

이전 유지보수 릴리스는 다음과 같습니다.
*   v3.1.1rc1: 2009-08-13
*   v3.1.1: 2009-08-16
*   v3.1.2rc1: 2010-03-06
*   v3.1.2: 2010-03-20
*   v3.1.3rc1: 2010-11-13
*   v3.1.3: 2010-11-27
*   v3.1.4rc1: 2011-05-29
*   v3.1.4: 2011-06-11
*   v3.1.5rc1: 2012-02-23
*   v3.1.5rc2: 2012-03-15
*   v3.1.5: 2012-04-06

## Python 3.1의 주요 기능
Python 3.1에 포함된 주요 기능 및 변경 사항은 다음과 같습니다.

*   `importlib` 모듈 개선
*   `C` 언어로 구현된 `io` 모듈
*   `simplejson` 라이브러리를 최신 외부 버전으로 업데이트
*   `collections` 모듈에 순서가 보장되는 딕셔너리(`OrderedDict`) 추가 (PEP 372)
*   `str.format()` 문자열에서 자동 번호 매김(auto-numbered) 대체 필드 지원
*   단일 `with` 문 내에서 중첩된 `with` 문 사용 가능

## 저작권
이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.