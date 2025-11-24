---
title: "[논문리뷰] ΔL Normalization: Rethink Loss Aggregation in RLVR"
excerpt: "Lili Qiu이 [arXiv]에 게시한 'ΔL Normalization: Rethink Loss Aggregation in RLVR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLMs
  - Gradient Variance
  - Loss Aggregation
  - Unbiased Estimator
  - RLVR
  - Policy Gradient
  - Normalization

permalink: /ai/review/2025-9-10-ΔL-Normalization-Rethink-Loss-Aggregation-in-RLVR/

toc: true
toc_sticky: true

date: 2025-09-10 13:11:01+0900
last_modified_at: 2025-09-10 13:11:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.07558)

**저자:** Zhiyuan He, Xufang Luo, Yike Zhang, Yuqing Yang, Lili Qiu



## 핵심 연구 목표
이 논문은 **Verifiable Rewards를 사용하는 강화 학습 (RLVR)** 환경에서 응답 길이의 동적 변화로 인해 발생하는 문제에 주목합니다. 특히 응답 길이의 큰 변동성으로 인한 **높은 기울기 분산**과 **불안정한 최적화** 문제를 해결하고, 기존의 손실 집계 방식들이 겪는 **편향된 추정** 또는 **높은 기울기 분산**의 한계를 극복하여 안정적이고 효율적인 학습을 목표로 합니다.

## 핵심 방법론
본 논문은 **ΔL Normalization**이라는 새로운 손실 집계 방법을 제안합니다. 이 방법은 기울기 추정 문제를 **최소 분산 비편향 추정기(Minimum Variance Unbiased Estimator)** 프레임워크로 재정의합니다. 제안된 방법은 각 샘플의 비정규화된 기울기에 **$x_i = (1/M) * (L_i^{\alpha} / \sum L_j^{\alpha})$** 가중치를 부여하며, 특히 **$\alpha=1$**일 때 이론적으로 **최소 분산**을 달성하면서 **비편향성**을 유지합니다. 기존 방법론인 **GRPO**, **DAPO**, **Dr. GRPO**의 한계를 분석하고, ΔL Normalization이 이들보다 낮은 **변동계수(CV)**를 제공함을 증명합니다.

## 주요 결과
**ΔL Normalization**은 **Qwen2.5-3B** 및 **Qwen2.5-7B** 모델을 사용한 **CountDown** 및 **Math** 태스크에서 일관되게 우수한 성능을 보였습니다. 예를 들어, CountDown 3B 모델(3072 길이)에서 **Avg@8 점수 0.847**, **Pass@8 점수 0.938**을 달성하며 GRPO Norm의 0.811/0.928을 능가했습니다. 또한, 모든 설정에서 가장 높은 **단조성 점수(Monotonicity Score)인 평균 0.98** 이상을 기록하여 훈련 안정성이 크게 향상되었음을 입증했습니다.

## AI 실무자를 위한 시사점
AI/ML 실무자들은 **RLVR 환경**에서 대규모 언어 모델(LLM)을 학습시킬 때 **ΔL Normalization**을 사용하여 **학습 안정성과 최종 모델 성능을 크게 향상**시킬 수 있습니다. 이 방법은 단 **10줄 미만의 코드 변경**만으로 구현이 가능하며, 특히 응답 길이 변동성이 큰 태스크에서 **높은 기울기 분산** 문제를 효과적으로 완화하여 **더욱 빠르고 안정적인 수렴**을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.