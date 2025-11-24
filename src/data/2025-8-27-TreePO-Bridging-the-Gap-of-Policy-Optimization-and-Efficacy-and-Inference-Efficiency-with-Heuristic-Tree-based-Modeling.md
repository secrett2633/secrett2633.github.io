---
title: "[논문리뷰] TreePO: Bridging the Gap of Policy Optimization and Efficacy and
  Inference Efficiency with Heuristic Tree-based Modeling"
excerpt: "Zhoufutu Wen이 [arXiv]에 게시한 'TreePO: Bridging the Gap of Policy Optimization and Efficacy and
  Inference Efficiency with Heuristic Tree-based Modeling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Policy Optimization
  - Large Language Models
  - Inference Efficiency
  - Tree Search
  - Segment-level Decoding
  - Advantage Estimation
  - Reasoning

permalink: /ai/review/2025-8-27-TreePO-Bridging-the-Gap-of-Policy-Optimization-and-Efficacy-and-Inference-Efficiency-with-Heuristic-Tree-based-Modeling/

toc: true
toc_sticky: true

date: 2025-08-27 13:22:18+0900
last_modified_at: 2025-08-27 13:22:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.17445)

**저자:** Zhoufutu Wen, Qingshui Gu, zhangysk, aaabiao, yizhilll



## 핵심 연구 목표
대규모 언어 모델(LLMs)을 강화 학습(RL)으로 정렬하는 과정에서 발생하는 **높은 온-정책 롤아웃 비용**과 **다양한 추론 경로 탐색의 한계**를 해결하고자 합니다. 본 논문은 시퀀스 생성을 **트리 구조 검색 과정**으로 모델링하여 정책 최적화의 효율성과 추론 성능 간의 격차를 해소하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **TreePO**는 **자체 안내 롤아웃 알고리즘**을 활용하며, **동적 트리 샘플링 정책**과 **고정 길이 세그먼트 디코딩**으로 구성됩니다. 특히, (1) **세그먼트 단위 샘플링 알고리즘**으로 KV 캐시 부담을 줄이고 새로운 브랜치를 생성하며, (2) 전역 및 지역 **프록시말 정책 최적화**를 고려하는 **트리 기반 세그먼트 수준 이점 추정(advantage estimation)**을 사용합니다. 이는 공통 접두사를 통한 연산 상각 및 낮은 가치 경로의 조기 가지치기를 가능하게 합니다.

## 주요 결과
**TreePO**는 복잡한 추론 벤치마크(예: MATH, AIME)에서 기존 모델 대비 성능 향상과 GPU 시간 절약을 입증했습니다. 특히, 훈련된 모델의 샘플링 설계에서 **GPU 시간 22%에서 최대 43%**까지 절약했으며, 궤적(trajectory) 수준 샘플링 연산을 **최대 40%**, 토큰 수준 샘플링 연산을 **35%**까지 감소시켰습니다. 또한, **Qwen2.5-Math-7B-Instruct** 모델에서 평균 **+40% TrajPS** 및 **+30% TokenPS** 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
**TreePO**는 RL 기반 LLM 후처리 훈련을 **더 적은 샘플과 적은 컴퓨팅 자원**으로 확장할 수 있는 실용적인 경로를 제시합니다. 이는 LLM 개발 및 응용 시 **운영 비용 절감**과 **실험 주기 단축**으로 직결됩니다. 트리 구조화된 시퀀스 생성 모델링은 컴퓨팅 오버헤드를 대폭 줄여, 복잡한 추론 문제에 대한 **RL 미세 조정 접근법**의 효율성과 확장성을 크게 향상시킵니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.