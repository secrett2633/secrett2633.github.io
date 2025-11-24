---
title: "[논문리뷰] Discrete Diffusion VLA: Bringing Discrete Diffusion to Action Decoding
  in Vision-Language-Action Policies"
excerpt: "Sitong Mao이 [arXiv]에 게시한 'Discrete Diffusion VLA: Bringing Discrete Diffusion to Action Decoding
  in Vision-Language-Action Policies' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA)
  - Discrete Diffusion
  - Action Decoding
  - Transformer
  - Robot Control
  - Masked Modeling
  - Adaptive Decoding
  - Reinforcement Learning

permalink: /ai/review/2025-8-28-Discrete-Diffusion-VLA-Bringing-Discrete-Diffusion-to-Action-Decoding-in-Vision-Language-Action-Policies/

toc: true
toc_sticky: true

date: 2025-08-28 13:10:39+0900
last_modified_at: 2025-08-28 13:10:39+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.20072)

**저자:** Zhixuan Liang, Yizhuo Li, Tianshuo Yang, Chengyue Wu, Sitong Mao, Jiangmiao Pang, Yao Mu, Ping Luo



## 핵심 연구 목표
본 논문은 기존 **Vision-Language-Action (VLA)** 모델 디코더의 한계(고정된 순서의 **autoregressive** 생성 또는 **continuous diffusion**/flow matching 헤드의 백본 분리)를 해결하고자 합니다. 통일되고 확장 가능한 아키텍처를 위해 이산 확산을 이용한 로봇 동작 디코딩을 목표로 하며, VLM 백본과 동일한 **cross-entropy 목적 함수**를 사용하여 일관된 학습 패러다임을 제안합니다.

## 핵심 방법론
제안하는 **Discrete Diffusion VLA**는 단일 **Transformer 아키텍처**를 사용하여 이미지, 언어 및 이산화된 동작 토큰 청크를 동시에 처리합니다. 동작 차원은 **바인딩(binning) 방식**으로 이산화된 토큰으로 변환되며, 이 토큰들을 대상으로 **이산 확산(discrete diffusion)**을 적용하여 동작을 생성합니다. 특히, **"first-easy, then-hard"** 철학에 따라 불확실한 예측을 반복적으로 재검토하는 **적응형 재마스킹(adaptive re-masking)** 전략과 **보조 재마스킹(secondary re-masking)** 기법을 통해 일관성과 오류 수정을 강화합니다.

## 주요 결과
**LIBERO** 벤치마크에서 **평균 96.3%의 성공률(SR)**을 달성하여 **OpenVLA-OFT (Discrete)** 대비 **0.9%** 향상된 성능을 보였습니다. **SimplerEnv-Fractal**에서는 **71.2%의 시각적 일치**를, **SimplerEnv-Bridge**에서는 **49.3%의 전체 성공률**을 기록하여 **autoregressive** 및 **continuous diffusion** 기반 모델들을 일관적으로 능가했습니다. 또한, **함수 평가 횟수(NFEs)**를 **Autoregressive** 방식보다 크게 줄여 추론 효율성을 개선했습니다.

## AI 실무자를 위한 시사점
**Discrete Diffusion VLA**는 **Vision-Language-Action** 정책을 위한 통일된 **Transformer** 아키텍처를 제시하여, VLM의 사전 학습된 지식을 효과적으로 활용하면서도 확장성과 안정성을 높였습니다. **병렬 디코딩** 및 **적응형 재마스킹**을 통해 **Autoregressive 모델**의 순차적 병목 현상을 해소하고, 복잡한 로봇 작업에서의 오류 복구 능력을 강화했습니다. 다만, **고정된 빈(bin) 기반의 동작 토큰화**가 연속 제어의 미세한 정밀도를 제한할 수 있다는 점은 향후 개선 과제로 보입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.