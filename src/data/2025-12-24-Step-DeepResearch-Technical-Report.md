---
title: "[논문리뷰] Step-DeepResearch Technical Report"
excerpt: "arXiv에 게시된 'Step-DeepResearch Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Research Agents
  - LLMs
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Agentic AI
  - Multi-hop Reasoning
  - Benchmarking
  - Cost-effectiveness

permalink: /ai/review/2025-12-24-Step-DeepResearch-Technical-Report/

toc: true
toc_sticky: true

date: 2025-12-24 00:00:00+0900+0900
last_modified_at: 2025-12-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.20491)

**저자:** Agent-Team at StepFun



## 핵심 연구 목표
본 논문은 **Deep Research** —개방형, 장기적, 복잡한 정보 탐색 작업—를 수행할 수 있는 견고한 자율 에이전트 구축의 문제를 다룹니다. 기존 LLM 기반 시스템이 단순 검색이나 파편화된 멀티홉 질의응답에 의존하는 한계를 극복하고, 복잡한 인지 과정을 내재화하는 엔드투엔드 프레임워크를 제안하여 심층 연구 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
**Step-DeepResearch** 는 **320억 개 매개변수 기반 모델** ( **Qwen2.5-32B-Base** )을 사용하여 **미드 트레이닝** , **지도 미세 조정(SFT)** , **강화 학습(RL)** 의 3단계 훈련 파이프라인을 통해 개발되었습니다. 핵심은 계획, 심층 정보 탐색, 반성, 검증 및 보고서 작성을 위한 **원자적 역량 데이터 합성** 이며, 훈련 목표를 "다음 토큰 예측"에서 "다음 **원자적 행동** 결정"으로 전환합니다. 이 시스템은 전문화된 도구 세트를 갖춘 **ReAct 패러다임** 과 맞춤형 **ADR-Bench** 벤치마크를 활용하여 평가됩니다.

## 주요 결과
**Step-DeepResearch** 는 **Research Rubrics 벤치마크** 에서 **61.42%** 의 루브릭 준수율을 달성하여 전체 2위를 기록했으며, **OpenAI DeepResearch** 및 **Kimi-Researcher** 를 포함한 대부분의 복잡한 에이전트 프레임워크를 능가했습니다. 특히, 단일 호출당 비용이 **0.50 RMB 미만** 으로 최상위 상용 시스템보다 **10배 이상 낮은** 탁월한 **비용 효율성** 을 보여주면서도 최첨단 성능을 유지했습니다. **ADR-Bench** 인적 평가에서는 우수한 성능을 입증하며 선도적인 상용 시스템 대비 높은 승률을 기록했습니다.

## AI 실무자를 위한 시사점
이 연구는 **중규모 LLM** 도 전문가 수준의 심층 연구 역량을 달성할 수 있음을 입증하며, 더 큰 모델에 대한 의존성에 도전하고 대규모 배포를 위한 **비용 효율적인 솔루션** 을 제공합니다. 원자적 역량을 강조하는 **다단계 훈련 패러다임** 과 **실세계 RL 상호작용** 은 복잡하고 지식 집약적인 작업을 위한 보다 안정적이고 인간 친화적인 에이전트 시스템을 개발하는 데 강력한 청사진을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.