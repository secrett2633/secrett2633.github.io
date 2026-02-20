---
title: "[논문리뷰] X-VLA: Soft-Prompted Transformer as Scalable Cross-Embodiment
  Vision-Language-Action Model"
excerpt: "Xirui Kang이 arXiv에 게시한 'X-VLA: Soft-Prompted Transformer as Scalable Cross-Embodiment
  Vision-Language-Action Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA) Models
  - Soft Prompts
  - Transformer
  - Cross-Embodiment
  - Robotics
  - Pretraining
  - Domain Adaptation
  - Flow Matching

permalink: /ai/review/2025-10-16-X-VLA-Soft-Prompted-Transformer-as-Scalable-Cross-Embodiment-Vision-Language-Action-Model/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.10274)

**저자:** Jinliang Zheng, Jianxiong Li, Zhihao Wang, Dongxiu Liu, Xirui Kang, Yuchun Feng, Yinan Zheng, Jiayin Zou, Yilun Chen, Jia Zeng, Ya-Qin Zhang, Jiangmiao Pang, Jingjing Liu, Tai Wang, Xianyuan Zhan



## 핵심 연구 목표
다양한 로봇 플랫폼과 이질적인 데이터셋 전반에서 효과적인 훈련을 통해 일반화된 Vision-Language-Action (VLA) 모델을 구축하는 것이 목표입니다. 특히, 하드웨어 구성 및 데이터 소스의 이질성으로 인해 발생하는 문제를 **최소한의 파라미터 추가** 로 해결하여 **확장 가능한** 교차-embodiment VLA 모델을 개발하고자 합니다.

## 핵심 방법론
이 논문은 **Soft Prompt** 접근 방식을 제안하며, 각 데이터 소스별로 학습 가능한 임베딩을 도입하여 **cross-embodiment 특징** 을 효과적으로 활용합니다. **X-VLA** 라는 새로운 아키텍처는 **soft-prompted 표준 Transformer 인코더** 만을 사용하여 **flow-matching 기반** 으로 동작하며, 멀티모달 특성 융합과 정밀한 행동 생성을 수행합니다. 훈련은 **사전 훈련 (Pretraining)** 과 **도메인 적응 (Domain Adaptation)** 의 두 단계로 구성됩니다.

## 주요 결과
**X-VLA-0.9B** 는 6개 시뮬레이션 벤치마크와 3개 실세계 로봇에서 **SOTA 성능** 을 달성했습니다. 특히, LIBERO 벤치마크에서 **93%의 성공률** 과 Simpler-WidowX에서 **54%의 성공률** 을 기록했으며, 이는 **300배 적은 파라미터(9M vs. 3B)** 만으로 **πo 모델** 과 유사한 성능을 보였습니다. 모델 크기, 데이터 다양성, 데이터 볼륨에 따른 안정적인 스케일링 특성을 입증했습니다.

## AI 실무자를 위한 시사점
**Soft Prompt 메커니즘** 은 다양한 하드웨어 구성과 도메인 이질성을 효율적으로 처리하여 VLA 모델의 **일반화 능력** 과 **데이터 효율적인 적응 능력** 을 크게 향상시킵니다. 이는 로봇 학습 분야에서 **대규모 이질적 데이터셋** 을 활용하여 **일반화된 로봇 정책** 을 개발하는 데 중요한 방향을 제시하며, **PEFT (Parameter-Efficient Finetuning)** 기법을 통해 **최소한의 비용** 으로 새로운 로봇에 빠르게 적응할 수 있는 실용적인 해결책을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.