---
title: "[논문리뷰] InternVLA-M1: A Spatially Guided Vision-Language-Action Framework for
  Generalist Robot Policy"
excerpt: "Yilun Chen이 [arXiv]에 게시한 'InternVLA-M1: A Spatially Guided Vision-Language-Action Framework for
  Generalist Robot Policy' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robotics
  - Vision-Language-Action (VLA)
  - Spatial Grounding
  - Generalist Policy
  - Multimodal Learning
  - Instruction Following
  - Simulation-to-Real
  - Diffusion Models

permalink: /ai/review/2025-10-16-InternVLA-M1_A_Spatially_Guided_Vision-Language-Action_Framework_for_Generalist_Robot_Policy/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13778)

**저자:** Yilun Chen, Ning Gao, Jiangmiao Pang, et al. (Intern Robotics, Shanghai AI Laboratory)



## 핵심 연구 목표
본 논문은 로봇이 지시를 이해하고 3D 공간에서 행동하는 데 필요한 본질적인 격차를 해소하여, 확장 가능하고 범용적인 지능을 갖춘 지시-추종 로봇을 개발하는 것을 목표로 합니다. 특히, 텍스트 명령과 로봇 행동 사이의 핵심 연결 고리로서 **공간 접지(spatial grounding)**를 활용하여 추상적인 목표와 구체적인 물리적 실행을 통합하는 데 중점을 둡니다.

## 핵심 방법론
InternVLA-M1은 **공간 유도형 시각-언어-행동 훈련(spatially guided vision-language-action training)**이라는 핵심 아이디어를 기반으로 한 **2단계 파이프라인**을 사용합니다. 첫째, **2.3M 공간 추론 데이터**로 **VLM 플래너**를 사전 훈련하여 "어디에 행동할지"를 결정하는 공간 접지 능력을 학습합니다. 둘째, **플러그 앤 플레이 공간 프롬프팅(plug-and-play spatial prompting)**을 통해 **DiT 액터(DIT Actor)**가 "어떻게 행동할지"를 결정하는 신체 인식 행동을 생성합니다. 이 과정에서 **Qwen2.5-VL-3B-instruct**와 **Diffusion Policy**를 포함하는 **이중 시스템 아키텍처**를 활용하여 고수준 추론과 저수준 제어를 통합합니다.

## 주요 결과
InternVLA-M1은 **SimplerEnv Google Robot**에서 공간 유도 기능이 없는 모델 대비 **+14.6%** (평균 성공률 **80.7% VM / 76.0% VA**) 향상, **WidowX**에서 **+17%** (평균 성공률 **71.7%**) 향상을 달성하며 SOTA를 경신했습니다. **LIBERO Franka** 벤치마크에서는 **95.9%**의 평균 성공률로 기존 SOTA를 **+4.3%** 상회했으며, 특히 공간 및 장기 작업에서 **98.0%**와 **92.6%**의 높은 성공률을 보였습니다. 실제 환경에서의 군집형 픽앤플레이스 작업에서도 **7.3%**의 성능 향상과 합성 데이터와의 공동 훈련 시 **미등록 객체 및 새로운 구성**에서 **+20.6%**의 성능을 기록했습니다.

## AI 실무자를 위한 시사점
본 연구는 **공간 접지**가 범용 로봇 정책을 위한 확장 가능하고 탄력적인 기반 원칙임을 강조하여, 로봇의 **지시 추종 능력**을 근본적으로 개선할 수 있음을 보여줍니다. 특히, **대규모 시뮬레이션 데이터를 활용한 사전 훈련**과 **실제 환경에서의 공동 훈련**을 통해 **미등록 객체** 및 **새로운 작업 환경**에 대한 높은 일반화 및 강건성을 확보할 수 있습니다. 이는 **로봇 시스템 개발자**들이 실제 세계에 배포될 로봇의 신뢰성과 적용 범위를 확장하는 데 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.