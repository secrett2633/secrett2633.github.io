---
title: "[논문리뷰] UltraViCo: Breaking Extrapolation Limits in Video Diffusion Transformers"
excerpt: "이 [arXiv]에 게시한 'UltraViCo: Breaking Extrapolation Limits in Video Diffusion Transformers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Diffusion Transformers
  - Length Extrapolation
  - Attention Mechanism
  - Attention Dispersion
  - Periodic Content Repetition
  - Quality Degradation
  - Training-free Method
  - Plug-and-play

permalink: /ai/review/2025-11-26-UltraViCo-Breaking-Extrapolation-Limits-in-Video-Diffusion-Transformers/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20123)

**저자:** Min Zhao, Hongzhou Zhu, Yingze Wang, Bokai Yan, Jintao Zhang, Guande He, Ling Yang, Chongxuan Li, Jun Zhu



## 핵심 연구 목표
비디오 Diffusion Transformer(DiT) 모델이 학습 길이 이상으로 비디오를 생성할 때 발생하는 **주기적 콘텐츠 반복** 과 **전반적인 품질 저하** 라는 두 가지 실패 모드를 해결하는 것을 목표로 합니다. 어텐션 맵의 근본적인 메커니즘을 분석하여 이러한 문제를 해결하고, 비디오 길이 **외삽(extrapolation)의 한계를 확장** 하고자 합니다.

## 핵심 방법론
두 가지 실패 모드의 근본 원인이 학습 길이 이상의 토큰들이 학습된 어텐션 패턴을 희석시키는 **어텐션 분산(attention dispersion)** 에 있음을 밝혀냈습니다. 이를 해결하기 위해, **UltraViCo** 는 학습 창(training window)을 넘어서는 토큰에 대한 어텐션을 **상수 감쇠 인자** 를 통해 억제하는 **학습 불필요(training-free) 및 플러그앤플레이(plug-and-play) 방식** 을 제안합니다. 또한, 장기 비디오 시퀀스를 위한 **메모리 효율적인 CUDA 커널** 을 개발하여 **FlashAttention** 및 **SageAttention** 과 통합했습니다.

## 주요 결과
UltraViCo는 광범위한 모델과 외삽 비율에서 모든 베이스라인을 뛰어넘는 성능을 보였습니다. 특히, **4배 외삽** 에서 기존 최고 방법 대비 **Dynamic Degree를 233%** , **Imaging Quality를 40.5%** 향상시켰습니다. **HunyuanVideo** 모델의 **3배 외삽** 시 **NoRepeat Score** 에서 **100.0** 을 달성하며 반복 현상을 효과적으로 제거했고, **4배 외삽** 에서도 유동적인 움직임을 유지했습니다.

## AI 실무자를 위한 시사점
기존 **Diffusion Transformer 기반 비디오 생성 모델** 의 **장기 비디오 생성 능력** 을 획기적으로 향상시키는 실용적인 솔루션을 제공합니다. **학습이 필요 없는 플러그앤플레이 방식** 이므로, 기존 모델에 쉽게 통합하여 즉시 성능 향상을 기대할 수 있습니다. **메모리 효율적인 구현** 은 대규모 모델과 긴 시퀀스에서도 활용 가능성을 높여, 비디오 생성 AI의 실제 적용 범위를 넓히는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.