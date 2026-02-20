---
title: "[논문리뷰] Planning with Sketch-Guided Verification for Physics-Aware Video Generation"
excerpt: "Shayegan Omidshafiei이 arXiv에 게시한 'Planning with Sketch-Guided Verification for Physics-Aware Video Generation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Generation
  - Motion Planning
  - Physics-Aware AI
  - Multimodal Verification
  - Diffusion Models
  - Test-Time Optimization
  - Sketch-Guided

permalink: /ai/review/2025-11-24-Planning-with-Sketch-Guided-Verification-for-Physics-Aware-Video-Generation/

toc: true
toc_sticky: true

date: 2025-11-24 00:00:00+0900+0900
last_modified_at: 2025-11-24 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.17450)

**저자:** Yidong Huang, Zun Wang, Han Lin, Dong-Ki Kim, Shayegan Omidshafiei, Jaehong Yoon, Yue Zhang, Mohit Bansal



## 핵심 연구 목표
이 논문은 비디오 생성 모델이 복잡한 동작 명령을 따르고 물리적으로 사실적이며 시간적으로 일관된 시퀀스를 생성하는 데 어려움을 겪는 문제를 해결하는 것을 목표로 합니다. 기존의 단일 샷(single-shot) 계획 또는 반복적인 전체 비디오 생성 방식의 비효율성과 부정확성을 극복하여, **물리적으로 그럴듯하고 명령에 충실한 동적 궤적** 을 효율적으로 생성하고자 합니다.

## 핵심 방법론
본 논문은 **SketchVerify** 라는 학습-비용 없는 (training-free) 스케치-검증 기반 계획 프레임워크를 제안합니다. 이 프레임워크는 텍스트 프롬프트와 초기 이미지를 기반으로 **MLLM (GPT-4.1)** 을 사용하여 여러 후보 동작 계획을 샘플링하고, 각 궤적을 경량 **비디오 스케치** 로 렌더링합니다. 렌더링된 스케치는 **멀티모달 검증기 (Gemini 2.5-Flash)** 를 통해 의미론적 정렬 및 물리적 타당성(예: **뉴턴 역학 일관성, 침투 위반, 중력 일관성, 변형 일관성** )을 공동으로 평가하여 최적의 계획을 선택합니다. 최종 검증된 계획은 **궤적 조건부 확산 모델 (ATI-14B)** 에 전달되어 최종 비디오를 합성합니다.

## 주요 결과
**WorldModelBench** 에서 기존 모델 대비 **명령 수행(2.08점)** , 물리 법칙 일관성, 상식적 일관성 측면에서 가장 강력한 성능을 달성했습니다. 특히, **PhyT2V의 61.86분** 에 비해 계획 시간을 **4.7분** 으로 **93%** 단축하며 효율성을 입증했습니다. **PhyWorldBench** 에서도 최고 종합 점수 **19.84점** 및 물리 표준 점수 **23.52점** 을 기록하며, **Wan-2.1** 대비 객체-이벤트 정확도를 **22%** , 물리 정확도를 **18%** 향상했습니다. 스케치 기반 검증은 전체 비디오 검증과 유사한 품질을 유지하면서 **거의 10배** 의 효율성 향상을 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 비디오 생성에서 **계획과 합성 단계를 분리** 함으로써 **계산 비용을 획기적으로 절감** 하면서도 **물리적 현실성과 시간적 일관성** 을 크게 향상시킬 수 있음을 보여줍니다. 특히, **경량 비디오 스케치와 멀티모달 검증기** 의 활용은 AI/ML 엔지니어가 물리적으로 정확하고 제어 가능한 비디오 콘텐츠를 효율적으로 생성하는 데 중요한 통찰력을 제공합니다. 이는 로봇 조작, 자율 주행 시뮬레이션 등 정확한 물리적 동작이 필요한 분야에서 잠재적인 응용 가능성을 가집니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.