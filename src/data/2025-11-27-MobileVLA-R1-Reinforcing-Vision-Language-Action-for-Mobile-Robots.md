---
title: "[논문리뷰] MobileVLA-R1: Reinforcing Vision-Language-Action for Mobile Robots"
excerpt: "Rui Yang이 [arXiv]에 게시한 'MobileVLA-R1: Reinforcing Vision-Language-Action for Mobile Robots' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA)
  - Mobile Robotics
  - Quadruped Robots
  - Chain-of-Thought (CoT)
  - Reinforcement Learning (RL)
  - Embodied AI
  - Multimodal Perception

permalink: /ai/review/2025-11-27-MobileVLA-R1-Reinforcing-Vision-Language-Action-for-Mobile-Robots/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17889)

**저자:** Ting Huang, Dongjian Li, Rui Yang, Zeyu Zhang, Zida Yang, Hao Tang



## 핵심 연구 목표
본 논문은 사족 보행 로봇의 자연어 명령을 연속적인 제어로 연결하는 데 따르는 근본적인 과제를 해결하고자 합니다. 기존 방법론이 고수준의 의미론적 추론과 저수준의 작동 사이의 간극을 메우지 못해 불안정한 그라운딩과 낮은 일반화 성능을 보이는 문제점을 개선하고, 명시적인 추론과 연속적인 제어를 가능하게 하는 통합적인 비전-언어-액션 프레임워크를 구축하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **MobileVLA-R1**은 계층적 비전-언어-액션 프레임워크로, 멀티모달 관측값을 기반으로 **구조화된 Chain-of-Thought (CoT) 액션 플랜**을 생성한 후, 이를 액션 디코더를 통해 **연속적인 로코모션 명령**으로 변환합니다. 학습은 **MobileVLA-CoT**라는 멀티-과립 CoT 데이터셋을 활용한 **지도 방식 미세 조정 (SFT)** 단계와 **GRPO (Group Relative Policy Optimization) 강화 학습** 단계를 통해 이루어집니다. 이는 명시적 추론과 연속적 제어 간의 밀접한 결합을 가능하게 합니다.

## 주요 결과
**VLN-CE 벤치마크 (R2R-CE 및 RxR-CE)**에서 기존 SOTA 방법론 대비 **평균 약 5%의 성공률 향상**을 달성하며 뛰어난 성능을 보였습니다. **QUARD 데이터셋**의 6가지 제어 태스크에서도 최신 비전-언어-액션 모델들을 일관되게 능가했습니다. 실제 환경인 **Unitree Go2 사족 보행 로봇**에 배포하여 복잡한 환경에서의 견고한 성능을 검증했으며, 보상 설계 및 멀티모달 인코더의 효과도 입증되었습니다.

## AI 실무자를 위한 시사점
이 연구는 **구조화된 CoT 추론**과 **연속적 제어**를 통합하여 로봇이 복잡한 자연어 명령을 해석하고 실행할 수 있는 새로운 길을 제시합니다. **강화 학습을 통한 추론 일관성 및 제어 안정성 향상**은 실제 환경에서의 로봇 응용에 중요한 통찰력을 제공합니다. 다만, 현재 **제어 스텝당 10~15초**에 달하는 높은 추론 지연 시간은 실시간, 고동적 환경 적용을 위해 **모델 경량화** 또는 **계층적 제어 방식** 도입이 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.