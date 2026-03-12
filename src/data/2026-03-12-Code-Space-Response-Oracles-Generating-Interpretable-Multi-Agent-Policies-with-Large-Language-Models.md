---
title: "[논문리뷰] Code-Space Response Oracles: Generating Interpretable Multi-Agent Policies with Large Language Models"
excerpt: "arXiv에 게시된 'Code-Space Response Oracles: Generating Interpretable Multi-Agent Policies with Large Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Agent Reinforcement Learning
  - Policy-Space Response Oracles
  - Large Language Models
  - Program Synthesis
  - Interpretable AI
  - Game Theory
  - Code Generation

permalink: /ai/review/2026-03-12-Code-Space-Response-Oracles-Generating-Interpretable-Multi-Agent-Policies-with-Large-Language-Models/

toc: true
toc_sticky: true

date: 2026-03-12 00:00:00+0900+0900
last_modified_at: 2026-03-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.10098)

**저자:** Daniel Hennes, Zun Li, John Schultz, Marc Lanctot



## 핵심 연구 목표
기존 다중 에이전트 강화 학습(MARL), 특히 **Policy-Space Response Oracles (PSRO)** 에서 **심층 강화 학습(DRL) 오라클** 이 생성하는 '블랙박스' 신경망 정책의 **불투명성** 문제를 해결하고, **인간이 해석 가능한 정책** 을 생성하는 새로운 프레임워크를 제시하는 것이 목표입니다. 이는 불투명한 정책 매개변수 최적화에서 해석 가능한 알고리즘적 행동 합성으로 초점을 전환하고자 합니다.

## 핵심 방법론
이 연구는 **Code-Space Response Oracles (CSRO)** 를 제안하며, PSRO의 DRL 오라클을 **대규모 언어 모델(LLM)** 로 대체합니다. 최적 응답 계산을 **코드 생성 태스크** 로 재구성하여, LLM이 정책을 **인간이 읽을 수 있는 소스 코드** 로 직접 생성하도록 프롬프팅합니다. **ZeroShot** , **LinearRefinement** (반복적 피드백 루프), **AlphaEvolve** (분산형 LLM 기반 진화 시스템)와 같은 다양한 LLM 기반 오라클 구축 및 개선 방식을 탐구하고, **Repeated Rock-Paper-Scissors (RRPS)** 및 **Repeated Leduc Hold'em Poker** 환경에서 검증합니다.

## 주요 결과
**Repeated Rock-Paper-Scissors** 에서 CSRO의 **LinearRefinement (code) with Top 5 filtering** 은 **122.1 ± 9.8** 의 Aggregate Score를 달성하여 **27B Gemma 3 LLM 에이전트 (126.0)** 와 경쟁력을 보였으며, 기존 **PSRO-IMPALA (-532.1 ± 41.5)** 를 크게 상회했습니다. **CSRO-AlphaEvolve** 는 RRPS에서 가장 낮은 Exploitability ( **25.2 ± 20.3** )를 기록했습니다. **Repeated Leduc Hold'em Poker** 에서는 **CSRO-AlphaEvolve** 가 가장 높은 PopReturn ( **49.3 ± 3.7** ) 및 AggScore ( **44.9 ± 4.1** )를 달성하며 **CFR+ (AggScore 39.8 ± 0.3)** 와 경쟁력 있는 성능과 낮은 Exploitability ( **4.4 ± 0.6** )를 입증했습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **LLM의 코드 생성 능력** 을 활용하여 **해석 가능하고 검증 가능한 다중 에이전트 정책** 을 개발할 수 있습니다. 이는 고위험 도메인에서 AI 시스템의 **신뢰성과 설명 가능성** 을 높이는 데 중요하며, 기존 블랙박스 모델의 한계를 극복하는 실용적인 대안을 제공합니다. 특히 **LinearRefinement** 는 효율적인 정책 생성을 통해 DRL 기반 오라클 대비 높은 **샘플 효율성** 을 제공하며, **AlphaEvolve** 는 **견고한 전략** 발견에 강점을 보여 다양한 AI 애플리케이션에 적용될 잠재력을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.