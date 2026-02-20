---
title: "[논문리뷰] Web World Models"
excerpt: "arXiv에 게시된 'Web World Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Web World Model
  - LLM
  - Neuro-symbolic AI
  - Procedural Generation
  - Hybrid Architecture
  - Deterministic Generation
  - Persistent Environments
  - TypeScript

permalink: /ai/review/2025-12-30-Web-World-Models/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.23676)

**저자:** Jichen Feng, Yifan Zhang, Chenggong Zhang, Yifu Lu, Shilong Liu, Mengdi Wang



## 핵심 연구 목표
본 논문은 고정된 컨텍스트의 웹 프레임워크와 완전히 생성형 세계 모델(World Model) 사이의 간극을 메우는 **Web World Model (WWM)** 개념을 제안합니다. 언어 에이전트가 지속적으로 활동, 기억, 학습할 수 있는 **제어 가능하면서도 무한히 확장 가능한 환경** 을 구축하는 것이 주된 목표입니다.

## 핵심 방법론
WWM은 **물리 계층(Physics Layer)** 을 일반 웹 코드(예: **TypeScript 모듈, HTTP 핸들러, 데이터베이스 스키마** )로 정의하여 논리적 일관성을 보장하고, **상상 계층(Imagination Layer)** 을 LLM이 컨텍스트, 내러티브, 고수준 의사결정을 생성하는 데 활용합니다. 주요 설계 원칙으로는 **관심사 분리** , LLM 출력을 위한 **타입화된 인터페이스 (JSON 스키마)** 사용, **결정론적 해싱** 을 통한 **객체 영속성(Object Permanence)** 을 갖춘 무한 세계 생성, 그리고 LLM 사용 불가 시 **템플릿 기반으로 전환하는 점진적 성능 저하(Graceful Degradation)** 를 포함합니다.

## 주요 결과
**Infinite Travel Atlas** , **Galaxy Travel Atlas** , **AI Spire** (카드 게임), **AI Alchemy** (세포 자동자), **Cosmic Voyager** (3D 행성 탐사), **WWMPedia** (웹 기반 백과사전), **Bookshelf** (생성형 소설) 등 다양한 WWM 애플리케이션을 구현하여 프레임워크의 다용성을 입증했습니다. 이 구현들은 웹 스택이 **확장 가능하고 제어 가능한** 동시에 **개방형 환경** 을 제공하는 견고한 기반이 될 수 있음을 보여줍니다. 구체적인 정량적 지표는 명시되지 않았으나, 시스템이 **논리적 일관성과 무한한 상태 공간** 을 성공적으로 관리함을 검증했습니다.

## AI 실무자를 위한 시사점
**Web World Model** 은 AI/ML 엔지니어들이 **논리적 일관성** 과 **무한한 창의적 확장성** 을 동시에 요구하는 AI 기반 상호작용 환경을 구축하는 데 실용적인 패러다임을 제공합니다. **TypeScript** 를 활용한 **타입 안전성** 과 **결정론적 생성** 은 **환각(hallucination)** 을 줄이고 **지속 가능한 시스템** 을 개발하는 데 핵심적인 통찰을 제공하며, **점진적 성능 저하** 는 LLM 서비스의 가용성 제약 속에서도 시스템의 견고성을 유지하는 전략을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.