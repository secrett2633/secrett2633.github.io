---
title: "[논문리뷰] Reg-DPO: SFT-Regularized Direct Preference Optimization with GT-Pair for
  Improving Video Generation"
excerpt: "이 [arXiv]에 게시한 'Reg-DPO: SFT-Regularized Direct Preference Optimization with GT-Pair for
  Improving Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Direct Preference Optimization
  - SFT Regularization
  - GT-Pair
  - Memory Optimization
  - Diffusion Models
  - I2V
  - T2V

permalink: /ai/review/2025-11-5-Reg-DPO-SFT-Regularized-Direct-Preference-Optimization-with-GT-Pair-for-Improving-Video-Generation/

toc: true
toc_sticky: true

date: 2025-11-09 19:35:02+0900
last_modified_at: 2025-11-09 19:35:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.01450)

**저자:** Jie Du, Xinyu Gong, Qingshan Tan, Wen Li, Yangming Cheng, Weitao Wang, Chenlu Zhan, Suhui Wu, Hao Zhang, Jun Zhang, et al.



## 핵심 연구 목표
본 논문은 비디오 생성 분야에서 **Direct Preference Optimization (DPO)**의 효율성을 유지하면서, 기존 방법론이 가진 비싼 데이터 구축, 불안정한 훈련, 과도한 메모리 소비라는 고유한 비디오 태스크의 난제를 해결하는 것을 목표로 합니다. 특히, 이미지 도메인에서 파생된 접근법과 소규모 모델(~2B 파라미터)의 한계를 극복하여 비디오 생성 품질을 향상시키고자 합니다.

## 핵심 방법론
본 연구는 세 가지 핵심 측면을 다룹니다. 첫째, 데이터 구축을 위해 외부 주석 없이 고품질 선호도 쌍을 자동으로 생성하는 **GT-Pair**를 도입했습니다. 둘째, 알고리즘 안정성을 위해 **SFT (Supervised Fine-Tuning) 손실**을 정규화 항으로 포함하는 **Reg-DPO**를 제안하여 훈련 안정성과 생성 충실도를 높입니다. 셋째, 메모리 최적화를 위해 **FSDP 프레임워크**에 **Flash Attention**, **Context Parallelism**, **Pair Parallelism** 등 다양한 기술을 결합하여 훈련 용량을 크게 확장합니다.

## 주요 결과
**GT-Pair**는 수동 주석 데이터 대비 VQ Score **1.63** (GT-Pair) vs **1.44** (Annotated_Pair)로 우수한 데이터 품질과 변별력을 입증했습니다. **Reg-DPO**는 Human-I2V-GT-Pair 데이터셋에서 Base 모델 대비 VQ Score **2.05**, PF Score **1.73**를 달성했으며, VBench Total_Score에서 I2V 태스크 **21점**, T2V 태스크 **16점**을 기록하여 기존 DPO 및 SFT 모델을 일관되게 능가했습니다. 또한, 제안된 메모리 최적화 기법을 통해 **FSDP 단독 사용 대비 거의 3배 높은 훈련 용량**을 확보했습니다.

## AI 실무자를 위한 시사점
본 연구는 비디오 생성 DPO 훈련의 주요 병목인 데이터, 알고리즘, 메모리 문제를 포괄적으로 해결하는 실용적인 프레임워크를 제공합니다. 특히 **GT-Pair**는 고품질 데이터셋 구축 비용을 대폭 절감하여 대규모 비디오 모델 개발의 접근성을 높이며, **Reg-DPO**는 훈련 안정성을 보장하여 복잡한 비디오 생성 태스크에서 모델 붕괴 위험을 줄입니다. 이러한 최적화된 프레임워크는 AI 엔지니어들이 **초대규모 비디오 생성 모델**을 효율적으로 훈련하고 배포하는 데 필수적인 기반 기술이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.