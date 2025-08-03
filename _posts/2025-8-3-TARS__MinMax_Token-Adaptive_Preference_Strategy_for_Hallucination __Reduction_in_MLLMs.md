---
title: "[논문리뷰] TARS: MinMax Token-Adaptive Preference Strategy for Hallucination
  Reduction in MLLMs"
excerpt: "Jiasheng Tang이 [arXiv]에 게시한 'TARS: MinMax Token-Adaptive Preference Strategy for Hallucination
  Reduction in MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - [Review]

permalink: /ai/review/2025-8-3-TARS__MinMax_Token-Adaptive_Preference_Strategy_for_Hallucination__Reduction_in_MLLMs/

toc: true
toc_sticky: true

date: 2025-08-03 07:35:17+0900
last_modified_at: 2025-08-03 07:35:17+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.21584)

**저자:** Kejia Zhang, Keda Tao, Zhiming Luo, Chang Liu, Jiasheng Tang, Huan Wang

**키워드:** `MLLMs`, `Hallucination Reduction`, `Preference Optimization`, `Min-Max Optimization`, `Token-Adaptive Strategy`, `Spectral Regularization`, `Visual Grounding`

## 핵심 연구 목표
멀티모달 대규모 언어 모델(MLLMs)에서 발생하는 **환각(hallucination)** 문제를 해결하고 신뢰성을 향상하는 것이 목표입니다. 기존 **직접 선호도 최적화(DPO)** 방식이 선호도 데이터의 표면적인 언어적 특징에 과적합되어 시각적 정보와의 인과적 연결이 약해지는 한계를 극복하고자 합니다.

## 핵심 방법론
본 논문은 **TARS(Token-Adaptive Preference Strategy)**를 제안하며, DPO를 **min-max 최적화 문제**로 재구성합니다. 내부 최대화 단계에서는 **시각적으로 관련 없는 토큰(visual-agnostic tokens)**에 **토큰 수준 교란(token-level perturbations)**을 도입하여 정렬 불확실성을 시뮬레이션하고, 외부 최소화 단계에서는 이 교란된 입력 하에서 **예상 선호도 손실을 최소화**합니다. 또한, **주파수 영역 정렬(spectral preference alignment)**을 도입하여 모델이 고정된 선호도 패턴에 과적합되지 않도록 합니다.

## 주요 결과
**LLaVA-v1.5-13B** 모델에 **TARS**를 적용한 결과, AMBER 벤치마크에서 환각률을 **26.4%에서 13.2%**로 감소시키고, 인지 불일치 값(Cognition value)을 **2.5에서 0.4**로 줄였습니다. 이는 단 **4.8k**의 선호도 샘플과 전문가 피드백 없이 달성된 결과이며, 여러 핵심 지표에서 **GPT-4o**의 성능과 유사한 수준을 보였습니다.

## AI 실무자를 위한 시사점
**TARS**는 소규모 데이터와 전문가 피드백 없이도 MLLM의 환각을 효과적으로 줄이는 **가볍고 일반화 가능한 접근 방식**을 제공합니다. 이는 MLLM의 신뢰성과 실제 적용 가능성을 높이는 데 기여하며, 특히 **시각적 정보에 대한 인과적 접지(causal grounding)**를 강화하여 모델의 예측이 더 사실적이고 충실하도록 돕습니다. 제안된 **토큰 적응형 교란 전략**은 다른 선호도 학습 방법론에도 적용될 수 있는 잠재력이 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
