---
title: "[논문리뷰] Bootstrapping Task Spaces for Self-Improvement"
excerpt: "Yoram Bachrach이 [arXiv]에 게시한 'Bootstrapping Task Spaces for Self-Improvement' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning (RL)
  - Large Language Models (LLMs)
  - Self-Improvement
  - Autocurriculum
  - Task-Space Exploration
  - Inference-Time Iteration
  - Policy Optimization

permalink: /ai/review/2025-9-8-Bootstrapping-Task-Spaces-for-Self-Improvement/

toc: true
toc_sticky: true

date: 2025-09-08 13:10:18+0900
last_modified_at: 2025-09-08 13:10:18+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2509.04575)

**저자:** Minqi Jiang, Andrei Lupu, Yoram Bachrach



## 핵심 연구 목표
본 논문은 대규모 언어 모델(LLM)이 추론 시 여러 단계에 걸쳐 스스로 개선하는 능력을 학습하는 방법을 연구합니다. 기존의 자기 개선 훈련 방식이 가진 고정된 반복 깊이, 높은 비용, 출력 다양성 감소 등의 한계를 극복하고, 동적으로 확장되는 태스크 공간을 활용하여 더욱 효과적인 자기 개선 능력을 부여하는 것을 목표로 합니다.

## 핵심 방법론
이 연구는 **Exploratory Iteration (EXIT)**이라는 자동 커리큘럼 RL 방법론을 제안합니다. **EXIT**는 자기 개선 태스크의 반복적인 구조를 활용하여, 학습 과정에서 마주치는 가장 유익한 중간 또는 부분 기록들을 새로운 자기 반복 태스크 인스턴스로 선정하여 태스크 공간을 확장합니다. 훈련은 **Group-Relative Policy Optimization (GRPO)**을 사용하여 **단일 단계 자기 개선**에만 초점을 맞춥니다. 또한, **다양성 촉진 메커니즘**으로 **Pdiv 확률에 기반한 자기 발산 단계**와 **임베딩 기반 다양성 보너스**를 통합하여 태스크 다양성을 높였습니다.

## 주요 결과
**EXIT 전략**은 **경쟁 수학**, **다중 턴 도구 사용**, **머신러닝 엔지니어링** 등 다양한 도메인에서 LLM의 추론 시 자기 개선 능력을 일관되게 향상시켰습니다. 특히, 학습 시 경험한 평균 반복 깊이를 넘어선 **16단계의 자기 개선**에서도 높은 성능 향상을 보였습니다. 수학 도메인에서는 **20.4%의 평균 정확도**를 달성하여 기본 모델 대비 **+2.0%** 향상을 보였으며, 다중 턴 도구 사용에서는 **76.4%**의 초기 응답 정확도와 **+1.2%** 향상을 기록했습니다.

## AI 실무자를 위한 시사점
**EXIT 방법론**은 LLM이 추론 시 복잡한 문제를 해결하고 스스로 개선하는 **장기적인 능력**을 효과적으로 학습할 수 있는 실용적인 프레임워크를 제공합니다. 이는 특히 **검색 스캐폴드** 내에서 LLM을 활용하는 애플리케이션에서 모델의 성능을 향상시키는 데 직접적으로 기여할 수 있습니다. **EXIT**는 동적인 태스크 공간을 생성하고 다양성을 촉진함으로써, **RL 미세 조정의 효율성**을 높이고 복잡한 문제에 대한 LLM의 **견고한 학습**을 유도할 수 있음을 시사합니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.