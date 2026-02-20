---
title: "[논문리뷰] SAGE: Steerable Agentic Data Generation for Deep Search with Execution Feedback"
excerpt: "arXiv에 게시된 'SAGE: Steerable Agentic Data Generation for Deep Search with Execution Feedback' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Deep Search
  - Agentic Data Generation
  - LLMs
  - Execution Feedback
  - Reinforcement Learning
  - Question Answering
  - Synthetic Data

permalink: /ai/review/2026-01-27-SAGE-Steerable-Agentic-Data-Generation-for-Deep-Search-with-Execution-Feedback/

toc: true
toc_sticky: true

date: 2026-01-27 00:00:00+0900+0900
last_modified_at: 2026-01-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.18202)

**저자:** Fangyuan Xu, Rujun Han, Yanfei Chen, Zifeng Wang, I-Hung Hsu, Jun Yan, Vishy Tirumalashetty, Eunsol Choi, Tomas Pfister and Chen-Yu Lee



## 핵심 연구 목표
본 논문은 복잡한 다중 문서 추론이 필요한 딥 서치(deep search) 질문-답변(QA) 쌍을 효율적으로 생성하는 문제를 다룹니다. 기존의 인간 주석 작업이 비현실적으로 높은 비용과 복잡한 탐색 궤적으로 인해 확장성이 부족하다는 한계를 극복하고, 고품질의 난이도 제어 가능한 합성 데이터를 자동으로 생성하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **SAGE (Steerable Agentic Generation with Execution Feedback)** 라는 에이전트 기반 데이터 생성 파이프라인을 제안합니다. 이 파이프라인은 초기 QA 쌍을 제안하는 **데이터 생성 에이전트(Agen)** 와 이를 해결하고 실행 피드백을 제공하는 **검색 에이전트(Asearch)** 로 구성됩니다. 두 에이전트는 여러 라운드에 걸쳐 상호작용하며, **Asearch** 의 **실행 피드백** (정확성 및 검색 스텝 수)을 바탕으로 **Agen** 이 QA 쌍을 반복적으로 정제하여 목표 난이도를 충족하도록 합니다.

## 주요 결과
본 연구의 내재적 평가 결과, **SAGE** 는 생성된 데이터의 품질을 크게 향상시켜 3라운드 피드백 후 정답이면서 난이도가 높은 데이터의 비율을 초기 생성기 대비 **18%** 에서 **50%** 로 증가시켰습니다. 외재적 평가에서는 **SAGE** 로 생성된 데이터로 딥 서치 에이전트를 훈련했을 때, 인-도메인 평가 세트에서 **27%** 의 상대적 성능 향상을, **Musique** 및 **FRAMES** 와 같은 아웃-오브-도메인 벤치마크에서 최대 **23%** 의 상대적 성능 향상을 달성했습니다. 특히 **QWEN-7B** 모델은 인-도메인에서 **38.1%** 의 평균 정확도를 기록했습니다.

## AI 실무자를 위한 시사점
**SAGE** 는 복잡한 추론을 요구하는 **딥 서치 에이전트** 훈련을 위한 **고품질 합성 데이터** 를 대규모로 자동 생성하는 효과적인 방법을 제공합니다. 이는 **LLM 기반 에이전트** 개발에서 **데이터 주석 비용** 을 획기적으로 절감할 수 있는 실용적인 해결책입니다. 또한, 고정된 코퍼스 기반 훈련이 **구글 서치와 같은 개방형 웹 환경** 으로 성공적으로 전이될 수 있음을 입증하여, **범용 검색 에이전트** 의 실제 적용 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.