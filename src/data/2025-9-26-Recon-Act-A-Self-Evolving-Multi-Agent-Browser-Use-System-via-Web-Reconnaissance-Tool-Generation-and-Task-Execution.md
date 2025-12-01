---
title: "[논문리뷰] Recon-Act: A Self-Evolving Multi-Agent Browser-Use System via Web
  Reconnaissance, Tool Generation, and Task Execution"
excerpt: "Jinjie Gu이 [arXiv]에 게시한 'Recon-Act: A Self-Evolving Multi-Agent Browser-Use System via Web
  Reconnaissance, Tool Generation, and Task Execution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent System
  - Browser Automation
  - Web Reconnaissance
  - Tool Generation
  - Task Execution
  - Self-Evolving AI
  - LLM/VLM
  - VisualWebArena

permalink: /ai/review/2025-9-26-Recon-Act-A-Self-Evolving-Multi-Agent-Browser-Use-System-via-Web-Reconnaissance-Tool-Generation-and-Task-Execution/

toc: true
toc_sticky: true

date: 2025-09-26 13:35:32+0900
last_modified_at: 2025-09-26 13:35:32+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21072)

**저자:** Kaiwen He, Zhiwei Wang, Chenyi Zhuang, Jinjie Gu



## 핵심 연구 목표
본 논문은 실세계 웹 페이지에서 **멀티턴, 장기적 궤적(long-horizon trajectories)** 을 따르는 작업 수행 시 기존 브라우저 에이전트의 **행동 시퀀싱 혼란** 과 **과도한 시행착오** 문제를 해결하는 것을 목표로 합니다. 이를 위해 웹 정찰, 도구 생성 및 작업 실행을 통해 자가 진화하는 다중 에이전트 시스템 **Recon-Act** 를 제안합니다.

## 핵심 방법론
**Recon-Act** 는 **정찰 팀(Reconnaissance Team)** 과 **액션 팀(Action Team)** 으로 구성된 자가 진화형 다중 에이전트 프레임워크입니다. 정찰 팀은 **성공 및 실패 궤적을 비교 분석** 하여 문제의 원인을 파악하고, **"일반화된 도구(generalized tools)"** 형태로 해결책을 추상화하여 도구 아카이브에 실시간으로 등록합니다. 액션 팀은 이 도구들을 활용하여 작업을 분해하고 실행하며, 이 **데이터-도구-액션-피드백** 의 **폐쇄 루프 훈련 파이프라인** 을 통해 시스템이 지속적으로 진화합니다. 현재 **Level 3** 구현 단계로 **Master, Execution Agent, Coder** 는 VLM/LLM으로 구동됩니다.

## 주요 결과
**Recon-Act** 는 도전적인 **VisualWebArena** 데이터셋에서 **36.48%** 의 전체 성공률을 달성하여 이전 최고 성능인 **33.74%** 를 **2.74% 포인트** 상회하며, **최신 기술(state-of-the-art)** 을 기록했습니다. 특히 쇼핑 도메인에서는 이전 최고 기록인 **32.30%** 보다 높은 **39.27%** 의 성공률을 달성하여 **6.97% 포인트** 향상된 성능을 보였습니다. 이는 새로운 웹사이트에 대한 적응력과 장기 과제 해결 능력을 크게 개선함을 보여줍니다.

## AI 실무자를 위한 시사점
**Recon-Act** 의 **자체 진화 및 도구 생성** 능력은 복잡하고 변화무쌍한 웹 환경에서 **Long-Horizon Task** 를 처리하는 AI 에이전트의 견고성과 적응성을 크게 향상시킬 수 있습니다. **Reconnaissance-Action** 패러다임과 **멀티 에이전트 아키텍처** 는 실제 브라우저 자동화 및 웹 상호작용 시스템 개발에 직접 적용 가능한 프레임워크를 제공하여, AI/ML 엔지니어들이 더욱 지능적인 웹 에이전트를 구축하는 데 기여할 수 있습니다. 현재는 일부 인간 개입이 필요하지만, **LLM/VLM의 추론 및 코딩 능력 강화** 를 통해 자율성을 높일 수 있는 명확한 발전 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.