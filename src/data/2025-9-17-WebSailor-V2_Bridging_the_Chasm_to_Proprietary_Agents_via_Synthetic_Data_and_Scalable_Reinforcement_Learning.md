---
title: "[논문리뷰] WebSailor-V2: Bridging the Chasm to Proprietary Agents via Synthetic
  Data and Scalable Reinforcement Learning"
excerpt: "Huifeng Yin이 [arXiv]에 게시한 'WebSailor-V2: Bridging the Chasm to Proprietary Agents via Synthetic
  Data and Scalable Reinforcement Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Web Agents
  - Reinforcement Learning
  - Synthetic Data
  - Knowledge Graphs
  - LLMs
  - Supervised Fine-Tuning
  - Sim-to-Real Transfer
  - Agentic AI

permalink: /ai/review/2025-9-17-WebSailor-V2_Bridging_the_Chasm_to_Proprietary_Agents_via_Synthetic_Data_and_Scalable_Reinforcement_Learning/

toc: true
toc_sticky: true

date: 2025-09-17 13:16:01+0900
last_modified_at: 2025-09-17 13:16:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.13305)

**저자:** Huifeng Yin, Zhongwang Zhang, Kuan Li, callanwu, xxwu



## 핵심 연구 목표
WebSailor-V2는 오픈소스 웹 에이전트의 역량을 혁신적으로 향상시켜, 독점 시스템과의 성능 격차를 줄이는 것을 목표로 합니다. 특히 데이터 구성 및 확장 가능한 강화 학습(RL) 훈련의 두 가지 주요 과제를 해결하여 복잡한 웹 환경에서 고급 추론 및 도구 사용 능력을 갖춘 에이전트를 개발하고자 합니다.

## 핵심 방법론
본 연구는 **Qwen3-30B-A3B** 모델을 기반으로 **SailorFog-QA-V2**라는 새로운 합성 데이터셋을 구축합니다. 이 데이터셋은 밀접하게 연결된 지식 그래프에서 다양한 불확실성을 도입하여 정교한 추론을 촉진합니다. 훈련에는 **고충실도 시뮬레이터**와 안정적인 실세계 환경을 결합한 **이중 환경 RL 프레임워크**를 사용하며, 데이터와 정책 간의 **공생적 피드백 루프**를 통해 모델을 지속적으로 개선합니다.

## 주요 결과
WebSailor-V2는 **BrowseComp-EN**에서 **35.3점**, **BrowseComp-ZH**에서 **44.1점**, **Humanity's Last Exam (HLE)**에서 **30.6점**을 달성하여 모든 기존 오픈소스 에이전트를 크게 능가합니다. 특히 **30B-A3B MOE 에이전트**는 **671B DeepSeek-V3.1**을 뛰어넘는 성능을 보이며, **xbench-DeepSearch**에서는 **73.7점**으로 일부 독점 시스템보다 우수한 결과를 달성했습니다.

## AI 실무자를 위한 시사점
본 연구는 고품질의 **합성 데이터**와 안정적인 훈련 환경이 복잡한 웹 에이전트 개발에 있어 특정 알고리즘 자체보다 더 중요하다는 것을 강조합니다. **30B 규모의 MoE 모델**이 효과적인 데이터 및 훈련 파이프라인을 통해 훨씬 큰 모델이나 독점 모델에 필적하는 성능을 낼 수 있음을 보여줍니다. 이는 AI 개발자가 **확장 가능한 RL**을 활용하여 비용 효율적으로 고성능 에이전트를 구축할 수 있는 실용적인 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.