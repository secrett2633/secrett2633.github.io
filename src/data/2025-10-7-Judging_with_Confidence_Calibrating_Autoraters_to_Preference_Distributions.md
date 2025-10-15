---
title: "[논문리뷰] Judging with Confidence: Calibrating Autoraters to Preference
  Distributions"
excerpt: "이 [arXiv]에 게시한 'Judging with Confidence: Calibrating Autoraters to Preference
  Distributions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Autoraters
  - Calibration
  - Preference Distributions
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Positional Bias

permalink: /ai/review/2025-10-7-Judging_with_Confidence_Calibrating_Autoraters_to_Preference_Distributions/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00263)

**저자:** Zhuohang Li, Xiaowei Li, Chengyu Huang, Guowang Li, Katayoon Goshvadi, Bo Dai, Dale Schuurmans, Paul Zhou, Hamid Palangi, Yiwen Song, Palash Goyal, Murat Kantarcioglu, Bradley A. Malin, Yuan Xue



## 핵심 연구 목표
이 논문은 현재 LLM 기반 자동 평가자(autoraters)가 이진 선호 레이블로만 훈련되어 인간 판단의 주관성과 분포적 특성을 간과하고, 불확실성과 소수 의견을 무시하는 근본적인 한계를 해결하고자 합니다. 이를 위해 목표는 자동 평가자가 대상 모집단의 완전한 선호 분포를 모델링하도록 보정하는 일반적이고 확장 가능한 프레임워크를 제안하여 AI 정렬 시스템의 신뢰성, 공정성 및 견고성을 향상시키는 것입니다.

## 핵심 방법론
논문은 확률적 자동 평가자의 예측을 목표 선호 분포에 맞추기 위해 두 가지 미세 조정 패러다임을 제시합니다. 첫째, 밀도 높은 확률적 레이블을 활용하는 **직접적인 지도 미세 조정(SFT)** 방식과 둘째, 희소한 이진 레이블을 사용하는 **강화 학습(RL)** 접근 방식을 제안합니다. 강화 학습에서는 **Brier reward** 및 **Logarithmic reward**와 같은 적절한 스코어링 규칙을 보상으로 사용하며, 출력에서 확률적 예측을 명시적으로 표현하도록 모델을 학습시킵니다.

## 주요 결과
제안된 분포 매칭 미세 조정 방법은 제로샷 및 보정 기준선 대비 모든 지표에서 우수한 성능을 보였습니다. 특히, **RL(Brier) 모델**은 **Gemma-2-9B**에서 가장 높은 동의율(**0.8706**), F1 점수(**0.5895**), 가장 낮은 Brier 점수(**0.0946**)를 달성하며 탁월한 정렬과 보정 성능을 입증했습니다. 또한, RL 기반 모델은 SFT 대비 더 높은 주석 효율성을 보였고, **Qwen-2.5-7B**에서 **0.9007의 일관성**과 **0.0964의 절대 대칭 편차**로 위치 편향을 현저히 감소시켰습니다. 객관적 태스크(**JudgeBench**)에서도 **Reasoning 태스크에서 55.10%의 최고 정확도**를 달성하는 등 성능 저하 없이 다재다능함을 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM 기반 자동 평가자가 인간 선호의 전체 분포를 모델링할 수 있음을 보여주며, 이는 AI 평가의 신뢰성과 투명성을 크게 높일 수 있습니다. 확률적 예측을 통해 모델의 불확실성을 명확하게 전달하여 **위험 관리 및 공정성**을 개선할 수 있습니다. 특히, **데이터 효율적인 강화 학습 접근 방식**은 제한된 주석 예산으로도 강력하고 편향 없는 평가 시스템을 구축하는 데 실질적인 이점을 제공하여, 보다 견고하고 인간 중심적인 AI 시스템 개발에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.