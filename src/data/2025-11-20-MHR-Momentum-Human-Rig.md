---
title: "[논문리뷰] MHR: Momentum Human Rig"
excerpt: "Chris Twigg이 [arXiv]에 게시한 'MHR: Momentum Human Rig' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Parametric Body Model
  - Human Animation
  - Character Rigging
  - Pose Correctives
  - Skeletal Decoupling
  - Computer Graphics
  - AR/VR

permalink: /ai/review/2025-11-20-MHR-Momentum-Human-Rig/

toc: true
toc_sticky: true

date: 2025-11-20 00:00:00+0900+0900
last_modified_at: 2025-11-20 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.15586)

**저자:** Chris Twigg, Carsten Stoll, Berta Bescos, Ahmed A. A. Osman, Aaron Ferguson



## 핵심 연구 목표
본 논문은 ATLAS 모델의 **골격/형상 분리 패러다임**에 Momentum 라이브러리에서 영감을 받은 유연하고 현대적인 리그 및 자세 보정 시스템을 결합하여, 산업 및 AR/VR 파이프라인에 통합 가능한 **표현력 있고 해부학적으로 타당한 파라메트릭 인체 모델(MHR)**을 제안합니다. 기존 모델의 골격-형상 얽힘 및 자세 보정 시스템의 한계를 극복하고자 합니다.

## 핵심 방법론
MHR은 **ATLAS의 골격-메쉬 분리** 원칙을 기반으로 하며, **Momentum Meta 라이브러리**를 활용하여 각 관절에 대한 독립적인 변환(translation, rotation, scale)을 제공합니다. 특히, **선형 블렌드 스키닝(LBS)** 이전에 적용되는 **희소한 비선형 자세 보정 변형(sparse, non-linear pose corrective deformations)**을 26000개의 스캔 데이터로 학습시켜 **candy wrapper 효과**를 줄입니다. 또한, 아티스트가 조각한 **72개의 시맨틱 표정 블렌드셰이프**를 포함하며, 신체, 머리, 손으로 분할된 **신원 공간**을 정의합니다.

## 주요 결과
3DBodyTex 데이터셋을 사용한 정량적 평가에서 MHR은 16개의 추가 구성 요소를 사용했을 때 약 **4.3mm**의 vertex-to-vertex 오차를 달성하여 SMPL(약 4.5mm) 및 SMPL-X(약 4.4mm) 모델보다 **낮은 피팅 오차**를 보였습니다. 이는 더 적은 수의 컴포넌트로도 미공개 신원(identity)에 대한 신체 형상 표현 능력이 뛰어남을 의미합니다. MHR은 팔꿈치와 무릎과 같은 **관절 부위의 변형에서 특히 우수한 성능**을 보여줍니다.

## AI 실무자를 위한 시사점
MHR은 **분리된 골격과 형상 제어** 및 **비선형 자세 보정**을 통해 AI/ML 엔지니어와 캐릭터 아티스트에게 높은 유연성과 정밀한 제어력을 제공합니다. 특히 **AR/VR 및 그래픽스 파이프라인**에 대한 견고한 통합을 목표로 설계되어, 디지털 휴먼 생성 및 애니메이션 프로젝트에 실용적으로 활용될 수 있습니다. 또한, **개방형 라이선스**로 제공되어 다양한 실험 및 응용 개발에 기여할 것으로 기대됩니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.