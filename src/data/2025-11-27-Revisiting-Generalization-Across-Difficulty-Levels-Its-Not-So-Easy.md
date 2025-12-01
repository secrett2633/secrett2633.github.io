---
title: "[논문리뷰] Revisiting Generalization Across Difficulty Levels: It's Not So Easy"
excerpt: "이 [arXiv]에 게시한 'Revisiting Generalization Across Difficulty Levels: It's Not So Easy' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Generalization
  - Task Difficulty
  - Item Response Theory
  - Cross-Difficulty
  - Data Curation
  - Model Evaluation
  - Supervised Fine-Tuning

permalink: /ai/review/2025-11-27-Revisiting-Generalization-Across-Difficulty-Levels-Its-Not-So-Easy/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.21692)

**저자:** Yeganeh Kordi, Nihal V. Nayak, Max Zuo, Ilana Nguyen, Stephen H. Bach



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM)이 다양한 난이도 수준의 태스크에 대해 얼마나 잘 일반화하는지 체계적으로 조사하는 것을 목표로 합니다. 기존 연구의 혼합된 결과를 해결하고, LLM의 관점에서 객관적으로 측정된 난이도를 사용하여 **쉬운 것에서 어려운 것(easy-to-hard)** 및 **어려운 것에서 쉬운 것(hard-to-easy)** 일반화 능력을 정량화합니다.

## 핵심 방법론
연구진은 **Open LLM Leaderboard** 의 **수천 개의 LLM** 성능 데이터를 활용하여 **Item Response Theory (IRT)** ( **Rasch (1PL) 모델** )를 통해 **여섯 개 데이터셋** 의 각 예시 난이도를 객관적으로 추정했습니다. 각 데이터셋을 **10개의 동일한 난이도 구간(bins)** 으로 나눈 후, **Qwen 2.5** 및 **Llama 3** 계열의 LLM을 개별 난이도 구간 데이터로 **Supervised Fine-Tuning (SFT)** 하고, 이를 모든 난이도 구간에 걸쳐 평가하여 제로샷 성능 대비 개선도를 분석했습니다.

## 주요 결과
LLM은 **약한 교차-난이도 일반화 능력** 을 보였습니다. 쉬운 데이터 또는 어려운 데이터로만 훈련했을 때 난이도 범위 전반에 걸쳐 일관된 개선을 달성하지 못했습니다. 특히 **훈련-테스트 난이도 간 격차가 커질수록 일반화 성능이 저하** 되었으며, 가장 인접한 난이도 구간에서 최고의 성능을 보였습니다. 예를 들어, **Qwen2.5 14B Instruct** 모델은 **MMLU-Pro** 데이터셋에서 쉬운 bin 0으로 훈련했을 때 bin 5 이상에서 성능이 크게 감소하는 것을 보여주었습니다 (Figure 3).

## AI 실무자를 위한 시사점
이 연구는 LLM 훈련 및 평가 데이터셋에 **다양한 난이도 수준을 포함하는 것의 중요성** 을 강조합니다. 쉬운 데이터 또는 어려운 데이터만으로 훈련하는 것은 일관된 일반화 성능을 보장하지 못하며, 이는 데이터 큐레이션 시 **난이도 분포에 대한 신중한 고려** 가 필요함을 시사합니다. 또한, 인간 중심의 난이도 측정 대신 **LLM 기반의 IRT 난이도 점수** 가 LLM의 실제 난이도를 더 잘 반영하므로, **난이도 인식 기반의 데이터 설계** 가 모델 성능 향상에 필수적임을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.