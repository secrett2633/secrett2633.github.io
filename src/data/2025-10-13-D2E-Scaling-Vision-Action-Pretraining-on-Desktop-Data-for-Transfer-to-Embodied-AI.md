---
title: "[논문리뷰] D2E: Scaling Vision-Action Pretraining on Desktop Data for Transfer to
  Embodied AI"
excerpt: "Haebin Seong이 [arXiv]에 게시한 'D2E: Scaling Vision-Action Pretraining on Desktop Data for Transfer to
  Embodied AI' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied AI
  - Vision-Action Pretraining
  - Desktop Data
  - Inverse Dynamics Model (IDM)
  - Pseudo-labeling
  - Robotics
  - Generalization
  - Data Compression

permalink: /ai/review/2025-10-13-D2E-Scaling-Vision-Action-Pretraining-on-Desktop-Data-for-Transfer-to-Embodied-AI/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.05684)

**저자:** Suhwan Choi*, Jaeyoon Jung*, Haebin Seong*, Minchan Kim, Minyeong Kim, Yongjun Cho, Yoonshik Kim, Yubeen Park, Youngjae Yu†, Yunsung Lee†



## 핵심 연구 목표
본 논문은 물리적 상호작용 데이터 수집의 높은 비용으로 인해 **Embodied AI** 의 확장이 제한되는 문제를 해결하고자 합니다. 특히, 데스크톱 환경(주로 게임)의 풍부한 센서모터 상호작용을 활용하여 로봇의 **Embodied AI** 작업을 위한 효과적인 **사전 훈련(pretraining) 기반** 을 구축하는 것을 목표로 합니다.

## 핵심 방법론
논문은 세 가지 핵심 구성 요소로 이루어진 **D2E (Desktop to Embodied AI)** 프레임워크를 제안합니다. 첫째, **OWA Toolkit** 은 다양한 데스크톱 상호작용 데이터를 **152배 압축** 하여 표준화된 형식으로 수집합니다. 둘째, **Generalist-IDM** 은 **timestamp-based next-event prediction (NEP-τ)** 을 사용하여 미학습 게임에 대한 강력한 **zero-shot 일반화** 를 달성하고, **1,000시간 이상의 YouTube 게임 플레이 영상** 에 대한 자동 **pseudo-labeling** 을 가능하게 합니다. 셋째, **VAPT (Vision-Action PreTraining)** 는 데스크톱에서 사전 훈련된 표현을 물리적 로봇 조작 및 탐색 작업으로 전이 학습시킵니다.

## 주요 결과
**D2E** 프레임워크는 총 **1.3K+ 시간** (259시간의 인간 시연, 1K+ 시간의 pseudo-labeled 데이터)의 데이터를 활용하여 **LIBERO 조작 벤치마크** 에서 **96.6%의 성공률** 을 달성했습니다. 또한, **CANVAS 탐색 벤치마크** 에서는 **83.3%의 성공률** 을 보여 데스크톱-로봇 전이의 유효성을 입증했습니다. **Generalist-IDM** 은 미학습 게임에서 전문가 모델을 능가하는 **out-of-distribution 일반화** 능력을 시연했습니다.

## AI 실무자를 위한 시사점
본 연구는 데스크톱 상호작용 데이터가 고비용의 물리적 데이터 수집에 대한 실용적인 대안이 될 수 있음을 보여주며, **Embodied AI** 개발의 데이터 병목 현상을 해결하는 데 기여합니다. **OWA Toolkit** 과 **Generalist-IDM** 은 효율적인 데이터 수집, 압축 및 확장 가능한 **pseudo-labeling** 을 가능하게 하여, 컴퓨팅 자원이 제한적인 연구 환경에서도 대규모 비전-액션 사전 훈련에 접근성을 제공합니다. 공개될 도구, 데이터셋, 모델은 커뮤니티의 추가 연구를 촉진할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.