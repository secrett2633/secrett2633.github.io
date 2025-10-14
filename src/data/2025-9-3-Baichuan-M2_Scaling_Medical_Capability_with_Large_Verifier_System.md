---
title: "[논문리뷰] Baichuan-M2: Scaling Medical Capability with Large Verifier System"
excerpt: "Jayok6이 [arXiv]에 게시한 'Baichuan-M2: Scaling Medical Capability with Large Verifier System' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Medical AI
  - LLM
  - Reinforcement Learning
  - Verifier System
  - Patient Simulator
  - Clinical Rubrics
  - Baichuan-M2
  - HealthBench

permalink: /ai/review/2025-9-3-Baichuan-M2_Scaling_Medical_Capability_with_Large_Verifier_System/

toc: true
toc_sticky: true

date: 2025-09-03 13:36:21+0900
last_modified_at: 2025-09-03 13:36:21+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.02208)

**저자:** Jayok6, yuanshuai, sdujq, anselcmy, fairyang



## 핵심 연구 목표
의료 분야 **LLM**이 **USMLE** 같은 정적 벤치마크에서는 우수하지만 실제 임상 환경의 동적, 상호작용적 특성을 포착하지 못해 발생하는 성능 격차를 해소하는 것이 목표입니다. 이를 위해, 실제 임상 적용과 **LLM**의 역량을 정렬할 수 있는 동적 검증 프레임워크와 이를 기반으로 훈련된 **Baichuan-M2** 모델을 개발하는 것을 목표로 합니다.

## 핵심 방법론
논문은 `Patient Simulator`와 `Clinical Rubrics Generator`로 구성된 **동적 검증 프레임워크**를 도입합니다. **Patient Simulator**는 비식별화된 의료 기록을 활용하여 현실적인 임상 환경을 생성하며, **Clinical Rubrics Generator**는 동적으로 다차원 평가 지표를 생성합니다. 훈련은 개선된 `Group Relative Policy Optimization (GRPO)` 알고리즘을 사용한 **다단계 강화 학습** 전략을 통해 이루어졌으며, **의료 도메인 적응을 위한 중간 훈련**, **리젝션 샘플링을 포함한 지도 미세 조정(SFT)**, 그리고 **다중 턴 강화 학습**을 포함합니다.

## 주요 결과
**Baichuan-M2**는 **32B** 파라미터를 가졌음에도 불구하고, 도전적인 **HealthBench** 벤치마크에서 모든 오픈소스 모델 및 대부분의 첨단 클로즈드소스 모델을 능가했습니다. 특히 **HealthBench Hard** 테스트에서는 **32**점 이상의 점수를 달성하여 이전에 **GPT-5**만이 기록했던 성능 수준에 도달했습니다. 또한, **Baichuan-M2**는 **HealthBench** 전체 점수 **60.1**, **Hard** 점수 **34.7**, **Consensus** 점수 **91.5**를 기록하며 다른 모델 대비 뛰어난 **비용-효율성**을 보였습니다.

## AI 실무자를 위한 시사점
**동적 검증 시스템**이 **LLM**의 임상 역량 강화를 위해 필수적임을 입증하며, 정적 벤치마크의 한계를 넘어선 실제 의료 **AI** 적용 가능성을 제시합니다. **32B** 파라미터로 높은 성능을 달성하여 **의료 AI** 배포의 새로운 **파레토 프론티어**를 제시, 자원 제약이 있는 환경에서의 고급 **의료 AI** 도입을 더욱 실현 가능하게 합니다. **양자화** 및 **추론 최적화** 기법을 통해 소비자 등급 하드웨어에서도 실용적인 배포가 가능함을 보여줍니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.