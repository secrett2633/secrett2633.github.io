---
title: "[논문리뷰] Code4MeV2: a Research-oriented Code-completion Platform"
excerpt: "이 [arXiv]에 게시한 'Code4MeV2: a Research-oriented Code-completion Platform' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Code Completion
  - Research Platform
  - Human-AI Interaction
  - Software Engineering
  - Open Science
  - JetBrains IDE Plugin
  - Telemetry
  - AI4SE

permalink: /ai/review/2025-10-7-Code4MeV2-a-Research-oriented-Code-completion-Platform/

toc: true
toc_sticky: true

date: 2025-10-07 13:36:57+0900
last_modified_at: 2025-10-07 13:36:57+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03755)

**저자:** Roham Koohestani, Parham Bateni, Aydin Ebrahimi, Behdad Etezadi, Kiarash Karimi, Maliheh Izadi



## 핵심 연구 목표
AI 기반 코드 완성 도구의 사용자 상호작용 데이터가 독점적으로 관리되는 문제를 해결하여, 연구자들이 재현 가능한 대규모 데이터 분석을 수행할 수 있도록 **연구 지향적인 오픈 소스 코드 완성 플랫폼인 Code4Me V2** 를 개발하는 것을 목표로 합니다. 이는 상업용 도구의 **불투명성, 실험 조건 통제 불가능성, 그리고 상세한 텔레메트리 데이터 접근 불가** 라는 학술 연구의 주요 장벽을 극복하고자 합니다.

## 핵심 방법론
Code4Me V2는 **클라이언트-서버 아키텍처** 를 기반으로 설계되었으며, **JetBrains IDE 플러그인** 은 사용자 인터페이스 렌더링, 컨텍스트 및 텔레메트리 수집, 서버 요청 전달을 담당합니다. 백엔드는 **Python 애플리케이션(FastAPI)** 으로 구현되어 사용자 인증, **관계형 데이터베이스(PostgreSQL 및 SQLAlchemy)** 를 통한 데이터 저장, 그리고 **Celery 분산 태스크 큐** 를 활용한 비동기적인 AI 모델 추론 파이프라인을 처리합니다. 특히, **모듈형 데이터 수집 프레임워크** 는 연구자에게 텔레메트리 및 컨텍스트 수집에 대한 세밀한 제어 기능을 제공하며, 새로운 모듈을 쉽게 추가할 수 있도록 확장성을 강조합니다.

## 주요 결과
Code4Me V2는 코드 완성에서 **업계와 비교 가능한 성능** 을 달성했으며, 평균 지연 시간은 **200ms** 로 나타났습니다. 구체적으로, 코드 완성 요청에 대한 종단 간 지연 시간은 **186.31ms (± 139.50)** 였고, 이는 **deepseek-coder-1.3b-base** 모델을 사용했을 때 비간섭적인 사용자 경험 임계치 내에 속하는 수치입니다. 전문가 및 일반 사용자 8명을 대상으로 한 사용자 연구에서는 플랫폼의 **모듈성, 확장성, 정보성 및 유용성** 이 높이 평가되었습니다.

## AI 실무자를 위한 시사점
Code4Me V2는 AI/ML 엔지니어 및 데이터 과학자들에게 **투명하고 제어 가능하며 확장 가능한 플랫폼** 을 제공하여, AI 보조 소프트웨어 개발에서 인간-AI 상호작용에 대한 **엄격한 경험적 연구** 를 수행할 수 있게 합니다. 이 오픈 소스 도구를 통해 개발자들은 자체 데이터 수집 시스템을 구축하는 부담 없이 **새로운 실험을 설계하고, 세분화된 텔레메트리 데이터를 수집하며, 다양한 AI 모델을 평가** 할 수 있습니다. 이는 **AI4SE 분야의 오픈 사이언스** 를 촉진하고 커뮤니티 기여를 장려하는 기반 시설 역할을 할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.