---
title: "[논문리뷰] Numina-Lean-Agent: An Open and General Agentic Reasoning System for Formal Mathematics"
excerpt: "이 [arXiv]에 게시한 'Numina-Lean-Agent: An Open and General Agentic Reasoning System for Formal Mathematics' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic Systems
  - Formal Theorem Proving
  - Large Language Models (LLMs)
  - Lean Theorem Prover
  - Multi-Agent Systems
  - Code Generation
  - Automated Reasoning
  - Human-AI Collaboration

permalink: /ai/review/2026-01-22-Numina-Lean-Agent-An-Open-and-General-Agentic-Reasoning-System-for-Formal-Mathematics/

toc: true
toc_sticky: true

date: 2026-01-22 00:00:00+0900+0900
last_modified_at: 2026-01-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14027)

**저자:** Junqi Liu, Zihao Zhou, Zekai Zhu, Marco Dos Santos, Weikun He, Jiawei Liu, Ran Wang, Yunzhou Xie, Junqiao Zhao, Qiufeng Wang, Lihong Zhi, Jia Li, Wenda Li



## 핵심 연구 목표
기존 에이전트 기반 형식 증명 시스템의 유연성, 재현성, 확장성 한계를 해결하고자 합니다. 특히, **일반 코딩 에이전트** 를 형식 수학 추론의 핵심으로 활용하는 새로운 패러다임을 제안하고, 이를 통해 훈련 없이 모델 교체 및 전문 도구의 플러그 앤 플레이 확장이 가능한 시스템인 **Numina-Lean-Agent** 를 구축하는 것이 목표입니다.

## 핵심 방법론
**Numina-Lean-Agent** 는 **Claude Code** 와 **Numina-Lean-MCP** 를 기반으로 구축됩니다. **Numina-Lean-MCP** 는 **Lean theorem prover** 와의 상호작용을 위한 **Lean-LSP-MCP** , 관련 정리 및 정의 검색을 위한 **LeanDex** , 비공식 증명 생성을 위한 **Informal Prover** , 그리고 외부 언어 모델을 활용한 추론/계획을 돕는 **Discussion Partner** 를 통합합니다. 베이스 모델로는 **Claude Opus 4.5** 를 사용하며, 복잡한 문제 해결을 위해 **서브에이전트 메커니즘** 과 장기적인 형식화를 위한 **블루프린트 생성** 및 **인간-AI 협업** 을 활용합니다.

## 주요 결과
**Putnam 2025** 벤치마크에서 **12/12 문제** 를 성공적으로 해결하여 **최고 수준의 성능** 을 달성했습니다. 이는 **AxiomProver** 와 동등하며 **Harmonic's Aristotle** 보다 우수합니다. 또한, 일부 문제(A3, B1, B5)에서는 **AxiomProver** 및 **Seed-Prover 1.5** 보다 **더 짧은 증명 코드** 를 생성했습니다. **Brascamp-Lieb 정리** 의 형식화 과정에서는 **8,000줄 이상의 Lean 코드** 를 생성하고 **약 70개의 새로운 정의, 보조정리, 정리** 를 자율적으로 도입하며, 증명 과정에서의 오류 감지 및 수정 능력을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **일반 코딩 에이전트** 가 복잡한 수학적 추론 및 형식 증명에 효과적으로 활용될 수 있음을 보여주며, **대규모 언어 모델(LLM)의 범용성** 을 확장하는 중요한 시사점을 제공합니다. **모듈화된 에이전트 아키텍처** 와 **다양한 전문 도구(Lean-LSP-MCP, LeanDex 등)의 통합** 은 유연하고 확장 가능한 자동화된 추론 시스템 구축에 대한 실용적인 가이드라인을 제시합니다. **인간-AI 협업 프레임워크** 는 복잡한 지식 도메인에서 AI 에이전트의 효율성과 자율적인 지식 확장 능력을 크게 향상시킬 수 있는 잠재력을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.