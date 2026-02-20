---
title: "[논문리뷰] Revisiting Modeling and Evaluation Approaches in Speech Emotion
  Recognition: Considering Subjectivity of Annotators and Ambiguity of Emotions"
excerpt: "arXiv에 게시된 'Revisiting Modeling and Evaluation Approaches in Speech Emotion
  Recognition: Considering Subjectivity of Annotators and Ambiguity of Emotions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Speech Emotion Recognition
  - Annotator Subjectivity
  - Emotion Ambiguity
  - Soft Labels
  - Multi-label Classification
  - Evaluation Metrics
  - Loss Functions

permalink: /ai/review/2025-10-8-Revisiting-Modeling-and-Evaluation-Approaches-in-Speech-Emotion-Recognition-Considering-Subjectivity-of-Annotators-and-Ambiguity-of-Emotions/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05934)

**저자:** 周惶振 (Huang-Cheng Chou)



## 핵심 연구 목표
본 논문은 기존 음성 감정 인식(SER) 연구의 한계를 극복하고, 실제 환경에 더 적합한 SER 시스템을 구축하는 것을 목표로 합니다. 특히 **어노테이터의 주관성** 과 **감정의 모호성** 이라는 두 가지 주요 요소를 재고하여, 소수 감정 레이블의 제거 여부, 소수 어노테이터의 감정 인식 학습 범위, 그리고 단일 감정 예측의 한계를 해결하고자 합니다.

## 핵심 방법론
본 논문은 세 가지 혁신적인 방법론을 제시합니다. 첫째, 어노테이터 주관성을 다루기 위해 각 개인 어노테이터의 레이블에 기반한 **개별 어노테이터 모델(rater-modeling)** 을 구축하고 이를 집단 어노테이션 모델과 함께 **late-fusion** 합니다. 둘째, 감정의 모호성을 고려하고 모든 데이터를 활용하기 위해 모든 어노테이션을 포함하는 **"all-inclusive rule" (AR) 레이블 집계 방법** 을 제안합니다. 셋째, 감정의 상호 관계를 모델링하기 위해 훈련 데이터의 **감정 동시 발생 빈도(co-occurrence frequency)를 기반으로 한 페널티 행렬** 을 설계하고 이를 손실 함수(예: **cross-entropy, Kullback-Leibler divergence** )에 통합합니다. 모델 아키텍처로는 **BLSTM-FC** 와 **Wav2vec2.0** 을 활용했습니다.

## 주요 결과
어노테이터 주관성 모델링은 IEMOCAP 데이터셋에서 **61.48%의 UAR** 을 달성하여 기존 **CrowdH (57.45%)** 및 **CrowdS (57.12%)** 모델을 능가했습니다. **all-inclusive rule** 을 통해 훈련된 모델은 PR 및 MR 기반 훈련 방식보다 일관되게 높은 macro-F1 점수(AR 테스트 세트에서 **18개 실험 중 14개에서 최고 성능** )를 보였으며, IMPROV(P)에서는 **0.562** 의 macro-F1로 기존 SOTA(0.539)를 뛰어넘었습니다. 페널티 손실 함수는 PODCAST 데이터셋에서 macro-F1 점수를 **하드 레이블 17.12%** , **멀티 레이블 12.79%** , **분포 레이블 25.8%** 향상시키는 데 기여했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 SER 시스템 구축 시 **어노테이터의 주관성과 감정의 모호성** 을 적극적으로 고려해야 합니다. 단일 레이블 예측에만 의존하지 않고 **멀티 레이블 예측** 을 허용하며, 훈련 및 평가 과정에서 **모든 어노테이션 데이터** 를 활용하는 것이 중요합니다. **감정 동시 발생 빈도를 기반으로 한 페널티 손실** 은 모델이 실제 복합적인 감정 상태를 더 잘 이해하고 예측하도록 돕는 강력한 도구이며, 이는 음성 합성(TTS) 및 음성-음성 번역(S2ST)과 같은 응용 분야에 직접적으로 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.