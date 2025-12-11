---
title: "[논문리뷰] TED-4DGS: Temporally Activated and Embedding-based Deformation for 4DGS Compression"
excerpt: "이 [arXiv]에 게시한 'TED-4DGS: Temporally Activated and Embedding-based Deformation for 4DGS Compression' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 4D Gaussian Splatting
  - Dynamic Scene Compression
  - Rate-Distortion Optimization
  - Temporal Activation
  - Embedding-based Deformation
  - Neural Compression
  - 3D Gaussian Splatting

permalink: /ai/review/2025-12-11-TED-4DGS-Temporally-Activated-and-Embedding-based-Deformation-for-4DGS-Compression/

toc: true
toc_sticky: true

date: 2025-12-11 00:00:00+0900+0900
last_modified_at: 2025-12-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.05446)

**저자:** Cheng-Yuan Ho, He-Bi Yang, Jui-Chiu Chiang, Yu-Lun Liu, Wen-Hsiao Peng (National Yang Ming Chiao Tung University, Taiwan), Jui-Chiu Chiang (National Chung Cheng University, Taiwan)



## 핵심 연구 목표
동적 3D Gaussian Splatting (4DGS) 표현을 위한 **시간적으로 활성화되고 임베딩 기반의 변형(deformation) 스키마** 를 개발하여, **rate-distortion 최적화 압축** 을 달성하는 것이 목표입니다. 기존 4DGS 방법론들이 가지는 과도하게 명시된 단명(short-lived) 가우시안 문제나, 명시적인 시간 제어가 부족한 정규 가우시안 변형의 한계를 극복하고자 합니다.

## 핵심 방법론
논문은 **sparse anchor-based 3DGS 표현** 위에 구축되며, 각 정규 앵커에는 **학습 가능한 시간 활성화(temporal-activation) 파라미터** 가 할당되어 시점별 나타나고 사라지는 전환을 명시합니다. 경량의 **앵커별 임베딩(per-anchor temporal embedding)** 은 공유된 **변형 뱅크(deformation bank)** 를 쿼리하여 앵커별 변형을 생성합니다. **Rate-distortion 압축** 을 위해, **암시적 신경망 표현(INR)-기반 하이퍼프라이어(hyperprior)** 를 사용하여 앵커 속성 분포를 모델링하고, **채널 단위 자동회귀 모델(channel-wise autoregressive model)** 로 앵커 내 상관관계를 포착합니다.

## 주요 결과
TED-4DGS는 **HyperNeRF [36]** 및 **Neu3D [24] 데이터셋** 에서 기존 방법론들을 능가하는 **최첨단 rate-distortion 성능** 을 달성했습니다. 특히, **Neu3D 데이터셋** 의 `sear steak` 장면에서 **E-D3DGS [2] 대비 14배 이상, 4DGaussians [40] 대비 18배 이상의 파일 크기 절감** 을 달성하면서도 유사하거나 우수한 렌더링 품질을 제공합니다. **3D printer (HyperNeRF) 장면** 에서는 **23.1dB PSNR** 과 **3.4MB 파일 크기** 로, **ADC-GS [15] 대비 28% 비트레이트 절감** 을 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 동적 3D 장면을 **효율적으로 압축** 하고 **고품질 렌더링** 을 제공해야 하는 AI/ML 엔지니어에게 실용적인 솔루션을 제시합니다. **시간적 활성화 메커니즘** 을 통해 동적 장면의 **오클루전/디스오클루전 문제를 효과적으로 관리** 하고, 비정상적인 변형 아티팩트를 방지하여 렌더링 품질과 압축 효율을 동시에 개선할 수 있습니다. **INR-기반 하이퍼프라이어** 와 **채널 단위 자동회귀 모델** 을 활용한 **rate-distortion 최적화 압축 프레임워크** 는 실제 애플리케이션에서 저장 및 전송 효율성을 크게 향상시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.