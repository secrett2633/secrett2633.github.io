---
title: "[논문리뷰] ReCode: Unify Plan and Action for Universal Granularity Control"
excerpt: "Yifan Wu이 [arXiv]에 게시한 'ReCode: Unify Plan and Action for Universal Granularity Control' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Decision Granularity Control
  - Recursive Code Generation
  - Hierarchical Planning
  - Action Unification
  - Program Synthesis
  - Data Efficiency

permalink: /ai/review/2025-10-28-ReCode_Unify_Plan_and_Action_for_Universal_Granularity_Control/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23564)

**저자:** Zhaoyang Yu, Jiayi Zhang, Huixue Su, Yufan Zhao, Yifan Wu, Mingyi Deng, Jinyu Xiang, Yizhang Lin, Lingxiao Tang, Yingchao Li, Yuyu Luo, Bang Liu, Chenglin Wu



## 핵심 연구 목표
현재 LLM 기반 에이전트의 주요 한계점인 **고정된 결정 세분성(granularity)** 문제를 해결하고, 인간처럼 유연하게 다양한 세분성 수준에서 의사결정을 내릴 수 있는 능력을 부여하는 것입니다. 특히, 고수준 계획과 저수준 행동 간의 **경직된 분리**를 극복하여 에이전트의 동적 적응성과 일반화 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **RECODE (Recursive Code Generation)**라는 새로운 패러다임을 제안합니다. 이는 계획과 행동을 **단일 코드 표현**으로 통합하며, 고수준 계획을 추상적인 **플레이스홀더 함수**로 취급하고 이를 실행 가능한 **원시 행동**에 도달할 때까지 재귀적으로 하위 함수로 분해합니다. 이 재귀적 접근 방식은 계획과 행동 간의 경계를 허물고, **계층적이고 다중 세분성 학습 데이터**를 자연스럽게 생성하여 모델이 복잡한 작업을 학습하는 데 기여합니다.

## 주요 결과
**ALFWorld, WebShop, ScienceWorld** 등 다양한 환경에서 실험한 결과, ReCode는 **GPT-4o mini**를 사용하여 평균 점수 **60.8%**를 달성하여 기존 베이스라인 대비 **20.9%** 향상된 성능을 보였습니다. 특히, **ReAct** 대비 **78.9%**, **CodeAct** 대비 **84.4% 더 적은 비용**으로 우수한 성능을 달성했으며, 학습 데이터 측면에서도 ReAct의 **12,833개 데이터 쌍**에 비해 **3,500개 데이터 쌍**만으로 더 나은 결과를 보여 **탁월한 데이터 효율성**을 입증했습니다.

## AI 실무자를 위한 시사점
ReCode는 LLM 기반 에이전트가 복잡한 실제 환경에서 **유연하게 계획하고 행동**할 수 있는 강력한 프레임워크를 제공합니다. **재귀적 코드 생성**과 **단일 코드 표현**을 통해 고수준 전략과 저수준 실행을 통합하는 방식은 에이전트 개발 시 **모듈성과 확장성**을 크게 향상시킬 수 있습니다. 또한, **데이터 효율성**은 대규모 데이터 수집 및 라벨링의 어려움을 겪는 실무 환경에서 매우 중요한 이점으로 작용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.