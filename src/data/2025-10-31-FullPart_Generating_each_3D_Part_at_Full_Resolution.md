---
title: "[논문리뷰] FullPart: Generating each 3D Part at Full Resolution"
excerpt: "Chenjian Gao이 [arXiv]에 게시한 'FullPart: Generating each 3D Part at Full Resolution' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Part Generation
  - Full Resolution
  - Implicit Representation
  - Explicit Representation
  - Voxel Grid
  - Diffusion Models
  - PartVerse-XL
  - Center-Corner Encoding

permalink: /ai/review/2025-10-31-FullPart_Generating_each_3D_Part_at_Full_Resolution/

toc: true
toc_sticky: true

date: 2025-10-31 18:37:31+0900
last_modified_at: 2025-10-31 18:37:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26140)

**저자:** Lihe Ding, Shaocong Dong, Yaokun Li, Chenjian Gao, Xiao Chen, Rui Han, Yihao Kuang, Hong Zhang, Bo Huang, Zhanpeng Huang, Zibin Wang, Dan Xu, Tianfan Xue



## 핵심 연구 목표
기존 파트 기반 3D 생성 모델의 한계점인 불충분한 기하학적 디테일(implicit 방식)과 작은 파트의 해상도 저하(explicit global voxel grid 방식)를 극복하고, 각 3D 파트를 **전체 해상도**로 상세하게 생성하며 전역적인 일관성을 유지하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 세 단계의 프레임워크인 **FullPart**를 제안합니다. 첫째, **implicit vecset diffusion**을 통해 바운딩 박스 레이아웃을 생성합니다. 둘째, 각 파트를 **고유한 고해상도 (64x64x64) voxel grid**에서 **explicit representation**으로 디테일한 구조를 생성하며, 이때 **center-corner encoding** 전략을 사용하여 다양한 크기의 파트 간 정렬 불일치를 해결합니다. 마지막으로, 생성된 조악한 파트 구조를 텍스처 메시로 정제합니다.

## 주요 결과
**FullPart**는 PartVerse-XL 테스트 세트에서 **0.81 F-Score**, **0.11 CD**, **0.24 ULIP-Score**를 달성하여 기존 **PartCrafter**, **Omnipart**, **TRELLIS**, **Direct3D-S2**와 같은 SOTA 모델들을 뛰어넘는 성능을 보였습니다. 특히, **PartVerse-XL**은 40K 객체와 320K 파트를 포함하는 가장 큰 규모의 인간 주석 3D 파트 데이터셋으로 소개되었습니다.

## AI 실무자를 위한 시사점
**FullPart**는 고품질의 편집 가능한 3D 콘텐츠 생성에 있어 해상도 병목 현상을 해결하는 실용적인 프레임워크를 제공합니다. 또한, 공개 예정인 **PartVerse-XL** 데이터셋은 향후 파트 기반 3D 생성 모델 연구 및 훈련을 위한 중요한 자원이 될 것입니다. **center-corner encoding** 전략은 다중 스케일 파트 상호작용을 다루는 데 유용한 기법으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.