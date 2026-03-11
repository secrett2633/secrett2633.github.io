---
title: "[논문리뷰] Compiler-First State Space Duality and Portable O(1) Autoregressive Caching for Inference"
excerpt: "arXiv에 게시된 'Compiler-First State Space Duality and Portable O(1) Autoregressive Caching for Inference' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - State Space Models
  - Mamba-2
  - XLA
  - JAX
  - Compiler Codegen
  - Autoregressive Caching
  - Hardware Portability
  - Inference Optimization

permalink: /ai/review/2026-03-11-Compiler-First-State-Space-Duality-and-Portable-O1-Autoregressive-Caching-for-Inference/

toc: true
toc_sticky: true

date: 2026-03-11 00:00:00+0900+0900
last_modified_at: 2026-03-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.09555)

**저자:** Cosmo Santoni



## 핵심 연구 목표
이 논문은 **Mamba-2** 의 State Space Duality (SSD) 알고리즘이 기존의 **NVIDIA CUDA/Triton 커널** 에 대한 의존성 없이도 **XLA 컴파일러** 를 통해 효율적이고 이식성 높은 추론 성능을 달성할 수 있음을 증명하는 것을 목표로 합니다. 특히, **O(1) 상태 관리** 를 갖는 자동 회귀 캐싱을 다양한 하드웨어에서 동일한 JAX 코드로 구현하여 하드웨어 종속성을 해소하고자 합니다.

## 핵심 방법론
저자는 **Mamba-2** 의 전체 추론 경로(사전 채우기, 캐시된 자동 회귀 디코딩)를 **XLA 표준 프리미티브** 를 사용하여 구현했습니다. 특히, **대각선 상태 구조** , **청크별 재귀** , **einsum 연산** 및 **정적 제어 흐름** 과 같은 SSD의 대수적 특성을 활용하여 XLA의 최적화 파이프라인에 최적화했습니다. 자동 회귀 디코딩 시 호스트-디바이스 왕복을 피하기 위해 **컴파일된 온-디바이스 `fori_loop`** 를 사용하며, **정적 마스킹** 과 **float32 정밀도 관리** 를 통해 XLA의 퓨전 패스를 보존했습니다.

## 주요 결과
Google Cloud **TPU v6e** 에서 테스트한 결과, XLA 생성 코드는 단일 스트림 사전 채우기에서 약 **140 TFLOPS (15% MFU)** , 디코딩에서 최대 **64% 대역폭 활용률 (HBU)** 을 달성했습니다. 이 구현은 PyTorch/CUDA 참조 구현과 64단계에 걸쳐 **토큰 단위 일치** 하는 탐욕적 디코딩을 수행하며, float32 반올림 오차 범위 내에서 은닉 상태 일치를 보였습니다. **O(1) 캐시** 는 비캐시 방식 대비 최대 **29.1배의 속도 향상** 을 제공했으며, 메모리 사용량도 시퀀스 길이에 관계없이 일정했습니다.

## AI 실무자를 위한 시사점
이 연구는 **Mamba-2** 와 같은 SSM이 특정 하드웨어 전용 커널 없이도 **JAX/XLA 스택** 을 통해 CPU, GPU, TPU 등 다양한 하드웨어에서 높은 성능과 **O(1) 캐싱** 을 제공할 수 있음을 보여줍니다. AI/ML 엔지니어는 **컴파일러 우선 설계 원칙** (정적 마스킹, 온-디바이스 루프, 정밀도 관리)을 활용하여 모델의 이식성과 효율성을 극대화할 수 있습니다. 이는 SSM 기반 모델의 배포 복잡성을 줄이고, 더 넓은 범위의 하드웨어 환경에서 효율적인 추론을 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.