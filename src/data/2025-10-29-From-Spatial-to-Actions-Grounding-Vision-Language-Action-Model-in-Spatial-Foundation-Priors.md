---
title: "[논문리뷰] From Spatial to Actions: Grounding Vision-Language-Action Model in
  Spatial Foundation Priors"
excerpt: "이 [arXiv]에 게시한 'From Spatial to Actions: Grounding Vision-Language-Action Model in
  Spatial Foundation Priors' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA)
  - 3D Spatial Reasoning
  - Embodied AI
  - Foundation Models
  - Multimodal Fusion
  - Robot Manipulation
  - Modality Transferability
  - Action Grounding

permalink: /ai/review/2025-10-29-From-Spatial-to-Actions-Grounding-Vision-Language-Action-Model-in-Spatial-Foundation-Priors/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.17439)

**저자:** Zhengshen Zhang, Hao Li, Yalun Dai, Zhengbang Zhu, Lei Zhou, Chenchen Liu, Dong Wang, Francis E. H. Tay, Sijin Chen, Ziwei Liu, Yuxiao Liu, Xinghang Li, Pan Zhou



## 핵심 연구 목표
기존 Vision-Language-Action (VLA) 모델이 **2D 인코더** 에 의존하여 3D 물리 세계에서 공간 추론 능력이 부족하다는 문제를 해결하고자 합니다. 이는 일반화 및 적응성을 제한하며, 특수 센서 요구 사항, 모달리티 전이성 부족, 또는 Vision-Language Model (VLM) 정렬 손상과 같은 기존 3D 통합 방법의 한계를 극복하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 `FALCON (From Spatial to Action)`이라는 새로운 패러다임을 제안합니다. 이는 **2D VLM** , **Embodied Spatial Model (ESM)** , 그리고 **Spatial-Enhanced Action Head** 로 구성됩니다. **ESM** 은 RGB 이미지에서 강력한 기하학적 사전 지식을 제공하며, 필요에 따라 **깊이 정보** 나 **카메라 포즈** 를 아키텍처 변경 없이 유연하게 통합할 수 있습니다. 특히, 공간 토큰(`Tspl`)은 **Spatial-Enhanced Action Head** 에서 **element-wise addition** 방식을 통해 액션 결정에 직접 통합되어 VLM의 언어 추론을 보존하고 의미론적 정렬을 유지합니다.

## 주요 결과
`FALCON`은 CALVIN, SimplerEnv 시뮬레이션 벤치마크 및 11가지 실제 환경 작업에서 **최첨단 성능** 을 달성했습니다. CALVIN 벤치마크에서 **ABCD→D 태스크 완료율 97.2%** , **ABC→D 태스크 완료율 98.4%** 를 기록하며 기존 **RoboVLM** 모델을 능가했습니다. SimplerEnv에서 **평균 성공률 56.3%** , Google Robot 태스크에서 **62.9%** 를 달성하여 경쟁사 모델들을 일관되게 앞섰습니다. 또한, **어수선한 환경** , **공간 프롬프트 조건 부여** , **객체 스케일 및 높이 변화** 에 대한 강력한 견고성을 입증했습니다.

## AI 실무자를 위한 시사점
`FALCON`은 로봇이 자연어 지시를 해석하고 복잡한 동작 시퀀스를 실행하는 데 필요한 **3D 공간 이해 능력** 을 획기적으로 향상시켰습니다. **RGB-only** 입력으로도 효과적으로 작동하며, **깊이 센서** 와 같은 추가 3D 모달리티를 유연하게 활용할 수 있어 다양한 실제 로봇 애플리케이션에 대한 **강력한 모달리티 전이성** 을 제공합니다. 이는 특히 **정밀한 조작** 이나 **복잡한 공간 추론** 이 요구되는 작업에서 로봇 정책의 견고성과 일반화 가능성을 크게 개선할 수 있는 실용적인 가치를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.