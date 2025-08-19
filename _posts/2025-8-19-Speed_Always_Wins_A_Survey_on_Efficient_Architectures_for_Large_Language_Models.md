---
title: "[논문리뷰] Speed Always Wins: A Survey on Efficient Architectures for Large
  Language Models"
excerpt: "Jusen Du이 [arXiv]에 게시한 'Speed Always Wins: A Survey on Efficient Architectures for Large
  Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Efficient Architectures
  - Transformer Optimization
  - Linear Attention
  - State Space Models
  - Mixture-of-Experts
  - Sparse Attention
  - Diffusion LLMs

permalink: /ai/review/2025-8-19-Speed_Always_Wins_A_Survey_on_Efficient_Architectures_for_Large_Language_Models/

toc: true
toc_sticky: true

date: 2025-08-19 13:15:01+0900
last_modified_at: 2025-08-19 13:15:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.09834)

**저자:** Weigao Sun, Jiaxi Hu, Yucheng Zhou, Jusen Du, Disen Lan, Kexin Wang, Tong Zhu, Xiaoye Qu, Yu Zhang, Xiaoyu Mo, Daizong Liu, Yuxuan Liang, Wenliang Chen, Guoqi Li, Yu Cheng



## 핵심 연구 목표
본 설문조사 논문은 기존 Transformer 기반 대규모 언어 모델(LLMs)의 **Quadratic 복잡성**과 높은 **연산 및 메모리 요구사항**으로 인한 비효율성 문제를 해결하기 위한 혁신적인 아키텍처를 체계적으로 검토하는 것을 목표로 합니다. 언어 이해, 생성, 추론 및 멀티모달 기능에서 LLM의 잠재력을 최대한 발휘하면서도 **확장 가능하고 자원 효율적인 AI 시스템** 개발을 촉진하고자 합니다.

## 핵심 방법론
이 조사는 효율적인 LLM 아키텍처를 **선형 시퀀스 모델링**, **희소 시퀀스 모델링**, **효율적인 완전 어텐션**, **희소 MoE(Mixture-of-Experts)**, **하이브리드 아키텍처**, **확산 LLM**, 그리고 **다른 양식으로의 응용**이라는 7가지 주요 범주로 분류합니다. 각 범주 내에서 **핵심 설계 원칙, 성능 이점, 알려진 한계**를 분석하며, **FlashAttention**과 같은 IO-aware 어텐션, **Mamba**와 같은 상태 공간 모델(SSMs), **MoE 라우팅 메커니즘** 등 주요 기술적 세부사항을 다룹니다.

## 주요 결과
선형 시퀀스 모델링은 self-attention의 **Quadratic 복잡성**을 **O(N) 선형 복잡성**으로 줄여 추론 시 **KV 캐시 저장 필요성을 제거**합니다. **FlashAttention-2**는 GPU 메모리 전송을 최적화하여 밀집 FlashAttention 대비 **2-4배의 속도 향상**을 달성했으며, **Grouped Query Attention (GQA)**과 **Multi-Head Latent Attention (MLA)**은 **KV 캐시 크기를 크게 줄여** 추론 효율성을 높입니다. **MoE**는 계산 비용의 비례 증가 없이 **모델 용량을 대폭 늘려** 성능을 향상시킵니다.

## AI 실무자를 위한 시사점
본 조사는 AI 실무자들이 LLM의 **연산 및 메모리 병목 현상**을 해결하기 위한 다양한 아키텍처 최적화 전략을 이해하는 데 유용합니다. **선형 시퀀스 모델링** 및 **희소 어텐션** 같은 기법들은 **장문 컨텍스트 처리**의 효율성을 크게 높일 수 있음을 시사합니다. 또한, 효율적인 아키텍처 원칙이 **비전, 오디오, 멀티모달 도메인**으로 확장 적용되고 있어, 다양한 AI 애플리케이션에서 **리소스 효율성**을 확보하는 데 도움이 됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.