---
title: "[논문리뷰] Test-time scaling of diffusions with flow maps"
excerpt: "Sanja Fidler이 [arXiv]에 게시한 'Test-time scaling of diffusions with flow maps' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Flow Maps
  - Test-time Adaptation
  - Reward Guidance
  - Generative Models
  - SMC
  - Vision-Language Models

permalink: /ai/review/2025-12-01-Test-time-scaling-of-diffusions-with-flow-maps/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.22688)

**저자:** Amirmojtaba Sabour, Michael S. Albergo, Carles Domingo-Enrich, Nicholas M. Boffi, Sanja Fidler, Karsten Kreis, Eric Vanden-Eijnden



## 핵심 연구 목표
본 논문은 확산 모델의 추론 시점에 사용자 정의 보상에 따라 샘플을 개선하는 문제, 특히 보상 함수가 최종 데이터 분포에서만 잘 정의되는 상황에서 발생하는 어려움을 해결하는 것을 목표로 합니다. 기존 방법론들이 겪는 **gradient estimation의 ill-posedness** 와 비효율성을 극복하고, **flow map** 을 활용한 원칙적인 접근 방식을 통해 보다 정확하고 효율적인 보상 유도 생성 및 검색을 가능하게 하고자 합니다.

## 핵심 방법론
핵심적으로 **Flow Map Trajectory Tilting (FMTT)** 이라는 추론 시간 적응 절차를 도입합니다. 이 방법은 **flow map** 과 **velocity field** 간의 관계를 활용하여 보상 유도 생성 프로세스를 정의하며, **flow map look-ahead (Xt,1(xt))** 를 통해 단일 또는 적은 함수 평가로 궤적의 최종 지점을 예측하여 보상 그래디언트를 정확하게 평가합니다. **Jarzynski/SMC 스킴** 과 단순화된 중요도 가중치를 사용하여 편향 없는 샘플링 또는 원칙적인 검색을 수행하며, **Vision-Language Models (VLMs)** 에서 파생된 복잡한 보상 함수도 효과적으로 통합할 수 있습니다.

## 주요 결과
**FMTT** 는 기존의 추론 시간 방법론보다 보상 상승에서 뛰어난 성능을 보였습니다. **UniGenBench++ 벤치마크** 에서 **VLM 기반 보상** 을 사용했을 때, **FMTT** 는 **Best-of-N** 및 **Multi-Best-of-N** 과 같은 기준선 대비 더 낮은 계산 비용으로 더 큰 성능 향상을 일관되게 제공했습니다. **MNIST tilted sampling 실험** 에서는 **최저 총 불일치(total discrepancy)** 와 **최소 열역학적 길이(thermodynamic length)** 를 달성하여, 기울어진 분포의 더 효율적인 샘플링을 입증했습니다.

## AI 실무자를 위한 시사점
**FMTT** 는 확산 모델의 **추론 시간 적응** 을 위한 강력하고 이론적으로 견고한 방법을 제시하며, 특히 복잡하고 미묘한 사용자 정의 보상 함수를 활용하는 데 유용합니다. **Flow map look-ahead** 를 통해 **VLM** 과 같은 최신 보상 모델을 이미지 생성에 효과적으로 통합하여 **자연어 기반 이미지 편집** 및 **정밀 제어** 와 같은 새로운 애플리케이션 가능성을 엽니다. 이는 모델의 편향을 극복하고, 특정 요구 사항(예: 정확한 시계 시간)을 충족하는 이미지를 안정적으로 생성해야 하는 AI 실무자들에게 실용적인 가치를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.