---
title: "[논문리뷰] Less is More: Recursive Reasoning with Tiny Networks"
excerpt: "arXiv에 게시된 'Less is More: Recursive Reasoning with Tiny Networks' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Recursive Reasoning
  - Tiny Networks
  - Deep Supervision
  - Hierarchical Reasoning Model (HRM)
  - Sudoku-Extreme
  - ARC-AGI
  - Generalization
  - Parameter Efficiency

permalink: /ai/review/2025-10-8-Less-is-More-Recursive-Reasoning-with-Tiny-Networks/

toc: true
toc_sticky: true

date: 2025-10-08 13:48:12+0900
last_modified_at: 2025-10-08 13:48:12+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2510.04871)

**저자:** Alexia Jolicoeur-Martineau



## 핵심 연구 목표
이 논문은 기존의 **Hierarchical Reasoning Model (HRM)** 이 복잡하고 비효율적이라는 문제점을 해결하기 위해, 더욱 단순하면서도 효율적인 **Tiny Recursive Model (TRM)** 을 제안합니다. 특히, 적은 파라미터와 제한된 데이터로도 **Sudoku-Extreme** , **Maze-Hard** , **ARC-AGI** 와 같은 어려운 추론 문제에서 대규모 언어 모델(LLMs)보다 뛰어난 일반화 성능을 달성하는 것을 목표로 합니다.

## 핵심 방법론
**TRM** 은 단일의 **작은 네트워크(2개 레이어, 7M 파라미터)** 를 사용하여 예측된 답변(y)을 재귀적으로 개선합니다. 이는 **입력 질문(x)** , **현재 답변(y)** , **잠재 표현(z)** 을 바탕으로 **n번의 잠재 표현(z) 업데이트** 와 **1번의 답변(y) 업데이트** 를 반복하며 진행됩니다. 기존 HRM의 복잡한 **계층적 추론** , **암묵적 함수 정리(IFT)** , **1-단계 기울기 근사** 및 **두 개의 네트워크** 를 모두 제거하고, **전체 재귀 과정에 대한 역전파** 와 **단일 포워드 패스 ACT** 를 통해 단순성과 효율성을 극대화했습니다. 또한, 과적합 방지 및 안정성 향상을 위해 **Exponential Moving Average (EMA)** 를 사용합니다.

## 주요 결과
**TRM** 은 **Sudoku-Extreme** 에서 **87.4%** 의 테스트 정확도(HRM의 55% 대비), **Maze-Hard** 에서 **85.3%** (HRM의 74.5% 대비), **ARC-AGI-1** 에서 **45%** (HRM의 40.3% 대비), **ARC-AGI-2** 에서 **8%** (HRM의 5% 대비)를 달성했습니다. 이는 **HRM보다 4배 적은 파라미터(7M vs 27M)** 를 사용하고, 심지어 **Deepseek R1 (671B)** 과 같은 LLM의 **0.01% 미만 파라미터** 로 더 높은 성능을 기록했습니다. 특히 **MLP 기반 TRM** 은 Sudoku-Extreme에서 가장 좋은 성능을 보였습니다.

## AI 실무자를 위한 시사점
**TRM** 은 복잡한 추론 문제 해결에 반드시 대규모 모델이나 복잡한 아키텍처가 필요한 것은 아님을 보여줍니다. **소규모 네트워크와 재귀적 개선 메커니즘** 을 활용하여 **높은 파라미터 효율성** 과 **뛰어난 일반화 성능** 을 동시에 달성할 수 있음을 입증했습니다. 이는 제한된 컴퓨팅 자원을 가진 환경에서 **하드웨어 제약적인 AI 애플리케이션 개발** 에 큰 영감을 줄 수 있으며, **데이터가 부족한 도메인** 에서 과적합을 방지하고 안정적인 성능을 확보하는 데 효과적인 전략을 제시합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.