---
title: "[논문리뷰] MOSEv2: A More Challenging Dataset for Video Object Segmentation in
  Complex Scenes"
excerpt: "Xudong Jiang이 [arXiv]에 게시한 'MOSEv2: A More Challenging Dataset for Video Object Segmentation in
  Complex Scenes' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Video Object Segmentation
  - Dataset
  - Complex Scenes
  - Benchmark
  - Object Tracking
  - Computer Vision
  - Dataset Challenges

permalink: /ai/review/2025-8-8-MOSEv2_A_More_Challenging_Dataset_for_Video_Object_Segmentation_in_Complex_Scenes/

toc: true
toc_sticky: true

date: 2025-08-08 13:32:22+0900
last_modified_at: 2025-08-08 13:32:22+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2508.05630)

**저자:** Henghui Ding, Kaining Ying, Chang Liu, Shuting He, Xudong Jiang



## 핵심 연구 목표
기존 VOS(Video Object Segmentation) 데이터셋들이 실제와 동떨어진 고립되고 눈에 띄는 객체에 치우쳐 있어 모델의 현실 적용성을 제한하는 문제를 해결하고자 합니다. 본 논문은 **MOSEv1**의 강점과 한계를 바탕으로, **실세계 환경에서 비디오 객체 분할의 경계를 더욱 확장**하기 위한 훨씬 더 도전적인 데이터셋인 **MOSEv2**를 제시하는 것을 목표로 합니다.

## 핵심 방법론
**MOSEv2**는 **MOSEv1**의 복잡성을 계승하고 강화하며, 추가적으로 악천후(**rain, snow, fog**), 저조도(**nighttime, underwater**), 다중 샷 시퀀스, 위장 객체, 비물리적 대상(**shadows, reflections**), 외부 지식 요구 시나리오 등 새로운 도전 과제를 포함했습니다. 데이터셋 구축에는 **SAM2** 기반의 **대화형 주석 도구**가 활용되었으며, 작은 객체에 대한 **적응형 F 점수**와 객체 출현/사라짐을 위한 **J&F↓, J&F↑**와 같은 새로운 평가 지표를 도입하여 복잡한 시나리오에서의 성능을 보다 정확하게 측정합니다.

## 주요 결과
**MOSEv2**는 **5,024개 비디오, 10,074개 객체 인스턴스, 70만 개 이상의 고품질 마스크**를 포함하며, **200개 객체 카테고리**를 지원하여 현존 VOS 데이터셋 중 가장 큰 규모입니다. 벤치마크 결과, **SAM2**의 J&F 점수는 MOSEv1의 **76.4%**에서 MOSEv2에서는 **50.9%**로 크게 하락했으며, **Cutie** 또한 **69.9%**에서 **43.9%**로 감소하는 등 기존 SOTA 모델들이 MOSEv2에서 일관된 성능 하락을 보였습니다. 특히 재출현 시나리오(**J&F↑**)에서 모든 모델의 성능이 **7.8%~34.9%**로 매우 낮게 나타났습니다.

## AI 실무자를 위한 시사점
**MOSEv2**는 현재 VOS 모델이 실제와 복잡한 환경에서 직면하는 한계를 명확히 보여주며, 특히 **잦은 객체 출현/사라짐, 중첩된 폐색, 밀집된 장면, 작은 객체, 악천후, 다중 샷, 지식 의존 시나리오** 등에서 모델의 견고성과 일반화 능력을 크게 개선해야 함을 시사합니다. 이 데이터셋은 VOS뿐만 아니라 **비디오 객체 추적(VOT)** 등 광범위한 비디오 이해 연구 발전에 기여하며, **foundation model**을 활용한 **상황 인식 및 추론 능력 통합**이 미래 연구의 핵심 방향이 될 것임을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.