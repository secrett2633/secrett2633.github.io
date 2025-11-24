---
title: "[논문리뷰] AlphaQuanter: An End-to-End Tool-Orchestrated Agentic Reinforcement
  Learning Framework for Stock Trading"
excerpt: "Jiashu Wang이 [arXiv]에 게시한 'AlphaQuanter: An End-to-End Tool-Orchestrated Agentic Reinforcement
  Learning Framework for Stock Trading' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Automated Trading
  - Reinforcement Learning
  - LLM Agents
  - Tool Orchestration
  - Financial Markets
  - Algorithmic Trading
  - Interpretable AI
  - ReAct

permalink: /ai/review/2025-10-22-AlphaQuanter-An-End-to-End-Tool-Orchestrated-Agentic-Reinforcement-Learning-Framework-for-Stock-Trading/

toc: true
toc_sticky: true

date: 2025-10-22 13:07:20+0900
last_modified_at: 2025-10-22 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.14264)

**저자:** Zheye Deng, Jiashu Wang



## 핵심 연구 목표
본 논문은 기존 대규모 언어 모델(LLM) 기반 자동화된 주식 거래 시스템의 비효율성, 신호 불일치, 전략 학습의 비일관성 등의 한계를 해결하고자 합니다. 투명하고 도구가 증강된 의사결정 워크플로우를 통해 단일 에이전트가 도구를 자율적으로 조율하고 정보를 능동적으로 획득하여, 일관성 있고 감사 가능한 추론 과정을 확립하는 **강화 학습 기반 프레임워크 AlphaQuanter**를 제안합니다.

## 핵심 방법론
**AlphaQuanter**는 **ReAct-like 에이전트** 아키텍처를 사용하여 계획, 정보 획득, 추론, 행동 단계를 반복하는 단일 에이전트 프레임워크입니다. 시장 데이터, 펀더멘털 지표, 심리 분석, 거시경제 지표 등 다양한 정보 소스에 접근하기 위한 **다수의 외부 도구**를 정의합니다. 에이전트는 **강화 학습(RL)**을 통해 장기적인 수익성을 직접적으로 최적화하며, **결과 점수(R_result)**, **형식 점수(R_format)**, **도구 점수(R_tool)**로 구성된 다면적 보상 함수를 사용하여 학습됩니다. 학습에는 **Qwen2.5-3B-Instruct** 및 **Qwen2.5-7B-Instruct** 백본 모델과 **GRPO 알고리즘**이 활용됩니다.

## 주요 결과
**AlphaQuanter**는 핵심 금융 지표에서 **최고 수준의 성능**을 달성했습니다. 특히, **AlphaQuanter-3B**와 **AlphaQuanter-7B**는 가장 강력한 기준 모델 대비 평균 **연간 수익률(ARR)에서 각각 6.54% 및 18.45%**의 절대적인 증가를 보였습니다. **AlphaQuanter-7B 모델**은 평균 **ARR 34.94%**와 **샤프 비율(SR) 0.65**를 기록하며, 다섯 개 주식 중 세 개에서 모든 기준 모델을 능가하는 일관성을 보여주었습니다. 또한, 보상 구성 요소인 **R_format과 R_tool**의 제거 시 평균 ARR이 각각 **53.2%와 43.0%** 감소하여 이들의 중요성이 입증되었습니다.

## AI 실무자를 위한 시사점
본 연구는 **강화 학습으로 훈련된 LLM 에이전트**가 주식 거래에서 강력하고 투명하며 수익성 있는 전략을 학습할 수 있음을 보여줍니다. 이는 단순히 모델 규모를 키우는 것보다 **도구 조율을 포함한 전문화된 훈련 패러다임**이 AI 기반 자동화 거래 시스템의 성능 향상에 더욱 중요함을 시사합니다. **투명하고 감사 가능한 추론 과정**은 금융과 같이 규제가 심한 도메인에서 AI 시스템에 대한 신뢰를 구축하고 인간 트레이더에게 실용적인 통찰력을 제공하는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.