---
title: "[논문리뷰] ReCamDriving: LiDAR-Free Camera-Controlled Novel Trajectory Video Generation"
excerpt: "Taojun Ding이 arXiv에 게시한 'ReCamDriving: LiDAR-Free Camera-Controlled Novel Trajectory Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Camera Control
  - Novel Trajectory
  - 3D Gaussian Splatting (3DGS)
  - LiDAR-Free
  - Diffusion Models
  - Autonomous Driving
  - Scene Synthesis

permalink: /ai/review/2025-12-09-ReCamDriving-LiDAR-Free-Camera-Controlled-Novel-Trajectory-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.03621)

**저자:** Yaokun Li, Shuaixian Wang, Mantang Guo, Jiehui Huang, Taojun Ding, Mu Hu, Kaixuan Wang, Shaojie Shen, Guang Tan



## 핵심 연구 목표
본 연구는 자율 주행 환경에서 고품질의 카메라 제어 기반 **신규 궤적 비디오 생성** 문제를 해결하고자 합니다. 기존 복원(repair) 기반 방법들이 복잡한 아티팩트에 취약하고, **LiDAR** 기반 접근 방식이 데이터의 희소성과 불완전성으로 인해 기하학적 불일치를 겪는 한계를 극복하는 것이 목표입니다. 궁극적으로, **LiDAR** 없이 순수 비전 기반으로 정밀한 카메라 제어 및 구조적으로 일관된 비디오를 생성하는 프레임워크인 **ReCamDriving** 을 제안합니다.

## 핵심 방법론
**ReCamDriving** 은 **Latent Diffusion Models (LDMs)** 과 **Flow Matching** 을 기반으로 하며, **2단계 훈련 전략** 을 채택하여 뷰포인트 변환을 점진적으로 학습합니다. 1단계에서는 **상대 카메라 포즈** 를 조건으로 사용하여 기본적인 카메라 제어 생성 능력을 확립하고, 2단계에서는 **3DGS 렌더링** 을 통합하여 미세 조정된 뷰포인트 및 기하학적 안내 신호를 제공하며 아티팩트 복원에 대한 과적합을 방지합니다. 또한, 훈련 및 추론 카메라 변환 패턴 간의 불일치를 해소하기 위해 **3DGS 기반 교차 궤적 데이터 큐레이션 전략** 을 사용하여 **ParaDrive 데이터셋** (11만 개 이상의 병렬 궤적 비디오 쌍 포함)을 구축했습니다.

## 주요 결과
제안된 **ReCamDriving** 은 **Waymo Open Dataset (WOD) [40]** 및 **NuScenes [7]** 데이터셋에서 시각적 품질, 카메라 정확도, 뷰 일관성 등 모든 평가 지표에서 최신 기술(SOTA)을 능가하는 성능을 달성했습니다. 특히, 카메라 정확도 측면에서 **RErr.↓** 및 **TErr.↓** 지표가 현저히 개선되었으며, **WOD 데이터셋의 ±1m 오프셋** 에서 **RErr.↓ 1.32** , **TErr.↓ 2.37** , **FID↓ 13.76** , **FVD↓ 13.27** , **CLIP-V↑ 97.96** 를 기록하며 구조적 일관성과 로버스트함을 입증했습니다.

## AI 실무자를 위한 시사점
**ReCamDriving** 은 고비용의 **LiDAR** 데이터 없이도 고충실도 카메라 제어 비디오 생성을 가능하게 하여 자율 주행 시스템 개발에서 데이터 수집 비용을 크게 절감할 수 있습니다. **2단계 훈련 전략** 과 **3DGS 기반 데이터 큐레이션** 은 생성 모델에서 견고한 제어 및 구조적 일관성을 달성하기 위한 효과적인 접근 방식을 제공합니다. 공개될 **ParaDrive 데이터셋** 은 단일 시점 비디오에서 확장 가능한 다중 궤적 학습을 위한 귀중한 자원이 될 것이며, 이는 카메라 제어 비디오 합성 연구에 중요한 기여를 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.