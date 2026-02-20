---
title: "[논문리뷰] The Art of Scaling Reinforcement Learning Compute for LLMs"
excerpt: "arXiv에 게시된 'The Art of Scaling Reinforcement Learning Compute for LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLMs
  - Scaling Laws
  - Compute Efficiency
  - Predictability
  - Sigmoidal Curves
  - ScaleRL
  - Off-Policy RL

permalink: /ai/review/2025-10-16-The-Art-of-Scaling-Reinforcement-Learning-Compute-for-LLMs/

toc: true
toc_sticky: true

date: 2025-10-16 13:09:51+0900
last_modified_at: 2025-10-16 13:09:51+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.13786)

**저자:** Devvrit Khatri, Lovish Madaan, Rishabh Tiwari, Rachit Bansal, Sai Surya Duvvuri, Manzil Zaheer, Inderjit S. Dhillon, David Brandfonbrener, Rishabh Agarwal



## 핵심 연구 목표
본 연구는 LLM 훈련에 필수적인 RL(강화 학습)의 확장(Scaling) 특성에 대한 예측 방법론이 부족하다는 문제를 해결하고자 합니다. 사전 훈련(pre-training)에서 확립된 예측 가능한 스케일링 법칙과 유사하게, **RL 컴퓨팅 스케일링** 을 분석하고 예측하기 위한 원칙적인 프레임워크를 정의하고 안정적이며 효율적인 **RL 훈련 레시피** 를 개발하는 것이 목표입니다.

## 핵심 방법론
연구진은 예측 가능한 RL 성능을 위해 기대 보상 대 훈련 컴퓨팅 간의 **시그모이드(sigmoid) 함수** 를 제안하고, 이를 기반으로 **40만 GPU-시간 이상** 의 대규모 실험을 수행했습니다. **PipelineRL 비동기 설정** , **CISPO 손실 함수** , **FP32 정밀도 고정** , **프롬프트 수준 손실 집계** , **배치 수준 이점 정규화** , **제로 분산 필터링** , **긍정적 재샘플링 없음** 등 다양한 알고리즘 선택을 분석하여 최적의 조합인 **ScaleRL** 을 구축했습니다.

## 주요 결과
**ScaleRL** 은 **10만 GPU-시간** 에 달하는 대규모 단일 RL 실행에서 검증 성능을 성공적으로 예측하고 확장했습니다. 이는 기존 RL 방법론 대비 더 높은 **점근적 보상(A=0.61)** 과 **컴퓨팅 효율성(B=1.97)** 을 달성했으며, 특히 **FP32 정밀도 고정** 은 점근적 성능을 **0.52에서 0.61로** 크게 개선했습니다. 또한, **17B x 16 MoE** 와 같은 모델 규모 확장은 다운스트림 및 점근적 RL 성능을 현저히 향상시켰습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM RL 훈련에 있어 **컴퓨팅 스케일링의 예측 가능성** 을 제공하여 자원 할당의 불확실성을 크게 줄여줍니다. **ScaleRL** 은 검증된 모범 사례 조합으로, AI 엔지니어가 **안정적이고 효율적인 RL 훈련 파이프라인** 을 구축하는 데 실용적인 가이드라인을 제공합니다. 작은 규모의 실험으로도 대규모 환경에서의 성능을 예측할 수 있어 **비용 효율적인 알고리즘 개발** 및 **확장성 평가** 가 가능해졌습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.