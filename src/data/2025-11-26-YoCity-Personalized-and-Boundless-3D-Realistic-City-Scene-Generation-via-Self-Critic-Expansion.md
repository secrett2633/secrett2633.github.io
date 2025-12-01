---
title: "[논문리뷰] Yo'City: Personalized and Boundless 3D Realistic City Scene Generation via Self-Critic Expansion"
excerpt: "Zhifei Yang이 [arXiv]에 게시한 'Yo'City: Personalized and Boundless 3D Realistic City Scene Generation via Self-Critic Expansion' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D City Generation
  - Generative AI
  - Large Language Models
  - Vision-Language Models
  - Multi-Agent Framework
  - Self-Critic Learning
  - Scene Graph
  - Text-to-3D

permalink: /ai/review/2025-11-26-YoCity-Personalized-and-Boundless-3D-Realistic-City-Scene-Generation-via-Self-Critic-Expansion/

toc: true
toc_sticky: true

date: 2025-11-26 00:00:00+0900+0900
last_modified_at: 2025-11-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.18734)

**저자:** Keyang Lu, Sifan Zhou, Hongbin Xu, Gang Xu, Zhifei Yang, Yikai Wang, Zhen Xiao, Jieyi Long, Ming Li



## 핵심 연구 목표
기존 3D 도시 생성 방법론들이 단일 확산 모델에 의존하여 개인화 및 무한 확장성에서 한계를 보이는 문제를 해결합니다. **Yo'City** 는 **대규모 모델(LLM, VLM)** 의 추론 및 합성 능력을 활용하여 사용자 맞춤형의, 무한히 확장 가능한, 사실적인 3D 도시 장면을 생성하는 새로운 에이전트 기반 프레임워크를 구축하는 것을 목표로 합니다.

## 핵심 방법론
**Yo'City** 는 **"City–District–Grid" 계층적 구조** 와 **멀티 에이전트 프레임워크** 를 사용합니다. **글로벌 플래너** 는 LLM을 활용해 도시의 전체 레이아웃과 기능적 구역을 계획하며, **RAG(Retrieval-Augmented Generation) 모듈** 로 사실적 근거를 보강합니다. **로컬 디자이너** 는 각 구역을 상세한 그리드 레벨의 텍스트 설명으로 세분화하여 공간적/양식적 일관성을 보장합니다. **3D 생성기** 는 **"생성-정제-평가(produce-refine-evaluate) 루프"** 를 통해 2D 아이소메트릭 이미지를 생성한 후, **사전 훈련된 이미지-투-3D 모델** 을 이용하여 3D 모델로 변환합니다. 마지막으로 **관계 기반 확장 모듈** 은 **장면 그래프** 와 **거리-의미 인식 최적화 함수(L(x) = Ldist(x) + λLsem(x))** 를 통해 도시를 연속적으로 확장합니다.

## 주요 결과
**Yo'City** 는 VQAScore(의미론적 일관성)에서 **0.7151** 을 달성하여 모든 기준 모델을 능가합니다. 또한, GPT-5 및 인간 평가에서 **기하학적 충실도 85.00% 이상, 레이아웃 일관성 86.00% 이상, 텍스처 선명도 78.50% 이상, 전반적 사실성 84.50% 이상** 의 높은 승률을 기록했습니다. 특히, 3x3 도시 생성 시 **SynCity 대비 69.47%의 시간 효율성** 을 보여주며 ( **Yo'City 43.40분** vs SynCity 116.63분), 확장 과정 전반에 걸쳐 VQAScore의 안정성(평균 분산 1e-4)을 입증했습니다.

## AI 실무자를 위한 시사점
**LLM/VLM 기반 에이전트 프레임워크** 가 복잡한 **3D 도시 생성** 과 같은 대규모 다단계 작업을 효과적으로 처리할 수 있음을 보여줍니다. 이는 **디지털 트윈, 가상 현실, 시뮬레이션 게임** 등의 응용 분야에서 사용자 맞춤형의 현실적이고 확장 가능한 환경을 구축하는 데 중요한 접근 방식을 제공합니다. 특히, **계층적 계획** 과 **생성-정제-평가 루프** , 그리고 **병렬 처리 아키텍처** 는 고품질 3D 콘텐츠를 효율적으로 생성하고 지속적으로 진화시키는 강력한 설계 패턴으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.