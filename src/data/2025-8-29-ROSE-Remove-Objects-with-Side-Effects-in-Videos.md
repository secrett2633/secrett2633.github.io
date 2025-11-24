---
title: "[논문리뷰] ROSE: Remove Objects with Side Effects in Videos"
excerpt: "Hantang Liu이 [arXiv]에 게시한 'ROSE: Remove Objects with Side Effects in Videos' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Object Removal
  - Side Effects
  - 3D Rendering
  - Diffusion Transformer
  - Video Inpainting
  - Synthetic Data
  - Difference Mask

permalink: /ai/review/2025-8-29-ROSE-Remove-Objects-with-Side-Effects-in-Videos/

toc: true
toc_sticky: true

date: 2025-08-29 13:14:44+0900
last_modified_at: 2025-08-29 13:14:44+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18633)

**저자:** Chenxuan Miao, Yutong Feng, Jianshu Zeng, Zixiang Gao, Hantang Liu, Yunfeng Yan, Donglian Qi, Xi Chen, Bin Wang, Hengshuang Zhao



## 핵심 연구 목표
기존 비디오 객체 제거 모델들이 객체의 그림자, 반사, 조명 변화 등 **"측면 효과(side effects)"**를 효과적으로 제거하지 못하는 문제를 해결하는 것이 목표입니다. 이는 주로 측면 효과를 포함한 **정교한 쌍을 이루는 비디오 데이터의 부족**에서 기인하며, 본 연구는 이를 극복하고 현실적인 비디오 편집 품질을 향상시키고자 합니다.

## 핵심 방법론
객체 제거 작업을 위해 **3D 렌더링 엔진 (Unreal Engine)**을 활용하여 그림자, 반사, 광원, 반투명, 거울 등 **다섯 가지 측면 효과**를 체계적으로 시뮬레이션한 대규모 **합성 쌍 비디오 데이터셋**을 구축했습니다. **ROSE** 모델은 **Diffusion Transformer** 기반의 비디오 인페인팅 모델로 구현되었으며, 객체와 관련된 모든 영역을 지역화하기 위해 **전체 비디오**를 입력으로 활용하는 **reference-based erasing** 방식을 채택했습니다. 또한, 쌍 비디오 간의 **차이 마스크(differential mask)**를 통해 측면 효과 영향을 받는 영역을 예측하는 **추가적인 차이 마스크 예측기(difference mask predictor)**를 도입하여 명시적 감독(explicit supervision)을 제공합니다.

## 주요 결과
**ROSE**는 새롭게 제안된 **ROSE-Bench** 벤치마크(합성 및 실제 데이터 포함)에서 기존 비디오 객체 제거 모델들인 **DiffuEraser**, **ProPainter**, **FuseFormer** 등을 능가하는 우수한 성능을 달성했습니다. 예를 들어, 합성 데이터 평균에서 **PSNR 31.428**, **SSIM 0.9070**, **LPIPS 0.0772**를 기록하여 다른 모델 대비 뛰어난 정량적 성능을 보였습니다. 특히 그림자, 반사, 조명 변화와 같은 복잡한 객체-환경 상호작용을 효과적으로 처리함을 정성적으로 입증했습니다.

## AI 실무자를 위한 시사점
본 연구는 **3D 렌더링을 통한 합성 데이터 생성 파이프라인**이 비디오 편집과 같은 데이터 부족 문제를 해결하는 강력한 방법임을 보여줍니다. **Diffusion Transformer** 아키텍처와 **전체 비디오 기반 레퍼런스(reference-based erasing)** 접근 방식은 객체와 환경 간의 미묘한 상호작용을 파악하는 데 효과적이며, **차이 마스크 예측기**를 통한 명시적 감독은 모델의 측면 효과 처리 능력을 강화할 수 있음을 시사합니다. AI 엔지니어는 이러한 기법을 활용하여 실제 환경에서의 비디오 편집 도구 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.