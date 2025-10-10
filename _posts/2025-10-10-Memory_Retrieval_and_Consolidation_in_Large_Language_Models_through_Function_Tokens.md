---
title: "[논문리뷰] Memory Retrieval and Consolidation in Large Language Models through
  Function Tokens"
excerpt: "이 [arXiv]에 게시한 'Memory Retrieval and Consolidation in Large Language Models through
  Function Tokens' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - LLM Interpretability
  - Function Tokens
  - Memory Retrieval
  - Memory Consolidation
  - Sparse Autoencoders
  - Pre-training

permalink: /ai/review/2025-10-10-Memory_Retrieval_and_Consolidation_in_Large_Language_Models_through_Function_Tokens/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08203)

**저자:** Shaohua Zhang, Yuan Lin, Hang Li



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs) 내에서 **기억 검색(memory retrieval)** 및 **기억 통합(memory consolidation)** 메커니즘이 어떻게 작동하는지에 대한 이해 부족을 해결하는 것을 목표로 합니다. 특히, **함수 토큰(function tokens)**이 이러한 과정에서 수행하는 핵심 역할을 밝혀 **함수 토큰 가설(Function Token Hypothesis)**을 제시하고자 합니다.

## 핵심 방법론
저자들은 **Gemma2-9B** 및 **LLaMA-3.1-8B** 모델을 활용하여 실험을 수행했습니다. 추론 단계에서는 **희소 오토인코더(Sparse Autoencoders, SAE)**를 통해 추출된 피처와 토큰 간의 **이분 그래프(bipartite graph)**를 분석하여 함수 토큰의 피처 활성화 능력을 측정했습니다. 사전 훈련 단계에서는 **SlimPajama-627B** 코퍼스를 기반으로 모델의 훈련 진행에 따른 **학습 피처 수 증가**와 **토큰 유형별 예측 손실**을 추적하여 기억 통합 과정을 연구했습니다.

## 주요 결과
추론 시, 상위 **10개 빈번한 함수 토큰**이 중간 레이어(layer 20)에서 LLM 피처의 **70% 이상**을 활성화하는 것으로 나타났습니다. 사전 훈련 과정에서 학습된 피처의 수는 초기 **1,942개에서 최종 64,042개로** 크게 증가했으며, **함수 토큰 다음 내용 토큰 예측(function->content prediction)**이 가장 높은 손실(예: 1.5B 모델에서 **4.88**)을 보여 최적화의 핵심 동인임을 입증했습니다.

## AI 실무자를 위한 시사점
LLM이 추론 과정에서 **함수 토큰을 통해 문맥상 가장 예측적인 피처를 활성화**하고, 사전 훈련 시 **함수 토큰 이후의 내용 토큰 예측**이 **모델 파라미터 업데이트 및 피처 학습**을 주도한다는 점은 LLM의 효율적인 학습 및 추론 메커니즘 이해에 중요합니다. 이는 잠재적으로 데이터셋 구성, 손실 함수 설계, 모델 디버깅 및 특정 기능을 제어하기 위한 **프롬프트 엔지니어링** 전략에 실질적인 통찰력을 제공할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.