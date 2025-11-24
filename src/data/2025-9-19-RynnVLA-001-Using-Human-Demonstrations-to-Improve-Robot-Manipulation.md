---
title: "[논문리뷰] RynnVLA-001: Using Human Demonstrations to Improve Robot Manipulation"
excerpt: "SpaceProduct이 [arXiv]에 게시한 'RynnVLA-001: Using Human Demonstrations to Improve Robot Manipulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA) Model
  - Robot Manipulation
  - Human Demonstrations
  - Video Generative Pretraining
  - Ego-Centric Video
  - Trajectory Prediction
  - ActionVAE
  - Transformer

permalink: /ai/review/2025-9-19-RynnVLA-001-Using-Human-Demonstrations-to-Improve-Robot-Manipulation/

toc: true
toc_sticky: true

date: 2025-09-19 13:12:21+0900
last_modified_at: 2025-09-19 13:12:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.15212)

**Yuming Jiang, Siteng Huang, Shengke Xue, Yaxi Zhao, Jun Cen, Sicong Leng, Kehan Li, Jiayan Guo, Kexiang Wang, Mingxiu Chen, Fan Wang, Deli Zhao, Xin Li**



## 핵심 연구 목표
본 논문은 대규모 로봇 조작 데이터 부족 문제와 시각적 역학 모델링의 한계로 인해 기존 Vision-Language-Action (VLA) 모델의 성능이 제약받는 문제를 해결하고자 합니다. 인간 시연 영상으로부터 조작 기술을 암묵적으로 전이하여 로봇 조작 성능을 개선하는 것을 궁극적인 목표로 합니다.

## 핵심 방법론
제안하는 RynnVLA-001은 두 단계의 사전 훈련과 ActionVAE를 활용합니다. 첫 번째 단계인 **Ego-Centric Video Generative Pretraining**에서는 **12M**개의 1인칭 인간 조작 영상을 사용하여 미래 프레임을 예측하는 **Image-to-Video (I2V) 모델**을 훈련합니다. 두 번째 **Human-Centric Trajectory-Aware Modeling** 단계에서는 I2V 모델을 정교화하여 미래 프레임과 함께 **인간 키포인트 궤적**을 공동으로 예측하도록 합니다. 로봇 액션 표현을 위해 **ActionVAE**를 도입하여 액션 시퀀스를 압축된 잠재 임베딩으로 변환하며, 최종적으로 로봇 데이터에 파인튜닝하여 실행 가능한 액션을 생성합니다.

## 주요 결과
**RynnVLA-001**은 동일한 로봇 조작 데이터셋에서 최첨단 베이스라인인 **GROOT N1.5**와 **Pi0**보다 우수한 성능을 달성했습니다. 본 모델은 평균 성공률 **90.6%**를 기록하여 **GROOT N1.5 (55.6%)**와 **Pi0 (70.4%)**를 크게 앞섰습니다. 특히, 사전 훈련된 가중치의 효과를 분석한 결과, **Ego-Centric Video Generative Pretraining**과 **Human-Centric Trajectory-Aware Video Modeling** 두 단계 모두 VLA 모델의 성능 향상에 결정적인 기여를 했음을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 로봇 조작을 위한 VLA 모델 초기화에 **대규모 인간 시연 영상과 비디오 생성 사전 훈련**이 매우 효과적임을 보여줍니다. 특히, **궤적 예측**을 중간 과제로 활용하여 시각적 역학 학습과 로봇 액션 생성 간의 간극을 연결하는 방법론은 데이터 희소성 문제를 해결하는 데 유용합니다. **ActionVAE**를 통한 액션 청크의 효율적인 표현은 실제 로봇 제어 시스템의 추론 속도와 견고성을 향상시키는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.