---
title: "[논문리뷰] Geometric Stability: The Missing Axis of Representations"
excerpt: "pcr2120이 [arXiv]에 게시한 'Geometric Stability: The Missing Axis of Representations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Geometric Stability
  - Representation Analysis
  - Similarity Metrics
  - Shesha Framework
  - Drift Detection
  - Transfer Learning
  - Neural Representations
  - CRISPR Screens

permalink: /ai/review/2026-01-15-Geometric-Stability-The-Missing-Axis-of-Representations/

toc: true
toc_sticky: true

date: 2026-01-15 00:00:00+0900+0900
last_modified_at: 2026-01-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.09173)

**저자:** Prashant C. Raju



## 핵심 연구 목표
논문은 학습된 표현(learned representations) 분석의 한계를 지적하며, 기존의 유사성(similarity) 측정 방식이 표현된 구조의 견고성(robustness)을 놓친다고 주장합니다. 이를 해결하기 위해, 섭동(perturbation), 재샘플링 또는 맥락 변화에도 불구하고 표현적 기하학적 구조가 얼마나 안정적으로 유지되는지를 정량화하는 새로운 차원인 **기하학적 안정성(geometric stability)** 을 도입하고 측정 프레임워크를 제시하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **Shesha** 라는 프레임워크를 도입하여, 내부 모델 일관성(internal within-model reliability)을 통해 기하학적 안정성을 측정합니다. 이는 RSA(Representational Similarity Analysis)의 **RDMs (Representational Dissimilarity Matrices)** 를 기반으로 하며, 동일한 표현의 섭동되거나 재샘플링된 뷰에서 파생된 RDM들의 일관성을 평가합니다. 특히, **Feature-Split Shesha** 는 기능 하위 집합 간의 일관성을 측정하고, **Sample-Split Shesha** 는 입력 변동에 대한 견고성을 측정하며, 라벨 정보를 활용하는 감독(supervised) 변형도 포함합니다.

## 주요 결과
**7개 도메인, 2,463개 인코더 구성** 에 걸쳐 안정성과 유사성은 경험적으로 **상관관계가 거의 없음(ρ ≈ 0.01)** 을 입증했습니다. **Shesha** 는 상위 주성분(principal components)이 제거된 후에도 미세한 매니폴드 구조에 대한 민감도를 유지하며, 유사성 지표는 노이즈 수준으로 감소합니다. **감독 안정성(supervised stability)** 은 선형 조종성(linear steerability)을 **높게 예측(ρ = 0.89-0.96)** 하고, **CKA보다 약 2배 더 민감하게 구조적 변화를 감지** 했습니다.

## AI 실무자를 위한 시사점
**Shesha** 는 AI 모델의 **안전 모니터링** 에 있어 기능적 지표 역할을 하며, 기능 저하를 유발하는 구조적 변화를 조기에 감지하여 오경보를 줄일 수 있습니다. 또한, **모델의 제어 가능성(controllability)** 을 예측하고, **전이학습(transfer learning)** 에서 안정성과 전이성 사이의 트레이드오프를 이해하는 데 중요한 통찰을 제공하여, 단순히 성능이 좋은 모델이 아닌, **견고하고 신뢰할 수 있는 모델** 을 선택하는 기준을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.