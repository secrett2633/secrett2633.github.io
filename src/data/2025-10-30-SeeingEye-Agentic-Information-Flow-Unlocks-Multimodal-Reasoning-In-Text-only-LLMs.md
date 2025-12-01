---
title: "[논문리뷰] SeeingEye: Agentic Information Flow Unlocks Multimodal Reasoning In
  Text-only LLMs"
excerpt: "Jiaxuan You이 [arXiv]에 게시한 'SeeingEye: Agentic Information Flow Unlocks Multimodal Reasoning In
  Text-only LLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Text-only LLM
  - Agentic AI
  - Information Flow
  - VQA
  - Structured Intermediate Representation
  - Decoupled Architecture
  - Tool Use

permalink: /ai/review/2025-10-30-SeeingEye-Agentic-Information-Flow-Unlocks-Multimodal-Reasoning-In-Text-only-LLMs/

toc: true
toc_sticky: true

date: 2025-10-30 13:06:06+0900
last_modified_at: 2025-10-30 13:06:06+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.25092)

**저자:** Weijia Zhang, Zijia Liu, Haoru Li, Haoqi Chen, Jiaxuan You



## 핵심 연구 목표
텍스트 전용 대규모 언어 모델(LLMs)이 시각 정보를 직접 처리할 수 없는 한계를 극복하고, 멀티모달 추론 능력을 효율적이고 비용 효과적으로 활용할 수 있도록 하는 것을 목표로 합니다. 기존의 정적 캡션 방식이나 통합된 거대 VLM의 비효율성을 개선하여, 강력한 텍스트 전용 LLM의 추론 능력을 최대한 활용하고자 합니다.

## 핵심 방법론
제안된 프레임워크인 **SeeingEye** 는 **Translator Agent** (경량 VLM)와 **Reasoning Agent** (텍스트 전용 LLM)의 두 에이전트로 구성된 모듈식 시스템입니다. 이들은 **Agentic Information Flow** 를 통해 상호작용하며, **Structured Intermediate Representation (SIR)** 을 중심으로 다중 라운드 피드백 루프를 통해 시각 정보를 점진적으로 정제합니다. Translator Agent는 **OCR** , **crop** , **SmartGridCaption** 과 같은 전문 도구를 활용하여 질문에 특화된 SIR을 생성하고, Reasoning Agent는 이 SIR을 바탕으로 추론하며 필요한 경우 Translator Agent에 추가 시각 정보 요청 피드백을 제공합니다.

## 주요 결과
SeeingEye는 **MMMU** 및 **MIA-Bench** 와 같은 지식 집약적 VQA 벤치마크에서 뛰어난 성능을 보였습니다. 특히, **3B VLM Translator** 와 **8B LLM Reasoner** 조합으로 **MMMUval** 에서 **60.78% 정확도** 를 달성하여, 훨씬 큰 **32B 모놀리식 VLM** ( **51.56%** ) 및 **GPT-4o-mini** ( **55.00%** )를 능가했습니다. 또한, **OpenManus (GPT-4o-mini)** 대비 **MMMUdev** 에서 **52.67%** 대 **46.77%** 로 우위를 점하며 정보 흐름의 효율성을 입증했고, 다중 라운드 상호작용은 **MMMU-Pro (Vision)** 에서 1회 반복 시 **34.21%** 에서 3회 반복 시 **44.62%** 로 정확도를 크게 향상시켰습니다.

## AI 실무자를 위한 시사점
이 연구는 강력한 텍스트 전용 LLM을 멀티모달 작업에 활용할 수 있는 **확장 가능하고 플러그 앤 플레이 방식** 을 제시합니다. 모놀리식 VLM에만 의존하는 대신, 인지(Perception)와 추론(Reasoning)을 분리하여 **비용 효율적인 솔루션** 을 제공하며, 구조화된 정보 교환이 에이전트 기반 시스템에서 핵심적인 역할을 함을 강조합니다. AI/ML 엔지니어는 기존의 고성능 텍스트 LLM을 활용하여 복잡한 멀티모달 추론 문제를 해결할 수 있는 새로운 접근 방식을 고려할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.