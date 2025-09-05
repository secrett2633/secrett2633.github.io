---
title: "[논문리뷰] Towards a Unified View of Large Language Model Post-Training"
excerpt: "Hongyi Liu이 [arXiv]에 게시한 'Towards a Unified View of Large Language Model Post-Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Post-Training
  - Reinforcement Learning (RL)
  - Supervised Fine-Tuning (SFT)
  - Policy Gradient
  - Unified Framework
  - Hybrid Algorithms
  - Bias-Variance Tradeoff

permalink: /ai/review/2025-9-5-Towards_a_Unified_View_of_Large_Language_Model_Post-Training/

toc: true
toc_sticky: true

date: 2025-09-05 13:07:20+0900
last_modified_at: 2025-09-05 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04419)

**저자:** Xingtai Lv, Yuxin Zuo, Youbang Sun, Hongyi Liu, Yuntian Wei, Zhekai Chen, Lixuan He, Xuekai Zhu, Kaiyan Zhang, Bingning Wang, Ning Ding, Bowen Zhou



## 핵심 연구 목표
본 논문은 LLM의 포스트 트레이닝 과정에서 **Supervised Fine-Tuning (SFT)**과 **Reinforcement Learning (RL)**이 별개의 목표가 아니라, 단일 최적화 프로세스의 인스턴스임을 이론적으로 통합하는 것을 목표로 합니다. 이를 통해 기존 SFT-then-RL 파이프라인의 자원 소모와 튜닝 어려움을 해결하고, 두 학습 신호가 내재적으로 충돌하지 않고 보완적으로 작동함을 입증하고자 합니다.

## 핵심 방법론
저자들은 **Unified Policy Gradient Estimator (UPGE)**를 제안하여 SFT와 다양한 RL 알고리즘(PPO, GRPO 등)의 그래디언트를 단일한 형태로 통합합니다. UPGE는 **안정화 마스크(stabilization mask)**, **참조 정책 분모(reference policy denominator)**, **이점 추정량(advantage estimate)**, **가능도 그래디언트(likelihood gradient)**의 네 가지 상호 교환 가능한 구성 요소로 이루어집니다. 이 이론적 통찰력을 바탕으로, 모델의 실시간 롤아웃 정확도에 따라 SFT와 RL 손실의 혼합 비율(αL_RL + βL_SFT)을 동적으로 조절하는 **Hybrid Post-Training (HPT)** 알고리즘을 개발했습니다.

## 주요 결과
HPT는 여러 수학적 추론 벤치마크 및 분포 외(out-of-distribution) 테스트에서 강력한 성능 향상을 보였습니다. 특히 **Qwen2.5-Math-7B 모델**로 **AIME 2024**에서 **33.0%**의 점수를 달성하여, LUFFY (**26.1%**)와 같은 최강 베이스라인 대비 **7점 이상 향상**된 결과를 보였습니다. 또한, **Pass@k 성능** 분석에서 HPT는 가장 높은 large-k Pass@k 성능을 기록하여 모델의 탐색 능력을 최대화하고 학습된 추론 패턴을 안정적으로 유지함을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 SFT와 RL이 단일 프레임워크 내에서 효과적으로 결합될 수 있음을 이론적으로 제시하여, LLM 포스트 트레이닝의 **복잡성을 줄이고 효율성을 높이는** 새로운 방향을 제시합니다. **HPT 알고리즘**은 모델의 성능에 따라 SFT와 RL의 균형을 동적으로 조절함으로써, 다양한 모델 능력과 데이터 복잡성에 유연하게 대응하여 **모델의 추론 및 일반화 능력**을 향상시킬 수 있는 실용적인 방법론을 제공합니다. 이는 특히 대규모 언어 모델의 훈련 및 배포 과정에서 **자원 효율성을 극대화**하고 **성능 안정성을 확보**하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.