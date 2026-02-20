---
title: "[논문리뷰] Regression Language Models for Code"
excerpt: "arXiv에 게시된 'Regression Language Models for Code' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Regression Language Model
  - Code Performance Prediction
  - Static Analysis
  - Neural Architecture Search
  - Text-to-Text Regression
  - Multi-task Learning
  - T5Gemma
  - ONNX

permalink: /ai/review/2025-10-1-Regression-Language-Models-for-Code/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.26476)

**저자:** Yash Akhauri, Xingyou Song, Arissa Wongpanich, Bryan Lewandowski, Mohamed S. Abdelfattah



## 핵심 연구 목표
본 논문은 다양한 프로그래밍 언어 및 컴파일 수준의 코드 실행으로부터 **메모리 사용량, 지연 시간, 신경망 정확도** 와 같은 수치적 메트릭을 예측하는 문제를 다룹니다. 기존 방법들이 복잡하고 도메인에 특화된 특징 공학(feature engineering)에 의존하는 한계를 극복하고, 단일 **회귀 언어 모델(RLM)** 을 통해 이 문제를 효과적으로 해결하는 것을 목표로 합니다.

## 핵심 방법론
주요 방법론은 **T5Gemma-S** 와 같은 사전 훈련된 인코더로 초기화된 **인코더-디코더 Transformer 기반 RLM** 입니다. 이 모델은 회귀를 **y-값에 대한 다음 토큰 예측 문제** 로 처리하며, **정규화 없는 자릿수 단위 숫자 토큰화** 를 사용합니다. **멀티태스크 학습** 방식을 통해 C++, Python, Haskell, Triton 커널 등 다양한 고수준 언어와 **ONNX 그래프** 로 표현된 신경망 아키텍처 데이터를 동시에 학습합니다.

## 주요 결과
RLM은 **APPS Leetcode 피크 메모리** 에서 **>0.9 스피어만 순위(Spearman-rank)** 를 달성했으며, **CodeNet 17개 언어** 에서 **>0.5 평균 스피어만 순위** 를 기록했습니다. 또한, 5가지 NAS 설계 공간(NASNet, Amoeba, PNAS, ENAS, DARTS)에서 기존 **그래프 신경망** 을 능가하는 **0.46의 최고 평균 켄달 타우(Kendall-Tau)** 를 얻었습니다. 이 모델은 **Pixel3, Eyeriss, Intel CPU, Nvidia GPU** 등 다양한 하드웨어 플랫폼에서 **다중 목표 지연 시간 예측** 이 가능함을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 코드의 성능 예측에 있어 **특징 공학의 필요성을 없애는 통합된 LLM 기반 접근 방식** 을 제시합니다. **T5Gemma** 와 같은 사전 훈련된 모델의 활용은 코드 관련 AI 태스크의 학습 효율성과 성능을 크게 향상시킬 수 있음을 시사합니다. **다중 목표 예측 능력** 은 하드웨어-소프트웨어 공동 설계 및 컴파일러 최적화와 같은 실제 AI 시스템 개발에 중요한 도구가 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.