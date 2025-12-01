---
title: "[논문리뷰] LoongRL:Reinforcement Learning for Advanced Reasoning over Long Contexts"
excerpt: "이 [arXiv]에 게시한 'LoongRL:Reinforcement Learning for Advanced Reasoning over Long Contexts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Long Context Reasoning
  - Large Language Models
  - Multi-hop QA
  - Data Synthesis
  - Retrieval-Augmented Generation
  - Chain-of-Thought

permalink: /ai/review/2025-10-23-LoongRLReinforcement-Learning-for-Advanced-Reasoning-over-Long-Contexts/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.19363)

**저자:** Siyuan Wang, Gaokai Zhang, Li Lyna Zhang, Ning Shang, Fan Yang, Dongyao Chen, Mao Yang



## 핵심 연구 목표
대규모 언어 모델(LLMs)이 긴 컨텍스트에 대한 고급 추론 능력을 갖추도록 하는 것이 목표입니다. 기존 RL 방법론들이 주로 짧은 컨텍스트 추론에 초점을 맞추고 있으며, 특히 높은 난이도의 긴 컨텍스트 RL 데이터가 부족하다는 문제를 해결하고자 합니다.

## 핵심 방법론
본 연구는 데이터 중심의 RL 방법인 **LoongRL** 을 제안하며, 핵심은 **KeyChain** 이라는 데이터 합성 접근 방식입니다. **KeyChain** 은 짧은 다중 홉 QA 데이터셋을 긴 컨텍스트 문제로 변환하기 위해 **UUID 체인** 을 삽입하여 질문을 숨기고, 모델이 체인을 따라 질문을 식별하고 관련 사실을 검색하며 추론하도록 요구합니다. 또한, 보상 해킹을 완화하기 위해 **규칙 기반의 Two-way Substring Exact Match** 방식을 사용하여 답변을 검증합니다.

## 주요 결과
**LoongRL** 은 **Qwen2.5-7B-Instruct** 및 **Qwen2.5-14B-Instruct** 모델의 긴 컨텍스트 다중 홉 QA 정확도를 각각 **+23.5%** 및 **+21.1%** 향상시켰습니다. 특히 **LoongRL-14B** 는 **74.2점** 을 달성하여 **03-mini (74.5)** 및 **DeepSeek-R1 (74.9)** 과 같은 대규모 프런티어 모델과 유사한 성능을 보였습니다. 16K 토큰으로 훈련된 모델이 **128K 토큰** 길이의 작업에 효과적으로 일반화되며, **Needle-in-a-Haystack** 테스트를 모두 통과했습니다.

## AI 실무자를 위한 시사점
**KeyChain** 데이터 합성 방식은 긴 컨텍스트 추론을 위한 고난이도 RL 훈련 데이터 부족 문제를 해결하는 실용적인 방법을 제공합니다. 이 방법은 모델이 **plan-retrieve-reason-recheck** 와 같은 강력한 추론 패턴을 자율적으로 학습하게 하여 LLM의 추론 신뢰도와 설명 가능성을 높일 수 있습니다. 또한, 상대적으로 짧은 컨텍스트(16K 토큰)에서 훈련하더라도 긴 컨텍스트(최대 128K 토큰)로의 효과적인 일반화가 가능하여 계산 효율성을 크게 개선할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.