---
title: "[논문리뷰] DiffThinker: Towards Generative Multimodal Reasoning with Diffusion Models"
excerpt: "Siyuan Huang이 arXiv에 게시한 'DiffThinker: Towards Generative Multimodal Reasoning with Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Reasoning
  - Diffusion Models
  - Image-to-Image Generation
  - Vision-centric AI
  - Generative AI
  - Spatial Planning
  - Constraint Satisfaction

permalink: /ai/review/2026-01-02-DiffThinker-Towards-Generative-Multimodal-Reasoning-with-Diffusion-Models/

toc: true
toc_sticky: true

date: 2026-01-02 00:00:00+0900+0900
last_modified_at: 2026-01-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24165)

**저자:** Zefeng He, Xiaoye Qu, Yafu Li, Tong Zhu, Siyuan Huang, Yu Cheng



## 핵심 연구 목표
현재 Multimodal Large Language Models (MLLMs)이 겪는 텍스트 중심 추론의 한계와 복잡한 장기 시각 중심 태스크에서의 비효율성을 해결하고, 확산 모델을 활용한 새로운 '생성형 멀티모달 추론' 패러다임을 확립하는 것을 목표로 합니다. 이를 통해 시각 중심 추론 태스크에서 우수한 **논리적 일관성** 과 **공간적 정밀도** 를 달성하고자 합니다.

## 핵심 방법론
논문은 멀티모달 추론을 **네이티브 이미지-투-이미지 생성 태스크** 로 재구성하고, 이를 위해 **확산 모델** 기반의 **DiffThinker** 를 제안합니다. DiffThinker는 **Flow Matching** 프레임워크와 **Multimodal Diffusion Transformer (MMDIT)** 아키텍처를 활용하며, **Variational Autoencoder (VAE)** 의 잠재 공간에서 작동합니다. 생성된 시각적 솔루션은 공정한 비교를 위해 **상징적 형식으로 파싱** 됩니다.

## 주요 결과
DiffThinker는 GPT-5 대비 **+314.2%** , Gemini-3-Flash 대비 **+111.6%** , 그리고 미세 조정된 Qwen3-VL-32B 대비 **+39.0%** 향상된 성능을 보였습니다. 7개 태스크에 걸쳐 평균 **87.4%** 의 정확도를 달성하며, 효율적인 추론(VSP-Super 레벨-16에서 **1.1초** 의 추론 시간) 및 예측 가능한 추론 비용 등 4가지 핵심 속성(효율성, 제어 가능성, 네이티브 병렬 처리, 협업)을 입증했습니다.

## AI 실무자를 위한 시사점
확산 모델 기반의 이미지-투-이미지 생성 접근 방식이 복잡한 시각 중심 추론 태스크에서 기존 MLLM보다 훨씬 효과적임을 보여줍니다. 이는 **공간 계획** 및 **제약 만족** 과 같은 문제에 대한 새로운 해결책을 제시하며, **고정된 추론 단계** 로 인해 **예측 가능한 계산 비용** 과 **효율성** 을 제공할 수 있습니다. 하지만 OOD(Out-of-Distribution) 일반화 능력은 여전히 제한적이며, 더 강력한 생성형 기반 모델 개발이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.