---
title: "[논문리뷰] Composition-RL: Compose Your Verifiable Prompts for Reinforcement Learning of Large Language Models"
excerpt: "이 [arXiv]에 게시한 'Composition-RL: Compose Your Verifiable Prompts for Reinforcement Learning of Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Prompt Engineering
  - Compositional Generalization
  - Verifiable Rewards
  - Curriculum Learning
  - Mathematical Reasoning
  - Multi-task Learning

permalink: /ai/review/2026-02-13-Composition-RL-Compose-Your-Verifiable-Prompts-for-Reinforcement-Learning-of-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-02-13 00:00:00+0900+0900
last_modified_at: 2026-02-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12036)

**저자:** Xin Xu, Clive Bai, Kai Yang, Tianhao Chen, Yangkun Chen, Weijie Liu, Hao Chen, Yang Wang, Saiyong Yang, Can Yang



## 핵심 연구 목표
`RLVR` (Reinforcement Learning with Verifiable Rewards) 훈련 과정에서 발생하는 "쉬운" 프롬프트(pass rate 1)의 증가로 인한 비효율성을 해결하고, 제한된 검증 가능한 프롬프트를 더 잘 활용하여 모델의 추론 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 여러 문제를 새로운 검증 가능한 질문으로 자동으로 구성하는 **Composition-RL** 을 제안합니다. 이는 **Sequential Prompt Composition (SPC)** 과정을 통해 기존 프롬프트 `q1`과 `q2`를 변형하고 연결하여 새로운 복합 프롬프트 `q1:2`를 생성합니다. 특히, `solve_all` 비율이 높은 쉬운 프롬프트를 더 어렵고 유익한 훈련 데이터로 전환하여 `GRPO` 목적 함수를 최적화하며, 점진적으로 구성 깊이를 늘리는 **커리큘럼 학습** 방식을 도입하여 성능을 극대화합니다.

## 주요 결과
**Composition-RL** 은 다양한 모델 크기(4B-30B)에서 기존 데이터셋으로 훈련한 RL보다 일관되게 우수한 성능을 보였습니다. 특히, 수학 도메인에서는 최대 **+14.3%** , 멀티태스크 도메인에서는 최대 **+10.5%** 의 전체 평균 개선을 달성했습니다. **커리큘럼 Composition-RL** 은 `AIME24`에서 **37.9%** 를 기록하며 4B 모델로도 8B 규모의 기존 베이스라인들을 능가했습니다. 또한, 물리와 수학 문제를 합성하는 **교차 도메인 RL** 훈련에서 `MMLU-Pro`에서 **+4.3%** 의 향상을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **Composition-RL** 을 통해 제한된 고품질 프롬프트셋의 활용도를 극대화할 수 있습니다. 이는 새로운 데이터 수집 비용을 절감하면서 모델의 **합성적 일반화** 능력과 **암묵적 과정 감독** 효과를 통해 복잡한 추론 문제 해결 능력을 강화하는 데 기여합니다. 특히, **커리큘럼 학습** 과 **교차 도메인 프롬프트 합성** 은 다양한 도메인에서 모델의 견고성과 성능을 높이는 강력한 전략이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.