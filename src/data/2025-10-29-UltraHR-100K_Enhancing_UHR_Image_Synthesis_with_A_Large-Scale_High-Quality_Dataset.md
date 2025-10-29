---
title: "[논문리뷰] UltraHR-100K: Enhancing UHR Image Synthesis with A Large-Scale
  High-Quality Dataset"
excerpt: "이 [arXiv]에 게시한 'UltraHR-100K: Enhancing UHR Image Synthesis with A Large-Scale
  High-Quality Dataset' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Ultra-High-Resolution
  - Text-to-Image Generation
  - Diffusion Models
  - Large-Scale Dataset
  - Frequency-Aware Training
  - Detail Enhancement
  - Image Synthesis

permalink: /ai/review/2025-10-29-UltraHR-100K_Enhancing_UHR_Image_Synthesis_with_A_Large-Scale_High-Quality_Dataset/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20661)

**저자:** Chen Zhao, En Ci, Yunzhe Xu, Tiehan Fan, Shanyan Guan, Yanhao Ge, Jian Yang, Ying Tai



## 핵심 연구 목표
본 논문은 초고해상도(UHR) Text-to-Image (T2I) 생성 시 직면하는 두 가지 주요 문제, 즉 **대규모 고품질 UHR 데이터셋의 부재**와 **미세한 디테일 합성을 위한 맞춤형 훈련 전략의 부족**을 해결하는 것을 목표로 합니다. 이를 통해 UHR 이미지 생성 모델의 **시각적 충실도와 세부 표현 능력**을 향상시키고자 합니다.

## 핵심 방법론
저자들은 먼저 100K개 이상의 3K 해상도 UHR 이미지와 풍부한 캡션을 포함하는 **UltraHR-100K 데이터셋**을 구축했습니다. 또한, 세부 표현 능력을 강화하기 위해 **주파수 인식 후처리 훈련(FAPT) 방법**을 제안했는데, 이는 **Detail-Oriented Timestep Sampling (DOTS)**과 **Soft-Weighting Frequency Regularization (SWFR)**로 구성됩니다. **DOTS**는 **Beta 분포**를 사용하여 미세한 디테일과 관련된 후반부 denoising 단계에 훈련을 집중시키고, **SWFR**은 **Discrete Fourier Transform (DFT)**을 활용하여 고주파 디테일 보존을 촉진합니다.

## 주요 결과
**UltraHR-eval4K (4096x4096)** 벤치마크에서 제안된 방법은 **FID 31.748**, **FID_patch 15.795**를 달성하여 SOTA 모델들 대비 뛰어난 성능을 보였습니다. 특히, **FID_patch** 점수에서 미세한 디테일 생성 능력의 상당한 향상을 입증했습니다. 사용자 연구에서도 **전반적인 품질 70%**, **디테일 품질 78%**, **텍스트-이미지 정렬 72%**의 우위를 확보했습니다.

## AI 실무자를 위한 시사점
**UltraHR-100K** 데이터셋은 **고품질 UHR 이미지 생성 모델 개발**을 위한 귀중한 자원으로 활용될 수 있습니다. **DOTS**와 **SWFR**과 같은 **주파수 인식 훈련 전략**은 diffusion 모델의 **미세한 디테일 표현 능력**을 향상시키는 데 효과적이며, 이는 디지털 아트, 가상 콘텐츠 제작 등 **고해상도 이미지가 필수적인 분야**의 AI 애플리케이션에 직접적인 기여를 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.