---
title: "[논문리뷰] Thinking Augmented Pre-training"
excerpt: "Furu Wei이 arXiv에 게시한 'Thinking Augmented Pre-training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Pre-training
  - Data Augmentation
  - Reasoning
  - Data Efficiency
  - Thinking Trajectories

permalink: /ai/review/2025-9-26-Thinking-Augmented-Pre-training/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.20186)

**저자:** Liang Wang, Nan Yang, Shaohan Huang, Li Dong, Furu Wei



## 핵심 연구 목표
본 논문은 `대규모 언어 모델(LLM)` 훈련 시 `고품질 데이터의 제한된 가용성`과 `복잡한 추론 토큰 학습의 어려움`이라는 문제를 해결하고자 합니다. `사고 궤적(thinking trajectories)`으로 기존 텍스트 데이터를 보강하여 `LLM 훈련의 데이터 효율성`을 대폭 개선하고 `모델의 추론 능력`을 향상시키는 것이 주된 연구 목표입니다.

## 핵심 방법론
저자들은 `Thinking Augmented Pre-Training (TPT)`이라는 방법론을 제안합니다. 이는 `사전에 훈련된 오픈소스 LLM`을 활용하여 원문(`d`)에 대한 `자동으로 생성된 사고 궤적(t)`을 추가하여 증강된 훈련 샘플 `x = [d; t]`를 생성합니다. 이 증강된 데이터셋에 대해 `표준 next-token prediction 손실`을 최소화하는 방식으로 모델을 훈련하며, 이는 복잡한 토큰에 `동적으로 더 많은 훈련 연산량`을 할당하고 고품질 데이터를 `자연스럽게 업샘플링`하는 효과를 가져옵니다.

## 주요 결과
`TPT`는 `LLM 사전 훈련의 데이터 효율성`을 `최대 3배` 향상시키는 것으로 나타났습니다. 특히 `수학적 추론 벤치마크`에서 두드러진 성능 향상을 보였는데, `3B 파라미터 모델`의 경우 `GSM8k` 및 `MATH` 데이터셋에서 `10% 이상` 성능이 개선되었고, `TPT-8B 모델`은 `100B 토큰` 훈련으로 `150배 더 많은 데이터(15T 토큰)`로 훈련된 `LLaMA-3.1-8B`와 `비슷한 점수`를 달성했습니다. `SFT` 후에는 `AIME24`에서 `1.0%`에서 `35.2%`로 성능이 크게 상승했습니다.

## AI 실무자를 위한 시사점
`TPT`는 `고품질 데이터가 부족한 환경`에서 LLM의 `성능과 데이터 효율성`을 극대화할 수 있는 `확장 가능하고 실용적인` `데이터 엔지니어링 전략`을 제시합니다. 특히 `추론 집약적인 애플리케이션`에서 모델의 `문제 해결 능력`을 강화하는 데 매우 유용하며, `자동화된 사고 궤적 생성`은 `수동 개입 없이` 훈련 데이터의 질을 높이는 효과적인 방법론으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.