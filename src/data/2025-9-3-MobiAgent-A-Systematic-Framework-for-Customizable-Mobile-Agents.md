---
title: "[논문리뷰] MobiAgent: A Systematic Framework for Customizable Mobile Agents"
excerpt: "Wangbo Gong이 [arXiv]에 게시한 'MobiAgent: A Systematic Framework for Customizable Mobile Agents' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mobile Agents
  - GUI Agents
  - Vision-Language Models
  - Agent Acceleration
  - Benchmarking
  - Reinforcement Learning
  - Data Collection

permalink: /ai/review/2025-9-3-MobiAgent-A-Systematic-Framework-for-Customizable-Mobile-Agents/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.00531)

**저자:** Cheng Zhang, Erhu Feng*, Xi Zhao, Yisheng Zhao, Wangbo Gong, Jiahui Sun, Dong Du, Zhichao Hua, Yubin Xia, Haibo Chen



## 핵심 연구 목표
본 논문은 GUI 기반 모바일 에이전트가 직면하는 낮은 태스크 완료율, 느린 응답 시간, 예상치 못한 상황 처리 능력 부족 등 **실세계 태스크 실행의 정확성과 효율성 문제**를 해결하고자 합니다. 특히, 기존 모델들의 한계를 극복하고 **맞춤형 모바일 에이전트**를 위한 체계적인 프레임워크를 제공하는 것을 목표로 합니다.

## 핵심 방법론
본 프레임워크인 MobiAgent는 세 가지 핵심 구성 요소로 이루어집니다: 다중 역할 아키텍처의 **MobiMind-series 에이전트 모델** (Planner, Decider, Grounder), **AgentRR 가속 프레임워크** (**ActTree** 및 **Latent Memory Models**를 활용한 기록-재생 메커니즘), 그리고 **MobiFlow 벤치마킹 스위트** (**DAGs** 및 다단계 검증). 또한, **VLM 기반 추론 재구성**과 **데이터 정제 전략**을 통해 AI 지원 데이터 수집 파이프라인을 구축하고, **Curriculum GRPO** 방식으로 모델을 훈련시킵니다.

## 주요 결과
실세계 모바일 시나리오에서 MobiAgent는 **MobiFlow 벤치마크**를 통해 다른 일반 목적 LLM (GPT-5, Gemini-2.5 Pro) 및 특수 GUI 에이전트 모델 (UI-TARS-1.5-7B)보다 뛰어난 성능을 달성했습니다. 특히, **종합 평균 태스크 완료율 72%**를 기록했으며, **AgentRR 프레임워크**를 통해 태스크 완료 지연 시간을 **2-3배 단축**하고, **60%-85%의 액션 재실행률**과 **99% 이상의 정확성**을 보였습니다.

## AI 실무자를 위한 시사점
MobiAgent는 **실세계 모바일 에이전트의 효율성과 신뢰성을 크게 향상**시킬 수 있는 실용적인 프레임워크를 제공합니다. **AgentRR 가속 프레임워크**는 반복적인 태스크의 실행 지연 시간을 줄여 **에이전트의 실제 배포 가능성**을 높이며, **MobiFlow 벤치마크**는 모바일 에이전트의 성능을 **보다 정확하고 통제된 환경**에서 평가할 수 있는 표준을 제시합니다. 이는 모바일 환경에서 지능형 자동화를 구현하려는 AI/ML 엔지니어에게 중요한 지침이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.