---
title: "[논문리뷰] Skip to the Good Part: Representation Structure & Inference-Time Layer Skipping in Diffusion vs. Autoregressive LLMs"
excerpt: "arXiv에 게시된 'Skip to the Good Part: Representation Structure & Inference-Time Layer Skipping in Diffusion vs. Autoregressive LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion LLMs
  - Autoregressive LLMs
  - Representational Analysis
  - Layer Skipping
  - Inference Efficiency
  - Initialization Bias
  - FLOPs Reduction
  - Recency Bias

permalink: /ai/review/2026-03-10-Skip-to-the-Good-Part-Representation-Structure-Inference-Time-Layer-Skipping-in-Diffusion-vs-Autoregressive-LLMs/

toc: true
toc_sticky: true

date: 2026-03-10 00:00:00+0900+0900
last_modified_at: 2026-03-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.07475)

**저자:** Raghavv Goel, Risheek Garrepalli, Sudhanshu Agrawal, Chris Lott, Mingu Lee, Fatih Porikli



## 핵심 연구 목표
본 논문은 Autoregressive (AR) LLM과 Diffusion (dLLM)의 내부 표현 구조가 어떻게 다른지 체계적으로 분석하고, 이러한 차이를 활용하여 추론 시 **레이어 스키핑(layer skipping)** 을 통한 효율성 증대 가능성을 탐색합니다. 특히, 훈련 목표가 모델의 내부 표현 추상화 방식에 미치는 영향을 규명하고, 초기화 편향(initialization bias)의 지속성을 밝히는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 **LLaDA (네이티브 dLLM)** , **Qwen2.5 (네이티브 AR LLM)** , 그리고 **Qwen2.5로 초기화된 Dream-7B (AR-initialized dLLM)** 세 가지 모델을 대상으로 **레이어별 및 토큰별 코사인 유사도 분석** 을 수행했습니다. 이 분석을 바탕으로, 아키텍처 변경이나 KV-캐시 공유 없이 **정적(static), 태스크 불가지론적(task-agnostic) 추론 시간 레이어 스키핑 방법** 을 제안하고, **GSM8K, HumanEval** 등 다양한 벤치마크에서 성능 저하를 평가했습니다.

## 주요 결과
**네이티브 dLLM인 LLaDA** 는 **18.75%의 FLOPs 감소** (6개 레이어 스킵)에도 불구하고 **90% 이상의 성능** 을 유지하여 상당한 표현 중복성을 보였습니다. 반면, **AR 모델** 은 **2개 레이어 스킵** 시 **64.71%의 성능 유지** 에 그쳐 심각한 성능 저하를 보였습니다. 또한, **AR로 초기화된 Dream-7B** 는 확산 훈련에도 불구하고 **AR 모델과 유사한 표현 동역학** 을 유지하며 **초기화 편향** 이 지속됨을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **dLLM이 AR LLM보다 본질적으로 더 많은 표현 중복성** 을 가지며, 이를 활용하여 추론 효율성을 크게 높일 수 있음을 시사합니다. AI 엔지니어는 dLLM을 사용하여 **추론 비용을 절감** 하고, **하드웨어 및 에너지 효율성** 을 개선할 수 있습니다. 특히, 모델의 초기화가 훈련 목표보다 **내부 표현 구조에 더 강력한 영향을 미칠 수 있음** 을 인지하여 모델 선택 및 훈련 전략 수립 시 이를 고려해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.