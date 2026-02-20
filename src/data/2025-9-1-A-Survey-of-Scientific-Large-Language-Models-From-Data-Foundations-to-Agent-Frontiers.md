---
title: "[논문리뷰] A Survey of Scientific Large Language Models: From Data Foundations to
  Agent Frontiers"
excerpt: "Jiamin Wu이 arXiv에 게시한 'A Survey of Scientific Large Language Models: From Data Foundations to
  Agent Frontiers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Scientific LLMs
  - AI for Science
  - Scientific Data
  - Agentic AI
  - Multimodal Integration
  - Knowledge Representation
  - Autonomous Discovery
  - Data Ecosystems

permalink: /ai/review/2025-9-1-A-Survey-of-Scientific-Large-Language-Models-From-Data-Foundations-to-Agent-Frontiers/

toc: true
toc_sticky: true

date: 2025-09-01 13:14:34+0900
last_modified_at: 2025-09-01 13:14:34+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.21148)

**저자:** Jiamin Wu, Wanghan Xu, Wei Li, Chenglong Ma, Ming Hu



## 핵심 연구 목표
이 논문은 과학 분야 대규모 언어 모델(Sci-LLMs)의 발전 과정을 데이터 기반과 에이전트 프론티어 관점에서 종합적으로 분석하는 것을 목표로 합니다. 특히, Sci-LLMs가 일반 자연어 처리(NLP) 데이터셋과 다른 복잡한 과학 데이터의 특성(다중 모달, 다중 스케일, 불확실성)을 어떻게 다루고 발전해왔는지 평가합니다. 궁극적으로 신뢰할 수 있고 지속적으로 진화하는 과학 AI 시스템 구축을 위한 로드맵을 제시하고자 합니다.

## 핵심 방법론
연구는 Sci-LLMs의 개발을 **데이터 기판과 모델의 공진화** 로 재구성하고, 과학 데이터와 지식의 계층적 구조에 대한 통일된 분류 체계를 제시합니다. **270개 이상의 사전 훈련/후속 훈련 데이터셋** 과 **190개 이상의 벤치마크 데이터셋** 을 체계적으로 분석하여, **전이 학습(Transfer Learning), 스케일링(Scaling), 명령어 추론(Instruction Following), 에이전트 과학(Agentic Science)** 의 네 가지 패러다임 변화를 추적합니다. 또한, 과학 에이전트의 **도구 사용(Tool Use)** , **다중 에이전트 협업(Multi-Agent Collaboration)** , **자기 진화(Self-Evolving Agents)** 와 같은 최신 방법론을 탐구합니다.

## 주요 결과
Sci-LLMs는 **Intern-S1 (241B 매개변수)** 과 같은 모델이 **2.5조 개의 과학 도메인 토큰** 으로 훈련되어 분자 합성 계획 등 전문 작업에서 최첨단 성능을 달성했음을 보여줍니다. 평가 측면에서는 **MMLU-Pro** 에서 **80-95%** 의 높은 정확도를 보이지만, **Humanity's Last Exam (HLE)** 에서는 **2-10%** , **Scientists' First Exam (SFE)** 에서는 **20-40%** 로 성능이 크게 하락하여 실제 과학적 추론 능력의 한계를 드러냈습니다. 이는 대규모의 고품질 과학 데이터 훈련이 필수적임을 시사합니다.

## AI 실무자를 위한 시사점
AI 실무자들은 과학 데이터의 **높은 이질성, 다중 스케일, 불확실성** 특성을 이해하고, **텍스트-모달리티 데이터에 대한 과도한 의존** 문제를 해결해야 합니다. **반자동 주석 파이프라인** 과 **전문가 검증** 을 통해 데이터 품질을 개선하고, 데이터 수집, 처리, 평가 전반에 걸친 **추적성(Traceability)** , **적시성(Timeliness)** , **AI 준비도(AI-readiness)** 를 높이는 것이 중요합니다. 궁극적으로 Sci-LLMs를 단순한 예측 모델이 아닌 **자율적인 과학 에이전트** 로 발전시켜 과학적 발견을 가속화하는 **폐쇄 루프 시스템** 구축에 집중해야 합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.