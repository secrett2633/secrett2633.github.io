---
title: "[논문리뷰] Click2Graph: Interactive Panoptic Video Scene Graphs from a Single Click"
excerpt: "이 [arXiv]에 게시한 'Click2Graph: Interactive Panoptic Video Scene Graphs from a Single Click' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Panoptic Video Scene Graph Generation
  - Interactive AI
  - User Guidance
  - Promptable Segmentation
  - Video Understanding
  - Relational Reasoning
  - Human-in-the-Loop

permalink: /ai/review/2025-12-03-Click2Graph-Interactive-Panoptic-Video-Scene-Graphs-from-a-Single-Click/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.15948)

**저자:** Raphael Ruschel, Hardikkumar Prajapati, Md Awsafur Rahman, B. S. Manjunath



## 핵심 연구 목표
기존 Video Scene Graph Generation (VSGG) 및 Panoptic Video Scene Graph (PVSG) 시스템의 폐쇄적인 특성과, **SAM/SAM2** 와 같은 프롬프트 기반 분할 모델이 의미론적 또는 관계적 추론 기능을 결여하고 있다는 한계를 해결하고자 합니다. 단일 사용자 프롬프트로부터 **시공간적, 의미적 이해를 통합** 하는 최초의 대화형 PVSG 프레임워크인 **Click2Graph** 를 개발하는 것이 목표입니다.

## 핵심 방법론
**SAM2** 모델을 백본으로 활용하여 프롬프트 기반 비디오 분할 및 마스크 전파를 수행합니다. 상호작용 객체를 자율적으로 발견하기 위해 주체 조건부 객체 프롬프트를 생성하는 **Dynamic Interaction Discovery Module (DIDM)** 을 도입하고, 발견된 세그먼트에 대해 주체, 객체, 술어 레이블을 공동으로 추론하는 **Semantic Classification Head (SCH)** 를 추가합니다. 모델은 **Lmask** , **LL2** , **Lsub** , **Lobj** , **Lrel** 을 포함하는 다중 작업 손실 함수로 학습됩니다.

## 주요 결과
**OpenPVSG 벤치마크** 에서 평가되었으며, 기존 자동화된 PVSG 방법론 대비 경쟁력 있는 **R@K 점수** 를 달성했습니다 (예: **R@20 2.23** ). 이는 사용자 안내 추론이 검색 공간을 줄이면서도 강력한 의미론적 정렬을 유지함을 보여줍니다. **DIDM** 은 휴리스틱 방법 대비 **PLR, SpIR, R@K** 성능을 크게 향상시켰으며 (예: Epic K 데이터셋에서 **R@3 0.62** 에서 **2.08** 로 증가), **~10 FPS** 의 추론 속도를 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 **Click2Graph** 를 통해 복잡하거나 안전에 민감한 환경에서 **제어 가능하고 해석 가능한 비디오 이해 시스템** 을 구축할 수 있습니다. 이는 사용자가 개입하여 모델의 오류를 수정하거나 특정 객체에 대한 주의를 지시할 수 있는 새로운 패러다임을 제시합니다. 향후 **LLM 통합** 이나 **실시간 피드백 메커니즘** 을 통해 시스템의 유연성과 적응성을 더욱 높일 수 있는 잠재력을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.