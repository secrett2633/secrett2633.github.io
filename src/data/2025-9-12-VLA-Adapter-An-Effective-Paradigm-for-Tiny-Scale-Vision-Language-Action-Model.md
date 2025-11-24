---
title: "[논문리뷰] VLA-Adapter: An Effective Paradigm for Tiny-Scale Vision-Language-Action
  Model"
excerpt: "Zirui Ge이 [arXiv]에 게시한 'VLA-Adapter: An Effective Paradigm for Tiny-Scale Vision-Language-Action
  Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Robotics
  - Multimodal Learning
  - Efficient AI
  - Model Adaptation
  - Bridge Attention
  - Low-resource Training

permalink: /ai/review/2025-9-12-VLA-Adapter-An-Effective-Paradigm-for-Tiny-Scale-Vision-Language-Action-Model/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09372)

**저자:** Yihao Wang, Pengxiang Ding, Lingxiao Li, et al.



## 핵심 연구 목표
VLA(Vision-Language-Action) 모델이 대규모 VLM(Vision-Language Model)과 광범위한 사전 훈련에 크게 의존하여 발생하는 높은 훈련 비용, 느린 미세 조정, 과도한 VRAM 사용 및 낮은 추론 효율성 문제를 해결하는 것을 목표로 합니다. 본 연구는 VL(Vision-Language) 표현을 A(Action)로 효과적으로 연결하여, 대규모 VLM 및 광범위한 사전 훈련에 대한 의존도를 줄이고 **작은 규모의 VLA 모델**을 구현하는 새로운 패러다임을 제안합니다.

## 핵심 방법론
**VLA-Adapter**라는 새로운 브리징 패러다임을 제안하며, 다양한 VL 조건이 액션 생성에 미치는 영향을 체계적으로 분석합니다. **Bridge Attention**을 포함한 **경량 Policy 모듈**을 통해 최적의 조건을 액션 공간에 자율적으로 주입하며, **VLM의 Raw features (CR)** 및 **ActionQuery features (CAQ)**를 통합합니다. **Qwen2.5-0.5B**와 같은 **작은 규모의 Prismatic VLM 백본**을 로봇 데이터 사전 훈련 없이 활용하여, **LoRA 미세 조정**과 함께 **L1 기반 Policy 네트워크**로 종단 간 학습을 수행합니다.

## 주요 결과
**0.5B-파라미터 백본**을 사용하여 **LIBERO-Long 벤치마크에서 97.3%의 성공률**을 달성하며, SOTA 수준의 성능을 입증했습니다. 기존 OpenVLA-OFT 대비 훈련 비용을 **304 GPU-h에서 8 GPU-h로 1/38배 절감**했고, 추론 처리량은 **3배 더 빠른 219.2 Hz**를 달성하여 압도적인 효율성을 보였습니다. 단일 소비자 등급 GPU에서 **8시간 만에** VLA 모델을 훈련할 수 있게 하여 배포 장벽을 크게 낮추었으며, CALVIN ABC→D에서도 **평균 길이 4.42**로 강력한 일반화 능력을 보입니다.

## AI 실무자를 위한 시사점
**작은 규모의 백본**으로 SOTA급 성능을 달성하고, **매우 낮은 훈련 비용**과 **빠른 추론 속도**를 제공하여 VLA 모델의 실제 배포 장벽을 크게 낮추는 실용적인 솔루션을 제시합니다. 리소스 제약이 있는 로봇 시스템에서 **효율적인 VLA 모델** 개발 및 적용을 위한 새로운 방향을 제시하며, **멀티모달 정보**를 효과적으로 활용하는 **Bridge Attention** 설계는 향후 모델 아키텍처 연구에 중요한 통찰력을 제공합니다. 사전 훈련된 로봇 데이터 없이도 높은 성능을 달성할 수 있다는 점은 VLA 모델 개발 접근 방식을 민주화하고, 더 많은 연구자가 이 분야에 참여할 수 있도록 장려합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.