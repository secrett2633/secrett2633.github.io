---
title: "[논문리뷰] Mind the Gap: A Closer Look at Tokenization for Multiple-Choice Question
  Answering with LLMs"
excerpt: "Katharina von der Wense이 [arXiv]에 게시한 'Mind the Gap: A Closer Look at Tokenization for Multiple-Choice Question
  Answering with LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Evaluation
  - Multiple-Choice QA
  - Tokenization
  - Prompt Sensitivity
  - Accuracy
  - Calibration
  - Model Ranking

permalink: /ai/review/2025-9-19-Mind-the-Gap-A-Closer-Look-at-Tokenization-for-Multiple-Choice-Question-Answering-with-LLMs/

toc: true
toc_sticky: true

date: 2025-09-19 13:12:21+0900
last_modified_at: 2025-09-19 13:12:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15020)

**저자:** Mario Sanz-Guerrero, Minh Duc Bui, Katharina von der Wense



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 객관식 질문 답변(MCQA) 평가 시, 답변 레이블 직전의 공백 문자 토큰화 방식이 모델 성능에 미치는 영향을 규명하는 것을 목표로 합니다. 현재 표준화되지 않은 관행으로 인해 발생하는 성능 및 모델 순위 변화를 분석하고, 신뢰성 있는 LLM 비교를 위한 최적의 토큰화 전략을 제시하고자 합니다.

## 핵심 방법론
연구진은 **15개 LLM**과 **6개 MCQA 데이터셋**(**MMLU, ARC Challenge, HellaSwag 등**)을 사용하여 실험을 수행했습니다. 공백이 없는 "Letter token" (**"X"**) 방식과 공백이 포함된 "Space-Letter token" (**"_X"**) 방식의 두 가지 토큰화 전략을 비교했으며, **정확도**와 **예측 보정 오차(ECE)**를 주요 지표로 측정했습니다. 통계적 유의성 검정(**McNemar's test** 및 **paired bootstrap resampling**)을 통해 결과의 신뢰성을 확보하고, 다양한 프롬프트 형식과 언어에 대한 **강건성**을 검증했습니다.

## 주요 결과
"Space-Letter token" (**"_X"**) 전략을 사용했을 때 대부분의 모델과 데이터셋에서 **최대 11%의 정확도 향상**이 관찰되었으며, 이는 통계적으로 유의미했습니다. 또한, **예측 보정 오차(ECE)가 최대 4배 감소**하여 모델 예측의 신뢰성이 크게 개선되었습니다. 흥미롭게도 이 사소한 토큰화 방식의 변화만으로 **모델 순위가 재편**되었는데, 예를 들어 Llama 3.1 70B Instruct가 "Letter token" 방식에서 1위였으나, "Space-Letter token" 방식에서는 Qwen 2.5 72B가 1위로 올라섰습니다.

## AI 실무자를 위한 시사점
AI 실무자는 LLM 평가 시 **사소해 보이는 토큰화 방식**이 모델의 **정확도, 보정, 그리고 순위에 심대한 영향**을 미칠 수 있음을 인지해야 합니다. MCQA 평가에서는 공백을 답변 레이블과 함께 토큰화하는 **"Space-Letter token" ("_X") 전략**이 일관된 성능 향상과 더 높은 예측 신뢰성을 제공하므로 이를 채택하는 것이 권장됩니다. 이는 **LLM 평가 프로토콜의 표준화**가 필수적임을 강조하며, 신뢰할 수 있는 모델 비교를 위해 세부적인 구현 사항에 대한 투명성이 중요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.