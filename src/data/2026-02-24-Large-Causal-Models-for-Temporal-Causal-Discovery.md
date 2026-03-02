---
title: "[논문리뷰] Large Causal Models for Temporal Causal Discovery"
excerpt: "Dario Simionato이 arXiv에 게시한 'Large Causal Models for Temporal Causal Discovery' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Causal Discovery
  - Temporal Models
  - Foundation Models
  - Transformer Architecture
  - Zero-shot Learning
  - Time-series Data
  - Scalability
  - Multi-dataset Pretraining

permalink: /ai/review/2026-02-24-Large-Causal-Models-for-Temporal-Causal-Discovery/

toc: true
toc_sticky: true

date: 2026-02-24 00:00:00+0900+0900
last_modified_at: 2026-02-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.18662)

**저자:** Nikolaos Kougioulis, Nikolaos Gkorgkolis, MingXue Wang, Bora Caglayan, Dario Simionato, Andrea Tonon, Ioannis Tsamardinos



## 핵심 연구 목표
본 논문은 시계열 데이터에 대한 인과 관계 탐색(Causal Discovery, CD)에서 **데이터셋별 모델 학습 패러다임의 한계** 를 극복하고자 합니다. 특히, **다중 데이터셋 사전 훈련(multi-dataset pretraining)** 의 잠재력을 활용하여 기존 방법론의 **제한된 변수 수, 대규모 입력에서의 성능 저하, 합성 데이터 의존성** 문제를 해결하고, 확장 가능하며 일반화 능력이 뛰어난 **대규모 인과 모델(Large Causal Models, LCMs)** 을 제안하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Convolution-enhanced Transformer encoder** 기반의 아키텍처를 사용하여 LCM을 구현했습니다. 이 모델은 다양한 **합성(synthetic) 및 실제(realistic) 시계열 데이터셋** 으로 구성된 대규모 코퍼스( **137.5M 시간 포인트** )에서 **지도 학습** 방식으로 사전 훈련됩니다. 훈련 과정에서는 **이진 교차 엔트로피(BCE)** 를 사용한 **엣지 예측 손실(Edge Prediction Loss)** 과 **교차 상관 관계 정규화(Correlation Regularization, CR)** 항을 결합한 복합 손실 함수를 최적화하여 인과 관계 예측의 안정성과 일반화 성능을 향상시킵니다.

## 주요 결과
LCMs는 합성 데이터셋에서 **PCMCI, DYNOTEARS, VARLinGAM** 과 같은 기존 CD 방법론을 **AUC 0.996** 으로 크게 능가하며, **최대 12개 변수** 까지 효과적으로 확장 가능함을 입증했습니다. 특히, **80/20 합성-대-실제 데이터 혼합(80/20 synthetic-to-realistic mixture)** 으로 훈련된 모델은 out-of-distribution 시나리오에서 탁월한 **제로샷(zero-shot) 일반화 성능** 을 보였습니다. 또한, LCMs는 단일 순방향 추론만으로 작동하여 기존 방법론 대비 **런타임을 획기적으로 단축** 시켰으며, 입력 차원에 독립적인 추론 속도를 달성했습니다.

## AI 실무자를 위한 시사점
이 연구는 시계열 인과 관계 탐색 분야에서 **파운데이션 모델(Foundation Models)의 가능성** 을 성공적으로 제시합니다. AI 실무자들은 더 이상 새로운 데이터셋마다 모델을 재훈련할 필요 없이 **사전 훈련된 LCM** 을 사용하여 빠르고 효율적인 **제로샷 인과 관계 추론** 을 수행할 수 있습니다. 이는 생물학, 마케팅 등 다양한 과학 분야에서 비용이 많이 드는 무작위 대조군 연구(RCT) 또는 A/B 테스트에 대한 의존도를 줄여 **과학적 발견을 가속화** 할 수 있는 실용적인 의미를 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.