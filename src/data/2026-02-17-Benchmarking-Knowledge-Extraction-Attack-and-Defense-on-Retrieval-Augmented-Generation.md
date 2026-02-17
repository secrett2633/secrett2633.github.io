---
title: "[논문리뷰] Benchmarking Knowledge-Extraction Attack and Defense on Retrieval-Augmented Generation"
excerpt: "Ryan Rossi이 [arXiv]에 게시한 'Benchmarking Knowledge-Extraction Attack and Defense on Retrieval-Augmented Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - RAG Security
  - Knowledge Extraction Attack
  - Benchmarking
  - Privacy Leakage
  - Defense Mechanisms
  - Large Language Models
  - Retrieval Augmented Generation

permalink: /ai/review/2026-02-17-Benchmarking-Knowledge-Extraction-Attack-and-Defense-on-Retrieval-Augmented-Generation/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.09319)

**저자:** Zhisheng Qi, Utkarsh Sahu, Li Ma, Haoyu Han, Ryan Rossi, Franck Dernoncourt, Mahantesh Halappanavar, Nesreen Ahmed, Yushun Dong, Yue Zhao, Yu Zhang, Yu Wang



## 핵심 연구 목표
이 연구는 **Retrieval-Augmented Generation (RAG)** 시스템에서 발생하는 **지식 추출 공격(Knowledge Extraction Attack)** 으로 인한 민감 정보 유출 및 지적 재산권 침해 문제를 해결하고자 합니다. 기존 연구의 파편화된 실험 환경과 일관성 없는 평가 방식의 한계를 극복하기 위해, RAG 시스템에 대한 최초의 **체계적인 지식 추출 공격 및 방어 벤치마크** 를 구축하여 표준화된 평가와 실행 가능한 인사이트를 제공하는 것을 목표로 합니다.

## 핵심 방법론
본 벤치마크는 **RAG 아키텍처** (리트리버, 생성기, 지식 베이스), **공격/방어 전략** , **평가 프로토콜** 을 포괄하는 설계 공간을 정의합니다. 공격은 **RandomText** , **DGEA** 등 다양한 **쿼리 생성 방식** 을 탐색하고, 방어는 **Threshold Defense** , **System-Block Defense** , **Summary Defense** , **Query-Block Defense** 등을 평가합니다. 평가는 **Retriever Extraction Effectiveness (EER)** , **Generator Extraction Effectiveness (EEG)** , **Combined Extraction Effectiveness (EE)** 및 **Attack Success Rate (ASR)** 와 같은 표준화된 지표를 사용하여 **HealthCareMagic** 등 4가지 데이터셋과 다양한 **LLM (예: GPT-4o mini, Llama)** 에서 수행됩니다.

## 주요 결과
**DGEA** 와 같은 **적응형 공격** 이 비방어 환경에서 **EER** 및 **EEG** 측면에서 높은 성능을 보였습니다. 방어 측면에서는 **Threshold defense** 와 **Summary defense** 가 전반적으로 가장 효과적이었으며, 특히 **Query Block** 은 명시적인 공격 의도가 있는 프롬프트를 차단하는 데 강점을 보였습니다. 또한, **폐쇄형 LLM 모델** 이 오픈소스 모델보다 지시 사항을 더 잘 따르는 경향을 보였고, **그래프 삼중항(Graph Triplet)** 과 같은 지식 베이스 구조화가 민감 정보 추출 효율을 높일 수 있음을 확인했습니다.

## AI 실무자를 위한 시사점
AI 실무자는 이 벤치마크를 통해 RAG 시스템의 **지식 추출 공격 취약점** 을 이해하고, **리트리버 및 생성기 모델 선택** , **지식 베이스 인덱싱 전략** , **프롬프트 엔지니어링** 이 보안에 미치는 영향을 고려하여 다단계 방어 전략을 설계할 수 있습니다. 특히 **개인 정보 보호** 나 **지적 재산권 보호** 가 필수적인 고위험 RAG 애플리케이션 개발 시, 본 연구의 표준화된 평가 프로토콜을 활용하여 시스템의 보안성을 효과적으로 검증하고 강화할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.