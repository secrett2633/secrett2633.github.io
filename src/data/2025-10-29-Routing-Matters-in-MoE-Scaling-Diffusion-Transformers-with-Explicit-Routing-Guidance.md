---
title: "[논문리뷰] Routing Matters in MoE: Scaling Diffusion Transformers with Explicit
  Routing Guidance"
excerpt: "arXiv에 게시된 'Routing Matters in MoE: Scaling Diffusion Transformers with Explicit
  Routing Guidance' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mixture-of-Experts (MoE)
  - Diffusion Transformers (DiTs)
  - Routing Guidance
  - Semantic Specialization
  - Contrastive Learning
  - Image Generation
  - Flow Matching

permalink: /ai/review/2025-10-29-Routing-Matters-in-MoE-Scaling-Diffusion-Transformers-with-Explicit-Routing-Guidance/

toc: true
toc_sticky: true

date: 2025-10-29 13:11:02+0900
last_modified_at: 2025-10-29 13:11:02+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.24711)

**저자:** Yujie Wei, Shiwei Zhang, Hangjie Yuan, Yujin Han, Zhekai Chen, Jiayu Wang, Difan Zou, Xihui Liu, Yingya Zhang, Yu Liu, Hongming Shan



## 핵심 연구 목표
본 논문은 Mixture-of-Experts(MoE)를 Diffusion Transformers(DiTs)에 적용할 때 발생하는 제한적인 성능 향상 문제를 해결하는 것을 목표로 합니다. 언어 토큰과 시각 토큰의 근본적인 차이(시각 토큰의 공간적 중복성과 기능적 이질성)를 분석하고, 이를 극복하여 MoE 전문가의 전문화를 촉진하는 효과적인 라우팅 메커니즘을 개발하고자 합니다.

## 핵심 방법론
제안하는 **ProMoE** 는 명시적 라우팅 가이던스를 포함하는 **두 단계 라우터** 를 특징으로 합니다. 첫 번째 단계인 **조건부 라우팅** 은 이미지 토큰을 기능적 역할에 따라 조건부 및 비조건부 세트로 분할하며, 두 번째 단계인 **프로토타입 라우팅** 은 학습 가능한 프로토타입 기반의 코사인 유사도를 사용하여 조건부 토큰을 세분화하여 할당합니다. 또한, 전문가 내 응집력과 전문가 간 다양성을 증진하기 위해 **라우팅 대조 손실(Routing Contrastive Loss)** 을 도입하여 라우팅 과정을 명시적으로 강화합니다.

## 주요 결과
**ImageNet 벤치마크** 에서 ProMoE는 **Rectified Flow** 및 **DDPM** 학습 목표 모두에서 뛰어난 성능을 보였습니다. 특히, **ProMoE-L-Flow** 는 **458M 활성화 파라미터** 를 사용하여 **1.063B 총 파라미터** 로 **CFG=1.5** 에서 **FID50K 2.79** 를 달성했으며, 이는 더 많은 활성화 파라미터(675M)를 사용하는 **Dense-DiT-XL-Flow** 의 **FID50K 3.23** 보다 우수합니다. 또한, ProMoE는 기존 SOTA MoE 방법론보다 **1.7배 더 많은 총 파라미터** 를 가진 모델들을 능가하는 결과를 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 시각 데이터 처리에서 MoE 모델의 잠재력을 극대화하기 위한 **명시적인 라우팅 전략의 중요성** 을 강조합니다. 특히, **대규모 확산 모델** 을 효율적으로 스케일링하여 고품질 이미지 생성 태스크에 적용하려는 AI 실무자에게 유용합니다. 시각 토큰의 특성을 고려한 **전문가 특화 라우팅 기법** 은 향후 비전 MoE 아키텍처 설계에 중요한 지침이 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.