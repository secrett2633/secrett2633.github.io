---
title: "[논문리뷰] Tree Search for LLM Agent Reinforcement Learning"
excerpt: "Xiangxiang Chu이 [arXiv]에 게시한 'Tree Search for LLM Agent Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Reinforcement Learning
  - Tree Search
  - Policy Optimization
  - Preference Learning
  - Sparse Rewards
  - Multi-turn Tasks

permalink: /ai/review/2025-9-26-Tree-Search-for-LLM-Agent-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21240)

**저자:** Yuxiang Ji, Ziyu Ma, Yong Wang, Guanhua Chen, Xiangxiang Chu, Liaoni Wu



## 핵심 연구 목표
본 논문은 LLM 에이전트의 장기 및 멀티턴 태스크에서 발생하는 **희소한 보상(sparse supervision)** 문제와 **과도한 롤아웃 예산(rollout budget)** 소비를 해결하는 것을 목표로 합니다. 제한된 롤아웃 예산 하에서 더 세분화된 학습 시그널을 생성하여 에이전트의 학습 효율성과 성능을 향상시키고자 합니다.

## 핵심 방법론
저자들은 트리 탐색 기반의 **Tree-based Group Relative Policy Optimization (Tree-GRPO)** 를 제안합니다. 이는 기존의 체인 기반 샘플링 대신 각 노드가 완전한 **Thought-Action-Observation 단계** 를 나타내는 트리 탐색 방식을 사용하며, 공통 접두사를 공유하여 고정된 예산 내에서 더 많은 롤아웃을 얻습니다. **intra-tree 및 inter-tree 레벨** 모두에서 그룹 상대적 이점(grouped relative advantages)을 추정하여 과정 기반의 지도 학습 시그널을 생성하며, intra-tree GRPO가 **단계별 직접 선호 학습(step-level direct preference learning)** 과 구조적으로 동등함을 이론적으로 보입니다.

## 주요 결과
**11개 데이터셋** 과 **3가지 QA 태스크** 에 걸친 실험에서 Tree-GRPO는 체인 기반 RL 방법론 대비 일관된 성능 향상을 보였습니다. 특히, **Qwen2.5-3b 모델** 에서는 기존 방법의 **롤아웃 예산의 1/4만으로도** 더 우수한 성능을 달성했으며, 소형 모델에서는 **16%에서 최대 69%** 의 상대적 성능 개선을 보였습니다. Tree-GRPO는 에이전트가 더 복잡하고 긴 상호작용(평균 2.4에서 3.0의 툴 호출)에 참여하도록 유도하는 효과도 입증되었습니다.

## AI 실무자를 위한 시사점
**Tree-GRPO** 는 LLM 에이전트 학습의 주요 병목인 높은 롤아웃 비용을 절감하면서도 성능을 향상시키는 실용적인 방법을 제공합니다. 희소한 보상 환경에서 **트리 구조를 활용한 세분화된 과정 시그널** 은 에이전트의 학습 안정성과 멀티턴 추론 능력을 강화할 수 있습니다. 이는 특히 대규모 및 고비용 환경에서 LLM 에이전트를 개발하고 최적화하는 AI/ML 엔지니어들에게 **비용 효율적이고 효과적인 학습 패러다임** 을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.