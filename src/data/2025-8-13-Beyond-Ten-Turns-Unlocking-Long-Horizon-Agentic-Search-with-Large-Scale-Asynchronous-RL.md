---
title: "[논문리뷰] Beyond Ten Turns: Unlocking Long-Horizon Agentic Search with Large-Scale
  Asynchronous RL"
excerpt: "Chuyi He이 arXiv에 게시한 'Beyond Ten Turns: Unlocking Long-Horizon Agentic Search with Large-Scale
  Asynchronous RL' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Agents
  - Agentic Search
  - Asynchronous RL
  - Long-Horizon Planning
  - Tool Use
  - Data Synthesis

permalink: /ai/review/2025-8-13-Beyond-Ten-Turns-Unlocking-Long-Horizon-Agentic-Search-with-Large-Scale-Asynchronous-RL/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.07976)

**저자:** Jiaxuan Gao, Wei Fu, Minyang Xie, Shusheng Xu, Chuyi He, Zhiyu Mei, Banghua Zhu, Yi Wu



## 핵심 연구 목표
본 논문은 기존 오픈소스 LLM 기반 에이전트의 '검색 인텔리전스'가 전문가 수준에 미치지 못하며, 모호한 질의 해결, 정확한 검색 생성, 결과 분석 및 심층 탐색 능력에서 한계를 보이는 문제를 해결하고자 합니다. 특히, 기존 온라인 RL 방식의 짧은 턴 제한으로 인한 복잡한 전략 학습의 어려움, 확장성, 효율성, 데이터 품질 문제를 극복하여 장기적인 에이전트 검색 능력을 개방형으로 제공하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 ASearcher는 **완전 비동기 RL 훈련 시스템** 을 도입하여 트라젝토리 실행과 모델 업데이트를 분리함으로써 **128턴/트라젝토리** 와 같은 긴 턴 제한에서도 높은 훈련 효율성을 유지합니다. 또한, **LLM 기반 QA 합성 에이전트** 를 통해 다중 턴 도구 사용이 필요한 도전적이고 불확실하며 근거가 있는 고품질 질의응답 쌍을 자율적으로 생성하여 대규모 훈련 데이터셋을 구축합니다. 에이전트는 **검색 엔진** 과 **웹 브라우저** 두 가지 기본 도구를 활용하며, 복잡한 웹 콘텐츠에 대한 추론 및 요약 능력을 **종단 간 RL 훈련** 을 통해 최적화합니다.

## 주요 결과
ASearcher-Web-QwQ는 RL 훈련을 통해 xBench와 GAIA에서 각각 **46.7%** 및 **20.8%** 의 **Avg@4 점수 향상** 을 달성하며 상당한 성능 개선을 입증했습니다. 특히, 훈련 과정에서 도구 호출이 **40턴** 을 초과하고 생성 토큰이 **150k** 를 넘는 등 극단적인 장기 검색 능력을 보여주었습니다. 결과적으로 ASearcher-Web-QwQ는 xBench에서 **42.1** , GAIA에서 **52.8** 의 Avg@4 점수를 기록하여 기존 오픈소스 **32B** 규모 에이전트들을 능가하는 최첨단 성능을 달성했습니다.

## AI 실무자를 위한 시사점
본 연구는 **완전 비동기 RL 훈련** 이 복잡하고 장기적인 에이전트 작업에 효과적임을 입증하여, 실제 웹 검색 및 복잡한 문제 해결을 위한 LLM 에이전트 개발에 중요한 방향을 제시합니다. **QA 합성 에이전트** 는 고품질의 훈련 데이터를 확장성 있게 생성하는 실용적인 방법을 제공하여, 수동 어노테이션에 대한 의존도를 줄이고 에이전트 능력의 지속적인 개선을 가능하게 합니다. 또한, 단순한 에이전트 설계와 외부 LLM 없이도 최첨단 성능을 달성한 것은 효과적인 **RL 훈련** 과 **고품질 데이터** 가 에이전트 AI 개발에 있어 핵심적인 요소임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.