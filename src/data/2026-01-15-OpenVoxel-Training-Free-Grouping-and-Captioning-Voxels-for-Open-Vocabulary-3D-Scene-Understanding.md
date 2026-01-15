---
title: "[논문리뷰] OpenVoxel: Training-Free Grouping and Captioning Voxels for Open-Vocabulary 3D Scene Understanding"
excerpt: "이 [arXiv]에 게시한 'OpenVoxel: Training-Free Grouping and Captioning Voxels for Open-Vocabulary 3D Scene Understanding' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Scene Understanding
  - Open-Vocabulary Segmentation
  - Referring Expression Segmentation
  - Training-Free
  - Voxel Grouping
  - Vision-Language Models
  - Multi-modal Large Language Models
  - Sparse Voxel Rasterization

permalink: /ai/review/2026-01-15-OpenVoxel-Training-Free-Grouping-and-Captioning-Voxels-for-Open-Vocabulary-3D-Scene-Understanding/

toc: true
toc_sticky: true

date: 2026-01-15 00:00:00+0900+0900
last_modified_at: 2026-01-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.09575)

**저자:** Sheng-Yu Huang, Jaesung Choe, Frank Wang, Cheng Sun



## 핵심 연구 목표
기존 3D 장면 이해 방법론들이 훈련된 임베딩과 대규모 수동 주석, 긴 훈련 시간에 의존하는 한계를 극복하고자 합니다. OpenVoxel은 훈련 없이 희소 복셀을 그룹화하고 캡셔닝하여 오픈-vocabulary 3D 장면 이해 태스크를 수행하며, 특히 복잡한 자연어 질의에 효과적으로 대응하는 것을 목표로 합니다.

## 핵심 방법론
OpenVoxel은 다중 뷰 이미지에서 학습된 **Sparse Voxel Rasterization (SVR)** 모델을 기반으로 합니다. **Training-Free Sparse Voxel Grouping** 은 **SAM2** 에서 얻은 2D 분할 마스크를 3D로 리프팅 및 매칭하여 복셀을 객체 수준 그룹으로 클러스터링합니다. 이후 **Canonical Scene Map Construction** 은 **Describe Anything Model (DAM)** 및 **Qwen3-VL** 과 같은 **Vision Language Models (VLMs)** 및 **Multi-modal Large Language Models (MLLMs)** 를 활용하여 각 그룹에 대한 풍부하고 구조화된 캡션을 생성합니다. 마지막으로 **Referring Query Inference** 단계에서 MLLM을 통한 직접적인 텍스트-투-텍스트 검색으로 질의에 해당하는 3D 객체를 식별합니다.

## 주요 결과
Ref-LeRF 데이터셋의 **Referring Expression Segmentation (RES)** 태스크에서 **42.4%의 mIoU** 를 달성하여 기존 **ReferSplat* (재현된 24.5%) ** 대비 ** 17.9% ** 향상된 성능을 보였습니다. LeRF-OVS 데이터셋의 ** Open-Vocabulary Segmentation (OVS) ** 태스크에서는 ** 66.2%의 mIoU **로 ** CCL-LGS (65.1%) **를 포함한 최신 방법론과 비교하여 경쟁력 있는 성능을 입증했습니다. 또한, ** RTX 5090 GPU **에서 복셀 그룹화 및 장면 맵 구성에 ** 약 3분 **이 소요되어 다른 SOTA 방법론보다 ** 최소 10배 ** 이상 빠릅니다.

## AI 실무자를 위한 시사점
OpenVoxel은 ** 훈련 없이 ** 3D 장면 이해를 가능하게 하여, ** 새로운 환경이나 객체에 대한 신속한 적응 **이 필요한 실제 AI 애플리케이션에 매우 실용적입니다. ** MLLM 기반의 직접적인 텍스트-투-텍스트 검색 **은 기존의 고차원 임베딩 학습의 한계를 극복하고 복잡한 자연어 질의에 강력한 성능을 제공합니다. 이는 ** SAM2, DAM, Qwen3-VL **과 같은 기존 파운데이션 모델들을 효과적으로 통합하여 ** 자원 효율적인 AI 시스템 구축**에 기여할 수 있음을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.