---
title: "[논문리뷰] iFSQ: Improving FSQ for Image Generation with 1 Line of Code"
excerpt: "이 [arXiv]에 게시한 'iFSQ: Improving FSQ for Image Generation with 1 Line of Code' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Finite Scalar Quantization (FSQ)
  - Image Generation
  - Autoregressive Models
  - Diffusion Models
  - Quantization
  - Tokenization
  - Representation Alignment (REPA)
  - Latent Space

permalink: /ai/review/2026-01-27-iFSQ-Improving-FSQ-for-Image-Generation-with-1-Line-of-Code/

toc: true
toc_sticky: true

date: 2026-01-27 00:00:00+0900+0900
last_modified_at: 2026-01-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.17124)

**저자:** Bin Lin, Zongjian Li, Yuwei Niu, Kaixiong Gong, Yunyang Ge, Yunlong Lin, Mingzhe Zheng, JianWei Zhang, Miles Yang, Zhao Zhong, Liefeng Bo, Li Yuan



## 핵심 연구 목표
이미지 생성 분야의 Autoregressive(AR) 모델과 Diffusion 모델 간의 단절을 해소하고, 이들을 위한 **통일된 토크나이저를 구축** 하는 것을 목표로 합니다. 특히, 기존 **FSQ(Finite Scalar Quantization)** 의 활성화 함수가 신경망 활성화의 비균일 분포와 일치하지 않아 발생하는 재구성 충실도와 정보 효율성 간의 고질적인 트레이드오프 문제를 해결하고자 합니다.

## 핵심 방법론
FSQ의 **tanh 활성화 함수** 를 가우시안 잠재 공간을 균일 분포로 매핑하는 **분포 매칭 활성화 함수 (y = 2.0 · σ(1.6x) – 1)** 로 대체하여 **iFSQ** 를 제안했습니다. 이 변화는 **단 한 줄의 코드 수정** 으로 구현되며, 균일한 양자화 빈 활용과 높은 재구성 정밀도를 동시에 보장합니다. 또한, Diffusion 모델에 사용되던 **Representation Alignment (REPA)** 기법을 AR 모델에 적용하여 **LlamaGen-REPA** 를 개발했습니다.

## 주요 결과
**iFSQ** 는 원본 FSQ보다 우수한 재구성 성능을 보였으며, **Diffusion 모델 (DiT-L/2)** 에서 **iFSQ (4비트)** 는 기존 AE 모델보다 더 나은 **gFID (12.76)** 와 **3배 높은 압축률 (96 vs 24)** 을 달성했습니다. **AR 모델 (LlamaGen-L)** 에서도 **iFSQ (4비트)** 는 VQ 모델보다 우수한 **gFID (28.07 vs 33.90)** 를 기록했습니다. 최적의 이산-연속 표현 균형은 **차원당 약 4비트** 에서 나타났으며, AR 모델은 초기 수렴이 빠르지만 Diffusion 모델이 궁극적으로 더 높은 생성 품질을 달성했습니다.

## AI 실무자를 위한 시사점
**iFSQ** 는 이미지 생성 파이프라인에서 토크나이저의 **재구성 품질과 압축 효율성** 을 **간단하게 개선** 할 수 있는 효과적인 방법을 제공합니다. AR 및 Diffusion 모델의 **훈련 수렴 속도와 최종 품질 간의 트레이드오프** 에 대한 실용적인 통찰력을 제공하여 **프로젝트의 자원 제약 및 품질 목표** 에 따른 모델 선택을 지원합니다. **LlamaGen-REPA** 의 성공은 사전 훈련된 시각 피처를 활용하여 AR 모델의 **의미론적 학습을 가속화** 할 수 있음을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.