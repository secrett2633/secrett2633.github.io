---
title: "[논문리뷰] THOR: Tool-Integrated Hierarchical Optimization via RL for Mathematical
  Reasoning"
excerpt: "Yicheng Pan이 [arXiv]에 게시한 'THOR: Tool-Integrated Hierarchical Optimization via RL for Mathematical
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mathematical Reasoning
  - Tool-Integrated Reasoning
  - Reinforcement Learning
  - Hierarchical Optimization
  - Self-Correction
  - Large Language Models
  - Code Generation

permalink: /ai/review/2025-9-18-THOR-Tool-Integrated-Hierarchical-Optimization-via-RL-for-Mathematical-Reasoning/

toc: true
toc_sticky: true

date: 2025-09-18 13:07:00+0900
last_modified_at: 2025-09-18 13:07:00+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13761)

**저자:** Yicheng Pan, Jiefeng Ma, Pengfei Hu, Zhenrong Zhang, Qikai Chang



## 핵심 연구 목표
대규모 언어 모델(LLM)이 수학적 추론, 특히 고정밀 수치 계산 및 형식적 기호 조작과 같은 작업에서 겪는 한계를 극복하는 것을 목표로 합니다. 기존 도구 통합 방법론이 가진 **TIR 데이터 구축**, **미세 조정 최적화**, **추론 강화**의 세 가지 핵심 과제를 해결하여 LLM의 도구 통합 추론(TIR) 능력을 향상시키고자 합니다.

## 핵심 방법론
**THOR (Tool-Integrated Hierarchical Optimization via RL)**는 세 가지 주요 구성 요소를 포함합니다. 첫째, **TIRGen**이라는 **Actor-Critic 기반 파이프라인**을 사용하여 정책에 정렬된 고품질 도구 통합 추론 데이터를 효과적으로 구축합니다. 둘째, 도구 호출의 성공이 최종 답변의 정확도를 강력하게 예측한다는 핵심 통찰에 기반하여 **계층적 강화 학습(RL) 전략**을 도입, **궤적 수준 문제 해결**과 **단계별 코드 생성** 능력을 동시에 최적화합니다. 셋째, 추론 중 오류를 동적으로 수정하기 위해 즉각적인 도구 피드백을 활용하는 **자체 수정 메커니즘**을 통합합니다.

## 주요 결과
THOR는 다양한 수학 벤치마크(예: **MATH500, AIME 2024 & 2025, AMC 2023, Minerva Math, OlympiadBench**)에서 유사 규모 모델 중 **최첨단(SOTA) 성능**을 달성했습니다. 예를 들어, **THOR-Thinking-8B** 모델은 **OlympiadBench**에서 **79.8%**의 평균 정확도를 기록하며 기존 모델을 능가합니다. 또한, **HumanEval+, MBPP+, LiveCodeBench**와 같은 코드 생성 벤치마크에서도 일관된 성능 향상(최대 **7.4%** 평균 향상)을 보여주어 방법론의 효과성과 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
THOR는 수학적 추론과 코드 생성 능력을 동시에 향상시키는 **효율적인 도구 통합 프레임워크**를 제공하여, AI/ML 엔지니어가 LLM을 활용해 복잡한 문제 해결 시스템을 구축할 때 중요한 방법론적 지침을 제시합니다. 특히, **Actor-Critic 기반의 고품질 TIR 데이터 자동 생성** 및 **계층적 RL 최적화** 기법은 실제 환경에서 LLM의 견고성과 성능을 개선하는 데 활용될 수 있습니다. 또한, **자체 수정 추론 메커니즘**은 동적인 오류 처리 및 시스템의 신뢰도 향상에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.