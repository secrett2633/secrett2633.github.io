---
title: "[논문리뷰] DiP: Taming Diffusion Models in Pixel Space"
excerpt: "Xu Chen이 [arXiv]에 게시한 'DiP: Taming Diffusion Models in Pixel Space' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Pixel Space
  - Latent Diffusion Models (LDMs)
  - Diffusion Transformer (DiT)
  - Patch Detailer Head
  - Global-Local Modeling
  - Computational Efficiency
  - ImageNet

permalink: /ai/review/2025-12-01-DiP-Taming-Diffusion-Models-in-Pixel-Space/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.18822)

**저자:** Zhennan Chen, Junwei Zhu, Xu Chen, Jiangning Zhang, Xiaobin Hu, Hanzhen Zhao, Chengjie Wang, Jian Yang, Ying Tai



## 핵심 연구 목표
본 연구는 확산 모델(Diffusion Models)의 근본적인 문제인 **생성 품질과 계산 효율성 간의 절충점** 을 해결하는 것을 목표로 합니다. 특히, 잠재 확산 모델(LDMs)의 **정보 손실 및 비엔드-투-엔드 학습** 문제를 극복하고, 기존 픽셀 공간 모델의 **고해상도 합성 시 높은 계산 비용** 문제를 해결하기 위한 효율적인 픽셀 공간 확산 프레임워크를 제안합니다.

## 핵심 방법론
제안된 **DiP** 프레임워크는 생성을 **전역(global) 및 지역(local) 단계** 로 분리합니다. 전역 구조 구성에는 큰 패치(예: **16x16** )에서 작동하는 **Diffusion Transformer (DiT) 백본** 을 사용하며, 미세한 지역 디테일 복원에는 공동 학습된 경량 **Patch Detailer Head** 가 문맥 특징(contextual features)을 활용합니다. **Convolutional U-Net** 아키텍처가 Patch Detailer Head에 채택되었으며, **Post-hoc Refinement** 전략이 최적의 성능과 구현 단순성을 위해 선택되었습니다.

## 주요 결과
**DiP** 는 **ImageNet 256x256** 데이터셋에서 **1.79 FID 점수** 를 달성하여 이전 방법론들을 능가하는 최신 성능을 기록했습니다. 이는 기존 **DiT-XL (2.27 FID)** 및 **SiT-XL (2.06 FID)** 과 같은 LDM을 능가하는 결과입니다. 또한, 이전 픽셀 공간 모델 대비 **최대 10배 빠른 추론 속도** 를 달성하면서도 전체 파라미터 수는 **0.3%** 만 증가했습니다.

## AI 실무자를 위한 시사점
**DiP** 는 고품질 픽셀 공간 이미지 생성을 위한 **VAE-free 솔루션** 을 제공하여 **정보 손실을 줄이고 엔드-투-엔드 학습 파이프라인** 을 가능하게 합니다. **전역-지역 디커플링 설계** 는 고해상도 이미지 생성에서 효율성과 세부 사항 표현 간의 균형을 맞추는 데 중요한 통찰력을 제공하며, **대규모 데이터셋에서의 확산 모델 훈련 및 추론 비용을 효과적으로 절감** 할 수 있는 실용적인 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.