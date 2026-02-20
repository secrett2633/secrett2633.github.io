---
title: "[논문리뷰] CoBA-RL: Capability-Oriented Budget Allocation for Reinforcement Learning in LLMs"
excerpt: "arXiv에 게시된 'CoBA-RL: Capability-Oriented Budget Allocation for Reinforcement Learning in LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLMs
  - Budget Allocation
  - Adaptive Learning
  - Capability-Oriented Value Function
  - Exploration-Exploitation
  - Resource Efficiency

permalink: /ai/review/2026-02-04-CoBA-RL-Capability-Oriented-Budget-Allocation-for-Reinforcement-Learning-in-LLMs/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.03048)

**저자:** Zhiyuan Yao, Yi-Kai Zhang, Yuxin Chen, Yueqing Sun, Zishan Xu, Yu Yang, Tianhao Hu, Qi Gu, Hui Su, Xunliang Cai



## 핵심 연구 목표
논문은 LLM 추론을 강화하는 **RLVR(Reinforcement Learning with Verifiable Rewards)** 프레임워크에서 **GRPO(Group Relative Policy Optimization)** 와 같은 기존 방법론의 비효율적인 균일 롤아웃 예산 할당 문제를 해결하고자 합니다. 기존 적응형 방법들이 모델의 동적인 학습 상태를 포착하지 못하는 인스턴스 수준 지표에 의존하는 한계를 극복하여, 모델의 진화하는 능력에 기반한 적응형 롤아웃 예산 할당 알고리즘을 제안하는 것이 목표입니다.

## 핵심 방법론
제안된 **CoBA-RL** 은 모델의 진화하는 능력에 따라 롤아웃 예산을 동적으로 할당합니다. 특히, **Capability-Oriented Value function** 을 **Beta 분포** 로 모델링하여 개별 태스크의 잠재적 훈련 가치를 매핑하고, 전역 실패율을 지속적으로 모니터링하여 가치 함수의 형태를 조정합니다. 이를 통해 탐색과 활용의 균형을 자율적으로 조절하며, 계산 리소스를 높은 훈련 가치를 가진 샘플에 효율적으로 할당하기 위해 **힙(heap) 기반의 그리디 전략** 을 사용합니다.

## 주요 결과
**CoBA-RL** 은 여러 난이도 높은 수학 벤치마크에서 **GRPO** 및 **Knapsack-RL** 과 같은 강력한 기준선 대비 뛰어난 성능을 보였습니다. 예를 들어, **Qwen2.5-7B-Instruct** 모델에서 평균 **46.78%** 의 정확도를 달성하여 **GRPO** 의 **42.24%** 보다 **4.54%** 높았고, **Knapsack-RL** 의 **45.39%** 보다 **1.39%** 높았습니다. 특히, 제한된 예산( **B_total = 2048** )에서도 **45.52%** 정확도를 기록하여 두 배의 예산( **B_total = 4096** )으로 훈련된 **GRPO** 의 **42.78%** 를 능가하는 우수한 데이터 효율성을 입증했습니다. 또한, **힙 기반 그리디 전략** 은 동적 프로그래밍 대비 **약 928배** 빠른 할당 시간으로 뛰어난 런타임 효율성을 제공합니다.

## AI 실무자를 위한 시사점
**CoBA-RL** 은 LLM의 후처리 훈련에서 **계산 리소스의 효율성** 을 극대화할 수 있는 실용적인 방법론을 제공합니다. 특히, 모델의 **실시간 학습 능력** 에 따라 롤아웃 예산 할당 전략을 동적으로 조정함으로써, 제한된 컴퓨팅 자원으로도 **더 나은 일반화 성능** 을 달성할 수 있음을 보여줍니다. 이는 **capability-oriented value function** 과 **힙 기반 그리디 전략** 이 대규모 LLM 훈련에 효과적으로 적용될 수 있는 메커니즘을 제시하여, 기존의 정적 예산 할당 방식의 한계를 극복하고 LLM의 **탐색-활용 균형** 을 최적화하는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.