---
title: "[논문리뷰] Selective Training for Large Vision Language Models via Visual Information Gain"
excerpt: "[arXiv]에 게시된 'Selective Training for Large Vision Language Models via Visual Information Gain' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Visual Grounding
  - Language Bias Mitigation
  - Selective Training
  - Perplexity Metric
  - Data Efficiency
  - Multimodal AI

permalink: /ai/review/2026-02-23-Selective-Training-for-Large-Vision-Language-Models-via-Visual-Information-Gain/

toc: true
toc_sticky: true

date: 2026-02-23 00:00:00+0900+0900
last_modified_at: 2026-02-23 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.17186)

**저자:** Seulbi Lee and Sangheum Hwang



## 핵심 연구 목표
대규모 시각-언어 모델(LVLMs)이 시각적 증거 없이 텍스트 편향에 의존하여 응답하는 **언어 편향(language bias)** 및 **시각적 무지(visual ignorance)** 문제를 해결하는 것을 목표로 합니다. 특히, 훈련 데이터 내에서 각 샘플이나 토큰이 시각 정보에 얼마나 의존하는지 **정량적으로 측정** 하고, 이를 통해 시각적 접지(visual grounding)를 강화하고자 합니다.

## 핵심 방법론
예측 불확실성을 줄이는 시각 정보의 기여도를 측정하는 **Perplexity 기반의 지표인 Visual Information Gain (VIG)** 을 제안합니다. **VIG** 는 원본 이미지와 **흐린 이미지(blurred image)** 를 사용한 모델의 손실 차이를 통해 계산되며, **샘플 및 토큰 수준** 에서 시각적 접지를 정량화합니다. 이 VIG 값을 기준으로 **높은 VIG 값을 가진 샘플과 토큰만 선택** 하여 모델을 훈련하는 **VIG-guided selective training** 방식을 적용합니다.

## 주요 결과
**LLaVA-1.5 7B/13B** 및 **ShareGPT4V 7B** 모델에 적용했을 때, **VIG-guided selective training** 은 기존 모델보다 적은 **약 70%의 샘플** 과 **약 5-65%의 활성 토큰** 만으로도 우수한 성능을 달성했습니다. 특히, **LLaVA-1.5 7B** 는 **LLaVA-W에서 +2.20점** , **MMVet에서 +4.09점** 을 개선하고 **MMHal 벤치마크에서 환각(hallucination)을 8.47% 감소** 시켰습니다. 또한, VIG 훈련된 모델은 시각 토큰에 **더 높은 주의 집중** 을 할당하고 **텍스트 오염(textual corruption)에 대한 강건성** 을 향상시켰습니다.

## AI 실무자를 위한 시사점
**VIG** 는 훈련 데이터에서 시각적으로 중요한 부분을 **정량적으로 식별** 하여 모델 훈련의 효율성을 크게 높일 수 있는 강력한 도구입니다. 이는 **적은 양의 고품질 데이터** 로도 강력한 LVLM을 훈련할 수 있게 하여 **학습 비용을 절감** 하고, 모델의 **시각적 접지 능력** 및 **환각 억제 능력** 을 효과적으로 향상시킬 수 있습니다. VIG 계산은 일회성으로 이루어지며, 여러 훈련 실행에서 **재사용 가능** 하여 실용성이 높습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.