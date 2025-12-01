---
title: "[논문리뷰] Multi-Crit: Benchmarking Multimodal Judges on Pluralistic Criteria-Following"
excerpt: "이 [arXiv]에 게시한 'Multi-Crit: Benchmarking Multimodal Judges on Pluralistic Criteria-Following' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Judges
  - LMM Evaluation
  - Pluralistic Criteria
  - Criteria-Following
  - Trade-off Sensitivity
  - Conflict Resolution
  - Reward Models
  - Benchmark

permalink: /ai/review/2025-11-28-Multi-Crit-Benchmarking-Multimodal-Judges-on-Pluralistic-Criteria-Following/

toc: true
toc_sticky: true

date: 2025-11-28 00:00:00+0900+0900
last_modified_at: 2025-11-28 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.21662)

**저자:** Tianyi Xiong, Yi Ge, Ming Li, Zuotong Zhang, Pranav Kulkarni, Kaishen Wang, Qi He, Zeying Zhu, Chenxi Liu, Ruibo Chen, Tong Zheng, Yanshuo Chen, Xiyao Wang, Renrui Zhang, Wenhui Chen, Heng Huang



## 핵심 연구 목표
본 연구는 기존 멀티모달 평가 벤치마크들이 **단일, 총체적 선호도** 에만 초점을 맞춰, **미세한 기준별 판단** 과 **기준 간의 충돌** 을 간과하는 한계를 해결하고자 합니다. 이를 위해 **Multi-Crit** 벤치마크를 제시하여 멀티모달 LMM(Large Multimodal Model) 기반 judge 모델이 **다중 기준(pluralistic criteria)** 을 얼마나 잘 따르고, **기준별 트레이드오프** 를 인식하며, **선호도 충돌** 을 해결하는지 종합적으로 평가하는 것을 목표로 합니다.

## 핵심 방법론
**Multi-Crit** 벤치마크는 오픈 엔드 생성과 검증 가능한 추론 태스크를 포함하는 **8가지 데이터 소스** 의 멀티모달 프롬프트를 활용합니다. 이 벤치마크는 **11가지 LMMs** 에서 생성된 응답 쌍에 대해 **다중 기준 인간 주석** 을 수집하며, **Completeness, Visual Grounding, Factuality/No Hallucination, Expressiveness, Clarity (오픈 엔드)** 및 **Logic Coherence, Reflection and Exploration, Conciseness and Efficiency (추론)** 등의 기준이 사용됩니다. 모델 성능 평가를 위해 **Pluralistic Accuracy (PAcc)** , **Trade-off Sensitivity (TOS)** , **Conflict Matching Rate (CMR)** 의 세 가지 새로운 지표가 도입되었습니다.

## 주요 결과
**04-mini** 및 **Claude-3.7-Sonnet** 같은 독점 모델조차 오픈 엔드 태스크에서 **32.78%** , 추론 태스크에서 **53.17%** 의 낮은 **Pluralistic Accuracy (PAcc)** 를 보이며 다중 기준 준수에 어려움을 겪었습니다. 오픈 소스 LMM은 기준별 정확도와 트레이드오프/충돌 인식 능력 모두에서 독점 모델에 현저히 뒤떨어지는 결과를 나타냈습니다. 또한, **홀리스틱 단일 선호도** 로 미세 조정된 심판 모델은 시각적 접지에서 일관성을 향상시켰지만, **다중 기준 평가** 에는 잘 일반화되지 못하는 한계를 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 현재 LMM 기반 judge 모델이 **복잡한 다중 기준** 을 따르고 기준 간 **트레이드오프 및 충돌** 을 해결하는 데 상당한 한계가 있음을 보여줍니다. AI 실무자들은 **LMM judge** 를 활용할 때 **단일 기준 평가** 에 더 집중하고, **다중 기준 시나리오** 에서는 주의 깊은 검증이 필요합니다. 이는 향후 더욱 신뢰할 수 있고, 사용자의 의도에 따라 조종 가능한 평가 시스템을 개발하기 위한 **기준 인식 훈련(criteria-aware training)** 방법론 연구의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.