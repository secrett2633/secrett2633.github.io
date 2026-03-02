---
title: "[논문리뷰] Memory Caching: RNNs with Growing Memory"
excerpt: "Meisam Razaviyayn이 [arXiv]에 게시한 'Memory Caching: RNNs with Growing Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Recurrent Neural Networks
  - Memory Caching
  - Sequence Modeling
  - Long-Context
  - Transformers
  - Linear Attention
  - Language Modeling
  - Retrieval Tasks

permalink: /ai/review/2026-03-02-Memory-Caching-RNNs-with-Growing-Memory/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.24281)

**저자:** Ali Behrouz, Zeman Li, Yuan Deng, Peilin Zhong, Meisam Razaviyayn, Vahab Mirrokni



## 핵심 연구 목표
본 논문은 **고정된 메모리 크기** 로 인해 장문 시퀀스에서 과거 정보를 잊어버리는 Recurrent Neural Networks (RNNs)의 한계를 해결하고자 합니다. 특히 recall-intensive 태스크에서 Transformer 모델에 비해 성능이 저조한 RNN의 단점을 극복하고, **RNN의 효과적인 메모리 용량** 을 시퀀스 길이에 따라 확장하여 O(L)에서 O(L^2) 사이의 유연한 복잡도 트레이드오프를 제공하는 것이 주된 목표입니다.

## 핵심 방법론
제안하는 **Memory Caching (MC)** 은 입력 시퀀스를 세그먼트로 분할하고 각 세그먼트의 **메모리 상태 체크포인트** 를 캐싱하는 기법입니다. 이를 통해 모델은 전체 과거 이력에서 압축된 정보에 직접 접근할 수 있습니다. **(Gated) Residual Memory** , **Memory Soup** , **Sparse Selective Caching (SSC)** 의 네 가지 캐시된 메모리 집계 전략을 도입했으며, **Linear Attention (LA)** , **Deep Linear Attention (DLA)** , **Sliding Window Linear Attention (SWLA)** , **Titans** 등 다양한 RNN 아키텍처에 적용하여 그 효과를 검증했습니다.

## 주요 결과
MC 기법은 언어 모델링, 장문 컨텍스트 이해, 검색 등 다양한 태스크에서 RNN 모델의 성능을 일관되게 향상시켰습니다. 언어 모델링에서 **Titans + GRM** 은 760M 파라미터 모델에서 **19.14 PPL** , 1.3B 파라미터 모델에서 **15.37 PPL** 을 달성하며 기존 Titans 베이스라인보다 우수하고 Transformer에 근접한 성능을 보였습니다. 특히 **Needle-in-a-Haystack 태스크** 에서 **Titans + GRM** 은 16K 컨텍스트 길이에서 **100%의 정확도** 를 기록하며 장문 컨텍스트 검색 능력을 입증했습니다.

## AI 실무자를 위한 시사점
Memory Caching은 RNN이 Transformer의 **O(L^2) 복잡도** 없이 **긴 시퀀스 컨텍스트** 를 효과적으로 처리할 수 있는 방법을 제시합니다. 이는 AI/ML 엔지니어가 **리소스 효율적인 모델** 을 개발하면서도 **Transformer에 준하는 장문 이해 및 리콜 능력** 을 요구하는 애플리케이션에 RNN을 활용할 수 있는 가능성을 열어줍니다. 특히 **Sparse Selective Caching (SSC)** 은 성능 저하 없이 효율성을 크게 높여, 대규모 시퀀스 데이터를 처리하는 실제 시스템 설계에 유용할 것으로 예상됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.