---
title: "[논문리뷰] Don't Waste Mistakes: Leveraging Negative RL-Groups via Confidence
  Reweighting"
excerpt: "Julia Kempe이 [arXiv]에 게시한 'Don't Waste Mistakes: Leveraging Negative RL-Groups via Confidence
  Reweighting' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Reasoning Tasks
  - GRPO
  - Negative Samples
  - Reward Modeling
  - Confidence Reweighting
  - Mathematical Reasoning

permalink: /ai/review/2025-10-13-Dont-Waste-Mistakes-Leveraging-Negative-RL-Groups-via-Confidence-Reweighting/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08696)

**저자:** Yunzhen Feng, Parag Jain, Anthony Hartshorn, Yaqi Duan, Julia Kempe



## 핵심 연구 목표
본 논문은 **Group Relative Policy Optimization (GRPO)** 기반의 LLM(대규모 언어 모델) 추론 학습 과정에서 "음성 그룹"(모든 샘플이 오답인 경우)이 학습에 기여하지 않고 컴퓨팅 자원을 낭비하는 문제점을 해결하고자 합니다. 추가적인 지도 없이 이러한 음성 그룹을 효과적으로 활용하여 **RLVR(Reinforcement Learning with Verifiable Rewards)** 의 효율성과 성능을 향상시키는 것이 주된 목표입니다.

## 핵심 방법론
논문은 **MLE(최대 우도 추정)** 목표를 가진 보상 모델링에서 출발하여, MLE 그래디언트가 수정된 가치 함수의 정책 그래디언트와 동등함을 보입니다. 이 수정된 가치 함수는 **오답에 대해 확신도 가중치 페널티** 를 부과하며, 모델이 잘못된 답변에 대해 확신할수록 더 큰 페널티를 적용합니다. 이를 **LENS (Likelihood Estimation with Negative Samples)** 라고 명명하며, GRPO를 수정하여 오답 생성에 대해 **0이 아닌 확신도 의존적 보상** 을 할당합니다.

## 주요 결과
**MATH 벤치마크** 에서 **Llama-3.1-8B** 및 **Qwen-2.5-3B** 모델을 사용한 실험 결과, LENS는 GRPO 기준선보다 모든 **Pass@k 메트릭** 에서 일관되게 우수한 성능을 보였습니다. 특히, 어려운 문제(Levels 4-5)에서 상당한 성능 향상을 달성했습니다. 예를 들어, Llama-3.1-8B-Instruct에서 LENS는 **Pass@16 75.34%** 를 기록하여 GRPO의 **72.70%** 를 넘어섰습니다.

## AI 실무자를 위한 시사점
LENS는 RLVR 훈련에서 이전에 낭비되었던 음성 샘플들을 유용한 그래디언트 업데이트로 전환하여 효율성과 성능을 동시에 향상시키는 **원칙적이고 실용적인 방법** 을 제시합니다. 이는 특히 **어려운 추론 문제** 에 대한 LLM의 탐색 능력을 강화하여 과도한 확신을 가진 오답 모드를 억제하는 데 기여합니다. 기존 GRPO 파이프라인에 **플러그 앤 플레이 방식** 으로 적용 가능하며, 계산 오버헤드가 미미하여 실무에 쉽게 통합될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.