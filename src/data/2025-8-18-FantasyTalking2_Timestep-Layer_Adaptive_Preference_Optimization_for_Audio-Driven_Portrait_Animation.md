---
title: "[논문리뷰] FantasyTalking2: Timestep-Layer Adaptive Preference Optimization for
  Audio-Driven Portrait Animation"
excerpt: "Mu Xu이 [arXiv]에 게시한 'FantasyTalking2: Timestep-Layer Adaptive Preference Optimization for
  Audio-Driven Portrait Animation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Audio-Driven Animation
  - Preference Optimization
  - Diffusion Models
  - Reward Modeling
  - Human Feedback
  - Multi-Objective Optimization
  - Timestep-Layer Adaptive

permalink: /ai/review/2025-8-18-FantasyTalking2_Timestep-Layer_Adaptive_Preference_Optimization_for_Audio-Driven_Portrait_Animation/

toc: true
toc_sticky: true

date: 2025-08-18 13:14:38+0900
last_modified_at: 2025-08-18 13:14:38+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.11255)

**저자:** MengChao Wang, Qiang Wang, Fan Jiang, Mu Xu



## 핵심 연구 목표
오디오 기반 인물 애니메이션에서 **모션 자연스러움, 립싱크 정확도, 시각적 품질**과 같은 다양한 인간 선호도를 동시에 만족시키지 못하는 문제를 해결하는 것이 목표입니다. 기존 방식의 상충하는 선호도 목표와 대규모 다차원 선호도 데이터셋의 부족을 극복하고, 생성 모델이 미세한 인간 선호도에 더 잘 정렬되도록 합니다.

## 핵심 방법론
본 논문은 **Talking-Critic**이라는 멀티모달 보상 모델을 도입하여 인간 선호도를 정량화합니다. 이 모델을 활용해 **Talking-NSQ**라는 약 **410K 쌍**의 대규모 다차원 인간 선호도 데이터셋을 구축합니다. 핵심은 **Timestep-Layer adaptive multi-expert Preference Optimization (TLPO)** 프레임워크로, 선호도를 **세 가지 전문 LoRA 전문가 모듈**(**모션 자연스러움, 립싱크, 시각적 품질**)로 분리한 후, **시점-레이어 적응형 융합 게이트**를 통해 확산 모델의 각 **DiT 레이어**와 **타임스텝**에 걸쳐 동적으로 통합합니다. 특히 립싱크는 **MediaPipe**를 활용한 립 마스크 제약으로 정밀도를 높입니다.

## 주요 결과
**Talking-Critic**은 인간 선호도 정렬 정확도에서 기준 모델 대비 Motion Naturalness Accuracy **92.50%** (기준: 63.15%), Lip-Sync Accuracy **86.94%** (기준: 52.63%), Visual Quality Accuracy **94.67%** (기준: 61.24%)를 달성하며 크게 향상된 성능을 보여주었습니다. **TLPO**는 기존 SOTA 모델들을 모든 정량적 지표에서 능가했으며, 특히 Lip-Sync (Sync-C) **5.704**, FVD **341.181**를 기록했습니다. 사용자 연구에서는 립싱크 **12.7%**, 모션 자연스러움 **15.0%**, 시각적 품질 **13.7%**의 상대적 개선을 보여주었습니다.

## AI 실무자를 위한 시사점
이 연구는 **미세한 인간 선호도를 대규모로 학습**하고, 이를 확산 모델에 효과적으로 주입하는 방법을 제시합니다. **다중 목표 최적화** 시 발생하는 충돌 문제를 **전문가 모듈 분리와 적응형 융합**으로 해결한 점은 다른 생성 모델에도 적용될 수 있는 중요한 통찰입니다. **Qwen2.5-Omni**와 **LoRA**를 활용한 보상 모델 학습 및 **DiT** 기반 모델 최적화는 실제 AI 서비스에서 고품질 콘텐츠를 생성하는 데 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.