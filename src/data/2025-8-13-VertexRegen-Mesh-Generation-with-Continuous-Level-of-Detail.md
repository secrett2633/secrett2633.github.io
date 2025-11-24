---
title: "[논문리뷰] VertexRegen: Mesh Generation with Continuous Level of Detail"
excerpt: "Jakob Engel이 [arXiv]에 게시한 'VertexRegen: Mesh Generation with Continuous Level of Detail' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Mesh Generation
  - Level of Detail (LOD)
  - Progressive Meshes
  - Vertex Split
  - Autoregressive Models
  - Transformer
  - 3D Graphics

permalink: /ai/review/2025-8-13-VertexRegen-Mesh-Generation-with-Continuous-Level-of-Detail/

toc: true
toc_sticky: true

date: 2025-08-13 13:29:23+0900
last_modified_at: 2025-08-13 13:29:23+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.09062)

**저자:** Xiang Zhang, Yawar Siddiqui, Armen Avetisyan, Chris Xie, Jakob Engel, Henry Howard-Jenkins



## 핵심 연구 목표
기존 자동회귀 메쉬 생성 모델들이 부분-완료 방식으로 동작하여, 유효한 메쉬를 얻기 위해 전체 시퀀스를 생성해야만 하고 중간 단계에서는 불완전한 구조를 생성하는 문제를 해결하고자 합니다. 본 논문은 메쉬 생성 과정에서 **연속적인 수준의 디테일(LOD)을 제공**하며, 어느 단계에서든 생성을 중단해도 유효한 메쉬를 얻을 수 있는 **'Anytime Generation'** 프레임워크를 제안하는 것을 목표로 합니다.

## 핵심 방법론
메쉬 생성을 **Hoppe의 프로그레시브 메쉬 개념**에서 영감을 받아 **에지 붕괴(edge collapse)의 역과정인 정점 분할(vertex split) 작업**의 학습으로 재구성합니다. 모델은 먼저 **초기 coarsest 메쉬(M₀)**를 생성한 다음, **변환기(Transformer)**를 사용하여 정점 분할 레코드를 순차적으로 생성함으로써 디테일을 점진적으로 추가합니다. 정점 분할 시퀀스는 **반쪽 에지 데이터 구조(half-edge data structure)**를 통해 토큰화되어 효율성을 높였으며, 생성된 정점 분할의 기하학적 유효성을 보장하기 위해 **가이드 디코딩(guided decoding)**을 적용합니다.

## 주요 결과
**VertexRegen**은 정량적 평가에서 **MeshXL, MeshAnything V2, EdgeRunner**와 같은 최신 방법론들과 비교하여 유사한 품질을 달성합니다 (COV 51.03%, MMD 8.29, 1-NNA 50.22%, JSD 2.89). 특히, 초기 생성 단계(낮은 면수)에서 **COV, MMD, 1-NNA 지표가 경쟁 모델보다 유의미하게 우수**하여, 적은 디테일로도 안정적인 메쉬 구조를 제공함을 입증했습니다. 또한, **토큰화 효율성**이 높고 (압축률 **0.73**), **가이드 디코딩**을 통해 더 긴 유효 시퀀스 생성이 가능함을 보여줍니다.

## AI 실무자를 위한 시사점
본 연구는 3D 메쉬 생성에서 **연속적인 LOD 제어**와 **'Anytime Generation'**이라는 독특한 장점을 제공하여, 실시간 애플리케이션, 게임 개발, 대화형 3D 콘텐츠 제작 등에서 **동적인 LOD 조절이 필수적인 환경**에 큰 이점을 제공합니다. 부분-완료 방식의 기존 모델과 달리 **coarse-to-fine 방식**으로 유효한 중간 결과를 항상 보장하므로, 효율적인 3D 에셋 파이프라인 구축에 기여할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.