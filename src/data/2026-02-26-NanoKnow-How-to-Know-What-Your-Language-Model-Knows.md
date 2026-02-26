---
title: "[논문리뷰] NanoKnow: How to Know What Your Language Model Knows"
excerpt: "[arXiv]에 게시된 'NanoKnow: How to Know What Your Language Model Knows' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Knowledge
  - Pre-training Data
  - Retrieval-Augmented Generation (RAG)
  - FineWeb-Edu
  - nanochat
  - Benchmarking
  - Question Answering
  - Data Attribution

permalink: /ai/review/2026-02-26-NanoKnow-How-to-Know-What-Your-Language-Model-Knows/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.20122)

**저자:** Lingwei Gu, Nour Jedidi, Jimmy Lin



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLMs)이 지식을 어떻게 획득하고 활용하는지에 대한 근본적인 질문에 답하고자 합니다. 특히, LLM의 사전 훈련 데이터가 종종 "블랙 박스"로 남아있어 지식의 출처를 추적하기 어렵다는 문제를 해결하고, 파라미터 내 지식과 외부 지식의 상호작용을 명확히 이해하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **FineWeb-Edu** 코퍼스로 사전 훈련된 **nanochat** LLM을 분석하기 위해 **NanoKnow** 라는 벤치마크 데이터셋을 구축했습니다. 이 데이터셋은 **Natural Questions (NQ)** 와 **SQUAD** 질문을 **BM25 검색** , **정확한 문자열 매칭** , 그리고 **Qwen3-8B** 기반의 **LLM 검증** 을 통해 사전 훈련 코퍼스에 답변이 존재하는지 여부에 따라 "지원됨(supported)"과 "미지원됨(unsupported)"으로 분류합니다. 다양한 **nanochat** 모델 스케일( **d20, d32, d34** )에 대해 폐쇄형(closed-book) 및 개방형(open-book) QA 실험을 수행하여 지식의 원천과 상호작용을 분석했습니다.

## 주요 결과
폐쇄형 QA 정확도는 사전 훈련 데이터 내 답변 빈도에 크게 영향을 받으며, 높은 빈도 질문에서 **두 배 이상** 높은 정확도를 보였습니다. 외부 증거(RAG)를 통합하면 이러한 빈도 의존성을 완화하지만, 답변 빈도가 높은 질문에서 여전히 더 높은 정확도를 나타냈습니다. 파라미터 지식과 외부 지식은 상호 보완적이며, 심지어 정답 문서가 주어져도 "지원되는" 질문에 더 정확했습니다. 비관련 문서(distractors)는 LLM의 QA 정확도를 저하시키며, 특히 **SQUAD** 데이터셋에서 1개의 distractor 시 **0.478** 에서 4개의 distractor 시 **0.367** 로 **LLM-Judge 정확도** 가 감소하는 것이 관찰되었습니다.

## AI 실무자를 위한 시사점
**NanoKnow** 는 LLM의 지식 습득 과정을 투명하게 평가하고 이해하는 중요한 도구를 제공하며, 이는 **고품질의 사전 훈련 데이터 큐레이션** 과 **효과적인 RAG 시스템 설계** 에 필수적입니다. 사전 훈련 데이터 내 답변 빈도가 모델 성능에 미치는 영향을 이해함으로써, AI 엔지니어는 모델이 특정 지식을 얼마나 잘 기억하고 일반화하는지 평가할 수 있습니다. 또한, distractor가 성능을 저하시킨다는 발견은 RAG 시스템에서 **정확한 검색** 과 **문맥 구성** 의 중요성을 강조하며, "lost in the middle" 현상과 같은 문제에 대한 해결책 모색이 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.