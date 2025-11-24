---
title: "[논문리뷰] LIBERO-Plus: In-depth Robustness Analysis of Vision-Language-Action
  Models"
excerpt: "이 [arXiv]에 게시한 'LIBERO-Plus: In-depth Robustness Analysis of Vision-Language-Action
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Robotics
  - Robustness Analysis
  - Generalization
  - Perturbations
  - Benchmark
  - LIBERO-Plus
  - Multimodal AI

permalink: /ai/review/2025-10-16-LIBERO-Plus-In-depth-Robustness-Analysis-of-Vision-Language-Action-Models/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13626)

**저자:** Senyu Fei, Siyin Wang, Junhao Shi, Zihao Dai, Jikun Cai, Pengfang Qian, Li Ji, Xinzhe He, Shiduo Zhang, Zhaoye Fei, Jinlan Fu, Jingjing Gong, Xipeng Qiu



## 핵심 연구 목표
본 연구는 Visual-Language-Action (VLA) 모델이 기존 벤치마크에서 높은 성능을 보임에도 불구하고, 실제 환경의 **변동성에 대한 근본적인 취약성**을 체계적으로 분석하고 드러내는 것을 목표로 합니다. VLA 모델의 **강건성 부족**과 **일반화 능력의 한계**를 심층적으로 규명하고자 합니다.

## 핵심 방법론
연구팀은 **LIBERO-Plus 벤치마크**를 도입하여 **7가지 차원의 교란(perturbation)**(객체 배치, 카메라 시점, 로봇 초기 상태, 언어 지시, 조명 조건, 배경 텍스처, 센서 노이즈)을 체계적으로 적용했습니다. **다수의 최신 VLA 모델**(**OpenVLA, π0, Nora, WorldVLA, UniVLA, RIPT-VLA** 등)을 대상으로 성능을 평가하고, 특히 **언어 지시 제거** 및 **목표 객체 대체 태스크**를 통해 언어 이해도를 심층 분석했습니다. 또한, **다차원 교란 하에서의 합성 일반화(compositional generalization)**를 측정했습니다.

## 주요 결과
기존 VLA 모델들은 **카메라 시점** 및 **로봇 초기 상태**와 같은 **미미한 교란**에도 불구하고 성능이 **95%에서 30% 미만으로 급락**하는 **심각한 취약성**을 보였습니다. 특히, 모델들은 언어 지시를 **대부분 무시**하며, 목표 객체 대체 태스크에서는 성공률이 **거의 0%**에 가까웠습니다. 새로운 **LIBERO-Plus 데이터셋**으로 훈련된 모델은 전반적인 성공률 **79.6%**를 달성했으며, 특히 **카메라 시점**에서 **92.8%**의 강건성을 보여, 기존 모델 대비 **37.2%p 향상**되었습니다.

## AI 실무자를 위한 시사점
현재 VLA 모델들은 벤치마크 점수와 달리 **실제 환경에 대한 강건성 및 일반화 능력이 매우 부족**하여, 로봇 시스템에 적용 시 치명적인 오류를 일으킬 수 있습니다. AI 엔지니어는 모델 개발 시 **다양한 교란 요소를 고려한 강건성 평가**를 필수적으로 수행해야 합니다. **LIBERO-Plus 벤치마크**와 **다양화된 훈련 데이터셋**은 이러한 강건한 VLA 모델을 개발하는 데 중요한 자원이며, **첫 시점 손목 카메라**와 같은 **시각 입력의 다양화**가 강건성 향상에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.