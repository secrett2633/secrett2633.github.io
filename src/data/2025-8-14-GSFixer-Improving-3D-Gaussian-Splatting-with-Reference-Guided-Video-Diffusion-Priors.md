---
title: "[논문리뷰] GSFixer: Improving 3D Gaussian Splatting with Reference-Guided Video
  Diffusion Priors"
excerpt: "Qingnan Fan이 [arXiv]에 게시한 'GSFixer: Improving 3D Gaussian Splatting with Reference-Guided Video
  Diffusion Priors' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Gaussian Splatting
  - Novel View Synthesis
  - Diffusion Model
  - Artifact Restoration
  - Sparse-view 3D Reconstruction
  - Reference-Guided

permalink: /ai/review/2025-8-14-GSFixer-Improving-3D-Gaussian-Splatting-with-Reference-Guided-Video-Diffusion-Priors/

toc: true
toc_sticky: true

date: 2025-08-14 13:19:02+0900
last_modified_at: 2025-08-14 13:19:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.09667)

**저자:** Xingyilang Yin, Qi Zhang, Jiahao Chang, Ying Feng, Qingnan Fan, Xi Yang, Chi-Man Pun, Huaqi Zhang, Xiaodong Cun



## 핵심 연구 목표
본 논문은 적은 수의 입력 영상으로 **3D Gaussian Splatting (3DGS)** 장면을 재구성할 때 발생하는 **시각적 아티팩트와 3D 불일치 문제** 를 해결하는 것을 목표로 합니다. 특히, 기존 생성 모델들이 생성된 콘텐츠와 입력 뷰 간의 **일관성을 유지하는 데 어려움** 을 겪는 한계를 극복하고자 합니다.

## 핵심 방법론
본 논문은 **DiT 기반 비디오 확산 모델** 에 **참조 뷰 기반 조건** 을 도입한 **참조-가이드 비디오 복원 모델** 인 **GSFixer** 를 제안합니다. 이 모델은 **사전 훈련된 VGGT 모델에서 추출한 3D 기하학적 토큰** 과 **DINOv2 인코더에서 추출한 2D 시맨틱 토큰** 을 활용하여 아티팩트가 있는 렌더링을 복원하며, **참조 궤적 샘플링 전략** 을 통해 일관성을 강화합니다.

## 주요 결과
**DL3DV-Res 벤치마크** 에서 **GSFixer** 는 기존 최첨단 방법들을 크게 능가했습니다. 3DGS 아티팩트 복원 태스크에서 **GenFusion** 대비 **PSNR** 에서 **2.16dB** , **SSIM** 에서 **0.067** , **LPIPS** 에서 **0.087** 개선을 달성했습니다. 특히, 3개 뷰 입력의 희소 뷰 재구성 설정에서 **PSNR 16.21dB** 를 기록하며 다른 방법론들보다 우수한 성능을 입증했습니다.

## AI 실무자를 위한 시사점
**GSFixer** 는 희소한 입력 뷰로부터 고품질의 3DGS 재구성을 가능하게 하여, **실제 환경에서의 3D 스캔 및 재구성 비용을 절감** 할 수 있습니다. **2D 시맨틱 및 3D 기하학적 사전 지식** 을 비디오 확산 모델에 통합하는 방법은 **생성 모델의 일관성 문제** 를 해결하는 효과적인 전략을 제시합니다. 또한, 새로운 **DL3DV-Res 벤치마크** 는 3DGS 아티팩트 복원 연구의 표준 평가를 위한 중요한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.