---
title: "[논문리뷰] How Confident are Video Models? Empowering Video Models to Express their
  Uncertainty"
excerpt: "Anirudha Majumdar이 arXiv에 게시한 'How Confident are Video Models? Empowering Video Models to Express their
  Uncertainty' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Uncertainty Quantification
  - Aleatoric Uncertainty
  - Epistemic Uncertainty
  - Model Calibration
  - Text-to-Video
  - Generative AI
  - VMF Distribution

permalink: /ai/review/2025-10-6-How-Confident-are-Video-Models-Empowering-Video-Models-to-Express-their-Uncertainty/

toc: true
toc_sticky: true

date: 2025-10-06 13:29:11+0900
last_modified_at: 2025-10-06 13:29:11+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.02571)

**저자:** Zhiting Mei, Ola Shorinwa, Anirudha Majumdar



## 핵심 연구 목표
비디오 생성 모델이 텍스트 프롬프트에 기반하여 부정확하거나 사실과 다른(hallucinate) 비디오를 생성할 때, 그 예측에 대한 불확실성을 표현하지 못하는 문제를 해결하는 것을 목표로 합니다. 이는 비디오 모델의 안전성과 신뢰성을 높이기 위해, 모델이 자신의 예측에 대해 얼마나 확신하는지 정량적으로 표현할 수 있도록 하는 프레임워크를 제시하는 것입니다.

## 핵심 방법론
본 논문은 비디오 모델의 불확실성을 정량화하기 위한 **S-QUBED** (Semantically-Quantifying Uncertainty with Bayesian Entropy Decomposition)라는 방법론을 제안합니다. 이는 **잠재 공간 모델링** 을 활용하여 예측 불확실성을 프롬프트의 모호성에서 기인하는 **aleatoric uncertainty** 와 모델의 지식 부족에서 기인하는 **epistemic uncertainty** 로 분리합니다. 특히, **Von-Mises Fisher (VMF) 분포** 를 사용하여 잠재 변수 분포를 모델링하며, 불확실성 추정의 보정을 평가하기 위해 **Kendall rank correlation** 과 **CLIP score** 를 사용합니다.

## 주요 결과
**S-QUBED** 는 벤치마크 비디오 데이터셋인 **Panda-70M** 과 **VidGen-1M** 에서 **CLIP score** 를 기준으로 총 불확실성과 예측 정확도 사이에 통계적으로 유의미한 음의 상관관계(Panda-70M에서 **99% 신뢰 수준** , VidGen-1M에서 **89.9% 신뢰 수준** )를 보였습니다. 또한, **S-QUBED** 는 aleatoric uncertainty와 epistemic uncertainty를 효과적으로 분해하며, 각각 예측 정확도와 유의미한 음의 상관관계를 가짐을 ( **Panda-70M에서 94.5% 및 98.3% 신뢰 수준** ) 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 생성형 비디오 모델의 신뢰성을 향상시키는 데 필수적인 불확실성 정량화(UQ) 프레임워크를 제공합니다. **S-QUBED** 는 모델의 출력 진단을 가능하게 하여, 부정확한 생성이 사용자의 프롬프트 모호성 때문인지 또는 모델 자체의 지식 부족 때문인지 파악하는 데 도움을 줍니다. 이는 안전이 중요한 비디오 생성 애플리케이션 개발에 중요한 지침이 될 것이며, **UQ 벤치마킹 데이터셋** 은 향후 연구의 기반을 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.