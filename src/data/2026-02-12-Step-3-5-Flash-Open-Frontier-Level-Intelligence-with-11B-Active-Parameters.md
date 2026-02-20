---
title: "[논문리뷰] Step 3.5 Flash: Open Frontier-Level Intelligence with 11B Active Parameters"
excerpt: "arXiv에 게시된 'Step 3.5 Flash: Open Frontier-Level Intelligence with 11B Active Parameters' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture-of-Experts (MoE)
  - Sparse Models
  - Inference Efficiency
  - Hybrid Attention
  - Multi-Token Prediction (MTP)
  - Reinforcement Learning (RL)
  - Agentic AI
  - Long-Context Understanding

permalink: /ai/review/2026-02-12-Step-3-5-Flash-Open-Frontier-Level-Intelligence-with-11B-Active-Parameters/

toc: true
toc_sticky: true

date: 2026-02-12 00:00:00+0900+0900
last_modified_at: 2026-02-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.10604)

**저자:** StepFun Team



## 핵심 연구 목표
본 논문은 **11B 활성화 파라미터** 를 가진 **196B Mixture-of-Experts (MoE) 모델** 인 **Step 3.5 Flash** 를 소개하며, 첨단 에이전트 지능과 컴퓨팅 효율성 간의 격차를 해소하는 것을 목표로 합니다. 특히, 추론 지연 시간을 최소화하여 실제 산업 환경에서 정교한 에이전트를 효율적으로 배포할 수 있는 기반을 마련하고자 합니다.

## 핵심 방법론
이 모델은 **196B의 전체 파라미터** 중 **11B만 활성화** 되는 희소 **MoE 아키텍처** 를 사용하며, 긴 컨텍스트 지연 시간을 줄이기 위해 **3:1 Sliding Window/Full Attention** 과 **Multi-Token Prediction (MTP-3)** 이 교차 적용된 **하이브리드 어텐션 메커니즘** 을 채택했습니다. 안정적인 대규모 오프-폴리시 학습을 위해 **MIS-Filtered Policy Optimization (MIS-PO)** RL 프레임워크를 개발하고, 사전 훈련 및 중간 훈련 과정에서 **128k 컨텍스트 윈도우** 확장과 다양한 합성 데이터를 활용하여 추론 및 에이전트 역량을 강화했습니다.

## 주요 결과
**Step 3.5 Flash** 는 에이전트, 코딩, 수학 태스크에서 강력한 지능을 입증하며, **IMO-AnswerBench에서 85.4%** , **LiveCodeBench-v6에서 86.4%** 의 성능을 달성했습니다. 또한, **t²-Bench에서 88.2%** , **BrowseComp에서 69.0%** , **Terminal-Bench 2.0에서 51.0%** 를 기록하여 **GPT-5.2 xHigh** 및 **Gemini 3.0 Pro** 와 같은 최첨단 모델과 동등한 수준의 성능을 보여줍니다. 추론 시 **Hopper GPU에서 초당 약 170 토큰** 을 유지하는 뛰어난 효율성을 자랑합니다.

## AI 실무자를 위한 시사점
**Step 3.5 Flash** 의 효율성과 성능은 AI 실무자들이 **제한된 자원** 으로도 **프론티어급 에이전트 모델** 을 배포할 수 있는 실질적인 방안을 제시합니다. **희소 MoE 아키텍처** 와 **하이브리드 어텐션** 은 지연 시간에 민감한 대화형 에이전트 워크로드에 최적화된 설계 방향을 보여줍니다. 특히, **MIS-PO** 와 같은 강화 학습 안정화 기법은 대규모 MoE 모델 훈련 시 발생할 수 있는 불안정성 문제를 해결하는 데 중요한 통찰을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.