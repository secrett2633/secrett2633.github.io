---
title: "[논문리뷰] DLLM-Searcher: Adapting Diffusion Large Language Model for Search Agents"
excerpt: "arXiv에 게시된 'DLLM-Searcher: Adapting Diffusion Large Language Model for Search Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Large Language Models
  - Search Agents
  - Latency Reduction
  - P-ReAct
  - Agentic Post-training
  - Supervised Fine-Tuning
  - Preference Optimization
  - Parallel Decoding

permalink: /ai/review/2026-02-11-DLLM-Searcher-Adapting-Diffusion-Large-Language-Model-for-Search-Agents/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.07035)

**저자:** Jiahao Zhao, Shaoxuan Xu, Zhongxiang Sun, Yuling Shi, Chongxuan Li, Fengqi Zhu, Jingyang Ou, Jun Xu, Xiao Zhang



## 핵심 연구 목표
본 논문은 기존 Autoregressive 모델(ARM) 기반 검색 에이전트의 **직렬 실행 구조로 인한 높은 레이턴시** 문제를 해결하고, 동시에 **Diffusion Large Language Model(dLLM)** 의 취약한 추론 및 도구 호출 능력을 개선하여, dLLM을 효율적인 검색 에이전트 백본으로 활용하는 것을 목표로 합니다.

## 핵심 방법론
dLLM의 에이전트 능력을 향상시키기 위해 **Agentic Supervised Fine-Tuning (SFT)** 과 **Agentic Variance-Reduced Preference Optimization (VRPO)** 으로 구성된 2단계 후속 훈련 파이프라인을 설계했습니다. 레이턴시 문제를 해결하기 위해, dLLM의 유연한 생성 패러다임을 활용하여 **P-ReAct (Parallel-Reasoning and Acting)** 라는 새로운 에이전트 패러다임을 제안하고, 이는 **토큰 사전 채우기(Token Pre-filling)** 와 **확신 편향(Confidence Biasing)** 을 통해 `tool_call` 디코딩을 우선시하도록 모델을 유도합니다.

## 주요 결과
**DLLM-Searcher** 는 주류 LLM 기반 검색 에이전트와 **성능 면에서 비교 가능한 수준** 을 달성했으며, 특히 **P-ReAct** 는 추론 시간을 **약 15% 가속화** 하면서도 성능 저하가 거의 없었습니다. **Agentic SFT** 를 통해 바닐라 SDAR 모델의 심각한 `tool_call` 형식 오류 문제를 효과적으로 해결했으며, **P-ReAct** 는 `tool_call` 영역을 거의 **100% 성공률** 로 우선 디코딩했습니다.

## AI 실무자를 위한 시사점
**dLLM** 이 기존 **ARM** 의 직렬 처리 한계를 넘어 **고효율 AI 에이전트의 핵심 동력** 이 될 수 있음을 입증했습니다. 특히 **P-ReAct** 패러다임은 **도구 실행 대기 시간 동안 모델이 추론을 계속** 하게 함으로써 실시간 애플리케이션의 **사용자 경험을 크게 향상** 시킬 수 있는 실용적인 해결책을 제시합니다. 이는 dLLM을 활용한 에이전트 시스템 개발에 있어 **레이턴시 최적화와 능력 향상을 동시에 달성** 할 수 있는 중요한 설계 원칙을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.