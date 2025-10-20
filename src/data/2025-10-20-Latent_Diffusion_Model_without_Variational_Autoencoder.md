---
title: "[논문리뷰] Latent Diffusion Model without Variational Autoencoder"
excerpt: "이 [arXiv]에 게시한 'Latent Diffusion Model without Variational Autoencoder' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Latent Diffusion Model
  - Variational Autoencoder
  - Self-supervised Learning
  - DINO Features
  - Generative Models
  - Image Generation
  - Training Efficiency
  - Unified Representation

permalink: /ai/review/2025-10-20-Latent_Diffusion_Model_without_Variational_Autoencoder/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15301)

**저자:** Minglei Shi, Haolin Wang, Wenzhao Zheng, Ziyang Yuan, Xiaoshi Wu, Xintao Wang, Pengfei Wan, Jie Zhou, Jiwen Lu



## 핵심 연구 목표
기존 잠재 확산 모델(LDM)이 **VAE(Variational Autoencoder)**의 한계로 인해 훈련 비효율성, 느린 추론 속도, 낮은 전이 학습 능력을 보이는 문제를 해결하고자 합니다. 특히 VAE 잠재 공간의 **의미적 분리 부족**과 **명확한 판별 구조 부재**가 이러한 문제의 원인임을 지적하며, 이를 극복할 새로운 접근 방식을 제안합니다.

## 핵심 방법론
본 논문은 **VAE 없이** **SVG(Self-supervised representations for Visual Generation)**라는 새로운 LDM을 제안합니다. SVG는 **고정된 DINO 특징**을 활용하여 명확한 의미 판별력을 가진 특징 공간을 구축하고, **경량 잔여 브랜치(lightweight residual branch)**를 추가하여 미세한 지각적 세부 사항을 포착해 고품질 재구성을 가능하게 합니다. 확산 모델은 이 의미적으로 구조화된 잠재 공간에서 **Flow Matching 목표 함수**를 사용하여 직접 훈련됩니다.

## 주요 결과
SVG-XL 모델은 25 샘플링 스텝에서 **3.36의 gFID**를 달성했으며, 이는 기존 VAE 기반 모델인 DiT-XL과 SiT-XL의 gFID 9.62 및 9.35(250 스텝)보다 훨씬 우수합니다(Table 1). 또한, SVG는 유사한 FID 점수 달성을 위해 **62배 빠른 훈련 수렴**과 **35배 빠른 추론 속도**를 보였습니다(Figure 1e, 1f). 이미지 생성 외에도 DINOv3의 원래 **의미적 판별 능력**을 보존하여 ImageNet 분류, ADE20K 의미 분할 등 다운스트림 태스크에서 경쟁력 있는 성능을 입증했습니다(Table 4).

## AI 실무자를 위한 시사점
이 연구는 **자기지도 학습(SSL) 기반 특징**이 생성 모델의 효율성과 품질을 극대화할 수 있는 잠재력을 보여줍니다. **VAE를 제거하고 DINO와 같은 비전 파운데이션 모델(VFM)의 특징을 직접 활용**하는 접근 방식은 모델 훈련 시간과 추론 비용을 획기적으로 줄여, 고품질 이미지 생성 시스템의 실제 배포를 가속화할 수 있습니다. SVG의 **통합된 특징 공간**은 생성과 다양한 시각 인식 태스크를 동시에 지원하여, 다목적 AI 모델 개발에 중요한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.