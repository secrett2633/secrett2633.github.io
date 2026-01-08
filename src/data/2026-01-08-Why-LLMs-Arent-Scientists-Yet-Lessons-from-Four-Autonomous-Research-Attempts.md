---
title: "[논문리뷰] Why LLMs Aren't Scientists Yet: Lessons from Four Autonomous Research Attempts"
excerpt: "이 [arXiv]에 게시한 'Why LLMs Aren't Scientists Yet: Lessons from Four Autonomous Research Attempts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Machine Learning Research
  - Autonomous Research
  - LLM Agents
  - Scientific Workflow
  - Failure Modes
  - Experimental Design
  - AI Scientist
  - Agentic Systems

permalink: /ai/review/2026-01-08-Why-LLMs-Arent-Scientists-Yet-Lessons-from-Four-Autonomous-Research-Attempts/

toc: true
toc_sticky: true

date: 2026-01-08 00:00:00+0900+0900
last_modified_at: 2026-01-08 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.03315)

**저자:** Dhruv Trehan, Paras Chopra



## 핵심 연구 목표
본 논문은 최신 추론형 LLM(Large Language Models)이 최소한의 코드 스캐폴딩과 기본적인 도구를 사용하여 연구 아이디어 구상부터 최종 연구 논문 작성까지 **높은 자율성** 을 가지고 수행할 수 있는지 탐구하는 것을 목표로 합니다. 특히, 기존 AI 과학자 시스템들의 **높은 도메인 특정적 사전 정의 요구사항** 을 극복하고 LLM의 한계를 파악하여 보다 견고한 AI 과학자 시스템을 위한 설계 원칙을 도출하고자 합니다.

## 핵심 방법론
저자들은 **여섯 개의 LLM 에이전트 모듈** (아이디어 생성, 가설 생성, 실험 계획, 결과 평가, 수정, 논문 개요 작성 에이전트)로 구성된 파이프라인을 구축하고, Gemini 2.5 Pro를 주로 사용하여 **네 가지의 ML 연구 아이디어** (MARL-1, WM-1, WM-2, AS-1)에 대해 **종단 간 자율 연구 시도** 를 진행했습니다. 실험 실행과 논문 작성에는 **Claude Code (Opus 4.1, Sonnet 4)** 를 활용했으며, 각 단계별 아티팩트를 파일 시스템으로 공유하여 **컨텍스트를 유지** 하고, **네 가지 zero-shot LLM 리뷰어** 를 통해 아이디어를 평가하고 선별했습니다.

## 주요 결과
네 가지 시도 중 **세 가지는 구현 또는 평가 단계에서 실패** 했고, **단 한 가지 아이디어 (AS-1)** 만이 파이프라인을 성공적으로 완료하여 **Agents4Science 2025 컨퍼런스에 채택** 되었습니다. 이 논문은 **48/254의 유효 제출작 중 하나로 선정** 되었고, 코드 감사도 통과했습니다. 주요 실패 모드로는 **훈련 데이터 편향** , **구현 중 이탈** , **장기 태스크에서의 기억 및 컨텍스트 저하** , **명백한 실패에도 불구하고 과도한 성공 선언** , **불충분한 도메인 지능** , 그리고 **과학적 실험 설계의 취약한 취향** 등 **여섯 가지 패턴** 이 도출되었습니다.

## AI 실무자를 위한 시사점
LLM 기반 자율 연구 시스템을 구축할 때 **훈련 데이터 편향** 과 **컨텍스트 유지 문제** 를 해결하기 위한 명확한 전략 (예: 점진적인 세부 정보 도입, 모든 단계에서의 검증, 실패 및 복구 계획, 종합적인 로깅)이 필수적임을 시사합니다. 특히, **모델의 과도한 낙관주의(overexcitement)** 를 경계하고 **과학적 회의론** 을 내재화하는 설계가 중요합니다. 이는 AI 과학자 시스템이 단독으로 작동하기보다는 **인간과의 효과적인 협업** 을 통해 점진적으로 발전해야 함을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.