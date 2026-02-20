---
title: "[논문리뷰] MEENA (PersianMMMU): Multimodal-Multilingual Educational Exams for
  N-level Assessment"
excerpt: "Doratossadat Dastgheib이 arXiv에 게시한 'MEENA (PersianMMMU): Multimodal-Multilingual Educational Exams for
  N-level Assessment' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Language Models
  - Multilingual Benchmarking
  - Persian Language
  - Educational Assessment
  - Vision-Language Models
  - Cultural Nuance
  - Reasoning Tasks

permalink: /ai/review/2025-8-26-MEENA-PersianMMMU-Multimodal-Multilingual-Educational-Exams-for-N-level-Assessment/

toc: true
toc_sticky: true

date: 2025-08-26 13:21:57+0900
last_modified_at: 2025-08-26 13:21:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.17290)

**저자:** Doratossadat Dastgheib, Seyed Mohammad Hadi Hosseini, Marzia Nouri, Arshia Hemmat, Omid Ghahroodi, Mohammad Vali Saniano, Alireza Sahebi, Reihaneh Zohrabi, Mohammad Hossein Rohban, Ehsaneddin Asgari, Mahdieh Soleymani Baghshah



## 핵심 연구 목표
본 논문은 영어 중심의 기존 VLM 벤치마크의 한계를 해결하고, 특히 페르시아어와 같은 저자원 언어에서 과학, 추론, 인간 수준의 이해 능력을 평가하기 위한 **최초의 종합적인 멀티모달-멀티링구얼 벤치마크** 를 제시하는 것을 목표로 합니다. 번역된 데이터셋으로 인한 문화적 불일치 문제를 해결하고, 페르시아어 VLM의 역량을 포괄적으로 평가하고자 합니다.

## 핵심 방법론
**MEENA (PersianMMMU)** 데이터셋은 약 **7,500개의 페르시아어** 및 **3,000개의 영어 질문** 으로 구성되며, 추론, 수학, 물리학, 도표, 차트, 페르시아 예술 및 문학 등 광범위한 주제와 교육 수준을 포함합니다. 이 데이터셋은 **난이도, 설명 답변, 인간 성능 데이터, 트랩 지표** 등 풍부한 메타데이터를 제공하며, **원문 페르시아어 데이터** 와 **이중 언어 구조** 를 통해 문화적 미묘함을 보존합니다. 실험은 **Zero-Shot, In-Context Learning, First Describe, Wrong Image, Without Image** 설정을 사용하여 **GPT-40, GPT-40-mini, GPT-4-Turbo, Gemini-2.0-flash, InstructBLIP-T5** 모델을 평가했습니다.

## 주요 결과
**지식 기반 태스크** 는 모든 모델에서 **추론 기반 태스크** 보다 일관되게 우수한 성능을 보였으며, 특히 페르시아어 태스크에서 **10-19%** 더 큰 정확도 격차를 나타냈습니다. **Gemini 2.0-Flash** 는 **이미지 불일치 감지** 에서 GPT 모델들보다 높은 성능을 보였고, 특히 페르시아어 입력에서 **GPT-4 Mini보다 MEENA 데이터셋에서 400개 이상의 더 많은 감지** 를 기록했습니다. 그러나 **GPT-4-Turbo** 와 **GPT-40** 은 이미지 부재 오류율이 낮았으나, **Gemini 2.0-Flash** 는 페르시아어 입력에서 **9.17%** 의 높은 '이미지 없음' 오류율을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 영어를 넘어 **문화적, 언어적으로 다양한 VLM 벤치마크** 의 필요성을 강조합니다. AI 실무자들은 **MEENA** 를 활용하여 페르시아어 VLM의 **추론 능력** 과 **환각 완화** 역량을 심층적으로 평가할 수 있습니다. 특히, 모델이 **지식 검색** 에는 강하지만 **복잡한 추론** 에는 여전히 어려움을 겪고 있음을 보여주며, 이는 향후 VLM 연구 및 개발 방향에 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.