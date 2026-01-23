---
title: "[논문리뷰] BayesianVLA: Bayesian Decomposition of Vision Language Action Models via Latent Action Queries"
excerpt: "이 [arXiv]에 게시한 'BayesianVLA: Bayesian Decomposition of Vision Language Action Models via Latent Action Queries' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Bayesian Decomposition
  - Latent Action Queries
  - Information Collapse
  - OOD Generalization
  - Robot Manipulation
  - Pointwise Mutual Information

permalink: /ai/review/2026-01-23-BayesianVLA-Bayesian-Decomposition-of-Vision-Language-Action-Models-via-Latent-Action-Queries/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.15197)

**저자:** Shijie Lian, Bin Yu, Xiaopeng Lin, Laurence T. Yang, Zhaolong Shen, Changti Wu, Yuzhuo Miao, Cong Huang, Kai Chen



## 핵심 연구 목표
Vision-Language-Action (VLA) 모델이 새로운 지시나 복잡한 다중 작업 시나리오에서 일반화하는 데 어려움을 겪는 문제를 해결하는 것이 목표입니다. 특히, "Information Collapse" 또는 "Vision Shortcut"으로 명명된 현상, 즉 목표 지향적 데이터 수집으로 인해 시각적 관찰만으로 언어 지시가 너무 예측 가능해져 모델이 언어 제약을 무시하고 OOD(Out-of-Distribution) 환경에서 실패하는 문제를 다룹니다.

## 핵심 방법론
본 연구는 **베이즈 분해(Bayesian Decomposition)** 를 통해 지시 따르기를 명시적으로 강제하는 **BayesianVLA** 프레임워크를 제안합니다. 핵심은 동작과 지시 사이의 조건부 **Pointwise Mutual Information (PMI)** 을 최대화하는 것으로, 이는 **로그 우도비(Log-Likelihood Ratio, LLR)** `log p(l | a, v) – log p(l | v)`를 최대화하는 것과 동일합니다. 이를 위해 **Latent Action Queries (Q)** 라는 학습 가능한 토큰을 도입하여 **비전-온리 사전(vision-only prior) p(a | v)** 과 **언어 조건부 사후 확률(language-conditioned posterior) π(α | v,l)** 을 추정하는 **듀얼-브랜치 아키텍처** 를 구성합니다.

## 주요 결과
BayesianVLA는 **SimplerEnv 벤치마크** 에서 평균 성공률 **66.5%** 를 달성하여 기존 **QwenGR00T 베이스라인(55.2%)** 대비 **11.3%** 의 절대적인 개선을 보였습니다. 특히 "Put Carrot on Plate"에서 **13.6%** , "Put Eggplant in Yellow Basket"에서 **15.0%** 의 높은 향상을 기록했습니다. 또한 **RoboCasa 벤치마크** 에서 **50.4%** 의 평균 성공률을 달성하며 시각-온리 베이스라인 **(44.7%)** 및 표준 **QwenGR00T (47.8%)** 를 능가했습니다. 모델은 또한 베이스라인이 겪는 치명적인 망각 없이 **VLM의 원래 추론 및 언어 생성 능력** 을 보존하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
이 연구는 VLA 모델의 일반화 능력 저하의 주요 원인인 데이터 편향으로 인한 "비전 지름길" 문제를 명확히 식별하고 해결책을 제시합니다. **BayesianVLA** 는 동작과 지시 간의 상호 정보를 명시적으로 최적화함으로써, 모델이 시각적 단서에만 의존하지 않고 언어 지시를 진정으로 따르도록 유도하는 효과적인 방법을 제공합니다. **Latent Action Queries** 의 도입은 효율적인 아키텍처적 유도 편향을 제공하여 **Diffusion Transformer (DiT)** 의 복잡성을 VLM 입력 컨텍스트 길이와 분리함으로써 액션 생성 과정을 간소화합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.