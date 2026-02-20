---
title: "[논문리뷰] OmniTransfer: All-in-one Framework for Spatio-temporal Video Transfer"
excerpt: "arXiv에 게시된 'OmniTransfer: All-in-one Framework for Spatio-temporal Video Transfer' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Transfer
  - Diffusion Models
  - Spatio-temporal Learning
  - Multimodal Alignment
  - Appearance Consistency
  - Temporal Control
  - Video Generation

permalink: /ai/review/2026-01-21-OmniTransfer-All-in-one-Framework-for-Spatio-temporal-Video-Transfer/

toc: true
toc_sticky: true

date: 2026-01-21 00:00:00+0900+0900
last_modified_at: 2026-01-21 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.14250)

**저자:** Pengze Zhang, Yanze Wu, Mengtian Li, Xu Bai, Songtao Zhao, Fulong Ye, Chong Mou, Xinghui Li, Zhuowei Chen, Qian He, Mingyuan Gao



## 핵심 연구 목표
기존 비디오 커스터마이징 방법론들이 레퍼런스 비디오의 풍부한 시공간 정보를 충분히 활용하지 못하여, 유연성과 일반화가 제한되는 문제를 해결하고자 합니다. 본 논문은 **OmniTransfer** 라는 통일된 프레임워크를 제안하여 ID, 스타일, 모션, 카메라 움직임, 이펙트 등 다양한 비디오 전송 작업을 단일 모델로 수행하며, 높은 충실도와 일관성을 목표로 합니다.

## 핵심 방법론
**Wan2.1 I2V 14B** 확산 모델을 기반으로 하는 **OmniTransfer** 는 세 가지 핵심 설계 요소를 통합합니다. 첫째, **Task-aware Positional Bias (TPB)** 를 통해 레퍼런스 비디오 정보를 시공간적으로 유연하게 조정하여 태스크별 정렬 및 일관성을 향상시킵니다. 둘째, **Reference-decoupled Causal Learning (RCL)** 은 레퍼런스 및 타겟 브랜치를 분리하여 효율적인 단방향 전송을 가능하게 하고, 계산 시간을 **20% 감소** 시킵니다. 셋째, **Task-adaptive Multimodal Alignment (TMA)** 는 **Qwen-2.5-VL MLLM** 과 **MetaQueries** 를 활용하여 태스크별 의미론적 지침과 정렬을 강화합니다.

## 주요 결과
**OmniTransfer** 는 외형(ID 및 스타일) 및 시간(카메라 움직임, 효과) 전송에서 기존 방법보다 우수한 성능을 보입니다. 특히, ID 전송에서 VSim-Glint **0.51** , 스타일 전송에서 VCSD **0.51** , 카메라 움직임 전송 사용자 연구에서 Camera Fidelity **4.19** 를 달성했습니다. 또한, 포즈 정보를 사용하지 않고도 모션 전송에서 포즈 기반 방법론과 동등한 성능을 보이며, 기준 모델 대비 런타임을 **20% 절감** 하는 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
**OmniTransfer** 는 다양한 비디오 커스터마이징 태스크를 하나의 프레임워크로 통합하여 AI 개발자들이 여러 전문 모델을 관리할 필요 없이 유연한 비디오 생성 파이프라인을 구축할 수 있도록 합니다. **20%의 런타임 감소** 는 실시간 또는 대규모 비디오 처리 애플리케이션에 매우 유리하며, 포즈와 같은 명시적인 사전 정보 없이도 복잡한 시공간적 속성을 전송하는 능력은 실제 환경에서의 적용 가능성을 크게 확장시킵니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.