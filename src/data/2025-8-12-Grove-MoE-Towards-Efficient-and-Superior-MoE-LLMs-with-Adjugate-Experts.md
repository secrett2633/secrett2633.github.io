---
title: "[논문리뷰] Grove MoE: Towards Efficient and Superior MoE LLMs with Adjugate Experts"
excerpt: "Tieyuan Chen이 [arXiv]에 게시한 'Grove MoE: Towards Efficient and Superior MoE LLMs with Adjugate Experts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture of Experts
  - LLMs
  - MoE Architecture
  - Dynamic Activation
  - Adjugate Experts
  - Upcycling Strategy
  - Load Balancing

permalink: /ai/review/2025-8-12-Grove-MoE-Towards-Efficient-and-Superior-MoE-LLMs-with-Adjugate-Experts/

toc: true
toc_sticky: true

date: 2025-08-12 13:29:09+0900
last_modified_at: 2025-08-12 13:29:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.07785)

**저자:** Tieyuan Chen, Zhanchao Zhou, Xiaodong Chen, Haoxing Chen, Haoyuan Wu



## 핵심 연구 목표
본 논문은 기존 **MoE (Mixture of Experts)** LLM의 한계인 고정된 파라미터 활성화와 이로 인한 비효율적인 계산 문제를 해결하는 것을 목표로 합니다. 특히, 입력 복잡도에 관계없이 균일한 크기의 전문가를 활성화하는 방식의 비효율성을 개선하여, 모델 용량을 확장하면서도 연산 오버헤드를 관리 가능한 수준으로 유지하는 새로운 **MoE 아키텍처**를 제안합니다.

## 핵심 방법론
본 연구는 **big.LITTLE CPU 아키텍처**에서 영감을 받아, 크기가 다른 전문가들을 통합하는 **Grove MoE 아키텍처**를 제안합니다. 이 아키텍처는 전문가들을 그룹으로 나누고, 각 그룹에 **adjugate expert**를 도입하여, 여러 활성화된 전문가가 동일 그룹에 속할 경우 공유되는 adjugate expert는 한 번만 계산되도록 **동적 활성화 메커니즘**을 구현합니다. 또한, **Qwen3-30B-A3B-Base 모델**을 기반으로 **업사이클링 전략**을 통해 **GroveMoE-Base** 및 **GroveMoE-Inst** 모델을 개발했으며, **무손실 부하 균형 전략**을 적용하여 전문가 활용의 효율성을 높였습니다.

## 주요 결과
**GroveMoE** 모델은 토큰 복잡도에 따라 동적으로 **3.14–3.28B** 파라미터를 활성화하여, 유사하거나 더 큰 규모의 **SOTA 오픈소스 LLM**에 필적하는 성능을 달성했습니다 (Figure 1). 특히 **GroveMoE-Inst**는 다양한 벤치마크에서 기존 모델들을 능가하는 성능을 보였으며 (Table 4), **GroveMoE-Base**는 **Qwen3-30B-A3B-Base**보다 우수한 성능을 입증했습니다 (Figure 4). **g=64** 그룹 구성 시 약 **5%**의 계산 절감 효과를 보였으며, **g=16** 구성에서는 최대 **20%**까지 절감되었습니다.

## AI 실무자를 위한 시사점
**Grove MoE 아키텍처**는 효율적인 **LLM** 구축을 위한 새로운 패러다임을 제시하며, 제한된 연산 자원 내에서 모델 용량을 확장하려는 **AI 엔지니어**에게 유용합니다. 특히, **업사이클링 전략**의 효과를 재확인하여 기존 모델을 활용한 효율적인 성능 향상 가능성을 보여줍니다. 다만, 현재 구현에서는 이론적 이점 대비 **추론 속도 오버헤드**가 존재하므로, 최적화된 커널 개발이 실제 배포를 위한 핵심 과제로 남아 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.