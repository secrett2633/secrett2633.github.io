---
title: "[논문리뷰] Imagine-then-Plan: Agent Learning from Adaptive Lookahead with World Models"
excerpt: "Wenjie Li이 arXiv에 게시한 'Imagine-then-Plan: Agent Learning from Adaptive Lookahead with World Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - World Models
  - Adaptive Planning
  - Lookahead
  - Reinforcement Learning
  - POMDP
  - Task Planning
  - Reasoning

permalink: /ai/review/2026-01-15-Imagine-then-Plan-Agent-Learning-from-Adaptive-Lookahead-with-World-Models/

toc: true
toc_sticky: true

date: 2026-01-15 00:00:00+0900+0900
last_modified_at: 2026-01-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.08955)

**저자:** Youwei Liu, Jian Wang, Hanlin Wang, Beichen Guo, Wenjie Li



## 핵심 연구 목표
대규모 언어 모델(LLM) 기반 에이전트가 "얕은 그라운딩(shallow grounding)" 문제로 인해 행동의 장기적 결과를 예측하지 못하여 발생하는 실패를 해결하는 것이 목표입니다. 기존의 단일 스텝 또는 고정된 탐색 깊이(fixed-horizon) 롤아웃 방식의 한계를 극복하고, **적응형 선견지명(adaptive lookahead)** 을 통해 복잡한 태스크 플래닝 능력을 향상시키고자 합니다.

## 핵심 방법론
본 논문은 **Imagine-then-Plan (ITP)** 프레임워크를 제안하며, **부분 관측 및 상상 가능한 마르코프 결정 과정(POIMDP)** 을 개념화합니다. 에이전트는 학습된 **월드 모델 (Mø)** 과 상호작용하여 **다단계 "상상된(imagined)" 궤적** 을 생성하고, 궁극적인 목표와 태스크 진행 상황에 따라 **상상 깊이 (Kt)** 를 동적으로 조절하는 **적응형 탐색 깊이 메커니즘** 을 도입합니다. ITP는 훈련 없는 **ITP₁** (추론 시 반사적 자기 개선)와 강화 학습 기반의 **ITPR** (A2C 알고리즘으로 정책 및 K-헤드 예측기 최적화) 두 가지 변형으로 구현됩니다.

## 주요 결과
ITP는 모든 백본 모델과 벤치마크에서 기존 방법론 대비 일관되고 유의미한 성능 향상을 보였습니다. 특히, **Qwen2.5-7B** 백본에서 **ITP₁** 는 **35.71%** 의 전반적인 성공률을 달성하여 **ReAct (17.14%)** 를 두 배 가까이 앞섰습니다. 또한 **ITPR** 은 **ALFWorld** 에서 **88.57%** , **ScienceWorld** 에서 **63.91%** 의 성공률을 기록하며 모든 훈련 기반 베이스라인을 능가했습니다. 적응형 탐색 깊이 메커니즘은 고정된 탐색 깊이 방식보다 더 높은 성공률을 유지하면서 **상당히 낮은 계산 예산(Normalized Budget)** 을 소모하여 우수한 성능-효율성 균형을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 에이전트 개발에서 **사전 예지(foresight)** 와 **월드 모델** 의 중요성을 강조하며, 단순히 반응하는 에이전트에서 벗어나 **사려 깊은(deliberative)** 에이전트로의 발전을 제시합니다. **적응형 탐색 깊이 메커니즘** 은 복잡한 태스크에서 발생할 수 있는 잠재적 병목 현상이나 오류를 미리 감지하여 에이전트의 효율성과 안정성을 크게 향상시킬 수 있습니다. 이는 실제 환경에서 LLM 에이전트를 배치할 때 **계산 비용 최적화** 와 **견고한 의사 결정** 을 동시에 달성하는 데 중요한 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.