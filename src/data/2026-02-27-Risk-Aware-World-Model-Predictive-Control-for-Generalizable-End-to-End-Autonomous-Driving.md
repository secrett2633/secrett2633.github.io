---
title: "[논문리뷰] Risk-Aware World Model Predictive Control for Generalizable End-to-End Autonomous Driving"
excerpt: "Jian-Fang Hu이 [arXiv]에 게시한 'Risk-Aware World Model Predictive Control for Generalizable End-to-End Autonomous Driving' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - End-to-End Autonomous Driving
  - World Model Predictive Control
  - Risk-Aware
  - Generalization
  - Self-Supervised Learning
  - Scenario Exploration
  - Autonomous Systems

permalink: /ai/review/2026-02-27-Risk-Aware-World-Model-Predictive-Control-for-Generalizable-End-to-End-Autonomous-Driving/

toc: true
toc_sticky: true

date: 2026-02-27 00:00:00+0900+0900
last_modified_at: 2026-02-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.23259)

**저자:** Jiangxin Sun, Feng Xue, Teng Long, Chang Liu, Jian-Fang Hu, Wei-Shi Zheng, Nicu Sebe



## 핵심 연구 목표
이 논문은 전문가 행동 데이터에 대한 의존성으로 인해 발생하는 기존 End-to-End 자율주행(E2E-AD) 시스템의 **제한적인 일반화** 문제와 **롱테일 시나리오에서의 불안전한 결정** 문제를 해결하고자 합니다. 전문가의 감독 없이도 위험을 사전에 인지하고 회피하는 **신뢰할 수 있는 의사 결정 능력** 을 갖춘 E2E-AD 시스템을 개발하는 것이 주된 목표입니다.

## 핵심 방법론
제안하는 **Risk-aware World Model Predictive Control (RaWMPC)** 프레임워크는 **리스크 인지 월드 모델** 을 활용하여 여러 후보 행동의 결과를 예측하고 명시적인 리스크 평가를 통해 저위험 행동을 선택합니다. 월드 모델은 **리스크 인지 상호작용 전략** 을 통해 의도적으로 위험한 행동을 경험하며 학습하고, 테스트 시에는 **Self-evaluation distillation** 방법을 통해 잘 학습된 월드 모델로부터 리스크 회피 능력을 **생성형 행동 제안 네트워크 (cVAE)** 로 증류하여 효율적인 추론을 가능하게 합니다.

## 주요 결과
RaWMPC는 **Bench2Drive** 벤치마크에서 **88.31 DS (Driving Score)** 및 **70.48% SR (Success Rate)** 을 달성하여 기존 SOTA 방법론들을 능가했으며, **NAVSIM** 에서는 최고 **PDMS 91.3** 을 기록했습니다. 특히, 훈련 데이터에 없는 조건(Sunny-only 훈련 후 Rainy 테스트)에서도 **현저히 높은 견고성** 을 보였고, **보행자 충돌 예측 리콜 0.99** 와 같은 높은 이벤트 예측 정확도를 통해 신뢰성 있는 리스크 평가를 제공했습니다.

## AI 실무자를 위한 시사점
RaWMPC는 전문가 데모 없이 자율주행 시스템의 **일반화와 안전성을 혁신적으로 향상** 시킬 수 있는 가능성을 보여줍니다. **데이터 희소성** 이나 **새로운 위험 시나리오** 에 대한 대응이 필요한 자율주행 및 기타 고위험 AI 애플리케이션 개발에 중요한 통찰을 제공하며, **자가 평가 기반의 정책 학습** 접근 방식은 레이블링 비용 절감과 함께 보다 견고한 AI 모델 구축에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.