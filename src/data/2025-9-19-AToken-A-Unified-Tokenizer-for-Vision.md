---
title: "[논문리뷰] AToken: A Unified Tokenizer for Vision"
excerpt: "Mingze Xu이 arXiv에 게시한 'AToken: A Unified Tokenizer for Vision' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Unified Visual Tokenizer
  - Multimodal AI
  - Transformer Architecture
  - 4D Representation
  - Adversarial-free Training
  - Reconstruction
  - Semantic Understanding
  - Generative Models

permalink: /ai/review/2025-9-19-AToken-A-Unified-Tokenizer-for-Vision/

toc: true
toc_sticky: true

date: 2025-09-19 13:12:21+0900
last_modified_at: 2025-09-19 13:12:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.14476)

**저자:** Jiasen Lu, Liangchen Song, Mingze Xu, Byeongjoo Ahn, Yanjun Wang, Chen Chen, Afshin Dehghan, Yinfei Yang



## 핵심 연구 목표
ATOKEN은 기존 시각 토크나이저들의 모달리티 및 태스크별 분절 문제를 해결하고, 이미지, 비디오, 3D 에셋 전반에서 고품질 재구성 및 심층적인 의미론적 이해를 동시에 달성하는 범용 시각 토크나이저를 개발하는 것을 목표로 합니다. 이를 통해 차세대 멀티모달 AI 시스템을 위한 통합 시각 표현의 기반을 마련하고자 합니다.

## 핵심 방법론
ATOKEN은 모든 시각 입력을 **공유 4D 잠재 공간** 으로 인코딩하며, 이를 위해 **4D Rotary Position Embeddings (RoPE)** 가 적용된 순수 **트랜스포머 아키텍처** 를 사용합니다. 훈련 안정성을 위해 **지각 손실(perceptual loss)** 과 **그램 행렬 손실(Gram matrix loss)** 을 결합한 **적대적 학습 없는(adversarial-free)** 훈련 목표를 도입하고, **점진적 훈련 커리큘럼** 을 통해 이미지에서 비디오, 3D로 확장하며 연속 및 이산 잠재 토큰을 모두 지원합니다.

## 주요 결과
ATOKEN은 이미지에서 **0.21 rFID** 와 **82.2% ImageNet 정확도** , 비디오에서 **3.01 rFVD** 와 **32.6% MSRVTT 검색률** , 3D에서 **28.19 PSNR** 과 **90.9% 분류 정확도** 를 달성했습니다. 특히, 멀티모달 훈련이 단일 모달리티 성능을 향상시키는 것으로 나타났으며, 이미지 재구성 품질이 **Stage 1의 0.258 rFID에서 Stage 3의 0.209 rFID로** 개선되었습니다.

## AI 실무자를 위한 시사점
ATOKEN은 다양한 시각 모달리티와 태스크를 단일 프레임워크로 통합하여 AI 모델 개발의 복잡성을 줄이고 효율성을 높일 수 있는 **통합 기반 모델** 의 잠재력을 제시합니다. **적대적 학습 없는 안정적인 트랜스포머 기반 훈련** 은 대규모 모델 스케일링에 유리하며, **연속 및 이산 토큰 지원** 은 다양한 생성 및 이해 시나리오에 유연하게 적용될 수 있습니다. 또한, **KV-캐싱 메커니즘** 을 통한 추론 가속화는 실제 애플리케이션에 매우 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.