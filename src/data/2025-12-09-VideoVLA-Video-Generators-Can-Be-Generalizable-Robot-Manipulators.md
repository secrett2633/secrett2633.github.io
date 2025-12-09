---
title: "[논문리뷰] VideoVLA: Video Generators Can Be Generalizable Robot Manipulators"
excerpt: "Yaobo Liang이 [arXiv]에 게시한 'VideoVLA: Video Generators Can Be Generalizable Robot Manipulators' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robot Manipulation
  - Video Generation Models
  - Vision-Language-Action (VLA)
  - Diffusion Transformer
  - Generalization
  - Action Prediction
  - Visual Imagination

permalink: /ai/review/2025-12-09-VideoVLA-Video-Generators-Can-Be-Generalizable-Robot-Manipulators/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.06963)

**저자:** Yichao Shen, Fangyun Wei, Zhiying Du, Yaobo Liang, Yan Lu, Jiaolong Yang, Nanning Zheng, Baining Guo



## 핵심 연구 목표
본 논문은 로봇 조작 분야에서 기존 VLA 모델의 제한적인 일반화 능력을 극복하고, 새로운 태스크, 객체, 환경에 대한 강건한 적응을 가능하게 하는 것을 목표로 합니다. 특히, 대규모 **비디오 생성 모델** 을 로봇 조작에 활용하여 일반화 가능한 VLA 매니퓰레이터를 구축할 수 있는지 탐구합니다.

## 핵심 방법론
VideoVLA는 **멀티모달 Diffusion Transformer (DiT)** 아키텍처를 기반으로 비디오, 언어, 액션 양식을 통합 모델링합니다. **사전 훈련된 비디오 생성 모델(CogVideoX [24])** 을 활용하여 다음 액션 시퀀스와 해당 액션이 환경에 미칠 시각적 결과(미래 프레임)를 동시에 예측하는 **이중 예측 전략** 을 사용합니다. 언어는 **T5 인코더 [29]** , 비디오는 **3D-causal VAE 인코더 [24]** 를 통해 잠재 표현으로 변환되며, **DDPM Diffusion loss [30]** 로 학습됩니다.

## 주요 결과
VideoVLA는 인-도메인 태스크에서 **SIMPLER 환경** 의 WidowX 및 Google 로봇에 대해 **63.0%** 의 최고 평균 성공률을 달성했습니다. 특히, 새로운 객체에 대한 일반화 능력에서 **65.2%** 의 최고 평균 성공률을 보였고, 새로운 스킬 전이 태스크에서는 **48.6%** 의 평균 성공률을 기록하며 기존 모델들을 크게 능가했습니다. 또한, 예측된 시각적 상상과 실제 실행 간의 강력한 상관관계를 입증하여 시각적 상상이 액션 예측의 신뢰도를 높임을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 **대규모 사전 훈련된 비디오 생성 모델** 이 로봇 조작을 위한 강력한 기반이 될 수 있음을 입증하며, 기존의 비전-언어 이해 모델 중심 접근 방식에서 새로운 패러다임을 제시합니다. **액션과 시각적 결과를 동시에 예측하는 이중 예측 전략** 은 로봇의 일반화 및 강건성 향상에 중요한 역할을 합니다. 다만, 현재 **초당 약 3Hz의 낮은 추론 속도** 는 실세계 배포의 한계점으로, 모델 경량화 및 가속화 기술 개발이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.