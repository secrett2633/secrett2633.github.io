---
title: "[논문리뷰] Quantile Rendering: Efficiently Embedding High-dimensional Feature on 3D Gaussian Splatting"
excerpt: "이 [arXiv]에 게시한 'Quantile Rendering: Efficiently Embedding High-dimensional Feature on 3D Gaussian Splatting' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Gaussian Splatting
  - Open-vocabulary Segmentation
  - Neural Rendering
  - High-dimensional Features
  - Quantile Sampling
  - Real-time Rendering
  - Feature Distillation

permalink: /ai/review/2025-12-30-Quantile-Rendering-Efficiently-Embedding-High-dimensional-Feature-on-3D-Gaussian-Splatting/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.20927)

**저자:** Yoonwoo Jeong 1,2,†, Cheng Sun¹, Frank Wang¹, Minsu Cho², Jaesung Choe¹



## 핵심 연구 목표
이 논문은 **3D Gaussian Splatting (3D-GS)** 기반의 Open-vocabulary segmentation (OVS)에서 **512-차원 CLIP 특징** 과 같은 고차원 특징을 효율적으로 렌더링하는 문제를 해결하는 것을 목표로 합니다. 기존 방식들이 특징 압축이나 코드북 사용으로 정보 손실을 야기하거나, 밀집 샘플링으로 인한 높은 연산 비용을 수반하는 한계를 극복하고자 합니다.

## 핵심 방법론
연구진은 새로운 렌더링 전략인 **Quantile Rendering (Q-Render)** 을 제안하여, 광선(ray)을 따라 영향력이 큰 **'quantile Gaussians'** 만을 희소하게 샘플링하고 알파 블렌딩합니다. Q-Render는 **Gaussian Splatting Network (GS-Net)** 이라는 일반화 가능한 3D 신경망에 통합되어 2D foundation 모델의 특징을 3D Gaussian 특징으로 효과적으로 증류(distill)합니다. 훈련 과정에서는 **CLIP vision encoder** 에서 추출된 특징과 **Grounded-SAM2** 를 통해 얻은 마스크를 이용한 **contrastive loss** 를 활용하여 특징을 최적화합니다.

## 주요 결과
제안된 Q-Render와 GS-Net은 ScanNet 및 LeRF-OVS 데이터셋에서 기존 최신 방법론들을 능가하는 성능을 보였습니다. 특히, ScanNet 데이터셋에서 **GS-Mink (ours)** 는 **19개 클래스에 대해 50.75 mIoU** 를 달성했으며, **512-차원 특징 맵 렌더링 시 약 43.7배의 속도 향상** 을 이루어 실시간 렌더링을 가능하게 했습니다. 또한, **Dr.Splat 대비 메모리 사용량을 61.13GB에서 27.18GB로 크게 줄였습니다.**

## AI 실무자를 위한 시사점
이 연구는 고차원 특징을 사용하는 3D 장면 이해 태스크에서 **실시간 성능과 높은 정확도를 동시에 달성** 할 수 있는 효과적인 방법을 제시합니다. **Q-Render** 는 효율적인 렌더링을 가능하게 하여 **3D-GS 기반의 시스템 확장성** 을 크게 높였으며, 대규모 고차원 특징의 정보 손실 없는 활용을 가능하게 합니다. AI/ML 엔지니어는 이를 통해 **대화형 3D 콘텐츠 생성, 로봇 비전, 가상현실** 등 고차원 특징 렌더링이 필요한 다양한 응용 분야에서 효율적인 모델을 개발할 수 있을 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.