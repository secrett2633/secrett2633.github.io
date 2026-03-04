---
title: "[논문리뷰] Learning When to Act or Refuse: Guarding Agentic Reasoning Models for Safe Multi-Step Tool Use"
excerpt: "arXiv에 게시된 'Learning When to Act or Refuse: Guarding Agentic Reasoning Models for Safe Multi-Step Tool Use' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic LLM
  - AI Safety
  - Multi-Step Tool Use
  - Reinforcement Learning
  - Preference-Based Learning
  - Safety Guardrails
  - Refusal Mechanism
  - Structured Reasoning

permalink: /ai/review/2026-03-04-Learning-When-to-Act-or-Refuse-Guarding-Agentic-Reasoning-Models-for-Safe-Multi-Step-Tool-Use/

toc: true
toc_sticky: true

date: 2026-03-04 00:00:00+0900+0900
last_modified_at: 2026-03-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.03205)

**저자:** Aradhye Agarwal, Gurdit Siyan, Yash Pandya, Joykirat Singh, Akshay Nambi, Ahmed Awadallah



## 핵심 연구 목표
에이전트형 언어 모델(LLMs)의 **다단계 도구 사용(multi-step tool use)** 환경에서 발생하는 고유한 안전 문제를 해결하는 것이 목표입니다. 기존 채팅 모델 중심의 안전 정렬(alignment) 방식이 순차적 의사 결정 및 되돌릴 수 없는 해를 유발할 수 있는 상황에서 한계를 드러내므로, 안전 결정을 명시적이고 학습 가능하게 만들어 에이전트의 안전한 작동을 보장하고자 합니다.

## 핵심 방법론
본 논문은 **MOSAIC** 이라는 사후 학습(post-training) 프레임워크를 제안하며, 추론 과정을 **Plan → Check → Act/Refuse 루프** 로 구조화합니다. 에이전트는 계획 후 **명시적 안전 검사(`safety_thoughts`)** 를 통해 잠재적 위험을 평가하며, 이후 행동을 실행하거나 **거부 도구(`refusal_tool`)** 를 사용하여 실행을 중단할 수 있습니다. 훈련에는 **LLM 심사관** 을 통한 **쌍별 궤적 비교(pairwise trajectory comparisons)** 기반의 **선호도 기반 강화 학습(preference-based reinforcement learning)** 기법을 활용하여 스칼라 보상이 놓칠 수 있는 미묘한 시간적 안전 구분을 학습합니다.

## 주요 결과
**MOSAIC** 은 유해 행위를 **최대 50%** 감소시키고(Qwen2.5-7B on AgentHarm), 프롬프트 주입 공격에 대한 유해 태스크 거부율을 **20% 이상** 증가시켰습니다. 또한, **개인 정보 유출(privacy leakage)을 최대 23%** 줄이는 동시에, Qwen3-4B-Thinking 모델에서 양성 태스크 완료율을 **44%에서 85%로** 높이고 Phi-4 모델의 과도한 거부율을 **56% 감소** 시켜 **91%의 완료율** 을 달성하는 등 양성 태스크 성능을 유지하거나 향상시켰습니다. 안전 추론에 사용되는 토큰은 전체 토큰의 **20% 미만** 으로, Qwen3 모델에서는 전체 토큰 사용량이 **4배 이상 감소** 했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 에이전트형 LLMs의 안전을 위해 **명시적 안전 검사 및 거부 메커니즘** 을 모델의 핵심 의사 결정 루프에 통합하는 것이 중요함을 알 수 있습니다. **선호도 기반 강화 학습** 은 복잡한 안전 행동을 효과적으로 학습시키는 데 유용하며, **모델 규모보다는 구조화된 추론과 학습 신호** 가 에이전트 안전에 더 큰 영향을 미친다는 점을 시사합니다. 이를 통해 다양한 모델과 도메인에 걸쳐 일반화 가능한 **모델-적응형 안전 정렬** 전략을 구축할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.