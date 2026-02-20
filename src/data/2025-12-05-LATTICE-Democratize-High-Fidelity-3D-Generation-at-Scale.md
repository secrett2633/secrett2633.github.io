---
title: "[논문리뷰] LATTICE: Democratize High-Fidelity 3D Generation at Scale"
excerpt: "Qingxiang Lin이 arXiv에 게시한 'LATTICE: Democratize High-Fidelity 3D Generation at Scale' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Generation
  - High-Fidelity
  - Latent Representation
  - Voxel Grid
  - Diffusion Models
  - Transformer
  - Scalable AI
  - Asset Creation

permalink: /ai/review/2025-12-05-LATTICE-Democratize-High-Fidelity-3D-Generation-at-Scale/

toc: true
toc_sticky: true

date: 2025-12-05 00:00:00+0900+0900
last_modified_at: 2025-12-05 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.03052)

**저자:** Zeqiang Lai, Yunfei Zhao, Zibo Zhao, Haolin Liu, Qingxiang Lin, Jingwei Huang, Chunchao Guo, Xiangyu Yue



## 핵심 연구 목표
본 논문은 고품질 3D 에셋 생성에 있어 3D 및 2D 생성 모델 간의 품질과 확장성 격차를 해소하는 것을 목표로 합니다. 특히, 3D 생성 과정의 높은 계산 복잡성과 효율적인 에셋 인코딩 방식 부재로 인해 발생하는 한계를 극복하고, 모델 확장성 및 성능 향상을 위한 효과적인 3D 표현을 정의하고자 합니다.

## 핵심 방법론
저자들은 효율성과 구조적 잠재 공간을 결합한 **VoxSet** 이라는 새로운 **세미-구조화된 잠재 표현(semi-structured latent representation)** 을 제안합니다. **LATTICE** 는 먼저 **기존 모델(예: Hunyuan3D-2)에서 생성된 coarse mesh를 복셀화** 하여 희소 복셀 그리드를 생성하고, 그 후 **rectified flow transformer** 를 사용하여 이 그리드 내에서 상세한 기하학적 **VoxSets** 를 생성하는 **2단계 파이프라인** 을 사용합니다. 특히, **로터리 위치 임베딩(RoPE)** 을 통해 복셀 그리드에 앵커링된 잠재 공간에 위치 정보를 주입하여 Diffusion Transformer의 생성 과정을 효과적으로 안내합니다.

## 주요 결과
**LATTICE** 는 **4.5B 파라미터** 까지 확장 가능한 모델로, **6144 토큰** 으로 훈련된 모델이 테스트 시 **최대 30720 토큰** 까지 스케일링되어 일관된 성능 향상을 보입니다. 정량적으로는 **20480 토큰** 사용 시 **Chamfer Distance 1.893 (↓)** , **F1-score 99.59 (↑)** 를 달성하여 이전 SOTA 모델인 Hunyuan3D-2, SparseFlex, Direct3D-s2를 뛰어넘는 재구성 성능을 보입니다. 또한, 사용자 연구에서도 다른 상업용 모델들에 비해 월등히 우수하다는 평가를 받았습니다.

## AI 실무자를 위한 시사점
**VoxSet** 표현은 **저비용 훈련** 및 **유연한 추론 스킴** 을 지원하며, 특히 **테스트 시간 스케일링** 능력은 단일 모델로 다양한 해상도의 고품질 3D 에셋을 생성할 수 있게 합니다. 이는 게임 개발, 영화 시각 효과, 가상 현실 등에서 **자동화된 고품질 3D 콘텐츠 생성** 의 실용성을 크게 향상시킬 수 있는 중요한 진전입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.