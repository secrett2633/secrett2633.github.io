---
title: "[논문리뷰] VolSplat: Rethinking Feed-Forward 3D Gaussian Splatting with
  Voxel-Aligned Prediction"
excerpt: "Haoxiao Wang이 arXiv에 게시한 'VolSplat: Rethinking Feed-Forward 3D Gaussian Splatting with
  Voxel-Aligned Prediction' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Gaussian Splatting
  - Novel View Synthesis
  - Voxel-Aligned Prediction
  - Feed-Forward Reconstruction
  - Multi-View Consistency
  - Scene Representation
  - Computer Vision

permalink: /ai/review/2025-9-24-VolSplat-Rethinking-Feed-Forward-3D-Gaussian-Splatting-with-Voxel-Aligned-Prediction/

toc: true
toc_sticky: true

date: 2025-09-24 13:14:19+0900
last_modified_at: 2025-09-24 13:14:19+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.19297)

**저자:** Weijie Wang, Yeqing Chen, Zeyu Zhang, Hengyu Liu, Haoxiao Wang, Zhiyuan Feng, Wenkang Qin, Zheng Zhu, Donny Y. Chen, Bohan Zhuang



## 핵심 연구 목표
기존 Feed-Forward 3D Gaussian Splatting (3DGS) 방식의 문제점인 픽셀 정렬(pixel alignment) 의존성, 뷰 편향된 밀도 분포, 그리고 정렬 오류를 해결하는 것을 목표로 합니다. 특히 입력 뷰 수에 대한 의존성과 저텍스처 또는 폐색 영역에서의 한계를 극복하고자 합니다.

## 핵심 방법론
본 논문은 픽셀 정렬 대신 **볼륨 정렬(voxel-aligned)** 기반의 예측을 수행하는 새로운 프레임워크인 **VolSplat** 을 제안합니다. 이 방법은 입력 이미지에서 추출된 **2D 특징** 을 **평면 스위핑(plane sweeping)** 기반의 깊이 예측을 통해 3D 공간의 **스파스 복셀 특징 그리드(sparse voxel feature grid)** 로 변환합니다. 이후, **스파스 3D U-Net 디코더** 를 사용하여 이 특징을 정제하고, 각 점유 복셀로부터 **3D 가우시안 파라미터(위치, 공분산, 불투명도, 색상)** 를 직접 예측하여 뷰 독립적인 표현을 생성합니다.

## 주요 결과
**VolSplat** 은 **RealEstate10K** 및 **ScanNet** 벤치마크에서 최첨단 성능을 달성했습니다. RealEstate10K에서는 **PSNR 31.30, SSIM 0.941, LPIPS 0.075** 를 기록하여 기존 DepthSplat (PSNR 27.47)과 같은 픽셀 정렬 기반 모델을 크게 능가했습니다. 또한, **ACID 데이터셋** 에서의 교차 데이터셋 일반화 실험에서도 **PSNR 32.65** 로 탁월한 성능을 보여주며, 플로터(floaters)와 아티팩트가 없는 더욱 사실적이고 일관된 가우시안 재구성을 제공합니다.

## AI 실무자를 위한 시사점
**VolSplat** 은 3D 재구성에서 **뷰 일관성** 과 **기하학적 정확도** 를 향상시키는 실용적인 방법을 제시합니다. **복셀 정렬 기반 예측** 은 씬 복잡도에 따라 가우시안 밀도를 적응적으로 제어할 수 있어, 리소스 효율성을 높이면서도 세밀한 기하학적 표현이 가능합니다. 이는 **자율 주행, 로봇 공학, 가상현실/증강현실** 과 같이 고품질 3D 씬 재구성이 필수적인 실시간 애플리케이션 개발에 중요한 기여를 할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.