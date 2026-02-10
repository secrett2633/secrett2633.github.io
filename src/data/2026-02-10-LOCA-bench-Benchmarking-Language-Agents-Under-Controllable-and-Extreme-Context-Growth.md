---
title: "[논문리뷰] LOCA-bench: Benchmarking Language Agents Under Controllable and Extreme Context Growth"
excerpt: "이 [arXiv]에 게시한 'LOCA-bench: Benchmarking Language Agents Under Controllable and Extreme Context Growth' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models
  - Language Agents
  - Long Context
  - Context Rot
  - Benchmarking
  - Context Management
  - Tool Use
  - Agent Evaluation
  - Dynamic Environments

permalink: /ai/review/2026-02-10-LOCA-bench-Benchmarking-Language-Agents-Under-Controllable-and-Extreme-Context-Growth/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.07962)

**저자:** Weihao Zeng, Yuzhen Huang, Junxian He



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLMs) 기반의 언어 에이전트가 실세계의 장기 실행 태스크를 수행할 때 발생하는 "컨텍스트 로트(context rot)" 현상, 즉 컨텍스트 길이가 증가함에 따른 성능 저하 문제를 해결하고자 합니다. 기존 벤치마크가 정적이고 단일 단계 정보 검색에 초점을 맞추는 한계를 넘어, 동적으로 컨텍스트가 성장하는 에이전트 시나리오에서 LLM의 성능을 평가하기 위한 **LOCA-bench** 를 제안합니다.

## 핵심 방법론
**LOCA-bench** 는 환경 상태를 **자동화되고 확장 가능한 방식** 으로 제어하여 컨텍스트 길이를 조절하되, 기본 태스크의 의미는 고정합니다. 실제 서비스 백엔드를 모방한 **모의 서버(mock servers)** 를 활용하여 복잡한 환경을 시뮬레이션하며, **조절 가능한 환경 상태(adjustable environment state)** 를 통해 다양한 난이도와 컨텍스트 규모의 시나리오를 생성합니다. 또한, **도구 결과 삭제(tool-result clearing)** , **사고 블록 삭제(thinking-block clearing)** , **컨텍스트 압축(context compaction)** , **컨텍스트 인식(context awareness)** , **메모리 도구(memory tools)** , **프로그래밍 방식 도구 호출(programmatic tool calling)** 등 다양한 **컨텍스트 엔지니어링 전략** 을 평가 프레임워크에 통합합니다.

## 주요 결과
실험 결과, 컨텍스트 설명 길이(Environment Description Length)가 증가함에 따라 대부분의 모델에서 평균 태스크 정확도가 급격히 감소했습니다. 특히, **8K 토큰** 에서 **70% 이상** 의 정확도를 보였던 모델들이 **128K 이상** 에서는 크게 성능이 저하되며, **프론티어 모델(예: Claude-4.5-Opus, GPT-5.2-Medium)** 이 오픈소스 모델 대비 **2~3배 높은 정확도** 를 보였습니다. **프로그래밍 방식 도구 호출** 과 같은 고급 컨텍스트 엔지니어링 전략은 모델 성능을 크게 향상시켜, **GPT-5.2-Medium** 의 정확도를 **128K 컨텍스트 길이** 에서 **38.7%에서 49.3%로** 개선했습니다.

## AI 실무자를 위한 시사점
**LOCA-bench** 는 **장문 컨텍스트 환경** 에서 **LLM 기반 에이전트** 의 **복잡한 추론, 지시 따르기, 환경 탐색, 환각(hallucination)** 문제를 포괄적으로 진단할 수 있는 플랫폼을 제공합니다. 이는 실제 Agent 시스템 개발 시 **컨텍스트 길이 증가** 에 따른 **성능 저하** 가 불가피하며, 특히 **고급 컨텍스트 관리 기법** 의 통합이 모델의 신뢰성과 효율성을 높이는 데 필수적임을 강조합니다. 실무자들은 이 벤치마크를 통해 모델과 스캐폴드 조합의 성능을 평가하고, 장기 실행 에이전트의 견고성을 강화할 수 있는 전략을 모색할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.