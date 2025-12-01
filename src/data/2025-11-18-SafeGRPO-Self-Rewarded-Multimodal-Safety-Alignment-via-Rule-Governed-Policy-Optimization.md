---
title: "[논문리뷰] SafeGRPO: Self-Rewarded Multimodal Safety Alignment via Rule-Governed Policy Optimization"
excerpt: "Bo Du이 [arXiv]에 게시한 'SafeGRPO: Self-Rewarded Multimodal Safety Alignment via Rule-Governed Policy Optimization' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Safety Alignment
  - Rule-Governed RL
  - Self-Rewarded Learning
  - MLLM Safety
  - Policy Optimization
  - Safety Benchmarking
  - Compositional Robustness

permalink: /ai/review/2025-11-18-SafeGRPO-Self-Rewarded-Multimodal-Safety-Alignment-via-Rule-Governed-Policy-Optimization/

toc: true
toc_sticky: true

date: 2025-11-18 00:00:00+0900+0900
last_modified_at: 2025-11-18 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.12982)

**저자:** Xuankun Rong, Wenke Huang, Tingfeng Wang, Daiguo Zhou, Bo Du, Mang Ye



## 핵심 연구 목표
본 논문은 멀티모달 대규모 언어 모델(MLLMs)이 복잡한 텍스트-이미지 상호작용에서 발생하는 **구성적 안전 위험** 과 취약한 안전 인식을 해결하고자 합니다. 기존 GRPO(Group Relative Policy Optimization)가 추론 안전성을 검증할 신호가 부족한 한계를 극복하여, 해석 가능하고 검증 가능한 추론 안전성 최적화를 목표로 합니다.

## 핵심 방법론
제안하는 **SafeGRPO** 는 **Group Relative Policy Optimization (GRPO)** 에 **규칙 기반 보상 구성(rule-governed reward construction)** 을 통합한 자가 보상 멀티모달 안전 정렬 프레임워크입니다. **SafeTag-VL-3K** 데이터셋을 구축하여 시각, 텍스트, 결합 안전 태그에 대한 명시적인 레이블을 제공하며, 이를 기반으로 모델의 추론 과정에 **구조적 정확성, 안전 태그 일관성, 행동 정렬** 을 평가하는 보상을 부여합니다. 또한, **단계별 안전 사고(step-guided safety thinking)** 메커니즘을 통해 모델이 체계적인 추론을 수행하고 모달리티 수준의 태그를 명시적으로 생성하도록 유도합니다.

## 주요 결과
**SafeGRPO** 는 다양한 멀티모달 안전 벤치마크에서 일관되게 가장 강력한 안전 성능을 달성했습니다. **Qwen3-VL-8B 모델** 에서 평균 **Jailbreak Defense Safety Score 99.02** 를 기록하여 기존 모델들을 능가했으며, 동시에 **Refusal Rate를 낮추어(20.00)** 과도한 거부 행위를 줄였습니다. 또한, **ScienceQA, IconQA** 등 일반적인 능력 벤치마크에서도 성능 저하 없이 오히려 향상된 결과를 보여주며, **Qwen3-VL-8B 모델** 의 경우 평균 점수가 **78.75** 로 향상되었습니다.

## AI 실무자를 위한 시사점
**SafeGRPO** 는 MLLM의 **추론 중심 안전 정렬** 을 위한 원칙적이고 검증 가능한 패러다임을 제공합니다. 개발된 **SafeTag-VL-3K 데이터셋** 은 멀티모달 안전 연구 및 자가 보상 평가를 위한 중요한 기반 자료로 활용될 수 있습니다. **규칙 기반 보상 구성** 과 **단계별 안전 사고** 는 모델의 안전 인식과 구성적 견고성을 높이면서도 일반적인 능력 저하를 최소화하는 효과적인 전략을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.