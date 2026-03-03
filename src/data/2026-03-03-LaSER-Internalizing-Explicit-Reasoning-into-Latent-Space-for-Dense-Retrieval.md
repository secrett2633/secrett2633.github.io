---
title: "[논문리뷰] LaSER: Internalizing Explicit Reasoning into Latent Space for Dense Retrieval"
excerpt: "arXiv에 게시된 'LaSER: Internalizing Explicit Reasoning into Latent Space for Dense Retrieval' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Dense Retrieval
  - LLMs
  - Reasoning
  - Knowledge Distillation
  - Latent Space
  - Self-Distillation
  - Chain-of-Thought

permalink: /ai/review/2026-03-03-LaSER-Internalizing-Explicit-Reasoning-into-Latent-Space-for-Dense-Retrieval/

toc: true
toc_sticky: true

date: 2026-03-03 00:00:00+0900+0900
last_modified_at: 2026-03-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.01425)

**저자:** Jiajie Jin, Yanzhao Zhang, Mingxin Li, Dingkun Long, Pengjun Xie, Yutao Zhu, Zhicheng Dou



## 핵심 연구 목표
본 논문은 강력한 추론 능력을 가진 **LLM 기반 dense retriever** 가 복잡한 쿼리에 대해 높은 지연 시간 없이 추론 능력을 활용하지 못하는 문제를 해결하고자 합니다. 기존 방식의 명시적 CoT(Chain-of-Thought) 생성의 높은 지연 시간과 암시적 추론 방식의 의미론적 퇴보를 극복하고, 명시적 추론을 효율적인 잠재 공간으로 내재화하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 LLM 백본을 공유하는 새로운 **self-distillation 프레임워크인 LaSER** 를 제안합니다. 이 프레임워크는 명시적 추론 경로를 인코딩하는 **Explicit View** 와 암시적 잠재적 사고를 수행하는 **Latent View** 로 구성된 **듀얼 뷰(dual-view) 훈련 메커니즘** 을 사용합니다. 특히, **다단계 정렬(multi-grained alignment) 전략** 을 통해 최종 쿼리 표현뿐만 아니라 중간 잠재 상태(trajectory alignment)도 동기화하여 잠재 토큰이 명시적 추론의 의미론적 진행을 포착하도록 유도합니다.

## 주요 결과
LaSER는 **Bright, FollowIR, BrowseComp-Plus** 등 추론 집약적 벤치마크에서 최신 기준선보다 뛰어난 성능을 보였습니다. 특히, **Qwen3-8B 모델** 로 Bright 벤치마크에서 평균 **nDCG@10 29.3** 을 달성하여, 기존 **Rewrite-then-Retrieve 파이프라인(28.1)** 과 대규모 모델에서도 경쟁적인 성능을 보이며 지연 시간 오버헤드를 크게 줄였습니다. LaSER는 몇 개의 잠재 토큰만으로 명시적 CoT 추론의 의미론을 효과적으로 압축할 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
LaSER는 AI 실무자들에게 복잡한 추론을 요구하는 dense retrieval 시스템을 구축할 때 **효율성과 성능** 을 동시에 달성할 수 있는 실용적인 방법론을 제공합니다. 이는 **LLM의 추론 잠재력** 을 활용하면서도 **추론 과정의 지연 시간** 을 최소화할 수 있게 합니다. 특히, **다단계 증류(multi-grained distillation)** 는 LLM 기반 검색 모델의 잠재 공간에 추론 능력을 효과적으로 내재화하는 데 중요한 통찰력을 제공하며, 효율적인 AI 시스템 설계를 가능하게 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.