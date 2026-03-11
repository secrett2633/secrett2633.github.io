---
title: "[논문리뷰] Decoupling Reasoning and Confidence: Resurrecting Calibration in Reinforcement Learning from Verifiable Rewards"
excerpt: "arXiv에 게시된 'Decoupling Reasoning and Confidence: Resurrecting Calibration in Reinforcement Learning from Verifiable Rewards' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Calibration
  - Over-confidence
  - Decoupled Optimization
  - Verifiable Rewards
  - Policy Optimization
  - Expected Calibration Error

permalink: /ai/review/2026-03-11-Decoupling-Reasoning-and-Confidence-Resurrecting-Calibration-in-Reinforcement-Learning-from-Verifiable-Rewards/

toc: true
toc_sticky: true

date: 2026-03-11 00:00:00+0900+0900
last_modified_at: 2026-03-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.09117)

**저자:** Zhengzhao Ma, Xueru Wen, Boxi Cao, Yaojie Lu, Hongyu Lin, Jinglin Yang, Min He, Xianpei Han, Le Sun



## 핵심 연구 목표
RLVR(Reinforcement Learning from Verifiable Rewards)을 통해 강화된 대규모 언어 모델(LLMs)이 겪는 심각한 과신(over-confidence) 문제와 이로 인한 **캘리브레이션 저하** 를 해결하는 것이 목표입니다. 기존의 결합된 최적화 방식이 정확도-캘리브레이션 상충 관계를 유발하는 **근본적인 기울기 충돌** 을 이론적으로 분석하고, 이를 극복하는 새로운 프레임워크를 제안합니다.

## 핵심 방법론
본 연구는 **DCPO(Decoupled Calibration Policy Optimization)** 프레임워크를 제안하여 추론과 캘리브레이션 목표를 체계적으로 분리합니다. 모델이 추론 후 명시적으로 신뢰도 점수를 출력하도록 하는 **블록별 언어화된 신뢰도 롤아웃** 을 사용하며, 추론 토큰과 신뢰도 토큰에 **개별적인 보상과 어드밴티지** 를 할당합니다. 또한, **인스턴스 및 그룹 수준 정확도를 결합한 하이브리드 캘리브레이션 목표** 와 **마스킹된 기울기 최적화** 를 적용하여 목표 간의 간섭을 방지합니다.

## 주요 결과
DCPO는 **GRPO** 와 동등한 추론 정확도를 유지하면서도 최고의 캘리브레이션 성능을 달성했습니다. 특히, **QWEN3-8B** 모델에 DCPO를 적용했을 때 5개 벤치마크에서 평균 **11.8%** 의 정확도 향상을 보였으며, 이는 **RLCR보다 4.3%** , **CCGPSG보다 3.2%** 높은 수치입니다. 또한, ECE(Expected Calibration Error)는 **71.6% 상대적 감소** 를 보여 **0.435에서 0.128** 로 크게 개선되었습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM의 **신뢰성 있는 배포** 를 위해 필수적인 캘리브레이션 문제를 해결하는 실용적인 방법을 제시합니다. **추론 정확도와 캘리브레이션 목표를 분리** 하는 접근 방식은 고위험 도메인(예: 의료, 금융)에서 LLM의 과신으로 인한 잘못된 의사결정 위험을 줄이는 데 기여할 수 있습니다. 이를 통해 AI 실무자들은 보다 **신뢰할 수 있고 투명한 AI 시스템** 을 개발할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.