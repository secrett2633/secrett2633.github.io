---
title: "[논문리뷰] Cosmos Policy: Fine-Tuning Video Models for Visuomotor Control and Planning"
excerpt: "이 [arXiv]에 게시한 'Cosmos Policy: Fine-Tuning Video Models for Visuomotor Control and Planning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Models
  - Visuomotor Control
  - Robot Policy
  - Fine-tuning
  - Diffusion Models
  - World Models
  - Model-based Planning
  - Imitation Learning

permalink: /ai/review/2026-01-23-Cosmos-Policy-Fine-Tuning-Video-Models-for-Visuomotor-Control-and-Planning/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.16163)

**저자:** Moo Jin Kim, Yihuai Gao, Tsung-Yi Lin, Yen-Chen Lin, Yunhao Ge, Grace Lam, Percy Liang, Shuran Song, Ming-Yu Liu, Chelsea Finn, Jinwei Gu



## 핵심 연구 목표
본 논문은 대규모 **사전 훈련된 비디오 생성 모델** 의 시공간적 사전 지식을 로봇 정책 학습에 활용하는 것을 목표로 합니다. 기존 방식의 복잡성(다단계 훈련, 새로운 아키텍처 구성 요소)을 극복하고, 단일 단계의 **미세 조정** 을 통해 로봇 동작, 미래 상태 및 가치를 직접 생성할 수 있는 효과적인 로봇 정책인 **Cosmos Policy** 를 제시합니다. 궁극적으로 복잡한 조작 작업에서 최첨단 성능을 달성하고 효율적인 모델 기반 계획을 가능하게 하는 것이 목적입니다.

## 핵심 방법론
핵심 아이디어는 **Latent Frame Injection** 입니다. 로봇 고유의 모달리티( **로봇 고유 수용 감각, 액션 덩어리, 미래 상태 이미지, 가치 함수** )를 새로운 잠재 프레임으로 인코딩하여 사전 훈련된 **NVIDIA Cosmos-Predict2-2B 비디오 모델** 의 잠재 확산 시퀀스에 직접 주입합니다. 모델은 로봇 시연 데이터에 대해 **단일 단계로 미세 조정** 되며, 비디오 확산 학습 목표를 통해 액션, 미래 상태, 가치를 동시에 생성하도록 학습됩니다. 또한, **정책 롤아웃 데이터** 를 사용하여 세계 모델과 가치 함수를 정제하고, **Best-of-N 샘플링** 을 통한 모델 기반 계획으로 행동의 성공 확률을 높입니다.

## 주요 결과
**Cosmos Policy** 는 **LIBERO (평균 성공률 98.5%)** 및 **RoboCasa (평균 성공률 67.1%)** 시뮬레이션 벤치마크에서 **최첨단 성능** 을 달성했습니다. 또한, 실제 ALOHA 로봇 작업에서 **평균 93.6%** 의 최고 점수를 기록하며, 기존 확산 정책, 비디오 모델 기반 정책 및 미세 조정된 VLA 모델들을 능가했습니다. 모델 기반 계획을 적용했을 때, 두 가지 도전적인 실제 조작 작업에서 **평균 12.5% 더 높은 작업 완료율** 을 보였습니다.

## AI 실무자를 위한 시사점
**사전 훈련된 비디오 모델** 이 로봇 제어 정책의 강력한 기반이 될 수 있음을 입증하여, 초기부터 학습하는 방식보다 효율적인 접근법을 제시합니다. **Latent Frame Injection** 과 같은 모달리티 통합 기법은 기존 대규모 모델을 새로운 로봇 도메인에 유연하게 적용하는 실용적인 방법을 제공합니다. **정책 롤아웃 데이터를 활용한 세계 모델 정제 및 모델 기반 계획** 은 복잡하고 동적인 로봇 작업에서 성능을 크게 향상시키는 중요한 전략이므로, 실제 로봇 시스템 개발 시 고려해야 할 부분입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.