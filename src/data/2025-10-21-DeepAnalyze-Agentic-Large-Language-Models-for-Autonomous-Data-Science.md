---
title: "[논문리뷰] DeepAnalyze: Agentic Large Language Models for Autonomous Data Science"
excerpt: "arXiv에 게시된 'DeepAnalyze: Agentic Large Language Models for Autonomous Data Science' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autonomous Data Science
  - Agentic LLM
  - Curriculum Learning
  - Reinforcement Learning
  - Data Agents
  - End-to-end Data Science

permalink: /ai/review/2025-10-21-DeepAnalyze-Agentic-Large-Language-Models-for-Autonomous-Data-Science/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.16872)

**저자:** Shaolei Zhang, Ju Fan, Meihao Fan, Guoliang Li, Xiaoyong Du



## 핵심 연구 목표
본 논문은 원시 데이터부터 분석가 수준의 심층 연구 보고서에 이르는 **완전히 자율적인 데이터 과학** 을 달성하는 것을 목표로 합니다. 기존 워크플로우 기반 데이터 에이전트들이 사전 정의된 워크플로우에 의존하여 복잡한 데이터 과학 태스크와 다양한 정형 데이터 처리에서 한계를 보이는 문제를 해결하고자 합니다.

## 핵심 방법론
본 연구는 **8B 파라미터** 를 가진 최초의 에이전트형 LLM인 **DeepAnalyze-8B** 를 제안합니다. 인간 데이터 과학자의 학습 궤적을 모방한 **커리큘럼 기반 에이전트 훈련(curriculum-based agentic training)** 패러다임을 도입하여 LLM이 점진적으로 다중 능력을 습득하도록 하며, **데이터 기반 궤적 합성(data-grounded trajectory synthesis)** 프레임워크로 고품질 훈련 데이터를 생성합니다. **DeepAnalyze-8B** 는 **`Analyze`** , **`Understand`** , **`Code`** , **`Execute`** , **`Answer`** 의 5가지 액션을 자율적으로 생성하고 최적화하여 환경과 상호작용합니다.

## 주요 결과
**DeepAnalyze-8B** 는 **DataSciBench** 벤치마크에서 **8B 파라미터** 만으로도 **GPT-4-Turbo** , **Claude 3.5 Sonnet** 등 대부분의 최첨단 독점 LLM 기반 에이전트를 능가하며, 전체적으로 **GPT-40** 다음으로 2위 성능을 달성했습니다. 특히 **DABStep-Research** 벤치마크에서는 비교 시스템을 지속적으로 능가하며 분석가 수준의 보고서 생성 능력에서 강점을 보였습니다. 또한 **DS-1000** 및 **TableQA** 벤치마크에서 코드 생성 및 구조화된 데이터 이해 능력에서도 이전 SOTA 모델들을 뛰어넘는 강력한 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**DeepAnalyze-8B** 는 **8B의 상대적으로 적은 파라미터 수** 로도 복잡하고 개방형 데이터 과학 태스크를 자율적으로 수행하는 에이전트형 LLM의 실현 가능성을 보여줍니다. 이는 데이터 과학 워크플로우 자동화의 새로운 패러다임을 제시하며, 비용 효율적이면서 강력한 데이터 과학 에이전트 개발의 문을 엽니다. 본 연구에서 제안된 **커리큘럼 학습** 과 **데이터 기반 궤적 합성** 방법론은 LLM이 다단계 추론과 실제 환경 상호작용 능력을 효과적으로 학습하고 향상시키는 데 중요한 전략임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.