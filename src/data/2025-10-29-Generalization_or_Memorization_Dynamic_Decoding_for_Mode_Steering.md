---
title: "[논문리뷰] Generalization or Memorization: Dynamic Decoding for Mode Steering"
excerpt: "이 [arXiv]에 게시한 'Generalization or Memorization: Dynamic Decoding for Mode Steering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Generalization
  - Memorization
  - Information Bottleneck (IB)
  - Activation Steering
  - Decoding Strategy
  - Causal Intervention
  - LLM Reliability

permalink: /ai/review/2025-10-29-Generalization_or_Memorization_Dynamic_Decoding_for_Mode_Steering/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.22099)

**저자:** Xuanming Zhang



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 보이는 예측 불가능한 일반화(Generalization)와 암기(Memorization) 간의 전환 문제를 해결하는 것이 목표입니다. 이러한 이중적인 추론 모드를 이해하고, 식별하며, 제어하는 통일된 프레임워크를 제시하여 LLM의 신뢰성을 향상시키고자 합니다.

## 핵심 방법론
논문은 **정보 병목(Information Bottleneck, IB) 원리**에 기반한 이론적 모델을 통해 일반화와 암기를 형식화합니다. 이를 바탕으로 **동적 모드 조종(Dynamic Mode Steering, DMS)**이라는 추론 시간 알고리즘을 제안합니다. DMS는 **선형 프로브**로 모델의 암기 의존도를 실시간으로 식별하고, **활성화 패치(Activation Patching)**를 통해 식별된 인과적 핵심 레이어(**Llama-3 8B는 22층, 70B는 55층**)에서 **일반화 조종 벡터(generalization-steering vector)**를 적용하여 모델의 계산을 일반화 회로 쪽으로 유도합니다. 이 조종 벡터는 실시간 암기 점수와 하이퍼파라미터 **α (최적 1.4)**에 의해 동적으로 스케일링됩니다.

## 주요 결과
**DMS**는 **Llama-3 8B 및 70B** 모델에서 복잡한 추론 및 사실적 충실도 태스크 성능을 크게 향상시켰습니다. 특히 **GSM8K 벤치마크**에서 Llama-3 8B는 **68.3% Pass@1 정확도(+6.2%)**를, Llama-3 70B는 **86.7%(+5.2%)**를 달성했습니다. **TruthfulQA 벤치마크**에서는 Llama-3 8B가 **61.8%(+6.4%)**를, Llama-3 70B가 **74.3%(+5.4%)**를 기록하며 모든 기준선을 일관되게 능가했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 내부 추론 모드를 이해하고 제어할 수 있는 실용적인 메커니즘을 제공하여 AI 안전성 및 신뢰성 향상에 기여합니다. 특히, **DMS**는 암기된 오류나 사실 왜곡을 줄이고 복잡한 추론 문제의 논리적 일관성을 높이는 데 활용될 수 있습니다. **정보 병목 이론**과 **인과적 개입**을 결합한 이 프레임워크는 모델 정렬 및 블랙박스 해석 가능성 연구에 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.