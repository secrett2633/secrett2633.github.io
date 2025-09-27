---
title: "[Final] PEP 8106 - 2025 Term Steering Council election"
excerpt: "Python Enhancement Proposal 8106: '2025 Term Steering Council election'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8106/
toc: true
toc_sticky: true
date: 2025-09-27 19:35:42+0900
last_modified_at: 2025-09-27 19:35:42+0900
published: true
---
> **원문 링크:** [PEP 8106 - 2025 Term Steering Council election](https://peps.python.org/pep-8106/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 21-Oct-2024

## PEP 8106 – 2025년 임기 스티어링 카운슬 선거 번역 및 정리

### 1. 개요 (Abstract)

이 문서는 PEP 13에 명시된 바에 따라, Python 스티어링 카운슬(Steering Council)의 2024년 선거 일정 및 기타 세부 사항을 기술합니다. 이 선거는 2025년 임기(즉, Python 3.14)를 위한 스티어링 카운슬 선거입니다.

### 2. 도입 배경 및 스티어링 카운슬의 역할

Python의 거버넌스 모델은 초기 `BDFL (Benevolent Dictator For Life)`이었던 Guido van Rossum의 은퇴 이후 PEP 13에 따라 스티어링 카운슬 체제로 전환되었습니다. 스티어링 카운슬은 Python 프로젝트의 기술적 방향을 이끌고, PEP(Python Enhancement Proposal) 승인, 논쟁 중재, 프로젝트의 전반적인 건강과 발전을 보장하는 중요한 역할을 수행합니다. 매년 핵심 개발자들의 투표를 통해 새로운 임기의 스티어링 카운슬이 선출되며, 이들은 Python의 미래에 큰 영향을 미치게 됩니다. PEP 8106은 이러한 중요한 선거 과정을 상세히 기록하고 있습니다.

### 3. 선거 관리 (Election Administration)

스티어링 카운슬은 Python Software Foundation (PSF)의 인프라 디렉터인 Ee Durbin을 이 선거의 관리자로 임명했습니다.

### 4. 일정 (Schedule)

선거는 2주간의 후보 지명 기간과 2주간의 투표 기간으로 진행되었습니다.

*   **후보 지명 기간:** 2024년 11월 7일 ~ 2024년 11월 21일 (AoE)
*   **투표 기간:** 2024년 11월 25일 ~ 2024년 12월 9일 (AoE)

*AoE (Anywhere on Earth)*: 지구상 어느 곳이든. 즉, 지정된 날짜의 마지막 시간대까지를 의미합니다.

### 5. 후보자 (Candidates)

후보자는 핵심 팀원(core team member)에 의해 지명되어야 합니다. 후보자가 핵심 팀원인 경우, 스스로를 지명할 수 있습니다.

지명된 후보자 (이름 알파벳 순):

*   Barry Warsaw
*   Donghee Na (나동희)
*   Emily Morehouse
*   Ethan Furman
*   Gregory P. Smith
*   Mariatta
*   Pablo Galindo Salgado
*   Thomas Wouters

철회된 지명은 없었습니다.

### 6. 유권자 명부 (Voter Roll)

모든 활동 중인 Python 핵심 팀원(active Python core team members)이 투표할 자격이 있습니다. 활동 상태는 PEP 13에 설명된 대로 결정되며, python/voters 소프트웨어를 통해 구현됩니다. 투표 용지는 이 선거를 위한 Python 유권자 명부를 기반으로 배포되었습니다. 이 파일은 개인 이메일 주소를 포함하고 있어 공개되지 않지만, 전체 유권자 명부(Complete Voter Roll)는 이름으로 모든 유권자 목록을 제공합니다.

### 7. 선거 구현 (Election Implementation)

선거는 Helios Voting Service를 사용하여 실시되었습니다.

**설정 (Configuration):**

*   **약식 이름 (Short name):** `2025-python-steering-council`
*   **이름 (Name):** `2025 Python Steering Council Election`
*   **설명 (Description):** PEP 13에 명시된 Python 스티어링 카운슬 선거. 2025년 임기를 위한 스티어링 카운슬 선거.
*   **유형 (type):** `Election`
*   **유권자 별칭 사용 (Use voter aliases):** [X] (활성화됨)
*   **답변 순서 무작위화 (Randomize answer order):** [X] (활성화됨)
*   **비공개 (Private):** [X] (활성화됨)
*   **도움 이메일 주소 (Help Email Address):** `psf-election@python.org`
*   **투표 시작 (Voting starts at):** 2024년 11월 25일 12:00 UTC
*   **투표 종료 (Voting ends at):** 2024년 12월 10일 12:00 UTC

이러한 설정으로 다음과 같은 선거가 진행되었습니다:

*   투표는 일반에 공개되지 않으며, 유권자 명부에 있는 사람만 참여할 수 있습니다.
*   투표 시작 시 투표 용지가 이메일로 발송되었습니다.
*   후보자들은 무작위 순서로 제시되어 편향을 피하는 데 도움이 되었습니다.
*   유권자 신원과 투표 용지는 암호화 기술 발전에 대비하여 보호됩니다.

**질문 (Questions):**

*   **질문 1:** 0개에서 (승인) 답변까지 선택합니다. 결과 유형: 절대적
*   **질문:** Python 스티어링 카운슬 후보자를 선택하세요.
*   **답변 #1 - #N:** `후보자` 섹션의 후보자들.

### 8. 결과 (Results)

전체 100명의 유권자 중 76명이 투표했습니다.

가장 많은 표를 얻은 상위 5명은 다음과 같습니다:

*   **Barry Warsaw**
*   **Donghee Na (나동희)**
*   **Emily Morehouse**
*   **Gregory P. Smith**
*   **Pablo Galindo Salgado**

PEP 13에 정의된 이해 상충(conflict of interest)은 관찰되지 않았습니다.

전체 득표수는 다음과 같습니다:

| 후보자              | 받은 투표 수 |
| :------------------ | :----------: |
| Barry Warsaw        |      58      |
| Donghee Na          |      48      |
| Emily Morehouse     |      52      |
| Ethan Furman        |      31      |
| Gregory P. Smith    |      50      |
| Mariatta            |      23      |
| Pablo Galindo Salgado |      63      |
| Thomas Wouters      |      38      |

### 9. Python 사용에 미치는 영향

이 PEP는 Python 스티어링 카운슬의 선거 절차와 결과를 다루는 정보성 문서이므로, 직접적으로 Python 언어의 기능이나 사용 방식에 즉각적인 변화를 가져오지는 않습니다. 하지만, 이 선거를 통해 선출된 스티어링 카운슬 멤버들은 향후 Python 개발의 주요 의사 결정(예: 새로운 언어 기능 추가, 기존 기능 변경, 개발 우선순위 설정 등)에 직접적으로 관여하게 됩니다. 따라서 이들의 리더십과 방향성은 장기적으로 Python 언어의 진화, 표준 라이브러리의 발전, 그리고 커뮤니티 거버넌스에 지대한 영향을 미쳐, 궁극적으로 모든 Python 개발자의 실제 Python 사용 경험에 중대한 영향을 미치게 됩니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.