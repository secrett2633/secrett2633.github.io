---
title: "[논문리뷰] Beyond Outliers: A Study of Optimizers Under Quantization"
excerpt: "이 [arXiv]에 게시한 'Beyond Outliers: A Study of Optimizers Under Quantization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Quantization
  - Optimizers
  - LLM
  - Post-Training Quantization (PTQ)
  - Quantization-Aware Training (QAT)
  - Error Propagation
  - Scaling Laws
  - Shampoo

permalink: /ai/review/2025-10-10-Beyond-Outliers-A-Study-of-Optimizers-Under-Quantization/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.23500)

**저자:** Georgios Vlassis, Saleh Ashkboos, Alexandra Volkova, Torsten Hoefler, Dan Alistarh



## 핵심 연구 목표
대규모 언어 모델(LLMs)의 효율적인 배포를 위해 **Quantization** 이 필수가 됨에 따라, **옵티마이저 선택** 이 양자화 성능에 미치는 영향을 체계적으로 분석하는 것을 목표로 합니다. 특히, 기존 아웃라이어 측정 지표( **MMR** , **Kurtosis** )가 양자화 성능을 예측하지 못하는 이유를 규명하고, **Post-Training Quantization (PTQ)** 및 **Quantization-Aware Training (QAT)** 환경에서 최적의 옵티마이저를 식별하는 것이 주된 연구 목적입니다.

## 핵심 방법론
**OLMo2 아키텍처** 를 기반으로 50M부터 1.5B 파라미터에 이르는 LLM 모델을 **AdamW** , **PSGD** , **Shampoo** , **Muon** , **Scion** , **SOAP** 6가지 옵티마이저로 **Chinchilla-optimal** 데이터 비율에 맞춰 학습시켰습니다. **PTQ** 실험에서는 **AbsMax row-wise 4비트 양자화** 를 적용했고, **QAT** 실험에서는 **QuEST** 스키마를 사용하여 양자화된 모델을 학습했습니다. 또한, 양자화 오류 전파를 분석하기 위해 **ABC decomposition 프레임워크** 를 제안하고, QAT 성능 예측을 위한 **스케일링 법칙** 을 도출했습니다.

## 주요 결과
**PTQ** 환경에서 **MMR** 및 **Kurtosis** 같은 기존 아웃라이어 지표는 양자화된 모델의 정확도와 상관관계가 없음을 발견했습니다(피어슨 상관계수 **ρ = 0.62** 및 **ρ = 0.70** ). 대신 제안된 새로운 지표 **RL** 은 **ρ = -0.89** 로 강한 상관관계를 보였습니다. **Shampoo** 옵티마이저로 학습된 모델은 대부분의 모델 크기에서 **PTQ 후 가장 낮은 정확도 하락** 을 보였으며, **QAT** 환경에서도 **Shampoo** 가 **가장 높은 매개변수 효율성 p4bit (0.879)** 를 달성하며 가장 낮은 정확도 손실을 기록했습니다. 반면, FP에서 가장 우수한 성능을 보인 **Muon** 은 **PTQ** 에서 **500M 모델에서 61.86% -> 50.60% (약 11.26% 하락)** 로 가장 큰 정확도 하락을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **LLM 양자화 시 옵티마이저 선택** 이 최종 모델 성능에 **결정적인 영향** 을 미친다는 점을 인지해야 합니다. 기존의 아웃라이어 분석 지표만으로는 양자화 후 성능을 예측하기 어려우므로, **오류 전파 특성을 고려한 분석** 이 필요합니다. 특히, **Shampoo** 옵티마이저는 **PTQ 및 QAT 환경 모두에서 높은 견고성과 매개변수 효율성** 을 제공하므로, 양자화된 LLM 배포 시 **Shampoo** 를 우선적으로 고려하는 것이 유리할 수 있습니다. FP에서 성능이 좋았던 옵티마이저가 양자화 환경에서는 아닐 수 있다는 점도 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.