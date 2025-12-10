---
title: "[논문리뷰] Ground Slow, Move Fast: A Dual-System Foundation Model for Generalizable Vision-and-Language Navigation"
excerpt: "이 [arXiv]에 게시한 'Ground Slow, Move Fast: A Dual-System Foundation Model for Generalizable Vision-and-Language Navigation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Navigation
  - Dual-System Architecture
  - Foundation Models
  - Diffusion Policies
  - Robotics
  - Real-time Control
  - Generalization
  - Autonomous Navigation

permalink: /ai/review/2025-12-10-Ground-Slow-Move-Fast-A-Dual-System-Foundation-Model-for-Generalizable-Vision-and-Language-Navigation/

toc: true
toc_sticky: true

date: 2025-12-10 00:00:00+0900+0900
last_modified_at: 2025-12-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.08186)

**저자:** Meng Wei, Chenyang Wan, Jiaqi Peng, Xiqian Yu, Yuqiang Yang, Delin Feng, Wenzhe Cai, Chenming Zhu, Tai Wang, Jiangmiao Pang, Xihui Liu



## 핵심 연구 목표
기존 Vision-Language Navigation (VLN) 모델의 단일 파이프라인이 유발하는 단편적인 동작, 높은 지연 시간, 그리고 동적 장애물 회피의 어려움을 해결하는 것이 목표입니다. 고수준의 언어-시각 추론 능력과 저수준의 실시간 액션 실행 능력을 효과적으로 통합하여 **일반화 가능한 로봇 내비게이션** 을 구현하고자 합니다.

## 핵심 방법론
논문은 **DualVLN** 이라는 듀얼 시스템 접근 방식을 제안합니다. **System 2** 는 **7B 사전 훈련된 VLM (QwenVL-2.5)** 을 사용하여 2Hz로 중간 목표 **픽셀 목표 (waypoints)** 를 "느리게" 추론하는 고수준 글로벌 플래너 역할을 합니다. **System 1** 은 **경량 멀티모달 컨디셔닝 Diffusion Transformer 정책** 으로, 30Hz로 **System 2의 잠재 특징(latent features)** 과 고주파 RGB 입력을 활용하여 부드럽고 정확한 궤적을 "빠르게" 생성합니다. 두 시스템은 **비동기 추론** 을 통해 효율적으로 연동됩니다.

## 주요 결과
DualVLN은 VLN-CE 벤치마크에서 **SR 64.3%, SPL 58.5%, nDTW 70.0%** 를 달성하여 기존 최고 성능을 뛰어넘었습니다. VLN-PE 벤치마크에서도 **SPL 51.6%, SR 55.9%** 로 상당한 성능 향상을 보였습니다. 실세계 로봇 (Turtlebot4, Unitree Go2, Unitree G1) 실험을 통해 다양한 환경과 플랫폼에서 **견고한 장거리 계획 및 실시간 동적 장애물 회피 능력** 을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 고수준 추론과 저수준 제어를 분리하는 **듀얼 시스템 아키텍처** 가 로봇 내비게이션의 **일반화 및 실시간 성능** 에 매우 효과적임을 보여줍니다. 특히, **대규모 VLM의 추론 능력** 과 **경량 Diffusion 정책의 민첩성** 을 결합한 방식은 복잡하고 동적인 실제 환경에서의 자율 로봇 배포에 중요한 기술적 토대를 제공합니다. **잠재 목표 표현** 을 통한 시스템 간 정보 교환 방식은 향후 다중 모달 로봇 제어 시스템 설계에 영감을 줄 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.