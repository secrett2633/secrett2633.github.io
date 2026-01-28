---
title: "[논문리뷰] Selective Steering: Norm-Preserving Control Through Discriminative Layer Selection"
excerpt: "이 [arXiv]에 게시한 'Selective Steering: Norm-Preserving Control Through Discriminative Layer Selection' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Activation Steering
  - Large Language Models (LLMs)
  - Norm Preservation
  - Discriminative Layer Selection
  - Behavior Control
  - Inference-time Intervention
  - Angular Steering

permalink: /ai/review/2026-01-28-Selective-Steering-Norm-Preserving-Control-Through-Discriminative-Layer-Selection/

toc: true
toc_sticky: true

date: 2026-01-28 00:00:00+0900+0900
last_modified_at: 2026-01-28 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.19375)

**저자:** Quy-Anh Dang, Chris Ngo



## 핵심 연구 목표
대규모 언어 모델(LLM)이 정렬 노력에도 불구하고 여전히 유해한 행동에 취약하며, 기존 **액티베이션 스티어링(Activation Steering)** 기법들이 **norm 보존 실패** 로 인한 생성 붕괴, 세심한 계수 튜닝, 또는 이진 제어 등의 한계를 가진다는 문제점을 해결하고자 합니다. 이 논문은 LLM의 행동을 안정적으로 제어할 수 있는 **원칙적이고 효율적인 추론 시간 개입 프레임워크** 를 제안하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **Selective Steering (SS)** 이라는 새로운 접근 방식을 제안합니다. 이는 두 가지 핵심 혁신을 포함합니다. 첫째, **수학적으로 엄밀한 norm-preserving rotation 공식** ( **Equation 6** )을 도입하여 활성화 분포의 무결성을 유지하고 기존 **Angular Steering** 의 norm 위반 문제( **Proposition 1** )를 해결합니다. 둘째, **판별적 레이어 선택 (Discriminative Layer Selection)** 을 통해, 피처 표현이 **반대 부호의 클래스 정렬** (`μ_pos μ_neg < 0`)을 보이는 레이어에만 스티어링을 적용하여 불필요한 간섭을 방지합니다.

## 주요 결과
**Selective Steering** 은 9개 모델(Llama, Qwen, Gemma)에 걸친 광범위한 실험에서 이전 방법들보다 **공격 성공률(ASR)을 최대 5.5배 높게** 달성했습니다. 특히, Qwen2.5-1.5B 모델에서 **74.04%의 HarmBench ASR** 을 기록하여 **Angular Steering (13.46%)** 및 **Adaptive Angular Steering (39.42%)** 을 크게 앞섰습니다. 또한, **모든 모델과 각도에서 perplexity 위반이 0** 이었고, 표준 벤치마크에서 **약 100%의 모델 기능 유지** 를 입증하여 생성 붕괴 없이 안정적인 제어가 가능함을 보였습니다.

## AI 실무자를 위한 시사점
**Selective Steering** 은 AI/ML 엔지니어에게 **LLM의 안전성 및 제어 가능성** 을 크게 향상시키는 강력한 **추론 시간 개입** 도구를 제공합니다. **norm-preserving rotation** 과 **discriminative layer selection** 의 결합은 모델의 **내부 표현을 안정적으로 수정** 하여, 특히 소규모 LLM에서도 **생성 품질 저하 없이** 유해한 행동을 억제하거나 원하는 행동을 유도할 수 있게 합니다. 이는 기존 스티어링 기법이 겪던 모델 붕괴나 불안정성 문제를 효과적으로 해결하여 **안정적인 LLM 행동 수정** 을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.