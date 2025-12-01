---
title: "[논문리뷰] UniVid: Unifying Vision Tasks with Pre-trained Video Generation Models"
excerpt: "Yuchao Gu이 [arXiv]에 게시한 'UniVid: Unifying Vision Tasks with Pre-trained Video Generation Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Unified Vision Modeling
  - Video Generation
  - Diffusion Transformer
  - Supervised Fine-tuning
  - Cross-modal
  - Cross-source Tasks
  - Visual Sentences
  - LoRA

permalink: /ai/review/2025-9-29-UniVid-Unifying-Vision-Tasks-with-Pre-trained-Video-Generation-Models/

toc: true
toc_sticky: true

date: 2025-09-29 13:47:46+0900
last_modified_at: 2025-09-29 13:47:46+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.21760)

**저자:** Lan Chen, Yuchao Gu, Qi Mao



## 핵심 연구 목표
기존 Large Vision Models (LVMs)이 태스크 및 모달리티별 사전 훈련 데이터에 대한 높은 의존성으로 인해 확장성이 제한되는 문제를 해결하고자 합니다. 이 연구는 **사전 훈련된 단일 비디오 생성 모델** 이 광범위한 이미지 및 비디오 태스크에 효율적으로 적응하여 비전 모델링을 통합할 수 있는지 탐구하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 사전 훈련된 **비디오 Diffusion Transformer (DiT)** 인 **Wan model [28]** 을 백본으로 사용하는 **UniVid 프레임워크** 를 제안합니다. 태스크는 **시각적 문장(visual sentences)** 형식(예: A → A' → B → B')으로 표현되며, 여기서 문맥(A, A', B)이 태스크와 예상 출력 모달리티를 정의합니다. 효율적인 미세 조정을 위해 **Low-Rank Adaptation (LoRA) 모듈** 이 사용되었고, 모델은 **교차-모달** 및 **교차-소스** 시나리오에서의 일반화 능력을 평가받았습니다.

## 주요 결과
UniVid는 자연 비디오 데이터로만 사전 훈련되었음에도 불구하고, **교차-모달 및 교차-소스 태스크** 모두에서 뛰어난 일반화 성능을 보였습니다. 특히 **LVM [1]** 과 비교하여 깊이 추정 태스크에서 **RMSE 0.27** 을 달성해 LVM의 **0.53** 보다 우수했으며, 의미론적 분할에서는 **mIoU 8.712** 로 LVM의 **1.423** 을 크게 상회했습니다. 또한, 시각적 문장 요소의 순서를 변경하는 것만으로 **이해 및 생성 태스크 간의 원활한 전환** 이 가능함을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **사전 훈련된 비디오 생성 모델** 이 광범위한 비전 태스크를 위한 **통합되고 확장 가능한 백본** 이 될 수 있음을 보여주며, 이는 복잡한 데이터 큐레이션 및 태스크별 모델 개발 비용을 크게 절감할 수 있습니다. **시각적 문장 패러다임** 은 AI 시스템에서 다양한 비전 태스크를 유연하게 통합하고 상호 전환하는 새로운 접근 방식을 제공하여, **다목적 비전 AI 개발** 에 중요한 기초를 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.