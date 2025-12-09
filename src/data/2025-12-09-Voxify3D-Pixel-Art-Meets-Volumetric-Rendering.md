---
title: "[논문리뷰] Voxify3D: Pixel Art Meets Volumetric Rendering"
excerpt: "Yu-Lun Liu이 [arXiv]에 게시한 'Voxify3D: Pixel Art Meets Volumetric Rendering' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Voxel Art
  - Volumetric Rendering
  - 3D Stylization
  - Neural Radiance Fields
  - Discrete Optimization
  - Gumbel-Softmax
  - CLIP Loss

permalink: /ai/review/2025-12-09-Voxify3D-Pixel-Art-Meets-Volumetric-Rendering/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07834)

**저자:** Yi-Chuan Huang, Jiewen Chan, Hao-Jen Chien, Yu-Lun Liu



## 핵심 연구 목표
3D 메시에서 고품질 복셀 아트를 자동 생성하는 과정에서 발생하는 기하학적 추상화, 의미 보존, 그리고 이산적인 색상 일관성 간의 상충하는 요구사항을 해결하는 것이 목표입니다. 기존 방법들은 기하학적 구조를 과도하게 단순화하거나 픽셀 단위의 정밀하고 팔레트 제약적인 복셀 아트 미학을 달성하지 못하는 한계가 있습니다.

## 핵심 방법론
본 논문은 3D 메시를 양식화된 복셀 아트로 변환하기 위한 2단계 프레임워크인 **Voxify3D** 를 제안합니다. 첫 번째 단계에서는 **DVGO** 를 사용하여 거친 복셀 기하학 및 색상 기반을 구축하고, 두 번째 단계에서는 6개의 **직교 뷰 렌더링** 을 통한 2D 픽셀 아트 감독으로 이를 세밀하게 조정합니다. 주요 혁신은 픽셀-복셀 정렬을 위한 **직교 픽셀 아트 감독** , 이산화 수준 전반의 의미 보존을 위한 **패치 기반 CLIP 정렬** , 그리고 제어 가능한 팔레트 전략을 통한 미분 가능한 이산 색상 최적화를 위한 **팔레트 제약 Gumbel-Softmax 양자화** 를 포함합니다.

## 주요 결과
본 방법론은 다양한 캐릭터와 2-8가지 색상, 20x-50x 해상도와 같은 제어 가능한 추상화 수준에서 우수한 성능을 입증했습니다. 정량적 평가에서 **37.12 CLIP-IQA 점수** 를 달성하여 기존 baseline들을 능가했습니다. 사용자 연구에서는 추상화 디테일에 대해 **77.90%** , 시각적 매력에 대해 **80.36%** , 기하학적 충실도에 대해 **96.55%** 의 선호도를 보였습니다. 특히, **Gumbel-Softmax** 를 사용한 결과가 복셀 아트의 시각적 매력에서 **88.89%** 의 선호도를 얻어 지배적인 색조와 선명한 가장자리를 생성하는 데 중요함이 확인되었습니다.

## AI 실무자를 위한 시사점
**Voxify3D** 는 3D 메시를 양식화된 복셀 아트로 효과적으로 변환하는 강력한 프레임워크를 제공하여 게임 개발, 디지털 미디어 및 가상 현실 콘텐츠 제작 분야에 유용합니다. **직교 렌더링** 과 **패치 기반 CLIP 손실** 의 도입은 3D 양식화에서 흔히 발생하는 기하학적 왜곡과 의미 보존 문제를 해결하는 데 실용적인 해결책을 제시합니다. 또한, **Gumbel-Softmax 양자화** 를 통한 미분 가능한 이산 최적화는 특정 미학적 요구 사항을 가진 아티스트와 개발자에게 정밀한 제어력을 부여하며, **LEGO 스타일** 조립과 같은 다양한 응용 분야로 확장될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.