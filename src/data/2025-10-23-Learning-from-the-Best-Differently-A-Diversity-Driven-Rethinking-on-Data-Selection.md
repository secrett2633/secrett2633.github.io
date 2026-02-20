---
title: "[논문리뷰] Learning from the Best, Differently: A Diversity-Driven Rethinking on
  Data Selection"
excerpt: "Yi Cheng이 arXiv에 게시한 'Learning from the Best, Differently: A Diversity-Driven Rethinking on
  Data Selection' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Data Selection
  - Large Language Models (LLMs)
  - Data Diversity
  - Data Quality
  - Principal Component Analysis (PCA)
  - Orthogonal Dimensions
  - Pre-training

permalink: /ai/review/2025-10-23-Learning-from-the-Best-Differently-A-Diversity-Driven-Rethinking-on-Data-Selection/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.18909)

**저자:** Hongyi He, Xiao Liu, Zhenghao Lin, Mingni Tang, Yi Cheng, Jintao Wang, Wenjie Li, Peng Cheng, Yeyun Gong



## 핵심 연구 목표
대규모 언어 모델(LLMs) 사전 훈련 시, 기존의 점수 기반 데이터 선택 방식이 다양성 부족으로 인해 성능 저하를 초래하는 문제를 해결하고자 합니다. 특히, 최상위 점수 데이터가 오히려 하위 성능을 보이는 비단조성(non-monotonicity) 현상의 근본 원인을 밝히고, 품질과 다양성을 동시에 보장하는 효과적인 데이터 선택 방법론을 제시하는 것이 목표입니다.

## 핵심 방법론
본 연구는 **Orthogonal Diversity-Aware Selection (ODiS)** 알고리즘을 제안합니다. 먼저, 언어 품질, 지식 품질, 이해 난이도 등 **11가지 다차원 평가 지표** 를 사용하여 데이터를 평가합니다. 이후, 상관관계가 높은 평가 지표들을 **주성분 분석(PCA)** 을 통해 **직교하는 차원** 으로 변환하여 중복성을 제거합니다. 마지막으로, 각 직교 차원에 대해 **RoBERTa 기반 스코어러** 를 훈련하고, 각 차원에서 최상위 점수 데이터를 선택하여 최종 훈련 데이터셋을 구성함으로써 품질과 다양성을 동시에 확보합니다.

## 주요 결과
**ODiS** 로 선택된 데이터는 차원 간 **2% 미만의 낮은 중복률** 을 보여, 직교성 및 다양성 확보를 입증했습니다. 이 데이터를 사용하여 훈련된 모델은 **DSIR** , **PPL** , **Nemotron-CC** 등 기존 데이터 선택 방법론에 비해 여러 다운스트림 벤치마크(예: **Arc-C** , **Arc-E** , **Hellaswag** , **SIQA** , **PIQA** )에서 **평균적으로 약 3%p 높은** 뛰어난 성능을 달성했습니다. 성능 향상은 **최대 4개의 주성분 차원** 까지 꾸준히 나타나다가 이후 포화 상태에 도달했습니다.

## AI 실무자를 위한 시사점
LLM 사전 훈련을 위한 데이터 선택 시, 품질뿐만 아니라 **다양성 확보** 가 필수적임을 명확히 보여주었습니다. 특히, 다차원 평가 지표의 **상관관계를 해소** 하는 **PCA 기반 접근법** 은 데이터의 본질적인 다양성을 효과적으로 추출하는 강력한 방법론이 될 수 있습니다. 이는 효율적이고 고품질의 사전 훈련 데이터셋 구축을 위한 새로운 패러다임을 제시하며, 데이터 엔지니어링 파이프라인 설계에 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.