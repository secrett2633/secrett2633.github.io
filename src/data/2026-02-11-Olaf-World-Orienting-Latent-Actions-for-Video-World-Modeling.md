---
title: "[논문리뷰] Olaf-World: Orienting Latent Actions for Video World Modeling"
excerpt: "Mike Zheng Shou이 [arXiv]에 게시한 'Olaf-World: Orienting Latent Actions for Video World Modeling' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video World Models
  - Latent Actions
  - Cross-context Transfer
  - Zero-shot Action Transfer
  - Data-efficient Adaptation
  - Self-supervised Learning
  - Representation Alignment

permalink: /ai/review/2026-02-11-Olaf-World-Orienting-Latent-Actions-for-Video-World-Modeling/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.10104)

**저자:** Yuxin Jiang, Yuchao Gu, Ivor W. Tsang, Mike Zheng Shou



## 핵심 연구 목표
본 논문은 액션 레이블의 희소성으로 인해 액션-제어 가능한 월드 모델의 확장이 제한되는 문제를 해결하고자 합니다. 특히, 기존 잠재 액션 학습 방식이 컨텍스트(장면, 시점 등)에 따라 액션 의미론이 일관되지 않아 전이가 어렵다는 근본적인 한계를 극복하고, 컨텍스트에 불변하는 전이 가능한 잠재 액션 공간을 학습하는 것을 목표로 합니다.

## 핵심 방법론
논문은 시퀀스 수준의 제어-효과 정렬(control-effect alignment) 목표인 **Seq△-REPA** 를 제안합니다. 이 방법론은 통합된 잠재 액션을 동결된 자가 지도(self-supervised) 비디오 인코더( **V-JEPA2 ViT** )에서 추출된 시간적 특징 차이(semantic effect direction)에 정렬하여 컨텍스트 불변의 의미론을 학습합니다. 이어서, **Olaf-World** 는 이 잠재 액션을 통합 제어 인터페이스로 사용하여 대규모 비디오 데이터에 **DiT (SkyReels I2V 1.3B)** 기반의 액션-조건부 비디오 월드 모델을 사전 훈련합니다. 타겟 환경으로의 적응 시에는 가벼운 **액션 어댑터(MLP)** 와 **LoRA** 만 미세 조정합니다.

## 주요 결과
**Seq△-REPA** 는 잠재 액션 공간의 선형 디코딩 가능성과 컨텍스트 불변성을 크게 향상시켰습니다. 교차 도메인 선형 프로빙(cross-domain linear probing)에서 **Olaf-World** 는 **AdaWorld** 대비 1ST-P→3RD-P 변환에서 **0.6250** 의 Macro-F1 점수를 달성하여 **AdaWorld** 의 0.4820을 크게 상회했습니다. 또한, 최소한의 레이블 데이터(예: 1분 분량)로 새로운 액션 공간에 효율적으로 적응하여, 1개의 레이블 비디오로 **1ST-P** 에서 **0.0284** 의 RPE-trans와 **0.4680** 의 RPE-rot를 기록하며 최첨단 기준선을 능가했습니다.

## AI 실무자를 위한 시사점
**Olaf-World** 는 레이블링된 데이터의 부족이라는 주요 병목 현상을 해결하여, 액션-제어 가능한 월드 모델을 대규모 비지도(unlabeled) 비디오에서 학습할 수 있는 실용적인 경로를 제공합니다. **Seq△-REPA** 는 로봇 공학 및 대화형 AI 분야에서 **제로샷 제어(zero-shot control)** 와 **데이터 효율적인 미세 조정(data-efficient fine-tuning)** 을 위한 견고하고 전이 가능한 잠재 액션 표현 학습의 가능성을 제시합니다. 이는 미래의 지능형 시스템 개발에 있어 중요한 발전으로 작용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.