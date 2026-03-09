---
title: "[논문리뷰] SLER-IR: Spherical Layer-wise Expert Routing for All-in-One Image Restoration"
excerpt: "Dizhe Zhang이 arXiv에 게시한 'SLER-IR: Spherical Layer-wise Expert Routing for All-in-One Image Restoration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Restoration
  - Mixture of Experts
  - Degradation Representation
  - Spherical Embedding
  - Contrastive Learning
  - Adaptive Routing
  - All-in-One Model
  - Global-Local Fusion

permalink: /ai/review/2026-03-09-SLER-IR-Spherical-Layer-wise-Expert-Routing-for-All-in-One-Image-Restoration/

toc: true
toc_sticky: true

date: 2026-03-09 00:00:00+0900+0900
last_modified_at: 2026-03-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.05940)

**저자:** Shurui Peng, Dizhe Zhang, Xin Lin, Shi Luo, Jincen Ou, Lu Qi, Truong Nguyen, Chao Ren



## 핵심 연구 목표
다양한 이미지 손상(degradation)에 대해 단일 모델로 처리하는 **올인원 이미지 복원(All-in-One Image Restoration)** 프레임워크의 한계, 즉 특징 간섭과 전문가 특화 부족 문제를 해결하고자 합니다. 특히, 신뢰할 수 없는 라우팅 신호, 공간적으로 불균일한 손상 처리, 그리고 훈련 시 패치 기반 학습과 전체 해상도 추론 간의 불일치 문제를 극복하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **SLER-IR (Spherical Layer-wise Expert Routing)** 을 제안합니다. 이는 각 네트워크 계층의 백본 블록을 여러 **매개변수 독립적인 전문가(parameter-independent experts)** 로 확장하여 구성됩니다. 신뢰할 수 있는 라우팅을 위해 **Spherical Uniform Degradation Embedding** 을 도입하여 손상 표현을 **단위 초구(unit hypersphere)** 에 매핑하고, **트리플릿 기반 콘트라스트 손실(triplet-constrained contrastive loss)** 로 최적화하여 손상 식별력을 높였습니다. 또한, **Global-Local Granularity Fusion (GLGF)** 모듈을 통해 전역 의미 정보(CLS 토큰)와 지역 손상 신호(패치 토큰)를 통합하여 공간적으로 불균일한 손상 및 훈련-테스트 간의 불일치 문제를 해결합니다.

## 주요 결과
SLER-IR은 세 가지 및 다섯 가지 복원 벤치마크에서 기존 SOTA 방법을 일관되게 능가하는 성능을 달성했습니다. 세 가지 태스크에서 **PSNR/SSIM 33.14/0.922** 의 최고 평균 성능을 기록하며 **MoCE-IR** 보다 **0.41 dB** 우수했습니다. 다섯 가지 태스크에서는 **PSNR/SSIM 31.73/0.928** 의 최고 평균을 달성하여 이전 접근 방식보다 **1.15 dB** 와 **0.009** 향상된 결과를 보였습니다. 특히, 디헤이징(dehazing)에서 **+2.59 dB** , 디블러링(deblurring)에서 **+1.22 dB** , 저조도 향상(low-light enhancement)에서 **+0.96 dB** 의 주목할 만한 성능 향상을 입증했습니다.

## AI 실무자를 위한 시사점
**SLER-IR** 은 다양한 이미지 손상 복원 태스크에 적용할 수 있는 **통합적이고 견고한 모델** 을 제공하여 개발 및 배포 효율성을 높입니다. **초구 기반 손상 임베딩(spherical degradation embedding)** 및 **콘트라스트 학습** 기법은 다중 태스크 학습이나 전문가 라우팅이 필요한 다른 AI 도메인에 확장 적용될 수 있습니다. **GLGF 모듈** 은 실제 환경의 불균일한 손상 패턴에 효과적으로 대응하여 모델의 **실용성** 을 크게 향상시킵니다. 이는 AI 시스템이 복잡한 실제 데이터를 더욱 잘 처리하도록 돕는 중요한 발전입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.