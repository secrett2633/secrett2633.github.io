---
title: "[논문리뷰] Lyra: Generative 3D Scene Reconstruction via Video Diffusion Model
  Self-Distillation"
excerpt: "Yifeng Jiang이 arXiv에 게시한 'Lyra: Generative 3D Scene Reconstruction via Video Diffusion Model
  Self-Distillation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Generative AI
  - 3D Scene Reconstruction
  - Video Diffusion Models
  - Self-Distillation
  - 3D Gaussian Splatting
  - Dynamic 4D Generation
  - Monocular Input

permalink: /ai/review/2025-9-24-Lyra-Generative-3D-Scene-Reconstruction-via-Video-Diffusion-Model-Self-Distillation/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19296)

**저자:** Sherwin Bahmani, Tianchang Shen, Jiawei Ren, Jiahui Huang, Yifeng Jiang, Haithem Turki, Andrea Tagliasacchi, David B. Lindell, Zan Gojcic, Sanja Fidler, Huan Ling, Jun Gao, Xuanchi Ren



## 핵심 연구 목표
본 논문의 핵심 목표는 **실세계 다중 뷰 데이터 없이** 단일 이미지 또는 비디오 입력으로부터 고품질의 3D 및 4D 장면을 생성하는 것입니다. 이를 위해 비디오 확산 모델에 내재된 암묵적인 3D 지식을 명시적인 **3D Gaussian Splatting (3DGS)** 표현으로 증류하여 기존 3D 재구성 방법의 데이터 부족 문제를 해결하고자 합니다.

## 핵심 방법론
Lyra는 **self-distillation 프레임워크** 를 제안하며, 여기서 사전 훈련된 **카메라 제어 비디오 확산 모델 (GEN3C)** 이 교사 역할을 하고, **3DGS 디코더** 가 학생 역할을 합니다. 이 **3DGS 디코더** 는 비디오 확산 모델의 잠재 공간에서 작동하며, 교사 모델의 RGB 디코더 출력과 렌더링된 3DGS 뷰 간의 **image-based reconstruction loss (MSE + LPIPS)** 및 **ViPE** 로 추정된 깊이 맵을 활용하는 **depth loss** 로 학습됩니다. 또한, 다이내믹 씬을 위해 **시간-조건부 3DGS** 와 **동적 데이터 증강 기법** 을 사용하여 시간적 일관성을 확보합니다.

## 주요 결과
Lyra는 정적 3D 및 동적 4D 장면 생성에서 모두 최첨단 성능을 달성했습니다. 정적 3D 재구성 벤치마크인 **RealEstate10K** 에서 **PSNR 21.79, SSIM 0.752, LPIPS 0.219** 를 기록하여 이전 모델인 **Bolt3D (PSNR 21.54)** 를 능가했습니다. 동적 4D 재구성에서는 **PSNR 23.07, SSIM 0.779, LPIPS 0.231** 을 달성하며 **BTimer (GEN3C)** 대비 우수한 성능을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 고비용의 **다중 뷰 실세계 데이터** 수집 필요성을 제거하여 3D/4D 장면 생성의 접근성을 크게 높입니다. 생성된 **명시적인 3DGS 표현** 은 실시간 렌더링을 지원하며 **로봇 시뮬레이션** 및 **물리 기반 AI** 와 같은 다운스트림 애플리케이션에 직접 적용될 수 있습니다. **비디오 확산 모델의 잠재 공간** 에서 작동하는 방식은 여러 뷰를 효율적으로 처리하며 메모리 오버헤드를 줄여 실용적인 AI 시스템 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.