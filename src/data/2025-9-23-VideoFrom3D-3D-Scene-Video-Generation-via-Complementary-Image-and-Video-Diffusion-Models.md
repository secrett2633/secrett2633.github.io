---
title: "[논문리뷰] VideoFrom3D: 3D Scene Video Generation via Complementary Image and Video
  Diffusion Models"
excerpt: "Sunghyun Cho이 arXiv에 게시한 'VideoFrom3D: 3D Scene Video Generation via Complementary Image and Video
  Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Scene Generation
  - Video Diffusion
  - Image Diffusion
  - Generative Models
  - Computer Graphics
  - Temporal Consistency
  - Sparse Anchor Views

permalink: /ai/review/2025-9-23-VideoFrom3D-3D-Scene-Video-Generation-via-Complementary-Image-and-Video-Diffusion-Models/

toc: true
toc_sticky: true

date: 2025-09-23 13:36:03+0900
last_modified_at: 2025-09-23 13:36:03+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.17985)

**저자:** Sunghyun Cho, Janghyeok Han, Geonung Kim



## 핵심 연구 목표
본 논문은 조잡한(coarse) 3D 지오메트리, 카메라 궤적, 그리고 참조 이미지를 사용하여 고품질 3D 장면 비디오를 생성하는 문제를 해결하고자 합니다. 기존 비디오 확산 모델이 복잡한 장면에서 시각적 품질, 움직임, 시간적 일관성을 공동으로 모델링하는 데 겪는 어려움을 극복하고, 3D 그래픽 디자인 워크플로우를 간소화하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **VideoFrom3D** 프레임워크는 이미지 및 비디오 확산 모델의 상호보완적인 강점을 활용하는 2단계 접근 방식을 사용합니다. 첫째, **Sparse Anchor-view Generation (SAG)** 모듈은 **FLUX-dev 이미지 확산 모델** 을 기반으로 **ControlNet (HED 엣지)** 및 **LoRA 기반 스타일 정렬** 을 통해 고품질의 다중 뷰 일관성 앵커 뷰를 생성합니다. 둘째, **Geometry-guided Generative Inbetweening (GGI)** 모듈은 **CogVideoX-5B-1.0 비디오 확산 모델** 을 활용하여 앵커 뷰 사이의 중간 프레임을 보간하며, **Go-with-the-Flow** 의 광학 흐름 기반 카메라 제어 및 **VAE 인코딩된 HED 엣지 맵** 을 통한 구조적 가이던스로 정확하고 일관된 보간을 보장합니다.

## 주요 결과
정량적 평가에서 **VideoFrom3D (SAG + GGI)** 는 **PSNR 16.739, SSIM 0.554, LPIPS 0.236, MUSIQ 68.615** 등 대부분의 시각적 품질, 구조적 충실도, 스타일 및 시간적 일관성 지표에서 최신 기준 모델들을 뛰어넘는 성능을 달성했습니다. 특히, **PSNR-D는 19.754** 로 구조적 정확도에서 우수함을 보였으며, 다양한 시나리오에서 일관되고 고품질의 스타일 유지 비디오를 성공적으로 생성할 수 있음을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 **이미지 확산 모델** 과 **비디오 확산 모델** 을 효과적으로 결합함으로써 3D 장면 비디오 생성의 품질과 효율성을 동시에 높일 수 있는 실용적인 방안을 제시합니다. **코스(coarse)한 3D 지오메트리** 로부터 고품질 비디오를 생성하여 3D 디자인 초기 단계에서의 **빠른 시안 생성 및 반복 작업** 에 유용하게 활용될 수 있습니다. 특히, 3D 모델과 자연 이미지가 쌍을 이루는 **방대한 데이터셋 없이도 학습 및 추론이 가능** 하다는 점은 데이터 확보가 어려운 환경에서 AI/ML 엔지니어들에게 큰 이점으로 작용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.