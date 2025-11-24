---
title: "[논문리뷰] When Benchmarks Age: Temporal Misalignment through Large Language Model
  Factuality Evaluation"
excerpt: "이 [arXiv]에 게시한 'When Benchmarks Age: Temporal Misalignment through Large Language Model
  Factuality Evaluation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Factuality Evaluation
  - Benchmark Aging
  - Temporal Misalignment
  - Information Retrieval
  - Question Answering
  - Evaluation Metrics
  - GPT-4o-mini
  - Qwen2.5

permalink: /ai/review/2025-10-9-When-Benchmarks-Age-Temporal-Misalignment-through-Large-Language-Model-Factuality-Evaluation/

toc: true
toc_sticky: true

date: 2025-10-09 13:45:06+0900
last_modified_at: 2025-10-09 13:45:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.07238)

**저자:** Xunyi Jiang, Dingyi Chang, Julian McAuley, Xin Xu



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)의 급속한 발전과 실세계의 변화가 기존 사실성 평가 벤치마크의 신뢰성을 저해하는 문제를 다룹니다. 특히, 정적 벤치마크와 최신 실세계 사실 및 현대 LLM 간의 **시간적 불일치(temporal misalignment)**가 LLM의 사실성 평가에 미치는 영향을 체계적으로 조사하는 것을 목표로 합니다.

## 핵심 방법론
다섯 가지 사실성 벤치마크와 여덟 가지 LLM을 사용하여 실험을 설계했습니다. 최신 실세계 사실을 얻기 위해 **Wikipedia-focused retrieval**과 **iterative web search**를 결합한 **사실 검색 파이프라인**을 구축했으며, **GPT-4o-mini** 및 **Qwen2.5-14B-Instruct**를 활용하여 정보 추출 및 의사결정을 수행했습니다. 벤치마크 노후화 및 LLM 평가에 미치는 영향을 정량화하기 위해 **Dataset Drift Score (DDS)**, **Evaluation Misleading Rate (EMR)**, 그리고 **Temporal Alignment Gap (TAG)** 세 가지 맞춤형 지표를 사용했습니다.

## 주요 결과
널리 사용되는 벤치마크의 상당 부분, 특히 **BoolQ**는 **63.78%**의 **Dataset Drift Score**를 보이며 노후화되었음이 확인되었습니다. **Evaluation Misleading Rate (EMR)**는 최신 LLM에서 **10% 이상**으로 나타나, LLM이 최신 정보를 제공해도 오래된 벤치마크 때문에 오답으로 처리될 수 있음을 보여주었습니다. **GPT-4o-mini-2024-07-18**은 전반적으로 가장 높은 **Temporal Accuracy**를 기록하며 최신 실세계 정보와 가장 잘 일치하는 경향을 보였습니다.

## AI 실무자를 위한 시사점
LLM의 사실성 평가 시 **벤치마크의 최신성**과 **데이터의 시간적 민감성**을 반드시 고려해야 합니다. 오래된 벤치마크에만 의존한 평가는 현대 LLM의 실제 역량을 과소평가하거나 왜곡할 수 있습니다. 특히, **Open-book QA**와 같이 컨텍스트가 주어지는 태스크에서는 **주어진 컨텍스트의 최신성**이 LLM의 응답 품질에 직접적인 영향을 미치므로 컨텍스트 관리의 중요성이 강조됩니다. 향후 벤치마크 설계에는 **동적인 업데이트 메커니즘** 통합을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.