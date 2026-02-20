---
title: "[논문리뷰] Balancing Understanding and Generation in Discrete Diffusion Models"
excerpt: "Jianbin Jiao이 arXiv에 게시한 'Balancing Understanding and Generation in Discrete Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Discrete Diffusion Models
  - Language Modeling
  - Image Generation
  - Masked Diffusion
  - Uniform Noise
  - XDLM
  - Stationary Noise Kernel
  - Pareto Frontier

permalink: /ai/review/2026-02-04-Balancing-Understanding-and-Generation-in-Discrete-Diffusion-Models/

toc: true
toc_sticky: true

date: 2026-02-04 00:00:00+0900+0900
last_modified_at: 2026-02-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.01362)

**저자:** Yue Liu, Yuzhong Zhao, Zheyong Xie, Qixiang Ye, Jianbin Jiao, Yao Hu, Shaosheng Cao, Yunfan Liu



## 핵심 연구 목표
이 논문은 이산 확산 모델(Discrete Diffusion Models, DDM) 분야에서 **Masked Diffusion Language Models (MDLM)** 의 의미 이해 능력과 **Uniform-noise Diffusion Language Models (UDLM)** 의 고품질 소수 단계 생성 능력 간의 불균형을 해결하는 것을 목표로 합니다. 두 패러다임의 장점을 통합하여 **이해와 생성 성능의 균형을 이루는 새로운 모델** 을 제시하고자 합니다.

## 핵심 방법론
제안하는 **XDLM (miXed Diffusion Language Modeling)** 은 균일 노이즈와 마스크 노이즈 분포를 융합하는 **정지 노이즈 커널(stationary noise kernel)** 을 통해 두 패러다임을 연결합니다. 이는 **MDLM** 과 **UDLM** 을 특수한 경우로 포함하는 **이론적 통일성** 을 제공하며, 후속 확률 계산의 **대수적 단순화** 를 통해 **메모리 병목 현상** 을 완화하여 대규모 어휘에도 확장이 가능합니다.

## 주요 결과
**XDLM** 은 이해 능력과 생성 품질 간의 **파레토 프론티어(Pareto frontier)** 를 발전시켰습니다. 제로샷 텍스트 벤치마크에서 **UDLM보다 5.4점** 우수한 성능(평균 PPL **54.110** vs **59.574** )을 달성했고, 소수 단계 이미지 생성(8단계 ImageNet-1K)에서는 **MDLM을 FID 54.1** 로 크게 능가했습니다( **MDLM은 80.8** ). 또한, **8B-파라미터 LLM** 에 적용했을 때 **32단계** 만에 **MBPP 15.0점** 을 달성하여 기존 **LLaDA 기준(6.8점)** 대비 성능을 두 배 이상 향상했습니다.

## AI 실무자를 위한 시사점
**XDLM** 은 이산 확산 모델의 **확장성 및 효율성** 을 크게 개선하여 대규모 언어 모델과 이미지 생성 모델 개발에 유용합니다. 특히 **메모리 효율적인 구현** 과 **최적의 혼합 비율 k=0.1** 은 다양한 도메인과 샘플링 예산에 맞춰 성능을 최적화할 수 있는 **유연한 프레임워크** 를 제공합니다. 이는 **소수 단계 생성** 과 **강력한 의미 이해** 를 동시에 요구하는 실용적인 AI 애플리케이션에 큰 이점을 가져다줄 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.