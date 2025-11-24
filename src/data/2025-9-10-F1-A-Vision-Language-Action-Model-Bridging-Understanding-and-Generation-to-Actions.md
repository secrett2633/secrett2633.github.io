---
title: "[논문리뷰] F1: A Vision-Language-Action Model Bridging Understanding and Generation
  to Actions"
excerpt: "Zherui Qiu이 [arXiv]에 게시한 'F1: A Vision-Language-Action Model Bridging Understanding and Generation
  to Actions' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language-Action
  - Embodied AI
  - Visual Foresight
  - Predictive Inverse Dynamics
  - Mixture-of-Transformer
  - Robot Manipulation
  - Multi-stage Training
  - Generalization

permalink: /ai/review/2025-9-10-F1-A-Vision-Language-Action-Model-Bridging-Understanding-and-Generation-to-Actions/

toc: true
toc_sticky: true

date: 2025-09-10 13:11:01+0900
last_modified_at: 2025-09-10 13:11:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06951)

**저자:** Qi Lv, Weijie Kong, Hao Li, Jia Zeng, Zherui Qiu, Delin Qu, Haoming Song, Qizhi Chen, Xiang Deng, Jiangmiao Pang



## 핵심 연구 목표
본 논문은 동적인 시각 환경에서 언어 조건부 태스크를 실행하는 로봇의 한계를 극복하고자 합니다. 기존 Vision-Language-Action (VLA) 모델들이 반응형(reactive) 정책에 의존하여 단기적인 행동과 낮은 강건성을 보이는 문제를 해결하기 위해, **시각적 예측(foresight)**을 의사결정 파이프라인에 통합하는 새로운 VLA 프레임워크인 **F1**을 제안합니다.

## 핵심 방법론
**F1**은 **Mixture-of-Transformer (MoT) 아키텍처**를 기반으로 **이해(understanding) 전문가, 생성(generation) 전문가, 행동(action) 전문가**의 세 가지 전용 모듈을 통합합니다. **생성 전문가**는 **넥스트-스케일 예측 메커니즘**을 사용하여 목표 조건부 시각적 예측(visual foresight)을 명시적인 계획 대상으로 합성하고, 이를 통해 행동 생성을 **예측 기반 역동역학(foresight-guided inverse dynamics) 문제**로 재구성합니다. 모델의 강건성과 일반화 가능성을 확보하기 위해 **3단계 점진적 훈련 레시피**를 적용하며, **계층적 UGA(Understanding-Generation-Action) 프로그레시브 어텐션**으로 정보 흐름을 제어합니다.

## 주요 결과
**F1**은 실제 로봇 태스크에서 기존 VLA 모델들을 일관되게 능가하며, 9가지 실제 환경 태스크에서 평균 **82.2%**의 성공률을 달성했습니다 (최고 기준선인 π0의 **65.2%** 대비). 특히 "Handover (R2H)"와 같은 복잡한 동적 태스크에서 **93.3%**의 성공률을 기록하여 π0의 **40%**를 크게 상회했습니다. 시뮬레이션 벤치마크(LIBERO)에서도 평균 **95.7%**의 성공률로 **1위**를 차지했으며, **생성 전문가**와 **사전 훈련 단계**의 중요성을 입증하는 심층적인 ablation study 결과가 제시되었습니다.

## AI 실무자를 위한 시사점
**F1**은 **시각적 예측**을 통한 로봇 제어가 동적이고 장기적인 조작 태스크에서 로봇의 강건성과 일반화 능력을 혁신적으로 향상시킬 수 있음을 보여줍니다. **모듈식 Transformer 아키텍처**와 **단계별 훈련 전략**은 복잡한 VLA 모델을 구축하고 다양한 환경에 적용하는 데 효과적인 실무적 가이드라인을 제공합니다. 이는 **대규모 사전 훈련 데이터**와 **명시적인 예측 모듈**이 로봇의 기초 조작 능력과 적응성을 강화하는 데 필수적임을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.