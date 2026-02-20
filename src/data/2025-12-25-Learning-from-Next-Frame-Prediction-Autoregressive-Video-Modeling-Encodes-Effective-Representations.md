---
title: "[논문리뷰] Learning from Next-Frame Prediction: Autoregressive Video Modeling Encodes Effective Representations"
excerpt: "arXiv에 게시된 'Learning from Next-Frame Prediction: Autoregressive Video Modeling Encodes Effective Representations' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Autoregressive Model
  - Video Modeling
  - Generative Pretraining
  - Representation Learning
  - Flow-Matching Decoder
  - Context Isolation
  - Masked Next-Frame Prediction

permalink: /ai/review/2025-12-25-Learning-from-Next-Frame-Prediction-Autoregressive-Video-Modeling-Encodes-Effective-Representations/

toc: true
toc_sticky: true

date: 2025-12-25 00:00:00+0900+0900
last_modified_at: 2025-12-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.21004)

**저자:** Jinghan Li, Yang Jin*, Hao Jiang, Yadong Mu, Yang Song, Kun Xu* (Peking University)



## 핵심 연구 목표
기존 시각 생성 사전 훈련 방법론이 비디오의 핵심적인 시간 정보를 간과하거나, 자기회귀 방식이 의미론적 부정확성 및 낮은 생성 품질을 겪는 문제를 해결합니다. 본 연구는 이미지와 비디오를 통합하여 모델링하는 새로운 자기회귀 시각 생성 사전 훈련 프레임워크인 **NExT-Vid** 를 제안하여, 효과적인 표현을 인코딩하고 시각적 표현 학습에서 기존 생성 사전 훈련 방법을 능가하는 것을 목표로 합니다.

## 핵심 방법론
**NExT-Vid** 는 **마스크된 다음 프레임 예측(masked next-frame prediction)** 패러다임을 기반으로 하며, 두 가지 핵심 구성요소를 가집니다. 첫째, **Context-isolated autoregressive predictor** 는 **Q-former 스타일의 자기회귀 블록** 과 **인과적 교차 어텐션** 을 사용하여 의미론적 표현을 디코딩 과정과 분리하고, **표현 정렬(representation alignment)** 정규화를 통해 인코더 출력을 안정화합니다. 둘째, **Conditioned flow-matching decoder** 는 예측된 잠재 특징을 조건으로 사용하여 다음 프레임의 VAE 잠재 특징을 생성하며, **프레임 분리 어텐션 마스크(frame-isolated attention mask)** 를 적용하여 고품질 및 다양성 높은 생성을 촉진합니다.

## 주요 결과
**NExT-Vid** 는 **K400, IN1K, SSv2, Diving48** 벤치마크에서 기존 생성 사전 훈련 방법론 대비 최첨단 성능을 달성했습니다. 특히, 가장 큰 **ViT-G (1.1B 파라미터)** 모델은 **K400에서 83.1%** , **IN1K에서 81.4%** , **SSv2에서 69.5%** , **Diving48에서 87.2%** 의 top-1 정확도를 기록하며 기존 방법들을 크게 능가했습니다. 또한, 마스킹 전략 도입 시 **IN1K 정확도가 31.0%에서 75.0%로** 상승하여 의미론적 표현 품질 향상에 필수적임을 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 비디오 모델링에서 **자기회귀 생성 사전 훈련의 강력한 가능성** 을 보여주며, 특히 비디오의 시간적 정보를 효과적으로 학습하는 새로운 방안을 제시합니다. **Context-isolated 설계** 는 인코더가 보다 안정적이고 강력한 의미론적 특징을 학습하도록 유도하는 효과적인 전략으로, 고품질 비디오 이해 시스템 구축에 영감을 줄 수 있습니다. **Conditioned flow-matching decoder** 는 생성 품질과 다양성을 동시에 높이는 데 기여하여, 실제 비디오 생성 및 분석 애플리케이션에 유용하게 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.