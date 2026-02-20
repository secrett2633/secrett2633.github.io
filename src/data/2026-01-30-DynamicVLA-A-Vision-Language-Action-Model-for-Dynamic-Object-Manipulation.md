---
title: "[논문리뷰] DynamicVLA: A Vision-Language-Action Model for Dynamic Object Manipulation"
excerpt: "arXiv에 게시된 'DynamicVLA: A Vision-Language-Action Model for Dynamic Object Manipulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action (VLA) Models
  - Dynamic Object Manipulation
  - Robotics
  - Continuous Inference
  - Latent-aware Action Streaming
  - Real-time Control
  - Perception-Execution Gap

permalink: /ai/review/2026-01-30-DynamicVLA-A-Vision-Language-Action-Model-for-Dynamic-Object-Manipulation/

toc: true
toc_sticky: true

date: 2026-01-30 00:00:00+0900+0900
last_modified_at: 2026-01-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.22153)

**저자:** Haozhe Xie, Beichen Wen, Jiarui Zheng, Zhaoxi Chen, Fangzhong Hong, Haiwen Diao, Ziwei Liu



## 핵심 연구 목표
기존 VLA 모델들이 정적 객체 조작에서는 강점을 보이지만, 동적 객체 조작 시 **빠른 인지(perception)** , **시간적 예측(temporal anticipation)** , 그리고 **연속적인 제어(continuous control)** 가 필요한 상황에서 겪는 어려움을 해결하는 것이 주요 목표입니다. 특히 **인지-실행(perception-execution) 간의 지연** 과 **오래된 정보** 로 인한 성능 저하를 극복하고, VLA 모델이 실시간으로 동적 객체를 정밀하게 조작할 수 있도록 하는 통합 프레임워크를 제시합니다.

## 핵심 방법론
DynamicVLA는 세 가지 핵심 설계를 통해 문제를 해결합니다: 첫째, **0.4B 파라미터의 경량 VLA 모델** 을 사용하여 빠른 추론(inference)을 가능하게 하며, 공간 효율적인 인코딩을 위해 **convolutional vision encoder (FastViT)** 를 채택합니다. 둘째, **Continuous Inference** 기법을 도입하여 추론과 실행을 중첩시켜 **청크 간 대기 시간(inter-chunk waiting)** 을 제거하고 연속적인 액션 스트림을 유지합니다. 셋째, **Latent-aware Action Streaming** 을 통해 **오래된 액션을 폐기** 하고 **가장 최신 예측에 우선순위** 를 부여함으로써 인지-실행 지연 문제를 해결하고 시간적으로 정렬된 액션 실행을 보장합니다. 또한, **Dynamic Object Manipulation (DOM) 벤치마크** 를 새로 구축하여 200K 시뮬레이션 및 2K 실제 에피소드를 자동으로 수집했습니다.

## 주요 결과
DynamicVLA는 기존 VLA 모델 대비 동적 객체 조작에서 **응답 속도, 인지, 일반화 측면에서 현저한 개선** 을 시연했습니다. 특히, Table I에서 DOM 벤치마크 기준 **SR(Success Rate) 47.06%** 를 달성하여 기존 SOTA 모델들(π0.5 30.27%, SmolVLA 28.89%, VLASH 24.33%)보다 훨씬 높은 성능을 보였습니다. Continuous Inference와 Latent-aware Action Streaming의 도입은 **인지-실행 지연을 효과적으로 줄여** 동적 환경에서의 **안정적인 폐쇄 루프 제어** 를 가능하게 했습니다. Ablation study (Table II)에서는 FastViT 사용과 Continuous Inference, Latent-aware Action Streaming이 모두 결합될 때 최적의 성능을 달성함을 정량적으로 입증했습니다.

## AI 실무자를 위한 시사점
이 연구는 로봇 제어 시스템 설계에서 **인지-실행 지연 문제의 중요성** 과 이를 해결하기 위한 **경량 모델, 연속 추론, 지연 인식 액션 스트리밍** 기법의 실용성을 강조합니다. 특히, **FastViT와 같은 효율적인 비전 인코더** 를 사용하고 **inference와 execution을 겹치게(overlap)** 처리하는 방법은 실시간 로봇 시스템 구현에 핵심적인 인사이트를 제공합니다. **DOM 벤치마크** 는 동적 조작을 위한 새로운 표준 데이터셋으로서, 향후 VLA 연구 및 개발에 중요한 자원이 될 것입니다. 이 모델은 **다양한 로봇 플랫폼** 에 걸쳐 동적 객체 조작의 일반화를 위한 통합 프레임워크로서 활용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.