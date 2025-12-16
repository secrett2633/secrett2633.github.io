---
title: "[논문리뷰] Openpi Comet: Competition Solution For 2025 BEHAVIOR Challenge"
excerpt: "Jinwei Gu이 [arXiv]에 게시한 'Openpi Comet: Competition Solution For 2025 BEHAVIOR Challenge' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied AI
  - Long-horizon Tasks
  - Vision-Language-Action Models (VLA)
  - BEHAVIOR Challenge
  - Offline RL
  - Pre-training
  - Rejection Sampling Fine-Tuning (RFT)
  - Robotics

permalink: /ai/review/2025-12-16-Openpi-Comet-Competition-Solution-For-2025-BEHAVIOR-Challenge/

toc: true
toc_sticky: true

date: 2025-12-16 00:00:00+0900+0900
last_modified_at: 2025-12-16 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.10071)

**저자:** Delin Qu*, Qizhi Chen*, Shangkun Sun*, Zhaoshuo Li, Yu-Wei Chao, Xiaohui Zeng, Xuan Li, Junjie Bai, Tsung-Yi Lin, Ming-Yu Liu



## 핵심 연구 목표
2025 BEHAVIOR Challenge에서 **물리적 에이전트** 가 시뮬레이션 환경에서 장기적인 작업을 성공적으로 수행하는 문제에 집중하며, 기존 **Vision-Language-Action (VLA) 모델** 의 한계를 극복하는 것을 목표로 합니다. 특히 강력하지만 일반적인 **기초 VLA 모델** 을 복잡한 로봇 벤치마크에 적응시키는 방법을 탐구하고자 합니다.

## 핵심 방법론
기본 시스템으로 **π0.5 VLA 정책** 을 채택하여 **1k 시간의 인간 시연** , **모션 플래너 궤적** , **오프라인 RL 롤아웃** 을 포함한 대규모 이종 데이터셋으로 사전 훈련했습니다. 후속 학습 단계에서는 **Rejection Sampling Fine-Tuning (RFT)** 방식을 사용하여 초기 포즈를 교란하고 성공적인 에피소드를 추가 훈련 데이터로 활용하여 모델의 견고성과 커버리지를 향상시켰습니다. 추론 전략으로 **Receding Horizon 제어 모드** 와 **32의 액션 Horizon** 을 사용했으며, **RGB 입력 모달리티** 와 **고해상도 이미지(Head:720, Wrist:480)** 를 통해 성능을 최적화했습니다.

## 주요 결과
본 솔루션은 2025 BEHAVIOR Challenge에서 **Q-score 0.2514** 를 달성하여 2위를 기록했으며, 전체 50개 가정 작업 중 **22개 작업** 을 성공적으로 완료했습니다. 특히, **고해상도 이미지 입력(Head:720, Wrist:480)** 은 "turning on radio" 태스크에서 성공률을 0.25에서 **0.60** 으로 크게 높여, 정밀한 시각 정보의 중요성을 입증했습니다. 또한 **32의 Receding Horizon** 이 최적의 성능을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 강력한 **VLA 파운데이션 모델** 이 체계적인 사전 훈련, **RFT** 를 통한 데이터 증강, 그리고 신중한 추론 설계 (예: **Receding Horizon** 및 **고해상도 시각 입력** )를 통해 복잡하고 장기적인 로봇 작업에 효과적으로 적용될 수 있음을 보여줍니다. 이는 **embodied AI** 분야에서 기초 모델을 실제 응용에 확장할 때 **고품질의 지각 정보** 와 **연속적인 피드백 메커니즘** 이 핵심임을 시사하며, AI 개발자들이 강력한 모델을 복잡한 인간 중심 환경에 맞게 조정하는 데 실용적인 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.