---
title: "[논문리뷰] MHLA: Restoring Expressivity of Linear Attention via Token-Level Multi-Head"
excerpt: "이 [arXiv]에 게시한 'MHLA: Restoring Expressivity of Linear Attention via Token-Level Multi-Head' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Linear Attention
  - Multi-Head Attention
  - Transformer
  - Global Context Collapse
  - Representational Diversity
  - Image Generation
  - NLP
  - Video Generation

permalink: /ai/review/2026-01-13-MHLA-Restoring-Expressivity-of-Linear-Attention-via-Token-Level-Multi-Head/

toc: true
toc_sticky: true

date: 2026-01-13 00:00:00+0900+0900
last_modified_at: 2026-01-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07832)

**저자:** Kewei Zhang, Ye Huang, Yufan Deng, Jincheng Yu, Junsong Chen, Huan Ling, Enze Xie, Daquan Zhou



## 핵심 연구 목표
Transformer의 핵심 모듈인 Self-Attention의 **2차 시간 복잡성** 으로 인한 확장성 문제를 해결하고자 합니다. 특히, 효율적인 대안인 Linear Attention이 **"글로벌 컨텍스트 붕괴(Global Context Collapse)"** 로 인해 표현 다양성과 성능이 저하되는 문제를 진단하고, 이를 해결하여 **Self-Attention에 준하는 표현 능력** 을 선형 복잡도로 복원하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **Multi-Head Linear Attention (MHLA)** 을 제안합니다. 이는 입력 토큰 시퀀스를 **토큰 차원을 따라 여러 개의 비중첩 블록(헤드)** 으로 분할합니다. 각 블록 내에서 **지역 키-값 요약(local key-value summaries)** 을 계산하고, 각 쿼리 블록이 이러한 지역 요약들의 **쿼리 조건부 혼합(query-conditioned mixture)** 에 어텐션하도록 합니다. 이 혼합 과정은 **학습 가능한 계수 행렬(Mc)** 을 통해 이루어지며, **블록 수준 선택과 블록 내 토큰 재가중치 부여** 의 2단계 가중치 메커니즘을 복원합니다. 모든 연산은 표준 GEMM으로 구성되어 **O(Nd²)의 선형 시간 복잡도** 를 유지합니다.

## 주요 결과
MHLA는 다양한 도메인에서 강력한 성능을 입증했습니다. ImageNet 분류에서 **Self-Attention 대비 3.6%** (DiT-S/2 기준 79.8% → **81.0%** )의 정확도 향상을 달성했습니다. 이미지 생성(DiT-S/2)에서는 **FID 점수를 12.6% 개선** 하여 Self-Attention을 능가하는 **59.8 FID** 를 기록했습니다. 비디오 생성에서는 FlashAttention 모델 대비 **2.1배 빠른 추론 속도** 를 달성하며 유사한 성능을 유지했고, NLP LongBench에서 **평균 7.41점** 으로 기존 SOTA 모델들을 능가했습니다. 또한, DiT-S/2 모델에서 **A100 GPU에서 7.13배, H100 GPU에서 8.22배 빠른 처리량** 을 보여주었습니다.

## AI 실무자를 위한 시사점
MHLA는 고해상도 이미지/비디오 생성, 장문 텍스트 이해 등 **매우 긴 시퀀스 길이** 를 다루는 AI 모델 개발 시 **효율성과 성능** 을 동시에 확보할 수 있는 강력한 솔루션을 제공합니다. 기존 Linear Attention의 근본적인 한계인 **"글로벌 컨텍스트 붕괴"를 해결** 하면서도 **추가적인 복잡한 외부 모듈 없이** 선형 복잡도를 유지한다는 점에서 실용성이 높습니다. 따라서, 제한된 컴퓨팅 자원에서 **대규모 모델의 확장성** 을 높이면서도 **높은 표현력** 을 유지해야 하는 AI 시스템 설계에 중요한 이점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.