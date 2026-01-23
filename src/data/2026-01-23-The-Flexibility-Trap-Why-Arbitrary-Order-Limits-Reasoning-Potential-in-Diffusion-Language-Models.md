---
title: "[논문리뷰] The Flexibility Trap: Why Arbitrary Order Limits Reasoning Potential in Diffusion Language Models"
excerpt: "이 [arXiv]에 게시한 'The Flexibility Trap: Why Arbitrary Order Limits Reasoning Potential in Diffusion Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Reasoning
  - Reinforcement Learning
  - Autoregressive Models
  - Generation Order
  - Entropy Degradation
  - Pass@k
  - GRPO

permalink: /ai/review/2026-01-23-The-Flexibility-Trap-Why-Arbitrary-Order-Limits-Reasoning-Potential-in-Diffusion-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.15165)

**저자:** Zanlin Ni, Shenzhi Wang, Yang Yue, Tianyu Yu, Weilin Zhao, Yeguo Hua, Tianyi Chen, Jun Song, Cheng Yu, Bo Zheng, Gao Huang



## 핵심 연구 목표
이 논문은 Diffusion Large Language Models (dLLMs)의 핵심 이점으로 여겨지는 **임의 순서(arbitrary order) 생성 능력** 이 실제 추론 잠재력을 제한한다는 역설적인 현상을 밝히고, dLLM의 추론 능력을 더 효과적으로 이끌어내기 위한 **새로운 RL 방법론** 을 제시하는 것을 목표로 합니다. 특히, 임의 순서 생성이 고 불확실성 토큰을 우회하여 추론 탐색 공간을 조기에 축소시키는 문제를 해결하고자 합니다.

## 핵심 방법론
저자들은 dLLMs가 불확실한 '포킹 토큰'을 우회하고 낮은 엔트로피 토큰을 우선 처리하는 경향을 **'엔트로피 저하(entropy degradation)'** 로 규명하며, 이것이 추론 경로의 조기 붕괴로 이어진다고 분석했습니다. 이 문제를 해결하기 위해, RL 훈련 단계에서 **임의 순서 생성을 명시적으로 포기** 하고 dLLM을 표준 **Autoregressive (AR) 모델** 처럼 취급하여, 복잡한 확산 특정 RL 적응 없이 표준 **Group Relative Policy Optimization (GRPO)** 을 적용하는 **JustGRPO** 를 제안합니다. 추론 시에는 dLLM의 **병렬 디코딩 능력** 을 유지하도록 설계되었습니다.

## 주요 결과
**JustGRPO** 는 복잡한 추론 벤치마크에서 기존의 복잡한 확산 특정 RL 방법론을 능가하는 경쟁력 있는 결과를 달성했습니다. **GSM8K 벤치마크** 에서 **89.1%** 의 정확도를 기록하여 이전 최고 성능인 **SPG** 를 **3.0%p** 앞질렀고, **MATH-500** 에서도 **45.1%** 의 정확도로 **ESPO** 대비 **6.1%p** 향상되었습니다. **Pass@k** 분석 결과, AR 순서로 훈련된 모델이 임의 순서 모델보다 더 넓은 솔루션 공간을 탐색하며 더 나은 스케일링 성능을 보였습니다. 또한, JustGRPO는 훈련 시 AR 제약을 가했음에도 **병렬 디코딩 능력** 을 완전히 유지하며, 병렬성이 증가할수록 정확도 향상이 더욱 두드러졌습니다.

## AI 실무자를 위한 시사점
이 연구는 dLLMs의 '임의 순서 생성'이라는 유연성이 항상 이점인 것은 아니며, 오히려 추론 능력을 저해할 수 있음을 보여줌으로써 dLLM 개발에 대한 중요한 통찰을 제공합니다. AI 실무자는 dLLM의 **추론 능력 향상** 을 위해 훈련 시 **Autoregressive(AR) 제약** 을 적용하는 **JustGRPO** 와 같은 방식을 고려할 수 있습니다. 이는 복잡한 확산 모델 전용 RL 기법의 필요성을 재고하고 **모델 개발 및 최적화 과정을 단순화** 하는 데 기여할 수 있습니다. 또한, 훈련 단계에서의 AR 제약이 추론 시 **병렬 디코딩 성능** 과 양립 가능하다는 점은 효율적인 추론 깊이와 속도를 동시에 확보할 수 있음을 의미합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.