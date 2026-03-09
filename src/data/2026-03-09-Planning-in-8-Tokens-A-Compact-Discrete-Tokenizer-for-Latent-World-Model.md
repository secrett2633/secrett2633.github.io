---
title: "[논문리뷰] Planning in 8 Tokens: A Compact Discrete Tokenizer for Latent World Model"
excerpt: "Suha Kwak이 arXiv에 게시한 'Planning in 8 Tokens: A Compact Discrete Tokenizer for Latent World Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Model
  - Discrete Tokenizer
  - Latent Representation
  - Action Planning
  - Model Predictive Control
  - Real-time AI
  - Compression
  - Vision Foundation Model

permalink: /ai/review/2026-03-09-Planning-in-8-Tokens-A-Compact-Discrete-Tokenizer-for-Latent-World-Model/

toc: true
toc_sticky: true

date: 2026-03-09 00:00:00+0900+0900
last_modified_at: 2026-03-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.05438)

**저자:** Dongwon Kim, Gawon Seo, Jinsung Lee, Minsu Cho, Suha Kwak



## 핵심 연구 목표
본 논문은 기존 월드 모델의 **수백 개의 잠재 토큰** 이 실시간 계획 수립에 필요한 계산 비용을 과도하게 증가시키는 문제를 해결하고자 합니다. 이를 위해 **CompACT** 라는 **극도로 압축된 이산형 토크나이저** 를 제안하여, 최소 **8개의 토큰** 으로 관측을 인코딩하면서도 계획에 필수적인 정보를 유지하고 연산 비용을 획기적으로 줄이는 것을 목표로 합니다.

## 핵심 방법론
**CompACT 토크나이저** 는 **frozen DINOv3** 모델을 인코더 백본으로 활용하여 저수준 시각적 세부 사항을 무시하고 계획 관련 시맨틱 정보를 추출합니다. 추출된 피처는 **학습 가능한 쿼리 토큰** 을 가진 **잠재 리샘플러** 와 **Finite Scalar Quantization (FSQ)** 을 통해 **8-16개의 이산 토큰** 으로 압축됩니다. 재구성은 직접적인 픽셀 재구성 대신 **MaskGIT-VQGAN** 과 같은 **생성형 디코더** 를 사용하여 고품질 이미지를 합성합니다.

## 주요 결과
**CompACT (8 토큰)** 는 **RECON 벤치마크** 에서 **SD-VAE (1024 토큰)** 대비 **약 40배 빠른 계획 시간 (4.83초 vs 178.78초)** 을 달성하면서도 유사한 계획 정확도를 유지합니다. **Inverse Dynamics Model (IDM)** 학습 결과, **CompACT (16 토큰, R2=0.716)** 이 **MaskGIT-VQGAN (256 토큰, R2=0.684)** 보다 우수한 성능을 보여 토큰이 행동 관련 정보를 더 잘 포착함을 입증했습니다.

## AI 실무자를 위한 시사점
**CompACT** 는 시각적 관측을 극도로 압축하여 **월드 모델의 실시간 계획 능력** 을 크게 향상시키며, 이는 로봇 공학 및 자율주행과 같은 **실제 환경에서의 배포 가능성** 을 높입니다. 이 접근 방식은 계획 작업에 있어 **픽셀 단위의 재구성보다 시맨틱 추상화** 가 더 중요함을 시사하며, **사전 훈련된 비전 파운데이션 모델** 을 활용한 효율적인 인코딩 전략의 효과를 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.