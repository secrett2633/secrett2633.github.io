---
title: "[논문리뷰] Unified Video Editing with Temporal Reasoner"
excerpt: "arXiv에 게시된 'Unified Video Editing with Temporal Reasoner' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Editing
  - Diffusion Models
  - Temporal Reasoning
  - Chain-of-Thought
  - In-Context Learning
  - ROPE
  - Multi-instance Editing

permalink: /ai/review/2025-12-09-Unified-Video-Editing-with-Temporal-Reasoner/

toc: true
toc_sticky: true

date: 2025-12-09 00:00:00+0900+0900
last_modified_at: 2025-12-09 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.07469)

**저자:** Xiangpeng Yang¹, Ji Xie², Yiyuan Yang¹, Yan Huang¹, Min Xu¹, Qiang Wu¹
¹University of Technology Sydney
²Zhejiang University



## 핵심 연구 목표
기존 비디오 편집 모델들이 겪는 정밀도(expert models)와 통합성/마스크-프리(in-context learning models) 간의 트레이드오프를 해결하는 것을 목표로 합니다. 특히, 마스크 없는 모델에서 발생하는 **명령-대-영역 매핑의 약점** 과 **정밀하지 않은 지역화** 문제를 극복하여, 정밀하면서도 통합된 비디오 편집 프레임워크를 제안하고자 합니다.

## 핵심 방법론
본 논문은 Chain-of-Thought 추론에서 영감을 받은 새로운 **Chain-of-Frames (CoF)** 접근 방식인 **VideoCoF** 를 제안합니다. 이는 비디오 확산 모델이 먼저 **추론 토큰(편집 영역 잠재)** 을 예측한 다음 대상 비디오 토큰을 생성하도록 강제하는 **"see → reason → edit" 절차** 를 따릅니다. 또한, 학습 기간을 넘어선 모션 정렬 및 길이 외삽을 가능하게 하는 **RoPE(Rotary Positional Embedding) 정렬 전략** 을 도입합니다.

## 주요 결과
새롭게 구축된 **VideoCoF-Bench** 벤치마크에서 **50k** 의 비디오 쌍(33프레임)으로만 훈련되었음에도 불구하고, 기존 **ICVE[19]** 대비 Instruction-Following Score에서 **+15.14%** , Success Ratio에서 **+18.6%** 의 현저한 성능 향상을 달성했습니다. RoPE 디자인을 통해 훈련 길이를 **4배 초과하는 141프레임** 이상의 장기 시퀀스에 대해 품질 저하 없이 일반화를 성공적으로 시연했습니다.

## AI 실무자를 위한 시사점
**"see → reason → edit" 프레임워크** 는 복잡한 비디오 편집에서 명령 이해 및 정확한 지역화 능력을 크게 향상시켜, 실제 애플리케이션의 신뢰도를 높일 수 있습니다. **RoPE 정렬 전략** 은 비디오 생성 모델의 **길이 외삽 능력** 을 혁신적으로 개선하여, 적은 훈련 데이터로도 장기 비디오 편집에 활용될 수 있는 효율성을 제공합니다. **50k** 라는 적은 데이터로 SOTA 성능을 달성한 것은 고품질 비디오 편집 모델 개발의 새로운 데이터 효율적 방향을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.