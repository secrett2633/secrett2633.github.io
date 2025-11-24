---
title: "[논문리뷰] DynaAct: Large Language Model Reasoning with Dynamic Action Spaces"
excerpt: "Lingpeng Kong이 [arXiv]에 게시한 'DynaAct: Large Language Model Reasoning with Dynamic Action Spaces' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Sequential Reasoning
  - Action Space Construction
  - Submodular Optimization
  - Markov Decision Process
  - Monte Carlo Tree Search
  - Utility-Diversity Trade-off

permalink: /ai/review/2025-11-12-DynaAct-Large-Language-Model-Reasoning-with-Dynamic-Action-Spaces/

toc: true
toc_sticky: true

date: 2025-11-12 00:00:00+0900+0900
last_modified_at: 2025-11-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.08043)

**저자:** Xueliang Zhao, Wei Wu, Jian Guan, Qintong Li, Lingpeng Kong



## 핵심 연구 목표
본 논문의 핵심 연구 목표는 LLM(Large Language Model) 기반의 순차적 추론 과정에서 **확장성과 간결성을 동시에 갖춘 최적의 액션 공간**을 자동으로 구성하는 것입니다. 기존 LLM 추론 방식이 수동으로 정의된 액션 공간의 확장성 부족이나 비정형화된 액션 공간의 탐색 비용 문제에 직면하고 있어, 이를 해결하기 위한 원칙적인 방법론을 제안하고자 합니다.

## 핵심 방법론
`DYNAACT`는 세 단계로 구성됩니다. 첫째, **LLM**을 활용하여 다양한 문제 코퍼스에서 일반적인 추론 패턴(스케치)을 추출하여 **프록시 액션 공간 A**를 구축합니다. 둘째, 현재 상태 `st`에 대한 후보 액션 집합 `At`의 **유용성(utility)**과 **다양성(diversity)**을 통합 평가하는 **부분모듈 함수** `F(At; st) = α futil(At; st) + β fdiv(At)`를 정의합니다. 유용성 항 `futil`은 **Q-learning objective**를 통해 학습된 임베딩 함수 `e(·)`로 액션의 기대 보상을 근사하며, 다양성 항 `fdiv`는 액션 간 상이성을 측정합니다. 셋째, 이 부분모듈 함수를 **탐욕(greedy) 알고리즘**으로 최대화하여 최적의 액션 집합 `At`를 선택하고, **Monte Carlo Tree Search (MCTS)**를 통해 액션을 최종 결정하며 추론을 진행합니다.

## 주요 결과
`DYNAACT`는 **MMLU, GPQA, ARC-C, GSM8K, MATH-500** 등 6가지 벤치마크에서 기준선 대비 상당한 성능 향상을 입증했습니다. 특히, 고수준 추론이 필요한 **MATH-500** 데이터셋에서 최신 강력 모델인 **rStar**보다 **6.8%p**의 높은 절대 성능 향상(**61.00%**)을 달성했습니다. 또한, 동적 액션 공간 구성이 추론 효율성을 유지하면서 **추가적인 지연 시간**을 크게 발생시키지 않음을 보여주었습니다.

## AI 실무자를 위한 시사점
`DYNAACT`는 LLM 기반 애플리케이션에서 **복잡한 문제 해결 능력**을 향상시킬 수 있는 실용적인 방법론을 제공합니다. AI 엔지니어는 수동으로 액션 공간을 설계하는 대신, **데이터 기반의 동적 액션 공간 구성**을 통해 LLM의 탐색 효율성과 추론 정확도를 높일 수 있습니다. 특히, **부분모듈 최적화**를 활용하여 유용성과 다양성 간의 균형을 효과적으로 관리함으로써, **지연 시간 증가 없이** 복잡한 시나리오에서의 LLM 성능을 최적화할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.