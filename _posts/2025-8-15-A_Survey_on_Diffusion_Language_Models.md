---
title: "[논문리뷰] A Survey on Diffusion Language Models"
excerpt: "Zhiqiang Shen이 [arXiv]에 게시한 'A Survey on Diffusion Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Language Models
  - Generative AI
  - Parallel Decoding
  - Text Generation
  - Multimodal AI
  - Model Compression
  - Reinforcement Learning from Human Feedback
  - Inference Optimization

permalink: /ai/review/2025-8-15-A_Survey_on_Diffusion_Language_Models/

toc: true
toc_sticky: true

date: 2025-08-15 13:09:31+0900
last_modified_at: 2025-08-15 13:09:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.10875)

**저자:** Tianyi Li, Mingda Chen, Bowei Guo, and Zhiqiang Shen



## 핵심 연구 목표
본 설문조사는 지배적인 **자기회귀(AR) 패러다임**에 대한 강력하고 유망한 대안으로 부상하고 있는 **확산 언어 모델(DLM)**의 전체 생태계를 체계적으로 포괄적으로 조명하는 것을 목표로 합니다. DLM의 **근본 원리, 기술, 한계**를 분석하고, **미래 연구 방향**을 제시하여 이 빠르게 발전하는 분야의 발전을 촉진하고자 합니다.

## 핵심 방법론
본 논문은 DLM을 **연속 공간 DLM, 이산 공간 DLM, 하이브리드 AR-확산 모델**로 분류하고 각 패러다임의 훈련 및 추론 전략을 상세히 분석합니다. **사전 훈련(pre-training)**, **지도 미세 조정(SFT)**, **강화 학습(RL) 정렬**과 같은 훈련 기법과 **병렬 디코딩(parallel decoding)**, **언마스킹/리마스킹(unmasking/remasking)**, **가이던스(guidance)**, **효율성 기술(efficiency techniques)**과 같은 추론 최적화 기법들을 다룹니다. 또한, **LLaDA-V, MMaDA, Dimple**과 같은 최신 **멀티모달 DLM** 확장 사례를 제시합니다.

## 주요 결과
DLM은 추론 시 **수 배 빠른 속도(예: Fast-dLLM은 최대 27.6배, FreeCache는 최대 34배)**를 달성하면서 **AR 모델과 유사한 성능**을 보여줍니다. 특히 **LLaDA-8B**와 같은 모델은 **LLaMA3-8B**와 동등한 성능을 보였으며, **GSM8K, GPQA, MATH**와 같은 수학 및 과학 벤치마크에서는 AR 모델을 **능가**하는 성능을 입증했습니다. 멀티모달 DLM은 **크로스모달 추론 및 생성**에서 강력한 잠재력을 보였습니다.

## AI 실무자를 위한 시사점
DLM은 **병렬 생성**을 통해 **추론 속도와 처리량**을 크게 향상시켜 AR 모델의 주요 병목 현상을 해결할 수 있는 실용적인 대안을 제시합니다. 이는 **실시간 대규모 언어 모델 배포**에 유리하며, **양방향 문맥 이해**를 통해 더 풍부한 표현과 **정교한 제어**가 가능합니다. 하지만 **훈련 효율성, 긴 시퀀스 처리, 인프라 부족** 등의 도전 과제가 남아 있어, **저비트 양자화, 모델 압축, 에이전트 통합** 등의 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.