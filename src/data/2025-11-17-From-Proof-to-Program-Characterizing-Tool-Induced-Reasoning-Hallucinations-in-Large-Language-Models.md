---
title: "[논문리뷰] From Proof to Program: Characterizing Tool-Induced Reasoning Hallucinations in Large Language Models"
excerpt: "이 [arXiv]에 게시한 'From Proof to Program: Characterizing Tool-Induced Reasoning Hallucinations in Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Tool-augmented LLMs
  - Reasoning Hallucinations
  - Tool-Induced Myopia (TIM)
  - Code Interpreter
  - Mathematical Reasoning
  - LLM Evaluation
  - Preference Optimization

permalink: /ai/review/2025-11-17-From-Proof-to-Program-Characterizing-Tool-Induced-Reasoning-Hallucinations-in-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-11-17 00:00:00+0900+0900
last_modified_at: 2025-11-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.10899)

**저자:** Farima Fatahi Bayat, Pouya Pezeshkpour, Estevam Hruschka



## 핵심 연구 목표
본 연구는 **도구 증강 언어 모델(TaLMs)**이 외부 도구를 사용할 때 발생하는 **추론 환각(reasoning hallucinations)**의 새로운 유형인 **Tool-Induced Myopia (TIM)**를 식별하고 특성화하는 것을 목표로 합니다. TaLMs가 도구 출력을 추론의 대체물로 사용하여 표면적으로는 올바르지만, 실제로는 일관성 없는 정당성이 부족한 해결책을 생성하는 문제에 주목합니다.

## 핵심 방법론
연구자들은 TIM을 유발, 측정, 완화하기 위해 **1,679개**의 경쟁 수준 수학 문제로 구성된 벤치마크 데이터셋인 **PYMATH**를 도입했습니다. **Final-answer Accuracy**, **Win Rate**, **Miss Rate**, **PRM Accuracy**의 4차원 평가 방식을 사용하여 TaLMs와 기본 LLM의 추론 행동을 비교했습니다. TIM 완화 전략으로 **프롬프트 기반 개입**과 **Direct Preference Optimization (DPO)** 기반의 파인튜닝 프레임워크를 제안했습니다.

## 주요 결과
TaLMs는 최종 답변 정확도에서 최대 **19.3%p**의 향상을 보였지만, 추론 행동은 일관되게 저하되었습니다(예: 비도구 LLM이 추론 과정 쌍대 비교에서 **41.5%** 더 자주 승리). 도구 사용이 증가할수록 추론 일관성은 낮아졌고, 오류 유형은 산술적 실수에서 논리, 가정, 창의성과 같은 전반적인 추론 실패로 전환되었습니다. 특히 고위험 사례의 약 **55%**에서 TIM이 발견되었으며, **DPO 파인튜닝**을 통해 TaLMs는 최종 답변 정확도와 추론 깊이 모두에서 개선(바닐라 TaLM 대비 **+0.6%** 정확도)을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **도구 증강 LLM**의 최종 답변 정확도만으로는 신뢰할 수 없는 추론 과정을 숨길 수 있음을 인지해야 합니다. **PYMATH**와 같은 다차원 평가 지표를 활용하여 모델의 추론 깊이와 일관성을 평가하는 것이 중요합니다. 또한, **프롬프트 엔지니어링**이나 **선호도 최적화(DPO)**와 같은 명시적인 완화 전략을 적용하여 LLM이 도구 출력을 추론 보조 도구로 사용하도록 유도함으로써, **TIM** 현상을 줄이고 더욱 안전하고 신뢰할 수 있는 AI 시스템을 구축할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.