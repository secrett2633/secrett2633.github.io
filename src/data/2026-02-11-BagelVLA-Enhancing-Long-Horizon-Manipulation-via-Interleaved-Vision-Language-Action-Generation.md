---
title: "[논문리뷰] BagelVLA: Enhancing Long-Horizon Manipulation via Interleaved Vision-Language-Action Generation"
excerpt: "Xiaoyu Chen이 arXiv에 게시한 'BagelVLA: Enhancing Long-Horizon Manipulation via Interleaved Vision-Language-Action Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long-horizon manipulation
  - Embodied AI
  - Vision-Language-Action (VLA)
  - Interleaved planning
  - Visual forecasting
  - Residual Flow Guidance
  - Multimodal learning

permalink: /ai/review/2026-02-11-BagelVLA-Enhancing-Long-Horizon-Manipulation-via-Interleaved-Vision-Language-Action-Generation/

toc: true
toc_sticky: true

date: 2026-02-11 00:00:00+0900+0900
last_modified_at: 2026-02-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.09849)

**저자:** Yucheng Hu, Jianke Zhang, Yuanfei Luo, Yanjiang Guo, Xiaoyu Chen



## 핵심 연구 목표
본 논문은 복잡하고 장기적인 로봇 조작 작업을 위해 **언어적 계획, 시각적 예측, 행동 생성** 을 통합하는 통일된 프레임워크를 개발하는 것을 목표로 합니다. 기존 Vision-Language-Action (VLA) 모델들이 이러한 기능들을 분리된 모듈로 처리하여 최적의 성능을 달성하지 못하는 한계를 극복하고자 합니다. 궁극적으로 로봇 에이전트가 작업에 대해 추론하고, 물리적 결과를 예측하며, 정확한 동작을 생성하는 능력을 향상시키는 데 주력합니다.

## 핵심 방법론
BagelVLA는 **MoT(Mixture-of-Transformers) 아키텍처** 를 기반으로 하며, 사전 훈련된 통합 이해 및 생성 모델인 **Bagel [10]** 에서 초기화됩니다. 이 모델은 **언어적 추론** 과 **시각적 예측** 을 행동 실행 루프에 직접 통합하도록 훈련됩니다. 특히, 시각적 생성의 높은 지연 문제를 해결하기 위해 현재 관측을 구조적 사전 정보로 활용하고 단일 단계 노이즈 제거를 통해 예측 시각 특징을 추출하는 **Residual Flow Guidance (RFG)** 메커니즘을 도입했습니다.

## 주요 결과
BagelVLA는 시뮬레이션 환경( **Calvin** , **Robotwin** ) 및 실제 환경 벤치마크 모두에서 기존 VLA 모델들보다 **상당히 우수한 성능** 을 보였습니다. 특히 장기적인 추론이 필요한 작업에서 강점을 나타내며, **Robotwin** 벤치마크에서는 **πo (46.42%)** 대비 **75.26%** 의 성공률을 달성했습니다. 또한, **RFG** 는 시각적 예측의 지연 시간을 **1.23초/액션 청크** 로 크게 줄이면서도 배경을 보존하고 고품질의 미래 프레임을 예측하는 능력을 입증했습니다.

## AI 실무자를 위한 시사점
BagelVLA는 **언어, 시각, 행동** 을 유기적으로 결합한 **통합 VLA 모델** 의 잠재력을 보여주며, 복잡한 로봇 조작 시스템 개발에 중요한 통찰력을 제공합니다. **Residual Flow Guidance (RFG)** 와 같은 효율적인 시각 예측 기술은 실시간 로봇 제어 시스템의 응답성을 향상시키는 데 활용될 수 있습니다. 또한, **대규모 하이브리드 데이터셋** 과 **단계별 훈련 전략** 은 일반화 능력을 갖춘 로봇 에이전트를 구축하기 위한 효과적인 접근 방식으로 작용합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.