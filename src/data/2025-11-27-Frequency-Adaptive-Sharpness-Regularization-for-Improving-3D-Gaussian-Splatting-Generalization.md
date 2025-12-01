---
title: "[논문리뷰] Frequency-Adaptive Sharpness Regularization for Improving 3D Gaussian Splatting Generalization"
excerpt: "Youngjung Uh이 [arXiv]에 게시한 'Frequency-Adaptive Sharpness Regularization for Improving 3D Gaussian Splatting Generalization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Gaussian Splatting
  - Generalization
  - Sharpness-Aware Minimization
  - Regularization
  - Novel View Synthesis
  - Sparse View Reconstruction
  - Loss Landscape
  - Frequency-Adaptive

permalink: /ai/review/2025-11-27-Frequency-Adaptive-Sharpness-Regularization-for-Improving-3D-Gaussian-Splatting-Generalization/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17918)

**저자:** Youngsik Yun, Dongjun Gu, Youngjung Uh



## 핵심 연구 목표
본 논문은 **3D Gaussian Splatting (3DGS)** 이 few-shot 시나리오에서 sparse observations에 과적합되어 novel viewpoints에 대한 일반화 성능이 저하되는 문제를 해결하고자 합니다. **3DGS** 의 최적화 과정을 머신러닝의 일반화 문제로 재구성하고, loss landscape의 flat minima를 찾아 더 나은 일반화 솔루션으로 수렴하도록 유도하는 최적화 알고리즘을 제안하는 것이 주된 연구 목적입니다.

## 핵심 방법론
저자들은 **Frequency-Adaptive Sharpness Regularization (FASR)** 을 제안하며, 이는 **3DGS** 훈련 목표를 재구성하여 일반화 성능을 향상시킵니다. 기존 **Sharpness-Aware Minimization (SAM)** 의 한계(고주파 디테일의 과도한 스무딩)를 극복하기 위해, **FASR** 은 이미지의 로컬 주파수를 반영하여 로컬 샤프니스 추정 시 정규화 가중치와 인접 반경을 조절합니다. 구체적으로, 각 **Gaussian** 속성별로 샤프니스를 개별적으로 추정하고, **Laplacian of Gaussian (LoG)** 을 사용하여 얻은 스케일 맵 기반의 주파수에 따라 perturbation magnitude와 정규화 가중치를 적응적으로 설정합니다.

## 주요 결과
본 방법은 **LLFF (3 views)** 및 **MipNeRF-360 (12 views)** 데이터셋에서 **3DGS** , **CoR-GS** , **DropGaussian** , **NexusGS** , **SE-GS** 를 포함한 다양한 베이스라인의 성능을 일관되게 향상시켰습니다. 특히, **LLFF (3 views)** 데이터셋의 **3DGS** 에서 **PSNR** 은 **19.810** 에서 **20.783** 으로, **SSIM** 은 **0.6790** 에서 **0.7197** 로, **LPIPS** 는 **0.2145** 에서 **0.1965** 로 개선되었습니다. 또한, **FASR** 은 novel viewpoints에서 floating artifacts를 줄이고 기하학적 부정확성을 수정하며, 동적 장면에서 시간적 일관성도 향상시킵니다.

## AI 실무자를 위한 시사점
**FASR** 은 **3DGS** 의 일반화 성능을 향상시키는 효과적인 최적화 전략을 제공하여, sparse-view 설정에서도 고품질의 3D 재구성을 가능하게 합니다. 이 방법은 기존 **3DGS** 기반 프레임워크에 쉽게 통합될 수 있어, 추가적인 아키텍처 변경 없이 성능 개선을 기대할 수 있습니다. 특히, **FASR** 은 훈련 과정의 **마지막 12.5%** 에만 적용하여 계산 비용을 크게 절감하면서도 효과적인 성능 향상을 달성하여 실용적인 가치가 높습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.