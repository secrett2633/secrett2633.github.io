---
title: "[논문리뷰] Spatia: Video Generation with Updatable Spatial Memory"
excerpt: "이 [arXiv]에 게시한 'Spatia: Video Generation with Updatable Spatial Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Spatial Memory
  - 3D Scene Point Cloud
  - Spatial Consistency
  - Camera Control
  - Interactive Editing
  - Diffusion Models
  - Visual SLAM

permalink: /ai/review/2025-12-26-Spatia-Video-Generation-with-Updatable-Spatial-Memory/

toc: true
toc_sticky: true

date: 2025-12-26 00:00:00+0900+0900
last_modified_at: 2025-12-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.15716)

**저자:** Jinjing Zhao, Fangyun Wei, Zhening Liu, Hongyang Zhang, Chang Xu, Yan Lu



## 핵심 연구 목표
기존 비디오 생성 모델들이 직면한 **장기적인 공간 및 시간적 일관성 유지의 어려움** 을 해결하는 것을 목표로 합니다. 이를 위해 **업데이트 가능한 3D 장면 포인트 클라우드** 를 영구적인 공간 메모리로 활용하는 프레임워크인 Spatia를 제안하여, 고차원 비디오 신호의 밀집된 특성으로 인한 한계를 극복하고자 합니다.

## 핵심 방법론
Spatia는 초기 이미지에서 **3D 장면 포인트 클라우드** 를 추정하여 공간 메모리로 활용하고, 이 메모리에 기반하여 비디오 클립을 반복적으로 생성합니다. 생성된 비디오 콘텐츠는 **Visual SLAM** ( **MapAnything** ) 알고리즘을 통해 **3D 장면 포인트 클라우드** 를 지속적으로 업데이트하여 기존 장면 정보와 새로운 콘텐츠를 통합합니다. 이 프레임워크는 **ControlNet** 과 **Diffusion Transformer** 기반의 멀티모달 조건부 생성 아키텍처를 채택하며, **동적-정적 요소 분리** , **명시적인 카메라 제어** , **3D 인지 기반 대화형 편집** 기능을 제공합니다.

## 주요 결과
**WorldScore 벤치마크** 에서 Spatia는 가장 높은 평균 점수인 **69.73** 을 달성하며, 기존 모델들을 뛰어넘는 시각적 품질을 보였습니다. **RealEstate 데이터셋** 에서는 PSNR **18.58** , SSIM **0.646** , LPIPS **0.254** 를 기록하여 베이스라인 모델 대비 우수한 성능을 입증했습니다. 또한, **폐쇄 루프 비디오 생성** 시 PSNRC **19.38** , SSIMC **0.579** , LPIPSc **0.213** , Match Acc **0.698** 를 달성하며 탁월한 공간 메모리 일관성을 보여주었습니다.

## AI 실무자를 위한 시사점
Spatia의 **업데이트 가능한 3D 장면 포인트 클라우드 기반 공간 메모리** 접근 방식은 **장기 비디오 생성** 및 **가상 환경 구축** 에 있어 중요한 발전입니다. **동적-정적 요소 분리** 및 **3D 인지 기반 대화형 편집** 기능은 **정밀한 콘텐츠 생성** 과 **실시간 상호작용** 이 요구되는 애플리케이션에 특히 유용합니다. **Visual SLAM** 과의 통합은 생성형 AI 모델의 **실세계 데이터 처리 능력** 을 향상시키는 하이브리드 접근법의 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.