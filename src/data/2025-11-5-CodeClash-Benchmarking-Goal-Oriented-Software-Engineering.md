---
title: "[논문리뷰] CodeClash: Benchmarking Goal-Oriented Software Engineering"
excerpt: "이 [arXiv]에 게시한 'CodeClash: Benchmarking Goal-Oriented Software Engineering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Software Engineering Benchmarking
  - Language Models
  - AI Agents
  - Goal-Oriented Development
  - Competitive Programming
  - Code Evolution
  - Strategic Reasoning
  - Autonomous Systems

permalink: /ai/review/2025-11-5-CodeClash-Benchmarking-Goal-Oriented-Software-Engineering/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.00839)

**저자:** John Yang*1, Kilian Lieret*2, Joyce Yang³, Carlos E. Jimenez², Ofir Press², Ludwig Schmidt¹, Diyi Yang¹



## 핵심 연구 목표
본 논문은 기존의 고립된 코딩 벤치마크가 아닌, **고수준의 목표 지향적 소프트웨어 개발(goal-oriented software engineering)** 환경에서 언어 모델(LM)의 성능을 평가하는 도전 과제를 해결하고자 합니다. 사용자 유지율 향상이나 비용 절감과 같은 실제 목표를 달성하기 위해 LM이 명시적인 지시 없이 **코드를 반복적으로 개발하고 개선**할 수 있는지 평가하는 벤치마크, **CodeClash**를 제안합니다.

## 핵심 방법론
CodeClash는 **8개의 LM 시스템(SWE-agent)**이 **6개의 코드 아레나**(**BattleSnake, Core War, Halite, Poker, RoboCode, RobotRumble**)에서 **다중 라운드 토너먼트** 형식으로 경쟁하는 벤치마크입니다. 각 라운드는 에이전트가 **mini-SWE-agent**를 사용하여 코드베이스를 수정하는 **편집 단계**와 코드베이스가 아레나에서 경쟁하는 **경쟁 단계**로 구성됩니다. LM은 이전 라운드에서 생성된 **수 기가바이트의 로그**를 피드백으로 받아 스스로 개선 전략을 수립하고, 코드베이스 내에 노트나 테스트를 작성하여 **자기 주도적으로 지식을 저장**해야 합니다.

## 주요 결과
**1680개 토너먼트(총 25,200 라운드)** 평가 결과, 모델들은 다양한 개발 스타일을 보였으나, **경쟁 피드백 해석**, **변경 사항 유효성 검사**, **코드베이스 유지보수** 등에서 공통적인 한계를 드러냈습니다. **Claude Sonnet 4.5**가 **1389 Elo점**으로 가장 높은 전체 성능을 보였지만, 특정 아레나에서는 4위(Poker)에 머물렀으며, **전문가 인간 봇**과의 대결에서는 **단 한 라운드도 승리하지 못했습니다**. 모델들은 손실 후 회복에 어려움을 겪었고, 코드베이스는 시간이 지남에 따라 **점점 더 지저분하고 중복**되는 경향을 보였으며, 많은 **임시 파일**을 생성했습니다.

## AI 실무자를 위한 시사점
CodeClash는 LM이 **자율적인 소프트웨어 개발 에이전트**로 진화하기 위해 극복해야 할 명확한 과제를 제시합니다. 현재 LM은 **전략적 추론**, **장기적인 코드베이스 관리**, **경쟁 결과에 대한 의미 있는 통찰력 도출** 등에서 근본적인 한계를 가지고 있습니다. 따라서 LM 기반 개발 시에는 **모델의 코드 변화 검증 프로세스**와 **코드베이스 구조화 지원**이 필수적입니다. 이 벤치마크는 LM의 **자기 개선 능력**과 **경쟁 환경 적응력**을 향상시키기 위한 **self-play**나 **강화 학습** 연구의 효과적인 기반이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.