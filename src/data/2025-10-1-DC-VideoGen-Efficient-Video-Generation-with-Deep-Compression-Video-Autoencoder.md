---
title: "[논문리뷰] DC-VideoGen: Efficient Video Generation with Deep Compression Video
  Autoencoder"
excerpt: "arXiv에 게시된 'DC-VideoGen: Efficient Video Generation with Deep Compression Video
  Autoencoder' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Diffusion Models
  - Video Autoencoder
  - Deep Compression
  - Model Acceleration
  - Fine-tuning
  - Latent Space
  - Temporal Modeling

permalink: /ai/review/2025-10-1-DC-VideoGen-Efficient-Video-Generation-with-Deep-Compression-Video-Autoencoder/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.25182)

**저자:** Junyu Chen, Wenkun He, Yuchao Gu, Yuyang Zhao, Jincheng Yu, Junsong Chen, Dongyun Zou, Yujun Lin, Zhekai Zhang, Muyang Li, Haocheng Xi, Ligeng Zhu, Enze Xie, Song Han, Han Cai



## 핵심 연구 목표
본 논문은 기존 비디오 확산 모델의 **높은 훈련 및 추론 비용** 문제를 해결하여, 고해상도 및 장시간 비디오 생성의 효율성을 대폭 향상시키는 것을 목표로 합니다. 특히, 사전 훈련된 모델의 품질을 유지하면서 **깊은 압축 잠재 공간** 으로 효율적으로 전환하는 프레임워크를 개발하는 데 중점을 둡니다.

## 핵심 방법론
핵심 방법론은 두 가지 혁신에 기반합니다: 첫째, **Deep Compression Video Autoencoder (DC-AE-V)** 는 새로운 **청크-인과적(chunk-causal) 시간적 설계** 를 통해 32배/64배 공간 압축과 4배 시간 압축을 달성하면서 재구성 품질과 긴 비디오에 대한 일반화 능력을 유지합니다. 둘째, **AE-Adapt-V** 라는 강력한 적응 전략을 통해 사전 훈련된 비디오 확산 모델을 **경량 파인튜닝** 만으로 새로운 잠재 공간에 안정적으로 전이합니다. 이 과정에는 **비디오 임베딩 공간 정렬 단계** 와 **LoRA 파인튜닝** 이 포함됩니다.

## 주요 결과
DC-VideoGen은 **2160x3840 해상도** 비디오 생성 시 기준 모델인 **Wan-2.1-T2V-1.3B** 대비 **최대 14.8배 낮은 추론 지연 시간** 을 달성했습니다. 또한, **Wan-2.1-14B** 모델 적응에 **단 10 GPU-일** 이 소요되어, 스크래치 훈련 대비 **230배의 훈련 비용 절감** 효과를 보였습니다. 이와 함께 품질 저하 없이 **VBench 점수** 에서 동등하거나 우수한 성능을 유지하며, 단일 GPU로 고해상도 비디오 생성을 가능하게 합니다.

## AI 실무자를 위한 시사점
DC-VideoGen은 고해상도 비디오 확산 모델의 배포 및 개발에 있어 **실질적인 비용 절감 효과** 를 제공합니다. 기존 대규모 사전 훈련 모델의 **효율적인 전이 학습 및 압축 전략** 은 새로운 모델을 처음부터 훈련하는 것보다 훨씬 경제적이며, 이는 **비디오 생성 기술의 접근성** 을 높입니다. 특히, 제한된 컴퓨팅 자원을 가진 환경에서 고품질 비디오 생성을 가능하게 하여 광범위한 응용 분야에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.