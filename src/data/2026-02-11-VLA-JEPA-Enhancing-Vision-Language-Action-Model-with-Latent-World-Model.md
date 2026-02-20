---
title: "[논문리뷰] VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model"
excerpt: "Zezhi Liu이 arXiv에 게시한 'VLA-JEPA: Enhancing Vision-Language-Action Model with Latent World Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA)
  - Latent World Model
  - JEPA
  - Pretraining
  - Robot Learning
  - Generalization
  - Robustness
  - Human Videos

permalink: /ai/review/2026-02-11-VLA-JEPA-Enhancing-Vision-Language-Action-Model-with-Latent-World-Model/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.10098)

**저자:** Jingwen Sun, Wenyao Zhang, Zekun Qi, Shaojie Ren, Zezhi Liu, Hanxin Zhu, Guangzhong Sun, Xin Jin, Zhibo Chen



## 핵심 연구 목표
기존 VLA 정책의 잠재-액션 목표가 픽셀 변화에 고착되어 외형 편향, 불필요한 움직임, 정보 누출에 취약한 문제를 해결하는 것이 목표입니다. 본 연구는 **액션 관련 상태 전이** 를 학습하고 카메라 움직임 및 배경 변화에 **견고한 동역학 추상화** 를 제공하는 사전 훈련 프레임워크를 개발하고자 합니다.

## 핵심 방법론
본 논문은 **JEPA 스타일의 사전 훈련 프레임워크인 VLA-JEPA** 를 제안합니다. 이는 **누출 없는 상태 예측** 을 핵심으로, **타겟 인코더** 가 미래 프레임에서 잠재 표현을 생성하고, **학생 경로 (VLM 백본)** 는 현재 관측만 사용합니다. **잠재 세계 모델** 은 현재 상태와 잠재 액션 표현을 미래 잠재 상태로 예측하며, **JEPA 정렬 손실** 을 통해 픽셀 공간 대신 잠재 공간에서 훈련됩니다.

## 주요 결과
**LIBERO 벤치마크** 에서 평균 **97.2%** 의 성공률로 기존 방법론을 능가했습니다. **SimplerEnv 벤치마크** 에서 Google Robot의 평균 성공률 **65.2%** , WidowX Robot의 평균 성공률 **57.3%** 를 달성했습니다. 특히 **LIBERO-Plus 벤치마크** 의 7가지 교란 중 5가지에서 최고 성능인 **79.5%** 의 평균 성공률을 기록하여 **강화된 일반화 및 견고성** 을 입증했습니다.

## AI 실무자를 위한 시사점
**VLA-JEPA** 는 인터넷 규모의 비디오를 활용하여 **로봇이 실제 환경의 다양한 변동에 강인한 정책** 을 학습할 수 있는 효과적인 방법을 제공합니다. **JEPA 기반의 잠재 공간 예측** 은 픽셀 노이즈에 덜 민감한 **추상적인 동역학 표현** 을 학습하여 로봇 시스템의 **견고성과 신뢰성** 을 높일 수 있습니다. 또한, **간소화된 두 단계 훈련 파이프라인** 은 복잡한 다단계 파이프라인 대비 **개발 및 배포의 효율성** 을 크게 향상시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.