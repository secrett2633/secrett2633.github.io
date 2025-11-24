---
title: "[논문리뷰] ObjFiller-3D: Consistent Multi-view 3D Inpainting via Video Diffusion
  Models"
excerpt: "Beiqi Chen이 [arXiv]에 게시한 'ObjFiller-3D: Consistent Multi-view 3D Inpainting via Video Diffusion
  Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Inpainting
  - Multi-view Consistency
  - Video Diffusion Models
  - 3D Object Completion
  - Generative Models
  - LoRA
  - 3D Gaussian Splatting

permalink: /ai/review/2025-8-27-ObjFiller-3D-Consistent-Multi-view-3D-Inpainting-via-Video-Diffusion-Models/

toc: true
toc_sticky: true

date: 2025-08-27 13:22:18+0900
last_modified_at: 2025-08-27 13:22:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18271)

**저자:** Haitang Feng, Jie Liu, Jie Tang, Gangshan Wu, Beiqi Chen, Jianhuang Lai, Guangcong Wang



## 핵심 연구 목표
기존 3D 인페인팅 방법론들이 다중 뷰 2D 이미지 인페인팅에 의존하여 발생하는 뷰 간 불일치, 흐릿한 텍스처, 공간 불연속성 문제를 해결하고자 합니다. 이를 극복하고 **비디오 확산 모델**의 시공간적 일관성 유지 능력을 활용하여 고품질의 일관된 3D 객체 완성 및 편집을 목표로 합니다.

## 핵심 방법론
**Instant3dit 데이터셋**을 재처리하여 16개 뷰의 2D 이미지와 해당 마스크(convexhull, surface, volume)를 준비하고, **Cap3D**로 텍스트 설명을 생성합니다. 최신 비디오 편집 모델인 **VACE [18]**를 다중 뷰 이미지를 루프형 비디오 시퀀스로 간주하여 3D 인페인팅에 적용하고, **LoRA (Low-Rank Adaptation) [15]**를 VACE 모델에 주입하여 3D 데이터에 맞게 효율적으로 미세 조정합니다. 인페인팅된 일관된 뷰는 **3D Gaussian Splatting (3DGS) [20]**을 사용하여 3D 객체를 빠르게 재구성합니다.

## 주요 결과
**ObjFiller-3D**는 기존 SOTA 방법론인 **NeRFiller** 및 **Instant3dit** 대비 뛰어난 성능을 보였습니다. 특히 140개 입력 뷰에서 **PSNR 26.6** (NeRFiller 15.9, Instant3dit 17.9 대비) 및 **LPIPS 0.07** (NeRFiller 0.23, Instant3dit 0.18 대비)을 달성했습니다. 또한, **Instant3dit**과 비교하여 **FID 90.75** (Instant3dit 100.9 대비) 및 **LPIPS 0.195** (Instant3dit 0.253 대비)로 우수함을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **비디오 확산 모델**이 3D 객체 인페인팅 및 편집에 효과적으로 적용될 수 있음을 보여주며, 3D 콘텐츠 제작 워크플로우를 크게 개선할 잠재력을 제시합니다. **LoRA 기반의 도메인 적응 기법**은 대규모 비디오 모델을 3D 도메인에 효율적으로 활용하는 실용적인 방법을 제공하여, AI 실무자들이 **적은 리소스로도 고품질 3D 결과물**을 얻을 수 있게 합니다. 이는 디지털 콘텐츠 생성, 문화유산 복원 등 다양한 AI 응용 분야에 직접적으로 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.