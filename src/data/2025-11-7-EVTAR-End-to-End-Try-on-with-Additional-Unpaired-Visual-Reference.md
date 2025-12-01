---
title: "[논문리뷰] EVTAR: End-to-End Try on with Additional Unpaired Visual Reference"
excerpt: "이 [arXiv]에 게시한 'EVTAR: End-to-End Try on with Additional Unpaired Visual Reference' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Virtual Try-on
  - Diffusion Models
  - End-to-End Learning
  - Reference Images
  - Unpaired Data
  - Flow Matching
  - Transformer Architecture
  - Generative AI

permalink: /ai/review/2025-11-7-EVTAR-End-to-End-Try-on-with-Additional-Unpaired-Visual-Reference/

toc: true
toc_sticky: true

date: 2025-11-09 22:08:24+0900
last_modified_at: 2025-11-09 22:08:24+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.00956)

**저자:** Liuzhuozheng Li, Yue Gong, Shanyuan Liu, Bo Cheng, Yuhang Ma, Liebucha Wu, Dengyang Jiang, Zanyi Wang, Dawei Leng, Yuhui Yin



## 핵심 연구 목표
본 연구는 기존 가상 착용(virtual try-on) 모델들이 **agnostic person images** , **human pose** , **densepose** 등 복잡한 입력에 의존하고 레퍼런스 이미지 지원이 부족하여 현실성이 떨어지는 문제를 해결하고자 합니다. 마스크나 추가 조건 없이 **소스 이미지와 타겟 의류** 만으로 작동하며, **추가적인 시각적 레퍼런스 이미지** 를 활용하여 착용 정확도와 사실감을 크게 향상시키는 **엔드-투-엔드(End-to-End) 가상 착용 모델 EVTAR** 를 제안합니다.

## 핵심 방법론
EVTAR는 **두 단계 학습 전략** 을 채택합니다. 첫 번째 단계에서는 마스크 기반 착용 모델을 훈련하여 **비쌍(unpaired) 인물 이미지** 를 합성하고, 두 번째 단계에서는 **DiT(Diffusion Transformer)** 및 **Flux-Kontext** 기반의 엔드-투-엔드 모델을 훈련합니다. 이 모델은 합성된 인물 이미지 또는 실제 인물 이미지, 타겟 의류, 그리고 **추가적인 레퍼런스 이미지(ri)** 를 입력으로 받으며, **LoRA(Low-Rank Adaptation)** 를 사용하여 효율적으로 미세 조정됩니다. 특히, **Qwen2.5-VL** 과 **Flux-Kontext** 를 활용하여 합성된 레퍼런스 이미지와 비쌍 인물 이미지를 포함하는 새로운 데이터셋인 **VFR(Virtual Fitting with Reference)** 을 구축합니다.

## 주요 결과
EVTAR는 **VITON-HD** 및 **DressCode** 데이터셋에서 기존 모델 대비 **최첨단(SOTA) 성능** 을 달성했습니다. VITON-HD 데이터셋에서 레퍼런스 이미지(`+R`)를 사용한 **EVTAR+R** 은 **LPIPS 0.049** , **FID 4.69** 를 기록하며 이전 최고 성능을 넘어섰습니다. DressCode 데이터셋에서는 **LPIPS 0.031** , **FID 2.94** 를 달성했으며, 마스크 없는 설정에서도 높은 정확도와 사실감을 보여주었습니다. 이는 **정교한 디테일, 소재 투명성, 질감 보존** 에 있어 탁월한 품질을 정량적, 정성적으로 입증합니다.

## AI 실무자를 위한 시사점
EVTAR는 기존 가상 착용 시스템의 **복잡한 전처리(예: 포즈 추정, 세그멘테이션 마스크)** 필요성을 제거하여 AI 시스템의 배포 및 운영 효율성을 크게 향상시킵니다. **시각적 레퍼런스 이미지** 활용은 생성형 AI 패션 분야에서 사실감과 미세 디테일 보존이라는 난제를 해결하는 중요한 접근 방식을 제공합니다. 또한, **합성된 비쌍 데이터** 와 **레퍼런스 이미지** 를 활용하여 데이터 부족 문제를 극복하고 모델 성능을 개선하는 효과적인 데이터 전략을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.