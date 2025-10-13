---
title: "[논문리뷰] Mitigating Overthinking through Reasoning Shaping"
excerpt: "Wen Luo이 [arXiv]에 게시한 'Mitigating Overthinking through Reasoning Shaping' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Reasoning Models (LRMs)
  - RLVR
  - Overthinking Mitigation
  - Reasoning Shaping
  - Segment-level Penalization
  - Computational Efficiency
  - Training Stability
  - Length-aware Weighting

permalink: /ai/review/2025-10-13-Mitigating_Overthinking_through_Reasoning_Shaping/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.09535)

**저자:** Feifan Song, Shaohang Wei, Bofei Gao, Yejie Wang, Wen Luo, Wei Li, Linli Yao, Weimin Xiong, Liang Chen, Tianyu Liu, Houfeng Wang



## 핵심 연구 목표
본 논문은 Reinforcement Learning from Verifier Reward (RLVR)로 학습된 **대규모 추론 모델(LRMs)**의 "과잉 사고(overthinking)" 문제를 해결하는 것을 목표로 합니다. 과잉 사고는 불필요하게 긴 추론 과정을 생성하여 높은 계산 비용을 유발하며, 기존 토큰 수준의 벌칙은 정확도 저하를 초래할 수 있습니다. 연구는 계산 효율성과 태스크 성능 간의 균형을 유지하면서 추론 과정을 효과적으로 제어하는 새로운 감독 방법을 제시하고자 합니다.

## 핵심 방법론
저자들은 추론 과정을 세그먼트 수준에서 감독하는 **Group Relative Segment Penalization (GRSP)** 방법론을 제안합니다. 이 방법은 추론 궤적을 **세그먼트로 분할**하고(키워드 기반 또는 토큰 로그-확률 기반), 세그먼트 길이에 따라 클러스터링하며, 짧은 세그먼트에 더 높은 벌칙을 부과하는 **내림차순 길이-인식 가중치(descending length-aware weighting)**를 적용합니다. 이 벌칙은 z-점수 정규화된 형태로 검증 가능한 보상에 추가되어 모델이 불필요한 단계를 줄이면서 각 세그먼트 내에서 더 깊이 사고하도록 유도합니다.

## 주요 결과
**GRSP**는 **Reinforce** 및 **GRPO** 프레임워크 모두에서 탁월한 토큰 효율성과 높은 정확도를 달성했습니다. 특히, 가장 어려운 **Omni-MATH 500** 벤치마크에서 **GRSP**는 토큰 사용량을 가장 크게 줄이면서도 최고의 정확도를 유지했습니다. **Qwen-2.5-14B-it** 모델의 경우, **GRSP**는 **Reinforce**에서 **64.72% 정확도**와 **3477 토큰 길이**를, **GRPO**에서 **64.63% 정확도**와 **3427 토큰 길이**를 기록하여 기존 베이스라인을 능가했습니다. 또한, 세그먼트 길이에 따라 벌칙을 차등 적용하는 방식은 훈련 안정성을 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
**GRSP**는 **대규모 추론 모델(LRMs)**을 실제 배포할 때 발생하는 과도한 계산 비용 문제를 해결하는 효과적인 방법을 제공합니다. 세그먼트 수준의 감독과 **길이-인식 가중치**는 모델의 추론 효율성을 높이면서도 핵심 태스크 성능을 유지하거나 향상시킬 수 있음을 보여줍니다. 특히, 이는 모델 크기에 관계없이 잘 확장되며, 복잡한 문제 해결 시 **RLVR** 훈련의 안정성을 개선하여 LRM의 실용적인 적용 가능성을 크게 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.