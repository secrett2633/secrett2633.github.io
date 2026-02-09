---
title: "[논문리뷰] Back to Basics: Revisiting Exploration in Reinforcement Learning for LLM Reasoning via Generative Probabilities"
excerpt: "Ivan Oseledets이 [arXiv]에 게시한 'Back to Basics: Revisiting Exploration in Reinforcement Learning for LLM Reasoning via Generative Probabilities' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Reasoning
  - Exploration-Exploitation
  - Group Relative Policy Optimization
  - Entropy Collapse
  - Generative Models
  - Confidence-Aware Rewards

permalink: /ai/review/2026-02-09-Back-to-Basics-Revisiting-Exploration-in-Reinforcement-Learning-for-LLM-Reasoning-via-Generative-Probabilities/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.05281)

**저자:** Pengyi Li, Elizaveta Goncharova, Andrey Kuznetsov, Ivan Oseledets



## 핵심 연구 목표
본 논문은 LLM 추론에서 **RLVR(Reinforcement Learning with Verifiable Rewards)** 훈련 시 발생하는 **엔트로피 붕괴(entropy collapse)** 및 **모드 붕괴(mode collapse)** 문제를 해결하는 것을 목표로 합니다. 표준 정책 최적화가 높은 가능성을 가진 경로를 과도하게 강화하여 출력 다양성이 제한되는 문제를 개선하고, 탐색(exploration)과 활용(exploitation) 사이의 더 나은 균형을 달성하고자 합니다.

## 핵심 방법론
제안된 **ProGRPO(Probabilistic based GRPO)** 는 기존 **GRPO** 를 확장하여 **ARM(Advantage Re-weighting Mechanism)** 을 도입합니다. ARM은 프롬프트의 **프롬프트 퍼플렉시티(Prompt Perplexity)** 와 답변의 **확신도(Answer Confidence)** 를 활용하여 어드밴티지 함수를 재구성합니다. 특히, 확신도는 모델이 생성한 답변의 **낮은 확률 토큰 길이 정규화된 우도(low-probability token length normalized likelihood)** , 즉 가장 불확실한 **20%의 토큰(Tlow)** 에 집중하여 계산됩니다.

## 주요 결과
**ProGRPO** 는 경쟁력 있는 정확도를 유지하면서 생성 다양성과 응답 엔트로피를 크게 향상했습니다. **Qwen2.5-7B** 모델에서 **GRPO** 대비 **Pass@1 성능을 5.7%** , **Pass@32 성능을 13.9%** 향상시키는 정량적 성과를 보였습니다. 또한, 코드 생성 벤치마크인 **LiveCodeBench** 에서는 **Avg@16 점수 36.47** , **Pass@16 점수 54.12** 를 달성하며 **GRPO** 보다 각각 **+1.53** , **+0.36** 높은 점수를 기록했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 RL 기반 미세 조정 시 발생하는 **모드 붕괴** 를 효과적으로 완화하여, 추론 과정에서 더욱 다양하고 견고한 솔루션을 얻을 수 있는 실용적인 방법을 제시합니다. **모델의 자체 확신도 신호** 를 보상 함수 설계에 통합하는 것이 정확도를 희생하지 않고 탐색 능력을 개선할 수 있음을 보여줍니다. 특히, **불확실한 토큰(Tlow)** 에 초점을 맞춘 확신도 추정은 효율적인 신호 활용의 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.