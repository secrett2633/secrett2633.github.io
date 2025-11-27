---
title: "[논문리뷰] Monet: Reasoning in Latent Visual Space Beyond Images and Language"
excerpt: "Pengfei Wan이 [arXiv]에 게시한 'Monet: Reasoning in Latent Visual Space Beyond Images and Language' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Latent Visual Reasoning
  - Multimodal Large Language Models (MLLMs)
  - Supervised Fine-tuning (SFT)
  - Reinforcement Learning (RL)
  - Visual-latent Policy Optimization (VLPO)
  - Chain-of-Thought (CoT)
  - Abstract Visual Thinking

permalink: /ai/review/2025-11-27-Monet-Reasoning-in-Latent-Visual-Space-Beyond-Images-and-Language/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.21395)

**저자:** Qixun Wang, Yang Shi, Yifei Wang, Yuanxing Zhang, Pengfei Wan, Kun Gai, Xianghua Ying, Yisen Wang



## 핵심 연구 목표
본 논문은 기존 MLLMs의 시각 추론이 외부 도구에 의존하고 인간과 같은 추상적인 시각적 사고가 부족하다는 문제를 해결하고자 합니다. MLLMs가 **연속적인 잠재 시각 공간**에서 직접 추론하도록 훈련하여, 중간 **시각적 사고(latent embeddings)**를 생성함으로써 외부 도구의 제약을 극복하고 유연한 시각 추론 및 일반화 능력을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
Monet은 MLLMs가 잠재 임베딩을 생성하고 추론하도록 훈련하기 위한 **세 단계 증류 기반 Supervised Fine-tuning (SFT) 파이프라인**을 제안합니다. SFT Stage 2에서는 **핵심 관찰 토큰에 대한 은닉 표현 정렬(L_align-obs)** 및 **보조 이미지 임베딩에 대한 제어된 어텐션 마스크**를 통해 잠재 임베딩이 보조 이미지의 시각적 특징에 접근하도록 하며, **잠재 임베딩만을 통한 그래디언트 역전파**를 적용합니다. 강화 학습 단계에서는 기존 GRPO의 한계를 극복하기 위해 잠재 임베딩을 정책 그래디언트 업데이트에 명시적으로 통합하는 **Visual-latent Policy Optimization (VLPO)**을 도입했습니다. 또한, 고품질 훈련을 위해 **Monet-SFT-125K** 데이터셋을 구축했습니다.

## 주요 결과
**Monet-7B** 모델은 실세계 인지 및 추론 벤치마크에서 일관된 성능 향상을 보였으며, **Qwen2.5-VL-7B** 대비 **4.25%-9.75%**의 성능 향상을 달성했습니다. 특히, 추상적인 시각 추론이 요구되는 **VisualPuzzles**와 같은 **OOD(Out-of-Distribution) 태스크**에서 강력한 일반화 성능을 입증했습니다. 어블레이션 연구에서는 **잠재 임베딩만을 통한 역전파**가 없으면 성능이 크게 하락함을 (예: V*에서 **82.20%에서 46.07%로 하락**) 확인하여 그 중요성을 강조했습니다.

## AI 실무자를 위한 시사점
Monet은 MLLMs가 시각적 추론을 위해 외부 도구에 의존하지 않고 **내부적인 추상적 시각적 사고**를 수행할 수 있음을 보여주어, AI 시스템의 유연성과 일반화 능력을 크게 향상시킬 수 있는 새로운 방향을 제시합니다. **다단계 SFT 및 VLPO**와 같은 고급 훈련 전략과 **고품질 데이터셋 구축**은 복잡한 시각 추론 태스크에서 강력한 성능을 내는 데 핵심적인 요소입니다. 이는 특히 **OOD 시나리오**에서 견고하게 작동하는 AI 모델을 개발하는 데 중요한 참고 자료가 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.