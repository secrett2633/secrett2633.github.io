---
title: "[논문리뷰] Dr.LLM: Dynamic Layer Routing in LLMs"
excerpt: "arXiv에 게시된 'Dr.LLM: Dynamic Layer Routing in LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Dynamic Routing
  - LLMs
  - Adaptive Depth
  - Computational Efficiency
  - Monte Carlo Tree Search (MCTS)
  - Retrofittable Framework
  - Supervised Learning
  - Accuracy Improvement

permalink: /ai/review/2025-10-15-Dr-LLM-Dynamic-Layer-Routing-in-LLMs/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.12773)

**저자:** Ahmed Heakl, Martin Gubri, Salman Khan, Sangdoo Yun, Seong Joon Oh



## 핵심 연구 목표
대규모 언어 모델(LLM)이 모든 입력 토큰을 고정된 모든 레이어에 통과시키면서 발생하는 비효율성(쉬운 작업 시 연산 낭비)과 복잡한 추론 작업 시 유연성 부족 문제를 해결하는 것을 목표로 합니다. 기존 적응형 깊이(adaptive-depth) 방법론이 종종 정확도를 희생하거나, 아키텍처 변경 또는 고비용 추론 시간 검색을 요구하는 한계를 극복하고자 합니다.

## 핵심 방법론
**Dr.LLM** 은 동결된 사전 훈련 LLM에 경량의 **레이어별 라우터** 를 추가하여 각 레이어를 **건너뛸지(skip), 실행할지(execute), 반복할지(repeat)** 결정합니다. 라우터는 **Monte Carlo Tree Search (MCTS)** 를 통해 오프라인에서 수집된 **4k개의 최적화된 실행 경로** 로 명시적인 감독 학습을 통해 훈련됩니다. 특히, 장문 컨텍스트에서 안정적인 결정을 위해 **windowed mean-pooling** 을 사용하고, 클래스 불균형 문제 해결을 위해 **focal loss** 와 **class-rebalancing weights** 를 적용합니다.

## 주요 결과
**ARC (logic)** 및 **DART (math)** 태스크에서 Dr.LLM은 평균 **+2.25%p** 의 정확도 향상과 함께 평균 **5.0개** 의 레이어를 절약했습니다. 특히 DART에서는 **+4.0%p** 정확도 향상과 예시당 **11.0개** 의 레이어 절약을 달성했습니다. 또한, **MMLU, GSM8k, AIME** 등 다양한 OOD 벤치마크에서도 평균 **0.85%p** 정확도 하락만으로 효율성을 유지하며, 기존 라우팅 방법론 대비 최대 **+7.7%p** 높은 정확도를 보였습니다.

## AI 실무자를 위한 시사점
**Dr.LLM** 은 **사전 훈련된 LLM** 의 기본 가중치를 변경하지 않으면서 **연산 효율성** 과 **성능 향상** 을 동시에 달성할 수 있는 실용적인 **retrofittable 프레임워크** 를 제공합니다. **오프라인 MCTS** 를 통한 감독 학습 방식은 값비싼 추론 시간 검색이나 대규모 재훈련 없이도 **동적 컴퓨팅 할당** 을 가능하게 하여, 예산에 최적화된 LLM 배포에 기여할 수 있습니다. 특히, 복잡한 추론 태스크에서 **레이어 반복** 을 통해 정확도를 높이는 유연성은 AI 애플리케이션의 성능 향상에 중요한 시사점을 줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.