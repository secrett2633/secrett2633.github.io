---
title: "[논문리뷰] Learnable Multipliers: Freeing the Scale of Language Model Matrix Layers"
excerpt: "이 [arXiv]에 게시한 'Learnable Multipliers: Freeing the Scale of Language Model Matrix Layers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Weight Decay
  - Learnable Multipliers
  - Scale Adaptation
  - Optimization
  - µP Parametrization
  - Adam
  - Muon

permalink: /ai/review/2026-01-09-Learnable-Multipliers-Freeing-the-Scale-of-Language-Model-Matrix-Layers/

toc: true
toc_sticky: true

date: 2026-01-09 00:00:00+0900+0900
last_modified_at: 2026-01-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.04890)

**저자:** Maksim Velikanov, Ilyas Chahed, Jingwei Zuo, Dhia Eddine Rhaiem, Younes Belkada, Hakim Hacid



## 핵심 연구 목표
대규모 언어 모델(LLM) 학습 시 **Weight Decay(WD)** 가 가중치 행렬의 스케일을 "노이즈-WD 평형" 상태에 고정시켜 데이터에 최적화된 스케일 학습을 방해하는 문제를 해결하는 것이 목표입니다. 이로 인해 저하되는 모델 성능을 개선하고, 가중치 스케일 학습의 자유도를 높여 보다 풍부한 내부 표현을 가능하게 하고자 합니다.

## 핵심 방법론
가중치 행렬 **W** 에 **학습 가능한 스칼라(sW)** 및 **벡터 승수(ri W ij cj)** 를 도입하여 가중치 스케일의 학습 자유도를 부여합니다. 이 승수들은 WD의 영향을 받지 않으므로 모델이 데이터에 맞춰 최적의 스케일을 학습할 수 있게 합니다. **Adam** 및 **Muon** 옵티마이저를 사용하여 검증하고, **µP 파라미터화** 와의 연관성 및 그래디언트 클리핑, 아키텍처 대칭성 등의 실제 적용 문제를 다룹니다.

## 주요 결과
학습 가능한 승수(LRM)를 적용했을 때, **Adam** 옵티마이저의 평균 벤치마크 점수가 **1.21%** 향상되었고, **Muon** 옵티마이저에서는 **1.10%** 향상되었습니다. 승수를 사용하지 않은 기준선은 다양한 norm scale에서 성능 저하를 겪었으나, LRM은 안정적인 성능을 유지하며 내부 피처 스케일의 다양성을 크게 확대했습니다. 특히 추론 관련 벤치마크(BBH, MATH lv15, GSM8K)에서 유의미한 성능 향상을 보였습니다.

## AI 실무자를 위한 시사점
**학습 가능한 승수** 는 기존 **Weight Decay** 로 인해 고정되었던 모델 가중치의 스케일을 데이터에 맞춰 자동으로 최적화하여 LLM의 성능을 효과적으로 개선합니다. 이는 **µP 스케일링** 과 같은 복잡한 수동 하이퍼파라미터 튜닝의 필요성을 줄여주며, **추론 시 오버헤드가 없어** 실용성이 높습니다. 다양한 옵티마이저와 아키텍처에 적용 가능하여 범용적인 성능 향상 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.