---
title: "[논문리뷰] DeepSearch: Overcome the Bottleneck of Reinforcement Learning with
  Verifiable Rewards via Monte Carlo Tree Search"
excerpt: "이 [arXiv]에 게시한 'DeepSearch: Overcome the Bottleneck of Reinforcement Learning with
  Verifiable Rewards via Monte Carlo Tree Search' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning with Verifiable Rewards (RLVR)
  - Monte Carlo Tree Search (MCTS)
  - Mathematical Reasoning
  - Large Language Models (LLMs)
  - Systematic Exploration
  - Adaptive Training
  - Tree-GRPO

permalink: /ai/review/2025-10-2-DeepSearch-Overcome-the-Bottleneck-of-Reinforcement-Learning-with-Verifiable-Rewards-via-Monte-Carlo-Tree-Search/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25454)

**저자:** Fang Wu, Weihao Xuan, Heli Qi, Ximing Lu, Aaron Tu, Li Erran Li, Yejin Choi



## 핵심 연구 목표
논문은 LLM의 추론 능력 향상을 위한 **Verifiable Rewards 기반의 강화 학습(RLVR)**에서 발생하는 **훈련 정체(training plateaus)** 및 **불충분한 탐색(insufficient exploration)** 문제를 해결하는 것을 목표로 합니다. 현재 RLVR은 제한된 롤아웃에 의존하여 중요한 추론 경로를 놓치고, 이는 계산 자원 투자에도 불구하고 성능 향상이 미미한 한계를 가집니다.

## 핵심 방법론
본 연구는 **Monte Carlo Tree Search (MCTS)**를 RLVR 훈련 과정에 직접 통합하는 **DeepSearch** 프레임워크를 제안합니다. 주요 혁신으로는 탐색 트리 전반에 걸쳐 유망한 노드를 우선하는 **글로벌 프론티어 선택 전략**, 자신감 있는 경로를 식별하기 위한 **엔트로피 기반 가이드 선택**, 그리고 효율성을 위한 **솔루션 캐싱을 포함하는 적응형 리플레이 버퍼 훈련**이 있습니다. 또한, q-값 정규화와 정책 최적화를 결합한 **Tree-GRPO 훈련 목표**를 통해 세밀한 신용 할당을 가능하게 합니다.

## 주요 결과
DeepSearch는 수학적 추론 벤치마크에서 **62.95%의 평균 정확도**를 달성하며 **1.5B 추론 모델의 새로운 State-of-the-Art**를 수립했습니다. 이는 이전 최고 성능 모델 대비 **1.25%p 개선**된 수치이며, 확장된 훈련 방식보다 **5.7배 적은 GPU 시간**을 소모하여 달성되었습니다. 특히 **AIME 2024 (53.65% vs 51.77%)** 및 **AMC (90.39% vs 88.83%)**에서 주목할 만한 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
DeepSearch는 LLM의 추론 능력을 확장하는 데 있어 **무차별적인 컴퓨팅 스케일링** 대신 **체계적인 탐색 및 알고리즘 혁신**의 중요성을 강조합니다. AI/ML 엔지니어는 이 프레임워크를 통해 **적은 GPU 자원**으로도 더 나은 성능을 달성할 수 있으며, MCTS를 훈련 과정에 통합하여 **모델의 탐색 효율성을 극대화**하고 **세밀한 신용 할당**을 수행하는 새로운 RLVR 개발 패러다임을 고려할 수 있습니다. 이는 더 효율적이고 실용적인 AI 모델 개발 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.