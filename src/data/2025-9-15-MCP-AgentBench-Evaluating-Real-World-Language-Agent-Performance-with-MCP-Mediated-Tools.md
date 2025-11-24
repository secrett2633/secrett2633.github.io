---
title: "[논문리뷰] MCP-AgentBench: Evaluating Real-World Language Agent Performance with
  MCP-Mediated Tools"
excerpt: "Xiaorui Wang이 [arXiv]에 게시한 'MCP-AgentBench: Evaluating Real-World Language Agent Performance with
  MCP-Mediated Tools' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Language Agents
  - Tool Use
  - Benchmarks
  - Model Context Protocol (MCP)
  - LLM Evaluation
  - Agentic AI
  - Real-World Performance

permalink: /ai/review/2025-9-15-MCP-AgentBench-Evaluating-Real-World-Language-Agent-Performance-with-MCP-Mediated-Tools/

toc: true
toc_sticky: true

date: 2025-09-15 13:12:08+0900
last_modified_at: 2025-09-15 13:12:08+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09734)

**저자:** Zikang Guo, Benfeng Xu, Chiwei Zhu, Wentao Hong, Xiaorui Wang, Zhendong Mao



## 핵심 연구 목표
본 논문은 `Model Context Protocol (MCP)`을 통해 도구를 사용하는 언어 에이전트의 실제 성능을 정확하게 평가할 수 있는 표준화된 벤치마크의 부재 문제를 해결하고자 합니다. 기존 벤치마크가 `MCP` 패러다임 내 에이전트의 진정한 운영 가치를 포착하지 못하는 한계를 극복하여, `MCP` 기반 에이전트 개발 및 평가를 위한 견고한 프레임워크를 제공하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 `MCP` 기반 도구 상호작용을 평가하기 위해 **MCP-AgentBench**라는 포괄적인 벤치마크를 개발했습니다. 이 벤치마크는 33개의 운영 서버와 188개의 도구로 구성된 **MCP 테스트베드**를 기반으로 하며, 다양한 상호작용 복잡성(단일/다중 서버, 순차/병렬 호출)을 가진 **600개의 질의**로 이루어져 있습니다. 평가는 실제 태스크 성공을 우선시하는 **MCP-Eval**이라는 새로운 결과 중심의 `LLM-as-a-judge` 방법론을 사용합니다.

## 주요 결과
실험 결과, `MCP-AgentBench`에서 **Qwen3-235B-A22B (ReAct)** 모델이 `64.7%`의 가장 높은 평균 통과율을 기록하며 선두적인 오픈소스 모델의 우수성을 입증했습니다. 기존 벤치마크인 **BFCL**에서 `71.71%`를 기록했던 **GPT-40**은 `MCP-AgentBench`에서 `27.8%`로 크게 낮은 성능을 보여, 실제 `MCP` 환경에서의 평가 필요성을 강조했습니다. 또한, **Kimi K2** 및 **Claude 4 Sonnet**과 같은 고성능 모델은 각각 `101.7k`, `140.3k` 토큰/쿼리를 소비하는 높은 토큰 효율성-성능 간의 상충 관계를 보였습니다.

## AI 실무자를 위한 시사점
`MCP-AgentBench`는 `MCP` 표준을 활용하는 에이전트 개발에 필수적인 실제 환경 성능 평가 프레임워크를 제공합니다. `ReAct`와 `Tool Calling` 같은 상호작용 프레임워크에 따라 모델 성능이 크게 달라지므로, 특정 애플리케이션에 적합한 모델과 프레임워크 선택의 중요성을 시사합니다. 또한, 성능과 토큰 소비 간의 상충 관계를 고려하여 `03-mini`와 같이 효율적인 모델 선택의 가이드를 제공하며, 오픈소스 모델의 경쟁력을 입증하여 에이전트 기술 발전에 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.