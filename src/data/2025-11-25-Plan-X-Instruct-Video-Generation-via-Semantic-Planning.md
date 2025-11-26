---
title: "[논문리뷰] Plan-X: Instruct Video Generation via Semantic Planning"
excerpt: "Chenxu Zhang이 [arXiv]에 게시한 'Plan-X: Instruct Video Generation via Semantic Planning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Semantic Planning
  - Multimodal LLM
  - Diffusion Transformer
  - Spatio-temporal Guidance
  - Visual Hallucination
  - Prompt Alignment
  - Instruction Following

permalink: /ai/review/2025-11-25-Plan-X-Instruct-Video-Generation-via-Semantic-Planning/

toc: true
toc_sticky: true

date: 2025-11-25 00:00:00+0900+0900
last_modified_at: 2025-11-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17986)

**저자:** Lun Huang, You Xie, Hongyi Xu, Tianpei Gu, Chenxu Zhang, Guoxian Song, Zenan Li, Xiaochen Zhao, Linjie Luo, Guillermo Sapiro



## 핵심 연구 목표
기존 비디오 확산 모델(DiT)이 복잡한 사용자 지시 및 장기 계획에서 겪는 **높은 수준의 의미론적 추론 및 계획 능력 부족** 문제를 해결하는 것이 목표입니다. 이러한 한계는 시각적 환각과 사용자 지시와의 불일치를 초래하며, Plan-X는 이를 명시적인 **의미 계획**을 통해 완화하여 **프롬프트 정렬**과 **장기적 추론 능력**을 향상시키고자 합니다.

## 핵심 방법론
Plan-X는 높은 수준의 의미 계획과 낮은 수준의 비디오 합성을 분리하는 프레임워크를 제안합니다. 핵심적으로 **Semantic Planner**라는 학습 가능한 **멀티모달 대규모 언어 모델(MLLM)** (예: **Qwen-2.5-Instruct**)을 활용하여 텍스트 프롬프트와 시각적 컨텍스트를 해석하고, **텍스트 기반의 시공간적 의미 토큰** 시퀀스를 자동 회귀적으로 생성합니다. 이 토큰은 **TA-Tok**를 통해 양자화된 **SigLIP2 임베딩**에서 파생되며, 생성된 의미 스케치는 **3D 시공간 Rotary Position Embeddings (RoPE)**와 함께 **비디오 확산 모델(DiT)** (예: **Wan 2.2-5B** 또는 **Seedance 1.0** 기반)을 지시하여 고품질의 시간적으로 일관된 비디오를 합성합니다.

## 주요 결과
Plan-X는 **Gemini 2.5**를 통한 평가에서 정량적 지표에서 상당한 개선을 보였습니다. 특히, **Accuracy**는 Seedance의 0.7114에서 **0.7971**로, **Completeness**는 0.7943에서 **0.8571**로 향상되었습니다. 시각적 환각을 크게 줄이고 프롬프트 정렬을 개선하여 **Fidelity (0.9657)** 및 **Consistency (0.9657)**에서 높은 점수를 달성했습니다. 인간 선호도 연구에서도 Plan-X-Wan은 **0.262**로 가장 높은 선호도 점수를 기록하며 기존 최강 모델을 능가했습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 다단계 행동이나 사람-객체 상호작용과 같은 시나리오에서 **비디오 생성 모델의 한계를 극복**할 수 있는 효과적인 방법을 제시합니다. **MLLM을 통한 의미 계획과 확산 모델의 시각적 합성 분리**는 각 구성 요소가 전문성을 발휘하게 하여, 향후 **지시 기반 비디오 생성** 및 **멀티모달 콘텐츠 이해** 시스템 개발에 중요한 설계 원칙을 제공합니다. 이는 실제 AI 애플리케이션에서 더 정확하고 일관된 비디오 콘텐츠를 생성하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.