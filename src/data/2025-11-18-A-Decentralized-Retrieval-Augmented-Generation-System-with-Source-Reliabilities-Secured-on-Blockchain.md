---
title: "[논문리뷰] A Decentralized Retrieval Augmented Generation System with Source Reliabilities Secured on Blockchain"
excerpt: "Meng Jiang이 [arXiv]에 게시한 'A Decentralized Retrieval Augmented Generation System with Source Reliabilities Secured on Blockchain' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Decentralized RAG
  - Blockchain
  - Smart Contracts
  - Source Reliability
  - Large Language Models
  - Retrieval Augmented Generation
  - Trustworthy AI

permalink: /ai/review/2025-11-18-A-Decentralized-Retrieval-Augmented-Generation-System-with-Source-Reliabilities-Secured-on-Blockchain/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07577)

**저자:** Yining Lu, Wenyi Tang, Max Johnson, Taeho Jung, Meng Jiang



## 핵심 연구 목표
기존 **중앙 집중식 RAG(Retrieval Augmented Generation)** 시스템의 높은 데이터 관리 비용과 개인 정보 보호 문제를 해결하고자 합니다. 특히, 분산화된 환경에서 발생하는 **다양한 신뢰도 수준의 데이터 소스** 문제를 극복하고, LLM이 데이터 소유자로부터 직접 정보를 활용할 수 있는 **신뢰할 수 있는 분산형 RAG 시스템** 을 구축하는 것이 주된 목표입니다.

## 핵심 방법론
제안하는 **dRAG(decentralized RAG)** 시스템은 기여하는 응답의 품질을 기반으로 각 소스의 신뢰성을 동적으로 평가하는 **독창적인 신뢰성 점수 메커니즘** 을 도입합니다. 이 점수 부여 과정은 **블록체인 기반 스마트 계약** 을 통해 투명하고 조작 불가능하게 관리됩니다. 실험은 **두 가지 Llama 모델(3B 및 8B)** 을 사용하여 신뢰할 수 없는 데이터 환경을 시뮬레이션하고, **MC-Shapley** 또는 **RORA** 방법론으로 문장 중요도를 평가하여 신뢰성 점수를 업데이트합니다.

## 주요 결과
dRAG 시스템은 실제와 유사한 신뢰할 수 없는 데이터 환경에서 **중앙 집중식 RAG 시스템 대비 +10.7%의 성능 향상** 을 달성했습니다. 이상적으로 신뢰할 수 있는 데이터 환경의 중앙 집중식 시스템 성능에 **근접** 하며 (일부 시뮬레이션에서는 초과), **배치 업데이트** 를 통해 약 **56%의 한계 비용 절감 효과** 를 입증했습니다. 이는 시스템이 시간이 지남에 따라 가장 신뢰할 수 있는 소스를 효과적으로 식별하고 우선순위를 부여함을 보여줍니다.

## AI 실무자를 위한 시사점
dRAG는 **중앙 집중식 데이터 관리의 한계** 를 해결하면서 **LLM의 정보 활용 능력** 을 확장할 수 있는 강력한 해결책을 제시합니다. **블록체인과 스마트 계약** 을 통해 데이터 소스의 신뢰성을 투명하게 평가하고 관리하는 접근 방식은 **RAG 시스템의 신뢰성과 견고성** 을 크게 향상시킬 수 있습니다. 특히 **대규모 분산형 데이터 환경** 에서 **AI 시스템의 성능과 비용 효율성** 을 동시에 개선하는 실용적인 길을 열었습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.