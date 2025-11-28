---
title: "[논문리뷰] MIRA: Multimodal Iterative Reasoning Agent for Image Editing"
excerpt: "Jiebo Luo이 [arXiv]에 게시한 'MIRA: Multimodal Iterative Reasoning Agent for Image Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Editing
  - Multimodal AI
  - Iterative Reasoning
  - Agentic AI
  - Reinforcement Learning
  - Diffusion Models
  - Vision-Language Models
  - Instruction Following

permalink: /ai/review/2025-11-28-MIRA-Multimodal-Iterative-Reasoning-Agent-for-Image-Editing/

toc: true
toc_sticky: true

date: 2025-11-28 00:00:00+0900+0900
last_modified_at: 2025-11-28 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.21087)

**저자:** Ziyun Zeng, Hang Hua, Jiebo Luo



## 핵심 연구 목표
이 논문은 확산 기반 이미지 편집 모델이 복잡한 사용자 지침(구성 관계, 맥락적 단서, 참조 표현 등)을 정확하게 해석하지 못하여 발생하는 의미론적 드리프트 및 편집 실패 문제를 해결하는 것을 목표로 합니다. 단일 프롬프트 실행의 한계를 넘어 **반복적인 시각적 추론**을 통해 편집의 정확성과 일관성을 높이는 경량의 플러그앤플레이 멀티모달 추론 에이전트를 제안합니다.

## 핵심 방법론
MIRA는 **Qwen2.5-VL** 기반의 멀티모달 추론 에이전트로, **반복적인 인지-추론-행동(perception-reasoning-action) 루프**를 통해 편집을 수행합니다. 각 단계에서 에이전트는 현재 시각적 상태와 사용자 지침을 기반으로 **원자적 편집 명령**을 예측하고, 이를 **Flux.1-Kontext, Step1X-Edit, Qwen-Image-Edit**와 같은 외부 이미지 편집 모델이 실행합니다. 훈련은 **15만 개 규모의 MIRA-EDITING 데이터셋**을 활용한 **SFT(Supervised Fine-tuning)**와 이미지 편집 모델 및 보상 모델이 결합된 **GRPO(Group Relative Policy Optimization)** 2단계 파이프라인으로 진행됩니다.

## 주요 결과
MIRA는 오픈소스 이미지 편집 모델과 결합될 때 의미론적 일관성과 지각적 품질을 크게 향상시켰습니다. 특히 **Flux.1-Kontext + MIRA** 조합은 **GPT-SC 지표에서 4.98%p, Gemini-SC 지표에서 6.04%p**의 성능 향상을 보였으며, **GPT-Image** 및 **Nano-Banana**와 같은 독점 시스템에 필적하거나 이를 능가하는 성능을 달성했습니다. 또한, **GRPO 훈련 단계**는 **SFT 단독 훈련 대비 GPT-SC에서 9.83%p, EditScore-PQ에서 6.29%p** 추가적인 성능 개선을 이끌어냈습니다.

## AI 실무자를 위한 시사점
MIRA는 복잡한 이미지 편집 작업에서 **오픈소스 diffusion 모델**의 활용성을 극대화하는 실용적인 접근법을 제시합니다. **경량의 에이전트 프레임워크**를 통해 기존 대규모 에이전트 시스템의 높은 계산 비용 및 확장성 문제를 완화하며, **반복적인 추론과 피드백 루프**를 통해 편집 모델이 유발하는 오류를 자체적으로 감지하고 수정하는 능력을 보여줍니다. 이는 **멀티모달 AI 에이전트 설계** 및 **강화 학습 기반 최적화**를 통한 실세계 응용 분야에서의 활용 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.