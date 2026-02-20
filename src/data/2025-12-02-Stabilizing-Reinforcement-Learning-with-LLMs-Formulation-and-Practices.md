---
title: "[논문리뷰] Stabilizing Reinforcement Learning with LLMs: Formulation and Practices"
excerpt: "arXiv에 게시된 'Stabilizing Reinforcement Learning with LLMs: Formulation and Practices' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Large Language Models (LLMs)
  - Policy Gradient
  - REINFORCE
  - Mixture-of-Experts (MoE)
  - Training Stability
  - Importance Sampling
  - Routing Replay
  - Off-policy Learning

permalink: /ai/review/2025-12-02-Stabilizing-Reinforcement-Learning-with-LLMs-Formulation-and-Practices/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.01374)

**저자:** Chujie Zheng, Junrong Lin, Kai Dang, Bowen Yu, An Yang, Mingze Li, Huiqiang Jiang, Junyang Lin, Yuqiong Liu, Jingren Zhou



## 핵심 연구 목표
본 논문은 LLM 기반 RL의 불안정성 문제를 해결하고, 시퀀스 레벨 보상을 토큰 레벨 최적화 목표로 효과적으로 근사하여 최적화할 수 있는 조건을 밝히는 것을 목표로 합니다. 특히, MoE 모델에서 동적 전문가 라우팅이 학습 안정성에 미치는 영향을 분석하고, 이를 완화하기 위한 실용적인 방법을 제시합니다.

## 핵심 방법론
연구진은 토큰 레벨 최적화 목표를 시퀀스 레벨 보상의 **1차 근사** 로 제안하며, 이 근사는 **훈련-추론 불일치** 와 **정책 노후화** 가 최소화될 때 유효함을 보였습니다. 안정적인 RL 훈련을 위해 **중요도 샘플링 보정** , **클리핑** , 그리고 MoE 모델을 위한 **Routing Replay (R2, R3)** 와 같은 기술들을 도입하여 실험했습니다. 실험은 **30B MoE 모델** 을 사용하고, **FP8 추론** 및 **BF16 훈련** 환경에서 **수학적 추론 태스크** 를 통해 수행되었습니다.

## 주요 결과
온-정책 훈련에서는 **중요도 샘플링 보정** 을 포함한 기본 정책 경사 하강 알고리즘인 **MiniRL** 이 가장 높은 안정성을 보였습니다. 오프-정책 업데이트를 도입할 때는 **클리핑** 과 **Routing Replay** 의 조합이 불안정성을 완화하는 데 필수적임을 확인했으며, 특히 **정책 노후화가 적을 때는 R2** , **많을 때는 R3** 가 더 효과적이었습니다. 훈련이 안정화되면, 초기 조건에 관계없이 유사한 최종 성능을 달성했으며, 이 연구는 **수십만 GPU 시간** 에 걸친 광범위한 실험으로 검증되었습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM을 사용한 RL 훈련의 안정성을 높이는 데 필수적인 이론적 통찰력과 실용적인 기법들을 제공합니다. 특히 **MoE 아키텍처** 를 사용하는 LLM에 RL을 적용할 때 발생하는 고유한 문제를 해결하기 위한 **Routing Replay** 와 같은 접근법은 실무에서 매우 유용할 것입니다. 훈련-추론 불일치와 정책 노후화를 최소화하는 것이 안정적인 학습의 핵심임을 강조하며, 장기적인 RL 훈련에서는 초기화 조건보다는 **학습의 안정성** 자체에 집중하는 것이 중요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.