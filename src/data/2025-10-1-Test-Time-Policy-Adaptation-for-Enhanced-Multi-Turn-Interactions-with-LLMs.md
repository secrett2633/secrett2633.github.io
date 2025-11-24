---
title: "[논문리뷰] Test-Time Policy Adaptation for Enhanced Multi-Turn Interactions with
  LLMs"
excerpt: "Yao Shu이 [arXiv]에 게시한 'Test-Time Policy Adaptation for Enhanced Multi-Turn Interactions with
  LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Multi-turn Interaction
  - Test-Time Adaptation
  - Reinforcement Learning from Human Feedback
  - Policy Optimization
  - Online Learning
  - Self-Correction

permalink: /ai/review/2025-10-1-Test-Time-Policy-Adaptation-for-Enhanced-Multi-Turn-Interactions-with-LLMs/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.23166)

**저자:** Chenxing Wei, Hong Wang, Ying He, Fei Yu, Yao Shu



## 핵심 연구 목표
논문은 LLM이 정적, 단일 턴 데이터로 훈련되어 확장된 다중 턴 상호작용에서 성능이 저하되고 실시간 사용자 피드백에 적응하기 어려운 문제를 해결하고자 합니다. 이를 위해 추론 시 **사용자 선호도에 맞춰 정책을 동적으로 적응**시키는 새로운 패러다임 **T²PAM (Test-Time Policy Adaptation for Multi-Turn Interactions)**을 제안합니다.

## 핵심 방법론
제안된 **T²PAM** 패러다임을 구현하기 위해 **ROSA (Optimum-Referenced One-Step Adaptation)** 알고리즘을 개발했습니다. **ROSA**는 다중 턴 상호작용 중 사용자 피드백을 보상 신호로 활용하여 사용자 선호도에 부합하는 잠재적 최적 정책을 추정하고, **폐쇄형 분석 솔루션**과 **선형화된 최적화**를 통해 모델 파라미터의 부분집합을 효율적으로 업데이트합니다. 이를 통해 반복적인 그래디언트 기반 최적화 없이 **단일 단계 업데이트**를 수행하여 인-대화 자체 수정 능력을 확보합니다.

## 주요 결과
**ROSA**는 다양한 벤치마크 (예: **MATH, AIME25, HumanEval**)에서 기준선 및 기존 RL 기반 방법론 대비 상당한 성능 향상을 보였습니다. 예를 들어, **Qwen3-0.6B** 모델의 **MATH** 데이터셋에서 **25.20%의 절대 정확도 향상**을 달성했으며, **MATH-500**에서 **+31.31%의 Correction Uplift**를 보여주었습니다. 또한, **ROSA**는 추론 지연 시간이나 GPU 메모리 소비를 크게 늘리지 않아 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**ROSA**는 LLM의 **실시간, 인-대화 정책 적응 능력**을 제공하여 다중 턴 상호작용에서의 핵심적인 한계를 극복합니다. 이 방법론은 낮은 컴퓨팅 오버헤드와 **비동기식 업데이트** 설계 덕분에 대규모 LLM 기반 대화 시스템에 **ROSA**를 통합하여 사용자 경험을 크게 향상시킬 수 있는 실용적인 솔루션을 제시합니다. 이는 AI 개발자가 정적 모델의 한계를 넘어 사용자 피드백에 민감하게 반응하는 대화형 AI를 구축하는 데 중요한 토대가 됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.