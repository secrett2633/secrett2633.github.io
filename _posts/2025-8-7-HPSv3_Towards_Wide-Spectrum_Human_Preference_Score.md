---
title: "[논문리뷰] HPSv3: Towards Wide-Spectrum Human Preference Score"
excerpt: "Hongsheng Li이 [arXiv]에 게시한 'HPSv3: Towards Wide-Spectrum Human Preference Score' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Human Preference Score
  - Text-to-Image Generation
  - Image Evaluation
  - Vision-Language Models (VLMs)
  - Uncertainty-Aware Ranking Loss
  - Dataset
  - Iterative Refinement
  - Chain-of-Thought

permalink: /ai/review/2025-8-7-HPSv3_Towards_Wide-Spectrum_Human_Preference_Score/

toc: true
toc_sticky: true

date: 2025-08-07 13:38:21+0900
last_modified_at: 2025-08-07 13:38:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.03789)

**저자:** Yuhang Ma, Xiaoshi Wu, Keqiang Sun, Hongsheng Li



## 핵심 연구 목표
본 논문은 기존 텍스트-이미지 생성 모델 평가를 위한 인간 중심 지표들이 **제한적인 데이터 커버리지**, **불완전한 특징 추출**, **비효율적인 손실 함수**로 인해 인간의 선호도와 충분히 정렬되지 못하는 문제를 해결하는 것을 목표로 합니다. 이는 고급 생성 모델의 평가와 실제 인간 인식과의 일치성을 저해합니다.

## 핵심 방법론
저자들은 **1.08M 텍스트-이미지 쌍**과 **1.17M 쌍별 비교**를 포함하는 최초의 광범위한 인간 선호도 데이터셋인 **HPDv3**를 공개했습니다. 이 데이터셋을 기반으로 **VLM 기반**(Qwen2-VL)의 인간 선호도 모델인 **HPSv3**를 훈련했으며, 주석가의 불확실성이나 오류를 완화하기 위해 **불확실성 인식 랭킹 손실(uncertainty-aware ranking loss)**을 사용했습니다. 또한, **HPSv3**를 보상 모델로 활용하여 이미지 생성 품질을 반복적으로 개선하는 새로운 추론 기반 접근 방식인 **CoHP(Chain-of-Human-Preference)**를 제안했습니다.

## 주요 결과
**HPSv3**는 인간의 선호도를 가장 잘 반영하는 메트릭으로, 자체 **HPDv3 벤치마크**에서 인간 주석과의 가장 높은 상관관계(**Spearman r = 0.94**, **Kendall T = 0.8222**)를 달성했습니다. 다양한 데이터셋(PickScore, HPDv2, HPDv3)에 대한 선호도 예측 정확도에서 각각 **72.8%**, **85.4%**, **76.9%**의 최첨단 성능을 보였습니다. **CoHP** 방법은 반복적인 개선을 통해 이미지 품질을 향상시켰으며, 사용자 연구에서 **ImageReward보다 87% 높은 승률**을 기록하며 인간 선호도와 더 잘 일치하는 이미지를 생성함을 입증했습니다.

## AI 실무자를 위한 시사점
**HPSv3**는 광범위한 품질 스펙트럼에 걸쳐 텍스트-이미지 생성 모델을 평가하는 **강력하고 신뢰할 수 있는 벤치마크**를 제공하여 모델 개발 및 벤치마킹에 필수적입니다. **HPDv3 데이터셋**은 미래의 생성 모델 및 평가 지표를 훈련하고 검증하는 데 귀중한 자원이 될 것입니다. **CoHP 반복 개선 방법**은 추가 훈련 데이터 없이도 이미지 생성 품질을 향상시키는 **효율적인 접근 방식**으로, 실제 애플리케이션에서 품질 제어가 중요한 경우 유용하게 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.