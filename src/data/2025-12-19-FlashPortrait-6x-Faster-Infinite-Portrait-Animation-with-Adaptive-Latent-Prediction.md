---
title: "[논문리뷰] FlashPortrait: 6x Faster Infinite Portrait Animation with Adaptive Latent Prediction"
excerpt: "이 [arXiv]에 게시한 'FlashPortrait: 6x Faster Infinite Portrait Animation with Adaptive Latent Prediction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Portrait Animation
  - Diffusion Models
  - Inference Acceleration
  - Identity Preservation
  - Video Generation
  - Latent Prediction
  - Sliding Window

permalink: /ai/review/2025-12-19-FlashPortrait-6x-Faster-Infinite-Portrait-Animation-with-Adaptive-Latent-Prediction/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16900)

**저자:** Shuyuan Tu, Yueming Pan, Yinming Huang, Xintong Han, Zhen Xing, Qi Dai, Kai Qiu, Chong Luo, Zuxuan Wu



## 핵심 연구 목표
본 논문은 확산 모델 기반의 기존 장시간 인물 애니메이션 방법론이 겪는 **신원(ID) 불일치** 및 **높은 추론 지연 시간** 문제를 해결하고자 합니다. 특히, **ID를 보존** 하면서 **무한 길이의 비디오** 를 생성하고, 추론 속도를 **최대 6배까지 가속** 하는 것을 목표로 합니다.

## 핵심 방법론
FlashPortrait은 **Normalized Facial Expression Block** 을 도입하여 얼굴 특징과 확산 잠재 공간 간의 분포를 정렬하고, 이를 통해 얼굴 모델링의 ID 안정성을 크게 향상시킵니다. 추론 과정에서는 **가중치 기반 슬라이딩 윈도우 전략** 과 **Adaptive Latent Prediction Acceleration Mechanism** 을 활용하여 중첩 영역에서 부드러운 전환을 보장하고, **Taylor 급수** 와 **고차 잠재 미분값** 을 사용하여 미래 잠재값을 직접 예측함으로써 여러 디노이징 단계를 건너뛰어 속도를 가속합니다.

## 주요 결과
FlashPortrait은 최신 모델인 **Wan-Animate** 대비 추론 속도를 **6배 가속** 하면서, **Hard100 데이터셋** 에서 **AED/APD/MAE 지표** 에서 **30.9%/30.4%/37.5%** 더 나은 성능을 달성했습니다. 특히, **3배 더 빠른 추론 속도** 로 **1800프레임 이상** 의 확장된 시퀀스를 생성하며, **3000프레임 이상** 에서도 ID를 보존하는 우수한 성능을 보여줍니다.

## AI 실무자를 위한 시사점
이 연구는 **장시간, 고품질, ID 보존** 이 필수적인 인물 애니메이션 애플리케이션에 대한 실용적인 솔루션을 제시합니다. **Adaptive Latent Prediction** 및 **Normalized Facial Expression Block** 과 같은 기술은 실무자들이 확산 모델 기반의 다른 비디오 생성 작업에서 **ID 일관성** 과 **추론 속도** 를 개선하는 데 영감을 줄 수 있으며, 가상 비서나 영화 제작과 같은 분야에 즉시 적용될 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.