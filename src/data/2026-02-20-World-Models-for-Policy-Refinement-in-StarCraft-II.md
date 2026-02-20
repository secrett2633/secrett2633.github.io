---
title: "[논문리뷰] World Models for Policy Refinement in StarCraft II"
excerpt: "[arXiv]에 게시된 'World Models for Policy Refinement in StarCraft II' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - StarCraft II
  - World Model
  - Policy Refinement
  - Large Language Models
  - Reinforcement Learning
  - Partial Observability
  - Structured Text Representation
  - Game AI

permalink: /ai/review/2026-02-20-World-Models-for-Policy-Refinement-in-StarCraft-II/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.14857)

**저자:** Yixin Zhang, Ziyi Wang, Yiming Rong, Haoxi Wang, Jinling Jiang, Shuang Xu, Haoran Wu, Shiyu Zhou, Bo Xu



## 핵심 연구 목표
본 논문은 **StarCraft II (SC2)** 와 같이 복잡하고 부분 관측 가능한(partially observable) 실시간 전략(RTS) 게임 환경에서 **대규모 언어 모델(LLM) 기반 에이전트** 의 정책 결정 능력을 개선하는 것을 목표로 합니다. 특히, **월드 모델(World Model)** 을 활용하여 단기 미래를 예측하고 이를 기반으로 정책을 정제함으로써, 불확실성 속에서도 에이전트의 의사결정 안정성과 효율성을 높이고자 합니다.

## 핵심 방법론
연구팀은 SC2 관측 데이터를 **경제, 개발, 마이크로 엔티티, 매크로 상황** 등 5가지 의미 모듈로 구성된 **구조화된 텍스트 표현(structured textual observation representation)** 으로 변환합니다. 이를 바탕으로 **SC2-Dynamics-50k** 데이터셋을 구축하고 **Qwen3-8B** 를 백본으로 미세 조정하여 **StarWM(StarCraft II World Model)** 을 학습시켰으며, 이는 행동 조건부 동역학을 예측합니다. 최종적으로 **StarWM-Agent** 는 **Generate-Simulate-Refine** 루프를 통해 초기 정책을 월드 모델로 시뮬레이션하고 예측된 미래 상태를 기반으로 정책을 정제합니다.

## 주요 결과
오프라인 평가에서 **StarWM** 은 자원 예측에서 **SMAPE 오류를 60-65% 감소** 시키고, 개발 진행도 예측에서 **Progress MAE를 24%에서 0.43%로 대폭 감소** 시키는 등 기준선을 크게 능가하는 성능을 보였습니다. 온라인 테스트에서는 **StarWM-Agent (32B)** 가 SC2 내장 AI(LV5, LV6, LV7)를 상대로 **승률을 최대 30% 향상** 시키고, **Supply Block Rate를 53% 감소** 시키며, **Kill-Loss Ratio도 21% 개선** 하는 등 모든 난이도에서 일관된 성능 향상을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 복잡하고 부분 관측 가능한 게임 환경에서 **LLM 기반 에이전트에 월드 모델을 통합** 하는 것이 의사결정 성능과 안정성을 크게 향상시킬 수 있음을 보여줍니다. 특히 **구조화된 데이터 표현** 과 **예측 기반 정책 정제(Generate-Simulate-Refine)** 프레임워크는 자원 관리, 생산 큐 최적화, 마이크로 전투 시뮬레이션 등 실시간 전략 게임의 다양한 측면에서 AI 에이전트의 능력을 강화하는 데 효과적입니다. 이러한 방법론은 유사한 동적이고 불확실한 현실 세계 환경에서의 AI 에이전트 설계에도 중요한 통찰을 제공할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.