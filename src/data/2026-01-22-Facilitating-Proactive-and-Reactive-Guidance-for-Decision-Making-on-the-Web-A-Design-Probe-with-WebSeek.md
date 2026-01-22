---
title: "[논문리뷰] Facilitating Proactive and Reactive Guidance for Decision Making on the Web: A Design Probe with WebSeek"
excerpt: "Arpit Narechania이 [arXiv]에 게시한 'Facilitating Proactive and Reactive Guidance for Decision Making on the Web: A Design Probe with WebSeek' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixed-Initiative AI
  - Human-AI Collaboration
  - Web Data Analysis
  - Proactive Guidance
  - Large Language Models (LLMs)
  - Browser Extension
  - Data-Centric Design

permalink: /ai/review/2026-01-22-Facilitating-Proactive-and-Reactive-Guidance-for-Decision-Making-on-the-Web-A-Design-Probe-with-WebSeek/

toc: true
toc_sticky: true

date: 2026-01-22 00:00:00+0900+0900
last_modified_at: 2026-01-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.15100)

**저자:** Yanwei Huang, Arpit Narechania



## 핵심 연구 목표
컴퓨터 비전 태스크에서 **CNN의 의존성을 완전히 제거** 하고, 순수한 **Transformer 아키텍처** 만으로 이미지 분류 성능을 달성하는 것을 목표로 합니다. 기존 CNN 기반 접근법의 한계를 극복하고 **self-attention 메커니즘** 이 이미지 패치 간의 관계를 효과적으로 학습할 수 있음을 증명하고자 합니다.

## 핵심 방법론
**WebSeek** 는 브라우저 확장 프로그램으로 구현되어 웹 데이터 추출, 정제, 시각화를 위한 통합 환경을 제공합니다. 이는 **Gemini-2.5-Flash LLM** 을 기반으로 하며, **혼합 주도(Mixed-initiative) AI** 접근 방식을 통해 사용자의 **명시적 행동(cue-driven)** 에 기반한 **사전 예방적(proactive) AI 가이드** 와 **반응적(reactive) AI 지원** 을 결합합니다. 시스템은 HTML 컨텍스트, 인스턴스 컨텍스트, 사용자 포커스, 대화 및 상호작용 기록 등 **다양한 컨텍스트** 를 활용하여 제안을 생성하고, 사용자의 데이터 인스턴스 직접 조작과 **신뢰할 수 있는 도구 기반 실행 아키텍처** 를 통한 AI 작업을 지원합니다.

## 주요 결과
사용자 연구 결과, 모든 참가자가 두 가지 태스크를 성공적으로 완료했으며, **System Usability Scale (SUS) 점수** 는 평균 **73.11/100** 으로 양호한 사용성을 보였습니다. 참가자들은 **인-시투 가이드** ( **M=4.93/5** )와 **AI와의 채팅** ( **M=4.53/5** ), **직접 조작** ( **M=4.40/5** )에 대해 높은 만족도를 표명했습니다. AI 가이드의 **정확성** 은 쉬운 작업에서 **97.2%** , 중간 작업에서 **98.75%** , 어려운 작업에서 **88.0%** 를 기록하여 LLM 기반 지원의 높은 신뢰성을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 웹 기반 데이터 분석에서 **데이터 중심의 혼합 주도 AI 시스템** 설계의 효과를 입증하며, **LLM** 을 활용한 **사전 예방적/반응적 가이드** 가 사용자 생산성을 높이는 데 기여할 수 있음을 보여줍니다. AI 시스템 설계 시 사용자의 **통제권과 투명성** 을 존중하는 **사용자 중심 AI 철학** 과 **도구 기반 실행 아키텍처** 를 통한 AI의 신뢰성 확보가 중요함을 시사합니다. 최종적으로, **브라우저 확장** 형태의 통합 환경과 **데이터 인스턴스의 직접 조작 가능성** 이 단절 없는 웹 데이터 분석 경험을 제공할 수 있음을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.