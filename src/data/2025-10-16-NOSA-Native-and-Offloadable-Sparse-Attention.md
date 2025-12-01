---
title: "[논문리뷰] NOSA: Native and Offloadable Sparse Attention"
excerpt: "Zhiyuan Liu이 [arXiv]에 게시한 'NOSA: Native and Offloadable Sparse Attention' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Sparse Attention
  - KV Cache Offloading
  - LLMs
  - Decoding Throughput
  - Locality Constraint
  - Memory Optimization
  - Trainable Sparse Attention

permalink: /ai/review/2025-10-16-NOSA-Native-and-Offloadable-Sparse-Attention/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13602)

**저자:** Yuxiang Huang, Chaojun Xiao, Xu Han, Zhiyuan Liu



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 긴 컨텍스트 디코딩 시 발생하는 메모리 병목 현상, 특히 **KV 캐시 크기** 가 배치 크기 및 디코딩 처리량을 제한하는 문제를 해결하는 것을 목표로 합니다. 기존 학습 가능한 희소 어텐션(trainable sparse attention) 방법이 KV 캐시 크기 자체를 줄이지 못해 발생하는 효율성 한계를 극복하고자 합니다.

## 핵심 방법론
제안하는 **NOSA** (Native and Offloadable Sparse Attention)는 학습 가능한 희소 어텐션이 자연적으로 보이는 **토큰 선택의 지역성(locality)** 에 **명시적인 지역성 제약** 을 추가합니다. 이를 위해 토큰 선택을 **쿼리 인지(query-aware)** 및 **쿼리 불가지(query-agnostic) 구성 요소** 로 분해하고, **ED-DMA** 최적화를 적용하여 **KV 전송량** 을 줄이면서도 어텐션 연산은 유지합니다. 추론 시스템은 **Triton 커널** 및 효율적인 **C++ 메모리 관리자** 를 사용하여 PCIe 통신 효율성을 극대화합니다.

## 주요 결과
**1B-파라미터 모델** 에 **NOSA** 를 적용한 결과, **INFLLM-V2** 대비 거의 손실 없는 태스크 성능을 유지했습니다. 특히 디코딩 처리량에서 큰 개선을 보여, 바닐라 학습 가능한 희소 어텐션(INFLLM-V2) 대비 최대 **2.3배 향상** 을 달성했으며, **INFLLM-V2에 바닐라 오프로딩을 적용한 경우** 와 비교해서도 **13.6%** 의 처리량 개선을 이루었습니다. **KV 캐시 히트율** 또한 INFLLM-V2의 **0.889** 에서 NOSA의 **0.944** 로 약 **5.5% 증가** 했습니다.

## AI 실무자를 위한 시사점
**NOSA** 는 LLM 디코딩 시 **KV 캐시 오프로딩** 의 효율성을 획기적으로 개선하는 실용적인 방법을 제시합니다. 특히 메모리 제약이 있는 환경에서 **더 큰 배치 크기** 와 **긴 시퀀스** 를 처리해야 하는 AI/ML 엔지니어에게 유용하며, **모델 성능 저하 없이 디코딩 처리량을 향상** 시킬 수 있음을 보여주었습니다. **명시적인 지역성 제약** 을 학습 과정에 통합하는 설계는 효율적인 오프로딩을 위한 새로운 접근 방식을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.