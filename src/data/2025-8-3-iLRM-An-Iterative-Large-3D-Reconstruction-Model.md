---
title: "[논문리뷰] iLRM: An Iterative Large 3D Reconstruction Model"
excerpt: "Abdelrahman Mohamed이 arXiv에 게시한 'iLRM: An Iterative Large 3D Reconstruction Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Reconstruction
  - Gaussian Splatting
  - Iterative Refinement
  - Transformer Architecture
  - Multi-view Learning
  - Scalability
  - Feed-forward Models

permalink: /ai/review/2025-8-3-iLRM-An-Iterative-Large-3D-Reconstruction-Model/

toc: true
toc_sticky: true

date: 2025-08-03 07:35:17+0900
last_modified_at: 2025-08-03 07:35:17+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2507.23277)

# iLRM: An Iterative Large 3D Reconstruction Model

**저자:** Gyeongjin Kang, Seungtae Nam, Xiangyu Sun, Abdelrahman Mohamed, Sameh Khamis, Eunbyung Park

**키워드:** `3D Reconstruction`, `Gaussian Splatting`, `Iterative Refinement`, `Transformer Architecture`, `Multi-view Learning`, `Scalability`, `Feed-forward Models`

## 핵심 연구 목표
본 논문은 일반화 가능한 Feed-forward 3D 재구성 모델, 특히 **Transformer 아키텍처** 를 기반으로 하는 최신 방법론들이 다수의 뷰 또는 고해상도 이미지 처리 시 겪는 **확장성 및 높은 연산 비용 문제** 를 해결하고자 합니다. 궁극적으로, 빠르고 고품질의 3D 장면 재구성을 실시간으로 달성하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **iLRM 모델** 은 **반복적 정제 메커니즘** 을 통해 3D Gaussian 표현을 생성합니다. 이는 세 가지 핵심 원칙에 기반합니다: (1) **장면 표현과 입력 이미지의 디커플링** 을 통해 컴팩트한 3D 표현을 가능하게 합니다; (2) **두 단계 어텐션 스키마** (per-view cross-attention과 global self-attention)를 사용하여 멀티뷰 상호작용의 연산 비용을 줄입니다; (3) **모든 레이어에 고해상도 정보 주입** 을 통해 높은 충실도의 재구성을 달성합니다.

## 주요 결과
**RealEstate10K** 데이터셋에서 기존 최신 방법론 대비 PSNR을 약 **3 dB 향상** (예: **GS-LRM*의 28.10에서 Ours (8, H, F)의 31.01로) **시켰으며, 연산 시간은 절반 이하(** 0.028초 대 0.065초 **)로 단축했습니다. ** DL3DV ** 데이터셋에서는 비슷한 연산 비용으로 약 ** 4 dB의 PSNR 향상 **을 달성하며, 더 많은 수의 입력 뷰(6뷰 대비 24뷰)를 효율적으로 활용하여 뛰어난 확장성을 입증했습니다.

## AI 실무자를 위한 시사점
** iLRM **은 기존 Feed-forward 3D 재구성 모델의 ** 확장성 및 효율성 한계 **를 크게 개선하여, 대규모 실시간 3D 재구성 애플리케이션에 대한 실용적인 가능성을 제시합니다. ** 반복적 정제 메커니즘 **과 ** 어텐션 설계 **는 복잡한 멀티모달 데이터를 처리하는 다른 AI 모델 개발에도 영감을 줄 수 있습니다. 특히, 제한된 연산 자원으로 고품질의 3D 재구성을 필요로 하는 분야에 유용할 것으로 예상됩니다.

> ⚠️ ** 알림:** 이 리뷰는 AI로 작성되었습니다.
