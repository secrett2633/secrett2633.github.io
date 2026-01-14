---
title: "[논문리뷰] ArenaRL: Scaling RL for Open-Ended Agents via Tournament-based Relative Ranking"
excerpt: "이 [arXiv]에 게시한 'ArenaRL: Scaling RL for Open-Ended Agents via Tournament-based Relative Ranking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Agents
  - Open-Ended Tasks
  - Relative Ranking
  - Tournament-based Ranking
  - Discriminative Collapse
  - Reward Modeling
  - Benchmarks

permalink: /ai/review/2026-01-14-ArenaRL-Scaling-RL-for-Open-Ended-Agents-via-Tournament-based-Relative-Ranking/

toc: true
toc_sticky: true

date: 2026-01-14 00:00:00+0900+0900
last_modified_at: 2026-01-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.06487)

**저자:** Qiang Zhang, Boli Chen, Fanrui Zhang, Ruixue Ding, Shihang Wang, Qiuchen Wang, Yinfeng Huang, Haonan Zhang, Rongxiang Zhu, Pengyong Wang, Ailin Ren, Xin Li, Pengjun Xie, Jiawei Liu, Ning Guo, Jingren Zhou, Zheng-Jun Zha



## 핵심 연구 목표
본 연구는 개방형 에이전트 태스크에서 **LLM 에이전트** 의 강화 학습(RL) 성능을 저해하는 **"판별 붕괴(discriminative collapse)"** 문제를 해결하고자 합니다. 기존의 개별 응답에 대한 **점수 기반 보상 모델** 이 미묘한 성능 차이를 구분하지 못하고 노이즈에 취약해지는 문제를 해결하여, 효율적이고 안정적인 정책 최적화를 가능하게 하는 새로운 **보상 신호 패러다임** 을 제시하는 것이 목표입니다.

## 핵심 방법론
제안된 **ArenaRL** 은 **점수 기반의 스칼라 보상** 대신 **그룹 내 상대적 순위** 를 사용하는 강화 학습 패러다임입니다. 이를 위해 **다단계 루브릭** 을 활용한 **과정 인지 쌍대 평가(process-aware pairwise evaluation)** 메커니즘을 도입하여 궤적에 대한 미세한 상대 점수를 할당하며, **토너먼트 기반의 순위 결정 체계** 를 고안하여 안정적인 이점 신호를 획득합니다. 특히, `Seeded Single-Elimination` 토폴로지가 **O(N) 복잡도** 로 **O(N^2) 복잡도** 의 완전한 쌍대 비교와 거의 동등한 정확도를 달성하며 효율성과 정확성의 최적 균형을 제공함을 검증했습니다.

## 주요 결과
`ArenaRL`은 **Open-Travel** 및 **Open-DeepResearch** 벤치마크에서 표준 RL 베이스라인(예: **SFT** , **GRPO** , **GSPO** )을 크게 능가했습니다. **Open-Travel** 에서 `ArenaRL`은 평균 승률 **41.8%** 를 달성하여 **GRPO(16.4%)** 및 **GSPO(17.2%)** 를 크게 앞섰으며, **Open-DeepResearch** 에서는 승률 **64.3%** 와 유효 생성률 **99%** 를 기록했습니다. `Seeded Single-Elimination` 방식은 **O(N) 복잡도** 로 **Round-Robin** 의 **O(N^2)** 방식에 상응하는 **32.5%** 의 평균 승률을 보였습니다.

## AI 실무자를 위한 시사점
`ArenaRL`은 **개방형 태스크** 와 같이 객관적인 정답이 불분명하고 보상 모델이 불안정한 환경에서 **LLM 에이전트** 의 성능을 개선할 수 있는 강력한 방법을 제공합니다. 특히, **O(N) 복잡도** 의 효율적인 **토너먼트 기반 순위 결정** 은 대규모 에이전트 훈련에 실용적이며, **과정 인지 평가 메커니즘** 은 에이전트의 추론 및 계획 능력에 대한 보다 세분화된 피드백을 가능하게 합니다. 새롭게 구축된 **Open-Travel** 및 **Open-DeepResearch 벤치마크** 는 실제 시나리오를 반영하여 차세대 **개방형 에이전트** 개발 및 평가를 위한 중요한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.