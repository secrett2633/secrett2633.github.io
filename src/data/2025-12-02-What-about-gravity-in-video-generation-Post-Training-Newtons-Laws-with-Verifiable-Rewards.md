---
title: "[논문리뷰] What about gravity in video generation? Post-Training Newton's Laws with Verifiable Rewards"
excerpt: "arXiv에 게시된 'What about gravity in video generation? Post-Training Newton's Laws with Verifiable Rewards' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Diffusion Models
  - Newtonian Dynamics
  - Physics-aware AI
  - Post-Training
  - Verifiable Rewards
  - Optical Flow
  - Mass Estimation

permalink: /ai/review/2025-12-02-What-about-gravity-in-video-generation-Post-Training-Newtons-Laws-with-Verifiable-Rewards/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.00425)

**저자:** Minh-Quan Le¹, Yuanzhi Zhu², Vicky Kalogeiton², Dimitris Samaras¹



## 핵심 연구 목표
최신 비디오 확산 모델이 시각적으로는 인상적이지만, 물체 부유, 가속도 불일치, 충돌 비현실성 등 기본적인 물리 법칙을 위반하는 문제점을 해결하는 것이 목표입니다. 시각적 사실성과 물리적 사실성 간의 격차를 해소하고, **뉴턴의 법칙** 에 기반한 물리적으로 그럴듯한 비디오 생성을 위한 **검증 가능한 보상(verifiable rewards)** 기반의 사후 학습 프레임워크를 제안합니다.

## 핵심 방법론
본 논문은 **NewtonRewards** 라는 물리 기반 사후 학습 프레임워크를 제안합니다. 이 방법은 생성된 비디오에서 직접 물리량을 측정하기 위해 **고정된 유틸리티 모델** 을 활용합니다. 즉, **광학 흐름(optical flow)** 을 속도 프록시로, **고수준 외형 특징** 을 질량 프록시로 사용합니다. 이를 통해 **뉴턴의 운동학적 제약(constant-acceleration dynamics)** 과 **질량 보존 보상(mass conservation)** 이라는 두 가지 상호 보완적인 보상을 명시적으로 강제하여 비디오 생성 모델을 미세 조정합니다.

## 주요 결과
**NewtonRewards** 는 새로 구축된 대규모 벤치마크인 **NewtonBench-60K** 에서 5가지 뉴턴 운동 기본 요소(NMPs)에 걸쳐 물리적 타당성, 움직임의 부드러움, 시간적 일관성을 일관되게 향상했습니다. 기존 사후 학습 방법 대비 **평균 +9.75%** 의 성능 향상을 보였으며, 분포 내(ID) 설정에서 **L2 오류를 12.39% 감소** 시키고, 분포 외(OOD) 설정에서는 **가속도 오차(RMSEa)를 16.09% 감소** 시키는 등 강한 일반화 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**검증 가능한 보상(verifiable rewards)** 을 활용하여 비디오 생성 모델에 물리 법칙을 주입하는 방법론은 **현실적인 세계 모델 구축** 에 중요한 기여를 합니다. 특히 **광학 흐름** 과 **시각적 특징** 을 프록시로 사용하여 물리량을 간접 측정하고 제약하는 방식은 다른 물리 법칙이나 도메인으로 확장 가능성이 높습니다. 이는 **자율 주행, 로봇 공학, 게임 시뮬레이션** 등 물리적 일관성이 필수적인 AI 애플리케이션의 성능과 신뢰성을 크게 향상시킬 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.