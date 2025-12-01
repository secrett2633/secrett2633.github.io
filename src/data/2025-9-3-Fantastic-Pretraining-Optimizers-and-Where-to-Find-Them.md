---
title: "[논문리뷰] Fantastic Pretraining Optimizers and Where to Find Them"
excerpt: "Percy Liang이 [arXiv]에 게시한 'Fantastic Pretraining Optimizers and Where to Find Them' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Learning Optimizers
  - Large Language Models
  - Hyperparameter Tuning
  - Pretraining Speedup
  - Scaling Laws
  - AdamW
  - Matrix-based Optimizers
  - Data-to-Model Ratio

permalink: /ai/review/2025-9-3-Fantastic-Pretraining-Optimizers-and-Where-to-Find-Them/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.02046)

**저자:** Kaiyue Wen, David Hall, Tengyu Ma, Percy Liang



## 핵심 연구 목표
본 논문은 언어 모델 사전 훈련에서 **AdamW** 가 지배적인 옵티마이저임에도 불구하고, 새로운 옵티마이저들이 주장하는 **1.4배에서 2배** 의 학습 속도 향상이 실제로는 널리 채택되지 않는 이유를 규명하고자 합니다. 저자들은 이러한 불일치가 (i) **불균등한 하이퍼파라미터 튜닝** 과 (ii) **제한적이거나 오해의 소지가 있는 평가 설정** 에서 비롯되었다고 주장하며, 이를 해결하기 위한 체계적인 연구를 수행합니다.

## 핵심 방법론
저자들은 **0.1B부터 1.2B 매개변수** 에 이르는 **네 가지 모델 규모** 와 **1배에서 8배의 Chinchilla 최적 데이터-모델 비율** 에 걸쳐 **10가지 딥러닝 옵티마이저** 를 체계적으로 연구합니다. **세 단계의 하이퍼파라미터 튜닝 프레임워크** 를 사용하여 최적의 설정을 찾고, 이를 통해 얻은 하이퍼파라미터 스케일링 법칙을 **1.2B 매개변수** 모델까지 외삽합니다. 주요 평가 지표는 주어진 손실에 도달하는 데 필요한 **토큰 수** 이며, **JAX 및 TPU v5** 환경에서 **Llama 2** 아키텍처를 기반으로 실험을 진행합니다.

## 주요 결과
새로운 옵티마이저들이 주장하는 **2배 속도 향상** 은 **불충분하게 튜닝된 AdamW 베이스라인** 에서 비롯된 경우가 많으며, 잘 튜닝된 **AdamW** 대비 실제 속도 향상은 최대 **1.4배** 에 불과하고 **모델 규모가 커질수록 감소하여 1.2B 모델에서는 1.1배** 에 그칩니다. **Muon, Soap, Kron** 과 같은 **매트릭스 기반 옵티마이저** 는 **AdamW** 보다 일관되게 우수하지만, 속도 향상은 모델 규모에 반비례합니다. 또한, **데이터-모델 비율이 8배 이상** 으로 증가하면 **Muon** 은 **Kron과 Soap** 에 의해 추월당하며, 학습 초기 단계의 손실 곡선만으로 옵티마이저를 평가하는 것은 오해를 유발할 수 있습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 새로운 옵티마이저를 평가할 때 **AdamW** 를 포함한 모든 옵티마이저에 대해 **엄격하고 공정한 하이퍼파라미터 튜닝** 이 필수적임을 인지해야 합니다. 작은 모델이나 낮은 데이터-모델 비율에서 나타난 성능 향상이 **대규모 모델 및 데이터 조건** 에서는 크게 감소할 수 있으므로, **다양한 스케일링 레짐에서의 검증** 이 중요합니다. 또한, **학습 초기 손실 곡선에 현혹되지 않고 최종 훈련 예산에서의 성능** 을 기준으로 옵티마이저를 선택해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.