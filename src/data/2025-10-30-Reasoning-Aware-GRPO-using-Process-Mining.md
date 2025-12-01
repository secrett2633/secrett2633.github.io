---
title: "[논문리뷰] Reasoning-Aware GRPO using Process Mining"
excerpt: "이 [arXiv]에 게시한 'Reasoning-Aware GRPO using Process Mining' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Process Mining
  - Policy Optimization
  - Mathematical Reasoning
  - GRPO
  - PM4GRPO

permalink: /ai/review/2025-10-30-Reasoning-Aware-GRPO-using-Process-Mining/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25065)

**저자:** Taekhyun Park, Yongjae Lee, Hyerin Bae



## 핵심 연구 목표
본 논문은 대규모 추론 모델을 위한 `GRPO` (Group Relative Policy Optimization) 기반 후처리 학습의 효과를 강화하는 것을 목표로 합니다. 기존 `RL` 기반 방법론들이 주로 결과 중심적이라는 한계를 극복하고, 추론 과정 자체를 평가하는 **Process Mining (PM) 기법** 을 도입하여 모델이 더 신뢰할 수 있고 정확한 추론 과정을 생성하도록 개선하고자 합니다.

## 핵심 방법론
제안된 프레임워크인 **PM4GRPO** 는 `GRPO`에 **Process Mining 기법** 을 통합하여 추론 과정의 품질을 평가합니다. 특히, 정책 모델이 생성한 추론 과정이 사전 훈련된 티처 모델의 추론 과정과 얼마나 일치하는지를 측정하는 새로운 **적합성 보상 (conformance reward, Rc)** 을 도입합니다. 최종 보상 함수는 기존의 **형식 보상 (format reward, Rf)** 과 **정답 보상 (answer reward, Ra)** 에 이 **적합성 보상** 을 추가하여 구성됩니다 (R(x,y) = Rf + Ra + Rc).

## 주요 결과
`PM4GRPO`는 7B 모델에서 `MATH 500`에서 **91.1%** , `Olympiad Bench`에서 **61.1%** 의 최고 점수를 달성하여 `R1-Distill-Qwen` 및 `Skywork-OR1`과 같은 강력한 기준선을 능가했습니다. 1.5B 모델에서도 `MATH 500`에서 **83.9%** , `Olympiad Bench`에서 **52.7%** 를 기록하며 `STILL-3`보다 전반적으로 우수한 성능을 보였고, 모든 벤치마크에서 균형 잡힌 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 `LLM` 개발에서 단순한 최종 정답의 정확성을 넘어 **추론 과정의 품질** 이 중요함을 강조합니다. `AI/ML` 엔지니어는 **Process Mining 기법** 을 활용하여 수학적 추론과 같이 구조화된 추론이 필요한 도메인에서 보다 견고하고 해석 가능한 `LLM`을 구축할 수 있습니다. **적합성 보상** 개념은 모델의 추론을 전문가 지식이나 강력한 티처 모델과 일치시키는 실용적인 방법을 제공하여, 더 신뢰할 수 있는 AI 시스템을 개발하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.