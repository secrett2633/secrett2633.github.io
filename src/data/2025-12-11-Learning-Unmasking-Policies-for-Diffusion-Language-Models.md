---
title: "[논문리뷰] Learning Unmasking Policies for Diffusion Language Models"
excerpt: "이 [arXiv]에 게시한 'Learning Unmasking Policies for Diffusion Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Reinforcement Learning
  - Masked Diffusion
  - Sampling Policy
  - Inference Optimization
  - Markov Decision Process
  - Generative AI
  - Text Generation

permalink: /ai/review/2025-12-11-Learning-Unmasking-Policies-for-Diffusion-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-11 00:00:00+0900+0900
last_modified_at: 2025-12-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.09106)

**저자:** Metod Jazbec, Theo X. Olausson, Louis Béthune, Pierre Ablin, Michael Kirchhof, Joao Monterio, Victor Turrisi, Jason Ramapuram, Marco Cuturi



## 핵심 연구 목표
마스킹된 이산 확산 언어 모델(dLLMs)에서 토큰 마스킹 해제(unmasking) 방식이 추론 효율성과 생성 품질에 중요한 영향을 미칩니다. 기존의 휴리스틱 기반 샘플링 전략은 수동 튜닝이 필요하고 대규모 버퍼 크기에서 성능 저하를 보이는 등 한계가 있어, 이 연구는 **강화 학습(RL)** 을 활용하여 dLLM의 **적응형 샘플링 정책** 을 학습함으로써 이러한 한계를 극복하고 최신 휴리스틱의 성능을 능가하는 것을 목표로 합니다.

## 핵심 방법론
본 연구에서는 dLLM 샘플링 과정을 **Markov Decision Process (MDP)** 로 정형화하고, dLLM의 토큰 신뢰도를 마스킹 해제 결정에 매핑하는 **단일 레이어 Transformer 기반의 경량 정책 아키텍처** 를 제안했습니다. 정책 훈련은 **Group Relative Policy Optimization (GRPO)** 알고리즘을 사용했으며, 보상 함수는 생성의 정확도와 추론 속도(샘플링 단계 수)를 모두 고려하는 **곱셈형 보상 함수** ( **multiplicative reward function** )로 설계하여 학습 안정성을 높였습니다.

## 주요 결과
학습된 정책은 **semi-autoregressive 생성 설정** 에서 **Fast-dLLM** 과 같은 **최첨단 휴리스틱 샘플러** 의 성능과 동등했습니다. 특히 **full diffusion 설정** 에서는 휴리스틱을 능가하는 성능을 보였으며, **low-NFE(Network Function Evaluations) 영역** 에서 **Fast-dLLM** 보다 효율적으로 **GSM8k** 에서 **12 NFE** 로 **~50% 정확도** 를 달성했습니다 (휴리스틱은 ≤ 30% 이하). 또한, 학습된 정책은 새로운 dLLM 및 더 긴 시퀀스 길이( **L=256 → L=512** )에 대한 **전이 학습 능력** 을 보여주었으나, 도메인 외부 데이터에서는 성능이 저하되는 경향을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 **강화 학습** 을 통해 dLLM의 추론 과정을 **자동으로 최적화** 할 수 있는 강력한 방법을 제시하며, 이는 수동 튜닝 부담을 줄이고 **더욱 확장 가능하며 견고한 샘플링 메커니즘** 의 가능성을 열었습니다. 특히 **semi-AR 제약 없이** 높은 효율성과 품질을 동시에 달성해야 하는 시나리오에서 **RL 기반 정책** 이 기존 휴리스틱보다 유리할 수 있음을 시사합니다. AI 개발자는 **multiplicative reward function** 이 훈련 안정성에 기여하는 방식을 참고하여 RL 기반 시스템 설계에 활용할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.