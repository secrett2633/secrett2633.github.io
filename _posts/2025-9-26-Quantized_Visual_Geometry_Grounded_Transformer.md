---
title: "[논문리뷰] Quantized Visual Geometry Grounded Transformer"
excerpt: "Yuqi Li이 [arXiv]에 게시한 'Quantized Visual Geometry Grounded Transformer' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Quantization
  - Post-Training Quantization
  - 3D Reconstruction
  - Visual Transformer
  - Model Compression
  - Efficient Inference
  - Hadamard Rotation
  - Calibration Sampling

permalink: /ai/review/2025-9-26-Quantized_Visual_Geometry_Grounded_Transformer/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21302)

**저자:** Weilun Feng, Haotong Qin, Mingqiang Wu, Chuanguang Yang, Yuqi Li, Xiangqi Li, Zhulin An, Libo Huang, Yulun Zhang, Michele Magno, Yongjun Xu



## 핵심 연구 목표
대규모 **Visual Geometry Grounded Transformers (VGGTs)** 모델의 과도한 연산 및 메모리 비용 문제를 해결하고, 실세계 배포를 위한 효율적인 저비트 양자화 프레임워크를 개발하는 것이 목표입니다. 특히, VGGT의 데이터 독립적인 특수 토큰과 불안정한 다중 뷰 데이터 보정 샘플링으로 인한 양자화 난관을 극복하고자 합니다.

## 핵심 방법론
본 논문은 두 가지 주요 기법을 제시합니다: 첫째, **Dual-Smoothed Fine-Grained Quantization (DSFQ)**은 아웃라이어를 분산시키고 헤비테일 분포를 완화하는 **사전-전역 Hadamard 회전**과 채널 간 분산을 정규화하는 **사후-지역 채널 스무딩**을 결합합니다. 둘째, **Noise-Filtered Diverse Sampling (NFDS)**은 깊은 레이어 통계를 통해 노이즈 아웃라이어를 필터링하고, **VGGT의 귀납적 편향**에 맞춰 프레임 인지 기반의 다양한 보정 클러스터를 구축하여 안정적인 양자화 범위를 보장합니다.

## 주요 결과
제안된 **QuantVGGT**는 **4비트(W4A4)** 양자화 설정에서 풀-프리시전 모델 대비 **3.7배의 메모리 절감**과 **2.5배의 추론 가속화**를 달성했습니다. 특히, 카메라 포즈 추정 태스크에서 풀-프리시전 대비 **98% 이상의 재구성 정확도**를 유지하며, 기존 최첨단 양자화 방법들을 큰 폭으로 능가하는 성능을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **VGGT**와 같은 대규모 3D 재구성 모델의 실제 배포를 가능하게 하는 효과적인 **저비트 양자화 솔루션**을 제공합니다. 특히, **Hadamard 변환**을 활용한 분포 스무딩 및 **프레임 인지 샘플링 전략**은 특정 도메인 모델의 양자화 문제를 해결하는 데 중요한 통찰을 줍니다. 이를 통해 자원 제약이 있는 환경에서도 고성능 3D 비전 모델을 효율적으로 활용할 수 있는 길이 열렸습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.