---
title: "[논문리뷰] DiffusionVL: Translating Any Autoregressive Models into Diffusion Vision Language Models"
excerpt: "이 [arXiv]에 게시한 'DiffusionVL: Translating Any Autoregressive Models into Diffusion Vision Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Vision Language Models
  - Autoregressive Models
  - Diffusion Finetuning
  - Block Diffusion
  - Multimodal AI
  - KV Cache

permalink: /ai/review/2025-12-18-DiffusionVL-Translating-Any-Autoregressive-Models-into-Diffusion-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-18 00:00:00+0900+0900
last_modified_at: 2025-12-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.15713)

**저자:** Lunbin Zeng¹*, Jingfeng Yao¹,*, Bencheng Liao¹, Hongyuan Tao¹, Wenyu Liu¹, Xinggang Wang1,†



## 핵심 연구 목표
본 논문은 기존 확산 비전 언어 모델(dVLMs)의 성능 저하와 가변 길이 생성 및 KV 캐시 재사용의 비효율성 문제를 해결하고자 합니다. 특히, 기존의 강력한 **자기회귀(AR) 모델** 을 효과적인 **확산 비전 언어 모델(dVLM)** 으로 변환하는 것이 가능한지에 대한 근본적인 질문에 답하고, 이를 위한 효율적인 방법론을 제시하는 것을 목표로 합니다.

## 핵심 방법론
DiffusionVL은 기존 AR 모델을 확산 패러다임으로 변환하기 위해 단순한 **확산 파인튜닝(diffusion finetuning)** 접근 방식을 제안합니다. AR-VLMs의 경우 **Eq. (3)** 을 사용하여 전체 파라미터를 확산 파인튜닝하며, AR-LMs의 경우 **LLaVA [22] 패러다임** 을 따라 **커넥터** 를 **자기회귀 목표(Eq. (1))** 로 먼저 훈련한 후, **확산 파인튜닝(Eq. (3))** 을 적용합니다. 또한, **블록 디코딩 설계** 를 도입하여 **임의 길이 생성** 과 **KV 캐시 재사용** 을 지원하며, 추론 시 **정적 또는 동적 낮은 신뢰도 재마스킹 전략** 을 사용합니다.

## 주요 결과
DiffusionVL-7B는 확산 비전 언어 모델 중 최고 성능을 달성했으며, **MMMU-Pro (vision) 벤치에서 34.4%** , **MME (Cog.) 벤치에서 37.5%의 성능 향상** 을 보였습니다. 이는 기존 방법론 대비 **5% 미만의 데이터** 만 사용(738K 샘플)하여 이루어진 결과입니다. 또한, 상세 이미지 캡셔닝 작업에서 기존 dVLM 대비 **2.0배 빠른 추론 속도** 를 달성하며, **DiffusionVL-3B** 모델은 더 큰 **LaViDA-L-8B** 및 **Dimple-7B** 보다 뛰어난 성능을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 강력한 **자기회귀(AR) 기반 모델** 을 효율적으로 **확산 비전 언어 모델(dVLM)** 로 전환할 수 있는 실용적인 방법을 제공하여, 기존 AI 모델 자산을 활용하여 새로운 멀티모달 모델을 구축하는 데 드는 비용과 시간을 크게 절감할 수 있습니다. **블록 디코딩 전략** 과 **KV 캐시 재사용** 은 dVLM의 추론 속도와 유연성을 대폭 개선하여, 실시간 상호작용이 필요한 AI 애플리케이션에서의 활용 가능성을 높였습니다. **적은 데이터로 고성능을 달성** 한 점은 자원 제약이 있는 환경에서 멀티모달 AI 시스템을 개발하는 엔지니어에게 중요한 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.