---
title: "[논문리뷰] RL-PLUS: Countering Capability Boundary Collapse of LLMs in
  Reinforcement Learning with Hybrid-policy Optimization"
excerpt: "Kechi Zhang이 [arXiv]에 게시한 'RL-PLUS: Countering Capability Boundary Collapse of LLMs in
  Reinforcement Learning with Hybrid-policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Reinforcement Learning
  - Capability Collapse
  - Hybrid Policy Optimization
  - Multiple Importance Sampling
  - Exploration
  - Math Reasoning
  - Out-of-Distribution

permalink: /ai/review/2025-8-7-RL-PLUS-Countering-Capability-Boundary-Collapse-of-LLMs-in-Reinforcement-Learning-with-Hybrid-policy-Optimization/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.00222)

**저자:** Yihong Dong, Xue Jiang, Yongding Tao, Huanyu Liu, Kechi Zhang, Lili Mou, Rongyu Cao, Yingwei Ma, Jue Chen, Binhua Li, Zhi Jin, Fei Huang, Yongbin Li, Ge Li



## 핵심 연구 목표
본 논문은 **LLM**의 강화 학습(RLVR) 과정에서 발생하는 '능력 경계 붕괴(capability boundary collapse)' 문제를 해결하는 것을 목표로 합니다. 기존 RLVR 방식이 LLM의 내재된 능력 범위를 넘어서는 새로운 추론 능력을 획득하지 못하고 문제 해결 범위를 축소시키는 한계를 극복하고자 합니다.

## 핵심 방법론
저자들은 내부 활용과 외부 데이터 학습을 시너지화하는 새로운 하이브리드 정책 최적화 접근법인 **RL-PLUS**를 제안합니다. 주요 구성 요소는 외부 데이터의 분포 불일치를 완화하는 **다중 중요도 샘플링(Multiple Importance Sampling)**과 고가치 및 미탐색 추론 경로를 유도하기 위한 **탐색 기반 어드밴티지 함수(Exploration-Based Advantage Function)**입니다. 특히, 탐색 기반 어드밴티지 함수는 **Ci,t = (1 - detach(πθ(ei,t|q, ei,<t)))γ** 형태로, 모델이 낮은 확률로 예측했지만 정답인 토큰에 대한 학습 신호를 증폭시킵니다.

## 주요 결과
**RL-PLUS**는 6가지 수학 추론 벤치마크에서 **53.4**의 평균 점수를 달성하며 기존 RLVR 방식 대비 **5.2점** 향상된 SOTA 성능을 기록했습니다. 또한, 6가지 OOD(Out-of-Distribution) 추론 태스크에서 **48.8**의 평균 점수로 우수한 일반화 성능을 보였습니다. 다양한 모델 패밀리(예: **Qwen2.5-Math-7B**, **LLaMA-3.1-8B**)에 걸쳐 일관된 성능 향상을 입증했으며, 특히 **Pass@k** 분석을 통해 기존 방식에서 나타나는 능력 경계 붕괴 문제를 효과적으로 해결함을 보였습니다.

## AI 실무자를 위한 시사점
**RL-PLUS**는 LLM의 추론 능력을 확장하고 새로운 지식을 통합하는 견고한 프레임워크를 제공합니다. 이는 희소한 보상과 방대한 액션 공간으로 인해 외부 탐색이 어려웠던 기존 RLVR의 한계를 극복하고, 모델이 미리 숙달된 지식에 대한 업데이트는 줄이고 탐색이 어려웠던 고가치 액션에 집중하도록 학습을 유도합니다. 이 접근 방식은 다양한 LLM 아키텍처와 규모에 적용 가능하여 실제 AI 애플리케이션에서 LLM의 문제 해결 능력을 향상시키는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.