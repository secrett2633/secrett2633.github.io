---
title: "[논문리뷰] Deforming Videos to Masks: Flow Matching for Referring Video
  Segmentation"
excerpt: "Chengzu Li이 arXiv에 게시한 'Deforming Videos to Masks: Flow Matching for Referring Video
  Segmentation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Referring Video Object Segmentation
  - Flow Matching
  - Video Segmentation
  - Generative Models
  - Text-to-Video
  - Continuous Flow
  - Diffusion Models

permalink: /ai/review/2025-10-8-Deforming-Videos-to-Masks-Flow-Matching-for-Referring-Video-Segmentation/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.06139)

**저자:** Zanyi Wang, Dengyang Jiang, Liuzhuozheng Li, Sizhe Dang, Chengzu Li, Harry Yang, Guang Dai, Mengmeng Wang, Jingdong Wang



## 핵심 연구 목표
기존 **Referring Video Object Segmentation (RVOS)** 패러다임인 'locate-then-segment' 방식이 정보 병목 현상과 시간적 일관성 부족으로 복잡한 언어 및 동적 비디오 처리에 한계를 보이는 문제를 해결하는 것입니다. 논문은 **RVOS** 를 비디오의 전체적 표현에서 타겟 마스크로의 **언어 유도형 연속적 변형 과정(continuous flow problem)** 으로 재정의하여 이러한 근본적인 한계를 극복하는 것을 목표로 합니다.

## 핵심 방법론
논문은 **FlowRVS** 라는 새로운 프레임워크를 제안하며, **RVOS** 를 텍스트 조건부 연속 흐름 학습 문제로 재개념화합니다. 이를 위해 **사전 훈련된 T2V 모델(Wan 2.1 1.3B Diffusion Transformer)** 을 활용하고, **Flow Matching** 을 통해 비디오 잠재 표현을 타겟 마스크로 변형시키는 속도장(velocity field)을 학습합니다. 또한, 흐름의 시작점을 강화하기 위한 **Boundary-Biased Sampling (BBS)** , **Start-Point Augmentation (SPA)** , **Direct Video Injection (DVI)** 와 같은 원칙적인 기법들을 통합하여 안정적이고 효율적인 학습을 가능하게 합니다.

## 주요 결과
**FlowRVS** 는 모든 주요 **RVOS** 벤치마크에서 새로운 **최첨단(SOTA)** 성능을 달성했습니다. 특히, **MeViS** 데이터셋에서 **J&F 51.1** 를 기록하여 이전 **SOTA** 대비 **1.6** 포인트 향상, 그리고 **Ref-DAVIS17** 데이터셋의 제로샷 평가에서 **J&F 73.3** 를 달성하여 **2.7** 포인트 향상을 보였습니다. **Boundary-Biased Sampling (p=0.5)** 은 기준선 대비 **10.0 J&F** 포인트 향상을, **Direct Video Injection (DVI)** 은 **2.0 J&F** 포인트 추가 개선을 기여했습니다.

## AI 실무자를 위한 시사점
**FlowRVS** 는 **Referring Video Object Segmentation (RVOS)** 문제를 **연속적인 변형 과정** 으로 재해석하여, 복잡한 언어와 동적 비디오 데이터를 통합적으로 처리하는 새로운 패러다임을 제시합니다. **사전 훈련된 T2V 모델** 의 강력한 기능을 **Flow Matching** 기법과 결합하여 **RVOS** 성능을 획기적으로 향상시킬 수 있는 실용적인 방법을 제공하며, **Boundary-Biased Sampling (BBS)** 과 같은 특정 최적화 전략이 **생성 모델을 판별 태스크에 성공적으로 전이** 하는 데 중요함을 보여줍니다. 이는 **멀티모달 비디오 이해 태스크** 에 대한 새로운 접근 방식을 탐구하는 데 중요한 통찰력을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.