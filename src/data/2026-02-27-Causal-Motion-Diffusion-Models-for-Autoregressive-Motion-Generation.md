---
title: "[논문리뷰] Causal Motion Diffusion Models for Autoregressive Motion Generation"
excerpt: "Kent Fujiwara이 [arXiv]에 게시한 'Causal Motion Diffusion Models for Autoregressive Motion Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Motion Generation
  - Diffusion Models
  - Autoregressive Models
  - Causal Modeling
  - Latent Space
  - Text-to-Motion
  - Human Motion Synthesis
  - Streaming Generation

permalink: /ai/review/2026-02-27-Causal-Motion-Diffusion-Models-for-Autoregressive-Motion-Generation/

toc: true
toc_sticky: true

date: 2026-02-27 00:00:00+0900+0900
last_modified_at: 2026-02-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.22594)

**저자:** Qing Yu, Akihisa Watanabe, Kent Fujiwara



## 핵심 연구 목표
본 논문은 기존 모션 확산 모델의 인과성 부족과 자기회귀 모델의 불안정성 및 오류 누적 문제를 해결하여, 고품질의 시간적으로 순서가 보장되는(temporally ordered) 모션 생성을 목표로 합니다. 확산 모델의 사실성과 자기회귀 트랜스포머의 인과적 구조를 결합하여 실시간 및 장기 모션 스트리밍 생성을 가능하게 하는 통합 프레임워크를 제안합니다.

## 핵심 방법론
제안하는 **CMDM** (Causal Motion Diffusion Models)은 세 가지 핵심 구성 요소를 통합합니다: 첫째, **MAC-VAE** (Motion-Language-Aligned Causal VAE)는 모션 시퀀스를 **Part-TMR** [49] 기반의 **motion-language alignment loss** 를 사용하여 시간적으로 인과적인 잠재 표현으로 인코딩합니다. 둘째, **Causal Diffusion Transformer (Causal-DiT)** 는 **인과적 self-attention** 과 **AdaLN** 및 **ROPE** 를 통해 프레임별 확산 노이즈 정보를 통합하여 시간적으로 순서가 지정된 denoising을 수행합니다. 셋째, **Frame-Wise Sampling Schedule (FSS)** 은 **인과적 불확실성(causal uncertainty)** 을 모델링하여 부분적으로 denoised된 이전 프레임으로부터 각 후속 프레임을 점진적으로 정제하여 추론 속도를 가속화합니다.

## 주요 결과
**HumanML3D** 벤치마크에서 **CMDM w/ FSS** 는 R-Precision (Top-1/2/3)에서 **0.588/0.778/0.860** 을 달성하며 기존 SOTA 모델을 능가했으며, FID는 **0.068 (두 번째로 낮음)** , CLIP-Score는 **0.685 (가장 높음)** 를 기록했습니다. **SnapMoGen** 에서도 모든 평가 지표에서 SOTA 성능을 달성했으며, 특히 추론 지연 시간 분석에서는 **CMDM w/ FSS** 가 기존 자기회귀 확산 모델 대비 **5~12배** 의 스트리밍 생성 속도 향상(첫 토큰 **220ms** , 이후 토큰당 **30ms** )을 보여주었습니다.

## AI 실무자를 위한 시사점
**CMDM** 은 실시간 스트리밍 및 장기 모션 생성을 위한 효율적이고 고품질의 솔루션을 제공하며, 이는 가상 캐릭터, 게임, 애니메이션 등 다양한 애플리케이션에 적용될 수 있습니다. **인과적 잠재 공간 인코딩** 과 **프레임 단위 샘플링 스케줄** 은 고품질 생성과 효율적인 추론 간의 균형을 찾는 데 중요한 통찰을 제공합니다. 또한, **Part-TMR** 과 같은 사전 훈련된 motion-language 모델을 활용한 의미론적 정렬 방식은 다른 multimodal 생성 모델에도 적용될 수 있는 일반적인 접근 방식을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.