---
title: "[논문리뷰] NVIDIA Nemotron Nano 2: An Accurate and Efficient Hybrid
  Mamba-Transformer Reasoning Model"
excerpt: "abercovich이 [arXiv]에 게시한 'NVIDIA Nemotron Nano 2: An Accurate and Efficient Hybrid
  Mamba-Transformer Reasoning Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Hybrid Architecture
  - Mamba-Transformer
  - Reasoning LLM
  - Model Compression
  - Knowledge Distillation
  - Long Context
  - High Throughput
  - FP8 Training
  - Instruction Following

permalink: /ai/review/2025-8-21-NVIDIA-Nemotron-Nano-2-An-Accurate-and-Efficient-Hybrid-Mamba-Transformer-Reasoning-Model/

toc: true
toc_sticky: true

date: 2025-08-21 13:15:28+0900
last_modified_at: 2025-08-21 13:15:28+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.14444)

**저자:** Akhiad Bercovich, Aditya Malte, Adi Renduchintala, Abhijit Paithankar



## 핵심 연구 목표
논문은 **Nemotron Nano 2** 라는 **하이브리드 Mamba-Transformer 언어 모델** 을 소개하며, 유사 규모 모델 대비 **추론 워크로드 처리량** 을 **최대 6배 향상** 시키면서도 **최고 수준의 정확도** 를 달성하는 것을 목표로 합니다. 특히, 추론에 필요한 긴 '사고 과정(thinking traces)' 생성 시 효율성을 극대화하고자 합니다.

## 핵심 방법론
**Nemotron-H 아키텍처** 를 기반으로, 대부분의 self-attention 레이어를 **Mamba-2 레이어** 로 대체하여 추론 속도를 개선했습니다. 초기 모델인 **Nemotron-Nano-12B-v2-Base** 는 **FP8 정밀도** 로 **20조 토큰** 에 대해 사전 훈련되었으며, **Warmup-Stable-Decay 학습률 스케줄** 을 사용했습니다. 이후 **Minitron 압축 전략** 을 통해 **9B 파라미터** 모델로 **가지치기(pruning)** 및 **지식 증류(distillation)** 를 수행하여 **NVIDIA A10G GPU** 에서 **128k 토큰** 까지의 긴 컨텍스트 추론이 가능하도록 최적화했습니다. 정렬 과정에는 **SFT, GRPO, DPO, RLHF** 등 다양한 후처리 학습 단계가 적용되었습니다.

## 주요 결과
**Nemotron Nano 2 (9B 파라미터)** 는 기존 유사 규모 모델인 **Qwen3-8B** 대비 복잡한 추론 벤치마크에서 **동등하거나 더 나은 정확도** 를 달성하면서, **1k 입력 / 8k 출력 또는 8k 입력 / 16k 출력 토큰** 과 같은 생성 중심 시나리오에서 **최대 6.3배 높은 추론 처리량** 을 기록했습니다. 특히 **AIME-2024** 에서 **85.42%** , **MATH-500** 에서 **97.75%** 의 높은 정확도를 보여 수학 및 코딩 추론 성능에서 우수함을 입증했습니다(Nemotron-Nano-v2-12B 기준).

## AI 실무자를 위한 시사점
**Nemotron Nano 2** 는 제한된 GPU 메모리 환경(예: **NVIDIA A10G** )에서도 **긴 컨텍스트 추론** 과 **높은 처리량** 을 동시에 요구하는 실제 AI 애플리케이션에 매우 유용합니다. 하이브리드 **Mamba-Transformer 아키텍처** 와 효율적인 **압축/증류 전략** 은 모델 배포 비용을 절감하면서도 성능을 유지하는 데 중요한 지침을 제공합니다. 특히 **FP8 훈련** 및 **세밀한 후처리 학습** 은 대규모 언어 모델의 실용적인 최적화 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.