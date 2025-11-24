---
title: "[논문리뷰] MAPO: Mixed Advantage Policy Optimization"
excerpt: "Xuankun Rong이 [arXiv]에 게시한 'MAPO: Mixed Advantage Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Foundation Models
  - Policy Optimization
  - Advantage Function
  - Trajectory Certainty
  - Multimodal Reasoning
  - GRPO

permalink: /ai/review/2025-9-24-MAPO-Mixed-Advantage-Policy-Optimization/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.18849)

**저자:** Wenke Huang, Quan Zhang, Yiyang Fang, Jian Liang, Xuankun Rong, et al.



## 핵심 연구 목표
본 연구는 파운데이션 모델의 추론 성능 향상을 위한 기존 강화 학습(RL) 방법론, 특히 **Group Relative Policy Optimization (GRPO)**이 겪는 "advantage reversion" 및 "advantage mirror" 문제 해결을 목표로 합니다. 이러한 문제는 고정된 어드밴티지 함수 공식으로 인해 궤적 확실성(trajectory certainty)이 다양한 샘플 간 어드밴티지 할당을 저해하여 모델 학습을 불안정하게 만듭니다.

## 핵심 방법론
저자들은 **Mixed Advantage Policy Optimization (MAPO)**을 제안하며, 궤적 결과를 **베르누이 분포**로 모델링하여 궤적 확실성 **p**를 추정합니다. 높은 확실성을 가진 궤적에 대해서는 기존 **z-점수 정규화** 대신 **Advantage Percent Deviation (APD)**(`r_i - \mu / \mu`)을 도입하여 어드밴티지 문제를 해결합니다. 또한, **Trajectory Certainty Reweight (TCR)**를 통해 궤적 확실성 **p**에 따라 **APD**와 기존의 표준편차 기반 어드밴티지(`r_i - \mu / \sigma`)를 **동적으로 가중 평균**(`\hat{A}_i = (1 - \lambda(p)) \cdot \frac{r_i - \mu}{\sigma} + \lambda(p) \cdot \frac{r_i - \mu}{\mu}`)하여 최종 어드밴티지 함수를 구성합니다.

## 주요 결과
**MAPO**는 **Qwen2.5-VL-7B-Instruct** 모델을 기반으로 수학 및 감성 추론 태스크에서 기존 **GRPO** 및 **DAPO**보다 일관되게 우수한 성능을 보였습니다. 롤아웃 수 **G=12**에서 수학 추론 태스크에서 **51.26%**, 감성 추론 태스크에서 **66.77%**의 가장 높은 전체 정확도를 달성했습니다. 이는 **MAPO**가 어드밴티지 역전 및 미러 문제를 효과적으로 완화하고 파운데이션 모델의 안정적이고 정확한 추론 성능을 보장함을 입증합니다.

## AI 실무자를 위한 시사점
**MAPO**는 추가적인 모델 아키텍처나 복잡한 하이퍼파라미터 튜닝 없이 **파운데이션 모델**의 추론 능력을 강화하는 실용적인 방법을 제시합니다. 특히, **다양한 궤적 확실성 수준**을 가진 샘플에 대한 어드밴티지 할당을 최적화함으로써 모델이 더 신뢰성 있는 방향으로 학습되도록 유도합니다. 이는 **대규모 언어 모델(LLM)** 및 **멀티모달 LLM(MLLM)**의 후처리 강화 학습 단계에서 추론 성능과 안정성을 효과적으로 개선할 수 있는 강력한 전략으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.