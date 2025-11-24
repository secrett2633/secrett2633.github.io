---
title: "[논문리뷰] Soft Instruction De-escalation Defense"
excerpt: "이 [arXiv]에 게시한 'Soft Instruction De-escalation Defense' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Prompt Injection
  - LLM Security
  - Agentic Systems
  - Iterative Sanitization
  - Instruction Control
  - Adversarial Robustness
  - Large Language Models

permalink: /ai/review/2025-10-27-Soft-Instruction-De-escalation-Defense/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.21057)

**저자:** Nils Philipp Walter, David Stutz, Chawin Sitawarin, Jamie Hayes, Ilia Shumailov



## 핵심 연구 목표
본 논문은 외부 환경과 상호작용하는 **LLM 기반 에이전트 시스템**이 겪는 프롬프트 인젝션 공격에 대한 취약성을 해결하는 것을 목표로 합니다. 특히, 신뢰할 수 없는 데이터 내의 악의적인 명령을 효과적으로 무력화하면서도 에이전트의 유용성을 저해하지 않는 방어 메커니즘을 제안합니다.

## 핵심 방법론
본 연구는 **SIC (Soft Instruction Control)**라는 반복적인 프롬프트 정화 루프를 제안합니다. 이 방법은 들어오는 데이터를 반복적으로 검사하여 잠재적으로 악의적인 명령을 식별하고, 이를 **재작성, 마스킹 또는 제거**한 후 재평가합니다. 정화 과정은 입력이 깨끗해지거나 최대 반복 횟수에 도달할 때까지 진행되며, 명령 유사 내용이 남아있을 경우 에이전트 실행을 중단하여 보안을 확보합니다. **더미 명령 삽입**을 통해 리라이터의 무결성을 확인하고, **청킹(chunking)** 방식을 활용하여 다양한 세분성으로 명령 탐지를 강화합니다.

## 주요 결과
**AgentDojo 벤치마크**에서 **SIC**는 **GPT-40, Qwen3-32B, Kimi-k2, GPT-4.1-mini**를 포함한 모든 모델 및 공격 유형에 대해 **공격 성공률(ASR)을 0%**로 낮추는 데 성공하며 최소한의 유틸리티 손실을 보였습니다. 특히 **GPT-40**은 높은 클린 유틸리티와 낮은 ASR을 결합하여 가장 강력한 균형을 보여주었습니다. 더 강력한 **유전 알고리즘 기반 적응형 공격**에서는 **15%의 ASR**을 기록했으나, 이는 경쟁 방어 기법인 **PIGUARD의 49%**보다 현저히 낮은 수치입니다.

## AI 실무자를 위한 시사점
**SIC**는 기존 LLM 에이전트의 내부 동작을 수정할 필요 없이 **모듈형 전처리 계층**으로 통합될 수 있어, LLM 기반 시스템의 보안을 강화하는 실용적인 접근 방식을 제공합니다. 반복적인 정화와 다중 검사 단계는 악의적인 공격을 시도하는 비용과 복잡성을 크게 증가시키며, 이는 모델 단독 솔루션의 한계를 극복하는 효과적인 방안입니다. 따라서 AI 실무자들은 **SIC**를 활용하여 에이전트 시스템의 프롬프트 인젝션 방어 능력을 높이고, 실제 환경에서의 보안 신뢰도를 향상시킬 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.