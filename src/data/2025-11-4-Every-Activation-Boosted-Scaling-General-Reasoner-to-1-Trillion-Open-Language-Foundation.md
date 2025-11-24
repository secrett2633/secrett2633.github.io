---
title: "[논문리뷰] Every Activation Boosted: Scaling General Reasoner to 1 Trillion Open
  Language Foundation"
excerpt: "이 [arXiv]에 게시한 'Every Activation Boosted: Scaling General Reasoner to 1 Trillion Open
  Language Foundation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Mixture-of-Experts
  - Reasoning Capability
  - Sparse Activation
  - Scaling Laws
  - FP8 Training
  - Efficient Training
  - Instruction Tuning

permalink: /ai/review/2025-11-4-Every-Activation-Boosted-Scaling-General-Reasoner-to-1-Trillion-Open-Language-Foundation/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.22115)

**저자:** Ling Team, Inclusion AI



## 핵심 연구 목표
본 논문은 '모든 활성화가 추론 능력을 향상시킨다'는 원칙 아래, **1조 개의 파라미터를 가진 추론 중심의 개방형 언어 파운데이션 모델(Ling 2.0)**을 개발하는 것을 목표로 합니다. 대규모 모델의 **계산 효율성과 추론 능력 향상**이라는 두 가지 상호 연결된 과제를 해결하고, 희소 활성화 하에 추론 정확도와 효율성을 극대화하는 확장 가능한 청사진을 제시하고자 합니다.

## 핵심 방법론
Ling 2.0은 모델 아키텍처, 사전 훈련, 사후 훈련, 인프라의 네 가지 혁신을 통합합니다. 아키텍처는 **높은 희소성 MoE**와 **Multi-Token Prediction(MTP)**을 사용하며, **Ling Scaling Laws**를 기반으로 설계됩니다. 사전 훈련 과정에서는 **추론 중심 데이터 구성**과 **CoT 데이터의 중간 훈련 단계 사전 활성화**, 그리고 **Warmup-Stable-Merge(WSM) 스케줄러**를 적용합니다. 사후 훈련은 **Decoupled Fine-Tuning(DFT)**, **Evolutionary Chain-of-Thought(Evo-CoT)**, **Linguistic-unit Policy Optimization(LPO)**, **Group Arena Reward(GAR)**를 통해 진행됩니다. 인프라 측면에서는 **Full-scale FP8 훈련**과 **이종 세분화 파이프라인**을 최적화합니다.

## 주요 결과
Ling 2.0은 동등한 밀집 모델 대비 최대 **7배의 활성 컴퓨팅 효율성**을 달성했습니다. **Ling-1T**는 **AIME 25 벤치마크에서 70.42%의 정확도**를 기록하며 추론 정확도와 효율성 측면에서 새로운 파레토 프론티어를 확립했습니다. **FP8 훈련**은 **BF16 대비 0.25% 미만의 손실 차이**로 **15% 이상의 메모리 사용량 감소**와 **15% MFU 향상**을 보여주었고, **CoT 데이터의 사전 활성화**는 MATH 및 AIME와 같은 추론 집약적 벤치마크에서 상당한 성능 향상을 가져왔습니다.

## AI 실무자를 위한 시사점
**희소 MoE 아키텍처**와 **FP8 훈련**은 대규모 언어 모델의 훈련 및 운영 비용을 혁신적으로 절감하며 효율적인 AI 개발의 길을 엽니다. **추론 중심의 데이터셋 구성**과 **CoT 기반 다단계 훈련 전략**은 모델의 복잡한 추론 능력을 강화하는 핵심 요소입니다. **Ling Scaling Laws**는 소규모 실험을 통해 대규모 모델의 성능을 예측하고 최적화할 수 있는 강력한 도구를 제공하여, 미래 AI 시스템의 확장성을 위한 실질적인 청사진을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.