---
title: "[논문리뷰] UserBench: An Interactive Gym Environment for User-Centric Agents"
excerpt: "Jianguo Zhang이 [arXiv]에 게시한 'UserBench: An Interactive Gym Environment for User-Centric Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - User-Centric AI
  - LLM Evaluation
  - Interactive Agents
  - Gym Environment
  - Preference Elicitation
  - Multi-turn Dialogue
  - Tool Use

permalink: /ai/review/2025-8-12-UserBench-An-Interactive-Gym-Environment-for-User-Centric-Agents/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.22034)

**저자:** Cheng Qian, Zuxin Liu, Akshara Prabhakar, Zhiwei Liu, Jianguo Zhang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM) 기반 에이전트가 사용자의 **모호하고, 변화하며, 간접적으로 표현되는 목표**에 대해 능동적으로 협력하는 능력을 평가하고자 합니다. 기존 에이전트 평가가 **도구 사용 및 작업 실행**에만 초점을 맞추고 사용자 의도 이해 및 부합 여부를 간과하는 문제점을 해결하고, **사용자 중심 관점**에서 에이전트의 실제 성능을 측정하는 것을 목표로 합니다.

## 핵심 방법론
사용자 중심 에이전트 평가를 위해 **Gymnasium** 표준 프레임워크 기반의 **UserBench** 환경을 구축했습니다. 이 환경은 **불완전한 목표, 점진적인 선호도 공개, 간접적인 의도 표현** 등 실제 사용자 커뮤니케이션 특성을 모방한 **시뮬레이션 사용자**를 포함합니다. 에이전트는 **도구(tools)**를 사용하여 의도를 명확히 하고, **접근성 높은 인터페이스**를 통해 상호작용하며, **4K개 이상의 여행 계획 시나리오**를 통해 평가됩니다.

## 주요 결과
선도적인 **오픈 및 클로즈드 소스 LLM**들을 평가한 결과, 에이전트의 **작업 완료 능력**과 **사용자 의도 부합 능력** 사이에 상당한 불일치가 나타났습니다. 모델들은 평균적으로 **20%**의 경우에만 모든 사용자 의도에 완벽하게 부합하는 답변을 제공했으며, 가장 발전된 모델조차 적극적인 상호작용을 통해 **전체 사용자 선호도의 30% 미만**만을 밝혀냈습니다. 이는 **강력한 도구 사용 능력**에도 불구하고, 모델들이 **암묵적이고 미묘한 인간의 요구**를 이해하는 데 취약함을 보여줍니다.

## AI 실무자를 위한 시사점
본 연구는 LLM 에이전트가 단순히 **작업 실행자**를 넘어 **진정한 협력 파트너**가 되기 위해 극복해야 할 핵심 과제를 제시합니다. AI/ML 엔지니어는 **UserBench**를 활용하여 에이전트가 **미지정된 목표, 진화하는 선호도, 간접적인 의도**에 대응하는 능력을 측정하고 개선할 수 있습니다. 이는 특히 **강화 학습(RL)**을 통한 **사용자 중심 상호작용** 최적화 연구에 중요한 기반을 제공하며, **대규모 데이터셋** 없이도 실세계 사용자 행동을 모방하는 환경을 구축할 수 있음을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.