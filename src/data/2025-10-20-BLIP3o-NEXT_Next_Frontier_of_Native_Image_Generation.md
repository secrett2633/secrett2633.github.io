---
title: "[논문리뷰] BLIP3o-NEXT: Next Frontier of Native Image Generation"
excerpt: "이 [arXiv]에 게시한 'BLIP3o-NEXT: Next Frontier of Native Image Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Generation
  - Image Editing
  - Autoregressive Model
  - Diffusion Model
  - Reinforcement Learning
  - Multimodal AI
  - Foundation Model
  - Open-source

permalink: /ai/review/2025-10-20-BLIP3o-NEXT_Next_Frontier_of_Native_Image_Generation/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15857)

**저자:** Jiuhai Chen, Le Xue, Zhiyang Xu, Xichen Pan, Shusheng Yang, Can Qin, An Yan, Honglu Zhou, Zeyuan Chen, Lifu Huang, Tianyi Zhou, Silvio Savarese, Caiming Xiong, Ran Xu



## 핵심 연구 목표
본 논문은 **BLIP3o-NEXT**라는 오픈소스 기반 모델을 제안하여 차세대 이미지 생성의 발전을 목표로 합니다. 단일 아키텍처 내에서 **텍스트-투-이미지 생성**과 **이미지 편집** 기능을 통합하고, 강력한 이미지 생성 및 편집 능력을 시연하는 것을 주된 목표로 합니다.

## 핵심 방법론
BLIP3o-NEXT는 **Autoregressive (AR) + Diffusion 하이브리드 아키텍처**를 채택합니다. 여기서 AR 모델은 멀티모달 입력에 따라 **이산 이미지 토큰**을 생성하고, 이 토큰의 히든 스테이트는 확산 모델의 컨디셔닝 신호로 사용되어 고품질 이미지를 합성합니다. 특히, **GRPO (Group Relative Policy Optimization)** 알고리즘을 활용한 **강화 학습**을 AR 모델에 적용하여 텍스트 렌더링 품질과 지시 따르기 능력을 향상시켰으며, 이미지 편집 시에는 **VAE 특징**을 **크로스-어텐션 입력** 및 **노이즈-공간 주입** 방식으로 통합하여 일관성을 강화했습니다.

## 주요 결과
BLIP3o-NEXT는 다양한 벤치마크에서 뛰어난 성능을 보였습니다. **GenEval 벤치마크**에서 **BLIP3o-NEXT-GRPO-GenEval (3B)** 모델은 "Overall" 스코어 **0.91**을 달성하여 기존 FLUX.1-dev (0.82), Qwen-Image (0.87), BAGEL (0.88) 등 다수의 선행 모델을 능가했습니다. **ImgEdit 벤치마크**에서는 "Overall" 스코어 **3.62**를 기록하며 BAGEL (3.25) 및 OmniGen2 (3.44)와 비슷한 성능을 보였습니다.

## AI 실무자를 위한 시사점
**단일 아키텍처로 이미지 생성 및 편집을 통합**함으로써 AI 개발의 효율성을 높이고 다양한 응용 분야에 대한 유연한 기반을 제공합니다. **강화 학습**의 성공적인 적용은 이미지 생성 모델의 지시 따르기 능력과 텍스트 렌더링 품질을 크게 개선할 수 있음을 보여주며, 고품질 데이터와 체계적인 데이터 엔지니어링이 모델 성능의 상한선을 결정하는 중요 요인임을 강조합니다. 또한, **오픈소스 모델, 데이터셋, 코드 공개**는 관련 연구 및 상용 개발에 큰 기여를 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.