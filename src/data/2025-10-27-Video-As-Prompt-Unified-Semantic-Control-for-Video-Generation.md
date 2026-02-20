---
title: "[논문리뷰] Video-As-Prompt: Unified Semantic Control for Video Generation"
excerpt: "arXiv에 게시된 'Video-As-Prompt: Unified Semantic Control for Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Semantic Control
  - Diffusion Transformers
  - In-Context Learning
  - Mixture-of-Transformers
  - Video-As-Prompt
  - Controllable Generation
  - Large-scale Dataset

permalink: /ai/review/2025-10-27-Video-As-Prompt-Unified-Semantic-Control-for-Video-Generation/

toc: true
toc_sticky: true

date: 2025-10-27 13:07:36+0900
last_modified_at: 2025-10-27 13:07:36+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.20888)

**저자:** Yuxuan Bian, Xin Chen, Zenan Li, Tiancheng Zhi, Shen Sang, Linjie Luo, Qiang Xu



## 핵심 연구 목표
이 논문은 비디오 생성 분야에서 통합적이고 일반화 가능한 의미론적 제어라는 중요한 과제를 해결하고자 합니다. 기존 방법론들이 부적절한 픽셀 단위 사전 정보를 강요하여 아티팩트를 생성하거나, 특정 조건에 대한 파인튜닝이나 태스크별 아키텍처에 의존하여 일반화가 어렵다는 문제를 극복하는 것을 목표로 합니다. **Video-As-Prompt (VAP)** 라는 새로운 패러다임을 통해 이 문제를 인컨텍스트 생성으로 재구성하고, 픽셀 정렬이 없는 다양한 의미론적 조건을 단일 모델로 제어하는 통일된 프레임워크를 제안합니다.

## 핵심 방법론
VAP는 원하는 의미를 가진 **참조 비디오(reference video)** 를 직접적인 의미론적 프롬프트로 사용하여 비디오 생성을 안내합니다. 이 모델은 **frozen Video Diffusion Transformer (DiT)** 에 **플러그 앤 플레이(plug-and-play) 방식** 의 **Mixture-of-Transformers (MoT)** expert를 활용하여 파괴적 망각(catastrophic forgetting)을 방지하고 인컨텍스트 제어를 가능하게 합니다. 또한, 견고한 컨텍스트 검색을 위해 **시간적으로 편향된 회전 위치 임베딩(temporally biased Rotary Position Embedding, RoPE)** 을 채택하여 불필요한 픽셀 매핑 사전 정보를 제거하고, 인컨텍스트 생성에 적합한 시간 순서를 보존합니다. 이 접근 방식을 지원하기 위해 100개 이상의 의미론적 조건에 걸쳐 10만 개 이상의 페어링된 비디오를 포함하는 최대 규모의 **VAP-Data** 데이터셋을 구축했습니다.

## 주요 결과
VAP는 오픈 소스 방법론 중 **최첨단(state-of-the-art)** 성능을 달성했으며, 주요 조건별 상업용 모델과 경쟁할 만한 **38.7%의 사용자 선호도(user preference rate)** 를 기록했습니다. 이 단일 통합 모델은 다양한 의미론적 조건과 다운스트림 생성 태스크에 걸쳐 일관되고 의미론적으로 정렬된 비디오를 생성합니다. 특히 **강력한 제로샷 일반화(zero-shot generalization)** 능력을 보여주며, **MoT 아키텍처** 와 **시간 편향 RoPE** 의 도입이 성능 향상에 기여했음을 정량적(Table 2) 및 질적 분석(Fig. 6, 7)을 통해 입증했습니다.

## AI 실무자를 위한 시사점
VAP는 단일 모델로 다양한 의미론적 제어 비디오 생성 태스크를 처리할 수 있는 **통합된 프레임워크** 를 제공하여, AI 개발자들이 조건별로 모델을 개별적으로 파인튜닝하거나 태스크별 아키텍처를 설계할 필요성을 크게 줄였습니다. **플러그 앤 플레이 MoT 디자인** 은 기존의 강력한 **Video Diffusion Transformer** 백본을 효과적으로 활용하면서도 새로운 제어 기능을 유연하게 추가할 수 있는 실용적인 방법을 제시합니다. 또한, 구축된 **VAP-Data** 는 의미론적 제어 비디오 생성 연구 및 모델 개발을 위한 중요한 **대규모 데이터 기반** 을 제공하여, 비디오 편집, 스타일화, 모션 제어 등 다양한 AI 애플리케이션 발전에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.