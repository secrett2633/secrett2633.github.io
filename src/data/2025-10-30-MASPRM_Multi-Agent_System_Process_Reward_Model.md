---
title: "[논문리뷰] MASPRM: Multi-Agent System Process Reward Model"
excerpt: "Ying Xiong이 [arXiv]에 게시한 'MASPRM: Multi-Agent System Process Reward Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Systems
  - Process Reward Model
  - MCTS
  - Inference-time Search
  - LLM Agents
  - Zero-shot Transfer
  - Reinforcement Learning
  - Compute-Aware Reasoning

permalink: /ai/review/2025-10-30-MASPRM_Multi-Agent_System_Process_Reward_Model/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24803)

**저자:** Milad Yazdani, Mahdi Mostajabdaveh, Zirui Zhou, Ying Xiong



## 핵심 연구 목표
Multi-Agent Systems (MAS)의 추론 시 검색 과정에서 발생하는 비신뢰성 문제를 해결하는 것을 목표로 합니다. 특히, 최종 결과에만 의존하는 희소한 보상(sparse reward)과 긴 대화 과정에서 발생하는 오류 전파 문제를 극복하기 위해, 중간 단계에서 진행 상황을 평가하고 컴퓨팅 자원 할당을 최적화하는 방법을 제시합니다.

## 핵심 방법론
논문은 **MASPRM (Multi-Agent System Process Reward Model)**이라는 새로운 모델을 제안합니다. MASPRM은 각 행동(action) 및 각 에이전트(agent)에 대한 가치를 할당하는 모델로, **MAS-MCTS (Multi-Agent Monte Carlo Tree Search) 롤아웃**으로부터 생성된 검색 데이터를 통해 훈련됩니다. 이는 수동적인 스텝 단위 주석 없이 **Q-값**을 로컬 타겟으로 전파하여 학습하며, 추론 시에는 **스텝 레벨 빔 서치 (SBS)** 및 **MCTS**를 안내하여 유망한 탐색 경로에 컴퓨팅을 집중하고 비생산적인 경로를 조기에 가지치기합니다.

## 주요 결과
**GSM8K** 데이터셋에서 MASPRM-가이드 디코딩은 **ORM (Outcome Reward Model)**과 결합 시 단일 MAS 패스(Greedy) 대비 **+30.7%p**의 Exact Match (EM) 정확도를 향상시켜 **74.6% EM**을 달성했습니다. **MATH** 데이터셋에서는 **+22.9%p** EM 정확도를 향상시켜 **48.0% EM**을 기록했습니다. 특히, **GSM8K**에서 훈련된 MASPRM은 **MATH**로 제로샷 전이 시 **8.4%p** EM 정확도를 추가하는 등, 탁월한 일반화 능력을 보였습니다.

## AI 실무자를 위한 시사점
MASPRM은 기존 다중 에이전트 워크플로우에 **플러그인 방식**으로 통합되어 에이전트의 기본 정책을 변경하거나 수동 주석 없이도 시스템의 신뢰성과 **컴퓨팅 자원 효율성**을 크게 향상시킬 수 있습니다. 또한, 에이전트별 진행 상황 신호를 제공함으로써 다중 에이전트 강화 학습의 **신용 할당(credit assignment) 문제**를 해결하는 데 기여하며, 제로샷 전이 능력은 학습된 진행 신호가 다양한 도메인에 걸쳐 재사용 가능한 구조를 포착함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.