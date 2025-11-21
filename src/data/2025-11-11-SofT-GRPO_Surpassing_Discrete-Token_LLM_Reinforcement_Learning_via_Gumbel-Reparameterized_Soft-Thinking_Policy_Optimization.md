---
title: "[논문리뷰] SofT-GRPO: Surpassing Discrete-Token LLM Reinforcement Learning via   Gumbel-Reparameterized Soft-Thinking Policy Optimization"
excerpt: "이 [arXiv]에 게시한 'SofT-GRPO: Surpassing Discrete-Token LLM Reinforcement Learning via   Gumbel-Reparameterized Soft-Thinking Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM
  - Reinforcement Learning
  - Soft-Thinking
  - Gumbel Reparameterization
  - Policy Optimization
  - Chain-of-Thought (CoT)
  - GRPO

permalink: /ai/review/2025-11-11-SofT-GRPO_Surpassing_Discrete-Token_LLM_Reinforcement_Learning_via_Gumbel-Reparameterized_Soft-Thinking_Policy_Optimization/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06411)

**저자:** Zhi Zheng, Wee Sun Lee



## 핵심 연구 목표
본 논문은 이산 토큰 **Chain-of-Thought (CoT)** 추론에 효과적인 기존의 **Reinforcement Learning (RL)** 방법론, 특히 **Group Relative Policy Optimization (GRPO)**이 연속적인 **Soft-Thinking** 패턴에는 적용하기 어렵다는 문제를 해결하고자 합니다. 기존 Soft-Thinking + GRPO 방식이 이산 토큰 GRPO 대비 성능이 저조했던 한계를 극복하고, Soft-Thinking LLM의 추론 능력을 강화하여 이산 토큰 GRPO를 능가하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **SofT-GRPO**는 롤아웃 과정에서 Soft-Thinking 토큰의 출력 로짓에 **Gumbel noise**를 주입하여 통제 가능한 확률적 요소를 도입합니다. 또한, **Gumbel-Softmax 기법**을 활용하여 생성된 Soft-Thinking 토큰이 사전 훈련된 임베딩 공간 내에 유지되도록 보장합니다. 정책 업데이트 단계에서는 **Gumbel 분포의 재매개변수화 트릭**을 활용하여 정확한 기울기 추정을 가능하게 함으로써 LLM의 출력 확률 분포에 대한 보상 개선을 정밀하게 기여할 수 있도록 합니다.

## 주요 결과
**SofT-GRPO**는 **DeepSeek-R1-Distill-Qwen-1.5B, LLaMA-3.2-3B-Instruct, DeepSeek-R1-Distill-Qwen-7B** 등 다양한 LLM에서 Soft-Thinking 방식의 성능을 향상시켰습니다. 특히, **Pass@1**에서 이산 토큰 GRPO 대비 평균 **+0.13%**의 정확도 향상을 보였으며, **Pass@32**에서는 평균 **+2.19%**의 상당한 정확도 향상을 달성했습니다. 또한, **LLaMA-3.2-3B-Instruct** 모델의 추론 길이를 효과적으로 단축시켜 **토큰 효율성**을 개선하는 이점도 확인되었습니다.

## AI 실무자를 위한 시사점
**SofT-GRPO**는 LLM의 **Soft-Thinking 추론 패러다임**을 강화하기 위한 효과적인 **RLVR(Reinforcement Learning with Verifiable Rewards)** 알고리즘을 제공합니다. 이는 이산 토큰 기반 추론의 한계를 넘어 LLM이 더 추상적인 개념을 표현하고 복잡한 추론 경로를 탐색할 수 있도록 돕습니다. 특히, **Gumbel 재매개변수화**를 통한 안정적인 정책 최적화와 **토큰 효율성 향상**은 대규모 LLM의 실제 적용 및 배포 시 **성능과 비용 효율성**을 동시에 개선할 수 있는 중요한 가능성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.