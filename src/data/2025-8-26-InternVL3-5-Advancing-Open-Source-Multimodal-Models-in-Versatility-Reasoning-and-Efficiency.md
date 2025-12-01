---
title: "[논문리뷰] InternVL3.5: Advancing Open-Source Multimodal Models in Versatility,
  Reasoning, and Efficiency"
excerpt: "jinglinglin이 [arXiv]에 게시한 'InternVL3.5: Advancing Open-Source Multimodal Models in Versatility,
  Reasoning, and Efficiency' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Reinforcement Learning
  - Inference Efficiency
  - Vision-Language Models
  - Open-Source
  - Versatility
  - Reasoning

permalink: /ai/review/2025-8-26-InternVL3-5-Advancing-Open-Source-Multimodal-Models-in-Versatility-Reasoning-and-Efficiency/

toc: true
toc_sticky: true

date: 2025-08-26 13:21:57+0900
last_modified_at: 2025-08-26 13:21:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18265)

**저자:** Weiyun Wang, Zhangwei Gao, Lixin Gu, Hengjun Pu, Long Cui, Xingguang Wei, Zhaoyang Liu, Linglin Jing, et al.



## 핵심 연구 목표
본 연구는 오픈소스 멀티모달 모델인 InternVL 시리즈를 다용성, 추론 능력, 그리고 추론 효율성 측면에서 발전시키는 것을 목표로 합니다. 특히, 최첨단 상업 모델인 **GPT-5** 와의 성능 격차를 줄이고, 실제 멀티모달 LLM(MLLM) 애플리케이션의 계산 병목 현상을 해결하고자 합니다.

## 핵심 방법론
핵심 혁신은 안정적인 수렴을 위한 오프라인 RL과 정밀한 정렬을 위한 온라인 RL을 결합한 2단계 학습 프레임워크인 **Cascade Reinforcement Learning (Cascade RL)** 입니다. 효율성 최적화를 위해 시각 토큰 해상도를 동적으로 조절하는 **Visual Resolution Router (ViR)** 를 제안하며, 이를 보완하는 **Decoupled Vision-Language Deployment (DvD)** 전략은 비전 인코더와 언어 모델을 분리된 GPU에 배포하여 계산 부하를 균형 있게 조절하고 추론 속도를 향상시킵니다. 모델은 "ViT-MLP-LLM" 패러다임을 따르며, 언어 모델은 **Qwen3** 및 **GPT-OSS** 시리즈, 비전 인코더는 **InternViT-300M/6B** 를 사용합니다.

## 주요 결과
InternVL3.5는 전작인 InternVL3 대비 전체 추론 성능에서 최대 **+16.0%** 향상을 달성했으며, 추론 속도는 **4.05배** 빨라졌습니다. 가장 큰 모델인 **InternVL3.5-241B-A28B** 는 오픈소스 MLLM 중 일반 멀티모달, 추론, 텍스트 및 에이전트 작업 전반에서 최첨단 결과를 달성하여 **GPT-5** 와의 성능 격차를 **3.9%** 로 좁혔습니다. 특히 **MMMU** 벤치마크에서 **InternVL3.5-8B** 는 **73.4** , **InternVL3.5-241B-A28B** 는 **77.7** 점을 기록했습니다. 또한, **InternVL3.5-Flash** 는 시각 토큰 수를 **50%** 줄이면서도 원래 성능을 거의 **100%** 유지했습니다.

## AI 실무자를 위한 시사점
**Cascade RL** 은 대규모 MLLM의 추론 능력을 안정적이고 효율적으로 개선하는 실용적인 방법론을 제공하여 AI 엔지니어들이 더욱 강력한 모델을 개발할 수 있도록 돕습니다. **ViR** 과 **DvD** 는 MLLM 추론 비용을 획기적으로 줄여, 제한된 리소스 환경에서도 고성능 멀티모달 모델을 효율적으로 배포할 수 있는 실질적인 해법을 제시합니다. 공개된 모델과 코드는 오픈소스 MLLM 연구 및 실제 응용 분야, 특히 **GUI 상호작용** 및 **Embodied Agency** 와 같은 새로운 기능 개발에 중요한 발판이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.