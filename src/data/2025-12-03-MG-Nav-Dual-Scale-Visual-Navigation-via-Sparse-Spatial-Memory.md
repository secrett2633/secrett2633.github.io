---
title: "[논문리뷰] MG-Nav: Dual-Scale Visual Navigation via Sparse Spatial Memory"
excerpt: "이 [arXiv]에 게시한 'MG-Nav: Dual-Scale Visual Navigation via Sparse Spatial Memory' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Navigation
  - Dual-Scale Framework
  - Sparse Spatial Memory Graph
  - Memory-Guided Planning
  - Geometry-Enhanced Control
  - Zero-Shot Navigation
  - Embodied AI

permalink: /ai/review/2025-12-03-MG-Nav-Dual-Scale-Visual-Navigation-via-Sparse-Spatial-Memory/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.22609)

**저자:** Bo Wang, Jiehong Lin, Chenzhi Liu, Xinting Hu, Yifei Yu, Tianjia Liu, Zhongrui Wang, Xiaojuan Qi



## 핵심 연구 목표
이 논문은 동적이고 이전에 본 적 없는 환경에서 **강건한 제로샷 시각 내비게이션(zero-shot visual navigation)** 을 달성하는 것을 목표로 합니다. 특히, 조밀한 3D 재구성(dense 3D reconstruction) 없이도 효율적으로 작동하며, 긴 탐색 경로와 시각적 목표 정렬의 어려움을 극복하고 동적 환경 변화에 강건한 내비게이션 시스템을 구축하고자 합니다.

## 핵심 방법론
제안된 **MG-Nav** 는 **글로벌 계획(global planning)** 과 **로컬 제어(local control)** 를 통합하는 **듀얼 스케일 프레임워크** 입니다. 글로벌 레벨에서는 압축된 영역 중심 메모리인 **Sparse Spatial Memory Graph (SMG)** 를 사용하여 노드 레벨 경로를 계획하고, 로컬 레벨에서는 사전 훈련된 내비게이션 파운데이션 정책에 **VGGT-adapter** 를 통합하여 기하학적 특징을 강화하여 장애물 회피 및 목표 인식을 개선합니다. 글로벌 계획과 로컬 제어는 다른 빈도로 작동하며 주기적인 재-지역화(re-localization)를 통해 오류를 보정합니다.

## 주요 결과
**HM3D Instance-Image-Goal** 벤치마크에서 **SR 78.5% 및 SPL 59.3%** 를, **MP3D Image-Goal** 벤치마크에서 **SR 83.8% 및 SPL 57.1%** 를 달성하며 기존 최첨단 방법론을 뛰어넘었습니다. 또한, 새로운 장애물이 삽입된 동적 환경에서도 **MG-Nav** 는 성능 저하가 미미하여 **강력한 강건성** 을 입증했습니다.

## AI 실무자를 위한 시사점
**MG-Nav** 는 조밀한 3D 맵에 의존하지 않고 **스파스 메모리 기반의 장거리 계획** 과 **기하학적 정보가 강화된 로컬 제어** 를 결합하여 로봇 내비게이션 분야에 새로운 접근 방식을 제시합니다. 이는 로봇 배송 및 AR/VR과 같은 실제 응용 분야에서 **효율적이고 강건한 자율 내비게이션 시스템** 을 구축하는 데 기여할 수 있으며, 특히 자원 제약이 있는 환경에서의 배포 가능성을 높입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.