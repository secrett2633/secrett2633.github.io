---
title: "[논문리뷰] Arcee Trinity Large Technical Report"
excerpt: "[arXiv]에 게시된 'Arcee Trinity Large Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture-of-Experts
  - Sparse LLM
  - Training Stability
  - Load Balancing
  - MoE
  - Transformer Architecture
  - Context Extension
  - Muon Optimizer

permalink: /ai/review/2026-02-20-Arcee-Trinity-Large-Technical-Report/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.17004)

**저자:** Varun Singh et al.



## 핵심 연구 목표
본 논문은 희소한 **Mixture-of-Experts (MoE)** 아키텍처를 기반으로 하는 대규모 언어 모델인 **Trinity Large** 를 개발하고, 효율적인 학습 및 추론 성능과 높은 안정성을 달성하는 것을 목표로 합니다. 특히, 기존 모델들의 학습 불안정성 문제를 해결하고 대규모 데이터셋에서의 효과적인 모델 확장을 위한 새로운 방법론을 제시합니다.

## 핵심 방법론
Trinity Large는 **400B 총 파라미터** 와 **토큰당 13B 활성화 파라미터** 를 가지며, **인터리빙된 로컬/글로벌 어텐션** , **게이티드 어텐션** , **깊이-스케일 샌드위치 노름** , **시그모이드 라우팅** 등의 현대적인 MoE 아키텍처를 채택했습니다. 학습 안정성을 위해 새로운 MoE 부하 분산 전략인 **Soft-clamped Momentum Expert Bias Updates (SMEBU)** 를 도입하고, **Muon 최적화기** 를 사용하여 모델을 **17조 토큰** 으로 사전 학습했습니다. 또한, **Random Sequential Document Buffer (RSDB)** 를 통해 데이터 로딩의 비효율성과 배치 불균형 문제를 개선했습니다.

## 주요 결과
Trinity Large는 **학습 중 손실 스파이크 없이 안정적으로 학습** 을 완료했으며, **GLM 4.5 Base** 대비 **4배 높은 희소성** 과 **2.5배 낮은 활성 파라미터 수** 에도 불구하고 광범위한 벤치마크에서 **경쟁력 있는 성능** 을 달성했습니다. 특히, **MK-NIAH 벤치마크** 에서 **256K 컨텍스트에서 0.994, 512K에서 0.976** 의 높은 점수를 기록하여 장문 컨텍스트 처리 능력을 입증했습니다. **RSDB** 적용을 통해 **Batch Heterogeneity가 4.23배 감소** 하고 스텝별 분산이 **2.4배 감소** 하는 등 학습 안정성에 크게 기여했습니다.

## AI 실무자를 위한 시사점
본 연구는 고도로 희소한 MoE 모델이 효율성과 안정성을 모두 갖추면서도 최첨단 성능을 달성할 수 있음을 보여주어, **대규모 LLM 개발의 실용적인 방향성** 을 제시합니다. 특히, **SMEBU** 와 **RSDB** 는 대규모 MoE 모델의 학습 안정성을 개선하는 데 필수적인 기술로, AI 엔지니어들이 실제 시스템을 구축할 때 참고할 만한 효과적인 방법론입니다. 또한, **Muon 최적화기** 와 특정 아키텍처 선택이 학습 안정성에 미치는 긍정적인 영향을 확인하여, 향후 효율적인 LLM 설계를 위한 중요한 가이드를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.