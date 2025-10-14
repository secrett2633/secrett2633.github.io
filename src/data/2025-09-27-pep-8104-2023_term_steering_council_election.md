---
title: "[Final] PEP 8104 - 2023 Term Steering Council election"
excerpt: "Python Enhancement Proposal 8104: '2023 Term Steering Council election'에 대한 한국어 번역입니다."
categories:
  - Python
  - PEP
tags:
  - Python
  - PEP
  - Translation
permalink: /python/pep/8104/
toc: true
toc_sticky: true
date: 2025-09-27 19:34:01+0900
last_modified_at: 2025-09-27 19:34:01+0900
published: true
---
> **원문 링크:** [PEP 8104 - 2023 Term Steering Council election](https://peps.python.org/pep-8104/)
>
> **상태:** Final | **유형:** Informational | **작성일:** 08-Nov-2022

PEP 8104는 "2023 Term Steering Council election"에 대한 정보성(Informational) PEP로, 2022년 12월에 진행된 Python 스티어링 카운슬(Steering Council) 선거의 일정 및 세부 사항을 다루고 있습니다. 이 문서는 Python 3.12 버전에 해당하는 2023년 임기의 스티어링 카운슬 선거에 대한 내용을 명시합니다.

## 개요 (Abstract)
이 문서는 PEP 13에 명시된 바와 같이, Python 스티어링 카운슬의 2022년 12월 선거 일정과 기타 세부 사항을 설명합니다. 이는 2023년 임기(즉, Python 3.12) 스티어링 카운슬 선거입니다.

## 선거 관리 (Election Administration)
스티어링 카운슬은 Python Software Foundation의 인프라 책임자인 Ee Durbin을 선거 관리자로 임명했습니다.

## 일정 (Schedule)
선거는 2주간의 후보 지명 기간과 이어진 2주간의 투표 기간으로 구성되었습니다.
*   **후보 지명 기간:** 2022년 11월 14일부터 2022년 11월 28일 AoE(Anywhere on Earth)까지.
*   **투표 기간:** 2022년 12월 1일부터 2022년 12월 14일 AoE(Anywhere on Earth)까지.

## 후보자 (Candidates)
후보자는 코어 팀(core team) 멤버에 의해 지명되어야 합니다. 후보자가 코어 팀 멤버인 경우 스스로를 지명할 수 있습니다.

**지명된 후보자 (알파벳순):**
*   Brett Cannon
*   Emily Morehouse
*   Dong-hee Na
*   Pablo Galindo Salgado
*   Gregory P. Smith
*   Victor Stinner
*   Petr Viktorin
*   Thomas Wouters

**철회된 지명:** 없음

## 유권자 명부 (Voter Roll)
모든 활동 중인 Python 코어 팀 멤버는 투표 자격이 있습니다. 활동 상태는 PEP 13에 설명된 대로 결정되며, `python/voters` 소프트웨어를 통해 구현됩니다.

투표 용지는 이 선거의 Python 유권자 명부를 기반으로 배포되었습니다. 이 파일은 개인 이메일 주소를 포함하고 있어 공개되지 않지만, 명부가 생성되면 이름으로 된 "Complete Voter Roll"이 공개될 예정이었습니다.

## 선거 구현 (Election Implementation)
선거는 Helios Voting Service를 사용하여 진행되었습니다.

**Configuration (구성):**
*   **Short name:** `2023-python-steering-council`
*   **Name:** `2023 Python Steering Council Election`
*   **Description:** PEP 13에 명시된 Python 스티어링 카운슬 선거. 2023년 임기 스티어링 카운슬 선거입니다.
*   **type:** `Election`
*   **Use voter aliases:** `[X]` (유권자 별칭 사용)
*   **Randomize answer order:** `[X]` (답변 순서 무작위화)
*   **Private:** `[X]` (비공개)
*   **Help Email Address:** `psf-election@python.org`
*   **Voting starts at:** 2022년 12월 1일 12:00 UTC
*   **Voting ends at:** 2022년 12월 15일 12:00 UTC

이는 다음과 같은 방식으로 선거가 진행됨을 의미합니다:
*   투표는 일반에 공개되지 않으며, 유권자 명부에 있는 사람만 참여할 수 있습니다.
*   투표 시작 시 투표 용지가 이메일로 발송됩니다.
*   후보자는 편향을 피하기 위해 무작위 순서로 제시됩니다.
*   유권자의 신원과 투표 용지는 암호화 기술의 발전으로부터 보호됩니다.

**Questions (질문):**
**질문 1:** Python 스티어링 카운슬 후보자를 선택하십시오.
*   **Select between 0 and - (approval) answers.** (0개에서 -개까지 (승인) 답변 선택)
*   **Result Type:** `absolute`
*   **Answer #1 - #N:** `Candidates from Candidates_ Section` (후보자 섹션의 후보자들)

## 결과 (Results)
85명의 자격 있는 유권자 중 66명이 투표했습니다.
가장 많은 표를 얻은 상위 5명은 다음과 같습니다:
1.  Pablo Galindo Salgado
2.  Gregory P. Smith
3.  Emily Morehouse
4.  Brett Cannon
5.  Thomas Wouters

PEP 13에 정의된 이해 상충은 관찰되지 않았습니다.

**전체 득표수:**
*   Pablo Galindo Salgado: 61표
*   Gregory P. Smith: 48표
*   Emily Morehouse: 47표
*   Brett Cannon: 42표
*   Thomas Wouters: 39표
*   Petr Viktorin: 36표
*   Victor Stinner: 34표
*   Dong-hee Na: 29표

## 저작권 (Copyright)
이 문서는 퍼블릭 도메인(public domain)에 공개되었습니다.

## 전체 유권자 명부 (Complete Voter Roll)
문서에는 선거에 참여할 수 있는 전체 Python 코어 개발자 명단이 이름순으로 나열되어 있습니다. (개인 정보 보호를 위해 이메일 주소는 포함되지 않음)
이 명단은 Python 코어 개발자, 관리자 및 Python Software Foundation 직원에만 접근 가능하다고 명시되어 있습니다.


> ⚠️ **알림:** 이 문서는 AI를 활용하여 번역되었으며, 기술적 정확성을 보장하지 않습니다. 정확한 내용은 반드시 원문을 확인하시기 바랍니다.