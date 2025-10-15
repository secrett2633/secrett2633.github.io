---
title: "[논문리뷰] ASPO: Asymmetric Importance Sampling Policy Optimization"
excerpt: "Xiu Li이 [arXiv]에 게시한 'ASPO: Asymmetric Importance Sampling Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Importance Sampling
  - Policy Optimization
  - PPO-Clip
  - Outcome-Supervised RL
  - Token Weighting
  - GRPO

permalink: /ai/review/2025-10-8-ASPO_Asymmetric_Importance_Sampling_Policy_Optimization/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06062)

**저자:** Jiakang Wang, Runze Liu, Lei Lin, Wenping Hu, Xiu Li, Fuzheng Zhang, Guorui Zhou, Kun Gai



## 핵심 연구 목표
본 논문은 **Large Language Model (LLM)**의 **Outcome-Supervised Reinforcement Learning (OSRL)** 훈련에서 **GRPO** 기반 방법론의 근본적인 문제점을 해결하는 것을 목표로 합니다. 특히, **PPO-Clip**의 토큰 수준 클리핑 메커니즘에서 발생하는 **양의 이점 토큰(positive-advantage tokens)의 Importance Sampling (IS) 비율 불일치**로 인한 불균형한 토큰 가중치 문제를 식별하고 해결하고자 합니다. 이는 조기 수렴, 엔트로피 붕괴 및 과도한 반복을 유발합니다.

## 핵심 방법론
저자들은 **Asymmetric Importance Sampling Policy Optimization (ASPO)**을 제안합니다. ASPO는 **양의 이점 토큰의 IS 비율을 역전**시켜, 낮은 확률을 가진 토큰이 더 강한 업데이트를 받도록 하고 높은 확률을 가진 토큰은 가중치를 줄입니다. 또한, 극단적인 업데이트를 안정화하면서도 그래디언트 흐름을 유지하기 위해 **soft dual-clipping 메커니즘**을 통합하여, 기존 **GRPO** 방식의 한계를 극복합니다.

## 주요 결과
ASPO는 수학적 추론 및 코딩 벤치마크(예: **LiveCodeBench v5/v6**, **AIME24/25**, **MATH-500**)에서 기존 **GRPO** 기반 모델보다 우수한 성능을 보였습니다. 특히, ASPO는 기본 모델 대비 수학 작업에서 **12.5%**, 코딩 작업에서 **17.0%**의 성능 향상을 달성했습니다. 또한, 엔트로피 붕괴를 현저히 완화하고, 훈련 안정성을 향상시키며, **DAPO** 및 기타 강력한 GRPO 기반 기준선보다 최종 성능을 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 RL 훈련에서 **토큰 수준 가중치**의 중요성과 **Importance Sampling**의 역할에 대한 중요한 통찰력을 제공합니다. AI 실무자들은 **PPO-Clip** 구현 시 **양의 이점 토큰에 대한 IS 비율 불일치**가 훈련 안정성과 모델 성능에 미치는 영향을 인지해야 합니다. ASPO는 이러한 문제를 해결하는 효과적인 방법을 제시하여, 더욱 안정적이고 고성능의 LLM 미세 조정을 가능하게 하는 실용적인 가이드라인을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.