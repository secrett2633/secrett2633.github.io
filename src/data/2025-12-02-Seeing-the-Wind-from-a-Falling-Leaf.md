---
title: "[논문리뷰] Seeing the Wind from a Falling Leaf"
excerpt: "Emily Yue-Ting Jia이 [arXiv]에 게시한 'Seeing the Wind from a Falling Leaf' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Inverse Graphics
  - Differentiable Physics
  - Force Estimation
  - Video Generation
  - Material Point Method
  - 3D Gaussians
  - Spatio-temporal Modeling
  - Vision-Language Models

permalink: /ai/review/2025-12-02-Seeing-the-Wind-from-a-Falling-Leaf/

toc: true
toc_sticky: true

date: 2025-12-02 00:00:00+0900+0900
last_modified_at: 2025-12-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.00762)

**저자:** Zhiyuan Gao, Jiageng Mao, Hong-Xing Yu, Haozhe Lou, Emily Yue-Ting Jia, Jernej Barbic, Jiajun Wu, Yue Wang



## 핵심 연구 목표
본 연구는 영상 데이터로부터 나뭇잎이 떨어지는 바람과 같이 눈에 보이지 않는 물리적 힘(invisible forces)을 추정하는 것을 목표로 합니다. 인간이 시각적 단서만으로 보이지 않는 물리적 효과를 인지하는 능력을 모방하여, 비전과 물리학 간의 간극을 줄이고 픽셀 뒤의 물리적 과정을 이해하는 데 기여하고자 합니다.

## 핵심 방법론
논문은 **객체 모델링** , **힘 표현** , **물리적 프로세스** 를 통합하는 **종단 간 미분 가능한 역 그래픽스 프레임워크** 를 제안합니다. 객체는 **3D Gaussian** 으로 표현되며, **Vision-Language Models (VLM)** 을 통해 물리적 속성(질량, Young's modulus 등)을 추정합니다. 힘은 시공간 연속성을 모델링하는 **인과적 Tri-plane** 으로 표현되며, 객체 움직임은 **미분 가능한 Material Point Method (MPM) 물리 시뮬레이터** 를 통해 시뮬레이션됩니다. 특히, 최적화 과정에서 **4D Sparse Tracking Objective** 를 도입하여 힘 추정의 견고성과 정확성을 높였습니다.

## 주요 결과
제안된 방법론은 합성 및 실제 시나리오 모두에서 힘을 성공적으로 복구함을 입증했습니다. 합성 시나리오에서 탄성 객체에 대해 **평균 크기 오차(Magnitude Error) 5.14%** 및 **방향 오차(Direction Error) 4.38°** 라는 낮은 수치 오차를 달성했습니다. 이는 다른 4D 표현(K-planes, Point contact forces) 및 손실 함수(Image Loss, Flow+Depth Loss) 대비 우수한 성능을 보여줍니다. 또한, **물리 기반 비디오 생성** 및 **모션 편집** (새로운 객체 삽입, 질량 및 외부 힘 변경, 경계 조건 조정)과 같은 응용 가능성을 성공적으로 시연했습니다.

## AI 실무자를 위한 시사점
이 연구는 비전 시스템이 단순한 외형을 넘어 **물리적 상호작용** 을 이해하고 예측하는 새로운 가능성을 열었습니다. **미분 가능한 물리 시뮬레이션** 과 **Vision-Language Models** 의 통합은 실제와 같은 물리 기반 비디오 생성 및 편집 도구를 개발하는 데 중요한 기반이 될 수 있습니다. 이는 로봇 공학, 시뮬레이션, 증강 현실과 같이 물리적 세계와 상호작용하는 AI 시스템 개발에 실용적인 영향을 미칠 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.