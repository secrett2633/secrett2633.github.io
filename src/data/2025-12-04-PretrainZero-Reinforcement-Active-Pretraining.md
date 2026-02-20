---
title: "[논문리뷰] PretrainZero: Reinforcement Active Pretraining"
excerpt: "Guoqi Li이 arXiv에 게시한 'PretrainZero: Reinforcement Active Pretraining' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Active Learning
  - Pretraining
  - Large Language Models
  - Self-Supervised Learning
  - Masked Language Modeling
  - Generalization
  - Reasoning

permalink: /ai/review/2025-12-04-PretrainZero-Reinforcement-Active-Pretraining/

toc: true
toc_sticky: true

date: 2025-12-04 00:00:00+0900+0900
last_modified_at: 2025-12-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.03442)

**저자:** Xingrun Xing, Zhiyuan Fan, Jie Lou, Guoqi Li, Jiajun Zhang, Debing Zhang



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)의 사전 훈련 과정에서 **강화 학습(RL)** 을 활용하여 일반적인 추론 능력을 향상하고, 도메인 특정적인 검증 가능한 보상에 대한 의존성을 줄이는 것을 목표로 합니다. 특히, 기존 RL 방식이 직면한 **데이터 부족 문제(data-wall)** 를 극복하고, 인간의 능동적 학습 방식에 영감을 받아 사전 훈련 코퍼스에서 효과적인 학습 신호를 추출하고자 합니다.

## 핵심 방법론
논문은 **PretrainZero** 라는 강화 능동 학습(Reinforcement Active Learning) 프레임워크를 제안합니다. 이는 **능동적 사전 훈련(Active Pretraining)** 을 통해 사전 훈련 코퍼스에서 합리적이고 정보적인 콘텐츠를 식별하고, **자가 지도 학습(Self-supervised learning)** 방식으로 3~30B 파라미터 기반 모델을 Wikipedia 코퍼스에 직접 RL로 사전 훈련합니다. 이 과정에서 **마스크 생성(Mask Generation)** 과 **마스크 예측(Mask Prediction)** 이라는 두 가지 상호 대립적인 태스크를 **min-max bilevel RL objective** 로 **GRPO** 를 활용하여 최적화합니다.

## 주요 결과
PretrainZero는 사전 훈련 단계에서 **Qwen3-4B-Base 모델** 의 성능을 MMLU-Pro에서 **8.43%** , SuperGPQA에서 **5.96%** , 수학 평균 벤치마크에서 **10.60%** 향상시켰습니다. 후속 RLVR(Reinforcement Learning with Verifiable Rewards) 작업에서는 MMLU-Pro에서 **2.35%** , SuperGPQA에서 **3.04%** , 수학 평균에서 **2.81%** 의 지속적인 성능 향상을 보였습니다. 또한, Random RLPT 대비 Qwen3-4B, Qwen3-8B, Qwen3-30B-A3B-MoE, SmolLM3-3B 모델 전반에 걸쳐 **4.20~3.16% 포인트** 의 일관된 우위를 보였습니다.

## AI 실무자를 위한 시사점
**PretrainZero** 는 RL 기반 LLM 사전 훈련이 고비용의 검증 데이터나 지도 미세 조정 없이도 실제 원시 데이터에서 직접 적용될 수 있음을 보여줍니다. 이는 **일반적인 추론 능력** 을 가진 강력한 파운데이션 모델 개발 비용을 절감할 수 있는 잠재력을 제공합니다. 능동적 학습 메커니즘은 정보 밀도가 낮은 사전 훈련 코퍼스에서도 효율적인 학습을 가능하게 하여, 기존 RL 기반 방법론의 한계를 극복하는 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.