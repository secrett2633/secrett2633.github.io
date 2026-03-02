---
title: "[논문리뷰] Mode Seeking meets Mean Seeking for Fast Long Video Generation"
excerpt: "arXiv에 게시된 'Mode Seeking meets Mean Seeking for Fast Long Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Long Video Generation
  - Diffusion Models
  - Mode Seeking
  - Mean Seeking
  - Decoupled Diffusion Transformer
  - Flow Matching
  - Distribution Matching
  - Video Synthesis

permalink: /ai/review/2026-03-02-Mode-Seeking-meets-Mean-Seeking-for-Fast-Long-Video-Generation/

toc: true
toc_sticky: true

date: 2026-03-02 00:00:00+0900+0900
last_modified_at: 2026-03-02 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.24289)

**저자:** Shengqu Cai, Weili Nie, Chao Liu, Julius Berner, Lvmin Zhang, Nanye Ma, Hansheng Chen, Maneesh Agrawala, Leonidas Guibas, Gordon Wetzstein, Arash Vahdat



## 핵심 연구 목표
본 논문은 몇 초 길이의 단편 비디오 생성에서 분 단위 길이의 장편 비디오 생성으로 확장할 때 발생하는 주요 병목 현상을 해결하고자 합니다. 특히, 고품질의 일관된 장편 비디오 데이터가 부족한 상황에서, 기존 모델들이 겪는 로컬 충실도(fidelity)와 장기적 일관성(coherence) 사이의 간극을 좁히는 것을 목표로 합니다.

## 핵심 방법론
저자들은 로컬 충실도와 장기 일관성을 분리하는 "Mode Seeking meets Mean Seeking" 학습 패러다임을 제안하며, **Decoupled Diffusion Transformer (DDT)** 를 사용합니다. 이 아키텍처는 **공유 피처 인코더** 와 두 개의 경량 속도 헤드를 가집니다. **글로벌 Flow Matching (FM) 헤드** 는 제한된 장편 비디오 데이터에 대한 감독 학습을 통해 내러티브 구조를 학습(Mean Seeking)하고, **로컬 Distribution Matching (DM) 헤드** 는 슬라이딩 윈도우를 고정된 단편 비디오 교사 모델에 **모드 탐색 역-KL 발산** 을 통해 정렬하여 로컬 현실성을 계승합니다. 추론 시에는 **DM 헤드** 만을 사용하여 몇 단계 만에 빠른 장편 비디오를 생성합니다.

## 주요 결과
제안된 방법은 정량적 평가에서 전반적으로 최고의 성능을 달성했습니다. 예를 들어, Subject Consistency **0.9682** , Motion Smoothness **0.9863** , Dynamic Degree **0.9453** , Image Quality **0.6982** , VLM Consistency **75.42** 를 기록하며 기존 SFT-only 및 teacher-only 모델들을 능가했습니다. 질적 평가에서도 로컬 선명도와 모션이 향상되고 장거리 일관성이 유지됨을 보여주었습니다.

## AI 실무자를 위한 시사점
본 연구는 **제한된 장편 비디오 데이터셋** 으로도 **높은 품질과 일관성을 갖춘 분 단위 길이의 비디오를 생성** 할 수 있는 효과적인 방법을 제시합니다. 이는 영화, 게임, 가상 세계 모델링 등 **장편 비디오 생성** 이 필요한 실제 애플리케이션의 개발 가능성을 크게 확장시킵니다. 특히 **빠른 몇 단계 추론 능력** 은 실시간 또는 고효율 비디오 생성 시스템 구축에 중요한 이점을 제공하며, 기존의 **고품질 단편 비디오 모델** 을 장편 비디오 생성에 활용하는 효율적인 전략을 제공합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.