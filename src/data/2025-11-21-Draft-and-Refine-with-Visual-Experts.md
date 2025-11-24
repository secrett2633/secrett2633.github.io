---
title: "[논문리뷰] Draft and Refine with Visual Experts"
excerpt: "이 [arXiv]에 게시한 'Draft and Refine with Visual Experts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Vision-Language Models (LVLMs)
  - Visual Grounding
  - Hallucination Mitigation
  - Agent Framework
  - Visual Question Answering (VQA)
  - Expert Coordination
  - Relevance Map
  - Multi-modal Reasoning

permalink: /ai/review/2025-11-21-Draft-and-Refine-with-Visual-Experts/

toc: true
toc_sticky: true

date: 2025-11-21 00:00:00+0900+0900
last_modified_at: 2025-11-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.11005)

**저자:** SUNGHEON JEONG, RYOZO MASUKAWA, JIHONG PARK, SANGGEON YUN, WENJUN HUANG, HANNING CHEN, MAHDI IMANI, MOHSEN IMANI



## 핵심 연구 목표
최신 **Large Vision-Language Models (LVLMs)**는 시각적 증거보다 언어적 사전 지식에 과도하게 의존하여 근거 없는 환각(hallucination)을 자주 생성합니다. 본 연구는 모델이 시각적 입력을 얼마나 활용하는지에 대한 정량적 측정치 부재라는 한계를 극복하고, **LVLM**의 추론을 시각적으로 접지하며 환각을 줄이는 것을 목표로 합니다. 이를 위해 **질의 조건부 활용 측정 지표(question-conditioned utilization metric)**에 기반한 **Draft and Refine (DnR)** 에이전트 프레임워크를 제안합니다.

## 핵심 방법론
**Draft and Refine (DnR)** 프레임워크는 초기 응답(‘draft’)을 생성한 후, 질문과 관련된 이미지 영역을 식별하는 **질의 조건부 관련성 맵(query-conditioned relevance map)** `r(x|q)`을 구축합니다. 이 맵을 기반으로 **관련성 기반 확률적 마스킹(relevance-based probabilistic masking)**을 적용하여 **LVLM**의 시각적 증거 의존도를 정량화하는 **활용도 점수(utilization score)** `Uq(x)`를 계산합니다. 이 점수를 개선하기 위해 외부 시각 전문가(예: **GroundingDINO**, **SAM**)의 출력을 시각적 단서로 이미지에 렌더링하고, **LVLM**은 렌더링된 입력과 함께 다시 쿼리되어 활용도를 가장 많이 개선하는 응답을 선택합니다. 또한, **정책 기반(policy-driven)** 전문가 선택을 위해 **경량 셀렉터 네트워크(lightweight selector network)** `Se(j|s)`를 학습시킵니다.

## 주요 결과
**DnR** 프레임워크는 다양한 **VQA** 및 캡셔닝 벤치마크에서 일관된 정확도 향상과 환각 감소를 입증했습니다. 특히, 환각 관련 벤치마크(예: **HaloQuest**, **MMHal-Bench**)에서 평균적으로 환각이 **1-9%** 감소했으며, **InstructBLIP**는 **26.7%**, **Qwen2.5-VL**은 **35.0%**의 가장 큰 환각 감소를 보였습니다. 평균적인 시각적 접지(grounding)는 **0.6-5.9%** 증가했으며, **CogVLM**은 **33.6%**, **Qwen2.5-VL**은 **22.0%**의 가장 큰 향상을 달성했습니다. 또한, **정책 기반 전문가 선택**은 전체 평가 대비 성능 저하가 미미한 (-0.4 pp) 반면, 계산 비용은 평균 **70%** 감소하는 효율성을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 **LVLM**의 고질적인 환각 문제를 해결하고 시각적 접지를 강화하는 실용적인 방법을 제시하여, 모델의 신뢰성과 투명성을 크게 향상시킬 수 있습니다. 개발된 **질의 조건부 활용 측정 지표**는 모델의 내부 시각적 추론 의존도를 정량적으로 평가하는 새로운 접근 방식을 제공하여, **해석 가능한 AI(Explainable AI)** 시스템 구축에 기여합니다. 또한, 기존 **LVLM** 아키텍처를 변경하지 않고 **GroundingDINO**, **SAM**과 같은 다양한 시각 전문가를 손쉽게 통합하고 확장할 수 있는 유연한 에이전트 프레임워크는 실제 **AI 시스템 구축** 및 유지 보수 비용을 절감하는 데 큰 이점을 제공할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.