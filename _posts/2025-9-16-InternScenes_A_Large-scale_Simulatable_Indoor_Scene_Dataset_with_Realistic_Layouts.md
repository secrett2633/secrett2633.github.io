---
title: "[논문리뷰] InternScenes: A Large-scale Simulatable Indoor Scene Dataset with
  Realistic Layouts"
excerpt: "Wenzhe Cai이 [arXiv]에 게시한 'InternScenes: A Large-scale Simulatable Indoor Scene Dataset with
  Realistic Layouts' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Embodied AI
  - 3D Scene Dataset
  - Simulation Environment
  - Scene Generation
  - Point-Goal Navigation
  - Realistic Layouts
  - Object Interaction
  - Real-to-Sim

permalink: /ai/review/2025-9-16-InternScenes_A_Large-scale_Simulatable_Indoor_Scene_Dataset_with_Realistic_Layouts/

toc: true
toc_sticky: true

date: 2025-09-16 13:16:41+0900
last_modified_at: 2025-09-16 13:16:41+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.10813)

**저자:** Weipeng Zhong, Peizhou Cao, Yichen Jin, Li Luo, Wenzhe Cai, Jingli Lin, Hanqing Wang, Zhaoyang Lyu, Tai Wang, Bo Dai, Xudong Xu, Jiangmiao Pang



## 핵심 연구 목표
본 연구는 **Embodied AI**의 발전을 위해 기존 3D 장면 데이터셋이 가진 규모, 다양성, 사실적인 레이아웃(특히 작은 객체), 심각한 객체 충돌 문제를 해결하고자 합니다. 궁극적으로, 복잡하고 현실적인 레이아웃을 갖춘 대규모 시뮬레이션 가능 실내 장면 데이터셋인 **InternScenes**를 구축하여 에이전트가 다양한 기술을 학습하고 현실 세계에 견고하게 적응할 수 있는 기반을 마련하는 것을 목표로 합니다.

## 핵심 방법론
**InternScenes**는 실제 스캔 데이터 (**EmbodiedScan**), 절차적 생성 데이터 (**Infinigen indoors**), 디자이너 생성 데이터의 세 가지 소스를 통합하여 약 **40,000개**의 다양한 실내 장면을 구축했습니다. 실제 스캔 데이터의 경우 **Objaverse** 및 **PartNet-Mobility** 자산으로 객체를 대체하고 **GPT-4o** 및 **InternVL**을 활용한 라벨 매핑 및 포즈 교정 파이프라인을 적용하여 **real-to-sim** 복제본을 생성했습니다. 객체 충돌 문제를 해결하기 위해 **IoU, Ground Loss, Regularization Term**으로 구성된 손실 함수로 대형 가구의 **Oriented Bounding Box (OBB)**를 최적화하고, **SAPIEN** 물리 시뮬레이션을 통해 작은 객체의 물리적 일관성을 확보했습니다.

## 주요 결과
**InternScenes**는 **15가지** 유형의 **48,000개** 지역에서 **288개** 객체 클래스에 걸쳐 **1.96M개**의 3D 객체를 포함하며, 각 지역당 평균 **41.5개**의 객체로 매우 복잡하고 사실적인 레이아웃을 제공합니다. 장면 생성 벤치마크에서 **ATISS, DiffuScene**과 같은 기존 모델은 **InternScenes**의 복잡한 레이아웃에서 성능 저하를 보였으나, **PhyScene**은 **물리 기반 가이던스** 덕분에 다른 모델들보다 우수한 성능을 나타냈습니다. **point-goal navigation** 벤치마크에서는 **DD-PPO**가 **23.6%**의 낮은 성공률을, **NavDP**가 **48.3%**의 성공률을 기록하여 복잡한 환경에서의 내비게이션이 여전히 큰 도전임을 입증했습니다.

## AI 실무자를 위한 시사점
**InternScenes**는 **Embodied AI** 모델 학습을 위한 전례 없는 규모와 현실성을 갖춘 시뮬레이션 환경을 제공하여 **장면 생성 및 시각 내비게이션** 분야에서 새로운 연구 과제를 제시합니다. 특히 데이터셋의 복잡한 레이아웃은 **물리적 일관성과 미세 객체 상호작용**을 효과적으로 처리하는 새로운 모델 및 알고리즘 개발의 필요성을 강조합니다. **simulation-ready**한 자산과 오픈 소스 데이터는 AI 개발자들이 **강화 학습 기반 로봇 제어 정책**을 개발하고 **real-to-sim** 격차를 해소하는 데 중요한 자원이 될 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.