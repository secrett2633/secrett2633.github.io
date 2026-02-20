---
title: "[논문리뷰] Recurrent-Depth VLA: Implicit Test-Time Compute Scaling of Vision-Language-Action Models via Latent Iterative Reasoning"
excerpt: "arXiv에 게시된 'Recurrent-Depth VLA: Implicit Test-Time Compute Scaling of Vision-Language-Action Models via Latent Iterative Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Latent Iterative Reasoning
  - Adaptive Compute
  - Recurrent Neural Networks
  - Robotics
  - Transformer
  - Test-Time Scaling
  - Continuous Action Space

permalink: /ai/review/2026-02-10-Recurrent-Depth-VLA-Implicit-Test-Time-Compute-Scaling-of-Vision-Language-Action-Models-via-Latent-Iterative-Reasoning/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.07845)

**저자:** Yalcin Tur, Jalal Naghiyev, Haoquan Fang, Wei-Chuan Tsai, Jiafei Duan, Dieter Fox, Ranjay Krishna



## 핵심 연구 목표
기존 VLA 모델의 고정된 연산 깊이로 인한 비효율성과 토큰 기반 추론의 메모리 및 연속적인 액션 공간 한계를 해결합니다. 태스크 복잡도에 따라 **테스트 시 연산량을 동적으로 조절** 하고, **일정한 메모리 공간** 을 유지하며 **로봇 제어** 를 위한 효율적인 추론 메커니즘을 제공하는 것을 목표로 합니다.

## 핵심 방법론
**Recurrent-Depth VLA (RD-VLA)** 는 **Prelude** , **Weight-tied Recurrent Core (R)** , **Coda** 로 구성된 아키텍처를 제안합니다. **Recurrent Core** 는 VLM 특징과 고유수용성(proprioception)을 활용하여 **가중치가 공유된 트랜스포머 블록** 내에서 **노이즈가 있는 잠재 스크래치패드(latent scratchpad)** 를 반복적으로 정제합니다. 훈련 시에는 **Truncated Backpropagation Through Time (TBPTT)** 을 사용하고, 추론 시에는 연속적인 액션 분포 간의 **KL-divergence** 또는 **MSE** 를 기반으로 한 **적응형 중단 기준** 을 통해 연산 깊이를 동적으로 조절합니다.

## 주요 결과
LIBERO 벤치마크에서 단일 반복 추론으로 **0% 성공률** 을 보인 태스크가 4회 반복 시 **90% 이상 성공률** 로 향상됨을 입증했습니다. 고정 반복 시 **93.0% 성공률** 과 적응형 연산 시 **92.5% 성공률** 을 달성했으며, 이전 토큰 기반 VLA 모델 대비 **최대 80배 빠른 추론 속도** 를 보였습니다. 또한, **0.5B 파라미터** 로 SOTA 성능을 달성하여 **14배 더 적은 파라미터** 로 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**잠재 공간에서의 반복적 추론** 을 통해 로봇 제어 모델의 **테스트 시 연산 자원 활용 효율성** 을 극대화하는 새로운 패러다임을 제시합니다. **일정한 메모리 공간** 으로 복잡한 태스크에 적응적으로 대응하며, **토큰 기반 추론의 오버헤드 없이** 연속적인 액션 공간에서 강력한 성능을 발휘하여 차세대 **자원 효율적인 로봇 파운데이션 모델** 개발에 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.