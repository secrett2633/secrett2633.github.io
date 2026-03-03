---
title: "[논문리뷰] Recursive Think-Answer Process for LLMs and VLMs"
excerpt: "Yong Man Ro이 arXiv에 게시한 'Recursive Think-Answer Process for LLMs and VLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLMs
  - VLMs
  - Reasoning
  - Self-Correction
  - Reinforcement Learning
  - Confidence Estimation
  - Iterative Refinement
  - Think-Answer

permalink: /ai/review/2026-03-03-Recursive-Think-Answer-Process-for-LLMs-and-VLMs/

toc: true
toc_sticky: true

date: 2026-03-03 00:00:00+0900+0900
last_modified_at: 2026-03-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.02099)

**저자:** Byung-Kwan Lee, Youngchae Chee, Yong Man Ro



## 핵심 연구 목표
현재 **Think-Answer 모델** 들은 단일 패스(single-pass) 추론에 의존하여 "Oops!"와 같은 불확실성 신호를 보여도 자체 수정을 수행하지 못하고 오류에 취약합니다. 이 연구는 이러한 한계를 극복하고, 모델이 **반복적인 추론 주기** 에 참여하여 더 정확한 답변을 생성하도록 돕는 효율적인 **Recursive Think-Answer Process (R-TAP)** 를 제안합니다.

## 핵심 방법론
R-TAP는 두 가지 핵심 기술을 도입합니다. 첫째, **Confidence Generator (C)** 는 사전 훈련된 모델에서 초기화되어 개별 추론 경로의 정확도를 정량화하도록 미세 조정됩니다. 둘째, **재귀적 보상 구조** 는 **Recursively Confidence Increase Reward (Rincrease)** 와 **Final Answer Confidence Reward (RFinal)** 를 결합하여 신뢰도가 점진적으로 향상되고 최종 답변의 신뢰도가 높을수록 보상하도록 설계되었습니다. 이 과정은 **GRPO (Gradient-Regularized Policy Optimization)** 를 통해 최적화되며, Confidence Generator는 훈련 시에만 사용되어 추론 시 추가 비용이 발생하지 않습니다.

## 주요 결과
R-TAP 적용 모델은 **LLM (AIME25, HMMT Feb 25, OmniMath, GPQA, LiveCodeBench)** 및 **VLM (MMMU, MathVista, OlympiadBench, MathVision, MMMU-Pro)** 벤치마크 전반에서 기존 단일 패스 방식보다 일관되게 우수한 성능을 보였습니다. 예를 들어, **Phi-4-reasoning-plus-R-TAP** 는 LLM 벤치마크에서 **75.8% 평균 정확도** 를 달성하여 기본 모델의 **69.7%** 를 상회했습니다. 또한, R-TAP 적용 모델은 "Oops!"와 같은 자기 반성적 표현을 현저히 적게 생성했으며 (LLM에서 **15.7회** 에서 **5.6회** 로 감소), 이는 추론 시간 단축 (LLM에서 **14509.7** 토큰에서 **4378.8** 토큰으로 감소)과 이어져 더 안정적이고 빠른 추론을 가능하게 했습니다.

## AI 실무자를 위한 시사점
R-TAP는 LLMs 및 VLMs의 **추론 정확도와 신뢰성** 을 획기적으로 향상시키는 실용적인 접근법을 제공합니다. 모델이 스스로 불확실성을 감지하고 **재귀적으로 추론을 정제** 할 수 있게 함으로써, 복잡한 문제 해결이나 고위험 애플리케이션에서 AI 시스템의 **안정성과 성능** 을 크게 개선할 수 있습니다. 특히, Confidence Generator가 추론 시 비용을 발생시키지 않아 **운영 효율성** 측면에서도 큰 이점이 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.