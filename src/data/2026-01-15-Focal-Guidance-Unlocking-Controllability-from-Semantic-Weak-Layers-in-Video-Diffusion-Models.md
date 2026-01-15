---
title: "[논문리뷰] Focal Guidance: Unlocking Controllability from Semantic-Weak Layers in Video Diffusion Models"
excerpt: "Xiao Yang이 [arXiv]에 게시한 'Focal Guidance: Unlocking Controllability from Semantic-Weak Layers in Video Diffusion Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Diffusion Models
  - Image-to-Video Generation
  - Diffusion Transformers (DiT)
  - Controllability
  - Semantic Alignment
  - Focal Guidance
  - Prompt Adherence

permalink: /ai/review/2026-01-15-Focal-Guidance-Unlocking-Controllability-from-Semantic-Weak-Layers-in-Video-Diffusion-Models/

toc: true
toc_sticky: true

date: 2026-01-15 00:00:00+0900+0900
last_modified_at: 2026-01-15 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.07287)

**저자:** Yuanyang Yin, Yufan Deng, Kaipeng Zhang, Xiao Yang, Shenghai Yuan, Feng Zhao



## 핵심 연구 목표
본 논문은 **Diffusion Transformer (DiT)** 기반의 Image-to-Video (I2V) 모델에서 텍스트 프롬프트에 대한 제어력 부족 문제를 해결하고자 합니다. 특히, 모델의 중간 레이어에서 발생하는 **"Semantic-Weak Layers"** 현상과 **"Condition Isolation"** 문제를 진단하고, 이를 개선하여 텍스트 명령에 대한 모델의 충실도를 높이는 것을 목표로 합니다.

## 핵심 방법론
저자들은 제어력을 강화하기 위해 **Focal Guidance (FG)** 프레임워크를 제안합니다. 이는 **Fine-grained Semantic Guidance (FSG)** 와 **Attention Cache (AC)** 두 가지 메커니즘으로 구성됩니다. **FSG** 는 **CLIP** 을 활용하여 참조 프레임의 주요 영역과 텍스트 키워드를 명시적으로 정렬하고, **AC** 는 의미적으로 반응성이 높은 레이어의 어텐션 맵을 Semantic-Weak Layers로 전달하여 명시적인 의미 신호를 주입합니다. 또한, I2V 모델의 instruction-following 능력을 평가하기 위한 **새로운 벤치마크** 를 도입했습니다.

## 주요 결과
**Focal Guidance** 는 새로운 벤치마크에서 **Wan2.1-I2V** 모델의 총점을 **0.7250 (+3.97%)** 로 향상시켰으며, **MMDiT-based HunyuanVideo-I2V** 모델의 성능을 **0.5571 (+7.44%)** 로 끌어올렸습니다. 이러한 성능 향상은 **동적 속성, 인간 동작, 인간 상호작용** 세 가지 핵심 평가 차원에서 두드러지게 나타났으며, 최소한의 사후 학습만으로도 효과적인 것으로 입증되었습니다.

## AI 실무자를 위한 시사점
본 연구는 **DiT 기반 I2V 모델** 의 텍스트 제어력 한계에 대한 심도 깊은 이해를 제공합니다. 제안된 **Focal Guidance** 는 기존 I2V 모델에 **경량화되고 모델에 구애받지 않는 (model-agnostic) 솔루션** 을 제공하여 최소한의 추가 학습으로 프롬프트 충실도를 크게 개선할 수 있습니다. 또한, 도입된 **새로운 벤치마크** 는 I2V 모델의 시각적 품질과 일관성을 넘어선 실질적인 instruction-following 능력을 평가하는 데 유용하며, 더욱 제어 가능한 비디오 생성 애플리케이션 개발에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.