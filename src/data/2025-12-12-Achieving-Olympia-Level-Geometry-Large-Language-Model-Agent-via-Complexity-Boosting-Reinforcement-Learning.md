---
title: "[논문리뷰] Achieving Olympia-Level Geometry Large Language Model Agent via Complexity Boosting Reinforcement Learning"
excerpt: "arXiv에 게시된 'Achieving Olympia-Level Geometry Large Language Model Agent via Complexity Boosting Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Geometry Problem Solving
  - Reinforcement Learning
  - Curriculum Learning
  - Auxiliary Construction
  - Symbolic Reasoning
  - IMO

permalink: /ai/review/2025-12-12-Achieving-Olympia-Level-Geometry-Large-Language-Model-Agent-via-Complexity-Boosting-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-12-12 00:00:00+0900+0900
last_modified_at: 2025-12-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.10534)

**저자:** Haiteng Zhao, Junhao Shen, Yiming Zhang, Songyang Gao, Kuikun Liu, Tianyou Ma, Fan Zheng, Dahua Lin, Wenwei Zhang, Kai Chen



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM) 에이전트가 **국제 수학 올림피아드(IMO) 수준의 기하학 문제** 를 해결하는 데 있어 기존 전문가 시스템의 한계를 극복하는 것을 목표로 합니다. 특히, 보조 구성(auxiliary construction)에 대한 **약한 휴리스틱(weak heuristics)** 문제를 해결하고, 효율성과 일반화 능력을 향상시키는 LLM 에이전트 개발에 중점을 둡니다.

## 핵심 방법론
본 연구는 **InternGeometry** 라는 LLM 에이전트를 제안하며, 이는 **InternGeometry-DDAR** 라는 상징적 추론 엔진과 상호작용합니다. 에이전트는 자연어 추론( **Think** ), 도메인 특화 언어 기반의 액션( **Action** ) 제안, 엔진 피드백( **Feedback** ) 반영 과정을 반복하며, **동적 메모리(dynamic memory)** 메커니즘을 통해 장기적인 탐색 이력을 관리합니다. 학습 가속화를 위해 **Complexity-Boosting Reinforcement Learning (CBRL)** 프레임워크를 도입, 문제 복잡도(필요한 증명 단계)를 점진적으로 높여가며 **합성 데이터** 를 생성하고 RL 훈련을 진행합니다.

## 주요 결과
**InternGeometry** 는 **2000년부터 2024년까지의 IMO 기하학 문제 50개 중 44개를 성공적으로 해결** 하여, 기존 최고 성능 모델인 **AlphaGeometry2 (42개)** 와 **SeedGeometry (43개)** 를 능가했습니다. 특히, 이 모델은 **13K개의 훈련 예제** 만을 사용했으며, 이는 **AlphaGeometry2가 사용한 데이터의 0.004%** 에 불과한 양입니다. 또한, 인간의 해법에 없는 새로운 보조 구성을 제안하는 창의성도 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 에이전트가 복잡한 수학적 추론, 특히 기하학 분야에서 **데이터 효율성이 높은 성능** 을 달성할 수 있음을 보여줍니다. **장기적인 에이전트-도구 상호작용** 과 **커리큘럼 학습 기반의 데이터 합성** 은 난이도 높은 문제 해결 능력을 효과적으로 구축하는 데 중요한 전략임을 시사합니다. AI/ML 엔지니어는 LLM 기반 에이전트 설계 시 **동적 메모리 관리** 와 **점진적 복잡도 증가** 기법을 활용하여 전문가 수준의 문제 해결 능력을 개발할 수 있을 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.