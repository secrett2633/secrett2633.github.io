---
title: "[논문리뷰] Diffusion-SDPO: Safeguarded Direct Preference Optimization for Diffusion   Models"
excerpt: "Zhao Xu이 [arXiv]에 게시한 'Diffusion-SDPO: Safeguarded Direct Preference Optimization for Diffusion   Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Direct Preference Optimization (DPO)
  - Safeguarded Learning
  - Text-to-Image Generation
  - Preference Alignment
  - Generative Models
  - Stable Diffusion

permalink: /ai/review/2025-11-11-Diffusion-SDPO-Safeguarded-Direct-Preference-Optimization-for-Diffusion-Models/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.03317)

**저자:** Minghao Fu, Guo-Hua Wang, Tianyu Cui, Qing-Guo Chen, Zhao Xu, Weihua Luo, Kaifu Zhang



## 핵심 연구 목표
텍스트-이미지 확산 모델을 인간의 선호도에 맞춰 정렬하는 과정에서 발생하는 문제를 해결하는 것이 목표입니다. 특히 기존 **Direct Preference Optimization (DPO)** 방식이 선호도 마진을 늘려도 생성 품질이 저하될 수 있는 "병리학적" 한계를 보였는데, 본 연구는 선호도 정렬을 개선하면서도 **선호되는 출력의 절대적 품질을 보존하거나 향상**시키고자 합니다.

## 핵심 방법론
확산 모델을 위한 **Safeguarded Direct Preference Optimization (Diffusion-SDPO)** 방식을 제안합니다. 이는 **승자(winner)를 보존하는 업데이트 규칙**으로, **패자(loser) 기울기를 승자 기울기와의 기하학적 정렬에 따라 적응적으로 스케일링**합니다. **첫 번째 차수 분석**을 통해, 선호되는 출력의 오류가 최적화 단계마다 증가하지 않도록 보장하는 **폐쇄형 스케일링 계수 `λ_safe`**를 도출합니다. 이 방법론은 **모델 불가지론적(model-agnostic)**이며 기존 **Diffusion-DPO, DSPO, DMPO**와 같은 프레임워크에 **플러그인 방식**으로 적용 가능합니다.

## 주요 결과
**SD 1.5, SDXL, Ovis-U1** 등 표준 텍스트-이미지 벤치마크에서 **Diffusion-SDPO**를 적용한 결과, 자동 선호도, 미학 및 프롬프트 정렬 지표에서 기존 선호도 학습 기준선 대비 **일관된 성능 향상**을 보였습니다. 특히 **DMPO+SDPO**는 **SD 1.5**에서 **ImageReward 점수 0.7061**을 달성하며 가장 우수한 전반적인 점수를 기록했습니다. 또한, 학습 안정성을 높이고 모델 붕괴를 방지하며 지각적 품질을 향상시키는 효과를 입증했습니다.

## AI 실무자를 위한 시사점
**Diffusion-SDPO**는 기존 DPO 기반 확산 모델 학습의 **불안정한 역학과 품질 저하 문제**를 해결하여, 더욱 안정적이고 신뢰할 수 있는 선호도 정렬 학습 방법을 제공합니다. 이 접근 방식은 **모델-불가지론적**이며 **낮은 계산 오버헤드**로 기존 DPO 프레임워크에 쉽게 통합될 수 있어, 다양한 **고품질 텍스트-이미지 생성 및 이미지 편집 시스템** 개발에 실용적으로 적용될 수 있습니다. 특히 생성 모델의 출력 품질과 사용자 만족도를 동시에 최적화해야 하는 시나리오에서 중요한 역할을 할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.