---
title: "[논문리뷰] Data-Efficient RLVR via Off-Policy Influence Guidance"
excerpt: "Jiale Cheng이 [arXiv]에 게시한 'Data-Efficient RLVR via Off-Policy Influence Guidance' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning with Verifiable Rewards (RLVR)
  - Influence Functions
  - Data Selection
  - Off-Policy Learning
  - Curriculum Learning
  - Large Language Models (LLMs)
  - Sparse Random Projection
  - Data Efficiency

permalink: /ai/review/2025-11-4-Data-Efficient_RLVR_via_Off-Policy_Influence_Guidance/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26491)

**저자:** Erle Zhu, Dazhi Jiang, Yuan Wang, Xujun Li, Jiale Cheng, Yuxian Gu, Yilin Niu, Aohan Zeng, Jie Tang, Minlie Huang, Hongning Wang



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 추론 능력 향상을 위한 **Verifiable Rewards를 사용한 강화 학습(RLVR)**에서 데이터 선택의 비효율성을 해결하는 것을 목표로 합니다. 기존의 휴리스틱 기반 데이터 선택 방법론들이 이론적 보장 및 일반화 능력 부족으로 인해 비효율적인 점과, 온라인 영향 함수 추정의 높은 계산 비용으로 인한 적용의 어려움을 극복하고자 합니다.

## 핵심 방법론
본 연구는 각 데이터 포인트의 학습 목표에 대한 기여도를 추정하기 위해 **영향 함수**를 사용합니다. 온라인 정책 롤아웃의 막대한 계산 비용을 회피하기 위해, 미리 수집된 오프라인 궤적을 활용하는 **오프-정책 영향 추정** 기법을 도입합니다. 또한, LLM의 고차원 기울기를 효율적으로 관리하기 위해 **희소 랜덤 투영(Sparse Random Projection)**을 사용하여 차원을 축소하고 계산 효율성을 높이는 **CROPI(Curriculum RL with Off-Policy Influence guidance)** 프레임워크를 제안합니다.

## 주요 결과
**CROPI**는 **1.5B 모델**에서 전체 데이터셋 훈련 대비 **2.66배의 스텝 레벨 가속**을 달성했으며, 각 단계에서 데이터의 **10%**만 사용했습니다. 이는 대상 태스크에서 전체 데이터셋 학습 및 다른 데이터 선택 기준을 뛰어넘는 성능을 보여주며, 대상 외 태스크에서도 강력한 일반화 능력을 보였습니다. **희소 랜덤 투영**은 **0.1의 희소 비율**에서 순위 보존에서 약 **80%의 precision@10%**를 달성하여, 직접 투영 방식보다 우수함을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **LLM의 RLVR 훈련**에서 데이터 효율성을 극대화할 수 있는 이론적으로 근거한 실용적인 방법을 제시합니다. **오프-정책 기울기 추정**과 **희소 랜덤 투영**은 고비용의 롤아웃 없이도 영향 함수를 대규모 LLM에 적용 가능하게 하여, 훈련 시간과 자원 소모를 크게 줄일 수 있습니다. 이는 AI/ML 엔지니어들이 대규모 강화 학습 기반 모델을 보다 효율적으로 개발하고 배포하는 데 중요한 기여를 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.