---
title: "[논문리뷰] Distributional Semantics Tracing: A Framework for Explaining
  Hallucinations in Large Language Models"
excerpt: "Jacobo Azcona이 [arXiv]에 게시한 'Distributional Semantics Tracing: A Framework for Explaining
  Hallucinations in Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Hallucinations
  - Mechanistic Interpretability
  - Distributional Semantics Tracing (DST)
  - Dual-Process Theory
  - Semantic Drift
  - Commitment Layer
  - Faithfulness Score

permalink: /ai/review/2025-10-8-Distributional-Semantics-Tracing-A-Framework-for-Explaining-Hallucinations-in-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06107)

**저자:** Gagan Bhatia, Somayajulu G Sripada, Kevin Allan, Jacobo Azcona



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 환각 현상이 발생하는 **내재적이고 아키텍처적 원인**을 규명하는 것을 목표로 합니다. 환각을 **의미론적 드리프트(semantic drift)**의 한 형태로 가정하고, **Transformer 아키텍처** 내에서 이러한 오류가 **어떻게, 언제, 왜** 발생하는지에 대한 기계론적 설명을 제공하여 사후 감지에서 사전 진단으로 전환하고자 합니다.

## 핵심 방법론
제안된 **Distributional Semantics Tracing (DST)** 프레임워크는 **인과 경로 추적**, **패칭 개입**, **하위 시퀀스 추적**을 통합하여 모델의 추론 과정을 시각화하는 **의미론적 네트워크(Semantic Network)**를 구축합니다. **Distributional Semantics Strength (DSS)** 지표를 사용하여 모델의 문맥적 경로 일관성을 정량화하고, 이를 통해 환각 발생의 **prediction onset**, **semantic inversion point**, 그리고 되돌릴 수 없는 **commitment layer**를 식별합니다. 본 연구는 이러한 실패가 **빠른 연상적 경로(System 1)**와 **느린 문맥적 경로(System 2)** 간의 충돌, 즉 **Reasoning Shortcut Hijack**에서 비롯된다고 해석합니다.

## 주요 결과
**DST 프레임워크**는 **Racing Thoughts 벤치마크**에서 다른 모든 기존 및 고급 방법론을 능가하는 **평균 0.71**의 가장 높은 **충실도 점수(faithfulness score)**를 달성했습니다. 특히 **HALOGEN 벤치마크**의 **Gemma2-9B 모델**에서는 **0.79**의 높은 점수를 기록했습니다. 또한, 모델의 **DSS**와 환각률 사이에 **강력한 음의 상관관계 (p = -0.863, R-squared = 0.746)**를 확인하여, 문맥적 경로의 약화가 환각 발생의 신뢰성 있는 예측 지표임을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 환각을 단순한 데이터 문제가 아닌 **내재된 아키텍처적 취약성**으로 재구성하며, **사전 예방적 진단**의 중요성을 강조합니다. **DST 프레임워크**는 모델의 추론 과정을 계층별로 투명하게 분석하여, **표현 엔지니어링(representation engineering)**과 같은 기술을 통해 **'커밋먼트 레이어'**에서 직접 개입할 수 있는 구체적인 목표를 제공합니다. **DSS**와 같은 정량적 지표는 모델의 **문맥적 일관성**을 평가하고 환각 위험을 예측하는 데 활용되어, 고위험 AI 애플리케이션의 **신뢰성**을 높이고 더 **견고한 모델 아키텍처**를 설계하는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.