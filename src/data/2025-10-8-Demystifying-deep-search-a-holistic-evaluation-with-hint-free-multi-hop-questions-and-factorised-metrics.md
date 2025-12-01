---
title: "[논문리뷰] Demystifying deep search: a holistic evaluation with hint-free multi-hop
  questions and factorised metrics"
excerpt: "이 [arXiv]에 게시한 'Demystifying deep search: a holistic evaluation with hint-free multi-hop
  questions and factorised metrics' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Search
  - Multi-hop Reasoning
  - Evaluation Benchmark
  - Retrieval-Augmented Generation
  - Web Agents
  - Diagnostic Metrics
  - Knowledge Utilization
  - Hint-Free Questions

permalink: /ai/review/2025-10-8-Demystifying-deep-search-a-holistic-evaluation-with-hint-free-multi-hop-questions-and-factorised-metrics/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05137)

**저자:** Maojia Song, Renhang Liu, Xinyu Wang, Yong Jiang, Pengjun Xie, Fei Huang, Soujanya Poria, Jingren Zhou



## 핵심 연구 목표
논문은 멀티-홉 딥 서치 태스크에서 RAG 시스템 및 웹 에이전트 평가의 기존 한계를 해결하고자 합니다. 특히, 기존 벤치마크들이 질문에 추론 경로 힌트를 포함하여 모델의 자율적인 추론 발견 능력을 제대로 평가하지 못하는 문제와, 단일 합격률(pass rate) 위주의 평가가 다양한 실패 원인을 모호하게 하는 문제를 개선하는 것이 주된 목표입니다. 진정한 자율 추론 시스템 개발을 위한 진단적 평가 프레임워크를 제공하고자 합니다.

## 핵심 방법론
저자들은 **WebDetective** 라는 새로운 벤치마크를 도입합니다. 이 벤치마크는 **힌트가 없는 멀티-홉 질문(Hint-Free Multi-Hop questions)** 과 모델의 행동을 완벽하게 추적할 수 있는 통제된 **Wikipedia 샌드박스** 를 특징으로 합니다. 평가는 **검색 충분성(Search Sufficiency)** , **지식 활용(Knowledge Utilisation)** , **거부 행동(Refusal Behaviour)** 을 분리하는 요인별 측정 지표를 사용합니다. 또한, 벤치마크에서 확인된 문제점들을 해결하기 위해 **검증 루프(verification loops)** 와 **체계적인 증거 추적(systematic evidence tracking)** 을 통합한 에이전트 워크플로우인 **EvidenceLoop** 를 제안합니다.

## 주요 결과
**25개의 최신 모델** 에 대한 평가 결과, 모델들은 충분한 증거를 확보했음에도 불구하고 **지식 활용(Knowledge Utilisation)** 에서 어려움을 겪으며, 증거가 부족할 때 적절하게 답변을 거부하는 능력이 거의 없다는 약점을 보였습니다. 가장 강력한 시스템도 **Pass@1에서 약 50%** 의 낮은 성능을 기록했으며, **GPT-5는 80.0%의 높은 Search Score** 에도 불구하고 **23.21%의 낮은 Generation Score** 를 보였습니다. 이는 현재 시스템이 주어진 추론 경로는 잘 실행하지만, 스스로 추론 경로를 발견하고 효과적으로 활용하는 데 실패한다는 근본적인 한계를 시사합니다.

## AI 실무자를 위한 시사점
AI 실무자들은 현재 LLM 기반 에이전트들이 복잡한 멀티-홉 추론 태스크에서 **정보 합성 능력** 과 **불확실성 관리** 에 심각한 한계를 가지고 있음을 인식해야 합니다. 단순히 검색 성능을 향상시키는 것을 넘어, **EvidenceLoop** 와 같이 **명시적인 검증 및 체계적인 증거 추적 메커니즘** 을 모델 아키텍처에 통합하는 것이 중요합니다. 대규모 데이터셋이나 더 큰 컨텍스트 창이 성능을 "해킹"하는 데 한계가 있음을 보여주므로, **모델의 추론 및 지식 활용 아키텍처** 자체에 대한 근본적인 개선과 진정한 자율 추론 능력 개발에 집중해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.