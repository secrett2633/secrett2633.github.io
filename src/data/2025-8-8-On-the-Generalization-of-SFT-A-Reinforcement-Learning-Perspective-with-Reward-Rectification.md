---
title: "[논문리뷰] On the Generalization of SFT: A Reinforcement Learning Perspective with
  Reward Rectification"
excerpt: "Xinyu Ye이 [arXiv]에 게시한 'On the Generalization of SFT: A Reinforcement Learning Perspective with
  Reward Rectification' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Supervised Fine-Tuning (SFT)
  - Reinforcement Learning (RL)
  - Generalization
  - Reward Rectification
  - Dynamic Fine-Tuning (DFT)
  - LLM
  - Policy Gradient
  - Mathematical Reasoning

permalink: /ai/review/2025-8-8-On-the-Generalization-of-SFT-A-Reinforcement-Learning-Perspective-with-Reward-Rectification/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.05629)

**저자:** Yongliang Wu, Yizhou Zhou, Zhou Ziheng, Yingzhe Peng, Xinyu Ye, Xinting Hu, Wenbo Zhu, Lu Qi, Ming-Hsuan Yang, Xu Yang



## 핵심 연구 목표
표준 Supervised Fine-Tuning (SFT)이 Reinforcement Learning (RL)에 비해 **제한적인 일반화 성능**을 보이는 문제를 해결하는 것이 목표입니다. SFT의 그래디언트가 내재적으로 **문제가 있는 보상 구조**를 인코딩하여 모델의 일반화 능력을 심각하게 저해한다는 것을 수학적으로 분석하고, 이를 개선하여 **SFT 자체의 성능과 일반화**를 향상시키고자 합니다.

## 핵심 방법론
논문은 표준 SFT 그래디언트가 **정책의 지정 확률에 반비례하는 희소한 암묵적 보상 구조**를 가진 정책 그래디언트의 특수한 경우임을 수학적으로 증명합니다. 이를 해결하기 위해, 각 토큰에 대해 목적 함수를 해당 토큰의 확률로 동적으로 재조정하는 **Dynamic Fine-Tuning (DFT)** 기법을 제안합니다. 이 방법은 **`sg(πθ(y*t | xt, x)) log πθ(y*t | xt, x)`** 형태의 수정된 손실 함수(Equation 9)를 사용하여 암묵적인 보상 가중치를 균일하게 만들고 그래디언트 업데이트의 안정성을 높입니다.

## 주요 결과
DFT는 **NuminaMath** 데이터셋 및 **Olympiad Bench, AIME 2024, AMC 2023**와 같은 다양한 수학 추론 벤치마크에서 표준 SFT를 **크게 능가**했습니다. 예를 들어, **Qwen2.5-Math-1.5B** 모델의 경우, DFT는 기본 모델 대비 평균 **+15.66점**의 정확도 향상을 달성하여 SFT의 **+2.09점**보다 훨씬 뛰어났습니다. 또한, 오프라인 RL 설정에서도 DFT는 **RFT, DPO**와 같은 기존 오프라인 RL 방법은 물론, **PPO, GRPO**와 같은 온라인 RL 방법보다 우수한 성능을 보여, **Qwen2.5-Math-1.5B** 모델에서 평균 **35.43점**을 기록하며 **GRPO(32.00점)**를 넘어섰습니다.

## AI 실무자를 위한 시사점
DFT는 **단 한 줄의 코드 변경**만으로 SFT의 일반화 성능을 획기적으로 개선할 수 있는 **간단하면서도 강력한** 방법을 제공합니다. 이는 명시적인 보상 모델이나 부정 샘플이 없는 상황에서 **전문가 데모 데이터**만으로 LLM을 효과적으로 미세 조정할 필요가 있는 AI 개발자에게 매우 유용합니다. 특히, 모델이 모든 토큰을 균일하게 높은 신뢰도로 학습하기보다는 **핵심 의미 내용을 가진 토큰에 집중**하도록 유도하는 학습 패러다임의 변화를 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.