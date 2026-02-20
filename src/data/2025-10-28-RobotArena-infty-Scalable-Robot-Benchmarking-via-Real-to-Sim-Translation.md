---
title: "[논문리뷰] RobotArena infty: Scalable Robot Benchmarking via Real-to-Sim
  Translation"
excerpt: "Kuan-Hsun Tu이 arXiv에 게시한 'RobotArena infty: Scalable Robot Benchmarking via Real-to-Sim
  Translation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robot Benchmarking
  - Real-to-Sim Translation
  - Vision-Language Models (VLMs)
  - Human Preference Learning
  - Domain Randomization
  - Robot Manipulation
  - Simulation Environments
  - Policy Evaluation

permalink: /ai/review/2025-10-28-RobotArena-infty-Scalable-Robot-Benchmarking-via-Real-to-Sim-Translation/

toc: true
toc_sticky: true

date: 2025-10-28 13:07:54+0900
last_modified_at: 2025-10-28 13:07:54+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.23571)

**저자:** Yash Jangir, Yidi Zhang, Kashu Yamazaki, Chenyu Zhang, Kuan-Hsun Tu, Tsung-Wei Ke, Lei Ke, Yonatan Bisk, Katerina Fragkiadaki



## 핵심 연구 목표
본 논문은 로봇 정책의 평가에 대한 확장 가능하고 재현 가능한 벤치마킹 프레임워크인 **RobotArena∞** 를 제안하여, 현실 세계 로봇 테스트의 비효율성(노동 집약적, 위험성, 낮은 재현성)과 기존 시뮬레이션 벤치마크의 한계(고립된 환경)를 극복하는 것을 목표로 합니다. 특히 **VLA(Vision-Language-Action) 모델** 의 일반화 및 견고성 평가를 대규모로 자동화하는 데 중점을 둡니다.

## 핵심 방법론
**RobotArena∞** 는 실제 비디오 데모를 시뮬레이션 환경으로 자동 변환하는 **현실-시뮬레이션 변환 파이프라인** 을 구축합니다. 이 과정은 **Vision-Language Models(VLMs)** 을 활용한 장면 이해, **2D-to-3D 생성 모델(Hunyuan-3D)** 을 통한 3D 자산 생성, 그리고 **미분 렌더링** 을 이용한 객체 포즈 추정 및 로봇-카메라 보정을 포함합니다. 로봇 정책은 **VLM 기반 자동 평가** 와 **크라우드소싱 기반 인간 선호도 평가(Bradley-Terry 모델)** 를 통해 평가되며, 배경, 색상, 객체 위치를 체계적으로 변화시키는 **제어된 섭동(perturbations)** 을 도입하여 강건성을 측정합니다.

## 주요 결과
이 벤치마크는 **100개의 명목 환경** 과 **수백 개의 섭동 환경** 에 걸쳐 **7000개 이상의 선호도 쌍** 을 집계하여, 현재까지 가장 광범위한 로봇 평가 노력을 보여주었습니다. **VLAs** 는 훈련 데이터와 다른 환경에서 성능이 크게 저하되었으며, **RoboVLM** 및 **CogACT** 가 **Octo-Base** 및 **SpatialVLA** 보다 일관되게 우수한 성능을 보였습니다. 특히 **SpatialVLA** 는 객체 위치 섭동에 대한 향상된 강건성을 보여 **3D 구조 모델링의 중요성** 을 입증했습니다.

## AI 실무자를 위한 시사점
**RobotArena∞** 는 실제 로봇 정책 평가의 시간과 비용을 획기적으로 줄일 수 있는 **확장 가능하고 재현성 높은 플랫폼** 을 제공합니다. 이는 현재 **VLA 모델의 일반화 능력과 강건성 부족** 을 명확히 보여주어, 실제 배포에 앞서 모델이 다양한 시나리오에 얼마나 잘 적응하는지 평가하는 데 필수적인 도구입니다. 개발자들은 이 프레임워크를 통해 **도메인 변화와 섭동에 덜 민감한 로봇 정책** 을 개발하고 검증하는 데 집중할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.