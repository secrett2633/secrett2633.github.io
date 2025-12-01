---
title: "[논문리뷰] RAISECity: A Multimodal Agent Framework for Reality-Aligned 3D World Generation at City-Scale"
excerpt: "Yangcheng Yu이 [arXiv]에 게시한 'RAISECity: A Multimodal Agent Framework for Reality-Aligned 3D World Generation at City-Scale' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - 3D World Generation
  - City-Scale
  - Multimodal Agents
  - Reality Alignment
  - Urban Simulation
  - Foundation Models
  - Geospatial Data

permalink: /ai/review/2025-11-27-RAISECity-A-Multimodal-Agent-Framework-for-Reality-Aligned-3D-World-Generation-at-City-Scale/

toc: true
toc_sticky: true

date: 2025-11-27 00:00:00+0900+0900
last_modified_at: 2025-11-27 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.18005)

**저자:** Shengyuan Wang, Zhiheng Zheng, Yu Shang, Lixuan He, Yangcheng Yu, Hangyu Fan, Jie Feng, Qingmin Liao, Yong Li



## 핵심 연구 목표
본 연구는 도시 규모 3D 세계 생성에서 기존 방법론이 직면한 품질, 충실도 및 확장성 문제를 해결하는 것을 목표로 합니다. 특히, 현실과 정렬된 상세하고 복잡한 도시 3D 세계를 자동으로 생성하기 위한 **멀티모달 에이전트 프레임워크** 인 **RAISECITY** 를 제안하여, 몰입형 미디어, 체화된 인텔리전스 및 세계 모델 개발에 기여하고자 합니다.

## 핵심 방법론
**RAISECITY** 는 계획, 인지, 상상, 반성, 3D 생성 및 장면 설계를 포함하는 에이전트 기반 프레임워크를 사용합니다. **OpenStreetMap (OSM)** 의 지리 공간 데이터와 거리 뷰 이미지를 활용하여 현실 세계 지식을 습득하며, **gemini-2.5-flash-image-preview** 로 건물 이미지를 상상하고 **Hunyuan3D** 도구를 사용하여 3D 모델 및 텍스처를 생성합니다. **VLM (Vision-Language Model)** 기반의 자체 평가 ( **gpt-5** 활용) 및 개선 메커니즘을 통해 반복적으로 품질을 향상시키며, **owlvit-base-patch32** 로 객체 탐지를 수행합니다.

## 주요 결과
**RAISECITY** 는 도시 3D 세계 생성에서 **기존 방법론 대비 90% 이상의 종합적인 인식 품질 승률** 을 달성하며, 최첨단 성능을 입증했습니다. 특히, **LPIPS (0.5487)** , **E-IoU (0.0784)** , **LAP Score (5.9833)** 등의 지표에서 우수하며, 형상 정밀도, 텍스처 충실도, 현실 정렬 및 일관성 측면에서 강점을 보였습니다. 이 프레임워크는 실제 지리 데이터를 기반으로 한 스케일 조정, 객체 배치, 도로망 및 교통 모델링을 통해 사실적이고 응집력 있는 도시 환경을 생성합니다.

## AI 실무자를 위한 시사점
**RAISECITY** 는 **훈련 과정 없이** 다양한 **멀티모달 파운데이션 모델 도구** 를 활용하여 고품질, 현실 정렬 3D 세계를 생성함으로써 AI/ML 엔지니어에게 실용적인 솔루션을 제공합니다. 생성된 3D 자산은 **표준 컴퓨터 그래픽스 파이프라인과 완벽하게 호환** 되어 몰입형 미디어, 자율 주행 시뮬레이션 및 세계 모델 연구 개발에 직접 활용될 수 있습니다. 또한, 전체 소스 코드와 생성된 3D 도시 자산이 **오픈 소스** 로 공개되어 지속적인 최적화 및 광범위한 응용을 촉진합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.