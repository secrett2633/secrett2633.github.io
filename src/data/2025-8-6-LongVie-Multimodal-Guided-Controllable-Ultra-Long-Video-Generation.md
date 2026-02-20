---
title: "[논문리뷰] LongVie: Multimodal-Guided Controllable Ultra-Long Video Generation"
excerpt: "Chenyang Si이 arXiv에 게시한 'LongVie: Multimodal-Guided Controllable Ultra-Long Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Ultra-long Video Generation
  - Multimodal Guidance
  - Controllable Video Generation
  - Diffusion Models
  - Temporal Consistency
  - Visual Quality
  - Autoregressive Generation
  - Degradation-aware Training

permalink: /ai/review/2025-8-6-LongVie-Multimodal-Guided-Controllable-Ultra-Long-Video-Generation/

toc: true
toc_sticky: true

date: 2025-08-06 13:46:36+0900
last_modified_at: 2025-08-06 13:46:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03694)

**저자:** Chenyang Si, Jianfeng Feng, Xian Liu, Zhaoxi Chen, Jianxiong Gao, Yanwei Fu, Yu Qiao, Ziwei Liu



## 핵심 연구 목표
본 논문은 기존 비디오 생성 모델이 짧은 클립에는 효과적이지만, **시간적 불일치(temporal inconsistency)** 와 **시각적 품질 저하(visual degradation)** 문제로 인해 1분 이상의 **초장시간 비디오 생성** 에 어려움을 겪는 문제를 해결하는 것을 목표로 합니다. 사용자 의도에 따라 **정밀하게 제어 가능한** 동시에 **일관성 있는** 고품질의 장시간 비디오를 생성하는 것이 연구 목적입니다.

## 핵심 방법론
제안하는 **LongVie** 는 **autoregressive 프레임워크** 를 기반으로, **통합된 노이즈 초기화** 와 **글로벌 제어 신호 정규화** 를 통해 시간적 일관성을 강화합니다. 시각적 품질 저하를 완화하기 위해 **깊이 맵(dense)** 과 **키포인트(sparse)** 같은 **다중 모드 제어 신호** 를 통합하고, **degradation-aware 훈련 전략** 으로 각 모달리티의 기여도를 균형 있게 조절합니다. 이 모델은 **CogVideoX** 를 기반으로 **ControlNet** 스타일 아키텍처를 확장하여 구현되었습니다.

## 주요 결과
**LongVie** 는 직접 구축한 **LongVGenBench** 벤치마크(100개 이상의 1분 길이 고해상도 비디오)에서 **state-of-the-art 성능** 을 달성했습니다. 특히, **CogVideoX** 대비 **전반적 일관성(Overall Consistency) 21.82%** 및 **시간적 깜빡임(Temporal Flickering) 98.43%** 를 기록하며 우월한 일관성을 보였습니다. 사용자 연구에서도 **시각적 품질 4.387점** 으로 모든 비교 모델 중 최고 점수를 얻어 제어 가능성과 시각적 품질 모두에서 뛰어난 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**LongVie** 는 장시간 비디오 생성 시 발생하는 **핵심적인 일관성 및 품질 문제** 에 대한 실용적인 해결책을 제시하며, **다중 모드 제어** 의 중요성을 강조합니다. **LongVGenBench** 라는 새로운 평가 벤치마크는 향후 장시간 비디오 생성 연구의 발전에 기여할 것입니다. 다만, 1분 길이 비디오 생성에 약 **45분** 이 소요되는 **높은 추론 시간** 은 실제 서비스 적용을 위해 추가적인 최적화가 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.