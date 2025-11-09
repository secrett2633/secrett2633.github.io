---
title: "[논문리뷰] Defeating the Training-Inference Mismatch via FP16"
excerpt: "이 [arXiv]에 게시한 'Defeating the Training-Inference Mismatch via FP16' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - LLM Fine-tuning
  - Training-Inference Mismatch
  - Floating Point Precision
  - FP16
  - BF16
  - RL Stability

permalink: /ai/review/2025-11-3-Defeating_the_Training-Inference_Mismatch_via_FP16/

toc: true
toc_sticky: true

date: 2025-11-09 19:01:31+0900
last_modified_at: 2025-11-09 19:01:31+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.26788)

**저자:** Penghui Qi, Zichen Liu, Xiangxin Zhou, Tianyu Pang, Chao Du, Wee Sun Lee, Min Lin



## 핵심 연구 목표
대규모 언어 모델(LLM)의 강화 학습(RL) 미세 조정 과정에서 발생하는 불안정성의 근본 원인인 **훈련-추론 불일치(training-inference mismatch)**를 해결하는 것이 목표입니다. 특히 널리 사용되는 **BF16** 정밀도가 낮은 수치 정밀도로 인해 발생하는 큰 반올림 오류가 이 불일치를 심화시킨다고 보고, 이를 극복할 간단하고 효과적인 해결책을 제시하고자 합니다.

## 핵심 방법론
이전의 복잡한 알고리즘적 수정(예: **토큰-레벨 TIS, 시퀀스-레벨 MIS**)이나 엔지니어링 정렬 대신, **부동 소수점 정밀도** 자체에 집중합니다. 훈련과 추론 모두에서 **BF16** 대신 **FP16** 정밀도를 사용하도록 전환하는 것을 핵심 방법론으로 제안합니다. **FP16**은 더 많은 **가수부(mantissa) 비트**를 제공하여 수치 정밀도를 높이고 반올림 오류 누적을 방지하며, **손실 스케일링(loss scaling)**을 통해 제한적인 동적 범위를 보완합니다.

## 주요 결과
**FP16**을 사용하면 **훈련-추론 불일치가 24배** 가량 감소하며, 이는 BF16이 기하급수적으로 더 큰 불일치를 보이는 것과 대조적입니다. 이 단순한 변화를 통해 다양한 RL 알고리즘 및 설정에서 **더욱 안정적인 최적화, 빠른 수렴, 우수한 최종 성능**을 달성했습니다. 특히, **FP16 기반의 기본 정책 경사 알고리즘**이 **BF16 기반의 모든 기존 알고리즘 수정**보다 뛰어난 성능을 보이며, LoRA 및 MoE 모델에서도 BF16의 훈련 불안정성과 붕괴 현상을 방지했습니다.

## AI 실무자를 위한 시사점
LLM RL 미세 조정을 수행하는 AI 실무자들은 **FP16 정밀도**를 사용함으로써 기존 **BF16** 기반의 복잡한 알고리즘적 수정 없이도 **훈련 안정성과 효율성을 크게 향상**시킬 수 있습니다. 이 방식은 모델 아키텍처나 학습 알고리즘 수정이 필요 없는 간단한 적용을 통해 **훈련-추론 불일치를 근본적으로 해소**하여, 더욱 견고하고 신뢰할 수 있는 RL 파이프라인 구축에 기여할 것입니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.