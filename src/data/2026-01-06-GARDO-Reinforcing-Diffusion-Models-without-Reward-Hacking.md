---
title: "[논문리뷰] GARDO: Reinforcing Diffusion Models without Reward Hacking"
excerpt: "Zhiyong Wang이 [arXiv]에 게시한 'GARDO: Reinforcing Diffusion Models without Reward Hacking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Reinforcement Learning
  - Reward Hacking
  - KL Regularization
  - Adaptive Regularization
  - Diversity Optimization
  - Text-to-Image Generation

permalink: /ai/review/2026-01-06-GARDO-Reinforcing-Diffusion-Models-without-Reward-Hacking/

toc: true
toc_sticky: true

date: 2026-01-06 00:00:00+0900+0900
last_modified_at: 2026-01-06 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.24138)

**저자:** Haoran He, Yuxiao Ye, Jie Liu, Jiajun Liang, Zhiyong Wang, Ziyang Yuan, Xintao Wang, Hangyu Mao, Pengfei Wan, Ling Pan



## 핵심 연구 목표
Reinforcement Learning(RL) 기반의 확산 모델 fine-tuning 과정에서 발생하는 **Reward Hacking** 문제(proxy reward는 증가하지만 실제 이미지 품질이 저하되고 다양성이 감소하는 현상)를 해결하는 것이 주 목표입니다. 특히, sample 효율성, 효과적인 탐색, 그리고 생성 다양성을 저해하지 않으면서 reward hacking을 완화하고자 합니다.

## 핵심 방법론
본 논문은 **Gated and Adaptive Regularization with Diversity-aware Optimization (GARDO)** 프레임워크를 제안합니다. 이는 **불확실성이 높은 샘플(약 10%)에만 KL 페널티를 선별적으로 적용** 하는 Gated KL 메커니즘, 온라인 정책의 능력에 맞춰 **참조 모델을 주기적으로 업데이트** 하는 Adaptive Regularization, 그리고 **DINOv3** 임베딩을 활용한 **곱셈적 이점 재형성(multiplicative advantage reshaping)** 을 통해 **고품질/고다양성 샘플에 대한 보상을 증폭** 하는 다양성 인식 최적화 전략을 포함합니다.

## 주요 결과
GARDO는 reward hacking을 효과적으로 완화하고 생성 다양성을 향상시켰습니다. OCR task에서 **KL-free baseline과 유사한 proxy reward(OCR 0.96)** 를 달성하면서도, **Aesthetic(5.02), HPSv3(9.51), Diversity(21.03)** 와 같은 미지의 metrics에서 더 우수한 성능을 보였습니다(Table 1). 특히, GenEval task에서 Diversity 점수는 **19.98에서 24.95** 로 크게 증가했으며, KL-free baseline과 동등한 sample 효율성을 유지했습니다.

## AI 실무자를 위한 시사점
GARDO는 RL로 fine-tuning하는 생성 모델에서 흔히 발생하는 reward hacking과 mode collapse 문제를 해결하는 실용적인 프레임워크를 제공합니다. **선별적이고 동적인 KL 규제** 및 **다양성 인식 보상 강화** 기법은 모델이 더 견고하고 다양한 고품질 이미지를 생성하는 데 도움을 줍니다. 이는 텍스트-이미지 모델의 실제 배포 및 활용에 있어 신뢰성과 사용자 만족도를 높이는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.