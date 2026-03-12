---
title: "[논문리뷰] EmboAlign: Aligning Video Generation with Compositional Constraints for Zero-Shot Manipulation"
excerpt: "arXiv에 게시된 'EmboAlign: Aligning Video Generation with Compositional Constraints for Zero-Shot Manipulation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Zero-Shot Manipulation
  - Video Generation Models
  - Vision-Language Models
  - Compositional Constraints
  - Robotics
  - Trajectory Optimization
  - Real-Robot Control

permalink: /ai/review/2026-03-12-EmboAlign-Aligning-Video-Generation-with-Compositional-Constraints-for-Zero-Shot-Manipulation/

toc: true
toc_sticky: true

date: 2026-03-12 00:00:00+0900+0900
last_modified_at: 2026-03-12 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2603.05757)

**저자:** Gehao Zhang, Zhenyang Ni, Payal Mohapatra, Han Liu, Ruohan Zhang, Qi Zhu



## 핵심 연구 목표
본 논문은 **비디오 생성 모델(VGM)** 이 생성하는 물리적으로 비현실적인 동작(physical hallucinations)과 **픽셀-로봇 동작 변환(geometric retargeting)** 에서 발생하는 누적 오류로 인해 **zero-shot 로봇 조작** 의 성공률이 낮은 문제를 해결하는 것을 목표로 합니다. VGM의 풍부한 동작 사전(motion priors)과 **비전-언어 모델(VLM)** 의 구조화된 공간 추론 능력을 결합하여 정확하고 제약 조건을 준수하는 로봇 동작을 생성하고자 합니다.

## 핵심 방법론
**EmboAlign** 프레임워크는 VLM을 사용하여 언어 명령으로부터 **작업별 구성 제약 조건(compositional constraints)** 을 자동으로 추출합니다. 이 제약 조건은 두 단계에서 적용됩니다. 첫째, **제약 조건 기반 비디오 선택(constraint-guided video selection)** 단계에서는 VGM이 생성한 여러 후보 비디오 중 **V-JEPA-2** 를 통한 시각적 개연성과 **3D 키포인트 기반 제약 조건 준수(costc(K))** 를 평가하여 가장 물리적으로 타당한 롤아웃을 선택합니다. 둘째, 선택된 롤아웃을 초기화로 사용하여 **AnyGrasp** 기반 **경로 최적화(trajectory optimization)** 를 수행하여, 동일한 제약 조건 하에서 **SLSQP** 를 통해 리타게팅 오류를 수정하고 최종 로봇 궤적을 생성합니다.

## 주요 결과
**EmboAlign** 은 6가지 실제 로봇 조작 작업에서 **평균 68.3%의 성공률** 을 달성했습니다. 이는 가장 강력한 베이스라인인 **NovaFlow(25.0%)** 및 **ReKep(21.7%)** 대비 **43.3% 포인트** 향상된 결과입니다. 특히 **Press the Stapler** 작업에서는 NovaFlow 대비 80%, ReKep 대비 60% 성공률이 개선되었으며, **Place the Block Securely** 작업에서는 NovaFlow 대비 40%, ReKep 대비 70% 향상되었습니다.

## AI 실무자를 위한 시사점
이 연구는 **비디오 생성 모델의 동적 능력** 과 **비전-언어 모델의 상식적 추론 능력** 을 효과적으로 결합하여 **zero-shot 로봇 조작** 의 새로운 가능성을 제시합니다. 두 단계의 제약 조건 정렬(비디오 선택 및 궤적 최적화)은 **정밀하고 접촉 민감한 작업** 에서 특히 중요하며, 이는 실제 로봇 시스템 개발 시 유용한 접근 방식이 될 수 있습니다. 다만, **VGM의 생성 품질, VLM의 키포인트 참조 오류, 깊이 추정 부정확성** 등은 여전히 해결해야 할 과제로 남아있어, 시스템의 전반적인 견고성을 향상시키기 위한 추가 연구가 필요합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.