---
title: "[논문리뷰] DeepEyesV2: Toward Agentic Multimodal Model"
excerpt: "Guohai Xu이 [arXiv]에 게시한 'DeepEyesV2: Toward Agentic Multimodal Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Agentic AI
  - Multimodal Models
  - Tool Use
  - Reinforcement Learning
  - Supervised Fine-tuning
  - Multimodal Reasoning
  - Web Search
  - Code Execution

permalink: /ai/review/2025-11-10-DeepEyesV2-Toward-Agentic-Multimodal-Model/

toc: true
toc_sticky: true

date: 2025-11-10 00:00:00+0900+0900
last_modified_at: 2025-11-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.05271)

**저자:** Jack Hong, Chenxiao Zhao, ChengLIn Zhu, Weiheng Lu, Guohai Xu, Xing Yu



## 핵심 연구 목표
본 논문은 텍스트와 이미지를 단순히 이해하는 것을 넘어, **코드 실행 환경** 및 **웹 검색**과 같은 외부 도구를 능동적으로 호출하고 이러한 도구 작업을 추론 과정에 원활하게 통합할 수 있는 **Agentic 멀티모달 모델**을 구축하는 것을 목표로 합니다. 기존 멀티모달 모델의 수동성을 극복하고, 복잡한 실제 시나리오에서 환각을 줄이며 정확하고 추적 가능한 추론을 가능하게 하는 데 중점을 둡니다.

## 핵심 방법론
**DeepEyesV2** 모델은 **두 단계 훈련 파이프라인**을 채택합니다: 먼저 **콜드 스타트(cold-start) 단계**에서 지도 학습(SFT)을 통해 기본적인 도구 사용 패턴을 확립하고, 이어서 **강화 학습(Reinforcement Learning) 단계**에서 도구 호출의 효율성과 유연성을 정교화합니다. 모델은 이미지 크롭, 수치 분석, 마킹 등의 **코드 실행 도구**와 **이미지 검색, 텍스트 검색 도구**를 활용하며, RL 보상으로 **정확도(accuracy)**와 **형식(format)**만을 사용하여 복잡한 보상 엔지니어링 없이 학습을 수행합니다.

## 주요 결과
**DeepEyesV2**는 복잡한 멀티모달 추론을 평가하는 새로운 벤치마크인 **RealX-Bench**에서 기존 범용 MLLM 및 특정 추론 모델들을 능가하는 성능을 보였습니다. 특히 **MathVerse**에서 **+7.1%** 향상된 **52.7% 정확도**를 달성하고, 검색 중심 태스크인 **MMSearch**에서 **63.7%**를 기록하며 기존 모델 대비 상당한 성능 향상을 입증했습니다. 강화 학습을 통해 모델은 **작업 의존적인 도구 호출 패턴**을 학습하고, 복잡한 도구 조합 및 상황 인지적 도구 호출이 가능해져 추론 효율성이 높아졌습니다.

## AI 실무자를 위한 시사점
본 연구는 **Agentic 멀티모달 모델** 개발을 위한 효과적인 훈련 전략과 데이터셋 구축 원칙에 대한 중요한 지침을 제공합니다. 특히 **콜드 스타트 SFT와 강화 학습의 조합**이 도구 사용 능력 학습에 필수적임을 보여주며, **도구 사용이 유익한 다양한 시나리오**를 포함하는 데이터셋의 중요성을 강조합니다. 제안된 **RealX-Bench**는 인식, 검색, 추론이 통합된 복합적인 실제 멀티모달 문제 해결 능력을 평가하는 데 유용한 벤치마크로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.