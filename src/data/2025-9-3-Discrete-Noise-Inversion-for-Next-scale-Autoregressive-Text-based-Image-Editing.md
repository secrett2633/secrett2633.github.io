---
title: "[논문리뷰] Discrete Noise Inversion for Next-scale Autoregressive Text-based Image
  Editing"
excerpt: "Amin Heyrani Nobar이 arXiv에 게시한 'Discrete Noise Inversion for Next-scale Autoregressive Text-based Image
  Editing' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Image Editing
  - Autoregressive Models
  - Noise Inversion
  - Text-to-Image
  - Gumbel-max Trick
  - Training-free
  - Location-aware Argmax Inversion

permalink: /ai/review/2025-9-3-Discrete-Noise-Inversion-for-Next-scale-Autoregressive-Text-based-Image-Editing/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.01984)

**저자:** Quan Dao, Ngan Hoai Nguyen, Ligong Han, Xiaoxiao He, Amin Heyrani Nobari



## 핵심 연구 목표
본 연구는 **시각적 자기회귀(VAR) 모델** 에서 추가 훈련 없이 프롬프트 기반 이미지 편집 기능을 구현하는 것을 목표로 합니다. 기존 VAR 모델의 편집 능력 한계를 극복하고, 원본 이미지의 관련 없는 세부 사항을 보존하면서 텍스트 프롬프트에 따라 타겟 편집을 정확하고 제어 가능하게 수행하는 방법론을 개발하고자 합니다.

## 핵심 방법론
이 논문은 VAR 모델을 위한 최초의 훈련 없는(training-free) 노이즈 역변환 기반 이미지 편집 기법인 **VARIN(Visual AutoRegressive Inverse Noise)** 을 제안합니다. **VARIN** 의 핵심은 **argmax 샘플링(Gumbel-max trick)** 의 의사-역함수인 **Location-aware Argmax Inversion (LAI)** 으로, 이를 통해 원본 이미지를 정확히 재구성하고 텍스트 프롬프트에 따른 표적화된 편집을 가능하게 하는 역 Gumbel 노이즈를 생성합니다. **LAI** 는 원본 이미지의 디테일을 보존하기 위한 조정 가능한 바이어스 정보를 추출하며, VAR 인코더로 추출된 토큰 맵과 예측된 로짓을 활용하여 역 노이즈를 도출합니다. 이 역 노이즈는 새로운 Gumbel 노이즈와 타겟 프롬프트 조건부로 보간되어 **다음 스케일 예측(next-scale prediction)** 방식을 통해 편집 과정을 제어합니다.

## 주요 결과
**VARIN** 은 **DICE** 와 같은 이산형 확산 모델 기반 편집 방법론 대비 약 **1초 이내** 의 더 빠른 편집 시간을 달성하며, **DICE** 의 약 **2초** 보다 효율적입니다. 또한, **HART** 기반 **VARIN** 은 **PSNR 26.54** , **SSIM 85.39** , **CLIP Similarity (Edited) 21.49** 를 기록하여, 기존 **Regeneration** 및 **DDPM-Inversion** 등 훈련 없는 방법론보다 우수한 재구성 충실도와 배경 보존 성능을 보여줍니다. 이 방법은 정성적으로도 원본 이미지의 구조적 세부 사항과 배경을 효과적으로 유지하면서 지정된 프롬프트에 따라 이미지를 수정하는 능력을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 VAR 모델에서 **훈련 없는(training-free) 이미지 편집** 을 가능하게 하여, AI 개발자들이 대규모 재훈련 없이도 기존 모델의 활용도를 높일 수 있는 실용적인 방향을 제시합니다. **LAI** 와 같은 노이즈 역변환 기법은 이산형 생성 모델의 제어 가능성과 효율성을 개선하는 데 중요한 기술적 통찰력을 제공합니다. 확산 모델과 유사한 품질을 유지하면서도 **약 1초의 빠른 추론 시간** 을 달성하여, 실시간 애플리케이션이나 자원 제약이 있는 환경에서 VAR 모델이 강력한 대안이 될 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.