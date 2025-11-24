---
title: "[논문리뷰] LSPO: Length-aware Dynamic Sampling for Policy Optimization in LLM
  Reasoning"
excerpt: "이 [arXiv]에 게시한 'LSPO: Length-aware Dynamic Sampling for Policy Optimization in LLM
  Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Reasoning
  - RLVR
  - Dynamic Sampling
  - Policy Optimization
  - Response Length
  - Meta-RL
  - Overthinking

permalink: /ai/review/2025-10-6-LSPO-Length-aware-Dynamic-Sampling-for-Policy-Optimization-in-LLM-Reasoning/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.01459)

**저자:** Weizhe Chen, Sven Koenig, Bistra Dilkina



## 핵심 연구 목표
대규모 언어 모델(LLM) 추론 태스크에서 **RLVR (Reinforcement Learning with Verifiable Rewards)** 훈련의 효율성을 넘어, 최종 모델의 효과성(정확도)을 개선하는 것을 목표로 합니다. 특히, LLM의 "과잉 사고(overthinking)" 현상으로 인해 응답 길이와 출력 품질 간에 강한 상관관계가 있음에 착안하여, **응답 길이**를 활용한 새로운 동적 샘플링 전략을 제안합니다.

## 핵심 방법론
본 논문은 **Length-aware Sampling for Policy Optimization (LSPO)**이라는 새로운 **meta-RL** 알고리즘을 제안합니다. **LSPO**는 각 질문에 대한 평균 응답 길이를 기반으로 훈련 프롬프트를 동적으로 필터링하며, **정확도 기반 필터링** 후 응답 길이 분포에서 **가장 짧은 응답 (하위 Llow 백분위수)**과 **가장 긴 응답 (상위 Lhigh 백분위수, Lmax로 상한선 지정)**만 유지하여 최적화에 사용합니다. 이 방법은 **GRPO, DAPO, GSPO**와 같은 다양한 **RLVR** 기본 알고리즘에 적용되었습니다.

## 주요 결과
**LSPO**는 **Qwen-2.5-Math-7B, Qwen3-4B-Base, Llama-3.2-4B-Instruct** 등 여러 모델과 데이터셋에 걸쳐 일관되게 학습 효과성을 향상시켰습니다. 특히 **Qwen-2.5-Math-7B**에서 **GSPO**와 결합 시 평균 정확도를 **38.5%에서 39.2%**로, **GRPO**와 결합 시 **37.5%에서 38.7%**로, **DAPO**와 결합 시 **37.9%에서 38.6%**로 개선했습니다. 또한, **LSPO**는 표준 **RL**과 유사한 훈련 시간 내에 효과적이었으며, 특히 **Llama** 모델에서는 추가 롤아웃 비용이 거의 발생하지 않았습니다.

## AI 실무자를 위한 시사점
**LLM** 추론 모델을 **RLVR**로 파인튜닝할 때, 단순히 손실 함수 수정뿐만 아니라 **데이터 샘플링 전략**이 모델의 최종 성능에 큰 영향을 미칠 수 있음을 시사합니다. **LSPO**와 같이 응답 길이를 고려한 동적 샘플링은 모델이 "과잉 사고"하는 경향이 있는 태스크에서 특히 유용하며, 효율적인 학습을 통해 **더욱 정확하고 견고한 LLM**을 구축하는 데 기여할 수 있습니다. 공개된 **LSPO**의 아이디어를 활용하여 다양한 **RL** 알고리즘에 적용함으로써 훈련 효과를 높일 수 있을 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.