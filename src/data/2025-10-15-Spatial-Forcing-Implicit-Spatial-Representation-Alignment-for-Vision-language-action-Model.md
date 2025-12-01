---
title: "[논문리뷰] Spatial Forcing: Implicit Spatial Representation Alignment for
  Vision-language-action Model"
excerpt: "이 [arXiv]에 게시한 'Spatial Forcing: Implicit Spatial Representation Alignment for
  Vision-language-action Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Spatial Perception
  - Implicit Representation Alignment
  - 3D Foundation Models
  - Robotics
  - Data Efficiency
  - Representation Learning

permalink: /ai/review/2025-10-15-Spatial-Forcing-Implicit-Spatial-Representation-Alignment-for-Vision-language-action-Model/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12276)

**저자:** Fuhao Li, Wenxuan Song, Han Zhao, Jingbo Wang, Pengxiang Ding, Donglin Wang, Long Zeng, Haoang Li



## 핵심 연구 목표
본 논문은 2D 데이터로 사전 훈련된 VLA 모델이 3D 물리 세계에서 정확한 동작을 수행하는 데 필요한 공간 인식이 부족하다는 문제를 해결하고자 합니다. 기존의 명시적인 3D 센서 입력이나 심도 추정기 기반 솔루션이 가진 한계(센서 노이즈, 하드웨어 이질성, 불완전한 데이터 등)를 극복하며, 명시적인 3D 입력 없이도 VLA 모델이 공간 이해 능력을 암묵적으로 개발하도록 돕는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **Spatial Forcing (SF)** 은 VLA 모델의 중간 시각 임베딩을 사전 훈련된 3D 파운데이션 모델에서 생성된 기하학적 표현과 정렬시키는 간단하면서도 효과적인 전략입니다. 구체적으로, **VGGT (Visual Geometry Grounded Transformer)** 를 3D 파운데이션 모델로 사용하여 정규화된 공간 표현을 얻고, 이 표현을 VLA의 중간 레이어(예: **24번째 레이어** ) 시각 임베딩과 **코사인 유사도** 를 통해 정렬하도록 강제합니다. 이 정렬 손실은 액션 생성 손실과 결합하여 모델을 훈련시킵니다.

## 주요 결과
SF는 **LIBERO** 및 **RoboTwin** 벤치마크에서 기존 2D 및 3D 기반 VLA 모델들을 능가하는 최첨단 성능을 달성했습니다. LIBERO 벤치마크에서 **98.5%의 평균 성공률** 을 기록하여 OpenVLA-OFT (97.1%), GeoVLA (97.7%), 3D-CAVLA (98.1%)와 같은 강력한 베이스라인을 뛰어넘었습니다. 또한, 훈련 속도를 최대 **3.8배** 가속화하고, **5%의 데이터만으로 75.8%의 성공률** 을 달성하며 데이터 효율성을 크게 향상시켰습니다. 심도 프로빙 및 t-SNE 시각화를 통해 SF가 정렬된 표현에 공간 정보를 효과적으로 통합함을 입증했습니다.

## AI 실무자를 위한 시사점
Spatial Forcing은 명시적인 3D 센서나 심도 추정기에 의존하지 않고 VLA 모델에 공간 인식 기능을 부여하는 확장 가능하고 보편적인 패러다임을 제공합니다. 이는 실제 로봇 공학 애플리케이션에서 제한된 데이터와 연산 자원으로도 학습 속도와 데이터 효율성을 크게 개선할 수 있음을 의미합니다. 또한, 추론 시 추가적인 구조나 계산 오버헤드 없이 기존 VLA 모델에 통합될 수 있어 높은 적용 가능성을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.