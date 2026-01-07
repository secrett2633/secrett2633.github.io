---
title: "[논문리뷰] FFP-300K: Scaling First-Frame Propagation for Generalizable Video Editing"
excerpt: "Peng Tang이 [arXiv]에 게시한 'FFP-300K: Scaling First-Frame Propagation for Generalizable Video Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Editing
  - First-Frame Propagation (FFP)
  - Large-Scale Dataset
  - Generative Models
  - Temporal Consistency
  - Spatio-Temporal RoPE
  - Self-Distillation

permalink: /ai/review/2026-01-07-FFP-300K-Scaling-First-Frame-Propagation-for-Generalizable-Video-Editing/

toc: true
toc_sticky: true

date: 2026-01-07 00:00:00+0900+0900
last_modified_at: 2026-01-07 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.01720)

**저자:** Xijie Huang, Chengming Xu, Donghao Luo, Xiaobin Hu, Peng Tang



## 핵심 연구 목표
본 논문은 제어 가능한 비디오 편집 패러다임인 **First-Frame Propagation (FFP)** 의 주요 한계를 해결하고자 합니다. 특히 기존 FFP 방법론이 겪는 **번거로운 런타임 가이드** 에 대한 의존성과 **불충분한 훈련 데이터셋** 으로 인한 일반화 능력 부족 문제를 극복하고, 첫 프레임의 시각적 일관성과 원본 비디오의 움직임 유지 사이의 균형을 효과적으로 맞추는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 먼저 **300K개** 의 고품질 비디오 쌍으로 구성된 대규모 데이터셋인 **FFP-300K** 를 도입했습니다. 이 데이터셋은 **720p 해상도** 와 **81프레임** 길이로, 로컬 편집 및 전역 스타일 변환을 위한 **두 트랙 생성 파이프라인** 을 통해 구축되었습니다. 이를 기반으로, 첫 프레임 외형 유지와 원본 비디오 모션 보존의 균형을 맞추기 위해 **Adaptive Spatio-Temporal ROPE (AST-ROPE)** 아키텍처와 **자기-증류(self-distillation) 훈련 전략** 을 포함하는 새로운 프레임워크를 제안했습니다.

## 주요 결과
제안된 프레임워크는 **EditVerseBench** 벤치마크에서 기존 학술 및 상업 모델 대비 뛰어난 성능을 보였습니다. 특히 **Ours-81f** 모델은 **0.991 CLIP 점수** 와 **0.991 DINO 점수** 로 최고 수준의 시간적 일관성을 달성했으며, **25.925** 의 비디오 수준 텍스트 정렬 점수를 기록했습니다. 또한 **Ours-33f** 모델은 **20.419 PickScore** 와 **7.631 VLM Score** 로 탁월한 인지 품질과 의미론적 정확성을 입증했습니다.

## AI 실무자를 위한 시사점
**FFP-300K 데이터셋** 은 고해상도, 긴 길이, 다양한 작업 유형을 포함하여 일반화 가능한 FFP 모델 훈련을 위한 중요한 자원을 제공합니다. 이는 **런타임 가이드** 에 대한 의존성을 줄여 비디오 편집 워크플로우를 간소화할 수 있는 잠재력을 가집니다. **AST-ROPE** 와 **자기-증류 전략** 은 비디오 편집에서 높은 충실도와 시간적 일관성을 달성하는 데 기여하며, 이는 보다 자율적이고 신뢰할 수 있는 비디오 편집 시스템 개발에 실질적인 영향을 미칠 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.