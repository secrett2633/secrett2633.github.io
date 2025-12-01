---
title: "[논문리뷰] Paper2Agent: Reimagining Research Papers As Interactive and Reliable AI
  Agents"
excerpt: "James Zou이 [arXiv]에 게시한 'Paper2Agent: Reimagining Research Papers As Interactive and Reliable AI
  Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - AI Agents
  - Research Reproducibility
  - Scientific Communication
  - Model Context Protocol (MCP)
  - Natural Language Interaction
  - Genomics
  - Single-Cell Analysis
  - Spatial Transcriptomics

permalink: /ai/review/2025-9-9-Paper2Agent-Reimagining-Research-Papers-As-Interactive-and-Reliable-AI-Agents/

toc: true
toc_sticky: true

date: 2025-09-09 13:19:09+0900
last_modified_at: 2025-09-09 13:19:09+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06917)

**저자:** Jiacheng Miao, Joe R. Davis, Jonathan K. Pritchard, James Zou



## 핵심 연구 목표
본 논문은 정적인 연구 논문이 가진 기술적 장벽으로 인해 코드 및 방법론의 활용과 확산이 어려운 문제를 해결하고자 합니다. 연구는 논문을 **상호작용적이고 신뢰할 수 있는 AI 에이전트** 로 변환하여 연구 결과의 다운스트림 활용, 채택, 그리고 발견을 가속화하는 새로운 패러다임을 제시하는 것을 목표로 합니다.

## 핵심 방법론
**Paper2Agent** 는 연구 논문과 연관된 코드베이스를 자동으로 분석하여 AI 에이전트로 변환하는 다중 에이전트 AI 시스템입니다. 이 시스템은 **Model Context Protocol (MCP) 서버** 를 구축하는데, 여기에는 논문의 핵심 방법론을 캡슐화한 **MCP Tools** , 원본 데이터 및 코드 같은 정적 자원인 **MCP Resources** , 그리고 복잡한 과학 워크플로우를 안내하는 **MCP Prompts** 가 포함됩니다. 에이전트는 **Claude Code** 를 활용하여 환경 설정, 도구 추출, 반복적인 테스트를 통해 MCP를 견고하게 만들고, 원격 서버에 배포된 MCP 서버와 연결되어 자연어 쿼리를 통해 상호작용합니다.

## 주요 결과
**Paper2Agent** 는 세 가지 사례 연구에서 성공적인 변환을 입증했습니다. **AlphaGenome 에이전트** 는 약 3시간 만에 **22개의 MCP 도구** 를 생성하고, 튜토리얼 및 새로운 쿼리에서 **100% 정확도** 로 유전체 데이터 해석 결과를 재현했습니다. **TISSUE 에이전트** 는 **6개의 MCP 도구** 를 통해 공간 전사체학 예측 간격 계산에서 인간 연구자와 **동일한 결과** 를 산출했습니다. **Scanpy 에이전트** 는 약 45분 만에 **7개의 도구** 를 생성하여 **10x Genomics PBMC 단일 세포 RNA-seq 데이터셋** 에서 전처리 및 클러스터링 파이프라인의 모든 핵심 단계를 성공적으로 재현했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **Paper2Agent** 를 통해 복잡한 연구 방법론을 **자연어 인터페이스** 로 쉽게 활용할 수 있게 됩니다. 이는 코드 이해 및 환경 설정에 드는 노력을 대폭 줄여주며, **MCP 서버** 의 검증된 도구와 워크플로우를 통해 **"코드 환각" 위험 없이** 과학적 분석의 **재현성** 과 **신뢰성** 을 보장합니다. **Hugging Face Spaces** 와 같은 플랫폼에 배포된 에이전트는 로컬 종속성 문제 없이 다양한 LLM 및 AI 에이전트와 통합되어, 새로운 연구 방법론을 즉시 적용하고 **AI co-scientist** 와의 협업을 위한 토대를 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.