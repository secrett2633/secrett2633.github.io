---
title: "[논문리뷰] InMind: Evaluating LLMs in Capturing and Applying Individual Human
  Reasoning Styles"
excerpt: "Diping Song이 [arXiv]에 게시한 'InMind: Evaluating LLMs in Capturing and Applying Individual Human
  Reasoning Styles' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Evaluation
  - Human Reasoning Styles
  - Social Deduction Games
  - Theory of Mind
  - Adaptive Reasoning
  - Avalon Game
  - Cognitive Grounding

permalink: /ai/review/2025-8-25-InMind-Evaluating-LLMs-in-Capturing-and-Applying-Individual-Human-Reasoning-Styles/

toc: true
toc_sticky: true

date: 2025-08-25 13:13:07+0900
last_modified_at: 2025-08-25 13:13:07+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.16072)

**저자:** Zizhen Li, Chuanhao Li, Yibin Wang, Qi Chen, Diping Song, Yukang Feng, Jianwen Sun, Jiaxin Ai, Fanrui Zhang, Mingzhu Sun, Kaipeng Zhang



## 핵심 연구 목표
본 연구는 LLM이 인간의 개별적인 추론 스타일, 특히 사회적 맥락에서 사람들의 행동과 의도를 해석하고 적용하는 능력을 평가하는 것을 목표로 합니다. 기존 LLM 평가가 간과했던 개인화된 추론 전략의 캡처 및 동적 적응 능력에 초점을 맞추어, 인지적으로 정렬된(cognitively aligned) 인간-AI 상호작용의 발판을 마련하고자 합니다.

## 핵심 방법론
제안하는 **InMind** 프레임워크는 사회적 추론 게임인 **Avalon** 을 통해 LLM의 능력을 평가합니다. 이 프레임워크는 관찰자(Observer) 및 참여자(Participant) 모드의 구조화된 게임 플레이 데이터, **라운드별 전략 추적(strategy traces)** , 그리고 **게임 후 반성적 요약(reflective summaries)** 이라는 이중 계층 주석을 활용합니다. **플레이어 식별** , **반성 정렬** , **추적 귀인** , **역할 추론** 의 네 가지 인지 기반 평가 작업을 정의하며, 이를 통해 LLM의 정적 정렬(static alignment) 및 동적 적응(dynamic adaptation) 능력을 종합적으로 측정합니다.

## 주요 결과
**11개 최신 LLM** 에 대한 평가 결과, 대부분의 범용 LLM은 표면적인 어휘 패턴에 크게 의존하며, 깊은 전략적 의도를 추론하거나 시간에 따른 전략 변화에 적응하는 데 어려움을 보였습니다. 특히 **GPT-4o** 를 포함한 모델들의 플레이어 식별 정확도는 **Top-1에서 0.20 미만** 으로 낮았으며, 이전 라운드의 전략 정보를 활용한 동적 추론에서도 제한적인 개선(최대 **+1.4%** for **DeepSeek-R1** )을 보였습니다. 반면 **DeepSeek-R1** 과 같은 추론 강화 LLM은 스타일 민감 추론의 초기 징후를 보였으며, 전략 추적이 제공될 때 반성 정렬 정확도가 유의미하게 향상되었습니다.

## AI 실무자를 위한 시사점
본 연구는 LLM이 인간의 개별화되고 적응적인 추론 스타일을 처리하는 데 있어 현재의 한계를 명확히 보여줍니다. 특히 LLM이 추상적인 반성적 사고를 구체적인 게임 행동에 연결하거나 시간에 따라 진화하는 전략을 동적으로 통합하는 데 여전히 큰 도전 과제가 있음을 시사합니다. 하지만 **DeepSeek-R1** 의 잠재력은 향후 개인화된 인지 모델링 연구에 중요한 방향을 제시하며, **InMind-Avalon 데이터셋** 은 인간 추론 스타일을 포착하고 평가하는 데 유용한 리소스로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.