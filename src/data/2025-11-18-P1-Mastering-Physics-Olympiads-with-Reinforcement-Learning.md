---
title: "[논문리뷰] P1: Mastering Physics Olympiads with Reinforcement Learning"
excerpt: "Haiyuan Wan이 arXiv에 게시한 'P1: Mastering Physics Olympiads with Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Physics Reasoning
  - Agentic AI
  - Olympiad Problems
  - Post-Training
  - Knowledge Transfer

permalink: /ai/review/2025-11-18-P1-Mastering-Physics-Olympiads-with-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.13612)

**저자:** Jiacheng Chen, Qianjia Cheng, Fangchen Yu, Haiyuan Wan, Yuchen Zhang, Shenghe Zheng, Junchi Yao, et al.



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 퍼즐 풀이를 넘어 과학 수준의 추론 능력을 갖추도록 발전시키고, 특히 복잡한 물리학 올림피아드 문제를 해결하는 능력을 향상시키는 것을 목표로 합니다. 이를 통해 LLM이 물리적 현실과 자연 법칙의 엄격한 제약을 준수하는, 진정한 과학적 추론 능력을 입증하고자 합니다.

## 핵심 방법론
P1 모델은 **강화 학습(RL)** 을 통한 사후 훈련으로 개발되었으며, **Group Sequence Policy Optimization (GSPO)** 을 기반으로 **적응형 학습 가능성 조정(Adaptive Learnability Adjustment)** 및 **훈련 안정화 메커니즘(Training Stabilization Mechanism)** 을 통합합니다. 추론 시에는 P1 모델을 **PhysicsMinions 에이전트 프레임워크** 와 결합하여 반복적인 수정 및 자가 검증 능력을 통해 문제 해결 깊이를 확장합니다. 훈련 데이터는 5,065개의 올림피아드 수준 물리 문제로 구성된 **HiPhO 벤치마크** 를 사용합니다.

## 주요 결과
플래그십 모델인 **P1-235B-A22B** 는 IPhO 2025에서 **21.2/30점** 을 획득하여 최초로 오픈소스 모델 중 금메달 성능을 달성했으며, 전체 HiPhO 스위트에서 **12개의 금메달과 1개의 은메달** 을 획득했습니다. **PhysicsMinions 에이전트 시스템** 과 결합된 **P1-235B-A22B+PhysicsMinions** 는 IPhO 2025에서 **23.2/30점** 으로 전체 1위를 차지했습니다. 또한, 30B 모델은 7개의 수학, 코딩, 일반 추론 벤치마크에서 베이스 모델을 뛰어넘는 뛰어난 일반화 성능을 보였습니다.

## AI 실무자를 위한 시사점
P1 모델의 성공은 LLM이 복잡한 과학적 추론 태스크에서 인간 수준의 성능을 달성할 수 있음을 보여주며, 특히 **강화 학습** 과 **에이전트 시스템** 의 결합이 그 핵심임을 시사합니다. 이는 AI가 미래 물리학 연구를 지원하거나 선도하는 데 기여할 수 있는 중요한 단계를 나타냅니다. 또한, 도메인 특화된 사후 훈련이 타 도메인으로의 **일반화 및 전이 학습 능력** 을 향상시킬 수 있음을 입증하여, 특정 과학 분야 LLM 개발에 대한 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.