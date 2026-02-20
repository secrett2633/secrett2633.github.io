---
title: "[논문리뷰] Every Token Counts: Generalizing 16M Ultra-Long Context in Large Language Models"
excerpt: "Wei Wu이 arXiv에 게시한 'Every Token Counts: Generalizing 16M Ultra-Long Context in Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Long Context
  - Sparse Attention
  - Hierarchical Sparse Attention (HSA)
  - Length Generalization
  - Mixture of Experts (MoE)
  - Transformer

permalink: /ai/review/2025-12-01-Every-Token-Counts-Generalizing-16M-Ultra-Long-Context-in-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.23319)

**저자:** Xiang Hu, Zhanchao Zhou, Ruiqi Liang, Zehuan Li, Wei Wu, Jianguo Li



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLM)이 **초장문 컨텍스트(ultra-long context)** 를 효율적으로 처리하여 "기억하는 기계"를 구축하는 과제를 해결하고자 합니다. 특히, 기존 트랜스포머의 **quadratic한 연산 복잡성** 과 **낮은 길이 일반화 능력** 의 한계를 극복하며, **희소성(sparsity), 무작위 접근 유연성(random-access flexibility), 길이 일반화(length generalization)** 라는 세 가지 핵심 속성을 만족하는 모델 개발을 목표로 합니다.

## 핵심 방법론
연구팀은 초장문 컨텍스트 모델링을 위해 **Hierarchical Sparse Attention (HSA)** 을 활용하여 세 가지 핵심 속성을 만족시켰습니다. HSA를 트랜스포머에 통합하여 **HSA-UltraLong** 아키텍처를 구축했으며, 이는 **8B-parameter MoE 모델** 로 **8조 개 이상의 토큰** 으로 사전 학습되었습니다. 훈련 과정은 **512 토큰 SWA를 사용한 웜업** , **4K SWA와 HSA top-k를 사용한 사전 학습** , **32K 컨텍스트 길이 확장 및 HSA top-k 재조정을 포함한 초장문 중간 학습** , 그리고 **어닐링(annealing)** 단계를 포함합니다.

## 주요 결과
**HSA-UltraLong** 모델은 사전 학습 시 **8K 컨텍스트 윈도우** 와 중간 학습 시 **32K** 를 사용했음에도 불구하고, **16M 토큰** 의 초장문 컨텍스트 길이에서 **S-NIAH (Needle-in-a-Haystack) 벤치마크** 에서 거의 완벽한 정확도를 달성했습니다(그림 1). 또한, 인-도메인 길이에서는 풀 어텐션(full-attention) 모델과 유사한 성능을 보였으며, **16M 컨텍스트** 에 이르는 대부분의 인-컨텍스트 검색 작업에서 **90% 이상의 정확도** 를 기록하며 성공적인 **길이 외삽(length extrapolation)** 능력을 입증했습니다.

## AI 실무자를 위한 시사점
**HSA-UltraLong** 는 **16M 토큰** 에 달하는 초장문 컨텍스트 처리가 가능한 LLM 개발의 실질적인 가능성을 제시하여, 기억 능력이 중요한 AI 에이전트 구축에 기여할 수 있습니다. **다단계 훈련 전략(웜업, 사전 학습, 중간 학습, 어닐링)** 은 길이 일반화를 달성하는 데 필수적이며, 특히 **SWA (sliding-window attention)** 와 **HSA** 간의 균형을 신중하게 조절하는 것이 중요함을 시사합니다. 하지만 짧은 시퀀스 길이에서의 효율성 및 **HSA/SWA 시소 문제** 는 여전히 최적화가 필요한 부분으로, 향후 **커널 수준 최적화** 가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.