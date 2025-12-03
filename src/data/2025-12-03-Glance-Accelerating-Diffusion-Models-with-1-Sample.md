---
title: "[논문리뷰] Glance: Accelerating Diffusion Models with 1 Sample"
excerpt: "Linjie Li이 [arXiv]에 게시한 'Glance: Accelerating Diffusion Models with 1 Sample' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Acceleration
  - Distillation
  - LoRA
  - Few-shot Learning
  - Phase-aware
  - Image Generation
  - Computational Efficiency

permalink: /ai/review/2025-12-03-Glance-Accelerating-Diffusion-Models-with-1-Sample/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.02899)

**저자:** Zhuobai Dong, Rui Zhao, Songjie Wu, Junchao Yi, Linjie Li



## 핵심 연구 목표
본 논문은 이미지 생성 확산 모델의 높은 계산 비용과 많은 추론 단계를 해결하고자 합니다. 특히, 모델의 재훈련 비용과 일반화 성능 저하 없이, 단일 샘플만으로도 효율적인 가속화와 강력한 일반화 능력을 갖춘 경량화된 솔루션을 제공하는 것을 목표로 합니다.

## 핵심 방법론
Glance는 확산 모델의 디노이징 과정을 초기 의미 단계와 후기 중복 단계로 나누는 **단계별 가속화(phase-aware acceleration) 프레임워크** 를 제안합니다. 이는 **Slow-LoRA** 와 **Fast-LoRA** 라는 두 가지 경량 **LoRA 어댑터** 를 활용하며, 이들은 각각 느린 가속과 빠른 가속을 담당하여 잡음 수준에 따라 동적으로 적응합니다. 놀랍게도 이 어댑터들은 단 **1개의 훈련 샘플** 과 **1 GPU-시간 미만** 의 훈련 시간으로 학습됩니다.

## 주요 결과
Glance는 기본 모델 대비 최대 **5배의 가속** 을 달성하면서도 다양한 벤치마크에서 유사한 시각적 품질을 유지합니다. 특히, **OneIG-Bench, HPSv2, GenEval** 에서 교사 모델 성능의 각각 **92.60%, 99.67%, 96.71%** 에 도달하는 뛰어난 성능을 보였습니다. 이는 **FLUX.1** 및 **Qwen-Image** 와 같은 대규모 모델에 대해 단 **1개의 샘플** 로 **1시간 이내** 에 훈련되어 달성된 결과입니다.

## AI 실무자를 위한 시사점
Glance는 확산 모델의 배포 및 사용자 정의에 필요한 계산 및 데이터 요구사항을 혁신적으로 줄여줍니다. **단일 샘플 학습** 과 **단계별 LoRA 어댑터** 는 제한된 자원 환경에서 대규모 생성 모델을 효율적으로 가속하고 미세 조정할 수 있는 실용적인 방법론을 제시합니다. 이는 AI 모델의 접근성과 활용성을 크게 향상시켜 새로운 애플리케이션 개발에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.