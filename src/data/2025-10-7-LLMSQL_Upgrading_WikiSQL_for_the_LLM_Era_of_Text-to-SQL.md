---
title: "[논문리뷰] LLMSQL: Upgrading WikiSQL for the LLM Era of Text-to-SQL"
excerpt: "이 [arXiv]에 게시한 'LLMSQL: Upgrading WikiSQL for the LLM Era of Text-to-SQL' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-SQL
  - WikiSQL
  - LLM
  - Dataset Curation
  - Natural Language Processing
  - Benchmark
  - SQL Generation
  - Data Cleaning

permalink: /ai/review/2025-10-7-LLMSQL_Upgrading_WikiSQL_for_the_LLM_Era_of_Text-to-SQL/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.02350)

**저자:** Dzmitry Pihulski, Karol Charchut, Viktoria Novogrodskaia, Jan Kocoń



## 핵심 연구 목표
본 논문은 기존 **WikiSQL** 데이터셋이 가진 데이터 타입 불일치, 대소문자 일관성 부족, 구문 오류, 답변 불가 질문 등의 구조적, 주석 관련 문제점을 해결하고자 합니다. 이를 통해 **LLM 시대**에 맞춰 **Text-to-SQL** 연구의 신뢰성을 높이고, 모델 평가를 위한 **LLM-ready** 벤치마크인 **LLMSQL**을 구축하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **WikiSQL**의 구조적 및 의미론적 문제를 체계적으로 분석하여 **데이터 타입 불일치**, **대소문자 불일치**, **빈 결과 쿼리** 등을 식별했습니다. 이러한 오류를 해결하기 위해 **자동화된 클리닝 및 재주석 방법**을 구현했으며, 여기에는 중복 제거, 숫자 플레이스홀더를 실제 SQL 키워드로 대체하는 등 비직관적인 SQL 형식의 표준화가 포함됩니다. 다양한 **대규모 언어 모델(LLM)**을 대상으로 **0-shot, 1-shot, 5-shot** 설정 및 **파인튜닝** 시나리오에서 **실행 정확도(execution accuracy)**를 기준으로 성능을 평가했습니다.

## 주요 결과
**DeepSeek R1 0528** (5-shot에서 **86.57%**) 및 **OpenAI 04-mini** (5-shot에서 **86.45%**)와 같은 대규모 모델들이 **LLMSQL** 벤치마크에서 가장 높은 실행 정확도를 달성했습니다. 상대적으로 작은 모델들(예: **Gemma3 4B IT, Llama3.2 1B Instruct**)도 파인튜닝을 통해 **90% 이상**의 실행 정확도를 달성하며 큰 개선을 보였습니다. 또한, 원본 데이터셋에서 **49.25%**에 달하던 빈 결과 쿼리 중 **41.22%**를 대소문자 불일치 문제를 해결하여 성공적으로 제거했습니다.

## AI 실무자를 위한 시사점
**LLMSQL**은 기존 **WikiSQL**의 고질적인 문제들을 해결하여, **Text-to-SQL** 모델 개발 및 평가에 필요한 더욱 신뢰할 수 있고 재현 가능한 벤치마크를 제공합니다. **LLM**의 성능이 **few-shot 예제**나 **파인튜닝**을 통해 크게 향상될 수 있음을 보여주므로, 실무자들은 **데이터셋에 특화된 지침**이나 **추가 학습**을 통해 모델 성능을 최적화할 수 있습니다. **표준 SQL 형식**을 채택하여 다양한 **관계형 데이터베이스 시스템**과의 호환성을 높여 실제 응용에의 적용 가능성을 확대합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.