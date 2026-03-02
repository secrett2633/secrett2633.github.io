---
title: "[논문리뷰] SenCache: Accelerating Diffusion Model Inference via Sensitivity-Aware Caching"
excerpt: "Alexandre Alahi이 [arXiv]에 게시한 'SenCache: Accelerating Diffusion Model Inference via Sensitivity-Aware Caching' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Inference Acceleration
  - Caching
  - Sensitivity Analysis
  - Dynamic Caching
  - Video Generation
  - Denoising

permalink: /ai/review/2026-03-02-SenCache-Accelerating-Diffusion-Model-Inference-via-Sensitivity-Aware-Caching/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.24208)

**저자:** Yasaman Haghighi, Alexandre Alahi



## 핵심 연구 목표
확산 모델의 추론 과정을 가속화하는 것이 목표입니다. 특히, 기존의 휴리스틱 기반 캐싱 방법들이 가진 이론적 근거 부족과 정적 캐싱 스케줄의 한계를 극복하고, 모델 출력 품질을 유지하면서 계산 비용을 줄일 수 있는 **원칙적인(principled) 민감도 기반 캐싱 프레임워크** 를 제안합니다.

## 핵심 방법론
본 논문은 **Sensitivity-Aware Caching (SenCache)** 프레임워크를 제안합니다. 이 방법은 노이즈가 있는 잠재 공간(noisy latent)과 타임스텝(timestep) 변화에 대한 **모델 출력의 민감도** 를 측정하여 캐싱 오류를 정량화합니다. 구체적으로, **Jacobian norm** 을 통해 잠재 공간 변화(Jx) 및 타임스텝 변화(Jt)에 대한 민감도를 추정하고, **St = ||Jx|| ||∆xt|| + ||Jt|||∆t|** 형태의 민감도 점수 St를 계산하여 **St ≤ ɛ** 일 때 캐시를 재사용하는 동적 캐싱 정책을 사용합니다. 민감도 추정은 효율적인 **방향성 유한 차분(directional finite-difference) 근사** 를 통해 이루어집니다.

## 주요 결과
**SenCache** 는 **Wan 2.1, CogVideoX, LTX-Video** 등 최신 비디오 확산 모델에서 기존 캐싱 방법들 대비 우수한 시각적 품질을 달성했습니다. 예를 들어, **Wan 2.1** 의 "fast" 설정에서 **21 NFE (58% 캐시 비율)** 로 **LPIPS 0.0540, PSNR 29.1400, SSIM 0.9219** 를 달성하여 **MagCache** 보다 더 나은 품질을 보였습니다. **CogVideoX** 와 **LTX-Video** 에서도 유사하거나 더 낮은 NFE로 더 나은 LPIPS, PSNR, SSIM 점수를 기록하여, 동일한 계산 예산에서 시각적 품질을 효과적으로 보존함을 입증했습니다. 또한, 민감도 추정에는 **8개의 비디오** 로 구성된 작은 캘리브레이션 세트만으로도 충분함을 확인했습니다.

## AI 실무자를 위한 시사점
**SenCache** 는 확산 모델 추론 가속화를 위한 **이론적 기반을 갖춘 동적 캐싱 솔루션** 을 제공하여, 기존의 경험적 접근법이 가진 한계를 극복합니다. 이 방법은 **모델 훈련이 필요 없고(training-free)** , 모델 아키텍처나 샘플러에 구애받지 않아 다양한 확산 모델에 쉽게 적용 가능합니다. **소규모 캘리브레이션 세트** 를 통해 효율적으로 민감도를 추정할 수 있으므로, 실제 서비스 환경에서 빠르고 효과적인 배포가 가능하며, 비용 효율적인 AI 애플리케이션 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.