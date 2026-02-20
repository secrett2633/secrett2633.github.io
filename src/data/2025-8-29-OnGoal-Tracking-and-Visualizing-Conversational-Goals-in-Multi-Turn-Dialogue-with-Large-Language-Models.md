---
title: "[논문리뷰] OnGoal: Tracking and Visualizing Conversational Goals in Multi-Turn
  Dialogue with Large Language Models"
excerpt: "Alex Endert이 arXiv에 게시한 'OnGoal: Tracking and Visualizing Conversational Goals in Multi-Turn
  Dialogue with Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Human-Computer Interaction (HCI)
  - Conversational AI
  - Goal Tracking
  - Visualization
  - Multi-Turn Dialogue
  - User Interface Design
  - Sensemaking

permalink: /ai/review/2025-8-29-OnGoal-Tracking-and-Visualizing-Conversational-Goals-in-Multi-Turn-Dialogue-with-Large-Language-Models/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21061)

**저자:** Adam J Coscia, Shunan Guo, Eunyee Koh, Alex Endert



## 핵심 연구 목표
다중 턴 대화에서 **대규모 언어 모델(LLM)** 과의 상호작용이 길고 복잡해짐에 따라, 사용자가 **대화 목표 진행 상황** 을 효과적으로 평가하고 검토하는 데 겪는 어려움을 해결하는 것이 핵심 연구 목표입니다. 특히, 사용자가 불완전하게 지정되거나, 충돌하거나, 잊힌 목표로 인해 반복적인 프롬프팅과 진행 상황 손실을 겪는 문제를 완화하고자 합니다.

## 핵심 방법론
OnGoal은 **LLM-assisted 목표 파이프라인** 을 도입하여 사용자의 목표를 추론하고, 병합하며, LLM 응답에 대해 평가합니다. 이 파이프라인은 **'추론(Infer)', '병합(Merge)', '평가(Evaluate)'** 의 세 단계를 거쳐 작동하며, 실시간 피드백은 **인라인 목표 글리프** 와 **설명, 예시** 로 제공됩니다. 또한, **진행 상황 패널** (Goals, Timeline, Events 탭)과 **텍스트 하이라이팅** (핵심 문구, 유사/고유 문장)을 통해 목표 정렬 문제를 시각적으로 지원합니다.

## 주요 결과
**20명의 참가자** 를 대상으로 한 사용자 연구에서 OnGoal 사용자는 목표 달성을 위해 **더 적은 시간과 노력** 을 소비하면서도, 잘못된 소통을 극복하기 위한 새로운 프롬프팅 전략을 탐색했습니다. 참가자들은 baseline 대비 **읽기 및 검토에서 더 낮은 정신적 부담과 노력** 을 보고했습니다. 목표 평가에 가장 유용했던 기능은 **목표 설명** ( **평균 4.2/5점** )이었으며, **개별 목표 보기** ( **평균 3.8/5점** )는 검토에 도움이 되었습니다.

## AI 실무자를 위한 시사점
OnGoal은 LLM 대화 인터페이스에서 **목표 추적 및 시각화** 가 사용자 참여와 LLM 응답의 **복원력을 향상** 시키는 데 결정적임을 시사합니다. AI 개발자는 **실시간 피드백 메커니즘** 과 **대화 목표에 대한 시각화 도구** 를 적극적으로 통합하여 사용자에게 **인지 부하를 줄이고** LLM의 행동을 더 잘 이해할 수 있도록 지원해야 합니다. 또한, **LLM 평가 결과에 대한 명확한 설명과 구체적인 예시** 를 제공하는 것이 사용자 신뢰를 높이고, 향후 LLM 성능 개선을 위한 사용자 피드백을 가능하게 하는 중요한 요소입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.