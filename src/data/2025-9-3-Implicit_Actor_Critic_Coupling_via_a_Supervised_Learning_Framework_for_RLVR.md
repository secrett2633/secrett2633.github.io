---
title: "[논문리뷰] Implicit Actor Critic Coupling via a Supervised Learning Framework for
  RLVR"
excerpt: "Lu Wang이 [arXiv]에 게시한 'Implicit Actor Critic Coupling via a Supervised Learning Framework for
  RLVR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - RLVR
  - Large Language Models
  - Actor-Critic
  - Supervised Learning
  - Mathematical Reasoning
  - Policy Optimization
  - Cross-Entropy Loss

permalink: /ai/review/2025-9-3-Implicit_Actor_Critic_Coupling_via_a_Supervised_Learning_Framework_for_RLVR/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.02522)

**저자:** Jiaming Li, Longze Chen, Ze Gong, Yukun Chen, Lu Wang, Wanwei He, Run Luo, Min Yang



## 핵심 연구 목표
본 논문은 LLM이 수학 및 프로그래밍과 같은 추론 태스크에서 직면하는 **희소한 보상 신호**와 **불안정한 정책 경사 업데이트**라는 기존 RLVR(Reinforcement Learning with Verifiable Rewards) 패러다임의 주요 과제를 해결하는 것을 목표로 합니다. 궁극적으로 보다 안정적이고 효율적인 LLM 정책 최적화 프레임워크를 제시하고자 합니다.

## 핵심 방법론
저자들은 RLVR 문제를 **지도 학습 태스크**로 재구성하는 **PACS (imPlicit Actor Critic coupling via a Supervised learning framework)**를 제안합니다. 이 방법론은 검증 가능한 결과 보상을 예측 가능한 레이블로 간주하고, 정책 모델로 파라미터화된 점수 함수를 **교차 엔트로피 손실**을 사용하여 최적화합니다. 상세한 경사 분석을 통해 이 지도 학습 공식이 기존 정책 경사 업데이트를 회복하면서 액터(정책 개선)와 크리틱(보상 추정) 역할을 암묵적으로 결합하여 효율성과 안정성을 높임을 보여줍니다. 특히, **REINFORCE Leave-One-Out (RLOO) 추정기**를 활용하여 장점(advantage) 유사 점수를 계산합니다.

## 주요 결과
PACS는 도전적인 수학 추론 태스크에서 **PPO** 및 **GRPO**와 같은 강력한 RLVR 기준선을 뛰어넘는 우수한 성능을 달성했습니다. 예를 들어, **AIME 2025 데이터셋**에서 **Qwen2.5-7B 모델**은 pass@256에서 **59.78%**를 기록하여 PPO 대비 **13.32%p**, GRPO 대비 **14.36%p** 향상된 결과를 보였습니다. 또한, PACS는 **건강한 정책 엔트로피**를 유지하여 탐색 능력과 효율적인 학습을 동시에 개선함을 입증했습니다.

## AI 실무자를 위한 시사점
PACS는 기존 RL 기반 RLVR 방법론의 복잡성을 줄이고 희소한 보상 및 불안정한 학습 문제에 대한 실용적인 해결책을 제공합니다. 특히 검증 가능한 보상만 제공되는 복잡한 추론 태스크에서 LLM의 성능을 향상시키는 데 효과적인 학습 패러다임을 제공합니다. AI 실무자들은 PACS를 통해 **별도의 가치 모델을 훈련할 필요 없이** LLM을 미세 조정하여 더 안정적이고 예측 가능한 결과를 얻을 수 있으며, 이는 모델 배포의 신뢰성을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.