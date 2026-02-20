---
title: "[논문리뷰] Matrix-Game 2.0: An Open-Source, Real-Time, and Streaming Interactive
  World Model"
excerpt: "Yifan Zhang이 arXiv에 게시한 'Matrix-Game 2.0: An Open-Source, Real-Time, and Streaming Interactive
  World Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - World Model
  - Interactive Video Generation
  - Real-Time AI
  - Diffusion Models
  - Auto-Regressive Generation
  - Data Pipeline
  - Self-Forcing
  - KV Caching

permalink: /ai/review/2025-8-19-Matrix-Game-2-0-An-Open-Source-Real-Time-and-Streaming-Interactive-World-Model/

toc: true
toc_sticky: true

date: 2025-08-19 13:15:01+0900
last_modified_at: 2025-08-19 13:15:01+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.13009)

**저자:** Xianglong He, Chunli Peng, Zexiang Liu, Boyang Wang, Yifan Zhang, Qi Cui, Fei Kang, Biao Jiang, Mengyin An, Yangyang Ren, Baixin Xu, Hao-Xiang Guo, Kaixiong Gong, Cyrus Wu, Wei Li, Xuchen Song, Yang Liu, Eric Li, Yahui Zhou



## 핵심 연구 목표
본 논문은 기존 인터랙티브 월드 모델이 양방향 어텐션과 긴 추론 단계로 인해 발생하는 지연 문제를 해결하고 실시간 성능을 개선하는 것을 목표로 합니다. 특히, 대규모의 고품질 상호작용 비디오 데이터셋 부족과 자동 회귀 비디오 생성 모델에서의 누적 오차 문제를 해결하여 사용자의 행동에 즉각적으로 반응하는 **실시간, 스트리밍 가능한 인터랙티브 월드 모델** 을 구축하고자 합니다.

## 핵심 방법론
프레임워크는 세 가지 핵심 구성요소로 이루어집니다: (1) **언리얼 엔진** 및 **GTA5** 환경에서 대규모(약 1200시간)의 다양하고 정밀한 상호작용 주석 비디오 데이터를 생성하는 **확장 가능한 데이터 파이프라인** 을 구축합니다. (2) 프레임 수준의 마우스 및 키보드 입력을 인터랙티브 조건으로 주입하는 **액션 주입 모듈** 을 통합합니다. (3) **Self-Forcing [18]** 기반의 **인과적 아키텍처** 를 활용한 **Few-Step Diffusion Distillation** 을 통해 실시간 스트리밍 비디오 생성을 가능하게 합니다.

## 주요 결과
Matrix-Game 2.0은 단일 **H100 GPU** 에서 **25 FPS** 의 초고속으로 고품질의 분(minute) 단위 비디오를 다양한 장면에서 생성할 수 있습니다. 정량적 평가에서 **Minecraft** 장면에서 Oasis [12] 대비 **Image Quality 0.61** (Oasis 0.27), **Keyboard Accuracy 0.91** (Oasis 0.73) 등 월등한 성능을 보였으며, **Wild Scene** 에서도 **YUME [27]** 대비 안정적인 품질을 유지했습니다. 데이터 파이프라인은 카메라 회전 정밀도를 **50배** 향상시키고 데이터 정확도를 **99% 이상** 달성했습니다.

## AI 실무자를 위한 시사점
Matrix-Game 2.0은 **실시간 인터랙티브 비디오 생성** 분야에서 중요한 진전을 보여주며, 게임 엔진 및 자율 주행과 같은 실제 애플리케이션에 대한 실용성을 제시합니다. 특히, **대규모의 고품질 주석 데이터셋 구축** 의 중요성과 **Self-Forcing** 및 **KV-Caching** 과 같은 효율화 기법이 실시간 성능 달성에 핵심적임을 강조합니다. 하지만 **도메인 외(OOD) 장면** 에서의 일반화 능력과 고해상도 출력에 대한 개선은 향후 연구 과제로 남아 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.