---
title: "[논문리뷰] Post-LayerNorm Is Back: Stable, ExpressivE, and Deep"
excerpt: "arXiv에 게시된 'Post-LayerNorm Is Back: Stable, ExpressivE, and Deep' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Transformer Architecture
  - Layer Normalization
  - Depth Scaling
  - Training Stability
  - Large Language Models
  - Gradient Flow
  - Highway Networks
  - Post-LayerNorm

permalink: /ai/review/2026-01-28-Post-LayerNorm-Is-Back-Stable-ExpressivE-and-Deep/

toc: true
toc_sticky: true

date: 2026-01-28 00:00:00+0900+0900
last_modified_at: 2026-01-28 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.19895)

**저자:** Chen Chen*, Lai Wei*,†



## 핵심 연구 목표
현재 대규모 언어 모델(LLM)의 스케일링이 한계에 부딪혔으며, 특히 깊이 스케일링은 이론적으로 우수한 표현력을 제공하지만 기존 Transformer 아키텍처는 극심한 깊이에서 안정적으로 훈련하기 어렵습니다. 본 논문은 과거 불안정성으로 대체되었던 **Post-LayerNorm (Post-LN)** 을 재조명하고, 그 핵심 실패 원인인 **ResNet-style residual pathway** 의 그래디언트 소실 문제를 해결하여, **극도로 깊은 LLM** 을 위한 안정적이고 표현력 있는 아키텍처를 제안하는 것을 목표로 합니다.

## 핵심 방법론
논문은 **KEEL** 이라는 새로운 **Post-LN Transformer** 아키텍처를 제안하며, 이는 기존 ResNet-style residual path를 **Highway-style connection** 으로 대체합니다. 이 Highway-style connection은 **스케일링 팩터 α** (논문에서는 총 서브 레이어 수 **L** 로 설정)와 변환 브랜치 입력에 대한 **추가 Layer Normalization** 을 도입하여 잔여 브랜치를 통한 **그래디언트 흐름** 을 안정적으로 보존합니다. 이러한 구조적 변경은 특수 초기화나 복잡한 최적화 트릭 없이도 깊은 네트워크의 그래디언트 소실을 방지합니다.

## 주요 결과
**KEEL** 은 **1000개 이상의 레이어** 를 가진 모델에서도 안정적인 훈련을 가능하게 하며, Pre-LN 대비 일관된 성능 향상을 보였습니다. 특히, **Math & Code** 와 같은 추론 집약적 태스크에서 **Pre-LN baseline 대비 최대 +16.5%** 의 성능 향상(Figure 1b)과 **GSM-8K 벤치마크** 에서 **최대 10.0% (51.0%에서 60.9%)** 의 성능 향상(Table 6)을 달성했습니다. 또한, **KEEL** 은 **Pre-LN** 보다 높은 **최대 학습률 (64 레이어 기준 1.01 × 10^-2 vs 7.65 × 10^-3)** 을 허용하며 (Table 1), 깊이가 증가할수록 **Pre-LN** 을 지속적으로 능가하는 우수한 깊이 스케일링 특성을 보였습니다 (Table 3).

## AI 실무자를 위한 시사점
**KEEL** 은 기존 LLM의 **깊이 스케일링 한계** 를 극복하고 **매우 깊은 모델** 을 안정적으로 훈련할 수 있는 실용적인 아키텍처를 제공합니다. 특히 **추론 및 코딩 능력** 과 같이 복잡한 태스크에서 **성능 향상** 이 두드러지므로, 이러한 능력이 중요한 모델 개발에 유용하게 활용될 수 있습니다. **Pre-LN에 비해 높은 학습률** 로 훈련할 수 있어 **최적화 속도** 를 높이고 더 나은 최적화 결과에 도달할 가능성을 열어줍니다. **특수 초기화나 복잡한 최적화 트릭 없이** 안정적인 훈련이 가능하다는 점에서 구현 및 배포의 복잡성을 줄일 수 있으나, **충분한 훈련 데이터** 가 있을 때 효과적이며 데이터가 적은 경우에는 권장되지 않는다는 점에 유의해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.