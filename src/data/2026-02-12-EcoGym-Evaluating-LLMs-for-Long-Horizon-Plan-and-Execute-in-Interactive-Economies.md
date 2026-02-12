---
title: "[논문리뷰] EcoGym: Evaluating LLMs for Long-Horizon Plan-and-Execute in Interactive Economies"
excerpt: "Yishuo Yuan이 [arXiv]에 게시한 'EcoGym: Evaluating LLMs for Long-Horizon Plan-and-Execute in Interactive Economies' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Evaluation
  - Long-Horizon Planning
  - Interactive Economies
  - Benchmark
  - Agentic AI
  - Economic Simulation
  - Plan-and-Execute

permalink: /ai/review/2026-02-12-EcoGym-Evaluating-LLMs-for-Long-Horizon-Plan-and-Execute-in-Interactive-Economies/

toc: true
toc_sticky: true

date: 2026-02-12 00:00:00+0900+0900
last_modified_at: 2026-02-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.09514)

**저자:** Yishuo Yuan, Kangqi Song, Shengze Xu, Jinxiang Xia, Xavier Hu



## 핵심 연구 목표
이 논문은 LLM 기반 에이전트의 장기적인 계획 및 실행 능력을 평가하는 기존 프레임워크가 단기적이고, 도메인에 특화되어 있으며, 현실적인 경제 역학에 충분히 기반하지 못하는 문제를 해결하는 것을 목표로 합니다. `EcoGym`이라는 새로운 벤치마크를 통해 지속적인 의사결정과 상호작용 경제 환경에서의 LLM 성능을 포괄적으로 평가하고자 합니다.

## 핵심 방법론
연구진은 `Vending`, `Freelance`, `Operation`의 **세 가지 경제 환경** 을 통합된 의사결정 프로세스와 표준화된 인터페이스로 구축하여 `EcoGym`을 개발했습니다. 이 벤치마크는 **사실상 무한한 시간 범위 (1000+ 스텝)** , **예산이 책정된 행동 공간** , 그리고 `순자산`, `수입`, `DAU`와 같은 **비즈니스 관련 성과 지표** 를 통해 평가됩니다. 또한, 에이전트가 숨겨진 시스템 역학을 능동적으로 발견하도록 `잠재적 메커니즘`을 포함했습니다.

## 주요 결과
실험 결과, **현존하는 어떤 단일 LLM도 세 가지 시나리오 전반에서 일관되게 우수한 성능을 보이지 못했습니다.** 이는 장기 경제 의사결정의 복잡성을 보여줍니다. 특히, **Claude-Sonnet-4.5** 는 Operation 환경에서 **1572.49 DAU** 를 달성하여 인간 전문가의 평균 **1,404 DAU** 를 능가하는 등 일부 시나리오에서 초인적인 성능을 보였으나, 다른 모델들은 `고수준 전략`이나 `효율적인 액션 실행`에서 상당한 비최적성을 드러냈습니다.

## AI 실무자를 위한 시사점
`EcoGym`은 LLM 에이전트가 복잡한 경제 환경에서 장기적인 전략적 일관성과 견고성을 유지하는 데 여전히 어려움을 겪고 있음을 보여줍니다. 이는 **메모리 아키텍처** 와 **사고 과정 (Thinking with Action)** 개선의 필요성을 시사하며, AI 에이전트 설계 시 단기적인 성능뿐만 아니라 지속 가능한 가치 창출에 집중해야 함을 강조합니다. 공개된 `EcoGym`은 앞으로 LLM 기반 에이전트 연구와 개발을 위한 중요한 기반이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.