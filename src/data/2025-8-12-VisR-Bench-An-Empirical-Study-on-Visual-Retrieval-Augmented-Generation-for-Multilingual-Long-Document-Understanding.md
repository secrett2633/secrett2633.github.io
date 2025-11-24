---
title: "[논문리뷰] VisR-Bench: An Empirical Study on Visual Retrieval-Augmented Generation
  for Multilingual Long Document Understanding"
excerpt: "Tong Yu이 [arXiv]에 게시한 'VisR-Bench: An Empirical Study on Visual Retrieval-Augmented Generation
  for Multilingual Long Document Understanding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Retrieval
  - Retrieval-Augmented Generation
  - Long Document Understanding
  - Multilingual NLP
  - Visual QA
  - Benchmark
  - MLLMs
  - Table Understanding

permalink: /ai/review/2025-8-12-VisR-Bench-An-Empirical-Study-on-Visual-Retrieval-Augmented-Generation-for-Multilingual-Long-Document-Understanding/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.07493)

**저자:** Jian Chen, Ming Li, Jihyung Kil, Chenguang Wang, Tong Yu, Ryan Rossi, Tianyi Zhou, Changyou Chen, Ruiyi Zhang



## 핵심 연구 목표
본 논문은 기존 벤치마크의 영어 단일 언어 및 단일 페이지 제한을 넘어, **다국어 장문 문서**에서 질문 기반 **멀티모달 검색(multimodal retrieval)**을 평가하기 위한 새로운 벤치마크인 **VisR-Bench**를 제안합니다. 이는 특히 **Multimodal Large Language Models (MLLMs)**의 실제 문서 이해 및 검색 능력에 대한 포괄적인 평가를 목표로 합니다.

## 핵심 방법론
**VisR-Bench**는 웹 크롤링된 **1,286개 문서**와 **16개 언어**에 걸쳐 약 **35K개의 고품질 QA 쌍**으로 구성됩니다. 질문은 **GPT-4o**를 사용하여 그림, 텍스트, 표 관련 유형으로 생성되었으며, 답변에 시각적 정보가 필수적이도록 휴리스틱 필터링을 적용했습니다. 평가는 **Top-k Retrieval Accuracy**, **PNLS**, **GPT Evaluation** 지표를 사용하여 다양한 **텍스트 기반 모델**, **멀티모달 인코더**, **MLLMs**에 대해 수행되었습니다.

## 주요 결과
실험 결과, **MLLMs**는 **텍스트 기반 모델**과 **멀티모달 인코더**를 **모든 면에서 크게 능가**하지만, **구조화된 표**와 **저자원 언어**에서는 여전히 어려움을 겪는 것으로 나타났습니다. 최신 MLLM인 **ColQwen2**는 영어 스플릿에서 **75.23%의 평균 top-1 정확도**를 달성했으나, 특히 아랍어, 핀란드어, 베트남어와 같은 **저자원 언어**에서는 성능이 크게 저하되었습니다. 다국어 데이터로 **ColQwen2**를 파인튜닝했을 때 전반적인 성능 향상이 관찰되었습니다.

## AI 실무자를 위한 시사점
**MLLMs**는 장문 문서의 멀티모달 검색에 큰 잠재력을 보이지만, **복잡한 표 구조**와 **저자원 다국어 데이터** 처리에 대한 추가 연구가 필요함을 시사합니다. 실제 애플리케이션에서 **컨텍스트를 고려한 후기 상호작용(contextualized late interaction)** 방식이 단일 벡터 임베딩보다 효과적임이 입증되었습니다. 따라서, 다국어 환경에서 문서 이해 및 검색 시스템을 구축할 때 이러한 제약 사항과 개선 방향을 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.