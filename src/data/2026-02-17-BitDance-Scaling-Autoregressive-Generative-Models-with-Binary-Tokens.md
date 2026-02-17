---
title: "[논문리뷰] BitDance: Scaling Autoregressive Generative Models with Binary Tokens"
excerpt: "Xuefeng Hu이 [arXiv]에 게시한 'BitDance: Scaling Autoregressive Generative Models with Binary Tokens' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Models
  - Binary Tokens
  - Diffusion Head
  - Image Generation
  - Tokenizer
  - Parallel Prediction
  - High-Resolution

permalink: /ai/review/2026-02-17-BitDance-Scaling-Autoregressive-Generative-Models-with-Binary-Tokens/

toc: true
toc_sticky: true

date: 2026-02-17 00:00:00+0900+0900
last_modified_at: 2026-02-17 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.14041)

**저자:** Yuang Ai, Jiaming Han, Shaobin Zhuang, Weijia Mao, Xuefeng Hu, Ziyan Yang, Zhenheng Yang, Huaibo Huang, Xiangyu Yue, Hao Chen



## 핵심 연구 목표
본 논문은 기존 Autoregressive (AR) 모델의 제한된 토큰 표현력과 비효율적인 샘플링 문제를 해결하여, 고품질 이미지 생성을 위한 확장 가능한 AR 프레임워크인 **BitDance** 를 제안합니다. 특히, **이진 시각 토큰** 과 효율적인 다중 토큰 예측을 통해 AR 모델의 확장성과 추론 속도를 대폭 개선하는 것을 목표로 합니다.

## 핵심 방법론
BitDance는 **2^256** 까지 확장 가능한 **대용량 이진 토크나이저** 를 사용하여 이미지의 세부 정보를 보존하며 압축합니다. 샘플링 문제를 해결하기 위해 이진 토큰을 연속 공간의 하이퍼큐브 정점으로 임베딩하고 **이진 확산 헤드(Binary Diffusion Head)** 를 통해 이진 토큰의 분포를 모델링합니다. 또한, **다음 패치 확산(Next-Patch Diffusion)** 방식을 도입하여 여러 토큰을 병렬로 예측함으로써 추론 효율성을 극대화합니다.

## 주요 결과
**ImageNet 256x256** 클래스 조건부 생성에서 **1B** 모델은 **FID 1.24** 를 달성하여 AR 모델 중 최고 성능을 기록했습니다. **BitDance-B-4x** 모델은 **260M** 파라미터로 **1.4B** 의 **RandAR-XXL** 모델을 **FID 0.5** 개선하며 **8.7배 빠른 추론 속도** 를 보였습니다. **1024x1024** 텍스트-투-이미지 생성에서는 기존 AR 모델 대비 **30배 이상** 의 속도 향상을 달성했습니다.

## AI 실무자를 위한 시사점
**BitDance** 는 AR 모델이 고차원 이진 토큰을 효율적으로 다루면서도 고품질 이미지 생성을 가능하게 함을 보여주어, 시각 AR 모델링 설계에 새로운 통찰을 제공합니다. 특히, **이진 확산 헤드** 와 **다음 패치 확산** 전략은 모델 경량화 및 추론 속도 향상에 크게 기여하므로, 제한된 컴퓨팅 자원으로 고성능 생성 모델을 구축하려는 AI 엔지니어에게 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.