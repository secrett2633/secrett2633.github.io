---
title: "[논문리뷰] Diffusion Knows Transparency: Repurposing Video Diffusion for Transparent Object Depth and Normal Estimation"
excerpt: "arXiv에 게시된 'Diffusion Knows Transparency: Repurposing Video Diffusion for Transparent Object Depth and Normal Estimation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Diffusion Model
  - Depth Estimation
  - Normal Estimation
  - Transparent Objects
  - Robotics
  - Data Generation
  - LoRA Fine-tuning

permalink: /ai/review/2025-12-30-Diffusion-Knows-Transparency-Repurposing-Video-Diffusion-for-Transparent-Object-Depth-and-Normal-Estimation/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.23705)

**저자:** Shaocong Xu, Songlin Wei, Qizhe Wei, Zheng Geng, Hong Li, Licheng Shen, Qianpu Sun, Shu Han, Bin Ma, Bohan Li, Chongjie Ye, Yuhang Zheng, Nan Wang, Saining Zhang, Hao Zhao



## 핵심 연구 목표
본 논문은 투명하거나 반사되는 객체에 대한 깊이 및 법선 추정의 고질적인 문제를 해결하고자 합니다. 기존 방식의 시간적 불일치성과 제한된 데이터로 인한 일반화 능력 부족을 극복하고, 현대 **비디오 확산 모델(Video Diffusion Model)** 이 내재적으로 학습한 광학 규칙을 활용하여 **강력하고 시간적으로 일관된** 예측을 제공하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 먼저 1.32M 프레임 규모의 새로운 합성 비디오 데이터셋 **TransPhy3D** 를 구축했습니다. 이를 바탕으로 대규모 **비디오 확산 모델(WAN [14])** 을 기반으로 하는 **DKT(Diffusion Knows Transparency)** 모델을 개발했습니다. 이 모델은 **LoRA(Low-Rank Adaptation) 어댑터** 를 사용하여 RGB 및 노이즈 깊이 잠재 공간을 **DiT(Diffusion Transformer) 백본** 에 연결하고, **TransPhy3D** 와 기존 프레임 단위 데이터셋을 **결합 학습(co-training)** 하여 깊이 및 법선 추정 성능을 최적화합니다.

## 주요 결과
**DKT** 는 **ClearPose** , **DREDS (CatKnown/CatNovel)** , **TransPhy3D-Test** 등 실제 및 합성 비디오 벤치마크에서 **제로샷 SOTA 성능** 을 달성했습니다. 특히 **ClearPose** 깊이 추정에서 **REL 9.72↓** , **δ1.05 38.17↑** , **δ1.10 65.50↑** , **δ1.25 93.04↑** 를 기록하며 우수성을 보였습니다. 또한, **DKT-Normal** 은 **ClearPose** 에서 최고의 비디오 법선 추정 결과를 설정했으며, **1.3B 버전** 은 832x480 해상도에서 **프레임당 0.17초** 의 빠른 속도를 보여줍니다. 로봇 그립핑 실험에서는 투명, 반사, 확산 표면 전반에 걸쳐 이전 추정기보다 성공률을 향상시켰습니다.

## AI 실무자를 위한 시사점
**생성형 비디오 모델** 이 투명 객체의 물리적 특성을 효과적으로 이해하고 있음을 보여주어, 복잡한 물리 기반 렌더링 없이도 현실적인 비전 태스크를 해결할 수 있는 새로운 가능성을 제시합니다. **LoRA 어댑터** 와 **합성 데이터셋** 을 활용한 효율적인 학습 전략은 AI 엔지니어에게 시간적 일관성과 일반화 능력이 중요한 로봇 조작과 같은 실시간 응용 분야에서 **비용 효율적인 솔루션** 을 제공할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.