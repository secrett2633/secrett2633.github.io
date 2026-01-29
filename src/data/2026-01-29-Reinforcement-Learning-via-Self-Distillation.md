---
title: "[논문리뷰] Reinforcement Learning via Self-Distillation"
excerpt: "이 [arXiv]에 게시한 'Reinforcement Learning via Self-Distillation' 논문에 대한 자세한 리뷰입니다."

categories:
  - Review
tags:
  - Review
  - Reinforcement Learning
  - Self-Distillation
  - Large Language Models (LLMs)
  - Rich Feedback
  - Credit Assignment
  - Policy Optimization
  - RLHF
  - Code Generation
  - Test-Time Training

permalink: /ai/review/2026-01-29-Reinforcement-Learning-via-Self-Distillation/

toc: true
toc_sticky: true

date: 2026-01-29 00:00:00+0900+0900
last_modified_at: 2026-01-29 00:00:00+0900+0900
published: true
---
> **링크:** [논문 PDF로 바로 열기](https://arxiv.org/abs/2601.20802)

**저자:** Jonas Hübotter, Frederike Lübeck, Lejs Behric, Anton Baumann, Marco Bagatella, Daniel Marta, Ido Hakimi, Idan Shenfeld, Thomas Kleine Buening, Carlos Guestrin, Andreas Krause



## 핵심 연구 목표
대규모 언어 모델(LLM)의 강화 학습(RL) 후 훈련에서 발생하는 **심각한 신용 할당(credit assignment) 병목 현상** 을 해결하는 것이 목표입니다. 특히, 코드 생성이나 수학 문제 해결과 같은 **검증 가능한 도메인** 에서 **스칼라 보상** 이 아닌 **풍부한 텍스트 피드백** 을 활용하여 학습 효율성을 극대화하고자 합니다.

## 핵심 방법론
본 논문은 **Self-Distillation Policy Optimization (SDPO)** 라는 온-폴리시(on-policy) 알고리즘을 제안합니다. SDPO는 현재 모델(학생)이 생성한 응답에 대해 환경에서 받은 **풍부한 토큰화된 피드백** 을 조건으로 다시 평가하여 **자기 교사(self-teacher)** 역할을 수행합니다. 이 자기 교사가 제공하는 피드백 정보로 학생 모델의 다음 토큰 예측 분포를 **logit-level distillation 손실** 을 통해 일치시키도록 최적화하여 **조밀한(dense) 신용 할당 신호** 를 생성합니다.

## 주요 결과
**LiveCodeBench v6** 에서 **Qwen3-8B 모델** 을 사용한 결과, SDPO는 **GRPO 대비 4배 더 적은 생성량** 으로 더 높은 최종 정확도( **48.8% vs. 41.2%** )를 달성했습니다. 풍부한 피드백이 없는 환경에서도 **GRPO 대비 68.8% vs. 64.1%의 최종 정확도** 와 **7배 짧은 응답 길이** 를 보였습니다. 또한, 테스트 시점 SDPO는 어려운 이진 보상 문제에서 **best-of-k 샘플링보다 3배 적은 시도** 로 동일한 발견 확률을 달성하며 효율성을 입증했습니다.

## AI 실무자를 위한 시사점
SDPO는 **풍부한 텍스트 피드백** 을 활용하여 LLM의 학습 효율성을 획기적으로 향상시킬 수 있는 실용적인 방법을 제시합니다. 특히 **코드 생성, 과학적 추론, 도구 사용** 과 같이 상세한 오류 정보가 제공되는 도메인에서 기존 RLHF/RLVR 방법론의 한계를 극복하는 데 유용하며, **테스트 시점 자기 증류** 는 어려운 문제 해결을 위한 새로운 전략으로 활용될 수 있습니다. **강력한 기본 모델** 과 함께 사용될 때 자기 교사의 회고 능력이 더욱 향상되어 높은 성능을 기대할 수 있습니다.

> ⚠️ **알림:** 이 리뷰는 AI로 작성되었습니다.