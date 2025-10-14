---
title: "[Final] PEP 8101 - 2020 Term Steering Council election"
excerpt: "Python Enhancement Proposal 8101: '2020 Term Steering Council election'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8101/
toc: true
toc_sticky: true
date: 2025-09-27 19:30:45+0900
last_modified_at: 2025-09-27 19:30:45+0900
published: true
---
> **원문 링크:** [PEP 8101 - 2020 Term Steering Council election](https://peps.python.org/pep-8101/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 16-Nov-2019

PEP 8101은 2019년 12월에 실시된 Python 스티어링 카운슬(Steering Council) 선거에 대한 정보를 담고 있는 문서입니다. 이 문서는 선거의 배경, 절차, 후보자, 투표 결과 등을 상세히 설명하여 Python 커뮤니티의 거버넌스(governance) 및 핵심 개발자들의 참여를 이해하는 데 중요한 정보를 제공합니다.

## PEP 8101: 2020년 임기 스티어링 카운슬 선거 (2020 Term Steering Council election)

### 개요 (Abstract)
이 문서는 PEP 13에 명시된 대로 2019년 12월에 실시된 Python 스티어링 카운슬 선거의 일정 및 세부 사항을 기술합니다. 이 선거는 2020년 임기를 위한 스티어링 카운슬을 선출하기 위한 것입니다.

### 선거 관리 (Election Administration)
스티어링 카운슬은 선거 진행을 위해 Python Software Foundation (PSF)의 인프라 담당 이사(Director of Infrastructure)인 Ee Durbin을, 그리고 선거 관련 발표를 위한 커뮤니케이션 담당으로 PSF의 이사(Executive Director)인 Ewa Jodlowska를 임명했습니다.

### 일정 (Schedule)
선거는 2주간의 후보 지명 기간과 이어진 2주간의 투표 기간으로 구성되었습니다.

*   **후보 지명 기간:** 2019년 11월 1일부터 2019년 11월 16일 12:00 UTC (11월 15일 AoE(Anywhere on Earth) 자정)까지 진행되었습니다. 이 내용은 `python-committers` 메일링 리스트에 공지되었으며, `discuss.python.org`에서 진행되었습니다.
*   **투표 기간:** 2019년 12월 1일 12:00 UTC부터 2019년 12월 16일 12:00 UTC (12월 15일 AoE 자정)까지 진행되었습니다.

### 후보자 (Candidates)
후보자는 핵심 팀 구성원(core team member)에 의해 지명되어야 합니다. 후보자가 핵심 팀 구성원인 경우, 스스로를 지명할 수 있었습니다.

지명된 후보자 (알파벳순):
*   Brett Cannon
*   Kushal Das
*   Christian Heimes
*   Pablo Galindo Salgado
*   Gregory P. Smith
*   Victor Stinner
*   Barry Warsaw
*   Carol Willing
*   Thomas Wouters

철회된 지명:
*   Guido van Rossum (철회)

### 유권자 명부 (Voter Roll)
모든 활동적인 Python 핵심 팀 구성원이 투표 자격을 가졌습니다.
투표 용지는 이 선거를 위한 Python 유권자 명부를 기반으로 배포되었습니다. 이 파일은 개인 이메일 주소를 포함하고 있어 공개되지 않았지만, 이름으로 구성된 전체 유권자 명부는 제공됩니다.

### 선거 구현 (Election Implementation)
선거는 Helios Voting Service를 사용하여 진행되었습니다.

#### 구성 (Configuration)
*   **Short name:** `2020-python-steering-council`
*   **Name:** `2020 Python Steering Council Election`
*   **Description:** PEP 13에 명시된 Python 스티어링 카운슬 선거입니다. 2020년 임기를 위한 스티어링 카운슬 선거입니다.
*   **Type:** `Election`
*   **Use voter aliases:** [X] (유권자 가명 사용)
*   **Randomize answer order:** [X] (응답 순서 무작위화)
*   **Private:** [X] (비공개)
*   **Help Email Address:** `ee@python.org`
*   **Voting starts at:** 2019년 12월 1일 12:00 UTC
*   **Voting ends at:** 2019년 12월 16일 12:00 UTC

이를 통해 다음과 같은 특징을 가진 선거가 생성되었습니다:
*   투표는 대중에게 공개되지 않으며, 오직 유권자 명부에 있는 사람만 참여할 수 있습니다.
*   투표가 시작될 때 투표 용지가 이메일로 발송됩니다.
*   후보자는 편향을 피하기 위해 무작위 순서로 제시됩니다.
*   유권자의 신원과 투표 내용은 암호화 기술로부터 보호됩니다.

#### 질문 (Questions)
**질문 1**
*   **Select between 0 and - (approval) answers.** (0개에서 승인된 답변 사이에서 선택)
*   **Result Type:** `absolute`
*   **Question:** Python 스티어링 카운슬 후보를 선택하세요.
*   **Answer #1 - #N:** Candidates 섹션의 후보자들.

### 결과 (Results)
82명의 유권자 중 63명이 투표에 참여했습니다.

가장 많은 표를 얻은 상위 5명은 다음과 같습니다:
*   Barry Warsaw
*   Brett Cannon
*   Carol Willing
*   Thomas Wouters
*   Victor Stinner

PEP 13에 정의된 이해 상충(conflict of interest)은 관찰되지 않았습니다.

전체 득표수는 다음과 같습니다:
*   Brett Cannon: 54표
*   Carol Willing: 54표
*   Barry Warsaw: 50표
*   Thomas Wouters: 40표
*   Victor Stinner: 38표
*   Christian Heimes: 37표
*   Pablo Galindo Salgado: 37표
*   Gregory P. Smith: 32표
*   Kushal Das: 30표

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)으로 지정되었습니다.

### 전체 유권자 명부 (Complete Voter Roll)
문서에는 Abhilash Raj부터 Zachary Ware까지 활동적인 Python 핵심 개발자들의 전체 목록이 포함되어 있습니다.

---
 이 저장소는 개인 이메일 주소를 포함하고 있기 때문에 Python 핵심 개발자, 관리자 및 Python Software Foundation 직원만 접근할 수 있는 비공개 저장소입니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.