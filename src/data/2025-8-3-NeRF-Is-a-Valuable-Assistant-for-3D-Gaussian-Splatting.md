---
title: "[논문리뷰] NeRF Is a Valuable Assistant for 3D Gaussian Splatting"
excerpt: "ZeSheng Wang이 arXiv에 게시한 'NeRF Is a Valuable Assistant for 3D Gaussian Splatting' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - NeRF
  - 3D Gaussian Splatting
  - Hybrid Model
  - Joint Optimization
  - Scene Representation
  - Neural Rendering
  - Residual Learning
  - Sparse View

permalink: /ai/review/2025-8-3-NeRF-Is-a-Valuable-Assistant-for-3D-Gaussian-Splatting/

toc: true
toc_sticky: true

date: 2025-08-03 07:35:17+0900
last_modified_at: 2025-08-03 07:35:17+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.23374)

**저자:** Shuangkang Fang, I-Chao Shen, Takeo Igarashi, Yufeng Wang, ZeSheng Wang, Yi Yang, Wenrui Ding, Shuchang Zhou

**키워드:** `NeRF`, `3D Gaussian Splatting`, `Hybrid Model`, `Joint Optimization`, `Scene Representation`, `Neural Rendering`, `Residual Learning`, `Sparse View`

## 핵심 연구 목표
본 논문은 **3D Gaussian Splatting (3DGS)** 의 고유한 한계(Gaussian 초기화 민감성, 제한된 공간 인식, 약한 Gaussian 간 상관관계)를 해결하기 위해 **Neural Radiance Fields (NeRF)** 의 연속적인 공간 표현 능력을 활용하는 것을 목표로 합니다. NeRF와 3DGS를 경쟁적 관계가 아닌 상호 보완적인 파트너로 통합하여 효율적이고 고품질의 3D 장면 표현을 달성하고자 합니다.

## 핵심 방법론
제안하는 **NeRF-GS** 프레임워크는 NeRF와 3DGS를 공동으로 최적화합니다. 이는 **Hash-based NeRF 네트워크** 를 통한 연속적인 공간 인코딩 및 **Edge-based Initialization** 를 통해 Gaussian 위치를 식별하는 방식으로 시작합니다. 두 모델 간의 **공유 특징** 을 도입하고, **잔차 벡터(Af, Ap)** 를 최적화하여 NeRF에서 파생된 특징과 위치를 3DGS에 맞게 세밀하게 조정합니다. 또한, **GS-Rays** 를 활용하여 NeRF와 3DGS 브랜치 간의 상호 제약 및 **적응적 Gaussian 성장** 을 통해 효율적인 공동 최적화를 수행합니다.

## 주요 결과
**NeRF-GS** 는 다양한 벤치마크 데이터셋에서 기존 방법들을 능가하며 **최첨단 성능** 을 달성했습니다. 특히, DeepBlending 데이터셋에서 **30.70 PSNR** 을 기록하여 **바닐라 3DGS** 의 **29.42 PSNR** 을 크게 상회했습니다. 또한, **희소 뷰(sparse-view)** 조건에서 렌더링 품질이 크게 향상되었으며, 원본 3DGS보다 **적은 Gaussian 수(예: DeepBlending에서 2.46M개에서 1.92M개로 감소)** 로 실시간 렌더링 성능을 유지했습니다.

## AI 실무자를 위한 시사점
본 연구는 **NeRF와 3DGS가 상호 보완적인 기술** 임을 입증하여 3D 장면 표현에 대한 새로운 하이브리드 접근 방식을 제시합니다. **제한된 입력 데이터(sparse-view)** 상황에서 모델의 견고성과 성능을 향상시키는 데 기여하며, 이는 실제 AI 애플리케이션(예: 3D 재구성, 가상 현실)에서 매우 중요합니다. **잔차 학습(Residual Learning)** 과 같은 개념을 활용하여 이질적인 모델 아키텍처를 효과적으로 통합하는 방법론은 다른 멀티모달 AI 문제에도 적용될 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
