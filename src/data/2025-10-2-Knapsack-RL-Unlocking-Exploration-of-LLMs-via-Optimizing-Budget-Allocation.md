---
title: "[논문리뷰] Knapsack RL: Unlocking Exploration of LLMs via Optimizing Budget
  Allocation"
excerpt: "이 [arXiv]에 게시한 'Knapsack RL: Unlocking Exploration of LLMs via Optimizing Budget
  Allocation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Reinforcement Learning (RL)
  - Exploration Budget Allocation
  - Knapsack Problem
  - Group Relative Policy Optimization (GRPO)
  - Mathematical Reasoning
  - Resource Optimization

permalink: /ai/review/2025-10-2-Knapsack-RL-Unlocking-Exploration-of-LLMs-via-Optimizing-Budget-Allocation/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25849)

**저자:** Ziniu Li, Congliang Chen, Tianyun Yang, Ding Tian, Ruoyu Sun, Ge Zhang, Wenhao Huang, Zhi-Quan Luo



## 핵심 연구 목표
본 연구는 LLM의 RL 기반 자기 개선 과정에서 발생하는 높은 연산 비용과 비효율적인 탐색 예산 할당 문제를 해결하고자 합니다. 특히, **GRPO** 와 같은 알고리즘에서 쉬운 태스크는 과포화, 어려운 태스크는 실패로 인해 **제로 기울기** 가 발생하는 문제를 개선하여, 제한된 연산 자원 내에서 탐색 효율성을 극대화하는 최적의 예산 할당 전략을 제안합니다.

## 핵심 방법론
각 태스크의 탐색 과정을 고유한 '가치'(학습 잠재력)와 '비용'(연산 노력)을 가진 '아이템'으로 간주하여, 고전적인 **배낭 문제(knapsack problem)** 에 비유하는 프레임워크를 제안합니다. 태스크의 가치는 **ProbNonZeroGradient** (비제로 기울기 발생 확률)와 **InfoGain** (예상되는 성공 확률 증가)의 곱으로 정의되며, **Qwen** 시리즈 모델과 **DAPO-MATH-17K** 데이터셋을 사용하여 검증되었습니다.

## 주요 결과
제안된 **Knapsack RL** 방법론은 훈련 중 비제로 정책 기울기의 유효 비율을 **20-40%** 증가시켰습니다. 수학적 추론 벤치마크에서 평균 **2-4점** 의 성능 향상과 특정 태스크에서 최대 **9점** 의 향상을 달성했으며, 기존 균일 할당 방식 대비 약 **2배 적은 연산 자원** 으로 유사한 성능을 보였습니다. 특히, 일부 도전적인 문제에는 **93롤아웃** 과 같은 대규모 예산 할당이 가능해졌습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 RL 학습에서 **탐색 자원의 효율적 배분** 을 위한 실용적인 솔루션을 제공합니다. 기존 인프라 수정 없이 **"연산 자원 무료 증대(computational free lunch)"** 효과를 가져와, 제한된 GPU 자원으로도 LLM의 성능 향상을 가속화할 수 있습니다. 이는 특히 수학적 추론과 같은 복잡한 문제 해결 능력을 강화하는 데 중요한 기여를 할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.