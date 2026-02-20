---
title: "[논문리뷰] WorldGen: From Text to Traversable and Interactive 3D Worlds"
excerpt: "arXiv에 게시된 'WorldGen: From Text to Traversable and Interactive 3D Worlds' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D World Generation
  - Text-to-3D
  - Generative AI
  - Procedural Generation
  - Scene Decomposition
  - Navmesh
  - Game Engines
  - Interactive Environments

permalink: /ai/review/2025-11-24-WorldGen-From-Text-to-Traversable-and-Interactive-3D-Worlds/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.16825)

**저자:** Dilin Wang, Hyunyoung Jung, Tom Monnier, Kihyuk Sohn, Chuhang Zou, Xiaoyu Xiang, Yu-Ying Yeh, Di Liu, Zixuan Huang, Thu Nguyen-Phuoc, Yuchen Fan, Sergiu Oprea, Ziyan Wang, Roman Shapovalov, Nikolaos Sarafianos, Thibault Groueix, Antoine Toisoul, Prithviraj Dhar, Xiao Chu, Minghao Chen, Geon Yeong Park, Mahima Gupta, Yassir Azziz, Rakesh Ranjan, Andrea Vedaldi



## 핵심 연구 목표
본 논문은 텍스트 프롬프트로부터 대규모의 인터랙티브 3D 월드를 자동으로 생성하는 시스템 **WorldGen** 을 소개합니다. 기존의 수동 모델링이나 전문 지식 없이도 창의적인 의도를 traversable하고 완전히 텍스처링된 가상 공간으로 변환하여 표준 게임 엔진에서 즉시 탐색하거나 편집할 수 있도록 하는 것을 목표로 합니다.

## 핵심 방법론
**WorldGen** 은 네 가지 주요 단계로 구성됩니다. 첫째, **Scene Planning** 단계에서는 **LLM** 이 텍스트 프롬프트를 **JSON 파라미터** 로 변환하여 **절차적 생성기** 를 통해 **3D 블록아웃(B)** , **레퍼런스 이미지(R)** , **내비메시(S)** 를 생성합니다. 둘째, **Scene Reconstruction** 단계에서는 **Navmesh 조건부 이미지-3D 생성 모델(AssetGen2 확장)** 을 사용하여 전체 장면을 나타내는 단일의 텍스처링된 **메쉬(M)** 를 만듭니다. 셋째, **Scene Decomposition** 단계에서는 **AutoPartGen 변형 모델** 로 메쉬(M)를 개별 3D 객체로 분해하여 효율적인 처리를 가능하게 합니다. 마지막으로, **Scene Enhancement** 단계에서는 **LLM-VLM** 으로 각 객체에 대한 고해상도 이미지를 생성하고, **Mesh Refinement Model** 과 **Meta 3D TextureGen** 을 통해 고품질의 지오메트리 및 텍스처를 구현합니다.

## 주요 결과
**WorldGen** 은 내비게이션이 가능하며 게임 엔진에 바로 적용할 수 있는 3D 장면을 성공적으로 생성했습니다. 내비메시 정렬에 대한 정량적 평가에서 기존 베이스라인 모델 대비 **40-50% 낮은 Chamfer 거리** 를 달성했으며, 특히 "Ours" 모델은 **0.022** 를 기록했습니다. 장면 분해에서는 **AutoPartGen** 대비 F-score@0.05에서 **0.853** 이라는 높은 성능을 보였고, 추론 시간을 10분에서 **약 1분** 으로 단축시켰습니다. 전체 파이프라인은 약 **5분** 만에 완전히 텍스처링된 3D 장면을 완성합니다.

## AI 실무자를 위한 시사점
**WorldGen** 은 **LLM 기반의 지능형 레이아웃 계획** 과 **Navmesh 제약 조건** 을 통해 기능적이고 탐색 가능한 3D 세계를 생성하는 새로운 패러다임을 제시합니다. **모듈형 파이프라인 설계** 는 각 구성 요소를 독립적으로 개선할 수 있는 유연성을 제공하며, **객체별 분해 및 고해상도 향상** 은 생성된 에셋의 재사용성과 편집 용이성을 극대화합니다. 하지만 현재는 단일 뷰 기반 조건화로 인해 대규모 오픈 월드 생성에 한계가 있으며, 향후 **지오메트리 및 텍스처 재사용 전략** 을 통해 확장성과 런타임 성능 개선이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.