---
title: "[논문리뷰] Motion Attribution for Video Generation"
excerpt: "arXiv에 게시된 'Motion Attribution for Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Motion Attribution
  - Video Generation
  - Diffusion Models
  - Gradient-based Attribution
  - Temporal Dynamics
  - Motion Masking
  - Fine-tuning
  - Data Curation

permalink: /ai/review/2026-01-14-Motion-Attribution-for-Video-Generation/

toc: true
toc_sticky: true

date: 2026-01-14 00:00:00+0900+0900
last_modified_at: 2026-01-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.08828)

**저자:** Xindi Wu, Despoina Paschalidou, Jun Gao, Antonio Torralba, Laura Leal-Taixé, Olga Russakovsky, Sanja Fidler, Jonathan Lorraine



## 핵심 연구 목표
본 논문은 비디오 생성 모델에서 생성된 비디오의 **움직임(motion)** 에 영향을 미치는 훈련 클립을 식별하는 것을 목표로 합니다. 특히, 비디오 생성 모델의 **시간적 일관성(temporal consistency)** 과 **물리적 타당성(physical plausibility)** 을 향상시키기 위한 **미세 조정(fine-tuning) 데이터 큐레이션** 에 중점을 둡니다.

## 핵심 방법론
제안하는 **Motive** 프레임워크는 **모션-가중 손실 마스크(motion-weighted loss masks)** 를 사용하여 정적인 외형(static appearance)으로부터 시간적 역동성(temporal dynamics)을 분리합니다. 이를 위해 **AllTracker** 로 픽셀 공간의 모션을 추출하고, **모션 크기(motion magnitude)** 를 기반으로 가중치를 부여하여 손실 함수에 적용합니다. 효율성 및 확장성을 위해 **단일 샘플 추정량(single-sample estimator)** 과 **Fastfood projection** 을 활용한 **경사 기반 귀인(gradient-based attribution)** 방식을 사용하며, **프레임 길이 편향 수정(frame-length bias fix)** 을 통해 다양한 길이의 비디오에 대한 공정한 귀인을 보장합니다.

## 주요 결과
**Motive** 는 VBench 평가에서 기본 모델 대비 **74.1%의 인간 선호도(human preference) 승률** 을 달성하며 모션 품질을 향상시켰습니다. 또한, 사전 훈련된 전체 데이터셋으로 미세 조정한 모델의 동적 정도(dynamic degree) **42.0%** 를 뛰어넘는 **47.6%의 동적 정도** 를 달성했으며, 전체 훈련 데이터의 **10%** 만을 사용하고도 주체 일관성(subject consistency)에서 **96.3%** 를 기록했습니다.

## AI 실무자를 위한 시사점
**Motive** 는 비디오 생성 모델의 특정 **모션 패턴(motion patterns)** 을 형성하는 훈련 데이터를 체계적으로 이해하고 선택할 수 있는 강력한 도구를 제공합니다. 이는 **아티팩트 진단** 및 **타겟 데이터 큐레이션** 을 통해 모델의 시간적 일관성과 물리적 현실성을 향상시키는 데 기여합니다. 특히, 대규모 사전 훈련 데이터에 대한 접근이 제한적인 **미세 조정 환경** 에서 특정 동적 특성을 가진 고품질 데이터를 선별하는 데 매우 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.