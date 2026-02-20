---
title: "[논문리뷰] Virtual Width Networks"
excerpt: "arXiv에 게시된 'Virtual Width Networks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Virtual Width Networks
  - Transformer
  - Mixture-of-Experts (MoE)
  - Scaling Laws
  - Representation Learning
  - Model Efficiency
  - Multi-Token Prediction
  - Hyper-Connections

permalink: /ai/review/2025-11-17-Virtual-Width-Networks/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.11238)

**저자:** 1ByteDance Seed (전체 저자 목록은 Contribution 섹션 참조)



## 핵심 연구 목표
본 논문은 Transformer 모델의 히든 차원을 늘릴 때 발생하는 **Quadratic한 계산 비용** 문제를 해결하면서도, 더 넓은 표현(wider representations)이 제공하는 이점을 얻는 것을 목표로 합니다. 이를 위해 임베딩 너비(embedding width)를 백본(backbone) 너비로부터 분리하여, **계산량을 거의 일정하게 유지** 하면서 임베딩 공간을 확장하는 프레임워크를 제안합니다.

## 핵심 방법론
저자들은 **Virtual Width Networks (VWN)** 를 도입하여, 토큰 임베딩 너비를 확장하되 Transformer 백본의 히든 차원은 고정합니다. 이를 위해 **Generalized Hyper-Connections (GHC)** 를 사용하여 **Over-Width Hidden States** 를 백본 너비로 압축하고 모듈 출력 후 다시 확장하는 유연한 메커니즘을 구현합니다. 또한, 확장된 가상 공간에서 더욱 조밀한 감독 신호를 제공하기 위해 **Multi-Token Prediction (MTP)** 과 시너지를 활용합니다.

## 주요 결과
대규모 실험에서 **VWN (8배 가상 너비 확장)** 은 **다음 토큰 예측(next-token prediction)에서 2배 이상, 다음 2개 토큰 예측(next-2-token prediction)에서 3배 이상** 최적화를 가속화했습니다. 기준 모델과 동일한 손실에 도달하는 데 **다음 토큰 예측은 2.5배, 다음 2개 토큰 예측은 3.5배 더 적은 토큰** 을 사용했습니다. 또한, 가상 너비와 손실 감소 사이에 **로그-선형 스케일링 관계** 가 관찰되었으며, 가상 너비가 두 배 증가할 때마다 **0.0069의 평균 손실 감소** 가 나타났습니다.

## AI 실무자를 위한 시사점
**VWN** 은 모델의 잠재적 용량을 확장하면서도 **Quadratic한 계산 비용 증가를 피할 수 있는** 실용적인 방법을 제공하여 대규모 AI 모델 개발에 중요한 의미를 가집니다. 가상 너비 스케일링이 **새로운 효율성 차원** 으로 제시되며, 이는 모델 성능을 예측 가능한 방식으로 향상시킬 수 있는 가능성을 시사합니다. 하지만, **매우 넓은 설정의 배포는 하드웨어 및 소프트웨어 공동 설계** 가 필요할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.