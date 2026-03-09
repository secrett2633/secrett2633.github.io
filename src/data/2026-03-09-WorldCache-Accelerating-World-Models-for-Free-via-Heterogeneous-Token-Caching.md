---
title: "[논문리뷰] WorldCache: Accelerating World Models for Free via Heterogeneous Token Caching"
excerpt: "Mingqiang Wu이 arXiv에 게시한 'WorldCache: Accelerating World Models for Free via Heterogeneous Token Caching' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Models
  - Diffusion Models
  - Inference Acceleration
  - Feature Caching
  - Heterogeneous Tokens
  - Curvature Prediction
  - Adaptive Skipping

permalink: /ai/review/2026-03-09-WorldCache-Accelerating-World-Models-for-Free-via-Heterogeneous-Token-Caching/

toc: true
toc_sticky: true

date: 2026-03-09 00:00:00+0900+0900
last_modified_at: 2026-03-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.06331)

**저자:** Weilun Feng, Guoxin Fan, Haotong Qin, Chuanguang Yang, Mingqiang Wu, Yuqi Li, Xiangqi Li, Zhulin An, Libo Huang, Dingrui Wang, Longlong Liao, Michele Magno, Yongjun Xu



## 핵심 연구 목표
본 연구는 확산 기반 월드 모델의 높은 추론 비용 문제, 특히 대화형 사용 및 장기 롤아웃에 필요한 비용을 해결하는 것을 목표로 합니다. 기존 단일 모달 확산 모델을 위한 캐싱 정책이 다중 모달 토큰의 이질성과 비균일한 시간적 역학으로 인해 월드 모델에 제대로 적용되지 못하는 한계를 극복하고자 합니다.

## 핵심 방법론
제안하는 **WorldCache** 는 **Curvature-guided Heterogeneous Token Prediction (CHTP)** 과 **Chaotic-prioritized Adaptive Skipping (CAS)** 으로 구성됩니다. **CHTP** 는 물리 기반 곡률 점수를 사용하여 토큰별 예측 가능성을 추정하고, Stable, Linear, Chaotic 토큰에 대해 각각 직접 재사용, 1차 외삽, Hermite-guided 감쇠 예측기를 적용합니다. **CAS** 는 곡률 정규화된 무차원 드리프트 신호를 축적하고, 병목 현상을 일으키는 토큰의 드리프트가 감지될 때만 전체 연산을 재수행하여 적응적으로 스키핑합니다.

## 주요 결과
**Hunyuan Voyager-13B** 모델에서 **3.7배의 엔드-투-엔드 속도 향상** 을 달성하며, **98%의 롤아웃 품질** 과 **45.43의 WorldScore** 를 유지했습니다. **Aether-5B** 모델에서는 **2.6배의 속도 향상** 과 함께 **44.72의 WorldScore** 로 최고의 충실도를 보였고, **3D 재구성 작업** 에서 **21.20초로 가장 낮은 지연 시간** 을 기록했습니다. 기존 레이어별 캐싱 방식이 상당한 메모리 오버헤드를 발생시키는 반면, WorldCache는 **거의 0에 가까운 추가 메모리 오버헤드** 를 보여줍니다.

## AI 실무자를 위한 시사점
**WorldCache** 는 **확산 기반 월드 모델의 추론 속도를 크게 향상** 시켜 대화형 AI 및 장기 시뮬레이션 환경 구축에 실질적인 기여를 합니다. 다중 모달 데이터의 복잡한 역학을 고려한 **이질적 토큰 처리 및 동적 스키핑 전략** 은 고비용 AI 모델의 효율성 최적화에 유용한 디자인 패턴을 제공합니다. 특히 **메모리 오버헤드가 거의 없이** 성능 향상을 이끌어낸 점은 자원 제약이 있는 환경에서의 AI 애플리케이션 개발에 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.