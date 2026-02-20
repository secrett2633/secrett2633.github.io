---
title: "[논문리뷰] Unified Reinforcement and Imitation Learning for Vision-Language Models"
excerpt: "arXiv에 게시된 'Unified Reinforcement and Imitation Learning for Vision-Language Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Reinforcement Learning
  - Imitation Learning
  - Model Distillation
  - Lightweight VLMs
  - LLM-as-a-Judge
  - Multimodal Learning

permalink: /ai/review/2025-10-23-Unified-Reinforcement-and-Imitation-Learning-for-Vision-Language-Models/

toc: true
toc_sticky: true

date: 2025-10-23 13:08:59+0900
last_modified_at: 2025-10-23 13:08:59+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.19307)

**저자:** Byung-Kwan Lee, Ryo Hachiuma, Yu-Chiang Frank Wang, Yong Man Ro, Yueh-Hua Wu



## 핵심 연구 목표
본 논문은 대규모 **Vision-Language Models (VLMs)** 의 비효율성을 해결하기 위해, 리소스가 제한된 환경에서도 강력하고 경량화된 VLM을 구축하는 효율적인 훈련 알고리즘 **Unified Reinforcement and Imitation Learning (RIL)** 을 제안합니다. 작은 학생 VLM이 큰 교사 모델의 정교한 텍스트 생성 능력을 모방하고 강화 학습 신호를 통해 생성 능력을 체계적으로 향상시키는 것을 목표로 합니다.

## 핵심 방법론
**RIL** 은 **강화 학습 (Dr.GRPO)** 과 **적대적 모방 학습 (GAIL)** 의 강점을 결합한 통합 학습 프레임워크를 사용합니다. 핵심은 학생 모델과 교사 모델의 출력을 능숙하게 구별하는 **LLM 기반 Discriminator** 와, 다양하고 풍부한 학습을 위해 **다중 대형 교사 VLM** 으로부터의 지도를 활용하는 것입니다. 보상 시스템은 Discriminator에서 오는 **유사성 보상** 과 **LLM-as-a-Judge** 에서 오는 **정확도 보상** 을 결합하여 학생 모델을 효과적으로 안내합니다.

## 주요 결과
**RIL** 은 다양한 비전-언어 벤치마크에서 상당한 성능 향상을 시연했습니다. 예를 들어, **Qwen2.5-VL-7B** 모델은 **14개 벤치마크 평균 성능** 에서 **RL (Dr.GRPO)** 대비 **3.9%p 증가** 한 **74.2%** 를 달성했으며, 특히 **MathVista** 에서는 **5%p 이상** 성능이 향상되었습니다. **다중 교사 VLM** 을 사용했을 때 **단일 교사** 보다 더욱 우수한 성능을 보여, SOTA 오픈 소스 및 클로즈드 소스 VLM과의 성능 격차를 크게 줄이거나 여러 경우에서 능가했습니다.

## AI 실무자를 위한 시사점
**RIL** 은 경량화된 VLM을 구축하여 **모바일 및 임베디드 장치** 와 같은 리소스 제약이 있는 환경에 배포할 수 있는 실용적인 솔루션을 제공합니다. **LLM-as-a-Judge** 를 활용한 보상 시스템은 기존의 제한적인 파싱 방식의 한계를 넘어 **다양하고 개방형 질문** 에 대한 평가에 유연성을 제공합니다. 또한, **다양한 대규모 교사 모델** 의 활용이 학생 VLM의 일반화 능력과 성능을 크게 향상시킬 수 있음을 보여주어 효율적인 모델 구축 전략에 대한 인사이트를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.