---
title: "[논문리뷰] COOPER: A Unified Model for Cooperative Perception and Reasoning in Spatial Intelligence"
excerpt: "Jiawei Sheng이 arXiv에 게시한 'COOPER: A Unified Model for Cooperative Perception and Reasoning in Spatial Intelligence' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models (MLLMs)
  - Spatial Reasoning
  - Perception Enhancement
  - Auxiliary Modalities
  - Adaptive Interleaved Reasoning
  - Reinforcement Learning
  - Chain-of-Thought

permalink: /ai/review/2025-12-08-COOPER-A-Unified-Model-for-Cooperative-Perception-and-Reasoning-in-Spatial-Intelligence/

toc: true
toc_sticky: true

date: 2025-12-08 00:00:00+0900+0900
last_modified_at: 2025-12-08 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.04563)

**저자:** Jiawei Sheng, Zhenyu Zhang, Hengzhu Tang, CUDAOUTOFMEMORY, Starrrrrry



## 핵심 연구 목표
본 연구는 기존 MLLM이 3D 공간 추론 및 객체 속성 이해에 어려움을 겪는 문제를 해결하고자 합니다. 단일 통합 MLLM이 **공간 지각 능력을 내재적으로 향상** 시키고, **적응형의 인터리브드 추론** 을 통해 더욱 강력한 공간 지능을 달성할 수 있는지 탐구하는 것을 목표로 합니다.

## 핵심 방법론
**COOPER** 는 **BAGEL** 기반의 통합 MLLM으로, 두 단계로 훈련됩니다. 첫째, **보조 양식 생성(Auxiliary Modality Generation)** 단계에서는 깊이 및 세그멘테이션 맵을 **RGB 의사 이미지** 로 변환하여 **플로우 매칭 기반 훈련 파이프라인** 에 맞추고, 추론 시에는 지정된 제어 토큰을 통해 적절한 디코더를 동적으로 선택합니다. 둘째, **적응형 인터리브드 추론(Adaptive Interleaved Reasoning)** 단계에서는 **GPT-40** 으로 큐레이션된 데이터를 이용한 **지도 미세 조정(SFT)** 을 통해 능력 선택을 학습하고, **Cooperative Perception-Reasoning (CPR) 보상** 을 사용하는 **강화 학습(RL)** 으로 추론 정책을 최적화합니다.

## 주요 결과
**COOPER** 는 기본 모델 대비 공간 추론 성능에서 평균 **6.91%** 향상을 달성했으며, 특히 거리 및 크기 추정에서 **7.92%** 의 상당한 개선을 보였습니다. 또한, 일반 멀티모달 벤치마크에서도 **4.47%** 의 전반적인 성능 향상을 기록하며, 인식 강화 및 추론 강화 단독 접근 방식보다 우수한 성능을 입증했습니다. 깊이 추정 성능은 전문 모델인 **Marigold** 에 필적합니다(NYUv2 데이터셋에서 AbsRel **0.5** 대 Marigold **5.5** ).

## AI 실무자를 위한 시사점
이 연구는 **보조 양식 생성** 능력을 내재화하는 것이 공간 지식 습득과 이해 강화에 기여함을 보여줍니다. AI/ML 엔지니어는 MLLM이 깊이 및 세그멘테이션과 같은 **비-RGB 보조 양식** 을 직접 생성하고 이를 **멀티모달 CoT** 의 일부로 활용함으로써, 복잡한 공간 추론 태스크에서 모델의 성능을 크게 향상시킬 수 있습니다. 이는 기존 MLLM을 활용하여 로봇 공학, 자율 주행 등 3D 환경을 다루는 응용 분야에 적용될 수 있는 잠재력을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.