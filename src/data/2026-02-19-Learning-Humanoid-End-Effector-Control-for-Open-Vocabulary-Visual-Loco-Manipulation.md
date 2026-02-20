---
title: "[논문리뷰] Learning Humanoid End-Effector Control for Open-Vocabulary Visual Loco-Manipulation"
excerpt: "arXiv에 게시된 'Learning Humanoid End-Effector Control for Open-Vocabulary Visual Loco-Manipulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Humanoid Robotics
  - End-Effector Control
  - Loco-Manipulation
  - Open-Vocabulary Perception
  - Visual Generalization
  - Sim2Real Transfer
  - Residual Learning
  - Robot Grasping

permalink: /ai/review/2026-02-19-Learning-Humanoid-End-Effector-Control-for-Open-Vocabulary-Visual-Loco-Manipulation/

toc: true
toc_sticky: true

date: 2026-02-19 00:00:00+0900+0900
last_modified_at: 2026-02-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.16705)

**저자:** Runpei Dong†, Ziyan Li†, Xialin He, Saurabh Gupta



## 핵심 연구 목표
본 연구는 인간형 로봇이 온보드 센서만을 사용하여 새로운 객체를 새로운 환경에서 **자율적으로 로코-조작(loco-manipulate)** 하는 능력을 개발하는 것을 목표로 합니다. 특히, **정확한 엔드-이펙터(EE) 제어** 와 **오픈-보케뷸러리 대규모 시각 모델** 을 통한 장면 이해의 일반화라는 핵심 난제를 해결하고자 합니다. 기존 실세계 모방 학습의 제한된 일반화 능력 문제를 극복하는 새로운 패러다임을 제시합니다.

## 핵심 방법론
제안된 **HERO** 시스템은 **정확한 잔차 인식 EE 추적 정책(residual-aware EE tracking policy)** 을 핵심으로 하며, 고전 로봇 공학(예: **역기구학** )과 머신러닝을 혁신적으로 결합합니다. 이 정책은 **학습된 신경 순방향 모델(neural forward model)** 을 통해 정확한 순방향 기구학을 제공하고, **목표 조정(goal adjustment)** 및 **주기적 재계획(periodic replanning)** 을 수행하여 추적 오류를 보정합니다. 시각적 일반화를 위해 **Grounding DINO 1.5** 및 **SAM-3** 와 같은 **오픈-보케뷸러리 대규모 비전 모델** 을 사용하며, **AnyGrasp 모델** 로 평행 집게형 그립을 생성하고 **Dex-3 핸드** 에 리타겟팅합니다.

## 주요 결과
HERO 시스템은 실세계에서 새로운 객체에 대한 **평균 83.8%의 성공률** 을 달성했습니다. 특히, 엔드-이펙터 추적 오류를 이전 최신 기술 대비 **2.5cm로 3.2배 감소** 시켰으며, **학습된 신경 순방향 모델** 은 분석적 순방향 기구학의 오류를 **1.76cm에서 0.27cm로 6배 개선** 하는 효과를 보였습니다. 이러한 성능은 굽히기, 웅크리기, 비틀기와 같은 **전신 제어** 를 통해 43cm에서 92cm 높이의 다양한 표면에 놓인 일상 객체를 안정적으로 조작할 수 있음을 입증합니다.

## AI 실무자를 위한 시사점
이 연구는 **대규모 시각 모델의 일반화 능력** 과 **시뮬레이션 기반 학습의 정밀한 제어 성능** 을 결합하여 인간형 로봇 조작의 새로운 가능성을 열었습니다. **잔차 학습** 을 통한 **분석적 로봇 모델의 부정확성 보정** 은 로봇 시스템의 정확도를 획기적으로 향상시키는 실용적인 방법론을 제시합니다. 또한, **모듈형 시스템 설계** 는 복잡한 로봇 작업을 시각 및 제어 구성 요소로 분리하여 **확장성 및 유지보수성** 을 높이며, **오픈-보케뷸러리 기능** 은 사전 정의되지 않은 다양한 객체와의 상호작용을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.