---
title: "[논문리뷰] Can Agent Conquer Web? Exploring the Frontiers of ChatGPT Atlas Agent in
  Web Games"
excerpt: "Justin Cui이 [arXiv]에 게시한 'Can Agent Conquer Web? Exploring the Frontiers of ChatGPT Atlas Agent in
  Web Games' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Web Agent
  - Large Language Models
  - Multimodal AI
  - Browser Automation
  - Game AI
  - ChatGPT Atlas
  - Performance Evaluation
  - Human-Computer Interaction

permalink: /ai/review/2025-10-31-Can-Agent-Conquer-Web-Exploring-the-Frontiers-of-ChatGPT-Atlas-Agent-in-Web-Games/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26298)

**저자:** Jingran Zhang, Ning Li, Justin Cui



## 핵심 연구 목표
논문은 OpenAI의 **ChatGPT Atlas 에이전트** 가 웹 환경에서 상호작용하는 능력을, 특히 웹 기반 게임을 통해 평가하는 것을 목표로 합니다. 기존 연구가 정보 검색과 같은 정적인 작업에 초점을 맞춘 반면, 본 연구는 **분석적 추론, 입력 실행, 적응 행동, 맥락 이해** 와 같은 다이나믹하고 상호작용적인 환경에서의 에이전트 성능을 심층적으로 탐구하고자 합니다.

## 핵심 방법론
연구는 **ChatGPT Atlas 브라우저** 의 "Agent Mode (Preview)"를 활용하여 **제로샷(zero-shot) 평가 프로토콜** 을 따랐습니다. **Google T-Rex Runner, Sudoku, Flappy Bird, 2048, Stein.world** 등 다양한 유형의 웹 게임을 테스트 시나리오로 선정했으며, 각 게임에서 얻은 **정량적 성능 지표** 와 에이전트의 **질적 행동 분석** 을 결합하여 Atlas의 웹 상호작용 능력을 다각도로 평가했습니다.

## 주요 결과
**Sudoku** 와 같은 논리 퍼즐 게임에서는 평균 **2분 28초** 의 완료 시간으로 인간 기준선보다 **4.5배 빠른 속도** 와 100%의 정확도를 달성하며 뛰어난 분석적 추론 능력을 보였습니다. 그러나 **T-Rex Runner** 에서는 인간 기준선 대비 **11.7%** 의 평균 점수를 기록했고, **Flappy Bird** 에서는 10회 시도 모두 **0점** 을 기록하며 실시간 타이밍과 정밀한 조작이 필요한 게임에서 심각한 한계를 드러냈습니다. **2048** 에서는 **64-타일** 수준에서 정체되어 전략적 계획 능력의 부족을 시사했습니다.

## AI 실무자를 위한 시사점
**ChatGPT Atlas** 는 규칙 기반의 분석적 추론 작업에서는 탁월한 성능을 보이지만, 정밀한 모터 제어, 실시간 적응, 내러티브 맥락 이해가 필요한 동적 웹 환경에서는 상당한 한계를 가지고 있습니다. 이는 웹 에이전트 개발 시 **작업의 동적 특성** 을 고려하여, 특히 실시간 상호작용 및 복잡한 전략이 요구되는 애플리케이션의 경우 **모터 제어 및 전략 계획 능력** 에 대한 추가적인 연구 및 개선이 필요함을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.