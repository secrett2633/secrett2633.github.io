---
title: "[논문리뷰] What Users Leave Unsaid: Under-Specified Queries Limit Vision-Language Models"
excerpt: "이 [arXiv]에 게시한 'What Users Leave Unsaid: Under-Specified Queries Limit Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Under-specified Queries
  - Multimodal Benchmark
  - HAERAE-Vision
  - Query Explicitation
  - Retrieval Augmentation
  - Cultural Knowledge
  - Korean QA

permalink: /ai/review/2026-01-13-What-Users-Leave-Unsaid-Under-Specified-Queries-Limit-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.06165)

**저자:** Dasol Choi, Guijin Son, Hanwool Lee, Minhyuk Kim, Hyunwoo Ko, Teabin Lim, Eungyeol Ahn, Jungwhan Kim, Seunghyeok Hong, Youngsook Song



## 핵심 연구 목표
본 논문은 현재 Vision-Language Models (VLMs) 벤치마크가 대부분 명확하고 구조화된 질문에 초점을 맞추고 있어 실제 사용자 질의의 비공식적이고 불완전한 특성을 제대로 반영하지 못하는 문제를 제기합니다. 사용자 질의의 **미지정(under-specification)** 이 VLM 성능에 미치는 영향을 정량화하고, 이로 인해 발생하는 현실 세계 배포와의 격차를 조명하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 한국 온라인 커뮤니티의 실제 사용자 질의를 기반으로 **HAERAE-Vision** 벤치마크를 구축했습니다. 86,052개의 후보 질문-이미지 쌍에서 6단계 필터링 파이프라인을 거쳐 653개의 고품질 문제(생존율 **0.76%** )를 선별했으며, 각 원본 질의에는 누락된 정보를 명시적으로 재작성한 **HAERAE-Vision-Explicit** 버전이 함께 제공됩니다. 총 45개의 VLM을 대상으로 **체크리스트 기반 평가** 와 **LLM-as-a-judge** 프로토콜을 사용하여 성능을 측정하고, 웹 검색의 효과도 비교 분석했습니다.

## 주요 결과
**GPT-5** 와 **Gemini 2.5 Pro** 와 같은 최신 VLM도 원본 질의에서는 **50% 미만** 의 정확도를 기록했으며, 질의를 명시적으로 재작성했을 때 **8~22% 포인트의 상당한 성능 향상** 을 보였습니다. 특히 소형 모델인 **GPT-5-Nano** 는 **21.7% 포인트** (21.2% → 43.0%) 성능이 향상되어 미지정 질의에 더 큰 영향을 받는 것으로 나타났습니다. 웹 검색을 활성화하더라도 미지정 질의의 성능(GPT-5: **55.58%** )은 검색 기능이 없는 명시적 질의의 성능(GPT-5: **57.57%** )보다 낮게 나타났습니다.

## AI 실무자를 위한 시사점
본 연구는 VLM이 실제 환경에서 직면하는 미지정 질의에 대한 근본적인 한계를 보여주며, 현재 벤치마크 평가가 현실 세계 배포와의 격차를 반영하지 못함을 시사합니다. AI 엔지니어는 모델이 사용자의 의도를 먼저 파악해야 검색이 효과적이라는 점을 인지하고, **프롬프트 명확화** 또는 **대화형 질의 개선 메커니즘** 개발에 집중해야 합니다. 특히, 명시적 질의에서도 남은 실패 요인이 주로 **문화적 지식 격차** 에서 비롯된다는 점은 한국어와 같은 비영어권 콘텐츠에 대한 **문화적 접지(cultural grounding)** 학습 데이터의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.