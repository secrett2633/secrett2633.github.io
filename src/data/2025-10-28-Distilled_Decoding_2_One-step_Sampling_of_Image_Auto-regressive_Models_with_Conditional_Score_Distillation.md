---
title: "[논문리뷰] Distilled Decoding 2: One-step Sampling of Image Auto-regressive Models
  with Conditional Score Distillation"
excerpt: "Guohao Dai이 [arXiv]에 게시한 'Distilled Decoding 2: One-step Sampling of Image Auto-regressive Models
  with Conditional Score Distillation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Auto-regressive Models
  - Image Generation
  - One-step Sampling
  - Model Distillation
  - Conditional Score Distillation
  - Flow Matching
  - Generative Models

permalink: /ai/review/2025-10-28-Distilled_Decoding_2_One-step_Sampling_of_Image_Auto-regressive_Models_with_Conditional_Score_Distillation/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.21003)

**저자:** Enshu Liu, Qian Chen, Xuefei Ning, Guohao Dai, Zinan Lin, Shengen Yan, Yu Wang



## 핵심 연구 목표
이미지 **자기회귀(AR) 모델**의 느린 샘플링 속도 문제를 해결하고, 특히 **원스텝 샘플링** 시 발생하는 성능 저하 및 **Distilled Decoding 1 (DD1)**의 사전 정의된 매핑 의존성 한계를 극복하는 것을 목표로 합니다. 사전 정의된 매핑 없이 AR 모델의 출력 분포와 일치하는 원스텝 생성 모델을 훈련하여 효율적이고 고품질의 이미지 생성을 가능하게 하고자 합니다.

## 핵심 방법론
원래의 AR 모델을 잠재 임베딩 공간에서 조건부 스코어를 제공하는 **조건부 스코어 모델**로 재해석합니다. 이를 기반으로, 원스텝 생성기를 훈련하기 위한 새로운 **조건부 스코어 증류(Conditional Score Distillation, CSD) 손실**을 제안하며, 생성된 분포의 조건부 스코어를 예측하는 별도의 **조건부 가이던스 네트워크**를 훈련합니다. 이 네트워크는 이전 토큰에 조건화된 모든 토큰 위치에서 조건부 스코어 정렬을 목표로 하고, 초기화 단계에서는 **Ground Truth Score (GTS) 손실**을 사용하여 **AR-diffusion 모델**을 사전 튜닝합니다.

## 주요 결과
**ImageNet-256** 데이터셋에서 **VAR 모델**의 경우 FID 3.40에서 5.43으로, **LlamaGen 모델**의 경우 FID 4.11에서 7.58로 **최소한의 FID 증가**를 보이며 원스텝 샘플링을 달성했습니다. 이는 **VAR 모델**에서 **8.0배**, **LlamaGen 모델**에서 **238배**의 속도 향상을 의미합니다. 또한, 가장 강력한 베이스라인인 **DD1**에 비해 원스텝 샘플링과 원본 AR 모델 간의 성능 격차를 **67% 감소**시키고, 훈련 속도를 **최대 12.3배** 단축시켰습니다. **PPL (Perceptual Path Length) 지표**에서도 **DD1**보다 **상당히 더 부드러운 잠재 공간 보간**을 달성했습니다.

## AI 실무자를 위한 시사점
AR 모델의 고질적인 문제였던 느린 추론 속도를 혁신적으로 개선하여 실용적인 이미지 생성 애플리케이션의 가능성을 크게 확장했습니다. **DD2**는 **사전 정의된 매핑 없이** AR 모델의 풍부한 잠재적 분포 정보를 효율적으로 활용하는 새로운 접근 방식을 제시하며, 이는 **모델 증류(model distillation)** 및 **스코어 매칭(score matching)** 기법에 대한 중요한 통찰을 제공합니다. 이를 통해 고품질 이미지 생성이 필요한 다양한 산업 분야에서 AR 모델의 적용 범위를 넓힐 수 있을 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.