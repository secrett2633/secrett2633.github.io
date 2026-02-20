---
title: "[논문리뷰] Learning Query-Aware Budget-Tier Routing for Runtime Agent Memory"
excerpt: "arXiv에 게시된 'Learning Query-Aware Budget-Tier Routing for Runtime Agent Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Runtime Memory
  - Budget-Tier Routing
  - Reinforcement Learning
  - Performance-Cost Trade-off
  - Modular Memory Pipeline
  - Query-Aware Memory
  - Resource Management

permalink: /ai/review/2026-02-10-Learning-Query-Aware-Budget-Tier-Routing-for-Runtime-Agent-Memory/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.06025)

**저자:** Haozhen Zhang, Haodong Yue, Tao Feng, Quanyu Long, Jianzhu Bao, Bowen Jin, Weizhi Zhang, Xiao Li, Jiaxuan You, Chengwei Qin, Wenya Wang



## 핵심 연구 목표
이 논문은 LLM 에이전트의 기존 오프라인, 쿼리-불가지론적 메모리 구성 방식이 비효율적이며 쿼리-중요 정보를 놓칠 수 있다는 문제를 제기합니다. 핵심 목표는 런타임 메모리 추출을 위해 **명시적이고 제어 가능한 성능-비용 트레이드오프** 를 가능하게 하는 프레임워크를 개발하는 것입니다. 특히, 모듈식 메모리 파이프라인에서 예산을 어떻게 적용하고 효과적으로 구현할지 탐구합니다.

## 핵심 방법론
제안하는 **BudgetMem** 프레임워크는 메모리 처리를 필터링, 병렬 추출, 요약 등 여러 모듈로 구성된 파이프라인으로 구조화합니다. 각 모듈은 **LOW/MID/HIGH 세 가지 예산 티어** 를 제공하며, **경량 라우터** 는 쿼리-인지 신경 정책으로 구현되어 강화 학습을 통해 모듈별 예산 티어 선택을 학습합니다. 라우터는 작업 성능과 메모리 구성 비용 간의 균형을 맞추는 비용-인지 목표로 최적화되며, 이를 위해 **슬라이딩 윈도우 정규화** 와 **분산 기반 보상 스케일 정렬** 기법을 사용합니다. 또한, **구현(method complexity), 추론(inference behavior), 용량(module model size)** 의 세 가지 티어링 전략이 연구됩니다.

## 주요 결과
**BudgetMem** 은 **LoCoMo, LongMemEval, HotpotQA** 벤치마크에서 강력한 베이스라인을 뛰어넘는 성능을 입증했습니다. 성능 우선 설정(고예산)에서 특히 우수했으며, **LongMemEval** 에서 **LLaMA-3.3-70B** 백본 사용 시, **BudgetMem-CAP** 는 **Judge Score 60.50** 을 달성하여 최강 베이스라인 LightMem(48.51) 대비 큰 폭으로 개선되었습니다. 더 타이트한 예산에서도 우수한 정확도-비용 프론티어를 제공하며, **HotpotQA** 에서 **Qwen3-Next-80B-A3B** 백본 사용 시, **BudgetMem-CAP** 는 **72.08의 Judge Score** 를 **0.22** 의 낮은 비용으로 달성했습니다. 분석 결과, **구현** 및 **용량 티어링** 은 넓은 비용 범위에서 성능 확장에 유리하며, **추론 티어링** 은 제한된 비용 내에서 미세한 품질 조정에 효과적임이 밝혀졌습니다.

## AI 실무자를 위한 시사점
**BudgetMem** 은 LLM 에이전트의 메모리 시스템에 **쿼리-인지 런타임 비용 제어** 를 도입하여 실제 배포 환경에서의 유용성을 크게 높입니다. AI/ML 엔지니어는 이 프레임워크를 통해 예측 가능한 지연 시간과 비용으로 메모리 컴퓨팅 리소스를 효율적으로 관리할 수 있으며, 이는 **리소스 제약이 있는 환경** 에서 LLM 에이전트의 활용도를 확장하는 데 기여합니다. 또한, **다양한 티어링 전략** 에 대한 심층 분석은 개발자들이 특정 애플리케이션의 예산과 성능 요구사항에 맞춰 **최적의 메모리 아키텍처** 를 설계하는 데 중요한 실용적 가이드를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.