---
title: "[논문리뷰] StereoWorld: Geometry-Aware Monocular-to-Stereo Video Generation"
excerpt: "Guixun Luo이 arXiv에 게시한 'StereoWorld: Geometry-Aware Monocular-to-Stereo Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Monocular-to-Stereo
  - Video Generation
  - Diffusion Models
  - Geometry-Aware
  - XR
  - IPD-aligned Dataset
  - Novel View Synthesis

permalink: /ai/review/2025-12-11-StereoWorld-Geometry-Aware-Monocular-to-Stereo-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-11 00:00:00+0900+0900
last_modified_at: 2025-12-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.09363)

**저자:** Guixun Luo, Hanwen Liang, Longfei Li, Yuyang Yin, KXingLab



## 핵심 연구 목표
기존 단안 비디오 생성 모델의 스테레오 기능 부재 및 취약한 pose estimation/multi-stage warping 파이프라인으로 인한 스테레오 비디오 생성의 한계를 극복하는 것이 목표입니다. 특히, 사람의 동공 간 거리(IPD)에 맞춰진 대규모 훈련 데이터 부족 문제를 해결하여, 고품질의 기하학적으로 정확한 단안-스테레오 비디오 생성 프레임워크를 개발하고자 합니다.

## 핵심 방법론
본 연구는 **사전 훈련된 Diffusion Transformer (DiT) 기반 텍스트-투-비디오 확산 모델** 을 확장하여 **StereoWorld** 를 제안합니다. **Monocular-conditioning** 을 통해 단안 비디오를 강력한 가이드로 활용하며, **Geometry-aware Regularization** 전략으로 **disparity supervision** 과 **depth supervision** 을 도입하여 기하학적 정확성을 강화했습니다. 이를 위해 **Stereo Any Video [24]** 와 **Video Depth Anything [9]** 을 활용하여 그라운드 트루스 disparity 및 depth 맵을 생성하고, 최종 DiT 블록을 RGB와 depth를 위한 **이중 브랜치** 로 분리하여 학습합니다. 또한, **temporal 및 spatial tiling 전략** 을 통해 고해상도 및 장시간 비디오 생성을 가능하게 했습니다.

## 주요 결과
**StereoWorld** 는 시각적 품질과 기하학적 정확도 측면에서 기존 SOTA 모델들을 압도적으로 능가하는 성능을 보였습니다. 정량적 지표에서 **PSNR 25.9794** , **SSIM 0.7964** , **LPIPS 0.0952** , **EPE 17.4527** , **D1-all 0.4213** 를 달성하여 모든 경쟁 모델 대비 우수했습니다. 사용자 평가에서도 Stereo Effect, Visual Quality, Binocular Consistency, Temporal Consistency 모든 항목에서 가장 높은 점수를 얻어 실제적인 스테레오 시각 경험을 제공함을 입증했습니다.

## AI 실무자를 위한 시사점
**diffusion model** 을 활용한 **geometry-aware 단안-스테레오 비디오 생성** 에 대한 새로운 접근 방식을 제시하며, **XR 디스플레이** 를 위한 고품질 콘텐츠 생성 가능성을 열었습니다. **Disparity 및 Depth supervision** 을 통한 기하학적 제약과 **StereoWorld-11M** 과 같은 **IPD-aligned 대규모 데이터셋** 의 구축은 실용적인 스테레오 비디오 생성 모델 개발에 핵심적인 시사점을 제공합니다. 다만, 클립당 약 6분이라는 **비교적 느린 생성 속도** 는 향후 모델 경량화 및 가속화 연구를 통해 개선될 필요가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.