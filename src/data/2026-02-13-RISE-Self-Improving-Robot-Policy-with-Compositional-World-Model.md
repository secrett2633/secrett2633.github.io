---
title: "[논문리뷰] RISE: Self-Improving Robot Policy with Compositional World Model"
excerpt: "이 [arXiv]에 게시한 'RISE: Self-Improving Robot Policy with Compositional World Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Robot Learning
  - Reinforcement Learning
  - World Models
  - Compositional Models
  - Robotic Manipulation
  - Self-Improving
  - Vision-Language-Action (VLA)

permalink: /ai/review/2026-02-13-RISE-Self-Improving-Robot-Policy-with-Compositional-World-Model/

toc: true
toc_sticky: true

date: 2026-02-13 00:00:00+0900+0900
last_modified_at: 2026-02-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.11075)

**저자:** Jiazhi Yang, Kunyang Lin, Jinwei Li, Wencong Zhang, Tianwei Lin, Longyan Wu, Zhizhong Su, Hao Zhao, Ya-Qin Zhang, Li Chen, Ping Luo, Xiangyu Yue, Hongyang Li



## 핵심 연구 목표
본 논문은 **VLA(Vision-Language-Action) 모델** 이 접촉이 많고 역동적인 로봇 조작 작업에서 여전히 취약하며, 물리적 환경에서의 온-정책(on-policy) 강화 학습이 하드웨어 비용, 느린 상호작용, 수동 리셋 등의 문제로 인해 확장이 어렵다는 한계를 해결하고자 합니다. 이를 위해 로봇이 스스로 개선할 수 있도록 학습 환경을 실제 세계에서 **상상 공간(imagination space)** 으로 전환하는 확장 가능한 프레임워크를 개발하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **RISE** 는 로봇의 자율적 자기 개선을 위한 강화 학습 프레임워크입니다. 핵심은 **Compositional World Model** 로, 이는 미래 상태를 예측하는 **Dynamics Model** 과 상상된 결과를 평가하여 이점(advantage)을 도출하는 **Value Model** 로 구성됩니다. **Dynamics Model** 은 효율적인 비디오 확산 모델을 기반으로 대규모 로봇 데이터셋과 **Task-centric Batching** 전략으로 훈련되며, **Value Model** 은 사전 훈련된 **VLA 정책 π0.5** 에서 초기화되어 **Progress Estimate** 및 **Temporal-Difference (TD) 학습** 목표를 활용합니다. 이 구성 요소들은 물리적 상호작용 없이 상상 롤아웃을 생성하고 정책을 업데이트하는 폐쇄 루프 자기 개선 파이프라인으로 통합됩니다.

## 주요 결과
RISE는 세 가지 도전적인 실제 로봇 작업에서 기존 방법론 대비 상당한 성능 향상을 달성했습니다. **Dynamic Brick Sorting** 에서 **+35%** , **Backpack Packing** 에서 **+45%** , **Box Closing** 에서 **+35%** 의 절대적인 성능 증가를 보였습니다. **Compositional World Model** 의 각 모듈에 대한 어블레이션 연구는 **Dynamics Model** 의 사전 훈련 및 **Task-centric Batching** , 그리고 **Value Model** 의 **Progress Loss** 와 **TD Learning Loss** 가 성능에 결정적인 영향을 미쳤음을 정량적으로 입증합니다.

## AI 실무자를 위한 시사점
RISE는 고비용의 물리적 상호작용 없이 로봇의 **온-정책 강화 학습** 을 가능하게 하여, 실제 로봇 학습의 확장성 및 안전성 문제를 해결할 수 있는 실용적인 방안을 제시합니다. **Compositional World Model** 은 각 구성 요소의 독립적인 아키텍처 최적화를 가능하게 하여 복잡한 로봇 제어 시스템 설계에 대한 통찰을 제공합니다. 이는 **VLA 모델** 과 **비디오 확산 모델** 의 활용성을 실제 로봇 조작에 대한 강력한 기반으로 확장하여, 향후 더 정교하고 다재다능한 로봇 시스템 개발에 기여할 것으로 예상됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.