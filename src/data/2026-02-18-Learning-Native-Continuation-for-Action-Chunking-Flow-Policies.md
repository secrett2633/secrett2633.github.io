---
title: "[논문리뷰] Learning Native Continuation for Action Chunking Flow Policies"
excerpt: "Di Zhang이 arXiv에 게시한 'Learning Native Continuation for Action Chunking Flow Policies' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Action Chunking
  - Flow-based Policies
  - Trajectory Continuation
  - Robotics
  - Vision-Language-Action (VLA)
  - Denoising Dynamics
  - Schedule-shaped Guidance
  - Real-time Control

permalink: /ai/review/2026-02-18-Learning-Native-Continuation-for-Action-Chunking-Flow-Policies/

toc: true
toc_sticky: true

date: 2026-02-18 00:00:00+0900+0900
last_modified_at: 2026-02-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12978)

**저자:** Di Zhang, Bocheng Li, Juntu Zhao, Hang Yu, lyfeng001



## 핵심 연구 목표
본 논문은 Vision-Language-Action (VLA) 모델에서 액션 청킹(action chunking) 시 발생하는 청크 경계의 불연속성 문제를 해결하고자 합니다. 특히, 기존 **실시간 청킹 (RTC)** 과 같은 사후 처리 방식이 아닌, 정책 자체에 **청크 연속성** 을 학습시키는 **훈련-시간 지속(training-time continuation)** 방법론을 제안하여, 로봇 동작의 부드러움과 태스크 완료 시간 단축을 목표로 합니다.

## 핵심 방법론
Legato는 **액션 청킹 플로우 기반 VLA 정책** 을 위해 **훈련-시간 지속 메커니즘** 을 도입합니다. 핵심적으로, known action과 노이즈의 **스케줄-형태 혼합(schedule-shaped mixture)** 으로부터 노이즈 제거 과정을 초기화하고 ( **Eeff = (1 – ω) ε + ω A** ), **재구성된 속도 필드(reshaped velocity field)** 를 학습시켜 ( **fo(Y,t) = (1 – w) -1⊙ [uFM(Y, t) + κ⊙ (Y − A)]** ) **스텝별 가이던스(per-step guidance)** 하에 훈련-추론 일관성을 유지합니다. 또한, **랜덤화된 스케줄 조건화(randomized schedule conditioning)** 를 통해 다양한 추론 지연 및 지속 강도에 유연하게 대응할 수 있도록 합니다.

## 주요 결과
Legato는 5가지 실제 로봇 조작 태스크에서 **RTC** 및 **Training-time RTC** 대비 일관되게 우수한 성능을 보였습니다. 특히, **궤적 부드러움(trajectory smoothness)** 및 **태스크 완료 시간(task completion time)** 에서 약 **10%** 향상을 달성했습니다. 예를 들어, **pour task** 에서 **Completion Time** 을 RTC의 **95.07초** 에서 Legato의 **75.73초** 로 단축시켰으며, **NSPARC** 는 **2.85에서 1.65** 로 낮춰 더 부드러운 궤적을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 로봇 시스템에서 **VLA 모델의 실제 배포 가능성** 을 크게 높이는 데 기여합니다. Legato의 **훈련-시간 지속 메커니즘** 은 로봇 동작의 **불필요한 흔들림(hesitation)** 과 **멀티모달 스위칭(multimodal switching)** 을 줄여주어, 더 부드럽고 효율적인 로봇 제어를 가능하게 합니다. 특히, **랜덤화된 스케줄 조건화** 를 통해 다양한 하드웨어 환경 및 추론 예산에 맞춰 정책을 재훈련 없이 유연하게 적용할 수 있다는 점에서 실용적인 가치가 큽니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.