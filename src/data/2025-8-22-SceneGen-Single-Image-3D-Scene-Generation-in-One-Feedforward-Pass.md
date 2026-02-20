---
title: "[논문리뷰] SceneGen: Single-Image 3D Scene Generation in One Feedforward Pass"
excerpt: "Ya Zhang이 arXiv에 게시한 'SceneGen: Single-Image 3D Scene Generation in One Feedforward Pass' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Scene Generation
  - Single-Image Input
  - Feedforward Networks
  - Diffusion Models
  - Geometric Modeling
  - Texture Synthesis
  - Transformer
  - Feature Aggregation

permalink: /ai/review/2025-8-22-SceneGen-Single-Image-3D-Scene-Generation-in-One-Feedforward-Pass/

toc: true
toc_sticky: true

date: 2025-08-22 13:10:52+0900
last_modified_at: 2025-08-22 13:10:52+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.15769)

**저자:** Yanxu Meng*, Haoning Wu*, Ya Zhang, Weidi Xie†



## 핵심 연구 목표
본 논문의 핵심 목표는 단일 장면 이미지와 객체 마스크를 입력으로 받아, 최적화나 에셋 검색 과정 없이 **하나의 피드포워드 패스** 만으로 다수의 3D 에셋(기하학적 구조, 텍스처, 공간 배치 포함)을 동시에 효율적으로 생성하는 것입니다. 이는 VR/AR 및 embodied AI와 같은 분야에서 3D 콘텐츠 생성의 효율성과 품질을 크게 향상시키는 것을 목표로 합니다.

## 핵심 방법론
SceneGen은 입력 이미지와 객체 마스크로부터 시각적 인코더( **DINOv2** ) 및 기하학적 인코더( **VGGT** )를 통해 로컬 및 글로벌 특징을 추출합니다. 이 특징들은 **M개의 DiT 블록** 으로 구성된 **특징 통합 모듈(feature aggregation module)** 에서 로컬 및 글로벌 어텐션 메커니즘을 통해 통합됩니다. 최종적으로, **위치 헤드(position head)** 와 **sparse structure (SS) 및 structured latents (SLAT) 디코더** 를 사용하여 3D 에셋의 기하학적 구조, 텍스처, 그리고 상대적 공간 위치를 생성합니다.

## 주요 결과
SceneGen은 **3D-FUTURE 테스트 세트** 에서 기존 방법론들을 크게 능가했습니다. 기하학적 품질에서 **씬-레벨 F-Score 90.60** 과 **볼륨 IoU-B 0.5818** 을 달성하여 **MIDI 모델의 F-Score 68.74, IoU-B 0.2493** 대비 우수함을 보였습니다. 시각적 품질에서도 더 높은 **CLIP-S 유사성(0.9152)** 을 기록했으며, 단일 **A100 GPU** 에서 4개의 에셋을 포함하는 3D 장면을 **2분 이내** 에 생성하는 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
SceneGen은 **단일 피드포워드 패스** 로 고품질의 3D 장면을 빠르게 생성할 수 있어, VR/AR 및 메타버스 환경과 같이 즉각적인 3D 콘텐츠가 필요한 애플리케이션에 매우 유용합니다. 학습 데이터 없이도 **다중 이미지 입력** 에 확장 가능한 아키텍처는 실제 환경에서의 유연성과 강건성을 제공하며, **사전 훈련된 파운데이션 모델(DINOv2, VGGT)** 의 활용은 개발 복잡성을 줄이고 모델 통합을 용이하게 합니다. 하지만 현재 모델은 **비-실내 장면** 과 **정확한 객체 접촉 관계** 처리에는 한계가 있어 특정 도메인에 초점을 맞출 필요가 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.