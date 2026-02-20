---
title: "[논문리뷰] Stabilizing MoE Reinforcement Learning by Aligning Training and
  Inference Routers"
excerpt: "arXiv에 게시된 'Stabilizing MoE Reinforcement Learning by Aligning Training and
  Inference Routers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - MoE
  - Reinforcement Learning
  - Training Stability
  - Routing
  - Policy Alignment
  - Rollout Routing Replay
  - LLMs

permalink: /ai/review/2025-10-27-Stabilizing-MoE-Reinforcement-Learning-by-Aligning-Training-and-Inference-Routers/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.11370)

**저자:** Wenhan Ma†‡*, Hailin Zhang†, Liang Zhao* (Co-corresponding authors), Yudong Wang+‡, Zhifang Sui†, Yifan Song+‡, Fuli Luo§



## 핵심 연구 목표
본 논문은 **Mixture-of-Experts (MoE) 모델** 의 강화 학습(RL) 훈련 과정에서 발생하는 불안정성, 특히 **훈련-추론 간 라우팅 동작의 불일치** 로 인한 **정책 KL 발산** 및 **훈련 붕괴 문제** 를 해결하는 것을 목표로 합니다. 이는 MoE 모델의 동적 라우팅 메커니즘이 훈련과 추론 단계 사이에 큰 정책 불일치를 유발하여 **Catastrophic RL Collapse** 를 초래할 수 있기 때문입니다.

## 핵심 방법론
저자들은 이러한 문제를 해결하기 위해 **Rollout Routing Replay (R3)** 라는 방법을 제안합니다. **R3** 는 추론 엔진에서 생성된 시퀀스의 **라우팅 분포** ( **Iinfer** )를 기록하고 이를 훈련 엔진에서 재사용하는 방식입니다. 이 과정에서 **Iinfer** 는 훈련 시 라우터 로짓( **Strain,i** )에 소프트맥스를 적용하여 그레디언트 흐름을 보존하면서 라우팅 마스크로 사용되어 **훈련과 추론 간의 라우팅 동작을 정렬** 합니다.

## 주요 결과
**R3** 적용 후 **Qwen3-30B-A3B (MoE)** 모델의 훈련-추론 **KL 발산** 이 **1.535×10^-3** 에서 **7.5×10^-4** 로 크게 감소하여, **Dense 모델** 의 **6.4×10^-4** 와 유사한 수준에 도달했습니다. 또한, 큰 확률 불일치를 보이는 토큰의 비율이 **약 10배** 감소했습니다. **수학적 추론 태스크** 에서 **R3** 는 기존 **GSPO** 및 **TIS** 보다 안정성과 성능을 향상시켰으며, 특히 **GRPO+R3** 는 **SWE 벤치마크 태스크** 에서 **Pass@1 38.6** 을 달성하여 **GRPO** 단독 대비 **6.8 포인트** 높은 성능을 보여주며 훈련 붕괴를 방지했습니다.

## AI 실무자를 위한 시사점
**R3** 는 **MoE 기반 LLM** 의 RL 훈련 시 발생하는 고질적인 **훈련-추론 불일치 문제** 에 대한 효과적이고 실용적인 해결책을 제시합니다. **라우팅 마스크 캐싱** 과 결합하여 **멀티턴 대화 시스템** 등 복잡한 에이전트 시나리오에서도 추가적인 계산 오버헤드 없이 안정적인 훈련을 가능하게 합니다. AI/ML 엔지니어는 **R3** 를 통해 **MoE 모델의 확장성** 을 유지하면서도 **RL 기반 파인튜닝의 안정성과 성능** 을 크게 향상시킬 수 있을 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.