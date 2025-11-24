---
title: "[논문리뷰] The German Commons - 154 Billion Tokens of Openly Licensed Text for
  German Language Models"
excerpt: "이 [arXiv]에 게시한 'The German Commons - 154 Billion Tokens of Openly Licensed Text for
  German Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - German Commons
  - Large Language Models
  - Training Data
  - Openly Licensed Text
  - Data Curation
  - German NLP
  - Corpus Construction
  - Quality Filtering

permalink: /ai/review/2025-10-17-The-German-Commons-154-Billion-Tokens-of-Openly-Licensed-Text-for-German-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13996)

**저자:** Lukas Gienapp, Christopher Schröder, Ferdinand Schlatt, Arden Zimmermann, Stefan Schweter, Philippe Genêt, Christopher Akiki, Martin Potthast



## 핵심 연구 목표
이 논문은 대규모 **독일어 언어 모델 개발**을 위한 **오픈 라이선스 텍스트 데이터**의 심각한 부족 문제를 해결하는 것을 목표로 합니다. 기존 데이터셋의 불확실한 라이선스, 품질 문제, 그리고 비영어권 언어 데이터의 희소성을 극복하여 **윤리적이고 법적 준수**가 가능한 고품질의 독일어 사전 훈련 코퍼스를 구축하고자 합니다.

## 핵심 방법론
연구팀은 41개의 기관 출처로부터 **154.56억 토큰**의 독일어 텍스트를 체계적으로 수집했습니다. 데이터는 7가지 주제 도메인(웹, 정치, 법률, 뉴스, 경제, 문화, 과학)에 걸쳐 있으며, **종합적인 품질 필터링**, **중복 제거** (LSH Bloom Filter 및 20-gram shingling 사용), **텍스트 포맷팅 수정**, **언어 및 길이 필터링** (**FastText**, **GPT-2 tokenizer** 활용), 그리고 **PII 제거** (**regex** 및 **Presidio framework** 사용)를 포함하는 **견고한 처리 파이프라인**을 구현했습니다.

## 주요 결과
논문은 현재까지 가장 큰 오픈 라이선스 독일어 텍스트 컬렉션인 **The German Commons**를 구축했습니다. 이 코퍼스는 **3578만 개 문서**에서 총 **154.56억 개의 토큰**을 포함하며, 품질 필터링 후에도 **50.73%의 데이터 보존율**을 보였습니다. 텍스트 분석 결과, 평균 **95%의 단락이 독성 점수 0**을 기록하여 유해하거나 독성 있는 콘텐츠가 매우 적음을 입증했습니다.

## AI 실무자를 위한 시사점
**The German Commons**는 AI/ML 엔지니어와 데이터 과학자가 **투명하고 법적 문제가 없는 독일어 LLM**을 개발할 수 있도록 하는 필수적인 자원을 제공합니다. 공개된 **llmdata 라이브러리**와 상세한 구축 방법론은 데이터셋의 **재현성 및 확장성**을 보장하며, 다양한 도메인과 균형 잡힌 언어 복잡도 분포는 모델이 여러 언어 레지스터에 걸쳐 학습하고 적용될 수 있는 기반을 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.