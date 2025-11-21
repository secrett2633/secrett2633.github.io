---
title: "[논문리뷰] Visual Spatial Tuning"
excerpt: "이 [arXiv]에 게시한 'Visual Spatial Tuning' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Vision-Language Models
  - Spatial Reasoning
  - Spatial Perception
  - Dataset Creation
  - Reinforcement Learning
  - Visuospatial AI
  - Robotics

permalink: /ai/review/2025-11-10-Visual_Spatial_Tuning/

toc: true
toc_sticky: true

date: 2025-11-10 00:00:00+0900+0900
last_modified_at: 2025-11-10 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.05491)

**저자:** Rui Yang, Ziyu Zhu, Yanwei Li, Jingjia Huang, Shen Yan, Siyuan Zhou, Zhe Liu, Xiangtai Li, Shuangye Li, Wenqian Wang, Yi Lin, Hengshuang Zhao 외



## 핵심 연구 목표
본 논문은 기존 **Vision-Language Models (VLMs)**이 시각 정보에서 공간 관계를 포착하는 데 한계가 있다는 문제를 해결하고자 합니다. 특히, 추가적인 전문가 인코더 없이 범용 VLM 아키텍처 내에서 인간과 유사한 **시공간 능력(spatial perception 및 spatial reasoning)**을 통합적으로 배양하고, 이를 통해 VLM이 물리적 세계와 효과적으로 상호작용할 수 있도록 하는 것이 목표입니다.

## 핵심 방법론
연구팀은 **Visual Spatial Tuning (VST)**이라는 포괄적인 프레임워크를 제안합니다. 이는 **공간 지각(spatial perception)** 강화를 위한 **VST-P** 데이터셋(19개 작업에 걸친 410만 샘플)과 **공간 추론(spatial reasoning)** 강화를 위한 **VST-R** 데이터셋(13만 5천 샘플)으로 구성됩니다. 특히, **VST-R** 데이터셋 구축 시 **Bird's-Eye View (BEV) 어노테이션을 활용한 Chain-of-Thought (CoT) 프롬프팅** 기법으로 고품질 추론 데이터를 생성했습니다. 학습은 **지도 학습(Supervised Fine-tuning)**으로 기초 공간 지식을 구축하고, 이후 **강화 학습(Reinforcement Learning)**을 통해 추론 능력을 고도화하는 **점진적 훈련 파이프라인**을 사용합니다. 기본 모델로는 **Qwen2.5-VL**이 활용되었습니다.

## 주요 결과
제안된 VST 프레임워크는 여러 공간 벤치마크에서 일관되게 최첨단 성능을 달성했습니다. 특히 **MMSI-Bench에서 34.8%**, **VSIBench에서 61.2%**를 기록했으며, **SUN RGB-D 3D 객체 탐지 벤치마크에서 VST-7B-RL 모델이 44.2% AP@15**로 최고 성능을 보였습니다. 또한, VST는 일반적인 멀티모달 능력을 유지하면서 **Vision-Language-Action (VLA) 모델**의 성능을 크게 향상시켜, **LIBERO 벤치마크에서 평균 8.6%의 성공률 개선**을 이끌어냈습니다.

## AI 실무자를 위한 시사점
본 연구는 추가적인 전문 인코더 없이 범용 VLM에 강력한 공간 인지 및 추론 능력을 부여할 수 있음을 입증하여 **모델 복잡성을 줄이고 범용성**을 유지하는 중요한 방향을 제시합니다. **VST-P** 및 **VST-R**과 같은 **대규모 구조화된 데이터셋 구축**과 **단계별 학습(SFT, CoT, RL) 전략**은 VLM의 공간 능력을 효과적으로 확장하는 실용적인 접근법을 제공합니다. 특히 **BEV 어노테이션 기반 CoT 생성**은 복잡한 공간 추론을 위한 고품질 학습 데이터 구축에 매우 유용하며, **로봇 공학** 및 **자율 주행**과 같은 **물리적으로 접지된 AI 시스템** 개발에 필수적인 VLA 모델의 성능 향상에 큰 기여를 할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.