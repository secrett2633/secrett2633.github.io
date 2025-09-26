---
title: "[논문리뷰] Behind RoPE: How Does Causal Mask Encode Positional Information?"
excerpt: "Yeyun Gong이 [arXiv]에 게시한 'Behind RoPE: How Does Causal Mask Encode Positional Information?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Transformer Decoder
  - Causal Mask
  - Positional Encoding
  - RoPE
  - Attention Mechanism
  - Length Generalization
  - Large Language Models

permalink: /ai/review/2025-9-26-Behind_RoPE_How_Does_Causal_Mask_Encode_Positional_Information/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21042)

**저자:** Junu Kim, Xiao Liu, Zhenghao Lin, Lei Ji, Yeyun Gong, Edward Choi



## 핵심 연구 목표
본 논문은 **Transformer 디코더**에서 **Rotary Positional Embeddings (RoPE)**와 같은 명시적인 위치 인코딩 외에 **인과 마스크(causal mask)**가 어떻게 위치 정보를 인코딩하는지 그 메커니즘을 규명하는 것을 목표로 합니다. 특히, 인과 마스크가 어텐션 스코어에 미치는 영향을 이론적으로 증명하고, **RoPE**와 결합될 때 현대 **대규모 언어 모델(LLM)**에 어떤 변화를 유발하는지 실증적으로 분석합니다.

## 핵심 방법론
저자들은 먼저 파라미터, 인과 입력 의존성, 또는 피드포워드 네트워크가 없는 환경에서도 **인과 마스크**가 어텐션 스코어에 **위치 의존적 패턴**을 유도할 수 있음을 수학적으로 증명했습니다. 이후, 파라미터와 명시적 위치 인코딩이 없는 **Transformer 디코더** 시뮬레이션을 통해 이론적 설명을 검증했습니다. 또한, **Llama-3.1-8B, Phi-4, Qwen3-8B**와 같은 실제 **LLM**에서 **RoPE**와 **인과 마스크**의 상호작용이 **RoPE**의 상대적 어텐션 패턴을 비상대적인 패턴으로 왜곡시키는 현상을 **1,000개의 시퀀스**와 **1,024 길이**의 샘플을 사용하여 분석했습니다.

## 주요 결과
이론적 분석에 따르면 **인과 마스크**는 파라미터가 없어도 근접한 쿼리-키 쌍에 높은 어텐션 스코어를 부여하는 **위치 의존적 패턴**을 유도합니다. 실증적 분석에서는 **인과 마스크**와 **RoPE**의 상호작용이 **RoPE**의 상대적 어텐션 패턴을 비상대적 패턴으로 왜곡시키는 현상이 **Llama-3.1-8B, Phi-4, Qwen3-8B**를 포함한 현대 **LLM**에서 "무시할 수 없는 규모(non-negligible scale)"로 일관되게 관찰되었습니다. 이러한 비상대적 패턴은 인과 마스크가 있을 때만 발생하며, 이는 **인과 마스크**가 **RoPE**와 함께 중요한 위치 정보의 원천임을 시사합니다.

## AI 실무자를 위한 시사점
**Transformer 디코더**를 사용하는 **LLM** 개발 및 최적화에 있어, **인과 마스크**를 단순한 정보 차단 메커니즘이 아닌 **중요한 위치 정보 인코딩 원천**으로 고려해야 합니다. **RoPE**와 **인과 마스크**의 복합적인 상호작용이 모델의 어텐션 패턴에 상당한 영향을 미치므로, **모델의 성능** 및 **길이 일반화(length generalization)** 능력을 향상시키기 위해 이 두 요소의 결합된 효과를 분석하고 활용하는 전략이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.