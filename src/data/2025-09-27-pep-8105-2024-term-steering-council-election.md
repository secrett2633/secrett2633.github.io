---
title: "[Final] PEP 8105 - 2024 Term Steering Council election"
excerpt: "Python Enhancement Proposal 8105: '2024 Term Steering Council election'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8105/
toc: true
toc_sticky: true
date: 2025-09-27 19:34:28+0900
last_modified_at: 2025-09-27 19:34:28+0900
published: true
---
> **원문 링크:** [PEP 8105 - 2024 Term Steering Council election](https://peps.python.org/pep-8105/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 23-Oct-2023


## PEP 8105 – 2024년 임기 Steering Council 선거

**작성자:** Ee Durbin <<ee at python.org>>
**후원자:** Thomas Wouters <<thomas at python.org>>
**상태:** 최종 (Final)
**유형:** 정보 제공 (Informational)
**주제:** 거버넌스 (Governance)
**생성일:** 2023년 10월 23일

---

### 초록 (Abstract)
이 문서는 PEP 13에 명시된 바와 같이 Python Steering Council의 2023년 선거(2024년 임기, 즉 Python 3.13) 일정 및 기타 세부 사항을 설명합니다.

### 선거 관리 (Election Administration)
Steering Council은 Python Software Foundation의 인프라 책임자인 Ee Durbin을 선거 관리자로 임명했습니다.

### 일정 (Schedule)
후보 지명 기간은 2주였으며, 이어서 2주간의 투표 기간이 있었습니다.

*   **후보 지명 기간:** 2023년 11월 9일 ~ 2023년 11월 22일 AoE (Anywhere on Earth)
*   **투표 기간:** 2023년 11월 27일 ~ 2023년 12월 11일 AoE

### 후보자 (Candidates)
후보자는 핵심 팀원(core team member)의 지명을 받아야 합니다. 후보자가 핵심 팀원인 경우, 스스로를 지명할 수 있습니다.

**지명된 후보자 (이름 가나다순):**
*   Barry Warsaw
*   Donghee Na (나동희)
*   Emily Morehouse
*   Gregory P. Smith
*   Mariatta
*   Pablo Galindo Salgado
*   Thomas Wouters
*   Victor Stinner

**철회된 지명:** 없음

### 유권자 명부 (Voter Roll)
모든 활동 중인 Python 핵심 팀원(active Python core team members)은 투표 자격이 있습니다. 활동 상태는 PEP 13에 설명된 대로 결정되며, python/voters 소프트웨어를 통해 구현됩니다.

투표 용지는 이번 선거의 Python Voter Roll을 기반으로 배포되었습니다. 이 파일은 개인 이메일 주소를 포함하고 있어 공개되지 않지만, 모든 유권자 이름 목록이 포함된 전체 유권자 명부(Complete Voter Roll)는 확인할 수 있습니다.

### 선거 구현 (Election Implementation)
선거는 Helios Voting Service를 사용하여 진행되었습니다.

**설정 (Configuration):**
*   **짧은 이름 (Short name):** `2024-python-steering-council`
*   **이름 (Name):** `2024 Python Steering Council Election`
*   **설명 (Description):** PEP 13에 명시된 Python Steering Council 선거. 2024년 임기를 위한 Steering Council 선거입니다.
*   **유형 (type):** `Election`
*   **유권자 별칭 사용 (Use voter aliases):** [X] (체크됨)
*   **답변 순서 무작위화 (Randomize answer order):** [X] (체크됨)
*   **비공개 (Private):** [X] (체크됨)
*   **도움 이메일 주소 (Help Email Address):** `psf-election@python.org`
*   **투표 시작 (Voting starts at):** 2023년 11월 27일 12:00 UTC
*   **투표 종료 (Voting ends at):** 2023년 12월 11일 12:00 UTC

이는 다음과 같은 선거를 만듭니다:
*   투표는 공개되지 않으며, 유권자 명부에 있는 사람만 참여할 수 있습니다.
*   투표 시작 시 투표 용지가 이메일로 발송됩니다.
*   후보자는 편향을 피하기 위해 무작위 순서로 제시됩니다.
*   유권자의 신원과 투표 용지는 암호화 기술의 발전으로부터 보호됩니다.

**질문 (Questions):**
*   **질문 1:** 0개에서 - (승인) 답변 중에서 선택하십시오. 결과 유형: 절대 (absolute)
    *   **질문:** Python Steering Council을 위한 후보자를 선택하십시오.
    *   **답변 #1 - #N:** 후보자 섹션의 후보자들

### 연장된 선거 구현 (Extended Election Implementation)
발표된 일정과 초기 선거 구현 간의 불일치로 인해, 초기 선거에서 투표권을 행사하지 못한 유권자들에게 추가적인 날짜를 제공하기 위해 연장된 선거가 개최되었습니다.

초기 선거 결과는 연장된 선거 결과와 합산되었습니다. 초기 선거에서 투표하지 않은 유권자만 투표할 수 있었습니다.

이 선거도 Helios Voting Service를 사용하여 진행되었습니다.

**설정 (Configuration):**
*   **짧은 이름 (Short name):** `2024-python-steering-council-extension`
*   **이름 (Name):** `2024 Python Steering Council Election Extension`
*   **설명 (Description):** PEP 13에 명시된 Python Steering Council 선거. 2024년 임기를 위한 Steering Council 선거입니다.
*   **유형 (type):** `Election`
*   **유권자 별칭 사용 (Use voter aliases):** [X] (체크됨)
*   **답변 순서 무작위화 (Randomize answer order):** [X] (체크됨)
*   **비공개 (Private):** [X] (체크됨)
*   **도움 이메일 주소 (Help Email Address):** `psf-election@python.org`
*   **투표 시작 (Voting starts at):** 2023년 12월 11일 12:00 UTC
*   **투표 종료 (Voting ends at):** 2023년 12월 12일 12:00 UTC

이는 다음과 같은 선거를 만듭니다:
*   투표는 공개되지 않으며, 유권자 명부에 있는 사람만 참여할 수 있습니다.
*   투표 시작 시 투표 용지가 이메일로 발송됩니다.
*   후보자는 편향을 피하기_위해 무작위 순서로 제시됩니다.
*   유권자의 신원과 투표 용지는 암호화 기술의 발전으로부터 보호됩니다.

**질문 (Questions):**
*   **질문 1:** 0개에서 - (승인) 답변 중에서 선택하십시오. 결과 유형: 절대 (absolute)
    *   **질문:** Python Steering Council을 위한 후보자를 선택하십시오.
    *   **답변 #1 - #N:** 후보자 섹션의 후보자들

### 결과 (Results)
자격 있는 유권자 87명 중 68명이 투표했습니다.

**최다 득표자 5명:**
*   Pablo Galindo Salgado
*   Gregory P. Smith
*   Barry Warsaw
*   Emily Morehouse
*   Thomas Wouters

PEP 13에 정의된 이해 상충(conflict of interest)은 관찰되지 않았습니다.

**전체 득표수는 다음과 같습니다:**

**초기 선거 (Initial Election)**
자격 있는 유권자 87명 중 56명이 투표했습니다.

| 후보자              | 득표수 |
| :---------------- | :----- |
| Barry Warsaw      | 35     |
| Donghee Na        | 27     |
| Emily Morehouse   | 38     |
| Gregory P. Smith  | 42     |
| Mariatta          | 25     |
| Pablo Galindo Salgado | 48     |
| Thomas Wouters    | 30     |
| Victor Stinner    | 27     |

**연장된 선거 (Election Extension)**
초기 선거에서 투표권을 행사하지 못한 자격 있는 유권자 31명 중 12명이 투표했습니다.

| 후보자              | 득표수 |
| :---------------- | :----- |
| Barry Warsaw      | 8      |
| Donghee Na        | 5      |
| Emily Morehouse   | 8      |
| Gregory P. Smith  | 10     |
| Mariatta          | 5      |
| Pablo Galindo Salgado | 12     |
| Thomas Wouters    | 10     |
| Victor Stinner    | 8      |

**합산 결과 (Combined)**
자격 있는 유권자 87명 중 68명이 투표했습니다.

| 후보자              | 득표수 |
| :---------------- | :----- |
| Barry Warsaw      | 43     |
| Donghee Na        | 32     |
| Emily Morehouse   | 46     |
| Gregory P. Smith  | 52     |
| Mariatta          | 30     |
| Pablo Galindo Salgado | 60     |
| Thomas Wouters    | 40     |
| Victor Stinner    | 35     |

### 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

### 전체 유권자 명부 (Complete Voter Roll)
**활동 중인 Python 핵심 개발자 (Active Python core developers):**

*   Adam Turner
*   Alex Gaynor
*   Alex Waygood
*   Alexander Belopolsky
*   Alyssa Coghlan
*   Ammar Askar
*   Andrew Svetlov
*   Antoine Pitrou
*   Barney Gale
*   Barry Warsaw
*   Batuhan Taskaya
*   Benjamin Peterson
*   Berker Peksağ
*   Brandt Bucher
*   Brett Cannon
*   Brian Curtin
*   C.A.M. Gerlach
*   Carl Friedrich Bolz-Tereick
*   Carl Meyer
*   Carol Willing
*   Cheryl Sabella
*   Chris Withers
*   Christian Heimes
*   Dennis Sweeney
*   Dino Viehland
*   Donghee Na
*   Emily Morehouse
*   Éric Araujo
*   Eric Snow
*   Eric V. Smith
*   Erlend Egeberg Aasland
*   Ethan Furman
*   Ezio Melotti
*   Facundo Batista
*   Filipe Lains
*   Georg Brandl
*   Giampaolo Rodolà
*   Gregory P. Smith
*   Guido van Rossum
*   Hugo van Kemenade
*   Hynek Schlawack
*   Inada Naoki
*   Irit Katriel
*   Ivan Levkivskyi
*   Jason R. Coombs
*   Jelle Zijlstra
*   Jeremy Kloth
*   Joannah Nanjekye
*   Julien Palard
*   Karthikeyan Singaravelan
*   Ken Jin
*   Kumar Aditya
*   Kurt B. Kaiser
*   Kushal Das
*   Larry Hastings
*   Lukasz Langa
*   Lysandros Nikolaou
*   Marc-André Lemburg
*   Mariatta
*   Mark Dickinson
*   Mark Shannon
*   Nathaniel J. Smith
*   Ned Deily
*   Neil Schemenauer
*   Pablo Galindo
*   Paul Ganssle
*   Paul Moore
*   Petr Viktorin
*   Pradyun Gedam
*   R. David Murray
*   Raymond Hettinger
*   Ronald Oussoren
*   Senthil Kumaran
*   Serhiy Storchaka
*   Shantanu Jain
*   Stefan Behnel
*   Stéphane Wirtel
*   Steve Dower
*   Tal Einat
*   Terry Jan Reedy
*   Thomas Wouters
*   Tim Golden
*   Tim Peters
*   Victor Stinner
*   Vinay Sajip
*   Yury Selivanov
*   Zachary Ware

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.