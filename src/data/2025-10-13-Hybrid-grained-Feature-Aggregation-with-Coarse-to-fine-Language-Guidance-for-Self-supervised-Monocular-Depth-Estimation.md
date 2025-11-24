---
title: "[논문리뷰] Hybrid-grained Feature Aggregation with Coarse-to-fine Language Guidance
  for Self-supervised Monocular Depth Estimation"
excerpt: "Zekun Qi이 [arXiv]에 게시한 'Hybrid-grained Feature Aggregation with Coarse-to-fine Language Guidance
  for Self-supervised Monocular Depth Estimation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-supervised Monocular Depth Estimation
  - Foundation Models
  - CLIP
  - DINO
  - Language Guidance
  - Coarse-to-fine Learning
  - Feature Aggregation
  - 3D Perception

permalink: /ai/review/2025-10-13-Hybrid-grained-Feature-Aggregation-with-Coarse-to-fine-Language-Guidance-for-Self-supervised-Monocular-Depth-Estimation/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.09320)

**저자:** Zekun Qi, Jiawei He, Bohan Li, Hongsi Liu, Wenyao Zhang



## 핵심 연구 목표
이 논문은 자기 지도(self-supervised) 단안 깊이 추정(MDE)에서 기존 방법론의 한계를 극복하고자 합니다. 특히, **CLIP**과 **DINO**와 같은 파운데이션 모델의 잠재력을 최대한 활용하여, 얕은 특징 융합(naive feature fusion)으로 발생하는 특징 레벨 불일치 문제를 해결하고 전반적인 MDE 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **Coarse-to-fine Language Guidance**를 통한 **Hybrid-grained Feature Aggregation** 프레임워크인 **Hybrid-depth**를 제안합니다. 첫 번째 단계인 **Coarse Depth Sensing**에서는 **CLIP**의 글로벌 의미론적 맥락과 **DINO**의 로컬 공간적 세부 특징을 통합하여, 자율 주행 장면의 기하학적 사전 지식과 언어 가이드를 통해 거친 깊이 인지 능력을 학습합니다. 이어서 **Fine Depth Estimation** 단계에서는 보조 카메라 포즈 정보(**PoseNet**)와 학습 가능한 깊이 프롬프트(learnable depth prompts)를 활용하여 픽셀 수준의 언어 정렬을 수행함으로써 정밀한 깊이 추정 능력을 학습합니다.

## 주요 결과
**KITTI Eigen split** 데이터셋에서 기존 **Monodepth2**, **ManyDepth**, **Mono-VIFI** 등의 최신 자기 지도 MDE 방법론에 **Hybrid-depth**를 통합했을 때 모든 평가 지표에서 상당한 성능 향상을 달성했습니다. 예를 들어, **Monodepth2**와 결합 시 **Abs Rel 0.115에서 0.093**로, **RMSE 4.863에서 4.113**로 개선되었습니다 (Table 1). 또한, **BEVDet** 및 **FB-BEV**와 같은 3D 인식 태스크에서도 **mAP 및 NDS**와 같은 지표에서 현저한 성능 향상을 보여, 3D 인지 능력을 효과적으로 증진함을 입증했습니다 (Table 8).

## AI 실무자를 위한 시사점
이 연구는 **CLIP** 및 **DINO**와 같은 파운데이션 모델을 MDE에 통합하는 효과적인 방법을 제시하여, 기존 자기 지도 MDE 파이프라인의 성능을 **플러그 앤 플레이 방식**으로 향상시킬 수 있음을 보여줍니다. **Coarse-to-fine 학습 방식**과 **언어 가이드**를 통한 특징 융합은 다양한 스케일의 특징 불일치 문제를 해결하는 강력한 전략으로, 이는 다른 컴퓨터 비전 태스크에도 확장 적용될 수 있습니다. 특히 3D 인지 능력을 높이는 데 기여할 수 있어 자율주행, 로보틱스 등 실제 AI 애플리케이션 개발에 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.