---
title: "[논문리뷰] VCRL: Variance-based Curriculum Reinforcement Learning for Large
  Language Models"
excerpt: "Yuewei Zhang이 [arXiv]에 게시한 'VCRL: Variance-based Curriculum Reinforcement Learning for Large
  Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Curriculum Learning
  - Large Language Models
  - Mathematical Reasoning
  - Variance-based Sampling
  - Replay Learning
  - Policy Optimization

permalink: /ai/review/2025-9-26-VCRL-Variance-based-Curriculum-Reinforcement-Learning-for-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19803)

**저자:** Guochao Jiang, Wenfeng Feng, Guofeng Quan, Chuzhan Hao, Yuewei Zhang, Guohua Liu, Hao Wang*



## 핵심 연구 목표
기존 롤아웃 기반 강화 학습(RL) 방법론이 LLM의 동적인 학습 능력과 샘플 난이도를 효과적으로 매칭하지 못하는 문제를 해결하는 것이 목표입니다. 특히 수학적 추론 태스크에서 LLM의 효율적인 학습을 저해하는 고정된 난이도 샘플링과 불안정한 훈련을 개선하고자 합니다.

## 핵심 방법론
본 논문은 **VCRL(Variance-based Curriculum Reinforcement Learning)** 프레임워크를 제안합니다. 이 방법은 롤아웃 그룹의 보상 분산을 통해 샘플 난이도를 동적으로 측정하는 **Variance-based Dynamic Sampling** 을 사용하여, 현재 모델에게 *너무 쉽거나 어려운* 샘플 대신 *중간 난이도*의 학습에 가장 가치 있는 샘플을 선별합니다. 여기에 **Replay Learning** 과 *메모리 뱅크*를 결합하여 높은 분산 값을 가진 샘플을 유지 및 재활용하며, GRPO(Group Relative Policy Optimization) 목표 함수를 수정하여 학습 안정성과 효율성을 높입니다.

## 주요 결과
**VCRL** 은 5개의 수학 벤치마크(AIME-2024, AIME-2025, MATH500, OlympiadBench, AMC23)에서 **Qwen3-4B-Base** 및 **Qwen3-8B-Base** 모델을 사용하여 기존 RL 방법론 대비 뛰어난 성능을 입증했습니다. 특히 **Qwen3-8B-Base** 모델에서 **VCRL** 은 평균 점수 **57.76%** 를 달성하여 최강의 베이스라인인 **GSPO(53.09%)** 보다 **4.67%p** 높은 성능을 보였으며, **Qwen3-4B-Base** 에서는 평균 성능이 **26.68%(Base Model)** 에서 **49.43%** 로 크게 향상되었습니다. 훈련 중 **더 높은 보상 점수** 와 **안정적인 기울기 노름** 을 보여 훈련 효율성과 안정성이 개선됨을 확인했습니다.

## AI 실무자를 위한 시사점
**VCRL** 은 LLM이 복잡한 수학적 추론 능력을 습득하는 데 있어 효과적인 **강화 학습 기반 미세 조정 전략** 을 제공합니다. 샘플 난이도를 동적으로 조절하고 중요한 학습 샘플에 집중하는 능력은 **LLM 훈련의 효율성과 안정성** 을 크게 향상시킬 수 있어, 자원 제약이 있는 환경에서도 고성능 LLM을 개발하는 데 기여합니다. 특히, **모델의 현재 능력에 맞춰 학습 데이터를 선별** 하는 접근 방식은 범용적인 RL 문제에도 적용 가능성이 높습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.