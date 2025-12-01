---
title: "[논문리뷰] MARS-M: When Variance Reduction Meets Matrices"
excerpt: "이 [arXiv]에 게시한 'MARS-M: When Variance Reduction Meets Matrices' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Variance Reduction
  - Matrix-based Optimizer
  - LLM Training
  - Deep Learning Optimization
  - Moonlight
  - MARS-M
  - Stochastic Gradient Descent

permalink: /ai/review/2025-10-28-MARS-M-When-Variance-Reduction-Meets-Matrices/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.21800)

**저자:** Yifeng Liu, Angela Yuan, Quanquan Gu



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 및 딥러닝 모델 훈련의 효율성과 안정성을 향상시키기 위해, **행렬 기반 전처리 옵티마이저** 의 장점과 **분산 감소(variance reduction) 기법** 의 장점을 결합하는 것을 목표로 합니다. 특히, 기존 분산 감소 기법이 행렬 기반 옵티마이저와 통합될 때 발생하는 성능 저하 문제를 해결하고자 합니다.

## 핵심 방법론
저자들은 **MARS-M** 이라는 새로운 옵티마이저를 제안합니다. 이는 **MARS** 의 분산 감소 기술을 **Muon** 의 Moonlight 버전에 통합한 것입니다. 이 방법론은 **Newton-Schulz 반복법** 을 활용하여 그래디언트 모멘텀을 근사하고, **스케일링된 그래디언트 보정** 과 **그래디언트 클리핑** 을 적용하여 안정성을 높입니다. 또한, 계산 효율성을 위한 **근사 MARS-M** 버전도 제시합니다.

## 주요 결과
**MARS-M** 은 이론적으로 **O(T^-1/3)** 의 수렴율을 달성하여 기존 Muon 옵티마이저의 **Õ(T^-1/4)** 수렴율을 개선했음을 증명합니다. GPT-2 모델을 이용한 LLM 훈련 실험에서 **OpenWebText** 및 **FineWeb-Edu 100B** 데이터셋에서 **Moonlight** 및 **AdamW** 대비 일관되게 **더 낮은 훈련 및 검증 손실** 을 기록했습니다. 예를 들어, **FineWeb-Edu 100B** 데이터셋에서 소형 모델(0-shot) 훈련 시, **MARS-M (γ=0.025)** 은 평균 **45.55** 점을 달성하여 **Muon (44.95)** 보다 우수했습니다. 또한, **CIFAR-10** 컴퓨터 비전 태스크에서도 **Moonlight** 대비 더 나은 테스트 정확도와 낮은 손실을 보였습니다.

## AI 실무자를 위한 시사점
**MARS-M** 은 LLM과 같은 대규모 딥러닝 모델 훈련에서 **더 빠르고 안정적인 최적화** 를 가능하게 하는 실용적인 솔루션을 제공합니다. 이론적 수렴율 개선과 실증적 성능 향상은 AI 엔지니어들이 복잡한 모델을 효율적으로 훈련하고 더 나은 품질의 모델을 개발하는 데 기여할 수 있습니다. **근사 버전** 의 제공은 계산 리소스 제약이 있는 환경에서도 활용 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.