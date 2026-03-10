---
title: "[논문리뷰] Agentic Critical Training"
excerpt: "Xiyao Wang이 arXiv에 게시한 'Agentic Critical Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Reinforcement Learning
  - Imitation Learning
  - Self-Reflection
  - Action Quality
  - Out-of-Distribution Generalization
  - Critical Reasoning
  - GRPO

permalink: /ai/review/2026-03-10-Agentic-Critical-Training/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.08706)

**저자:** Weize Liu, Minghui Liu, Sy-Tuyen Ho, Souradip Chakraborty, Xiyao Wang, Furong Huang



## 핵심 연구 목표
본 논문은 LLM 에이전트가 단순한 모방을 넘어, 행동의 품질에 대한 **자율적인 비판적 추론** 및 **진정한 자기 성찰 능력** 을 개발하도록 훈련시키는 것을 목표로 합니다. 기존 모방 학습(IL)이 '무엇을 할지'만 가르치고 '왜 그 행동이 더 나은지'에 대한 이해가 부족하다는 한계를 해결하고자 합니다.

## 핵심 방법론
저자들은 **Agentic Critical Training (ACT)** 이라는 강화 학습(RL) 패러다임을 제안합니다. 이 방법은 전문가 행동과 모델이 생성한 대안 행동 쌍을 만들고, 모델이 **GRPO(Group Relative Policy Optimization)** 를 통해 더 나은 행동을 식별하도록 훈련시킵니다. 모델은 오직 올바른 판단 결과에 대해서만 보상을 받으므로, 행동 품질에 대한 **자율적인 연쇄적 사고(Chain-of-Thought)** 추론을 개발하도록 유도됩니다.

## 주요 결과
ACT는 세 가지 에이전트 벤치마크(ALFWorld, WebShop, ScienceWorld)에서 일관되게 성능을 향상시켰습니다. 모방 학습 대비 평균 **5.07점** , 강화 학습 대비 평균 **4.62점** 의 성능 향상을 보였으며, Early Experience보다 평균 **2.42점** 우수했습니다. 또한, ACT는 에이전트 벤치마크에서 **강력한 분포 외(Out-of-Distribution) 일반화 능력** 을 보여주었고, 일반 추론 벤치마크(MATH-500, GPQA-Diamond)에서도 추론 특정 훈련 데이터 없이 성능을 향상시켰습니다.

## AI 실무자를 위한 시사점
ACT는 LLM 에이전트가 단순한 행동 모방을 넘어 **내재화된 비판적 추론 능력** 을 갖추도록 훈련하는 효과적인 방법을 제공합니다. 특히 **OOD 일반화 능력** 과 **일반 추론 능력 향상** 은 보다 강력하고 범용적인 LLM 에이전트 개발에 중요한 시사점을 줍니다. 기존 IL 및 RL 파이프라인에 ACT 단계를 추가하여 모델의 이해도와 성능을 크게 높일 수 있음을 보여주며, 이는 실제 AI 시스템의 신뢰성과 적응력을 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.