---
title: "[논문리뷰] Directional Reasoning Injection for Fine-Tuning MLLMs"
excerpt: "Jialian Wu이 arXiv에 게시한 'Directional Reasoning Injection for Fine-Tuning MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Reasoning Transfer
  - Gradient-based Fine-tuning
  - Model Merging
  - Parameter-Efficient Learning
  - Supervised Fine-tuning
  - Directional Prior

permalink: /ai/review/2025-10-23-Directional-Reasoning-Injection-for-Fine-Tuning-MLLMs/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15050)

**저자:** Chao Huang, Zeliang Zhang, Jiang Liu, Ximeng Sun, Jialian Wu, Xiaodong Yu, Ze Wang, Chenliang Xu, Emad Barsoum, Zicheng Liu



## 핵심 연구 목표
논문은 멀티모달 대규모 언어 모델(MLLM)의 추론 능력이 텍스트 전용 LLM에 비해 현저히 떨어진다는 문제에 주목합니다. 대규모 멀티모달 추론 데이터셋이나 강화 학습 없이도, **텍스트 전용 추론 전문가 모델** 의 추론 지식을 **비추론 멀티모달 LLM** 으로 효율적으로 전이하는 경량화된 방법을 개발하는 것을 목표로 합니다.

## 핵심 방법론
제안된 방법론인 **Directional Reasoning Injection for Fine-Tuning (DRIFT)** 는 그래디언트 공간에서 작동합니다. 이는 **텍스트 전용 추론 모델(Ø_reason)** 과 **멀티모달 모델(Ø_VL)** 간의 파라미터 차이를 **추론 벡터(∆)** 로 사전 계산하여 추론 방향을 설정합니다. 이 **∆** 를 멀티모달 SFT 중 그래디언트 업데이트에 **방향성 사전(directional prior)** 으로 주입하며, 특히 **트랜스포머 모듈** (어텐션 프로젝션 또는 MLP 레이어)에 선택적으로 적용하고 **Grad-Norm w/ Adaptive α** 와 같은 스케일링 전략을 사용합니다.

## 주요 결과
**DRIFT** 는 MathVista, MathVision, MathVerse, WeMath, LogicVista 등 다양한 멀티모달 추론 벤치마크에서 표준 SFT 및 파라미터 병합 방법론보다 일관되게 우수한 성능을 보였습니다. 특히, **MathVista** 에서 **+1.6 포인트** , **WeMath** 에서 **+3.6 포인트** 의 성능 향상을 달성했습니다. DRIFT는 **약 2시간** 의 훈련 시간으로 훈련이 많이 필요한 기존 방법론(수일 소요)과 동등하거나 더 나은 결과를 달성하여 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**DRIFT** 는 제한된 데이터와 컴퓨팅 자원으로 MLLM의 추론 능력을 효과적으로 향상시킬 수 있는 실용적인 방법론을 제공합니다. 기존의 불안정한 **파라미터 공간 병합(parameter-space merging)** 대신 **그래디언트 공간에서 추론 지식** 을 주입함으로써 멀티모달 모델의 **기존 정렬(multimodal alignment)을 손상시키지 않는 안정적인 전이 학습** 이 가능합니다. 특히 **attention layer** 에 추론 priors를 적용하고 **Grad-Norm w/ Adaptive α** 스케일링 전략을 사용하는 것이 최적의 성능을 기대할 수 있으며, 이는 AI 시스템의 추론 능력 확장에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.