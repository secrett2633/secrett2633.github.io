---
title: "[논문리뷰] HERMES: Human-to-Robot Embodied Learning from Multi-Source Motion Data
  for Mobile Dexterous Manipulation"
excerpt: "Tianhai Liang이 [arXiv]에 게시한 'HERMES: Human-to-Robot Embodied Learning from Multi-Source Motion Data
  for Mobile Dexterous Manipulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Dexterous Manipulation
  - Mobile Manipulation
  - Human-to-Robot Learning
  - Sim2Real
  - Reinforcement Learning
  - Depth Image
  - Visual Localization
  - Bimanual Control

permalink: /ai/review/2025-9-1-HERMES_Human-to-Robot_Embodied_Learning_from_Multi-Source_Motion_Data_for_Mobile_Dexterous_Manipulation/

toc: true
toc_sticky: true

date: 2025-09-01 13:14:34+0900
last_modified_at: 2025-09-01 13:14:34+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.20085)

**저자:** Tianhai Liang, Pu Hua, Langzhe Gu, Tianming Wei, Zhecheng Yuan



## 핵심 연구 목표
이 논문은 복잡한 다지(multi-fingered) 로봇 핸드를 활용한 모바일 양손 로봇 조작(mobile bimanual dexterous manipulation)에서 **다양한 소스의 인간 동작 데이터를 실제 로봇 행동으로 효과적으로 변환**하는 도전 과제를 해결하는 것을 목표로 합니다. 특히, 기존 방법론이 **높은 차원의 액션 공간과 다양한 환경 조건에 대한 적응성**에서 겪는 한계를 극복하고자 합니다.

## 핵심 방법론
HERMES는 **강화 학습(RL)** 접근 방식을 통해 **이종 인간 동작 데이터(시뮬레이션 조작, 모션 캡처, 원본 비디오)를 로봇 동작으로 변환**합니다. **객체 중심 거리 체인(Object-centric distance chain)** 및 **객체 궤적 추적(Object trajectory tracking)**을 포함하는 일반화 가능한 보상 설계를 사용합니다. 시뮬레이션에서 학습된 상태 기반 전문가 정책을 시각 기반 학생 정책으로 증류하기 위해 **DAgger 증류(Dagger distillation)**와 **객체 중심 깊이 이미지 증강(object-centric depth image augmentation)** 기법을 활용합니다. 또한, 자율 탐색 및 정밀 조작을 위해 **VINT 내비게이션 파운데이션 모델(VINT navigation foundation model)**에 **폐쇄 루프 PnP(Perspective-n-Point) 현지화 메커니즘**을 통합합니다.

## 주요 결과
HERMES는 다양한 복잡한 모바일 양손 조작 작업에서 **일관되게 일반화 가능한 행동**을 보여주었습니다. 실제 환경 조작 평가에서 HERMES는 순수 깊이(raw depth) 입력 기반의 기준선 대비 평균 **+54.5%의 성공률 향상**을 달성했습니다. 예를 들어, 'Scan Bottle' 작업에서 HERMES는 **73.3%의 성공률**을 기록한 반면, 기준선은 **0%**였습니다. 내비게이션 현지화에서는 **VINT** 대비 거리 오차 **18cm**에서 **2.4cm**로, 방향 오차 **2.57°**에서 **1.79°**로 현저히 감소했습니다.

## AI 실무자를 위한 시사점
HERMES는 **다양한 소스의 인간 동작 데이터**를 활용하여 복잡한 로봇 조작 기술을 학습하는 효과적인 프레임워크를 제시합니다. 특히 **깊이 이미지 기반의 Sim2Real 전이**와 **내비게이션 및 조작 모듈의 시너지 효과**를 통해 실제 환경에서의 로봇 적용 가능성을 크게 확장했습니다. 그러나 정적 작업에 특화되어 있고, 물리 파라미터 튜닝 및 하드웨어 정렬 등의 **수동 개입이 여전히 필요**하다는 점은 향후 개선 과제입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.