---
title: "[논문리뷰] COIG-Writer: A High-Quality Dataset for Chinese Creative Writing with
  Thought Processes"
excerpt: "이 [arXiv]에 게시한 'COIG-Writer: A High-Quality Dataset for Chinese Creative Writing with
  Thought Processes' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Chinese Creative Writing
  - Process Supervision
  - LLM Training
  - Dataset Creation
  - Cross-Lingual Transfer
  - Narrative Logic
  - Linguistic Expression
  - Type-Token Ratio

permalink: /ai/review/2025-10-17-COIG-Writer-A-High-Quality-Dataset-for-Chinese-Creative-Writing-with-Thought-Processes/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14763)

**저자:** Yunwen Li, Shuangshuang Ying, Xingwei Qu, et al.



## 핵심 연구 목표
대규모 언어 모델(LLM)이 비영어권, 특히 중국어 창의적 글쓰기에서 겪는 체계적인 결함(예: 예측 가능한 내러티브, 스타일 다양성 부족, 문화적 비정합성)을 해결하는 것을 목표로 합니다. 이를 위해, **내러티브 논리(구조적 계획)**와 **언어적 표현(문체적 구현)**이라는 창의적 글쓰기의 두 가지 구성 요소를 지원하는 고품질 데이터셋을 구축하고자 합니다.

## 핵심 방법론
저자들은 **COIG-Writer**라는 새로운 중국어 창의적 글쓰기 데이터셋을 제안했으며, **51개 장르**에 걸쳐 **1,665개의 정교하게 선별된 3요소(triplet)**로 구성됩니다. 각 3요소는 **역설계된 프롬프트, 상세한 창의적 추론 과정, 최종 텍스트**를 포함합니다. 데이터 구축은 LLM 기반 품질 심사(**Qwen3-235B-A22B** 활용)와 함께 전문가의 **역설계 방법론(프롬프트 재구성, 추론 과정 상세화, 일관성 검증)**을 통해 이루어졌습니다. 모델은 **Qwen2.5-7B-Instruct**를 기반으로 COIG-Writer 데이터와 일반 목적 데이터를 다양한 비율로 혼합하여 파인튜닝되었고, **인간 선호도 평가** 및 **Type-Token Ratio(TTR)**로 평가되었습니다.

## 주요 결과
**프로세스 감독**은 중국어 창의적 글쓰기에서 **62.75%의 유의미한 승률**을 달성하며 **25.5%p의 성능 향상**을 보였습니다. 최적의 성능은 **창의적 샘플과 일반 샘플의 약 1:12 비율**에서 나타났으며, 이 임계값 이하에서는 성능이 점진적으로 저하됩니다. **교차 언어 전이**는 제한적이었고, 영어 성능은 **46.46%**에 그쳤으며, **어휘 다양성(TTR)**은 창의적 품질과 **반비례**하는 관계를 보였습니다(최고 TTR 0.678은 최저 선호도 37.25%와 일치).

## AI 실무자를 위한 시사점
이 연구는 LLM의 창의적 글쓰기 능력을 향상시키는 데 **프로세스 감독(process supervision)**이 매우 효과적임을 입증했으며, 특히 데이터 희소성이 높은 비영어권 언어에 큰 이점을 제공합니다. 다만, 최적의 성능을 위해서는 **일반 목적 데이터와의 적절한 혼합 비율(최소 1:12)**이 필수적이므로, 데이터셋 구성 시 균형 잡힌 접근이 요구됩니다. 또한, 창의적 능력은 **언어 및 문화적으로 특화**되어 있어 교차 언어 전이 학습 시 **추론 수준의 적응**이 중요하며, **Type-Token Ratio (TTR)**가 논리적 결함의 지표로 활용될 수 있음을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.