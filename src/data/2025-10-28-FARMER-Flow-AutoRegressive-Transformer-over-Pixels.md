---
title: "[논문리뷰] FARMER: Flow AutoRegressive Transformer over Pixels"
excerpt: "Zhijie Lin이 [arXiv]에 게시한 'FARMER: Flow AutoRegressive Transformer over Pixels' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Normalizing Flows
  - Autoregressive Models
  - Generative Models
  - Image Synthesis
  - Tractable Likelihood
  - Dimension Reduction
  - Distillation
  - Classifier-Free Guidance

permalink: /ai/review/2025-10-28-FARMER-Flow-AutoRegressive-Transformer-over-Pixels/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23588)

**저자:** Zhijie Lin, Fei Xiao, Tao Yang, Qinyu Zhao, Guangting Zheng



## 핵심 연구 목표
본 논문은 연속적인 autoregressive 모델링이 직면하는 긴 시퀀스 및 고차원 공간 문제를 해결하며, **Normalizing Flows (NF)**와 **Autoregressive (AR)** 모델을 결합하여 픽셀 수준에서 정확한 우도 추정과 고품질 이미지 합성을 위한 단일화된 생성 프레임워크인 **FARMER**를 제시합니다. 궁극적으로 원본 픽셀 데이터에 대한 확장 가능한 연속 AR 모델링의 한계를 극복하는 것을 목표로 합니다.

## 핵심 방법론
**FARMER**는 NF를 활용하여 이미지를 잠재 시퀀스로 변환하고, 이 잠재 시퀀스의 분포는 AR 모델에 의해 암묵적으로 모델링됩니다. 픽셀 수준 모델링의 중복성을 줄이기 위해, NF 잠재 채널을 **정보가 풍부한(informative) 그룹 (Zⁱ)**과 **중복된(redundant) 그룹 (Zᴿ)**으로 분할하는 **자기 지도 차원 축소 (self-supervised dimension reduction)** 방식을 제안합니다. 또한, 추론 속도를 크게 향상시키기 위한 **원스텝 증류(one-step distillation)** 기법과 이미지 생성 품질을 높이는 **리샘플링 기반 Classifier-Free Guidance (CFG)** 알고리즘을 설계했습니다.

## 주요 결과
**FARMER**는 기존 픽셀 기반 생성 모델들과 비교하여 경쟁력 있는 성능을 달성하며 정확한 우도를 제공합니다. 특히, 가장 유사한 기준 모델인 **JetFormer** 대비 **FID를 3.04** 개선하였습니다. 제안된 **자기 지도 차원 축소** 기법은 **FID를 61.17에서 49.29**로, **IS를 22.10에서 30.61**로 향상시켰으며, **원스텝 증류**는 AF 역방향 처리 속도를 **22배**, 전체 추론 속도를 **4배** 가속하면서도 유사한 이미지 품질(FID 5.63 대 5.55)을 유지합니다.

## AI 실무자를 위한 시사점
**FARMER**는 raw 픽셀에서 직접 고품질 이미지를 생성하면서도 **정확한 우도(exact likelihood)**를 제공하여, 데이터 분포 모델링에 대한 강력한 도구를 제공합니다. 특히, **자기 지도 차원 축소**와 **원스텝 증류**는 고차원 시각 데이터의 AR 모델링 및 추론 효율성을 크게 개선하여, 실무적인 응용 가능성을 높입니다. 그러나, 잡음 주입에 의존하는 **역양자화(dequantization)** 및 **로그-결정자(log-determinant) 손실**과 관련된 복잡성은 향후 연구 과제로 남아있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.