---
title: "[논문리뷰] VLANeXt: Recipes for Building Strong VLA Models"
excerpt: "[arXiv]에 게시된 'VLANeXt: Recipes for Building Strong VLA Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Robotics
  - Imitation Learning
  - Foundation Models
  - Ablation Study
  - Generalization
  - LIBERO Benchmark
  - Time-Series Forecasting

permalink: /ai/review/2026-02-24-VLANeXt-Recipes-for-Building-Strong-VLA-Models/

toc: true
toc_sticky: true

date: 2026-02-24 00:00:00+0900+0900
last_modified_at: 2026-02-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.18532)

**저자:** Xiao-Ming Wu, Bin Fan, Kang Liao, Jian-jian Jiang, Runze Yang, Yihang Luo, Zhonghua Wu, Wei-Shi Zheng, Chen Change Loy



## 핵심 연구 목표
파편화되어 있는 Vision-Language-Action (VLA) 모델 연구 분야에 구조를 제공하고, 일관된 프레임워크와 평가 환경에서 VLA 모델의 설계 공간을 체계적으로 재검토하는 것을 목표로 합니다. 이를 통해 강력한 VLA 모델을 구축하기 위한 실용적인 레시피를 도출하고, 커뮤니티가 활용할 수 있는 통일된 코드베이스를 제공하고자 합니다.

## 핵심 방법론
**RT-2** 및 **OpenVLA** 와 유사한 간단한 VLA 베이스라인에서 시작하여, **기초 구성 요소** , **인지 필수 요소** , **액션 모델링 관점** 의 세 가지 차원에서 설계 선택을 체계적으로 분석했습니다. 특히, **별도의 정책 헤드** , **MetaQuery** 유사 모듈, **액션 청킹** , **플로우 매칭 손실** 및 **Qwen3-VL** 과 같은 강력한 VLM 백본, **소프트 VLM-정책 연결** , **다중 뷰 입력** , **VLM 측 고유 수용 감각(proprioception) 조건화** , **주파수 도메인 보조 손실** 등의 디자인을 탐구했습니다.

## 주요 결과
제안된 **VLANeXt 모델(2.5B)** 은 **LIBERO** 및 **LIBERO-plus** 벤치마크에서 기존의 **OpenVLA-OFT (7B)** 를 포함한 최첨단 방법론들을 능가하는 성능을 달성했습니다. LIBERO 벤치마크에서 **평균 97.4%** 의 성공률을 기록했으며, LIBERO-plus 벤치마크에서는 **평균 80.1%** 의 성공률로 **OpenVLA-OFT (69.6%) 대비 10% 향상된** 견고한 일반화 능력을 보였습니다. 이러한 결과는 **소프트 VLM-정책 연결** 및 **주파수 도메인 액션 모델링** 등 특정 설계 선택의 효과를 입증합니다.

## AI 실무자를 위한 시사점
본 연구는 대규모 모델 확장에 의존하지 않고도 **강력하고 효율적인 VLA 모델** 을 구축할 수 있는 실용적인 레시피를 제공합니다. VLM-정책 인터페이스 및 멀티모달 신호 융합과 같은 **원칙적인 설계 선택** 이 VLA 모델의 성능에 미치는 중요성을 강조하여, AI/ML 엔지니어들이 보다 체계적으로 모델을 설계할 수 있도록 돕습니다. 또한, **시계열 예측** 의 개념을 로봇 액션 생성에 적용하는 것이 효과적임을 보여주어 새로운 방법론적 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.