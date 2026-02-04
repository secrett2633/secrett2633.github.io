---
title: "[논문리뷰] Token Sparse Attention: Efficient Long-Context Inference with Interleaved Token Selection"
excerpt: "Jae-Joon Kim이 [arXiv]에 게시한 'Token Sparse Attention: Efficient Long-Context Inference with Interleaved Token Selection' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Sparse Attention
  - Long-Context Inference
  - LLMs
  - Token Selection
  - Efficiency
  - Transformer
  - Dynamic Sparsity

permalink: /ai/review/2026-02-04-Token-Sparse-Attention-Efficient-Long-Context-Inference-with-Interleaved-Token-Selection/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.03216)

**저자:** Dongwon Jo, Beomseok Kang, Jiwon Song, Jae-Joon Kim



## 핵심 연구 목표
대규모 언어 모델(LLMs)에서 **O(L²)** 의 복잡성을 가지는 어텐션 메커니즘이 긴 컨텍스트 추론의 병목이 되는 문제를 해결하고자 합니다. 기존의 희소 어텐션(sparse attention) 방법론들이 갖는 경직성, 즉 관련성 없는 토큰 유지 또는 비가역적인 토큰 제거로 인한 한계를 극복하고, 동적이고 유연한 토큰 수준의 희소화를 통해 효율적인 긴 컨텍스트 추론을 달성하는 것이 목표입니다.

## 핵심 방법론
제안된 **Token Sparse Attention** 은 **"Compress and then Decompress"** 라는 두 단계 설계로 이루어집니다. 첫 번째 단계인 **QKV 압축** 에서는 각 어텐션 헤드마다 **Dynamic Token Coverage** 정책을 사용하여 정보성 토큰의 부분집합( **L' << L** )을 동적으로 선택하고, Q, K, V 텐서를 압축합니다. 두 번째 단계인 **어텐션 출력 역압축** 에서는 압축된 텐서에 대한 어텐션 연산 후, 결과를 **원래 시퀀스 길이(L) 차원의 제로 초기화된 텐서** 로 다시 스캐터하여 잔여 연결에 통합합니다. 이 방식은 **FlashAttention** 과 같은 기존 어텐션 커널들과 완벽하게 호환됩니다.

## 주요 결과
**Token Sparse Attention** 은 128K 컨텍스트에서 **최대 x3.23 어텐션 속도 향상** 을 달성했으며, 이때 정확도 저하는 **1% 미만** 이었습니다. 특히 **FlexPrefill** 과 결합했을 때, **동일한 정확도(87.3%)** 에서 FlexPrefill 단독의 **x2.4 속도 향상** 대비 **x2.8 속도 향상** 을 보여 상호 보완적인 이점을 입증했습니다. 추가 오버헤드는 최고 희소성 수준에서도 **전체 어텐션 지연 시간의 11% 미만** 으로 매우 적었습니다.

## AI 실무자를 위한 시사점
이 연구는 LLMs의 **긴 컨텍스트 처리 능력** 을 크게 향상시켜, 장문 요약, 다단계 추론, 코드 생성 등 고급 애플리케이션의 실현 가능성을 높입니다. **기존의 FlashAttention 등 고성능 어텐션 커널과의 높은 호환성** 덕분에, 현재 AI/ML 인프라에 쉽게 통합하여 성능을 최적화할 수 있습니다. 동적이고 헤드별 토큰 선택 메커니즘은 이전 토큰 제거 방식의 한계를 극복하여, **정확도와 효율성 간의 균형** 을 효과적으로 달성할 수 있는 실용적인 방안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.