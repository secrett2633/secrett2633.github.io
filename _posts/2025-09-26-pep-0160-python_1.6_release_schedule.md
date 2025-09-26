---
title: "[Final] PEP 160 - Python 1.6 Release Schedule"
excerpt: "Python Enhancement Proposal 160: 'Python 1.6 Release Schedule'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/160/
toc: true
toc_sticky: true
date: 2025-09-26 16:07:53+0900
last_modified_at: 2025-09-26 16:07:53+0900
published: true
---
> **원문 링크:** [PEP 160 - Python 1.6 Release Schedule](https://peps.python.org/pep-0160/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 25-Jul-2000


# PEP 160 – Python 1.6 릴리스 일정

*   **작성자:** Fred L. Drake, Jr. <fred at fdrake.net>
*   **상태:** Final (최종)
*   **유형:** Informational (정보성)
*   **주제:** Release (릴리스)
*   **생성일:** 2000년 7월 25일
*   **Python 버전:** 1.6
*   **이력:**

## 개요 (Introduction)

이 PEP는 Python 1.6 릴리스 일정을 설명합니다. 이 파일의 CVS(Concurrent Versions System) 개정 기록(revision history)은 확정적인 역사적 기록을 담고 있습니다.

이 릴리스는 CNRI(Corporation for National Research Initiatives)를 위해 BeOpen PythonLabs 직원들이 제작할 예정이었습니다.

## 일정 (Schedule)

*   **8월 1일:** 1.6 베타 1 릴리스 (예정)
*   **8월 3일:** 1.6 베타 1 릴리스 (실제)
*   **8월 15일:** 1.6 최종 릴리스 (예정)
*   **9월 5일:** 1.6 최종 릴리스 (실제)

## 기능 (Features)

Python 1.6에서는 약속된 여러 사항을 이행하기 위해 몇 가지 기능이 필요했습니다. 다음 기능들은 Python 2.0에 대한 계획과 완벽하게 호환되며, 완전히 작동하고 문서화되어야 했습니다.

*   **Unicode 지원:** Python 2.0을 위해 정의된 `Unicode` 객체가 모든 메서드와 코덱(codec) 지원을 포함하여 제공되어야 했습니다.
*   **SRE:** Fredrik Lundh의 새로운 정규 표현식 엔진이 8비트 문자열과 유니코드 문자열 모두를 지원하는 데 사용될 예정이었습니다. 이 엔진은 `re` 모듈의 pcre 기반 버전에서 사용된 회귀 테스트(regression test)를 통과해야 했습니다.
*   **`curses` 모듈:** `curses` 모듈은 패키지(package)로 전환되는 과정에 있었으며, 최종 형태가 채택되었습니다.

## 메커니즘 (Mechanism)

이 릴리스는 2000년 5월 16일 CNRI의 영업 종료 시점에 개발 트리(development tree)에서 브랜치(branch)로 생성될 예정이었습니다. 최근 체크인(checkin)에서 필요한 패치(patch)는 메일링 리스트의 혼란을 줄이고 분기되거나 호환되지 않는 구현을 피하기 위해 가능한 한 개별 파일의 브랜치 태그를 이동하는 방식으로 병합(merge)되었습니다.

브랜치 태그는 "cnri-16-start"였습니다.

패치와 기능은 2000년 5월 16일에 유효했던 회귀 테스트를 통과하는 데 필요한 범위 내에서 병합되었습니다.

베타 릴리스는 CVS 저장소(repository)에서 "r16b1"로 태그가 지정되었고, 최종 Python 1.6 릴리스는 저장소에서 "release16"으로 태그가 지정되었습니다.

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.