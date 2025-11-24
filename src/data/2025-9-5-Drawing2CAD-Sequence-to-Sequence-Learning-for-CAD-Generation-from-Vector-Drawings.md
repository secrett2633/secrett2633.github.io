---
title: "[논문리뷰] Drawing2CAD: Sequence-to-Sequence Learning for CAD Generation from
  Vector Drawings"
excerpt: "Meie Fang이 [arXiv]에 게시한 'Drawing2CAD: Sequence-to-Sequence Learning for CAD Generation from
  Vector Drawings' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - CAD Generation
  - Vector Graphics
  - Sequence-to-Sequence Learning
  - Transformer Architecture
  - Engineering Drawings
  - Multi-modal Learning
  - Soft Target Loss
  - Dual Decoder

permalink: /ai/review/2025-9-5-Drawing2CAD-Sequence-to-Sequence-Learning-for-CAD-Generation-from-Vector-Drawings/

toc: true
toc_sticky: true

date: 2025-09-05 13:07:20+0900
last_modified_at: 2025-09-05 13:07:20+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.18733)

**저자:** Feiwei Qin, Shichao Lu, Junhao Hou, Changmiao Wang, Meie Fang, Ligang Liu



## 핵심 연구 목표
본 연구는 2D 벡터 엔지니어링 도면(SVG 형식)으로부터 **파라메트릭 CAD 모델을 자동으로 생성**하는 문제를 해결하는 것을 목표로 합니다. 기존 방식들이 래스터 이미지나 텍스트 입력에 의존하여 정밀도와 디자인 의도 보존에 한계가 있었던 점을 극복하고, CAD 생성을 **시퀀스-투-시퀀스 학습 문제**로 재정의하여 이러한 격차를 해소하고자 합니다.

## 핵심 방법론
제안하는 **Drawing2CAD** 프레임워크는 세 가지 핵심 구성 요소를 포함합니다. 첫째, 정확한 기하학적 정보를 보존하는 **네트워크 친화적인 벡터 프리미티브 표현**을 개발했습니다. 둘째, 명령어 유형과 매개변수 생성을 분리하고 정확한 대응을 유지하는 **이중 디코더 Transformer 아키텍처**를 사용하며, 특히 **명령어 기반 매개변수 생성** 방식을 도입했습니다. 셋째, CAD 매개변수의 유연성을 수용하는 **소프트 타겟 분포 손실 함수**를 최적화에 적용했습니다. 이를 위해 **CAD-VGDrawing**이라는 대규모 데이터셋을 구축했습니다.

## 주요 결과
**Drawing2CAD**는 기존의 래스터 기반 접근 방식은 물론, 벡터 기반의 **DeepCAD-vector** 모델보다 우수한 성능을 보였습니다. 특히 4가지 뷰(등각 투영 + 정사영)를 사용한 입력의 경우, **ACCcmd 82.43%**, **ACCparam 76.09%**를 달성했으며, 유효하지 않은 모델 생성 비율인 **IR(Invalidity Ratio)은 20.31%**로 낮고, **MCD(Mean Chamfer Distance)는 10.88**로 우수한 기하학적 일치도를 보였습니다. 이는 벡터 드로잉이 래스터 기반 입력보다 더 적합한 정보원을 제공함을 입증합니다.

## AI 실무자를 위한 시사점
본 연구는 2D 벡터 드로잉을 통한 **자동화된 CAD 모델링**의 새로운 가능성을 열었습니다. 특히 **정밀한 기하학적 정보 보존**이 중요한 엔지니어링 설계 분야에서 **벡터 그래픽스**를 입력으로 활용하는 **시퀀스-투-시퀀스 학습**의 잠재력을 보여줍니다. 또한, **CAD-VGDrawing 데이터셋**은 향후 관련 연구 발전을 위한 중요한 자원이 될 것이며, **이중 디코더** 및 **소프트 타겟 분포 손실 함수**와 같은 기술적 기법은 유사한 정밀 예측 문제에 적용될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.