---
title: "[논문리뷰] Advances and Frontiers of LLM-based Issue Resolution in Software Engineering: A Comprehensive Survey"
excerpt: "이 [arXiv]에 게시한 'Advances and Frontiers of LLM-based Issue Resolution in Software Engineering: A Comprehensive Survey' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM-based Issue Resolution
  - Software Engineering
  - Autonomous Agents
  - Code Generation
  - Benchmarking
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Multimodal LLMs

permalink: /ai/review/2026-01-21-Advances-and-Frontiers-of-LLM-based-Issue-Resolution-in-Software-Engineering-A-Comprehensive-Survey/

toc: true
toc_sticky: true

date: 2026-01-21 00:00:00+0900+0900
last_modified_at: 2026-01-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.11655)

**저자:** Caihua Li, Lianghong Guo, Yanlin Wang, et al.



## 핵심 연구 목표
본 논문은 **LLM 기반의 소프트웨어 엔지니어링 이슈 해결(Issue Resolution)** 분야에 대한 최초의 체계적인 종합 조사를 제공하는 것을 목표로 합니다. 특히 **SWE-bench** 와 같은 벤치마크에 의해 촉진된 자율 코딩 에이전트의 발전을 분석하고, 이 분야의 핵심 도전 과제와 미래 연구 방향을 제시하고자 합니다.

## 핵심 방법론
연구는 **데이터, 방법론, 분석** 의 세 가지 주요 축을 중심으로 기존 문헌을 분류하는 **구조화된 분류 체계** 를 따릅니다. **데이터** 는 평가 및 훈련 데이터셋, 데이터 수집 및 합성 방식으로 구분되며, **방법론** 은 **훈련 없는(Training-free)** 프레임워크(단일/다중 에이전트, 워크플로우), 모듈(도구, 메모리), 추론 시간 확장(Inference-time Scaling)과 **훈련 기반(Training-based)** 기술( **SFT-기반, RL-기반** )로 나뉩니다.

## 주요 결과
LLM 기반 이슈 해결 연구가 단순한 **함수 레벨 코드 생성** 에서 **복잡한 리포지토리 레벨 문제 해결** 로 전환되고 있음을 보여줍니다. 현재 **SWE-bench Verified** 에서 **MiMo-V2-Flash** 와 같은 최상위 모델은 **73.4%** 의 해결률을 달성했습니다. 주요 도전 과제로는 **높은 계산 오버헤드, 효율성 평가 부족, 제한된 시각적 추론 능력, 안전 위험, 미세한 보상 설계의 부재, 데이터 유출 및 오염** 등이 강조됩니다.

## AI 실무자를 위한 시사점
AI/ML 실무자들은 **LLM 기반 에이전트** 가 실제 소프트웨어 개발 라이프사이클 전반에 걸쳐 점점 더 중요한 역할을 하고 있음을 이해해야 합니다. **SWE-bench** 와 같은 실제 문제를 반영하는 벤치마크를 통해 모델의 **실용적인 가치** 를 평가하고, **멀티모달 데이터** 처리 및 **효율적인 컨텍스트 관리** 와 같은 기술적 난제를 해결하는 데 집중해야 합니다. 또한, **안전하고 신뢰할 수 있는 에이전트** 개발을 위해 **데이터 큐레이션** 과 **미세한 보상 설계** 에 대한 고려가 필수적입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.