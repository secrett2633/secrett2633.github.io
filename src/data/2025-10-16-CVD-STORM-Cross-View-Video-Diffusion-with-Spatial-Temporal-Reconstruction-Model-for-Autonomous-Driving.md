---
title: "[논문리뷰] CVD-STORM: Cross-View Video Diffusion with Spatial-Temporal
  Reconstruction Model for Autonomous Driving"
excerpt: "Jingcheng Ni이 [arXiv]에 게시한 'CVD-STORM: Cross-View Video Diffusion with Spatial-Temporal
  Reconstruction Model for Autonomous Driving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous Driving
  - Video Generation
  - Diffusion Models
  - Spatial-Temporal Reconstruction
  - 3D Gaussian Splatting
  - Variational Autoencoder
  - World Modeling
  - Multi-View Video

permalink: /ai/review/2025-10-16-CVD-STORM-Cross-View-Video-Diffusion-with-Spatial-Temporal-Reconstruction-Model-for-Autonomous-Driving/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07944)

**저자:** Tianrui Zhang, Yichen Liu, Zilin Guo, Yuxin Guo, Jingcheng Ni



## 핵심 연구 목표
자율 주행을 위한 포괄적인 세계 모델을 구축하기 위해, 다양한 제어 입력 하에 장기간의 다중 시점 비디오를 생성하고 동시에 **4D 장면 재구성** 기능을 제공하는 것을 목표로 합니다. 특히, 기존 비디오 생성 모델들이 명시적인 **3D 정보** 를 다루지 못해 자율 주행 시나리오에 적용하기 어려운 한계를 극복하고자 합니다.

## 핵심 방법론
제안하는 **CVD-STORM** 은 **STORM-VAE** 를 활용한 2단계 전략을 사용합니다. 먼저, **SD3.5 VAE** 에 **Gaussian Splatting Decoder (DGS)** 를 통합하여 이미지 및 **4D 장면 재구성** 임무를 위한 표현 학습을 강화합니다. 이후, 이 **STORM-VAE** 에서 인코딩된 잠재 공간을 입력으로 사용하여 **DiT(Diffusion Transformer) 기반 확산 모델** 을 단일 단계로 학습시키며, **MM-DiT, Temporal, Cross-view 블록** 을 통해 시공간적 일관성과 다중 시점 제어 능력을 확보합니다.

## 주요 결과
**CVD-STORM** 은 **nuScenes** 검증 세트에서 최첨단 성능을 달성했습니다. 기존 **UniMLVG** 모델(FID **5.8** , FVD **36.1** )과 비교하여 **FID 3.8** , **FVD 14.0** 를 기록하며 각각 **34.48%** 와 **61.21%** 의 현저한 성능 향상을 보였습니다. 또한, **Gaussian Splatting Decoder** 를 통해 동적 장면의 정확한 **절대 깊이 정보** 를 효과적으로 재구성할 수 있음을 시각적으로 입증했습니다.

## AI 실무자를 위한 시사점
**STORM-VAE** 를 통한 **4D 장면 재구성** 통합은 자율 주행 세계 모델의 표현 학습을 강화하여 **RGB** 외에 **정확한 3D 구조 및 깊이 정보** 를 생성하는 능력을 제공합니다. 이는 자율 주행 시스템의 **시뮬레이션 및 검증** 에 필수적인 현실적인 환경 모델을 구축하는 데 기여하며, **조기 훈련 단계에서의 빠른 수렴** 은 모델 개발 및 배포 효율성을 높이는 데 실용적인 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.