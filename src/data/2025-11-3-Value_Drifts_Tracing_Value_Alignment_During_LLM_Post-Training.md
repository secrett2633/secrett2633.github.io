---
title: "[논문리뷰] Value Drifts: Tracing Value Alignment During LLM Post-Training"
excerpt: "이 [arXiv]에 게시한 'Value Drifts: Tracing Value Alignment During LLM Post-Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Alignment
  - Value Drift
  - Supervised Fine-Tuning (SFT)
  - Preference Optimization
  - RLHF
  - Llama-3
  - Qwen-3
  - Human Values

permalink: /ai/review/2025-11-3-Value_Drifts_Tracing_Value_Alignment_During_LLM_Post-Training/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26707)

**저자:** Mehar Bhatia, Shravan Nayak, Gaurav Kamath, Marius Mosbach, Karolina Stańczak, Vered Shwartz, Siva Reddy



## 핵심 연구 목표
본 연구는 LLM의 가치 정렬이 사후 훈련 과정에서 언제, 어떻게 발생하는지에 대한 기존 연구의 공백을 해결하고자 합니다. 특히, 모델이 인간의 가치를 학습하고 표현하는 훈련 역학을 간과하는 문제에 주목하여, 사후 훈련 단계에서 모델의 가치가 어떻게 진화하는지 추적하고 정량화하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 LLM의 응답에서 나타나는 '입장(stance)'(지지, 중립, 반대)을 통해 모델의 가치를 **GPT-4o**로 분류하는 방법론을 사용합니다. 이를 통해 **드리프트 크기(drift magnitude)** 및 **드리프트 시간(drift time)**이라는 두 가지 메트릭으로 가치 변화를 정량화합니다. 실험은 **Llama-3** 및 **Qwen-3** 모델을 대상으로 **WildChat** 및 **Alpaca** 데이터셋으로 **SFT**를 수행하고, **UltraFeedback** 및 **HH-RLHF** 데이터셋으로 **PPO**, **DPO**, **SIMPO** 등의 선호도 최적화를 적용하여 진행되었습니다. 또한, 알고리즘의 본질적 특성을 분리하기 위해 **합성 선호도 데이터셋**을 구축하여 사용했습니다.

## 주요 결과
**SFT 단계**가 모델의 최종 가치 프로필을 형성하는 주된 동인임을 발견했으며, 모델의 입장은 지시 튜닝 데이터 분포에 빠르게 정렬되었습니다(예: **WildChat**으로 훈련된 **Llama3-3B**의 이민 정책에 대한 중립 입장 드리프트 크기 **0.38**). 반면, 일반적인 선호도 데이터셋(UltraFeedback, HH-RLHF)은 '가치 간극(value-gap)'이 작아 모델의 가치에 거의 변화를 주지 못했습니다. 그러나 통제된 가치 간극을 가진 **합성 선호도 데이터셋**을 사용했을 때, **DPO**는 선택된 입장을 크게 증폭시켰고(예: 지지 정렬 시 **Llama3-3B** 이민 정책 지지 드리프트 크기 **0.53**), **SIMPO**는 적당한 가치 드리프트를 보였습니다(**0.15**).

## AI 실무자를 위한 시사점
**SFT 데이터셋**의 선택이 LLM의 초기 가치 설정을 결정하는 데 결정적인 역할을 하므로, 초기 모델 훈련 시 데이터 큐레이션에 대한 신중한 접근이 필요합니다. 또한, 선호도 최적화 단계에서 모델의 가치를 효과적으로 재형성하려면 **충분한 가치 간극을 포함하는 선호도 데이터셋**을 구축하는 것이 중요합니다. 마지막으로, **PPO, DPO, SIMPO**와 같은 다양한 선호도 최적화 알고리즘이 가치 정렬에 미치는 영향이 다르므로, 특정 윤리적 또는 가치 목표에 따라 **알고리즘을 선택**하는 것이 모델의 인간 가치 정렬을 개선하는 데 핵심적인 고려 사항입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.