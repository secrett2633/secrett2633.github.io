---
title: "[논문리뷰] DDiT: Dynamic Patch Scheduling for Efficient Diffusion Transformers"
excerpt: "Deepti Ghadiyaram이 [arXiv]에 게시한 'DDiT: Dynamic Patch Scheduling for Efficient Diffusion Transformers' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Transformers
  - Dynamic Tokenization
  - Patch Scheduling
  - Inference Acceleration
  - Text-to-Image Generation
  - Text-to-Video Generation
  - Latent Manifold Analysis
  - LoRA

permalink: /ai/review/2026-02-20-DDiT-Dynamic-Patch-Scheduling-for-Efficient-Diffusion-Transformers/

toc: true
toc_sticky: true

date: 2026-02-20 00:00:00+0900+0900
last_modified_at: 2026-02-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.16968)

**저자:** Dahye Kim, Deepti Ghadiyaram, Raghudeep Gadde



## 핵심 연구 목표
본 논문은 **Diffusion Transformers (DiTs)** 의 높은 계산 비용 문제를 해결하는 것을 목표로 합니다. 특히, 기존 DiT 모델이 이미지 및 비디오 생성 과정에서 고정된 크기의 패치를 사용하여 콘텐츠 복잡도와 무관하게 비효율적인 연산을 수행하는 한계를 극복하고, 지각적 품질 저하 없이 추론 속도를 대폭 향상시키는 동적 토큰화 전략을 제안합니다.

## 핵심 방법론
제안하는 **DDiT** 는 추론 시 동적으로 패치 크기를 조절하는 전략으로, 초기 단계에서는 전역 구조 모델링을 위해 **더 큰 패치** 를, 후기 단계에서는 미세한 디테일 정제를 위해 **더 작은 패치** 를 사용합니다. 이를 위해, 잠재 매니폴드(latent manifold)의 시간 경과에 따른 변화율을 **3차 유한 차분 근사(third-order finite-difference approximation)** 를 통해 측정하고, 각 패치의 가속도 표준 편차의 **ρ-th percentile** 이 사전 정의된 임계값( **T** )보다 낮을 경우 더 큰 패치를 선택합니다. 기존 모델에 최소한의 아키텍처 변경으로 적용하기 위해 **LoRA (Low-Rank Adaptation)** 브랜치와 **잔여 연결(residual connection)** 을 도입하고, **증류 손실(distillation loss)** 을 사용하여 미세 조정합니다.

## 주요 결과
DDiT는 **FLUX-1.dev** 모델을 사용한 텍스트-투-이미지(T2I) 생성에서 최대 **2.18배** 의 속도 향상을 달성하며, **TeaCache** 와 결합 시 최대 **3.52배** 의 속도 향상을 기록했습니다. 또한, **Wan-2.1** 모델을 사용한 텍스트-투-비디오(T2V) 생성에서는 **3.2배** 의 속도 향상을 달성하면서도, ImageReward, CLIP, VBench 등의 지각적 품질 지표에서 기준선과 유사한 성능을 유지했습니다. 사용자 연구 결과 DDiT 생성 이미지가 기준선과 시각적으로 유사하거나 더 선호되는 경향을 보였습니다.

## AI 실무자를 위한 시사점
AI 실무자들은 DDiT를 통해 **DiT 기반 생성 모델의 추론 비용을 크게 절감** 하면서도, 출력 품질을 유지할 수 있습니다. 특히, 기존 사전 훈련된 DiT 모델에 **플러그 앤 플레이 방식** 으로 쉽게 적용 가능하여, 추가적인 대규모 재훈련 없이 효율성을 개선할 수 있는 실용적인 방법론입니다. **다양한 콘텐츠 복잡도에 따라 연산 자원을 동적으로 할당** 함으로써, 시스템 확장성과 응용 유연성을 높일 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.