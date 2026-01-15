---
title: "[논문리뷰] Efficient Camera-Controlled Video Generation of Static Scenes via Sparse Diffusion and 3D Rendering"
excerpt: "Ayush Tewari이 [arXiv]에 게시한 'Efficient Camera-Controlled Video Generation of Static Scenes via Sparse Diffusion and 3D Rendering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Diffusion Models
  - 3D Reconstruction
  - 3D Gaussian Splatting
  - Camera-Controlled
  - Sparse Keyframes
  - Real-time
  - Computational Efficiency

permalink: /ai/review/2026-01-15-Efficient-Camera-Controlled-Video-Generation-of-Static-Scenes-via-Sparse-Diffusion-and-3D-Rendering/

toc: true
toc_sticky: true

date: 2026-01-15 00:00:00+0900+0900
last_modified_at: 2026-01-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.09697)

**저자:** Jieying Chen, Jeffrey Hu, Joan Lasenby, Ayush Tewari



## 핵심 연구 목표
본 논문은 확산 모델 기반 비디오 생성의 높은 계산 비효율성 문제를 해결하고, 정적 장면에 대한 **카메라 제어 비디오 생성** 을 위한 효율적인 프레임워크를 제안하는 것을 목표로 합니다. 특히, 기존 모델이 모든 프레임을 신경망으로 생성하는 방식에서 벗어나 비디오 데이터의 내재된 중복성을 활용하여 실시간 상호작용이 필요한 애플리케이션에 적용 가능하도록 하는 것이 중요합니다.

## 핵심 방법론
제안하는 **SRENDER** 방법은 먼저 **Keyframe Density Predictor** 라는 **트랜스포머 기반 모델** 을 사용하여 주어진 카메라 궤적에 따라 최적의 키프레임 수를 예측합니다. 이후 **History-Guided Diffusion Model** 을 통해 이 **sparse keyframes** 를 생성하고, 생성된 키프레임들을 기반으로 **AnySplat** 을 활용하여 **3D Gaussian Splatting (3DGS)** 표현으로 장면을 재구성합니다. 마지막으로, 재구성된 3D 장면에서 전체 비디오를 효율적으로 렌더링하며, 긴 궤적의 경우 **temporal chunks** 를 사용하여 일관성을 유지합니다.

## 주요 결과
**SRENDER** 는 DL3DV 데이터셋에서 20초 길이의 30fps 비디오를 생성할 때 기존 확산 기반 모델(HG) 대비 **약 43배 빠르게** 동작하며, 평균 **16.21초** 만에 실시간에 가까운 **37.01 fps** 의 생성 속도를 달성했습니다. RE10K 데이터셋에서는 **23.71배 빠른** **9.552초** 의 속도를 보였습니다. 또한, FID 및 FVD 지표에서 HG 모델보다 우수하거나 유사한 비디오 품질과 시간적 일관성을 유지함을 정량적으로 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 고품질 비디오 생성 모델의 주요 병목인 계산 비용을 획기적으로 줄여 **실시간 AI 애플리케이션(예: 임베디드 AI, VR/AR)** 에 비디오 생성 기술을 적용할 수 있는 실용적인 길을 열었습니다. 확산 모델의 생성 능력과 **3D 재구성(3DGS)** 의 효율성을 결합한 하이브리드 접근 방식은 자원 효율적인 모델 설계의 중요성을 강조하며, **adaptive keyframe selection** 은 계산 자원 최적화에 대한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.