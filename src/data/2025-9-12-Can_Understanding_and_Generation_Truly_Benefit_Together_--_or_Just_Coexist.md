---
title: "[논문리뷰] Can Understanding and Generation Truly Benefit Together -- or Just
  Coexist?"
excerpt: "Hui Han이 [arXiv]에 게시한 'Can Understanding and Generation Truly Benefit Together -- or Just
  Coexist?' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Understanding
  - Multimodal Generation
  - Unified Models
  - Auto-Encoder
  - Reinforcement Learning
  - Image-to-Text
  - Text-to-Image
  - Reconstruction Fidelity

permalink: /ai/review/2025-9-12-Can_Understanding_and_Generation_Truly_Benefit_Together_--_or_Just_Coexist/

toc: true
toc_sticky: true

date: 2025-09-12 13:12:46+0900
last_modified_at: 2025-09-12 13:12:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.09666)

**저자:** Zhiyuan Yan, Kaiqing Lin, Zongjian Li, Junyan Ye, Hui Han, Zhendong Wang, Hao Liu, Bin Lin, Hao Li, Xue Xu, Xinyan Xiao, Jingdong Wang, Haifeng Wang, Li Yuan



## 핵심 연구 목표
이 논문은 멀티모달 이해(I2T)와 생성(T2I) 간의 근본적인 불일치를 해결하고, 이들이 단순히 공존하는 것을 넘어 진정으로 상호 이점을 얻을 수 있는지 탐구합니다. 저자들은 두 태스크를 통합하는 **단일하고 근본적인 목적 함수**를 제시하여, 상호 보완적인 방식으로 멀티모달 시스템의 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Auto-Encoder** 관점에서 이해를 인코더(I2T), 생성을 디코더(T2I)로 간주하는 **UAE(Unified Auto-Encoder)** 프레임워크를 제안합니다. 통일된 훈련 목표로 **재구성 충실도(reconstruction fidelity)**를 사용하며, 이를 위해 세 단계의 **Unified-GRPO (Group Relative Policy Optimization)** 강화 학습(RL) 방식을 도입합니다. 이는 (1) **콜드-스타트 재구성(Cold-start reconstruction)**으로 모델을 초기화하고, (2) 인코더가 디코더의 재구성 품질을 최대화하는 캡션을 생성하도록 훈련하는 **이해를 위한 생성(Generation for Understanding)**, (3) 디코더가 캡션에서 이미지를 재구성하도록 훈련하는 **생성을 위한 이해(Understanding for Generation)** 단계로 구성됩니다.

## 주요 결과
UAE는 멀티모달 학습에서 놀라운 "아하 모멘트"를 보여주며, RL이 진행됨에 따라 인코더가 자율적으로 더 길고 상세한 캡션을 생성하고 디코더는 이를 놀라운 충실도로 재구성하는 능력을 동시에 향상시켰습니다. **Unified-Bench** 벤치마크에서 UAE는 **86.09%**의 가장 높은 전체 통합 점수를 달성했으며, **GenEval++**와 같은 어려운 합성 제어 벤치마크에서도 **0.475%**로 최고의 성능을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 이 논문을 통해 멀티모달 이해와 생성을 통합하는 새로운 패러다임을 얻을 수 있습니다. 특히, **Auto-Encoder 기반의 단일 재구성 목표**와 **강화 학습(Unified-GRPO)**을 통한 공동 최적화 방식은 복잡한 멀티모달 모델의 훈련 안정성과 성능 향상에 기여할 수 있습니다. **Unified-Bench**는 통합 멀티모달 모델의 실제적인 역량을 평가하는 새로운 표준을 제시하며, 향후 더 응집력 있고 지능적인 멀티모달 시스템 개발을 위한 명확한 방법론을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.