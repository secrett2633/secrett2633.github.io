---
title: "[논문리뷰] FARE: Fast-Slow Agentic Robotic Exploration"
excerpt: "Jingsong Liang이 [arXiv]에 게시한 'FARE: Fast-Slow Agentic Robotic Exploration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotic Exploration
  - LLM
  - Reinforcement Learning
  - Fast-Slow Thinking
  - Hierarchical Planning
  - Agentic AI
  - Graph Reasoning

permalink: /ai/review/2026-01-22-FARE-Fast-Slow-Agentic-Robotic-Exploration/

toc: true
toc_sticky: true

date: 2026-01-22 00:00:00+0900+0900
last_modified_at: 2026-01-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14681)

**저자:** Shuhao Liao, Xuxin Lv, Jeric Lew, Shizhe Zhang, Jingsong Liang



## 핵심 연구 목표
본 연구는 자율 로봇 탐사에서 기존 방법론이 장기 정보 활용 및 환경 변화 적응에 어려움을 겪는 문제를 해결하고자 합니다. 특히, 에이전트 수준의 의미론적 추론과 빠른 로컬 제어를 통합하여, 복잡하고 미지의 환경에서 로봇이 효율적으로 기하학적 정보를 획득하고 일관된 탐사 전략을 수행하는 계층적 프레임워크인 **FARE** 를 제안합니다.

## 핵심 방법론
**FARE** 는 글로벌 추론을 위한 **느린 생각(slow-thinking) LLM 모듈** 과 로컬 의사결정을 위한 **빠른 생각(fast-thinking) RL 정책** 을 통합한 계층적 프레임워크입니다. LLM 모듈은 환경 텍스트 설명을 해석하여 탐사 전략과 글로벌 웨이포인트 시퀀스를 생성하며, 효율성을 위해 **모듈성 기반 가지치기** 를 사용합니다. RL 모듈은 LLM이 생성한 글로벌 웨이포인트에 따라 로컬 관측에 반응하여 탐사를 실행하고, 글로벌 웨이포인트 준수를 장려하는 보상 항으로 정책을 형성하여 일관된 행동을 보장합니다.

## 주요 결과
시뮬레이션 환경에서 **FARE** 는 기존 최첨단 기준 모델 대비 탐사 효율성에서 상당한 개선을 보였습니다. 특히, **Warehouse 환경** 에서 **FARE** 는 **441m** 의 최단 이동 거리와 **252초** 의 가장 빠른 완료 시간을 달성하여, TARE의 652m와 366초 대비 우수한 성능을 입증했습니다. 또한, **Agilex Scout-mini 로봇** 에 배포하여 **200m × 130m** 규모의 실제 건물 환경에서 수동 개입 없이 전체 건물을 성공적으로 탐사하며 안정적인 런타임 성능을 검증했습니다.

## AI 실무자를 위한 시사점
**FARE** 는 **LLM** 을 활용한 고수준의 전략적 사고와 **RL** 을 통한 저수준의 반응형 실행을 결합하는 **계층적 에이전트 아키텍처** 의 강력한 가능성을 보여줍니다. 이는 **의미론적 추론과 기하학적 결정** 을 분리하여 각 모듈이 적절한 시간 및 공간 스케일에서 작동할 수 있게 하여, 복잡한 로봇 탐사 문제에 대한 실용적이고 확장 가능한 해결책을 제시합니다. AI 실무자들은 이 프레임워크를 통해 **자율 시스템의 효율성과 견고성** 을 향상시킬 수 있는 새로운 설계 원칙을 얻을 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.