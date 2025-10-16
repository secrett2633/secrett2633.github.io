---
title: "[논문리뷰] Deflanderization for Game Dialogue: Balancing Character Authenticity
  with Task Execution in LLM-based NPCs"
excerpt: "이 [arXiv]에 게시한 'Deflanderization for Game Dialogue: Balancing Character Authenticity
  with Task Execution in LLM-based NPCs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - NPC
  - Game Dialogue
  - Persona-Grounded Dialogue
  - Task Execution
  - Prompt Engineering
  - Fine-tuning
  - Deflanderization

permalink: /ai/review/2025-10-16-Deflanderization_for_Game_Dialogue_Balancing_Character_Authenticity_with_Task_Execution_in_LLM-based_NPCs/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13586)

**저자:** Pasin Buakhaw, Kun Kerdthaisong, Phuree Phenhiran, Pitikorn Khlaisamniang, Supasate Vorathammathorn, Piyalitt Ittichaiwong, Nutchanon Yongsatianchot



## 핵심 연구 목표
LLM 기반 비플레이어 캐릭터(NPC)가 게임 내에서 기능적 작업 실행과 페르소나 일관성 있는 대화 생성을 동시에 수행할 때 발생하는 "Flanderization" (과도한 역할극) 문제를 해결하는 것을 목표로 합니다. 이를 통해 **캐릭터의 진정성**과 **작업 실행의 정확성** 사이의 균형을 효과적으로 맞추는 방안을 모색합니다.

## 핵심 방법론
본 연구는 **Commonsense Persona-Grounded Dialogue Challenge (CPDC) 2025 Round 2**에 참여하여 두 가지 보완적인 전략을 사용했습니다. **API 트랙**에서는 과도한 역할극을 억제하고 작업 충실도를 높이는 **Deflanderization 프롬프팅 방식**(`D (Deflanderization)`)을 **few-shot 예제**(`F (Fewshot)`)와 결합한 **경량 프롬프팅 기법**을 적용했습니다. **GPU 트랙**에서는 **Qwen3-14B 모델**을 **지도 미세 조정(SFT)** 및 **Low-Rank Adaptation (LoRA)**을 통해 미세 조정했으며, **Retrieval Augmented Generation (RAG)** 및 **RAG+Refine** 기법을 탐색하여 대화 접지(grounding)를 개선했습니다.

## 주요 결과
**API 트랙**에서 **D-RW** (Deflanderization + Remove World setting) 및 **two-turn few-shot 예제**를 결합한 접근 방식이 **Task 3에서 2위, Task 1에서 2위, Task 2에서 5위**를 기록했습니다. 특히 **Deflanderization 프롬프팅**은 제로샷 대비 **Task 3에서 +0.013의 CPDCscore(all) 절대 이득**을 보였습니다. **GPU 트랙**에서는 **Qwen3-14B 모델**에 **SFT 및 LoRA**를 적용한 결과 **0.598의 CPDCscore(all)**로 **4위**를 차지하며, 모델 크기와 도메인별 미세 조정의 중요성을 입증했습니다.

## AI 실무자를 위한 시사점
제한된 컴퓨팅 리소스 환경인 **API 트랙**에서는 **Deflanderization과 Few-shot 프롬프팅**과 같은 **경량 프롬프팅 전략**이 비용 효율적이면서도 효과적인 성능을 낼 수 있음을 보여줍니다. 반면, **GPU 트랙**에서는 **대규모 언어 모델의 미세 조정(SFT+LoRA)**이 성능 향상에 결정적인 요소임을 시사합니다. 이 연구는 페르소나 일관성과 기능적 정확성 사이의 균형을 맞추는 것이 LLM 기반 NPC 개발의 핵심 과제임을 강조하며, 향후 **프롬프팅과 미세 조정을 결합한 하이브리드 전략**의 필요성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.