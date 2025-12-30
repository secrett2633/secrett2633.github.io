---
title: "[논문리뷰] Yume-1.5: A Text-Controlled Interactive World Generation Model"
excerpt: "Kaining Ying이 [arXiv]에 게시한 'Yume-1.5: A Text-Controlled Interactive World Generation Model' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Interactive World Generation
  - Video Diffusion Models
  - Text-to-Video
  - Image-to-Video
  - Real-time Generation
  - Temporal-Spatial-Channel Modeling
  - Self-Forcing

permalink: /ai/review/2025-12-30-Yume-1-5-A-Text-Controlled-Interactive-World-Generation-Model/

toc: true
toc_sticky: true

date: 2025-12-30 00:00:00+0900+0900
last_modified_at: 2025-12-30 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.22096)

**저자:** Xiaofeng Mao, Zhen Li, Chuanhao Li, Xiaojie Xu, Kaining Ying, Tong He, Jiangmiao Pang, Yu Qiao, Kaipeng Zhang



## 핵심 연구 목표
본 논문은 대규모 파라미터 크기, 긴 추론 단계, 빠르게 증가하는 히스토리컬 컨텍스트, 그리고 텍스트 기반 제어 능력 부족과 같은 기존 비디오 확산 모델의 한계를 극복하여 **사실적이고 상호작용적이며 연속적인 가상 세계를 실시간으로 생성** 하는 것을 목표로 합니다. 특히, 단일 이미지나 텍스트 프롬프트로부터 사용자 제어 가능한 무한한 세계를 생성하고자 합니다.

## 핵심 방법론
Yume1.5는 세 가지 핵심 구성 요소로 이루어져 있습니다. 첫째, 효율적인 장기 비디오 생성을 위해 **통합 컨텍스트 압축(unified context compression)** 과 **선형 어텐션(linear attention)** 을 활용하는 **Joint Temporal-Spatial-Channel Modeling (TSCM)** 프레임워크를 제안합니다. 둘째, 실시간 가속을 위해 **양방향 어텐션 증류(bidirectional attention distillation)** 와 **강화된 텍스트 임베딩 스키마** 를 통해 **Self-Forcing** 기법을 통합했습니다. 셋째, 텍스트 기반 이벤트 생성을 위해 **신중하게 설계된 아키텍처** 와 **혼합 데이터셋 훈련 전략** 을 사용합니다.

## 주요 결과
Yume1.5는 이미지-투-비디오 생성에서 **Instruction Following (IF) 점수 0.836** 을 달성하여 기존 SOTA 모델인 Wan-2.1(0.057) 및 MatrixGame(0.271)을 크게 능가했습니다. 또한, 단일 **NVIDIA A100 GPU** 를 사용하여 **540p 해상도에서 평균 12 fps** 의 생성 속도를 달성하며 실시간 성능을 입증했습니다. TSCM은 비디오 블록 수가 증가함에 따라 추론 시간의 안정성을 유지하며, Full Context Input 방식 대비 크게 개선된 성능을 보여주었습니다.

## AI 실무자를 위한 시사점
Yume1.5는 **실시간 상호작용 가능한 가상 세계 생성** 의 가능성을 보여주며, 게임, 시뮬레이션, 메타버스 콘텐츠 제작 분야에 혁신적인 응용 잠재력을 제공합니다. 특히 **텍스트 프롬프트로 세계 이벤트 생성 및 사용자 정의** 가 가능하다는 점은 콘텐츠 크리에이터에게 강력한 도구가 될 수 있습니다. 다만, 모델 크기(5B 파라미터)의 제약으로 인한 고밀도 군중 시나리오에서의 성능 저하는 향후 MoE(Mixture-of-Experts) 아키텍처를 통한 스케일업 연구의 필요성을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.