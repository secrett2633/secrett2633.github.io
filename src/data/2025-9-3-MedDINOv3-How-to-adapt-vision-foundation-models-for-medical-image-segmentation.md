---
title: "[논문리뷰] MedDINOv3: How to adapt vision foundation models for medical image
  segmentation?"
excerpt: "Xiaofeng Yang이 [arXiv]에 게시한 'MedDINOv3: How to adapt vision foundation models for medical image
  segmentation?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Medical Image Segmentation
  - Vision Foundation Models
  - Self-supervised Learning
  - Vision Transformers (ViT)
  - Domain Adaptation
  - DINOv3
  - CT Imaging

permalink: /ai/review/2025-9-3-MedDINOv3-How-to-adapt-vision-foundation-models-for-medical-image-segmentation/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.02379)

**저자:** Yuheng Li, Yizhou Wu, Yuxiang Lai, Mingzhe Hu, Xiaofeng Yang



## 핵심 연구 목표
의료 영상 분할에서 **Vision Foundation Models (FMs)** 의 효과적인 적용을 저해하는 두 가지 핵심 과제, 즉 **ViT 백본** 이 특수화된 **CNN** 보다 낮은 성능을 보이는 문제와 자연 이미지와 의료 이미지 간의 큰 **도메인 격차** 를 해결하는 것을 목표로 합니다. 궁극적으로 의료 영상 분할을 위한 통일된 백본으로서 FM의 잠재력을 실현하고자 합니다.

## 핵심 방법론
**MedDINOv3** 는 **DINOv3** 를 의료 영상 분할에 적응시키기 위한 프레임워크입니다. 먼저, 일반 **ViT** 를 재검토하여 **멀티스케일 토큰 집계** 와 **고해상도 훈련** 을 통해 효과적인 2D 의료 영상 분할 아키텍처를 설계합니다. 다음으로, **CT-3M** 이라는 **3.87M** 개의 축방향 CT 슬라이스로 구성된 대규모 데이터셋을 활용하여 **글로벌/로컬 self-distillation** , **Gram anchoring** , **고해상도 적응** 의 세 단계를 거치는 **도메인 적응형 사전 훈련** 을 수행합니다.

## 주요 결과
**MedDINOv3** 는 네 가지 공용 CT/MRI 벤치마크 (AMOS22, BTCV, KiTS23, LiTS)에서 기존 **CNN** 및 **Transformer** 모델과 동등하거나 이를 능가하는 성능을 보였습니다. 특히, **AMOS22** OAR 분할에서 **nnU-Net** 대비 **+2.57% DSC** , **BTCV** 에서 **+5.49% DSC** 성능 향상을 달성했습니다. 아키텍처 개선(멀티스케일 토큰 집계, 고해상도 훈련)만으로 **AMOS22** 에서 **ViT-B** 의 **DSC** 를 **78.39%** 에서 **85.51%** 로 향상시켰습니다.

## AI 실무자를 위한 시사점
**Vision Foundation Models** 이 의료 영상 분할 분야에서 **강력한 성능** 을 발휘할 수 있음을 보여주며, 이는 의료 AI 애플리케이션의 **일반화 가능성** 과 **확장성** 을 크게 향상시킬 수 있습니다. 특히, **대규모 도메인 적응형 사전 훈련** 과 **ViT 아키텍처의 특정 개선** ( **멀티스케일 토큰 집계** , **고해상도 훈련** )이 의료 도메인 특화 모델 개발에 필수적인 요소임을 시사합니다. 이는 기존의 태스크별 모델 개발 방식에서 벗어나, 범용 백본을 활용한 효율적인 개발 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.