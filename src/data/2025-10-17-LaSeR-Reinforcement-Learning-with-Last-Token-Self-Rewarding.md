---
title: "[논문리뷰] LaSeR: Reinforcement Learning with Last-Token Self-Rewarding"
excerpt: "arXiv에 게시된 'LaSeR: Reinforcement Learning with Last-Token Self-Rewarding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM
  - Self-Verification
  - Last-Token
  - Reward Modeling
  - Efficiency
  - Reasoning
  - RLVR

permalink: /ai/review/2025-10-17-LaSeR-Reinforcement-Learning-with-Last-Token-Self-Rewarding/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14943)

**저자:** Wenkai Yang, Weijie Liu, Ruobing Xie, Yiju Guo, Lulu Wu, Saiyong Yang, Yankai Lin



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)의 추론 능력을 강화하는 **검증 가능한 보상 강화 학습(RLVR)** 의 한계, 즉 테스트 시점에서의 검증 신호 부족과 기존 자가 검증 방법론의 비효율성을 해결하고자 합니다. 특히, 솔루션과 자가 검증을 순차적으로 생성하는 방식이 초래하는 **추론 비용 증가 및 생성 비효율성** 문제를 극복하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **last-token self-rewarding score** 가 검증자 기반의 실제 추론 보상과 동일하다는 이론적 통찰을 제시합니다. 이를 바탕으로 **LaSeR (Reinforcement Learning with Last-Token Self-Rewarding)** 알고리즘을 제안하며, 이는 정책 모델의 마지막 토큰에 대한 **사전 정의된 특수 토큰의 다음 토큰 로그 확률 분포** 에서 자가 보상 점수를 추출합니다. 표준 RLVR 손실에 **평균 제곱 오차(MSE) 손실** 을 추가하여 자가 보상 점수와 검증자 기반 보상을 정렬함으로써 추론 및 자가 검증 능력을 **동시에 최적화** 합니다.

## 주요 결과
LaSeR는 **OctoThinker-3B-Short-Base** 모델의 평균 추론 정확도를 **30.8%에서 32.8%** 로, **Qwen2.5-7B-Base** 모델은 **41.8%에서 42.7%** 로 향상시키는 등, 다양한 수학 추론 벤치마크에서 모델의 추론 성능을 효과적으로 개선했습니다. 동시에, 자가 검증 F1 점수는 **OctoThinker에서 72.5%** , **Qwen2.5-7B에서 79.6%** 에 도달하며, **단 하나의 추가 토큰 추론** 이라는 최소한의 비용으로 최첨단 외부 검증자들과 동등하거나 더 나은 성능을 달성했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 **테스트 시점에 자체 솔루션을 효율적으로 평가** 할 수 있는 실용적인 방법을 제공하며, 이는 외부 검증이 불가능한 실제 시나리오에서 중요합니다. **추가 계산 비용을 거의 발생시키지 않으면서** 모델의 신뢰도 보정 능력과 추론 성능을 향상시키는 것이 가능함을 보여줍니다. AI/ML 엔지니어는 LaSeR를 활용하여 모델의 자가 평가 기능을 통합하고, 더욱 견고하고 신뢰할 수 있는 LLM 기반 시스템을 구축할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.