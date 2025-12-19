---
title: "[논문리뷰] Next-Embedding Prediction Makes Strong Vision Learners"
excerpt: "이 [arXiv]에 게시한 'Next-Embedding Prediction Makes Strong Vision Learners' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Self-supervised Learning
  - Generative Pretraining
  - Vision Transformer
  - Next-Embedding Prediction
  - Autoregressive Model
  - Image Classification
  - Semantic Segmentation
  - Causal Masking

permalink: /ai/review/2025-12-19-Next-Embedding-Prediction-Makes-Strong-Vision-Learners/

toc: true
toc_sticky: true

date: 2025-12-19 00:00:00+0900+0900
last_modified_at: 2025-12-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16922)

**저자:** Sihan Xu, Ziqiao Ma, Wenhao Chai, Xuweiyi Chen, Weiyang Jin, Joyce Chai, Saining Xie, Stella X. Yu



## 핵심 연구 목표
본 논문은 자연어 처리 분야의 생성적 사전 훈련(generative pretraining) 성공 사례에서 영감을 받아, **다음 임베딩 예측(next-embedding prediction)** 을 통해 비전 태스크에서 강력한 자기 지도 학습(self-supervised learning) 모델을 구축하는 것을 목표로 합니다. 기존의 표현 학습(representation learning) 패러다임에서 벗어나, 모델 자체가 예측 태스크를 직접 수행하도록 훈련함으로써 아키텍처 복잡성 없이 확장 가능한 비전 학습자를 개발하고자 합니다.

## 핵심 방법론
제안된 방법론인 **Next-Embedding Predictive Autoregression (NEPA)** 은 이미지를 패치로 분할하고 **공유 인코더** 를 통해 연속적인 임베딩 시퀀스로 변환합니다. 이후 **인과적 마스킹(causal masking)** 과 **stop-gradient** 를 적용한 **자기 회귀(autoregressive) Transformer** 를 사용하여 이전 임베딩을 기반으로 다음 패치 임베딩을 예측하도록 훈련합니다. 손실 함수로는 **부정 코사인 유사도(negative cosine similarity)** 기반의 유사도 측정 방식이 사용되며, 안정성 및 확장성을 위해 **RoPE** , **LayerScale** , **SwiGLU** , **QK-Norm** 등의 최신 아키텍처 구성 요소가 통합되었습니다.

## 주요 결과
NEPA는 **ImageNet-1K** 에서 사전 훈련 후 미세 조정을 거쳐 **ViT-B 백본** 으로 **83.8%** , **ViT-L 백본** 으로 **85.3%** 의 Top-1 분류 정확도를 달성했습니다. 또한, **ADE20K** 시맨틱 분할 태스크에서 **ViT-B** 로 **48.3% mIoU** , **ViT-L** 로 **54.0% mIoU** 를 기록하며 강력한 전이 학습 성능을 보였습니다. 특히, 마스킹 없이 순수한 다음 임베딩 예측만으로도 모델이 객체 중심의 의미론적 관계와 장거리 의존성을 효과적으로 학습하는 것을 확인했습니다.

## AI 실무자를 위한 시사점
NEPA는 픽셀 수준 디코더, 이산 토큰화, 복잡한 대조 손실 없이도 높은 성능을 달성하여 **자기 지도 학습의 복잡성을 크게 줄일 수 있음** 을 시사합니다. **단일 순방향 패스(single forward pass)** 와 **인과적 어텐션** 기반의 단순한 학습 패러다임은 모델 훈련의 효율성과 확장성을 높여, 제한된 컴퓨팅 자원을 가진 환경에서도 적용 가능성을 높입니다. 이는 비전 모델뿐만 아니라 잠재적으로 **모달리티 불가지론적(modality-agnostic)** 통합 모델 개발에도 기여할 수 있는 유망한 접근 방식입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.