---
title: "[논문리뷰] NVIDIA Nemotron Parse 1.1"
excerpt: "이 [arXiv]에 게시한 'NVIDIA Nemotron Parse 1.1' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - OCR
  - Document Parsing
  - Vision-Language Model
  - Encoder-Decoder
  - Transformer
  - Table Extraction
  - Multilingual OCR
  - Layout Analysis

permalink: /ai/review/2025-11-27-NVIDIA-Nemotron-Parse-1-1/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20478)

**저자:** NVIDIA



## 핵심 연구 목표
Nemotron-Parse 1.1은 전작인 Nemoretriever-Parse-1.0의 기능을 개선하여, 일반 OCR, 마크다운 형식 지정, 구조화된 표 구문 분석, 그림/차트/다이어그램의 텍스트 추출 등 문서 파싱 및 OCR 기능을 발전시키는 것을 목표로 합니다. 특히, 시각적으로 밀도가 높은 문서에 대한 **더 긴 출력 시퀀스 길이** 를 지원하며 텍스트 세그먼트의 바운딩 박스와 해당 의미 클래스를 추출합니다.

## 핵심 방법론
이 모델은 **885M 매개변수** 의 **인코더-디코더 트랜스포머 아키텍처** 를 따르며, **657M 매개변수** 의 **RADIO (ViT-H/16)** 로 초기화된 비전 인코더를 사용합니다. 비전 넥(Vision Neck)은 시퀀스 길이를 **3200 토큰** 으로 줄이고, Nemotron-Parse-1.1-TC는 **픽셀 셔플(pixel-shuffle)** 을 적용하여 시퀀스 길이를 **833 토큰** 으로 추가 감소시킵니다. 디코더는 **mBART 아키텍처** 를 **10개 레이어** 로 줄여 사용하며, **대규모 컨텍스트 추론** 을 위해 디코더에서 **위치 임베딩(positional embeddings)** 을 생략합니다. 훈련은 **NVpdftex** 와 같은 다양한 **합성, 공개, 인적 주석 데이터** 를 혼합하여 진행됩니다.

## 주요 결과
Nemotron-Parse 1.1은 공개 벤치마크에서 경쟁력 있는 정확도를 달성하여 강력한 경량 OCR 솔루션임을 입증했습니다. 특히, **GOT 벤치마크** 에서 **OCR/F1 점수 0.9785** 를 기록하여 Gemini Flash 2.0에 버금가는 성능을 보였습니다. **Nemotron-Parse-TC** 는 **20%의 속도 향상** 을 제공하며 품질 저하를 최소화했으며, RD-TableBench에서 **TEDS 86.2** 의 강력한 표 추출 성능을 보였습니다. 다국어 OCR에서도 영어 F1 **0.98** , 중국어 및 일본어 F1 **0.98** 등 모든 테스트 언어에서 **F1 > 0.96** 의 경쟁력 있는 성능을 달성했습니다.

## AI 실무자를 위한 시사점
**Nemotron-Parse 1.1** 은 경량 모델임에도 불구하고 OCR, 문서 구조 분석 및 다국어 지원에 있어 매우 뛰어난 성능을 제공하여, AI/ML 엔지니어들에게 **다목적 문서 인텔리전스 솔루션** 으로 활용될 수 있습니다. 특히, **Nemotron-Parse-TC** 는 **높은 추론 속도** 와 **최소한의 품질 저하** 를 통해 대규모 배치 처리나 실시간 애플리케이션에 적합하며, **마크다운/LaTeX 형식화 텍스트, 바운딩 박스, 의미 클래스** 등 구조화된 출력을 제공하여 후속 LLM 또는 데이터 처리 파이프라인에 통합하기 용이합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.