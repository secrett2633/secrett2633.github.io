---
title: "[논문리뷰] Delta Activations: A Representation for Finetuned Large Language Models"
excerpt: "Ser-Nam Lim이 [arXiv]에 게시한 'Delta Activations: A Representation for Finetuned Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Embedding
  - Delta Activations
  - Finetuned Models
  - Model Representation
  - Model Clustering
  - Additive Property
  - Task Embedding
  - Model Merging

permalink: /ai/review/2025-9-5-Delta-Activations-A-Representation-for-Finetuned-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-05 13:07:20+0900
last_modified_at: 2025-09-05 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04442)

**저자:** Zhiqiu Xu, Amish Sethi, Mayur Naik, Ser-Nam Lim



## 핵심 연구 목표
다양하게 미세 조정된 대규모 언어 모델(LLM)의 방대한 생태계에서 모델 간의 유사점과 차이점을 효율적으로 파악하고, 모델을 검색, 비교 및 클러스터링할 수 있는 **표준화된 표현 방식** 이 부족한 문제를 해결하는 것이 목표입니다. 이는 기존의 메타데이터 부족 문제를 극복하고 모델 재사용을 촉진하기 위함입니다.

## 핵심 방법론
본 논문은 미세 조정된 모델을 **벡터 임베딩** 으로 표현하는 **Delta Activations** 를 제안합니다. 이는 **고정된 소규모의 일반적인 프롬프트 집합(probe dataset)** 을 사용하여 **기본 모델(base model)** 과 **미세 조정된 모델** 의 **내부 활성화(internal activations)** 를 비교하여 그 차이를 측정합니다. 이 활성화 차이( **Δf(x) = hf(x) – hbase(x)** )를 **평균화** 하여 모델의 행동 변화를 나타내는 **벡터 임베딩** 을 생성합니다. 또한, 활성화 외에 로짓이나 의미 표현을 사용하는 **Delta-X 패밀리** 로 확장될 수 있습니다.

## 주요 결과
**Delta Activations** 는 여러 백본( **LLaMA-3.1-8B, Gemma-2-9B, Qwen-2.5-7B** )에서 평균 **0.614** 의 높은 **실루엣 점수** 로 미세 조정된 LLM을 도메인별로 성공적으로 클러스터링했습니다. 이는 **평탄화된 가중치** 나 **출력 문장 임베딩** 과 같은 기준선 방법을 크게 능가합니다. 또한, **Delta Activations** 임베딩은 **가산성(additive property)** 을 보여, 여러 데이터셋으로 미세 조정된 모델이 개별 모델의 임베딩 합과 일치함을 입증했습니다. **모델 선택** 작업에서 무작위 선택 대비 평균 **2.0%** 의 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
**Delta Activations** 는 미세 조정된 LLM을 효과적으로 발견, 비교, 재사용할 수 있는 강력한 도구를 제공하여, **모델 허브** 구축 및 관리를 용이하게 합니다. 이는 불필요한 재훈련을 줄여 **AI 개발의 지속 가능성** 을 높일 수 있습니다. 또한, **소수의 예시(few-shot)만으로 태스크를 임베딩** 하고 **모델 병합(model merging)** 및 **선택 전략** 에 활용될 수 있어 AI 실무자들에게 다양한 응용 가능성을 제시합니다. 다만, **내부 히든 스테이트에 대한 접근** 이 필요하다는 제약이 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.