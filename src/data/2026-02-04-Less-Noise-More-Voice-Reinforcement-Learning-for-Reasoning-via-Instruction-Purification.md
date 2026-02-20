---
title: "[논문리뷰] Less Noise, More Voice: Reinforcement Learning for Reasoning via Instruction Purification"
excerpt: "arXiv에 게시된 'Less Noise, More Voice: Reinforcement Learning for Reasoning via Instruction Purification' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Reasoning
  - Instruction Purification
  - Interference Tokens
  - Sample Efficiency
  - Policy Optimization
  - Verifiable Rewards

permalink: /ai/review/2026-02-04-Less-Noise-More-Voice-Reinforcement-Learning-for-Reasoning-via-Instruction-Purification/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.21244)

**저자:** Yiju Guo, Tianyi Hu, Zexu Sun, Yankai Lin



## 핵심 연구 목표
대규모 언어 모델(LLM) 추론을 위한 **RLVR (Reinforcement Learning with Verifiable Rewards)** 의 비효율적인 탐색 문제를 해결하는 것을 목표로 합니다. 특히 제한된 롤아웃 예산으로 인한 낮은 샘플링 성공률과 복잡한 태스크에서의 불안정한 훈련을 야기하는, 프롬프트 내 소수의 '간섭 토큰' 제거를 통해 이러한 문제를 극복하고자 합니다.

## 핵심 방법론
본 논문은 **LENS (Less Noise Sampling Framework)** 를 제안합니다. LENS는 먼저 현재 정책과 참조 모델 간의 **토큰 수준 편차(Interference Score)** 를 측정하여 저성공 프롬프트 내의 **간섭 토큰** 을 식별하고 제거합니다. 이후, 정화된 프롬프트에서 생성된 성공적인 롤아웃을 사용하여 원래의 노이즈가 있는 프롬프트에 대한 정책 최적화를 감독하는 **Calibrated Rollout Policy Optimization (CRPO)** 을 수행하여 모델이 실제 노이즈 환경에서 간섭을 무시하도록 학습시킵니다.

## 주요 결과
LENS는 기존 GRPO 대비 평균 **3.88%의 성능 향상** 과 **1.6배 이상의 빠른 수렴 속도** 를 달성하며 7가지 수학 추론 벤치마크에서 뛰어난 성능을 보였습니다. 특히, MATH-500 및 OlympiadBench에서 GRPO와 동일한 최고 정확도를 달성하면서도 각각 **1.67배 및 1.64배 적은 그래디언트 스텝** 만 필요로 하여 샘플 효율성을 크게 개선했습니다.

## AI 실무자를 위한 시사점
**RLHF 훈련의 효율성** 을 획기적으로 개선하여, 특히 복잡한 추론 태스크에서 LLM의 훈련 안정성과 성능을 향상시킬 수 있습니다. 프롬프트 내 **소수의 간섭 토큰 제거** 만으로도 모델의 탐색 능력을 대폭 증진시킬 수 있음을 보여주어, LLM 기반 에이전트 개발 시 **입력 프롬프트의 품질 관리** 에 대한 새로운 관점을 제공합니다. LENS는 기존 RLVR 프레임워크에 쉽게 통합될 수 있어, **견고하고 신뢰할 수 있는 LLM 추론 시스템** 구축에 기여할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.