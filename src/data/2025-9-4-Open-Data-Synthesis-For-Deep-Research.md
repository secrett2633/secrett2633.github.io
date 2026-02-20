---
title: "[논문리뷰] Open Data Synthesis For Deep Research"
excerpt: "Zheng Liu이 arXiv에 게시한 'Open Data Synthesis For Deep Research' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Data Synthesis
  - Deep Research
  - Hierarchical Constraint Satisfaction Problems
  - Large Language Models
  - Agentic AI
  - Reinforcement Learning
  - Question Answering

permalink: /ai/review/2025-9-4-Open-Data-Synthesis-For-Deep-Research/

toc: true
toc_sticky: true

date: 2025-09-04 12:56:15+0900
last_modified_at: 2025-09-04 12:56:15+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.00375)

**저자:** Ziyi Xia, Kun Luo, Hongjin Qian, Zheng Liu



## 핵심 연구 목표
본 논문은 기존 벤치마크들이 "심층 연구(Deep Research)" 작업을 위한 충분한 구조적 깊이를 제공하지 못하는 한계를 해결하고자 합니다. 특히, 복잡한 질문을 하위 문제로 분해하고, 다단계 추론을 조율하며, 다양한 출처에서 증거를 합성해야 하는 작업에 초점을 맞춥니다. 궁극적으로 검증 가능한 답변을 제공하는 **계층적 제약 만족 문제(Hierarchical Constraint Satisfaction Problems, HCSPs)** 로 심층 연구를 정형화하고, 이를 위한 대규모 고품질 합성 데이터셋을 제공하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **InfoSeek** 프레임워크는 **듀얼 에이전트 시스템** 을 활용하여 대규모 웹 페이지에서 **Research Tree** 를 재귀적으로 구축합니다. 이 과정에서 중간 노드는 유효한 하위 문제로 변환되고, 완성된 트리는 전체 계층을 탐색해야 하는 자연어 질문으로 전환됩니다. 데이터 품질 보증을 위해 **Qwen2.5-32B** 및 **Gemini 2.5 Flash** 를 통한 **난이도 및 검증 가능성 필터링** 을 수행했습니다. 학습에는 성공적인 추론 궤적에 대한 **리젝션 샘플링 기반의 지도 미세 조정(SFT)** 과 **GRPO(Group Relative Policy Optimization)** 를 사용한 **강화 학습(RL)** 이 적용되었습니다.

## 주요 결과
InfoSeek은 **5만 개 이상의 QA 쌍** 과 **1.65만 개 이상의 추론 궤적** 을 포함하는 대규모 데이터셋을 생성했습니다. 이 데이터셋으로 훈련된 소형 LLM인 **InfoSeeker-3B** 는 BrowseComp-Plus 벤치마크에서 **16.5%의 정확도** 를 달성하여, **Qwen3-32B(3.5%)** 및 **SearchR1-32B(3.9%)** 와 같은 더 큰 오픈소스 모델들을 크게 능가했습니다. 또한, **Gemini 2.5 Flash(15.5%)** 및 **GPT-4.1(14.6%)** 과 같은 상용 API보다 우수하거나 동등한 성능을 보였습니다.

## AI 실무자를 위한 시사점
InfoSeek은 심층 연구 작업을 위한 **개방형, 확장 가능한 데이터 합성 프레임워크** 를 제공하여, 이전에는 대규모 모델이나 상용 API에 의존했던 복잡한 작업을 소형 LLM으로 해결할 가능성을 제시합니다. 이 프레임워크는 **AI 에이전트** 가 다단계 추론과 외부 도구 사용을 효과적으로 학습하는 데 필요한 고품질 훈련 데이터를 구축하는 데 기여합니다. 또한, 중간 단계 및 검색 레이블과 같은 **메타 정보 보존** 은 향후 복합 보상 설계 및 궤적 수준 최적화를 통한 **강화 학습 연구** 에 귀중한 기회를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.