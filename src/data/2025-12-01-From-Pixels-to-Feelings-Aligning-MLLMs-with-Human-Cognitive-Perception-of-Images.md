---
title: "[논문리뷰] From Pixels to Feelings: Aligning MLLMs with Human Cognitive Perception of Images"
excerpt: "Filippos Kokkinos이 [arXiv]에 게시한 'From Pixels to Feelings: Aligning MLLMs with Human Cognitive Perception of Images' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal LLM
  - Human Cognition
  - Image Perception
  - Benchmarking
  - Supervised Fine-tuning
  - Image Generation
  - Aesthetics
  - Memorability

permalink: /ai/review/2025-12-01-From-Pixels-to-Feelings-Aligning-MLLMs-with-Human-Cognitive-Perception-of-Images/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.22805)

**저자:** Yiming Chen, Junlin Han, Tianyi Bai, Shengbang Tong, Filippos Kokkinos, Philip Torr



## 핵심 연구 목표
본 논문은 **MLLM(Multimodal Large Language Model)** 이 이미지 내 객체를 인식하는 '무엇'을 넘어, 인간이 이미지를 주관적으로 인지하는 '어떻게 느끼는지'를 이해하는 능력의 부족을 해결하고자 합니다. 특히 심미성, 유머, 감성, 기억성 등 주관적인 인지 특성에 대한 모델의 **인간-모델 간 인지 불일치(cognitive misalignment)** 를 체계적으로 평가하고 개선하는 것을 목표로 합니다.

## 핵심 방법론
연구진은 네 가지 주요 인지 특성(심미성, 유머, 감성, 기억성)을 평가하는 종합 벤치마크인 **CogIP-Bench** 를 도입했습니다. 이 갭을 메우기 위해 **소프트 레이블 손실(soft-label loss)** 및 **분류 작업으로서의 카테고리 레이블 예측** 을 포함하는 **표준 지도 미세 조정(SFT) 파이프라인** 을 통해 MLLM을 후처리 훈련시킵니다. 또한, 미세 조정된 MLLM을 **Qwen-Image** 와 같은 이미지 생성 파이프라인에 통합하여 인지적 정렬의 전이 가능성을 입증합니다.

## 주요 결과
초기 MLLM은 인간의 기억성 판단과 **거의 0에 가까운 상관관계** 를 보였으며, 다른 인지 차원에서는 평균 **Spearman 상관관계가 0.5 미만** 이었습니다. 후처리 훈련 후, 모델은 일관된 정렬 개선을 보였고, 특히 **Gemma3-12B-it** 는 **ImageReward 점수에서 +22.8% 향상** 을 달성했습니다. 사용자 연구 결과, 정렬된 모델로 생성된 이미지가 기본 모델 대비 **인간에게 1.7배 더 높은 선호도** 를 얻었습니다.

## AI 실무자를 위한 시사점
이 연구는 **MLLM이 인간과 같은 주관적인 시각 인지 능력** 을 습득할 수 있음을 보여주어, AI의 '느낌'에 대한 새로운 가능성을 열었습니다. 특히 **텍스트-이미지 생성(text-to-image generation)** 과 같은 창의적 작업에서 모델이 인간 중심적인 특성을 더 잘 반영하도록 제어할 수 있게 됩니다. 이는 향후 **더욱 인간 친화적인 AI 시스템 개발** 을 위한 중요한 기반을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.