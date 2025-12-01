---
title: "[논문리뷰] Epistemic Diversity and Knowledge Collapse in Large Language Models"
excerpt: "이 [arXiv]에 게시한 'Epistemic Diversity and Knowledge Collapse in Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Epistemic Diversity
  - Knowledge Collapse
  - Homogenization
  - Retrieval-Augmented Generation
  - LLM Evaluation
  - Information Diversity
  - Cultural Bias

permalink: /ai/review/2025-10-7-Epistemic-Diversity-and-Knowledge-Collapse-in-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04226)

**저자:** Dustin Wright, Sarah Masud, Jared Moore, Srishti Yadav, Peter Ebert Christiansen, Maria Antoniak, Chan Young Park, Isabelle Augenstein



## 핵심 연구 목표
대규모 언어 모델(LLM)이 생성하는 텍스트의 동질성이 `지식 붕괴(knowledge collapse)`로 이어질 수 있다는 문제에 주목합니다. 본 연구는 LLM 출력의 `인식론적 다양성(epistemic diversity)`을 측정하는 새로운 방법론을 개발하고, 이를 통해 LLM의 지식 붕괴 현상을 광범위하게 실증 분석하는 것을 목표로 합니다.

## 핵심 방법론
27개 LLM에서 155개 토픽, 200개 프롬프트 변형에 대한 자유 형식 응답을 수집합니다. 응답 텍스트를 **원자적 주장(atomic claims)** 으로 분해한 후, **상호 함의(mutual entailment)** 를 기준으로 의미적 동등 클래스로 **클러스터링** 합니다. 클러스터 다양성은 생태학에서 사용되는 **Hill-Shannon 다양성 지수** 로 측정하며, **커버리지 추정(coverage estimation) 및 희귀화(rarefaction)** 를 통해 샘플링 편향을 보정합니다.

## 주요 결과
LLM의 인식론적 다양성은 기본적인 웹 검색에 비해 전반적으로 낮습니다. 하지만 **RAG(Retrieval-Augmented Generation)** 가 **IFT(Instruction Fine-Tuning)** 모델보다 통계적으로 유의미하게 높은 다양성(베타 계수 **+739.186** )을 보였습니다. 모델 크기가 클수록 다양성이 감소하는 경향이 있었으며(Small 모델은 **+277.415 HSD** , Large 모델은 **-142.698 HSD** ), 국가별 토픽에서 LLM은 지역 언어 지식보다 영어 지식을 더 많이 반영하여 5개국 중 8개국에서 통계적으로 유의미한 지식 격차를 보였습니다.

## AI 실무자를 위한 시사점
LLM의 출력 다양성 부족은 장기적으로 **정보 접근성을 제한** 하고 집단 지식을 축소시킬 수 있습니다. 따라서 **RAG와 같은 외부 지식 통합** 방식이 LLM의 인식론적 다양성을 확보하는 데 필수적이며, **RAG 데이터베이스의 다양성 유지** 가 중요합니다. 또한, **모델 크기 증가가 항상 더 나은 다양성을 보장하지 않음** 을 인지하고, 특정 문화권의 지식을 대표하기 위해 **다국어 데이터 및 지역화된 정보** 를 LLM에 통합하는 노력이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.