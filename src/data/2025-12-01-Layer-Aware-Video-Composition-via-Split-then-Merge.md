---
title: "[논문리뷰] Layer-Aware Video Composition via Split-then-Merge"
excerpt: "Wen-Sheng Chu이 [arXiv]에 게시한 'Layer-Aware Video Composition via Split-then-Merge' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generative Video Composition
  - Diffusion Models
  - Layer-Aware Generation
  - Self-Composition
  - Affordance Learning
  - Video Editing
  - Data Augmentation

permalink: /ai/review/2025-12-01-Layer-Aware-Video-Composition-via-Split-then-Merge/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.20809)

**저자:** Ozgur Kara, Yujia Chen, Ming-Hsuan Yang, Wen-Sheng Chu, James M. Rehg, Du Tran



## 핵심 연구 목표
본 논문은 생성 비디오 합성에서 제어력을 강화하고 데이터 부족 문제를 해결하는 것을 목표로 합니다. 구체적으로, 동적인 전경 비디오를 새로운 배경 비디오에 통합하여 현실적이고 조화로운 합성 비디오를 생성하는 동시에, 전경의 움직임과 외형을 보존하며 장면에 맞는 배치(affordance-aware placement)를 보장하는 프레임워크를 제안합니다.

## 핵심 방법론
저자들은 **Split-then-Merge (StM)** 라는 새로운 데이터 기반 프레임워크를 제안합니다. 이 방법론은 비디오를 전경 및 배경 레이어로 분리하는 **Decomposer** 와 이를 재구성하여 학습하는 **Composer** 로 구성됩니다. **Decomposer** 는 **InternVL** , **Segment-Any-Motion** , **MiniMax Remover** 와 같은 기성 모델을 활용하여 레이어 분리 및 캡션 생성을 자동화하며, 이를 통해 **StM-50K** 데이터셋을 구축합니다. **Composer** 는 **transformation-aware training pipeline** 을 통해 전경 레이어에 무작위 변환(예: 수평 뒤집기, 크롭, 리사이즈, 색상 지터링)을 적용하여 모델이 단순한 복사-붙여넣기 단축키를 학습하는 것을 방지하고 진정한 어포던스 인식 및 색상 조화를 배우도록 유도합니다. 또한, **identity-preservation loss** ( **Lfinal = aLfg + (1-a)Lbg** )를 도입하여 전경 객체의 정체성 유지와 배경과의 조화로운 통합 사이의 균형을 맞춥니다.

## 주요 결과
정량적 평가에서 StM은 전경( **84.82** ) 및 배경( **92.88** ) 모두에서 가장 높은 **Identity Preservation** 점수를 달성했습니다. 또한, 전경 동작 정렬( **1.22** ) 및 배경 동작 정렬( **16.36** ) 지표에서 모든 베이스라인을 크게 능가했습니다. 사용자 연구 및 **VLLM 기반 평가** 에서도 StM은 모션 및 정체성 보존 관련 지표에서 베이스라인 대비 압도적인 선호도를 보였습니다(예: Copy-Paste+I2V 대비 FG Identity **72.73%** 승률, BG Identity **83.04%** 승률).

## AI 실무자를 위한 시사점
StM은 수동 주석 없이 대규모 비디오 데이터셋에서 직접 학습하여 복잡한 비디오 합성 작업을 수행할 수 있는 확장 가능한 데이터 기반 접근 방식을 제공합니다. 이는 실제 AI 애플리케이션에서 비디오 콘텐츠 생성의 효율성을 높일 수 있습니다. 특히, **transformation-aware training** 과 **identity-preservation loss** 는 생성 모델이 현실적인 상호작용과 조화를 학습하도록 유도하는 중요한 전략으로, 다른 생성 AI 모델 개발에도 활용될 수 있습니다. 또한, **StM-50K** 데이터셋은 다중 레이어 비디오 합성 연구를 위한 귀중한 자원으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.