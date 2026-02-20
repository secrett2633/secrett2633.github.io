---
title: "[논문리뷰] Fathom-DeepResearch: Unlocking Long Horizon Information Retrieval and
  Synthesis for SLMs"
excerpt: "arXiv에 게시된 'Fathom-DeepResearch: Unlocking Long Horizon Information Retrieval and
  Synthesis for SLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - DeepResearch Agents
  - Tool-integrated Reasoning
  - Reinforcement Learning
  - Information Retrieval
  - Information Synthesis
  - Multi-agent Self-play
  - Reward Shaping
  - LLM

permalink: /ai/review/2025-10-8-Fathom-DeepResearch-Unlocking-Long-Horizon-Information-Retrieval-and-Synthesis-for-SLMs/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.24107)

**저자:** Shreyas Singh, Pradeep Moturi, Kunal Singh



## 핵심 연구 목표
본 연구는 복잡하고 개방형의 **장기적 정보 검색 및 합성** 태스크에서 기존 오픈소스 DeepResearch 에이전트의 성능 한계를 극복하는 것을 목표로 합니다. 특히, 다단계 도구 사용에서의 **훈련 불안정성** , 비효율적인 도구 호출 행동, 그리고 고품질의 검증 가능한 데이터셋 부족이라는 문제를 해결하여, 독점 시스템과의 성능 격차를 줄이고자 합니다.

## 핵심 방법론
논문은 **Qwen3-4B** 를 기반으로 한 두 가지 전문 모델, **Fathom-Search-4B** 와 **Fathom-Synthesizer-4B** 로 구성된 에이전트 시스템 **Fathom-DeepResearch** 를 제안합니다. **Fathom-Search-4B** 는 **다중 에이전트 자가 플레이** 로 생성된 **DUETQA 데이터셋** 과, RL 훈련 안정화를 위한 **RAPO(Reward-Aware Policy Optimization)** , 그리고 탐색 및 검증 행동을 제어하는 **Steerable Step-Level Reward** 를 통해 장기 도구 사용 능력을 향상시킵니다. **Fathom-Synthesizer-4B** 는 **GPT-5** 로 생성된 **DEEPRESEARCH-SFT** 데이터셋을 활용, **Plan-then-Write 프로토콜** 에 따라 구조화된 보고서를 생성합니다.

## 주요 결과
**Fathom-DeepResearch** 는 **SimpleQA, FRAMES, WebWalker, Seal0, MuSiQue** 와 같은 DeepSearch 벤치마크 및 DeepResearch-Bench에서 오픈소스 모델 중 **최첨단 성능** 을 달성했습니다. 특히 **Fathom-Search-4B (Stage-2)** 는 SimpleQA에서 **90.0%** , FRAMES에서 **64.8%** , WebWalker에서 **50.0%** 의 정확도를 기록하며 여러 독점 모델보다 우수한 결과를 보였습니다. **RAPO** 및 **Steerable Step-Level Reward** 는 RL 훈련의 안정성과 효율성을 크게 개선하여, 20회 이상의 도구 호출을 안정적으로 수행할 수 있게 하였습니다.

## AI 실무자를 위한 시사점
**Fathom-DeepResearch** 는 장기적인 정보 검색 및 합성 능력을 요구하는 실제 AI 애플리케이션에 대한 강력하고 공개적인 대안을 제공합니다. 특히 **DUETQA 데이터셋** 은 웹 검색 의존성이 높은 복잡한 질문에 대한 에이전트 훈련에 유용하며, **RAPO** 와 **Steerable Step-Level Reward** 는 **도구 증강 LLM의 RL 훈련** 에서 안정성과 제어 가능성을 높이는 중요한 기법입니다. **Plan-then-Write 프로토콜** 을 통한 **인용 기반 보고서 생성** 은 결과의 투명성과 신뢰성을 보장하여 엔터프라이즈 AI 솔루션에 큰 가치를 더할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.