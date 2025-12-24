---
title: "[논문리뷰] INTELLECT-3: Technical Report"
excerpt: "이 [arXiv]에 게시한 'INTELLECT-3: Technical Report' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Large Language Models
  - Mixture-of-Experts
  - Asynchronous Training
  - Distributed Systems
  - Agentic AI
  - Code Execution
  - Model Evaluation

permalink: /ai/review/2025-12-24-INTELLECT-3-Technical-Report/

toc: true
toc_sticky: true

date: 2025-12-24 00:00:00+0900+0900
last_modified_at: 2025-12-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.16144)

**저자:** Mika Senghaas, Jack Min Ong, Andrew Baker, Fares Obeid, Sami Jaghouar, Daniel Auras*, Matej Sirovatka, William Brown, Jannik Straube, Sebastian Müller, Justus Mattern, Manveer Basra, Aiman Ismail, Dominik Scherm, Cooper Miller, Ameen Patel, Simon Kirsten, Mario Sieg, Christian Reetz, Kemal Erdem, Vincent Weisser, Johannes Hagemann+



## 핵심 연구 목표
본 논문은 기존 오픈소스 LLM RL 인프라의 복잡성과 확장성 한계를 해결하고, **106B 파라미터 Mixture-of-Experts (MoE) 모델인 INTELLECT-3** 를 통해 최첨단 성능을 달성하는 것을 목표로 합니다. 나아가, 엔드-투-엔드 RL 훈련을 위한 완전한 오픈소스 인프라 스택을 제공하여 독점 AI 연구소와의 격차를 줄이고자 합니다.

## 핵심 방법론
**GLM-4.5-Air-Base** 모델을 기반으로 **감독 미세 조정(SFT)** 과 **대규모 강화 학습(RL)** 의 두 단계로 **INTELLECT-3** 를 훈련했습니다. 특히, **prime-rl** 이라는 비동기 RL 프레임워크를 개발하여 분산된 트레이너 및 추론 서비스, **연속 배칭(continuous batching)** , **실시간 가중치 업데이트(in-flight weight updates)** , 그리고 효율적인 **MoE 지원** 을 구현했습니다. **Verifiers** 라이브러리와 **Environments Hub** 를 통해 수학, 코드, 과학 등 다양한 에이전트 환경을 표준화하고, **Prime Sandboxes** 로 안전하고 처리량이 높은 코드 실행을 지원하여 **512개 NVIDIA H200 GPU** 에서 RL 훈련을 확장했습니다.

## 주요 결과
**INTELLECT-3** 는 동급 오픈소스 모델 및 많은 대형 최전선 모델들을 능가하는 최첨단 성능을 달성했습니다. 특히, **AIME 2024에서 90.8%** , **AIME 2025에서 88.0%** 의 점수를 기록하여 DeepSeek의 최전선 모델을 능가하고 Z.ai의 GLM-4.6과 일치하는 성능을 보였습니다. 또한, **LiveCodeBench v6에서 69.3%** 를 달성하여 Z.ai의 GLM-4.5-Air 후속 훈련 모델보다 8% 우수했습니다. RL 훈련이 진행될수록 벤치마크 점수가 지속적으로 향상되는 추세를 보였으며, **prime-rl** 스택은 65,536 시퀀스 길이에서 약 **1500초의 단계 시간** 으로 높은 훈련 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 모델, RL 프레임워크, 환경 등 **LLM RL 훈련을 위한 완전하고 오픈소스인 엔드-투-엔드 스택** 을 제공하여 AI 개발자들이 독점 시스템에 필적하는 모델을 구축할 수 있도록 합니다. **비동기 RL** , **연속 배칭** , **MoE 지원** 등 대규모 훈련 기술의 중요성을 강조하며, **표준화된 환경(Environments Hub)** 및 **안전한 코드 실행(Prime Sandboxes)** 이 에이전트 AI 개발에 필수적임을 보여줍니다. 이는 LLM의 추론 및 에이전트 기능을 강화하려는 연구자와 엔지니어들에게 강력한 기반과 도구를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.