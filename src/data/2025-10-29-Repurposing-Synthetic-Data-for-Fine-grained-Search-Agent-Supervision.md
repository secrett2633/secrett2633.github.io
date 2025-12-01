---
title: "[논문리뷰] Repurposing Synthetic Data for Fine-grained Search Agent Supervision"
excerpt: "이 [arXiv]에 게시한 'Repurposing Synthetic Data for Fine-grained Search Agent Supervision' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Search Agents
  - LLM
  - Reinforcement Learning
  - Synthetic Data
  - Reward Shaping
  - Entity-aware Reward
  - Policy Optimization
  - Knowledge-intensive Tasks

permalink: /ai/review/2025-10-29-Repurposing-Synthetic-Data-for-Fine-grained-Search-Agent-Supervision/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24694)

**저자:** Yida Zhao, Kuan Li, Xixi Wu, Liwen Zhang, Dingchu Zhang, Baixuan Li, Maojia Song, Zhuo Chen, Chenxi Wang, Xinyu Wang, Kewei Tu, Pengjun Xie, Jingren Zhou, Yong Jiang



## 핵심 연구 목표
본 논문은 LLM 기반 검색 에이전트 훈련 시 **Group Relative Policy Optimization (GRPO)** 방법론의 한계인 희소한(sparse) 보상 문제를 해결하는 것을 목표로 합니다. 특히, 기존 GRPO가 "부분적으로는 올바르지만 최종 답변이 틀린" 이른바 "near-miss" 샘플과 완전히 실패한 샘플을 구분하지 못해 학습 신호를 놓치는 문제를 개선하고자 합니다.

## 핵심 방법론
저자들은 합성 데이터 생성 과정에서 버려졌던 **그라운드 트루스 엔티티 정보** 를 활용하여 **Entity-aware Group Relative Policy Optimization (E-GRPO)** 프레임워크를 제안합니다. 이는 엔티티 일치율(entity match rate)에 비례하여 부분적인 보상을 할당하는 **밀집된(dense) 엔티티-인식 보상 함수** 를 정의하며, 보상 계산 시 하이퍼파라미터 `a`를 통해 정확도와 엔티티 매칭의 균형을 조절합니다. 최적의 `a` 값은 **0.3** 으로 설정되었습니다.

## 주요 결과
E-GRPO는 **11개의 다양한 벤치마크** 에서 GRPO 기준선보다 **일관되게 우수한 성능** 을 보였습니다. 예를 들어, Local 환경에서 **Local-7B-E-GRPO** 는 평균 Pass@1 **64.2%** 를 달성하여 **Local-7B-GRPO** 의 **61.4%** 대비 **2.8%p 상승** 했습니다. 또한, E-GRPO는 더 효율적인 추론 정책을 학습하여 **더 적은 도구 호출** 을 요구하며, 이는 엔티티 매치율과 최종 답변 정확도 사이에 강한 양의 상관관계가 있음을 실증적으로 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 지식 집약적 태스크를 위한 LLM 기반 검색 에이전트의 훈련 효율성과 견고성을 크게 향상시킬 수 있는 실용적인 방법론을 제시합니다. 합성 데이터 내부에 숨겨진 **중간 엔티티 정보를 보상 신호로 재활용** 하는 것은 추가적인 어노테이션이나 복잡한 모델 훈련 없이 **미세한 학습 신호** 를 제공하여 에이전트가 더 직접적이고 정보적인 해결 단계를 학습하도록 유도합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.