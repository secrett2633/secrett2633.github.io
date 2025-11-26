---
title: "[논문리뷰] RynnVLA-002: A Unified Vision-Language-Action and World Model"
excerpt: "이 [arXiv]에 게시한 'RynnVLA-002: A Unified Vision-Language-Action and World Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA) Model
  - World Model
  - Robotics
  - Unified Framework
  - Multi-modal Learning
  - Action Generation
  - Attention Mask
  - Continuous Control

permalink: /ai/review/2025-11-24-RynnVLA-002-A-Unified-Vision-Language-Action-and-World-Model/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17502)

**저자:** Jun Cen, Siteng Huang, Yuqian Yuan, Kehan Li, Hangjie Yuan, Chaohui Yu, Yuming Jiang, Jiayan Guo, Xin Li, Hao Luo, Fan Wang, Deli Zhao, Hao Chen



## 핵심 연구 목표
본 논문은 기존 VLA 모델(액션 다이내믹스 이해 부족, 상상력 및 물리 지식 결여)과 월드 모델(직접적인 액션 생성 불가)의 한계를 극복하기 위해, **VLA 모델과 월드 모델을 단일 프레임워크로 통합**하는 것을 목표로 합니다. 이를 통해 환경 다이내믹스와 액션 플래닝을 공동으로 학습하며, 상호 보완적인 이점을 얻고자 합니다.

## 핵심 방법론
RynnVLA-002는 이미지, 텍스트, 액션을 인코딩하는 **세 가지 토크나이저**를 사용하여 단일 LLM 아키텍처 내에서 모달리티 간 이해와 생성을 통합합니다. 특히, 이산 액션 청크 생성을 위한 **액션 어텐션 마스킹 전략**을 도입하여 오류 전파를 완화하고, **연속 액션 트랜스포머 헤드**를 추가하여 높은 일반화 능력과 부드러운 궤적 생성을 가능하게 합니다. 전체 학습은 VLA 모델 데이터와 월드 모델 데이터를 혼합하여 진행됩니다.

## 주요 결과
RynnVLA-002는 사전 학습 없이 **LIBERO 시뮬레이션 벤치마크**에서 **97.4%의 성공률**을 달성하며, 기존 VLA 및 월드 모델을 능가하는 성능을 보였습니다. 실세계 **LeRobot 실험**에서는 통합된 월드 모델이 전체 성공률을 **50% 향상**시키는 것으로 나타났습니다. 특히, 월드 모델 데이터를 훈련에 통합했을 때 이산 액션의 성공률이 62.8%에서 67.8%로, 연속 액션은 91.6%에서 94.6%로 개선되었습니다.

## AI 실무자를 위한 시사점
본 연구는 로봇 학습에서 **통합된 VLA 및 월드 모델의 강력한 시너지 효과**를 입증했습니다. 특히, 월드 모델의 물리학 및 환경 다이내믹스 이해 능력은 VLA 모델의 객체 상호작용 및 실패 복구 능력(재시도)을 크게 향상시킵니다. 이산 액션은 빠른 수렴을 돕고, 연속 액션은 실세계 로봇 작업에서 더 부드럽고 일반화 가능한 제어를 제공하므로 **하이브리드 액션 생성 접근 방식**이 매우 실용적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.