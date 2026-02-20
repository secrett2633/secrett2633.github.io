---
title: "[논문리뷰] Typhoon OCR: Open Vision-Language Model For Thai Document Extraction"
excerpt: "arXiv에 게시된 'Typhoon OCR: Open Vision-Language Model For Thai Document Extraction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Model
  - OCR
  - Thai Language Processing
  - Document Understanding
  - Low-Resource Language
  - Data Synthesis
  - Fine-tuning
  - Layout Analysis

permalink: /ai/review/2026-01-22-Typhoon-OCR-Open-Vision-Language-Model-For-Thai-Document-Extraction/

toc: true
toc_sticky: true

date: 2026-01-22 00:00:00+0900+0900
last_modified_at: 2026-01-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14722)

**저자:** Surapon Nonesung, Natapong Nitarach, Teetouch Jaknamon, Pittawat Taveekitworachai, Kunat Pipatanakul



## 핵심 연구 목표
기존 VLM이 태국어와 같은 저자원 언어의 복잡한 스크립트 특성(비라틴 문자, 명시적 단어 경계 부재, 스택형 발음 구별 부호) 및 비정형 문서 레이아웃으로 인해 겪는 한계를 해결하는 것입니다. 본 연구는 태국어 및 영어 문서 추출을 위한 **개방형 Vision-Language Model (Typhoon OCR)** 을 개발하여 텍스트 전사, 레이아웃 재구성, 문서 수준의 구조적 일관성을 달성하는 것을 목표로 합니다.

## 핵심 방법론
Typhoon OCR은 **Qwen2.5-VL (V1) 및 Qwen3-VL (V1.5) VLM 백본** 을 사용하여 **전체 파라미터 Supervised Fine-Tuning (SFT)** 방식으로 훈련됩니다. **다단계 데이터 구성 파이프라인** 을 통해 전통적인 OCR, VLM 기반 재구조화, 그리고 **큐레이션된 합성 데이터** 를 결합하여 태국어 중심의 훈련 데이터셋을 구축합니다. 모델은 **Default Mode** (느슨한 구조)와 **Structure Mode** (복잡한 레이아웃) 두 가지 모드를 지원하며, 특히 합성 데이터는 PyThaiNLP, SEA-VL Crawling, ChartCap, LaTeX OCR 등을 활용하고 **Augraphy** 로 이미지 증강을 수행하여 다양한 시각 및 언어적 패턴을 포괄합니다.

## 주요 결과
Typhoon OCR V1.5 (2B 파라미터)는 태국어 문서 파싱 벤치마크에서 기존 V1 (7B 파라미터) 모델 및 **GPT-4o, Gemini 2.5 Flash** 와 같은 최첨단 독점 모델들을 능가하는 성능을 보였습니다. 특히 **평균 BLEU 점수 0.644** 및 **Levenshtein 거리 0.251** 를 달성하여 더 높은 정확도와 낮은 오류율을 기록했습니다. 태국 정부 양식과 같은 구조화된 문서에서는 **BLEU 0.870** 을 기록하며 독점 모델을 크게 앞섰으며, 이는 더 작은 모델 크기에도 불구하고 **비용 효율적인 추론** 이 가능함을 입증합니다.

## AI 실무자를 위한 시사점
본 연구는 **사전 훈련된 VLM의 목표 지향적 적응** 과 **정교하게 설계된 데이터 파이프라인** 이 태국어와 같은 저자원 환경에서 강력한 문서 이해 능력을 달성할 수 있음을 보여줍니다. 특히 **2B 파라미터** 의 경량 모델임에도 불구하고 경쟁력 있는 성능을 제공하여 **자원 제약적이고 개인 정보 보호에 민감한 환경** 에서의 배포에 실용적인 시사점을 제공합니다. **합성 데이터 생성** 은 복잡한 스크립트와 데이터 부족 문제를 해결하는 효과적인 전략으로, 다른 저자원 언어에도 적용 가능한 방법을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.