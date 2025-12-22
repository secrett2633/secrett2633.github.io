---
title: "[논문리뷰] Turn-PPO: Turn-Level Advantage Estimation with PPO for Improved Multi-Turn RL in Agentic LLMs"
excerpt: "Lihong Li이 [arXiv]에 게시한 'Turn-PPO: Turn-Level Advantage Estimation with PPO for Improved Multi-Turn RL in Agentic LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Turn Reinforcement Learning
  - LLM Agents
  - Proximal Policy Optimization (PPO)
  - Turn-Level MDP
  - Advantage Estimation
  - Generative AI
  - Deep Reinforcement Learning

permalink: /ai/review/2025-12-22-Turn-PPO-Turn-Level-Advantage-Estimation-with-PPO-for-Improved-Multi-Turn-RL-in-Agentic-LLMs/

toc: true
toc_sticky: true

date: 2025-12-22 00:00:00+0900+0900
last_modified_at: 2025-12-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.17008)

**저자:** Junbo Li, Peng Zhou, Rui Meng, Meet P. Vadera, Lihong Li, Yang Li



## 핵심 연구 목표
본 논문은 멀티턴 LLM 에이전트 학습에서 기존 **GRPO(Group Relative Policy Optimization)** 의 불안정성과 비효율성을 해결하고자 합니다. 특히 긴 추론이 필요한 시나리오에서 샘플링 분산이 높고, 턴별 기여도가 불균등하여 불정확한 어드밴티지 추정이 발생하는 문제를 개선하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **GRPO** 의 대안으로 더욱 견고한 **PPO(Proximal Policy Optimization)** 를 재도입하고, 멀티턴 시나리오에 특화된 **Turn-PPO** 를 제안합니다. **Turn-PPO** 는 기존 **토큰-레벨 MDP** 대신 **턴-레벨 MDP** 를 정의하여 각 턴의 전체 입출력을 단일 상태-액션 쌍으로 간주하며, **학습 가능한 Critic 모델** 과 **Generalized Advantage Estimation (GAE)** 을 활용하여 턴-레벨 어드밴티지를 추정합니다.

## 주요 결과
**WebShop** 및 **Sokoban** 데이터셋 실험에서 **PPO 기반 방법론** 이 **GRPO** 를 능가하는 성능과 안정성을 보였습니다. 특히 **Turn-PPO** 는 **GRPO** 에서 나타난 학습 붕괴 현상을 효과적으로 완화하며, **WebShop** 에서 **Qwen2.5-3B** 모델에 대해 **0.75** 의 리워드를 달성했고, **Sokoban** 에서는 **Qwen2.5-3B** 에 대해 **2.29** 의 리워드를 기록하여 **GRPO** 의 0.72 및 1.93과 비교하여 우수한 결과를 보였습니다. 또한 **Turn-PPO** 는 **GAE** 의 하이퍼파라미터 **γ (0.99)** 와 **λ (0.9)** 의 유연한 튜닝을 가능하게 하여 지속적으로 성능을 향상시켰습니다.

## AI 실무자를 위한 시사점
멀티턴 LLM RL에서는 **GRPO** 보다 **PPO 기반 알고리즘** 이 훨씬 더 안정적이고 효율적인 학습을 제공합니다. 특히 AI 실무자는 **Turn-PPO** 의 **턴-레벨 MDP** 프레임워크를 활용하여 Critic 학습을 개선하고 어드밴티지 추정의 정확도를 높일 수 있습니다. 또한, **Critic 학습률을 Actor보다 5-10배 높게 설정** 하고, **배치 내 샘플 다양성** 을 확보하며, **턴-레벨 GAE** 의 **γ=0.99, λ=0.9** 와 같은 하이퍼파라미터 조정을 통해 안정적인 성능 향상을 기대할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.