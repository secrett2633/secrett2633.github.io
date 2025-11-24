---
title: "[논문리뷰] When Modalities Conflict: How Unimodal Reasoning Uncertainty Governs
  Preference Dynamics in MLLMs"
excerpt: "Haotian Wang이 [arXiv]에 게시한 'When Modalities Conflict: How Unimodal Reasoning Uncertainty Governs
  Preference Dynamics in MLLMs' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Modality Following
  - Unimodal Uncertainty
  - Modality Preference
  - Conflict Resolution
  - Internal Mechanism
  - Entropy
  - Controllable Dataset

permalink: /ai/review/2025-11-5-When-Modalities-Conflict-How-Unimodal-Reasoning-Uncertainty-Governs-Preference-Dynamics-in-MLLMs/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.02243)

**저자:** Zhuoran Zhang, Tengyue Wang, Xilin Gong, Yang Shi, Haotian Wang, Di Wang, Lijie Hu



## 핵심 연구 목표
이 논문은 Multimodal Large Language Models (MLLMs)가 서로 다른 모달리티에서 모순되는 정보를 받았을 때 어떤 모달리티를 따를지 (**modality following**) 결정하는 과정을 이해하는 것을 목표로 합니다. 기존 연구가 모델의 단일 모달리티 추론 불확실성(confidence)을 간과하고 거시적인 데이터셋 수준 통계에만 의존했던 한계를 극복하고, 모델의 결정이 **상대적 추론 불확실성(relative reasoning uncertainty)**과 **고유한 모달리티 선호도(inherent modality preference)**라는 두 가지 기본 요소에 의해 어떻게 동적으로 결정되는지 설명하고자 합니다.

## 핵심 방법론
연구진은 **시각 및 텍스트 입력의 추론 난이도를 독립적으로 조작**할 수 있는 **새로운 제어 가능 데이터셋**을 구축했습니다. 모델의 인지된 불확실성을 정량화하기 위해 답변 토큰의 **출력 엔트로피(output entropy)**를 세분화된 불확실성 지표로 사용했으며, **상대적 단일 모달리티 불확실성 (ΔHrel)**을 정의하여 각 사례별 확신도 차이를 측정했습니다. 또한, **LogitLens-style 기법**을 활용하여 모델의 **레이어별 예측**을 추적하고, 모호한 시나리오에서 발생하는 **내부 oscillation**을 분석했습니다.

## 주요 결과
모델이 특정 모달리티를 따를 확률이 해당 모달리티의 **상대적 불확실성이 증가함에 따라 단조롭게 감소**한다는 보편적인 법칙을 발견했습니다. 모델의 **고유한 모달리티 선호도**는 이 곡선에서 **0.5 확률 선과 교차하는 '균형점(balance point)'**으로 정량화될 수 있음을 보였습니다. **LLaVA-1.6-7B 모델**의 경우, 모호한 영역에서의 oscillation 횟수(**1.43**)가 명확한 영역(**0.71**)의 거의 두 배에 달하는 것으로 나타나, 모호한 상황에서 모델이 내부적으로 망설임을 겪음을 입증했습니다.

## AI 실무자를 위한 시사점
MLLM 개발자들은 모델의 최종 결정이 **단순한 데이터셋 편향이 아닌, 입력의 상대적 불확실성과 모델의 고유한 선호도에 따라 동적으로 변한다**는 점을 이해할 수 있습니다. **'균형점'**이라는 새로운 지표를 통해 모델의 내재적 편향을 더 정확하게 측정하고, 기존의 거시적 지표(**TFR/VFR**)가 가려왔던 모델의 역량과 선호도를 분리하여 분석할 수 있습니다. 이는 모순되는 정보 해결 과정에서 **모델의 신뢰성 및 해석 가능성**을 향상시키는 데 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.