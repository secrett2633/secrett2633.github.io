---
title: "[Final] PEP 8100 - January 2019 Steering Council election"
excerpt: "Python Enhancement Proposal 8100: 'January 2019 Steering Council election'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8100/
toc: true
toc_sticky: true
date: 2025-09-27 19:30:34+0900
last_modified_at: 2025-09-27 19:30:34+0900
published: true
---
> **원문 링크:** [PEP 8100 - January 2019 Steering Council election](https://peps.python.org/pep-8100/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 03-Jan-2019

## 개요

이 문서는 PEP 13에 명시된 2019년 1월 Python 운영 위원회 선거의 일정 및 기타 세부 사항을 설명합니다. 이는 첫 번째 운영 위원회 선거입니다.

## 선거 관리관 (Returns officer)

향후 선거에서는 퇴임하는 운영 위원회에서 선거 관리관을 임명하게 됩니다. 그러나 이번이 첫 선거이므로 퇴임하는 운영 위원회가 없으며, PEP 13에 따라 PSF(Python Software Foundation) 전무 이사인 Ewa Jodlowska가 선거 관리관을 임명했습니다. 그녀는 Ee Durbin을 임명했습니다.

## 일정 (Schedule)

2주간의 후보 지명 기간과 2주간의 투표 기간이 있었습니다.

*   **후보 지명 기간:** 2019년 1월 7일 ~ 2019년 1월 20일
*   **투표 기간:** 2019년 1월 21일 12:00 UTC ~ 2019년 2월 4일 12:00 UTC (Anywhere on Earth 기준 2019년 2월 3일 종료)

## 후보자 (Candidates)

후보자는 핵심 팀(core team) 구성원의 지명을 받아야 합니다. 후보자가 핵심 팀 구성원인 경우, 스스로를 지명할 수 있습니다.

후보 지명 기간이 시작된 후, 다음과 같은 후보자들이 등록되었습니다.

*   Brett Cannon
*   Alyssa (Nick) Coghlan
*   Barry Warsaw
*   Guido van Rossum
*   Victor Stinner
*   Yury Selivanov
*   David Mertz
*   Łukasz Langa
*   Benjamin Peterson
*   Mariatta
*   Carol Willing
*   Emily Morehouse
*   Peter Wang
*   Donald Stufft
*   Travis Oliphant
*   Kushal Das
*   Gregory P. Smith

## 유권자 명부 (Voter Roll)

모든 활동 중인 Python 핵심 팀 구성원은 투표 자격이 있습니다.

투표 용지는 이 선거의 Python 유권자 명부를 기반으로 배포되었습니다.
이 파일은 개인 이메일 주소를 포함하고 있어 공개되지 않지만, 이름으로 구성된 전체 유권자 명부는 확인할 수 있습니다.

## 선거 구현 (Election Implementation)

선거는 Helios 투표 서비스(Helios Voting Service)를 사용하여 진행되었습니다.

**설정 (Configuration):**
*   **간략한 이름:** 2019-python-steering-committee
*   **이름:** 2019 Python Steering Committee Election
*   **설명:** PEP 13에 명시된 Python 운영 위원회 선거. 이는 첫 번째 운영 위원회 선거입니다.
*   **유형:** Election
*   **유권자 가명 사용 (Use voter aliases):** [X]
*   **답변 순서 무작위화 (Randomize answer order):** [X]
*   **비공개 (Private):** [X]
*   **도움말 이메일 주소:** ee@python.org
*   **투표 시작:** 2019년 1월 21일 12:00 UTC
*   **투표 종료:** 2019년 2월 4일 12:00 UTC

이는 다음과 같은 선거를 생성했습니다.
*   투표는 대중에게 공개되지 않으며, 유권자 명부에 있는 사람만 참여할 수 있습니다.
*   투표가 시작되면 투표 용지가 이메일로 발송됩니다.
*   후보자들은 편향을 피하기 위해 무작위 순서로 제시됩니다.
*   유권자의 신원과 투표 용지는 암호학적 발전으로부터 보호됩니다.

**질문 (Questions):**
*   **질문 1:** 0개에서 5개까지의 답변을 선택하세요.
*   **결과 유형:** absolute
*   **질문:** Python 운영 위원회 후보자를 선택하세요.
*   **답변 #1 - #N:** 후보자 섹션의 후보자 목록

## 결과 (Results)

96명의 투표 자격 있는 유권자 중 69명이 투표했습니다.

상위 5명의 득표자는 다음과 같습니다.

*   Barry Warsaw
*   Brett Cannon
*   Carol Willing
*   Guido van Rossum
*   Alyssa (Nick) Coghlan

PEP 13에 정의된 이해 상충(conflict of interest)은 관찰되지 않았습니다.

전체 득표수는 다음과 같습니다.

| 후보자             | 득표수 |
| :----------------- | :----- |
| Guido van Rossum   | 45     |
| Brett Cannon       | 44     |
| Carol Willing      | 33     |
| Barry Warsaw       | 31     |
| Alyssa (Nick) Coghlan | 25     |
| Benjamin Peterson  | 22     |
| Łukasz Langa       | 21     |
| Victor Stinner     | 21     |
| Mariatta           | 20     |
| Emily Morehouse    | 18     |
| Yury Selivanov     | 15     |
| Donald Stufft      | 11     |
| Peter Wang         | 10     |
| Travis Oliphant    | 8      |
| Kushal Das         | 7      |
| Gregory P. Smith   | 6      |
| David Mertz        | 3      |

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

---

이 문서는 Python 운영 위원회(Steering Council)의 첫 선거에 대한 정보를 제공합니다. Python 개발자들이 이 내용을 통해 Python 프로젝트의 거버넌스 구조와 운영 위원회 구성 과정을 이해하는 데 도움이 될 것입니다. 이는 직접적으로 Python 코드 사용 방식에 영향을 미치는 기술 제안은 아니지만, Python 생태계의 방향성을 결정하는 중요한 거버넌스 문맥을 설명합니다.# PEP 8100 – 2019년 1월 운영 위원회(Steering Council) 선거

*   **저자:** Nathaniel J. Smith, Ee Durbin
*   **상태:** Final (최종)
*   **유형:** Informational (정보성)
*   **주제:** Governance (거버넌스)
*   **생성일:** 2019년 1월 3일

## 개요

이 문서는 PEP 13에 명시된 2019년 1월 Python 운영 위원회 선거의 일정 및 기타 세부 사항을 설명합니다. 이는 첫 번째 운영 위원회 선거입니다.

## 선거 관리관 (Returns officer)

향후 선거에서는 퇴임하는 운영 위원회에서 선거 관리관을 임명하게 됩니다. 그러나 이번이 첫 선거이므로 퇴임하는 운영 위원회가 없으며, PEP 13에 따라 PSF(Python Software Foundation) 전무 이사인 Ewa Jodlowska가 선거 관리관을 임명했습니다. 그녀는 Ee Durbin을 임명했습니다.

## 일정 (Schedule)

2주간의 후보 지명 기간과 2주간의 투표 기간이 있었습니다.

*   **후보 지명 기간:** 2019년 1월 7일 ~ 2019년 1월 20일
*   **투표 기간:** 2019년 1월 21일 12:00 UTC ~ 2019년 2월 4일 12:00 UTC (Anywhere on Earth 기준 2019년 2월 3일 종료)

## 후보자 (Candidates)

후보자는 핵심 팀(core team) 구성원의 지명을 받아야 합니다. 후보자가 핵심 팀 구성원인 경우, 스스로를 지명할 수 있습니다.

후보 지명 기간이 시작된 후, 다음과 같은 후보자들이 등록되었습니다.

*   Brett Cannon
*   Alyssa (Nick) Coghlan
*   Barry Warsaw
*   Guido van Rossum
*   Victor Stinner
*   Yury Selivanov
*   David Mertz
*   Łukasz Langa
*   Benjamin Peterson
*   Mariatta
*   Carol Willing
*   Emily Morehouse
*   Peter Wang
*   Donald Stufft
*   Travis Oliphant
*   Kushal Das
*   Gregory P. Smith

## 유권자 명부 (Voter Roll)

모든 활동 중인 Python 핵심 팀 구성원은 투표 자격이 있습니다.

투표 용지는 이 선거의 Python 유권자 명부를 기반으로 배포되었습니다.
이 파일은 개인 이메일 주소를 포함하고 있어 공개되지 않지만, 이름으로 구성된 전체 유권자 명부는 확인할 수 있습니다.

## 선거 구현 (Election Implementation)

선거는 Helios 투표 서비스(Helios Voting Service)를 사용하여 진행되었습니다.

**설정 (Configuration):**
*   **간략한 이름:** 2019-python-steering-committee
*   **이름:** 2019 Python Steering Committee Election
*   **설명:** PEP 13에 명시된 Python 운영 위원회 선거. 이는 첫 번째 운영 위원회 선거입니다.
*   **유형:** Election
*   **유권자 가명 사용 (Use voter aliases):** [X]
*   **답변 순서 무작위화 (Randomize answer order):** [X]
*   **비공개 (Private):** [X]
*   **도움말 이메일 주소:** ee@python.org
*   **투표 시작:** 2019년 1월 21일 12:00 UTC
*   **투표 종료:** 2019년 2월 4일 12:00 UTC

이는 다음과 같은 선거를 생성했습니다.
*   투표는 대중에게 공개되지 않으며, 유권자 명부에 있는 사람만 참여할 수 있습니다.
*   투표가 시작되면 투표 용지가 이메일로 발송됩니다.
*   후보자들은 편향을 피하기 위해 무작위 순서로 제시됩니다.
*   유권자의 신원과 투표 용지는 암호학적 발전으로부터 보호됩니다.

**질문 (Questions):**
*   **질문 1:** 0개에서 5개까지의 답변을 선택하세요.
*   **결과 유형:** absolute
*   **질문:** Python 운영 위원회 후보자를 선택하세요.
*   **답변 #1 - #N:** 후보자 섹션의 후보자 목록

## 결과 (Results)

96명의 투표 자격 있는 유권자 중 69명이 투표했습니다.

상위 5명의 득표자는 다음과 같습니다.

*   Barry Warsaw
*   Brett Cannon
*   Carol Willing
*   Guido van Rossum
*   Alyssa (Nick) Coghlan

PEP 13에 정의된 이해 상충(conflict of interest)은 관찰되지 않았습니다.

전체 득표수는 다음과 같습니다.

| 후보자             | 득표수 |
| :----------------- | :----- |
| Guido van Rossum   | 45     |
| Brett Cannon       | 44     |
| Carol Willing      | 33     |
| Barry Warsaw       | 31     |
| Alyssa (Nick) Coghlan | 25     |
| Benjamin Peterson  | 22     |
| Łukasz Langa       | 21     |
| Victor Stinner     | 21     |
| Mariatta           | 20     |
| Emily Morehouse    | 18     |
| Yury Selivanov     | 15     |
| Donald Stufft      | 11     |
| Peter Wang         | 10     |
| Travis Oliphant    | 8      |
| Kushal Das         | 7      |
| Gregory P. Smith   | 6      |
| David Mertz        | 3      |

## 저작권 (Copyright)

이 문서는 퍼블릭 도메인(public domain)에 있습니다.

---

이 문서는 Python 운영 위원회(Steering Council)의 첫 선거에 대한 정보를 제공합니다. Python 개발자들이 이 내용을 통해 Python 프로젝트의 거버넌스 구조와 운영 위원회 구성 과정을 이해하는 데 도움이 될 것입니다. 이는 직접적으로 Python 코드 사용 방식에 영향을 미치는 기술 제안은 아니지만, Python 생태계의 방향성을 결정하는 중요한 거버넌스 문맥을 설명합니다.

> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.