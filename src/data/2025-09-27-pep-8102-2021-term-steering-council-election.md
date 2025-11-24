---
title: "[Final] PEP 8102 - 2021 Term Steering Council election"
excerpt: "Python Enhancement Proposal 8102: '2021 Term Steering Council election'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8102/
toc: true
toc_sticky: true
date: 2025-09-27 19:31:05+0900
last_modified_at: 2025-09-27 19:31:05+0900
published: true
---
> **원문 링크:** [PEP 8102 - 2021 Term Steering Council election](https://peps.python.org/pep-8102/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 29-Oct-2020



# PEP 8102 – 2021년 임기 스티어링 카운슬 선거 (2021 Term Steering Council election)

## 개요
이 문서는 PEP 13에 명시된 바와 같이, 2020년 12월에 실시된 Python 스티어링 카운슬 (Steering Council) 선거의 일정 및 세부 사항을 설명합니다. 이 선거는 2021년 임기를 위한 스티어링 카운슬 선거였습니다.

**작성자:** Ewa Jodlowska, Ee Durbin, Joe Carey
**후원자:** Brett Cannon
**상태:** 최종 (Final)
**유형:** 정보 (Informational)
**주제:** 거버넌스 (Governance)
**생성일:** 2020년 10월 29일

## 선거 관리 (Election Administration)
스티어링 카운슬은 Python Software Foundation (PSF)의 인프라 담당 이사(Director of Infrastructure) Ee Durbin과 회계 관리자(Accounting Manager) Joe Carey를 선거 공동 관리자로 임명했습니다.

PSF 전무이사(Executive Director) Ewa Jodlowska는 선거와 관련된 공지사항을 전달했습니다.

## 일정 (Schedule)
선거는 2주간의 후보 지명 기간과 2주간의 투표 기간으로 구성되었습니다.

*   **후보 지명 기간:** 2020년 11월 1일부터 2020년 11월 16일 12:00 UTC (Anywhere on Earth 기준 2020년 11월 15일 말)까지였습니다. 이 내용은 python-committers에 공지되었고 discuss.python.org에서 진행되었습니다.
*   **투표 기간:** 2020년 12월 1일 12:00 UTC부터 2020년 12월 16일 12:00 UTC (Anywhere on Earth 기준 2020년 12월 15일 말)까지였습니다.

## 후보자 (Candidates)
후보자는 핵심 팀 구성원(core team member)에 의해 지명되어야 합니다. 후보자 본인이 핵심 팀 구성원인 경우, 스스로 지명할 수 있었습니다.

**지명된 후보자 (알파벳순):**
*   Barry Warsaw
*   Brett Cannon
*   Carol Willing
*   Christian Heimes
*   David Mertz
*   Matt Harrison
*   Mariatta
*   Pablo Galindo Salgado
*   Raymond Hettinger
*   Thomas Wouters

**철회된 지명:** 없음

## 유권자 명부 (Voter Roll)
모든 활동적인 Python 핵심 팀 구성원 (active Python core team members)은 투표 자격이 있었습니다. 활동 상태는 PEP 13에 설명된 바와 같이 `python/voters` 소프트웨어를 통해 결정되었습니다.

투표 용지는 이 선거를 위한 Python 유권자 명부를 기반으로 배포되었습니다. 이 파일에는 개인 이메일 주소가 포함되어 있어 공개되지 않았지만, 유권자 명부가 생성될 때 이름으로 된 전체 유권자 명부는 제공될 예정이었습니다.

## 선거 구현 (Election Implementation)
선거는 Helios Voting Service를 사용하여 진행되었습니다.

**설정 (Configuration):**
*   **짧은 이름 (Short name):** `2021-python-steering-council`
*   **이름 (Name):** `2021 Python Steering Council Election`
*   **설명 (Description):** PEP 13에 명시된 Python 스티어링 카운슬 선거입니다. 이는 2021년 임기를 위한 스티어링 카운슬 선거입니다.
*   **유형 (type):** `Election`
*   **유권자 별칭 사용 (Use voter aliases):** [X] (활성화됨)
*   **답변 순서 무작위화 (Randomize answer order):** [X] (활성화됨)
*   **비공개 (Private):** [X] (활성화됨)
*   **도움말 이메일 주소 (Help Email Address):** `psf-election@python.org`
*   **투표 시작 시간 (Voting starts at):** 2020년 12월 1일 00:00 UTC
*   **투표 종료 시간 (Voting ends at):** 2020년 12월 16일 12:00 UTC

이러한 설정은 다음과 같은 선거를 만듭니다.
*   투표는 일반에 공개되지 않으며, 유권자 명부에 있는 사람만 참여할
*   수 있습니다.
*   투표가 시작될 때 투표 용지가 이메일로 발송됩니다.
*   후보자는 편향을 피하기 위해 무작위 순서로 제시됩니다.
*   유권자의 신원과 투표 용지는 암호화 기술 발전으로부터 보호됩니다.

**질문 (Questions):**
*   **질문 1:** 0개에서 (승인 투표) 답변 중 선택하세요.
    *   **결과 유형 (Result Type):** 절대 (absolute)
    *   **질문:** Python 스티어링 카운슬 후보자를 선택하세요.
    *   **답변 #1 - #N:** "후보자 (Candidates)" 섹션의 후보자들

## 결과 (Results)
자격 있는 유권자 91명 중 74명이 투표에 참여했습니다.

상위 5명의 득표자는 다음과 같습니다.
*   Barry Warsaw
*   Brett Cannon
*   Carol Willing
*   Pablo Galindo Salgado
*   Thomas Wouters

PEP 13에 정의된 이해 상충(conflict of interest)은 관찰되지 않았습니다.

전체 득표수는 다음과 같습니다.

| 후보자 (Candidate) | 득표수 (Votes Received) |
| :----------------- | :---------------------- |
| Pablo Galindo Salgado | 59 |
| Carol Willing | 57 |
| Barry Warsaw | 56 |
| Brett Cannon | 54 |
| Thomas Wouters | 52 |
| Christian Heimes | 43 |
| Mariatta | 42 |
| Raymond Hettinger | 31 |
| David Mertz | 28 |
| Matt Harrison | 15 |

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

## 전체 유권자 명부 (Complete Voter Roll)
활동적인 Python 핵심 개발자(active Python core developers) 목록은 다음과 같습니다.

(이름 목록이 PEP에 명시되어 있으나, 여기서는 생략하겠습니다. 원문에서 확인할 수 있습니다.)

---

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.