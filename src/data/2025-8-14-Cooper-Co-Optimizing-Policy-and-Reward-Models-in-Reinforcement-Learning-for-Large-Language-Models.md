---
title: "[논문리뷰] Cooper: Co-Optimizing Policy and Reward Models in Reinforcement Learning
  for Large Language Models"
excerpt: "Guiyang Hou이 [arXiv]에 게시한 'Cooper: Co-Optimizing Policy and Reward Models in Reinforcement Learning
  for Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Reward Model
  - Policy Optimization
  - Reward Hacking
  - Hybrid Annotation
  - Mathematical Reasoning
  - Verifiable Rewards

permalink: /ai/review/2025-8-14-Cooper-Co-Optimizing-Policy-and-Reward-Models-in-Reinforcement-Learning-for-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-08-14 13:19:02+0900
last_modified_at: 2025-08-14 13:19:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.05613)

**저자:** Haitao Hong, Yuchen Yan, Xingyu Wu, Guiyang Hou, Wenqi Zhang, Weiming Lu, Yongliang Shen, Jun Xiao



## 핵심 연구 목표
대규모 언어 모델(LLMs)의 추론 능력 강화를 위한 강화 학습(RL) 시, 기존 보상 모델(Reward Model, RM)이 직면하는 두 가지 주요 문제인 **보상 해킹(reward hacking)** 과 **견고성 부족** 을 해결하는 것을 목표로 합니다. 특히, 모델 기반 보상은 보상 해킹에 취약하고, 규칙 기반 보상은 견고성이 부족하다는 한계를 극복하고자 합니다.

## 핵심 방법론
본 논문은 정책 모델과 보상 모델을 동시에 최적화하는 새로운 RL 프레임워크인 **Cooper** 를 제안합니다. **Cooper** 는 고정밀 규칙 기반 보상을 활용하여 정확한 응답을 식별하고, 이를 바탕으로 보상 모델의 지속적인 훈련을 위한 동적인 **긍정-부정 샘플 쌍** 을 구축합니다. 또한, 참조 답변을 입력으로 받는 **VerifyRM** 이라는 새로운 보상 모델을 훈련하며, 이는 **하이브리드 주석 전략** 을 통해 효율적으로 학습 데이터를 생성합니다.

## 주요 결과
**VerifyRM** 은 VerifyBench에서 **89.42%** 의 정확도를 달성하여 동일 규모의 기존 보상 모델들을 능가했습니다. **Cooper** 프레임워크를 적용한 결과, 정적 보상 모델이 **54.93%에서 38.91%로 성능이 급락** 하는 보상 해킹 현상을 효과적으로 완화하며, 최종적으로 Qwen2.5-1.5B-Instruct 모델의 평균 정확도를 **0.54%** 향상시켜 **58.02%** 를 달성했습니다. 이는 동적 보상 모델 업데이트가 보상 해킹 방지 및 전반적인 RL 성능 향상에 효과적임을 입증합니다.

## AI 실무자를 위한 시사점
본 연구는 LLM RL에서 **보상 해킹이 근본적인 문제** 임을 명확히 보여주며, 안정적인 RL 훈련을 위해서는 보상 모델을 **동적인 구성 요소** 로 취급하여 지속적으로 업데이트해야 함을 시사합니다. 또한, **규칙 기반 검증의 고정밀 특성** 을 활용한 **하이브리드 주석 전략** 은 고품질의 훈련 데이터를 효율적으로 생성하는 실용적인 방법을 제공하며, 이는 실제 AI 시스템의 신뢰성을 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.