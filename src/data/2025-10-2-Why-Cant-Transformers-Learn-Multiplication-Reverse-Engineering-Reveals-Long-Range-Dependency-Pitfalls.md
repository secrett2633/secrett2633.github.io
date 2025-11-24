---
title: "[논문리뷰] Why Can't Transformers Learn Multiplication? Reverse-Engineering Reveals
  Long-Range Dependency Pitfalls"
excerpt: "Stuart Shieber이 [arXiv]에 게시한 'Why Can't Transformers Learn Multiplication? Reverse-Engineering Reveals
  Long-Range Dependency Pitfalls' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Transformers
  - Multiplication
  - Long-Range Dependencies
  - Implicit Chain-of-Thought
  - Attention Mechanisms
  - Inductive Bias
  - Reverse Engineering

permalink: /ai/review/2025-10-2-Why-Cant-Transformers-Learn-Multiplication-Reverse-Engineering-Reveals-Long-Range-Dependency-Pitfalls/

toc: true
toc_sticky: true

date: 2025-10-02 13:30:22+0900
last_modified_at: 2025-10-02 13:30:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.00184)

**저자:** Xiaoyan Bai, Itamar Pres, Yuntian Deng, Chenhao Tan, Stuart Shieber, Fernanda Viégas, Martin Wattenberg, Andrew Lee



## 핵심 연구 목표
본 논문은 Transformer 기반 언어 모델이 다중 자릿수 곱셈과 같은 겉보기에 간단한 알고리즘 태스크를 학습하는 데 실패하는 이유를 탐구합니다. 특히, 모델이 이러한 태스크에 필요한 **긴밀한 범위의 의존성(long-range dependencies)**을 학습하지 못하는 메커니즘을 규명하고, 이를 극복하기 위한 방법을 모색하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 곱셈에 성공하는 **Implicit Chain-of-Thought (ICoT)** 모델과 실패하는 **Standard Fine-Tuned (SFT)** 모델을 **4x4 자릿수 곱셈 태스크**에서 비교했습니다. **Logit Attribution** 및 **Linear Regression Probing**을 통해 모델이 장거리 의존성을 인코딩하는지 분석하고, **어텐션 패턴 시각화**와 **PCA**를 통해 **Minkowski Sums** 및 **Fourier Basis**와 같은 내부 메커니즘과 숫자 임베딩 기하학을 조사했습니다. 나아가, **"running sum" 예측을 위한 보조 손실(auxiliary loss)**을 도입하여 SFT 모델의 학습 역학을 개선했습니다.

## 주요 결과
**ICoT 모델은 4x4 자릿수 곱셈에서 100% 정확도**를 달성한 반면, **SFT 모델은 1% 미만의 정확도**에 머물렀습니다. ICoT 모델은 부분 곱셈을 캐싱하고 검색하는 **희소한 이진 트리 형태의 어텐션 그래프**를 통해 장거리 의존성을 인코딩하며, 숫자를 **푸리에 기저(Fourier bases)**를 사용하여 **오각 기둥(pentagonal prism)** 형태로 임베딩하는 것으로 밝혀졌습니다. SFT 모델은 학습 과정에서 **중간 자릿수(c3~c6)에서 손실이 고원 현상**을 보이며 장거리 의존성을 학습하지 못했으나, **보조 손실 도입 시 99%의 정확도**를 달성했습니다.

## AI 실무자를 위한 시사점
Transformer 모델이 복잡한 알고리즘 태스크에서 **장거리 의존성을 학습하는 데 어려움**을 겪을 수 있음을 시사합니다. 이러한 한계는 단순히 모델 규모를 키우는 것만으로는 해결되지 않으며, **ICoT**와 같이 **내부적인 추론 과정**을 유도하거나 **보조 손실**을 통해 **올바른 귀납적 편향(inductive bias)**을 제공하는 것이 중요합니다. 이는 AI 모델이 더 복잡한 추론 작업을 수행하도록 돕는 새로운 모델 설계 및 학습 전략 개발에 영감을 줄 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.