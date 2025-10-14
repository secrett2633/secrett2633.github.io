---
title: "[논문리뷰] On the Expressiveness of Softmax Attention: A Recurrent Neural Network
  Perspective"
excerpt: "Eric C. Larson이 [arXiv]에 게시한 'On the Expressiveness of Softmax Attention: A Recurrent Neural Network
  Perspective' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Softmax Attention
  - Linear Attention
  - Recurrent Neural Networks (RNNs)
  - Taylor Series Expansion
  - Attention Mechanisms
  - Expressiveness
  - Transformer Architectures

permalink: /ai/review/2025-8-3-On_the_Expressiveness_of_Softmax_Attention__A_Recurrent_Neural_Network__Perspective/

toc: true
toc_sticky: true

date: 2025-08-03 07:35:17+0900
last_modified_at: 2025-08-03 07:35:17+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.23632)

ON THE EXPRESSIVENESS OF SOFTMAX ATTENTION: A RECURRENT NEURAL NETWORK PERSPECTIVE

**저자:** Gabriel Mongaras, Eric C. Larson

**키워드:** `Softmax Attention`, `Linear Attention`, `Recurrent Neural Networks (RNNs)`, `Taylor Series Expansion`, `Attention Mechanisms`, `Expressiveness`, `Transformer Architectures`

## 핵심 연구 목표
이 논문은 **Softmax Attention**이 **선형 Attention**보다 우수한 성능을 보이는 근본적인 이유를 규명하고, **Softmax Attention**의 표현력과 동작 원리를 **재귀 신경망(RNN)** 관점에서 분석하는 것을 목표로 합니다. 특히, **Softmax Attention**을 **RNN 형태**로 재구성함으로써 그 구성 요소들이 성능에 어떻게 기여하는지 이해하고자 합니다.

## 핵심 방법론
저자들은 **Softmax Attention**의 분자를 **Taylor 급수 전개**를 사용하여 **무한한 RNN들의 합**으로 표현했습니다. 이를 통해 **선형 Attention**이 **Softmax Attention**의 **1차 근사(n=1 항)** 임을 수학적으로 증명하고, 고차항들이 모델의 표현력에 기여하는 방식을 분석했습니다. 또한, **Softmax Attention**의 분모를 **게이트(Gate)** 또는 **정규화(Norm)** 메커니즘으로 재해석하여 **Llama 2 모델** 기반의 언어 모델링 태스크에서 다양한 **Attention 변형**들의 성능을 비교하는 **어블레이션 스터디(ablation study)**를 수행했습니다.

## 주요 결과
실험 결과, **Softmax Attention**의 분모를 **L2 노름**으로 대체한 모델이 원본 **Softmax Attention**과 **정확히 일치하는 손실 곡선**을 보이며 수치적으로 안정적임을 확인했습니다. 또한, **선형 Attention**은 **Softmax Attention**의 **1차 근사**임이 입증되었고, **Taylor 급수**의 고차항을 **n=10**까지 추가했을 때 재귀 근사 모델이 **Softmax Attention**과 **거의 동일한 성능**을 달성하며 **선형 Attention** 변형들을 **상당한 격차**로 능가했습니다.

## AI 실무자를 위한 시사점
이 연구는 **Softmax Attention**의 높은 표현력과 성능이 **쿼리(Q)와 키(K) 벡터 간의 고차 곱셈 상호작용** 및 **효과적인 정규화 메커니즘**에 기인함을 시사합니다. **선형 Attention**이 왜 성능 면에서 **Softmax Attention**에 미치지 못하는지 수학적, 실험적으로 설명하며, 향후 **더욱 효율적이고 표현력 있는 Attention 메커니즘** 개발에 대한 이론적 기반을 제공할 수 있습니다. 특히, 분모의 역할이 **정확한 지수 함수 형태**보다는 **안정적인 노름 연산**에 있음을 보여주어, 잠재적으로 **Softmax Attention**의 연산 효율성을 개선할 여지를 남깁니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
