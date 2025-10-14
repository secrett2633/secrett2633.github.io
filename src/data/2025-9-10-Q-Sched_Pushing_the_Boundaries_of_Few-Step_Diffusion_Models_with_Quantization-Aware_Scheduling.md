---
title: "[논문리뷰] Q-Sched: Pushing the Boundaries of Few-Step Diffusion Models with
  Quantization-Aware Scheduling"
excerpt: "Diana Marculescu이 [arXiv]에 게시한 'Q-Sched: Pushing the Boundaries of Few-Step Diffusion Models with
  Quantization-Aware Scheduling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Quantization
  - Few-Step Generation
  - Model Compression
  - Noise Scheduling
  - Post-Training Quantization
  - Image Quality Metrics
  - Latent Consistency Models

permalink: /ai/review/2025-9-10-Q-Sched_Pushing_the_Boundaries_of_Few-Step_Diffusion_Models_with_Quantization-Aware_Scheduling/

toc: true
toc_sticky: true

date: 2025-09-10 13:11:01+0900
last_modified_at: 2025-09-10 13:11:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01624)

**저자:** Natalia Frumkin, Diana Marculescu



## 핵심 연구 목표
본 논문은 계산 비용이 높은 텍스트-이미지 확산 모델의 **추론 효율성**을 개선하는 것을 목표로 합니다. 특히, 기존 소수 단계(few-step) 확산 모델이 여전히 대규모 모델 백본에 의존하고 기존 후속 훈련 양자화(PTQ) 방법론이 완전 정밀도(full-precision) 캘리브레이션을 요구하는 한계를 극복하여, 양자화 모델의 크기를 줄이면서도 이미지 생성 품질을 유지하고자 합니다.

## 핵심 방법론
저자들은 **Q-Sched**라는 새로운 **양자화-인지 스케줄링(quantization-aware scheduling)** 패러다임을 제안합니다. 이는 모델 가중치가 아닌 확산 모델의 **스케줄러**를 수정하여 양자화를 수행합니다. 특히, **양자화-인지 사전 조건화 계수(quantization-aware pre-conditioning coefficients)**를 학습하며, 이를 위해 **참조 없는(reference-free)** 새로운 손실 함수인 **JAQ (Joint Alignment-Quality) loss**를 도입합니다. **JAQ loss**는 **텍스트-이미지 호환성(text-image compatibility)**과 **순수 이미지 품질(pure image quality)**을 균형 있게 고려합니다.

## 주요 결과
**Q-Sched**는 모델 크기를 **4배 축소**하면서도 완전 정밀도 정확도를 달성합니다. **FP16 4단계 Latent Consistency Model** 대비 **15.5% FID 향상**, **FP16 8단계 Phased Consistency Model** 대비 **16.6% FID 향상**을 보였습니다. 또한, **SDXL-Turbo**의 **W4A8** 설정에서 **FID 21.41**을 기록하여 **MixDQ(25.36)** 및 **Naive(25.75)**보다 우수한 성능을 나타냈습니다. **FLUX.1[schnell]** 및 **SDXL-Turbo**에 대한 대규모 사용자 연구에서도 **인지된 이미지 품질** 면에서 기존 양자화 방법론들을 능가함을 확인했습니다.

## AI 실무자를 위한 시사점
**Q-Sched**는 양자화와 소수 단계(few-step) 증류를 상호 보완적인 모델 압축 전략으로 결합하여, 리소스 제약이 있는 환경에서도 대규모 확산 모델을 효율적으로 배포할 수 있는 실질적인 방법을 제공합니다. 특히, **모델 가중치 대신 스케줄러를 최적화**하는 접근 방식과 **참조 없는 JAQ loss**는 완전 정밀도 모델 없이도 **후속 훈련 양자화(PTQ)**를 수행할 수 있어 AI 개발 및 배포의 유연성을 크게 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.