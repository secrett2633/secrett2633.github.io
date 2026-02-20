---
title: "[논문리뷰] SSA: Sparse Sparse Attention by Aligning Full and Sparse Attention Outputs in Feature Space"
excerpt: "Yulan He이 arXiv에 게시한 'SSA: Sparse Sparse Attention by Aligning Full and Sparse Attention Outputs in Feature Space' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Sparse Attention
  - Full Attention
  - Large Language Models (LLMs)
  - Context Length
  - Attention Sparsity
  - Alignment Loss
  - Long-Context Extrapolation

permalink: /ai/review/2025-11-26-SSA-Sparse-Sparse-Attention-by-Aligning-Full-and-Sparse-Attention-Outputs-in-Feature-Space/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20102)

**저자:** Zhenyi Shen, Junru Lu, Lin Gui, Jiazheng Li, Yulan He, Di Yin, Xing Sun



## 핵심 연구 목표
대규모 언어 모델(LLM)에서 **quadratic 연산 복잡성** 을 갖는 **full attention** 의 한계를 극복하기 위해, **sparse attention** 의 성능 저하 및 부족한 sparsity 문제를 해결하고자 합니다. 기존 sparse attention 훈련 모델이 오히려 full attention 모델보다 낮은 sparsity를 보이는 **"gradient update deficiency" 역설** 을 해소하고, sparse attention의 내재적 sparsity를 높여 **long-context 처리 능력** 과 성능을 동시에 향상시키는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **SSA (Sparse Sparse Attention)** 라는 통합 훈련 프레임워크를 제안합니다. 이 프레임워크는 훈련 중 **sparse attention** 과 **full attention** 스트림을 **50% 확률** 로 번갈아 가며 사용합니다. 각 레이어에서 **양방향 attention output alignment 메커니즘** 을 적용하여, full attention이 sparse attention 출력을 모방하도록 하는 **sparsity loss** 와 sparse attention이 full attention 출력에 가깝게 유지되도록 하는 **commitment loss** ( **stop-gradient** 연산자 사용)를 통해 attention 분포를 정규화합니다.

## 주요 결과
SSA는 **WikiText@8k** 에서 가장 낮은 perplexity와 **Commonsense reasoning 벤치마크** 에서 **state-of-the-art 성능** 을 달성했습니다 (full attention 추론 시 평균 **60.22%** , sparse attention 추론 시 평균 **59.87%** ). 특히, SSA는 기존 모델 대비 **가장 높은 attention sparsity** (평균 **0.706** )와 **가장 낮은 attention entropy** (평균 **7.218** )를 보였습니다. 또한, **Needle-in-a-Haystack** 에서 **8K context까지 100% 정확도** 를 기록하며, **32K** 에 이르는 긴 컨텍스트에서도 **FullAttn** 모델이 붕괴하는 것과 달리 **안정적인 성능과 우수한 long-context extrapolation 능력** 을 입증했습니다.

## AI 실무자를 위한 시사점
SSA는 **계산 효율성** 과 **성능** 을 동시에 추구하는 **long-context LLM** 개발에 중요한 방향성을 제시합니다. 특히, 모델의 내재된 attention sparsity를 높이는 것이 sparse 및 full attention 추론 모두에서 성능과 일반화 능력을 향상시킬 수 있음을 보여주어, AI 엔지니어는 **다양한 sparsity 예산** 에 따라 유연하게 모델을 최적화할 수 있습니다. 또한, **full attention** 의 **attention sink 현상** 을 완화하여 장문 이해 및 추론의 안정성을 크게 개선하는 효과를 기대할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.