---
title: "[논문리뷰] RGS-SLAM: Robust Gaussian Splatting SLAM with One-Shot Dense Initialization"
excerpt: "이 [arXiv]에 게시한 'RGS-SLAM: Robust Gaussian Splatting SLAM with One-Shot Dense Initialization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Gaussian Splatting
  - SLAM
  - Dense Initialization
  - Real-Time Tracking
  - Differentiable Rendering
  - DINOv3

permalink: /ai/review/2026-01-08-RGS-SLAM-Robust-Gaussian-Splatting-SLAM-with-One-Shot-Dense-Initialization/

toc: true
toc_sticky: true

date: 2026-01-08 00:00:00+0900+0900
last_modified_at: 2026-01-08 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.00705)

**저자:** Wei-Tse Cheng, Yen-Jen Chiou, Yuan-Fu Yang*



## 핵심 연구 목표
기존 3D Gaussian Splatting (3DGS) SLAM 시스템의 **residual-driven densification** 방식이 초래하는 불안정한 수렴과 불균일한 지오메트리 문제를 해결하는 것입니다. 이를 대체할 **one-shot dense initialization** 방법을 제안하여, 훈련 과정 없이 강건하고 실시간으로 동작하는 SLAM 시스템을 구축하고자 합니다.

## 핵심 방법론
논문은 **DINOv3 디스크립터** 를 기반으로 **밀집 다중 뷰 대응점(dense multi-view correspondences)** 을 추출하고, **신뢰도 기반 인라이어 분류기** 를 통해 이를 정제합니다. 이 대응점들을 **다중 뷰 삼각측량(multi-view triangulation)** 하여 잘 분포되고 구조를 인지하는 가우시안 시드(Gaussian seed)를 **한 번에 초기화** 합니다. 이후 **미분 가능한 3DGS 렌더러** 와 **해석적 SE(3 야코비안(Jacobian))** 을 사용하여 가우시안 파라미터와 카메라 자세를 실시간으로 추적 및 최적화합니다.

## 주요 결과
제안된 RGS-SLAM은 **20% 더 빠른 수렴 속도** 를 보였으며, TUM RGB-D 데이터셋에서 평균 ATE(Absolute Trajectory Error) **1.02 cm** , Replica 데이터셋에서 **0.61 cm** 를 달성하여 기존 MonoGS보다 우수했습니다. 또한, **925 FPS** 의 높은 렌더링 처리량과 **1.537 cm 정확도** , **97.843% 완전성 비율** 의 고품질 재구성을 제공하여 SNI-SLAM 등 기존 모델을 능가했습니다.

## AI 실무자를 위한 시사점
**훈련 과정 없는 one-shot initialization** 은 3DGS SLAM의 복잡성을 줄이고 시스템 안정성을 크게 향상시킵니다. **DINOv3 기반의 밀집 특징 매칭** 과 **다중 뷰 삼각측량** 기법은 기존 딥러닝 모델의 잔여물 기반 덴시피케이션 단계를 효율적으로 대체하며, 로봇 공학, AR/VR, 디지털 트윈과 같은 실시간 응용 분야에서 강건하고 고정밀 맵핑 솔루션을 제공하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.