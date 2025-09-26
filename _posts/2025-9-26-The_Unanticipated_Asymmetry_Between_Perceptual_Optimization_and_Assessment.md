---
title: "[논문리뷰] The Unanticipated Asymmetry Between Perceptual Optimization and
  Assessment"
excerpt: "Du Chen이 [arXiv]에 게시한 'The Unanticipated Asymmetry Between Perceptual Optimization and
  Assessment' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Perceptual Optimization
  - Image Quality Assessment (IQA)
  - Adversarial Training
  - Discriminators
  - Super-Resolution
  - Fidelity Metrics
  - Deep Learning

permalink: /ai/review/2025-9-26-The_Unanticipated_Asymmetry_Between_Perceptual_Optimization_and_Assessment/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.20878)

**저자:** Jiabei Zhang, Qi Wang, Siyu Wu, Du Chen, Tianhe Wu



## 핵심 연구 목표
본 논문은 지각적 최적화(perceptual optimization)를 위한 손실 함수와 이미지 품질 평가(IQA) 지표 간의 상관관계 및 GAN(Generative Adversarial Network) Discriminator의 표현 전이 가능성(transferability)을 체계적으로 분석하여, 이들 역할 사이에 예상치 못한 비대칭성이 존재함을 밝히는 것을 목표로 합니다. 특히, IQA 성능이 우수한 지표가 반드시 최적화에 효과적이지 않으며, Discriminator가 IQA 모델 초기화에 제한적인 이점을 제공함을 탐구합니다.

## 핵심 방법론
단일 이미지 초해상도(SR) 태스크에서 **SwinIR 모델**을 사용하여 지각적 최적화를 탐색했습니다. **DISTS-스타일**의 지각적 손실 함수를 **VGG-16-R, VGG-16, ResNet-50, ConvNeXt, CLIP-ViT, Swin-T** 등 다양한 백본으로 구성하고, **vanilla** 및 **patch-level Discriminator (VGG-16, ResNet-50, DINOv2 백본)**를 활용한 adversarial loss를 결합하여 최적화 실험을 수행했습니다. IQA 모델은 **GAN 훈련된 Discriminator 백본**과 **ImageNet 사전 훈련 백본**으로 초기화하여 성능을 비교했으며, **SRCC** 및 **PLCC** 지표를 통해 FR 및 NR IQA 벤치마크에서 평가했습니다.

## 주요 결과
IQA 성능이 높은 지표가 최적화 효과와 반드시 비례하지 않으며, 특히 adversarial loss가 포함될 때 이러한 비대칭성이 더욱 두드러집니다. 예를 들어, **VGG-16-R**은 낮은 FR-IQA 점수에도 불구하고 일부 최적화 설정에서 **ResNet-50** 및 **CLIP-ViT**를 능가했습니다. Discriminator의 학습된 표현은 아티팩트 억제에 효과적이었으나, IQA 모델 초기화에는 **ImageNet 사전 훈련**이 **가장 효과적**이었고, GAN 기반 초기화는 무작위 초기화 대비 **작은 이득**만 제공했습니다. 또한, **patch-level Discriminator**가 **vanilla** 또는 **Transformer 기반 대안 (DINOv2)**보다 더 충실한 디테일 재구성을 가능하게 하며, 특히 **convolutional Discriminator**가 **+0.52 (VGG-16)** 및 **+0.38 (ResNet-50) 점**의 성능 향상을 보이며 더 안정적인 훈련을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자는 지각적 최적화 손실 함수를 선택할 때 IQA 성능이 높은 지표를 맹목적으로 신뢰하기보다는, 특정 최적화 목표와의 실제 효과를 검증해야 합니다. **Adversarial loss는 이미지 품질 향상과 아티팩트 억제에 매우 중요**하며, 특히 **patch-level Convolutional Discriminator**는 더 나은 디테일과 훈련 안정성을 제공하므로 적극적으로 고려할 필요가 있습니다. Discriminator의 학습된 표현은 직접적인 IQA 모델 초기화에는 **ImageNet 사전 훈련만큼 효과적이지 않으므로**, IQA 모델 개발 시 대규모 데이터셋을 활용한 사전 훈련 전략을 유지하는 것이 바람직합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.