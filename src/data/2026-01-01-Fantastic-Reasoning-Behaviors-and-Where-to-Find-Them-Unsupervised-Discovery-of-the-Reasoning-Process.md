---
title: "[논문리뷰] Fantastic Reasoning Behaviors and Where to Find Them: Unsupervised Discovery of the Reasoning Process"
excerpt: "이 [arXiv]에 게시한 'Fantastic Reasoning Behaviors and Where to Find Them: Unsupervised Discovery of the Reasoning Process' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - LLM Reasoning
  - Mechanistic Interpretability
  - Sparse Autoencoders (SAEs)
  - Activation Steering
  - Unsupervised Learning
  - Reasoning Behaviors
  - Chain-of-Thought
  - Feature Disentanglement

permalink: /ai/review/2026-01-01-Fantastic-Reasoning-Behaviors-and-Where-to-Find-Them-Unsupervised-Discovery-of-the-Reasoning-Process/

toc: true
toc_sticky: true

date: 2026-01-01 00:00:00+0900+0900
last_modified_at: 2026-01-01 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2512.23988)

**저자:** Zhenyu Zhang, Shujian Zhang, John Lambert, Wenxuan Zhou, Zhangyang Wang, Mingqing Chen, Andrew Hard, Rajiv Mathews, Lun Wang



## 핵심 연구 목표
대규모 언어 모델(LLM)의 복잡한 추론 과정 중 내부 메커니즘을 심층적으로 이해하고 조작하는 것을 목표로 합니다. 특히, 사람의 개입 없이 **추론 행동을 표현하는 벡터** 를 **비지도 방식으로 발견** 하여 기존의 제한적인 인간 정의 개념(예: 과도한 생각, 회고)을 넘어선 추론 행동을 식별하고 제어하고자 합니다.

## 핵심 방법론
이 연구는 **RISE (Reasoning behavior Interpretability via Sparse auto-Encoder)** 프레임워크를 제안합니다. 이는 Chain-of-Thought(CoT) 추적을 문장 단위 '단계'로 분할하고, 각 단계의 활성화에 대해 **Sparse Autoencoder(SAE)** 를 훈련하여 해체된(disentangled) 잠재 특징, 즉 **추론 벡터** 를 발견합니다. 이 벡터들은 시각화 및 클러스터링 분석을 통해 해석 가능한 행동(예: 회고, 되돌아가기)과 연결되며, 추론 시 이 벡터들을 주입하여 특정 행동을 **제어(amplifying or suppressing)** 할 수 있습니다.

## 주요 결과
SAE는 **회고(reflection)** 및 **되돌아가기(backtracking)** 와 같은 해석 가능한 추론 행동에 해당하는 벡터들을 성공적으로 발견했으며, 이는 디코더 컬럼 공간에서 분리 가능한 영역을 차지합니다. 또한, **SAE 벡터를 통한 제어된 개입** 은 AIME25 태스크에서 **회고 단계 수를 90.53에서 33.77로, 되돌아가기 단계 수를 35.50에서 5.93으로 감소** 시키는 등 추론 궤적을 예측 가능하게 변경했습니다. 더 나아가, **'자신감(confidence)'** 과 같은 새로운 행동을 발견하고 이를 제어하여 추론 정확도를 **최대 4.66% 향상** 시키고 **토큰 사용량을 13.69% 절감** 하는 결과를 보였습니다.

## AI 실무자를 위한 시사점
이 연구는 LLM의 복잡한 추론 과정을 이해하고 최적화하기 위한 **확장 가능하고 비지도적인 방법** 을 제시합니다. SAE를 통해 발견된 추론 벡터는 추가 훈련 없이 **실시간으로 LLM의 추론 스타일을 정교하게 조정** 할 수 있는 가능성을 열어줍니다. 이는 LLM의 효율성(토큰 사용량 감소)과 신뢰성을 향상시키며, 특정 목표에 맞춰 LLM의 행동을 동적으로 제어해야 하는 AI 애플리케이션 개발에 중요한 도구가 될 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.