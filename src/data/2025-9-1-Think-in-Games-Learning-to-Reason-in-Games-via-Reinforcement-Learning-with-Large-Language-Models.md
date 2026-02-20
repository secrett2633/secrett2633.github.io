---
title: "[논문리뷰] Think in Games: Learning to Reason in Games via Reinforcement Learning
  with Large Language Models"
excerpt: "Yifan Lu이 arXiv에 게시한 'Think in Games: Learning to Reason in Games via Reinforcement Learning
  with Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Reinforcement Learning
  - Game AI
  - Procedural Knowledge
  - Declarative Knowledge
  - Explainable AI
  - Strategic Decision-Making

permalink: /ai/review/2025-9-1-Think-in-Games-Learning-to-Reason-in-Games-via-Reinforcement-Learning-with-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-09-01 13:14:34+0900
last_modified_at: 2025-09-01 13:14:34+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21365)

**저자:** Yi Liao, Yu Gu, Yuan Sui, Zining Zhu, Yifan Lu, Guohua Tang, Zhongqian Sun, Wei Yang



## 핵심 연구 목표
대규모 언어 모델(LLM)이 복잡한 추론 작업에는 능숙하지만, 인간 아이들이 쉽게 수행하는 간단한 상호작용 작업에서는 어려움을 겪는 문제를 해결하고자 합니다. 이는 선언적 지식(무엇을 아는지)과 절차적 지식(어떻게 하는지) 사이의 격차를 보여주며, 본 연구는 LLM이 게임 환경과 직접 상호작용하며 절차적 이해를 개발하는 것을 목표로 합니다.

## 핵심 방법론
본 연구는 **Think-In Games (TiG)** 라는 새로운 프레임워크를 제안합니다. 이는 강화 학습(RL) 기반 의사결정을 **언어 모델링 작업** 으로 재구성합니다. LLM이 **언어 기반 정책** 을 생성하고, 환경 피드백을 기반으로 한 **온라인 강화 학습** 을 통해 이를 반복적으로 개선합니다. 특히, **King of Glory (王者荣耀)** 게임 플레이 데이터에서 추출된 **JSON 형식의 게임 상태** 와 **매크로 수준의 40가지 정의된 액션** 을 사용하며, **SFT(Supervised Fine-Tuning)** 와 **GRPO(Group Relative Policy Optimization)** 를 결합한 다단계 훈련 전략을 채택하고 **규칙 기반 이진 보상 함수** 를 활용합니다.

## 주요 결과
TiG 프레임워크는 선언적 지식과 절차적 지식 사이의 격차를 성공적으로 해소하며, 기존 RL 방식에 비해 **데이터 및 연산 요구량을 현저히 낮추면서** 경쟁력 있는 성능을 달성했습니다. 예를 들어, **Qwen-3-14B 모델** 은 SFT와 확장된 GRPO 훈련(2000 스텝) 후 **90.91%의 정확도** 를 기록하여, 파라미터 수가 훨씬 큰 **Deepseek-R1 (86.67%)** 을 능가했습니다. 또한, TiG는 의사결정에 대한 단계별 자연어 설명을 제공하여 복잡한 상호작용 작업의 투명성과 해석 가능성을 크게 향상시킵니다.

## AI 실무자를 위한 시사점
본 연구는 LLM이 정적인 지식에서 동적인 절차적 지식으로 전환하는 효과적인 메커니즘을 제공하여, AI 에이전트가 복잡한 대화형 환경에서 더욱 능동적으로 학습하고 추론하도록 돕습니다. 데이터 효율성과 모델의 설명 가능성을 높여, AI/ML 엔지니어들이 리소스 제약이 있는 복잡한 게임 환경이나 유사한 실제 시뮬레이션에서 LLM 기반의 지능형 에이전트를 개발하고 배포하는 데 실질적인 시사점을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.