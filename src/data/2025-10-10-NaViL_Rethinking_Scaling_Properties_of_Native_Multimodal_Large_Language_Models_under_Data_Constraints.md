---
title: "[논문리뷰] NaViL: Rethinking Scaling Properties of Native Multimodal Large Language
  Models under Data Constraints"
excerpt: "이 [arXiv]에 게시한 'NaViL: Rethinking Scaling Properties of Native Multimodal Large Language
  Models under Data Constraints' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Multimodal Large Language Models
  - Native MLLMs
  - Scaling Laws
  - Data Constraints
  - Visual Encoder
  - LLM Initialization
  - Mixture-of-Experts
  - End-to-end Training

permalink: /ai/review/2025-10-10-NaViL_Rethinking_Scaling_Properties_of_Native_Multimodal_Large_Language_Models_under_Data_Constraints/

toc: true
toc_sticky: true

date: 2025-10-10 13:53:45+0900
last_modified_at: 2025-10-10 13:53:45+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.08565)

**저자:** Changyao Tian, Hao Li, Gen Luo, Xizhou Zhu, Weijie Su, Hanming Deng, Jinguo Zhu, Jie Shao, Ziran Zhu, Yunpeng Liu, Lewei Lu, Wenhai Wang, Hongsheng Li, Jifeng Dai



## 핵심 연구 목표
본 논문은 기존 Compositional MLLMs의 분리된 훈련으로 인한 불분명한 멀티모달 스케일링 속성 문제를 해결하고자 합니다. 특히, 데이터 제약 조건 하에서 **Native MLLMs**의 설계 공간과 스케일링 속성을 체계적으로 탐구하여, 최적의 메타 아키텍처를 찾고 시각 인코더와 LLM 간의 스케일링 관계를 이해하여 경쟁력 있는 Native MLLM을 구축하는 것을 목표로 합니다.

## 핵심 방법론
연구는 **LLM 초기화**, **Mixture-of-Experts (MoEs)**, **시각 인코더 아키텍처**라는 세 가지 핵심 구성 요소에 대한 디자인 선택을 탐구합니다. 특히, **사전 훈련된 LLM (InternLM2-Base)**을 통한 초기화와 **모달리티별 MoE**의 효과를 검증했으며, 시각 인코더의 최적 깊이와 폭을 분석했습니다. 이러한 분석을 바탕으로 **NaViL** 모델을 제안하고, **시각 인코더**와 **LLM**을 독립적 및 동시적으로 스케일링하여 그 속성을 연구했습니다.

## 주요 결과
**사전 훈련된 LLM 초기화**는 훈련 수렴 속도를 **10배** 이상 가속화하며 성능을 크게 향상시켰습니다. **MoE 아키텍처**는 동일한 검증 손실을 달성하는 데 필요한 데이터 양을 **1/10**로 줄여 모델 수렴을 가속화했습니다. 시각 인코더는 깊이와 폭의 넓은 범위에서 유사한 성능을 보였으나, 최적의 시각 인코더 크기는 LLM 크기에 **로그 스케일로 비례**함을 발견했습니다. **NaViL-2B (2.4B 파라미터)**는 **14개 멀티모달 벤치마크**에서 기존 Native MLLM을 능가하는 경쟁력 있는 성능을 보였고, **NaViL-9B (9.2B 파라미터)**는 **77.0의 평균 점수**를 달성했습니다.

## AI 실무자를 위한 시사점
**Native MLLM** 개발 시 **사전 훈련된 LLM 체크포인트를 활용**하는 것이 데이터 및 연산 효율성을 극대화하는 핵심 전략입니다. **Mixture-of-Experts (MoEs)**는 이질적인 멀티모달 데이터 처리 및 모델 수렴 가속에 매우 효과적이므로, 리소스 제약이 있는 환경에서 모델 용량을 효율적으로 확장하는 데 유리합니다. 또한, 시각 인코더의 크기는 LLM 용량에 **로그 스케일로 비례하여 동시 스케일링**해야 최적의 성능을 달성할 수 있어, MLLM 아키텍처 설계 시 **균형 잡힌 리소스 할당**의 중요성을 강조합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.