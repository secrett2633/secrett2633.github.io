---
title: "[논문리뷰] AgentCPM-Report: Interleaving Drafting and Deepening for Open-Ended Deep Research"
excerpt: "arXiv에 게시된 'AgentCPM-Report: Interleaving Drafting and Deepening for Open-Ended Deep Research' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Research
  - Agentic Systems
  - Writing As Reasoning Policy (WARP)
  - Outline Generation
  - Iterative Refinement
  - Reinforcement Learning (RL)
  - Small Language Models

permalink: /ai/review/2026-02-10-AgentCPM-Report-Interleaving-Drafting-and-Deepening-for-Open-Ended-Deep-Research/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.06540)

**저자:** AgentCPM Team



## 핵심 연구 목표
본 논문은 기존 언어 모델 기반 심층 연구 보고서 생성 시스템들이 겪는 한계를 극복하는 것을 목표로 합니다. 특히, 정적 계획에 의존하여 통찰력에 제한이 있고, 배포 및 데이터 보안 문제로 인해 대규모의 독점 모델에 의존하는 경향을 해소하고자 합니다.

## 핵심 방법론
제안하는 **AgentCPM-Report** 는 **Writing As Reasoning Policy (WARP)** 프레임워크와 **8B-파라미터 심층 연구 에이전트** 를 기반으로 합니다. WARP는 **증거 기반 초안 작성(Evidence-Based Drafting)** 과 **추론 기반 심화(Reasoning-Driven Deepening)** 를 교차하며 보고서 생성 중 동적으로 개요를 수정하며, 이를 통해 정보 획득, 지식 정제, 반복적인 개요 진화를 지원합니다. 에이전트 훈련을 위해 **다단계 에이전트 훈련(Multi-Stage Agentic Training)** 전략을 도입하여 **궤적 가지치기(trajectory pruning)** 와 **원자적 기술 RL(Atomic Skill RL)** , 그리고 **전체 파이프라인 RL(Holistic Pipeline RL)** 을 통해 안정적인 학습과 성능 최적화를 달성합니다.

## 주요 결과
**AgentCPM-Report** 는 **DeepResearch Bench** , **DeepConsult** , **DeepResearch Gym** 벤치마크에서 선도적인 클로즈드 소스 시스템들을 능가하는 성능을 보였습니다. 특히, **Insight** 및 **Comprehensiveness** 지표에서 상당한 개선을 이루었으며, **DeepResearch Bench** 에서 **Gemini-2.5-Pro** 의 평균 점수(49.71)를 뛰어넘는 **50.11** 의 전체 점수를 달성했습니다. 이는 **8B-파라미터 모델** 이 대규모 독점 시스템과 동등한 수준의 심층 연구 능력을 발휘할 수 있음을 입증합니다.

## AI 실무자를 위한 시사점
이 연구는 심층 연구 태스크에서 모델 규모보다는 **효과적인 인지 및 계획 프로세스 설계** 가 핵심 병목임을 시사합니다. **WARP 프레임워크** 를 통해 소규모 로컬 모델로도 안전하고 개인 정보 보호를 준수하는 고성능 심층 연구 보고서 생성이 가능함을 보여주었습니다. 또한, 동적 개요 수정과 반복적 심화 과정은 AI 에이전트의 통찰력 있는 결과물 생성 능력을 향상시키는 중요한 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.