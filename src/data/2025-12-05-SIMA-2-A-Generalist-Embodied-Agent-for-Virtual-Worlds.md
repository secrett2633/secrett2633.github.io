---
title: "[논문리뷰] SIMA 2: A Generalist Embodied Agent for Virtual Worlds"
excerpt: "이 [arXiv]에 게시한 'SIMA 2: A Generalist Embodied Agent for Virtual Worlds' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied AI
  - Generalist Agent
  - Virtual Worlds
  - Foundation Models
  - Gemini
  - Self-Improvement
  - Dialogue
  - Reasoning
  - Reinforcement Learning

permalink: /ai/review/2025-12-05-SIMA-2-A-Generalist-Embodied-Agent-for-Virtual-Worlds/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04797)

**저자:** SIMA Team, Google DeepMind



## 핵심 연구 목표
SIMA 2는 다양한 3D 가상 세계에서 광범위하게 이해하고 행동하는 **제너럴리스트 임베디드 에이전트** 를 개발하는 것을 목표로 합니다. SIMA 1과 같은 기존 작업의 한계를 넘어, 고수준 목표를 추론하고, 사용자와 대화하며, 언어와 이미지로 주어지는 복잡한 지시를 처리할 수 있는 **능동적이고 목표 지향적인 상호작용** 을 구현하고자 합니다.

## 핵심 방법론
SIMA 2는 **Gemini Flash-Lite** 기반 모델로서, **인간 플레이 데이터** 와 **Gemini 사전 훈련 데이터** 를 혼합하여 **지도 미세 조정(SFT)** 되었습니다. 특히, **"브릿지 데이터"** 라는 합성 데이터를 통해 에이전트의 고수준 추론 및 대화 능력을 강화했으며, 나아가 **Gemini 기반 Task Setter** 와 **Reward Model** 을 활용한 **온라인 강화 학습(RL)** 으로 **개방형 자기 개선** 기능을 구현했습니다.

## 주요 결과
SIMA 2는 다양한 게임에서 SIMA 1 대비 성능을 **두 배로 향상** 시켜 인간 수준에 근접한 **성공률 65-66%** 를 달성했습니다. 특히, 훈련에 사용되지 않은 **ASKA** 및 **MineDojo** 환경에서 SIMA 1보다 **10% 이상 뛰어난 일반화 성능** 을 보였습니다. 또한, 미세 조정 후에도 **코딩, 수학, STEM 추론** 벤치마크에서 **최대 25.5%의 감소** 라는 modest한 수준으로 Gemini의 핵심 추론 능력을 유지했습니다.

## AI 실무자를 위한 시사점
이 연구는 **Gemini** 와 같은 파운데이션 모델을 활용하여 **임베디드 AI** 를 구축하는 유망한 경로를 제시하며, 일반적인 추론 능력을 유지하면서도 **가상 및 물리적 세계를 위한 다재다능하고 지속적으로 학습하는 에이전트** 의 가능성을 입증했습니다. **인간 플레이 데이터, 합성 데이터, 자기 생성 경험** 의 조합은 강력한 에이전트 훈련을 위한 중요한 데이터 전략을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.