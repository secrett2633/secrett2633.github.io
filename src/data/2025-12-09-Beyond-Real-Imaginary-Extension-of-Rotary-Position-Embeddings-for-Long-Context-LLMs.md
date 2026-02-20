---
title: "[논문리뷰] Beyond Real: Imaginary Extension of Rotary Position Embeddings for Long-Context LLMs"
excerpt: "arXiv에 게시된 'Beyond Real: Imaginary Extension of Rotary Position Embeddings for Long-Context LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Rotary Position Embedding
  - Long-Context LLMs
  - Complex-Valued Neural Networks
  - Self-Attention
  - Positional Encoding
  - Information Loss
  - Length Extrapolation

permalink: /ai/review/2025-12-09-Beyond-Real-Imaginary-Extension-of-Rotary-Position-Embeddings-for-Long-Context-LLMs/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07525)

**저자:** Xiaoran Liu, Yuerong Song, Zhigeng Liu, Zengfeng Huang, Qipeng Guo, Zhaoxiang Liu, Shiguo Lian, Ziwei He, Xipeng Qiu



## 핵심 연구 목표
현재 **RoPE(Rotary Position Embeddings)** 구현이 어텐션 스코어 계산 시 복소수 값의 내적에서 **실수부만 사용** 하고 허수부를 버려, 장문맥 의존성 모델링에 중요한 **관계형 정보 손실** 이 발생하는 문제를 해결하고자 합니다. 본 연구는 이 버려진 허수부를 재통합하여 **장문맥 LLM** 의 성능을 향상시키고 더 많은 위치 정보를 보존하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 버려지던 허수부를 재통합하는 **RoPE++** 를 제안합니다. 이는 **완전한 복소수 값 표현** 을 활용하여 듀얼 컴포넌트 어텐션 스코어(실수부 및 허수부)를 생성합니다. 두 가지 설정이 있습니다: **RoPE++EH** 는 기존 어텐션 헤드 수를 유지하되 **KV 캐시 및 QKV 파라미터를 절반** 으로 줄이고, **RoPE++EC** 는 동일한 캐시 크기로 **어텐션 헤드를 두 배** 로 늘립니다. 이 방법론은 FlashAttention과 통합되어 추가 오버헤드 없이 병렬 처리가 가능합니다.

## 주요 결과
**RoPE++** 는 표준 **RoPE** 및 다른 위치 임베딩보다 단문맥 및 장문맥 벤치마크에서 일관되게 우수한 성능을 보였습니다. 특히, **RoPE++EH** 는 **KV 캐시를 절반** 으로 줄였음에도 바닐라 **RoPE** 와 비슷한 성능을 달성했고, **RoPE++EC** 는 동일한 캐시 비용으로 장문맥 태스크에서 **RoPE** 를 크게 능가했습니다 (예: 776M 모델 RULER 64k에서 **RoPE++EC** 평균 **29.4** 점 vs **RoPE** 평균 **27.4** 점). 허수 어텐션이 장문맥 모델링에 중요한 역할을 하며, **RoPE++** 가 기존 **RoPE** 보다 문맥 길이를 넘어선 **외삽(extrapolation)** 시 퍼플렉서티 증가율이 더 완만함을 확인했습니다.

## AI 실무자를 위한 시사점
본 연구는 **RoPE** 의 숨겨진 잠재력, 즉 허수 성분을 활용하여 **LLM의 장문맥 처리 능력** 을 획기적으로 향상시킬 수 있음을 보여줍니다. 특히 **RoPE++EH** 는 **KV 캐시 및 QKV 파라미터를 절반으로 줄이면서** 도 성능을 유지 또는 향상시키므로, 메모리 및 연산 리소스가 제한된 환경에서 **효율적인 LLM 배포** 를 가능하게 합니다. **RoPE++EC** 는 동일한 리소스에서 더 높은 성능을 제공하여 장문맥 LLM의 성능 극대화를 위한 강력한 대안을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.