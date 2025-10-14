---
title: "[논문리뷰] Learn the Ropes, Then Trust the Wins: Self-imitation with Progressive
  Exploration for Agentic Reinforcement Learning"
excerpt: "Gang Li이 [arXiv]에 게시한 'Learn the Ropes, Then Trust the Wins: Self-imitation with Progressive
  Exploration for Agentic Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Agents
  - Exploration-Exploitation
  - Self-Imitation Learning
  - Intrinsic Rewards
  - Curriculum Learning
  - Policy Entropy
  - Tool Use

permalink: /ai/review/2025-9-29-Learn_the_Ropes_Then_Trust_the_Wins_Self-imitation_with_Progressive_Exploration_for_Agentic_Reinforcement_Learning/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22601)

**저자:** Gang Li, Zhengbao He, Xiaoyu Tan, Yulei Qin, tedsun



## 핵심 연구 목표
본 논문의 핵심 목표는 장기적인(long-horizon), 희소한 보상(sparsely-rewarded)을 가진 LLM 에이전트 태스크에서 강화 학습(RL)의 근본적인 문제인 **탐색-활용 트레이드오프(exploration-exploitation trade-off)**를 효과적으로 관리하는 것입니다. 특히, 정책 엔트로피의 붕괴(entropy collapsing) 또는 무한 발산(runaway divergence) 없이 에이전트 자신의 경험을 통해 탐색-활용 균형을 점진적으로 조정하는 방법을 모색합니다.

## 핵심 방법론
저자들은 커리큘럼 기반의 **Self-Imitation Learning (SIL)** 프레임워크인 **SPEAR**를 제안합니다. SPEAR는 **내재적 보상(intrinsic rewards)**을 활용하여 초기에는 **기술 수준 탐색(skill-level exploration)**을 촉진하고, 이후 **SIL**을 통해 **행동 수준 탐색(action-level exploration)**을 강화합니다. 또한, 재생 버퍼(replay buffer)의 경험에 대한 **이점 재조정(advantage recalibration)**과 **공분산 기반 클리핑(covariance-based clipping)** 같은 정규화 기법을 도입하여 정책 엔트로피를 안정적으로 관리하고 과도한 확신을 방지합니다.

## 주요 결과
**SPEAR**는 ALFWorld에서 GRPO/GiGPO/Dr.BoT 대비 최대 **16.1%/5.1%/8.6%**의 성공률 증가를, WebShop에서는 최대 **20.7%/11.8%/13.9%**의 성공률 증가를 달성했습니다. AIME24 및 AIME25 벤치마크에서는 **Dr.BoT** 대비 각각 최대 **3.8%**와 **6.1%**의 성능 향상을 보였습니다. 이러한 성능 향상은 이론적 복잡성 측면에서 **10-25%**의 추가 오버헤드만 발생하며, 실제 실행 시간 오버헤드는 미미하여 **플러그 앤 플레이(plug-and-play)** 방식의 확장성을 입증했습니다.

## AI 실무자를 위한 시사점
**SPEAR**는 LLM 에이전트의 견고한 훈련을 위한 효과적인 프레임워크를 제공하여, 복잡한 태스크에서 **추론 및 도구 통합 능력**을 향상시킬 수 있습니다. 특히, 동적으로 변화하는 정책 엔트로피를 관리하고 과거의 성공적인 경험을 효율적으로 활용하는 접근 방식은 LLM 기반 에이전트 개발에 실질적인 도움이 됩니다. 낮은 계산 오버헤드와 우수한 확장성은 다양한 LLM 아키텍처 및 에이전트 태스크에 적용하기 용이합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.