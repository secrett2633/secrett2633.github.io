---
title: "[논문리뷰] GroundingME: Exposing the Visual Grounding Gap in MLLMs through Multi-Dimensional Evaluation"
excerpt: "이 [arXiv]에 게시한 'GroundingME: Exposing the Visual Grounding Gap in MLLMs through Multi-Dimensional Evaluation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Grounding
  - MLLMs
  - Benchmark
  - Multi-Dimensional Evaluation
  - Rejection Capability
  - Test-Time Scaling
  - Data Mixture Training

permalink: /ai/review/2025-12-22-GroundingME-Exposing-the-Visual-Grounding-Gap-in-MLLMs-through-Multi-Dimensional-Evaluation/

toc: true
toc_sticky: true

date: 2025-12-22 00:00:00+0900+0900
last_modified_at: 2025-12-22 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.17495)

**저자:** Rang Li, Lei Li, Shuhuai Ren, Hao Tian, Shuhao Gu, Shicheng Li, Zihao Yue, Yudong Wang, Wenhan Ma, Zhe Yang, Jingyuan Ma, Zhifang Sui, Fuli Luo



## 핵심 연구 목표
본 연구는 기존 벤치마크에서 MLLM(Multimodal Large Language Models)이 달성한 높은 성능에도 불구하고, **인간과 유사한 시각적 접지(visual grounding) 능력** 을 실제 복잡한 시나리오에서 갖추고 있는지 근본적인 질문을 던집니다. MLLM의 **미세한 시각적 구별, 복잡한 공간 추론, 제한된 시각 조건 처리, 그리고 존재하지 않는 객체에 대한 거부 능력** 등 다차원적인 능력을 종합적으로 평가하는 벤치마크를 제시하여 시각적 접지 능력의 격차를 명확히 밝히는 것을 목표로 합니다.

## 핵심 방법론
연구진은 **GroundingME** 라는 새로운 시각적 접지 벤치마크를 소개했으며, 이는 자동 생성과 인간 검증을 통해 1,005개의 도전적인 샘플로 구성됩니다. 이 벤치마크는 **Discriminative, Spatial, Limited, Rejection** 이라는 네 가지 핵심 L-1 차원을 통해 모델 성능을 체계적으로 평가합니다. 모델 성능 향상을 위해 **Test-Time Scaling** 기법을 도입하여 텍스트 전용 LLM을 심사위원으로 활용해 최적의 추론 궤적을 선택하고, **Data-Mixture Training** 전략을 통해 훈련 데이터에 부정 샘플을 추가하여 모델의 거부 능력을 강화합니다.

## 주요 결과
**25개 최신 MLLM** 에 대한 광범위한 평가 결과, 최고 모델인 **Qwen3-VL-235B-A22B** 조차 **45.1%의 낮은 정확도** 를 기록하며 현재 MLLM의 심각한 시각적 접지 능력 격차를 드러냈습니다. 특히 대부분의 모델이 **Rejection 태스크에서 0%의 정확도** 를 보이며 존재하지 않는 객체에 대한 환각 현상을 겪었습니다. 반면, **Test-Time Scaling** 은 복잡한 접지 태스크에서 최대 **2.9%의 정확도 향상** 을 가져왔고, **Data-Mixture Training** 은 거부 정확도를 **0%에서 27.9%** 로 상승시키는 데 성공했습니다.

## AI 실무자를 위한 시사점
본 연구는 MLLM이 복잡한 시각적 추론과 특히 **객체 부재 시의 거부 메커니즘** 에서 심각한 한계를 가지고 있음을 실무자들에게 명확히 인지시킵니다. MLLM을 실제 환경에 배포하기 위해서는 단순한 모델 규모 확장을 넘어, **Test-Time Scaling** 과 **Data-Mixture Training** 과 같은 전략을 통해 **세분화된 시각적 구별 능력과 추론 기반 접지 능력** 을 강화해야 합니다. 이는 AI 시스템의 **정확성과 안전성** 을 확보하고, 인간 수준의 시각적 접지 능력을 달성하기 위한 실용적인 로드맵을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.