---
title: "[논문리뷰] Explore to Evolve: Scaling Evolved Aggregation Logic via Proactive
  Online Exploration for Deep Research Agents"
excerpt: "Jianshu Zhang이 [arXiv]에 게시한 'Explore to Evolve: Scaling Evolved Aggregation Logic via Proactive
  Online Exploration for Deep Research Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Web Agents
  - Information Aggregation
  - Data Synthesis
  - Online Exploration
  - Foundation Models
  - Multi-hop QA
  - Deep Research

permalink: /ai/review/2025-10-20-Explore_to_Evolve_Scaling_Evolved_Aggregation_Logic_via_Proactive_Online_Exploration_for_Deep_Research_Agents/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14438)

**저자:** Jianshu Zhang, Jun-Yu Ma, Ce Zhang, Rui Wang, tqfang229



## 핵심 연구 목표
기존 웹 에이전트 시스템들이 정보 탐색 기능에만 중점을 두고 정보 집계 능력을 간과하여 심층적인 연구 결과 생성을 제한하는 문제를 해결하고자 합니다. 복잡한 정보 집계 능력을 갖춘 웹 에이전트 훈련을 위한 **검증 가능한 대규모 훈련 데이터셋**을 **자동으로 구축**하고, 이를 통해 에이전트의 **정보 집계 역량**을 강화하는 것이 주된 목표입니다.

## 핵심 방법론
웹 에이전트 훈련 데이터를 자동으로 생성하기 위해 **Explore to Evolve** 패러다임을 제안합니다. 이는 **Proactive Online Web Exploring**을 통해 실제 웹에서 관련 정보를 수집하고, 수집된 증거를 바탕으로 **Automatic Aggregation Logic Synthesis**를 통해 12가지 고수준 논리 유형에서 연산들을 선택, 조합, 정제하여 검증 가능한 QA 쌍을 합성하는 과정으로 이루어집니다. 이 방식으로 **WebAggregatorQA** 데이터셋을 구축했으며, **SmolAgents** 프레임워크와 **Qwen3 시리즈**를 기반으로 **WebAggregator** 모델을 훈련했습니다.

## 주요 결과
훈련된 **WebAggregator-8B 모델**은 **GAIA-text**에서 **GPT-4.1**과 동등한 성능을 보였으며, **32B 모델**은 **GAIA-text**에서 **GPT-4.1보다 10% 이상** 뛰어난 성능을 달성했습니다. 특히, 새로 구축된 **WebAggregatorQA 테스트 세트**에서는 **Claude-3.7-sonnet**이 **28.3%**, **GPT-4.1**이 **25.8%**를 기록하며, 해당 벤치마크가 현재 웹 에이전트의 정보 집계 능력에 상당한 도전 과제를 제시함을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 웹 에이전트가 단순 정보 탐색을 넘어 **복잡한 정보 집계 능력**을 갖추어야 함을 강조합니다. **자동으로 생성된 고품질 WebAggregatorQA 데이터셋**은 실제 웹 환경에서의 다단계 추론 및 집계 작업 훈련에 유용하며, **소형 파운데이션 모델(WebAggregator)**이 상업용 대규모 모델과 경쟁하는 성능을 보여줌으로써 **리소스 효율적인 웹 에이전트 개발**의 가능성을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.