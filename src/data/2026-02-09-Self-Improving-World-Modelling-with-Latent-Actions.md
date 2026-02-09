---
title: "[논문리뷰] Self-Improving World Modelling with Latent Actions"
excerpt: "Anna Korhonen이 [arXiv]에 게시한 'Self-Improving World Modelling with Latent Actions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Modeling
  - Latent Actions
  - Self-Improvement
  - Reinforcement Learning
  - LLMs
  - VLMs
  - Inverse Dynamics Model
  - Forward World Modelling

permalink: /ai/review/2026-02-09-Self-Improving-World-Modelling-with-Latent-Actions/

toc: true
toc_sticky: true

date: 2026-02-09 00:00:00+0900+0900
last_modified_at: 2026-02-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.06130)

**저자:** Yifu Qiu, Zheng Zhao, Waylon Li, Yftah Ziser, Anna Korhonen, Shay B. Cohen, Edoardo M. Ponti



## 핵심 연구 목표
본 논문은 **액션이 레이턴트 변수로 취급되는 상태-온리 시퀀스** 로부터 LLM(Large Language Models) 및 VLM(Vision-Language Models)의 내재적 월드 모델링 능력을 향상시키는 것을 목표로 합니다. 이는 값비싼 **액션-레이블링된 궤적** 에 대한 의존성을 줄이고, 복잡한 환경에서의 추론 및 계획을 가능하게 하는 **강력하고 일반화 가능한 월드 모델** 을 학습하는 데 중점을 둡니다.

## 핵심 방법론
제안하는 프레임워크인 **SWIRL (Self-improving World modelling with Iterative RL)** 은 **FWM(Forward World Modelling)** 과 **IDM(Inverse Dynamics Model)** 을 상호 교차적으로 최적화합니다. **FWM** 은 사전 상태(X)와 레이턴트 액션(Z)이 주어졌을 때 다음 상태(Y)를 예측하고, **IDM** 은 상태 전환(X, Y)이 주어졌을 때 레이턴트 액션(Z)을 추론합니다. 학습은 **GRPO(Group Relative Policy Optimisation)** 를 사용하여 수행되며, 한 모델은 정책 역할을 하고 다른 모델은 보상 신호를 제공하는 방식으로 반복됩니다.

## 주요 결과
**SWIRL** 은 다양한 벤치마크에서 뛰어난 성능 향상을 달성했습니다. 특히, **AURORA-BENCH에서 16%** , **ByteMorph에서 28%** , **WORLDPREDICTIONBENCH에서 16%** , **STABLETOOLBENCH에서 14%** 의 성능 향상을 보였습니다. 이는 지도 학습 기반의 미세 조정(SFT) 기준선을 능가하며, 대규모 최신 모델과 동등한 성능을 입증하여 레이턴트 액션을 통한 자기 개선의 효과를 보여줍니다.

## AI 실무자를 위한 시사점
**SWIRL** 은 레이블링된 액션 데이터가 부족한 **개방형 환경** 에서 LLM/VLM의 월드 모델링을 가능하게 하는 확장 가능한 방법을 제공합니다. 이 접근 방식은 모델이 관찰된 상태 전환으로부터 **내재적인 다이내믹스** 를 학습하도록 유도하여, 모델의 추론 및 계획 능력을 향상시키는 데 기여합니다. AI 엔지니어는 **GRPO** 와 같은 강화 학습 기법을 활용한 **자기 개선 루프** 를 통해 데이터 효율성을 높이고 모델의 일반화 능력을 강화할 수 있는 실용적인 가이드를 얻을 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.