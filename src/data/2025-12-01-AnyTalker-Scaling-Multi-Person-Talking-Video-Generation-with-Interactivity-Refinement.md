---
title: "[논문리뷰] AnyTalker: Scaling Multi-Person Talking Video Generation with Interactivity Refinement"
excerpt: "Yicheng Ji이 arXiv에 게시한 'AnyTalker: Scaling Multi-Person Talking Video Generation with Interactivity Refinement' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multi-Person Video Generation
  - Audio-Driven Animation
  - Diffusion Models
  - Interactivity Refinement
  - Identity-Aware Attention
  - Scalability
  - Data Efficiency

permalink: /ai/review/2025-12-01-AnyTalker-Scaling-Multi-Person-Talking-Video-Generation-with-Interactivity-Refinement/

toc: true
toc_sticky: true

date: 2025-12-01 00:00:00+0900+0900
last_modified_at: 2025-12-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.23475)

**저자:** Zhizhou Zhong, Yicheng Ji, Zhe Kong, Yiying Liu, Jiarui Wang, Xiangyi Wang, Yanjia Li, Yuqing She, Ying Qin, Shuiyang Mao, Wei Liu, Wenhan Luo



## 핵심 연구 목표
본 논문은 다양한 다중 인물 데이터 수집의 높은 비용과 여러 인물을 일관된 상호작용으로 구동하기 어려운 문제를 해결하고자 합니다. 특히, 적은 양의 다중 인물 데이터로도 자연스러운 제스처, 생생한 감정, 상호작용이 풍부한 다중 인물 대화 영상을 확장 가능하게 생성하는 것을 목표로 합니다.

## 핵심 방법론
제안된 **AnyTalker** 는 **사전 훈련된 비디오 Diffusion 모델 [59]** 을 기반으로 하며, **확장 가능한 다중 스트림 처리 아키텍처** 를 특징으로 합니다. 특히, **Diffusion Transformer** 의 어텐션 블록에 **identity-aware attention 메커니즘** 인 **Audio-Face Cross Attention (AFCA)** 을 확장하여 임의의 수의 구동 가능한 인물을 지원합니다. 훈련은 두 단계로 진행되는데, 첫 번째 단계에서는 단일 인물 데이터를 수평적으로 연결하여 다중 인물 시나리오를 시뮬레이션하고, 두 번째 단계에서는 소량의 실제 다중 인물 데이터로 **상호작용을 정교화** 합니다.

## 주요 결과
**InteractiveEyes** 다중 인물 벤치마크에서 **AnyTalker-14B 모델** 은 **Interactivity↑ 1.01** 을 달성하여 **MultiTalk [31]** 의 0.49와 **Bind-Your-Avatar [23]** 의 0.45를 크게 능가하며 최고의 상호작용 성능을 보였습니다. 또한, **HDTF** 및 **VFHQ** 단일 인물 벤치마크에서 **Sync-C↑ 9.05** (HDTF) 및 **7.79** (VFHQ), **FVD↓ 160.87** (HDTF) 및 **290.73** (VFHQ)를 기록하며 경쟁 모델 대비 최고 또는 경쟁력 있는 성능을 보여주었습니다.

## AI 실무자를 위한 시사점
**AnyTalker** 는 다중 인물 영상 생성 시 데이터 부족 문제를 해결하기 위해 **단일 인물 데이터와 소량의 실제 다중 인물 데이터를 효과적으로 활용** 하는 실용적인 훈련 전략을 제시합니다. **AFCA 메커니즘** 을 통해 임의의 수의 인물로 확장 가능한 아키텍처를 제공하여, AI/ML 엔지니어들이 다양한 인물 수에 유연하게 대응할 수 있도록 돕습니다. 제안된 **Interactivity** 측정 지표는 다중 인물 상호작용의 질을 정량적으로 평가할 수 있는 중요한 도구를 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.