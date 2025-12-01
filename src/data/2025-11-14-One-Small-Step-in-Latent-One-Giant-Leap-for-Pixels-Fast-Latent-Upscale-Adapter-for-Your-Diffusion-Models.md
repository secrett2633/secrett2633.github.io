---
title: "[논문리뷰] One Small Step in Latent, One Giant Leap for Pixels: Fast Latent Upscale Adapter for Your Diffusion Models"
excerpt: "Ilya Makarov이 [arXiv]에 게시한 'One Small Step in Latent, One Giant Leap for Pixels: Fast Latent Upscale Adapter for Your Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Latent Diffusion Models
  - Super-Resolution
  - Upscaling Adapter
  - Image Generation
  - Latent Space
  - Multi-scale Learning
  - Cross-VAE

permalink: /ai/review/2025-11-14-One-Small-Step-in-Latent-One-Giant-Leap-for-Pixels-Fast-Latent-Upscale-Adapter-for-Your-Diffusion-Models/

toc: true
toc_sticky: true

date: 2025-11-14 00:00:00+0900+0900
last_modified_at: 2025-11-14 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.10629)

**저자:** Aleksandr Razin, Kazantsev Danil, Ilya Makarov



## 핵심 연구 목표
본 논문은 기존 확산 모델이 고해상도 이미지를 직접 샘플링할 때 발생하는 속도 저하, 비용 증가, 아티팩트 발생 문제를 해결하고, 사후 픽셀 공간 초해상도(SR) 방식의 추가 지연 및 아티팩트를 극복하는 것을 목표로 합니다. 이를 위해, 최종 VAE 디코딩 단계 이전에 생성기의 잠재 코드에 직접 초해상도 작업을 수행하는 경량 모듈인 **Latent Upscaler Adapter (LUA)** 를 제안하여 빠르고 충실도 높은 고해상도 이미지 합성을 구현하고자 합니다.

## 핵심 방법론
**LUA** 는 사전 훈련된 generator와 VAE decoder 사이에 삽입되는 단일 패스 모듈로, 입력 latent `z`를 스케일 팩터 **×2** 또는 **×4** 에 맞춰 업스케일된 `ĉ`로 변환합니다. 아키텍처는 **Swin Transformer 스타일의 백본** 을 공유하고, **스케일별 픽셀 셔플 헤드** 를 사용하여 다중 스케일을 지원합니다. 훈련은 **멀티-스테이지 커리큘럼** 을 통해 진행되며, **latent-domain** (L1, FFT) 및 **pixel-domain** (LDS, LHF, LEAGLE) 목적 함수를 결합하여 잠재 공간의 미세 구조를 보존하고 실제와 같은 디코딩을 가능하게 합니다. 또한, 첫 번째 컨볼루션 레이어만 변경하고 최소한의 fine-tuning을 통해 **SDXL** , **SD3** , **FLUX** 등 다양한 VAE 모델에 대한 **cross-VAE generalization** 을 입증합니다.

## 주요 결과
**LUA** 는 **2048x2048** 해상도에서 SDXL+SwinIR (FID 183.16, 6.29s) 및 multi-stage re-diffusion (LSRNA-DemoFusion: FID 181.24, 20.77s)을 능가하는 **최고의 Fidelity** (FID **180.80** , pFID **97.90** , KID **0.0018** , CLIP **0.764** )와 **가장 낮은 Latency** ( **3.52s** )를 달성했습니다. **4096x4096** 해상도에서도 FID **176.90** , pFID **61.80** , runtime **6.87s** 로 가장 우수한 단일 패스 성능을 보였습니다. 훈련 커리큘럼의 효과를 입증하며, 전체 구성(I+II+III)이 모든 스케일에서 PSNR 및 LPIPS 지표를 통해 최고의 Fidelity를 달성했습니다.

## AI 실무자를 위한 시사점
**LUA** 는 기존 확산 모델에 추가 확산 단계나 모델 재훈련 없이 **고해상도 이미지 생성의 효율성** 을 크게 향상시키는 실용적인 방법을 제공합니다. 이 모듈은 **SDXL** , **SD3** , **FLUX** 와 같은 다양한 VAE에 **최소한의 변경과 fine-tuning** 만으로 적용 가능하여 기존 AI 파이프라인에 쉽게 통합될 수 있습니다. 단일 백본과 스케일별 헤드를 사용하여 **멀티-스케일 업스케일링** 을 지원함으로써, 모델 용량과 훈련 오버헤드를 줄이는 동시에 유연한 고해상도 출력을 가능하게 하여 실제 서비스 및 애플리케이션에 유용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.