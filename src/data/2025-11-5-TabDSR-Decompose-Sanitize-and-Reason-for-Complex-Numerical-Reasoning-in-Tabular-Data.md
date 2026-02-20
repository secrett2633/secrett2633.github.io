---
title: "[논문리뷰] TabDSR: Decompose, Sanitize, and Reason for Complex Numerical Reasoning
  in Tabular Data"
excerpt: "Jin Zeng이 arXiv에 게시한 'TabDSR: Decompose, Sanitize, and Reason for Complex Numerical Reasoning
  in Tabular Data' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Tabular Data
  - Numerical Reasoning
  - Large Language Models (LLMs)
  - Table Question Answering (TQA)
  - Program-of-Thoughts (PoT)
  - Data Sanitization
  - Query Decomposition
  - Multi-hop Reasoning

permalink: /ai/review/2025-11-5-TabDSR-Decompose-Sanitize-and-Reason-for-Complex-Numerical-Reasoning-in-Tabular-Data/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02219)

**저자:** Jin Zeng, Wei Lu, Haihua Chen, Fengchang Yu, arnodjiang



## 핵심 연구 목표
논문은 복잡한 질문, 노이즈가 있는 데이터, 제한된 수치 연산 능력으로 인해 **대규모 언어 모델(LLM)** 이 **테이블 질의응답(TQA)** 에서 저조한 성능을 보이는 문제를 해결합니다. 특히, **다단계(multi-hop) 수치 추론** 과 지저분한 테이블 데이터 처리의 어려움을 극복하여 LLM의 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **TABDSR** 이라는 프롬프트 기반 프레임워크를 제안합니다. 이는 세 가지 에이전트로 구성됩니다: 복잡한 질문을 세분화하는 **Query Decomposer Agent** , 노이즈가 많고 구조화되지 않은 테이블을 정리하는 **Table Sanitizer Agent** , 그리고 정제된 테이블에서 최종 답변을 도출하기 위해 실행 가능한 **Python 코드** 를 생성하는 **PoT-based Reasoner Agent** 입니다. 또한, 데이터 누출을 최소화하고 복잡한 수치 추론을 평가하기 위한 새로운 데이터셋 **CalTab151** 을 구축했습니다.

## 주요 결과
**TABDSR** 은 기존 방법론들을 일관되게 능가하며 **TAT-QA** 에서 **8.79%** , **TableBench** 에서 **6.08%** , 그리고 자체 구축한 **CalTab151** 에서 **19.87%** 의 최고 정확도 향상을 달성했습니다. 특히, **Qwen2.5-7B** 모델을 사용했을 때 다른 **프롬프트 기반 LLM** 들을 크게 앞질렀으며, **GPT-4o** 및 **DeepSeek-V3** 와 같은 강력한 모델에서도 성능 향상을 입증하여 방법론의 **전이성** 을 보여주었습니다.

## AI 실무자를 위한 시사점
**TABDSR** 은 **테이블 기반 수치 추론** 에서 **LLM의 성능** 을 크게 향상시킬 수 있는 실용적이고 효과적인 솔루션을 제공합니다. 특히 **금융 TQA, 비즈니스 인텔리전스, 헬스케어** 등 노이즈가 많고 복잡한 데이터를 다루는 실제 시나리오에서 **견고하고 확장 가능한 분석 시스템** 구축에 기여합니다. 프롬프트 기반 접근 방식은 **데이터 주석이나 특수 훈련 없이** 기존 LLM에 쉽게 통합될 수 있다는 장점이 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.