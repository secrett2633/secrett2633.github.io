---
title: "[논문리뷰] LMEnt: A Suite for Analyzing Knowledge in Language Models from
  Pretraining Data to Representations"
excerpt: "Yoav Gur-Arieh이 [arXiv]에 게시한 'LMEnt: A Suite for Analyzing Knowledge in Language Models from
  Pretraining Data to Representations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Models
  - Knowledge Acquisition
  - Pretraining Data
  - Entity Linking
  - Coreference Resolution
  - Information Retrieval
  - Model Analysis
  - Checkpoints

permalink: /ai/review/2025-9-4-LMEnt-A-Suite-for-Analyzing-Knowledge-in-Language-Models-from-Pretraining-Data-to-Representations/

toc: true
toc_sticky: true

date: 2025-09-04 12:56:15+0900
last_modified_at: 2025-09-04 12:56:15+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.03405)

**저자:** Yoav Gur-Arieh, Ido Cohen, Alon Gilae-Dotan, Daniela Gottesman, Mor Geva



## 핵심 연구 목표
언어 모델(LMs)이 사전 훈련 과정에서 지식 표현을 어떻게 형성하고 발전시키는지에 대한 내부 프로세스를 분석하는 것입니다. 특히, 사전 훈련 데이터 내에서 특정 지식이 언제, 어디서 나타나는지 정확히 추적할 수 있는 투명한 환경을 제공하여, **데이터 구성, 훈련 역학, 내부 지식 메커니즘** 간의 상호작용을 이해하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **LMEnt** 라는 포괄적인 스위트를 제안하며, 이는 세 가지 주요 구성 요소로 이루어집니다: 1) 영어 위키백과를 기반으로 구축된 **엔티티 멘션으로 풍부하게 주석 처리된 사전 훈련 코퍼스** (하이퍼링크, 엔티티 연결, 코레퍼런스 해소 사용), 2) 고유한 **Wikidata 식별자** 를 통해 특정 엔티티를 언급하는 모든 데이터 청크를 검색하는 **엔티티 기반 검색 인덱스** (Elasticsearch 기반), 3) 주석 처리된 데이터를 사용하여 훈련된 **12개의 사전 훈련 모델** (170M, 600M, 1B 매개변수)과 각 에포크당 **110개의 중간 체크포인트** 입니다.

## 주요 결과
**LMEnt 모델** 은 지식 벤치마크인 **PopQA** 에서 Pythia-1.4B 및 OLMO-1B와 유사한 성능을 보였으며, 인기 있는 엔티티에 대해 **66%의 정확도** 를 달성했습니다. **LMEnt의 엔티티 기반 검색** 은 기존 문자열 기반 검색 방법보다 최대 **80.4%** 더 우수하며, 검색 청크 수가 증가하더라도 **97% 이상의 높은 정밀도** 를 유지합니다. 또한, 지식 획득 분석을 통해 **사실 빈도** 가 학습과 상관관계가 있지만, 학습 및 망각률이 모두 빈도에 따라 증가하는 현상을 발견했습니다.

## AI 실무자를 위한 시사점
**LMEnt** 는 AI/ML 엔지니어들에게 언어 모델의 지식 습득 과정을 정밀하게 분석할 수 있는 **통제된 실험 환경** 을 제공합니다. 이는 **모델의 사실성, 견고성, 완전성** 을 향상시키기 위한 **지식 표현 개선, 지식 편집, 학습 역학 이해** 등에 중요한 통찰을 제공할 수 있습니다. 특히, **엔티티 기반의 투명한 데이터 추적 시스템** 은 모델의 결정에 대한 **설명 가능성(explainability)** 과 **귀인(attribution)** 연구에 핵심적인 도구가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.