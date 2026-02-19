---
title: "[논문리뷰] SLA2: Sparse-Linear Attention with Learnable Routing and QAT"
excerpt: "이 [arXiv]에 게시한 'SLA2: Sparse-Linear Attention with Learnable Routing and QAT' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Sparse-Linear Attention
  - Diffusion Models
  - Video Generation
  - Learnable Routing
  - Quantization-Aware Training
  - Attention Acceleration
  - Model Optimization

permalink: /ai/review/2026-02-19-SLA2-Sparse-Linear-Attention-with-Learnable-Routing-and-QAT/

toc: true
toc_sticky: true

date: 2026-02-19 00:00:00+0900+0900
last_modified_at: 2026-02-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.12675)

**저자:** Jintao Zhang¹, Haoxu Wang¹, Kai Jiang¹, Kaiwen Zheng¹, Youhe Jiang¹, Ion Stoica², Jianfei Chen¹, Jun Zhu¹, Joseph E. Gonzalez²



## 핵심 연구 목표
본 논문은 기존 Sparse-Linear Attention (SLA)의 한계, 즉 **주의 가중치 크기에 기반한 휴리스틱 기반의 어텐션 분할** 과 **희소 및 선형 어텐션 출력 간의 불일치** 를 해결하는 것을 목표로 합니다. 특히, 확산 모델, 그 중에서도 **비디오 확산 모델** 에서 생성 품질을 유지하면서도 어텐션 연산을 더욱 효율적으로 가속화하는 것이 주된 연구 목적입니다.

## 핵심 방법론
SLA2는 세 가지 주요 개선 사항을 제안합니다. 첫째, 각 어텐션 연산에 **희소 또는 선형 어텐션을 동적으로 선택하는 학습 가능한 라우터(R)** 를 도입합니다. 둘째, **학습 가능한 비율(α)** 을 사용하여 희소 및 선형 어텐션 브랜치를 결합하는 보다 직접적이고 일관된 어텐션 공식을 사용합니다. 셋째, **Quantization-Aware Training (QAT)** 을 통해 저비트 어텐션을 희소 어텐션 브랜치에 통합하여 양자화 오류를 최소화하고 추가적인 속도 향상을 얻습니다.

## 주요 결과
SLA2는 **Wan2.1-1.3B 및 Wan2.1-14B 비디오 확산 모델** 에서 **97%의 어텐션 희소성** 을 달성하며, **18.6배의 어텐션 런타임 속도 향상** 을 기록했습니다. 또한, **종단 간 비디오 생성 지연 시간** 을 **Wan-1.3B-480P 모델** 에서 **2.30배** , **Wan-14B-720P 모델** 에서 **4.35배** 감소시켰습니다. 이러한 효율성 향상에도 불구하고, SLA2는 생성 품질을 유지하거나 심지어 **Full Attention** 및 기존 희소 어텐션 방법론들을 능가하는 성능을 보였습니다.

## AI 실무자를 위한 시사점
SLA2는 **비디오 확산 모델** 과 같이 연산 집약적인 AI 모델의 **추론 효율성을 혁신적으로 개선** 할 수 있는 실용적인 방법론을 제시합니다. **학습 가능한 라우팅** 과 **QAT 통합 저비트 어텐션** 은 **높은 희소성(예: 97%)에서도 성능 저하 없이** 모델을 경량화하고 가속화할 수 있음을 보여줍니다. 이는 **제한된 하드웨어 자원** 에서 대규모 확산 모델을 배포하거나, **실시간 응답 속도** 가 중요한 애플리케이션에 매우 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.