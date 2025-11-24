---
title: "[논문리뷰] FocusAgent: Simple Yet Effective Ways of Trimming the Large Context of
  Web Agents"
excerpt: "Léo Boisvert이 [arXiv]에 게시한 'FocusAgent: Simple Yet Effective Ways of Trimming the Large Context of
  Web Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Web Agents
  - LLM Context Pruning
  - Accessibility Tree
  - Prompt Injection
  - Retrieval Augmented Generation
  - Web Navigation
  - Agent Security
  - Efficient LLM

permalink: /ai/review/2025-10-6-FocusAgent-Simple-Yet-Effective-Ways-of-Trimming-the-Large-Context-of-Web-Agents/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.03204)

**저자:** Imene Kerboua, Sahar Omidi Shayegan, Megh Thakkar, Xing Han Lù, Léo Boisvert



## 핵심 연구 목표
대규모 언어 모델(LLM) 기반 웹 에이전트가 긴 웹 페이지 관찰(수만 개의 토큰)로 인해 발생하는 컨텍스트 한계, 높은 계산 비용, 그리고 프롬프트 주입 공격과 같은 보안 위험을 해결하는 것을 목표로 합니다. 논문은 작업 목표에 따라 가장 관련 있는 정보만을 효율적으로 추출하여 관찰 크기를 줄이는 간단하면서도 효과적인 방법을 제시합니다.

## 핵심 방법론
**FOCUSAGENT**는 두 단계 파이프라인을 사용합니다. 먼저, **경량 LLM 검색기**를 활용하여 작업 목표에 따라 액세시빌리티 트리(**AxTree**) 관찰에서 가장 관련성 높은 라인들을 추출합니다. 이 **가지치기된(pruned) 관찰**은 두 번째 단계에서 웹 에이전트가 작업을 완료하기 위한 행동을 예측하는 데 사용되며, **Chain-of-Thought (CoT)** 추론을 통해 관련 정보를 식별합니다.

## 주요 결과
**FOCUSAGENT**는 WorkArena 및 WebArena 벤치마크에서 관찰 크기를 **평균 50% 이상(종종 80% 이상)** 줄이면서도 강력한 기준선 모델과 동등한 작업 성공률(SR)을 달성했습니다. 특히, **DefenseFocusAgent** 변형은 배너 및 팝업 공격에 대한 공격 성공률(ASR)을 **80% 이상에서 1% 미만**으로 크게 감소시키면서 공격 없는 환경에서의 성능을 유지했습니다. 이는 기존 임베딩 기반 검색 방법보다 우수한 성능을 보여줍니다.

## AI 실무자를 위한 시사점
본 연구는 웹 에이전트의 컨텍스트 창 관리 문제를 해결하는 실용적인 방법을 제시하며, **경량 LLM 기반 검색**을 통해 계산 효율성을 높일 수 있음을 보여줍니다. 또한, **프롬프트 엔지니어링**을 통한 악성 콘텐츠 제거는 **프롬프트 주입 공격**에 대한 효과적인 방어를 제공하여, 웹 에이전트의 보안 및 신뢰성을 크게 향상시킬 수 있습니다. 이는 효율적이고 안전한 웹 에이전트 시스템을 구축하는 데 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.