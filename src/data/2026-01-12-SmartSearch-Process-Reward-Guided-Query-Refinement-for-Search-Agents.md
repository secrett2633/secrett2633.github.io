---
title: "[논문리뷰] SmartSearch: Process Reward-Guided Query Refinement for Search Agents"
excerpt: "Guanting Dong이 arXiv에 게시한 'SmartSearch: Process Reward-Guided Query Refinement for Search Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Search Agent
  - Information Retrieval
  - Large Language Models
  - Process Reward
  - Query Refinement
  - Reinforcement Learning
  - Curriculum Learning

permalink: /ai/review/2026-01-12-SmartSearch-Process-Reward-Guided-Query-Refinement-for-Search-Agents/

toc: true
toc_sticky: true

date: 2026-01-12 00:00:00+0900+0900
last_modified_at: 2026-01-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.04888)

**저자:** Tongyu Wen, Guanting Dong, Zhicheng Dou



## 핵심 연구 목표
대규모 언어 모델(LLM) 기반 검색 에이전트의 중간 검색 쿼리 품질이 낮아 예기치 않은 검색 결과와 전체 성능 저하로 이어지는 문제를 해결하는 것입니다. 기존 연구가 추론 패러다임 최적화에 집중하고 쿼리 품질을 간과하는 한계를 극복하여, 프로세스 보상과 쿼리 개선을 통해 에이전트의 정보 탐색 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **프로세스 보상** 과 **쿼리 개선** 이라는 두 가지 핵심 메커니즘을 제안합니다. **프로세스 보상** 은 **Dual-Level Credit Assessment** 를 통해 각 중간 쿼리의 품질에 대한 미세한 감독을 제공하며, 이는 규칙 기반의 쿼리 참신성 평가와 모델 기반의 유용성 평가로 구성됩니다. **쿼리 개선** 은 이러한 평가를 바탕으로 품질이 낮은 쿼리를 선택적으로 개선하고, 개선된 쿼리부터 후속 검색 단계를 재생성합니다. 이러한 메커니즘을 점진적으로 내재화하기 위해 **Query Quality Screened Imitation Learning (SFT)** , **Query Generation Alignment (DPO)** , **Query Aware Policy Optimization (RL/GRPO)** 의 3단계 커리큘럼 학습 프레임워크를 설계했습니다.

## 주요 결과
SmartSearch는 지식 집약적 태스크 및 웹 탐색 태스크 전반에서 기존의 모든 베이스라인을 지속적으로 능가하는 성능을 보였습니다. 4가지 지식 집약적 벤치마크에서 평균 **EM 37.5%** , 평균 **F1 47.2%** 를 달성하여 기존 최고 프로세스 보상 기반 RL 방법인 StepSearch 대비 각각 **25%** 및 **19%** 향상된 결과를 기록했습니다(StepSearch EM 30.1%, F1 39.5%). 웹 탐색 태스크에서는 평균 **F1 23.9%** 를 달성하며 StepSearch 대비 약 **24%** 향상되었습니다. 추가적인 정량 분석을 통해 검색 효율성과 쿼리 품질 모두에서 상당한 개선을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 기반 검색 에이전트의 성능 향상을 위해 중간 검색 쿼리 품질의 중요성을 강조하고 이를 효과적으로 개선하는 실용적인 프레임워크를 제공합니다. 제안된 **Dual-Level Credit Assessment** 및 **Query Refinement** 메커니즘은 다른 LLM 기반 도구 사용 또는 에이전트 시스템의 쿼리 생성 및 개선 로직에 적용될 수 있습니다. 또한, **3단계 커리큘럼 학습 프레임워크** 는 모방 학습부터 일반화까지의 구조화된 에이전트 훈련 방식을 제시하여, 견고한 AI 시스템 개발에 유용하게 활용될 수 있으며, 실제 웹 환경에서도 강력한 일반화 성능을 보여 실용적인 적용 가능성이 높습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.