---
title: "[논문리뷰] Less Is More: Training-Free Sparse Attention with Global Locality for
  Efficient Reasoning"
excerpt: "Baihong Yuan이 [arXiv]에 게시한 'Less Is More: Training-Free Sparse Attention with Global Locality for
  Efficient Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Sparse Attention
  - LLMs
  - Reasoning Tasks
  - Efficiency
  - Training-Free
  - Global Locality
  - KV Cache Optimization

permalink: /ai/review/2025-8-12-Less-Is-More-Training-Free-Sparse-Attention-with-Global-Locality-for-Efficient-Reasoning/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.07101)

**저자:** Lijie Yang, Zhihao Zhang, Arti Jain, Shijie Cao, Baihong Yuan, Yiwei Chen, Zhihao Jia, Ravi Netravali



## 핵심 연구 목표
본 논문은 대규모 추론 모델(LRMs)의 긴 토큰 생성 과정에서 발생하는 막대한 계산 오버헤드를 해결하는 것을 목표로 합니다. 기존 희소 어텐션(sparse attention) 방식들이 장기 생성 시 누적되는 오류로 인해 정확도가 저하되거나 값비싼 재훈련을 요구하는 문제를 극복하고, **전역적인 어텐션 패턴**을 활용하여 정확도를 유지하거나 향상시키면서도 지연 시간과 메모리 사용량을 크게 줄이는 **훈련-불필요(training-free) 희소 어텐션 메커니즘**을 제안합니다.

## 핵심 방법론
제안된 **LessIsMore**는 **Unified Attention Head Selection**과 **Stable Recency Window**라는 두 가지 핵심 기법을 도입합니다. **Unified Attention Head Selection**은 전통적인 헤드별 최적화와 달리, 로컬 어텐션 헤드에서 선택된 토큰과 최근 컨텍스트 정보를 통합하여 다음 디코딩 레이어에 사용할 토큰을 전역적으로 랭킹합니다. **Stable Recency Window**는 총 토큰 예산의 고정된 비율(예: **25%**)을 가장 최근에 생성된 토큰에 할당하여 추론 태스크에서 일관되게 나타나는 최신성 지역성을 활용합니다.

## 주요 결과
LessIsMore는 **AIME-24/25, MATH500, GPQA-Diamond**와 같은 다양한 추론 벤치마크에서 다른 희소 어텐션 방법론들(Quest, TidalDecode, SeerAttention-r) 대비 일관되게 **더 높은 정확도**를 달성하며, **풀 어텐션(full attention)** 성능에 근접하거나 능가합니다. 특히 **Qwen3-8B** 모델과 **2K 토큰 예산**에서 AIME-24 태스크 수행 시, 풀 어텐션의 **74.48%** 대비 **73.75%**의 정확도를 보여 거의 손실 없는 성능을 입증했습니다. 또한 풀 어텐션 대비 **평균 1.1배 디코딩 속도 향상**을, 기존 희소 어텐션 방식 대비 **1.13배 종단 간(end-to-end) 속도 향상**을 달성하며 **2배 적은 토큰**을 사용했습니다.

## AI 실무자를 위한 시사점
본 연구는 훈련 없이도 하이브리드 어텐션 접근 방식이 LLM의 추론 정확도를 유지하면서 효율성을 크게 개선할 수 있음을 보여줍니다. AI/ML 엔지니어는 LessIsMore가 제시하는 **전역 토큰 선택** 및 **최신성 지역성**의 중요성을 이해함으로써, 긴 생성 시퀀스를 처리해야 하는 추론 모델의 **추론 비용과 지연 시간을 효과적으로 줄일 수 있는 실용적인 솔루션**을 적용할 수 있습니다. 이는 효율적인 LLM 아키텍처 개발에 중요한 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.