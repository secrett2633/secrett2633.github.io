---
title: "[논문리뷰] DexNDM: Closing the Reality Gap for Dexterous In-Hand Rotation via
  Joint-Wise Neural Dynamics Model"
excerpt: "Li Yi이 arXiv에 게시한 'DexNDM: Closing the Reality Gap for Dexterous In-Hand Rotation via
  Joint-Wise Neural Dynamics Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Dexterous Manipulation
  - In-Hand Rotation
  - Sim-to-Real Transfer
  - Neural Dynamics Model
  - Joint-Wise Learning
  - Autonomous Data Collection
  - Reinforcement Learning
  - Robotics

permalink: /ai/review/2025-10-10-DexNDM-Closing-the-Reality-Gap-for-Dexterous-In-Hand-Rotation-via-Joint-Wise-Neural-Dynamics-Model/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08556)

**저자:** Xueyi Liu, He Wang, Li Yi, Y. Ma, Roberto Calandra, Jitendra Malik



## 핵심 연구 목표
본 연구는 **컨택트(contact)가 풍부한 인핸드 객체 회전(in-hand object rotation)** 태스크에서 발생하는 **심-투-리얼(sim-to-real) 격차** 의 근본적인 문제를 해결하는 것을 목표로 합니다. 기존 방법론들은 객체 유형, 손목 방향, 회전 축 등 다양한 조건에서 **일반화 능력** 이 부족하여 실제 세계 배포에 한계가 있었으며, 복잡한 상호작용 역학 모델링의 어려움이 주요 도전 과제였습니다.

## 핵심 방법론
본 연구는 **모델-프리(model-free) 강화 학습(RL)** 과 새로운 **심-투-리얼 전략** 을 결합한 프레임워크를 제안합니다. 첫째, **전문가-일반주의자 파이프라인** 을 통해 시뮬레이션에서 **범주별 오라클 정책** 을 훈련하고, 이를 **행동 복제(Behavior Cloning, BC)** 를 사용하여 통합 **일반주의자 정책** 으로 증류합니다. 둘째, **조인트별 신경 역학 모델(Joint-Wise Neural Dynamics Model, DexNDM)** 을 도입하여 시스템 역학을 각 조인트의 **고유한 과거 상태-액션 이력** 에서 예측하도록 **분해(factorize)** 함으로써 샘플 효율성과 일반화 능력을 향상시킵니다. 셋째, **"카오스 박스(Chaos Box)"** 라는 **자율 데이터 수집 전략** 을 사용하여 인간의 개입 없이 실제 세계에서 다양한 하중과 노이즈가 포함된 데이터를 효율적으로 수집합니다. 마지막으로, 학습된 조인트별 역학 모델을 기반으로 **잔여 정책(Residual Policy)** 을 훈련하여 시뮬레이션에서 훈련된 기본 정책을 실제 환경에 적응시키고 현실 격차를 메웁니다.

## 주요 결과
시뮬레이션 환경에서 본 연구의 일반주의자 정책은 **AnyRotate***와 같은 강력한 기준선 대비 **37%에서 81%** 더 높은 회전 보상( **RotR** )을 달성하며 미학습 객체에 대한 **우수한 일반화 능력** 을 입증했습니다. 실제 세계 평가에서는 **DexNDM** 이 다양한 객체(최대 **5.33** 의 종횡비, 작은 크기, 복잡한 모양)와 다양한 손목 방향 및 회전 축에서 **전례 없는 회전 성능** 을 보였습니다. 예를 들어, "Tin Cylinder"를 손바닥 아래 방향으로 회전시켰을 때 **39.10 라디안** 의 회전량을 달성하여, AnyRotate*의 **5.52 라디안** 보다 훨씬 우수했습니다. 또한, 본 정책은 **도구 사용 및 조립과 같은 복잡한 원격 조작 태스크** 에도 성공적으로 적용될 수 있음을 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 복잡한 **로봇 조작 태스크** 에서 **심-투-리얼 격차** 를 해소하기 위한 **견고하고 일반화 가능한 프레임워크** 를 제시합니다. **조인트별 역학 모델링** 은 정보 병목 역할을 통해 **낮은 데이터 환경** 에서도 뛰어난 샘플 효율성과 일반화 성능을 제공하여, 복잡한 시스템의 학습 문제를 완화하는 효과적인 방법론임을 시사합니다. 또한, **자율 데이터 수집 전략** 은 실제 세계 데이터 획득의 주요 병목 현상을 해결하여, AI 실무자들이 **인간의 개입 없이 확장 가능한 데이터셋** 을 구축할 수 있는 실용적인 길을 열어줍니다. 이는 복잡한 로봇 시스템 개발에서 **모델 아키텍처와 데이터 수집 전략** 을 재고하는 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.