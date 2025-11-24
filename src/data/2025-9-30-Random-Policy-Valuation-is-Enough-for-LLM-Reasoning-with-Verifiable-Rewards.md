---
title: "[논문리뷰] Random Policy Valuation is Enough for LLM Reasoning with Verifiable
  Rewards"
excerpt: "Binxing Jiao이 [arXiv]에 게시한 'Random Policy Valuation is Enough for LLM Reasoning with Verifiable
  Rewards' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Reasoning
  - Policy Valuation
  - Markov Decision Process
  - Diversity
  - Math Reasoning
  - Verifiable Rewards

permalink: /ai/review/2025-9-30-Random-Policy-Valuation-is-Enough-for-LLM-Reasoning-with-Verifiable-Rewards/

toc: true
toc_sticky: true

date: 2025-09-30 13:52:24+0900
last_modified_at: 2025-09-30 13:52:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.24981)

**저자:** Haoran He, Yuxiao Ye, Qingpeng Cai, Chen Hu, Binxing Jiao, Daxin Jiang, Ling Pan



## 핵심 연구 목표
현재 LLM 추론을 위한 **RLVR(Reinforcement Learning with Verifiable Rewards)** 방법론(예: PPO, GRPO)은 일반적인 제어 설정에 맞춰 설계되어 학습 불안정성 및 다양성 붕괴와 같은 문제에 직면합니다. 본 논문은 LLM 수학 추론 태스크의 본질적인 **유한-시간(finite-horizon), 결정론적(deterministic), 트리 구조(tree-structured) MDP(Markov Decision Process)** 특성을 활용하여, 품질과 다양성을 모두 유지하는 **최소주의적(minimalist)이며 효과적인 RLVR 알고리즘**을 개발하는 것을 목표로 합니다.

## 핵심 방법론
이 연구는 최적의 행동이 **고정된 균일 무작위 정책(uniformly random policy)의 Q-함수** 평가를 통해 직접 도출될 수 있음을 증명하며, 복잡한 정책 반복(GPI) 과정을 우회합니다. 제안된 **ROVER(Random Policy Valuation for Diverse Reasoning)**는 이러한 Q-값을 기반으로 **소프트맥스(softmax)를 통해 행동을 샘플링**하여 다양성을 조절하고, Q-함수를 LLM의 파라미터로 내재적으로 표현하는 **상대적 Q-함수(relative Q-function)**를 사용하여 학습 안정성을 높입니다. 또한, **평균 중심 보상(mean-centered rewards)** 기법을 활용하여 보상 신호의 분산을 줄이고 학습 효율성을 향상시킵니다.

## 주요 결과
**ROVER**는 AIME24, AIME25, HMMT25 등 표준 수학 추론 벤치마크에서 기존의 강력한 RLVR 방법론(DAPO, REINFORCE++, GRPO, PPO)을 일관되게 능가합니다. 특히, **Qwen3-8B-Base** 모델에서 **pass@1에서 +8.2, pass@256에서 +16.8의 평균 성능 향상**을 달성했습니다. 더불어, 기존 방법 대비 **+17.6%의 높은 다양성**을 보이며, 기본 모델이나 다른 RL 방법론에서는 발견되지 않았던 **새로운 추론 전략**들을 찾아내는 능력을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 추론에 **강화 학습을 적용할 때 복잡성을 대폭 줄이면서도 우수한 성능**을 유지할 수 있음을 보여줍니다. 이는 LLM의 학습 안정성을 개선하고, 복잡한 하이퍼파라미터 튜닝 없이도 다양한 추론 경로를 탐색하여 **pass@k 지표 향상과 문제 해결의 일반화 능력**을 높이는 데 기여합니다. **ROVER**는 기존 RL 접근 방식의 단점을 극복하고, LLM 기반 에이전트의 개발과 응용에 있어 더 효율적이고 강력한 대안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.