---
title: "[논문리뷰] NaviTrace: Evaluating Embodied Navigation of Vision-Language Models"
excerpt: "이 [arXiv]에 게시한 'NaviTrace: Evaluating Embodied Navigation of Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Embodied Navigation
  - VQA Benchmark
  - Robotic Navigation
  - Semantic-aware Score
  - Dynamic Time Warping
  - Real-world Scenarios

permalink: /ai/review/2025-11-4-NaviTrace-Evaluating-Embodied-Navigation-of-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-11-09 19:22:42+0900
last_modified_at: 2025-11-09 19:22:42+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26909)

**저자:** Tim Windecker, Manthan Patel, Moritz Reuss, Richard Schwarzkopf, Cesar Cadena, Rudolf Lioutikov, Marco Hutter, Jonas Frey



## 핵심 연구 목표
본 논문은 **Vision-Language Models (VLMs)의 실제 환경 내 로봇 내비게이션 능력** 을 평가하기 위한 새로운 벤치마크 `NaviTrace`를 제안합니다. 기존 평가 방법들의 한계점(비용이 많이 드는 실제 환경 시험, 지나치게 단순화된 시뮬레이션, 제한된 벤치마크)을 극복하고, 다양한 로봇 신체 유형(embodiment)에 따른 내비게이션 이해도를 측정하는 것을 목표로 합니다.

## 핵심 방법론
`NaviTrace`는 **1000개의 실제 환경 시나리오** 와 **4가지 로봇 신체 유형(인간, 다족 로봇, 바퀴 달린 로봇, 자전거)** 에 대해 VLM이 2D 내비게이션 경로(trace)를 예측하도록 요구하는 **Visual Question Answering (VQA) 벤치마크** 입니다. 평가를 위해 **Dynamic Time Warping (DTW) 거리** , **목표 도달 지점 오차(FDE)** , 그리고 **Mask2Former 기반 시맨틱 분할 모델** 에서 파생된 **신체 유형별 픽셀 페널티** 를 결합한 **Semantic-aware Trace Score** 를 새롭게 도입하여 인간 선호도와 높은 상관관계를 보임을 입증했습니다.

## 주요 결과
`NaviTrace` 벤치마크에서 인간 전문가의 평균 점수 **75.04점** 대비, 최신 VLM들은 **Gemini 2.5 Pro가 34.55점** 으로 가장 높은 성능을 기록했습니다. 이는 **인간 성능에 비해 큰 격차** 를 보여주며, VLM이 **공간 지각 및 목표 지점 파악 능력** 에서 특히 취약함을 드러냈습니다. 새롭게 제안된 **Semantic-aware Trace Score** 는 인간 선호도와 **0.8707의 높은 Spearman 상관계수** 를 보이며 평가 지표로서의 유효성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 현재 VLM이 실제 환경에서 **로봇 내비게이션을 수행하는 데 있어 인간과 상당한 성능 차이** 가 있음을 명확히 보여주며, 특히 **정확한 목표 지점 인식 및 경로 계획** 능력에 대한 추가 연구의 필요성을 시사합니다. `NaviTrace` 벤치마크는 **확장 가능하고 재현 가능한 평가 환경** 을 제공하여 로봇 내비게이션 분야의 VLM 개발 및 성능 향상에 중요한 기여를 할 것으로 기대됩니다. 또한, **Semantic-aware Trace Score** 는 빠르고 효율적인 모델 평가를 위한 실용적인 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.