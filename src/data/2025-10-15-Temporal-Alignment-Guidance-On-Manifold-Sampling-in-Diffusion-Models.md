---
title: "[논문리뷰] Temporal Alignment Guidance: On-Manifold Sampling in Diffusion Models"
excerpt: "이 [arXiv]에 게시한 'Temporal Alignment Guidance: On-Manifold Sampling in Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Generative Models
  - Guidance
  - On-Manifold Sampling
  - Temporal Alignment
  - Score Approximation Error
  - Training-Free Guidance

permalink: /ai/review/2025-10-15-Temporal-Alignment-Guidance-On-Manifold-Sampling-in-Diffusion-Models/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.11057)

**저자:** Youngrok Park, Hojung Jung, Sangmin Bae, Se-Young Yun



## 핵심 연구 목표
논문은 Diffusion 모델이 외부 가이던스(guidance)를 적용할 때 발생하는 'off-manifold' 현상으로 인해 생성된 샘플이 실제 데이터 manifold에서 벗어나 품질이 저하되는 문제를 해결하고자 합니다. 이 문제는 score approximation 오류가 시간에 따라 누적되어 비현실적인 출력을 초래하는 것이 핵심입니다. 따라서 모든 timestep에서 샘플이 desired manifold에 정렬되도록 하여 생성 품질을 향상시키는 일반적인 솔루션을 제안하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 'Temporal Alignment Guidance' ( **TAG** )를 제안합니다. 이는 **time predictor** 를 활용하여 각 timestep에서 desired data manifold로부터의 편차를 추정합니다. 핵심은 **Time-Linked Score (TLS)** (즉, $\nabla_x \log p_\phi(t|x)$)라는 새로운 가이던스 메커니즘을 설계하여 샘플을 모델의 학습된 score가 신뢰할 수 있는 고밀도 영역으로 끌어당기는 것입니다. **TAG** 는 기존 score function에 이 **TLS** 항을 추가하여 작동하며, 경량 **CNN** 또는 **EGNN** 기반의 **time predictor** 를 사용하여 효율성을 유지합니다.

## 주요 결과
**TAG** 는 다양한 태스크에서 생성 품질을 크게 향상시켰습니다. TFG 벤치마크에서 **CIFAR10** 기준, **TFG+TAG** 는 **FID 102.7** 을 달성하여 **TFG** 의 **114.1** 보다 우수하며, **정확도(Acc.)는 61.5%** 로 **TFG** 의 **55.8%** 를 상회했습니다. Few-step generation (NFE 1)에서는 **CIFAR10** 에서 **FID** 를 **460.0** 에서 **271.1** 로 약 **41.1% 감소** 시켰습니다. 대규모 텍스트-투-이미지 생성에서는 **DAS+TAG** 가 Aesthetic score를 **7.948** 에서 **9.087** 로 높이고 Time-Gap을 **90.04** 에서 **28.84** 로 크게 줄였습니다.

## AI 실무자를 위한 시사점
**TAG** 는 Diffusion 모델의 생성 품질과 신뢰성을 향상시키는 강력하고 범용적인 솔루션을 제공합니다. 특히 외부 가이던스가 적용되어 off-manifold 문제가 발생하기 쉬운 시나리오에서 효과적입니다. 경량 **time predictor** 덕분에 계산 효율성이 높아 다양한 모달리티와 기존 프레임워크에 쉽게 적용 가능하며, 값비싼 모델 fine-tuning 없이도 복잡한 조건부 생성, 소수 스텝 샘플링, 텍스트-투-이미지 생성 등 실제 응용에서 높은 fidelity를 달성할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.