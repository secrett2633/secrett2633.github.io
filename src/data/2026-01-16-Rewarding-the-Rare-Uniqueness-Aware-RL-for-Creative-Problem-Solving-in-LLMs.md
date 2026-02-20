---
title: "[논문리뷰] Rewarding the Rare: Uniqueness-Aware RL for Creative Problem Solving in LLMs"
excerpt: "arXiv에 게시된 'Rewarding the Rare: Uniqueness-Aware RL for Creative Problem Solving in LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Large Language Models (LLMs)
  - Exploration Collapse
  - Strategy-level Diversity
  - Uniqueness-Aware Rewarding
  - Creative Problem Solving
  - Pass@k

permalink: /ai/review/2026-01-16-Rewarding-the-Rare-Uniqueness-Aware-RL-for-Creative-Problem-Solving-in-LLMs/

toc: true
toc_sticky: true

date: 2026-01-16 00:00:00+0900+0900
last_modified_at: 2026-01-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.08763)

**저자:** Zhiyuan Hu, Yucheng Wang, Yufei He, Jiaying Wu, Yilun Zhao, Bryan Hooi, See-Kiong Ng, Cynthia Breazeal, Anh Tuan Luu, Hae Won Park



## 핵심 연구 목표
LLM의 RL 기반 학습에서 발생하는 **탐색 붕괴(exploration collapse)** 문제를 해결하는 것이 목표입니다. 기존 RL 모델이 소수의 지배적인 추론 패턴에 조기에 수렴하여 `pass@k` 성능과 솔루션 다양성을 저해하는 문제를 해결하고, 고수준의 희귀한 솔루션 전략을 명시적으로 보상하여 창의적인 문제 해결 능력을 향상시키고자 합니다.

## 핵심 방법론
본 연구는 **Uniqueness-Aware Reinforcement Learning** 을 제안합니다. 이는 **LLM 기반 판별자(judge)** 를 사용하여 동일한 문제에 대한 여러 롤아웃을 고수준 솔루션 전략별로 클러스터링합니다. 롤아웃의 전략적 독창성은 해당 클러스터 크기의 역수에 비례하여 결정되며, **그룹 정규화된 어드밴티지(GRPO advantages)** 를 클러스터 크기에 반비례하여 재조정하여 드뭅지만 올바른 전략에 더 높은 보상을 부여합니다.

## 주요 결과
제안된 방법은 수학, 물리, 의료 추론 벤치마크 전반에 걸쳐 `pass@k` 성능을 지속적으로 향상시키고, **AUC@K(Area Under the Pass@k Curve)** 를 증가시켰습니다. 특히 **Qwen2.5-7B 모델** 에서 **AIME 벤치마크** 의 경우 **SimpleRL** 대비 **K=64에서 +0.044, K=128에서 +0.058 AUC@K** 증가를 달성했으며, 학습 과정 동안 **더 높고 안정적인 정책 엔트로피** 를 유지하여 탐색이 지속됨을 입증했습니다. 또한 **인간 주석 솔루션 전략 커버리지(`cover@n`)** 도 크게 증가했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 단순한 토큰 수준의 다양성을 넘어 **고수준의 추론 전략을 다양하게 탐색** 하도록 장려하는 실용적인 방법을 제시합니다. **LLM 기반 판별자** 를 활용한 솔루션 클러스터링은 복잡한 문제 해결 AI 시스템의 **창의성과 강건성** 을 높이는 데 기여할 수 있습니다. 이는 특히 **높은 `pass@k` 성능** 과 다양한 접근 방식이 요구되는 코드 생성, 과학 연구, 의료 진단과 같은 분야에서 유용하게 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.