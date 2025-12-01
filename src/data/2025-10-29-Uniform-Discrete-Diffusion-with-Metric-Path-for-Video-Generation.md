---
title: "[논문리뷰] Uniform Discrete Diffusion with Metric Path for Video Generation"
excerpt: "이 [arXiv]에 게시한 'Uniform Discrete Diffusion with Metric Path for Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Discrete Diffusion
  - Video Generation
  - Metric Path
  - Long Video Generation
  - Asynchronous Scheduling
  - Text-to-Video
  - Multimodal Generation

permalink: /ai/review/2025-10-29-Uniform-Discrete-Diffusion-with-Metric-Path-for-Video-Generation/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24717)

**저자:** Haoge Deng, Ting Pan, Fan Zhang, Yang Liu, Zhuoyan Luo, Yufeng Cui, Wenxuan Wang, Chunhua Shen, Shiguang Shan, Zhaoxiang Zhang, Xinlong Wang



## 핵심 연구 목표
본 논문은 연속 공간(continuous-space) 비디오 생성 모델과 비교하여 뒤처져 있던 이산 공간(discrete-space) 비디오 생성 모델의 성능 격차를 해소하는 것을 목표로 합니다. 특히, 이산 방식의 고질적인 문제인 **오류 누적(error accumulation)** 및 **긴 문맥 불일치(long-context inconsistency)** 문제를 해결하여, 확장 가능하고 다재다능한 비디오 생성 프레임워크를 제시하고자 합니다.

## 핵심 방법론
저자들은 **Uniform discRete diffusion with metric pAth (URSA)** 를 제안하며, 이는 이산 시공간 토큰에 대한 반복적인 전역 정제(iterative global refinement)를 통해 비디오를 생성합니다. 핵심 기법으로는 **Linearized Metric Path** 와 **Resolution-dependent Timestep Shifting** 메커니즘을 도입하여 데이터 섭동(perturbations)에 대한 정밀한 제어를 가능하게 합니다. 또한, **비동기적 타임스텝 스케줄링 전략** 을 통해 단일 모델로 **텍스트-투-비디오** , **이미지-투-비디오** , **비디오 보간(interpolation)** 등 다양한 태스크를 통합 지원합니다.

## 주요 결과
URSA는 VBench 텍스트-투-비디오 생성 태스크에서 **82.4점** 을 달성하며 기존 이산 및 연속 모델을 능가했습니다. 이미지-투-비디오 생성 태스크에서는 VBench **86.2점** 을 기록하여 최신 오픈소스 모델들과 동등한 성능을 보였고, 텍스트-투-이미지 DPG-Bench에서는 **86.0점** 으로 기존 이산 방식을 뛰어넘었습니다. 이로써 URSA는 이산 생성 방식의 성능 한계를 크게 확장했음을 입증했습니다.

## AI 실무자를 위한 시사점
URSA는 이산 확산 모델이 **장시간 비디오 생성** 및 **고해상도 이미지 합성** 에서 연속 확산 모델과 경쟁할 수 있는 강력한 대안임을 보여줍니다. **Linearized Metric Path** 와 **Resolution-dependent Timestep Shifting** 와 같은 혁신적인 디자인은 다양한 스케일의 데이터에 대해 효율적이고 정밀한 제어를 제공하여 모델의 확장성을 높입니다. **비동기적 스케줄링** 은 단일 모델로 여러 비디오 태스크를 처리할 수 있어, AI 애플리케이션 개발 시 효율적인 리소스 활용과 다목적 모델 구축에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.