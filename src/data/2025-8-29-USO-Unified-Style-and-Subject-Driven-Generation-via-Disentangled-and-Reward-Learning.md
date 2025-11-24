---
title: "[논문리뷰] USO: Unified Style and Subject-Driven Generation via Disentangled and
  Reward Learning"
excerpt: "Jiahe Tian이 [arXiv]에 게시한 'USO: Unified Style and Subject-Driven Generation via Disentangled and
  Reward Learning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Style-Driven Generation
  - Subject-Driven Generation
  - Disentangled Representation
  - Reward Learning
  - Cross-Task Learning
  - Diffusion Models
  - Image Customization
  - Unified Framework

permalink: /ai/review/2025-8-29-USO-Unified-Style-and-Subject-Driven-Generation-via-Disentangled-and-Reward-Learning/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18966)

**저자:** Shaojin Wu, Mengqi Huang, Yufeng Cheng, Wenxu Wu, Jiahe Tian, Yiming Luo, Fei Ding, Qian He



## 핵심 연구 목표
본 논문은 스타일 기반 생성(style-driven generation)과 주제 기반 생성(subject-driven generation)이 기존에 별개의 태스크로 다뤄져 상충되는 문제를 해결하고자 합니다. 궁극적으로 콘텐츠와 스타일의 효과적인 **분리(disentanglement)**와 **재구성(re-composition)**을 통해 두 태스크를 단일 프레임워크 내에서 통합하고 상호 보완적으로 성능을 향상시키는 것을 목표로 합니다.

## 핵심 방법론
제안된 **USO(Unified Style-Subject Optimized)** 모델은 **교차 태스크 삼중항(cross-task triplet)** 데이터셋 구축과 **분리 학습(disentangled learning)** 방식을 활용합니다. 특히, **SigLIP** 및 **계층적 프로젝터(Hierarchical Projector)**를 사용한 **스타일 정렬 훈련(Style Alignment Training)**으로 스타일 특징을 정렬하고, **VAE 인코더**를 통한 **콘텐츠-스타일 분리 훈련(Content-Style Disentanglement Training)**으로 콘텐츠를 스타일로부터 분리합니다. 또한, **스타일 보상 학습(Style Reward Learning, SRL)** 패러다임을 도입하여 **VLM 기반 필터** 또는 **CSD 모델 MRM(·)**을 통해 스타일 유사성 보상 신호를 사용하여 모델 성능을 강화합니다.

## 주요 결과
**USO-Bench** 및 **DreamBench** 벤치마크에서 광범위한 실험을 통해 최첨단 성능을 달성했습니다. 주제 기반 생성에서는 **CLIP-I 0.623**, **DINO 0.793**를 기록하며 최고 성능을 보였고, 스타일 기반 생성에서는 **CSD 0.557**, **CLIP-T 0.282**로 가장 높은 점수를 얻었습니다. 결합된 스타일-주제 기반 생성에서도 **CSD 0.495**와 **CLIP-T 0.283**를 달성하여 우수한 주제 일관성, 스타일 충실도 및 텍스트 제어 가능성을 입증했습니다.

## AI 실무자를 위한 시사점
USO는 스타일 기반 및 주제 기반 이미지 생성 태스크를 단일 모델로 통합하여 AI/ML 엔지니어가 **더욱 유연하고 제어 가능한 생성 AI 시스템**을 구축할 수 있는 기반을 제공합니다. 특히 **교차 태스크 분리 학습**과 **보상 학습** 접근 방식은 복잡한 다중 속성 이미지 생성 문제에서 성능 향상을 위한 중요한 방법론적 통찰을 제공합니다. 새로운 벤치마크인 **USO-Bench**는 관련 연구 개발에 중요한 평가 도구로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.