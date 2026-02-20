---
title: "[논문리뷰] Experiential Reinforcement Learning"
excerpt: "arXiv에 게시된 'Experiential Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Language Models
  - Self-Reflection
  - Experiential Learning
  - Policy Optimization
  - Distillation
  - Agentic Reasoning

permalink: /ai/review/2026-02-17-Experiential-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.13949)

**저자:** Taiwei Shi, Sihao Chen, Bowen Jiang, Linxin Song, Longqi Yang, Jieyu Zhao



## 핵심 연구 목표
언어 모델(LMs)이 희소하고 지연된 환경 피드백으로부터 학습하는 과정에서 발생하는 비효율성과 불안정성을 해결하는 것이 주요 목표입니다. 모델이 관찰된 실패를 미래 행동 변화로 암묵적으로 추론해야 하는 기존 Reinforcement Learning from Verifiable Rewards (RLVR) 접근 방식의 한계를 극복하고, 피드백을 구조화된 행동 수정으로 변환하여 정책에 통합하는 명시적인 메커니즘을 제안합니다.

## 핵심 방법론
Experiential Reinforcement Learning (ERL)은 **경험-성찰-통합(experience-reflection-consolidation) 루프** 를 RL 학습 과정에 내장합니다. 모델은 초기 시도 후 환경 피드백과 보상을 받고, **자기 성찰(self-reflection)** 을 통해 개선 방안을 도출합니다. 이 성찰은 **두 번째 정제된 시도** 를 안내하며, 성공적인 두 번째 시도는 **강화 학습(reinforcement learning)** 으로 최적화되고, **선택적 증류(selective distillation)** 를 통해 기본 정책에 내재화됩니다. 이 과정에서 **에피소드 간 성찰 메모리** 를 활용하여 성공적인 수정 패턴을 축적하고 재사용합니다.

## 주요 결과
ERL은 희소 보상 제어 환경 및 에이전트 추론 벤치마크 전반에서 기존 RLVR 대비 일관되게 우수한 성능을 보였습니다. 특히 **Sokoban에서 최대 +81%** , **FrozenLake에서 +27%** , **HotpotQA에서 최대 +11%** 의 성능 향상을 달성했습니다. 또한, RLVR보다 더 빠르고 높은 보상 획득을 통해 **학습 효율성이 개선** 되었음을 입증했습니다.

## AI 실무자를 위한 시사점
ERL은 희소하거나 지연된 보상에 직면한 **언어 모델 기반 에이전트** 의 학습 효율성과 최종 성능을 혁신적으로 개선할 잠재력을 제시합니다. 명시적인 **자기 성찰 및 경험 통합 메커니즘** 은 모델이 복잡한 환경에서 실패로부터 직접 학습하고, 이 지식을 기본 정책에 반영하여 추론 시 추가 연산 없이도 개선된 행동을 유지할 수 있게 합니다. 이는 **멀티스텝 의사결정** 과 **장기적인 계획** 이 필요한 에이전트 시스템 개발에 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.