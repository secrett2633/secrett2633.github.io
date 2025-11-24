---
title: "[논문리뷰] SpaceVista: All-Scale Visual Spatial Reasoning from mm to km"
excerpt: "Kaituo Feng이 [arXiv]에 게시한 'SpaceVista: All-Scale Visual Spatial Reasoning from mm to km' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Spatial Reasoning
  - Multi-Scale Vision
  - MLLM
  - Dataset
  - Scale Experts
  - Reinforcement Learning
  - Computer Vision
  - Robotics

permalink: /ai/review/2025-10-13-SpaceVista-All-Scale-Visual-Spatial-Reasoning-from-mm-to-km/

toc: true
toc_sticky: true

date: 2025-10-13 13:44:18+0900
last_modified_at: 2025-10-13 13:44:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.09606)

**저자:** Peiwen Sun*, Shiqiang Lang*◇, Dongming Wu, Yi Ding, Kaituo Feng, Huadai Liu*, Zhen Ye, Rui Liu♠, Yun-Hui Liu, Jianan Wang†, Xiangyu Yue♠



## 핵심 연구 목표
본 논문은 기존 공간 추론 모델들이 실내 3D 스캔 및 수동 어노테이션에 의존하고 개별 장면에 과적합되는 한계를 극복하여, **mm부터 km까지** 아우르는 **모든 스케일에서의 시각 공간 추론(All-Scale Visual Spatial Reasoning)** 능력을 발전시키는 것을 목표로 합니다. 이는 **다중모드 대규모 언어 모델(MLLM)**의 공간 지능을 확장하려는 첫 시도입니다.

## 핵심 방법론
연구진은 **38K개 비디오 장면**과 **1M개 공간 QA 쌍**으로 구성된 **SpaceVista-1M 데이터셋**을 **자동화된 파이프라인**으로 구축했습니다. 모델 측면에서는 풍부한 공간 정보를 통합하고 **크로스-스케일 충돌**을 완화하기 위해 **LoRA-like scale experts**와 **스케일 라우터**를 활용한 **SpaceVista-7B** 모델을 제안했습니다. 또한, 스케일을 기준으로 **점진적 보상(progressive rewards)**을 사용하는 **GRPO(Group Relative Policy Optimization) 기반** 훈련 패러다임을 도입하여 모델의 추론 능력을 강화했습니다.

## 주요 결과
**SpaceVista-1M 데이터셋**은 **mm에서 km까지** 6가지 규모를 커버하며, 5개 공간 스케일과 19가지 다양한 태스크를 포함합니다. **SpaceVista-7B** 모델은 **SpaceVista-Bench** 벤치마크에서 **36.7%**의 성능을 달성하여 **Gemini-2.5-pro(33.8%)** 및 **Qwen2.5-VL-72B(31.1%)**와 같은 기존 모델들보다 **3% 이상 뛰어난 성능**을 보였습니다. 특히 **scale experts**와 **DINOv3**를 통합한 방법론이 상당한 성능 향상에 기여했음을 **어블레이션 연구**를 통해 입증했습니다.

## AI 실무자를 위한 시사점
**SpaceVista-1M 데이터셋**은 mm에서 km에 이르는 광범위한 스케일의 실제 환경 데이터를 제공하여 로봇 공학, 자율 주행, 원격 감지 등 다양한 분야에서 **범용적인 공간 추론 모델** 개발을 위한 핵심 리소스가 될 것입니다. **LoRA-like scale experts**를 활용한 **스케일-인지 모델링 접근 방식**은 **MLLM**이 다양한 스케일에서 발생하는 지식 충돌을 효과적으로 처리할 수 있는 실용적인 해결책을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.