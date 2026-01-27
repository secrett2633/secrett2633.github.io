---
title: "[논문리뷰] Can LLMs Clean Up Your Mess? A Survey of Application-Ready Data Preparation with LLMs"
excerpt: "이 [arXiv]에 게시한 'Can LLMs Clean Up Your Mess? A Survey of Application-Ready Data Preparation with LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Data Preparation
  - LLMs
  - Data Cleaning
  - Data Integration
  - Data Enrichment
  - AI Agents
  - Semantic Reasoning
  - Workflow Automation

permalink: /ai/review/2026-01-27-Can-LLMs-Clean-Up-Your-Mess-A-Survey-of-Application-Ready-Data-Preparation-with-LLMs/

toc: true
toc_sticky: true

date: 2026-01-27 00:00:00+0900+0900
last_modified_at: 2026-01-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.17058)

**저자:** Wei Zhou, Jun Zhou, Haoyu Wang, Zhenghao Li, Qikang He, Shaokun Han, Guoliang Li Fellow, IEEE, Xuanhe Zhou, Yeye He, Chunwei Liu, Zirui Tang, Bin Wang, Shen Tang, Kai Zuo, Yuyu Luo, Zhenzhe Zheng, Conghui He, Jingren Zhou Fellow, IEEE, Fan Wu



## 핵심 연구 목표
본 논문은 LLM(대규모 언어 모델)이 데이터 준비(Data Preparation) 작업에 미치는 변혁적인 영향을 체계적으로 검토하는 것을 목표로 합니다. 특히, 기존의 규칙 기반/모델별 파이프라인에서 **프롬프트 기반, 상황 인식, 에이전트 기반 워크플로우** 로의 패러다임 전환을 분석하고, 데이터 비효율성의 주요 원인인 품질 문제, 통합 장벽, 의미론적 격차를 해결하는 데 LLM의 역할과 기회를 제시합니다.

## 핵심 방법론
이 서베이는 LLM 기반 데이터 준비를 **데이터 클리닝** , **데이터 통합** , **데이터 보강** 의 세 가지 주요 작업으로 분류합니다. 각 작업에 대해 **프롬프트 기반(예: Chain-of-Thought, 코드 합성)** , **검색 증강(Retrieval-Augmented Generation, RAG)** , **모델 최적화 적응(예: 미세 조정)** , **에이전트 기반 워크플로우** 등 대표적인 기술과 특성을 분석합니다. 이를 통해 다양한 모달리티와 도메인에서 LLM이 어떻게 복잡한 데이터 문제를 해결하는지 보여줍니다.

## 주요 결과
LLM은 데이터 준비에서 **명령 기반 자동화, 의미론적 추론, 교차 모달리티 일반화, 지식 증강 처리** 를 가능하게 하여 전통적인 방법의 한계를 극복합니다. 구체적인 정량적 지표는 각 연구의 결과 요약에 의존하지만, LLM은 **수동 개입을 줄이고** 이질적인 데이터 형식 간의 **일반화 성능을 크게 향상** 시킵니다. 그러나 **높은 추론 비용, 환각(hallucinations) 문제, 확장성 제약, 복잡한 에이전트 오케스트레이션** 등의 한계점도 명확하게 존재합니다.

## AI 실무자를 위한 시사점
AI/ML 실무자는 LLM을 활용하여 **데이터 준비 프로세스를 자동화하고 효율성을 극대화** 할 수 있습니다. 특히, **자연어 프롬프트를 통한 데이터 표준화, 오류 처리, 통합, 보강** 은 복잡한 데이터 작업을 간소화할 수 있는 강력한 도구입니다. 하지만 **LLM의 환각 가능성** 과 **높은 연산 비용** 을 고려하여, **하이브리드 LLM-ML 시스템** 이나 **에이전트 기반의 검증 및 제어 메커니즘** 을 도입하여 신뢰성과 확장성을 확보하는 것이 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.