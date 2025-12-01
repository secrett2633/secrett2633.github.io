---
title: "[논문리뷰] Visual Autoregressive Models Beat Diffusion Models on Inference Time
  Scaling"
excerpt: "Dim P. Papadopoulos이 [arXiv]에 게시한 'Visual Autoregressive Models Beat Diffusion Models on Inference Time
  Scaling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Visual Autoregressive Models
  - Diffusion Models
  - Inference Time Scaling
  - Beam Search
  - Image Generation
  - Text-to-Image Synthesis
  - Discrete Latent Space

permalink: /ai/review/2025-10-21-Visual-Autoregressive-Models-Beat-Diffusion-Models-on-Inference-Time-Scaling/

toc: true
toc_sticky: true

date: 2025-10-21 13:08:30+0900
last_modified_at: 2025-10-21 13:08:30+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.16751)

**저자:** Erik Riise, Mehmet Onurcan Kaya, Dim P. Papadopoulos



## 핵심 연구 목표
본 연구는 대규모 언어 모델(LLMs)에서 성공적인 추론 시간 스케일링(search) 전략이 연속적인 잠재 공간을 사용하는 확산 모델(Diffusion Models)에서는 제한적인 이점을 보이는 문제를 해결하고자 합니다. 특히, 이산적인 토큰 공간을 갖는 **시각적 자기회귀 모델(Visual Autoregressive Models)** 이 LLMs와 유사하게 효과적인 탐색 알고리즘을 활용하여 이미지 생성 품질과 효율성을 향상할 수 있는지 검증하는 것을 목표로 합니다.

## 핵심 방법론
연구팀은 최신 자기회귀 모델인 **Infinity-2B** 를 활용하여 이미지 생성 프로세스의 이산적인 토큰 구조를 탐색했습니다. 이를 위해 **Random Search** , **Greedy Token Optimization (GTO)** , 그리고 **Beam Search** 와 같은 다양한 탐색 전략을 적용하고, **ImageReward** , **CLIPScore** , **Aesthetic Score** , **LLaVA-OneVision** 등 다양한 검증기(verifier)를 사용하여 생성된 이미지의 품질을 평가했습니다. 특히, **Number of Function Evaluations (NFEs)** 를 통해 모델의 계산 비용을 정량적으로 비교했습니다.

## 주요 결과
**Beam Search** 가 텍스트-투-이미지 생성 성능을 크게 향상시킴을 입증했습니다. **2B 파라미터 자기회귀 모델** 은 **12B 파라미터 확산 모델 (FLUX.1-dev)** 을 **DrawBench** 벤치마크에서 능가했으며, 이는 **절반 미만의 계산 예산 (1365 NFEs vs. 2880 NFEs)** 으로 달성되었습니다. 더 나아가, 유사한 계산 예산에서 **자기회귀 모델** 은 확산 모델 대비 **1.3배에서 3.1배 높은 성능 향상** 을 보였습니다. 이러한 효율성 증가는 자기회귀 모델의 이산 토큰 공간에서 가능한 조기 가지치기 및 계산 재활용 덕분입니다.

## AI 실무자를 위한 시사점
이 연구는 단순히 모델의 규모를 키우는 것보다 **모델 아키텍처** 와 **추론 알고리즘의 호환성** 이 효율적인 이미지 생성에 더 중요할 수 있음을 시사합니다. 특히, 이산적인 토큰 공간을 활용하는 **자기회귀 모델** 이 **Beam Search** 와 같은 탐색 전략과 결합될 때, 복잡한 구성(compositional)을 요구하는 텍스트-투-이미지 태스크에서 훨씬 효율적이고 고품질의 결과를 얻을 수 있습니다. 따라서 AI 실무자들은 작업의 복잡성과 계산 예산에 따라 적절한 모델 아키텍처와 검증기를 선택하는 전략적 접근이 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.