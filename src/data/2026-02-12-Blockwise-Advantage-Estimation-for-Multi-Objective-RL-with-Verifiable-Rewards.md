---
title: "[논문리뷰] Blockwise Advantage Estimation for Multi-Objective RL with Verifiable Rewards"
excerpt: "이 [arXiv]에 게시한 'Blockwise Advantage Estimation for Multi-Objective RL with Verifiable Rewards' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLMs
  - Credit Assignment
  - Multi-Objective Optimization
  - Advantage Estimation
  - Calibration
  - Structured Generation
  - Group Relative Policy Optimization

permalink: /ai/review/2026-02-12-Blockwise-Advantage-Estimation-for-Multi-Objective-RL-with-Verifiable-Rewards/

toc: true
toc_sticky: true

date: 2026-02-12 00:00:00+0900+0900
last_modified_at: 2026-02-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.10231)

**저자:** Kirill Pavlenko, Alexander Golubev, Simon Karasik, Boris Yangel



## 핵심 연구 목표
**GRPO(Group Relative Policy Optimization)** 와 같은 기존 RL 방법론이 단일 스칼라 어드밴티지를 사용하여 구조화된 LLM 생성에서 목적 함수 간 간섭과 잘못된 크레딧 할당을 야기하는 문제를 해결하는 것이 목표입니다. 특히, 샘플링된 접두사에 따라 보상이 조건화되는 후반 블록에 대한 어드밴티지 추정의 비효율성을 개선하고자 합니다.

## 핵심 방법론
본 연구는 **Blockwise Advantage Estimation (BAE)** 을 제안하며, 각 목적 함수에 고유한 어드밴티지를 할당하고 해당 텍스트 블록에만 적용합니다. 핵심 기술은 **Outcome-Conditioned Baseline (OCB)** 으로, 중간 상태 값을 예측하기 위해 샘플을 접두사에서 파생된 중간 결과에 따라 계층화하여 비용이 많이 드는 몬테카를로 롤아웃 없이도 효과적인 베이스라인을 추정합니다.

## 주요 결과
**OCB** 는 몬테카를로 어드밴티지 추정치에 대한 **RMSE 오류** 를 다른 베이스라인보다 낮게 달성했습니다. 수학 문제 해결 및 불확실성 추정 태스크에서 **BAE+OCB** 는 **Expected Calibration Error (ECE)** 및 정확도 측면에서 최첨단 **RLCR(Reward-Designed Baseline)** 과 경쟁력 있는 성능을 보였습니다. 예를 들어, **Qwen2.5-3B-Instruct/MATH500** 에서 **ECE 0.030** 을 달성하여 RLCR의 **0.059** 보다 우수했습니다.

## AI 실무자를 위한 시사점
이 프레임워크는 LLM의 다중 목적 RL에 대한 더욱 모듈화되고 확장 가능한 접근 방식을 제공하여, 복잡하고 수동적인 보상 스칼라화의 필요성을 줄입니다. **BAE+OCB** 는 추가적인 추론 비용 없이 구조화된 LLM 출력의 세그먼트 수준 크레딧 할당을 효율적으로 최적화할 수 있어, 순차적인 하위 목표나 검증 가능한 출력을 포함하는 태스크에 특히 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.