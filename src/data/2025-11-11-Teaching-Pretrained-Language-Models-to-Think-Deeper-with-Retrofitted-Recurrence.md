---
title: "[논문리뷰] Teaching Pretrained Language Models to Think Deeper with Retrofitted   Recurrence"
excerpt: "arXiv에 게시된 'Teaching Pretrained Language Models to Think Deeper with Retrofitted   Recurrence' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Recurrent Language Models
  - Pretrained Models
  - Model Surgery
  - Curriculum Learning
  - Test-Time Compute Scaling
  - Mathematics Reasoning
  - Efficient Training
  - Depth Recurrence

permalink: /ai/review/2025-11-11-Teaching-Pretrained-Language-Models-to-Think-Deeper-with-Retrofitted-Recurrence/

toc: true
toc_sticky: true

date: 2025-11-11 00:00:00+0900+0900
last_modified_at: 2025-11-11 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2511.07384)

**저자:** Sean McLeish, Ang Li, John Kirchenbauer, Dayal Singh Kalra, Brian R. Bartoldson, Bhavya Kailkhura, Avi Schwarzschild, Jonas Geiping, Tom Goldstein, Micah Goldblum



## 핵심 연구 목표
본 연구는 기존의 **사전 훈련된 비반복(non-recurrent) 언어 모델** 을 효율적으로 **깊이-반복(depth-recurrent) 모델** 로 변환하여, 훈련 및 추론 시 연산 비용을 최적화하면서 수학과 같은 추론 태스크에서 성능을 향상시키는 것을 목표로 합니다. 특히, 테스트 시 추가 연산을 통해 모델의 추론 능력을 심화하는 방안을 모색합니다.

## 핵심 방법론
논문은 **모델 수술(Model Surgery)** 을 통해 사전 훈련된 모델에서 특정 계층(예: **prelude, recurrent block, coda** )을 선택하여 반복 구조를 만듭니다. 훈련 과정에서는 **재귀 깊이 커리큘럼(curriculum over recurrent depths)** 을 적용하여 점진적으로 평균 반복 횟수를 늘려 연산 효율성을 높이고 성능 저하를 방지합니다. 또한, **Muon 옵티마이저** 를 사용하여 **AdamW** 대비 안정적인 훈련과 낮은 손실을 달성하고, 초기 **"치유(healing)" 기간** 을 포함하는 2단계 데이터 커리큘럼을 통해 계층 제거로 인한 언어 모델링 성능 저하를 방지한 후 수학 태스크 데이터로 미세 조정합니다.

## 주요 결과
사전 훈련된 가중치로 초기화된 모델은 무작위 초기화 모델 대비 **훈련 손실을 크게 줄이고** **Hellaswag 벤치마크 정확도를 더 빠르게 달성** 했습니다. **Llama-3.2-1B** 기반 모델의 경우, 커리큘럼 훈련을 통해 **GSM8K** 에서 비반복 모델 대비 **최대 2배 이상 높은 정확도(예: 32회 반복 시 52.0% vs 비반복 26.6%)** 를 기록하며, **MATH** 에서도 유의미한 성능 향상(예: 32회 반복 시 **14.5%** vs 비반복 2.3%)을 보여주었습니다. 이는 주어진 연산 예산 내에서 반복 모델이 더 나은 추론 성능을 제공함을 시사합니다.

## AI 실무자를 위한 시사점
본 연구는 기존의 대규모 언어 모델을 재활용하여 비용 효율적으로 깊은 추론 능력을 부여할 수 있는 실용적인 방법을 제시합니다. 특히, **커리큘럼 학습** 과 **데이터 전처리(healing period)** 전략은 모델 수술 후 성능 저하를 최소화하면서 특정 추론 태스크에 최적화된 모델을 개발하는 데 중요한 가이드라인을 제공합니다. 이는 한정된 자원으로 모델의 복잡한 추론 능력을 확장하려는 AI 엔지니어들에게 유용하며, **메모리 및 컨텍스트 크기 증가 없이 테스트 시 연산량을 늘려 성능을 향상** 시키는 새로운 패러다임을 제안합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.