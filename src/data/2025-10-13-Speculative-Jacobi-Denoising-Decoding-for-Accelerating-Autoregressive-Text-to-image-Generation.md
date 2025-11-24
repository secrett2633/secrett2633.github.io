---
title: "[논문리뷰] Speculative Jacobi-Denoising Decoding for Accelerating Autoregressive
  Text-to-image Generation"
excerpt: "Han Shi이 [arXiv]에 게시한 'Speculative Jacobi-Denoising Decoding for Accelerating Autoregressive
  Text-to-image Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Models
  - Text-to-Image Generation
  - Inference Acceleration
  - Jacobi Decoding
  - Denoising Diffusion Models
  - Speculative Decoding
  - Multi-token Prediction
  - Fine-tuning

permalink: /ai/review/2025-10-13-Speculative-Jacobi-Denoising-Decoding-for-Accelerating-Autoregressive-Text-to-image-Generation/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08994)

**저자:** Yao Teng, Fuyun Wang, Xian Liu, Zhekai Chen, Yu Wang, Zhenguo Li, Weiyang Liu, Difan Zou, Han Shi, Xihui Liu



## 핵심 연구 목표
본 논문은 순차적인 토큰별 디코딩 과정으로 인해 수천 번의 모델 포워드 패스를 요구하는 자율회귀 텍스트-투-이미지 모델의 느린 추론 속도 문제를 해결하는 것을 목표로 합니다. 병렬 토큰 디코딩을 통해 자율회귀 텍스트-투-이미지 생성 모델의 추론을 가속화하고자 합니다.

## 핵심 방법론
제안하는 **Speculative Jacobi-Denoising Decoding (SJD2)** 프레임워크는 디노이징(denoising) 과정을 Jacobi 반복에 통합하여 자율회귀 모델에서 병렬 토큰 생성을 가능하게 합니다. 사전 학습된 자율회귀 모델이 **노이즈가 추가된 토큰 임베딩**을 받아들이고 다음 **깨끗한 토큰(next clean tokens)**을 예측하도록 하는 **next-clean-token prediction 패러다임**과 저비용 **미세 조정 전략**을 도입합니다. 추론 시에는 **가우시안 노이즈**로 토큰 시퀀스를 초기화하고, 임베딩 공간에서 반복적인 **next-clean-token-prediction**을 수행하며, **확률적 기준**을 통해 여러 토큰을 병렬로 검증하고 수용합니다.

## 주요 결과
SJD2는 모델 포워드 패스 수를 크게 줄이면서 시각적 품질을 유지함을 입증했습니다. **Lumina-mGPT**에서 자율회귀 디코딩 대비 약 **4배 적은 스텝 수**(예: COCO2017에서 2357에서 592 스텝으로)와 **2.63배의 지연 시간 가속**을 달성했으며, **CLIP-Score는 31.8**을 유지했습니다. **Emu3**에서는 약 **5.6배 적은 스텝 수**(예: 8193에서 1461 스텝으로)와 **2.63배의 지연 시간 가속**을 보였고, CLIP-Score는 30.8을 기록했습니다.

## AI 실무자를 위한 시사점
이 연구는 자율회귀 텍스트-투-이미지 생성의 **추론 속도 병목 현상**을 해결하는 실용적인 방법을 제공하여 실시간 애플리케이션에 매우 유용합니다. **병렬 토큰 디코딩**과 **디노이징 궤적 활용**을 통해 이미지 품질 저하 없이 더 빠른 생성을 가능하게 하여, 인터랙티브 도구 및 대규모 배포에 큰 이점을 제공합니다. 기존 자율회귀 모델에 노이즈를 포함한 입력을 처리하도록 미세 조정하는 전략은 기존 모델의 활용성을 확장하는 데 중요한 기법입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.