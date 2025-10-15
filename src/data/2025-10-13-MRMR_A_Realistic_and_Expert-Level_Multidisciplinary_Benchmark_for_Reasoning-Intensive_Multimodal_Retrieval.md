---
title: "[논문리뷰] MRMR: A Realistic and Expert-Level Multidisciplinary Benchmark for
  Reasoning-Intensive Multimodal Retrieval"
excerpt: "Tingyu Song이 [arXiv]에 게시한 'MRMR: A Realistic and Expert-Level Multidisciplinary Benchmark for
  Reasoning-Intensive Multimodal Retrieval' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Retrieval
  - Benchmark
  - Reasoning
  - Multidisciplinary
  - Expert-Level
  - Image-Text Interleaving
  - Contradiction Retrieval

permalink: /ai/review/2025-10-13-MRMR_A_Realistic_and_Expert-Level_Multidisciplinary_Benchmark_for_Reasoning-Intensive_Multimodal_Retrieval/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.09510)

**저자:** Siyue Zhang, Yuan Gao, Xiao Zhou, Yilun Zhao, Tingyu Song, Arman Cohan, Anh Tuan Luu, Chen Zhao



## 핵심 연구 목표
기존 멀티모달 검색 벤치마크의 한계(일반 도메인, 단순 의미 매칭, 단일 이미지/단일 모달 문서)를 극복하고, **전문가 수준의 다학제적 지식과 심층적인 추론**을 요구하는 현실적인 멀티모달 검색 벤치마크를 구축하는 것을 목표로 합니다. 특히, 이미지-텍스트가 교차된(interleaved) 복합적인 콘텐츠에 대한 검색 능력을 평가하고자 합니다.

## 핵심 방법론
논문은 23개 도메인에 걸친 1,502개의 질의로 구성된 **MRMR 벤치마크**를 소개합니다. 이 벤치마크는 **Knowledge**, **Theorem**, 그리고 새로운 **Contradiction Retrieval**의 세 가지 유형의 검색 태스크를 포함하며, 전문가가 검증한 긍정 문서와 어려운 부정 문서를 포함합니다. 질의와 문서는 모두 **이미지-텍스트 교차 시퀀스(image-text interleaved sequences)** 형태로 구성되었으며, **14가지 최신 모델**을 포함한 4가지 범주의 멀티모달 검색 시스템을 광범위하게 평가했습니다.

## 주요 결과
LLM이 생성한 이미지 캡션을 사용한 텍스트 임베딩 모델 **Qwen3-Embedding**이 **52.1 nDCG@10**으로 가장 높은 성능을 달성했습니다. 최신 멀티모달 모델인 **Ops-MM-Embedding**은 **Knowledge** 태스크에서 **67.4 nDCG@10**의 경쟁력 있는 성능을 보였으나, **Theorem** 태스크에서는 **30.1 nDCG@10**, **Contradiction** 태스크에서는 **36.6 nDCG@10**로 현저히 낮은 성능을 기록했습니다. 테스트 시점 질의 확장(query expansion)은 **Qwen2.5-VL-72B** 모델에서 **+26.5 nDCG@10**의 성능 향상을 가져왔습니다.

## AI 실무자를 위한 시사점
현재 멀티모달 검색 모델은 **전문가 수준의 추론 집약적 태스크**에서 아직 큰 한계를 보이며, 특히 **논리적 추론 능력** 강화가 시급함을 시사합니다. 이미지 캡셔닝과 텍스트 검색기를 결합하는 방식이 순수 멀티모달 모델보다 우수한 성능을 보이는 것은 **멀티모달 모델의 심층적인 시각-텍스트 통합 능력 향상**이 필요함을 강조합니다. **MRMR 벤치마크**는 복잡한 멀티모달 콘텐츠에서 심층적인 의미 이해와 논리적 추론이 필요한 **MM-RAG(Multimodal Retrieval-Augmented Generation) 시스템 개발 및 평가**에 중요한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.