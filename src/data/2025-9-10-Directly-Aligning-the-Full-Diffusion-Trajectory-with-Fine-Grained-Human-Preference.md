---
title: "[논문리뷰] Directly Aligning the Full Diffusion Trajectory with Fine-Grained Human
  Preference"
excerpt: "Yingfang Zhang이 [arXiv]에 게시한 'Directly Aligning the Full Diffusion Trajectory with Fine-Grained Human
  Preference' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Diffusion Models
  - Reinforcement Learning
  - Human Preference
  - Text-to-Image Generation
  - Reward Hacking
  - Direct-Align
  - SRPO
  - Fine-Grained Control
  - Flow Matching Models

permalink: /ai/review/2025-9-10-Directly-Aligning-the-Full-Diffusion-Trajectory-with-Fine-Grained-Human-Preference/

toc: true
toc_sticky: true

date: 2025-09-10 13:11:01+0900
last_modified_at: 2025-09-10 13:11:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.06942)

**저자:** Xiangwei Shen, Zhimin Li, Zhantao Yang, Shiyi Zhang, Yingfang Zhang, Donghao Li, Chunyu Wang, Qinglin Lu, Yansong Tang



## 핵심 연구 목표
본 논문은 기존 온라인 강화 학습(Online-RL) 기반 확산 모델 정렬 방식의 한계를 극복하는 것을 목표로 합니다. 특히, **다단계 디노이징 과정의 높은 계산 비용** 으로 인한 **제한적인 최적화 범위(후기 확산 단계)** 와 **오프라인 보상 모델 미세 조정의 필요성** 으로 발생하는 **보상 해킹(reward hacking)** 및 미흡한 미학적 품질 문제를 해결하고자 합니다.

## 핵심 방법론
저자들은 **Direct-Align** 라는 새로운 방법을 제안합니다. 이는 노이즈 사전(noise prior)을 정의하여 어떠한 시간 단계에서도 원본 이미지를 효과적으로 복구함으로써, **그래디언트 계산을 동반하는 다단계 디노이징의 필요성을 제거** 합니다. 또한, **Semantic Relative Preference Optimization (SRPO)** 를 도입하여 보상을 **텍스트 조건부 신호** 로 공식화하고, 긍정/부정 프롬프트 증강을 통해 **보상 모델을 온라인으로 조정** 하여 오프라인 미세 조정 의존도를 줄였습니다.

## 주요 결과
제안된 방법론은 **FLUX.1.dev** 모델을 기반으로 인간 평가에서 **인지된 사실감(realism)에서 약 3.7배** , **미학적 품질(aesthetic quality)에서 3.1배** 향상을 달성했습니다. 특히, 훈련 효율성 면에서는 **DanceGRPO 대비 75배 빠른 속도** 로, **32개의 NVIDIA H20 GPU** 를 사용하여 단 **10분 만에 수렴** 하는 놀라운 성과를 보였습니다.

## AI 실무자를 위한 시사점
AI/ML 실무자들은 본 연구를 통해 **확산 모델의 인간 선호도 정렬 과정에서 발생하는 계산 비용을 획기적으로 줄이고** 보상 해킹 위험을 낮출 수 있습니다. **온라인 보상 조정 메커니즘** 은 특정 미적 요구사항에 따라 모델을 유연하게 제어할 수 있게 하여, **고품질 이미지 생성 및 빠른 모델 반복(iteration)** 이 필요한 실제 애플리케이션에 매우 유용할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.