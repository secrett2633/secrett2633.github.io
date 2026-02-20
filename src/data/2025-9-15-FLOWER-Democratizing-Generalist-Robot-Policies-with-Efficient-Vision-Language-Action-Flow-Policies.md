---
title: "[논문리뷰] FLOWER: Democratizing Generalist Robot Policies with Efficient
  Vision-Language-Action Flow Policies"
excerpt: "Fabian Otto이 arXiv에 게시한 'FLOWER: Democratizing Generalist Robot Policies with Efficient
  Vision-Language-Action Flow Policies' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generalist Robot Policies
  - Vision-Language-Action Models
  - Efficient AI
  - Imitation Learning
  - Diffusion Models
  - Intermediate Fusion
  - Robotics

permalink: /ai/review/2025-9-15-FLOWER-Democratizing-Generalist-Robot-Policies-with-Efficient-Vision-Language-Action-Flow-Policies/

toc: true
toc_sticky: true

date: 2025-09-15 13:12:08+0900
last_modified_at: 2025-09-15 13:12:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04996)

**저자:** Moritz Reuss, Hongyi Zhou, Marcel Rühle, Ömer Erdinç Yağmurlu, Fabian Otto, Rudolf Lioutikov



## 핵심 연구 목표
본 논문은 현재 Vision-Language-Action (VLA) 정책의 높은 계산 비용과 자원 요구사항 문제를 해결하고자 합니다. 특히, 수십억 개의 파라미터를 가진 대규모 모델 없이도 강력한 성능을 달성하는 효율적인 일반화 로봇 정책을 개발하는 것을 목표로 합니다.

## 핵심 방법론
효율성 향상을 위해 두 가지 주요 기법을 제시합니다. 첫째, **중간 모달리티 융합(intermediate-modality fusion)** 을 통해 사전 학습된 VLM 레이어의 **30-50%** 를 가지치기하고, 결과 중간 임베딩을 **Flow Transformer** 의 입력으로 사용합니다. 둘째, **액션별 Global-AdaLN 컨디셔닝** 을 도입하여 트랜스포머 헤드 파라미터를 **20%** 감소시켰습니다. 이러한 기여를 통합한 **950M 파라미터 VLA** 인 **FLOWER** 는 **Rectified Flow** 를 사용하여 효율적인 액션 생성을 가능하게 합니다.

## 주요 결과
**FLOWER** 는 **200 H100 GPU 시간** 의 사전 학습만으로도 **10개의 시뮬레이션 및 실제 벤치마크에 걸쳐 190개 작업** 에서 경쟁 모델과 동등하거나 우수한 성능을 달성했습니다. 특히 **CALVIN ABC 벤치마크** 에서 **4.53** 이라는 새로운 SoTA를 기록했으며, 실제 환경에서는 OpenVLA의 **31%** 대비 두 배 높은 **61%** 의 평균 성공률을 보였습니다. 추론 효율성 측면에서 **RTX 4090 GPU** 에서 **311Hz** 의 처리량과 **1.85 GB** 의 낮은 VRAM 사용량을 보여, 상용 하드웨어 배포에 이상적임을 입증했습니다.

## AI 실무자를 위한 시사점
**FLOWER** 는 대규모 VLA 모델의 높은 컴퓨팅 장벽을 낮춤으로써 **로봇 정책 개발의 접근성** 을 크게 향상시킵니다. **중간 모달리티 융합** 과 **Global-AdaLN** 기법은 제한된 컴퓨팅 자원으로 고성능 로봇 제어 시스템을 구축하려는 AI/ML 엔지니어에게 실용적인 솔루션을 제공합니다. 빠른 사전 학습 시간과 효율적인 추론 성능 덕분에 **FLOWER** 는 실제 로봇 애플리케이션에 직접 적용 가능한 강력하고 비용 효율적인 일반화 정책의 개발을 가속화할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.