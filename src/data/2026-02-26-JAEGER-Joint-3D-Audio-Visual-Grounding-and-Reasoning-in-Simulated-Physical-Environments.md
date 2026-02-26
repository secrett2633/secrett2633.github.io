---
title: "[논문리뷰] JAEGER: Joint 3D Audio-Visual Grounding and Reasoning in Simulated Physical Environments"
excerpt: "[arXiv]에 게시된 'JAEGER: Joint 3D Audio-Visual Grounding and Reasoning in Simulated Physical Environments' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D Audio-Visual Learning
  - Spatial Grounding
  - Spatial Reasoning
  - Large Language Models (LLMs)
  - Ambisonics
  - RGB-D
  - Simulated Environments
  - Neural Intensity Vector

permalink: /ai/review/2026-02-26-JAEGER-Joint-3D-Audio-Visual-Grounding-and-Reasoning-in-Simulated-Physical-Environments/

toc: true
toc_sticky: true

date: 2026-02-26 00:00:00+0900+0900
last_modified_at: 2026-02-26 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2602.18527)

**저자:** Zhan Liu, Changli Tang, Yuxin Wang, Zhiyuan Zhu, Youjun Chen, Yiwen Shao, Tianzi Wang, Lei Ke, Zengrui Jin, Chao Zhang



## 핵심 연구 목표
기존 2D-중심 AV-LLM이 RGB 비디오와 모노 오디오에 의존하여 3D 환경에서 음원 위치 파악 및 공간 추론에 어려움을 겪는 문제를 해결하고자 합니다. **RGB-D** 관측 및 **다중 채널 1차 Ambisonics(FOA)** 통합을 통해 AV-LLM을 3D 공간으로 확장하여 공동 공간 Grounding 및 추론을 가능하게 하는 것을 목표로 합니다.

## 핵심 방법론
본 논문은 **RGB-D** 시각 스트림과 듀얼 패스 오디오 스트림을 통합하는 **JAEGER** 프레임워크를 제안합니다. 시각 스트림은 깊이 투영된 **3D 위치 인코딩** 으로 강화되며, 오디오 스트림은 옴니디렉셔널 FOA 채널에서 추출된 의미론적 콘텐츠와 **Neural Intensity Vector (Neural IV)** 를 통해 공간 방향성 단서를 분리합니다. **Neural IV** 는 **학습 가능한 CNN 백본과 MLP** 를 사용하여 잔향 및 겹치는 음원 환경에서 강력한 방향성 정보를 인코딩하며, **Qwen2.5-Omni** 를 **LoRA** 를 통해 파인튜닝합니다. 또한 61k 샘플의 대규모 벤치마크 데이터셋인 **SpatialSceneQA** 를 구축하여 훈련과 평가를 지원합니다.

## 주요 결과
단일 음원 DoA 추정에서 **JAEGER (Neural IV)** 는 **2.21°** 의 중앙 각도 오차(MAE)를 달성하여 기존 **BAT (2.16°)** 와 견줄만한 성능을 보였습니다. 겹치는 음원 시나리오에서는 **BAT의 19.09° MAE** 를 **13.13°** 로 크게 감소시켰습니다. 3D 시각 Grounding에서는 **0.32의 3D IoU** 와 **0.16m의 중앙 시각 오프셋** 을 달성했으며, **깊이 인코딩** 이 3D IoU를 **0.29에서 0.32** 로, 시각 오프셋을 **0.18m에서 0.16m** 로 개선했습니다. 공동 오디오-시각 추론 태스크에서는 1-스피커 시나리오에서 **99.5%** , 2-스피커 시나리오에서 **99.2%** 의 정확도를 기록했습니다.

## AI 실무자를 위한 시사점
본 연구는 물리적 환경에서 AI의 고급 추론 능력을 위해 **3D 깊이 정보** 와 **다중 채널 공간 오디오** 의 통합이 필수적임을 강조합니다. **Neural IV** 와 같은 학습 기반 공간 오디오 표현은 복잡하고 현실적인 음향 환경에서 음원 위치 추정의 견고성을 향상시키는 데 중요한 역할을 할 수 있습니다. **SpatialSceneQA** 와 같은 대규모 3D 오디오-시각 데이터셋은 3D AV-LLM 개발 및 평가를 위한 중요한 자원으로 활용될 수 있으며, 실제 응용을 위한 모델의 전반적인 지각 및 상호작용 능력을 향상시키는 데 기여합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.