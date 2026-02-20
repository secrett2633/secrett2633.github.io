---
title: "[논문리뷰] CoTox: Chain-of-Thought-Based Molecular Toxicity Reasoning and
  Prediction"
excerpt: "Donghyeon Lee이 arXiv에 게시한 'CoTox: Chain-of-Thought-Based Molecular Toxicity Reasoning and
  Prediction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Toxicity Prediction
  - Large Language Model
  - Chain-of-Thought
  - Drug Development
  - Cheminformatics
  - Interpretable AI
  - IUPAC Nomenclature

permalink: /ai/review/2025-8-7-CoTox-Chain-of-Thought-Based-Molecular-Toxicity-Reasoning-and-Prediction/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03159)

**저자:** Jueon Park, Yein Park, Minju Song, Soyon Park, Donghyeon Lee, Seungheun Baek, Jaewoo Kang



## 핵심 연구 목표
기존 AI/ML 독성 예측 모델의 한계(데이터 의존성, 해석 불가능성)와 LLM 기반 접근법의 문제점(SMILES 이해 부족, 생물학적 맥락 부재, 추론 비활용)을 극복하는 것을 목표로 합니다. 화학 구조 정보와 생물학적 맥락을 통합하고 **단계별 추론(Chain-of-Thought)** 을 통해 다중 독성을 예측하는 **CoTox 프레임워크** 를 제안하여 모델의 해석 가능성과 예측 정확도를 향상시키고자 합니다.

## 핵심 방법론
**CoTox** 는 **LLM (GPT-4o, Gemini-2.5-Pro)** 과 **Chain-of-Thought (CoT)** 추론을 통합합니다. 입력으로는 **IUPAC 이름** 형태의 화학 구조 정보와 **CTD(Comparative Toxicogenomics Database)** 에서 추출 및 **GPT-4o** 로 필터링된 독성 관련 **생체 경로(pathway)** 및 **GO(Gene Ontology) 용어** 를 사용합니다. 모델은 **체인-오브-사고** 프롬프팅을 통해 경로, GO 용어, IUPAC 이름 해석을 포함한 4단계 분석 과정을 거쳐 **JSON 형식** 의 독성 예측과 설명을 생성합니다.

## 주요 결과
**UniTox 데이터셋** 에서 **CoTox (IUPAC)** 는 평균 F1-score **0.663** 을 달성하여 **XGBoost (0.576)** , **Chemprop (0.619)** 등 전통적인 모델 및 다른 LLM 기반 프롬프트 방식을 뛰어넘는 성능을 보였습니다. 특히 **Gemini-2.5-Pro** 와 함께 사용했을 때 평균 F1-score **0.700** 으로 가장 높은 성능을 기록했습니다. **IUPAC 이름** 사용 시 **SMILES** 보다 전반적으로 성능이 향상되었으며, 사례 연구를 통해 **CoTox** 가 알려진 독성 메커니즘과 일치하는 설명을 생성함을 확인했습니다.

## AI 실무자를 위한 시사점
**LLM** 과 **Chain-of-Thought 추론** 을 도메인별 맥락과 결합하는 접근 방식은 독성 예측의 성능과 해석 가능성을 크게 향상시킬 수 있음을 보여줍니다. **IUPAC 이름** 사용이 **LLM** 의 자연어 이해 능력에 더 부합하여 모델 성능을 개선할 수 있으므로, AI/ML 엔지니어는 **화학 데이터의 표현 방식** 을 신중하게 고려해야 합니다. **CoTox** 는 초기 약물 개발 단계에서 **메커니즘 기반의 안전성 평가** 를 지원하여 의사결정 과정을 보강하는 실용적인 도구가 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.