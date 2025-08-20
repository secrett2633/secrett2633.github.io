---
title: "[논문리뷰] LongSplat: Robust Unposed 3D Gaussian Splatting for Casual Long Videos"
excerpt: "Yen-Yu Lin이 [arXiv]에 게시한 'LongSplat: Robust Unposed 3D Gaussian Splatting for Casual Long Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Novel View Synthesis
  - 3D Gaussian Splatting
  - Unposed Reconstruction
  - Camera Pose Estimation
  - Incremental Optimization
  - Octree
  - Long Videos

permalink: /ai/review/2025-8-20-LongSplat_Robust_Unposed_3D_Gaussian_Splatting_for_Casual_Long_Videos/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.14041)

**저자:** Chin-Yang Lin, Cheng Sun, Min-Hung Chen, Yen-Yu Lin, Fu-En Yang, Yu-Lun Liu



## 핵심 연구 목표
본 논문은 불규칙한 카메라 움직임, 알 수 없는 카메라 자세, 방대한 장면 크기 등 일반적인 긴 비디오에서 발생하는 **Novel View Synthesis (NVS)의 핵심 문제**를 해결하고자 합니다. 특히 **자세 표류(pose drift)**, 부정확한 초기 형상, 심각한 메모리 제약 문제를 극복하여 견고하고 정확한 3D 재구성을 목표로 합니다.

## 핵심 방법론
본 연구는 **LongSplat**이라는 견고한 비정형 3D Gaussian Splatting (3DGS) 프레임워크를 제안합니다. 주요 기술로는 카메라 자세와 3D Gaussians를 동시에 최적화하여 전역적 일관성을 보장하는 **점진적 공동 최적화(Incremental Joint Optimization)** 방식, 학습된 3D 사전 지식(prior)을 활용한 **강건한 자세 추정 모듈(Robust Pose Estimation Module)**, 그리고 공간 밀도에 기반하여 조밀한 포인트 클라우드를 앵커로 변환하는 효율적인 **옥트리 앵커 형성(Octree Anchor Formation)** 메커니즘을 통합합니다.

## 주요 결과
LongSplat은 Free, Tanks and Temples, Hike 데이터셋에서 최신 기술 대비 우수한 성능을 입증했습니다. Free 데이터셋에서 평균 **PSNR 27.88**, **SSIM 0.85**, **LPIPS 0.17**로 렌더링 품질을 크게 향상시켰습니다. 또한, Free 데이터셋에서 **ATE 0.028**, **RPE 0.103**로 자세 정확도를 개선했으며, **281.71 FPS**의 렌더링 속도와 **1시간 이내의 학습 시간**, **101MB의 모델 크기**로 계산 효율성 또한 획기적으로 개선했습니다.

## AI 실무자를 위한 시사점
LongSplat은 **사전 카메라 자세 정보가 없는** 일반적인 비디오에서도 고품질 NVS를 가능하게 하여 VR/AR, 비디오 편집 등 다양한 실용 응용 분야에 큰 잠재력을 제공합니다. 특히 **점진적 최적화 및 옥트리 기반 메모리 관리**를 통해 대규모 장면에서도 견고하고 효율적인 3D 재구성을 실현하여, 제한된 자원으로 대규모 데이터를 처리해야 하는 AI/ML 엔지니어에게 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.