---
title: "[논문리뷰] Scaling Text-to-Image Diffusion Transformers with Representation Autoencoders"
excerpt: "arXiv에 게시된 'Scaling Text-to-Image Diffusion Transformers with Representation Autoencoders' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Image Generation
  - Diffusion Models
  - Representation Autoencoder
  - Latent Space
  - Large-Scale Models
  - Unified Models
  - Noise Scheduling

permalink: /ai/review/2026-01-23-Scaling-Text-to-Image-Diffusion-Transformers-with-Representation-Autoencoders/

toc: true
toc_sticky: true

date: 2026-01-23 00:00:00+0900+0900
last_modified_at: 2026-01-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.16208)

**저자:** Shengbang Tong, Boyang Zheng, Ziteng Wang*, Bingda Tang, Nanye Ma, Ellis Brown, Jihan Yang, Rob Fergus, Yann LeCun, Saining Xie



## 핵심 연구 목표
본 논문은 기존 **변형 오토인코더(VAE)** 의 저차원 잠재 공간이 대규모 **텍스트-이미지(T2I) 생성** 모델에서 가질 수 있는 한계를 극복하고자 합니다. 특히, **고차원 의미론적 잠재 공간** 에서 작동하는 **Representation Autoencoders (RAEs)** 가 대규모 T2I 확산 모델의 더 간단하고 강력한 기반이 될 수 있는지, 그리고 이를 통해 시각적 이해와 생성을 통합하는 새로운 가능성을 열 수 있는지 탐구하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 고정된 **SigLIP-2** 표현 인코더에 디코더를 학습시켜 고차원 잠재 공간에서 작동하는 **RAE** 를 구성했습니다. T2I 생성에는 **MetaQuery 프레임워크** 와 **LightningDiT** 기반의 **Diffusion Transformers (DiT)** 를 활용했으며, **flow matching objective** 와 텍스트 예측을 위한 **cross-entropy loss** 를 사용하여 모델을 훈련했습니다. 특히, **차원 의존적 노이즈 스케줄링** 의 중요성을 강조하고, **0.5B에서 9.8B** 에 이르는 다양한 DiT 모델 스케일에서 **RAE** 와 **FLUX VAE** 를 비교하며 **GenEval** 및 **DPG-Bench** 지표로 성능을 정량적으로 평가했습니다.

## 주요 결과
**RAE 기반 모델** 은 **사전 훈련 단계** 에서 VAE 기반 모델보다 **GenEval에서 4.0배, DPG-Bench에서 4.6배 빠르게 수렴** 하며 더 높은 성능을 달성했습니다. **파인튜닝 단계** 에서는 VAE 모델이 **64 에폭 이후 급격히 오버피팅** 되는 반면, RAE 모델은 **256 에폭 동안 안정적인 성능** 을 유지하며 오버피팅에 덜 취약함을 보였습니다. 또한, 대규모 모델 스케일에서는 **차원 의존적 노이즈 스케줄링** 만이 필수적이며, **wide DiTDH head** 나 노이즈 증강 디코딩과 같은 특정 설계 선택 사항은 이점이 미미해짐을 확인했습니다.

## AI 실무자를 위한 시사점
**RAE** 는 대규모 T2I 모델 훈련에 있어 **VAE보다 더 효율적이고 견고한 솔루션** 을 제공하며, 특히 장기적인 파인튜닝 시 **오버피팅 저항력** 이 높다는 점에서 실용적 가치가 큽니다. 대규모 Diffusion Transformer 설계 시에는 **차원 의존적 노이즈 스케줄링** 에 집중하고 아키텍처의 불필요한 복잡성을 줄이는 것이 중요합니다. 마지막으로, 시각적 이해와 생성이 동일한 잠재 공간에서 이루어짐으로써 **생성된 latents를 LLM이 직접 추론** 할 수 있어, 픽셀 디코딩 없이도 **테스트 시간 스케일링(TTS)** 이 가능하며, **통합 멀티모달 모델** 개발에 새로운 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.