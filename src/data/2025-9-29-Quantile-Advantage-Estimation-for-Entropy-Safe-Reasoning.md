---
title: "[논문리뷰] Quantile Advantage Estimation for Entropy-Safe Reasoning"
excerpt: "An Zhang이 [arXiv]에 게시한 'Quantile Advantage Estimation for Entropy-Safe Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Reasoning
  - Entropy Control
  - Advantage Estimation
  - Quantile Baseline
  - Exploration-Exploitation
  - RLVR

permalink: /ai/review/2025-9-29-Quantile-Advantage-Estimation-for-Entropy-Safe-Reasoning/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.22611)

**저자:** Junkang Wu, Kexin Huang, Jiancan Wu, An Zhang, Xiang Wang, Xiangnan He



## 핵심 연구 목표
대규모 언어 모델(LLMs)의 추론 능력을 강화하는 **Reinforcement Learning with Verifiable Rewards (RLVR)** 훈련 과정에서 발생하는 **엔트로피 붕괴(entropy collapse)** 및 **엔트로피 폭발(entropy explosion)** 문제를 해결하고, 안정적인 학습을 통해 성능을 지속적으로 향상시키는 것을 목표로 합니다. 기존의 평균(mean) 기반 어드밴티지 추정 방식의 한계를 극복하고자 합니다.

## 핵심 방법론
논문은 평균 기반의 어드밴티지 추정 방식을 **그룹별 K-quantile 기반**의 **Quantile Advantage Estimation (QAE)**으로 대체합니다. 이 방법론은 정책 업데이트 시 **응답 수준(response-level)**에서 **두 가지 모드(two-regime) 게이팅**을 구현하여, 어려운 질문(성공률 p ≤ 1-K)에는 성공적인 시도를 강화하고, 쉬운 질문(성공률 p > 1-K)에는 남은 실패를 개선하도록 유도합니다. 이를 통해 엔트로피를 안정적으로 조절합니다.

## 주요 결과
**QAE**는 엔트로피를 안정화하고, 크레딧 할당을 희소하게(약 **80%의 응답이 0 어드밴티지를 받음**) 만들어 가장 유익한 샘플에 계산 노력을 집중시킵니다. **Qwen3-8B/14B-Base** 모델로 **AIME'24/'25** 및 **AMC’23** 벤치마크에서 기존 **DAPO** 대비 **Pass@1** 성능을 지속적으로 향상시켰습니다 (예: Qwen3-8B-Base 모델의 AIME'25에서 **32.71%에서 34.90%로 +6.7%** 증가).

## AI 실무자를 위한 시사점
**QAE**는 RLVR 훈련의 불안정성을 야기하는 엔트로피 문제를 효과적으로 제어하는 새로운 **베이스라인 설계 접근 방식**을 제시합니다. 이는 토큰 수준의 휴리스틱 대신 근본적인 어드밴티지 추정 방식을 개선하여, **RLVR 모델의 안정성과 확장성**을 크게 향상시킬 수 있습니다. 특히, 업데이트를 소수의 정보성 높은 샘플에 집중함으로써 **학습 효율성**을 높이는 실용적인 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.