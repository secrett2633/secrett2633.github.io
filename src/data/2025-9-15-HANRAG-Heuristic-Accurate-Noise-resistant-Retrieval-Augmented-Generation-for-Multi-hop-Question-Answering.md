---
title: "[논문리뷰] HANRAG: Heuristic Accurate Noise-resistant Retrieval-Augmented
  Generation for Multi-hop Question Answering"
excerpt: "Zhehao Tan이 [arXiv]에 게시한 'HANRAG: Heuristic Accurate Noise-resistant Retrieval-Augmented
  Generation for Multi-hop Question Answering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Retrieval-Augmented Generation
  - Multi-hop QA
  - Noise Resistance
  - LLM
  - Query Decomposition
  - Adaptive Retrieval
  - Heuristic Framework
  - Revelator

permalink: /ai/review/2025-9-15-HANRAG-Heuristic-Accurate-Noise-resistant-Retrieval-Augmented-Generation-for-Multi-hop-Question-Answering/

toc: true
toc_sticky: true

date: 2025-09-15 13:12:08+0900
last_modified_at: 2025-09-15 13:12:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09713)

**저자:** Duolin Sun, Dan Yang, Yue Shen, Yihan Jiao, Zhehao Tan



## 핵심 연구 목표
본 논문은 멀티-홉 질문(multi-hop queries) 처리 시 기존 RAG(Retrieval-Augmented Generation) 시스템이 겪는 비효율성(과도한 반복 검색), 비합리적인 쿼리(원래 쿼리에 대한 노이즈 검색), 그리고 노이즈 축적 문제를 해결하고자 합니다. 특히 복합(compound) 및 복잡(complex) 쿼리에 효율적이고 정확하며 노이즈에 강한 **HANRAG** 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
**HANRAG** 는 "Revelator"라는 마스터 에이전트를 중심으로 쿼리를 라우팅하고, 복합 질문을 **Decomposer** 를 통해 독립적인 하위 쿼리로 분해하여 비동기적으로 처리합니다. 복잡 질문의 경우, **Refiner** 를 이용해 시드 질문을 정제하고 **Ending Discriminator** 로 검색 종료 시점을 판단하는 반복 검색 방식을 사용합니다. 또한, **Relevance Discriminator** 를 통해 검색된 문서의 노이즈를 필터링하여 **LLM(Large Language Model)** 에 정확한 정보만을 전달하는 **ANRAG** 를 통합합니다.

## 주요 결과
실험 결과, **HANRAG** 는 싱글-홉 QA 벤치마크에서 **Adaptive-RAG** 대비 **EM 12.2%, F1 6.83%, Accuracy 20.13%** 향상을 보였으며, 평균 검색 단계는 **0.13** 감소했습니다. 복잡 쿼리에서는 평균 **EM 6.67%, F1 6.34%, Accuracy 16.17%** 향상과 평균 검색 단계 **0.52** 감소를 달성했습니다. 특히, 멀티-홉 복합 쿼리에서는 **Adaptive-RAG** 대비 **19.63%** 더 높은 정확도를 달성하고 검색 단계를 **거의 1.5단계** 줄였습니다.

## AI 실무자를 위한 시사점
**HANRAG** 는 **Revelator** 를 통해 복잡한 다단계 질문에 대한 **RAG 시스템의 성능과 효율성** 을 크게 개선할 수 있는 실용적인 접근법을 제시합니다. **적응형 쿼리 라우팅** 및 **노이즈 저항성** 기능은 실제 AI 애플리케이션에서 **LLM의 답변 품질과 신뢰성** 을 높이는 데 기여합니다. 그러나 **Revelator** 의 각 에이전트 학습을 위한 고품질 데이터셋 구축 비용은 실제 적용 시 고려해야 할 요소입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.