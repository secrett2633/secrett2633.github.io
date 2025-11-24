---
title: "[논문리뷰] Multimodal Prompt Optimization: Why Not Leverage Multiple Modalities for
  MLLMs"
excerpt: "이 [arXiv]에 게시한 'Multimodal Prompt Optimization: Why Not Leverage Multiple Modalities for
  MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal AI
  - Prompt Optimization
  - MLLMs
  - Bayesian Optimization
  - Cross-modal Alignment
  - Prompt Engineering
  - Generative AI
  - Exploration-Exploitation

permalink: /ai/review/2025-10-13-Multimodal-Prompt-Optimization-Why-Not-Leverage-Multiple-Modalities-for-MLLMs/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.09201)

**저자:** Yumin Choi, Dongki Kim, Jinheon Baek, Sung Ju Hwang



## 핵심 연구 목표
본 논문은 기존 프롬프트 최적화 방법론이 텍스트 모달리티에만 국한되어 **Multimodal Large Language Models (MLLMs)**의 잠재력을 완전히 활용하지 못하는 한계를 해결하고자 합니다. 텍스트뿐만 아니라 비텍스트 모달리티(예: 이미지, 비디오, 분자 구조)를 포괄하는 **멀티모달 프롬프트 최적화**라는 새로운 문제를 정의하고, 이를 통해 MLLMs의 풍부한 표현 능력을 최대한 발휘하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **Multimodal Prompt Optimizer (MPO)**는 **(i) 정렬 유지 탐색 (alignment-preserving exploration)**과 **(ii) 사전 계승 베이지안 UCB (prior-inherited Bayesian-UCB) 선택**이라는 두 가지 핵심 구성 요소를 가집니다. 탐색 단계에서는 현재 프롬프트의 실패 분석에서 얻은 **단일 의미 그라디언트(single semantic gradient)**를 통해 텍스트 및 비텍스트 프롬프트를 동시에 업데이트하며, **생성, 편집, 혼합(generation, editing, mixing)** 세 가지 연산자를 사용하여 다양하게 탐색합니다. 선택 단계에서는 상위 프롬프트의 성능을 사전 정보로 활용하는 **사전 계승 베이지안 UCB**를 통해 고성능 후보 프롬프트를 효율적으로 식별합니다.

## 주요 결과
**MPO**는 이미지, 비디오, 분자 등 다양한 모달리티를 포함하는 **10개 데이터셋** 전반에서 기존 텍스트 전용 최적화 방법론들을 **일관되고 유의미하게 능가**하는 성능을 보였습니다. 특히, **PlantVillage** 이미지 분류에서 **76.4%**의 정확도를 달성하여 **SEE (69.0%)** 및 **ProTeGi (64.4%)**를 앞섰으며, **평가 예산(evaluation budget)을 42% 절감**하면서도 고성능 프롬프트를 효율적으로 식별했습니다. 교차 모달 정렬 분석 결과, MPO는 가장 높은 정렬 점수와 가장 큰 성능 향상을 달성했습니다.

## AI 실무자를 위한 시사점
이 연구는 **MLLMs의 전체 역량을 활용**하기 위한 중요한 단계로, 프롬프트 최적화의 범위를 텍스트를 넘어 멀티모달 공간으로 확장하는 실용적인 방법을 제시합니다. AI 엔지니어는 **MPO**를 활용하여 다양한 모달리티의 정보를 통합하는 **더욱 효과적인 프롬프트**를 자동으로 생성할 수 있으며, 이는 복잡한 AI 태스크의 성능 향상에 기여할 것입니다. 또한, **평가 예산 절감 효과**는 대규모 MLLM 시스템에서 프롬프트 최적화의 효율성을 높여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.