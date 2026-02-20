---
title: "[논문리뷰] When Reasoning Meets Its Laws"
excerpt: "Liu Ziyin이 arXiv에 게시한 'When Reasoning Meets Its Laws' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Reasoning Models
  - Reasoning Behaviors
  - Compute Law
  - Accuracy Law
  - Monotonicity
  - Compositionality
  - Fine-tuning
  - LORE-BENCH

permalink: /ai/review/2025-12-22-When-Reasoning-Meets-Its-Laws/

toc: true
toc_sticky: true

date: 2025-12-22 00:00:00+0900+0900
last_modified_at: 2025-12-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.17901)

**저자:** Junyu Zhang, Yifan Sun, Tianang Leng, Jingyan Shen, Liu Ziyin, Paul Pu Liang, Huan Zhang



## 핵심 연구 목표
이 논문은 **대규모 추론 모델(LRMs)** 의 비직관적이고 최적화되지 않은 추론 행동을 체계적으로 이론화하고, 바람직한 추론 패턴을 특성화하기 위한 **Laws of Reasoning (LORE)** 프레임워크를 제안합니다. 궁극적으로 모델이 문제 복잡도에 비례하여 연산량을 할당하고 정확도를 유지하도록 유도하여 최적의 사고 전략을 내재화하는 것을 목표로 합니다.

## 핵심 방법론
**LORE** 프레임워크는 추론 연산량이 질문 복잡도에 선형적으로 비례해야 한다는 **Compute Law** 와 정확도가 복잡도 증가에 따라 지수적으로 감소해야 한다는 **Accuracy Law** 를 제시합니다. 이 법칙들을 평가하기 위해 **monotonicity** 와 **compositionality** 라는 두 가지 실용적인 특성을 도입하고, 이를 측정하는 벤치마크 **LORE-BENCH** 를 개발했습니다. 특히, compute law의 compositionality를 강제하기 위한 효과적인 **감독 미세 조정(SFT-Compo)** 기법을 제안하여 모델의 추론 행동을 개선합니다.

## 주요 결과
대부분의 **LRMs** 는 합리적인 **monotonicity** 를 보였지만, **compositionality** 는 부족했습니다. 제안된 **SFT-Compo** 는 **DeepSeek-R1-1.5B** 모델에서 **LORE-COMPO** 벤치마크의 **nMAD_C** 를 **0.528에서 0.314로 (40.5% 감소)** 크게 개선하며 compositionality를 효과적으로 강화했습니다. 이는 6가지 수학 및 과학 추론 벤치마크에서 일관된 성능 향상으로 이어졌으며, 특히 **8B 모델** 의 경우 평균 **Pass@1** 이 **+5.0%** 증가하는 등 추론 능력의 시너지 효과를 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **LRMs** 의 추론 메커니즘을 이해하고 최적화하는 데 필수적인 이론적 기반과 실용적인 접근법을 제공합니다. **compute law compositionality** 를 강제하는 **SFT-Compo** 방법은 모델의 연산 효율성과 추론 성능을 동시에 향상시키는 효과적인 전략이 될 수 있습니다. AI 엔지니어는 **LORE-BENCH** 를 활용하여 모델의 추론 행동을 진단하고, 본 논문에서 제시된 미세 조정 방식을 통해 더욱 신뢰할 수 있고 효율적인 AI 추론 시스템을 설계할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.