---
title: "[논문리뷰] DEER: Draft with Diffusion, Verify with Autoregressive Models"
excerpt: "Zhijie Deng이 arXiv에 게시한 'DEER: Draft with Diffusion, Verify with Autoregressive Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Speculative Decoding
  - Diffusion LLM
  - Autoregressive Model
  - Inference Acceleration
  - Model Alignment
  - Code Generation
  - Block Regeneration

permalink: /ai/review/2025-12-18-DEER-Draft-with-Diffusion-Verify-with-Autoregressive-Models/

toc: true
toc_sticky: true

date: 2025-12-18 00:00:00+0900+0900
last_modified_at: 2025-12-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.15176)

**저자:** Zicong Cheng, Guo-Wei Yang, Jia Li, Zhijie Deng, Meng-Hao Guo, Shi-Min Hu



## 핵심 연구 목표
본 논문은 autoregressive (AR) 디코딩의 내재된 지연으로 인해 발생하는 LLM 기반 에이전트 및 추론 시스템의 효율성 문제를 해결하고자 합니다. 특히, 기존 AR 기반 드래프터의 단계별 불확실성 누적과 순차적 디코딩으로 인한 제한적인 가속화 문제를 극복하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 이산 공간 확산 대규모 언어 모델( **dLLM** )을 드래프터로 활용하는 **DEER** 프레임워크를 제안합니다. **두 단계 Diffusion-to-AR (D2A) 정렬 파이프라인** 을 통해 dLLM을 대상 AR 모델에 맞춥니다: 첫 번째 단계인 **AR-Style Continuation Distillation** 은 dLLM을 접두사 조건부 생성에 정렬하고, 두 번째 단계인 **Scribe Refinement** 는 가중치 기반 접미사 마스킹을 사용하여 지역적 정확도를 높입니다. 추론 시에는 dLLM이 단일 단계에서 긴 드래프트 세그먼트를 병렬로 생성합니다.

## 주요 결과
**HumanEval** 벤치마크의 **Qwen3-30B-A3B** 모델에서 **DEER** 는 **5.54x의 속도 향상** 을 달성했으며, 이는 기존 **EAGLE-3** 의 **2.41x** 를 크게 상회합니다. 또한, 평균 드래프트 수용 길이가 **최대 32 토큰** 에 달하여, **EAGLE-3** 의 **10 토큰** 을 훨씬 뛰어넘었습니다. 전체 모델 및 데이터셋에서 **DEER** 는 평균 수용 길이를 **EAGLE-3 대비 50-120% 증가** 시켰습니다.

## AI 실무자를 위한 시사점
**dLLM** 을 활용한 **투기적 디코딩(Speculative Decoding)** 은 기존 AR 드래프터의 근본적인 한계를 극복하는 새로운 패러다임을 제시합니다. **DEER** 의 병렬 블록 생성과 향상된 드래프트 수용 길이는 LLM 추론 효율성을 크게 개선하여, AI 서비스의 응답 속도를 높이고 운영 비용을 절감하는 데 기여할 수 있습니다. 특히, 코드 생성 및 수학적 추론과 같은 복잡한 작업에서 실질적인 속도 향상을 기대할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.