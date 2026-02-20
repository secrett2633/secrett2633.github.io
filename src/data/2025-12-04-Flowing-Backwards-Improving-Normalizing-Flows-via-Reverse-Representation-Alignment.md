---
title: "[논문리뷰] Flowing Backwards: Improving Normalizing Flows via Reverse Representation Alignment"
excerpt: "arXiv에 게시된 'Flowing Backwards: Improving Normalizing Flows via Reverse Representation Alignment' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Normalizing Flows
  - Representation Alignment
  - Generative Models
  - TARFlow
  - Image Generation
  - Classification
  - Training Acceleration
  - Reverse Pass

permalink: /ai/review/2025-12-04-Flowing-Backwards-Improving-Normalizing-Flows-via-Reverse-Representation-Alignment/

toc: true
toc_sticky: true

date: 2025-12-04 00:00:00+0900+0900
last_modified_at: 2025-12-04 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.22345)

**저자:** Yang Chen, Xiaowei Xu, Shuai Wang, Chenhui Zhu, Ruxue Wen, Xubin Li, Tiezheng Ge, Limin Wang



## 핵심 연구 목표
본 논문은 **Normalizing Flows (NFs)** 의 생성 품질이 학습된 의미론적 표현의 부족으로 제한되는 문제를 해결하고자 합니다. NF의 고유한 **가역적 구조(invertible structure)** 를 활용하여 표현 학습과 데이터 생성을 효과적으로 통합하고, 이를 통해 NF의 **생성 능력(generative capabilities)** 과 **판별 능력(discriminative performance)** 을 동시에 극대화하는 새로운 방법을 제시하는 것을 목표로 합니다.

## 핵심 방법론
제안하는 **역방향 표현 정렬(Reverse Representation Alignment, R-REPA)** 은 NF의 **역방향(generative) 패스** 에서 중간 특징을 강력한 **사전 훈련된 비전 파운데이션 모델(VFM)** 의 표현과 정렬합니다. 이 정렬 손실의 그래디언트는 **생성 그래프** 에만 적용되어 **합성 정제** 를 유도하고 **핵심 밀도 모델** 을 방해하지 않습니다. 또한, NF의 내재된 의미론적 지식을 평가하기 위한 **훈련-자유 테스트-시간 최적화 분류 알고리즘** 을 도입하고, 고해상도 이미지 생성을 위해 **사전 훈련된 VAE의 잠재 공간** 에서 **TARFlow 아키텍처** 를 활용했습니다.

## 주요 결과
**R-REPA** 는 NF 훈련을 **3.3배 이상 가속화** 하면서, **ImageNet 64x64** 에서 **FID 3.69** (TARFlow baseline 4.21 대비) 및 **분류 정확도 57.02%** (baseline 39.97% 대비)를 달성하여 **생성 품질** 과 **분류 성능** 을 모두 크게 향상시켰습니다. **ImageNet 256x256** 에서도 **FID 4.18** 을 달성하며 **최첨단 성능** 을 수립했고, 특히 **2단계 샘플링** 만으로 경쟁 모델 대비 높은 추론 효율성을 보였습니다.

## AI 실무자를 위한 시사점
본 연구는 Normalizing Flows의 **훈련 효율성** 과 **모델 성능(생성 및 분류)** 을 동시에 향상시키는 실용적인 방법론을 제시합니다. **사전 훈련된 VFM** 을 활용한 **역방향 표현 정렬** 은 기존 생성 모델의 한계를 극복하고 **의미론적 일관성** 을 높이는 효과적인 전략으로, 실제 AI 애플리케이션에서 고품질 이미지 생성 및 이해에 NF를 활용할 가능성을 확장합니다. **고해상도 이미지 생성** 시 **VAE 잠재 공간** 과 결합하는 접근 방식은 **계산 효율성** 과 **확장성** 을 확보하는 데 중요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.