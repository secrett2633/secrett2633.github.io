---
title: "[논문리뷰] PANORAMA: The Rise of Omnidirectional Vision in the Embodied AI Era"
excerpt: "Zihao Dongfang이 arXiv에 게시한 'PANORAMA: The Rise of Omnidirectional Vision in the Embodied AI Era' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Omnidirectional Vision
  - Embodied AI
  - Panoramic Perception
  - Multi-modal Learning
  - Dataset Development
  - Robot Navigation
  - Spatial Reasoning
  - System Architecture

permalink: /ai/review/2025-9-18-PANORAMA-The-Rise-of-Omnidirectional-Vision-in-the-Embodied-AI-Era/

toc: true
toc_sticky: true

date: 2025-09-18 13:07:00+0900
last_modified_at: 2025-09-18 13:07:00+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.12989)

**저자:** Xu Zheng, Chenfei Liao, Ziqiao Weng, Kaiyu Lei, Zihao Dongfang



## 핵심 연구 목표
본 논문은 기존 핀홀(pinhole) 비전에 비해 연구가 뒤처진 옴니디렉셔널(omnidirectional) 비전의 잠재력을 발현하고, 데이터 병목 현상, 모델 역량 한계, 애플리케이션 공백과 같은 주요 문제를 해결하여 **신체화된 AI(Embodied AI)** 시대에 포괄적인 환경 인식을 달성하는 것을 목표로 합니다. 궁극적으로 로봇이 주변 환경을 완전히 이해하고 상호작용할 수 있도록 **360° 시야** 를 통해 완전한 상황 인식을 제공하고자 합니다.

## 핵심 방법론
이 연구는 옴니디렉셔널 비전 시스템을 위한 이상적인 아키텍처인 **PANORAMA** 를 제안합니다. 이 시스템은 **데이터 획득 및 전처리** , **인지(Perception)** , **애플리케이션** , **가속화 및 활용** 의 네 가지 핵심 하위 시스템으로 구성됩니다. 특히, **Perception** 하위 시스템은 구형 기하학에 최적화된 **Spherical CNNs** 및 **Transformers** 와 같은 딥러닝 모델을 활용하여 의미론적 분할, 객체 탐지, 깊이 추정 등의 작업을 수행합니다. 또한, **데이터 통합** 부터 **모델 배포 및 일반화** 에 이르는 6단계 로드맵을 제시하며, **도메인 적응** , **가상 레이블링(pseudo-labeling)** , **프로토타입 정렬** 기법을 강조합니다.

## 주요 결과
본 논문은 새로운 모델을 통한 정량적 실험 결과보다는 옴니디렉셔널 비전 분야의 종합적인 현황 분석과 미래 로드맵 제시를 주된 기여로 합니다. 예를 들어, **GoodSAM** 이 **Segment Anything Model(SAM)** 을 활용하여 가상 레이블의 신뢰성을 향상시키는 방법론을 소개합니다. 또한, 실내, 실외, UAV/비행 등 다양한 시나리오를 아우르는 **23개의 대표적인 옴니디렉셔널 데이터셋** 을 분류하고 분석하여 이 분야의 데이터 생태계를 조망합니다. 구체적인 실험 지표는 제시되지 않았지만, 기존 연구들의 성과와 함께 **PANORAMA** 시스템이 나아가야 할 방향을 제시합니다.

## AI 실무자를 위한 시사점
옴니디렉셔널 비전은 로봇 공학 및 자율 주행에서 **사각지대를 제거** 하고 **전체론적 환경 인식을 가능** 하게 함으로써 신체화된 AI의 발전에 필수적인 이점을 제공합니다. 제안된 **PANORAMA 아키텍처** 는 360° 비전을 실제 AI 애플리케이션에 통합하기 위한 체계적인 가이드라인을 제공합니다. AI 실무자들은 **대규모 다중 작업 옴니디렉셔널 데이터셋 구축** , **새로운 투영-불가지론적(projection-agnostic) 아키텍처 개발** , 그리고 **실제 적용 사례 탐색** 을 통해 이 분야의 발전에 기여할 수 있습니다. 이는 동적인 환경에서 모델의 견고한 배포를 위한 **크로스-도메인 전이 학습** 과 **지속적인 학습** 의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.