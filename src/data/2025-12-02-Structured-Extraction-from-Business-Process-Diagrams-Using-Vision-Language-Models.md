---
title: "[논문리뷰] Structured Extraction from Business Process Diagrams Using Vision-Language Models"
excerpt: "Barry Devereux이 arXiv에 게시한 'Structured Extraction from Business Process Diagrams Using Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - BPMN Extraction
  - Structured Information Extraction
  - OCR Enrichment
  - Prompt Engineering
  - Diagram Understanding
  - Business Process Management

permalink: /ai/review/2025-12-02-Structured-Extraction-from-Business-Process-Diagrams-Using-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.22448)

**저자:** Pritam Deka, Barry Devereux



## 핵심 연구 목표
이 논문은 비즈니스 프로세스 모델 및 표기법(BPMN) 다이어그램 이미지에서 **원시 XML 파일이나 텍스트 주석 없이** 직접 **구조화된 JSON 표현** 을 추출하는 것을 목표로 합니다. 이는 기존 방법론이 XML 의존성으로 인해 발생하는 하위 시스템 통합 및 분석의 제약을 극복하기 위함입니다.

## 핵심 방법론
본 연구는 **Vision-Language Models (VLMs)** 을 활용한 **프롬프트 기반 파이프라인** 을 제안합니다. 초기 VLM 전용 추출 방식과 함께, **Pix2Struct, RapidOCR, Tesseract** 와 같은 **OCR 도구** 를 이용한 **텍스트 기반 보강 기법** 을 병렬적으로 적용하여 VLM의 누락된 레이블을 채워 넣는 하이브리드 접근법을 사용했습니다. 또한, **제로샷(Zero-shot) 스키마 제약 프롬프트** 와 **DFS+BFS 하이브리드 프롬프트 전략** 을 통해 모델의 일관성과 정확성을 높였습니다.

## 주요 결과
다양한 VLM 모델을 벤치마킹한 결과, **GPT-4.1, GPT-40, Mistral-Small-3.1** 과 같은 상위 티어 모델은 **0.70 이상의 F1 스코어** 를 달성하며 OCR 없이도 강력한 성능을 보였습니다. 중위 티어 모델(예: **Qwen2.5VL-7B, Gemma-12B, Pixtral-Large** )은 **OCR 보강 시 F1 스코어에서 3-5포인트 향상** 을 보이며, 특히 **Pix2Struct 및 Tesseract** 가 리콜을 개선하는 데 기여했습니다. 관계 추출은 이름 및 유형 추출보다 어려운 것으로 나타났으며, **SequenceFlow, MessageFlow, Gateway** 유형에서 높은 오류율을 보였습니다.

## AI 실무자를 위한 시사점
AI/ML 실무자들은 **BPMN 다이어그램 이미지만으로도 구조화된 데이터를 추출** 할 수 있음을 확인하여, 기존의 수동 작업이나 XML 의존성에서 벗어날 수 있습니다. 특히, **중위 티어 VLM 모델** 을 사용할 경우 **OCR 기반의 텍스트 보강** 이 성능 향상에 큰 영향을 미치므로, 실제 적용 시 시나리오에 따라 적절한 OCR 도구를 결합하는 전략을 고려해야 합니다. **DFS+BFS 하이브리드 프롬프트** 와 같은 **고도화된 프롬프트 엔지니어링** 은 복잡한 구조의 다이어그램에서 관계 추출 정확도를 높이는 데 효과적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.