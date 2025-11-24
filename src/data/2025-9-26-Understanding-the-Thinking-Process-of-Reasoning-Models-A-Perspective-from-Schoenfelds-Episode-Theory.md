---
title: "[논문리뷰] Understanding the Thinking Process of Reasoning Models: A Perspective
  from Schoenfeld's Episode Theory"
excerpt: "Yanbin Fu이 [arXiv]에 게시한 'Understanding the Thinking Process of Reasoning Models: A Perspective
  from Schoenfeld's Episode Theory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Reasoning Models
  - Cognitive Science
  - Schoenfeld's Episode Theory
  - Math Problem Solving
  - Chain-of-Thought
  - Behavioral Analysis
  - Dataset Annotation

permalink: /ai/review/2025-9-26-Understanding-the-Thinking-Process-of-Reasoning-Models-A-Perspective-from-Schoenfelds-Episode-Theory/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.14662)

**저자:** Ming Li, Nan Zhang, Chenrui Fan, Hong Jiao, Yanbin Fu, Sydney Peters, Qingshu Xu, Robert Lissitz, Tianyi Zhou



## 핵심 연구 목표
본 논문은 **Large Reasoning Models (LRMs)**이 생성하는 **Chain-of-Thought (CoT)** 추론 과정의 내부 구조와 사고 패턴을 체계적으로 이해하는 데 필요한 프레임워크의 부재 문제를 해결합니다. 인간의 수학 문제 해결 인지 이론인 **Schoenfeld's Episode Theory**를 LRM의 추론 과정 분석에 적용하여, 모델의 사고 방식을 해석하고 투명성을 높이는 이론적 기반을 마련하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **Schoenfeld's Episode Theory**에 기반한 계층적 주석 시스템을 개발하여, LRM 응답을 문단 수준(General, Explore, Verify)과 문장 수준(Read, Analyze, Plan, Implement, Explore, Verify, Monitor)의 **7가지 인지 범주**로 분류했습니다. **DeepSeek-R1** 모델이 **SAT Mathematics** 문제에 대해 생성한 추론 트레이스 중 38개 문제(915개 문단, 3,087개 문장)를 수동으로 주석 처리하여, LRM 추론 분석을 위한 **최초의 공개 벤치마크**를 구축했습니다. 또한, **LLM 기반 zero-shot 방법(GPT-4.1, GPT-4o, Gemini-2.0-flash)** 및 **BERT, RoBERTa**와 같은 학습 기반 모델의 자동 주석 성능을 평가했습니다.

## 주요 결과
LRM의 추론 과정은 **Schoenfeld's Episode Theory**의 에피소드와 유사한 구조를 보였으며, Read-Analyze, Plan-Implement, Explore-Analyze와 같은 **인지 상태 간의 높은 전환 확률**이 관찰되었습니다. 자동 주석 실험에서는 **GPT-4.1 (Ex+Guide 프롬프트)**가 문장 수준에서 **0.805의 정확도**와 **0.764의 Cohen's κ**를 기록하며 가장 우수한 성능을 나타냈습니다. 혼동 행렬 분석 결과, 특히 **Analyze-Verify, Implement-Verify, Verify-Implement**와 같은 특정 인지 전환에서 모델의 주석 정확도가 낮아, 복합적인 메타인지 활동 구분에 대한 추가 연구가 필요함을 시사했습니다.

## AI 실무자를 위한 시사점
본 연구는 **Schoenfeld's Episode Theory**를 활용하여 LRM의 추론 과정을 **인간의 인지 모델**로 해석할 수 있는 강력한 프레임워크를 제공합니다. 공개된 **주석 데이터셋**과 **분석 프로토콜**은 LRM의 동작을 더욱 투명하게 이해하고, 모델의 **메타인지 능력**을 향상시키기 위한 새로운 연구 방향을 제시합니다. 특히, 모델의 추론 과정에서 취약한 부분을 식별하여, 향후 **더욱 제어 가능하고 신뢰할 수 있는 추론 시스템**을 개발하는 데 실질적인 가이드를 제공할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.