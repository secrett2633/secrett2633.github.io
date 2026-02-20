---
title: "[논문리뷰] Forget BIT, It is All about TOKEN: Towards Semantic Information Theory
  for LLMs"
excerpt: "Bo Bai이 arXiv에 게시한 'Forget BIT, It is All about TOKEN: Towards Semantic Information Theory
  for LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Semantic Information Theory
  - Large Language Models
  - Directed Information
  - Rate-Distortion Function
  - Granger Causality
  - Token Embedding
  - Transformer Architecture
  - Variational Inference

permalink: /ai/review/2025-11-5-Forget-BIT-It-is-All-about-TOKEN-Towards-Semantic-Information-Theory-for-LLMs/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01202)

**저자:** Bo Bai



## 핵심 연구 목표
본 논문은 LLM(Large Language Model)의 내부 작동 원리를 이론적으로 설명하기 위해 **비트(bits) 대신 토큰(token) 기반의 새로운 의미론적 정보 이론 프레임워크** 를 구축하는 것을 목표로 합니다. 기존의 실험 중심 연구에서 벗어나 LLM의 "블랙박스"를 정보 이론적 관점에서 해석하고, 그 기반 원리를 체계적으로 정립하고자 합니다.

## 핵심 방법론
LLM을 **피드백 및 상태를 가진 이산 시간 채널** 로서 **다음 토큰 예측기** 로 정의하고 확률론적 모델을 제안합니다. 사전 훈련 단계에서는 **지향성 속도-왜곡 함수(directed rate-distortion function)** 를, 후속 훈련 단계에서는 **지향성 속도-보상 함수(directed rate-reward function)** 를 도입하며, 추론 단계에서는 **의미론적 정보 흐름(semantic information flow)** 을 정의합니다. 또한, **토큰 수준의 의미론적 임베딩** 및 정보 이론적으로 최적의 **벡터화 방법** 을 탐구하고, **자기회귀 LLM(AR-LLM)에 대한 일반적인 수학적 정의** 를 제시하여 **Transformer 아키텍처** 가 이 프레임워크의 특수 사례임을 이론적으로 도출합니다.

## 주요 결과
이론적 분석을 통해 LLM의 사전 훈련 목적이 **지향성 정보(directed information)** 최소화와 등가임을 보였으며, 이는 **ELBO(Evidence Lower Bound)** 최대화 문제로 귀결됩니다. 또한, 훈련 후 LLM이 **인간 수준의 그레인저 인과성(Granger causality)** 에 근접하여 다음 토큰을 예측함을 시사합니다. 본 논문은 LLM의 이론적 성능 한계, 예를 들어 **Transformer의 일반화 오차 한계** 및 **메모리 용량(Gardner capacity)** 에 대한 이론적 근거를 제공하지만, 모델의 정량적 성능 지표는 명시적으로 제시되지 않았습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 작동 방식에 대한 깊은 이론적 이해를 제공하여, 단순히 실험에 의존하는 것을 넘어 **더욱 효율적이고 근본적인 아키텍처 설계와 훈련 방법** 을 모색하는 데 기여할 수 있습니다. **토큰 수준의 의미론적 임베딩 및 최적의 벡터화** 에 대한 통찰은 임베딩 기술 개선에 실질적인 방향을 제시하며, **Transformer의 ELBO 및 일반화 오류 분석** 은 모델의 학습 과정과 신뢰성을 이해하는 데 중요한 기반 지식을 제공합니다. 궁극적으로는 LLM의 **환각 현상(hallucinations) 방지** 및 **확장성 법칙(scaling laws)** 이해에 필요한 이론적 도구를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.