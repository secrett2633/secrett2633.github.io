---
title: "[논문리뷰] Learning on the Job: Test-Time Curricula for Targeted Reinforcement
  Learning"
excerpt: "이 [arXiv]에 게시한 'Learning on the Job: Test-Time Curricula for Targeted Reinforcement
  Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Test-Time Curriculum
  - Reinforcement Learning
  - Large Language Models
  - Self-Curated Learning
  - Continual Learning
  - Reasoning Benchmarks
  - Adaptive Training

permalink: /ai/review/2025-10-7-Learning-on-the-Job-Test-Time-Curricula-for-Targeted-Reinforcement-Learning/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04786)

**저자:** Jonas Hübotter, Leander Diaz-Bone, Ido Hakimi, Andreas Krause, Moritz Hardt



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)이 **테스트 시점에 표적 작업을 해결하는 추론 능력을 지속적으로 향상**시키는 방법을 제안합니다. 특히, 시간 소모적인 인간의 데이터셋 큐레이션 없이, LLM이 **사용 가능한 방대한 훈련 데이터 풀에서 가장 작업 관련성이 높은 데이터를 자동으로 선택하여 자체 큐리큘럼을 생성**함으로써 이러한 학습을 가능하게 하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **테스트 시점 큐리큘럼(TTC-RL)** 에이전트는 타겟 작업이 주어졌을 때 **SIFT(Self-Information-theoretic Feature Selection)**를 사용하여 관련 학습 작업을 자체적으로 선택합니다. 이후 모델은 이러한 자체 큐리큘럼을 통해 **GRPO(Grouped Reinforcement Policy Optimization)** 기반의 **강화 학습(RL)**을 수행하여 경험을 모델의 가중치로 압축합니다. 학습 신호를 최적화하기 위해 작업 난이도와 관련성을 균형 맞추는 **autobalancing achievability** 기법도 통합되었습니다.

## 주요 결과
TTC-RL은 다양한 모델과 평가 전반에서 모델의 **성능을 일관되게 향상**시켰습니다. 특히, 도전적인 수학 및 코딩 벤치마크에서 **Qwen3-8B 모델의 pass@1을 AIME25에서 약 1.8배, CodeElo에서 2.1배 개선**했습니다. 또한, 초기 모델 대비 **성능 상한선(pass@8)을 AIME25에서 40%에서 62%로, CodeElo에서 28%에서 43%로 크게 상승**시켰습니다.

## AI 실무자를 위한 시사점
TTC-RL은 LLM이 **테스트 시점에 지속적으로 학습하고 전문화**될 수 있는 유망한 방향을 제시하며, **수동 데이터 큐레이션의 필요성을 줄일** 수 있음을 보여줍니다. 이 방법론은 기존의 테스트 시점 스케일링 방식에 보완적이며, **제한된 컨텍스트 길이에서도 모델의 추론 능력을 강화**하는 데 기여할 수 있습니다. 궁극적으로 AI 개발자들은 TTC-RL을 활용하여 더욱 적응력 있고 강력한 AI 에이전트를 구축할 수 있을 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.