---
title: "[논문리뷰] Semantic IDs for Joint Generative Search and Recommendation"
excerpt: "Enrico Palumbo이 [arXiv]에 게시한 'Semantic IDs for Joint Generative Search and Recommendation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generative Models
  - Search and Recommendation
  - Semantic IDs
  - Bi-Encoder
  - Quantization
  - Multi-Task Learning
  - Retrieval Augmented Generation

permalink: /ai/review/2025-8-20-Semantic_IDs_for_Joint_Generative_Search_and_Recommendation/

toc: true
toc_sticky: true

date: 2025-08-20 13:26:54+0900
last_modified_at: 2025-08-20 13:26:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.10478)

**저자:** Enrico Palumbo, Edoardo D'Amico, Gustavo Penha, Francesco Fabbri, Marco De Nadai, Timothy Heath, Alex Tamborrino, Ali Vardasbi, Max LeFarov, Shawn Lin, Hugues Bouchard



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)을 활용한 통합 검색 및 추천 시스템 구축을 위해, 항목을 LLM 친화적인 이산 토큰(Semantic ID)으로 효과적으로 표현하는 방법을 제시하고, 공동 태스크에서의 성능 최적화를 목표로 합니다. 특히, 기존의 분리된 시스템을 통합할 때 발생하는 성능 충돌 문제를 해결하고자 합니다.

## 핵심 방법론
항목의 임베딩을 이산 토큰인 **Semantic ID**로 변환하는 여러 방법을 제안합니다. 여기에는 태스크별, 토큰 분리형, 접두사 공유형, 그리고 **임베딩 결합형(Multi-task)** 접근 방식이 포함됩니다. **바이-인코더 모델**을 사용하여 검색 및 추천 태스크 모두에 대해 미세 조정했으며, 임베딩을 양자화하여 Semantic ID를 생성하기 위해 **RQ-KMeans** 기법을 핵심적으로 활용했습니다. 성능 평가는 **MovieLens1M** 및 **Product18K** 데이터셋에서 **Recall@30** 지표를 사용했습니다.

## 주요 결과
통합 Semantic ID를 사용할 경우 검색과 추천 성능 간에 **내재적인 상충 관계**가 존재함을 확인했습니다. 그러나 **"Multi-task" (임베딩 결합형) 접근 방식**이 검색에서 **0.046 Recall@30**, 추천에서 **0.022 Recall@30**를 달성하며 공동 시스템에서 균형 잡힌 성능을 제공함을 입증했습니다. 또한, **RQ-Kmeans**가 Semantic ID 구성에서 다른 양자화 방법(예: VQ-VAE)보다 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 생성형 LLM을 활용한 통합 검색 및 추천 시스템 구축의 가능성을 제시하여 시스템 복잡성을 줄이고자 하는 AI 엔지니어에게 중요한 방향을 제공합니다. 다중 태스크 시나리오에서 최적의 성능을 위해 **Semantic ID의 신중한 설계**와 **RQ-KMeans와 같은 효과적인 양자화 방법**의 중요성을 강조합니다. 실무자들은 단일 ID 표현을 목표로 할 때 검색과 추천 성능 간의 불가피한 상충 관계를 고려하여 시스템을 설계해야 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.