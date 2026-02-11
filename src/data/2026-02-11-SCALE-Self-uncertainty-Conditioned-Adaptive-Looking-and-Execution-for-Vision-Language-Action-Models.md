---
title: "[논문리뷰] SCALE: Self-uncertainty Conditioned Adaptive Looking and Execution for Vision-Language-Action Models"
excerpt: "이 [arXiv]에 게시한 'SCALE: Self-uncertainty Conditioned Adaptive Looking and Execution for Vision-Language-Action Models' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action Models
  - Self-Uncertainty Estimation
  - Adaptive Inference
  - Active Perception
  - Action Decoding
  - Visual Attention
  - Robotic Manipulation

permalink: /ai/review/2026-02-11-SCALE-Self-uncertainty-Conditioned-Adaptive-Looking-and-Execution-for-Vision-Language-Action-Models/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.04208)

**저자:** Hyeonbeom Choi, Daehul Ahn, Youhan Lee, Taewook Kang, Seongwon Cho, Jonghyun Choi



## 핵심 연구 목표
Vision-Language-Action (VLA) 모델의 고정된 추론 파이프라인이 지각적 모호성이나 행동의 다중 양상과 같은 불확실한 상황에서 오류를 누적하는 문제를 해결하고자 합니다. 추가적인 훈련이나 다중 순방향 패스 없이, 모델 자체의 예측 불확실성을 기반으로 시각적 인식과 행동 추론을 동적으로 조절하는 적응형 추론 전략을 개발하여 VLA 모델의 견고성을 향상시키는 것이 목표입니다.

## 핵심 방법론
본 논문은 **SCALE** (Self-uncertainty Conditioned Adaptive Looking and Execution)을 제안합니다. **자기-불확실성** `u_k`는 모델의 예측 분포 `p_k`와 완전한 확실성을 나타내는 **one-hot 분포** `q_low`, 그리고 완전한 모호성을 나타내는 **균등 분포** `q_high` 사이의 **KL divergence** 를 비교하여 측정됩니다. 이 불확실성 신호는 **적응형 행동 디코딩** 에서 행동 샘플링 온도 `τ_k`를 동적으로 조절하고, 이전 단계의 불확실성 변화에 기반하여 **적응형 시각적 어텐션** 에서 시야 인코더의 어텐션 온도를 조절하는 데 활용됩니다. 모든 과정은 추가 훈련이나 외부 검증기 없이 **단일 순방향 패스** 로 실행됩니다.

## 주요 결과
**SCALE** 은 **OpenVLA** , **π0-FAST** , **SpatialVLA** 등 다양한 VLA 백본과 **LIBERO** , **SIMPLER-WidowX** , **LIBERO-PRO-Long** 벤치마크 전반에서 탐욕적 디코딩 대비 일관된 성능 향상을 보였습니다. 시뮬레이션 환경에서 **OpenVLA** 는 평균 성공률 **+5.8%** , **π0-FAST** 는 **+1.8%** 향상되었으며, 실제 환경에서는 **+19.5%** ( **OpenVLA** ) 및 **+13.9%** ( **π0-FAST** )의 더 높은 성공률 향상을 기록했습니다. 또한, **SCALE** 은 추가 훈련이 필요한 **RoboMonkey** 및 **TACO** 와 같은 기존 TTS 방법론을 **+6.8%p** 및 **+3.3%p** 로 능가하면서도 **단일 패스 효율성** 을 유지했습니다.

## AI 실무자를 위한 시사점
**SCALE** 은 추가적인 훈련이나 계산 비용이 큰 다중 추론 없이 **VLA 모델의 견고성과 신뢰성** 을 높일 수 있는 실용적인 방법론을 제시합니다. 이는 특히 실시간 로봇 제어와 같이 **낮은 지연 시간** 이 필수적인 실제 애플리케이션에 매우 유용합니다. 복잡한 환경에서 **로봇의 적응성** 을 향상시키고, 기존 불확실성 추정 방식의 한계를 극복하여 **대규모 VLA 모델** 의 배포 가능성을 높이는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.