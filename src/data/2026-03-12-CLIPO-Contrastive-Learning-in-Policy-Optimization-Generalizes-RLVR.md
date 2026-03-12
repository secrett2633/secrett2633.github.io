---
title: "[논문리뷰] CLIPO: Contrastive Learning in Policy Optimization Generalizes RLVR"
excerpt: "Jiajun Song이 arXiv에 게시한 'CLIPO: Contrastive Learning in Policy Optimization Generalizes RLVR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Verifiable Rewards (RLVR)
  - Contrastive Learning (CL)
  - Policy Optimization
  - Large Language Models (LLMs)
  - Generalization
  - Robustness
  - Reasoning Tasks

permalink: /ai/review/2026-03-12-CLIPO-Contrastive-Learning-in-Policy-Optimization-Generalizes-RLVR/

toc: true
toc_sticky: true

date: 2026-03-12 00:00:00+0900+0900
last_modified_at: 2026-03-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.10101)

**저자:** Sijia Cui*1,2, Pengyu Cheng¹¹, Jiajun Song¹, Yongbo Gai¹, Guojun Zhang¹, Zhechao Yu¹, Jianhe Lin¹, Xiaoxi Jiang¹ and Guanjun Jiang¹



## 핵심 연구 목표
본 논문은 **RLVR(Reinforcement Learning with Verifiable Rewards)** 이 최종 결과에만 의존하여 중간 추론 단계의 정확성을 무시함으로써 모델의 일반화 및 견고성 저하, 환각 등의 문제를 야기하는 한계를 해결하고자 합니다. 이를 위해 성공적인 추론 경로 간의 불변적인 구조를 포착하는 **대조 학습(Contrastive Learning)** 메커니즘을 RLVR에 통합하여 LLM의 추론 능력을 강화하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **CLIPO (Contrastive Learning in Policy Optimization)** 프레임워크를 제안하여 기존 정책 최적화에 그룹 내 대조 보상(intra-group contrastive reward)을 통합합니다. **경량 대조 헤드(lightweight contrastive head)** 를 LLM 백본에 추가하여 추론 궤적을 임베딩 공간으로 투영하고, **InfoNCE 목적 함수** 를 사용하여 성공적인 궤적 간의 유사성을 최대화하고 오류 궤적과 분리합니다. 이 대조 손실은 희소한 결과 기반 피드백을 보완하는 **밀집 보조 보상 신호** 로 재활용되며, 보상 `r`은 `r_i + λ · max(-L_CL(x, y_i), -0.5)`로 정의됩니다.

## 주요 결과
**CLIPO** 는 다양한 추론 벤치마크에서 여러 **RLVR** 기준선 대비 일관된 성능 향상을 보였습니다. 특히, **Track I (GSM8K 및 일반 추론)** 에서 **GRPO+CLIPO** 는 **63.26%** 의 최고 평균 점수를 달성했으며, **GSM8K-P1에서 +1.48점, GSM8K-P2에서 +3.36점** 개선되었습니다. **Track II (경쟁 수준 수학 추론)** 에서는 **DAPO+CLIPO** 가 **44.05%** 로 가장 높은 평균 점수를 기록하며, 모든 **RLVR** 기준선을 능가했습니다. 대조 헤드 최적화, **InfoNCE 손실** 사용, 낮은 온도(예: **τ=0.02** ) 및 큰 그룹 크기가 성능 향상에 필수적임이 입증되었습니다.

## AI 실무자를 위한 시사점
**CLIPO** 는 LLM의 추론 모델을 개선하기 위한 실용적인 접근 방식을 제공하여, 비용이 많이 드는 수동 주석 없이도 희소한 보상 환경에서 모델의 일반화 및 견고성을 향상시킬 수 있습니다. 특히, 분포 변화가 있는 문제나 복잡한 추론 작업에서 **CLIPO** 의 **밀집 보상 신호** 는 LLM이 보다 논리적으로 일관된 추론을 학습하도록 유도합니다. 이 프레임워크는 코드 생성 및 에이전트 계획과 같은 다른 구조화된 도메인에도 적용 가능하여 **더욱 신뢰성 있고 일반화된 AI 추론** 을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.