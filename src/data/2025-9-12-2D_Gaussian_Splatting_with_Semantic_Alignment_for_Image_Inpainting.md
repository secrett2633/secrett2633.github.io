---
title: "[논문리뷰] 2D Gaussian Splatting with Semantic Alignment for Image Inpainting"
excerpt: "Guangming Lu이 [arXiv]에 게시한 '2D Gaussian Splatting with Semantic Alignment for Image Inpainting' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Inpainting
  - 2D Gaussian Splatting
  - Semantic Alignment
  - DINO Features
  - Patch-level Rasterization
  - Continuous Representation
  - Generative Models

permalink: /ai/review/2025-9-12-2D_Gaussian_Splatting_with_Semantic_Alignment_for_Image_Inpainting/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01964)

**저자:** Hongyu Li, Chaofeng Chen, Xiaoming Li, Guangming Lu



## 핵심 연구 목표
본 논문은 기존 이미지 인페인팅 방법론의 이산적인 픽셀 처리 방식이 갖는 한계를 극복하고, **2D Gaussian Splatting(2DGS)**의 연속적인 특성을 활용하여 픽셀 수준의 일관성과 전역적인 의미론적 정합성을 갖춘 고품질 이미지 인페인팅 프레임워크를 개발하는 것을 목표로 합니다.

## 핵심 방법론
제안된 프레임워크는 불완전한 이미지를 **U-Net 인코더**를 통해 학습된 **2D Gaussian Splat 계수**의 연속적인 필드로 인코딩하고, 미분 가능한 **래스터화(Rasterization) 프로세스**를 통해 이미지를 재구성합니다. 고해상도 처리를 위해 **패치-레벨 래스터화 전략**을 도입하여 메모리 사용량과 추론 속도를 최적화했으며, 전역적인 의미 일관성을 위해 **사전 훈련된 DINO 모델의 특징**을 **Adaptive Layer Normalization(AdaLN)** 기반으로 통합하여 의미론적 가이드를 제공합니다.

## 주요 결과
제안된 방법은 **CelebA-HQ** 및 **Places2** 등 표준 벤치마크에서 경쟁력 있는 성능을 달성했으며, 특히 CelebA-HQ(Small mask)에서 **FID 6.38, LPIPS 0.028**을 기록하여 대부분의 최신 모델과 비교하여 우수하거나 대등한 결과를 보였습니다. 또한, **32.52ms**의 빠른 추론 속도를 보여 **확산(diffusion) 모델 (RePaint: 79035.84ms)** 및 Transformer 기반 모델보다 현저히 효율적임을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **2D Gaussian Splatting**을 2D 이미지 처리, 특히 인페인팅에 적용하는 새로운 방향을 제시하여 이미지 복원 및 편집 분야의 혁신 가능성을 열었습니다. **패치-레벨 래스터화 전략**은 고해상도 이미지 처리 시 GPU 메모리 제약을 완화하는 실용적인 해결책을 제공하며, **DINO 특징 기반의 의미론적 정렬**은 사실적인 이미지 생성을 위한 전역적 일관성 확보에 중요한 통찰을 줍니다. 이러한 효율성과 품질은 실제 AI 애플리케이션에 매우 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.