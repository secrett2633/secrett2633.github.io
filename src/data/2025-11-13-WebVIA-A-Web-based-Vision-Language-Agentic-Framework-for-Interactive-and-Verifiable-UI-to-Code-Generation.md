---
title: "[논문리뷰] WebVIA: A Web-based Vision-Language Agentic Framework for Interactive and Verifiable UI-to-Code Generation"
excerpt: "이 [arXiv]에 게시한 'WebVIA: A Web-based Vision-Language Agentic Framework for Interactive and Verifiable UI-to-Code Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - UI-to-Code
  - Vision-Language Models
  - Agentic Framework
  - Interactive UI
  - Web Automation
  - Code Generation
  - UI Verification
  - Supervised Fine-Tuning

permalink: /ai/review/2025-11-13-WebVIA-A-Web-based-Vision-Language-Agentic-Framework-for-Interactive-and-Verifiable-UI-to-Code-Generation/

toc: true
toc_sticky: true

date: 2025-11-13 00:00:00+0900+0900
last_modified_at: 2025-11-13 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.06251)

**저자:** Mingde Xu, Zhen Yang, Wenyi Hong, Lihang Pan, Xinyue Fan, Yan Wang, Xiaotao Gu, Bin Xu, Jie Tang



## 핵심 연구 목표
본 논문은 기존 **Vision-Language Models (VLMs)** 기반의 UI-to-Code 접근 방식이 정적인 HTML/CSS 코드만 생성하고 GUI 상호작용을 지원하지 못하는 한계를 극복하고자 합니다. 사용자와의 상호작용이 가능한 실행 가능한 UI 코드를 자동으로 생성하고 검증하는 **에이전트 기반 프레임워크** 를 구축하여 실제 UI 개발 워크플로우에 통합될 수 있도록 하는 것이 목표입니다.

## 핵심 방법론
제안하는 **WebVIA 프레임워크** 는 세 가지 핵심 구성요소로 이루어져 있습니다. 첫째, **탐색 에이전트(WebVIA-Agent)** 는 HTML 환경과 상호작용하여 다중 상태 UI 스크린샷과 상호작용 그래프를 수집합니다. 둘째, **UI2Code 모델(WebVIA-UI2Code)** 은 수집된 스크린샷을 활용하여 실행 가능한 대화형 HTML/CSS/JavaScript 코드를 생성합니다. 셋째, **검증 모듈** 은 생성된 GUI의 상호작용성과 기능을 평가합니다. 에이전트와 UI2Code 모델은 대규모 합성 GUI 상호작용 데이터셋을 기반으로 **감독 학습(SFT)** 을 통해 훈련됩니다.

## 주요 결과
**WebVIA-Agent** 는 **UIExplore-Bench** 에서 **Gemini-2.5-Pro** 와 같은 범용 에이전트보다 더 안정적이고 정확한 UI 탐색 성능을 보이며, 종합 점수 **89.8%** , **완전성(Completeness) 93.1%** , **정확성(Correctness) 97.7%** 를 달성했습니다. 또한, **WebVIA-UI2Code-Qwen** 및 **WebVIA-UI2Code-GLM** 모델은 **UIFlow2Code-Bench** 에서 각각 **75.9%** 와 **84.9%** 의 성능을 기록하며, 베이스라인 모델을 크게 능가하여 실행 가능하고 상호작용적인 코드를 성공적으로 생성했습니다.

## AI 실무자를 위한 시사점
**WebVIA 프레임워크** 는 AI/ML 엔지니어에게 정적 UI를 넘어 **동적이고 상호작용 가능한 웹 인터페이스** 를 자동 생성하는 새로운 가능성을 제시합니다. 특히, **에이전트 기반 접근 방식** 과 **상호작용 검증 모듈** 은 UI 개발의 효율성을 높이고 생성된 코드의 신뢰성을 확보하는 데 기여할 수 있습니다. 다만, 현재는 **Click, Enter, Select** 와 같은 제한된 액션 유형과 주로 합성 데이터에 의존한 학습은 실제 복잡한 웹 환경에 대한 일반화 능력을 높이기 위한 추가적인 연구가 필요함을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.