---
title: "[논문리뷰] PokeeResearch: Effective Deep Research via Reinforcement Learning from
  AI Feedback and Robust Reasoning Scaffold"
excerpt: "이 [arXiv]에 게시한 'PokeeResearch: Effective Deep Research via Reinforcement Learning from
  AI Feedback and Robust Reasoning Scaffold' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Research Agent
  - Reinforcement Learning from AI Feedback
  - RLOO Algorithm
  - Large Language Models
  - Tool Use
  - Self-Correction
  - Reasoning Scaffold
  - Agent Alignment

permalink: /ai/review/2025-10-22-PokeeResearch-Effective-Deep-Research-via-Reinforcement-Learning-from-AI-Feedback-and-Robust-Reasoning-Scaffold/

toc: true
toc_sticky: true

date: 2025-10-22 13:07:20+0900
last_modified_at: 2025-10-22 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15862)

**저자:** Yi Wan*, Jiuqi Wang*, Liam Li, Jinsong Liu, Ruihao Zhu, Zheqing Zhu (Pokee AI)



## 핵심 연구 목표
이 논문은 기존 도구 증강 LLM 기반 에이전트의 얕은 검색 능력, 약한 정렬 메트릭, 불안정한 도구 사용의 한계를 극복하고자 합니다. 궁극적으로 사실적 정확도, 인용 신뢰성, 지시 사항 준수를 최적화하는 통합된 **강화 학습(RL)** 프레임워크를 통해 견고하고 정렬되며 확장 가능한 딥 리서치 에이전트인 **PokeeResearch-7B**를 개발하는 것을 목표로 합니다.

## 핵심 방법론
**7B-파라미터** 딥 리서치 에이전트인 **PokeeResearch-7B**는 **AI 피드백을 통한 강화 학습(RLAIF)** 프레임워크와 **REINFORCE Leave-One-Out (RLOO) 알고리즘**을 사용하여 훈련됩니다. **LLM 기반 보상 신호**는 사실적 정확도, 인용 신뢰성, 지시 준수를 포착하며, **F1 스코어**, **Exact Match (EM)**, 그리고 **AI 피드백**을 포함합니다. 또한, **chain-of-thought 기반 다중 호출 추론 스캐폴드**를 통해 도구 실패로부터의 적응형 복구와 생성된 답변에 대한 **자체 검증(self-verification)**이 가능하며, 추론 시에는 여러 독립적인 연구 스레드를 실행하고 합성하여 최종 답변을 도출합니다.

## 주요 결과
**PokeeResearch-7B**는 **10개의 인기 딥 리서치 벤치마크**에서 **7B 스케일** 딥 리서치 에이전트 중 **최첨단(state-of-the-art) 성능**을 달성했습니다. 특히 **Research Threads Synthesis (RTS)** 버전은 HLE, GAIA, BrowseComp와 같은 도전적인 벤치마크에서 기존 최고 성능 대비 상당한 개선을 보였으며, GAIA 벤치마크에서는 **DeepResearcher의 24.03%**에 비해 **PokeeResearch-RTS가 41.3%**의 정확도를 기록했습니다. 이 연구는 또한 **RLOO 알고리즘**이 PPO 계열 알고리즘보다 빠른 학습 진행과 낮은 분산을 보인다고 언급합니다.

## AI 실무자를 위한 시사점
이 연구는 **RLAIF**와 **다단계 추론 스캐폴드(self-correction, self-verification, research threads synthesis)**의 신중한 설계가 신뢰성 높고 인간 친화적인 AI 에이전트 개발에 핵심적임을 보여줍니다. 특히 **AI 피드백**을 활용하여 인간의 가치에 직접 정렬되는 보상 신호를 제공함으로써 **reward hacking**을 완화하고 복잡한 추론 작업에서 더 안정적인 학습을 유도할 수 있습니다. **7B 스케일 모델**로도 SOTA 성능을 달성하여, 모델 크기뿐만 아니라 학습 방법론과 추론 설계 최적화가 고성능 에이전트 구축에 중요함을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.