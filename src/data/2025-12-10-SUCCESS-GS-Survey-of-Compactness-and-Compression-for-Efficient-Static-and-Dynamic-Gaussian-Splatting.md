---
title: "[논문리뷰] SUCCESS-GS: Survey of Compactness and Compression for Efficient Static and Dynamic Gaussian Splatting"
excerpt: "Sung-Ho Bae이 arXiv에 게시한 'SUCCESS-GS: Survey of Compactness and Compression for Efficient Static and Dynamic Gaussian Splatting' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Gaussian Splatting (3DGS)
  - Gaussian Compression
  - Model Efficiency
  - Novel View Synthesis
  - Dynamic Scenes
  - Parameter Compression
  - Restructuring Compression
  - Real-time Rendering

permalink: /ai/review/2025-12-10-SUCCESS-GS-Survey-of-Compactness-and-Compression-for-Efficient-Static-and-Dynamic-Gaussian-Splatting/

toc: true
toc_sticky: true

date: 2025-12-10 00:00:00+0900+0900
last_modified_at: 2025-12-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07197)

**저자:** Seokhyun Youn, Soohyun Lee, Geonho Kim, Weeyoung Kwon, Sung-Ho Bae, Jihyong Oh



## 핵심 연구 목표
본 논문은 **3D Gaussian Splatting (3DGS)** 의 방대한 메모리 사용량과 높은 연산 오버헤드 문제를 해결하고, 특히 **4D 다이내믹 씬** 에서의 실용적 배포를 어렵게 하는 한계를 극복하는 것을 목표로 합니다. 연구는 중복성을 줄이면서도 높은 시각적 품질과 실시간 렌더링 성능을 유지하는 효율적인 **3DGS** 기술에 대한 최초의 통합적이고 포괄적인 조사를 제공합니다.

## 핵심 방법론
이 조사는 효율적인 **3D** 및 **4D Gaussian Splatting** 기술을 **Parameter Compression** 과 **Restructuring Compression** 이라는 두 가지 주요 방향으로 체계적으로 분류합니다. **Parameter Compression** 은 **pruning, quantization, entropy coding** 과 같은 기술을 통해 가우시안 속성을 직접 압축하는 반면, **Restructuring Compression** 은 **계층적 앵커, 신경망 통합, 기하학적 구조 인식** 과 같은 방법을 통해 원래 **3DGS 프레임워크의 구조를 재설계** 하여 압축을 수행합니다. 또한, 널리 사용되는 데이터셋, 평가 지표(예: **PSNR, SSIM, LPIPS, Inference FPS, Model Size** ) 및 대표적인 벤치마크 비교를 포함합니다.

## 주요 결과
설문 조사 결과, 여러 **Parameter Compression** 및 **Restructuring Compression** 기법들이 기존 **3DGS** 모델 대비 크게 향상된 효율성을 보여줍니다. 예를 들어, 정적 씬에서는 **MesonGS** 및 **Octree-GS** 와 같은 방법들이 **Mip-NeRF 360** 벤치마크에서 높은 **PSNR** 과 낮은 **LPIPS** 를 유지하면서 **모델 저장 크기를 15MB 이하로** 크게 줄였습니다. 동적 씬의 경우, **Ex4DGS** 는 **N3DV** 데이터셋에서 **약 32.3dB의 PSNR** 과 **190 FPS 이상** 의 렌더링 속도를 달성하며 **50MB 이하의 모델 크기** 를 보였습니다. 이는 경량화 및 고충실도 표현을 향한 동적 **3DGS** 연구의 중요한 전환점을 시사합니다.

## AI 실무자를 위한 시사점
**3DGS** 기반 기술의 실제 배포를 위해서는 **메모리 효율성** 과 **실시간 성능** 이 필수적임을 강조하며, AR/VR 헤드셋이나 모바일 기기와 같은 **자원 제약적 환경** 에서의 응용 가능성을 높입니다. 실무자들은 **Parameter Compression** 과 **Restructuring Compression** 간의 장단점을 이해하여 특정 애플리케이션 요구사항에 맞는 최적의 압축 전략을 선택할 수 있습니다. 특히, **하드웨어 최적화, 장기 시퀀스 처리, 의미론적 인식 압축, 일반화** 등 향후 연구 방향은 **3DGS** 기술의 적용 범위를 더욱 확장할 잠재력을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.