---
title: "[논문리뷰] Nemotron 3 Nano: Open, Efficient Mixture-of-Experts Hybrid Mamba-Transformer Model for Agentic Reasoning"
excerpt: "arXiv에 게시된 'Nemotron 3 Nano: Open, Efficient Mixture-of-Experts Hybrid Mamba-Transformer Model for Agentic Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture-of-Experts
  - Mamba-Transformer
  - Agentic Reasoning
  - Long Context LLM
  - FP8 Quantization
  - Supervised Fine-Tuning
  - Reinforcement Learning

permalink: /ai/review/2025-12-25-Nemotron-3-Nano-Open-Efficient-Mixture-of-Experts-Hybrid-Mamba-Transformer-Model-for-Agentic-Reasoning/

toc: true
toc_sticky: true

date: 2025-12-25 00:00:00+0900+0900
last_modified_at: 2025-12-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.20848)

**저자:** NVIDIA



## 핵심 연구 목표
본 논문은 **오픈 소스** 로 제공되며, **효율적** 이면서도 **에이전트적 추론** 능력이 뛰어난 **Mixture-of-Experts (MoE) 하이브리드 Mamba-Transformer 언어 모델** 인 Nemotron 3 Nano를 개발하는 것을 목표로 합니다. 특히, 기존 모델 대비 향상된 정확도와 추론 처리량을 제공하며, **1M 토큰** 에 이르는 **긴 컨텍스트** 를 효과적으로 처리할 수 있는 능력을 입증하고자 합니다.

## 핵심 방법론
Nemotron 3 Nano는 **Mamba-2** 및 **Grouped-Query-Attention (GQA)** 을 통합한 **MoE 하이브리드 아키텍처** 를 사용하며, **128개의 전문가 중 6개** 를 포워드 패스당 활성화합니다. 모델은 **25조 개의 텍스트 토큰** 으로 **2단계의 사전 훈련** 을 거쳤고, **Warmup-Stable-Decay 학습률 스케줄** 을 적용했습니다. 후처리 훈련에는 **Supervised Fine Tuning (SFT)** , **Multi-Environment Reinforcement Learning from Verifiable Rewards (RLVR)** , 그리고 **Reinforcement Learning from Human Feedback (RLHF)** 이 활용되어 추론 예산 제어 및 도구 통합 추론 능력을 강화했습니다. 또한, **선택적 FP8 양자화** 를 통해 효율성을 극대화하면서도 핵심 레이어의 정확도를 유지했습니다.

## 주요 결과
Nemotron 3 Nano는 **GPT-OSS-20B** 및 **Qwen3-30B-A3B-Thinking-2507** 와 비교하여 **동등하거나 더 나은 정확도** 를 달성했으며, 특히 **AIME25 (with tools)** 에서 **99.17%** , **SWE-Bench** 에서 **38.76%** 를 기록했습니다. 이 모델은 전체 **31.6B 파라미터 중 3.2B만 활성화** 하여 뛰어난 효율성을 보였고, **8K 입력 / 16K 출력 시나리오** 에서 경쟁 모델 대비 최대 **3.3배 높은 추론 처리량** 을 제공합니다. 또한, **RULER-100 @ 1M** 에서 **86.34%** 의 성능으로 **최대 1M 토큰의 컨텍스트 길이** 를 지원합니다.

## AI 실무자를 위한 시사점
Nemotron 3 Nano의 **사전 훈련 및 후처리 훈련된 체크포인트** 와 훈련 레시피, 코드는 **Hugging Face** 에 공개되어 AI 개발자들이 모델을 쉽게 활용하고 확장할 수 있습니다. **MoE 아키텍처** 와 **선택적 FP8 양자화** 는 높은 정확도를 유지하면서도 **추론 처리량을 크게 향상** 시킬 수 있는 실용적인 솔루션을 제공하여, 대규모 LLM 배포의 효율성을 높입니다. **최대 1M 토큰의 긴 컨텍스트 처리** 와 강화된 **에이전트적 추론 능력** 은 복잡한 문제 해결 및 고급 AI 애플리케이션 개발에 중요한 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.