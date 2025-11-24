---
title: "[논문리뷰] Scaling Instruction-Based Video Editing with a High-Quality Synthetic
  Dataset"
excerpt: "Hao Ouyang이 [arXiv]에 게시한 'Scaling Instruction-Based Video Editing with a High-Quality Synthetic
  Dataset' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Editing
  - Instruction-Based Editing
  - Synthetic Data Generation
  - Dataset
  - Curriculum Learning
  - Diffusion Models
  - Vision-Language Models

permalink: /ai/review/2025-10-20-Scaling-Instruction-Based-Video-Editing-with-a-High-Quality-Synthetic-Dataset/

toc: true
toc_sticky: true

date: 2025-10-20 13:04:24+0900
last_modified_at: 2025-10-20 13:04:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.15742)

**저자:** Qingyan Bai, Qiuyu Wang, Hao Ouyang, Yue Yu, Hanlin Wang, Wen Wang, Ka Leong Cheng, Shuailei Ma, Yanhong Zeng, Zichen Liu, Yinghao Xu, Yujun Shen, Qifeng Chen



## 핵심 연구 목표
지시 기반 비디오 편집의 발전을 저해하는 **대규모 고품질 학습 데이터의 부족 문제**를 해결하는 것이 목표입니다. 기존 데이터 생성 파이프라인의 제한된 확장성, 낮은 품질, 일관성 부족 등의 한계를 극복하고, 다양한 편집 작업에 대한 정확하고 일관된 편집 능력을 갖춘 모델 훈련을 위한 데이터셋과 방법론을 제시합니다.

## 핵심 방법론
논문은 데이터 합성을 위한 **Ditto** 프레임워크를 제안하며, 이는 **최첨단 이미지 편집기**의 창의적 다양성과 **인컨텍스트 비디오 생성기**를 결합한 파이프라인을 특징으로 합니다. 효율성을 위해 **정량화 및 지식 증류된 모델 아키텍처**와 **시간 일관성 강화기**를 사용하며, **자율적인 Vision-Language Model(VLM) 에이전트**가 다양한 지시를 생성하고 품질을 제어합니다. 최종 모델인 **Editto**는 **Ditto-1M** 데이터셋과 **모달리티 커리큘럼 학습 전략**으로 훈련되었습니다.

## 주요 결과
**Ditto** 프레임워크를 통해 **100만 개 이상의 고품질 비디오 편집 예제**를 포함하는 **Ditto-1M** 데이터셋을 구축했습니다. **Editto 모델**은 기존 방식 대비 자동 평가 지표에서 **CLIP-T↑ 25.54**, **CLIP-F↑ 99.03**, **VLM ↑ 8.10**의 최고 성능을 달성했으며, 사용자 연구에서도 **Edit-Acc↑ 3.85**, **Temp-Con↑ 3.76**, **Overall↑ 3.86**으로 모든 기준에서 우수함을 보였습니다.

## AI 실무자를 위한 시사점
**Ditto-1M** 데이터셋은 지시 기반 비디오 편집 모델 개발을 위한 **매우 가치 있는 자원**을 제공하며, **Ditto** 프레임워크는 다른 데이터 부족 생성 AI 분야에도 적용 가능한 **확장 가능한 합성 데이터 생성 패러다임**을 제시합니다. **모달리티 커리큘럼 학습 전략**은 다중 모달리티 조건부 모델을 텍스트 기반 단일 모달리티 제어로 전환하는 데 효과적인 방법론으로, 실제 응용에서 유연성을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.