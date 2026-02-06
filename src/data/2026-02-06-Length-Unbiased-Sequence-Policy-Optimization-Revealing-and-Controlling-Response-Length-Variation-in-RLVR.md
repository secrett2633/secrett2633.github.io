---
title: "[논문리뷰] Length-Unbiased Sequence Policy Optimization: Revealing and Controlling Response Length Variation in RLVR"
excerpt: "Zhixiong Zeng이 [arXiv]에 게시한 'Length-Unbiased Sequence Policy Optimization: Revealing and Controlling Response Length Variation in RLVR' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning with Verifiable Rewards
  - LLMs
  - Policy Optimization
  - Response Length Bias
  - Sequence-level Clipping
  - Length-Unbiased Optimization
  - Multimodal Reasoning

permalink: /ai/review/2026-02-06-Length-Unbiased-Sequence-Policy-Optimization-Revealing-and-Controlling-Response-Length-Variation-in-RLVR/

toc: true
toc_sticky: true

date: 2026-02-06 00:00:00+0900+0900
last_modified_at: 2026-02-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.05261)

**저자:** Fanfan Liu, Youyang Yin, Peng Shi, Siqi Yang, Zhixiong Zeng, Haibo Qiu



## 핵심 연구 목표
본 논문은 Reinforcement Learning with Verifiable Rewards (RLVR) 훈련 과정에서 **GRPO** 및 **GSPO** 와 같은 주류 알고리즘이 겪는 응답 길이 편향(length bias) 문제를 분석하고 해결하는 것을 목표로 합니다. 특히, **GSPO** 가 훈련 중 응답 길이 축소(collapse) 현상을 보이는 근본적인 원인을 밝히고, 이를 개선하여 언어 모델의 추론 능력과 훈련 안정성을 향상시키고자 합니다.

## 핵심 방법론
논문은 **GRPO** 와 **GSPO** 의 목적 함수에 내재된 길이 편향을 이론적으로 분석했습니다. 특히 **GSPO** 의 시퀀스 수준 클리핑과 Clip-Higher 메커니즘이 양수 및 음수 샘플 간의 불균형을 야기하여 모델이 점차 짧은 응답을 생성하도록 유도함을 지적합니다. 이 문제를 해결하기 위해, 논문은 **Length-Unbiased Sequence Policy Optimization (LUSPO)** 알고리즘을 제안합니다. **LUSPO** 는 **GSPO** 의 목적 함수에 **각 시퀀스의 손실을 해당 시퀀스의 길이로 스케일링** 하는 간단하지만 효과적인 수정을 적용하여 길이 편향을 제거합니다.

## 주요 결과
**LUSPO** 는 **GSPO** 의 길이 편향을 성공적으로 제거하여 안정적인 훈련을 가능하게 했습니다. 텍스트 전용 벤치마크에서 **Qwen2.5-7B-Base** 및 **Qwen3-30B-A3B-Instruct** 모델은 **GSPO 대비 AIME24에서 최대 2.9% 및 6.9%의 정확도 향상** 을 보였습니다. 멀티모달 시나리오에서는 **Qwen2.5-VL-7B-Instruct** 모델이 **MathVista-Mini에서 GRPO 대비 1.6%** , **GSPO 대비 0.5% 높은 정확도** 를 달성했습니다. 또한, **LUSPO** 는 훈련 중 응답 길이를 **GSPO 대비 약 1.5배 더 길고 안정적으로 유지** 하며 모델의 탐색 능력을 향상시켰습니다.

## AI 실무자를 위한 시사점
**LUSPO** 는 대규모 언어 모델 및 비전-언어 모델의 RLVR 훈련에서 응답 길이 편향이 성능에 미치는 부정적인 영향을 효과적으로 해결하는 실용적인 방법을 제시합니다. AI/ML 엔지니어는 **GSPO** 와 같은 시퀀스 수준 최적화 기법을 사용할 때 **응답 길이 축소 문제** 에 대한 인식이 필요하며, **LUSPO** 의 **길이 기반 손실 스케일링** 기법은 복잡한 추론 태스크에서 **더 길고 일관된 고품질 응답** 을 생성하는 모델을 구축하는 데 활용될 수 있습니다. 이는 다양한 모델 아키텍처와 모달리티에서 모델의 안정성과 성능을 동시에 개선할 수 있는 강력한 최적화 전략을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.