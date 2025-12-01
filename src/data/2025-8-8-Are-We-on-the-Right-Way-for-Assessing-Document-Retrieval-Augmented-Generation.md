---
title: "[논문리뷰] Are We on the Right Way for Assessing Document Retrieval-Augmented
  Generation?"
excerpt: "Junjie Yang이 [arXiv]에 게시한 'Are We on the Right Way for Assessing Document Retrieval-Augmented
  Generation?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Retrieval-Augmented Generation
  - Multimodal LLMs
  - Benchmark Evaluation
  - Document Understanding
  - Multi-hop Reasoning
  - Information Retrieval
  - Evaluation Dataset

permalink: /ai/review/2025-8-8-Are-We-on-the-Right-Way-for-Assessing-Document-Retrieval-Augmented-Generation/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03644)

**저자:** Wenxuan Shen, Mingjia Wang, Yaochen Wang, Dongping Chen, Junjie Yang, Yao Wan, Weiwei Lin



## 핵심 연구 목표
이 논문은 현재 **문서 검색 증강 생성(RAG) 시스템** 의 평가 벤치마크가 실제 세계의 복잡성과 한계를 제대로 반영하지 못하는 문제점을 해결하고자 합니다. 기존 평가 방식이 제한된 범위, 비현실적인 사전 지식 가정, 모호한 증거 라벨링, 그리고 연관성 없는 다중 홉 질의 등으로 인해 시스템의 진정한 병목 현상을 파악하기 어렵다는 점을 진단하고, 이를 극복할 수 있는 종합적이고 신뢰할 수 있는 평가 시스템을 구축하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **DOUBLE-BENCH** 라는 새로운 대규모 다국어 다중 모드 평가 시스템을 제안합니다. 이 시스템은 3,276개의 문서와 5,168개의 단일/다중 홉 질의로 구성되며, **GPT-4o** 와 같은 대규모 언어 모델을 활용한 **반복적인 질의 정제** 및 **지식 그래프 기반의 다중 홉 질의 합성** 과정을 통해 고품질의 질의-응답 쌍을 생성합니다. 특히 모든 질의에 대한 증거 페이지는 사람 전문가의 검증을 거쳐 정확성을 높였으며, 다양한 최첨단 **임베딩 모델** 과 **MLLM** , 그리고 **문서 RAG 프레임워크** 에 대한 광범위한 실험을 통해 각 구성 요소의 성능을 세밀하게 분석합니다.

## 주요 결과
실험 결과, 텍스트 임베딩 모델과 시각 임베딩 모델 간의 성능 격차가 좁혀지고 있으며, **colqwen2.5-3b-multilingual** 모델이 멀티모달 임베딩 모델 중 평균 **hit@5 0.795** 로 가장 우수했습니다. 또한, 현재 문서 RAG 프레임워크는 **검색 정확도** 에서 여전히 큰 병목 현상을 보이며, 증거가 부족함에도 답변을 시도하는 **'과도한 자신감' 문제** 가 드러났습니다. 다중 홉 질의의 경우, **MLLM의 정확도는 0.655** 로 낮게 나타나 멀티모달 장문 문서 이해의 어려움을 보여주었습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **더욱 강력하고 신뢰할 수 있는 문서 검색 모델** 개발에 주력해야 할 필요성을 확인할 수 있습니다. 특히 RAG 시스템에서 **'인지적 겸손(epistemic humility)'** , 즉 불확실한 정보에 대해 답변을 거부하는 능력을 통합하는 것이 중요합니다. **DOUBLE-BENCH** 는 다국어 및 다중 모드 환경에서 RAG 시스템의 성능을 포괄적으로 평가할 수 있는 엄격한 토대를 제공하여, 실질적인 AI 애플리케이션 개발에 필요한 성능 개선 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.