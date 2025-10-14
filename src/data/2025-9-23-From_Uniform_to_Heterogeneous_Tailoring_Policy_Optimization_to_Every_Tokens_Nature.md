---
title: "[논문리뷰] From Uniform to Heterogeneous: Tailoring Policy Optimization to Every
  Token's Nature"
excerpt: "Bin Cui이 [arXiv]에 게시한 'From Uniform to Heterogeneous: Tailoring Policy Optimization to Every
  Token's Nature' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLMs
  - Policy Optimization
  - Token Heterogeneity
  - Adaptive Sampling
  - Advantage Redistribution
  - Asymmetric Clipping
  - Entropy-based RL

permalink: /ai/review/2025-9-23-From_Uniform_to_Heterogeneous_Tailoring_Policy_Optimization_to_Every_Tokens_Nature/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.16591)

**저자:** Zheng Liu, Mengjie Liu, Siwei Wen, Mengzhang Cai, Bin Cui, Conghui He, Wentao Zhang



## 핵심 연구 목표
기존 **RLHF (Reinforcement Learning from Human Feedback)** 알고리즘이 LLM의 추론 과정에서 토큰의 다양한 역할을 무시하고 모든 토큰에 균일한 최적화를 적용하는 한계를 해결하는 것을 목표로 합니다. 토큰의 본질적인 이질성을 인식하고 각 토큰의 특성(특히 엔트로피)에 맞게 최적화 전략을 조정하여 LLM의 추론 능력을 향상시키는 것입니다.

## 핵심 방법론
논문은 토큰 엔트로피를 기반으로 최적화를 동적으로 조정하는 포괄적인 **Heterogeneous Adaptive Policy Optimization (HAPO)** 프레임워크를 제안합니다. 이 프레임워크는 **Adaptive Temperature Sampling**을 통해 토큰 엔트로피에 따라 샘플링 온도를 조절하고, **Token-Level Group Average**로 이점을 토큰 수준에서 정규화하여 기울기 편향을 해소합니다. 또한, **Differential Advantage Redistribution**으로 엔트로피와 중요도 비율을 활용하여 이점을 조절하며, **Asymmetric Adaptive Clipping**으로 엔트로피에 따라 클리핑 경계를 비대칭적으로 조정합니다.

## 주요 결과
**HAPO**는 다양한 모델 스케일에서 **DAPO** baseline 대비 일관된 성능 향상을 입증했습니다. 특히 **Qwen2.5-Math-7B** 모델에서 **AIME24** 벤치마크에서 **2.86%** 포인트, **AIME25** 벤치마크에서 **2.44%** 포인트의 정확도 향상을 달성했습니다. 전반적으로 **HAPO**는 모든 모델 스케일에서 평균 **1.97%에서 3.07%**의 정확도 이득을 보였으며, 기존 엔트로피 기반 접근 방식보다 **2.80-4.41%** 더 우수한 성능을 나타냈습니다. 또한, **HAPO**는 모델의 탐색 능력을 성공적으로 보존하며 더 긴 응답 길이와 높은 엔트로피를 유지합니다.

## AI 실무자를 위한 시사점
**HAPO**는 LLM의 RLHF 최적화 과정에서 토큰 이질성을 활용하는 것의 중요성을 강조하며, 이는 특히 **수학적 추론**과 같은 복잡한 태스크에서 모델의 성능을 크게 향상시킬 수 있음을 보여줍니다. 이 프레임워크는 **negligible한 계산 오버헤드**로 기존 RLHF 파이프라인에 쉽게 통합될 수 있어, 실제 **AI/ML 시스템**에서 LLM의 추론 능력과 안정성을 개선하기 위한 실용적이고 효율적인 방법론을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.