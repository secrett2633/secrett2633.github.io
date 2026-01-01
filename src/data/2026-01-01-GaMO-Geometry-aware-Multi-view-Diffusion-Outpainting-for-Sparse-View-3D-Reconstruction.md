---
title: "[논문리뷰] GaMO: Geometry-aware Multi-view Diffusion Outpainting for Sparse-View 3D Reconstruction"
excerpt: "Yu-Lun Liu이 [arXiv]에 게시한 'GaMO: Geometry-aware Multi-view Diffusion Outpainting for Sparse-View 3D Reconstruction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Reconstruction
  - Sparse-View
  - Diffusion Models
  - Outpainting
  - Gaussian Splatting
  - Geometry-aware
  - Novel View Synthesis

permalink: /ai/review/2026-01-01-GaMO-Geometry-aware-Multi-view-Diffusion-Outpainting-for-Sparse-View-3D-Reconstruction/

toc: true
toc_sticky: true

date: 2026-01-01 00:00:00+0900+0900
last_modified_at: 2026-01-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.25073)

**저자:** Yi-Chuan Huang, Hao-Jen Chien, Chin-Yang Lin, Ying-Huan Chen, Yu-Lun Liu



## 핵심 연구 목표
본 논문은 제한된 입력 뷰(sparse-view) 환경에서 발생하는 3D 재구성의 고질적인 문제(구멍, 고스팅, 기하학적 불일치)를 해결하고자 합니다. 기존의 Novel View Generation 방식의 비효율성과 비일관성을 극복하고, 기존 카메라 포즈에서 **FOV(Field-of-View)를 확장** 하는 Multi-view Outpainting 패러다임을 제안하여 높은 품질, 기하학적 일관성 및 빠른 재구성 속도를 달성하는 것이 목표입니다.

## 핵심 방법론
제안하는 GaMO는 **Coarse 3D Initialization** (DUSt3R 및 3DGS 활용), **Geometry-aware Multi-view Diffusion Outpainter** , 그리고 **3DGS Refinement** 의 세 단계로 구성됩니다. Outpainter 단계에서는 **Plücker ray embeddings** , 워핑된 RGB/CCM 이미지, VAE 인코딩된 잠재 공간 특징을 활용한 **Multi-view Conditioning** 을 수행합니다. 핵심적으로, Coarse 3DGS에서 얻은 Opacity Mask와 Coarse Render를 기반으로 **Mask Latent Blending** 및 **Iterative Mask Scheduling with Noise Resampling** 을 통해 기하학적 일관성을 유지하며 뷰를 확장합니다. 최종적으로 원본 뷰와 Outpainted 뷰를 함께 사용하여 **3DGS 모델을 L1, LD-SSIM, LLPIPS 손실** 로 정제합니다.

## 주요 결과
GaMO는 **Replica** 및 **ScanNet++** 데이터셋에서 3, 6, 9개 입력 뷰 설정 모두에서 SOTA 성능을 달성했습니다. 특히, 6개 입력 뷰 조건에서 **Replica** 데이터셋에 대해 **PSNR 25.84 dB** , **SSIM 0.877** , **LPIPS 0.109** , **FID 72.95** 를 기록하며 GuidedVD-3DGS보다 우수했습니다. 또한, SOTA Diffusion 기반 방법에 비해 **25배 빠른 속도** 로 **10분 미만** 의 전체 재구성 시간을 보여주며 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 Sparse-view 3D 재구성에서 Novel View Generation 대신 **Outpainting 패러다임** 의 우수성을 확립했습니다. 특히, **zero-shot 일반화 능력** 과 **획기적인 속도 개선** 은 실제 AI 애플리케이션에서 제한된 데이터로 고품질 3D 모델을 빠르게 구축하는 데 큰 도움이 될 것입니다. 기하학적 프라이어를 Diffusion 모델에 통합하는 **Geometry-aware denoising 전략** 은 생성된 콘텐츠의 일관성과 사실성을 높이는 강력한 방법론으로 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.