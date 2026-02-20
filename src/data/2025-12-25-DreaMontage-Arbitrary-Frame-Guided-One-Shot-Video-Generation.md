---
title: "[논문리뷰] DreaMontage: Arbitrary Frame-Guided One-Shot Video Generation"
excerpt: "arXiv에 게시된 'DreaMontage: Arbitrary Frame-Guided One-Shot Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - One-Shot Video
  - Diffusion Transformer (DiT)
  - Frame-Guided Generation
  - Auto-Regressive Generation
  - Supervised Fine-Tuning (SFT)
  - Direct Preference Optimization (DPO)

permalink: /ai/review/2025-12-25-DreaMontage-Arbitrary-Frame-Guided-One-Shot-Video-Generation/

toc: true
toc_sticky: true

date: 2025-12-25 00:00:00+0900+0900
last_modified_at: 2025-12-25 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.21252)

**저자:** Jiawei Liu, Junqiao Li, Jiangfan Deng, Gen Li, Siyu Zhou, Zetao Fang, Shanshan Lao, Zengde Deng, Jianing Zhu, Tingting Ma, Jiayi Li, Yunqiu Wang, Qian He, Xinglong Wu



## 핵심 연구 목표
본 논문은 기존 비디오 생성 모델들이 시각적 연속성과 시간적 일관성을 유지하지 못하는 "원샷" 비디오 생성의 한계를 해결하고자 합니다. 사용자가 제공하는 임의의 프레임이나 비디오 클립을 기반으로 끊김 없이 표현력이 풍부하며 장시간의 원샷 비디오를 생성하는 포괄적인 프레임워크인 DreaMontage를 제안하는 것이 목표입니다.

## 핵심 방법론
이 연구는 세 가지 주요 접근 방식을 사용합니다. 첫째, **DiT 아키텍처** 에 **경량 중간 조건 메커니즘** 과 **Shared-RoPE** 를 통합하고, **적응형 튜닝(Adaptive Tuning)** 을 통해 강력한 임의 프레임 제어 기능을 구현합니다. 둘째, **고품질 데이터셋** 을 큐레이션하고 **시각적 표현 SFT(Visual Expression SFT)** 단계를 통해 시각적 충실도와 영화적 표현력을 향상시킵니다. 셋째, 갑작스러운 컷이나 비자연스러운 피사체 움직임을 완화하기 위해 **Tailored DPO** 기법을 적용하며, **세그먼트별 자동 회귀(SAR) 추론 전략** 을 설계하여 메모리 효율적으로 확장된 시퀀스 생성을 가능하게 합니다.

## 주요 결과
DreaMontage는 **Multi-Keyframe Mode** 에서 Vidu Q2 대비 **+15.79%** , Pixverse V5 대비 **+28.95%** 의 압도적인 전반적인 선호도를 달성했습니다. 특히 프롬프트 팔로잉에서 Vidu Q2 대비 **+23.68%** 의 우위를 보였으며, **First-Last Frame Mode** 에서는 Kling 2.5와 시각적 품질(0.00%)은 동률이었으나 전반적인 선호도에서 **+3.97%** 의 우위를 기록했습니다. **Shared-RoPE** 메커니즘은 슈퍼 레졸루션 단계에서 **+53.55%** 의 선호도 상승을 보여, 시각적 아티팩트를 효과적으로 제거했습니다.

## AI 실무자를 위한 시사점
DreaMontage는 정교한 내러티브 흐름과 시각적 일관성이 중요한 영화, 광고, 게임 컷신 등 다양한 실제 창작 워크플로우에 혁신적인 솔루션을 제공합니다. **DiT 기반 모델** 에 임의의 프레임 또는 비디오 클립을 조건으로 활용하는 기술은 기존 모델의 제약을 넘어설 수 있는 강력한 기능이며, **SFT** 와 **DPO** 를 통한 비디오 품질 최적화는 실제 사용자 경험을 크게 개선할 수 있습니다. 또한, **SAR 전략** 은 메모리 제약 하에서도 장편 비디오를 효율적으로 생성할 수 있어, 생성형 AI 시대의 유연하고 표현력 있는 시각적 스토리텔링의 기초를 마련합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.