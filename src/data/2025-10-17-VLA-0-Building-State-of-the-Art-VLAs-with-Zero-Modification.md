---
title: "[논문리뷰] VLA-0: Building State-of-the-Art VLAs with Zero Modification"
excerpt: "이 [arXiv]에 게시한 'VLA-0: Building State-of-the-Art VLAs with Zero Modification' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - VLA-0
  - Zero Modification
  - Text-based Action Prediction
  - Robot Manipulation
  - Large Language Models
  - Fine-tuning
  - State-of-the-Art

permalink: /ai/review/2025-10-17-VLA-0-Building-State-of-the-Art-VLAs-with-Zero-Modification/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13054)

**저자:** Ankit Goyal, Hugo Hadfield, Xuning Yang, Valts Blukis, Fabio Ramos



## 핵심 연구 목표
본 논문은 **Vision-Language Model (VLM)의 아키텍처나 어휘를 변경하지 않고** 순수한 텍스트 생성 능력만을 활용하여 로봇 행동을 예측하는 단순한 VLA(Vision-Language-Action) 모델이 최첨단 성능을 달성할 수 있는지 탐구하는 것을 목표로 합니다. 이는 기존의 복잡한 VLA 구축 방식에 대한 대안을 제시하고자 합니다.

## 핵심 방법론
제안된 **VLA-0** 모델은 기존 VLM인 **Qwen-VL-2.5-3B**를 활용하여 로봇 행동을 **공백으로 구분된 정수 문자열**로 직접 생성하도록 파인튜닝합니다. 연속적인 로봇 행동 값을 **[0, 1000]과 같은 고정된 정수 범위**로 정규화하며, 학습 시 **마스킹된 행동 증강(Masked Action Augmentation)**을 적용하여 시각 및 지시 기반 추론을 강화합니다. 추론 단계에서는 **앙상블 예측(Ensemble Prediction)**을 사용하여 더욱 안정적인 행동을 도출합니다.

## 주요 결과
**VLA-0**는 LIBERO 벤치마크에서 동일한 로봇 데이터로 훈련된 모든 기존 VLA 모델을 평균 **1.4점** 차이로 능가하며 최첨단 성능을 달성했습니다. 더 나아가, 대규모 로봇 행동 데이터로 사전 훈련된 **π-0, GROOT-N1, MolmoAct** 등 여러 인기 모델들보다 우수한 성능을 보였습니다. 실제 로봇 실험에서도 **SmolVLA**보다 평균 **12.5점** 더 높은 성공률을 기록했습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 아키텍처 변경 없이도 강력한 **VLM의 텍스트 생성 능력을 활용**하여 로봇 행동 예측에서 최고 수준의 성능을 달성할 수 있음을 보여줍니다. AI 엔지니어는 특수 헤드 개발이나 어휘 변경 없이 기존 VLM을 행동 예측에 활용할 수 있으며, 특히 **마스킹된 행동 증강**과 **앙상블 예측**과 같은 단순한 트레이닝 및 추론 기법이 핵심적인 성능 향상 요소임을 알 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.