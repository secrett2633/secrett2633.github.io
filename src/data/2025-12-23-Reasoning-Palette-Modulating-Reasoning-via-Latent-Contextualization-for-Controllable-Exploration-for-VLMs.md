---
title: "[논문리뷰] Reasoning Palette: Modulating Reasoning via Latent Contextualization for Controllable Exploration for (V)LMs"
excerpt: "arXiv에 게시된 'Reasoning Palette: Modulating Reasoning via Latent Contextualization for Controllable Exploration for (V)LMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Latent Variable Models
  - Variational Autoencoder (VAE)
  - Reinforcement Learning (RL)
  - Exploration
  - Large Language Models (LLMs)
  - Vision-Language Models (VLMs)
  - Controllable Generation
  - Reasoning Strategies

permalink: /ai/review/2025-12-23-Reasoning-Palette-Modulating-Reasoning-via-Latent-Contextualization-for-Controllable-Exploration-for-VLMs/

toc: true
toc_sticky: true

date: 2025-12-23 00:00:00+0900+0900
last_modified_at: 2025-12-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.17206)

**저자:** Rujiao Long, Yang Li, Xingyao Zhang, Xi Zhao, Yuchi Xu, Wenbo Su, Weixun Wang, Tianqianjin Lin, Junchi Yan, Bo Zheng



## 핵심 연구 목표
본 논문은 대규모 (비전) 언어 모델(LLMs/VLMs)의 추론 및 강화 학습(RL) 훈련 과정에서 발생하는 탐색 비효율성 문제를 해결하는 것을 목표로 합니다. 특히, 기존의 토큰 수준 샘플링으로는 고수준의 다양한 추론 전략을 탐색하기 어렵다는 한계를 극복하고, 모델의 내부 계획을 조절하여 구조화되고 제어 가능한 탐색을 가능하게 하는 방법을 제안합니다.

## 핵심 방법론
논문은 **Reasoning Palette** 라는 새로운 프레임워크를 제안하며, **변분 오토인코더(VAE)** 를 사용하여 다양한 추론 전략을 인코딩하는 압축된 **잠재 공간(latent space)** 을 학습합니다. 추론 시에는 이 잠재 변수 **z** 를 샘플링하고, 이를 **학습 가능한 토큰 프리픽스** 로 디코딩하여 입력 프롬프트에 추가함으로써 모델의 내부 추론 궤적을 조절합니다. RL 훈련 시에는 이 잠재 변수를 보조 제어 신호로 활용하여 **두 단계(Two-Phase)** 또는 **선형 감쇠(Linear Decay)** 와 같은 스케줄링 전략으로 구조화된 탐색을 촉진하며, 사전 **SFT(Supervised Fine-Tuning)** 를 통해 모델이 잠재 컨디셔닝에 적응하도록 합니다.

## 주요 결과
**Reasoning Palette** 는 다양한 추론 벤치마크에서 일관된 성능 향상을 입증했습니다. 특히, Qwen-4B-Base 모델에 **가우시안 노이즈 토큰 임베딩을 주입** 하는 것만으로 **GSM8K Pass@32 정확도가 52.9%에서 85.3%로 크게 향상** 되었습니다. 또한, **Qwen3-8B-Base + RLOO** 설정에서 평균 성능이 **+3.09점** 개선되었으며, **RefCOCO 데이터셋** 에서는 **잠재 안내(Latent-guided) + 샘플링** 전략으로 **87.53%** 의 높은 정확도를 달성하며 표준 RL 방법론 대비 탐색 효율성과 제어 가능성을 현저히 향상시켰습니다.

## AI 실무자를 위한 시사점
**Reasoning Palette** 는 LLMs/VLMs의 **전략적 행동을 조절하고 해석 가능한 제어** 를 가능하게 하여 AI 모델의 응용 범위를 확장합니다. AI 실무자들은 이 프레임워크를 통해 모델이 단순히 무작위 토큰을 생성하는 것을 넘어, 특정 추론 스타일(예: 수학적 추론, 코드 생성)을 따르도록 유도하여 복잡한 문제 해결 능력을 향상시킬 수 있습니다. 특히, RL 훈련에서 **구조화된 탐색** 을 통해 학습 효율성을 높이고 더욱 견고한 모델을 구축하는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.