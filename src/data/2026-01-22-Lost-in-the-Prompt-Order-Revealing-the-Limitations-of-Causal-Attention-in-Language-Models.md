---
title: "[논문리뷰] Lost in the Prompt Order: Revealing the Limitations of Causal Attention in Language Models"
excerpt: "arXiv에 게시된 'Lost in the Prompt Order: Revealing the Limitations of Causal Attention in Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Prompt Engineering
  - Large Language Models
  - Causal Attention
  - Multiple-Choice QA
  - Prompt Order Sensitivity
  - Information Bottleneck
  - Decoder-only Transformers

permalink: /ai/review/2026-01-22-Lost-in-the-Prompt-Order-Revealing-the-Limitations-of-Causal-Attention-in-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-22 00:00:00+0900+0900
last_modified_at: 2026-01-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14152)

**저자:** Hyunjong Ok, Jaeho Lee



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 프롬프트 구조에 민감하게 반응하는 이유를 밝히고, 특히 **다중 선택 질의응답(MCQA)** 태스크에서 컨텍스트의 순서가 성능에 미치는 영향을 분석하는 것을 목표로 합니다. 컨텍스트가 질문과 옵션 뒤에 오는 **QOC(Question-Option-Context)** 형식이 컨텍스트가 앞에 오는 **CQO(Context-Question-Option)** 형식보다 성능이 현저히 떨어지는 현상의 근본적인 메커니즘을 규명하고자 합니다.

## 핵심 방법론
연구진은 **21개 디코더 전용 LLM** 을 **LogiQA, RACE-H/M, SciQ** 등 4가지 MCQA 데이터셋에 대해 **CQO** 및 **QOC** 두 가지 프롬프트 구조로 평가했습니다. 이 현상을 설명하기 위해 **훈련 데이터 편향** , **옵션 회상 실패** , **인과적 어텐션** 이라는 세 가지 가설을 설정하고, **아키텍처 비교(인코더 전용 및 인코더-디코더 모델 포함)** , **어텐션 분석** , **그레이디언트 어트리뷰션** , 그리고 **어텐션 가지치기(attention pruning)** 및 **액티베이션 패칭(activation patching)** 과 같은 **표적 개입(targeted interventions)** 을 통해 이를 체계적으로 검증했습니다.

## 주요 결과
**QOC** 프롬프트는 **CQO** 보다 평균 **14.7%p** 낮은 성능을 보였으며, 이는 **훈련 데이터 편향** 및 **옵션 회상 실패** 가설을 기각했습니다. 핵심 원인은 **디코더 전용 트랜스포머의 인과적 어텐션** 으로, **QOC** 구조에서는 옵션 토큰이 컨텍스트에 접근할 수 없어 정보 병목 현상이 발생함이 밝혀졌습니다. **인코더 전용** 및 **인코더-디코더 모델** 에서는 이러한 성능 격차가 나타나지 않았으며, **CQO** 에서 **옵션-컨텍스트 어텐션을 차단** 했을 때 정확도가 **26.8%** 감소했고, **QOC** 에서 **컨텍스트 인식 옵션 표현을 복원** 했을 때 정확도가 **6.0%p** 증가했습니다. 또한, **옵션을 컨텍스트 뒤에 반복** 하는 간단한 방법으로 **QOC** 성능이 **8.2%p** 개선되었습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **디코더 전용 LLM** 을 사용할 때 **MCQA 태스크** 에서 **컨텍스트를 질문과 옵션보다 먼저 배치하는 CQO 프롬프트 형식** 을 적극적으로 활용해야 합니다. **QOC 형식** 의 불가피한 상황에서는 **옵션 반복(QOCO)** 과 같은 프롬프트 엔지니어링 기법을 적용하여 성능 저하를 완화할 수 있습니다. 또한, **인코더-디코더** 또는 **인코더 전용 모델** 은 프롬프트 순서에 덜 민감하므로, 특정 애플리케이션에서는 이러한 아키텍처를 고려하는 것이 효율적일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.