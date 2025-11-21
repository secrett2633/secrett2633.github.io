---
title: "[논문리뷰] LUT-LLM: Efficient Large Language Model Inference with Memory-based   Computations on FPGAs"
excerpt: "Jason Cong이 [arXiv]에 게시한 'LUT-LLM: Efficient Large Language Model Inference with Memory-based   Computations on FPGAs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - FPGA
  - Large Language Models (LLM)
  - Inference Optimization
  - Memory-based Computation
  - Vector Quantization
  - Table Lookup
  - Hardware Acceleration

permalink: /ai/review/2025-11-11-LUT-LLM_Efficient_Large_Language_Model_Inference_with_Memory-based_Computations_on_FPGAs/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06174)

**저자:** Zifan He, Shengyu Ye, Rui Ma, Yang Wang, Jason Cong



## 핵심 연구 목표
본 논문은 효율적인 단일 배치 대규모 언어 모델(LLM) 추론을 위해 **FPGA**의 장점을 활용하는 것을 목표로 합니다. 특히, 기존 산술 기반 연산에서 **메모리 기반 연산**으로 전환하여 GPU 대비 FPGA의 성능 및 에너지 효율성 한계를 극복하고, 온디바이스 AI 구현을 위한 핵심 기술을 개발하고자 합니다.

## 핵심 방법론
본 연구는 **LUT-LLM**을 제안하며, 이는 1B+ LLM 추론을 위한 최초의 **메모리 기반 FPGA 가속기**입니다. 주요 기술로는 **벡터 양자화(Vector Quantization)**, 디코딩 지연 시간을 줄이는 **대역폭 인식 병렬 센트로이드 탐색(bandwidth-aware parallel centroid search)**, 활성화-가중치 동시 양자화를 위한 **효율적인 2D 테이블 룩업(2D table lookups)**, 그리고 데이터 캐싱을 줄여 처리량을 높이는 **공간-시간 하이브리드(spatial-temporal hybrid) 설계**를 사용합니다.

## 주요 결과
**AMD V80 FPGA**에서 **Qwen 3 1.7B 모델**을 사용했을 때, **AMD MI210 GPU** 대비 **1.66배 낮은 엔드-투-엔드 지연 시간**을 달성했습니다. 또한, **NVIDIA A100 GPU** 대비 **1.72배 높은 에너지 효율성**을 보였습니다. **LUT-LLM**은 **32B 모델**까지 확장 가능하며, 이때 **A100** 대비 **2.16배 더 나은 에너지 효율성**을 제공함을 보여주었습니다.

## AI 실무자를 위한 시사점
**FPGA**를 활용한 온디바이스 LLM 추론의 새로운 가능성을 제시하며, 특히 **메모리 기반 연산**과 **벡터 양자화**가 GPU의 산술 중심 최적화를 넘어서는 핵심 전략임을 입증했습니다. 이는 배치 처리가 어려운 엣지 디바이스에서의 LLM 배포에 중요한 의미를 가집니다. 다만, 현재는 **수동 설계 최적화**가 필요하여 자동화된 배포 파이프라인 구축에는 추가 연구가 요구됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.