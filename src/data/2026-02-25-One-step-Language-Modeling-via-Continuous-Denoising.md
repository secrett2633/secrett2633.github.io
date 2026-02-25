---
title: "[논문리뷰] One-step Language Modeling via Continuous Denoising"
excerpt: "Jerry Huang이 [arXiv]에 게시한 'One-step Language Modeling via Continuous Denoising' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Modeling
  - Continuous Denoising
  - Flow-based Models
  - Diffusion Models
  - One-step Generation
  - Few-step Sampling
  - Time Reparameterization
  - Model Distillation

permalink: /ai/review/2026-02-25-One-step-Language-Modeling-via-Continuous-Denoising/

toc: true
toc_sticky: true

date: 2026-02-25 00:00:00+0900+0900
last_modified_at: 2026-02-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.16813)

**저자:** Chanhyuk Lee, Jaehoon Yoo, Manan Agarwal, Sheel Shah, Jerry Huang, Aditi Raghunathan, Seunghoon Hong, Nicholas M. Boffi, Jinwoo Kim



## 핵심 연구 목표
기존 **이산 확산(discrete diffusion) 언어 모델** 이 토큰 간 상관관계를 무시하는 인자화된 근사(factorized approximation)로 인해 소수 단계(few-step) 생성 시 품질이 급격히 저하되는 문제를 해결하고자 합니다. 이 연구는 **연속적인 흐름(continuous flow) 기반 언어 모델** 이 이산 확산 모델보다 더 뛰어난 품질과 속도로, 특히 **단일 단계(one-step) 생성** 에서도 높은 성능을 달성할 수 있음을 입증하는 것을 목표로 합니다.

## 핵심 방법론
논문은 **원-핫(one-hot) 토큰 인코딩** 을 통해 언어 데이터를 **유클리드 공간** 에 연속적으로 표현하고, **확률적 보간법(stochastic interpolants) 기반 흐름 일치(flow matching)** 를 사용하여 **FLM(flow-based language model)** 을 구축합니다. 특히, **디코딩 오류율(decoding error rate)** 에 기반한 **시간 재매개변수화(time reparameterization)** 기법을 도입하여 학습 안정성과 생성 품질을 개선했으며, 학습된 FLM을 2단계에 걸쳐 **FMLM(flow map language model)** 으로 **증류(distillation)** 하여 효율적인 소수 단계 생성을 가능하게 합니다.

## 주요 결과
**LM1B** 데이터셋에서 **FLM** 은 1024단계 샘플링 시 **96.91 Gen. PPL** 을 달성하여 기존 이산 확산 모델을 능가했습니다. **FMLM** 은 **단 1단계 생성** 으로 **104.37 Gen. PPL** 을 기록하며 기존 소수 단계 증류 모델들의 **8~16단계 성능** 과 동등하거나 이를 뛰어넘는 **약 8.3배의 속도 향상** 을 보였습니다. 이는 이산 확산 모델이 소수 단계에서 겪는 치명적인 품질 저하와 대조적이며, 제안된 **시간 재매개변수화** 및 **원-핫 표현** 이 성능 향상에 결정적인 역할을 했음을 입증합니다.

## AI 실무자를 위한 시사점
이 연구는 언어 모델링에서 **연속적인 흐름 기반 모델** 의 뛰어난 잠재력과 **단일 단계 생성** 의 가능성을 보여주며, **생성 속도 병목 현상** 을 해결할 새로운 패러다임을 제시합니다. 특히 **고품질의 소수 단계 생성** 이 필수적인 실시간 대화형 AI와 같은 애플리케이션에서 **FMLM** 은 매우 유용하게 활용될 수 있습니다. 다만, **원-핫 표현** 은 어휘 크기에 비례하여 시간 및 메모리 비용이 증가하므로, 대규모 모델 적용 시에는 **희소한 기울기(sparse gradients)** 나 **구조화된 표현** 에 대한 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.