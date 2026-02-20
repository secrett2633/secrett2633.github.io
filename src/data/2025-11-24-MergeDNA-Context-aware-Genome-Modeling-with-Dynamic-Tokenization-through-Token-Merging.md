---
title: "[논문리뷰] MergeDNA: Context-aware Genome Modeling with Dynamic Tokenization through Token Merging"
excerpt: "arXiv에 게시된 'MergeDNA: Context-aware Genome Modeling with Dynamic Tokenization through Token Merging' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Genome Modeling
  - Dynamic Tokenization
  - Token Merging
  - Context-aware Learning
  - DNA Foundation Models
  - Transformer Architecture
  - Multi-omics

permalink: /ai/review/2025-11-24-MergeDNA-Context-aware-Genome-Modeling-with-Dynamic-Tokenization-through-Token-Merging/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.14806)

**저자:** Siyuan Li, Kai Yu, Anna Wang, Zicheng Liu, Chang Yu, Jingbo Zhou, Qirong Yang, Yucheng Guo, Xiaoming Zhang, Stan Z. Li



## 핵심 연구 목표
이 논문은 유전체 서열 모델링의 두 가지 난제인 **다양한 정보 밀도** 와 **고유한 어휘 단위 부재** 를 해결하고자 합니다. 기존의 고정 토큰화 및 순진한 masked language modeling의 한계를 극복하여, **컨텍스트 인식을 통한 동적 토큰화 및 사전 훈련** 이 가능한 새로운 유전체 모델링 프레임워크를 제안하는 것이 목표입니다.

## 핵심 방법론
MergeDNA는 **동적 유전체 토크나이저** 와 **잠재 트랜스포머(latent Transformer)** 를 통합하는 계층적 오토인코더 스타일의 **Transformer 아키텍처** 를 제안합니다. **Local Encoder** 는 **미분 가능한 토큰 병합(token merging) 블록** 과 **로컬 윈도우(local-window) 제약** 을 통해 인접 염기들을 가변 길이 토큰으로 묶고, **Latent Encoder** 는 이 병합된 토큰들의 전역 컨텍스트를 학습합니다. 두 가지 사전 훈련 태스크인 **Merged Token Reconstruction (MTR)** 과 **Adaptive Masked Token Modeling (AMTM)** 을 통해 모델은 중요한 토큰을 보존하고 예측하도록 학습됩니다.

## 주요 결과
MergeDNA는 **Genomic Benchmarks (90.87% 정확도)** , **Nucleotide Transformer (78.39% 평균 점수)** , **GUE benchmark (77.11% 평균 성능)** 등 세 가지 주요 DNA 벤치마크에서 **최고 수준의 성능** 을 달성했습니다. 또한 **RNA Splicing Site Prediction (69.8 AUROC)** , **Causal eQTL (0.75 AUROC)** , **Bulk RNA Expression (0.62 R²)** , 그리고 박테리아 단백질에 대한 **protein fitness prediction (42.7% SRCC)** 와 같은 multi-omics 태스크에서도 강력한 일반화 능력을 입증했습니다. 이는 제안된 **계층적 아키텍처** 와 **MTR 및 AMTM 사전 훈련 태스크** 의 효과를 명확히 보여줍니다.

## AI 실무자를 위한 시사점
이 연구는 DNA 서열의 고유한 특성(가변 정보 밀도, 불분명한 경계)을 효과적으로 처리하기 위한 **동적 토큰화** 와 **컨텍스트 인식 학습** 의 중요성을 강조합니다. **Token Merging** 을 활용한 계층적 Transformer 설계는 기존 고정 토큰화 방식의 한계를 극복하고, 다양한 생물학적 태스크에 대한 **뛰어난 일반화 능력** 을 제공하여 유전체학 분야의 AI 모델 개발에 중요한 방향을 제시합니다. 특히, **선택적 마스킹(adaptive masking)** 과 **다중 목적 학습** 은 데이터의 중요도에 따라 모델 학습을 최적화하는 데 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.