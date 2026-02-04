---
title: "[논문리뷰] Decouple Searching from Training: Scaling Data Mixing via Model Merging for Large Language Model Pre-training"
excerpt: "Haifeng Liu이 [arXiv]에 게시한 'Decouple Searching from Training: Scaling Data Mixing via Model Merging for Large Language Model Pre-training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Pre-training
  - Data Mixture Optimization
  - Model Merging
  - Proxy Models
  - Resource Efficiency
  - DeMix
  - Corpus Curation

permalink: /ai/review/2026-02-04-Decouple-Searching-from-Training-Scaling-Data-Mixing-via-Model-Merging-for-Large-Language-Model-Pre-training/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.00747)

**저자:** Shengrui Li, Fei Zhao, Kaiyan Zhao, Jieying Ye, Haifeng Liu, Fangcheng Shi, Zheyong Xie, Yao Hu, Shaosheng Cao



## 핵심 연구 목표
Large Language Model (LLM) 사전 학습에서 효과적인 데이터 혼합 비율을 결정하는 것은 여전히 어려운 문제입니다. 기존의 접근 방식은 비용이 많이 드는 대규모 탐색이나 신뢰할 수 없는 소규모 프록시 실험에 의존하므로, 논문은 이러한 한계를 극복하고 훈련 비용으로부터 데이터 혼합 비율 탐색을 분리하여 최적의 데이터 혼합을 효율적으로 발견하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **Decouple Searching from Training Mix (DeMix)** 프레임워크를 제안합니다. 이 방법은 각 데이터 혼합에 대해 프록시 모델을 훈련하는 대신, 개별 후보 데이터셋에 대해 **컴포넌트 모델** 을 훈련하고, 이들 모델을 **가중치 모델 병합(weighted model merging)** 하여 프록시 모델을 생성합니다. 병합 가중치는 목표 데이터 혼합 비율을 나타내며, 이를 통해 추가 훈련 없이 무제한의 혼합을 평가할 수 있습니다. 최적의 혼합 비율은 **LightGBM** 회귀 모델을 사용한 반복적인 탐색을 통해 예측됩니다.

## 주요 결과
**DeMix** 는 기존 훈련 기반 프록시 모델 대비 현저히 높은 프록시 정확도(매크로 평균 **Spearman's p 0.81** , 상위 25% p **0.59** )를 달성했으며, 동시에 계산 예산은 **6.4배** 절감했습니다(예: **212B 토큰** vs. **1344B 토큰** ). 또한, **최대 0.85** 의 높은 **능력 복구율(capability recovery rate)** 을 유지했습니다. 최종 데이터 혼합 품질 평가에서 **DeMix** 는 **최적의 평균 순위 24.00** 을 기록하며 **RegMix** 및 **CLIMB** 와 같은 최신 방법들을 능가했습니다.

## AI 실무자를 위한 시사점
**DeMix** 는 LLM 사전 학습에서 데이터 혼합을 최적화하는 데 필요한 계산 비용을 크게 줄여주는 **고효율적이고 정확한 솔루션** 을 제공합니다. **모델 병합** 을 프록시로 활용하는 기법은 방대한 데이터셋 탐색을 실질적으로 가능하게 하며, **DeMix Corpora (22T 토큰)** 의 공개는 고품질의 검증된 데이터 혼합을 제공하여 LLM 개발자와 연구자들이 특정 도메인 성능(예: 수학, 코드)과 일반 언어 이해 능력의 균형을 효과적으로 맞출 수 있도록 돕습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.