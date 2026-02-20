---
title: "[논문리뷰] CLARE: Continual Learning for Vision-Language-Action Models via Autonomous Adapter Routing and Expansion"
excerpt: "arXiv에 게시된 'CLARE: Continual Learning for Vision-Language-Action Models via Autonomous Adapter Routing and Expansion' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Continual Learning
  - Vision-Language-Action Models
  - Adapter Learning
  - Catastrophic Forgetting
  - Autonomous Routing
  - Parameter-Efficient Learning
  - Robotics

permalink: /ai/review/2026-01-20-CLARE-Continual-Learning-for-Vision-Language-Action-Models-via-Autonomous-Adapter-Routing-and-Expansion/

toc: true
toc_sticky: true

date: 2026-01-20 00:00:00+0900+0900
last_modified_at: 2026-01-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.09512)

**저자:** Ralf Römer, Yi Zhang, Angela P. Schoellig



## 핵심 연구 목표
본 논문은 로봇이 실제 환경에서 새로운 작업을 지속적으로 학습하면서도 기존 지식을 잊지 않는 ** catastrophic forgetting 문제** 를 해결하고, 과거 데이터 저장 및 작업 식별자 없이 작동하는 **exemplar-free continual learning** 을 **Vision-Language-Action (VLA) 모델** 에 적용하는 것을 목표로 합니다. 이는 현재 VLA 모델들이 특정 작업에 대한 미세 조정을 통해 성능을 높이지만, 순차적 학습 환경에서는 기존 지식을 덮어쓰는 문제에 직면한다는 한계에서 출발합니다.

## 핵심 방법론
제안하는 **CLARE** 프레임워크는 사전 훈련된 VLA 모델의 **feedforward network (FFN) 레이어** 에 **경량화된 모듈형 어댑터** 를 주입합니다. 새로운 작업을 학습할 때, **레이어별 특징 유사성** 에 기반한 **동적 확장(dynamic expansion) 전략** 을 통해 필요한 경우에만 어댑터를 추가하고, 기존 파라미터는 고정합니다. 배포 시에는 **autoencoder-based routing 메커니즘** 이 학습된 **재구성 오류(reconstruction error)** 를 활용하여 가장 적합한 어댑터를 **작업 레이블 없이** 자율적으로 활성화합니다.

## 주요 결과
**LIBERO 벤치마크** 실험에서 **CLARE** 는 기존 Continual Learning baselines (예: **ER, SeqFFT, PackNet, SeqLoRA** )를 월등히 능가하는 성능을 보였습니다. 특히, **DiT-Dec** 백본에서 **75.11%의 높은 AUC** 와 **1.85%의 낮은 NBT** 를 달성하여 **catastrophic forgetting을 효과적으로 방지** 했음을 입증했습니다. 또한, 작업당 평균 **1.7%에서 2.3% 수준의 최소한의 파라미터 증가** 만을 보이며 높은 파라미터 효율성을 나타냈습니다.

## AI 실무자를 위한 시사점
**CLARE** 는 **exemplar-free** 및 **task-identifier-free** 방식으로 VLA 모델의 지속적인 학습을 가능하게 하여, 저장 공간 및 개인 정보 보호 제약이 있는 로봇 시스템에 매우 실용적인 솔루션을 제공합니다. **모듈형 어댑터와 자율 라우팅** 접근 방식은 대규모 VLA 모델의 확장성 및 유연성을 높여 실제 환경에서의 **장기적인 로봇 배치** 를 위한 중요한 기반을 마련했습니다. 특히, **인코더 모듈에 어댑터를 추가하는 것이 가장 효과적** 이라는 점은 모델 설계 시 고려할 중요한 지점입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.