---
title: "[논문리뷰] Search More, Think Less: Rethinking Long-Horizon Agentic Search for Efficiency and Generalization"
excerpt: "[arXiv]에 게시된 'Search More, Think Less: Rethinking Long-Horizon Agentic Search for Efficiency and Generalization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic AI
  - Long-Horizon Search
  - Parallel Execution
  - Data Synthesis
  - Reinforcement Learning
  - Generalization
  - Efficiency
  - LLM Agent

permalink: /ai/review/2026-02-27-Search-More-Think-Less-Rethinking-Long-Horizon-Agentic-Search-for-Efficiency-and-Generalization/

toc: true
toc_sticky: true

date: 2026-02-27 00:00:00+0900+0900
last_modified_at: 2026-02-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22675)

**저자:** OPPO AI Agent Team



## 핵심 연구 목표
이 논문은 기존 딥 리서치 에이전트의 높은 추론 비용과 지연 시간, 그리고 이질적인 연구 환경 전반에 걸친 낮은 일반화 성능이라는 두 가지 주요 문제를 해결하는 것을 목표로 합니다. 특히, 장기적인(long-horizon) 에이전트 검색 태스크에서 효율성과 일반화 능력을 동시에 향상시키고자 합니다.

## 핵심 방법론
제안된 **Search More, Think Less (SMTL)** 프레임워크는 순차적 추론을 **병렬 증거 획득(parallel evidence acquisition)** 및 **동시 도구 실행(concurrent tool execution)** 으로 대체합니다. 이를 위해, **계획 중심의 맥락 관리(plan-driven context management)** 를 사용하여 제한된 컨텍스트 예산 내에서 효율적인 장기 추론을 가능하게 합니다. 또한, 결정론적 질문 응답과 개방형 연구 시나리오를 포괄하는 **통합 데이터 합성 파이프라인(unified data synthesis pipeline)** 을 도입하여 일반화를 지원하며, **지도 미세 조정(supervised fine-tuning)** 과 **강화 학습(reinforcement learning)** 을 통해 종단 간 에이전트를 훈련합니다.

## 주요 결과
SMTL은 **BrowseComp** 에서 **48.6%** , **GAIA** 에서 **75.7%** , **Xbench** 에서 **82.0%** , 그리고 **DeepResearch Bench** 에서 **45.9%** 의 강력한 성능을 달성하며 여러 벤치마크에서 SOTA 또는 경쟁력 있는 성능을 보였습니다. 특히, **100번의 최대 상호작용 단계(interaction steps)** 를 가진 SMTL은 **Mirothinker-v1.0** 대비 **BrowseComp** 에서 평균 추론 단계를 **70.7%** 감소시키면서 정확도를 향상시켰습니다.

## AI 실무자를 위한 시사점
이 연구는 에이전트 기반 AI 시스템 설계에 있어 **추론 깊이 확장** 보다 **병렬 증거 수집 및 데이터 다양성 확장** 이 더 효율적임을 시사합니다. AI/ML 엔지니어는 고비용의 순차적 추론 대신 **병렬 처리 및 도구 활용의 폭** 을 넓히는 방식으로 장기적인 에이전트의 효율성과 일반화 능력을 개선할 수 있을 것입니다. 이는 특히 실시간 상호작용과 넓은 범위의 지식 탐색이 필요한 애플리케이션에 유용할 것으로 예상됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.