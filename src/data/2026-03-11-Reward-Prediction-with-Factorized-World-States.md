---
title: "[논문리뷰] Reward Prediction with Factorized World States"
excerpt: "Hongbo Zhao이 arXiv에 게시한 'Reward Prediction with Factorized World States' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reward Prediction
  - World Models
  - State Representation
  - Large Language Models
  - Zero-shot Learning
  - Reinforcement Learning
  - Planning
  - Factorization

permalink: /ai/review/2026-03-11-Reward-Prediction-with-Factorized-World-States/

toc: true
toc_sticky: true

date: 2026-03-11 00:00:00+0900+0900
last_modified_at: 2026-03-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.09400)

**저자:** Yijun Shen, Delong Chen, Xianming Hu, Jiaming Mi, Hongbo Zhao, Kai Zhang, Pascale Fung



## 핵심 연구 목표
본 연구는 AI 에이전트가 새로운 목표와 환경에 걸쳐 일반화할 수 있는 **정확하고 일반화 가능한 보상 예측 모델** 을 개발하는 것을 목표로 합니다. 특히 훈련 데이터의 편향과 일반화 한계가 있는 기존 지도학습 기반 보상 모델의 문제를 해결하고, 미세한 단계별 보상 평가를 위한 벤치마크 부족을 해소하고자 합니다.

## 핵심 방법론
저자들은 비정형적인 관측값을 계층적인 객체-속성 구조로 변환하는 **STATEFACTORY** 라는 **요인화된 상태 표현 방법론** 을 제안합니다. 이 구조화된 표현을 통해 보상은 현재 상태와 목표 상태 간의 **의미적 유사성** 을 측정하여 예측됩니다. 또한, 5가지 상이한 텍스트 기반 환경에서 **2,454개의 고유한 행동-관측 궤적** 과 단계별 Ground-Truth 보상을 포함하는 새로운 벤치마크 데이터셋인 **REWARDPREDICTION** 을 구축하여 방법론을 평가했습니다.

## 주요 결과
**STATEFACTORY** 는 **REWARDPREDICTION** 벤치마크에서 기존 **VLWM-critic** 및 **LLM-as-a-Judge** 보상 모델 대비 각각 **60%** 및 **8%** 더 낮은 **EPIC distance** 를 달성하며 우수한 zero-shot 성능을 보였습니다. 이러한 보상 예측 품질 향상은 에이전트 계획 성능으로 이어져, **AlfWorld** 에서 **+21.64%** , **ScienceWorld** 에서 **+12.40%** 의 성공률 증가를 기록했습니다.

## AI 실무자를 위한 시사점
**STATEFACTORY** 는 LLM을 활용한 **구조화된 상태 표현** 을 통해 **zero-shot 환경** 에서 에이전트의 보상 예측 및 계획 능력을 크게 향상시킬 수 있음을 보여줍니다. 이는 **대규모 시행착오 없이** 복잡한 작업에서 일반화 가능한 에이전트를 개발하는 데 중요한 기여를 할 수 있습니다. 또한, **REWARDPREDICTION 벤치마크** 는 AI 실무자들이 미세한 보상 신호의 품질을 체계적으로 평가하고, 더욱 견고한 **AI 에이전트 시스템** 을 구축하는 데 필수적인 자원으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.