---
title: "[논문리뷰] Follow-Your-Shape: Shape-Aware Image Editing via Trajectory-Guided
  Region Control"
excerpt: "Hongyu Liu이 [arXiv]에 게시한 'Follow-Your-Shape: Shape-Aware Image Editing via Trajectory-Guided
  Region Control' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Editing
  - Shape Transformation
  - Rectified Flow
  - Trajectory Divergence Map
  - Region Control
  - Generative Models
  - Diffusion Models

permalink: /ai/review/2025-8-12-Follow-Your-Shape-Shape-Aware-Image-Editing-via-Trajectory-Guided-Region-Control/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.08134)

**저자:** Zeqian Long, Mingzhe Zheng, Kunyu Feng, Xinhua Zhang, Hongyu Liu, Harry Yang, Linfeng Zhang, Qifeng Chen, Yue Ma



## 핵심 연구 목표
이 논문은 기존 flow-기반 이미지 편집 모델이 대규모 형상 변환(large-scale shape transformations) 시 목표 형상 변화를 달성하지 못하거나 비-타겟 영역을 의도치 않게 변경하는 문제를 해결하는 것을 목표로 합니다. 구체적으로, **정확하고 제어 가능한 객체 형상 편집** 을 수행하면서 **비-타겟 콘텐츠를 엄격하게 보존** 하는 훈련-및 마스크-프리(training-free and mask-free) 프레임워크를 제안합니다.

## 핵심 방법론
본 논문은 **Trajectory Divergence Map (TDM)** 을 도입하여 인버전 및 편집 궤적 간의 토큰별 속도 차이를 정량화함으로써 편집 가능한 영역을 정밀하게 지역화합니다. 이 TDM은 **Scheduled KV Injection 메커니즘** 을 안내하여 초기 궤적 안정화를 위해 비조건부 KV 인젝션을 수행한 후, 일관된 잠재 구조가 형성되면 TDM-유도 편집을 적용합니다. 또한, **ControlNet** 을 통한 구조적 가이던스를 결합하여 편집의 일관성을 강화합니다.

## 주요 결과
제안된 방법인 Follow-Your-Shape는 새로운 벤치마크인 **ReShapeBench** 에서 우수한 성능을 입증했습니다. 배경 보존에서 **PSNR 35.79** 및 **LPIPS 8.23** (낮을수록 좋음)을 달성했으며, 텍스트-이미지 정렬에서 **CLIP-Sim 33.71** , 그리고 전반적인 미적 품질에서 **LAION aesthetic predictor 점수 6.57** 을 기록하여 기존 최신 방법론들을 능가했습니다.

## AI 실무자를 위한 시사점
**훈련-및 마스크-프리 접근 방식** 은 복잡한 형상 변환 시 수동 마스크 생성의 필요성을 없애고 개발 프로세스를 간소화합니다. **TDM과 Scheduled KV Injection** 은 생성 모델에서 **동적 영역 제어 및 안정적인 편집 궤적 관리** 를 위한 새로운 패러다임을 제공하여, 향후 제어 가능한 이미지 생성 애플리케이션에 활용될 수 있습니다. **ReShapeBench 벤치마크** 는 형상 인식 이미지 편집 연구의 표준화를 지원하여 관련 분야의 발전을 촉진할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.