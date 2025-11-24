---
title: "[논문리뷰] Train a Unified Multimodal Data Quality Classifier with Synthetic Data"
excerpt: "Ritesh Sarkhel이 [arXiv]에 게시한 'Train a Unified Multimodal Data Quality Classifier with Synthetic Data' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Data Quality
  - MLLM
  - Synthetic Data
  - Data Filtering
  - Image-Text Captioning
  - Interleaved Document Analysis
  - Pre-training

permalink: /ai/review/2025-10-20-Train-a-Unified-Multimodal-Data-Quality-Classifier-with-Synthetic-Data/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15162)

**저자:** Ritesh Sarkhel, Colin Lockard, Shiyang Li, Rongmei Lin, weizhiwang



## 핵심 연구 목표
멀티모달 대규모 언어 모델(MLLM) 사전 학습에 사용되는 이미지-텍스트 캡션 및 인터리브된 문서 데이터의 고품질 필터링 방법이 미흡하다는 문제를 해결하고자 합니다. 기존 **CLIPScore**와 같은 필터링 방식은 단일 이미지-텍스트 쌍에만 적용 가능하다는 한계를 극복하고, 두 가지 유형의 데이터를 모두 효율적으로 필터링할 수 있는 **통합 멀티모달 데이터 품질 분류기(UniFilter)**를 훈련하는 것이 목표입니다.

## 핵심 방법론
본 연구는 효율적인 **MLLM**을 기반으로 **UniFilter**를 구축하고, 반(semi)-합성 데이터 생성 방식을 도입합니다. 원본 이미지를 활용하고 **Claude-3-Sonnet**과 같은 독점 MLLM을 사용하여 네 가지 품질 수준(0-3점)의 텍스트(캡션 및 인터리브된 문서)를 생성하여 대규모의 **샘플-스코어 쌍**을 만듭니다. 이 합성 데이터를 통해 **SigLIP-SO-400M** 비전 인코더, **AvgPool** 시각 프로젝터, 그리고 **Qwen-2.5-0.5b LLM**을 백본으로 하는 **UniFilter**를 훈련시킵니다.

## 주요 결과
**UniFilter**는 이미지-텍스트 캡션 데이터 필터링에서 기존 DFN 및 MLMFilter를 능가하며, MLLM 사전 학습 시 제로샷 VQA 태스크에서 **평균 3.2% 성능 향상**을 달성했습니다. 또한, 필터링된 혼합 데이터로 사전 학습된 MLLM은 4샷 및 8샷 인컨텍스트 학습에서 DFN 대비 각각 **0.7%** 및 **2.8%**의 평균 정확도 향상을 보였습니다. 시각 지도 미세 조정(SFT) 후 **UniFilter** 기반 MLLM은 VQA 태스크에서 **평균 3.1%**, MMMU에서 **1.5%**, MMBench에서 **1.6%**의 평균 정확도 향상을 기록했습니다.

## AI 실무자를 위한 시사점
본 연구는 고품질 멀티모달 데이터 필터링의 중요성을 강조하며, 특히 **인터리브된 문서**와 같은 복합적인 데이터 구조에 대한 효율적인 품질 분류 방법을 제시합니다. **반(semi)-합성 데이터 생성**을 통해 대규모의 레이블링된 멀티모달 데이터셋을 효율적으로 구축하는 실용적인 접근법을 제공하여, 데이터 부족 문제 해결에 기여할 수 있습니다. **UniFilter**는 MLLM 사전 학습의 품질을 높여 **제로샷 및 퓨샷 학습 능력**과 하류 태스크 성능을 향상시켜, 실제 AI 시스템의 전반적인 강건성과 활용성을 높이는 데 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.