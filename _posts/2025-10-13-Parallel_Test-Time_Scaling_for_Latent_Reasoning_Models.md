---
title: "[논문리뷰] Parallel Test-Time Scaling for Latent Reasoning Models"
excerpt: "이 [arXiv]에 게시한 'Parallel Test-Time Scaling for Latent Reasoning Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Latent Reasoning
  - Test-Time Scaling
  - Parallel Inference
  - Stochastic Sampling
  - Monte Carlo Dropout
  - Additive Gaussian Noise
  - Latent Reward Model
  - Trajectory Aggregation

permalink: /ai/review/2025-10-13-Parallel_Test-Time_Scaling_for_Latent_Reasoning_Models/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07745)

**저자:** Runyang You, Yongqi Li, Meng Liu, Wenjie Wang, Liqiang Nie, Wenjie Li



## 핵심 연구 목표
본 논문은 **latent reasoning models**가 연속적인 벡터 공간에서 추론을 수행함에도 불구하고, 기존 **token-based models**처럼 **parallel Test-Time Scaling (TTS)**의 이점을 활용하지 못하는 문제를 해결하는 것을 목표로 합니다. 특히 연속 공간에서의 샘플링 메커니즘 부재와 효과적인 궤적 집계를 위한 확률적 신호 부족이라는 근본적인 한계를 극복하고자 합니다.

## 핵심 방법론
이 연구는 **latent reasoning**을 위한 두 가지 **stochastic sampling** 전략인 **Monte Carlo Dropout (MC-dropout)**과 **Additive Gaussian Noise (AGN)**를 제안합니다. **MC-dropout**은 추론 시에도 드롭아웃을 활성화하여 **epistemic uncertainty**를, **AGN**은 **가우시안 노이즈(N(0, $\sigma^2$I))**를 직접 주입하여 **aleatoric uncertainty**를 모델링합니다. 또한, **Latent Reward Model (LatentRM)**을 도입하여 각 추론 단계에서 잠재적 사고의 품질을 평가하며, 이는 **단계별 대조적 목적 함수(step-wise contrastive objective)**와 **M=128개의 stochastic rollouts**를 통해 학습됩니다.

## 주요 결과
실험 결과, **MC-dropout**과 **AGN** 모두 샘플 수 **N** 증가에 따라 **coverage**가 단조롭게 증가하며 효과적인 스케일링을 보여주었습니다. 특히, **MC-dropout**은 거의 모든 **N** 값에서 더 높은 **coverage**를 일관되게 달성했습니다. **LatentRM**을 통한 **Best-of-N** 및 **Beam Search** 집계는 **Majority Voting**을 지속적으로 능가하며 (예: GSM-Test에서 Best-of-N이 Majority Voting 대비 **약 2%p 높은 정확도**), **단계별 대조 손실**과 **확률적 롤아웃**이 LatentRM 성능에 결정적임을 **정량적 수치(35.4% vs 33.5% vs 30.7%)**로 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **continuous latent space**에서 **parallel TTS**를 구현하는 실용적인 방법을 제시하여 **AI 모델의 추론 효율성과 확장성**을 높일 수 있는 새로운 방향을 열었습니다. 실무자들은 **MC-dropout** 및 **AGN**을 활용하여 **latent reasoning**에서 **다양한 추론 경로**를 생성하고, **LatentRM**을 통해 이러한 경로를 효과적으로 **평가 및 집계**함으로써 모델의 성능을 향상시킬 수 있습니다. 하지만 **MC-dropout 확률(p)** 및 **AGN 노이즈 스케일($\sigma$)**과 같은 **하이퍼파라미터 튜닝**은 최적의 성능을 위해 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.