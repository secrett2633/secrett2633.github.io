---
title: "[논문리뷰] HyRF: Hybrid Radiance Fields for Memory-efficient and High-quality Novel
  View Synthesis"
excerpt: "Dan Xu이 [arXiv]에 게시한 'HyRF: Hybrid Radiance Fields for Memory-efficient and High-quality Novel
  View Synthesis' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Novel View Synthesis
  - 3D Gaussian Splatting (3DGS)
  - Neural Radiance Fields (NeRF)
  - Memory Efficiency
  - High-Quality Rendering
  - Hybrid Representation
  - Real-time Rendering

permalink: /ai/review/2025-9-24-HyRF-Hybrid-Radiance-Fields-for-Memory-efficient-and-High-quality-Novel-View-Synthesis/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17083)

**저자:** Zipeng Wang, Dan Xu



## 핵심 연구 목표
**3D Gaussian Splatting (3DGS)** 의 실시간 고품질 렌더링 장점은 유지하면서, 뷰-의존적 효과 및 이방성 모양 모델링으로 인한 **막대한 메모리 오버헤드** 를 해결하는 것을 목표로 합니다. 기존 **Neural Field** 기반 압축 방식이 고주파 공간 변화를 포착하는 데 어려움을 겪는 한계를 극복하고, 고주파 디테일을 보존하면서도 메모리 효율적인 **하이브리드 장면 표현** 을 제시하고자 합니다.

## 핵심 방법론
장면을 **명시적 컴팩트 가우시안** 과 **그리드 기반 Neural Fields** 의 두 가지 상호 보완적인 구성 요소로 분해합니다. **명시적 가우시안** 은 3D 위치, 등방성 스케일, 불투명도, 확산 색상 등 필수 고주파 파라미터만 저장합니다. **Neural Fields** 는 기하학적 속성( **스케일, 불투명도, 회전** )과 뷰-의존적 색상( **view-dependent color** )을 각각 별도의 **decoupled neural field architecture** 를 통해 예측합니다. 또한, **visibility pre-culling** 과 **Neural Field** 로 예측된 배경 맵을 가우시안 렌더링과 합성하는 **하이브리드 렌더링 파이프라인** 을 제안합니다.

## 주요 결과
제안하는 **HyRF** 는 **3DGS** 대비 모델 크기를 **20배 이상** (평균 **34MB** vs **676MB** ), **Scaffold-GS** 대비 **1.5배에서 5배** 까지 줄이면서도 **state-of-the-art 렌더링 품질** 을 달성했습니다. 특히, **Deep Blending** 데이터셋에서 **PSNR 30.37, SSIM 0.910** 의 높은 점수를 기록했습니다. 렌더링 속도 면에서도 **114 FPS** 로 **3DGS** 와 유사한 **실시간 성능** 을 유지했습니다.

## AI 실무자를 위한 시사점
**3DGS** 의 주요 단점인 과도한 메모리 사용량을 획기적으로 개선하여, **제한된 컴퓨팅 자원** 에서도 고품질 **Novel View Synthesis** 를 가능하게 합니다. 기하학과 외관 속성을 분리 학습하는 **decoupled neural field** 설계는 모델의 **표현 능력과 파라미터 효율성** 을 동시에 높여 다양한 응용 분야에 적용될 수 있습니다. 또한, **Neural Field** 기반의 배경 맵은 원거리 객체 렌더링 품질을 향상시켜 대규모 장면 모델링에 대한 실용적인 솔루션을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.