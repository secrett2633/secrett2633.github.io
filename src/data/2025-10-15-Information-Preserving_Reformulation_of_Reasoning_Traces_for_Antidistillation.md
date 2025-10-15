---
title: "[논문리뷰] Information-Preserving Reformulation of Reasoning Traces for
  Antidistillation"
excerpt: "이 [arXiv]에 게시한 'Information-Preserving Reformulation of Reasoning Traces for
  Antidistillation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Antidistillation
  - Reasoning Traces
  - Large Language Models
  - Knowledge Distillation
  - Information Preservation
  - Trace Reformulation
  - Supervised Fine-Tuning

permalink: /ai/review/2025-10-15-Information-Preserving_Reformulation_of_Reasoning_Traces_for_Antidistillation/

toc: true
toc_sticky: true

date: 2025-10-15 13:01:40+0900
last_modified_at: 2025-10-15 13:01:40+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.11545)

**저자:** Jiayu Ding, Lei Cui, Li Dong, Nanning Zheng, Furu Wei



## 핵심 연구 목표
대규모 언어 모델(LLMs)의 추론 흔적(reasoning traces)이 복잡한 작업에서 성능을 향상시키지만, 무단 지식 증류(distillation)에 취약하다는 문제를 해결하고자 합니다. 기존의 증류 방어 전략들이 중요한 중간 정보를 희생하는 한계를 극복하고, 정보 보존형으로 추론 흔적을 재구성하여 증류를 방해하는 동시에 인간의 이해도를 유지하는 **PART(information-Preserving Antidistillation Reformulation of reasoning Traces)**를 제안하는 것이 목표입니다.

## 핵심 방법론
**PART**는 인간의 추론 이해 방식과 LLM의 SFT(Supervised Fine-Tuning) 학습 방식 간의 차이를 활용하여 두 단계의 재구성 방법을 도입합니다. 첫째, 토큰 수준에서 LLM 학습에 불균형적인 영향을 미치는 **"Hmm," "Wait"과 같은 self-talk 행동 토큰**을 제거합니다. 둘째, 구조적 수준에서 **하위 결론(sub-conclusions)을 해당 추론 과정 앞에 재배치**하여 LLM 증류에 중요한 순차적 체인-오브-사고(chain-of-thought) 구조를 교란합니다. 이 재구성 작업은 **GPT-4o**가 생성한 데이터를 사용하여 훈련된 **작은 보조 모델(Qwen2.5-1.5B-Instruct)**이 수행하여 최소한의 오버헤드를 발생시킵니다.

## 주요 결과
**PART**는 다양한 크기와 유형의 학생 모델에서 증류를 일관되게 방해하는 효과를 보였습니다. 예를 들어, **32B 학생 모델**의 **AIME 2024** 성능은 **54.17%에서 46.88%로 13.5% 감소**했습니다. 정보 보존 측면에서는, 재구성된 흔적이 원본과 **91%의 어휘적 일치율(0.7 임계값)**과 **0.950의 평균 코사인 유사도**를 보였으며, 사용자 연구에서도 정보 손실이 적다고 평가되어 요약 기반 방법보다 명확히 선호되었습니다. 또한, 재구성된 흔적은 **self-talk 키워드 빈도 감소(2.9%에서 0.4%)**를 통해 높은 **F1 점수 0.93**로 탐지 가능합니다.

## AI 실무자를 위한 시사점
**PART**는 LLM 제공자가 모델의 지적 재산을 보호하면서도, 사용자에게 유용하고 해석 가능한 추론 과정을 제공할 수 있는 **실용적이고 효과적인 방법론**을 제시합니다. **작고 효율적인 보조 모델**을 사용하여 추론 흔적을 재구성하므로, 배포 및 운영 시 추가적인 파라미터(<1%) 및 연산 오버헤드(~4%)가 매우 낮아 **최소한의 비용**으로 적용 가능합니다. 이는 상업적 LLM 서비스에서 무단 지식 증류 시도를 효과적으로 방해하여 **모델 보호 전략**을 강화할 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.