---
title: "[논문리뷰] GENIE: Gaussian Encoding for Neural Radiance Fields Interactive Editing"
excerpt: "Przemysław Spurek이 [arXiv]에 게시한 'GENIE: Gaussian Encoding for Neural Radiance Fields Interactive Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Neural Radiance Fields (NeRF)
  - Gaussian Splatting (GS)
  - Interactive Editing
  - 3D Scene Representation
  - Physics Simulation
  - Hybrid Model
  - Real-time Rendering
  - Ray Tracing

permalink: /ai/review/2025-8-11-GENIE_Gaussian_Encoding_for_Neural_Radiance_Fields_Interactive_Editing/

toc: true
toc_sticky: true

date: 2025-08-11 13:13:28+0900
last_modified_at: 2025-08-11 13:13:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.02831)

**저자:** Mikołaj Zieliński, Krzysztof Byrski, Tomasz Szczepanik, Przemysław Spurek



## 핵심 연구 목표
본 논문은 **NeRF**의 사실적인 렌더링 품질과 **Gaussian Splatting (GS)**의 편집 가능성 및 구조적 표현의 장점을 결합하여, **물리 기반 상호작용**이 가능한 대화형 3D 장면 편집 시스템을 개발하는 것을 목표로 합니다. 기존 **NeRF**의 편집 어려움과 **GS**의 일부 시각적 한계를 극복하고자 합니다.

## 핵심 방법론
제안하는 **GENIE**는 **GS**의 가우시안 프리미티브에 **학습 가능한 특징 임베딩**을 부여하여 **NeRF 네트워크**를 조건화하는 하이브리드 모델입니다. 효율적인 조건화를 위해, 수정된 레이 트레이싱 파이프라인 기반의 고속 근접 가우시안 검색 기법인 **Ray-Traced Gaussian Proximity Search (RT-GPS)**를 도입했습니다. 또한, 가우시안 특징 초기화 및 업데이트를 위해 **다중 해상도 해시 그리드 (Splash Grid Encoding)**를 통합하여 실시간, 지역 인식 편집을 가능하게 합니다.

## 주요 결과
**NeRF-Synthetic 데이터셋**에서 **PSNR 34.67 (Chair)**를 달성하여 기존 비편집형 **NeRF** 모델과 견줄 만한 재구성 품질을 보여주었으며, 편집 가능한 모델 중에서는 **RIP-NeRF**보다 우수하거나 동등한 성능을 기록했습니다. **Mip-NeRF 360 데이터셋**에서는 무한한 실제 장면을 편집할 수 있는 유일한 접근 방식임을 입증하며 경쟁력 있는 **PSNR (예: Ficus에서 33.23)**을 유지했습니다. **GENIE (800k Gaussians, 16 Neighbors)**는 **10.66 FPS**로 경쟁력 있는 추론 속도를 달성하며 물리 시뮬레이션과의 원활한 통합을 시연했습니다.

## AI 실무자를 위한 시사점
**GENIE**는 **NeRF**와 **GS**의 장점을 결합하여 3D 콘텐츠의 실시간 편집 및 물리 시뮬레이션 통합을 가능하게 하는 새로운 패러다임을 제시합니다. **RT-GPS** 및 **Splash Grid Encoding**과 같은 효율적인 기술은 AI/ML 엔지니어에게 **대화형 3D 애플리케이션** 개발에 있어 중요한 최적화 방안을 제공합니다. 다만, 가우시안 밀도에 따라 상세 재구성 품질이 달라질 수 있어, 광범위한 혹은 개방형 장면에서는 미세한 디테일 손실 가능성을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.