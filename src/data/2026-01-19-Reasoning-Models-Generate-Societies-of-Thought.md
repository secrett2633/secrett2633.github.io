---
title: "[논문리뷰] Reasoning Models Generate Societies of Thought"
excerpt: "James Evans이 arXiv에 게시한 'Reasoning Models Generate Societies of Thought' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reasoning Models
  - Large Language Models (LLMs)
  - Multi-Agent Systems
  - Society of Thought
  - Mechanistic Interpretability
  - Reinforcement Learning
  - Cognitive Diversity
  - Conversational AI

permalink: /ai/review/2026-01-19-Reasoning-Models-Generate-Societies-of-Thought/

toc: true
toc_sticky: true

date: 2026-01-19 00:00:00+0900+0900
last_modified_at: 2026-01-19 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.10825)

**저자:** Junsol Kim, Shiyang Lai, Nino Scherrer, Blaise Agüera y Arcas, James Evans



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)의 정교한 추론 능력 이면에 있는 메커니즘을 규명하고, 이러한 능력이 단순히 계산량 증가가 아닌, 복잡한 **다중 에이전트 상호작용** 인 "생각의 사회(society of thought)"를 내재적으로 시뮬레이션함으로써 발현된다는 가설을 제시합니다.

## 핵심 방법론
추론 모델( **DeepSeek-R1** , **QwQ-32B** )의 추론 과정을 **LLM-as-judge** 를 활용하여 대화 행동(질문-답변, 관점 전환, 갈등, 화해) 및 사회-감정적 역할( **Bales' Interaction Process Analysis** ) 측면에서 정량적으로 분석했습니다. 또한, **Sparse Autoencoders (SAE)** 와 **활성화 추가(activation addition)** 기법을 사용하여 모델의 내부 활성화 공간에서 대화형 특성( **Feature 30939** )을 조작하고 추론 정확도와 인지 전략에 미치는 영향을 측정했습니다. 마지막으로, **PPO 기반 강화 학습(RL)** 실험을 통해 대화형 구조의 역할을 검증했습니다.

## 주요 결과
**DeepSeek-R1** 과 **QwQ-32B** 모델은 비추론 모델 대비 현저히 높은 **관점 다양성** 과 **이질적 성격** 및 **전문 지식 관련 특성** 을 보였습니다. 대화형 '놀라움' 특성( **Feature 30939** )을 활성화하자 **Countdown task** 에서 정확도가 **27.1%에서 54.8%로 두 배 상승** 했으며, 이는 검증, 역추적 등 인지 전략을 촉진하는 것으로 나타났습니다. 또한, **대화형 사전 학습** 은 **Qwen-2.5-3B** 에서 **RL 초기 단계 정확도를 38%로** 높여 모놀로그 방식(28%)보다 빠른 학습 속도를 보였습니다.

## AI 실무자를 위한 시사점
LLM 추론 과정에 **다중 에이전트 대화 구조** 를 명시적으로 도입하거나, **강화 학습** 을 통해 이러한 "생각의 사회"를 자율적으로 발전시키도록 유도함으로써 모델의 추론 성능과 일반화 능력을 향상시킬 수 있음을 시사합니다. **메커니즘 해석 가능성(mechanistic interpretability)** 기술은 모델의 내부 역학을 이해하고 조작하는 데 중요한 도구가 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.