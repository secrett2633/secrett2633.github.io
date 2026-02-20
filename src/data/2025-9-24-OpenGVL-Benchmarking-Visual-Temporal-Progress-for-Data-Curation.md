---
title: "[논문리뷰] OpenGVL - Benchmarking Visual Temporal Progress for Data Curation"
excerpt: "Viktor Petrenko이 arXiv에 게시한 'OpenGVL - Benchmarking Visual Temporal Progress for Data Curation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotics Data Curation
  - Visual Temporal Progress
  - Generative Value Learning (GVL)
  - Vision-Language Models (VLMs)
  - Benchmark
  - Task Progress Prediction
  - Value-Order Correlation (VOC)

permalink: /ai/review/2025-9-24-OpenGVL-Benchmarking-Visual-Temporal-Progress-for-Data-Curation/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17321)

**저자:** Paweł Budzianowski, Emilia Wiśnios, Gracjan Góral, Igor Kulakov, Viktor Petrenko, Krzysztof Walas



## 핵심 연구 목표
로봇 공학 분야의 데이터 부족 문제를 해결하고, 대규모 로봇 데이터셋을 자동으로 주석 및 큐레이션할 수 있는 도구의 필요성을 강조합니다. 이를 위해 시각적 관측을 통한 로봇 작업 진행도 예측을 위한 벤치마크인 **OpenGVL** 을 제안하고, 데이터 큐레이션 도구로서의 활용 가능성을 입증하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **Generative Value Learning (GVL)** 접근 방식을 기반으로, **Vision-Language Models (VLMs)** 이 시각적 관측으로부터 작업 진행도를 예측하도록 합니다. **OpenGVL 벤치마크** 는 다양한 조작 작업(로봇 및 인간 수행)에 걸쳐 공개 소스 및 독점 기반 모델의 성능을 평가하며, 예측 품질은 **Value-Order Correlation (VOC)** 지표(예측 값과 셔플된 프레임 간의 순위 상관관계)를 통해 측정합니다.

## 주요 결과
공개 소스 **VLM** 은 작업 진행도 예측에서 독점 모델 성능의 약 **70%** 수준에 머물러 상당한 성능 격차를 보였으며, **Gemma** 및 **Qwen** 계열 모델의 경우 **VLM** 규모가 **VOC 점수** 향상으로 이어졌습니다. **MiMo-VL-7B-RL-2508** 및 **GLM-4.1V-9B-Thinking** 은 공개 소스 추론 모델 중 우수한 성능을 나타냈으나, **Kimi-VL-A3B** 는 부진했습니다. **OpenGVL** 은 또한 불분명한 작업 정의, 레이블 모호성, OOD(Out-Of-Distribution) 예시 등 데이터 품질 문제를 효과적으로 식별할 수 있음을 보여주었습니다.

## AI 실무자를 위한 시사점
**OpenGVL** 은 로봇 공학 대규모 데이터셋의 **자동화된 큐레이션 및 필터링** 을 위한 실용적인 도구로 활용될 수 있으며, 효율적인 데이터 품질 평가를 가능하게 합니다. 공개 소스 **VLM** 과 독점 모델 간의 성능 차이는 로봇 작업에 필요한 **정교한 공간 추론 능력** 을 갖춘 공개 소스 모델 개발의 시급성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.