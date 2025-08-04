---
title: "[논문리뷰] Beyond Fixed: Variable-Length Denoising for Diffusion Large Language
  Models"
excerpt: "Jiaqi Wang이 [arXiv]에 게시한 'Beyond Fixed: Variable-Length Denoising for Diffusion Large Language
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Large Language Models
  - Variable-Length Generation
  - Dynamic Length Adaptation
  - Denoising Strategy
  - Inference Optimization
  - Computational Efficiency

permalink: /ai/review/2025-8-4-Beyond_Fixed__Variable-Length_Denoising_for_Diffusion_Large_Language __Models/

toc: true
toc_sticky: true

date: 2025-08-04 12:17:01+0900
last_modified_at: 2025-08-04 12:17:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.00819)

**Beyond Fixed: Variable-Length Denoising for Diffusion Large Language Models**

**저자:** Jinsong Li, Xiaoyi Dong, Yuhang Zang, Yuhang Cao, Jiaqi Wang, Dahua Lin

**키워드:** `Diffusion Large Language Models`, `Variable-Length Generation`, `Dynamic Length Adaptation`, `Denoising Strategy`, `Inference Optimization`, `Computational Efficiency`

## 핵심 연구 목표
Diffusion Large Language Models (DLLMs)의 핵심 제약 사항인 **고정된 출력 길이** 문제를 해결하고, 태스크별로 **동적으로 적응하는 가변 길이 생성**을 가능하게 하는 것을 목표로 합니다. 이는 불충분한 길이로 인한 성능 저하나 과도한 길이로 인한 계산 오버헤드 및 성능 저하 문제를 극복하여 DLLM의 실용적 활용도를 높이는 데 중점을 둡니다.

## 핵심 방법론
논문은 훈련 없이 작동하는 2단계 디노이징 전략인 **DAEDAL**을 제안합니다. 첫 번째 단계인 **초기 길이 조정(Initial Length Adjustment)**에서는 모델이 짧은 초기 길이에서 시작하여 **EOS(End-of-Sequence) 토큰**의 예측 신뢰도를 기반으로 태스크에 적합한 길이로 확장합니다. 두 번째 단계인 **반복 마스크 삽입(Iterative Mask Insertion)**에서는 디노이징 과정 중 모델 예측 신뢰도가 낮은 영역에 **[MASK] 토큰** 블록을 동적으로 삽입하여 추가적인 추론 공간을 확보합니다.

## 주요 결과
DAEDAL은 고정 길이 베이스라인과 비교하여 **유사하거나 때로는 우수한 성능**을 달성하면서도, 짧고 통일된 초기 길이에서 시작합니다. LLaDA-Instruct-8B 모델에서 DAEDAL은 평균 정확도 **54.75%**를 기록하여, 최적의 고정 길이 베이스라인(51.73%)을 능가합니다. 또한, **효과적인 토큰 비율(Eratio)**을 크게 향상시켜(예: GSM8K에서 DAEDAL **73.5%** vs. 베이스라인 27.7%) **계산 효율성을 대폭 개선**했음을 입증합니다.

## AI 실무자를 위한 시사점
DAEDAL은 DLLM의 고정 길이 추론 제약을 해결하여 **가변적인 출력 길이**가 필요한 실제 애플리케이션에 DLLM을 더 쉽게 통합할 수 있도록 합니다. 특히 **수동 튜닝 없이** 초기 짧은 길이로 시작하여 최적 성능을 달성할 수 있어, 모델 배포 및 관리에 필요한 **하이퍼파라미터 튜닝 부담을 줄여줍니다.** 개선된 **계산 효율성**은 DLLM의 **추론 비용을 절감**하고, 더 나은 리소스 활용을 통해 대규모 배포 시의 경제성을 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.
