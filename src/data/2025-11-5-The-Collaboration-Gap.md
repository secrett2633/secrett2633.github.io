---
title: "[논문리뷰] The Collaboration Gap"
excerpt: "arXiv에 게시된 'The Collaboration Gap' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Collaboration
  - Multi-Agent Systems
  - Large Language Models (LLMs)
  - Maze Solving
  - Heterogeneous Agents
  - Collaboration Gap
  - Relay Inference
  - Agentic AI

permalink: /ai/review/2025-11-5-The-Collaboration-Gap/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02687)

**저자:** Tim R. Davidson, Adam Fourney, Saleema Amershi, Eric Horvitz, Robert West, Ece Kamar



## 핵심 연구 목표
AI 에이전트 기반 시스템에서 독립적으로 개발된 에이전트 간의 **효과적인 협업 능력** 이 부족하다는 문제인 " **협업 격차(Collaboration Gap)** "를 파악하고 정량화하는 것을 목표로 합니다. 특히, 단일 에이전트로서 뛰어난 성능을 보이는 모델들이 협업 환경에서 성능이 크게 저하되는 현상을 이해하고, 이를 개선하기 위한 초기 전략을 모색합니다.

## 핵심 방법론
연구팀은 **협력적 미로 해결 벤치마크** 를 제안하고, 이를 통해 **32개의 주요 오픈 소스 및 클로즈드 소스 LLM** 을 평가했습니다. 미로 정보는 에이전트 간 공유되어야 하는 **부분적으로 가려진(obfuscated) 맵** 으로 분배되며, 에이전트들은 **자유 형식의 대화** 를 통해 협력하여 미로를 해결합니다. 제안된 솔루션은 **제3의 LLM 그레이더** 를 통해 **자동으로 채점** 되며, "릴레이 추론( **Relay Inference** )"이라는 새로운 협업 전략도 탐색되었습니다.

## 주요 결과
평가 결과, 단일 작업에서는 우수했던 모델들이 협업 시 성능이 크게 저하되는 **"협업 격차"** 가 드러났으며, 특히 **경량화된(distilled) 모델** 에서 더욱 두드러졌습니다. 예를 들어, **gpt-4.1-mini** 가 더 강력한 **o3** 와 페어링될 때 o3가 먼저 시작하면 가중치 결과가 **0.77 ± 0.04** 로, gpt-4.1-mini가 먼저 시작할 때의 **0.62 ± 0.06** 보다 유의미하게 높았습니다. 또한, **강력한 에이전트의 단 한 번의 초기 메시지** 만으로도 약한 모델의 협업 성능이 크게 향상될 수 있음이 밝혀졌습니다.

## AI 실무자를 위한 시사점
본 연구는 AI 에이전트 개발에 있어 **협업 능력** 을 핵심 역량으로 간주하고, 이를 위한 **명시적인 훈련 전략** 및 **협업 지향적인 평가 방법론** 이 필요함을 시사합니다. 특히, **"릴레이 추론"** 과 같이 강력한 에이전트가 초기 대화를 주도하는 간단한 상호작용 디자인만으로도 **이질적인 에이전트 팀의 성능** 을 크게 향상시킬 수 있음을 보여주며, 이는 인간-AI 및 AI-AI 협업 시스템 설계에 중요한 실용적 가이드라인을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.