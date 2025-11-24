---
title: "[논문리뷰] ViExam: Are Vision Language Models Better than Humans on Vietnamese
  Multimodal Exam Questions?"
excerpt: "Daeyoung Kim이 [arXiv]에 게시한 'ViExam: Are Vision Language Models Better than Humans on Vietnamese
  Multimodal Exam Questions?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision Language Models
  - Multimodal AI
  - Vietnamese Language
  - Educational Assessment
  - Low-Resource Languages
  - Cross-Lingual Reasoning
  - ViExam
  - Human-in-the-Loop

permalink: /ai/review/2025-8-21-ViExam-Are-Vision-Language-Models-Better-than-Humans-on-Vietnamese-Multimodal-Exam-Questions/

toc: true
toc_sticky: true

date: 2025-08-21 13:15:28+0900
last_modified_at: 2025-08-21 13:15:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.13680)

**저자:** Vy Tuong Dang, An Vo, Quang Tau, Duc Dm, Daeyoung Kim



## 핵심 연구 목표
본 논문은 베트남어 다중 양식 시험 문제에 대한 **Vision Language Models (VLMs)**의 성능을 평가하는 것을 목표로 합니다. 주로 영어 데이터로 훈련된 VLMs가 저자원 언어인 베트남어 환경에서 실제 **교차 언어 복합 양식 추론**을 효과적으로 처리할 수 있는지 조사하고자 합니다. 이는 문화적 지식, 도메인별 용어 및 복잡한 시각적 추론을 포함하는 교육 콘텐츠에 대한 VLM의 능력 평가 공백을 해결합니다.

## 핵심 방법론
연구팀은 **2,548개의 다중 양식 질문**으로 구성된 최초의 베트남어 다중 양식 시험 벤치마크인 **ViExam**을 제안했습니다. 데이터 수집, 정제, 라벨링, 품질 검증을 포함하는 **반자동화된 파이프라인**을 통해 고품질의 다중 양식 콘텐츠를 확보했습니다. **Gemini 2.5 Flash, Sonnet 4.0, GPT 4.1, 03**를 포함한 **4개의 SOTA VLM**과 **10개의 오픈소스 VLM**을 대상으로 평가를 수행했으며, **인간-모델 협업(human-in-the-loop)** 방식도 탐구했습니다.

## 주요 결과
최첨단(SOTA) VLMs는 ViExam에서 평균 **57.74%**의 정확도를 달성하여, 평균 인간 시험 응시자 성능인 **66.54%**보다 낮았습니다. 특히 **사고형 VLM인 03**은 **74.07%**의 정확도로 다른 모델들을 크게 능가했습니다. VLMs는 베트남어 텍스트에 대해 **평균 F1 점수 0.94**의 강력한 OCR 성능을 보여, 성능 저하가 텍스트 인식보다는 **다중 양식 추론 문제**에서 비롯됨을 확인했습니다. 인간-모델 협업은 **03 모델**의 성능을 최대 **5.71%**까지 향상시켰습니다.

## AI 실무자를 위한 시사점
현재 SOTA VLMs는 베트남어와 같은 **저자원 언어의 복합 양식 교육 콘텐츠**에서 인간의 평균 성능에 미치지 못하므로, 이 분야의 모델 개발에 더 많은 연구가 필요합니다. 특히 **교차 언어 복합 양식 추론 능력**을 개선하기 위한 **특정 문화 및 도메인 지식 통합**의 중요성을 강조합니다. **"사고형(thinking)" VLM (03)**의 우수한 성능은 복잡한 추론 기능이 이러한 유형의 문제 해결에 효과적임을 시사하며, **인간-AI 협업**을 통해 모델의 성능을 향상시킬 수 있는 실용적인 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.