---
title: "[논문리뷰] Re-Align: Structured Reasoning-guided Alignment for In-Context Image Generation and Editing"
excerpt: "Yu Xu이 arXiv에 게시한 'Re-Align: Structured Reasoning-guided Alignment for In-Context Image Generation and Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - In-Context Image Generation
  - Image Editing
  - Multimodal Models
  - Chain-of-Thought
  - Structured Reasoning
  - Reinforcement Learning
  - Alignment
  - Diffusion Models

permalink: /ai/review/2026-01-09-Re-Align-Structured-Reasoning-guided-Alignment-for-In-Context-Image-Generation-and-Editing/

toc: true
toc_sticky: true

date: 2026-01-09 00:00:00+0900+0900
last_modified_at: 2026-01-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.05124)

**저자:** Runze He, Yiji Cheng, Tiankai Hang, Zhimin Li, Yu Xu, Zijin Yin, Shiyi Zhang, Wenxun Dai, Penghui Du, Ao Ma, Chunyu Wang, Qinglin Lu, Jizhong Han, Jiao Dai



## 핵심 연구 목표
본 논문은 In-Context Image Generation and Editing (ICGE) 태스크에서 사용자의 의도를 정확하게 이해하고 충실하게 실행하는 데 필요한 **정확한 이해 능력과 생성 능력 간의 격차** 를 해소하는 것을 목표로 합니다. 특히, 복잡한 이미지-텍스트 인터리빙 프롬프트 환경에서 모델의 추론 능력과 이미지 생성 결과 간의 **정렬(alignment)을 강화** 하고자 합니다.

## 핵심 방법론
제안된 Re-Align 프레임워크는 **In-Context Chain-of-Thought (IC-CoT)** 라는 구조화된 추론 패러다임을 도입하여 의미론적 안내와 참조 이미지 연관성을 분리합니다. 훈련은 두 단계로 진행되는데, 첫째, IC-CoT 추론에 기반한 이미지 생성을 위한 **감독 학습(SFT)** 을 수행하고, 둘째, **Group Relative Policy Optimization (GRPO)** 를 사용하여 추론-생성 일관성을 강화합니다. 이를 위해 **CLIP 이미지-텍스트 유사도** 를 기반으로 하는 **대리 보상(surrogate reward)** 과 **추론 유도 다양성 전략(Reasoning-Induced Diversity Strategy)** 을 활용하며, 학습을 위해 **Re-Align-410K** 라는 고품질 데이터셋을 구축했습니다.

## 주요 결과
Re-Align은 **OmniContext 벤치마크** 에서 **8.21의 최고 전체 평균 점수** 를 달성하여 기존 경쟁 모델들을 능가했습니다. 특히, MULTIPLE 및 SCENE 태스크에서 최고 성능을 기록했습니다. **DreamOmni2Bench** 에서는 이미지 편집 태스크(Add, Replace, Global, Local) 및 생성 태스크 전반에 걸쳐 지속적으로 높은 **PF(Prompt Following)** 및 **SC(Subject Consistency)** 점수를 얻었으며, 예를 들어 Add 태스크에서 **9.27의 Overall 점수** 를 달성했습니다. 또한, **IC-CoT, 추론-생성 정렬(RGA), 추론 유도 다양성(RID)** 전략이 모델 성능 향상에 기여함을 ablation study를 통해 정량적으로 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 복잡한 멀티모달 이미지 생성 및 편집 태스크에서 **구조화된 추론(IC-CoT)의 중요성** 을 강조하며, AI 실무자들이 더욱 정교한 모델을 개발하는 데 영감을 줄 수 있습니다. **대리 보상을 사용한 강화 학습** 이 추론과 생성 간의 효과적인 정렬을 이끌어낼 수 있음을 보여주어, 보상 모델 설계의 부담을 줄이는 실용적인 접근 방식을 제시합니다. 또한, **고품질의 구조화된 데이터셋** 구축 방법론은 복잡한 멀티모달 태스크를 위한 데이터 준비 전략에 대한 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.