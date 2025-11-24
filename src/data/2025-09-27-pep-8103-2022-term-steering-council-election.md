---
title: "[Final] PEP 8103 - 2022 Term Steering Council election"
excerpt: "Python Enhancement Proposal 8103: '2022 Term Steering Council election'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8103/
toc: true
toc_sticky: true
date: 2025-09-27 19:31:17+0900
last_modified_at: 2025-09-27 19:31:17+0900
published: true
---
> **원문 링크:** [PEP 8103 - 2022 Term Steering Council election](https://peps.python.org/pep-8103/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 04-Oct-2021

# PEP 8103 – 2022년도 Steering Council 선거

*   **작성자:** Ewa Jodlowska, Ee Durbin, Joe Carey
*   **후원자:** Barry Warsaw
*   **상태:** Final
*   **유형:** Informational (정보성)
*   **주제:** Governance (거버넌스)
*   **생성일:** 2021년 10월 4일

## 개요 (Abstract)

이 문서는 PEP 13에 명시된 대로 2021년 12월에 진행된 Python Steering Council (운영 위원회) 선거의 일정 및 기타 세부 사항을 설명합니다. 이는 2022년 임기(즉, Python 3.11 개발 기간)를 위한 Steering Council 선거입니다.

## 선거 관리 (Election Administration)

Steering Council은 Python Software Foundation의 인프라 디렉터인 Ee Durbin과 회계 관리자인 Joe Carey를 선거 공동 관리자로 임명했습니다.

## 일정 (Schedule)

지명 기간(nomination period)은 2주, 투표 기간(voting period)은 2주로 진행되었습니다.

*   **지명 기간:** 2021년 11월 1일부터 2021년 11월 16일 12:00 UTC (Anywhere on Earth 기준 2021년 11월 15일 말)까지였습니다. 이 내용은 `python-committers` 메일링 리스트에 공지되었고, `discuss.python.org`에서 진행되었습니다.
*   **투표 기간:** 2021년 12월 1일 12:00 UTC부터 2021년 12월 16일 12:00 UTC (Anywhere on Earth 기준 2021년 12월 15일 말)까지였습니다.

## 후보자 (Candidates)

후보자는 코어 팀 멤버에 의해 지명되어야 합니다. 후보자가 코어 팀 멤버인 경우 스스로를 지명할 수 있습니다.

지명된 후보자(알파벳 순):
*   Brett Cannon
*   Mariatta
*   David Mertz
*   Dong-hee Na (나동희)
*   Pablo Galindo Salgado
*   Gregory P. Smith
*   Victor Stinner
*   Petr Viktorin
*   Barry Warsaw
*   Thomas Wouters

철회된 지명은 없었습니다.

## 유권자 명부 (Voter Roll)

모든 활동 중인 Python 코어 팀 멤버는 투표 자격이 있습니다. 활동 상태는 PEP 13에 설명된 대로 결정되며, `python/voters` 소프트웨어를 통해 구현됩니다.

투표 용지는 이 선거를 위한 Python 유권자 명부(`The Python Voter Roll`)를 기반으로 배포되었습니다.
이 파일은 개인 이메일 주소를 포함하므로 공개되지 않지만, 명부가 생성되면 이름으로 된 전체 유권자 명부는 공개될 예정이었습니다.

## 선거 구현 (Election Implementation)

선거는 Helios Voting Service를 사용하여 진행되었습니다.

### 설정 (Configuration)

*   **Short name:** `2022-python-steering-council`
*   **Name:** `2022 Python Steering Council Election`
*   **Description:** PEP 13에 명시된 Python Steering Council 선거입니다. 2022년 임기를 위한 Steering Council 선거입니다.
*   **Type:** Election
*   **Use voter aliases:** [X] (유권자 가명 사용)
*   **Randomize answer order:** [X] (답변 순서 무작위화)
*   **Private:** [X] (비공개)
*   **Help Email Address:** `psf-election@python.org`
*   **Voting starts at:** 2021년 12월 1일 00:00 UTC
*   **Voting ends at:** 2021년 12월 16일 12:00 UTC

이러한 설정으로 다음과 같은 선거가 진행되었습니다.
*   투표는 일반에 공개되지 않으며, 유권자 명부에 있는 사람만 참여할 수 있습니다.
*   투표 시작 시 투표 용지가 이메일로 발송됩니다.
*   후보자들은 편향을 피하기 위해 무작위 순서로 제시됩니다.
*   유권자의 신원과 투표 용지는 암호학적 공격으로부터 보호됩니다.

### 질문 (Questions)

**질문 1**
*   **Select between 0 and - (approval) answers.** (0개에서 승인 가능한 범위 내에서 답변을 선택하세요.)
*   **Result Type:** absolute (절대값)
*   **Question:** Select candidates for the Python Steering Council (Python Steering Council 후보자를 선택하세요)
*   **Answer #1 - #N:** Candidates from Candidates_ Section (후보자 섹션의 후보자들)

## 결과 (Results)

투표 자격이 있는 85명의 유권자 중 67명이 투표에 참여했습니다.

가장 많은 표를 얻은 상위 5명은 다음과 같습니다.
1.  Pablo Galindo Salgado
2.  Petr Viktorin
3.  Thomas Wouters
4.  Gregory P. Smith
5.  Brett Cannon

PEP 13에 정의된 이해 상충(conflict of interest)은 관찰되지 않았습니다.

전체 득표수는 다음과 같습니다.

| 후보자              | 득표수 |
| :------------------ | :----- |
| Pablo Galindo Salgado | 61     |
| Petr Viktorin       | 48     |
| Thomas Wouters      | 48     |
| Gregory P. Smith    | 44     |
| Brett Cannon        | 42     |
| Barry Warsaw        | 39     |
| Victor Stinner      | 35     |
| Mariatta            | 34     |
| Dong-hee Na         | 26     |
| David Mertz         | 24     |

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

## 전체 유권자 명부 (Complete Voter Roll)

활성 Python 코어 개발자들의 명단은 문서에 포함되어 있습니다. (본 내용에서는 개인 정보 보호를 위해 상세 명단은 생략합니다.)

**참고:** 유권자 명부 저장소는 개인 이메일 주소를 포함하고 있어 Python 코어 개발자, 관리자 및 Python Software Foundation 직원만 접근할 수 있는 비공개 저장소입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.