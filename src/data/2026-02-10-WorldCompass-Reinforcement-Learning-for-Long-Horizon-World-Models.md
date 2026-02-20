---
title: "[논문리뷰] WorldCompass: Reinforcement Learning for Long-Horizon World Models"
excerpt: "arXiv에 게시된 'WorldCompass: Reinforcement Learning for Long-Horizon World Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - World Models
  - Video Generation
  - Autoregressive Generation
  - Long-Horizon
  - Post-training
  - Diffusion Models
  - Reward Functions

permalink: /ai/review/2026-02-10-WorldCompass-Reinforcement-Learning-for-Long-Horizon-World-Models/

toc: true
toc_sticky: true

date: 2026-02-10 00:00:00+0900+0900
last_modified_at: 2026-02-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.09022)

**저자:** Zehan Wang, Tengfei Wang, Haiyu Zhang, Xuhui Zuo, Junta Wu, Haoyuan Wang, Wenqiang Sun, Zhenwei Wang, Chenjie Cao, Hengshuang Zhao, Chunchao Guo, Zhou Zhao



## 핵심 연구 목표
본 논문은 상호작용적 비디오 기반 세계 모델(world models)의 장기적인 탐색 정확도와 일관성을 향상시키기 위해, **강화 학습(RL) 기반의 후처리 훈련 프레임워크인 WorldCompass** 를 제안합니다. 특히, 기존 모델들이 사전 훈련 단계에 머물러 상호작용 신호에 대한 직접적인 학습이 부족하다는 문제를 해결하고, 모델이 상호작용 신호를 기반으로 세계를 더욱 효과적으로 탐색하도록 유도하는 것을 목표로 합니다.

## 핵심 방법론
WorldCompass는 자동회귀 비디오 생성 패러다임에 맞춰 세 가지 핵심 혁신을 도입합니다. 첫째, 효율적인 롤아웃과 세분화된 보상 신호를 위해 **클립-레벨 롤아웃 전략** 을 사용합니다. 둘째, 보상 해킹(reward hacking)을 억제하고 상호작용 정확도와 시각적 품질을 동시에 개선하기 위해 **상호보완적인 보상 함수** 를 설계합니다. 셋째, **negative-aware fine-tuning 전략** 과 다양한 효율성 최적화(예: **Best-of-N 샘플 선택** , **점진적 최적화 전략** )를 결합한 RL 알고리즘을 활용하여 모델 용량을 효율적으로 증대시킵니다.

## 주요 결과
최신 오픈소스 세계 모델인 **WorldPlay (HunyuanVideo-1.5-8B, Wan2.2-5B)** 에 대한 후처리 훈련 결과, WorldCompass가 상호작용 정확도와 시각적 품질을 크게 향상시켰습니다. 복합 동작 입력의 경우 평균 상호작용 정확도가 약 **20%에서 55%** 로, 기본 동작 입력에서는 **10% 포인트(예: 60%에서 70%)** 향상되었습니다. 또한, 훈련 효율성 최적화를 통해 훈련 오버헤드를 **50%** 까지 줄이면서도 경쟁력 있는 성능을 유지했습니다.

## AI 실무자를 위한 시사점
본 연구는 대규모 비디오 기반 세계 모델의 상호작용 능력을 **RL 후처리 훈련** 을 통해 효과적으로 개선할 수 있음을 보여줍니다. 특히, **클립-레벨 롤아웃** 과 **상호보완적 보상 함수** 설계는 긴 시퀀스 생성 및 복잡한 상호작용 환경에서 모델의 안정적인 학습과 성능 향상에 중요한 기법임을 시사합니다. AI 개발자들은 **WorldCompass** 프레임워크를 활용하여 기존 세계 모델의 근본적인 한계를 극복하고, 더욱 정확하고 일관된 상호작용을 구현하는 데 필요한 지침을 얻을 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.