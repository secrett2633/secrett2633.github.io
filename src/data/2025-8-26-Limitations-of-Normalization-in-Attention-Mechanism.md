---
title: "[논문리뷰] Limitations of Normalization in Attention Mechanism"
excerpt: "Radu State이 [arXiv]에 게시한 'Limitations of Normalization in Attention Mechanism' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Attention Mechanism
  - Normalization
  - Softmax
  - Transformer Models
  - Gradient Sensitivity
  - Token Separability
  - Context Length
  - GPT-2

permalink: /ai/review/2025-8-26-Limitations-of-Normalization-in-Attention-Mechanism/

toc: true
toc_sticky: true

date: 2025-08-26 13:21:57+0900
last_modified_at: 2025-08-26 13:21:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.17821)

**저자:** Timur Mudarisov, Mikhail Burtsev, Tatiana Petrova, Radu State



## 핵심 연구 목표
본 연구는 어텐션 메커니즘에서 사용되는 정규화, 특히 **소프트맥스(softmax)** 의 근본적인 한계를 밝히는 것을 목표로 합니다. 콘텍스트 길이 **L** 이 증가함에 따라 어텐션 가중치가 **1/L** 로 수렴하는 `vanishing attention` 현상과 이로 인해 토큰 구분 능력이 저하되는 문제, 그리고 학습 중 발생하는 그래디언트 민감도 문제를 이론 및 실험적으로 분석합니다.

## 핵심 방법론
논문은 어텐션의 선택 능력을 이론적으로 분석하기 위한 프레임워크를 제시하며, 선택된 토큰과 선택되지 않은 토큰 간의 표현 거리 상한을 유도하는 **거리 바운드(Theorem 1)** 와 기하학적 구별 가능성을 정량화하는 **기하학적 바운드(Theorem 2)** 를 포함합니다. 또한, 일반적인 정규화 함수에 대한 **자코비안 노름(Jacobian norm) 바운드(Lemma 2)** 를 통해 그래디언트 민감도를 분석합니다. 이러한 이론적 예측은 **사전 훈련된 GPT-2 모델** 을 사용하여 다양한 콘텍스트 길이 **L** 과 선택된 토큰 수 **N** 에 대해 실험적으로 검증되었습니다.

## 주요 결과
실험 결과는 선택된 토큰 수 **N** 이 콘텍스트 길이 **L** 에 비례하여 증가할 때, 토큰 간의 표현 거리가 **0** 으로 수렴함을 보여줍니다 ( **Fig. 2b, 2c** ). 기하학적으로는 이상적인 구형 임베딩 조건에서도 어텐션 헤드 하나당 **~80%** 이상의 토큰을 동시에 구별하기 어렵다는 한계를 확인했습니다 ( **Fig. 3** ). 또한, 그래디언트 민감도가 온도 매개변수 **T** 에 대해 **1/T** 에 비례함을 보여주어 ( **Fig. 4** ), 낮은 온도 설정(T < 0.1)이 어텐션 분포를 날카롭게 만들지만 학습 안정성을 저해함을 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 긴 콘텍스트 길이에서 어텐션의 판별 능력을 유지하기 위해 **top-k** 또는 **희소 어텐션(sparse attention)** 과 같이 **활성 세트(active set)를 작게 유지** 하는 전략(예: **N < 0.06L** )을 고려해야 합니다. 또한, 어텐션 헤드가 기하학적 용량을 포화(대략 **70-85%** 의 토큰만 구별 가능)했는지 판단하기 위해 **어텐션 엔트로피** 또는 **Ns/N 비율** 을 모니터링해야 합니다. 그래디언트 불안정성을 피하기 위해 **공격적인 낮은 온도 설정(T < 0.1)은 지양** 하고, 대신 **length-aware** 또는 **sparsity-inducing** 정규화 기법들을 활용하는 것이 권장됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.