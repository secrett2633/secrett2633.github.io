---
title: "[논문리뷰] villa-X: Enhancing Latent Action Modeling in Vision-Language-Action Models"
excerpt: "Kaixin Wang이 [arXiv]에 게시한 'villa-X: Enhancing Latent Action Modeling in Vision-Language-Action Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Latent Actions
  - Robot Manipulation
  - Pre-training
  - Diffusion Models
  - Proprioceptive Feedback
  - Foundation Models

permalink: /ai/review/2025-8-3-villa-X-Enhancing-Latent-Action-Modeling-in-Vision-Language-Action-Models/

toc: true
toc_sticky: true

date: 2025-08-03 07:35:17+0900
last_modified_at: 2025-08-03 07:35:17+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.23682)

## villa-X: Enhancing Latent Action Modeling in Vision-Language-Action Models

**저자:** Xiaoyu Chen, Hangxing Wei, Pushi Zhang, Chuheng Zhang, Kaixin Wang, Yanjiang Guo, Rushuai Yang, Yucen Wang, Xinquan Xiao, Li Zhao, Jianyu Chen, and Jiang Bian

**키워드:** `Vision-Language-Action Models`, `Latent Actions`, `Robot Manipulation`, `Pre-training`, `Diffusion Models`, `Proprioceptive Feedback`, `Foundation Models`

## 핵심 연구 목표
본 논문은 Vision-Language-Action (VLA) 모델에서 로봇 조작 정책 학습을 위한 잠재 행동(latent actions) 모델링을 개선하는 새로운 프레임워크인 **villa-X**를 제안합니다. 특히, 잠재 행동의 학습 방식과 VLA 사전 훈련에 통합하는 방식을 향상시켜, 로봇의 물리적 동역학과의 연관성을 강화하고 시각적 변화뿐 아니라 실제 로봇 행동에 기반한 일반화 가능한 정책 학습을 목표로 합니다.

## 핵심 방법론
제안된 **villa-X** 프레임워크는 Latent Action Model (LAM)과 Actor (ACT) 모듈로 구성됩니다. LAM은 시각적 변화로부터 잠재 행동을 추론하며, 특히 **proprio Forward Dynamics Model (FDM)**을 도입하여 잠재 행동을 로봇의 고유 상태(proprioceptive states) 및 행동에 grounding 시킵니다. ACT 모듈은 **사전 훈련된 VLM (PaliGemma)**을 기반으로, **ACT-latent**가 잠재 행동 시퀀스를 **확산 모델**로 계획하고, **ACT-robot**이 동일한 시각-언어 특성 및 잠재 행동에 조건부로 로봇 행동 시퀀스를 **공동 확산 프로세스**를 통해 예측합니다.

## 주요 결과
**SIMPLER 벤치마크**에서 Google robot 평균 **59.6%**, WidowX robot 평균 **62.5%**의 성공률을 달성하여 기존 VLA 및 잠재 행동 기반 방법들을 뛰어넘었습니다. **LIBERO 벤치마크**에서는 모든 4개 태스크 스위트에서 기존 모델 대비 우수한 성능을 보였으며, 평균 **90.1%**의 성공률을 기록했습니다. 또한, **proprio FDM**을 통합한 모델(**w/pp**)이 통합하지 않은 모델(**wo/pp**)보다 지속적으로 높은 성능을 보여, 제안된 잠재 행동 전문가의 효과성을 입증했습니다.

## AI 실무자를 위한 시사점
**villa-X**는 레이블 없는 비디오 데이터를 로봇 학습에 효과적으로 활용할 수 있는 방법을 제시하여 데이터 효율성을 높입니다. 특히, 잠재 행동을 로봇의 물리적 동역학에 연결하는 **proprio FDM**과 **공동 확산 프로세스**를 통한 계층적 정책 학습은 다양한 로봇 플랫폼과 시나리오에 대한 강력한 일반화 및 전이 학습 가능성을 제공합니다. 이는 실제 로봇 조작 애플리케이션 개발에 있어 보다 견고하고 유연한 AI 모델 구축에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
