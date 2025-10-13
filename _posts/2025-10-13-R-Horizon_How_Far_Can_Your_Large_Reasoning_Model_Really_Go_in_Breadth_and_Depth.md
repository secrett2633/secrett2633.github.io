---
title: "[논문리뷰] R-Horizon: How Far Can Your Large Reasoning Model Really Go in Breadth
  and Depth?"
excerpt: "이 [arXiv]에 게시한 'R-Horizon: How Far Can Your Large Reasoning Model Really Go in Breadth
  and Depth?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-Horizon Reasoning
  - Query Composition
  - Large Reasoning Models
  - Reinforcement Learning
  - Benchmark Evaluation
  - Thinking Budget
  - Performance Degradation
  - Chain-of-Thought

permalink: /ai/review/2025-10-13-R-Horizon_How_Far_Can_Your_Large_Reasoning_Model_Really_Go_in_Breadth_and_Depth/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08189)

**저자:** Yi Lu, Jianing Wang, Linsen Guo, Wei He, Hongyin Tang, Tao Gui, Xuanjing Huang, Xuezhi Cao, Wei Wang, Xunliang Cai



## 핵심 연구 목표
이 논문은 기존 벤치마크가 대규모 추론 모델(LRMs)의 복잡하고 상호 의존적인 장기 추론 능력을 충분히 평가하지 못하는 문제를 해결하고자 합니다. 특히, LRMs가 다단계 추론 시나리오에서 얼마나 깊고 넓게 추론할 수 있는지 그 한계를 평가하고 향상시키는 것을 목표로 합니다.

## 핵심 방법론
연구진은 단일 과제를 상호 의존적인 복합 쿼리로 변환하는 **R-HORIZON 쿼리 구성** 방법을 제안합니다. 이를 통해 **수학, 코드 생성, 에이전트 작업**을 포괄하는 새로운 **R-HORIZON 벤치마크**를 구축하고, **전체 정답 기반 채점(all-or-nothing scoring)**과 **이론적 정확도**를 사용해 모델을 평가합니다. 또한, 구성된 데이터를 활용하여 **검증된 보상 기반 강화 학습(RLVR)**을 수행하며 **GRPO(Group Relative Policy Optimization)**와 **Rlast, Rall** 두 가지 보상 스키마를 적용했습니다.

## 주요 결과
평가 결과, **DeepSeek-R1** 및 **Qwen3-235B-A22B-Thinking** 같은 최신 LRMs조차 추론 깊이가 증가할수록 **성능이 크게 저하**되는 것을 발견했습니다. 예를 들어, **AIME25 벤치마크에서 DeepSeek-R1의 정확도는 n=1일 때 87.3%에서 n=5일 때 24.6%로 하락**했습니다. 반면, **R-HORIZON 데이터로 훈련**된 모델은 **AIME24(n=2)에서 +17.4%의 성능 향상**을 보였으며, 단일 과제에서도 **AIME24에서 +7.5%의 정확도 향상**을 달성했습니다.

## AI 실무자를 위한 시사점
**R-HORIZON 벤치마크**는 LRMs의 실제 복잡한 추론 능력을 평가하는 데 필수적인 도구를 제공합니다. **R-HORIZON으로 구성된 데이터셋을 활용한 강화 학습**은 모델의 장기 추론 능력, 응답 길이 효율성, 그리고 **사고 예산 할당**을 크게 개선할 수 있음을 보여주었습니다. 이는 향후 더 강력하고 다재다능한 AI 모델을 개발하기 위한 확장 가능하고 비용 효율적인 패러다임을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.