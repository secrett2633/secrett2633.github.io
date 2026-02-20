---
title: "[논문리뷰] On Pretraining for Project-Level Code Completion"
excerpt: "arXiv에 게시된 'On Pretraining for Project-Level Code Completion' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code LLMs
  - Project-level Context
  - Code Completion
  - Context Window Extension
  - RoPE Scaling
  - Repository Pretraining
  - Long Code Arena

permalink: /ai/review/2025-10-17-On-Pretraining-for-Project-Level-Code-Completion/

toc: true
toc_sticky: true

date: 2025-10-17 13:09:57+0900
last_modified_at: 2025-10-17 13:09:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13697)

**저자:** Maksim Sapronov, Evgeniy Glukhov



## 핵심 연구 목표
본 연구는 코드 언어 모델(Code LLMs)이 코드베이스 전체의 컨텍스트를 활용하여 정확하고 컨텍스트를 인지하는 코드 완성을 생성하도록 돕기 위해, **저장소 수준(repository-level) 사전 훈련** 전략이 **OpenCoder 1.5B** 모델의 컨텍스트 내 학습 능력에 미치는 영향을 조사하는 것을 목표로 합니다. 특히 다양한 저장소 처리 전략("context composers")의 효과를 평가하고, 제한된 데이터와 컴퓨팅 자원 환경에서도 프로젝트 수준 코드 완성을 달성하고자 합니다.

## 핵심 방법론
**OpenCoder 1.5B** 모델의 컨텍스트 창을 **4,096 토큰에서 16,384 토큰으로 확장** 하기 위해, 추가 **10억(1B) 토큰** 의 큐레이션된 저장소 수준 데이터로 사전 훈련을 수행했습니다. 이 과정에서 **RoPE(Rotary Positional Embedding)의 기본 주파수(θ)를 10,000에서 500,000으로 조정** 하는 ABF(Attention Based Frequencies) 접근 방식을 적용했습니다. 평가는 **Long Code Arena 벤치마크** 의 프로젝트 수준 코드 완성 작업에서 **Exact Match** 지표를 사용하여 `infile` 및 `inproject` 카테고리에서 다양한 컨텍스트 컴포저의 성능을 비교했습니다.

## 주요 결과
경쟁 모델들이 수천억 개의 토큰을 사용하는 것에 비해 적은 **1B 토큰** 의 데이터셋으로도, 모델은 **Long Code Arena 벤치마크** 에서 **45.2점부터 48.8점** 에 이르는 **state-of-the-art 수준** 의 성능을 달성했습니다. 특히, 저장소 수준 사전 훈련으로 **최대 +22.6의 repository-context boost** 를 보였으며, 이러한 성능 향상의 주된 요인은 특정 시퀀스 구성보다는 **새로운 RoPE 스케일링 파라미터** 에 대한 적응임이 밝혀졌습니다. 단순한 파일 수준 훈련 방식도 효과적임을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **상대적으로 적은 훈련 데이터셋 (1B 토큰)** 과 **단순한 컨텍스트 컴포저** 로도 프로젝트 수준 코드 완성에서 최신 성능을 달성할 수 있음을 보여줍니다. 이는 대규모 언어 모델의 긴 컨텍스트 훈련에 필요한 **데이터 및 컴퓨팅 자원 요구사항을 크게 완화** 하여, 더 많은 연구자와 엔지니어들이 이 분야에 접근할 수 있도록 장벽을 낮춥니다. 특히 **RoPE 스케일링과 같은 아키텍처 조정** 이 특정 컨텍스트 구성 전략보다 더 큰 영향을 미친다는 점은 효율적인 모델 개발 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.