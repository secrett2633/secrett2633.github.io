---
title: "[논문리뷰] InftyThink+: Effective and Efficient Infinite-Horizon Reasoning via Reinforcement Learning"
excerpt: "이 [arXiv]에 게시한 'InftyThink+: Effective and Efficient Infinite-Horizon Reasoning via Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Iterative Reasoning
  - Reinforcement Learning
  - Large Language Models
  - Context Management
  - Summarization
  - Chain-of-Thought
  - Efficiency
  - Mathematical Reasoning

permalink: /ai/review/2026-02-09-InftyThink-Effective-and-Efficient-Infinite-Horizon-Reasoning-via-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.06960)

**저자:** Yuchen Yan, Liang Jiang, Jin Jiang, Shuaicheng Li, Zujie Wen, Zhiqiang Zhang, Jun Zhou, Jian Shao, Yueting Zhuang, Yongliang Shen



## 핵심 연구 목표
대규모 추론 모델의 **Chain-of-Thought(CoT)** 방식이 직면한 **2차 비용, 컨텍스트 길이 제한, 'lost-in-the-middle' 현상** 으로 인한 추론 품질 저하 문제를 해결하는 것을 목표로 합니다. 특히, 반복적인 추론 과정에서 **언제, 무엇을, 어떻게 요약하고 추론을 재개할지** 를 최적으로 결정하여 무한한 추론 능력을 효과적이고 효율적으로 달성하고자 합니다.

## 핵심 방법론
저자들은 **InftyThink+** 라는 종단간 **강화 학습(RL) 프레임워크** 를 제안합니다. 이 프레임워크는 **모델이 제어하는 반복 경계** 와 **명시적 요약** 을 기반으로 전체 반복 추론 궤적을 최적화합니다. 훈련은 **지도 학습(SFT) 기반의 콜드 스타트** 로 기본적인 반복 추론 형식을 익힌 후, **궤적 수준의 강화 학습** 을 통해 전략적 요약 및 연속 결정 능력을 학습합니다. **Group Relative Policy Optimization (GRPO)** 과 효율성 보상을 포함하는 **멀티플리케이션(multiplicative) 보상 설계** 를 사용하여 모델을 훈련시킵니다.

## 주요 결과
**InftyThink+** 는 **AIME24** 벤치마크에서 정확도를 **21%** 향상시켰으며, 기존 긴 CoT 기반 RL 대비 **9%** 추가 성능 향상을 달성했습니다. **GPQA_diamond** 같은 분포 외 벤치마크에서도 정확도를 **5%** 높였습니다. 또한, **AIME25** 에서 추론 지연 시간을 **32.8%** 감소시켰고, RL 훈련 속도도 표준 RL 대비 **18.2%** 단축하여 효율성 개선을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM이 복잡하고 장기적인 추론 작업을 수행할 때 **컨텍스트 창의 한계를 극복** 하고 **추론 효율성** 을 크게 높일 수 있는 실용적인 방법론을 제시합니다. **명시적인 반복 요약과 강화 학습 기반의 전략 최적화** 는 'lost-in-the-middle' 문제를 완화하고, 특히 **수학적 추론** 과 같은 정교한 멀티스텝 추론이 필요한 도메인에서 모델의 신뢰성을 향상시킬 수 있습니다. 이는 AI 에이전트 개발 및 복잡한 문제 해결 시스템 설계에 중요한 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.