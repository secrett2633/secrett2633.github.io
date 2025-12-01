---
title: "[논문리뷰] MeshSplat: Generalizable Sparse-View Surface Reconstruction via Gaussian
  Splatting"
excerpt: "Yanzhe Liang이 [arXiv]에 게시한 'MeshSplat: Generalizable Sparse-View Surface Reconstruction via Gaussian
  Splatting' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Sparse-View
  - Surface Reconstruction
  - Gaussian Splatting
  - 2DGS
  - Novel View Synthesis
  - Generalizable
  - Mesh Extraction
  - 3D Vision

permalink: /ai/review/2025-8-26-MeshSplat-Generalizable-Sparse-View-Surface-Reconstruction-via-Gaussian-Splatting/

toc: true
toc_sticky: true

date: 2025-08-26 13:21:57+0900
last_modified_at: 2025-08-26 13:21:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.17811)

**저자:** Hanzhi Chang, Ruijie Zhu, Wenjie Chang, Mulin Yu, Yanzhe Liang, Jiahao Lu, Zhuoyuan Li, Tianzhu Zhang



## 핵심 연구 목표
본 논문은 극도로 **희소한(sparse-view) 이미지** 로부터 정확한 3D 장면의 표면을 재구성하는 문제를 해결하고자 합니다. 기존 방식들이 희소한 입력에서 다중 뷰 기하학적 제약 조건 부족으로 인해 어려움을 겪는 한계를 극복하고, **일반화 가능한(generalizable) feed-forward 프레임워크** 를 통해 정밀한 메쉬를 추출하는 것을 목표로 합니다.

## 핵심 방법론
MeshSplat은 **2D Gaussian Splatting (2DGS)** 을 novel view synthesis와 표면 재구성 간의 연결고리로 활용합니다. 입력 이미지로부터 **MVS 기반 feed-forward 네트워크** 를 통해 픽셀 정렬된 2DGS의 위치와 속성을 예측합니다. 2DGS 위치 정확도를 높이기 위해, 뷰 간 예측된 깊이 맵의 포인트 클라우드를 정렬하는 **Weighted Chamfer Distance Loss** 를 도입했으며, 2DGS 방향 예측 정확도를 개선하기 위해 **uncertainty-based normal prediction network** 와 **단안 노멀 추정기 (Omnidata)** 를 사용한 지도 학습을 활용합니다.

## 주요 결과
MeshSplat은 희소 뷰 표면 재구성 태스크에서 **최첨단 성능** 을 달성했습니다. **Re10K 데이터셋** 에서 **CD↓ 0.3566** 및 **F1↑ 0.3758** 을 기록하여 MVSplat의 CD↓ 0.4015, F1↑ 0.3100보다 우수합니다. **Scannet 데이터셋** 에서도 CD↓ **0.2606** 및 F1↑ **0.3824** 를 달성하여 MVSplat의 CD↓ 0.3748, F1↑ 0.2095를 능가했습니다. 또한, Re10K에서 Scannet으로의 **교차 데이터셋 일반화** 실험에서도 CD↓ **0.3148** 로 MVSplat의 CD↓ 0.4506보다 현저히 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
**2DGS** 를 활용한 희소 뷰 표면 재구성 방법론은 제한된 이미지 입력으로 고품질 3D 모델을 생성해야 하는 AR/VR, 디지털 트윈 등 분야에 실용적입니다. **Weighted Chamfer Distance Loss** 와 **uncertainty-based normal prediction network** 는 3D 기하학적 일관성 및 정확도를 높이는 효과적인 기술로, 다른 3D 재구성 문제에도 적용 가능합니다. **Self-supervised 학습 방식** 은 3D 지상 진실 데이터의 부족 문제를 완화하며, **feed-forward 파이프라인** 은 빠른 추론 속도와 뛰어난 일반화 능력을 제공하여 실시간 3D 애플리케이션 개발에 크게 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.