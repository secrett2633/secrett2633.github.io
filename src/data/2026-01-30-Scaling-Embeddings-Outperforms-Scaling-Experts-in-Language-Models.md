---
title: "[논문리뷰] Scaling Embeddings Outperforms Scaling Experts in Language Models"
excerpt: "이 [arXiv]에 게시한 'Scaling Embeddings Outperforms Scaling Experts in Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embedding Scaling
  - N-gram Embedding
  - Mixture-of-Experts (MoE)
  - Large Language Models (LLMs)
  - Parameter Efficiency
  - Inference Optimization
  - Speculative Decoding

permalink: /ai/review/2026-01-30-Scaling-Embeddings-Outperforms-Scaling-Experts-in-Language-Models/

toc: true
toc_sticky: true

date: 2026-01-30 00:00:00+0900+0900
last_modified_at: 2026-01-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.21204)

**저자:** Hong Liu, Jiaqi Zhang, Chao Wang, Xing Hu, Linkun Lyu, Jiaqi Sun, Xurui Yang, Bo Wang, Fengcun Li, Yulei Qian, Lingtong Si, Yerui Sun, Rumei Li, Peng Pei, Yuchen Xie, Xunliang Cai



## 핵심 연구 목표
이 논문은 대규모 언어 모델(LLMs)에서 **Mixture-of-Experts (MoE)** 아키텍처가 겪는 효율성 한계를 극복하기 위해 **임베딩 스케일링** 을 새로운 희소성 스케일링 차원으로 탐구하는 것을 목표로 합니다. 특히, 임베딩 스케일링의 최적 효율성을 결정하는 아키텍처 요인을 체계적으로 분석하고, 이를 통해 실제 추론 속도 향상을 입증하고자 합니다.

## 핵심 방법론
연구팀은 **N-gram Embedding** 을 활용하여 임베딩 파라미터를 확장하고, **파라미터 예산 할당(<50% of total budget)** , **해시 충돌 완화(정수 배수 피하기)** , **하이퍼파라미터 최적화(N=3-5, K>2)** , 그리고 **Embedding Amplification(스케일링 팩터, LayerNorm)** 과 같은 구체적인 통합 전략을 제시했습니다. 또한, **N-gram Cache** 및 **추론 최적화를 위한 Speculative Decoding** 을 도입하여 I/O 병목 현상을 해결했습니다.

## 주요 결과
제안된 **LongCat-Flash-Lite 모델** 은 **68.5B 총 파라미터** 중 **30B 이상의 파라미터를 임베딩에 할당(46% of total)** 하여 **~3B의 활성화 파라미터** 를 가집니다. 이 모델은 **파라미터가 동일한 MoE 기준선을 능가** 하며, 특히 에이전틱 및 코딩 도메인에서 (예: **SWE-Bench에서 54.4% 정확도** 로 모든 기준선 능가) 경쟁 모델 대비 우수한 성능을 보였습니다. 임베딩 스케일링은 **더 넓은 모델** 에서 더 큰 이점을 제공하며, Embedding Amplification은 훈련 손실을 **0.02** 감소시켰습니다.

## AI 실무자를 위한 시사점
**임베딩 스케일링** 은 기존 MoE 모델의 한계를 돌파할 수 있는 강력한 대안을 제시하며, 특히 **모델 폭이 넓은(wider models)** LLM 설계 시 중요한 고려사항이 될 수 있습니다. 논문에서 제시된 **N-gram Embedding** 통합 지침(파라미터 예산, 어휘 크기 조절, 하이퍼파라미터)은 실용적인 모델 구축에 유용합니다. 또한, **N-gram Cache** 및 **Speculative Decoding** 을 통한 추론 최적화는 희소성으로부터 실제 성능 이득을 얻는 데 필수적인 요소임을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.