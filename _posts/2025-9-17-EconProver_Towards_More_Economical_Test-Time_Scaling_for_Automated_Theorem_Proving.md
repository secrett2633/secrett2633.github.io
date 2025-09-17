---
title: "[논문리뷰] EconProver: Towards More Economical Test-Time Scaling for Automated
  Theorem Proving"
excerpt: "Shansan Gong이 [arXiv]에 게시한 'EconProver: Towards More Economical Test-Time Scaling for Automated
  Theorem Proving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Automated Theorem Proving
  - LLM
  - Test-Time Scaling
  - Chain-of-Thought
  - Reinforcement Learning
  - Efficiency Optimization
  - Token Cost
  - Sampling Cost
  - Dynamic CoT Switching

permalink: /ai/review/2025-9-17-EconProver_Towards_More_Economical_Test-Time_Scaling_for_Automated_Theorem_Proving/

toc: true
toc_sticky: true

date: 2025-09-17 13:16:01+0900
last_modified_at: 2025-09-17 13:16:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.12603)

**저자:** Mukai Li, Linfeng Song, Zhenwen Liang, Jiahao Xu, Shansan Gong, Qi Liu, Haitao Mi, Dong Yu



## 핵심 연구 목표
논문은 LLM 기반의 Automated Theorem Proving(ATP) 모델들이 **Chain-of-Thought (CoT) 추론** 및 **다중 샘플링 패스**와 같은 test-time scaling 전략을 사용하며 발생하는 높은 계산 비용과 자원 비효율성을 해결하는 것을 목표로 합니다. 특히, 토큰 사용량과 반복 정제 단계를 포함하는 총 계산 비용을 고려한 효율적인 접근 방식을 제안합니다.

## 핵심 방법론
저자들은 효율성 개선을 위해 **EconRL**이라는 통합 프레임워크를 제안합니다. 이 프레임워크는 (1) 불필요한 토큰 소비를 줄이기 위해 복잡도에 따라 CoT 추론을 동적으로 활성화하는 **Dynamic CoT Switching** (선호 학습 **DPO** 활용), (2) 제한된 샘플링 예산 내에서 솔루션 다양성을 향상시키기 위해 난이도별로 분할된 데이터에 대해 특화된 추론 헤드를 학습하는 **Diverse Parallel-scaled RL** (**PPO** 활용)의 두 가지 상호 보완적인 기법으로 구성됩니다.

## 주요 결과
제안된 **ECONPROVER-GD**는 **miniF2F-test**에서 기준 모델과 유사한 **84.0%**의 성능을 달성하면서도, 기준 모델의 **12%**에 불과한 샘플링 비용만을 요구했습니다. 특히, **Dynamic CoT Switching** 단독으로도 전체 CoT 방식 대비 토큰 사용량을 **15%**로 줄이면서 **99.7%**의 정확도(75.4% vs 75.8%)를 유지했으며, 반복 정제(IR) 기법과 결합 시에도 토큰 오버헤드를 **75%** 감소시키며 **86.0%**의 높은 정확도를 유지했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 기반 ATP 모델의 **배포 비용과 자원 효율성**을 획기적으로 개선할 수 있는 실용적인 방법론을 제공합니다. 특히, 문제의 난이도에 따라 추론 방식을 동적으로 조정하는 **Dynamic CoT Switching**은 다른 LLM 기반 추론 시스템에서도 **계산 비용 절감**에 직접적으로 기여할 수 있습니다. 또한, **난이도별 맞춤형 추론 전략**을 학습하는 방식은 모델의 범용성과 효율성을 높여, 제한된 컴퓨팅 자원 환경에서도 고성능 AI 시스템을 구축하는 데 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.