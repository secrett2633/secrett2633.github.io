---
title: "[논문리뷰] Attention Sinks in Diffusion Language Models"
excerpt: "Simone Scardapane이 [arXiv]에 게시한 'Attention Sinks in Diffusion Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Attention Sinks
  - Transformer Architecture
  - Masked Language Modeling
  - Bidirectional Attention
  - Generative Models
  - Robustness
  - Dynamic Attention

permalink: /ai/review/2025-10-23-Attention-Sinks-in-Diffusion-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15731)

**저자:** Maximo Eduardo Rulli, Simone Petruzzi, Edoardo Michielon, Fabrizio Silvestri, Simone Scardapane, Alessio Devoto



## 핵심 연구 목표
Diffusion Language Models (DLMs)의 내부 메커니즘, 특히 다른 트랜스포머 아키텍처에서 관찰된 **"어텐션 싱크(attention sink)" 현상** 이 DLMs에서도 발생하는지 여부와 그 특성을 규명하는 것을 목표로 합니다. DLMs의 어텐션 싱크의 동적 특성을 분석하고, 싱크 제거 시 모델의 성능 견고성을 오토리그레시브 모델(ARMs)과 비교하여 평가합니다.

## 핵심 방법론
세 가지 최신 **마스크 기반 DLM 모델** 인 **Dream-7B, LLaDA-8B, MMaDA-8B** 를 대상으로 어텐션 패턴을 실증적으로 분석했습니다. 토큰이 받는 누적 어텐션 점수가 평균을 **임계값 ϵ=3** 이상 초과할 경우를 싱크로 정의하는 **어텐션 싱크 측정 지표** 를 도입했습니다. **GSM8K** 및 **HumanEval** 데이터셋에서 상위 **1, 5, 10개 어텐션 싱크** 로 향하는 어텐션 점수를 마스킹한 후 모델 성능 변화를 측정하여 **LLama-3.1-8B (ARM)** 와 비교 분석했습니다.

## 주요 결과
DLMs는 어텐션 싱크를 보이지만, ARMs와 달리 **동적인 특성** 을 보이며 디노이징 단계 전반에 걸쳐 위치가 이동합니다(예: **LLaDA-8B** 는 의미적 토큰에, **Dream-7B** 는 위치적 토큰에 형성). 또한 DLMs는 어텐션 싱크 마스킹에 **뛰어난 견고성** 을 보였습니다. 상위 **10개 싱크** 를 마스킹했을 때도 대부분의 DLM에서 성능 저하는 **1% 미만** 이었던 반면, **LLama-3.1-8B** 는 **단 하나의 싱크** 만 마스킹해도 **GSM8K에서 0.02%** , **HumanEval에서 0.00%** 의 정확도를 기록하는 등 **심각한 성능 저하** 를 보였습니다.

## AI 실무자를 위한 시사점
DLMs의 **양방향 어텐션** 과 **반복적인 디노이징 프로세스** 가 어텐션 싱크 제거에 대한 높은 **견고성** 을 제공하므로, DLM은 ARMs에 비해 **더욱 유연하고 안정적인 아키텍처** 로 활용될 수 있습니다. 동적인 어텐션 싱크의 특성은 **장거리 의존성 모델링** 및 **긴 컨텍스트 처리** 에서 DLMs가 기존 ARMs보다 효율적일 수 있음을 시사하며, 이는 **미래 AI 모델 설계** 에 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.