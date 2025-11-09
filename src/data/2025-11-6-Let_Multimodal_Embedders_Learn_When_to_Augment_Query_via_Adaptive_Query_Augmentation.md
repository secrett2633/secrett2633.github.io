---
title: "[논문리뷰] Let Multimodal Embedders Learn When to Augment Query via Adaptive Query
  Augmentation"
excerpt: "Jaehyun Park이 [arXiv]에 게시한 'Let Multimodal Embedders Learn When to Augment Query via Adaptive Query
  Augmentation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Embedders
  - Query Augmentation
  - Adaptive Learning
  - Multimodal LLM
  - Information Retrieval
  - Generative AI
  - Embedding Latency

permalink: /ai/review/2025-11-6-Let_Multimodal_Embedders_Learn_When_to_Augment_Query_via_Adaptive_Query_Augmentation/

toc: true
toc_sticky: true

date: 2025-11-09 21:54:30+0900
last_modified_at: 2025-11-09 21:54:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02358)

**저자:** Wongyu Kim, Hochang Lee, Sanghak Lee, Yoonsung Kim, Jaehyun Park



## 핵심 연구 목표
본 논문은 멀티모달 환경에서 쿼리 증강(query augmentation)으로 인한 **과도한 임베딩 지연 시간**과 **일부 쿼리에서의 성능 저하** 문제를 해결하고, 쿼리 증강의 효과를 높이는 것을 목표로 합니다. 모든 쿼리에 대해 일괄적으로 증강을 적용하는 대신, 쿼리 증강이 필요한 경우에만 **적응적으로 증강을 수행**하여 효율성과 정확성을 동시에 개선하고자 합니다.

## 핵심 방법론
제안하는 **M-Solomon**은 먼저 학습 데이터셋의 쿼리를 증강이 필요한 그룹과 필요 없는 그룹으로 나눕니다. 증강이 필요한 쿼리에 대해서는 **고성능 멀티모달 LLM(MLLM)인 Qwen2.5-VL-72B-Instruct**를 활용하여 적절한 **합성 증강(synthetic augmentation)**을 생성합니다. 이후 **M-Solomon**은 증강이 필요한 쿼리에는 **`/augment`** 접두사를, 그렇지 않은 쿼리에는 **`/embed`** 문자열을 생성하도록 학습하여 쿼리 증강 여부를 **자동으로 결정**합니다. 이는 **대조 학습(Lrep)과 자기회귀 학습(Lgen)을 결합한 손실 함수**로 최적화됩니다.

## 주요 결과
**MMEB 벤치마크**에서 **M-Solomon**은 증강을 사용하지 않는 베이스라인 **NoAug**를 크게 능가했으며, 항상 증강을 사용하는 **AlwaysAug** 모델보다 더 나은 성능을 달성하면서도 **임베딩 지연 시간(Latency)을 약 절반으로 단축**했습니다. 특히 **FashionIQ 데이터셋**에서는 **P@1 점수 26.7**로 AlwaysAug의 **21.1**을 크게 상회하며 **지연 시간을 5배 단축**했습니다. 또한, **ImageNet-R 데이터셋**에서는 **90.3% P@1**로 AlwaysAug의 **88.5%**보다 높은 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 멀티모달 임베딩 시스템에서 쿼리 증강을 적용할 때 발생하는 **지연 시간과 성능 트레이드오프**를 해결하는 실용적인 방법을 제시합니다. AI 엔지니어는 **M-Solomon**과 같은 **적응형 증강 기법**을 활용하여 **리소스 효율성을 높이면서 검색 정확도를 향상**시킬 수 있습니다. 특히 대규모 멀티모달 데이터셋을 다루는 정보 검색 시스템 구축 시 **증강 여부 자동 결정**을 통해 **운영 비용 절감 및 사용자 경험 개선**에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.