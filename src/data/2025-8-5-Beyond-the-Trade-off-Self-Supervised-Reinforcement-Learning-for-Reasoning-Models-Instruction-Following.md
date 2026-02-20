---
title: "[논문리뷰] Beyond the Trade-off: Self-Supervised Reinforcement Learning for
  Reasoning Models' Instruction Following"
excerpt: "Jiaqing Liang이 arXiv에 게시한 'Beyond the Trade-off: Self-Supervised Reinforcement Learning for
  Reasoning Models' Instruction Following' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-Supervised RL
  - Instruction Following
  - Reasoning Models
  - Large Language Models
  - Reward Modeling
  - Curriculum Learning

permalink: /ai/review/2025-8-5-Beyond-the-Trade-off-Self-Supervised-Reinforcement-Learning-for-Reasoning-Models-Instruction-Following/

toc: true
toc_sticky: true

date: 2025-08-05 11:40:52+0900
last_modified_at: 2025-08-05 11:40:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.02150)

# Beyond the Trade-off: Self-Supervised Reinforcement Learning for Reasoning Models' Instruction Following

**저자:** Jiaqing Liang, Jie Zeng, Bowei Zhang, Qianyu He, Qingyu Ren



## 핵심 연구 목표
본 논문은 추론 모델에서 나타나는 추론 능력과 지시 따르기 능력 간의 **트레이드오프 문제** 를 해결하고자 합니다. 기존 접근법이 외부의 강력한 모델에 의존하여 비용 증가 및 접근성 제약을 야기하는 문제를 극복하고, 추론 모델 자체의 **내부 신호** 만을 활용하여 지시 따르기 능력을 향상시키는 **자체 지도(Self-Supervised) 강화 학습(RL) 프레임워크** 를 제안합니다.

## 핵심 방법론
제안하는 프레임워크는 세 단계로 구성됩니다. 첫째, **점진적 제약 커리큘럼(Incremental Constraint Curriculum)** 을 통해 복합 지시를 단순한 지시로 분해하여 조밀한 학습 신호를 제공하는 **다중 제약 지시 데이터셋** 을 구축합니다. 둘째, **제약별 이진 분류(Constraint-wise Binary Classification) 보상 모델** 을 자체 지도 방식으로 훈련하여 명시적 규칙으로 검증 가능한 **하드 제약** 과 의미 이해가 필요한 **소프트 제약** 모두에 대한 보상을 생성합니다. 마지막으로, **GRPO(Generative Reinforcement Learning with Policy Optimization) 알고리즘** 을 활용하여 정책 모델을 최적화합니다.

## 주요 결과
제안된 방법은 다양한 모델(예: **Qwen2.5-7B-Instruct** )의 지시 따르기 능력을 크게 향상시키며, **IFEval Pr.(L)** 점수를 **73.9에서 83.9** 로 개선했습니다. 동시에 **GPQA** , **AIME2024** , **MMLU-Pro** 와 같은 추론 벤치마크에서의 일반적인 능력은 유지되거나 심지어 향상됩니다. 특히, 자체 지도 보상 모델은 **LLM-as-a-judge** 방식보다 **인간 판단과의 높은 일치도** (Kendall's Tau **61.2** vs **73.2** )와 **빠른 추론 속도** (0.3s vs **35.7s** )를 보여줍니다.

## AI 실무자를 위한 시사점
본 연구는 고비용의 외부 모델 의존성 없이 대규모 언어 모델의 지시 따르기 능력을 향상시키는 **확장 가능하고 비용 효율적인** 방법을 제시합니다. **자체 지도 보상 모델링** 과 **커리큘럼 학습** 기법은 복잡한 제약 조건을 처리해야 하는 실제 AI 시스템 개발에 유용하며, **다중 제약 지시 따르기** 및 **복합 에이전트 태스크** 를 수행하는 추론 모델의 실용적 활용도를 높이는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.