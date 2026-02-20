---
title: "[논문리뷰] Multiplex Thinking: Reasoning via Token-wise Branch-and-Merge"
excerpt: "arXiv에 게시된 'Multiplex Thinking: Reasoning via Token-wise Branch-and-Merge' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Reasoning
  - Chain-of-Thought
  - Reinforcement Learning
  - Stochastic Reasoning
  - Continuous Representation
  - Token Efficiency

permalink: /ai/review/2026-01-20-Multiplex-Thinking-Reasoning-via-Token-wise-Branch-and-Merge/

toc: true
toc_sticky: true

date: 2026-01-20 00:00:00+0900+0900
last_modified_at: 2026-01-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.08808)

**저자:** Yao Tang, Li Dong, Yaru Hao, Qingxiu Dong, Furu Wei, Jiatao Gu



## 핵심 연구 목표
대규모 언어 모델(LLM)의 Chain-of-Thought (CoT) 추론이 길고 저대역폭의 이산 토큰 시퀀스를 생성하는 문제점을 해결하고, 인간처럼 여러 가능한 다음 단계에 대한 분포를 유지하며 추론하는 **확률적이고 샘플링 기반의 연속적 추론 메커니즘** 을 개발하는 것을 목표로 합니다. 이를 통해 이산 샘플링의 동역학을 보존하면서 추론 과정을 압축하고 탐색 효율성을 높이고자 합니다.

## 핵심 방법론
본 연구는 **Multiplex Thinking** 이라는 기법을 제안합니다. 각 추론 단계에서 모델의 토큰 분포로부터 **K개의 독립적인 이산 토큰** 을 샘플링한 후, 이들의 임베딩을 **단일 연속 Multiplex Token** 으로 통합합니다. 이 토큰은 다시 LLM의 입력으로 사용되며, 샘플링된 토큰의 독립성 가정 덕분에 **Multiplex Token** 의 확률 분포가 명확하게 정의되어 **on-policy 강화 학습(RL)** 을 통한 직접적인 최적화가 가능합니다.

## 주요 결과
**Multiplex Thinking** 은 다양한 수학 추론 벤치마크에서 **Pass@1부터 Pass@1024까지** 강력한 **discrete CoT** 및 **RL baseline** 보다 일관되게 우수한 성능을 달성했습니다. 특히, **더 짧은 시퀀스** 로 더 높은 정확도를 보여 토큰 효율성을 입증했으며, 예를 들어 **Multiplex Thinking-I-4k** 는 **discrete CoT-5k** 와 동일한 성능을 **20% 더 짧은 시퀀스** 로 달성했습니다. 또한, 훈련 중 **더 낮은 엔트로피 감소율** 을 보여 조기 확신을 방지하고 지속적인 탐색 능력을 유지함을 시사합니다.

## AI 실무자를 위한 시사점
**Multiplex Thinking** 은 LLM 추론의 토큰 효율성을 크게 향상시켜, 추론 과정의 **연산 비용과 지연 시간을 줄이는** 실용적인 방법을 제공합니다. 이 기술은 단일 토큰 내에서 여러 가능한 경로에 대한 분포를 인코딩함으로써 복잡한 문제 해결 시 **다양한 추론 경로를 탐색** 하는 LLM의 능력을 강화할 수 있습니다. 이는 **강화 학습** 을 통해 보다 강력하고 효율적인 추론 모델을 개발하기 위한 새로운 길을 열어줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.