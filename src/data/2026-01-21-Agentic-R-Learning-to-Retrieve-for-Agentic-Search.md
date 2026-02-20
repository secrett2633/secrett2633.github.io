---
title: "[논문리뷰] Agentic-R: Learning to Retrieve for Agentic Search"
excerpt: "Daiting Shi이 arXiv에 게시한 'Agentic-R: Learning to Retrieve for Agentic Search' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Search
  - Retrieval-Augmented Generation
  - Retriever Training
  - Passage Utility Modeling
  - Iterative Optimization
  - Reinforcement Learning
  - Large Language Models

permalink: /ai/review/2026-01-21-Agentic-R-Learning-to-Retrieve-for-Agentic-Search/

toc: true
toc_sticky: true

date: 2026-01-21 00:00:00+0900+0900
last_modified_at: 2026-01-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.11888)

**저자:** Wenhan Liu, Xinyu Ma, Yutao Zhu, Yuchen Li, Daiting Shi, Dawei Yin, Zhicheng Dou



## 핵심 연구 목표
본 논문은 멀티턴 에이전트 검색(agentic search)의 맥락에서 리트리버(retriever) 훈련의 한계를 극복하는 것을 목표로 합니다. 기존 RAG(Retrieval-Augmented Generation) 시스템의 리트리버 훈련 방식이 단일 턴에 치중되어 있고, 에이전트가 생성하는 중간 쿼리에 대한 골드 답변 부재 및 로컬 관련성 이상의 패시지 유틸리티 모델링의 어려움이라는 문제를 해결하고자 합니다.

## 핵심 방법론
논문은 **로컬 관련성** 과 **글로벌 답변 정확성** 을 동시에 고려하는 새로운 **패시지 유틸리티 모델링 전략** 을 제안합니다. **LLM 기반 listwise 스코어링 접근 방식** ( **Qwen2.5-72B-Instruct** )으로 로컬 관련성을 평가하고, 에이전트가 특정 패시지를 사용하여 생성한 최종 답변의 **정확 일치(EM) 점수** 로 글로벌 답변 정확성을 측정합니다. 이 유틸리티를 기반으로 긍정 및 부정 패시지를 선별하며, 원본 질문 `Q`와 현재 쿼리 `qi`를 입력으로 사용하는 **대조 학습(contrastive learning)** 을 통해 리트리버( **Agentic-R** )를 훈련합니다. 또한, 검색 에이전트( **PPO RL 알고리즘** 사용)와 리트리버를 상호 개선하는 **반복적 에이전트-리트리버 최적화 프레임워크** 를 **2회 반복** 으로 수행합니다.

## 주요 결과
**Agentic-R** 은 7가지 QA 벤치마크에서 모든 검색 에이전트(훈련된 에이전트, **R1-Searcher** , **SimpleDeepSearcher** )에 걸쳐 **최고 평균 EM 점수** 를 일관되게 달성했습니다. 자체 훈련 에이전트에서 두 번째로 좋은 기준선보다 약 **3.2점** , 다른 에이전트에서는 약 **2점** 더 우수한 성능을 보였습니다. 특히 멀티홉 QA 데이터셋에서 RAG-특정 리트리버인 **REPLUG** 대비 약 **3점** 더 높은 성능 향상을 보였습니다. 또한, **Agentic-R** 은 에이전트가 더 적은 검색 턴으로 질문을 해결하도록 하여 **HotpotQA** 에서 약 **10%** , **TriviaQA** 에서 약 **15%** 의 평균 검색 턴 감소를 가져왔습니다.

## AI 실무자를 위한 시사점
**Agentic-R** 은 멀티턴 에이전트 검색 시스템에서 리트리버의 성능을 극대화하는 새로운 패러다임을 제시합니다. **LLM의 추론 능력** 과 **최종 답변의 정확성** 을 통합한 유틸리티 모델링은 복잡한 AI 에이전트의 효율적인 정보 탐색 능력을 크게 향상시킬 수 있습니다. **반복적 최적화 프레임워크** 는 에이전트와 리트리버가 상호 작용하며 지속적으로 개선되는 과정을 통해, 실제 AI 애플리케이션의 성능과 사용자 경험을 개선하는 데 기여할 수 있습니다. **적은 검색 턴** 으로도 높은 성능을 달성하는 능력은 자원 효율성과 실시간 응답이 중요한 AI 시스템 설계에 있어 중요한 실용적 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.