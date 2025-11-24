---
title: "[논문리뷰] ComProScanner: A multi-agent based framework for composition-property
  structured data extraction from scientific literature"
excerpt: "이 [arXiv]에 게시한 'ComProScanner: A multi-agent based framework for composition-property
  structured data extraction from scientific literature' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-agent Systems
  - Large Language Models (LLMs)
  - Information Extraction
  - Scientific Literature
  - Materials Science
  - Data Curation
  - Piezoelectric Materials
  - RAG (Retrieval-Augmented Generation)

permalink: /ai/review/2025-10-24-ComProScanner-A-multi-agent-based-framework-for-composition-property-structured-data-extraction-from-scientific-literature/

toc: true
toc_sticky: true

date: 2025-10-24 13:04:16+0900
last_modified_at: 2025-10-24 13:04:16+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20362)

**저자:** Aritra Roy, Enrico Grisan, John Buckeridge, Chiara Gattinoni



## 핵심 연구 목표
본 논문은 과학 문헌에서 화학 조성-물성 구조 데이터와 합성 정보를 추출하기 위한 **자동화되고 사용자 친화적인 멀티 에이전트 기반 프레임워크**를 개발하는 것을 목표로 합니다. 기존 LLM의 발전에도 불구하고 구조화된 지식 추출을 위한 접근 가능한 자동화 도구가 부족하다는 문제점을 해결하고, 기계 학습 및 딥러닝을 위한 고품질 데이터셋 구축을 용이하게 하고자 합니다.

## 핵심 방법론
연구팀은 **CrewAI** 기반의 자율 멀티 에이전트 프레임워크인 **ComProScanner**를 개발했습니다. 이 프레임워크는 **RAG (Retrieval-Augmented Generation)** 기술과 **커스텀 딥러닝 모델(material-parsers)**을 포함한 강력한 도구를 **LLM 에이전트**와 결합하여 화학 조성 및 속성을 추출합니다. 시스템은 메타데이터 검색, 기사 수집 (TDM API 또는 PDF), 정보 추출 (속성 식별자, 조성 및 합성 에이전트), 그리고 내장된 평가 기능을 포함하는 4단계 워크플로우로 구성됩니다. 총 10가지 LLM을 사용하여 100개의 세라믹 압전 재료 논문에서 **d33 압전 변형 계수** 추출 성능을 평가했습니다.

## 주요 결과
**DeepSeek-V3-0324** 모델이 모든 LLM 중 가장 우수한 성능을 보여, **종합 정확도 0.82**와 **조성 정확도 0.90**을 달성했습니다. **Qwen3-235B-A22B**, **Qwen-2.5-72B-Instruct**, **Llama-3.3-70B-Instruct** 또한 **0.87-0.90 범위의 평균 조성-물성 정확도**로 경쟁력 있는 성능을 보였습니다. 특히, **ComProScanner**는 기존 Materials Project 데이터베이스에 없는 **2090 pC/N**의 **Pb(In1/2Nb1/2)O3-Pb(Mg1/3Nb2/3)O3-PbTiO3**와 같은 새로운 압전 조성물을 성공적으로 추출했습니다.

## AI 실무자를 위한 시사점
**ComProScanner**는 재료 과학 분야 AI 실무자들이 복잡한 과학 문헌으로부터 구조화된 데이터셋을 구축하는 데 필요한 시간과 노력을 크게 줄여줄 수 있습니다. 이 프레임워크는 **멀티 에이전트 시스템**이 **RAG** 및 **도메인 특화 모델**과 결합될 때 복잡한 정보 추출 작업에 얼마나 효과적인지 보여줍니다. LLM 기반 추출의 비결정론적 특성을 고려할 때, **LLM 선택, 프롬프트 엔지니어링 및 RAG 구성 요소 조정**이 도메인 특정 성능에 중요하며, 비용 효율적인 평가를 위해 **시맨틱 평가**를 활용하는 것이 실용적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.