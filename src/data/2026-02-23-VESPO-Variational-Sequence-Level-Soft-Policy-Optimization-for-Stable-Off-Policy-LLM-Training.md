---
title: "[논문리뷰] VESPO: Variational Sequence-Level Soft Policy Optimization for Stable Off-Policy LLM Training"
excerpt: "[arXiv]에 게시된 'VESPO: Variational Sequence-Level Soft Policy Optimization for Stable Off-Policy LLM Training' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Off-Policy RL
  - LLM Training
  - Importance Sampling
  - Variance Reduction
  - Variational Optimization
  - Policy Gradient
  - Sequence-Level Optimization
  - Reinforcement Learning

permalink: /ai/review/2026-02-23-VESPO-Variational-Sequence-Level-Soft-Policy-Optimization-for-Stable-Off-Policy-LLM-Training/

toc: true
toc_sticky: true

date: 2026-02-23 00:00:00+0900+0900
last_modified_at: 2026-02-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.10693)

**저자:** Guobin Shen, Chenxiao Zhao, Xiang Cheng, Lei Huang, Xing Yu



## 핵심 연구 목표
LLM(Large Language Models)을 위한 오프-정책(off-policy) 강화 학습 훈련 시 발생하는 불안정성 문제, 즉 정책 노후화(policy staleness), 비동기 훈련, 훈련-추론 불일치로 인한 높은 중요도 샘플링(IS) 분산을 해결하는 것을 목표로 합니다. 기존 토큰-레벨 클리핑 및 길이 정규화 방식의 한계를 극복하고, 통합된 이론적 기반을 갖춘 안정화 기법을 제안하고자 합니다.

## 핵심 방법론
본 논문은 **Variational sEquence-level Soft Policy Optimization (VESPO)** 를 제안하며, 중요도 가중치 재형성(reshaping)에 분산 감소를 통합하는 변분(variational) 공식을 도입합니다. 이를 통해 **닫힌 형태의 재형성 커널($\phi(W) = W^\alpha \exp(-\lambda W)$)** 을 도출하여 길이 정규화 없이 **시퀀스-레벨 중요도 가중치** 에 직접 적용합니다. 또한, 양수 및 음수 이점(advantage)에 대해 비대칭 하이퍼파라미터 **(c1, c2)** 를 사용하여 더욱 유연한 분산 제어를 가능하게 합니다.

## 주요 결과
**VESPO** 는 수학적 추론 벤치마크에서 **최대 64배의 staleness 비율** 과 완전 비동기식 실행 하에서도 안정적인 훈련을 유지하며, 기존 방법론 대비 일관된 성능 향상을 보였습니다. 특히 **Qwen3-30B-A3B-Base MoE 모델** 에서 기존 베이스라인 대비 **2.3% 높은 평균 정확도** 를 달성했으며, 길이 정규화가 훈련 불안정성을 유발하는 문제를 해결하여 안정적인 학습 곡선을 입증했습니다.

## AI 실무자를 위한 시사점
**VESPO** 는 LLM의 **강화 학습 훈련 안정성** 을 획기적으로 향상시키는 원칙적인 방법론을 제공합니다. 이는 **오프-정책(off-policy) 시나리오** 및 **MoE 모델** 과 같이 분산 불일치가 심한 환경에서 훈련 붕괴를 방지하고 성능을 극대화하는 데 유용합니다. **길이 정규화 없이 시퀀스-레벨 중요도 가중치를 직접 처리** 하는 방식은 복잡한 LLM 생성 작업을 위한 **더욱 견고하고 확장 가능한 RL 훈련 파이프라인** 을 구축하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.