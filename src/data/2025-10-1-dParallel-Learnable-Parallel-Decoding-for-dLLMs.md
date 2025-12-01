---
title: "[논문리뷰] dParallel: Learnable Parallel Decoding for dLLMs"
excerpt: "이 [arXiv]에 게시한 'dParallel: Learnable Parallel Decoding for dLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Parallel Decoding
  - Inference Acceleration
  - Certainty Distillation
  - Self-Distillation
  - Masked Language Models
  - LLaDA

permalink: /ai/review/2025-10-1-dParallel-Learnable-Parallel-Decoding-for-dLLMs/

toc: true
toc_sticky: true

date: 2025-10-01 14:04:08+0900
last_modified_at: 2025-10-01 14:04:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.26488)

**저자:** Zigeng Chen, Gongfan Fang, Xinyin Ma, Ruonan Yu, Xinchao Wang



## 핵심 연구 목표
본 연구는 확산 언어 모델(dLLMs)이 가진 **병렬 디코딩 잠재력** 을 충분히 활용하지 못하는 문제, 즉 기존 dLLMs가 성능 유지를 위해 거의 토큰 길이만큼의 디코딩 스텝을 요구하는 병목 현상을 해결하는 것을 목표로 합니다. 특히 마스크된 토큰의 **순차적 확실성 수렴(sequential certainty convergence)** 이 주요 병목임을 식별하고, 이를 극복하여 추론 속도를 대폭 향상시키고자 합니다.

## 핵심 방법론
저자들은 **확실성 강제 증류(certainty-forcing distillation)** 라는 새롭고 효과적인 훈련 전략을 제안합니다. 이 방법은 사전 훈련된 dLLM이 원본 샘플링 궤적을 따르도록 **자가 증류** 하는 동시에, 마스크된 토큰에 대한 예측 엔트로피를 최소화하여 **더 빠르고 병렬적으로 높은 확실성** 을 달성하도록 유도합니다. 훈련 중에는 **Cross-Entropy (CE) loss** 를 통한 궤적 일관성 유지와 **확실성 강제 손실(certainty-forcing loss)** 을 통한 예측 분포의 엔트로피 최소화를 병행하며, **LoRA(Low-Rank Adaptation)** 기법을 사용하여 훈련 효율성을 높였습니다.

## 주요 결과
제안된 방법인 dParallel은 디코딩 스텝을 대폭 줄이면서도 성능을 유지함을 입증했습니다. **LLaDA-8B-Instruct 모델** 에 적용했을 때, GSM8K 벤치마크에서 디코딩 스텝을 **256에서 30으로** 줄여 **8.5배의 속도 향상** 을 달성했으며, MBPP 벤치마크에서는 **256에서 24 스텝으로** 줄여 **10.5배의 속도 향상** 을 보였습니다. 이는 모두 성능 저하 없이 이루어졌습니다.

## AI 실무자를 위한 시사점
dParallel은 dLLMs의 **병렬 추론 잠재력** 을 효과적으로 해제하여 **대규모 언어 모델의 추론 속도** 를 획기적으로 개선할 수 있는 실용적인 방법을 제시합니다. 특히 **낮은 훈련 비용(8개의 A5000 GPU로 10시간 이내 훈련)** 으로 높은 효율을 달성 가능하다는 점은 제한된 자원을 가진 실무자들에게 매력적입니다. 이는 실시간 응용 분야에서 dLLMs의 활용 가능성을 크게 확장하고, **few-step dLLMs** 연구의 새로운 기준점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.