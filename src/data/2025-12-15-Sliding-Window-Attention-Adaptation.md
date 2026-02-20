---
title: "[논문리뷰] Sliding Window Attention Adaptation"
excerpt: "arXiv에 게시된 'Sliding Window Attention Adaptation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Sliding Window Attention
  - Model Adaptation
  - Long Context
  - Inference Optimization
  - Fine-tuning
  - Chain-of-Thought
  - Sparse Attention

permalink: /ai/review/2025-12-15-Sliding-Window-Attention-Adaptation/

toc: true
toc_sticky: true

date: 2025-12-15 00:00:00+0900+0900
last_modified_at: 2025-12-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.10411)

**저자:** Yijiong Yuª, Jiale Liub, Qingyun Wub, Huazheng Wanga, and Ji Pei



## 핵심 연구 목표
본 논문은 Transformer 기반 LLM의 **Self-Attention 메커니즘** 이 입력 길이의 제곱에 비례하여 발생하는 높은 연산 비용 문제를 해결하고자 합니다. 특히, **Full Attention (FA)** 으로 사전 훈련된 모델에 **Sliding Window Attention (SWA)** 을 단순 적용할 경우 발생하는 심각한 장문 컨텍스트 성능 저하를, 값비싼 재훈련 없이 효율적으로 완화하는 방법을 찾는 것이 핵심 연구 목표입니다.

## 핵심 방법론
저자들은 FA-사전 훈련 모델을 SWA에 효과적으로 적응시키기 위한 **Sliding Window Attention Adaptation (SWAA)** 레시피를 제안합니다. 이는 다섯 가지 핵심 방법론의 조합으로 구성됩니다: (1) **Full Attention (FA) Decode** (프리필링 단계에서만 SWA 적용 후 디코딩 시 FA 전환), (2) **Keep First k Tokens** (초기 `k`개의 "sink" 토큰에 대한 어텐션 명시적 유지), (3) **Interleaving FA/SWA layers** (FA 레이어와 SWA 레이어 혼합 사용), (4) **Chain-of-Thought (CoT)** (디코딩 중 명시적 사고 과정 강제), (5) **Fine-tuning with SWA** (장문 컨텍스트 데이터에 대한 경량 SWA 인식 **LoRA** 미세 조정). 이 방법론들은 **Flash-Attention-2** 및 **vLLM** 을 사용하여 구현되었고, **Qwen3** 및 **Llama3.1** 모델에서 평가되었습니다.

## 주요 결과
단순 SWA 적용 시 **Qwen3-4B-Thinking** 모델의 정확도가 **73.0%** 에서 **3.2%** (2k 윈도우)로 급락함을 확인했습니다. 그러나 **FA Decode + Interleaving Layers + Keep First k (k=100)** 의 조합으로 비-미세 조정 시에도 **Qwen3-4B-Thinking** 모델에서 **68.8%** 의 정확도를 달성하여 FA 성능(73.0%)에 근접한 회복을 보였습니다. 특히 **미세 조정(Fine-tuning with SWA)** 을 통해 성능 복원이 크게 향상되며, **FA Decode** 와 **Interleaving Layers** 가 주요 기여 요인으로 나타났습니다. 예를 들어, **Qwen3-4B-Thinking** 모델은 미세 조정 후 **FA Decode + Interleaving Layers** 조합으로 **73.2%** 의 정확도를 달성하여 FA SFT 기준(74.6%)과 거의 일치했습니다.

## AI 실무자를 위한 시사점
FA-사전 훈련된 LLM을 SWA에 적응시키는 것은 비용 효율적인 방법으로 장문 컨텍스트 처리 효율성을 높일 수 있는 **실용적인 전략** 입니다. 특히 **FA Decode** 와 **Interleaving Layers** 는 핵심적인 방법론이며, **미세 조정** 은 성능 복원에 결정적인 역할을 합니다. AI 실무자들은 **성능-효율성 트레이드오프** 를 고려하여 특정 애플리케이션 요구사항에 맞춰 SWAA 레시피를 **유연하게 조합** 하고 적용할 수 있습니다. 예를 들어, **Chain-of-Thought** 를 사용하는 모델은 FA Decode와 결합 시 SWA 환경에서 더 나은 추론 성능을 보일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.