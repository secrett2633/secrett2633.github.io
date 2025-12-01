---
title: "[논문리뷰] Adversarial Video Promotion Against Text-to-Video Retrieval"
excerpt: "Shuai Liu이 [arXiv]에 게시한 'Adversarial Video Promotion Against Text-to-Video Retrieval' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Adversarial Attack
  - Video Promotion
  - Text-to-Video Retrieval
  - Modality Refinement
  - Black-box Attack
  - Video Manipulation
  - Transferability

permalink: /ai/review/2025-8-13-Adversarial-Video-Promotion-Against-Text-to-Video-Retrieval/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.06964)

**저자:** Qiwei Tian, Chenhao Lin, Zhengyu Zhao, Shuai Liu, Qian Li, Chao Shen



## 핵심 연구 목표
본 논문은 텍스트-비디오 검색(T2VR) 모델의 간과된 취약점인 **적대적 비디오 프로모션 공격** 을 탐구합니다. 기존 공격이 비디오 순위를 하락시키는 데 초점을 맞춘 것과 달리, 재정적 이득이나 허위 정보 확산을 위해 특정 쿼리에 대한 비디오 순위를 **상위로 끌어올리는** 공격의 위험성을 조명하고 이를 선제적으로 방어하기 위한 연구를 수행합니다.

## 핵심 방법론
비디오를 적대적으로 프로모션하는 첫 공격인 **Video Promotion attack (ViPro)** 을 제안합니다. 특히, **블랙박스 전이성** 을 강화하기 위해 **Modality Refinement (MoRe)** 기법을 도입했습니다. **MoRe** 는 **Temporal Clipping** 으로 비디오 프레임을 클립으로 그룹화하고, **Semantical Weighting** 을 통해 프레임-프레임 및 프레임-쿼리 유사성을 기반으로 **미세한 그래디언트 최적화** 를 유도합니다. 손실 함수로는 **지수 손실 (Lexp)** 을 사용하여 다중 타겟 최적화를 효과적으로 수행합니다.

## 주요 결과
**ViPro** 는 기존 베이스라인인 **Co-Attack** 및 **SGA** 대비 **화이트/그레이/블랙박스** 설정에서 평균 **30/10/4%** 이상 우수한 성능을 보였습니다. 특히 **ActivityNet** 데이터셋에서는 R@1에서 **Co-Attack** 및 **SGA** 대비 약 **43/38%** 높은 성과를 달성했습니다. **MoRe** 는 블랙박스 전이성을 크게 향상시켰으며, **JPEG 압축** 및 **Temporal Shuffling** 과 같은 방어 기법 하에서도 **ViPro** 의 우월한 강건성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 T2VR 시스템에 대한 **새로운 유형의 적대적 위협** 을 제시하여 AI 보안의 중요성을 강조합니다. AI/ML 엔지니어는 T2VR 모델 설계 시 **비디오 프로모션 공격** 을 방어하기 위한 **강건성** 을 필수적으로 고려해야 합니다. **Modality Refinement (MoRe)** 와 같은 기법은 **크로스모달 모델의 전이성 공격** 에 대한 통찰을 제공하므로, 효과적인 **방어 메커니즘** 구축에 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.