---
title: "[논문리뷰] Inferix: A Block-Diffusion based Next-Generation Inference Engine for World Simulation"
excerpt: "Jiahao He이 [arXiv]에 게시한 'Inferix: A Block-Diffusion based Next-Generation Inference Engine for World Simulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Simulation
  - Video Generation
  - Block Diffusion
  - Semi-Autoregressive
  - KV Cache Management
  - Inference Engine
  - Long Video Generation
  - Performance Optimization

permalink: /ai/review/2025-11-27-Inferix-A-Block-Diffusion-based-Next-Generation-Inference-Engine-for-World-Simulation/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20714)

**저자:** Jiahao He, Yizeng Han, Tianyu Feng, Inferix Team, SteveZeyuZhang



## 핵심 연구 목표
기존 비디오 확산 모델의 비효율성 및 고정 길이 제약과 AR 모델의 낮은 품질 및 병렬화 불가능 문제를 극복하고자 합니다. **Inferix**는 최적화된 **준-자동회귀(block-diffusion)** 디코딩 패러다임을 통해 몰입형 세계 합성을 가능하게 하는 차세대 추론 엔진을 개발하여 대규모 세계 모델의 계산 및 저장 과제를 해결하는 것을 목표로 합니다.

## 핵심 방법론
Inferix는 비디오 토큰을 블록 단위로 생성하고 각 블록 내에서 확산을 적용하며 이전 블록에 조건을 부여하는 **블록-확산 프레임워크**를 채택합니다. 이는 효율적이고 가변 길이, 고품질 생성을 위해 **LLM-스타일 KV 캐시 관리**를 재도입합니다. 또한, **Ulysses-스타일 시퀀스 병렬처리** 및 **링 어텐션**과 같은 최적화된 병렬 전략과 지능형 **KV 캐시 관리자**, 그리고 **DAX 양자화**를 통합하여 성능을 극대화합니다.

## 주요 결과
논문은 장편 비디오 생성의 문제점을 해결하기 위한 전용 추론 엔진으로 **Inferix**를 제안하며, 확산과 자동회귀 방식의 강점을 결합하여 **효율적이고 가변 길이의 고품질 생성**을 가능하게 한다고 밝힙니다. 기존 모델인 **Wan2.1 14B**가 **NVIDIA H20**에서 5초 길이 비디오를 생성하는 데 **6,800초**가 소요되는 문제를 해결하고자 합니다. 이를 위해 **GPT-4o**로 캡션이 생성된 **1,000개**의 분 단위 길이 비디오로 구성된 새로운 벤치마크인 **LV-Bench**를 도입했지만, Inferix 자체의 구체적인 정량적 성능 개선 수치는 본 논문에서 명시적으로 제시되지 않았습니다.

## AI 실무자를 위한 시사점
**Inferix**는 AI/ML 엔지니어에게 LLM 중심 또는 표준 비디오 확산 엔진을 넘어선 **세계 시뮬레이션** 및 **장편 비디오 생성**을 위한 최적화된 전용 추론 엔진을 제공합니다. **지능형 KV 캐시 관리**를 포함한 **블록-확산 패러다임**은 확장 가능하고 고품질의 비디오 합성을 위한 청사진을 제시합니다. 또한, **LV-Bench**와의 통합은 분 단위 길이 비디오 작업에서 모델 성능을 평가하기 위한 표준화된 미세한 평가 프레임워크를 제공하여 새로운 세계 모델 개발 및 비교에 핵심적인 도구가 됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.