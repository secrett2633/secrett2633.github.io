---
title: "[논문리뷰] Thinking with Images via Self-Calling Agent"
excerpt: "Qixiang Ye이 [arXiv]에 게시한 'Thinking with Images via Self-Calling Agent' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLMs
  - Self-Calling Chain-of-Thought
  - Reinforcement Learning
  - Visual Reasoning
  - Agentic AI
  - Tool Calling
  - Group Relative Policy Optimization

permalink: /ai/review/2025-12-12-Thinking-with-Images-via-Self-Calling-Agent/

toc: true
toc_sticky: true

date: 2025-12-12 00:00:00+0900+0900
last_modified_at: 2025-12-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.08511)

**저자:** Wenxi Yang, Yuzhong Zhao, Fang Wan, Qixiang Ye



## 핵심 연구 목표
본 논문은 희소한 고품질 추론 데이터로 인해 **강화 학습을 통한 MLLM의 Interleaved Multimodal Chain-of-Thought (iMCoT)** 최적화가 어렵다는 문제점을 해결하고자 합니다. 복잡한 iMCoT를 언어 전용 CoT로 재구성하는 새로운 시각 추론 패러다임인 **Self-Calling Chain-of-Thought (sCoT)** 를 제안하여, 훈련 효율성과 확장성을 개선하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **sCoT** 는 메인 에이전트가 복잡한 시각 추론 태스크를 원자적 서브태스크로 분해하고, **매개변수를 공유하는 서브에이전트** (메인 에이전트의 가상 복제본)를 호출하여 각 서브태스크를 독립적인 언어 전용 컨텍스트에서 해결합니다. 이 자기 호출 메커니즘은 `task type`, `prompt`, `bounding box` 인자를 포함하는 **구조화된 도구 호출(structured tool calls)** 을 통해 구현되며, **Group-Relative Policy Optimization (GRPO)** 을 사용하여 보상(정확도, 형식, 도구 사용)을 기반으로 엔드투엔드 강화 학습을 수행합니다.

## 주요 결과
**Qwen2.5-VL-7B-Instruct** 로 훈련된 **sCoT** 는 기존 **DeepEyes의 iMCoT 접근 방식** 보다 뛰어난 시각 추론 성능을 보였습니다. 특히, V* 벤치마크에서 **1.2%** , HR-Bench 4K에서 **1.9%** 향상된 성능을 달성했으며, DeepEyes 대비 **약 75% 적은 GPU 시간** 으로 더 나은 결과를 얻어 상당한 훈련 효율성을 입증했습니다. 엄격한 도구 호출 프로토콜 제약과 미세 조정된 훈련 데이터(Fine, Chart 데이터)가 안정적인 학습에 필수적임이 밝혀졌습니다.

## AI 실무자를 위한 시사점
**sCoT** 는 복잡한 iMCoT 방식과 비교하여 언어 전용 추론으로 강화 학습 목표를 단순화함으로써, **고해상도 멀티모달 추론을 위한 더욱 자원 효율적이고 확장 가능한 솔루션** 을 제공합니다. AI 실무자들은 이 **자기 호출 에이전트 프레임워크** 를 활용하여 더 적은 컴퓨팅 자원과 데이터 종속성으로 강력한 시각 추론 시스템을 구축할 수 있습니다. 또한, **구조화된 도구 호출 프로토콜** 과 **정밀하게 선별된 훈련 데이터** (특히 세부적인 시각 판별 데이터)가 에이전트의 효과적인 학습과 일반화에 매우 중요하다는 점이 강조됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.