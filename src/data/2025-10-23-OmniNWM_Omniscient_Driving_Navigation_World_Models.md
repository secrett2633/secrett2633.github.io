---
title: "[논문리뷰] OmniNWM: Omniscient Driving Navigation World Models"
excerpt: "Zhujin Liang이 [arXiv]에 게시한 'OmniNWM: Omniscient Driving Navigation World Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous Driving
  - World Models
  - Multi-modal Generation
  - 3D Occupancy
  - Plücker Ray-maps
  - Action Control
  - Dense Rewards
  - Long-term Forecasting

permalink: /ai/review/2025-10-23-OmniNWM_Omniscient_Driving_Navigation_World_Models/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.18313)

**저자:** Bohan Li, Zhuang Ma, Dalong Du, Baorui Peng, Zhujin Liang, Zhenqiang Liu, Chao Ma, Yueming Jin, Hao Zhao, Wenjun Zeng, Xin Jin



## 핵심 연구 목표
본 논문은 기존 자율주행 월드 모델이 가진 제한된 상태 모달리티, 짧은 시퀀스 길이, 부정확한 액션 제어, 보상 인식 부족 등의 문제를 해결하여, 자율주행을 위한 **종합적이고 전지적인(omniscient) 파노라마 내비게이션 월드 모델**을 개발하는 것을 목표로 합니다.

## 핵심 방법론
제안된 OmniNWM은 **Panoramic Diffusion Transformer (PDiT)**를 기반으로 **RGB, 시맨틱, 깊이(depth), 3D 점유(occupancy)**를 포함한 파노라마 비디오를 공동 생성합니다. 액션 제어를 위해 궤적을 **정규화된 Plücker ray-map 표현**으로 인코딩하여 픽셀 수준의 정밀한 제어를 가능하게 하며, **유연한 강제 전략(flexible forcing strategy)**을 통해 장기적이고 안정적인 시퀀스 생성을 지원합니다. 보상은 생성된 **3D 점유 맵**을 활용하여 **규칙 기반의 조밀한 보상(occupancy-grounded dense rewards)**을 직접 정의합니다.

## 주요 결과
OmniNWM은 NuScenes 데이터셋에서 **RGB 비디오 생성**에 있어 **5.45 FID**와 **23.63 FVD**를 달성하며 기존 SOTA 모델을 능가합니다. **파노라마 깊이 생성**에서는 **0.23 Abs. Rel.** 및 **0.81 δ<1.25**로 최고 성능을 보였으며, **3D 시맨틱 점유 예측**에서는 **33.3 IoU**와 **19.8 mIoU**를 기록하며 모든 비교 모델보다 뛰어난 결과를 보여주었습니다.

## AI 실무자를 위한 시사점
OmniNWM은 자율주행 월드 모델 개발에 있어 **다중 모달리티 예측, 정밀한 액션 제어, 통합된 보상 시스템**의 중요성을 강조합니다. 특히 **3D 점유 맵**을 통한 **규칙 기반의 조밀한 보상**은 자율주행 정책 평가 및 학습에 실질적인 인사이트를 제공하며, **정규화된 Plücker ray-map**은 다양한 카메라 설정과 데이터셋에 대한 **제로샷 일반화 능력**을 향상시켜 실제 적용 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.