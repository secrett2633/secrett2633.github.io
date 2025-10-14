---
title: "[논문리뷰] BroRL: Scaling Reinforcement Learning via Broadened Exploration"
excerpt: "이 [arXiv]에 게시한 'BroRL: Scaling Reinforcement Learning via Broadened Exploration' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLMs
  - Scaling Laws
  - Exploration
  - Rollout Size
  - Verifiable Rewards
  - PPO
  - Mass Balance Equation

permalink: /ai/review/2025-10-2-BroRL_Scaling_Reinforcement_Learning_via_Broadened_Exploration/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01180)

**저자:** Jian Hu, Mingjie Liu, Ximing Lu, Fang Wu, Zaid Harchaoui, Shizhe Diao, Yejin Choi, Pavlo Molchanov, Jun Yang, Jan Kautz, Yi Dong



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLM)의 복잡한 추론 능력을 향상시키기 위한 **Verifiable Rewards (RLVR)** 기반 강화 학습(RL)의 스케일링 한계를 극복하는 것을 목표로 합니다. 특히, 기존 **ProRL**과 같이 훈련 단계 수를 늘리는 방식에서 발생하는 성능 정체 문제를 해결하고, **광범위한 탐색(Broadened Exploration)**을 통한 새로운 스케일링 패러다임을 제시하고자 합니다.

## 핵심 방법론
본 연구는 프롬프트당 **롤아웃 수 N을 수백에서 수천으로 증가**시키는 **BroRL** 접근 방식을 제안합니다. 이 방법은 **질량 균형 방정식 분석**을 통해 이론적으로 뒷받침되는데, N이 증가할수록 "unsampled coupling" 항의 부정적인 영향이 감소하여 **정확 토큰 질량(correct-mass)의 일관된 확장**을 보장합니다. 실험은 **ProRLv2 체크포인트 모델**을 기반으로 **N=512**의 롤아웃 크기를 사용하여 수학, 코드, 추론 벤치마크에서 진행되었습니다.

## 주요 결과
**BroRL (N=512)**은 **3K ProRL 훈련 단계** 이후 성능이 정체되거나 저하되는 기존 모델을 지속적으로 개선하여, **1.5B 모델**에서 수학 벤치마크 **63.03점**, 코드 생성 **54.20점**, 추론 짐 **63.09점**이라는 SOTA 성능을 달성했습니다. 또한, **동일한 훈련 시간** 내에 **ProRL** 대비 처리량(throughput)을 **거의 두 배**로 증가시켜(**72.4 samples/s vs 36.5 samples/s**), 데이터 및 컴퓨팅 효율성 면에서 우수함을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들에게 **RLVR 훈련에서 롤아웃 크기 N 스케일링**이 훈련 단계 수 스케일링만큼 중요하거나 더 효과적인 축임을 시사합니다. 특히, **메모리 바운드에서 컴퓨팅 바운드**로의 전환을 통해 하드웨어 활용 효율성을 높여 **GPU 처리량을 두 배**로 늘릴 수 있음을 보여주어, 실제 배포 환경에서의 비용 효율적인 RL 훈련 전략 수립에 기여할 수 있습니다. 이는 복잡한 추론 문제 해결을 위한 **탐색의 중요성**을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.