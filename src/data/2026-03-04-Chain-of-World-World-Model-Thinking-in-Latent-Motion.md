---
title: "[논문리뷰] Chain of World: World Model Thinking in Latent Motion"
excerpt: "Lei Fan이 arXiv에 게시한 'Chain of World: World Model Thinking in Latent Motion' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - World Models
  - Latent Motion
  - Embodied Intelligence
  - Temporal Reasoning
  - Disentangled Representation
  - Robotics
  - Pretraining

permalink: /ai/review/2026-03-04-Chain-of-World-World-Model-Thinking-in-Latent-Motion/

toc: true
toc_sticky: true

date: 2026-03-04 00:00:00+0900+0900
last_modified_at: 2026-03-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.03195)

**저자:** Fuxiang Yang, Donglin Di, Lulu Tang, Xuancheng Zhang, Lei Fan, Hao Li, Wei Chen, Tonghua Su, Baorui Ma



## 핵심 연구 목표
기존 VLA(Vision-Language-Action) 모델이 예측 능력 부족과 시각적 중복성 재구성에 따른 비효율성을 보이는 한계를 극복하고, 잠재 액션 모델의 연속적인 동적 모델링 및 세계 지식 부족 문제를 해결하고자 합니다. 이를 위해 세계 모델의 시간적 추론 능력과 분리된 잠재 모션 표현을 통합하여 효율적이고 해석 가능한 시각-모터 학습을 달성하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **CoWVLA(Chain-of-World VLA)** 는 **사전 훈련된 비디오 VAE** 를 활용하여 비디오 세그먼트를 **구조(structure) 및 모션(motion) 잠재 공간** 으로 명확하게 분리합니다. 사전 훈련 단계에서는 명령어와 초기 프레임을 바탕으로 **연속적인 잠재 모션 체인** 을 추론하고 세그먼트의 **종료 프레임** 을 예측하도록 모델을 학습시킵니다. 이후 공동 미세 조정(co-fine-tuning) 단계에서 이 잠재 역학을 **autoregressive decoder** 를 통해 희소 키프레임 및 액션 시퀀스와 정렬합니다.

## 주요 결과
**CoWVLA** 는 **LIBERO** 및 **SimplerEnv-WidowX** 벤치마크에서 기존 세계 모델 및 잠재 액션 접근 방식을 능가하는 **최첨단 성능** 을 달성했습니다. 특히, **LIBERO** 에서 평균 **0.956** 의 성공률을, **SimplerEnv-WidowX** 에서 평균 **0.760** 의 성공률을 기록하며, **UniVLA(LIBERO 0.950, SimplerEnv 0.698)** 대비 우수한 교차 도메인 안정성과 절대 성능을 입증했습니다. 또한, **잠재 모션 모델링** 이 기존 잠재 액션 방식보다 **유의미하게 높은 작업 성공률** 을 보였습니다.

## AI 실무자를 위한 시사점
**CoWVLA** 는 로봇 조작 태스크를 위한 **효율적이고 견고한 시각-모터 학습** 을 위한 효과적인 사전 훈련 패러다임을 제시합니다. **구조-모션 분리된 잠재 공간** 을 통해 모델이 동적 변화에 집중하고 불필요한 배경 재구성을 피함으로써, 보다 해석 가능하고 효율적인 액션 표현을 얻을 수 있습니다. 하지만 **대규모 VLA 백본** 및 상당한 **계산 자원** 에 대한 의존성은 실무 적용 시 고려해야 할 요소입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.