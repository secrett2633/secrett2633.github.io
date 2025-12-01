---
title: "[논문리뷰] The Best of N Worlds: Aligning Reinforcement Learning with Best-of-N
  Sampling via max@k Optimisation"
excerpt: "이 [arXiv]에 게시한 'The Best of N Worlds: Aligning Reinforcement Learning with Best-of-N
  Sampling via max@k Optimisation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Best-of-N Sampling
  - Max@k Optimization
  - Policy Gradients
  - Off-policy Learning
  - Code Generation

permalink: /ai/review/2025-10-28-The-Best-of-N-Worlds-Aligning-Reinforcement-Learning-with-Best-of-N-Sampling-via-maxk-Optimisation/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23393)

**저자:** Farid Bagirov, Mikhail Arkhipov, Ksenia Sycheva, Evgeniy Glukhov, Egor Bogomolov



## 핵심 연구 목표
본 논문은 Large Language Models (LLMs)의 강화 학습(RL) 미세 조정 시 **Best-of-N (BoN) 샘플링** 성능이 저하되는 문제를 해결하고자 합니다. 특히, 기존 RL 방식이 **pass@1** 성능을 향상시키지만, 생성 다양성 감소로 인해 더 큰 **N** 값에 대한 **pass@k** (또는 연속 보상의 경우 **max@k** ) 성능이 저하되는 현상을 개선하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **max@k** 지표를 직접 최적화하기 위해 **unbiased on-policy gradient estimate** 를 도출하고, 이를 **off-policy 업데이트** 로 확장하여 샘플 효율성을 개선했습니다. **GRPO** (critic-free RL 알고리즘)를 기반으로 보상 계산 시 **z-score** 를 적용하는 분산 감소 기법을 활용하며, **이진 보상** 이 아닌 **연속 보상** 의 중요성을 강조합니다.

## 주요 결과
제안된 **Off-policy BoN (ours)** 방법론은 **max@128** 지표에서 **CodeContests (0.718)** , **LiveCodeBench (0.616)** , **MBPP (0.710)** 등 대부분의 데이터셋에서 최상의 성능을 달성했습니다. 이는 기존 베이스라인 대비 최대 **+3.7 percentage point (p.p.)** 의 **max@k** 개선을 보여주며, **Wilcoxon signed-rank test** 를 통해 4개 데이터셋에서 통계적으로 유의미한 우위를 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 **Best-of-N** 과 같은 다중 샘플링 추론 전략과 효과적으로 정렬될 수 있음을 보여줍니다. 특히, **연속 보상** 과 **max@k** 직접 최적화가 코드 및 수학과 같은 검증 가능한 태스크에서 LLM의 성능과 견고성을 향상시키는 데 중요함을 시사합니다. AI 실무자들은 이 방법론을 활용하여 **다양성을 유지** 하면서 **BoN** 추론 성능을 극대화하는 LLM을 개발할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.