---
title: "[논문리뷰] Shorter but not Worse: Frugal Reasoning via Easy Samples as Length
  Regularizers in Math RLVR"
excerpt: "arXiv에 게시된 'Shorter but not Worse: Frugal Reasoning via Easy Samples as Length
  Regularizers in Math RLVR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLMs
  - RLVR
  - Length Regularization
  - Mathematical Reasoning
  - Data Curation
  - Model Efficiency
  - Emergent Brevity

permalink: /ai/review/2025-11-5-Shorter-but-not-Worse-Frugal-Reasoning-via-Easy-Samples-as-Length-Regularizers-in-Math-RLVR/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01937)

**저자:** Abdelaziz Bounhar, Hadi Abdine, Evan Dufraisse, Ahmad Chamma, Amr Mohamed, Dani Bouch, Michalis Vazirgiannis, Guokan Shang



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 단계별 추론 과정에서 지나치게 장황해져 추론 비용이 증가하는 문제를 해결하는 것이 목표입니다. 기존 **RLVR(Reinforcement Learning with Verifiable Rewards)** 훈련 파이프라인에서 "쉬운" 문제를 걸러내는 방식이 모델이 "더 오래 생각하는 것"과 "더 잘 생각하는 것"을 혼동하게 만드는 경향을 바로잡고자 합니다.

## 핵심 방법론
본 연구는 **Qwen3-4B-Thinking-2507** 모델을 사용하여 **GRPO (Group Relative Policy Optimization)** 기반의 **두 단계 RLVR 훈련 파이프라인** 을 제안합니다. **Stage 1 (Emergent Brevity)** 에서는 의도적으로 보통 난이도의 쉬운 문제 비율을 높인 데이터셋으로 훈련하여, 모델이 **16k-토큰 컨텍스트 내** 에서 간결하고 효율적인 추론 경로를 학습하도록 암묵적인 길이 정규화를 유도합니다. **Stage 2 (Curriculum RLVR)** 에서는 **DeepMath-103 데이터셋** 에서 선별된 문제들을 점진적으로 도입하며 난이도를 높여 모델의 추론 능력을 확장하면서도 간결성을 유지합니다.

## 주요 결과
**Frugal-Math-4B-Stage2** 모델은 평균 **Pass@1 정확도 68.55%** 와 **EAA(Efficiency Adjusted Accuracy) 52.86** 를 달성하여, 베이스 모델( **정확도 61.72%, EAA 8.32** ) 대비 **정확도 +6.83%** , **EAA +44.54** 라는 상당한 개선을 보였습니다. Frugal-Math-4B 모델들은 평균 솔루션 길이를 베이스 모델의 **11,491 토큰** 에서 **Stage 1에서 6,270 토큰** , **Stage 2에서 5,712 토큰** 으로 약 절반 가까이 단축했습니다. 특히, **AIME25** 및 **Omni-Hard** 와 같은 어려운 수학 추론 태스크에서 **55-61% 적은 토큰** 으로도 동등하거나 더 높은 정확도를 유지하며 간결성과 정확성이 동시에 향상되었음을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 LLM의 추론 효율성을 높이기 위해 명시적인 길이 페널티 없이 **학습 데이터 큐레이션 전략** 을 활용하여 암묵적인 길이 정규화를 구현할 수 있습니다. 다양한 난이도의 샘플을 포함하고 "쉬운" 문제에 적절한 가중치를 부여하는 접근 방식은 모델이 불필요하게 장황해지는 것을 방지하고, 제한된 컨텍스트 환경에서 리소스 효율적인 추론 모델을 구축하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.