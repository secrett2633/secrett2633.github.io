---
title: "[논문리뷰] Harder Is Better: Boosting Mathematical Reasoning via Difficulty-Aware GRPO and Multi-Aspect Question Reformulation"
excerpt: "arXiv에 게시된 'Harder Is Better: Boosting Mathematical Reasoning via Difficulty-Aware GRPO and Multi-Aspect Question Reformulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Mathematical Reasoning
  - Difficulty-Aware Optimization
  - Data Augmentation
  - Policy Optimization
  - LLMs
  - GRPO
  - MQR

permalink: /ai/review/2026-01-29-Harder-Is-Better-Boosting-Mathematical-Reasoning-via-Difficulty-Aware-GRPO-and-Multi-Aspect-Question-Reformulation/

toc: true
toc_sticky: true

date: 2026-01-29 00:00:00+0900+0900
last_modified_at: 2026-01-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.20614)

**저자:** Yanqi Dai, Yuxiang Ji, Xiao Zhang, Yong Wang, Xiangxiang Chu, Zhiwu Lu



## 핵심 연구 목표
대규모 언어 모델(LLMs)의 수학적 추론 능력을 강화하기 위해 기존 RLVR(Reinforcement Learning with Verifiable Rewards) 방법론이 어려운 문제에 대한 학습을 충분히 다루지 못하는 한계를 해결하는 것을 목표로 합니다. 특히, 기존 **GRPO** 알고리즘의 업데이트 불균형과 데이터 증강 방식의 난이도 증가 부족 문제를 개선하고자 합니다.

## 핵심 방법론
본 논문은 **MathForge** 라는 투트랙 프레임워크를 제안합니다. 알고리즘적으로는 **Difficulty-Aware Group Policy Optimization (DGPO)** 를 통해 **GRPO** 의 내재된 불균형을 해결하고 어려운 질문에 가중치를 부여합니다. 데이터 측면에서는 **Multi-Aspect Question Reformulation (MQR)** 전략을 사용하여 이야기 배경 추가, 추상 용어 도입, 하위 문제 중첩 등 다양한 관점에서 질문 난이도를 높이되 원본 답을 유지하도록 질문을 재구성합니다.

## 주요 결과
**Qwen2.5-Math-7B** 모델을 **MATH 데이터셋** 에 적용한 결과, **MathForge** 는 평균 **42.17%** 의 정확도를 달성하여 기존 **GRPO** 의 **37.61%** 를 크게 상회했습니다. 단일 구성 요소로서 **DGPO** 는 **39.79%** 를 기록하여 **GRPO** 대비 **2.18%** 향상되었고, **MQR** 만 사용했을 때는 **41.04%** 를 달성하여 **GRPO** 대비 **3.43%** 향상되었습니다. MQR로 생성된 질문들이 실제로 더 어려운 것으로 확인되었습니다(예: Sub-Problem 정확도 **72.04%** vs. Original **79.77%** ).

## AI 실무자를 위한 시사점
본 연구는 LLM의 추론 능력 향상에 있어 **어려운 문제를 의도적으로 학습** 하는 것이 중요하다는 실용적인 통찰을 제공합니다. 제안된 **DGPO** 는 다른 정책 최적화 방법론과도 호환되며, **MQR** 은 다양한 LLM을 활용하여 고품질의 어려운 훈련 데이터를 효과적으로 생성할 수 있어 **알고리즘 및 데이터 측면의 개선** 에 대한 일반적인 접근 방식을 제시합니다. 이는 수학적 추론뿐만 아니라 다른 복잡한 추론 태스크에도 적용 가능할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.