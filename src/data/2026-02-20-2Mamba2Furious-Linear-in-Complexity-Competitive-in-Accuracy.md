---
title: "[논문리뷰] 2Mamba2Furious: Linear in Complexity, Competitive in Accuracy"
excerpt: "Eric C. Larson이 [arXiv]에 게시한 '2Mamba2Furious: Linear in Complexity, Competitive in Accuracy' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Linear Attention
  - Mamba-2
  - High-Order Attention
  - Model Efficiency
  - Long Context
  - Transformer
  - State Space Models

permalink: /ai/review/2026-02-20-2Mamba2Furious-Linear-in-Complexity-Competitive-in-Accuracy/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.17363)

**저자:** Gabriel Mongaras, Eric C. Larson



## 핵심 연구 목표
본 논문은 효율성이 높지만 정확도가 낮은 **선형 어텐션** 과 정확도는 높지만 연산 복잡도가 높은 **소프트맥스 어텐션** 간의 격차를 해소하는 것을 목표로 합니다. 구체적으로 **Mamba-2** 의 표현력을 향상시켜 소프트맥스 어텐션에 필적하는 정확도를 달성하면서도 선형적인 복잡도를 유지하는 새로운 어텐션 메커니즘을 제안합니다.

## 핵심 방법론
연구팀은 먼저 **Mamba-2** 를 **Mamba-2S** 라는 간소화된 형태로 분석하여 핵심 구성 요소인 **softplus A-mask** 와 **입력 컨볼루션(w=2)** 을 식별했습니다. 이 **Mamba-2S** 를 기반으로 **QK 내적을 제곱** 하여 숨겨진 상태의 차수를 높이는 **2Mamba** 를 제안하였으며, 이는 **소프트맥스 정규화** 와 함께 사용됩니다. 추가적으로, **QK 내적을 지수화** 하여 **2Mamba-E** 를 탐색하고, **Triton 커널** 을 활용하여 효율적인 구현을 달성했습니다.

## 주요 결과
**2Mamba** 는 소프트맥스 어텐션에 "거의 필적하는 정확도"를 달성하며, **2Mamba-E** 는 "소프트맥스 어텐션보다 약간 더 나은 정확도"를 보였습니다. 특히 **64의 헤드 차원** 을 기준으로 약 **1058 토큰 이상** 의 시퀀스 길이에서 **소프트맥스 어텐션의 KV 캐시** 보다 메모리 효율성이 뛰어남을 입증했습니다. 또한, **Needle In A Haystack (NIAH) 테스트** 에서 **Mamba-2** 보다 뛰어난 컨텍스트 활용 능력을 보여주었습니다.

## AI 실무자를 위한 시사점
**2Mamba** 는 **긴 컨텍스트 길이** 를 다루는 대규모 언어 모델(LLM) 개발 시 **메모리 및 연산 효율성** 을 크게 향상시키면서도 **소프트맥스 어텐션 수준의 정확도** 를 유지할 수 있는 실용적인 대안을 제공합니다. 이는 특히 리소스 제약이 있는 환경에서 고성능 모델을 구축하는 데 중요한 의미를 가집니다. **Mamba-2S** 의 구성 요소 분석은 **선형 어텐션의 성능을 최적화** 하는 데 필요한 핵심 요소를 명확히 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.