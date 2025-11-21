---
title: "[논문리뷰] Wasm: A Pipeline for Constructing Structured Arabic Interleaved   Multimodal Corpora"
excerpt: "Mohamed Motasim Hamed이 [arXiv]에 게시한 'Wasm: A Pipeline for Constructing Structured Arabic Interleaved   Multimodal Corpora' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Arabic Language
  - Multimodal Corpus
  - Data Curation
  - Web Scraping
  - Large Language Models
  - Document Structure
  - Markdown
  - Perplexity Filtering

permalink: /ai/review/2025-11-12-Wasm_A_Pipeline_for_Constructing_Structured_Arabic_Interleaved_Multimodal_Corpora/

toc: true
toc_sticky: true

date: 2025-11-12 00:00:00+0900+0900
last_modified_at: 2025-11-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07080)

**저자:** Khalil Hennara, Ahmad Bastati, Muhammad Hreden, Mohamed Motasim Hamed, Zeina Aldallal, Sara Chrouf, Safwan AlModhayan



## 핵심 연구 목표
본 연구는 고품질의 구조화된 아랍어 다중모드 데이터셋의 부족 문제를 해결하는 것을 목표로 합니다. 특히, 웹 문서의 **구조적 무결성**과 **텍스트-이미지 인터리빙(interleaving)**을 보존하면서 대규모 아랍어 다중모드 코퍼스를 구축하기 위한 파이프라인인 **Wasm**을 제시합니다.

## 핵심 방법론
**Wasm** 파이프라인은 **Common Crawl** 데이터를 사용하여 **메타데이터 추출**, **HTML 처리 및 표준화**, **콘텐츠 추출**, 그리고 다단계 **품질 필터링**을 수행합니다. 아랍어 특성을 고려하여 **단어 반복률**, **불용어 비율**, **구두점 비율** 등 기존 필터링 임계값을 완화하거나 제거했으며, **KenLM 프레임워크 기반의 맞춤형 퍼플렉서티 모델**을 개발하여 아랍어 텍스트 품질을 평가합니다. 또한, 웹 콘텐츠를 구조화된 **Markdown** 형식으로 변환하여 텍스트와 이미지의 자연스러운 배열을 유지하고, **Needleman-Wunsch 알고리즘**을 통한 **태그 수준 중복 제거**를 **80% 유사도 임계값**으로 적용합니다.

## 주요 결과
**Wasm**은 아랍어 웹 콘텐츠의 구조를 보존하고 **Markdown** 출력을 제공하는 최초의 파이프라인입니다. 퍼플렉서티 기반 품질 평가에서 Wasm 데이터셋은 자체 모델로 **0%의 제외율**을 보였으며, 이는 기존 FineWeb2 (**1.766%**), Ara24 (**7.82%**), CulturaX (**8.605%**), Dataset_101 (**19.757%**)보다 현저히 낮은 수치로 더 많은 아랍어 콘텐츠를 보존함을 시사합니다. 이 파이프라인은 텍스트 전용 및 다중모드 사전 훈련 시나리오 모두를 지원하는 유연한 데이터셋을 생성합니다.

## AI 실무자를 위한 시사점
**Wasm**은 아랍어 **LLM(Large Language Model)** 및 **LMM(Large Multimodal Model)** 개발을 위한 고품질 학습 데이터의 심각한 부족 문제를 해결합니다. 문서 구조 및 텍스트-이미지 인터리빙을 보존하는 **구조화된 아랍어 다중모드 데이터셋**을 구축하는 견고한 프레임워크를 제공합니다. 파이프라인의 일부와 대표적인 데이터셋 덤프를 **오픈 소스**로 공개하여 아랍어 NLP 연구의 재현성을 높이고 발전을 가속화하는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.