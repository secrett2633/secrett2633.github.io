---
title: "[논문리뷰] Guiding a Diffusion Transformer with the Internal Dynamics of Itself"
excerpt: "arXiv에 게시된 'Guiding a Diffusion Transformer with the Internal Dynamics of Itself' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Transformer
  - Generative AI
  - Image Generation
  - Guidance Strategy
  - Internal Guidance
  - Auxiliary Loss
  - Classifier-Free Guidance

permalink: /ai/review/2026-01-01-Guiding-a-Diffusion-Transformer-with-the-Internal-Dynamics-of-Itself/

toc: true
toc_sticky: true

date: 2026-01-01 00:00:00+0900+0900
last_modified_at: 2026-01-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24176)

**저자:** Xingyu Zhou, Qifan Li, Xiaobin Hu, Hai Chen, Shuhang Gu



## 핵심 연구 목표
확산 트랜스포머(Diffusion Transformer) 모델이 저확률 데이터 영역에서 고품질 이미지를 생성하지 못하는 문제를 해결하는 것이 목표입니다. 기존 **Classifier-Free Guidance (CFG)** 가 샘플의 다양성을 줄이거나 왜곡을 유발하는 한계를 극복하고, 복잡한 추가 훈련이나 샘플링 스텝 없이 모델의 내부 역학을 활용하여 생성 품질과 훈련 효율성을 동시에 향상시키는 새로운 가이던스 전략을 제시합니다.

## 핵심 방법론
제안된 **Internal Guidance (IG)** 는 훈련 과정 중 확산 트랜스포머의 중간 계층에 **보조 손실(auxiliary supervision loss)** 을 추가하여 약한 생성 출력을 학습하도록 합니다. 샘플링 단계에서는 중간 계층과 최종 계층의 출력을 활용하여 **Dw(x; c) = Di(x; c) + w(Df(x; c) – Di(x; c))** 공식을 통해 최종 출력을 가이드합니다. 또한, **L = Lfinal + λLinter** 형태의 손실 함수와 **x0 + w · sg(Df(xt) - Di(xt))** 와 같은 훈련 가속화 기법을 도입하여 학습 효과를 극대화합니다.

## 주요 결과
**SiT-XL/2+IG** 모델은 ImageNet 256x256에서 800 에포크 훈련 시 **FID 1.75** 를 달성하여 vanilla SiT의 FID를 크게 앞질렀습니다. **LightningDiT-XL/1+IG** 는 **FID 1.34** 를 달성했으며, 여기에 **CFG** 를 결합했을 때 **FID 1.19** (랜덤 샘플링) 또는 **FID 1.07** (균형 샘플링)이라는 현재까지의 **최고 성능(State-of-the-Art)** 을 기록했습니다. 이는 기존 방식 대비 미미한 연산량 증가로 생성 품질을 크게 개선했음을 보여줍니다.

## AI 실무자를 위한 시사점
**Internal Guidance (IG)** 는 추가적인 모델 학습이나 샘플링 스텝 없이도 기존 확산 트랜스포머 모델에 쉽게 적용 가능한 **플러그 앤 플레이(plug-and-play)** 방식의 효율적인 가이드 기법입니다. **CFG** 와 함께 사용하여 시너지를 낼 수 있으며, 특히 모델 스케일이 커질수록 그 효과가 더욱 증대됩니다. 이를 통해 AI/ML 엔지니어는 대규모 생성 모델의 **생성 품질 향상** 및 **훈련 효율성 증대** 를 적은 비용으로 달성할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.