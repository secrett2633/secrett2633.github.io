---
title: "[논문리뷰] Mixture of Horizons in Action Chunking"
excerpt: "Zelong Sun이 arXiv에 게시한 'Mixture of Horizons in Action Chunking' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Action Chunking
  - Robotic Manipulation
  - Multi-horizon Planning
  - Transformer Architecture
  - Gated Fusion
  - Dynamic Inference

permalink: /ai/review/2025-12-03-Mixture-of-Horizons-in-Action-Chunking/

toc: true
toc_sticky: true

date: 2025-12-03 00:00:00+0900+0900
last_modified_at: 2025-12-03 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.19433)

**저자:** Dong Jing, Gang Wang, Jiaqi Liu, Weiliang Tang, Zelong Sun, Yunchao Yao, Zhenyu Wei, Yunhui Liu, Zhiwu Lu, Mingyu Ding



## 핵심 연구 목표
본 논문은 **Vision-Language-Action (VLA) 모델** 에서 고정된 **액션 청크 길이(horizon)** 가 유발하는 근본적인 한계점을 해결하고자 합니다. 특히, 긴 horizon은 장기 예측에는 유리하나 정밀도가 떨어지고, 짧은 horizon은 정밀하지만 장기 예측 능력이 부족한 **내재적인 trade-off** 를 완화하여, 단일 모델 내에서 장기적 통찰력과 단기적 정밀도를 동시에 활용하는 것을 목표로 합니다.

## 핵심 방법론
저자들은 **Mixture of Horizons (MoH) 전략** 을 제안합니다. 이 전략은 액션 청크를 다양한 horizon을 가진 여러 세그먼트로 재구성하고, 이를 **공유 액션 Transformer** 로 병렬 처리합니다. 각 horizon의 예측은 **경량 선형 게이팅 메커니즘** 을 통해 융합되며, 게이팅 네트워크의 편향을 방지하기 위해 **밸런스 손실 (Lbal)** 을 도입합니다. 또한, **cross-horizon consensus** 를 통한 **동적 추론(dynamic inference)** 기법을 제안하여 안정적이고 빠른 실행을 가능하게 합니다.

## 주요 결과
MoH 전략은 **LIBERO** 벤치마크에서 **π0.5 모델** 에 적용 시 **30k 훈련 반복** 만에 **99%의 평균 성공률** 을 달성하며 새로운 **state-of-the-art** 를 기록했습니다. 또한, 동적 추론 메커니즘을 통해 베이스라인 대비 **2.5배 높은 처리량** 을 달성하면서도 우수한 성능을 유지합니다. 시뮬레이션 환경( **LIBERO, RoboTwin2.0** ) 및 실제 로봇 태스크 모두에서 **일관되고 상당한 성능 향상** 을 보였습니다.

## AI 실무자를 위한 시사점
**MoH** 는 **VLA 모델** 의 중요한 실제 적용 문제를 해결하며, **plug-and-play 방식** 으로 기존 **Transformer 기반 액션 모듈** 에 쉽게 통합될 수 있어 개발 부담이 적습니다. **동적 추론 기능** 은 로봇 시스템의 **적응형 제어 능력** 과 **실행 효율성** 을 크게 향상시켜, 복잡하고 불확실한 환경에서 로봇의 안정적인 작동을 지원하는 데 실용적인 가치가 큽니다. 짧은 훈련 반복만으로 높은 성공률을 달성하여 **개발 비용 절감** 에도 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.