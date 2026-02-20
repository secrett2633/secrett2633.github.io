---
title: "[논문리뷰] PaperDebugger: A Plugin-Based Multi-Agent System for In-Editor Academic Writing, Review, and Editing"
excerpt: "arXiv에 게시된 'PaperDebugger: A Plugin-Based Multi-Agent System for In-Editor Academic Writing, Review, and Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Agents
  - Academic Writing
  - In-editor Assistant
  - Multi-agent System
  - Overleaf Integration
  - Chrome Extension
  - Kubernetes
  - XtraMCP

permalink: /ai/review/2025-12-05-PaperDebugger-A-Plugin-Based-Multi-Agent-System-for-In-Editor-Academic-Writing-Review-and-Editing/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.02589)

**저자:** Junyi Hou, Andre Lin Huikai, Nuo Chen, Yiwei Gong, Bingsheng He



## 핵심 연구 목표
기존 LLM 기반 글쓰기 보조 도구가 편집기 외부에 존재하여 발생하는 컨텍스트 전환, 상호작용 기록 단절, 문서 상태와의 심층적 상호작용 부족 문제를 해결하는 것을 목표로 합니다. 특히 **Overleaf** 와 같은 LaTeX 편집기 내에서 LLM 기반 추론을 직접 통합하는 플러그인 기반 다중 에이전트 시스템을 구축하여 원활한 인에디터 학술 글쓰기, 검토 및 편집 경험을 제공하고자 합니다.

## 핵심 방법론
이 시스템은 **Chrome 확장 프로그램** 을 통해 Overleaf에 직접 통합되어 UI 구성요소를 삽입하고 문서 상태를 양방향으로 동기화합니다. 백엔드는 **Kubernetes 기반** 으로 배포되어 스테이트리스 LLM 에이전트들의 동시성 높은 실행과 수평 확장을 가능하게 하며, **gRPC** 를 통한 스트리밍 인터페이스를 제공합니다. **Model Context Protocol (MCP)** 의 고도화된 버전인 **XtraMCP** 아키텍처는 문헌 검색, 레퍼런스 조회, 문서 평가 등 다양한 전문 도구와 검증된 워크플로우를 통합하여 에이전트의 환각을 최소화하고 신뢰성을 높입니다.

## 주요 결과
PaperDebugger는 **112건의 Chrome 확장 프로그램 설치** 와 **78명의 등록 사용자** , **23명의 월간 활성 사용자** 를 기록하며 약 **30%의 활성 사용자 유지율** 을 보였습니다. 사용자들은 총 **158개의 프로젝트** 와 **797개의 쓰레드** 를 생성했으며, **Chrome 웹 스토어에서 4.9/5점** 의 높은 평점을 받았습니다. 가장 빈번한 작업은 **Diff 보기 (1073회)** , **제안 복사 (375회)** , **패치 삽입 (359회)** 으로 나타나, 인에디터 수정 활동과 지속적인 사용자 참여를 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 학술 글쓰기와 같은 복잡한 도메인에서 **다중 에이전트 LLM 시스템의 실용적 가치** 와 **인에디터 통합의 중요성** 을 입증했습니다. **Chrome 확장 프로그램** , **Kubernetes 오케스트레이션** , **XtraMCP** 와 같은 견고한 아키텍처 설계는 AI 개발자들이 실제 환경에 배포 가능한 확장성 있는 AI 솔루션을 구축하는 데 중요한 참고 자료가 됩니다. 또한, 전문화된 에이전트와 도구 통합을 통해 **LLM의 환각을 줄이고 컨텍스트 인식 능력을 높이는 방법** 에 대한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.