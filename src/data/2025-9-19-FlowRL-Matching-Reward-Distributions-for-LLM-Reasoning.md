---
title: "[논문리뷰] FlowRL: Matching Reward Distributions for LLM Reasoning"
excerpt: "Hengli Li이 arXiv에 게시한 'FlowRL: Matching Reward Distributions for LLM Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Reward Distribution Matching
  - GFlowNets
  - Mode Collapse
  - Diverse Reasoning
  - Flow-Balanced Optimization

permalink: /ai/review/2025-9-19-FlowRL-Matching-Reward-Distributions-for-LLM-Reasoning/

toc: true
toc_sticky: true

date: 2025-09-19 13:12:21+0900
last_modified_at: 2025-09-19 13:12:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15207)

**저자:** Hengli Li, Dinghuai Zhang, jayyoung0802, daixuancheng, xuekai 외 다수



## 핵심 연구 목표
대규모 언어 모델(LLM)의 강화 학습(RL) 추론에서 발생하는 **모드 붕괴(mode collapse)** 와 **다양성 부족** 문제를 해결하는 것을 목표로 합니다. 기존의 보상 최대화(reward-maximizing) 방법론이 지배적인 보상 신호에 과도하게 최적화되어 덜 빈번하지만 유효한 추론 경로를 무시하는 한계를 극복하고자 합니다.

## 핵심 방법론
**FlowRL** 을 제안하여, 스칼라 보상을 **학습 가능한 분할 함수(partition function)** 를 사용하여 **정규화된 목표 분포** 로 변환합니다. 이후 정책과 이 보상 기반 분포 간의 **역 KL 발산(reverse KL divergence)** 을 최소화합니다. 이 아이디어는 **GFlowNets의 궤적 균형(trajectory balance)** 공식에 기반하며, 가변 길이 CoT 추론의 **그래디언트 폭발** 문제를 해결하기 위해 **길이 정규화(length normalization)** 를, 샘플링 불일치를 해결하기 위해 **중요도 샘플링(importance sampling)** 을 통합합니다.

## 주요 결과
FlowRL은 수학 및 코드 추론 태스크에서 기존 RL 방법론을 일관되게 능가했습니다. 수학 벤치마크에서는 **GRPO 대비 평균 10.0%** , **PPO 대비 5.1%** 의 상당한 개선을 보였으며, 32B 모델에서는 평균 **48.4%의 정확도** 를 달성했습니다. 코드 추론 태스크에서도 **LiveCodeBench에서 37.43% Avg@16** , **Codeforces에서 1549.47점** 을 기록하며 일관적으로 우수한 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**보상 분포 매칭(reward distribution matching)** 이 LLM의 **다양하고 일반화 가능한 추론** 을 가능하게 하는 핵심 단계임을 강조합니다. **FlowRL** 은 기존 보상 최대화 RL의 **모드 붕괴 문제** 를 완화하여, LLM이 보다 광범위한 고품질 솔루션과 창의적인 추론 경로를 탐색하도록 유도합니다. 이 접근 방식은 복잡한 **장기 연쇄 추론(long Chain-of-Thought, CoT)** 과 같은 실제 LLM 미세 조정 시나리오에 효과적으로 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.