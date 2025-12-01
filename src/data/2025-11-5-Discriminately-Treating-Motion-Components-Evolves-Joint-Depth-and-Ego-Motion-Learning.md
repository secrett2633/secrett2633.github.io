---
title: "[논문리뷰] Discriminately Treating Motion Components Evolves Joint Depth and
  Ego-Motion Learning"
excerpt: "Zuyi Xiong이 [arXiv]에 게시한 'Discriminately Treating Motion Components Evolves Joint Depth and
  Ego-Motion Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-supervised Learning
  - Depth Estimation
  - Ego-Motion Estimation
  - Motion Component Discrimination
  - Geometric Constraints
  - Optical Flow
  - PoseNet
  - DepthNet

permalink: /ai/review/2025-11-5-Discriminately-Treating-Motion-Components-Evolves-Joint-Depth-and-Ego-Motion-Learning/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01502)

**저자:** Mengtan Zhang, Zizhan Guo, Hongbo Zhao, Yi Feng, Zuyi Xiong, Yue Wang, Shaoyi Du, Hanli Wang, Rui Fan



## 핵심 연구 목표
본 논문은 심도 추정 및 에고-모션 학습을 위한 기존의 자율학습(unsupervised learning) 프레임워크가 모션 구성요소(회전, 병진)를 불분명하게 처리하여 신뢰성과 견고성이 저하되는 문제를 해결하고자 합니다. 특히, 각 모션 구성요소의 고유한 기하학적 규칙성을 식별하고 활용하여 심도와 에고-모션 추정의 정확도를 동시에 향상시키는 것이 목표입니다.

## 핵심 방법론
제안된 **DiMoDE** 프레임워크는 연속된 비디오 프레임에서 **PoseNet** 이 예측한 에고-모션 변환을 회전, 접선 병진, 방사 병진으로 분리하여 차별적으로 처리합니다. **광학 축 및 이미징 평면 정렬 과정** 을 도입하여 공동 학습 프레임워크를 **동축(coaxial) 및 동일 평면(coplanar) 형태** 로 재구성하고, **FlowNet** 으로 생성된 **광학 흐름(optical flow)** 을 변환하여 기하학적 제약 조건을 부과합니다. 이를 통해 각 에고-모션 구성요소가 심도와 상호 작용하는 방식을 명확히 분리하고, 심도 추정을 위한 **닫힌 형태의 기하학적 관계** 를 도출합니다.

## 주요 결과
**DiMoDE** 는 **KITTI** , **DDAD** , **nuScenes** 등 여러 공개 데이터셋과 자체 수집한 실제 환경 데이터셋에서 심도 및 시각 오도메트리 모두에서 **최첨단(SoTA) 성능** 을 달성했습니다. **KITTI Odometry Seqs. 09-10** 에서 시각 오도메트리 **et 2.86%, er 0.74%, ATE 9.83** 를 기록하며 가장 낮은 궤적 드리프트를 보였습니다. 또한, **nuScenes** 데이터셋에서 심도 추정 **Abs Rel 0.139, Sq Rel 1.472** 로 기존 SoTA 방법을 능가하여 복잡한 환경에서의 견고성을 입증했습니다.

## AI 실무자를 위한 시사점
**DiMoDE** 는 자율 주행 및 로봇 공학에서 중요한 심도 및 에고-모션 추정의 견고성과 신뢰성을 크게 향상시킬 수 있는 실용적인 솔루션을 제공합니다. 특히, 야간이나 악천후와 같이 기존 픽셀 단위 신호가 불안정할 수 있는 **어려운 환경** 에서 AI 모델의 성능 저하를 방지하는 데 기여합니다. 다양한 **DepthNet** 및 **PoseNet** 아키텍처와의 호환성은 기존 시스템에 쉽게 통합될 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.