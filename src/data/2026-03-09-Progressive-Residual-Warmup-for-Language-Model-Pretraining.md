---
title: "[논문리뷰] Progressive Residual Warmup for Language Model Pretraining"
excerpt: "Yang Wang이 arXiv에 게시한 'Progressive Residual Warmup for Language Model Pretraining' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Large Language Models (LLMs)
  - Transformer
  - Pretraining Stability
  - Residual Connections
  - Warmup Schedule
  - Layer-wise Learning
  - Optimization

permalink: /ai/review/2026-03-09-Progressive-Residual-Warmup-for-Language-Model-Pretraining/

toc: true
toc_sticky: true

date: 2026-03-09 00:00:00+0900+0900
last_modified_at: 2026-03-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.05369)

**저자:** Tianhao Chen, Xin Xu, Lu Yin, Hao Chen, Yang Wang, Shizhe Diao, Can Yang



## 핵심 연구 목표
Transformer 기반 **Large Language Models (LLMs)** 의 사전 훈련 안정성과 수렴 속도를 향상시키는 것을 목표로 합니다. 특히, 계층적으로 쌓인 Transformer 아키텍처에서 깊은 레이어들이 얕은 레이어들이 안정화되기 전에 기여하여 발생하는 비효율적인 업데이트 문제를 해결하고자 합니다.

## 핵심 방법론
논문은 **Progressive Residual Warmup (ProRes)** 이라는 새로운 방법을 제안합니다. 이 방법은 각 레이어의 잔차 연결에 **사전 정의된 스칼라 `α(l, t)`** 를 곱하여 **`xι+1 = xι + α(l, t) ⋅ F(Norm(xι))`** 와 같이 점진적으로 활성화합니다. 스칼라는 훈련이 진행됨에 따라 **0에서 1까지** 점진적으로 증가하며, 깊은 레이어일수록 더 긴 웜업 스텝을 거쳐 얕은 레이어가 먼저 안정화되도록 조정합니다. 이 방법은 **Pre-LN, Post-LN, Sandwich-LN** 등 다양한 Transformer 변형과 **130M부터 7B까지** 다양한 모델 크기에 적용되어 평가되었습니다.

## 주요 결과
ProRes는 모든 설정에서 perplexity를 일관되게 감소시켰으며, 특히 1.3B Pre-LN 모델의 perplexity는 **10.32에서 9.86** 으로, Post-LN은 **11.62에서 10.53** 으로 개선되었습니다. 또한, 1.3B 모델의 추론 벤치마크에서 평균 **+1.27%** 의 제로샷 정확도 향상을 보였고, LAMBADA에서는 **2.89%** 의 정확도 증가를 달성했습니다. ProRes는 손실 스파이크(spike)를 거의 0으로 유지하여 훈련 안정성을 높이고, Pre-LN에서 흔히 관찰되는 **지수적 활성화 성장** 을 완화하여 보다 부드러운 성장을 유도하는 것으로 나타났습니다.

## AI 실무자를 위한 시사점
ProRes는 LLM 사전 훈련의 **안정성과 수렴 속도를 향상** 시킬 수 있는 간단하면서도 확장 가능한 방법을 제공합니다. 이 방법은 특정 Transformer 아키텍처나 초기화 방식에 구애받지 않고 **일관된 성능 개선** 을 보여주므로, 대규모 Transformer 모델을 훈련하는 AI 실무자에게 유용합니다. 특히, **훈련 단계별 잔차 스케줄링** 을 통해 **빠른 수렴, 더 나은 일반화 능력, 그리고 향상된 다운스트림 성능** 을 기대할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.