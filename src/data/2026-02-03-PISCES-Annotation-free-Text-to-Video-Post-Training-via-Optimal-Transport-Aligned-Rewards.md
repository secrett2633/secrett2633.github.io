---
title: "[논문리뷰] PISCES: Annotation-free Text-to-Video Post-Training via Optimal Transport-Aligned Rewards"
excerpt: "arXiv에 게시된 'PISCES: Annotation-free Text-to-Video Post-Training via Optimal Transport-Aligned Rewards' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Text-to-Video Generation
  - Post-Training
  - Optimal Transport
  - Reward Modeling
  - Annotation-free
  - Vision-Language Models
  - Diffusion Models

permalink: /ai/review/2026-02-03-PISCES-Annotation-free-Text-to-Video-Post-Training-via-Optimal-Transport-Aligned-Rewards/

toc: true
toc_sticky: true

date: 2026-02-03 00:00:00+0900+0900
last_modified_at: 2026-02-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.01624)

**저자:** Minh-Quan Le, Gaurav Mittal, Cheng Zhao, David Gu, Dimitris Samaras, Mei Chen



## 핵심 연구 목표
기존 annotation-free T2V 후처리 학습 방식이 사전 훈련된 **Vision-Language Models (VLMs)** 의 정렬되지 않은 임베딩에 의존하여 최적의 성능을 달성하지 못하는 문제를 해결하는 것을 목표로 합니다. 대규모 인간 주석 없이도 annotation-based 방식에 필적하거나 이를 능가하는 **확장 가능한 T2V 모델** 을 개발하고자 합니다.

## 핵심 방법론
이 논문은 새로운 **Dual Optimal Transport (OT)-aligned Rewards 모듈** 을 제안합니다. 이 모듈은 텍스트-비디오 임베딩을 정렬하기 위해 두 가지 보상을 사용합니다: (i) 시각적 품질과 일관성을 포착하는 **Distributional OT-aligned Quality Reward** 는 **OT map T***를 통해 텍스트 임베딩을 비디오 임베딩 공간으로 변환합니다. (ii) 의미론적 일관성을 강화하는 **Discrete Token-level OT-aligned Semantic Reward** 는 **부분 Optimal Transport** 와 **entropic Sinkhorn solver** 를 사용하여 텍스트 및 비디오 토큰 간의 시공간적 일치성을 감독합니다.

## 주요 결과
**PISCES** 는 **VBench** 평가에서 기존의 모든 annotation-based 및 annotation-free T2V 후처리 학습 방식보다 우수한 성능을 보였습니다. **VideoCrafter2** 에서 **총점 82.75점** , **품질 84.05점** , **의미론적 77.54점** 을 달성했으며, **HunyuanVideo** 에서도 **총점 85.45점** , **품질 86.73점** , **의미론적 80.33점** 으로 모든 기준 모델을 능가했습니다. 인간 평가에서도 **PISCES** 가 시각적 품질, 움직임 품질, 의미론적 정렬 측면에서 지속적으로 선호되는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
**Optimal Transport** 를 T2V 후처리 학습에 적용하여 **VLM 임베딩의 불일치 문제** 를 효과적으로 해결함으로써, 인간 주석의 필요성 없이도 고품질의 비디오를 생성할 수 있는 새로운 길을 열었습니다. 이는 대규모 데이터 수집 및 라벨링 비용을 절감하여 **T2V 모델 개발의 확장성과 효율성** 을 크게 향상시킵니다. 제안된 **Dual OT-aligned Rewards 모듈** 은 다양한 최적화 전략에 적용 가능하므로, **멀티모달 생성 모델** 을 위한 범용적인 보상 설계 프레임워크로 활용될 잠재력이 큽니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.