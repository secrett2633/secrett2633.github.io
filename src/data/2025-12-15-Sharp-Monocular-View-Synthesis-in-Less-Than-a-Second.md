---
title: "[논문리뷰] Sharp Monocular View Synthesis in Less Than a Second"
excerpt: "이 [arXiv]에 게시한 'Sharp Monocular View Synthesis in Less Than a Second' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - View Synthesis
  - 3D Gaussian Splatting
  - Single Image
  - Neural Rendering
  - Real-time
  - Feedforward Network
  - Monocular Depth Estimation
  - AR/VR

permalink: /ai/review/2025-12-15-Sharp-Monocular-View-Synthesis-in-Less-Than-a-Second/

toc: true
toc_sticky: true

date: 2025-12-15 00:00:00+0900+0900
last_modified_at: 2025-12-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.10685)

**저자:** Lars Mescheder, Wei Dong, Shiwei Li, Xuyang Bai, Marcel Santos, Peiyun Hu, Bruno Lecouat, Mingmin Zhen, Amaël Delaunoy, Tian Fang, Yanghai Tsin, Stephan R. Richter, Vladlen Koltun



## 핵심 연구 목표
이 논문은 단일 이미지로부터 **실시간 포토리얼리스틱 뷰 합성(photorealistic view synthesis)** 을 목표로 하며, 특히 **AR/VR 애플리케이션** 을 위한 **고해상도 3D 장면 표현** 을 1초 미만에 생성하는 것을 목표로 합니다. 기존 다중 이미지 기반 또는 느린 단일 이미지 방법론의 한계를 극복하여 **빠른 합성 시간** 과 **정확한 3D 표현** 을 제공하고자 합니다.

## 핵심 방법론
**SHARP** 는 단일 이미지를 입력받아 **신경망의 단일 피드포워드 패스** 를 통해 장면의 **3D Gaussian 표현(Kerbl et al., 2023)** 파라미터를 회귀합니다. 이 아키텍처는 **사전 훈련된 Monodepth 백본** , **깊이 디코더** , **깊이 조정 모듈** , 그리고 **Gaussian 디코더** 로 구성됩니다. 학습에는 **L1 색상 손실** , **지각 손실** , **BCE 알파 손실** , **깊이 L1 손실** 및 여러 **정규화 손실(예: 총 변동, 부유물 억제)** 을 포함하는 정교한 손실 구성과 **합성 데이터** 및 **자체 지도 미세 조정(SSFT)** 의 2단계 학습 커리큘럼을 사용합니다.

## 주요 결과
**SHARP** 는 표준 GPU에서 **1초 미만** 에 3D Gaussian 표현을 합성하고, **초당 100프레임 이상** 의 고해상도 이미지 렌더링을 지원합니다. 여러 데이터셋에서 최고 성능의 기존 모델 대비 **LPIPS를 25-34%** , **DISTS를 21-43%** 감소시켰으며, 합성 시간을 **300배 이상(3 orders of magnitude)** 단축하는 등 압도적인 개선을 보였습니다. 예를 들어 ScanNet++ 데이터셋에서 SHARP는 DISTS **0.071** , LPIPS **0.154** 를 달성했습니다.

## AI 실무자를 위한 시사점
이 연구는 **순수 회귀 기반 프레임워크** 가 고해상도 뷰 합성을 위한 **최첨단 성능** 을 달성할 수 있음을 입증하며, **확산 모델 기반 방법론** 에 비해 **극적인 속도 우위** 를 제공합니다. AI 실무자들은 **SHARP의 효율성** 을 통해 **개인 사진 컬렉션** 의 인터랙티브한 3D 탐색, **AR/VR 경험** 의 즉각적인 생성을 위한 새로운 가능성을 탐색할 수 있습니다. 또한, **깊이 조정 모듈** 과 같은 혁신적인 기법들은 불확실성이 내재된 3D 재구성 문제 해결에 대한 실용적인 접근법을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.