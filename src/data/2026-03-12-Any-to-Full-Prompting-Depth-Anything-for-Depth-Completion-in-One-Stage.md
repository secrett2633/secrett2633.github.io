---
title: "[논문리뷰] Any to Full: Prompting Depth Anything for Depth Completion in One Stage"
excerpt: "Taichi Liu이 arXiv에 게시한 'Any to Full: Prompting Depth Anything for Depth Completion in One Stage' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Depth Completion
  - Monocular Depth Estimation (MDE)
  - Prompt Learning
  - Domain Generalization
  - Pattern Agnostic
  - One-stage Learning
  - Robotic Perception
  - Scale Consistency

permalink: /ai/review/2026-03-12-Any-to-Full-Prompting-Depth-Anything-for-Depth-Completion-in-One-Stage/

toc: true
toc_sticky: true

date: 2026-03-12 00:00:00+0900+0900
last_modified_at: 2026-03-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.05711)

**저자:** Zhiyuan Zhou, Ruofeng Liu, Taichi Liu, Weijian Zuo, Shanshan Wang, Zhiqing Hong, Desheng Zhang



## 핵심 연구 목표
본 논문은 기존의 RGBD 융합 기반 깊이 완성(Depth Completion) 방법론들이 겪는 도메인 특이성 및 깊이 패턴 민감성 문제를 해결하고, 이단계 MDE 통합 접근 방식의 계산 오버헤드와 구조적 왜곡을 극복하는 것을 목표로 합니다. 이를 위해, 사전 훈련된 MDE 모델의 기하학적 사전 지식을 활용하면서 희소 깊이 입력으로부터 스케일 단서(scale cues)를 효과적으로 통합하는 **단일 단계(one-stage)** 프레임워크를 제안합니다.

## 핵심 방법론
제안하는 **Any2Full** 프레임워크는 깊이 완성을 **스케일 프롬프팅 기반 MDE 모델 적응** 으로 재구성합니다. 핵심은 **Scale-Aware Prompt Encoder (SAPE)** 를 설계하여 희소 깊이 입력을 통합된 스케일 프롬프트로 변환하는 것으로, 이 인코더는 **Local Enrichment** 및 **Global Propagation** 이라는 두 가지 계층적 모듈로 구성됩니다. **Local Enrichment** 는 희소 깊이 스케일 단서를 MDE의 밀집 기하학적 컨텍스트와 **FiLM(Feature-wise Linear Modulation)** 을 통해 연결하고, **Global Propagation** 은 **MDE 기하학적 인식 어텐션(geometry-aware attention)** 을 사용하여 스케일 단서를 전역적으로 확산시켜 전역적으로 일관된 스케일 인식을 가능하게 합니다.

## 주요 결과
**Any2Full** 은 다양한 도메인 및 깊이 패턴에서 최첨단 성능을 달성하며, **OMNI-DC** 대비 평균 **AbsREL에서 32.2%** 더 우수하고, 동일한 MDE 백본을 사용하는 **PriorDA** 대비 **1.4배 빠른 속도** 를 제공합니다. 가장 작은 모델인 **Any2Full (DA-S)** 은 **0.09초의 추론 시간** 을 기록하며 **PriorDA보다 7배, TestPromptDC보다 1000배 빠릅니다.** 평균 랭크 **2.3** 을 기록하며 모든 시나리오에서 가장 뛰어난 성능을 보였습니다.

## AI 실무자를 위한 시사점
**Any2Full** 은 실시간 로봇 애플리케이션에서 필수적인 **효율성, 견고성, 도메인 및 패턴 일반화 능력** 을 갖춘 깊이 완성 솔루션을 제공합니다. 단일 단계 설계는 다단계 방법론의 계산 오버헤드를 크게 줄여 **배포 용이성** 을 높입니다. 실제 로봇 창고 환경의 **로봇 팔 그랩 성공률을 28%에서 91.6%로 향상** 시킨 사례는 이 기술의 실질적인 가치와 산업적 적용 가능성을 명확히 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.