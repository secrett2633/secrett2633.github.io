---
title: "[논문리뷰] Revisiting the Platonic Representation Hypothesis: An Aristotelian View"
excerpt: "Maria Brbić이 [arXiv]에 게시한 'Revisiting the Platonic Representation Hypothesis: An Aristotelian View' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Representational Similarity
  - Null Calibration
  - Permutation Testing
  - Confounder
  - Neural Network Representation
  - Platonic Representation Hypothesis
  - Aristotelian Representation Hypothesis

permalink: /ai/review/2026-02-18-Revisiting-the-Platonic-Representation-Hypothesis-An-Aristotelian-View/

toc: true
toc_sticky: true

date: 2026-02-18 00:00:00+0900+0900
last_modified_at: 2026-02-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.14486)

**저자:** Fabian Gröger, Shuo Wen, Maria Brbić



## 핵심 연구 목표
본 논문은 신경망 표현의 유사성을 측정하는 기존 지표들이 **모델의 폭(width)** 과 **깊이(depth)** 에 의해 체계적으로 왜곡된다는 문제를 제기하며, **Platonic Representation Hypothesis** 의 타당성을 재검토하는 것을 목표로 합니다. 이러한 교란 변수를 제거하고 보정된 유사도 점수를 통해 신경망이 학습하는 표현의 실제 수렴 양상을 정확히 파악하고자 합니다.

## 핵심 방법론
저자들은 **순열 기반 널 캘리브레이션 프레임워크(permutation-based null-calibration framework)** 를 도입하여 모든 표현 유사도 지표를 통계적 유의성이 보장되는 보정된 점수로 변환합니다. 이 프레임워크는 **d/n 비율(차원/샘플 수)** 에 따른 **폭 교란 변수** 와 **최대치(maximum)** 와 같은 선택 기반 집계로 인한 **깊이 교란 변수** 를 각각 **scalar calibration** 및 **aggregation-aware calibration** 을 통해 효과적으로 제거합니다.

## 주요 결과
**널 캘리브레이션** 후, **전역 스펙트럼 유사도(global spectral similarity)** 는 모델 스케일에 따른 수렴 경향이 사라졌지만, **로컬 이웃 유사도(local neighborhood similarity)** 는 다양한 양식에 걸쳐 **유의미한 정렬(significant alignment)** 을 유지함을 발견했습니다. 특히 **mKNN(mutual k-Nearest Neighbors)** 은 **k 값(이웃 수)** 에 관계없이 정렬을 보였으나, **small-σ CKA-RBF** 는 정렬이 사라져, 신경망이 **정확한 거리(exact distances)** 보다는 **위상적 구조(topological structure)** 에 수렴함을 시사합니다.

## AI 실무자를 위한 시사점
신경망 표현 유사도를 분석하는 AI/ML 실무자들은 **모델의 폭과 깊이** 가 결과에 미치는 **교란 효과** 를 반드시 인지하고, 본 논문에서 제안하는 **순열 기반 널 캘리브레이션 프레임워크** 를 활용하여 보다 **신뢰성 있는 유사도 측정** 을 수행해야 합니다. 이는 **Platonic Representation Hypothesis** 의 **전역적 수렴** 보다는 **Aristotelian Representation Hypothesis** 의 **로컬 이웃 관계 수렴** 에 주목해야 함을 강조하며, 모델 스케일링이 **상대적인 이웃 관계** 학습에 기여함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.