---
title: "[논문리뷰] SemanticGen: Video Generation in Semantic Space"
excerpt: "이 [arXiv]에 게시한 'SemanticGen: Video Generation in Semantic Space' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Semantic Space
  - Diffusion Models
  - VAE Latents
  - Long Video Generation
  - Semantic Encoders
  - Generative AI

permalink: /ai/review/2025-12-24-SemanticGen-Video-Generation-in-Semantic-Space/

toc: true
toc_sticky: true

date: 2025-12-24 00:00:00+0900+0900
last_modified_at: 2025-12-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.20619)

**저자:** Jianhong Bai, Xiaoshi Wu, Xintao Wang, Xiao Fu, Yuanxing Zhang, Qinghe Wang, Xiaoyu Shi, Menghan Xia, Zuozhu Liu, Haoji Hu, Pengfei Wan, Kun Gai



## 핵심 연구 목표
기존 비디오 생성 모델의 **느린 수렴 속도** 와 **긴 비디오 생성 시 높은 계산 비용** 이라는 한계를 해결하는 것을 목표로 합니다. 비디오의 내재된 중복성을 활용하여 **컴팩트하고 높은 수준의 의미 공간(semantic space)** 에서 비디오를 생성함으로써 효율성과 품질을 동시에 개선하고자 합니다.

## 핵심 방법론
본 논문은 **2단계 생성 패러다임** 인 **SemanticGen** 을 제안합니다. 첫 번째 단계에서는 **확산 모델** 을 사용하여 비디오의 전역 레이아웃을 정의하는 **컴팩트한 의미 비디오 특징** 을 생성합니다. 두 번째 단계에서는 또 다른 **확산 모델** 이 이 의미 특징에 기반하여 최종 결과물인 **VAE 잠재 벡터** 를 생성합니다. 의미 인코더로는 **Qwen-2.5-VL의 비전 타워** 를 사용하고, 의미 공간 압축을 위해 **경량 MLP** 를 활용하며, 긴 비디오 생성을 위해 **Swin-Attention** 을 적용합니다.

## 주요 결과
**SemanticGen** 은 기존 VAE 잠재 공간 모델링 대비 **상당히 빠른 수렴 속도** 를 보이며 고품질 비디오를 생성합니다. 특히, 긴 비디오 생성 벤치마크에서 **AM_drift 지표** 를 3.58%로 달성하여 기존 SOTA 모델인 LongLive(4.08%) 및 Base-CT-Swin(5.20%)을 능가하며 탁월한 장기 일관성을 입증했습니다. 의미 공간 압축에 대한 정량적 분석에서는 8차원으로 압축했을 때 Subject Consistency **97.49%** 와 Motion Smoothness **99.38%** 를 기록하여 비압축(2048차원) 대비 성능이 향상됨을 보여주었습니다.

## AI 실무자를 위한 시사점
**SemanticGen** 은 비디오 생성의 효율성을 혁신적으로 개선하여, 특히 **장기 비디오 콘텐츠 생성** 에서 **계산 비용을 절감** 하고 **훈련 시간을 단축** 할 수 있는 실용적인 방안을 제시합니다. 의미 공간에서의 전역 계획과 VAE 잠재 공간에서의 세부 묘사라는 **2단계 접근 방식** 은 모델의 확장성을 높여 AI 엔지니어가 복잡하고 긴 비디오를 보다 효과적으로 생성할 수 있도록 지원합니다. 이는 영화, 미디어, 엔터테인먼트 등 다양한 산업에 적용될 잠재력이 큽니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.