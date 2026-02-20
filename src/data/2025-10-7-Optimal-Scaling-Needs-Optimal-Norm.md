---
title: "[논문리뷰] Optimal Scaling Needs Optimal Norm"
excerpt: "Stefan Kesselheim이 arXiv에 게시한 'Optimal Scaling Needs Optimal Norm' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Optimal Scaling
  - Norm-Based Optimizers
  - Hyperparameter Transfer
  - Learning Rate Scaling
  - Batch Size Scaling
  - Transformer Models
  - Scion Optimizer
  - Large Language Models

permalink: /ai/review/2025-10-7-Optimal-Scaling-Needs-Optimal-Norm/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03871)

**저자:** Oleg Filatov, Jiangtao Wang, Jan Ebert, Stefan Kesselheim



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM) 훈련에서 **최적의 스케일링** 을 달성하기 위한 하이퍼파라미터 전이(transfer)의 견고성 부족 문제를 해결하는 것을 목표로 합니다. 특히, 옵티마이저가 **명시적으로 노름을 최적화** 할 때 모델 및 데이터 스케일 변화에 따라 하이퍼파라미터 스케일링 규칙이 어떻게 변하는지 규명하고자 합니다.

## 핵심 방법론
연구는 **Scion optimizer** 를 사용하여 **Llama 3 아키텍처** 를 기반으로 한 프록시 모델( **69M 파라미터** )을 훈련했습니다. 모델의 폭(width)을 최대 **12배** , 깊이(depth)를 최대 **32배** 까지 스케일 업하고, 데이터 스케일(horizon)도 확장하며 실험을 진행했습니다. 최적의 하이퍼파라미터를 찾기 위해 **학습률(η)과 배치 크기(B)의 그리드 서치** 를 수행하고, 특히 **출력 레이어의 ||W_out||RMS→∞ 노름** 을 중심으로 분석했습니다.

## 주요 결과
최적의 학습률과 배치 크기 조합이 모델 및 데이터 스케일 전반에 걸쳐 **출력 레이어 노름 ||W_out||RMS→∞을 상수 값(약 2^7.0 ± 0.2)** 으로 유지시키는 것을 발견했습니다. 최적의 학습률 스케일링은 **η*(D) ∝ D^-0.28±0.07 **, 최적의 배치 크기 스케일링은 ** B*(D) ∝ D^0.45±0.07 **임을 측정하여 ** Adam ** 옵티마이저의 스케일링 지수와 일관성을 보였습니다. 또한, ** 모멘텀 **이나 ** 학습률 감쇠 **를 사용해도 이러한 노름 전이 현상은 유지됨을 확인했습니다.

## AI 실무자를 위한 시사점
** Scion optimizer **와 같은 ** 노름 기반 옵티마이저 **를 사용하면 LLM 훈련 시 모델 크기 및 데이터 스케일 변화에 관계없이 ** 견고한 하이퍼파라미터 전이 **를 통해 효율적인 스케일링이 가능함을 시사합니다. 최적의 노름 값을 유지하는 전략은 복잡한 하이퍼파라미터 튜닝 없이도 ** 일관된 성능 **을 달성하는 데 중요한 가이드라인이 될 수 있습니다. 이는 대규모 AI 모델의 개발 및 운영 비용을 절감하는 데 기여할 수 있는 실용적인 방법론을 제시합니다.

> ⚠️ ** 알림:** 이 리뷰는 AI로 작성되었습니다.