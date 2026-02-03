---
title: "[논문리뷰] Making Avatars Interact: Towards Text-Driven Human-Object Interaction for Controllable Talking Avatars"
excerpt: "Teng Hu이 [arXiv]에 게시한 'Making Avatars Interact: Towards Text-Driven Human-Object Interaction for Controllable Talking Avatars' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Talking Avatars
  - Human-Object Interaction (HOI)
  - Text-Driven Generation
  - Diffusion Models
  - Multimodal Control
  - Grounded Interaction

permalink: /ai/review/2026-02-03-Making-Avatars-Interact-Towards-Text-Driven-Human-Object-Interaction-for-Controllable-Talking-Avatars/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.01538)

**저자:** Teng Hu, Ziyao Huang, Zhentao Yu, Zhengguang Zhou, youliang1233214



## 핵심 연구 목표
본 논문은 기존 토킹 아바타 기술의 한계인 환경 인지 및 텍스트 기반 객체 상호작용 능력 부재 문제를 해결하고자 합니다. 특히, 아바타가 주변 객체와 상황에 맞게 텍스트 지시에 따라 상호작용하는 **Grounded Human-Object Interaction (GHOI)** 생성을 목표로 하며, 이는 **장면-액션 그라운딩** 및 **제어-품질 딜레마** 를 극복하는 데 중점을 둡니다.

## 핵심 방법론
저자들은 **InteractAvatar** 라는 새로운 듀얼 스트림 **Diffusion Transformer (DiT)** 프레임워크를 제안합니다. 이 프레임워크는 **Perception and Interaction Module (PIM)** 을 통해 참조 이미지의 환경 인식을 바탕으로 텍스트에 정렬된 모션 시퀀스를 생성하고, **Audio-Interaction Aware Generation Module (AIM)** 을 통해 이를 기반으로 생생한 비디오를 합성합니다. 특히, **PIM** 과 **AIM** 은 **Motion-to-Video (M2V) Aligner** 를 통해 구조적 모션과 비디오 생성 간의 일관성을 보장하며, **Flow Matching 패러다임** 을 사용하여 학습됩니다.

## 주요 결과
**GroundedInter** 라는 새로운 벤치마크를 구축하여 GHOI 비디오 생성의 정량적 평가를 가능하게 했습니다. 제안된 **InteractAvatar** 의 **TA2V** 변형은 기존 오디오 기반 방법론인 **Wan-S2V** 대비 **Hand Quality (HQ)** 에서 약 **180%** , **Object Quality (OQ)** 에서 약 **111%** 향상된 성능을 보였습니다. 또한, **UniAnimate-DiT** 와 같은 포즈 기반 모델을 포함한 모든 비교 대상 방법을 능가하며, 사용자 연구에서도 높은 상호작용 품질 선호도를 얻었습니다.

## AI 실무자를 위한 시사점
**Grounded Human-Object Interaction (GHOI)** 은 텍스트 프롬프트만으로 환경에 기반한 객체 상호작용을 수행하는 아바타 생성의 새로운 가능성을 제시합니다. **PIM** 과 **AIM** 으로 구성된 듀얼 스트림 아키텍처는 인식/계획과 비디오 합성을 명시적으로 분리하여, 복잡한 다중 모달 AI 시스템에서 제어력과 시각적 품질 간의 트레이드오프를 효과적으로 관리하는 방법론을 제공합니다. 구축된 **GroundedInter 벤치마크** 는 향후 GHOI 연구의 표준 평가 도구로 활용될 수 있어, 관련 AI 모델 개발 및 평가에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.