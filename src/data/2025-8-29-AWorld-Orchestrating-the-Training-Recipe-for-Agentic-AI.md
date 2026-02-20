---
title: "[논문리뷰] AWorld: Orchestrating the Training Recipe for Agentic AI"
excerpt: "Qintong Wu이 arXiv에 게시한 'AWorld: Orchestrating the Training Recipe for Agentic AI' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic AI
  - Reinforcement Learning
  - Distributed Systems
  - Experience Generation
  - LLM Fine-tuning
  - GAIA Benchmark
  - Scalability
  - AWORLD Framework

permalink: /ai/review/2025-8-29-AWorld-Orchestrating-the-Training-Recipe-for-Agentic-AI/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.20404)

**저자:** Chengyue Yu, Siyuan Lu, Chenyi Zhuang, Dong Wang, Qintong Wu, Zongyue Li, Runsheng Gan, Chunfeng Wang, Siqi Hou, Gaochi Huang, Wenlong Yan, Lifeng Hong, Aohui Xue, Yanfeng Wang, Jinjie Gu, David Tsai, Tao Lin



## 핵심 연구 목표
본 논문은 에이전트 AI 시스템 개발의 핵심 병목인 **비효율적인 경험 생성(experience generation)** 문제를 해결하여, 복잡한 환경에서 **'학습을 통한 실천(learning from practice)'** 패러다임을 실용적이고 확장 가능하게 만드는 것을 목표로 합니다. 특히 GAIA와 같은 도전적인 벤치마크에서 대규모 에이전트 훈련의 실현 가능성을 입증하고자 합니다.

## 핵심 방법론
AWORLD는 **분산 아키텍처** 를 기반으로 설계되었으며, **Kubernetes** 를 활용하여 에이전트-환경 상호작용을 대규모로 병렬화합니다. 이는 경험 생성 단계의 효율성을 극대화하며, **vLLM** 을 통한 고처리량 에이전트 추론과 **SWIFT** 프레임워크를 통한 RL 훈련을 결합합니다. 또한, **e2b-code-server** , **ms-playwright** , **google-search** 등 다양한 도구를 통합하여 복잡한 태스크를 해결하는 에이전트의 역량을 강화합니다.

## 주요 결과
AWORLD는 경험 생성(rollout) 단계에서 표준 단일 노드 순차 실행 대비 **14.6배 빠른 속도** 를 달성하여, 롤아웃 시간을 **7695초에서 525초** 로 단축시켰습니다. 이를 통해 훈련된 **Qwen3-32B-AWORLD** 에이전트는 GAIA 벤치마크에서 기준 모델의 **21.59%** 정확도를 **32.23%** 로 크게 향상시켰습니다. 특히 가장 어려운 레벨 3 문제에서 **16.33%** 의 점수를 기록하며, GPT-4o와 같은 선도적인 독점 모델들을 능가하는 성능을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 복잡한 에이전트 AI 훈련에서 **경험 생성의 효율성** 이 결정적인 병목임을 명확히 보여줍니다. **AWORLD 프레임워크** 는 이 문제를 해결하는 **오픈소스 솔루션** 을 제공하며, AI 실무자들이 대규모 RL 기반 LLM 미세 조정을 통해 강력한 에이전트를 개발할 수 있는 실질적인 청사진을 제시합니다. 이는 AI 에이전트의 지속적인 개선과 **'학습을 통한 실천'** 패러다임의 실현 가능성을 크게 높이는 중요한 기여입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.