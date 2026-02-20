---
title: "[논문리뷰] SVBench: Evaluation of Video Generation Models on Social Reasoning"
excerpt: "Xiaojie Xu이 arXiv에 게시한 'SVBench: Evaluation of Video Generation Models on Social Reasoning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Social Reasoning
  - Benchmark
  - Evaluation
  - Agent-based Pipeline
  - Vision-Language Models
  - Social Cognition

permalink: /ai/review/2025-12-29-SVBench-Evaluation-of-Video-Generation-Models-on-Social-Reasoning/

toc: true
toc_sticky: true

date: 2025-12-29 00:00:00+0900+0900
last_modified_at: 2025-12-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.21507)

**저자:** Wenshuo Peng, Gongxuan Wang, Tianmeng Yang, Chuanhao Li, Xiaojie Xu, Hui He, Kaipeng Zhang



## 핵심 연구 목표
현재 텍스트-투-비디오(T2V) 생성 모델이 시각적 사실성과 모션 충실도에서 발전했음에도 불구하고, **사회적으로 일관된 행동** 을 생성하는 데 근본적인 한계가 있음을 지적합니다. 이 연구는 인간 상호작용의 기저에 깔린 의도, 신념, 감정, 사회적 규범과 같은 **사회적 추론 능력** 을 체계적으로 평가하기 위한 최초의 벤치마크 **SVBench** 를 도입하는 것을 목표로 합니다.

## 핵심 방법론
이 연구는 발달 및 사회 심리학 연구를 기반으로 **7가지 사회 인지 차원** 에 걸쳐 30가지 고전적인 사회 인지 패러다임을 포함하는 **SVBench** 를 구축했습니다. **훈련이 필요 없는(training-free) 에이전트 기반 파이프라인** 을 사용하여 실험의 추론 메커니즘을 추출하고, 다양한 시나리오를 합성하며, **Critic Agent** 를 통해 난이도를 조절하고 편향을 제거합니다. 최종적으로 **고성능 VLM(Vision-Language Model) 심판관** 인 **Gemini 2.5 Pro** 를 활용하여 생성된 비디오를 5가지 차원의 사회적 추론 품질로 평가합니다.

## 주요 결과
8가지 최신 비디오 생성 시스템에 대한 광범위한 실험 결과, 현재 모델들이 표면적인 그럴듯함(surface-level plausibility)에서는 뛰어나지만, **의도 인식, 신념 추론, 공동 주의, 친사회적 추론** 에서는 심각한 성능 격차를 보였습니다. 특히 **Sora2-Pro** 와 **Veo-3.1** 이 각각 **79.6%** 및 **72.4%** 의 전반적인 통과율을 기록하며 다른 모델들을 능가했지만, 여전히 복잡한 사회적 추론 작업에서는 실패율이 높게 나타났습니다.

## AI 실무자를 위한 시사점
본 벤치마크는 최신 비디오 생성 모델들이 단순한 시각적/물리적 일관성을 넘어 **사회적 지능** 을 통합해야 할 필요성을 명확히 보여줍니다. **훈련-프리 에이전트 기반의 VLM 평가 프레임워크** 는 복잡한 인지적 벤치마킹을 대규모로 자동화할 수 있는 효과적인 방법을 제시하며, 향후 T2V 모델 개발 시 **인간의 의도와 사회적 맥락을 이해하는 메커니즘** 을 설계하는 데 중요한 지침을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.