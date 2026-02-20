---
title: "[논문리뷰] IndicParam: Benchmark to evaluate LLMs on low-resource Indic Languages"
excerpt: "arXiv에 게시된 'IndicParam: Benchmark to evaluate LLMs on low-resource Indic Languages' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Low-resource Languages
  - Indic Languages
  - LLM Evaluation
  - Benchmark
  - Multilingual LLMs
  - Question Answering
  - Cross-lingual Transfer

permalink: /ai/review/2025-12-02-IndicParam-Benchmark-to-evaluate-LLMs-on-low-resource-Indic-Languages/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.00333)

**저자:** Ayush Maheshwari, Kaushal Sharma, Vivek Patel, Aditya Maheshwari



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 고자원 다국어 작업에서 우수한 성능을 보이지만, 저자원 및 초저자원 인디언 언어에 대한 평가는 심각하게 부족합니다. 본 연구는 이러한 언어에서의 LLM 성능 한계를 체계적으로 평가하고, 교차 언어 전이 학습의 효과를 밝히는 데 목적이 있습니다.

## 핵심 방법론
저자들은 **INDICPARAM** 이라는 벤치마크를 제시합니다. 이는 11개 저자원 인디언 언어(네팔어, 구자라트어, 마라티어, 오디아어) 및 초저자원 언어(도그리어, 마이틸리어, 라자스탄어, 산스크리트어, 보도어, 산탈리어, 콘칸어)와 산스크리트-영어 코드 혼합을 포함한 **13,000개 이상의 수작업 큐레이션된 객관식 질문** 으로 구성됩니다. 각 질문은 **지식 기반(GK)** 또는 **순수 언어학적(LU)** 으로 분류되었으며, **다양한 질문 형식** (예: 객관식, 주장-추론, 목록 매칭)을 포함합니다. **19개 LLM** (독점 및 오픈소스 모델)을 **제로샷 프롬프트 설정** 에서 평가했습니다.

## 주요 결과
평가 결과, 최상위 LLM들도 저자원 인디언 언어에서 제한적인 성능을 보였습니다. 가장 높은 성능을 보인 **GPT-5** 는 평균 **45%의 정확도** 를 달성했으며, **DeepSeek-3.2 (43.1%)** 및 **Claude-Haiku-4.5 (42.7%)** 가 그 뒤를 이었습니다. 어떤 모델도 평균 50% 정확도를 넘지 못했으며, 특히 산스크리트어(54.8%) 및 산스크리트-영어 코드 혼합(64.6%)에서 **GPT-5** 가 강세를 보였으나, 보도어와 산탈리어 같은 초저자원 언어에서는 모든 시스템이 36% 미만의 낮은 점수를 기록했습니다.

## AI 실무자를 위한 시사점
현재 LLM들은 저자원 인디언 언어에 대한 심층적인 언어 이해 및 일반 지식 습득에 상당한 한계를 가지고 있음을 시사합니다. AI 실무자들은 **교차 언어 전이 학습** 만으로는 이러한 언어의 복잡성을 완전히 해결하기 어렵다는 점을 인지해야 합니다. 따라서, **고품질의 다양한 인디언 언어 사전 훈련 데이터** 확보, **전용 교차 언어 지속 훈련** , 그리고 **형태론 및 구문론적 표현을 우선시하는 아키텍처 혁신** 이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.